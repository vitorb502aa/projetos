/* MedQuest: núcleo (estado, utilidades, XP, missões, medalhas, avatar, revisão espaçada). */
"use strict";

// ---------- Constantes ----------
const STORE = "medquest_v1";
const MIN = 60 * 1000;
const DAY = 24 * 60 * MIN;
const DAILY_GOAL = 60;
const TF_SECONDS = 10;
const CLOCK_SECONDS = 60;
const POMO_FOCUS = 25 * MIN;
const POMO_BREAK = 5 * MIN;

const CYCLES = [
  { id: "basico", name: "Ciclo básico", icon: "📘" },
  { id: "clinico", name: "Ciclo clínico", icon: "🩺" },
  { id: "meu", name: "Meus materiais", icon: "📚" }
];

const STAGES = [
  { key: "flash", name: "Flashcards", icon: "🃏", method: "Recordação ativa + revisão espaçada", has: (w) => (w.flashcards || []).length > 0 },
  { key: "quiz", name: "Quiz", icon: "❓", method: "Múltipla escolha · 3 vidas", has: (w) => (w.quiz || []).length > 0 },
  { key: "tf", name: "Verdadeiro ou Falso", icon: "⚡", method: "Rodada relâmpago · 10 s por pergunta", has: (w) => (w.tf || []).length > 0 },
  { key: "pairs", name: "Ligue os pares", icon: "🔗", method: "Associação de conceitos", has: (w) => (w.pairs || []).length >= 3 },
  { key: "puzzle", name: "Quebra-cabeça", icon: "🧩", method: "Monte estruturas e processos na ordem", has: (w) => (w.seq || []).length > 0 },
  { key: "boss", name: "Chefão: caso clínico", icon: "👑", method: "Aplicação clínica · 2 vidas", has: (w) => (w.cases || []).length > 0 }
];

const TITLES = [
  [1, "Calouro(a)"], [3, "Monitor(a)"], [5, "Interno(a)"], [8, "Residente R1"],
  [11, "Residente R2"], [14, "Residente R3"], [18, "Especialista"], [23, "Preceptor(a)"], [30, "Lenda do Plantão"]
];

// ---------- Utilidades ----------
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function rng(seed) { // mulberry32: números aleatórios reproduzíveis (mesmo desafio para todos)
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function shuffle(arr, rand = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const newSeed = () => Math.floor(Math.random() * 2 ** 31);
const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => dayStr();
const yesterday = () => dayStr(new Date(Date.now() - DAY));
function weekKey(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const wd = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - wd);
  const y = t.getUTCFullYear();
  const w = Math.ceil(((t - Date.UTC(y, 0, 1)) / DAY + 1) / 7);
  return `${y}-W${String(w).padStart(2, "0")}`;
}
const starStr = (n, max = 3) => "★".repeat(n) + "☆".repeat(Math.max(0, max - n));
const fmtTime = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };

// ---------- Estado ----------
function defaultState() {
  return {
    xp: 0, streak: 0, bestStreak: 0, lastDay: null,
    stages: {}, srs: {}, errors: [], custom: [], materials: [], medals: {},
    stats: { answered: 0, correct: 0, reviews: 0, pomodoros: 0, bestCombo: 0, cleared: 0, puzzles: 0, bosses: 0, sims: 0, battles: 0, materials: 0, missions: 0, clockGames: 0 },
    records: { clock: 0 },
    day: { date: null },
    missions: { date: null, claimed: {}, notified: {}, bonus: false },
    week: { key: null, xp: 0 },
    avatar: { base: 0, skin: 0, bg: 0, acc: 1, frame: 0 },
    nick: "", sims: [], online: { battles: {}, results: {} },
    semester: null, grade: null, semAsked: false,
    ui: { cycle: "basico", clockScope: "all", battleScope: "all", errTag: "", errSort: "count" },
    sound: true, onboarded: false
  };
}
function loadState() {
  const d = defaultState();
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return d;
    const s = Object.assign(d, JSON.parse(raw));
    for (const k of ["stats", "records", "missions", "week", "avatar", "online", "ui"]) s[k] = Object.assign(defaultState()[k], s[k]);
    if (s.daily && !s.day.date) s.day = { date: s.daily.date, xp: s.daily.xp }; // versão anterior
    delete s.daily; delete s.ach;
    s.bestStreak = Math.max(s.bestStreak || 0, s.streak || 0);
    s.errors = (s.errors || []).map((e) => Object.assign({ count: 1, at: Date.now() }, e));
    return s;
  } catch (e) { return d; }
}
let S = loadState();
function save() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* armazenamento indisponível */ } }

