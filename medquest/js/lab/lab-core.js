/* MedQuest Lab — núcleo: catálogo, progresso, missões semanais, recomendações,
   resultados (com erros indo para a revisão espaçada), interface e área administrativa. */
"use strict";

// ---------- Catálogo ----------
const LAB_DISC = [
  ["anato", "Anatomia"], ["fisio", "Fisiologia"], ["histo", "Histologia"], ["embrio", "Embriologia"], ["bioq", "Bioquímica"],
  ["micro", "Microbiologia"], ["imuno", "Imunologia"], ["farmaco", "Farmacologia"], ["pato", "Patologia"], ["semio", "Semiologia"],
  ["cardio", "Cardiologia"], ["neuro", "Neurologia"], ["pneumo", "Pneumologia"], ["pedi", "Pediatria"], ["gastro", "Gastroenterologia"],
  ["endo", "Endocrinologia"], ["infecto", "Infectologia"], ["radio", "Radiologia"], ["cirurgia", "Cirurgia"], ["go", "Ginecologia e Obstetrícia"],
  ["clinica", "Medicina de Emergência"], ["saude", "Saúde Coletiva"]
];
const discName = (id) => (LAB_DISC.find((d) => d[0] === id) || [id, id])[1];
const LAB_DIFF = {
  ini: { n: "Iniciante", d: "Reconhecer e identificar conceitos fundamentais, com dicas." },
  int: { n: "Intermediário", d: "Associar informações e aplicar o conhecimento, com menos ajuda." },
  adv: { n: "Avançado", d: "Investigar situações complexas e justificar o raciocínio clínico." }
};
const LAB_MODES = {
  anatomy: { n: "Anatomia 3D", icon: "🫀" },
  error: { n: "Encontre o erro", icon: "🔎" },
  ward: { n: "Plantão virtual", icon: "🏥" },
  instr: { n: "Instrumentos cirúrgicos", icon: "🛠️" },
  osce: { n: "Estações OSCE", icon: "📋" }
};
// Modalidades planejadas: aparecem como "em breve", sem poderem ser abertas.
const LAB_SOON = [
  { icon: "🔬", n: "Laboratório virtual", d: "Microscópio, lâminas de histologia, microrganismos e exames de laboratório." },
  { icon: "🩻", n: "Investigação diagnóstica", d: "Radiografias, tomografias, ressonâncias e ECGs com imagens licenciadas." },
  { icon: "💊", n: "Desafios de farmacologia", d: "Receptores, mecanismos, moléculas e interações em situações fictícias." },
  { icon: "🔪", n: "Simulador cirúrgico completo", d: "Etapas de procedimentos e anatomia cirúrgica aplicada." }
];
const LAB = { sims: [] };
function labRegister(sim) {
  const i = LAB.sims.findIndex((s) => s.id === sim.id);
  if (i >= 0) LAB.sims[i] = sim; else LAB.sims.push(sim);
}
const labSim = (id) => LAB.sims.find((s) => s.id === id);
function labReview(sim) {
  const o = (S.lab.review || {})[sim.id];
  return o || sim.review || { status: "pendente" };
}
// No modo produção, só aparecem simulações com revisão médica registrada.
const labVisible = (sim) => !S.lab.prod || labReview(sim).status === "revisado";

// ---------- Estado ----------
function labDefault() {
  return {
    history: [], best: {}, last: null, force2d: false, prod: false, review: {}, custom: {},
    stats: { sims: 0, anatomy: 0, errorsFound: 0, perfectScenes: 0, cases: 0, dxOk: 0, osce: 0, osceOk: 0, instr: 0 },
    weak: {}, weekly: { key: null, claimed: {}, prog: {} }, filter: { disc: "", mode: "" }
  };
}
S.lab = Object.assign(labDefault(), S.lab || {});
S.lab.stats = Object.assign(labDefault().stats, S.lab.stats);
S.lab.weekly = Object.assign(labDefault().weekly, S.lab.weekly);
S.lab.filter = Object.assign(labDefault().filter, S.lab.filter);
S.mastery = S.mastery || {};
MISSIONS.push({ id: "lab", t: "Conclua 1 simulação do Lab", k: "lab", n: 1, r: 30, icon: "🧪" });
const starsWorld = (id) => STAGES.reduce((t, st) => t + starsOf(id, st.key), 0);
MEDALS.push(
  { id: "lab_anat", icon: "🫀", name: "Anatomista Expert", unit: "jogos de anatomia com 70% ou mais", v: () => S.lab.stats.anatomy, t: [1, 5, 15] },
  { id: "lab_det", icon: "🕵️", name: "Detetive Clínico", unit: "pacientes atendidos no Plantão", v: () => S.lab.stats.cases, t: [1, 7, 20] },
  { id: "lab_dx", icon: "🔍", name: "Investigador Diagnóstico", unit: "hipóteses e interpretações corretas", v: () => S.lab.stats.dxOk, t: [3, 15, 40] },
  { id: "lab_bio", icon: "🧤", name: "Especialista em Biossegurança", unit: "erros encontrados nos cenários", v: () => S.lab.stats.errorsFound, t: [10, 40, 120] },
  { id: "lab_far", icon: "💊", name: "Mestre da Farmacologia", unit: "estrelas em Farmacologia", v: () => starsWorld("farmaco"), t: [6, 12, 18] },
  { id: "lab_mic", icon: "🔬", name: "Explorador Microscópico", unit: "estrelas em Histologia, Microbiologia, Imunologia e Bioquímica", v: () => ["histo", "micro", "imuno", "bioq"].reduce((a, w) => a + starsWorld(w), 0), t: [12, 36, 72] },
  { id: "lab_instr", icon: "🛠️", name: "Instrumentador(a)", unit: "desafios de instrumentos com 70% ou mais", v: () => S.lab.stats.instr, t: [1, 5, 15] },
  { id: "lab_osce", icon: "📋", name: "Aprovado no OSCE", unit: "estações com 70% ou mais", v: () => S.lab.stats.osceOk, t: [1, 4, 8] },
  { id: "mastery", icon: "🏆", name: "Domínio de disciplina", unit: "matérias com todas as fases em 3 estrelas", v: () => Object.keys(S.mastery).length, t: [1, 5, 15] }
);

