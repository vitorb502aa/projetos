/* MedQuest — servidor da página de vendas (Node 18+, sem dependências).
   - Serve a página estática (pasta acima desta).
   - Registra a primeira visita de cada identificador anônimo e calcula a oferta de 24 h pelo relógio do servidor.
   - /api/go valida o preço no servidor e redireciona para o checkout certo (promocional ou regular).
   - /api/webhook recebe a confirmação de pagamento da plataforma e envia o Purchase pela API de Conversões (opcional).
   - /api/admin/* permite alterar preços e links sem mexer no código (protegido por ADMIN_TOKEN).
   Variáveis: PORT, ADMIN_TOKEN, WEBHOOK_SECRET, META_PIXEL_ID, META_CAPI_TOKEN, DATA_DIR, PUBLIC_URL. */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const CONFIG_FILE = path.join(__dirname, "config.json");
const DB_FILE = path.join(DATA_DIR, "db.json");
const PORT = +process.env.PORT || 8080;
fs.mkdirSync(DATA_DIR, { recursive: true });

// ---------- Armazenamento simples em arquivo (troque por um banco de dados em produção de alto volume) ----------
let db = { visitors: {}, accounts: {}, orders: {} };
try { db = Object.assign(db, JSON.parse(fs.readFileSync(DB_FILE, "utf8"))); } catch (e) { /* primeiro uso */ }
let saveT = null;
function persist() { clearTimeout(saveT); saveT = setTimeout(() => { const tmp = DB_FILE + ".tmp"; fs.writeFileSync(tmp, JSON.stringify(db)); fs.renameSync(tmp, DB_FILE); }, 200); }
function loadConfig() { return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")); }
function saveConfig(c) { const tmp = CONFIG_FILE + ".tmp"; fs.writeFileSync(tmp, JSON.stringify(c, null, 2)); fs.renameSync(tmp, CONFIG_FILE); }

// Preços efetivos (os planejados só valem se planned.active = true)
function prices(cfg) {
  const p = { currency: cfg.currency || "BRL", monthly: cfg.monthly.price, regular: cfg.annual.regular, promo: cfg.annual.promo };
  if (cfg.planned && cfg.planned.active) { p.monthly = cfg.planned.monthly; p.regular = cfg.planned.annual; }
  return p;
}
const VID = /^[a-z0-9-]{16,40}$/;
const sha = (s) => crypto.createHash("sha256").update(String(s).trim().toLowerCase()).digest("hex");

// Primeira visita: do visitante ou, se houver conta vinculada, a mais antiga da conta.
function firstSeen(vid, now) {
  let v = db.visitors[vid];
  if (!v) { v = db.visitors[vid] = { first: now, last: now, hits: 0 }; }
  v.last = now; v.hits++;
  const acc = v.account && db.accounts[v.account];
  if (acc) return Math.min(v.first, acc.first, ...acc.vids.map((id) => (db.visitors[id] ? db.visitors[id].first : Infinity)));
  return v.first;
}
function offerFor(vid, cfg, now) {
  const first = firstSeen(vid, now), dur = (cfg.offer.durationHours || 24) * 3600e3;
  const expiresAt = first + dur, active = !!cfg.offer.enabled && now < expiresAt;
  return { first, expiresAt, active };
}

// ---------- Utilidades HTTP ----------
function send(res, code, body, headers = {}) {
  const isObj = typeof body === "object" && !Buffer.isBuffer(body);
  res.writeHead(code, Object.assign({ "Content-Type": isObj ? "application/json; charset=utf-8" : "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }, headers));
  res.end(isObj ? JSON.stringify(body) : body);
}
function readBody(req, max = 256 * 1024) {
  return new Promise((ok, fail) => {
    let size = 0; const chunks = [];
    req.on("data", (c) => { size += c.length; if (size > max) { fail(new Error("grande demais")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { const raw = Buffer.concat(chunks).toString("utf8"); try { ok({ raw, json: raw ? JSON.parse(raw) : {} }); } catch (e) { ok({ raw, json: Object.fromEntries(new URLSearchParams(raw)) }); } });
    req.on("error", fail);
  });
}
const hits = new Map();
function limited(ip, key, max) { const k = ip + key, n = Date.now(), h = (hits.get(k) || []).filter((t) => n - t < 60e3); h.push(n); hits.set(k, h); return h.length > max; }
const ipOf = (req) => (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
const isAdmin = (req) => process.env.ADMIN_TOKEN && (req.headers.authorization || "") === "Bearer " + process.env.ADMIN_TOKEN;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "gclid", "src", "xcod"];

// ---------- API de Conversões da Meta (opcional) ----------
async function sendCapiPurchase(order, req) {
  const pixel = process.env.META_PIXEL_ID, token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token || order.capiSent) return;
  const user = {};
  if (order.emailHash) user.em = [order.emailHash];
  if (order.fbc) user.fbc = order.fbc;
  if (order.ua) user.client_user_agent = order.ua;
  const body = { data: [{ event_name: "Purchase", event_time: Math.floor(Date.now() / 1000), event_id: "purchase_" + order.ref, action_source: "website", event_source_url: process.env.PUBLIC_URL || "", user_data: user, custom_data: { currency: order.currency, value: order.paidValue || order.value, content_ids: [order.plan] } }] };
  try {
    const r = await fetch(`https://graph.facebook.com/v19.0/${pixel}/events?access_token=${encodeURIComponent(token)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    order.capiSent = r.ok; order.capiStatus = r.status; persist();
  } catch (e) { order.capiStatus = "erro"; persist(); }
}

// Extrai dados de webhooks de plataformas diferentes (Kiwify, Hotmart, Eduzz ou formato próprio).
function pick(o, paths) { for (const p of paths) { const v = p.split(".").reduce((a, k) => (a == null ? a : a[k]), o); if (v != null && v !== "") return v; } return null; }
function parseWebhook(j, refParam) {
  const ref = pick(j, ["ref", refParam, "TrackingParameters." + refParam, "tracking_parameters." + refParam, "data.purchase.origin." + refParam, "purchase.origin." + refParam, "metadata.ref", "tracking." + refParam, "custom.ref"]);
  const st = String(pick(j, ["status", "order_status", "event", "data.purchase.status", "purchase.status", "webhook_event_type"]) || "").toLowerCase();
  const paid = /paid|approved|aprovad|complete|order_approved|purchase_approved/.test(st);
  const refunded = /refund|reembols|chargeback|cancel/.test(st);
  const amountRaw = pick(j, ["amount", "value", "Commissions.charge_amount", "data.purchase.price.value", "purchase.price.value", "order.total"]);
  let amount = amountRaw == null ? null : Number(String(amountRaw).replace(",", "."));
  if (amount && amount > 1000 && !/\./.test(String(amountRaw))) amount = amount / 100; // valores em centavos
  const email = pick(j, ["email", "Customer.email", "customer.email", "data.buyer.email", "buyer.email"]);
  const orderId = pick(j, ["order_id", "data.purchase.transaction", "purchase.transaction", "id"]);
  return { ref, paid, refunded, amount, email, orderId, status: st };
}

// ---------- Arquivos estáticos ----------
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };
function serveStatic(req, res, url) {
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT + path.sep) || file.startsWith(path.join(ROOT, "server"))) return send(res, 404, "Não encontrado");
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, "Não encontrado");
    const ext = path.extname(file), type = TYPES[ext] || "application/octet-stream";
    const cache = /\.(webp|png|mp4|svg)$/.test(ext) ? "public, max-age=604800" : ext === ".html" ? "no-cache" : "public, max-age=3600";
    const headers = { "Content-Type": type, "Cache-Control": cache, "X-Content-Type-Options": "nosniff" };
    // Vídeos: suporte a Range para o navegador poder avançar e começar a tocar rápido
    const range = req.headers.range;
    if (range && ext === ".mp4") {
      const m = range.match(/bytes=(\d*)-(\d*)/), start = +m[1] || 0, end = m[2] ? +m[2] : st.size - 1;
      res.writeHead(206, Object.assign(headers, { "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 }));
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, Object.assign(headers, { "Content-Length": st.size }));
    fs.createReadStream(file).pipe(res);
  });
}

// ---------- Rotas ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost"), ip = ipOf(req), now = Date.now();
  try {
    if (url.pathname === "/api/offer" && req.method === "POST") {
      if (limited(ip, "offer", 120)) return send(res, 429, { error: "Muitas requisições" });
      const { json } = await readBody(req);
      if (!VID.test(json.vid || "")) return send(res, 400, { error: "Identificador inválido" });
      const cfg = loadConfig(), pr = prices(cfg), of = offerFor(json.vid, cfg, now);
      if (json.utm && !db.visitors[json.vid].utm) db.visitors[json.vid].utm = Object.fromEntries(Object.entries(json.utm).filter(([k]) => UTM_KEYS.includes(k) || k === "sck").map(([k, v]) => [k, String(v).slice(0, 200)]));
      persist();
      return send(res, 200, { now, first: of.first, expiresAt: of.expiresAt, active: of.active, pricing: { currency: pr.currency, monthly: { price: pr.monthly }, annual: { regular: pr.regular, promo: pr.promo } }, checkout: { monthly: "/api/go?plan=monthly", annual: "/api/go?plan=annual" } });
    }

    // Validação do preço no servidor + redirecionamento ao checkout
    if (url.pathname === "/api/go" && req.method === "GET") {
      if (limited(ip, "go", 30)) return send(res, 429, "Muitas requisições");
      const plan = url.searchParams.get("plan"), vid = url.searchParams.get("vid") || "", cfg = loadConfig(), pr = prices(cfg), refParam = cfg.refParam || "sck";
      if (!["monthly", "annual"].includes(plan)) return send(res, 400, "Plano inválido");
      const of = VID.test(vid) ? offerFor(vid, cfg, now) : { active: false };
      const promo = plan === "annual" && of.active;
      const link = plan === "monthly" ? cfg.monthly.checkout : promo ? cfg.annual.checkoutPromo : cfg.annual.checkoutRegular;
      if (!link) return send(res, 302, "", { Location: "/?checkout=indisponivel#planos" });
      const ref = /^[a-z0-9]{6,40}$/.test(url.searchParams.get(refParam) || "") ? url.searchParams.get(refParam) : "mq" + crypto.randomBytes(6).toString("hex");
      const utm = {}; UTM_KEYS.forEach((k) => { const v = url.searchParams.get(k); if (v) utm[k] = v.slice(0, 200); });
      const fbclid = utm.fbclid, cookies = Object.fromEntries((req.headers.cookie || "").split(/; */).filter(Boolean).map((c) => c.split("=")));
      db.orders[ref] = { ref, vid, plan, promo, value: plan === "monthly" ? pr.monthly : promo ? pr.promo : pr.regular, currency: pr.currency, utm, status: "iniciado", createdAt: now, offerExpiresAt: of.expiresAt || null, ua: (req.headers["user-agent"] || "").slice(0, 300), fbc: cookies._fbc || (fbclid ? `fb.1.${now}.${fbclid}` : undefined) };
      persist();
      const out = new URL(link); Object.entries(utm).forEach(([k, v]) => out.searchParams.set(k, v)); out.searchParams.set(refParam, ref);
      return send(res, 302, "", { Location: out.href });
    }

    // Vincula a oferta a uma conta (e-mail guardado só como hash)
    if (url.pathname === "/api/link" && req.method === "POST") {
      if (limited(ip, "link", 20)) return send(res, 429, { error: "Muitas requisições" });
      const { json } = await readBody(req);
      if (!VID.test(json.vid || "") || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(json.email || "")) return send(res, 400, { error: "Dados inválidos" });
      const h = sha(json.email), v = db.visitors[json.vid] || (db.visitors[json.vid] = { first: now, last: now, hits: 0 });
      const acc = db.accounts[h] || (db.accounts[h] = { first: v.first, vids: [] });
      acc.first = Math.min(acc.first, v.first); if (!acc.vids.includes(json.vid)) acc.vids.push(json.vid);
      v.account = h; persist();
      return send(res, 200, { ok: true });
    }

    // Confirmação de pagamento enviada pela plataforma
    if (url.pathname === "/api/webhook" && req.method === "POST") {
      const secret = process.env.WEBHOOK_SECRET;
      const given = url.searchParams.get("token") || req.headers["x-webhook-secret"] || "";
      if (!secret || given.length !== secret.length || !crypto.timingSafeEqual(Buffer.from(given), Buffer.from(secret))) return send(res, 401, { error: "Não autorizado" });
      const { json } = await readBody(req), cfg = loadConfig(), w = parseWebhook(json, cfg.refParam || "sck");
      const order = w.ref && db.orders[w.ref];
      if (!order) { (db.unmatched = db.unmatched || []).push({ at: now, status: w.status, orderId: w.orderId }); persist(); return send(res, 202, { ok: true, matched: false }); }
      if (w.refunded) { order.status = "reembolsado"; order.refundedAt = now; persist(); return send(res, 200, { ok: true }); }
      if (!w.paid) { order.lastStatus = w.status; persist(); return send(res, 200, { ok: true }); }
      if (order.status === "pago") return send(res, 200, { ok: true, duplicate: true }); // idempotente
      order.status = "pago"; order.paidAt = now; order.paidValue = w.amount; order.gatewayOrder = w.orderId;
      if (w.email) { order.emailHash = sha(w.email); const v = db.visitors[order.vid]; if (v) { const acc = db.accounts[order.emailHash] || (db.accounts[order.emailHash] = { first: v.first, vids: [] }); if (!acc.vids.includes(order.vid)) acc.vids.push(order.vid); v.account = order.emailHash; } }
      // Conferência do desconto: valor promocional pago fora do prazo fica sinalizado para revisão
      const pr = prices(cfg);
      if (order.plan === "annual" && w.amount != null && w.amount < pr.regular - 0.01 && (!order.promo || (order.offerExpiresAt && order.createdAt > order.offerExpiresAt))) order.flag = "promocao_fora_do_prazo";
      persist();
      sendCapiPurchase(order, req);
      return send(res, 200, { ok: true });
    }

    // Página de obrigado consulta o pedido; o Purchase do navegador só dispara se estiver pago
    if (url.pathname === "/api/order" && req.method === "GET") {
      const o = db.orders[url.searchParams.get("ref") || ""];
      if (!o) return send(res, 404, { status: "desconhecido" });
      return send(res, 200, { status: o.status, plan: o.plan, value: o.paidValue || o.value, currency: o.currency, eventID: "purchase_" + o.ref, clientFired: !!o.clientFired });
    }
    if (url.pathname === "/api/order/ack" && req.method === "POST") {
      const { json } = await readBody(req), o = db.orders[json.ref || ""];
      if (o && o.status === "pago") { o.clientFired = true; persist(); }
      return send(res, 200, { ok: true });
    }

    // Administração
    if (url.pathname.startsWith("/api/admin/")) {
      if (!isAdmin(req)) return send(res, 401, { error: "Token de administrador inválido" });
      if (url.pathname === "/api/admin/config" && req.method === "GET") return send(res, 200, loadConfig());
      if (url.pathname === "/api/admin/config" && req.method === "PUT") {
        const { json } = await readBody(req), c = loadConfig();
        const num = (v, d) => (Number.isFinite(+v) && +v > 0 ? Math.round(+v * 100) / 100 : d);
        const link = (v, d) => (v === "" || /^https:\/\/[^\s"'<>]+$/.test(v || "") ? v : d);
        c.offer.enabled = json.offer ? !!json.offer.enabled : c.offer.enabled;
        c.offer.durationHours = json.offer ? Math.min(168, Math.max(1, num(json.offer.durationHours, c.offer.durationHours))) : c.offer.durationHours;
        if (json.monthly) { c.monthly.price = num(json.monthly.price, c.monthly.price); c.monthly.checkout = link(json.monthly.checkout, c.monthly.checkout); }
        if (json.annual) { c.annual.regular = num(json.annual.regular, c.annual.regular); c.annual.promo = num(json.annual.promo, c.annual.promo); c.annual.checkoutRegular = link(json.annual.checkoutRegular, c.annual.checkoutRegular); c.annual.checkoutPromo = link(json.annual.checkoutPromo, c.annual.checkoutPromo); }
        if (json.planned) { c.planned.monthly = num(json.planned.monthly, c.planned.monthly); c.planned.annual = num(json.planned.annual, c.planned.annual); c.planned.active = !!json.planned.active; }
        if (json.refParam && /^[a-z_]{2,20}$/.test(json.refParam)) c.refParam = json.refParam;
        saveConfig(c); return send(res, 200, c);
      }
      if (url.pathname === "/api/admin/stats" && req.method === "GET") {
        const orders = Object.values(db.orders), cfg = loadConfig(), dur = cfg.offer.durationHours * 3600e3;
        return send(res, 200, { visitors: Object.keys(db.visitors).length, activeOffers: Object.values(db.visitors).filter((v) => now - v.first < dur).length, accounts: Object.keys(db.accounts).length, checkouts: orders.length, paid: orders.filter((o) => o.status === "pago").length, flagged: orders.filter((o) => o.flag).length, unmatched: (db.unmatched || []).length });
      }
      return send(res, 404, { error: "Rota inválida" });
    }
    // Somente para testes automatizados (TEST_MODE=1): envelhece a primeira visita de um visitante.
    if (process.env.TEST_MODE === "1" && url.pathname === "/api/test/age" && req.method === "POST") {
      const { json } = await readBody(req), v = db.visitors[json.vid];
      if (v) { v.first = now - (+json.ms || 0); persist(); }
      return send(res, 200, { ok: !!v });
    }
    if (url.pathname.startsWith("/api/")) return send(res, 404, { error: "Rota inválida" });
    if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Método não permitido");
    return serveStatic(req, res, url);
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: "Erro interno" });
  }
});
if (require.main === module) server.listen(PORT, () => console.log(`MedQuest vendas em http://localhost:${PORT}`));
module.exports = { server, parseWebhook, prices };