// ---------- Mundos ----------
const allWorlds = () => window.WORLDS.concat(S.materials);
const worldById = (id) => allWorlds().find((w) => w.id === id);
const worldsOfCycle = (c) => allWorlds().filter((w) => (w.cycle || "meu") === c);
const stagesOf = (w) => STAGES.filter((st) => st.has(w));
const starsOf = (wid, key) => S.stages[`${wid}:${key}`] || 0;
const worldStars = (w) => stagesOf(w).reduce((t, st) => t + starsOf(w.id, st.key), 0);
const totalStars = () => Object.values(S.stages).reduce((a, b) => a + b, 0);
function stageUnlocked(w, key) {
  const list = stagesOf(w);
  const i = list.findIndex((s) => s.key === key);
  return i <= 0 || starsOf(w.id, list[i - 1].key) >= 1;
}

// ---------- Semestre do aluno ----------
function defaultGrade(sem) {
  if (!sem) return [];
  const g = window.GRADE_PADRAO || {};
  return (sem >= 9 ? g.internato : g[sem]) || [];
}
const myGrade = () => (S.grade || defaultGrade(S.semester)).filter((id) => worldById(id));
const hasGrade = () => myGrade().length > 0;
const semLabel = (sem = S.semester) => !sem ? "Período não definido" : sem >= 9 ? `${sem}º período · Internato` : `${sem}º período`;
// "sem" depende de quem joga; para desafios e batalhas, vira uma lista fixa de matérias.
const concreteScope = (scope) => (scope === "sem" ? "L:" + myGrade().join(",") : scope);
function scopeIds(scope) {
  if (scope === "sem") return myGrade();
  if (typeof scope === "string" && scope.startsWith("L:")) return scope.slice(2).split(",").filter(Boolean);
  return null;
}