// ---------- Missões semanais ----------
const WEEKLY = [
  { id: "w_sims", t: "Conclua 5 simulações do Lab", k: "sims", n: 5, r: 120, icon: "🧪" },
  { id: "w_err", t: "Encontre 15 erros nos cenários", k: "errors", n: 15, r: 100, icon: "🔎" },
  { id: "w_case", t: "Atenda 3 pacientes no Plantão", k: "cases", n: 3, r: 100, icon: "🏥" },
  { id: "w_osce", t: "Faça 2 estações OSCE", k: "osce", n: 2, r: 100, icon: "📋" },
  { id: "w_anat", t: "Complete 3 jogos de anatomia", k: "anat", n: 3, r: 80, icon: "🫀" },
  { id: "w_instr", t: "Complete 2 desafios de instrumentos", k: "instr", n: 2, r: 80, icon: "🛠️" },
  { id: "w_xp", t: "Ganhe 600 XP nesta semana", k: "xp", n: 600, r: 150, icon: "✨" }
];
function ensureWeek() {
  const wk = weekKey();
  if (S.lab.weekly.key !== wk) S.lab.weekly = { key: wk, claimed: {}, prog: {} };
}
function weeklyMissions() {
  ensureWeek();
  const rand = rng(hashStr("semana-" + S.lab.weekly.key));
  return shuffle(WEEKLY, rand).slice(0, 3).map((m) => {
    const v = m.k === "xp" ? weekXp() : S.lab.weekly.prog[m.k] || 0;
    const p = Math.min(m.n, v);
    return { ...m, p, done: p >= m.n, claimed: !!S.lab.weekly.claimed[m.id] };
  });
}
function bumpWeek(k, n = 1) {
  ensureWeek();
  S.lab.weekly.prog[k] = (S.lab.weekly.prog[k] || 0) + n;
  weeklyMissions().forEach((m) => {
    if (m.done && !m.claimed && !S.lab.weekly.prog["_n_" + m.id]) {
      S.lab.weekly.prog["_n_" + m.id] = 1;
      toast(`${m.icon} Missão semanal cumprida: <b>${esc(m.t)}</b>`, "gold");
    }
  });
}
function claimWeekly(id) {
  const m = weeklyMissions().find((x) => x.id === id);
  if (!m || !m.done || m.claimed) return;
  S.lab.weekly.claimed[id] = true;
  S.stats.missions++;
  sfx.win(); toast(`+${m.r} XP pela missão semanal!`, "gold");
  addXp(m.r); save(); rerender();
}

// ---------- Recomendações ----------
function weakRate(disc) { const w = S.lab.weak[disc]; return w && w.n ? w.miss / w.n : 0; }
function labRecommend(n = 3) {
  const grade = hasGrade() ? myGrade() : [];
  const errTags = {};
  S.errors.forEach((e) => { errTags[e.tag] = (errTags[e.tag] || 0) + 1; });
  return LAB.sims.filter(labVisible).map((s) => {
    let sc = Math.random() * 0.3;
    const why = [];
    if (grade.includes(s.disc)) { sc += 3; why.push("do seu semestre"); }
    const wr = weakRate(s.disc);
    if (wr > 0.25) { sc += 2 + wr * 2; why.push("reforça um ponto fraco"); }
    if ((errTags[discName(s.disc)] || 0) > 2) { sc += 1.5; if (!why.includes("reforça um ponto fraco")) why.push("ligada ao seu caderno de erros"); }
    const b = S.lab.best[s.id] || {};
    if (!Object.keys(b).length) { sc += 1; why.push("nova para você"); }
    return { s, sc, why: why[0] || "boa para variar" };
  }).sort((a, b) => b.sc - a.sc).slice(0, n);
}

