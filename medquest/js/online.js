/* MedQuest: recursos entre estudantes.
   - Desafio entre amigos por código: funciona em qualquer lugar, sem servidor.
   - Ranking semanal e batalhas online: usam o banco compartilhado da página publicada
     (claude.use("db") + claude.use("user")). Fora dela, aparecem como indisponíveis. */
"use strict";

// ---------- Código de desafio (sem servidor) ----------
function b64urlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = ""; bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}
function challengeCode(o) { return "MQ1-" + b64urlEncode(JSON.stringify(o)); }
function parseChallenge(code) {
  try {
    const m = String(code).trim().match(/MQ1-([A-Za-z0-9_-]+)/);
    if (!m) return null;
    const o = JSON.parse(b64urlDecode(m[1]));
    if (typeof o.s !== "number" || typeof o.p !== "number") return null;
    o.sc = typeof o.sc === "string" ? o.sc : "all";
    const ids = scopeIds(o.sc);
    if (ids) { const ok = ids.filter((i) => worldById(i)); o.sc = ok.length ? "L:" + ok.join(",") : "all"; }
    else if (o.sc !== "all" && !CYCLES.some((c) => c.id === o.sc) && !worldById(o.sc)) o.sc = "all";
    o.n = String(o.n || "Amigo(a)").slice(0, 30);
    o.k = +o.k || 0;
    return o;
  } catch (e) { return null; }
}
function acceptChallenge() {
  const el = document.getElementById("code-in");
  const c = parseChallenge(el ? el.value : "");
  if (!c) return toast("Código inválido. Ele começa com MQ1-");
  startClock(c.sc, c.s, c);
}
function newFriendChallenge() { startClock(S.ui.clockScope); }

// ---------- Conexão com a página publicada ----------
const ON = { db: null, user: null, uid: null, sample: null, limits: null, players: {}, names: {}, loaded: false, err: null, writeErr: null, merged: false, lastWritten: "" };

async function initOnline() {
  if (!window.claude || typeof window.claude.use !== "function") return;
  try {
    const [db, user, sample] = await Promise.all(["db", "user", "sample"].map((n) => window.claude.use(n).catch(() => null)));
    ON.sample = sample; ON.user = user;
    if (sample) { try { ON.limits = await sample.limits(); } catch (e) { ON.limits = null; } }
    if (user) { try { ON.uid = await user.id(); } catch (e) { ON.uid = null; } }
    if (db && ON.uid) { ON.db = db; subscribePlayers(); }
    softRerender();
  } catch (e) { /* segue offline */ }
}

function subscribePlayers() {
  const t = setTimeout(() => { if (!ON.loaded) { ON.err = "timeout"; softRerender(); } }, 10000);
  ON.db.collection("players").onSnapshot((snap) => {
    clearTimeout(t);
    ON.loaded = true; ON.err = null;
    const p = {};
    snap.docs.forEach((d) => { const v = d.data(); if (v) p[d.id] = v; });
    ON.players = p;
    if (!ON.merged) mergeMine();
    resolveNames(Object.keys(p));
    softRerender();
  }, (e) => { clearTimeout(t); ON.err = (e && e.code) || "erro"; softRerender(); });
}

// Junta batalhas salvas em outro aparelho com as deste.
function mergeMine() {
  ON.merged = true;
  const mine = ON.players[ON.uid];
  if (mine) {
    S.online.battles = Object.assign({}, mine.battles || {}, S.online.battles);
    S.online.results = Object.assign({}, mine.results || {}, S.online.results);
    if (!S.nick && mine.nick) S.nick = String(mine.nick).slice(0, 24);
    save();
  }
  scheduleSync(500);
}

async function resolveNames(ids) {
  if (!ON.user || !ids.length) return;
  try {
    const ps = await ON.user.profiles(ids);
    let changed = false;
    ids.forEach((id) => { const n = (ps[id] && ps[id].name) || ""; if (ON.names[id] !== n) { ON.names[id] = n; changed = true; } });
    if (changed) softRerender();
  } catch (e) { /* sem nomes */ }
}
function playerName(uid, p) {
  if (uid === ON.uid) return "Você";
  return (p && p.nick) || ON.names[uid] || "Estudante";
}

let syncTimer = null;
function scheduleSync(ms = 3000) {
  if (!ON.db || !ON.uid) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(syncNow, ms);
}
async function syncNow() {
  if (!ON.db || !ON.uid) return;
  const cut = Date.now() - 14 * DAY;
  for (const [k, b] of Object.entries(S.online.battles)) if (b.at < cut) delete S.online.battles[k];
  for (const [k, r] of Object.entries(S.online.results)) if (r.at < cut) delete S.online.results[k];
  const L = levelInfo();
  const doc = {
    nick: (S.nick || "").slice(0, 24), avatar: S.avatar, xp: S.xp, lvl: L.lvl, title: L.title, streak: currentStreak(),
    week: weekKey(), weekXp: weekXp(), medals: medalCount(1),
    battles: S.online.battles, results: S.online.results
  };
  const json = JSON.stringify(doc);
  if (json === ON.lastWritten) return;
  try {
    await ON.db.doc("players/" + ON.uid).set(Object.assign(doc, { at: Date.now() }));
    ON.lastWritten = json; ON.writeErr = null;
  } catch (e) { ON.writeErr = (e && e.code) || "erro"; softRerender(); }
}