// Converte o conteúdo dos mundos em perguntas de múltipla escolha.
function questionPool(scope = "all", kinds = ["quiz", "tf", "case"]) {
  const ids = scopeIds(scope);
  const worlds = ids ? allWorlds().filter((w) => ids.includes(w.id))
    : scope === "all" ? allWorlds()
    : CYCLES.some((c) => c.id === scope) ? worldsOfCycle(scope)
    : allWorlds().filter((w) => w.id === scope);
  const pool = [];
  worlds.forEach((w) => {
    if (kinds.includes("quiz")) (w.quiz || []).forEach((it, i) => pool.push({ q: it.q, o: it.o, a: it.a, e: it.e, errKey: `${w.id}:quiz:${i}`, tag: w.name, wid: w.id }));
    if (kinds.includes("tf")) (w.tf || []).forEach((it, i) => pool.push({ q: `Verdadeiro ou falso? ${it.s}`, o: ["Verdadeiro", "Falso"], a: it.v ? 0 : 1, e: it.e, noShuffle: true, errKey: `${w.id}:tf:${i}`, tag: w.name, wid: w.id }));
    if (kinds.includes("case")) (w.cases || []).forEach((c) => c.steps.forEach((st, i) => pool.push({ q: `${c.story} ${st.q}`, o: st.o, a: st.a, e: st.e, errKey: `${w.id}:case:${c.title}:${i}`, tag: w.name, wid: w.id })));
  });
  return pool;
}
// Embaralha alternativas e guarda o índice da resposta certa.
function prepItem(it, rand = Math.random) {
  const perm = it.noShuffle ? it.o.map((_, i) => i) : shuffle(it.o.map((_, i) => i), rand);
  return { ...it, opts: perm.map((i) => it.o[i]), ans: perm.indexOf(it.a) };
}
function scopeLabel(scope) {
  if (scope === "all") return "Todas as matérias";
  const ids = scopeIds(scope);
  if (ids) {
    const mine = myGrade();
    if (ids.length === mine.length && ids.every((i) => mine.includes(i))) return "Meu semestre";
    return ids.length === 1 && worldById(ids[0]) ? worldById(ids[0]).name : `${ids.length} matérias`;
  }
  const c = CYCLES.find((x) => x.id === scope);
  if (c) return c.name;
  const w = worldById(scope);
  return w ? w.name : "Matérias";
}
function scopeOptions(selected) {
  const opt = (v, l) => `<option value="${esc(v)}" ${v === selected ? "selected" : ""}>${esc(l)}</option>`;
  let h = (hasGrade() ? opt("sem", `⭐ Meu semestre (${semLabel()})`) : "") + opt("all", "🌐 Todas as matérias") + opt("basico", "📘 Ciclo básico") + opt("clinico", "🩺 Ciclo clínico");
  CYCLES.forEach((c) => {
    const ws = worldsOfCycle(c.id).filter((w) => questionPool(w.id).length);
    if (ws.length) h += `<optgroup label="${esc(c.name)}">${ws.map((w) => opt(w.id, `${w.icon} ${w.name}`)).join("")}</optgroup>`;
  });
  return h;
}

// ---------- Níveis, sequência e XP ----------
function levelInfo(xp = S.xp) {
  let lvl = 1, need = 100, rest = xp;
  while (rest >= need) { rest -= need; lvl++; need += 50; }
  let title = TITLES[0][1];
  for (const [l, t] of TITLES) if (lvl >= l) title = t;
  return { lvl, cur: rest, need, pct: Math.round((rest / need) * 100), title };
}
const currentStreak = () => (S.lastDay === today() || S.lastDay === yesterday() ? S.streak : 0);
function ensureDay() {
  const t = today();
  if (S.day.date !== t) S.day = { date: t };
  if (S.missions.date !== t) S.missions = { date: t, claimed: {}, notified: {}, bonus: false };
}
const dayVal = (k) => { ensureDay(); return S.day[k] || 0; };
const weekXp = () => (S.week.key === weekKey() ? S.week.xp : 0);

function addXp(n) {
  if (!n || n <= 0) return;
  const before = levelInfo();
  S.xp += n;
  ensureDay();
  const wasBelow = (S.day.xp || 0) < DAILY_GOAL;
  const t = today();
  if (S.lastDay !== t) {
    S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1;
    S.lastDay = t;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
  }
  const wk = weekKey();
  if (S.week.key !== wk) S.week = { key: wk, xp: 0 };
  S.week.xp += n;
  bump("xp", n);
  if (wasBelow && S.day.xp >= DAILY_GOAL) toast("🎯 Meta diária de XP batida!", "gold");
  const after = levelInfo();
  if (after.lvl > before.lvl) {
    sfx.level();
    toast(after.title !== before.title ? `🎉 Nível ${after.lvl}! Agora você é <b>${esc(after.title)}</b>` : `🎉 Você subiu para o nível ${after.lvl}!`, "gold");
  }
  checkMedals();
  save();
  if (typeof scheduleSync === "function") scheduleSync();
}