// ---------- Contexto da simulação em andamento ----------
let LABCTX = null; // { sim, diff, title, objective, help, t0, pausedAt, pausedMs, onPause, onResume }
function labBegin(sim, diff, extra = {}) {
  labCleanup();
  clearTimers();
  G = { mode: "lab" };
  LABCTX = Object.assign({ sim, diff, t0: Date.now(), pausedMs: 0, pausedAt: 0 }, extra);
  S.lab.last = { id: sim.id, diff, sub: extra.sub || null, at: Date.now() };
  save();
  document.body.classList.add("lab-full");
  window.scrollTo(0, 0);
}
const labElapsed = () => !LABCTX ? 0 : (LABCTX.pausedAt || Date.now()) - LABCTX.t0 - LABCTX.pausedMs;
function labHud(o) {
  return `
    <div class="lab-hud">
      <button class="icon-btn" onclick="labQuit()" aria-label="Sair">✕</button>
      <div class="hud-main">
        <b>${esc(o.title)}</b>
        <small>${esc(o.objective || "")}</small>
        <div class="bar"><span style="width:${Math.round((o.progress || 0) * 100)}%"></span></div>
      </div>
      <div class="hud-side">
        ${o.score !== undefined ? `<span class="hud-pill">⭐ <b id="hud-score">${o.score}</b></span>` : ""}
        ${o.timer ? `<span class="hud-pill" id="hud-time">⏱ ${fmtTime(o.timer === "down" ? o.left : labElapsed())}</span>` : ""}
        <button class="icon-btn" onclick="labPause()" aria-label="Pausar">⏸</button>
        <button class="icon-btn" onclick="labHelp()" aria-label="Ajuda">?</button>
      </div>
    </div>`;
}
function labTickHud(leftMs) {
  const el = document.getElementById("hud-time");
  if (el) el.textContent = "⏱ " + fmtTime(leftMs !== undefined ? leftMs : labElapsed());
}
function labPause() {
  if (!LABCTX || LABCTX.pausedAt) return;
  LABCTX.pausedAt = Date.now();
  if (LABCTX.onPause) LABCTX.onPause();
  const m = document.createElement("div");
  m.className = "modal lab-pause";
  m.innerHTML = `<div class="modal-card"><div class="big-emoji">⏸</div><h2>Pausado</h2><p>${esc(LABCTX.sim.title)}</p>
    <div class="col"><button class="btn primary block" onclick="labResume()">Continuar</button>
    <button class="btn ghost block" onclick="labResume();labHelp()">Ajuda</button>
    <button class="btn danger-ghost block" onclick="labResume();labQuit(true)">Sair da simulação</button></div></div>`;
  document.body.appendChild(m);
}
function labResume() {
  document.querySelectorAll(".modal.lab-pause").forEach((m) => m.remove());
  if (!LABCTX || !LABCTX.pausedAt) return;
  LABCTX.pausedMs += Date.now() - LABCTX.pausedAt;
  LABCTX.pausedAt = 0;
  if (LABCTX.onResume) LABCTX.onResume();
}
function labHelp() {
  if (!LABCTX) return;
  const m = document.createElement("div");
  m.className = "modal lab-help";
  m.innerHTML = `<div class="modal-card left"><h2>Como jogar</h2><p><b>Objetivo:</b> ${esc(LABCTX.objective || LABCTX.sim.objective)}</p>
    ${LABCTX.help || ""}
    <p class="muted-txt small">Controles 3D: arraste para girar · pinça ou roda do mouse para zoom · toque ou clique para selecionar · setas e +/− no teclado.</p>
    <button class="btn primary block" onclick="this.closest('.modal').remove()">Entendi</button></div>`;
  document.body.appendChild(m);
}
function labQuit(force) {
  const leave = () => { labCleanup(); LABCTX = null; G = null; go("lab"); };
  if (force) return leave();
  ask("Sair da simulação? O progresso desta rodada será perdido.", [{ label: "Sair", cls: "danger", run: leave }]);
}

