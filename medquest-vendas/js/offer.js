/* MedQuest — oferta de boas-vindas de 24 horas.
   O servidor registra a primeira visita, usa o próprio relógio e decide o preço válido.
   Sem servidor (pré-visualização), a página usa um modo local que também não reinicia ao recarregar. */
(function () {
  "use strict";
  const C = window.MQ_CONFIG || {};
  const T = window.MQT;
  const listeners = [];
  let state = null, timer = 0;

  // Identificador anônimo persistente (localStorage + cookie próprio). Nenhuma impressão digital do aparelho.
  function getVid() {
    let v = null;
    try { v = localStorage.getItem("mq_vid"); } catch (e) { /* sem armazenamento */ }
    if (!v) { const m = document.cookie.match(/(?:^|; )mq_vid=([a-f0-9-]{20,40})/); if (m) v = m[1]; }
    if (!v) v = (crypto.randomUUID ? crypto.randomUUID() : "v" + Date.now().toString(16) + Math.random().toString(16).slice(2, 14)).toLowerCase();
    try { localStorage.setItem("mq_vid", v); } catch (e) { /* segue */ }
    document.cookie = `mq_vid=${v}; Max-Age=${400 * 86400}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    return v;
  }
  const vid = getVid();

  function fromServer(r) {
    return {
      source: "server", offset: r.now - Date.now(), first: r.first, expiresAt: r.expiresAt, active: !!r.active,
      monthly: r.pricing.monthly.price, annualRegular: r.pricing.annual.regular, annualPromo: r.pricing.annual.promo,
      links: r.checkout, currency: r.pricing.currency || "BRL"
    };
  }
  function local() {
    const P = C.pricing, dur = (P.offer.durationHours || 24) * 3600e3;
    let first = null;
    try { first = +localStorage.getItem("mq_first_visit") || null; } catch (e) { /* segue */ }
    if (!first) { first = Date.now(); try { localStorage.setItem("mq_first_visit", String(first)); } catch (e) { /* segue */ } }
    const expiresAt = first + dur, active = P.offer.enabled && Date.now() < expiresAt;
    return {
      source: "local", offset: 0, first, expiresAt, active, monthly: P.monthly.price, annualRegular: P.annual.regular, annualPromo: P.annual.promo, currency: P.currency,
      links: { monthly: P.monthly.checkout, annual: active ? P.annual.checkoutPromo : P.annual.checkoutRegular }
    };
  }
  async function fetchOffer() {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 4000);
    try {
      const res = await fetch((C.apiBase || "") + "/api/offer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vid, utm: T.utm(), page: location.pathname }), signal: ctl.signal, credentials: "same-origin" });
      if (!res.ok) throw new Error("http " + res.status);
      const j = await res.json();
      if (!j || !j.pricing) throw new Error("resposta inválida");
      return fromServer(j);
    } catch (e) { return null; } finally { clearTimeout(t); }
  }
  const serverNow = () => Date.now() + (state ? state.offset : 0);
  const remaining = () => (state && state.active ? Math.max(0, state.expiresAt - serverNow()) : 0);
  function emit() { listeners.forEach((f) => f(state)); }
  async function refresh() {
    state = (await fetchOffer()) || local();
    emit();
    clearInterval(timer);
    if (state.active) timer = setInterval(async () => {
      if (remaining() > 0) return emit();
      clearInterval(timer);
      // Venceu: confirma com o servidor antes de trocar o preço.
      state = (state.source === "server" ? await fetchOffer() : null) || Object.assign({}, local(), state.source === "server" ? { active: false } : {});
      if (state.source === "server" && state.active && state.expiresAt <= serverNow()) state.active = false;
      emit();
    }, 1000);
  }
  // Link de checkout com UTMs e o código do pedido. No servidor, /api/go valida o preço e redireciona.
  function checkoutUrl(plan) {
    if (!state) return "";
    const base = state.links && state.links[plan];
    if (!base) return "";
    const ref = "mq" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const extra = { [C.refParam || "sck"]: ref };
    if (state.source === "server") extra.vid = vid;
    return { url: T.withUtm(base, extra), ref };
  }
  // Vincula a oferta a uma conta quando a pessoa se cadastra (chamar a partir do cadastro do app).
  async function linkAccount(email) {
    try { await fetch((C.apiBase || "") + "/api/link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vid, email }) }); await refresh(); return true; } catch (e) { return false; }
  }
  window.MQO = { vid, refresh, remaining, checkoutUrl, linkAccount, onChange: (f) => listeners.push(f), get state() { return state; } };
})();