// ---------- Missões diárias ----------
const MISSIONS = [
  { id: "xp", t: "Ganhe 100 XP", k: "xp", n: 100, r: 30, icon: "✨" },
  { id: "stages", t: "Complete 2 fases", k: "stages", n: 2, r: 25, icon: "🗺️" },
  { id: "cards", t: "Revise 15 flashcards", k: "cards", n: 15, r: 25, icon: "🃏" },
  { id: "correct", t: "Acerte 20 questões", k: "correct", n: 20, r: 25, icon: "✅" },
  { id: "clock", t: "Jogue 1 Contra o relógio", k: "clock", n: 1, r: 20, icon: "⏱️" },
  { id: "puzzles", t: "Monte 2 quebra-cabeças", k: "puzzles", n: 2, r: 20, icon: "🧩" },
  { id: "errors", t: "Corrija 3 questões do caderno de erros", k: "errors", n: 3, r: 25, icon: "🧹" },
  { id: "pomos", t: "Complete 1 Pomodoro", k: "pomos", n: 1, r: 30, icon: "🍅" },
  { id: "perfect", t: "Ganhe 3 estrelas em uma fase", k: "perfect", n: 1, r: 30, icon: "⭐" },
  { id: "battle", t: "Jogue 1 batalha ou desafio", k: "battle", n: 1, r: 25, icon: "⚔️" },
  { id: "sim", t: "Faça 1 simulado", k: "sim", n: 1, r: 40, icon: "📝" }
];
function todayMissions() {
  ensureDay();
  const rand = rng(hashStr("missoes-" + today()));
  const others = shuffle(MISSIONS.slice(1), rand).slice(0, 2);
  return [MISSIONS[0]].concat(others).map((m) => {
    const p = Math.min(m.n, S.day[m.k] || 0);
    return { ...m, p, done: p >= m.n, claimed: !!S.missions.claimed[m.id] };
  });
}
function bump(k, n = 1) {
  ensureDay();
  S.day[k] = (S.day[k] || 0) + n;
  todayMissions().forEach((m) => {
    if (m.done && !S.missions.notified[m.id]) {
      S.missions.notified[m.id] = true;
      toast(`${m.icon} Missão cumprida: <b>${esc(m.t)}</b>. Resgate no Mapa!`, "gold");
    }
  });
}
function claimMission(id) {
  const m = todayMissions().find((x) => x.id === id);
  if (!m || !m.done || m.claimed) return;
  S.missions.claimed[id] = true;
  S.stats.missions++;
  sfx.win();
  toast(`+${m.r} XP pela missão!`, "gold");
  addXp(m.r);
  if (todayMissions().every((x) => x.claimed) && !S.missions.bonus) {
    S.missions.bonus = true;
    confetti();
    toast("🎁 Baú diário aberto: +50 XP!", "gold");
    addXp(50);
  }
  save(); rerender();
}