// ---------- Resultado ----------
// r: { score, max, correct, total, mistakes:[{title, explain, disc, card:{f,b}, mc:{q,o,a,e}}], recs:[ids], notes:[] }
function labFinish(r) {
  const ctx = LABCTX;
  if (!ctx) return;
  const sim = ctx.sim, diff = ctx.diff;
  const ms = labElapsed();
  labCleanup();
  const pct = r.total ? Math.max(0, Math.min(1, r.correct / r.total)) : 0;
  const scorePct = r.max ? Math.max(0, Math.min(1, r.score / r.max)) : pct;
  const first = !(S.lab.best[sim.id] && S.lab.best[sim.id][diff]);
  const gain = Math.round(sim.xp[diff] * (0.3 + 0.7 * scorePct)) + (first ? 20 : 0);

  // Progresso, recordes e histórico
  S.lab.stats.sims++;
  const best = (S.lab.best[sim.id] = S.lab.best[sim.id] || {});
  const record = !best[diff] || r.score > best[diff].score;
  if (record) best[diff] = { score: r.score, pct: Math.round(scorePct * 100), at: Date.now() };
  S.lab.history.unshift({ id: sim.id, title: sim.title, mode: sim.mode, diff, sub: ctx.subLabel || "", score: r.score, pct: Math.round(scorePct * 100), xp: gain, ms, at: Date.now() });
  S.lab.history = S.lab.history.slice(0, 60);
  S.lab.last = null;

  // Pontos fracos (influenciam as recomendações)
  const w = (S.lab.weak[sim.disc] = S.lab.weak[sim.disc] || { miss: 0, n: 0 });
  w.n += r.total || 1; w.miss += Math.max(0, (r.total || 0) - (r.correct || 0));
  (r.mistakes || []).forEach((m) => {
    if (m.disc && m.disc !== sim.disc) { const w2 = (S.lab.weak[m.disc] = S.lab.weak[m.disc] || { miss: 0, n: 0 }); w2.n++; w2.miss++; }
  });

  // Erros viram flashcards (revisão espaçada) e questões do caderno de erros
  const cardIds = [];
  (r.mistakes || []).forEach((m) => {
    if (m.card) {
      const id = "c:lab-" + hashStr(m.card.f).toString(36);
      if (!S.custom.some((c) => c.id === id)) S.custom.unshift({ id, f: m.card.f, b: m.card.b, tag: `Lab · ${discName(m.disc || sim.disc)}` });
      cardIds.push(id);
    }
    if (m.mc) addError({ errKey: "lab:" + hashStr(m.mc.q), q: m.mc.q, o: m.mc.o, a: m.mc.a, e: m.mc.e, tag: discName(m.disc || sim.disc) });
  });
  const labCards = S.custom.filter((c) => c.id.startsWith("c:lab-"));
  if (labCards.length > 300) { const drop = new Set(labCards.slice(300).map((c) => c.id)); S.custom = S.custom.filter((c) => !drop.has(c.id)); }

  bump("lab"); bumpWeek("sims");
  addXp(gain);
  checkMedals(); save(); scheduleSync && scheduleSync();
  if (scorePct >= 0.9) { confetti(); sfx.win(); } else if (scorePct >= 0.5) sfx.win();

  const recs = (r.recs || [sim.disc]).filter((id, i, a) => a.indexOf(id) === i && worldById(id)).slice(0, 3);
  const next = labNextSuggestion(sim, diff, scorePct);
  G = { mode: "result" };
  $app.innerHTML = `
    <div class="lab-result">
      <div class="result-top">
        <div class="big-emoji pop">${scorePct >= 0.9 ? "🏆" : scorePct >= 0.6 ? "🎉" : "💪"}</div>
        <span class="tag">${esc(LAB_MODES[sim.mode].n)} · ${esc(LAB_DIFF[diff].n)}${ctx.subLabel ? " · " + esc(ctx.subLabel) : ""}</span>
        <h1>${esc(sim.title)}</h1>
        ${record ? `<div class="badge">Novo recorde pessoal!</div>` : ""}
      </div>
      <div class="res-grid four">
        <div><b>${r.score}</b><small>pontos${r.max ? ` de ${r.max}` : ""}</small></div>
        <div><b>${Math.round(pct * 100)}%</b><small>acertos (${r.correct}/${r.total})</small></div>
        <div><b>${fmtTime(ms)}</b><small>tempo</small></div>
        <div><b>+${gain}</b><small>XP${first ? " (1ª vez +20)" : ""}</small></div>
      </div>
      ${(r.notes || []).map((n) => `<p class="lab-note">${n}</p>`).join("")}
      ${(r.mistakes || []).length ? `<h2 class="sec">O que revisar <small>${r.mistakes.length}</small></h2>
        <div class="review-list">${r.mistakes.map((m) => `<details class="rev bad"><summary>❌ ${esc(m.title)}</summary><p>${esc(m.explain)}</p></details>`).join("")}</div>
        <p class="muted-txt small">Esses pontos viraram flashcards na sua Revisão do dia${r.mistakes.some((m) => m.mc) ? " e questões no Caderno de erros" : ""}.</p>`
      : `<p class="lab-note">Nenhum erro. Excelente!</p>`}
      ${(r.good || []).length ? `<h2 class="sec">Você acertou</h2><div class="review-list">${r.good.map((g) => `<details class="rev ok"><summary>✅ ${esc(g.title)}</summary><p>${esc(g.explain || "")}</p></details>`).join("")}</div>` : ""}
      ${recs.length ? `<h2 class="sec">Conteúdos recomendados</h2><div class="row wrap">${recs.map((id) => { const wd = worldById(id); return `<button class="btn ghost small-btn" onclick="G=null;go('world','${id}')">${wd.icon} ${esc(wd.name)}</button>`; }).join("")}</div>` : ""}
      <div class="col" style="margin:18px 0 30px">
        ${cardIds.length ? `<button class="btn danger block" id="lr-review">Revisar os erros agora (${cardIds.length} cards)</button>` : ""}
        <button class="btn ghost block" id="lr-again">Jogar de novo</button>
        ${next ? `<button class="btn primary block" id="lr-next">Próximo desafio: ${esc(next.label)}</button>` : ""}
        <button class="btn ghost block" onclick="G=null;go('lab')">Voltar ao Lab</button>
      </div>
      <p class="muted-txt small center">Simulação educacional complementar. Não substitui aulas práticas, treinamento supervisionado ou orientação profissional.</p>
    </div>`;
  const rv = document.getElementById("lr-review");
  if (rv) rv.onclick = () => { G = null; startFlashRunner({ title: "🔁 Erros do Lab", queue: cardIds.slice(), back: () => go("lab"), restart: null, xp: 0, review: true }); };
  document.getElementById("lr-again").onclick = () => { G = null; labLaunch(sim.id, diff, ctx.sub); };
  const nx = document.getElementById("lr-next");
  if (nx) nx.onclick = () => { G = null; next.run(); };
  LABCTX = null;
  window.scrollTo(0, 0);
}
function labNextSuggestion(sim, diff, pct) {
  const order = ["ini", "int", "adv"];
  const i = order.indexOf(diff);
  if (pct >= 0.7 && i < 2) return { label: `${sim.title} · ${LAB_DIFF[order[i + 1]].n}`, run: () => labLaunch(sim.id, order[i + 1]) };
  const rec = labRecommend(4).find((x) => x.s.id !== sim.id);
  return rec ? { label: rec.s.title, run: () => labOpen(rec.s.id) } : null;
}