function onlineStatusHtml() {
  if (!ON.db) return `<p class="muted-txt small">🌐 Ranking e batalhas online funcionam na versão publicada do MedQuest (link do Claude), quando você está conectado(a). Aqui você pode usar o desafio por código e a batalha no mesmo aparelho.</p>`;
  if (ON.err) return `<p class="muted-txt small">⚠️ Não foi possível carregar os dados online agora. Tente abrir a página de novo mais tarde.</p>`;
  if (!ON.loaded) return `<p class="muted-txt small">Carregando dados online…</p>`;
  if (ON.writeErr) return `<p class="muted-txt small">👀 Você pode ver o ranking, mas não tem permissão para participar. Peça ao dono do link acesso de interação.</p>`;
  return "";
}

// ---------- Ranking semanal ----------
function rankingRows() {
  const wk = weekKey();
  const rows = [];
  for (const [uid, p] of Object.entries(ON.players)) {
    if (uid === ON.uid) continue;
    if (p.week === wk && p.weekXp > 0) rows.push({ uid, p, xp: p.weekXp });
  }
  if (ON.uid) rows.push({ uid: ON.uid, p: { avatar: S.avatar, lvl: levelInfo().lvl, title: levelInfo().title, streak: currentStreak(), nick: S.nick }, xp: weekXp(), me: true });
  return rows.sort((a, b) => b.xp - a.xp);
}
function rankingHtml(limit = 50) {
  const rows = rankingRows();
  if (!ON.db) return `<p>Sua semana: <b>${weekXp()} XP</b></p><p class="muted-txt small">O ranking com a sua turma aparece na versão publicada do MedQuest.</p>`;
  if (!ON.loaded) return `<div class="panel">${onlineStatusHtml()}</div>`;
  const medal = ["🥇", "🥈", "🥉"];
  return `<div class="rank-list">${rows.slice(0, limit).map((r, i) => `
      <div class="rank-row ${r.me ? "me" : ""}">
        <span class="rk">${medal[i] || i + 1}</span>
        ${avatarHtml(r.p.avatar, 38)}
        <span class="rn"><b>${esc(playerName(r.uid, r.p))}</b><small>Nível ${+r.p.lvl || 1} · 🔥 ${+r.p.streak || 0}</small></span>
        <span class="rx">${r.xp} XP</span>
      </div>`).join("")}
    ${rows.length <= 1 ? `<p class="muted-txt small center">Ninguém mais pontuou nesta semana ainda. Compartilhe o link do MedQuest com sua turma!</p>` : ""}
    </div>${onlineStatusHtml()}`;
}

// ---------- Batalhas online ----------
function allBattles() {
  const out = [];
  const cut = Date.now() - 7 * DAY;
  const owners = Object.assign({}, ON.players);
  if (ON.uid) owners[ON.uid] = Object.assign({}, owners[ON.uid] || {}, { battles: S.online.battles, results: S.online.results, nick: S.nick, avatar: S.avatar });
  for (const [uid, p] of Object.entries(owners)) {
    for (const [bid, b] of Object.entries(p.battles || {})) {
      if (!b || b.at < cut) continue;
      const parts = [];
      for (const [u2, p2] of Object.entries(owners)) {
        const r = (p2.results || {})[bid];
        if (r) parts.push({ uid: u2, p: p2, r });
      }
      parts.sort((a, c) => c.r.pts - a.r.pts || a.r.ms - c.r.ms);
      out.push({ bid, owner: uid, ownerP: p, seed: b.seed, scope: b.scope || "all", at: b.at, parts, played: !!S.online.results[bid] });
    }
  }
  return out.sort((a, b) => b.at - a.at);
}
function createBattle() {
  if (!ON.db) return toast("Batalhas online só funcionam na versão publicada.");
  if (ON.writeErr) return toast("Você não tem permissão para criar batalhas neste link.");
  const scope = concreteScope(S.ui.battleScope);
  const bid = "b" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
  const seed = newSeed();
  if (battleItems(seed, scope).length < 5) return toast("Poucas questões nessa matéria para uma batalha.");
  S.online.battles[bid] = { seed, scope, at: Date.now() };
  save();
  playBattle(bid, seed, scope);
}
function joinBattle(bid) {
  const b = allBattles().find((x) => x.bid === bid);
  if (!b) return toast("Batalha não encontrada.");
  if (S.online.results[bid]) return go("battle", bid);
  playBattle(bid, b.seed, b.scope);
}
function playBattle(bid, seed, scope) {
  startBattleRun({
    seed, scope, title: `⚔️ Batalha · ${scopeLabel(scope)}`, back: () => go("battles"),
    onDone: (res) => { S.online.results[bid] = res; save(); syncNow(); go("battle", bid); }
  });
}
function battleCardHtml(b) {
  const mineOwner = b.owner === ON.uid;
  const leader = b.parts[0];
  return `
    <div class="battle-card">
      <div class="bc-head">${avatarHtml(b.ownerP.avatar, 34)}<div><b>${mineOwner ? "Sua batalha" : `Batalha de ${esc(playerName(b.owner, b.ownerP))}`}</b><small>${esc(scopeLabel(b.scope))} · ${b.parts.length} participante(s) · ${new Date(b.at).toLocaleDateString("pt-BR")}</small></div></div>
      ${leader ? `<p class="small">🏆 Liderando: <b>${esc(playerName(leader.uid, leader.p))}</b> com ${leader.r.pts} pts</p>` : ""}
      ${b.played ? `<button class="btn ghost block" onclick="go('battle','${b.bid}')">Ver resultado</button>` : `<button class="btn accent block" onclick="joinBattle('${b.bid}')">⚔️ Aceitar batalha</button>`}
    </div>`;
}