// ---------- Medalhas (bronze, prata e ouro) ----------
const TIERS = [null, { n: "Bronze", c: "#cd7f32" }, { n: "Prata", c: "#cbd5e1" }, { n: "Ouro", c: "#facc15" }];
const MEDALS = [
  { id: "streak", icon: "🔥", name: "Constância", unit: "dias seguidos", v: () => S.bestStreak, t: [3, 7, 30] },
  { id: "correct", icon: "💯", name: "Acertos", unit: "questões certas", v: () => S.stats.correct, t: [50, 250, 1000] },
  { id: "reviews", icon: "🃏", name: "Memória", unit: "revisões de flashcards", v: () => S.stats.reviews, t: [30, 150, 500] },
  { id: "stars", icon: "⭐", name: "Estrelas", unit: "estrelas", v: () => totalStars(), t: [10, 60, 180] },
  { id: "boss", icon: "👑", name: "Caçador(a) de chefões", unit: "casos clínicos vencidos", v: () => S.stats.bosses, t: [1, 5, 15] },
  { id: "clock", icon: "⏱️", name: "Relâmpago", unit: "pontos no Contra o relógio", v: () => S.records.clock, t: [100, 250, 500] },
  { id: "puzzle", icon: "🧩", name: "Montador(a)", unit: "quebra-cabeças montados", v: () => S.stats.puzzles, t: [3, 15, 40] },
  { id: "sim", icon: "📝", name: "Simulados", unit: "simulados feitos", v: () => S.stats.sims, t: [1, 5, 15] },
  { id: "battle", icon: "⚔️", name: "Duelista", unit: "batalhas e desafios", v: () => S.stats.battles, t: [1, 5, 20] },
  { id: "missions", icon: "🎯", name: "Missões", unit: "missões cumpridas", v: () => S.stats.missions, t: [3, 15, 50] },
  { id: "errors", icon: "🧹", name: "Revisor(a)", unit: "erros corrigidos", v: () => S.stats.cleared, t: [5, 25, 100] },
  { id: "pomo", icon: "🍅", name: "Foco", unit: "pomodoros", v: () => S.stats.pomodoros, t: [1, 10, 40] },
  { id: "author", icon: "✍️", name: "Autor(a)", unit: "cards criados", v: () => S.custom.length, t: [5, 25, 100] },
  { id: "material", icon: "📚", name: "Bibliotecário(a)", unit: "materiais transformados em jogo", v: () => S.stats.materials, t: [1, 3, 10] },
  { id: "combo", icon: "⚡", name: "Em chamas", unit: "acertos seguidos", v: () => S.stats.bestCombo, t: [5, 10, 20] },
  { id: "level", icon: "🎓", name: "Carreira", unit: "nível", v: () => levelInfo().lvl, t: [5, 10, 20] }
];
function medalTier(m) { const v = m.v(); return m.t.filter((x) => v >= x).length; }
function checkMedals() {
  MEDALS.forEach((m) => {
    const tier = medalTier(m);
    if (tier > (S.medals[m.id] || 0)) {
      S.medals[m.id] = tier;
      toast(`🏅 Medalha de <b>${TIERS[tier].n}</b>: ${m.icon} ${esc(m.name)}`, "gold");
    }
  });
}
const medalCount = (minTier = 1) => Object.values(S.medals).filter((t) => t >= minTier).length;

// ---------- Avatar personalizável ----------
const AV = {
  base: ["🧑‍⚕️", "👩‍⚕️", "👨‍⚕️", "🧑‍🎓", "👩‍🎓", "👨‍🎓", "🧑‍🔬", "🦸"],
  skin: ["", "🏻", "🏼", "🏽", "🏾", "🏿"],
  bg: ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#4ade80", "#fb923c", "#38bdf8", "#f43f5e", "#94a3b8", "#1e293b"],
  acc: [
    { e: "", lvl: 1, n: "Nenhum" }, { e: "🩺", lvl: 1, n: "Estetoscópio" }, { e: "🧠", lvl: 3, n: "Cérebro" },
    { e: "🫀", lvl: 5, n: "Coração" }, { e: "💉", lvl: 7, n: "Seringa" }, { e: "🔬", lvl: 9, n: "Microscópio" },
    { e: "🎓", lvl: 12, n: "Capelo" }, { e: "👑", lvl: 15, n: "Coroa" }, { e: "🏆", lvl: 20, n: "Troféu" }
  ],
  frame: [
    { n: "Sem moldura", c: "transparent", ok: () => true, req: "" },
    { n: "Bronze", c: "#cd7f32", ok: () => medalCount(1) >= 3, req: "3 medalhas" },
    { n: "Prata", c: "#cbd5e1", ok: () => S.bestStreak >= 7, req: "7 dias seguidos" },
    { n: "Ouro", c: "#facc15", ok: () => levelInfo().lvl >= 10, req: "nível 10" },
    { n: "Diamante", c: "#67e8f9", ok: () => medalCount(3) >= 5, req: "5 medalhas de ouro" }
  ]
};
function avatarEmoji(av) {
  const chars = [...(AV.base[av.base] || AV.base[0])];
  if (av.base === 7) return chars.join(""); // super-herói não leva tom de pele neste conjunto
  return chars[0] + (AV.skin[av.skin] || "") + chars.slice(1).join("");
}
function avatarHtml(av = S.avatar, size = 44) {
  const a = Object.assign({ base: 0, skin: 0, bg: 0, acc: 0, frame: 0 }, av || {});
  const acc = AV.acc[a.acc] || AV.acc[0];
  const fr = AV.frame[a.frame] || AV.frame[0];
  return `<span class="av" style="--s:${size}px;--bg:${AV.bg[a.bg] || AV.bg[0]};--fr:${fr.c}"><span class="av-e">${avatarEmoji(a)}</span>${acc.e ? `<span class="av-acc">${acc.e}</span>` : ""}</span>`;
}