// ---------- Ilustrações dos cards (SVG próprio) ----------
function labArt(sim) {
  const c = discColor(sim.disc);
  const icon = sim.icon || LAB_MODES[sim.mode].icon;
  return `<svg viewBox="0 0 160 90" class="lab-art" aria-hidden="true">
    <defs><linearGradient id="g-${sim.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="#0b1220"/></linearGradient></defs>
    <rect width="160" height="90" fill="url(#g-${sim.id})"/>
    <g opacity=".18" stroke="#fff" stroke-width="1">${Array.from({ length: 8 }, (_, i) => `<line x1="${i * 22}" y1="0" x2="${i * 22 - 40}" y2="90"/>`).join("")}</g>
    <circle cx="122" cy="44" r="30" fill="#ffffff22"/>
    <text x="122" y="56" font-size="34" text-anchor="middle">${icon}</text>
    <text x="12" y="78" font-size="10" fill="#ffffffcc" font-family="Nunito, sans-serif" font-weight="800">${esc(LAB_MODES[sim.mode].n.toUpperCase())}</text>
  </svg>`;
}
function discColor(id) { const w = worldById(id); return w ? w.color : id === "radio" ? "#64748b" : "#22d3ee"; }

// ---------- Telas ----------
function labScreen() {
  const last = S.lab.last && labSim(S.lab.last.id);
  const recs = labRecommend(3);
  const f = S.lab.filter;
  const sims = LAB.sims.filter(labVisible).filter((s) => (!f.disc || s.disc === f.disc) && (!f.mode || s.mode === f.mode));
  const discs = LAB_DISC.filter(([id]) => LAB.sims.some((s) => s.disc === id && labVisible(s)));
  const hist = S.lab.history.slice(0, 8);
  const claimedW = Object.keys(S.lab.weekly.claimed || {}).length;
  return `
    <section class="lab-hero">
      <div>
        <span class="tag">MedQuest Lab</span>
        <h1>Laboratório de simulações</h1>
        <p>Explore o corpo em 3D, encontre erros em ambientes hospitalares, atenda pacientes fictícios e treine estações práticas.</p>
      </div>
      <div class="lab-hero-stats">
        <div><b>${S.lab.stats.sims}</b><small>simulações</small></div>
        <div><b>${S.lab.stats.errorsFound}</b><small>erros achados</small></div>
        <div><b>${S.lab.stats.cases}</b><small>pacientes</small></div>
      </div>
    </section>
    ${last ? `<button class="cta" onclick="labLaunch('${last.id}','${S.lab.last.diff}','${S.lab.last.sub || ""}')"><span class="cta-ic">▶️</span><span class="cta-txt"><b>Continuar: ${esc(last.title)}</b><small>${esc(LAB_DIFF[S.lab.last.diff].n)} · retomar a última simulação</small></span><span class="cta-go">›</span></button>` : ""}
    <p class="lab-disclaimer">⚠️ Simulações educacionais complementares. Não substituem aulas práticas, treinamento clínico supervisionado nem orientação médica. ${S.lab.prod ? "" : "Conteúdo em versão beta, aguardando revisão por profissionais."}</p>

    <div class="lab-two">
      <div class="panel">
        <div class="panel-h"><span class="p-ic">🗓️</span><div><b>Missões da semana</b><small>Renovam toda segunda-feira</small></div></div>
        ${weeklyMissions().map((m) => `
          <div class="mission ${m.claimed ? "claimed" : ""}"><span class="m-ic">${m.icon}</span>
            <div class="m-body"><span>${esc(m.t)}</span><span class="bar small"><span style="width:${Math.round((m.p / m.n) * 100)}%"></span></span><small>${m.p}/${m.n} · +${m.r} XP</small></div>
            ${m.claimed ? `<span class="m-ok">✓</span>` : m.done ? `<button class="btn gold small-btn" onclick="claimWeekly('${m.id}')">Resgatar</button>` : ""}
          </div>`).join("")}
        <p class="muted-txt small">Missões semanais concluídas nesta semana: ${claimedW}</p>
      </div>
      <div class="panel">
        <div class="panel-h"><span class="p-ic">✨</span><div><b>Recomendadas para você</b><small>${hasGrade() ? esc(semLabel()) + " · pontos fracos" : "Escolha seu período para recomendações melhores"}</small></div></div>
        ${recs.map((r) => `<button class="rec-row" onclick="labOpen('${r.s.id}')"><span class="rec-ic">${r.s.icon || LAB_MODES[r.s.mode].icon}</span><span><b>${esc(r.s.title)}</b><small>${esc(discName(r.s.disc))} · ${esc(r.why)}</small></span><span class="cta-go">›</span></button>`).join("") || `<p class="muted-txt">Nada para recomendar agora.</p>`}
      </div>
    </div>

    <h2 class="sec">Simulações</h2>
    <div class="filter-chips">
      <button class="fchip ${!f.mode ? "on" : ""}" onclick="S.lab.filter.mode='';save();rerender()">Todas</button>
      ${Object.entries(LAB_MODES).map(([k, m]) => `<button class="fchip ${f.mode === k ? "on" : ""}" onclick="S.lab.filter.mode='${k}';save();rerender()">${m.icon} ${esc(m.n)}</button>`).join("")}
    </div>
    <div class="filter-chips">
      <button class="fchip ${!f.disc ? "on" : ""}" onclick="S.lab.filter.disc='';save();rerender()">Todas as disciplinas</button>
      ${discs.map(([id, n]) => `<button class="fchip ${f.disc === id ? "on" : ""}" onclick="S.lab.filter.disc='${id}';save();rerender()">${esc(n)}</button>`).join("")}
    </div>
    <div class="lab-grid">
      ${sims.map(labCardHtml).join("") || `<p class="muted-txt">Nenhuma simulação com esse filtro.</p>`}
    </div>

    <h2 class="sec">Em breve</h2>
    <div class="lab-grid soon">
      ${LAB_SOON.map((s) => `<div class="lab-card locked"><div class="soon-art">${s.icon}</div><div class="lc-body"><b>${esc(s.n)}</b><small>${esc(s.d)}</small><span class="tag">🔒 Em desenvolvimento</span></div></div>`).join("")}
    </div>

    <h2 class="sec">Histórico de desempenho</h2>
    ${hist.length ? `<div class="panel">${hist.map((h) => `
      <div class="subrow"><span>${esc(h.title)} <small>· ${esc(LAB_DIFF[h.diff].n)} · ${new Date(h.at).toLocaleDateString("pt-BR")}</small></span>
      <span class="bar small"><span style="width:${h.pct}%;background:${h.pct >= 70 ? "var(--ok)" : h.pct >= 50 ? "var(--gold)" : "var(--bad)"}"></span></span><b>${h.pct}%</b></div>`).join("")}</div>`
    : `<p class="muted-txt">Seu histórico aparece aqui depois da primeira simulação.</p>`}

    <div class="row wrap center-row" style="margin:18px 0">
      <label class="switch-row inline"><span>🖥️ Modo leve (2D)</span><input type="checkbox" ${S.lab.force2d ? "checked" : ""} onchange="S.lab.force2d=this.checked;save()"></label>
      <button class="btn ghost small-btn" onclick="go('labadmin')">⚙️ Área de conteúdo</button>
    </div>`;
}

