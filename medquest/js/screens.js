/* MedQuest: telas e navegação. */
"use strict";

const $app = document.getElementById("app");
let view = { name: "home", arg: null };
const SIMCFG = { worlds: {}, n: 20, timed: true, init: false };

function go(name, arg = null) {
  if (typeof labCleanup === "function") labCleanup();
  if (typeof LABCTX !== "undefined") LABCTX = null;
  document.querySelectorAll(".modal.lab-open,.modal.lab-help,.modal.lab-pause").forEach((m) => m.remove());
  clearTimers();
  G = null;
  view = { name, arg };
  rerender();
  window.scrollTo(0, 0);
}
const SCREENS = {
  home: homeScreen, world: worldScreen, arena: arenaScreen, ranking: rankingScreen, battles: battlesScreen, battle: battleScreen,
  review: reviewScreen, tutor: tutorScreen, simcfg: simcfgScreen, grade: gradeScreen, lab: labScreen, labadmin: labAdminScreen, materials: materialsScreen, profile: profileScreen, avatar: avatarScreen
};
const TAB_OF = { world: "home", grade: "home", labadmin: "lab", ranking: "arena", battles: "arena", battle: "arena", simcfg: "review", avatar: "profile" };
function rerender() {
  if (G) return renderGame();
  const fn = SCREENS[view.name] || homeScreen;
  $app.innerHTML = shell(fn(view.arg), TAB_OF[view.name] || view.name);
  if (!S.onboarded) showOnboarding();
  else if (!S.semAsked) showSemesterPicker();
}
// Atualiza a tela quando chegam dados online, sem atrapalhar quem está digitando ou jogando.
function softRerender() {
  if (G || document.querySelector(".modal")) return;
  const a = document.activeElement;
  if (a && /input|textarea|select/i.test(a.tagName)) return;
  rerender();
}