// ---------- Revisão espaçada (SM-2 simplificado) ----------
// Notas: 1 = Errei, 3 = Difícil, 4 = Bom, 5 = Fácil
function srsNext(card, q) {
  const c = Object.assign({ ef: 2.5, int: 0, reps: 0, due: 0 }, card);
  if (q < 3) { c.reps = 0; c.int = 0; c.due = Date.now() + 10 * MIN; return c; }
  c.reps += 1;
  if (c.reps === 1) c.int = q === 5 ? 3 : 1;
  else if (c.reps === 2) c.int = q === 3 ? 3 : q === 5 ? 8 : 6;
  else c.int = Math.round(c.int * c.ef * (q === 3 ? 0.8 : q === 5 ? 1.3 : 1));
  c.int = Math.max(1, c.int);
  c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  c.due = Date.now() + c.int * DAY;
  return c;
}
function intervalLabel(card, q) {
  if (q < 3) return "10 min";
  const n = srsNext(card, q);
  return n.int === 1 ? "1 dia" : n.int < 30 ? `${n.int} dias` : `${Math.round(n.int / 30)} mês(es)`;
}
function getCard(id) {
  if (id.startsWith("c:")) return S.custom.find((c) => c.id === id) || null;
  const k = id.lastIndexOf(":");
  const w = worldById(id.slice(0, k));
  const fc = w && (w.flashcards || [])[+id.slice(k + 1)];
  return fc ? { f: fc.f, b: fc.b, tag: w.name } : null;
}
function dueCards() {
  const now = Date.now();
  const ids = Object.entries(S.srs).filter(([id, c]) => c.due <= now && getCard(id)).map(([id]) => id);
  S.custom.forEach((c) => { if (!S.srs[c.id]) ids.push(c.id); });
  return ids;
}
function nextDueText() {
  const fut = Object.entries(S.srs).filter(([id, c]) => c.due > Date.now() && getCard(id)).map(([, c]) => c.due);
  if (!fut.length) return "";
  const ms = Math.min(...fut) - Date.now();
  if (ms < 60 * MIN) return `Próximo card em ${Math.max(1, Math.round(ms / MIN))} min`;
  if (ms < DAY) return `Próximo card em ${Math.round(ms / (60 * MIN))} h`;
  return `Próximo card em ${Math.round(ms / DAY)} dia(s)`;
}

// ---------- Caderno de erros ----------
function addError(item) {
  if (!item.errKey) return;
  const ex = S.errors.find((e) => e.errKey === item.errKey);
  if (ex) { ex.count = (ex.count || 1) + 1; ex.at = Date.now(); return; }
  S.errors.unshift({ errKey: item.errKey, q: item.q, o: item.o, a: item.a, e: item.e, tag: item.tag || "Outros", noShuffle: !!item.noShuffle, count: 1, at: Date.now() });
  if (S.errors.length > 400) S.errors.length = 400;
}
function removeError(key) {
  const n = S.errors.length;
  S.errors = S.errors.filter((e) => e.errKey !== key);
  if (S.errors.length < n) { S.stats.cleared++; bump("errors"); }
}