function labCardHtml(s) {
  const best = S.lab.best[s.id] || {};
  const done = ["ini", "int", "adv"].filter((d) => best[d]).length;
  const rv = labReview(s);
  return `
    <button class="lab-card" onclick="labOpen('${s.id}')" style="--c:${discColor(s.disc)}">
      ${labArt(s)}
      <div class="lc-body">
        <b>${esc(s.title)}</b>
        <small>${esc(discName(s.disc))} · ${esc(s.category)}</small>
        <div class="lc-meta"><span>⏱ ${s.time.ini}–${s.time.adv} min</span><span>✨ até ${s.xp.adv} XP</span></div>
        <div class="lc-diff">${["ini", "int", "adv"].map((d) => `<i class="${best[d] ? "on" : ""}" title="${LAB_DIFF[d].n}${best[d] ? ": " + best[d].pct + "%" : ""}"></i>`).join("")}<small>${done}/3 níveis</small></div>
        ${rv.status === "revisado" ? `<span class="tag ok">✔ Revisado</span>` : `<span class="tag warn">Beta · revisão pendente</span>`}
      </div>
    </button>`;
}

// Abre o painel de escolha de nível (e de modalidade, quando houver)
function labOpen(id) {
  const s = labSim(id);
  if (!s) return;
  const best = S.lab.best[s.id] || {};
  const m = document.createElement("div");
  m.className = "modal lab-open";
  let diff = best.adv ? "adv" : best.int ? "adv" : best.ini ? "int" : "ini";
  let sub = s.subs ? s.subs[0].id : null;
  const render = () => {
    m.innerHTML = `
      <div class="modal-card left wide">
        <div class="lo-head">${labArt(s)}</div>
        <span class="tag">${esc(LAB_MODES[s.mode].n)} · ${esc(discName(s.disc))}</span>
        <h2>${esc(s.title)}</h2>
        <p>${esc(s.desc)}</p>
        <p><b>Objetivo:</b> ${esc(s.objective)}</p>
        ${s.subs ? `<label class="lbl">Modalidade</label><div class="filter-chips">${s.subs.map((x) => `<button class="fchip ${sub === x.id ? "on" : ""}" data-sub="${x.id}">${esc(x.n)}</button>`).join("")}</div>
          <p class="muted-txt small">${esc((s.subs.find((x) => x.id === sub) || {}).d || "")}</p>` : ""}
        <label class="lbl">Nível de dificuldade</label>
        <div class="diff-pick">${["ini", "int", "adv"].map((d) => `<button class="${diff === d ? "on" : ""}" data-diff="${d}"><b>${LAB_DIFF[d].n}</b><small>${esc((s.diffs && s.diffs[d]) || LAB_DIFF[d].d)}</small><span>⏱ ${s.time[d]} min · ✨ ${s.xp[d]} XP${best[d] ? ` · 🏅 ${best[d].pct}%` : ""}</span></button>`).join("")}</div>
        <div class="col" style="margin-top:12px">
          <button class="btn primary block" data-go="1">Iniciar simulação</button>
          <button class="btn ghost block" data-close="1">Voltar</button>
        </div>
      </div>`;
    m.querySelectorAll("[data-diff]").forEach((b) => (b.onclick = () => { diff = b.dataset.diff; render(); }));
    m.querySelectorAll("[data-sub]").forEach((b) => (b.onclick = () => { sub = b.dataset.sub; render(); }));
    m.querySelector("[data-close]").onclick = () => m.remove();
    m.querySelector("[data-go]").onclick = () => { m.remove(); labLaunch(s.id, diff, sub); };
  };
  render();
  m.addEventListener("click", (e) => { if (e.target === m) m.remove(); });
  document.body.appendChild(m);
}
async function labLaunch(id, diff, sub) {
  const s = labSim(id);
  if (!s) return;
  try { await s.launch(diff, sub || (s.subs ? s.subs[0].id : null)); }
  catch (e) {
    console.error(e);
    labCleanup(); G = null; LABCTX = null; go("lab");
    toast("⚠️ Não foi possível abrir a simulação em 3D. Tente o modo leve (2D).");
  }
}