// Ícones de navegação (linha, estilo das referências)
const NAVI = {
  home: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  lab: '<path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-11V3"/><path d="M7 15h10"/>',
  arena: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 6.5 21 3v3l-6 6M5 14l-2 2 3 3 2-2"/>',
  review: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  materials: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  tutor: '<path d="M12 3v3M5 10a7 7 0 0 1 14 0v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><circle cx="9.5" cy="12" r="1"/><circle cx="14.5" cy="12" r="1"/><path d="M2 12v2M22 12v2"/>'
};
const navIc = (k, w = 22) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${NAVI[k]}</svg>`;
function crestSvg(s = 34) {
  return `<svg viewBox="0 0 40 44" width="${s}" height="${s * 1.1}" aria-hidden="true"><defs><linearGradient id="cr${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc24a"/><stop offset="1" stop-color="#ff6a1f"/></linearGradient></defs>
    <path d="M20 2 37 8v13c0 10-7.5 18-17 21C10.5 39 3 31 3 21V8z" fill="url(#cr${s})"/><path d="M20 6 33 10.6V21c0 7.8-5.6 14.2-13 16.8C12.6 35.2 7 28.8 7 21V10.6z" fill="#1c120c"/>
    <path d="M17 13h6v6h6v6h-6v6h-6v-6h-6v-6h6z" fill="url(#cr${s})"/></svg>`;
}
function flameSvg(s = 18) { return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#ff7a1a"/><path d="M12 12c1 2 3 3 3 5a3 3 0 0 1-6 0c0-1.5 1-2.5 1.5-3 .3 1 .8 1.5 1.5 1.5 0-1.5-.4-2.5 0-3.5z" fill="#ffd04a"/></svg>`; }
// Escudo de conquista: cor e estrelas indicam o estado
function shieldSvg(o = {}) {
  const on = !!o.on, s = o.size || 34, c = o.color || "#ff7a1a", id = "sh" + Math.random().toString(36).slice(2, 7);
  return `<svg class="shield ${on ? "on" : ""}" viewBox="0 0 40 46" width="${s}" height="${s * 1.15}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${on ? c : "#5b4d44"}"/><stop offset="1" stop-color="${on ? "#9a2a0c" : "#2c241f"}"/></linearGradient></defs>
    <path d="M20 2 37 8v13c0 10-7.5 18-17 22C10.5 39 3 31 3 21V8z" fill="url(#${id})" stroke="${on ? "#ffd27a" : "#6b5d54"}" stroke-width="1.6"/>
    ${o.icon ? `<text x="20" y="27" text-anchor="middle" font-size="15">${o.icon}</text>` : `<path d="M20 12l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="${on ? "#ffe9a8" : "#7d6f66"}"/>`}
    ${o.stars !== undefined ? `<g>${[0, 1, 2].map((i) => `<path transform="translate(${9 + i * 8.2} 33) scale(.32)" d="M10 0l3 6.3 6.9 1-5 4.9 1.2 6.9L10 15.8 3.9 19l1.2-6.9-5-4.9 6.9-1z" fill="${i < o.stars ? "#ffd04a" : "#00000066"}"/>`).join("")}</g>` : ""}</svg>`;
}

function shell(content, tab) {
  const L = levelInfo();
  const d = Math.min(dayVal("xp"), DAILY_GOAL);
  const due = dueCards().length;
  const top = [["home", "Mapa"], ["lab", "Lab"], ["tutor", "Tutor IA"], ["arena", "Arena"], ["review", "Revisão"], ["materials", "Materiais"], ["profile", "Perfil"]];
  const bottom = [["home", "Mapa"], ["lab", "Lab"], ["tutor", "Tutor IA"], ["review", "Revisão"], ["profile", "Perfil"]];
  const dot = (k) => (k === "review" && due ? `<b class="dot">${due > 99 ? "99+" : due}</b>` : "");
  return `
    <header class="topbar">
      <button class="crest" onclick="go('home')" aria-label="Início">${crestSvg(30)}<span>Med<b>Quest</b></span></button>
      <nav class="topnav">${top.map(([k, l]) => `<button class="${tab === k ? "on" : ""} ${k === "tutor" ? "ai" : ""}" onclick="go('${k}')">${l}${dot(k)}</button>`).join("")}</nav>
      <div class="top-r">
        <span class="streak" title="Dias seguidos">${flameSvg(20)}<b>${currentStreak()}</b></span>
        <span class="goal-chip ${d >= DAILY_GOAL ? "done" : ""}" title="Meta diária de XP"><i style="--p:${Math.round((d / DAILY_GOAL) * 100)}"></i>${d}/${DAILY_GOAL}</span>
        <button class="me" onclick="go('profile')" title="Nível ${L.lvl} · ${esc(L.title)}">${avatarHtml(S.avatar, 38)}<b class="me-lv">${L.lvl}</b></button>
      </div>
    </header>
    <span id="pomo-mini" class="pomo-mini">${P.running ? `🍅 ${pomoText()}` : ""}</span>
    <main class="content">${content}</main>
    <nav class="tabbar">
      ${bottom.map(([k, l]) => k === "tutor"
        ? `<button class="tb-ai ${tab === k ? "on" : ""}" onclick="go('tutor')" aria-label="Tutor IA"><span class="ai-orb">${mascotSvg(46)}</span><span>${l}</span></button>`
        : `<button class="${tab === k ? "on" : ""}" onclick="go('${k}')"><span class="ti">${navIc(k)}${dot(k)}</span><span>${l}</span></button>`).join("")}
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
      <p>Estude medicina como um jogo, com técnicas de memorização que funcionam.</p>
      <ul class="list">
        <li>🎓 <b>Seu período</b>: o app mostra primeiro as matérias do seu semestre.</li>
        <li>🗺️ <b>${window.WORLDS.length} matérias</b> do ciclo básico, do clínico e do internato, cada uma com 6 fases.</li>
        <li>📚 <b>Seu material vira jogo</b>: envie PDFs, slides, resumos ou anotações.</li>
        <li>🧪 <b>MedQuest Lab</b>: anatomia em 3D, Encontre o erro, Plantão virtual, instrumentos cirúrgicos e OSCE.</li>
        <li>⚔️ <b>Arena</b>: Contra o relógio, desafios com amigos, batalhas e ranking semanal.</li>
        <li>🔁 <b>Revisão</b> espaçada, caderno de erros e simulados antes das provas.</li>
        <li>🎯 Missões diárias, medalhas, avatar e XP.</li>
      </ul>
      <button class="btn primary block" onclick="closeOnboarding()">Começar a jornada</button>
    </div>`;
  document.body.appendChild(m);
}
function closeOnboarding() { S.onboarded = true; save(); document.querySelectorAll(".modal.onboard").forEach((m) => m.remove()); if (!S.semAsked) showSemesterPicker(); }

// ---------- Escolha do período ----------
function showSemesterPicker() {
  if (document.querySelector(".modal.sem")) return;
  const m = document.createElement("div");
  m.className = "modal sem";
  m.innerHTML = `
    <div class="modal-card">
      <div class="big-emoji">🎓</div>
      <h2>Em que período você está?</h2>
      <p>O MedQuest mostra primeiro as matérias do seu semestre. Depois você pode ajustar a grade da sua faculdade.</p>
      <div class="sem-grid">${Array.from({ length: 12 }, (_, i) => i + 1).map((n) => `<button class="${S.semester === n ? "on" : ""}" onclick="setSemester(${n})"><b>${n}º</b><small>${n <= 4 ? "básico" : n <= 8 ? "clínico" : "internato"}</small></button>`).join("")}</div>
      <button class="btn ghost block" onclick="setSemester(null)">Prefiro ver todas as matérias</button>
    </div>`;
  document.body.appendChild(m);
}
function setSemester(n) {
  S.semester = n; S.grade = null; S.semAsked = true;
  S.ui.cycle = n ? "sem" : "basico";
  S.ui.clockScope = n ? "sem" : "all";
  SIMCFG.init = false;
  save();
  document.querySelectorAll(".modal.sem").forEach((m) => m.remove());
  if (n) toast(`🎓 ${esc(semLabel(n))}: ${myGrade().length} matérias no seu semestre`);
  if (view.name === "grade") rerender(); else go("home");
}
function toggleGrade(id) {
  const g = myGrade().slice();
  const i = g.indexOf(id);
  if (i >= 0) g.splice(i, 1); else g.push(id);
  S.grade = g;
  if (g.length) { S.ui.cycle = "sem"; } else if (S.ui.cycle === "sem") S.ui.cycle = "basico";
  save(); rerender();
}
function resetGrade() { S.grade = null; save(); toast("Grade padrão restaurada."); rerender(); }
function gradeScreen() {
  const mine = myGrade();
  const custom = !!S.grade;
  return `
    <div class="sub-head"><button class="back" onclick="go('home')">‹</button><h1>Meu semestre</h1></div>
    <div class="panel">
      <label class="lbl" for="sem-sel">Período</label>
      <select id="sem-sel" onchange="setSemester(this.value ? +this.value : null)">
        <option value="" ${!S.semester ? "selected" : ""}>Não definido (ver tudo)</option>
        ${Array.from({ length: 12 }, (_, i) => i + 1).map((n) => `<option value="${n}" ${S.semester === n ? "selected" : ""}>${esc(semLabel(n))}</option>`).join("")}
      </select>
      <p class="muted-txt small">${S.semester ? `A grade abaixo é a de um currículo típico${custom ? ", com os seus ajustes" : ""}. Cada faculdade organiza o curso de um jeito: marque o que você estuda agora.` : "Escolha um período para montar a sua grade."}</p>
      ${custom && S.semester ? `<button class="btn ghost block" onclick="resetGrade()">Restaurar grade padrão do ${S.semester}º período</button>` : ""}
    </div>
    <h2 class="sec">Matérias do semestre <small>${mine.length} selecionada(s)</small></h2>
    ${CYCLES.map((c) => { const ws = worldsOfCycle(c.id); return ws.length ? `<label class="lbl">${c.icon} ${c.name}</label><div class="filter-chips">${ws.map((w) => `<button class="fchip ${mine.includes(w.id) ? "on" : ""}" onclick="toggleGrade('${w.id}')">${w.icon} ${esc(w.name)}</button>`).join("")}</div>` : ""; }).join("")}
    <button class="btn primary block" style="margin-top:16px" onclick="S.ui.cycle='sem';go('home')">Ver meu semestre</button>`;
}
function showHelp() { S.onboarded = false; showOnboarding(); }

// ---------- Mapa ----------
function missionsHtml() {
  const ms = todayMissions();
  const allClaimed = ms.every((m) => m.claimed);
  return `
    <div class="panel missions">
      <div class="panel-h"><span class="p-ic">🎯</span><div><b>Missões de hoje</b><small>Cumpra as 3 para abrir o baú diário (+50 XP)</small></div><span class="chest ${S.missions.bonus ? "open" : ""}">${S.missions.bonus ? "🎁" : allClaimed ? "🎁" : "🧰"}</span></div>
      ${ms.map((m) => `
        <div class="mission ${m.claimed ? "claimed" : ""}">
          <span class="m-ic">${m.icon}</span>
          <div class="m-body"><span>${esc(m.t)}</span><span class="bar small"><span style="width:${Math.round((m.p / m.n) * 100)}%"></span></span><small>${m.p}/${m.n} · +${m.r} XP</small></div>
          ${m.claimed ? `<span class="m-ok">✓</span>` : m.done ? `<button class="btn gold small-btn" onclick="claimMission('${m.id}')">Resgatar</button>` : ""}
        </div>`).join("")}
    </div>`;
}

function subjectCard(w) {
  const list = stagesOf(w), max = list.length * 3, st = worldStars(w);
  const fc = (w.flashcards || []).length, seen = (w.flashcards || []).filter((_, i) => S.srs[`${w.id}:${i}`]).length;
  const bossOk = list.some((x) => x.key === "boss") && stageUnlocked(w, "boss");
  return `
    <div class="subj" style="--c:${w.color}">
      <button class="subj-main" onclick="go('world','${w.id}')">
        <span class="subj-ic">${w.icon}</span>
        <span class="subj-info"><b>${esc(w.name)}</b>
          <span class="mbar"><em>Fases</em><span class="bar o"><span style="width:${max ? Math.round((st / max) * 100) : 0}%"></span></span><small>${st}/${max}★</small></span>
          <span class="mbar"><em>Revisão</em><span class="bar y"><span style="width:${fc ? Math.round((seen / fc) * 100) : 0}%"></span></span><small>${fc ? Math.round((seen / fc) * 100) : 0}%</small></span>
        </span>
      </button>
      <div class="subj-foot">
        <span class="shields">${list.map((x) => shieldSvg({ on: starsOf(w.id, x.key) > 0, stars: starsOf(w.id, x.key), size: 24 })).join("")}</span>
        <button class="btn ${bossOk ? "primary" : "ghost"} small-btn" onclick="${bossOk ? `start('${w.id}','boss')` : `go('world','${w.id}')`}">${bossOk ? "Fazer prova" : "Jogar"}</button>
      </div>
    </div>`;
}
function homeScreen() {
  const due = dueCards().length;
  const tip = window.STUDY_TIPS[new Date().getDate() % window.STUDY_TIPS.length];
  if (S.ui.cycle === "sem" && !hasGrade()) S.ui.cycle = "basico";
  const cyc = S.ui.cycle;
  const worlds = cyc === "sem" ? myGrade().map(worldById) : worldsOfCycle(cyc);
  const segs = (hasGrade() ? [{ id: "sem", name: "Meu semestre", icon: "⭐" }] : []).concat(CYCLES);
  const L = levelInfo(), d = Math.min(dayVal("xp"), DAILY_GOAL), gp = Math.round((d / DAILY_GOAL) * 100);
  const last = S.ui.last && worldById(S.ui.last.w);
  const lastSt = last && STAGES.find((x) => x.key === S.ui.last.k);
  const ms = todayMissions();
  const ticker = [`⚡ ${dayVal("xp")} XP hoje`, `🔥 ${currentStreak()} dia(s) seguidos`, `🔁 ${due} revisão(ões) pendente(s)`, `🎯 ${ms.filter((m) => m.done).length}/3 missões`, `🏅 ${medalCount(1)} medalhas`, `🧪 ${(S.lab && S.lab.history ? S.lab.history.length : 0)} simulações no Lab`];
  return `
    <section class="hero2">
      <div class="h2-l">
        <small>Olá, ${esc(S.nick || "estudante")} 👋</small>
        <h1>Nível ${L.lvl} · <span>${esc(L.title)}</span></h1>
        <div class="bar o big"><span style="width:${L.pct}%"></span></div>
        <small>${L.cur}/${L.need} XP para o próximo nível</small>
      </div>
      <div class="donut big" style="--p:${gp}"><span>${gp}%<small>meta</small></span></div>
    </section>
    <div class="ticker" aria-label="Atividade de hoje"><b>Atividade de hoje</b><div class="tk-track"><div class="tk-run">${ticker.concat(ticker).map((t) => `<span>${t}</span>`).join("")}</div></div></div>
    <div class="home-grid">
      <div class="hg-main">
        ${last && lastSt ? `<button class="continue" style="--c:${last.color}" onclick="start('${last.id}','${lastSt.key}')"><span class="subj-ic">${last.icon}</span><span class="cta-txt"><small>Continuar de onde parou</small><b>${esc(last.name)} · ${esc(lastSt.name)}</b></span><span class="play">▶</span></button>` : ""}
        <button class="ai-card" onclick="go('tutor')"><span class="ai-orb">${mascotSvg(52)}</span><span class="cta-txt"><b>Tutor IA</b><small>Tire dúvidas, peça resumos, casos clínicos e quizzes sob medida.</small><span class="fake-in">Pergunte qualquer coisa… <i>➤</i></span></span></button>
        <button class="cta ${due ? "" : "muted"}" onclick="go('review')">
          <span class="cta-ic">${navIc("review", 26)}</span>
          <span class="cta-txt"><b>Revisão do dia</b><small>${due ? `${due} card(s) esperando por você` : "Tudo em dia! Jogue Flashcards para alimentar a revisão."}</small></span>
          <span class="cta-go">›</span>
        </button>
      </div>
      <div class="hg-side">${missionsHtml()}</div>
    </div>
    <div class="quick">
      <button onclick="go('lab')"><span>🧪</span>MedQuest Lab</button>
      <button onclick="startClock()"><span>⏱️</span>Contra o relógio</button>
      <button onclick="startPuzzleArcade()"><span>🧩</span>Quebra-cabeças</button>
      <button onclick="go('simcfg')"><span>📝</span>Simulado</button>
      <button onclick="go('arena')"><span>⚔️</span>Arena</button>
      <button onclick="go('materials')"><span>📤</span>Meu material</button>
      <button onclick="go('planner')"><span>📅</span>Planner</button>
      <button onclick="go('guide')"><span>🧠</span>Guia de memorização</button>
    </div>
    <div class="tip">💡 ${esc(tip)}</div>
    <h2 class="sec">Matérias</h2>
    <div class="seg">
      ${segs.map((c) => `<button class="${cyc === c.id ? "on" : ""}" onclick="S.ui.cycle='${c.id}';save();rerender()">${c.icon} ${c.name}</button>`).join("")}
    </div>
    ${cyc === "sem" ? `<div class="sem-bar"><span>🎓 <b>${esc(semLabel())}</b> · ${worlds.length} matérias</span><button class="btn ghost small-btn" onclick="go('grade')">Editar grade</button></div>`
      : !S.semester ? `<div class="sem-bar"><span>🎓 Mostre só as matérias do seu semestre</span><button class="btn accent small-btn" onclick="showSemesterPicker()">Escolher período</button></div>` : ""}
    ${worlds.length ? `<div class="worlds subj-grid">${worlds.map(subjectCard).join("")}</div>` : `
      <div class="panel center empty">
        <div class="big-emoji">📤</div>
        <p><b>Seu material vira jogo.</b> Envie PDFs de aulas, slides, resumos, anotações ou apostilas. O MedQuest cria flashcards, quizzes, pares, quebra-cabeças e desafios com o seu conteúdo.</p>
        <button class="btn primary block" onclick="go('materials')">Enviar meu material</button>
      </div>`}`;
}

function worldScreen(wid) {
  const w = worldById(wid);
  if (!w) return homeScreen();
  const offsets = [0, 70, 0, -70];
  const list = stagesOf(w);
  return `
    <div class="world-head" style="--c:${w.color}">
      <button class="back" onclick="go('home')">‹</button>
      <span class="wh-ic">${w.icon}</span>
      <div><h1>${esc(w.name)}</h1><p>${esc(w.desc || "")}</p></div>
    </div>
    <div class="path">
      ${list.map((st, i) => {
        const unlocked = stageUnlocked(w, st.key);
        const stars = starsOf(w.id, st.key);
        return `
        <div class="node-wrap" style="transform:translateX(${offsets[i % 4]}px)">
          <button class="node ${unlocked ? "" : "locked"} ${stars ? "done" : ""} ${st.key === "boss" ? "boss" : ""}" style="--c:${w.color}" onclick="${unlocked ? `start('${w.id}','${st.key}')` : "toast('🔒 Ganhe ao menos 1 estrela na fase anterior para liberar.')"}">
            <span>${unlocked ? st.icon : "🔒"}</span>
          </button>
          <div class="node-label"><b>${esc(st.name)}</b><small>${esc(st.method)}</small><span class="stars">${starStr(stars)}</span></div>
        </div>`;
      }).join("")}
    </div>
    <div class="row wrap center-row">
      ${questionPool(w.id, ["quiz", "tf"]).length >= 4 ? `<button class="btn ghost" onclick="startClock('${w.id}')">⏱️ Contra o relógio</button>` : ""}
      ${w.cycle === "meu" ? `<button class="btn ghost" onclick="go('materials')">✏️ Gerenciar</button>` : ""}
    </div>
    <p class="hint">Ganhe pelo menos 1 estrela para liberar a próxima fase. Refaça as fases para conquistar as 3 ⭐.</p>`;
}

// ---------- Arena ----------
function arenaScreen() {
  const open = ON.db && ON.loaded ? allBattles().filter((b) => !b.played).length : 0;
  return `
    <h1 class="page-title">Arena</h1>
    <div class="panel accent-l">
      <div class="panel-h"><span class="p-ic">⏱️</span><div><b>Contra o relógio</b><small>60 segundos · cada erro tira 3 s · combos valem mais</small></div></div>
      <select id="clock-scope" onchange="S.ui.clockScope=this.value;save()">${scopeOptions(S.ui.clockScope)}</select>
      <p class="muted-txt">Seu recorde: <b>${S.records.clock}</b> pontos</p>
      <button class="btn primary block" onclick="startClock()">Começar</button>
    </div>

    <div class="panel">
      <div class="panel-h"><span class="p-ic">🤝</span><div><b>Desafio entre amigos</b><small>Jogue, envie o código e veja quem faz mais pontos</small></div></div>
      <button class="btn accent block" onclick="newFriendChallenge()">Criar desafio (Contra o relógio)</button>
      <label class="lbl" for="code-in">Recebeu um código?</label>
      <div class="code-row"><input id="code-in" placeholder="MQ1-..." autocomplete="off"><button class="btn primary" onclick="acceptChallenge()">Aceitar</button></div>
    </div>

    <div class="panel">
      <div class="panel-h"><span class="p-ic">⚔️</span><div><b>Batalhas de conhecimento</b><small>${BATTLE_N} questões iguais para todos; acertar rápido vale mais</small></div></div>
      ${ON.db ? `<button class="btn primary block" onclick="go('battles')">Batalhas online${open ? ` · ${open} esperando você` : ""}</button>` : ""}
      <details class="local-battle" ${ON.db ? "" : "open"}>
        <summary>📱 Batalha no mesmo aparelho</summary>
        <div class="row"><input id="lb-a" placeholder="Jogador 1" maxlength="20"><input id="lb-b" placeholder="Jogador 2" maxlength="20"></div>
        <select id="lb-scope">${scopeOptions("all")}</select>
        <button class="btn accent block" onclick="startLocalBattle()">Começar batalha</button>
      </details>
      ${ON.db ? "" : onlineStatusHtml()}
    </div>

    <div class="panel">
      <div class="panel-h"><span class="p-ic">🏆</span><div><b>Ranking semanal</b><small>XP ganho de segunda a domingo · zera toda semana</small></div></div>
      ${rankingHtml(5)}
      ${ON.db && ON.loaded ? `<button class="btn ghost block" onclick="go('ranking')">Ver ranking completo</button>` : ""}
    </div>

    <div class="panel">
      <div class="panel-h"><span class="p-ic">🧩</span><div><b>Quebra-cabeças</b><small>Monte estruturas do corpo e processos fisiológicos na ordem certa</small></div></div>
      <button class="btn accent block" onclick="startPuzzleArcade()">Jogar 4 quebra-cabeças</button>
    </div>`;
}
function rankingScreen() {
  return `
    <div class="sub-head"><button class="back" onclick="go('arena')">‹</button><h1>Ranking semanal</h1></div>
    <p class="muted-txt">Semana ${esc(weekKey().split("-W")[1])} · quem ganhar mais XP até domingo fica no topo.</p>
    ${rankingHtml(100)}`;
}
function battlesScreen() {
  if (!ON.db) return `<div class="sub-head"><button class="back" onclick="go('arena')">‹</button><h1>Batalhas</h1></div>${onlineStatusHtml()}`;
  const list = ON.loaded ? allBattles() : [];
  const waiting = list.filter((b) => !b.played);
  const done = list.filter((b) => b.played);
  return `
    <div class="sub-head"><button class="back" onclick="go('arena')">‹</button><h1>Batalhas online</h1></div>
    <div class="panel">
      <b>Nova batalha</b>
      <p class="muted-txt small">Você joga primeiro. Seus colegas veem a batalha aqui e respondem as mesmas ${BATTLE_N} questões.</p>
      <select id="battle-scope" onchange="S.ui.battleScope=this.value;save()">${scopeOptions(S.ui.battleScope)}</select>
      <button class="btn primary block" onclick="createBattle()">⚔️ Criar batalha</button>
    </div>
    ${onlineStatusHtml()}
    ${waiting.length ? `<h2 class="sec">Esperando você</h2>${waiting.map(battleCardHtml).join("")}` : ""}
    ${done.length ? `<h2 class="sec">Já jogadas</h2>${done.map(battleCardHtml).join("")}` : ""}
    ${ON.loaded && !list.length ? `<p class="muted-txt center">Nenhuma batalha nos últimos 7 dias. Crie a primeira!</p>` : ""}`;
}
function battleScreen(bid) {
  const b = allBattles().find((x) => x.bid === bid);
  if (!b) return battlesScreen();
  const medal = ["🥇", "🥈", "🥉"];
  return `
    <div class="sub-head"><button class="back" onclick="go('battles')">‹</button><h1>Resultado da batalha</h1></div>
    <p class="muted-txt">${esc(scopeLabel(b.scope))} · criada por ${esc(playerName(b.owner, b.ownerP))} em ${new Date(b.at).toLocaleString("pt-BR")}</p>
    <div class="rank-list">
      ${b.parts.map((p, i) => `
        <div class="rank-row ${p.uid === ON.uid ? "me" : ""}">
          <span class="rk">${medal[i] || i + 1}</span>${avatarHtml(p.p.avatar, 38)}
          <span class="rn"><b>${esc(playerName(p.uid, p.p))}</b><small>${p.r.ok}/${BATTLE_N} acertos · ${(p.r.ms / 1000).toFixed(0)} s</small></span>
          <span class="rx">${p.r.pts}</span>
        </div>`).join("")}
    </div>
    ${b.played ? `<p class="muted-txt small center">Novos participantes aparecem aqui automaticamente.</p>` : `<button class="btn accent block" onclick="joinBattle('${b.bid}')">⚔️ Jogar esta batalha</button>`}`;
}

// ---------- Revisão ----------
function reviewScreen() {
  const due = dueCards().length;
  const nd = nextDueText();
  const tags = {};
  S.errors.forEach((e) => { tags[e.tag] = (tags[e.tag] || 0) + 1; });
  if (S.ui.errTag && !tags[S.ui.errTag]) S.ui.errTag = "";
  const list = filteredErrors();
  const top = S.errors.slice().sort((a, b) => (b.count || 1) - (a.count || 1)).slice(0, 3).filter((e) => (e.count || 1) > 1);
  return `
    <h1 class="page-title">Revisão</h1>
    <div class="panel">
      <div class="panel-h"><span class="p-ic">🔁</span><div><b>Revisão espaçada</b><small>Os cards que você está prestes a esquecer</small></div></div>
      <div class="big-num">${due}<small> card(s) para hoje</small></div>
      ${due ? `<button class="btn primary block" onclick="startReview()">Revisar agora</button>` : `<p class="muted-txt">Tudo em dia! ${nd ? esc(nd) + "." : "Jogue as fases de Flashcards ou crie seus cards."}</p>`}
    </div>

    <div class="panel">
      <div class="panel-h"><span class="p-ic">❌</span><div><b>Caderno de erros</b><small>Uma revisão feita com os seus erros. A questão sai quando você acerta.</small></div></div>
      <div class="big-num">${S.errors.length}<small> questão(ões)</small></div>
      ${S.errors.length ? `
        <div class="filter-chips">
          <button class="fchip ${!S.ui.errTag ? "on" : ""}" onclick="S.ui.errTag='';save();rerender()">Todas (${S.errors.length})</button>
          ${Object.entries(tags).sort((a, b) => b[1] - a[1]).map(([t, n]) => `<button class="fchip ${S.ui.errTag === t ? "on" : ""}" onclick="S.ui.errTag=this.dataset.t;save();rerender()" data-t="${esc(t)}">${esc(t)} (${n})</button>`).join("")}
        </div>
        <label class="lbl" for="err-sort">Ordem</label>
        <select id="err-sort" onchange="S.ui.errSort=this.value;save()">
          <option value="count" ${S.ui.errSort === "count" ? "selected" : ""}>Mais erradas primeiro</option>
          <option value="recent" ${S.ui.errSort === "recent" ? "selected" : ""}>Mais recentes primeiro</option>
          <option value="mix" ${S.ui.errSort === "mix" ? "selected" : ""}>Misturadas</option>
        </select>
        ${top.length ? `<div class="top-err"><small>Suas campeãs de erro:</small>${top.map((e) => `<p>🔁 <b>${e.count}x</b> ${esc(e.q.length > 80 ? e.q.slice(0, 80) + "…" : e.q)}</p>`).join("")}</div>` : ""}
        <button class="btn danger block" onclick="startErrors()">Refazer ${Math.min(15, list.length)} erro(s)${S.ui.errTag ? ` de ${esc(S.ui.errTag)}` : ""}</button>`
      : `<p class="muted-txt">Nenhum erro pendente. 👏</p>`}
    </div>

    <div class="panel accent-l">
      <div class="panel-h"><span class="p-ic">📝</span><div><b>Simulado</b><small>Treine para a prova: sem correção até o fim, com cronômetro</small></div></div>
      ${S.sims[0] ? `<p class="muted-txt">Último: <b>${S.sims[0].pct}%</b> em ${S.sims[0].n} questões (${new Date(S.sims[0].at).toLocaleDateString("pt-BR")})</p>` : ""}
      <button class="btn accent block" onclick="go('simcfg')">Montar simulado</button>
    </div>

    <div class="panel pomo ${P.mode}">
      <div class="panel-h"><span class="p-ic">🍅</span><div><b>Pomodoro</b><small>${P.mode === "focus" ? "25 min de foco · +30 XP ao concluir" : "Pausa de 5 min · descanse a mente"}</small></div></div>
      <div class="pomo-time" id="pomo-time">${pomoText()}</div>
      <div class="row">
        <button class="btn primary" onclick="pomoToggle()">${P.running ? "⏸ Pausar" : "▶ Iniciar"}</button>
        <button class="btn ghost" onclick="pomoReset('focus')">Foco</button>
        <button class="btn ghost" onclick="pomoReset('break')">Pausa</button>
      </div>
    </div>`;
}

function simcfgScreen() {
  if (!SIMCFG.init) { SIMCFG.init = true; if (hasGrade()) { SIMCFG.worlds = {}; myGrade().forEach((id) => { SIMCFG.worlds[id] = true; }); } }
  const picked = Object.keys(SIMCFG.worlds).filter((k) => SIMCFG.worlds[k]);
  const avail = picked.reduce((t, wid) => t + questionPool(wid, ["quiz", "case"]).length, 0);
  const chip = (w) => `<button class="fchip ${SIMCFG.worlds[w.id] ? "on" : ""}" onclick="simToggle('${w.id}')">${w.icon} ${esc(w.name)}</button>`;
  return `
    <div class="sub-head"><button class="back" onclick="go('review')">‹</button><h1>Montar simulado</h1></div>
    <div class="panel">
      <b>Matérias da prova</b>
      <div class="row wrap">
        ${hasGrade() ? `<button class="btn ghost small-btn" onclick="simSelect('sem')">⭐ Meu semestre</button>` : ""}
        <button class="btn ghost small-btn" onclick="simSelect('basico')">Todo o básico</button>
        <button class="btn ghost small-btn" onclick="simSelect('clinico')">Todo o clínico</button>
        <button class="btn ghost small-btn" onclick="simSelect('all')">Tudo</button>
        <button class="btn ghost small-btn" onclick="simSelect('none')">Limpar</button>
      </div>
      ${CYCLES.map((c) => { const ws = worldsOfCycle(c.id).filter((w) => questionPool(w.id, ["quiz", "case"]).length); return ws.length ? `<label class="lbl">${c.icon} ${c.name}</label><div class="filter-chips">${ws.map(chip).join("")}</div>` : ""; }).join("")}
      <label class="lbl" for="sim-n">Número de questões</label>
      <select id="sim-n" onchange="SIMCFG.n=+this.value">${[10, 20, 30, 50, 80].map((n) => `<option value="${n}" ${SIMCFG.n === n ? "selected" : ""}>${n} questões</option>`).join("")}</select>
      <label class="switch-row"><span>⏱️ Cronômetro (1 min 30 s por questão)</span><input type="checkbox" ${SIMCFG.timed ? "checked" : ""} onchange="SIMCFG.timed=this.checked"></label>
      <p class="muted-txt small">${picked.length ? `${avail} questões disponíveis nas matérias escolhidas${avail < SIMCFG.n ? `: o simulado terá ${avail}` : ""}.` : "Escolha as matérias que vão cair na sua prova."}</p>
      <button class="btn primary block" onclick="startSim()">Começar simulado</button>
    </div>
    ${S.sims.length ? `<h2 class="sec">Histórico</h2><div class="panel">${S.sims.slice(0, 8).map((s) => `
      <div class="subrow"><span>${new Date(s.at).toLocaleDateString("pt-BR")} · ${s.n} q.</span><span class="bar small"><span style="width:${s.pct}%;background:${s.pct >= 70 ? "var(--ok)" : s.pct >= 50 ? "var(--gold)" : "var(--bad)"}"></span></span><b>${s.pct}%</b></div>`).join("")}</div>` : ""}`;
}
function simToggle(wid) { SIMCFG.worlds[wid] = !SIMCFG.worlds[wid]; rerender(); }
function simSelect(which) {
  SIMCFG.worlds = {};
  if (which === "sem") myGrade().forEach((id) => { SIMCFG.worlds[id] = true; });
  else if (which !== "none") allWorlds().forEach((w) => { if (which === "all" || w.cycle === which) SIMCFG.worlds[w.id] = true; });
  rerender();
}

// ---------- Materiais ----------
function materialsScreen() {
  const ai = !!ON.sample;
  const imgOk = ai && ON.limits && ON.limits.images;
  const total = materialText().length;
  return `
    <h1 class="page-title">Materiais</h1>
    <div class="panel accent-l">
      <div class="panel-h"><span class="p-ic">📤</span><div><b>Transformar meu material em jogo</b><small>PDFs de aulas, slides, resumos, anotações e apostilas</small></div></div>
      <label class="drop">
        <input type="file" id="mat-file" multiple accept=".pdf,.pptx,.docx,.txt,.md${imgOk ? ",image/*" : ""}" onchange="onMatFiles(this)" ${M.busy ? "disabled" : ""}>
        <span class="big-emoji">📄</span>
        <b>Escolher arquivos</b>
        <small>PDF, PowerPoint (.pptx), Word (.docx), TXT ou MD${imgOk ? ", e fotos de anotações" : ""}</small>
      </label>
      ${M.sources.length ? `<div class="sources">${M.sources.map((s) => `<div class="src ${s.err ? "err" : ""}"><span>${s.img ? "🖼️" : s.err ? "⚠️" : "✅"}</span><span>${esc(s.name)}</span><small>${s.err ? esc(s.err) : s.img ? "imagem" : `${s.chars.toLocaleString("pt-BR")} caracteres`}</small></div>`).join("")}</div>` : ""}
      <label class="lbl" for="mat-paste">Ou cole o texto (resumo, anotação…)</label>
      <textarea id="mat-paste" rows="4" placeholder="Cole aqui o conteúdo da aula" oninput="M.paste=this.value">${esc(M.paste)}</textarea>
      <label class="lbl" for="mat-name">Nome do mundo</label>
      <input id="mat-name" maxlength="40" placeholder="Ex.: Farmaco – Antibióticos" value="${esc(M.name)}" oninput="M.name=this.value;M.nameAuto=false">
      <label class="lbl" for="mat-amount">Quantidade de questões</label>
      <select id="mat-amount" onchange="M.amount=this.value">
        <option value="pouco" ${M.amount === "pouco" ? "selected" : ""}>Poucas (revisão rápida)</option>
        <option value="normal" ${M.amount === "normal" ? "selected" : ""}>Normal</option>
        <option value="muito" ${M.amount === "muito" ? "selected" : ""}>Muitas (material extenso)</option>
      </select>
      <p class="status" id="mat-status">${esc(M.status)}</p>
      <button class="btn primary block" ${M.busy ? "disabled" : ""} onclick="${ai ? "generateAI()" : "generateOffline()"}">${M.busy ? "Processando…" : ai ? "✨ Gerar jogos com IA" : "Gerar jogos (modo offline)"}</button>
      <p class="muted-txt small">${ai ? "A IA (Claude) lê o seu material e cria flashcards, quiz, V ou F, pares, quebra-cabeças e um caso clínico. Confira o conteúdo gerado." : "Modo offline: o app procura definições (“Termo: explicação” ou “X é …”) e listas numeradas no texto. Na versão publicada do MedQuest, a IA cria questões bem melhores."}${total ? ` · ${total.toLocaleString("pt-BR")} caracteres prontos.` : ""}</p>
    </div>

    ${S.materials.length ? `<h2 class="sec">Meus mundos gerados</h2>${S.materials.map((w) => `
      <div class="mini-card mat">
        <span class="w-ic">${w.icon}</span>
        <div>
          <input id="rn-${w.id}" value="${esc(w.name)}" maxlength="40" aria-label="Nome do mundo">
          <small>${esc(w.desc || "")} · ★ ${worldStars(w)}/${stagesOf(w).length * 3}</small>
          <div class="row"><button class="btn primary small-btn" onclick="go('world','${w.id}')">Jogar</button><button class="btn ghost small-btn" onclick="renameMaterial('${w.id}')">Salvar nome</button></div>
        </div>
        <button class="icon-btn" title="Excluir" onclick="deleteMaterial('${w.id}')">🗑️</button>
      </div>`).join("")}` : ""}

    <h2 class="sec">Meus flashcards</h2>
    <div class="panel">
      <div class="panel-h"><span class="p-ic">✍️</span><div><b>Criar flashcard</b><small>Escrever com suas palavras já ajuda a fixar</small></div></div>
      <label class="lbl" for="cf">Frente (pergunta)</label>
      <textarea id="cf" rows="2" maxlength="300" placeholder="Ex.: Antídoto da intoxicação por ferro?"></textarea>
      <label class="lbl" for="cb">Verso (resposta)</label>
      <textarea id="cb" rows="3" maxlength="600" placeholder="Ex.: Deferoxamina"></textarea>
      <label class="lbl" for="ct">Matéria</label>
      <select id="ct">${window.WORLDS.map((w) => `<option>${esc(w.name)}</option>`).join("")}<option>Outra</option></select>
      <button class="btn primary block" onclick="addCard()">Adicionar card</button>
    </div>
    ${S.custom.length ? `
      <button class="btn accent block" onclick="startCustom()">Estudar meus ${S.custom.length} card(s)</button>
      <div class="card-list">${S.custom.map((c) => `
        <div class="mini-card"><div><b>${esc(c.f)}</b><p>${esc(c.b)}</p><small>${esc(c.tag || "")}${S.srs[c.id] ? ` · revisão: ${new Date(S.srs[c.id].due).toLocaleDateString("pt-BR")}` : " · novo"}</small></div>
        <button class="icon-btn" title="Excluir" onclick="delCard('${c.id}')">🗑️</button></div>`).join("")}</div>`
    : `<p class="muted-txt center">Seus cards entram automaticamente na Revisão do dia.</p>`}`;
}
function addCard() {
  const f = document.getElementById("cf").value.trim();
  const b = document.getElementById("cb").value.trim();
  const tag = document.getElementById("ct").value;
  if (!f || !b) return toast("Preencha a frente e o verso. ✏️");
  S.custom.unshift({ id: `c:${Date.now().toString(36)}`, f, b, tag });
  addXp(3); checkMedals(); save();
  toast("Card criado! Ele já está na sua Revisão do dia. ✅");
  rerender();
}
function delCard(id) {
  ask("Excluir este card?", [{ label: "Excluir", cls: "danger", run: () => { S.custom = S.custom.filter((c) => c.id !== id); delete S.srs[id]; save(); rerender(); } }]);
}

// ---------- Perfil e avatar ----------
function profileScreen() {
  const L = levelInfo();
  const st = S.stats;
  const acc = st.answered ? Math.round((st.correct / st.answered) * 100) : 0;
  return `
    <div class="profile-head">
      <button class="av-edit" onclick="go('avatar')">${avatarHtml(S.avatar, 96)}<span>✏️ Editar avatar</span></button>
      <h1>${esc(S.nick || "Estudante")}</h1>
      <p>${esc(L.title)} · Nível ${L.lvl} · ${S.xp} XP</p>
      <button class="chip sem-chip" onclick="go('grade')">🎓 ${esc(semLabel())} · alterar</button>
      <div class="bar"><span style="width:${L.pct}%"></span></div>
      <small>${L.need - L.cur} XP para o nível ${L.lvl + 1}</small>
    </div>
    <div class="panel">
      <label class="lbl" for="nick">Seu apelido (aparece no ranking, nas batalhas e nos desafios)</label>
      <div class="code-row"><input id="nick" maxlength="24" value="${esc(S.nick)}" placeholder="Ex.: Ana – T12"><button class="btn primary" onclick="saveNick()">Salvar</button></div>
    </div>
    <div class="stats">
      <div><b>🔥 ${currentStreak()}</b><small>dias seguidos</small></div>
      <div><b>${S.bestStreak}</b><small>maior sequência</small></div>
      <div><b>${acc}%</b><small>acerto geral</small></div>
      <div><b>${st.answered}</b><small>questões</small></div>
      <div><b>${st.reviews}</b><small>revisões</small></div>
      <div><b>${weekXp()}</b><small>XP na semana</small></div>
    </div>
    <h2 class="sec">Medalhas <small>${medalCount(1)}/${MEDALS.length}</small></h2>
    <div class="achs">
      ${MEDALS.map((m) => {
        const tier = S.medals[m.id] || 0;
        const v = m.v();
        const nextT = m.t[tier];
        return `<div class="ach ${tier ? "on" : ""}" style="--tc:${tier ? TIERS[tier].c : "transparent"}">
          <span class="medal">${shieldSvg({ on: tier > 0, icon: m.icon, color: tier ? ["", "#e07b39", "#9fb4c8", "#ffb020"][tier] : "", size: 42 })}</span><b>${esc(m.name)}</b>
          <small>${tier ? `${TIERS[tier].n}` : "Bloqueada"}${nextT ? ` · ${Math.min(v, nextT)}/${nextT} ${esc(m.unit)}` : " · completa!"}</small>
          <span class="tiers">${[1, 2, 3].map((t) => `<i class="${tier >= t ? "on" : ""}" style="--c:${TIERS[t].c}"></i>`).join("")}</span>
        </div>`;
      }).join("")}
    </div>
    <h2 class="sec">Configurações</h2>
    <div class="panel">
      <label class="switch-row"><span>🔊 Sons</span><input type="checkbox" ${S.sound ? "checked" : ""} onchange="S.sound=this.checked;save();if(S.sound)sfx.ok()"></label>
      <button class="btn ghost block" onclick="showHelp()">❔ Como funciona</button>
      <button class="btn danger-ghost block" onclick="resetAll()">Apagar todo o progresso</button>
    </div>
    <p class="muted-txt center small">Conteúdo para fins educacionais. Sempre confira condutas em referências atualizadas.</p>`;
}
function saveNick() {
  const el = document.getElementById("nick");
  S.nick = (el ? el.value : "").trim().slice(0, 24);
  save(); scheduleSync(200); toast("Apelido salvo ✅"); rerender();
}
function avatarScreen() {
  const a = S.avatar;
  const lvl = levelInfo().lvl;
  const opt = (key, i, inner, locked, title) => `<button class="av-opt ${a[key] === i ? "on" : ""} ${locked ? "locked" : ""}" title="${esc(title || "")}" onclick="${locked ? `toast('🔒 ${esc(title)}')` : `setAv('${key}',${i})`}">${inner}${locked ? '<i class="lk">🔒</i>' : ""}</button>`;
  return `
    <div class="sub-head"><button class="back" onclick="go('profile')">‹</button><h1>Meu avatar</h1></div>
    <div class="av-preview">${avatarHtml(a, 140)}</div>
    <h2 class="sec">Personagem</h2>
    <div class="av-grid">${AV.base.map((b, i) => opt("base", i, avatarEmoji(Object.assign({}, a, { base: i })))).join("")}</div>
    <h2 class="sec">Tom de pele</h2>
    <div class="av-grid">${AV.skin.map((s, i) => opt("skin", i, `<span class="av-skin">${[...AV.base[0]][0]}${s}</span>`)).join("")}</div>
    <h2 class="sec">Cor de fundo</h2>
    <div class="av-grid">${AV.bg.map((c, i) => opt("bg", i, `<span class="swatch" style="background:${c}"></span>`)).join("")}</div>
    <h2 class="sec">Acessório <small>desbloqueie subindo de nível</small></h2>
    <div class="av-grid">${AV.acc.map((x, i) => opt("acc", i, x.e || "∅", lvl < x.lvl, lvl < x.lvl ? `Disponível no nível ${x.lvl}` : x.n)).join("")}</div>
    <h2 class="sec">Moldura <small>desbloqueie com conquistas</small></h2>
    <div class="av-grid">${AV.frame.map((f, i) => opt("frame", i, `<span class="swatch ring-sw" style="--c:${f.c}"></span><small>${esc(f.n)}</small>`, !f.ok(), f.ok() ? f.n : `Requer ${f.req}`)).join("")}</div>`;
}
function setAv(key, i) { S.avatar[key] = i; save(); scheduleSync(); rerender(); }
function resetAll() {
  const wipe = (keep) => {
    const custom = keep ? S.custom : [], materials = keep ? S.materials : [];
    const nick = S.nick, avatar = S.avatar;
    S = defaultState(); S.custom = custom; S.materials = materials; S.nick = nick; S.avatar = avatar; S.onboarded = true;
    save(); go("home"); toast("Progresso apagado.");
  };
  ask("Apagar todo o progresso? XP, estrelas, revisões, medalhas e erros serão zerados.", [
    { label: "Apagar, mas manter meus cards e materiais", cls: "danger", run: () => wipe(true) },
    { label: "Apagar tudo", cls: "danger-ghost", run: () => wipe(false) }
  ]);
}

// ---------- Início ----------
if (S.lastDay && S.lastDay !== today() && S.lastDay !== yesterday()) { S.streak = 0; save(); }
ensureDay();
labLoadCustom();
checkMedals();
rerender();
setTimeout(initOnline, 0);
try {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http") && !window.claude) navigator.serviceWorker.register("sw.js").catch(() => {});
} catch (e) { /* sem service worker */ }
