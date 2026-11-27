/* MedQuest — estudo de medicina gamificado.
   Métodos: recordação ativa, revisão espaçada (SM-2), testes, associação,
   casos clínicos, intercalação, caderno de erros e Pomodoro. */
(() => {
  "use strict";

  // ---------- Constantes ----------
  const STORE = "medquest_v1";
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;
  const DAILY_GOAL = 60;
  const TF_SECONDS = 10;
  const POMO_FOCUS = 25 * MIN;
  const POMO_BREAK = 5 * MIN;
  const WORLDS = window.WORLDS;

  const STAGES = [
    { key: "flash", name: "Flashcards", icon: "🃏", method: "Recordação ativa + revisão espaçada" },
    { key: "quiz", name: "Quiz", icon: "❓", method: "Teste de múltipla escolha · 3 vidas" },
    { key: "tf", name: "Verdadeiro ou Falso", icon: "⚡", method: "Rodada relâmpago · 10 s por pergunta" },
    { key: "pairs", name: "Ligue os pares", icon: "🔗", method: "Associação de conceitos" },
    { key: "boss", name: "Chefão: Caso clínico", icon: "👑", method: "Aplicação clínica · 2 vidas" }
  ];

  const TITLES = [
    [1, "Calouro(a)"], [3, "Monitor(a)"], [5, "Interno(a)"], [8, "Residente R1"],
    [11, "Residente R2"], [14, "Residente R3"], [18, "Especialista"], [23, "Preceptor(a)"], [30, "Lenda do Plantão"]
  ];

  const ACHIEVEMENTS = [
    { id: "first", icon: "🩺", name: "Primeiro plantão", desc: "Conclua sua primeira fase." },
    { id: "perfect", icon: "⭐", name: "Nota máxima", desc: "Ganhe 3 estrelas em uma fase." },
    { id: "boss", icon: "👑", name: "Caçador de chefões", desc: "Vença um caso clínico." },
    { id: "world", icon: "🌍", name: "Mestre de mundo", desc: "3 estrelas em todas as fases de um mundo." },
    { id: "streak3", icon: "🔥", name: "Constância", desc: "Estude 3 dias seguidos." },
    { id: "streak7", icon: "🏅", name: "Semana de ferro", desc: "Estude 7 dias seguidos." },
    { id: "combo10", icon: "⚡", name: "Em chamas", desc: "Acerte 10 seguidas." },
    { id: "cards50", icon: "🐘", name: "Memória de elefante", desc: "Faça 50 revisões de flashcards." },
    { id: "correct100", icon: "💯", name: "Centenário", desc: "Acerte 100 questões." },
    { id: "pomo", icon: "🍅", name: "Foco total", desc: "Complete um ciclo Pomodoro." },
    { id: "author", icon: "✍️", name: "Autor(a)", desc: "Crie 5 flashcards próprios." },
    { id: "errors", icon: "🧹", name: "Erro corrigido", desc: "Limpe uma questão do caderno de erros." },
    { id: "level5", icon: "🎓", name: "Internato", desc: "Chegue ao nível 5." },
    { id: "challenge", icon: "🧩", name: "Mente intercalada", desc: "Acerte 10+ no Modo Desafio." }
  ];

  // ---------- Estado ----------
  const defaultState = () => ({
    xp: 0, streak: 0, lastDay: null, daily: { date: null, xp: 0 },
    stages: {}, srs: {}, errors: [], custom: [], ach: {},
    stats: { answered: 0, correct: 0, reviews: 0, pomodoros: 0, bestCombo: 0, bestChallenge: 0, cleared: 0 },
    sound: true, onboarded: false
  });

  function load() {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const s = Object.assign(defaultState(), JSON.parse(raw));
        s.stats = Object.assign(defaultState().stats, s.stats);
        s.daily = Object.assign({ date: null, xp: 0 }, s.daily);
        return s;
      }
    } catch (e) { /* armazenamento indisponível */ }
    return defaultState();
  }
  let S = load();
  function save() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* ignora */ } }

  // ---------- Utilidades ----------
  const $app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const today = () => dayStr();
  const yesterday = () => dayStr(new Date(Date.now() - DAY));
  const worldById = (id) => WORLDS.find((w) => w.id === id);
  const starsOf = (wid, key) => S.stages[`${wid}:${key}`] || 0;
  const starStr = (n, max = 3) => "★".repeat(n) + "☆".repeat(max - n);

  function levelInfo(xp = S.xp) {
    let lvl = 1, need = 100, rest = xp;
    while (rest >= need) { rest -= need; lvl++; need += 50; }
    let title = TITLES[0][1];
    for (const [l, t] of TITLES) if (lvl >= l) title = t;
    return { lvl, cur: rest, need, pct: Math.round((rest / need) * 100), title };
  }

  function currentStreak() {
    return S.lastDay === today() || S.lastDay === yesterday() ? S.streak : 0;
  }
  function dailyXp() { return S.daily.date === today() ? S.daily.xp : 0; }

  // ---------- Som, vibração, toasts, confete ----------
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
    level: () => beep([392, 523, 659, 784, 1047], 0.2)
  };

  function toast(html, cls = "") {
    let box = document.getElementById("toasts");
    if (!box) { box = document.createElement("div"); box.id = "toasts"; document.body.appendChild(box); }
    const t = document.createElement("div");
    t.className = `toast ${cls}`;
    t.innerHTML = html;
    box.appendChild(t);
    setTimeout(() => t.classList.add("out"), 2600);
    setTimeout(() => t.remove(), 3100);
  }

  // Confirmação dentro do app (no lugar de confirm(), que nem todo navegador mostra).
  function ask(msg, buttons) {
    const old = document.querySelector(".modal"); if (old) old.remove();
    const m = document.createElement("div");
    m.className = "modal";
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
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 3800);
  }

  // ---------- XP, sequência e conquistas ----------
  function addXp(n) {
    if (n <= 0) return;
    const beforeInfo = levelInfo();
    const before = beforeInfo.lvl;
    S.xp += n;
    const t = today();
    if (S.daily.date !== t) S.daily = { date: t, xp: 0 };
    const wasBelowGoal = S.daily.xp < DAILY_GOAL;
    S.daily.xp += n;
    if (S.lastDay !== t) {
      S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1;
      S.lastDay = t;
    }
    if (wasBelowGoal && S.daily.xp >= DAILY_GOAL) toast("🎯 Meta diária batida!", "gold");
    const after = levelInfo();
    if (after.lvl > before) {
      sfx.level();
      toast(after.title !== beforeInfo.title ? `🎉 Nível ${after.lvl}! Agora você é <b>${esc(after.title)}</b>` : `🎉 Você subiu para o nível ${after.lvl}!`, "gold");
    }
    checkAchievements();
    save();
  }

  function unlock(id) {
    if (S.ach[id]) return;
    S.ach[id] = Date.now();
    const a = ACHIEVEMENTS.find((x) => x.id === id);
    if (a) toast(`🏆 Conquista: <b>${a.icon} ${esc(a.name)}</b>`, "gold");
  }

  function checkAchievements() {
    const vals = Object.values(S.stages);
    if (vals.some((v) => v >= 1)) unlock("first");
    if (vals.some((v) => v >= 3)) unlock("perfect");
    if (WORLDS.some((w) => starsOf(w.id, "boss") >= 1)) unlock("boss");
    if (WORLDS.some((w) => STAGES.every((st) => starsOf(w.id, st.key) >= 3))) unlock("world");
    if (S.streak >= 3) unlock("streak3");
    if (S.streak >= 7) unlock("streak7");
    if (S.stats.bestCombo >= 10) unlock("combo10");
    if (S.stats.reviews >= 50) unlock("cards50");
    if (S.stats.correct >= 100) unlock("correct100");
    if (S.stats.pomodoros >= 1) unlock("pomo");
    if (S.custom.length >= 5) unlock("author");
    if (S.stats.cleared >= 1) unlock("errors");
    if (levelInfo().lvl >= 5) unlock("level5");
    if (S.stats.bestChallenge >= 10) unlock("challenge");
  }

  // ---------- Revisão espaçada (SM-2 simplificado) ----------
  // Notas: 1 = Errei, 3 = Difícil, 4 = Bom, 5 = Fácil
  function srsNext(card, q) {
    const c = Object.assign({ ef: 2.5, int: 0, reps: 0, due: 0 }, card);
    if (q < 3) {
      c.reps = 0; c.int = 0;
      c.due = Date.now() + 10 * MIN;
    } else {
      c.reps += 1;
      if (c.reps === 1) c.int = q === 5 ? 3 : 1;
      else if (c.reps === 2) c.int = q === 3 ? 3 : q === 5 ? 8 : 6;
      else c.int = Math.round(c.int * c.ef * (q === 3 ? 0.8 : q === 5 ? 1.3 : 1));
      c.int = Math.max(1, c.int);
      c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      c.due = Date.now() + c.int * DAY;
    }
    return c;
  }
  function intervalLabel(card, q) {
    const n = srsNext(card, q);
    if (q < 3) return "10 min";
    return n.int === 1 ? "1 dia" : n.int < 30 ? `${n.int} dias` : `${Math.round(n.int / 30)} mês(es)`;
  }
  function getCard(id) {
    if (id.startsWith("c:")) return S.custom.find((c) => c.id === id) || null;
    const [wid, i] = id.split(":");
    const w = worldById(wid);
    const fc = w && w.flashcards[+i];
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
    if (S.errors.some((e) => e.errKey === item.errKey)) return;
    S.errors.unshift({ errKey: item.errKey, q: item.q, o: item.o, a: item.a, e: item.e, tag: item.tag || "", noShuffle: !!item.noShuffle });
    if (S.errors.length > 300) S.errors.length = 300;
  }
  function removeError(key) {
    const n = S.errors.length;
    S.errors = S.errors.filter((e) => e.errKey !== key);
    if (S.errors.length < n) S.stats.cleared++;
  }

  // ---------- Pomodoro (global, continua entre telas) ----------
  const P = { mode: "focus", running: false, end: 0, remaining: POMO_FOCUS };
  function pomoText() {
    const ms = P.running ? Math.max(0, P.end - Date.now()) : P.remaining;
    const s = Math.ceil(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }
  function pomoToggle() {
    if (P.running) { P.remaining = Math.max(0, P.end - Date.now()); P.running = false; }
    else { P.end = Date.now() + P.remaining; P.running = true; }
    rerender();
  }
  function pomoReset(mode = P.mode) {
    P.mode = mode; P.running = false; P.remaining = mode === "focus" ? POMO_FOCUS : POMO_BREAK;
    rerender();
  }
  setInterval(() => {
    if (P.running && Date.now() >= P.end) {
      P.running = false;
      if (P.mode === "focus") {
        S.stats.pomodoros++;
        sfx.win();
        toast("🍅 Pomodoro concluído! +30 XP. Hora da pausa.", "gold");
        addXp(30);
        P.mode = "break"; P.remaining = POMO_BREAK;
      } else {
        sfx.ok();
        toast("☕ Pausa encerrada. Bora para o próximo ciclo!");
        P.mode = "focus"; P.remaining = POMO_FOCUS;
      }
      rerender();
    }
    const el = document.getElementById("pomo-time");
    if (el) el.textContent = pomoText();
    const mini = document.getElementById("pomo-mini");
    if (mini) mini.textContent = P.running ? `🍅 ${pomoText()}` : "";
  }, 500);

  // ---------- Navegação ----------
  let view = { name: "home", arg: null };
  let G = null; // jogo em andamento
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  function go(name, arg = null) {
    clearTimers();
    G = null;
    view = { name, arg };
    rerender();
    window.scrollTo(0, 0);
  }
  function rerender() {
    if (G) return renderGame();
    const screens = { home: homeScreen, world: worldScreen, review: reviewScreen, cards: cardsScreen, profile: profileScreen };
    const fn = screens[view.name] || homeScreen;
    const tab = view.name === "world" ? "home" : view.name;
    $app.innerHTML = shell(fn(view.arg), tab);
    if (!S.onboarded) showOnboarding();
  }

  function shell(content, tab) {
    const L = levelInfo();
    const d = Math.min(dailyXp(), DAILY_GOAL);
    const tabs = [
      ["home", "🗺️", "Mapa"], ["review", "🔁", "Revisão"], ["cards", "🃏", "Meus cards"], ["profile", "👤", "Perfil"]
    ];
    const due = dueCards().length;
    return `
      <header class="topbar">
        <div class="lvl" onclick="App.go('profile')">
          <div class="lvl-badge">${L.lvl}</div>
          <div class="lvl-info">
            <div class="lvl-title">${esc(L.title)}</div>
            <div class="bar"><span style="width:${L.pct}%"></span></div>
            <small>${L.cur}/${L.need} XP</small>
          </div>
        </div>
        <div class="chips">
          <span class="chip" title="Dias seguidos">🔥 ${currentStreak()}</span>
          <span class="chip ${d >= DAILY_GOAL ? "done" : ""}" title="Meta diária de XP">🎯 ${d}/${DAILY_GOAL}</span>
        </div>
      </header>
      <span id="pomo-mini" class="pomo-mini">${P.running ? `🍅 ${pomoText()}` : ""}</span>
      <main class="content">${content}</main>
      <nav class="tabbar">
        ${tabs.map(([k, i, l]) => `
          <button class="${tab === k ? "on" : ""}" onclick="App.go('${k}')">
            <span class="ti">${i}${k === "review" && due ? `<b class="dot">${due}</b>` : ""}</span><span>${l}</span>
          </button>`).join("")}
      </nav>`;
  }

  function showOnboarding() {
    if (document.querySelector(".modal.onboard")) return;
    const m = document.createElement("div");
    m.className = "modal onboard";
    m.innerHTML = `
      <div class="modal-card">
        <div class="big-emoji">🩺</div>
        <h2>Bem-vindo(a) ao MedQuest!</h2>
        <p>Estudar medicina como um jogo, usando técnicas de memorização que funcionam de verdade:</p>
        <ul class="list">
          <li>🗺️ <b>Mundos</b> por matéria, com 5 fases cada. Ganhe estrelas para liberar a próxima.</li>
          <li>🔁 <b>Revisão espaçada</b>: os flashcards voltam no momento certo para não serem esquecidos.</li>
          <li>❌ <b>Caderno de erros</b>: cada erro vira uma revisão.</li>
          <li>🔥 <b>XP, níveis, sequência e conquistas</b> para manter a constância.</li>
        </ul>
        <button class="btn primary block" onclick="App.closeOnboarding()">Começar a jornada</button>
      </div>`;
    document.body.appendChild(m);
  }

  // ---------- Telas ----------
  function homeScreen() {
    const tip = window.STUDY_TIPS[new Date().getDate() % window.STUDY_TIPS.length];
    const due = dueCards().length;
    const totalStars = WORLDS.length * STAGES.length * 3;
    const got = WORLDS.reduce((s, w) => s + STAGES.reduce((t, st) => t + starsOf(w.id, st.key), 0), 0);
    return `
      <section class="hero">
        <div>
          <h1>Sua jornada médica</h1>
          <p>${got}/${totalStars} estrelas conquistadas</p>
        </div>
        <div class="ring" style="--p:${Math.round((got / totalStars) * 100)}"><span>${Math.round((got / totalStars) * 100)}%</span></div>
      </section>

      <div class="tip">${esc(tip)}</div>

      <button class="cta ${due ? "" : "muted"}" onclick="App.go('review')">
        <span class="cta-ic">🔁</span>
        <span class="cta-txt"><b>Revisão do dia</b><small>${due ? `${due} card(s) esperando por você` : "Tudo em dia! Jogue Flashcards para alimentar a revisão."}</small></span>
        <span class="cta-go">›</span>
      </button>

      <h2 class="sec">Mundos</h2>
      <div class="worlds">
        ${WORLDS.map((w) => {
          const st = STAGES.reduce((t, s) => t + starsOf(w.id, s.key), 0);
          const pct = Math.round((st / (STAGES.length * 3)) * 100);
          return `
          <button class="world" style="--c:${w.color}" onclick="App.go('world','${w.id}')">
            <span class="w-ic">${w.icon}</span>
            <span class="w-name">${esc(w.name)}</span>
            <span class="w-desc">${esc(w.desc)}</span>
            <span class="bar small"><span style="width:${pct}%;background:${w.color}"></span></span>
            <span class="w-stars">★ ${st}/${STAGES.length * 3}</span>
          </button>`;
        }).join("")}
      </div>`;
  }

  function worldScreen(wid) {
    const w = worldById(wid);
    if (!w) return homeScreen();
    const offsets = [0, 70, 0, -70, 0];
    return `
      <div class="world-head" style="--c:${w.color}">
        <button class="back" onclick="App.go('home')">‹</button>
        <span class="wh-ic">${w.icon}</span>
        <div><h1>${esc(w.name)}</h1><p>${esc(w.desc)}</p></div>
      </div>
      <div class="path">
        ${STAGES.map((st, i) => {
          const unlocked = i === 0 || starsOf(w.id, STAGES[i - 1].key) >= 1;
          const stars = starsOf(w.id, st.key);
          return `
          <div class="node-wrap" style="transform:translateX(${offsets[i]}px)">
            <button class="node ${unlocked ? "" : "locked"} ${stars ? "done" : ""} ${st.key === "boss" ? "boss" : ""}"
              style="--c:${w.color}" ${unlocked ? `onclick="App.start('${w.id}','${st.key}')"` : `onclick="App.locked()"`}>
              <span>${unlocked ? st.icon : "🔒"}</span>
            </button>
            <div class="node-label">
              <b>${esc(st.name)}</b>
              <small>${esc(st.method)}</small>
              <span class="stars">${starStr(stars)}</span>
            </div>
          </div>`;
        }).join("")}
      </div>
      <p class="hint">Ganhe pelo menos 1 estrela para liberar a próxima fase. Busque as 3 ⭐ refazendo as fases!</p>`;
  }

  function reviewScreen() {
    const due = dueCards().length;
    const errs = S.errors.length;
    const nd = nextDueText();
    return `
      <h1 class="page-title">Revisão</h1>

      <div class="panel">
        <div class="panel-h"><span class="p-ic">🔁</span><div><b>Revisão espaçada</b><small>Cards que você está prestes a esquecer</small></div></div>
        <div class="big-num">${due}<small> card(s) para hoje</small></div>
        ${due ? `<button class="btn primary block" onclick="App.startReview()">Revisar agora</button>`
              : `<p class="muted-txt">Tudo em dia! ${nd ? esc(nd) + "." : "Jogue as fases de Flashcards ou crie seus cards."}</p>`}
      </div>

      <div class="panel">
        <div class="panel-h"><span class="p-ic">❌</span><div><b>Caderno de erros</b><small>Acerte a questão para ela sair do caderno</small></div></div>
        <div class="big-num">${errs}<small> questão(ões)</small></div>
        ${errs ? `<button class="btn danger block" onclick="App.startErrors()">Refazer meus erros</button>`
               : `<p class="muted-txt">Nenhum erro pendente. 👏</p>`}
      </div>

      <div class="panel">
        <div class="panel-h"><span class="p-ic">🧩</span><div><b>Modo Desafio</b><small>12 questões misturando todas as matérias · 3 vidas</small></div></div>
        <p class="muted-txt">Intercalar matérias treina você a identificar o tema, como na prova. Recorde: <b>${S.stats.bestChallenge}</b> acertos.</p>
        <button class="btn accent block" onclick="App.startChallenge()">Aceitar desafio</button>
      </div>

      <div class="panel pomo ${P.mode}">
        <div class="panel-h"><span class="p-ic">🍅</span><div><b>Pomodoro</b><small>${P.mode === "focus" ? "25 min de foco · +30 XP ao concluir" : "Pausa de 5 min · descanse a mente"}</small></div></div>
        <div class="pomo-time" id="pomo-time">${pomoText()}</div>
        <div class="row">
          <button class="btn primary" onclick="App.pomoToggle()">${P.running ? "⏸ Pausar" : "▶ Iniciar"}</button>
          <button class="btn ghost" onclick="App.pomoReset('focus')">Foco</button>
          <button class="btn ghost" onclick="App.pomoReset('break')">Pausa</button>
        </div>
      </div>`;
  }

  function cardsScreen() {
    return `
      <h1 class="page-title">Meus cards</h1>
      <div class="panel">
        <div class="panel-h"><span class="p-ic">✍️</span><div><b>Criar flashcard</b><small>Escrever com suas palavras já ajuda a fixar</small></div></div>
        <label class="lbl">Frente (pergunta)</label>
        <textarea id="cf" rows="2" maxlength="300" placeholder="Ex.: Antídoto da intoxicação por ferro?"></textarea>
        <label class="lbl">Verso (resposta)</label>
        <textarea id="cb" rows="3" maxlength="600" placeholder="Ex.: Deferoxamina"></textarea>
        <label class="lbl">Matéria</label>
        <select id="ct">
          ${WORLDS.map((w) => `<option>${esc(w.name)}</option>`).join("")}
          <option>Outra</option>
        </select>
        <button class="btn primary block" onclick="App.addCard()">Adicionar card</button>
      </div>
      ${S.custom.length ? `
        <button class="btn accent block" onclick="App.startCustom()">Estudar meus ${S.custom.length} card(s)</button>
        <div class="card-list">
          ${S.custom.map((c) => `
            <div class="mini-card">
              <div><b>${esc(c.f)}</b><p>${esc(c.b)}</p><small>${esc(c.tag || "")}${S.srs[c.id] ? ` · revisão: ${new Date(S.srs[c.id].due).toLocaleDateString("pt-BR")}` : " · novo"}</small></div>
              <button class="icon-btn" title="Excluir" onclick="App.delCard('${c.id}')">🗑️</button>
            </div>`).join("")}
        </div>` : `<p class="muted-txt center">Você ainda não criou cards. Eles entram automaticamente na Revisão do dia.</p>`}`;
  }

  function profileScreen() {
    const L = levelInfo();
    const st = S.stats;
    const acc = st.answered ? Math.round((st.correct / st.answered) * 100) : 0;
    const perfect = Object.values(S.stages).filter((v) => v >= 3).length;
    const got = Object.keys(S.ach).length;
    return `
      <div class="profile-head">
        <div class="avatar">🧑‍⚕️</div>
        <h1>${esc(L.title)}</h1>
        <p>Nível ${L.lvl} · ${S.xp} XP no total</p>
        <div class="bar"><span style="width:${L.pct}%"></span></div>
        <small>${L.need - L.cur} XP para o nível ${L.lvl + 1}</small>
      </div>
      <div class="stats">
        <div><b>🔥 ${currentStreak()}</b><small>dias seguidos</small></div>
        <div><b>${st.answered}</b><small>questões</small></div>
        <div><b>${acc}%</b><small>acerto</small></div>
        <div><b>${st.reviews}</b><small>revisões</small></div>
        <div><b>${perfect}</b><small>fases ⭐⭐⭐</small></div>
        <div><b>${st.pomodoros}</b><small>pomodoros</small></div>
      </div>
      <h2 class="sec">Conquistas <small>${got}/${ACHIEVEMENTS.length}</small></h2>
      <div class="achs">
        ${ACHIEVEMENTS.map((a) => `
          <div class="ach ${S.ach[a.id] ? "on" : ""}">
            <span>${a.icon}</span><b>${esc(a.name)}</b><small>${esc(a.desc)}</small>
          </div>`).join("")}
      </div>
      <h2 class="sec">Configurações</h2>
      <div class="panel">
        <label class="switch-row">
          <span>🔊 Sons</span>
          <input type="checkbox" ${S.sound ? "checked" : ""} onchange="App.toggleSound(this.checked)">
        </label>
        <button class="btn ghost block" onclick="App.showHelp()">❔ Como funciona</button>
        <button class="btn danger-ghost block" onclick="App.resetAll()">Apagar todo o progresso</button>
      </div>
      <p class="muted-txt center small">Conteúdo para fins educacionais. Sempre confira condutas em referências atualizadas.</p>`;
  }

  // ---------- Início das fases ----------
  function start(wid, key) {
    const w = worldById(wid);
    if (!w) return;
    const back = () => go("world", wid);
    const restart = () => start(wid, key);
    const base = { worldId: wid, stageKey: key, back, restart, color: w.color, xp: 0, bestCombo: 0, combo: 0 };
    if (key === "flash") {
      startFlashRunner(Object.assign(base, {
        title: `${w.icon} ${w.name} · Flashcards`,
        queue: shuffle(w.flashcards.map((_, i) => `${w.id}:${i}`))
      }));
    } else if (key === "quiz") {
      startQRunner(Object.assign(base, {
        title: `${w.icon} ${w.name} · Quiz`, hearts: 3,
        items: shuffle(w.quiz.map((it, i) => ({ ...it, errKey: `${w.id}:quiz:${i}`, tag: w.name })))
      }));
    } else if (key === "tf") {
      G = Object.assign(base, {
        mode: "tf", title: `${w.icon} ${w.name} · Verdadeiro ou Falso`,
        items: shuffle(w.tf.map((it, i) => ({ q: it.s, o: ["Verdadeiro", "Falso"], opts: ["Verdadeiro", "Falso"], a: it.v ? 0 : 1, ans: it.v ? 0 : 1, e: it.e, noShuffle: true, errKey: `${w.id}:tf:${i}`, tag: w.name }))),
        idx: 0, correct: 0, answered: false
      });
      beginTfItem();
    } else if (key === "pairs") {
      const pairs = w.pairs.map((p, i) => ({ id: i, l: p[0], r: p[1] }));
      G = Object.assign(base, {
        mode: "pairs", title: `${w.icon} ${w.name} · Ligue os pares`,
        left: shuffle(pairs), right: shuffle(pairs), matched: [], selL: null, selR: null, wrong: null, mistakes: 0
      });
      renderGame();
    } else if (key === "boss") {
      const c = w.cases[Math.floor(Math.random() * w.cases.length)];
      startQRunner(Object.assign(base, {
        title: `👑 Chefão · ${c.title}`, hearts: 2, story: c.story, keepOrder: true,
        items: c.steps.map((it, i) => ({ ...it, errKey: `${w.id}:case:${c.title}:${i}`, tag: `${w.name} · caso clínico` }))
      }));
    }
  }

  function startReview() {
    const q = shuffle(dueCards());
    if (!q.length) return toast("Nada para revisar agora. 👌");
    startFlashRunner({ title: "🔁 Revisão do dia", queue: q, back: () => go("review"), restart: null, xp: 0, review: true });
  }
  function startCustom() {
    if (!S.custom.length) return;
    startFlashRunner({ title: "🃏 Meus cards", queue: shuffle(S.custom.map((c) => c.id)), back: () => go("cards"), restart: () => startCustom(), xp: 0, review: true });
  }
  function startErrors() {
    if (!S.errors.length) return;
    startQRunner({
      title: "❌ Caderno de erros", hearts: Infinity, errorsMode: true,
      items: shuffle(S.errors).slice(0, 15).map((e) => ({ ...e })),
      back: () => go("review"), restart: () => startErrors(), xp: 0, combo: 0, bestCombo: 0
    });
  }
  function startChallenge() {
    const pool = [];
    WORLDS.forEach((w) => {
      w.quiz.forEach((it, i) => pool.push({ ...it, errKey: `${w.id}:quiz:${i}`, tag: w.name }));
      w.tf.forEach((it, i) => pool.push({ q: `Verdadeiro ou falso? ${it.s}`, o: ["Verdadeiro", "Falso"], a: it.v ? 0 : 1, e: it.e, noShuffle: true, errKey: `${w.id}:tf:${i}`, tag: w.name }));
    });
    startQRunner({
      title: "🧩 Modo Desafio", hearts: 3, challenge: true, showTag: true,
      items: shuffle(pool).slice(0, 12),
      back: () => go("review"), restart: () => startChallenge(), xp: 0, combo: 0, bestCombo: 0
    });
  }

  // ---------- Runner: Flashcards ----------
  function startFlashRunner(cfg) {
    clearTimers();
    G = Object.assign({ mode: "flash", idx: 0, flipped: false, good: 0, rated: {}, requeued: {} }, cfg);
    G.total = G.queue.length;
    renderGame();
  }
  function flip() { if (G && G.mode === "flash" && !G.flipped) { G.flipped = true; sfx.flip(); renderGame(); } }
  function rate(q) {
    if (!G || G.mode !== "flash" || !G.flipped) return;
    const id = G.queue[G.idx];
    S.srs[id] = srsNext(S.srs[id], q);
    S.stats.reviews++;
    if (!(id in G.rated)) { G.rated[id] = q; if (q >= 4) G.good++; }
    if (q < 3 && !G.requeued[id]) { G.requeued[id] = true; G.queue.push(id); }
    const gain = q < 3 ? 2 : 5;
    G.xp += gain; addXp(gain);
    q >= 3 ? sfx.ok() : sfx.bad();
    G.idx++; G.flipped = false;
    if (G.idx >= G.queue.length) return finish({ acc: G.total ? G.good / G.total : 1, correct: G.good, total: G.total });
    renderGame();
  }

  // ---------- Runner: perguntas (quiz, chefão, erros, desafio) ----------
  function startQRunner(cfg) {
    clearTimers();
    G = Object.assign({ mode: "q", idx: 0, correct: 0, answered: false, chosen: null, storyOpen: true }, cfg);
    G.items = G.items.map((it) => {
      const perm = it.noShuffle ? it.o.map((_, i) => i) : shuffle(it.o.map((_, i) => i));
      return { ...it, opts: perm.map((i) => it.o[i]), ans: perm.indexOf(it.a) };
    });
    G.maxHearts = G.hearts;
    renderGame();
  }

  function registerAnswer(item, ok) {
    S.stats.answered++;
    if (ok) {
      S.stats.correct++;
      G.correct++;
      G.combo = (G.combo || 0) + 1;
      G.bestCombo = Math.max(G.bestCombo || 0, G.combo);
      S.stats.bestCombo = Math.max(S.stats.bestCombo, G.combo);
      if (G.errorsMode) removeError(item.errKey);
      sfx.ok();
    } else {
      G.combo = 0;
      addError(item);
      sfx.bad();
    }
  }

  function answer(i) {
    if (!G || G.answered) return;
    const item = G.items[G.idx];
    if (G.mode === "tf") clearTimers();
    G.answered = true; G.chosen = i;
    const ok = i === item.ans;
    registerAnswer(item, ok);
    let gain = 0;
    if (ok) {
      gain = 10 + 2 * Math.min(G.combo - 1, 5);
      if (G.mode === "tf") {
        const left = Math.max(0, TF_SECONDS - (Date.now() - G.t0) / 1000);
        gain += Math.round(left);
        G.lastBonus = Math.round(left);
      }
    } else if (G.mode === "q" && G.hearts !== Infinity) {
      G.hearts--;
    }
    G.lastGain = gain;
    G.xp += gain; addXp(gain);
    renderGame();
  }

  function next() {
    if (!G || !G.answered) return;
    if (G.mode === "q" && G.hearts <= 0) return finish({ failed: true, acc: 0, correct: G.correct, total: G.items.length });
    G.idx++; G.answered = false; G.chosen = null;
    if (G.idx >= G.items.length) return finish({ acc: G.correct / G.items.length, correct: G.correct, total: G.items.length });
    if (G.mode === "tf") return beginTfItem();
    renderGame();
    window.scrollTo(0, 0);
  }

  // ---------- Runner: Verdadeiro ou Falso ----------
  function beginTfItem() {
    clearTimers();
    G.t0 = Date.now();
    G.answered = false; G.chosen = null;
    renderGame();
    timers.push(setTimeout(() => {
      if (G && G.mode === "tf" && !G.answered) { G.timedOut = true; answer(-1); G.timedOut = false; }
    }, TF_SECONDS * 1000));
  }

  // ---------- Runner: Ligue os pares ----------
  function pick(side, id) {
    if (!G || G.mode !== "pairs" || G.wrong || G.matched.includes(id)) return;
    if (side === "l") G.selL = G.selL === id ? null : id;
    else G.selR = G.selR === id ? null : id;
    if (G.selL !== null && G.selR !== null) {
      S.stats.answered++;
      if (G.selL === G.selR) {
        G.matched.push(G.selL);
        S.stats.correct++;
        G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo);
        S.stats.bestCombo = Math.max(S.stats.bestCombo, G.combo);
        G.xp += 8; addXp(8);
        sfx.ok();
        G.selL = G.selR = null;
        if (G.matched.length === G.left.length) {
          const total = G.left.length;
          return timers.push(setTimeout(() => finish({ acc: total / (total + G.mistakes), correct: total, total, mistakes: G.mistakes }), 450));
        }
      } else {
        G.mistakes++; G.combo = 0;
        G.wrong = [G.selL, G.selR];
        sfx.bad();
        renderGame();
        return timers.push(setTimeout(() => { if (G) { G.wrong = null; G.selL = G.selR = null; renderGame(); } }, 650));
      }
    }
    renderGame();
  }

  // ---------- Fim de fase ----------
  function finish(res) {
    clearTimers();
    const g = G;
    let stars = 0;
    if (!res.failed && !g.review && !g.errorsMode && !g.challenge) {
      stars = res.acc >= 0.9 ? 3 : res.acc >= 0.7 ? 2 : res.acc >= 0.5 ? 1 : 0;
    }
    let bonus = 0;
    let newRecord = false;
    if (g.worldId) {
      const k = `${g.worldId}:${g.stageKey}`;
      const prev = S.stages[k] || 0;
      if (stars > prev) { S.stages[k] = stars; newRecord = prev > 0; }
      bonus = stars * 10 + (g.stageKey === "boss" && stars ? 40 : 0);
    }
    if (g.challenge) {
      if (res.correct > S.stats.bestChallenge) { S.stats.bestChallenge = res.correct; newRecord = res.correct > 0; }
      bonus = res.correct * 2;
    }
    if (g.errorsMode) bonus = res.correct * 3;
    g.xp += bonus;
    addXp(bonus);
    checkAchievements();
    save();

    const passed = g.worldId ? stars >= 1 : !res.failed;
    if (stars === 3 || (g.challenge && res.correct >= 10)) { confetti(); sfx.win(); }
    else if (passed) sfx.win();

    const emoji = res.failed ? "💔" : stars === 3 ? "🏆" : passed ? "🎉" : "💪";
    const title = res.failed ? "Sem vidas!" : g.worldId ? (stars ? "Fase concluída!" : "Quase lá!") : g.review ? "Revisão concluída!" : g.errorsMode ? "Erros revisados!" : "Desafio encerrado!";
    const sub = res.failed ? "Revise as explicações e tente de novo. Errar faz parte do aprendizado."
      : g.worldId && !stars ? "Faça pelo menos 50% para ganhar 1 estrela e liberar a próxima fase."
      : g.review ? "Os cards foram reagendados para o momento ideal."
      : g.errorsMode ? `${S.errors.length} questão(ões) restante(s) no caderno.`
      : stars === 3 ? "Desempenho perfeito!" : "Bom trabalho! Busque as 3 estrelas.";

    G = { mode: "result" };
    $app.innerHTML = `
      <div class="result">
        <div class="big-emoji pop">${emoji}</div>
        <h1>${title}</h1>
        ${g.worldId ? `<div class="res-stars">${[1, 2, 3].map((n) => `<span class="${n <= stars ? "on" : ""}" style="animation-delay:${n * 0.2}s">★</span>`).join("")}</div>` : ""}
        ${newRecord ? `<div class="badge">Novo recorde!</div>` : ""}
        <p>${esc(sub)}</p>
        <div class="res-grid">
          <div><b>${res.correct}/${res.total}</b><small>${g.mode === "flash" ? "lembrei de primeira" : "acertos"}</small></div>
          <div><b>+${g.xp}</b><small>XP ganho</small></div>
          ${g.mode === "pairs" ? `<div><b>${res.mistakes || 0}</b><small>erros</small></div>` : `<div><b>${g.bestCombo || 0}</b><small>combo máx.</small></div>`}
        </div>
        <div class="col">
          <button class="btn primary block" id="res-continue">Continuar</button>
          ${g.restart ? `<button class="btn ghost block" id="res-again">Jogar de novo</button>` : ""}
        </div>
      </div>`;
    document.getElementById("res-continue").onclick = () => { G = null; g.back(); };
    const again = document.getElementById("res-again");
    if (again) again.onclick = () => { G = null; g.restart(); };
  }

  function quit() {
    if (!G) return;
    if (G.mode === "result") { G = null; return rerender(); }
    const back = G.back;
    const leave = () => { clearTimers(); G = null; back(); };
    if (G.idx > 0 || (G.matched && G.matched.length)) {
      return ask("Sair da fase? O progresso desta rodada será perdido, mas o XP ganho fica.", [{ label: "Sair", cls: "danger", run: leave }]);
    }
    leave();
  }

  // ---------- Render do jogo ----------
  function gameTop(progress, extra = "") {
    return `
      <div class="game-top">
        <button class="icon-btn" onclick="App.quit()" aria-label="Sair">✕</button>
        <div class="bar grow"><span style="width:${Math.round(progress * 100)}%"></span></div>
        ${extra}
      </div>
      <div class="game-title">${esc(G.title)}</div>`;
  }
  const heartsHtml = () => (G.hearts === Infinity || G.hearts === undefined) ? "" :
    `<span class="hearts">${"❤️".repeat(Math.max(0, G.hearts))}${"🤍".repeat(Math.max(0, G.maxHearts - G.hearts))}</span>`;
  const comboHtml = () => G.combo >= 2 ? `<span class="combo">🔥x${G.combo}</span>` : "";

  function renderGame() {
    if (!G) return rerender();
    if (G.mode === "flash") return renderFlash();
    if (G.mode === "q" || G.mode === "tf") return renderQuestion();
    if (G.mode === "pairs") return renderPairs();
  }

  function renderFlash() {
    const id = G.queue[G.idx];
    const c = getCard(id) || { f: "(card removido)", b: "" };
    const cur = S.srs[id];
    $app.innerHTML = `
      <div class="game">
        ${gameTop(G.idx / G.queue.length, `<span class="counter">${G.idx + 1}/${G.queue.length}</span>`)}
        <p class="method">🧠 Tente lembrar a resposta <b>antes</b> de virar o card.</p>
        <div class="flashcard ${G.flipped ? "flipped" : ""}" onclick="App.flip()">
          <div class="fc-inner">
            <div class="fc-face fc-front">
              ${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ""}
              <div class="fc-text">${esc(c.f)}</div>
              <small class="fc-hint">Toque para ver a resposta</small>
            </div>
            <div class="fc-face fc-back">
              <span class="tag">Resposta</span>
              <div class="fc-q">${esc(c.f)}</div>
              <div class="fc-text">${esc(c.b)}</div>
            </div>
          </div>
        </div>
        ${G.flipped ? `
          <p class="method">Como foi lembrar?</p>
          <div class="rates">
            <button class="rate r1" onclick="App.rate(1)"><b>Errei</b><small>${intervalLabel(cur, 1)}</small></button>
            <button class="rate r3" onclick="App.rate(3)"><b>Difícil</b><small>${intervalLabel(cur, 3)}</small></button>
            <button class="rate r4" onclick="App.rate(4)"><b>Bom</b><small>${intervalLabel(cur, 4)}</small></button>
            <button class="rate r5" onclick="App.rate(5)"><b>Fácil</b><small>${intervalLabel(cur, 5)}</small></button>
          </div>` : `<button class="btn primary block" onclick="App.flip()">Mostrar resposta</button>`}
      </div>`;
  }

  function renderQuestion() {
    const it = G.items[G.idx];
    const isTf = G.mode === "tf";
    const ok = G.answered && G.chosen === it.ans;
    let fb = "";
    if (G.answered) {
      const heading = ok ? `✅ Correto! <span class="gain">+${G.lastGain} XP${isTf && G.lastBonus ? ` (⚡+${G.lastBonus})` : ""}</span>`
        : G.chosen === -1 ? "⏰ Tempo esgotado!" : "❌ Não foi dessa vez";
      fb = `
        <div class="feedback ${ok ? "ok" : "bad"}">
          <div class="fb-h">${heading}</div>
          ${!ok ? `<div class="fb-ans">Resposta: <b>${esc(it.opts[it.ans])}</b></div>` : ""}
          <div class="fb-e">${esc(it.e)}</div>
          ${!ok && it.errKey && !G.errorsMode ? `<small class="fb-note">📒 Adicionada ao caderno de erros</small>` : ""}
          <button class="btn ${ok ? "primary" : "danger"} block" onclick="App.next()">Continuar</button>
        </div>`;
    }
    const story = G.story ? `
      <details class="story" ${G.storyOpen ? "open" : ""} ontoggle="App.storyToggle(this.open)">
        <summary>📋 Caso clínico</summary>
        <p>${esc(G.story)}</p>
      </details>` : "";

    const opts = isTf ? `
      <div class="tf-btns">
        ${it.opts.map((o, i) => {
          let cls = i === 0 ? "tf-true" : "tf-false";
          if (G.answered) cls += i === it.ans ? " correct" : i === G.chosen ? " wrong" : " dim";
          return `<button class="tf-btn ${cls}" ${G.answered ? "disabled" : ""} onclick="App.answer(${i})">${i === 0 ? "✓" : "✗"}<span>${o}</span></button>`;
        }).join("")}
      </div>` : `
      <div class="options">
        ${it.opts.map((o, i) => {
          let cls = "";
          if (G.answered) cls = i === it.ans ? "correct" : i === G.chosen ? "wrong" : "dim";
          return `<button class="opt ${cls}" ${G.answered ? "disabled" : ""} onclick="App.answer(${i})"><span class="k">${"ABCD"[i] || i + 1}</span><span>${esc(o)}</span></button>`;
        }).join("")}
      </div>`;

    $app.innerHTML = `
      <div class="game ${G.answered ? "has-fb" : ""}">
        ${gameTop(G.idx / G.items.length, `${comboHtml()}${heartsHtml()}<span class="counter">${G.idx + 1}/${G.items.length}</span>`)}
        ${isTf ? `<div class="timer"><span style="animation-duration:${TF_SECONDS}s" class="${G.answered ? "stop" : ""}"></span></div>` : ""}
        ${story}
        ${(G.showTag || G.errorsMode) && it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ""}
        <div class="question ${isTf ? "tf" : ""}">${esc(it.q)}</div>
        ${opts}
        ${fb}
      </div>`;
  }

  function renderPairs() {
    const col = (side, list, key) => list.map((p) => {
      const matched = G.matched.includes(p.id);
      const sel = (side === "l" ? G.selL : G.selR) === p.id;
      const wrong = G.wrong && G.wrong[side === "l" ? 0 : 1] === p.id;
      return `<button class="pair ${matched ? "matched" : ""} ${sel ? "sel" : ""} ${wrong ? "wrong" : ""}" ${matched ? "disabled" : ""} onclick="App.pick('${side}',${p.id})">${esc(p[key])}</button>`;
    }).join("");
    $app.innerHTML = `
      <div class="game">
        ${gameTop(G.matched.length / G.left.length, `${comboHtml()}<span class="counter">❌ ${G.mistakes}</span>`)}
        <p class="method">🔗 Toque em um item de cada coluna para formar o par.</p>
        <div class="pairs">
          <div class="pcol">${col("l", G.left, "l")}</div>
          <div class="pcol">${col("r", G.right, "r")}</div>
        </div>
      </div>`;
  }

  // ---------- Ações ----------
  function addCard() {
    const f = document.getElementById("cf").value.trim();
    const b = document.getElementById("cb").value.trim();
    const tag = document.getElementById("ct").value;
    if (!f || !b) return toast("Preencha a frente e o verso. ✏️");
    S.custom.unshift({ id: `c:${Date.now().toString(36)}`, f, b, tag });
    addXp(3);
    checkAchievements();
    save();
    toast("Card criado! Ele já está na sua Revisão do dia. ✅");
    rerender();
  }
  function delCard(id) {
    ask("Excluir este card?", [{ label: "Excluir", cls: "danger", run: () => {
      S.custom = S.custom.filter((c) => c.id !== id);
      delete S.srs[id];
      save(); rerender();
    } }]);
  }
  function resetAll() {
    const wipe = (keepCards) => {
      const custom = keepCards ? S.custom : [];
      S = defaultState(); S.custom = custom; S.onboarded = true;
      save(); go("home"); toast("Progresso apagado.");
    };
    ask("Apagar todo o progresso? XP, estrelas, revisões e conquistas serão zerados.", [
      { label: "Apagar, mas manter meus cards", cls: "danger", run: () => wipe(true) },
      { label: "Apagar tudo", cls: "danger-ghost", run: () => wipe(false) }
    ]);
  }

  // Teclado (computador): 1-4 / A-D respondem, espaço vira o card, Enter continua.
  document.addEventListener("keydown", (e) => {
    if (!G || /input|textarea|select/i.test(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    if (G.mode === "flash") {
      if (!G.flipped && (k === " " || k === "enter")) { e.preventDefault(); flip(); }
      else if (G.flipped && ["1", "2", "3", "4"].includes(k)) rate([1, 3, 4, 5][+k - 1]);
    } else if (G.mode === "q" || G.mode === "tf") {
      if (G.answered && (k === "enter" || k === " ")) { e.preventDefault(); next(); }
      else if (!G.answered) {
        const map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3, v: 0, f: 1 };
        if (k in map && map[k] < G.items[G.idx].opts.length) {
          if (G.mode === "tf" && !["v", "f", "1", "2"].includes(k)) return;
          answer(map[k]);
        }
      }
    } else if (G.mode === "result" && k === "enter") {
      const b = document.getElementById("res-continue"); if (b) b.click();
    }
  });

  // API usada pelos botões
  window.App = {
    go, start, startReview, startErrors, startChallenge, startCustom,
    flip, rate, answer, next, pick, quit,
    addCard, delCard, resetAll, pomoToggle, pomoReset,
    locked: () => toast("🔒 Ganhe ao menos 1 estrela na fase anterior para liberar."),
    storyToggle: (open) => { if (G) G.storyOpen = open; },
    toggleSound: (v) => { S.sound = v; save(); if (v) sfx.ok(); },
    closeOnboarding: () => { S.onboarded = true; save(); const m = document.querySelector(".modal.onboard"); if (m) m.remove(); },
    showHelp: () => { S.onboarded = false; showOnboarding(); }
  };

  // Atualiza a sequência ao abrir (se perdeu um dia, zera)
  if (S.lastDay && S.lastDay !== today() && S.lastDay !== yesterday()) { S.streak = 0; save(); }

  rerender();

  try {
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  } catch (e) { /* sem service worker (ex.: visualizador embutido) */ }
})();