// ---------- Área administrativa de conteúdo ----------
function labAdminScreen() {
  const rows = LAB.sims.map((s) => {
    const rv = labReview(s);
    const errs = s.validate ? s.validate() : [];
    return `<div class="adm-row">
      <div><b>${esc(s.title)}</b><small>${esc(s.id)} · ${esc(LAB_MODES[s.mode].n)} · ${esc(discName(s.disc))} · ${s.count ? s.count() + " itens" : ""}</small>
      <small>Revisão: <b class="${rv.status === "revisado" ? "ok-txt" : "warn-txt"}">${esc(rv.status)}</b>${rv.by ? ` por ${esc(rv.by)} em ${new Date(rv.at).toLocaleDateString("pt-BR")}` : ""} · Fontes: ${esc((s.refs || []).join("; ") || "—")}</small>
      ${errs.length ? `<small class="bad-txt">⚠️ ${errs.length} problema(s): ${esc(errs.slice(0, 3).join(" | "))}</small>` : `<small class="ok-txt">✔ Estrutura válida</small>`}</div>
      <div class="adm-act">
        ${rv.status === "revisado" ? `<button class="btn ghost small-btn" onclick="labSetReview('${s.id}',false)">Marcar pendente</button>` : `<button class="btn accent small-btn" onclick="labSetReview('${s.id}',true)">Registrar revisão</button>`}
        <button class="btn ghost small-btn" onclick="labShowJson('${s.id}')">Ver dados</button>
      </div></div>`;
  }).join("");
  return `
    <div class="sub-head"><button class="back" onclick="go('lab')">‹</button><h1>Área de conteúdo do Lab</h1></div>
    <div class="panel">
      <p>Aqui a equipe gerencia as simulações: valida a estrutura dos dados, registra a revisão médica e adiciona conteúdos novos.</p>
      <label class="switch-row"><span>🔒 Modo produção: mostrar só conteúdos revisados</span><input type="checkbox" ${S.lab.prod ? "checked" : ""} onchange="S.lab.prod=this.checked;save();rerender()"></label>
      <p class="muted-txt small">Nesta versão sem servidor, revisões e conteúdos importados ficam salvos só neste navegador. Para uso real, conecte essa área a um banco de dados com login de revisores.</p>
    </div>
    <h2 class="sec">Simulações (${LAB.sims.length})</h2>
    <div class="panel">${rows}</div>
    <h2 class="sec">Adicionar conteúdo (JSON)</h2>
    <div class="panel">
      <p class="muted-txt small">Tipos aceitos: <code>osce</code> (estação), <code>ward</code> (caso do plantão), <code>error</code> (cenário de Encontre o erro). Use “Ver dados” numa simulação existente como modelo.</p>
      <textarea id="adm-json" rows="8" placeholder='{"type":"osce","item":{ ... }}'></textarea>
      <button class="btn primary block" onclick="labImport()">Validar e adicionar</button>
      ${Object.entries(S.lab.custom || {}).map(([t, list]) => list.length ? `<p class="small">Importados (${esc(t)}): ${list.map((x) => esc(x.title || x.id)).join(", ")} <button class="btn ghost small-btn" onclick="S.lab.custom['${t}']=[];save();location.reload()">Remover</button></p>` : "").join("")}
    </div>`;
}
function labSetReview(id, ok) {
  if (!ok) { delete S.lab.review[id]; save(); return rerender(); }
  const m = document.createElement("div");
  m.className = "modal";
  m.innerHTML = `<div class="modal-card left"><h2>Registrar revisão médica</h2><p>Confirme que um profissional qualificado revisou todas as respostas e explicações desta simulação.</p>
    <label class="lbl" for="rv-by">Nome e registro do revisor</label><input id="rv-by" placeholder="Ex.: Dra. Fulana – CRM 00000">
    <div class="col" style="margin-top:12px"><button class="btn primary block" id="rv-ok">Registrar</button><button class="btn ghost block" onclick="this.closest('.modal').remove()">Cancelar</button></div></div>`;
  document.body.appendChild(m);
  m.querySelector("#rv-ok").onclick = () => {
    const by = m.querySelector("#rv-by").value.trim();
    if (by.length < 5) return toast("Informe o nome e o registro do revisor.");
    S.lab.review[id] = { status: "revisado", by: by.slice(0, 80), at: Date.now() };
    save(); m.remove(); rerender();
  };
}
function labShowJson(id) {
  const s = labSim(id);
  const data = s && s.data ? s.data() : {};
  const m = document.createElement("div");
  m.className = "modal";
  m.innerHTML = `<div class="modal-card left wide"><h2>${esc(s.title)}</h2><pre class="json">${esc(JSON.stringify(data, null, 2).slice(0, 20000))}</pre>
    <button class="btn ghost block" onclick="this.closest('.modal').remove()">Fechar</button></div>`;
  document.body.appendChild(m);
}
const LAB_IMPORTERS = {}; // type -> { validate(item) -> [erros], add(item) }
function labImport() {
  let obj;
  try { obj = JSON.parse(document.getElementById("adm-json").value); } catch (e) { return toast("JSON inválido: " + esc(e.message)); }
  const imp = LAB_IMPORTERS[obj && obj.type];
  if (!imp) return toast("Tipo desconhecido. Use osce, ward ou error.");
  const errs = imp.validate(obj.item || {});
  if (errs.length) return toast("⚠️ " + esc(errs.slice(0, 3).join(" | ")));
  (S.lab.custom[obj.type] = S.lab.custom[obj.type] || []).push(obj.item);
  save(); imp.add(obj.item);
  toast("Conteúdo adicionado como revisão pendente ✅"); rerender();
}
function labLoadCustom() {
  Object.entries(S.lab.custom || {}).forEach(([t, list]) => { const imp = LAB_IMPORTERS[t]; if (imp) list.forEach((it) => { try { if (!imp.validate(it).length) imp.add(it); } catch (e) {} }); });
}