// ---------- Som, vibração, avisos, confete e confirmação ----------
let actx = null;
function beep(freqs, dur = 0.15) {
  if (!S.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      const t = actx.currentTime + i * 0.09;
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.14, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(actx.destination);
      o.start(t); o.stop(t + dur + 0.03);
    });
  } catch (e) { /* sem áudio */ }
}
const sfx = {
  ok: () => beep([660, 880]),
  bad: () => { beep([240, 170], 0.22); try { navigator.vibrate && navigator.vibrate(80); } catch (e) {} },
  win: () => beep([523, 659, 784, 1047], 0.22),
  flip: () => beep([440], 0.06),
  tick: () => beep([1200], 0.03),
  level: () => beep([392, 523, 659, 784, 1047], 0.2)
};
function toast(html, cls = "") {
  let box = document.getElementById("toasts");
  if (!box) { box = document.createElement("div"); box.id = "toasts"; document.body.appendChild(box); }
  while (box.children.length > 2) box.firstChild.remove();
  const t = document.createElement("div");
  t.className = `toast ${cls}`;
  t.innerHTML = html;
  box.appendChild(t);
  setTimeout(() => t.classList.add("out"), 2800);
  setTimeout(() => t.remove(), 3300);
}
function confetti() {
  const colors = ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#4ade80", "#fb923c"];
  const layer = document.createElement("div");
  layer.className = "confetti";
  for (let i = 0; i < 60; i++) {
    const p = document.createElement("i");
    p.style.left = Math.random() * 100 + "%";
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = Math.random() * 0.5 + "s";
    p.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 3800);
}
// Confirmação dentro do app (o confirm() nativo não aparece em todos os lugares).
function ask(msg, buttons) {
  document.querySelectorAll(".modal.ask").forEach((m) => m.remove());
  const m = document.createElement("div");
  m.className = "modal ask";
  m.innerHTML = `<div class="modal-card"><p class="ask-msg">${msg}</p><div class="col"></div></div>`;
  const col = m.querySelector(".col");
  buttons.concat([{ label: "Cancelar", cls: "ghost" }]).forEach((b) => {
    const el = document.createElement("button");
    el.className = `btn block ${b.cls || "primary"}`;
    el.textContent = b.label;
    el.onclick = () => { m.remove(); if (b.run) b.run(); };
    col.appendChild(el);
  });
  m.addEventListener("click", (e) => { if (e.target === m) m.remove(); });
  document.body.appendChild(m);
}
function copyText(text, inputId) {
  const done = () => toast("Copiado! ✅");
  try {
    navigator.clipboard.writeText(text).then(done, () => selectInput(inputId));
  } catch (e) { selectInput(inputId); }
}
function selectInput(id) {
  const el = id && document.getElementById(id);
  if (el) { el.focus(); el.select(); toast("Selecionado: toque em Copiar no seu teclado."); }
}

// ---------- Pomodoro (continua entre telas) ----------
const P = { mode: "focus", running: false, end: 0, remaining: POMO_FOCUS };
const pomoText = () => fmtTime(P.running ? P.end - Date.now() : P.remaining);
function pomoToggle() {
  if (P.running) { P.remaining = Math.max(0, P.end - Date.now()); P.running = false; }
  else { P.end = Date.now() + P.remaining; P.running = true; }
  rerender();
}
function pomoReset(mode = P.mode) { P.mode = mode; P.running = false; P.remaining = mode === "focus" ? POMO_FOCUS : POMO_BREAK; rerender(); }
setInterval(() => {
  if (P.running && Date.now() >= P.end) {
    P.running = false;
    if (P.mode === "focus") {
      S.stats.pomodoros++; bump("pomos");
      sfx.win(); toast("🍅 Pomodoro concluído! +30 XP. Hora da pausa.", "gold");
      addXp(30);
      P.mode = "break"; P.remaining = POMO_BREAK;
    } else {
      sfx.ok(); toast("☕ Fim da pausa. Bora para o próximo ciclo!");
      P.mode = "focus"; P.remaining = POMO_FOCUS;
    }
    if (typeof G === "undefined" || !G) rerender();
  }
  const el = document.getElementById("pomo-time");
  if (el) el.textContent = pomoText();
  const mini = document.getElementById("pomo-mini");
  if (mini) mini.textContent = P.running ? `🍅 ${pomoText()}` : "";
}, 500);