// ---------- Utilidades de interface compartilhadas ----------
function labSceneShell(o) {
  // Estrutura padrão: HUD + área 3D + painel lateral (vira inferior no celular)
  return `<div class="lab-stage">
    ${labHud(o)}
    <div class="lab-body">
      <div class="lab-view" id="lab-view">${o.viewInner || ""}${o.noCam ? "" : camControlsHtml(o.camExtra || "")}<div class="lab-toast" id="lab-toast"></div></div>
      <aside class="lab-side" id="lab-side">${o.side || ""}</aside>
    </div>
  </div>`;
}
function labFlash(msg, ok) {
  const t = document.getElementById("lab-toast");
  if (!t) return;
  t.className = "lab-toast show " + (ok === true ? "ok" : ok === false ? "bad" : "");
  t.innerHTML = msg;
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.className = "lab-toast"; }, 1800);
}
function setSide(html) { const s = document.getElementById("lab-side"); if (s) s.innerHTML = html; }
function setScore(v) { const s = document.getElementById("hud-score"); if (s) { s.textContent = v; s.parentElement.classList.remove("bump"); void s.offsetWidth; s.parentElement.classList.add("bump"); } }
function setProgress(p) { const b = document.querySelector(".lab-hud .bar span"); if (b) b.style.width = Math.round(p * 100) + "%"; }
