/* MedQuest Lab — Anatomia: visualizador realista e interface em 3 colunas (progresso · modelo 3D · detalhes). */
"use strict";

const ANAT_HARD = ["linfonodos", "ducto_toracico", "hipofise", "tubas", "deferentes", "nervos_ms", "tronco_enc", "suprarrenais", "cerebelo", "duodeno", "apendice", "ureteres", "timo", "pulmonar"];
const ANAT_EASY = ["coracao", "pulmao_d", "pulmao_e", "figado", "estomago", "rins", "bexiga", "cranio", "femur", "coluna", "costelas", "encefalo", "traqueia", "umero", "esterno", "deltoide", "biceps", "quadriceps", "aorta", "intestino", "delgado", "grosso"];
const anatLevel = (id) => (ANAT_EASY.includes(id) ? ["FÁCIL", "low"] : ANAT_HARD.includes(id) ? ["DIFÍCIL", "hard"] : ["MÉDIO", "med"]);

async function anatView3D(el) {
  await loadThree();
  const v = createViewer(el, { mode: "orbit", target: [0, 0.93, 0], dist: 3.15, minDist: 0.18, maxDist: 5, transparent: true, env: "studio", fov: 34, exposure: 1.1 });
  LABV = v;
  const groups = {};
  ANAT.forEach((a) => { const g = anatRealGroup(a); v.add(g, a.id); groups[a.id] = g; });
  const skin = skinBody(); v.add(skin);
  const markers = {};
  let pulseFn = null;
  const api = {
    kind: "3d", groups,
    setVisible(id, b) { groups[id].visible = b; v.refresh(); },
    glow(id, color) { setGlow(groups[id], color === null ? null : color, 0.45); v.refresh(); },
    ghost(id, b) { setOpacity(groups[id], b ? 0.12 : null); v.refresh(); },
    skin(op) { skin.visible = op > 0.01; skin.traverse((m) => { if (m.material && m.material.uniforms) m.material.uniforms.s.value = op * 4.5; }); v.refresh(); },
    muscleOp(op) { ANAT.filter((a) => a.sys[0] === "muscular").forEach((a) => setOpacity(groups[a.id], op >= 0.99 ? null : op)); v.refresh(); },
    focus(id) { const c = anatCenter(anatById(id)); v.flyTo([c[0], c[1], c[2]], 0.75); },
    unfocus() { v.flyTo([0, 0.93, 0], 3.15); },
    onPick(cb) { v.onPick((h) => cb(h ? h.id : null)); }, onHover(cb) { v.onHover(cb); },
    labels(on, ids) { v.clearLabels(); if (on) (ids || []).forEach((id) => { const a = anatById(id); v.addLabel(a.n, anatCenter(a)); }); },
    callout(id, html) { v.setCallout(id ? anatCenter(anatById(id)) : null, html); },
    addMarker(key, pos, num) {
      const m = mEll(pos, [0.016, 0.016, 0.016], "#ff8a1f", { emissive: 0xff6a00, opacity: 0.9 });
      m.material.emissiveIntensity = 0.8;
      v.add(m, "mk:" + key); markers[key] = { m, L: v.addLabel(String(num), pos, "num") };
      v.animate((t) => { if (!markers[key]) return false; const s = 0.016 * (1 + 0.18 * Math.sin(t / 250)); m.scale.set(s, s, s); });
    },
    removeMarker(key) { const k = markers[key]; if (!k) return; k.m.visible = false; v.scene.remove(k.m); k.L.el.remove(); delete markers[key]; v.refresh(); },
    pulse(id) { const g = groups[id]; pulseFn = (t) => { if (api._pulse !== pulseFn) return false; setGlow(g, 0xffb020, 0.25 + 0.3 * Math.sin(t / 180)); }; api._pulse = pulseFn; v.animate(pulseFn); },
    stopPulse(id) { api._pulse = null; if (id) setGlow(groups[id], null); v.refresh(); },
    // Miniaturas: renderiza a estrutura isolada de vários ângulos + vista em contexto
    thumbs(id) {
      const a = anatById(id), c = anatCenter(a), st = v.st;
      const save = { t: st.target.clone(), r: st.r, th: st.theta, ph: st.phi };
      const vis = {}; Object.entries(groups).forEach(([k, g]) => (vis[k] = g.visible));
      const skinVis = skin.visible;
      const size = Math.max(...a.parts.map((p) => (p[0] === "e" || p[0] === "b" ? Math.max(...p[2]) : 0.06))) || 0.05;
      const shots = [];
      Object.values(groups).forEach((g) => (g.visible = false)); groups[id].visible = true; skin.visible = false;
      setGlow(groups[id], null);
      [[0, 1.45], [Math.PI / 2, 1.4], [Math.PI, 1.45]].forEach(([th, ph]) => { st.target.set(c[0], c[1], c[2]); st.r = Math.max(0.18, size * 5.5); st.theta = th; st.phi = ph; v.rotate(0); shots.push(v.snapshot()); });
      Object.entries(groups).forEach(([k, g]) => (g.visible = vis[k])); skin.visible = skinVis;
      st.target.set(c[0], c[1], c[2]); st.r = Math.max(0.35, size * 9); st.theta = 0; st.phi = 1.5; v.rotate(0); shots.push(v.snapshot());
      st.target.copy(save.t); st.r = save.r; st.theta = save.th; st.phi = save.ph; v.rotate(0);
      return shots;
    }
  };
  return api;
}

// ---------- Sessão ----------
async function anatLaunch(diff, sub) {
  const sim = labSim("anat3d");
  const SUBN = { estudo: "Estudo livre", localize: "Localize a estrutura", qual: "Qual é essa estrutura?", monte: "Monte o sistema", desafio: "Desafio anatômico" };
  labBegin(sim, diff, { sub, subLabel: SUBN[sub], objective: { estudo: "Explore os sistemas, camadas e estruturas.", localize: "Encontre no modelo a estrutura pedida.", qual: "Identifique a estrutura destacada.", monte: "Coloque cada estrutura na posição correta.", desafio: "Cumpra o máximo de missões antes do tempo acabar." }[sub],
    help: `<ul class="list"><li>Arraste para girar o corpo; pinça ou roda do mouse para aproximar.</li><li>Na barra inferior: camadas (pele e músculos), modo avaliação, giro automático e zoom.</li><li>No painel da esquerda, abra um sistema para ver e escolher as estruturas.</li><li>${sub === "estudo" ? "Toque numa estrutura para ver miniaturas, função, relevância clínica e as Ações de IA." : "Toque na estrutura para responder. Erros tiram pontos."}</li></ul>` });
  AN = { sub, diff, sex: "f", sys: new Set(["esqueletico", "cardiovascular", "respiratorio", "digestorio", "nervoso", "urinario", "endocrino", "linfatico", "reprodutor", "muscular"]), isolated: null, hidden: null, explored: new Set(S.lab.explored || []), score: 0, round: 0, correct: 0, total: 0, mistakes: [], good: [], evalMode: sub !== "estudo", open: "cardiovascular", skinOp: 0.12, musOp: 0.55 };
  if (sub !== "estudo") AN.sys.delete("muscular");
  const two = use2D();
  $app.innerHTML = labSceneShell({
    title: `Anatomia 3D · ${SUBN[sub]}`, objective: LABCTX.objective, progress: 0, score: sub === "estudo" ? undefined : 0, timer: sub === "desafio" ? "down" : "up", leftPanel: anatLeftHtml(), noCam: true,
    viewInner: `<div class="anat-bg"></div>${two ? "" : `<div class="view-tools">
      <div class="vt-group"><button title="Camadas" aria-label="Camadas" onclick="anatLayersToggle()">${ICON.layers}</button><button title="Modo avaliação (sem nomes)" aria-label="Modo avaliação" onclick="AN.evalMode=!AN.evalMode;anatRefreshPanels()" class="${AN.evalMode ? "on" : ""}">${ICON.eye}</button><button title="Giro automático" aria-label="Giro automático" onclick="LABV.setAuto(!LABV.st.auto)">${ICON.rotate}</button><button title="Recentralizar" aria-label="Recentralizar" onclick="AN.view.unfocus()">${ICON.target}</button><button class="mob-only" title="Sistemas" aria-label="Sistemas" onclick="document.getElementById('lab-left').classList.toggle('open')">${ICON.list}</button></div>
      <div class="vt-group"><button aria-label="Afastar" onclick="LABV.zoom(1.15);anatZoomLbl()">${ICON.minus}</button><span id="zoom-lbl">100%</span><button aria-label="Aproximar" onclick="LABV.zoom(0.87);anatZoomLbl()">${ICON.plus}</button></div>
      <div class="layers-pop" id="layers-pop" hidden>
        <label class="rng">Pele <input type="range" min="0" max="100" value="${AN.skinOp * 100}" oninput="AN.skinOp=this.value/100;AN.view.skin(AN.skinOp)"></label>
        <label class="rng">Músculos <input type="range" min="5" max="100" value="${AN.musOp * 100}" oninput="AN.musOp=this.value/100;AN.view.muscleOp(AN.musOp)"></label>
        <button class="btn ghost small-btn" onclick="AN.sex=AN.sex==='f'?'m':'f';anatSystemsOn(AN.sys);this.textContent='Modelo: '+(AN.sex==='f'?'feminino':'masculino')">Modelo: feminino</button>
      </div></div>`}`
  });
  const el = document.getElementById("lab-view");
  AN.view = two ? anatView2D(el) : await anatView3D(el);
  AN.view.onPick((id) => anatPick(id));
  AN.view.onHover((id) => { if (AN.sub === "estudo" && !AN.evalMode && AN.view.kind === "3d") LABV.el.title = id && anatById(id) ? anatById(id).n : ""; });
  anatSystemsOn(AN.sys);
  AN.view.skin(AN.skinOp); AN.view.muscleOp(sub === "estudo" ? AN.musOp : 1);
  if (sub === "estudo") { anatStudyPanel(); }
  else if (sub === "monte") anatMonteStart();
  else if (sub === "desafio") { AN.endAt = Date.now() + { ini: 120, int: 100, adv: 80 }[diff] * 1000; anatNextRound(); LABT.push(setInterval(() => { if (LABCTX && !LABCTX.pausedAt) { const left = AN.endAt - Date.now(); labTickHud(left); if (left <= 0) anatEnd(); } }, 250)); LABCTX.onResume = () => { AN.endAt += Date.now() - (LABCTX._pz || Date.now()); }; LABCTX.onPause = () => { LABCTX._pz = Date.now(); }; }
  else anatNextRound();
  if (sub !== "desafio") LABT.push(setInterval(() => labTickHud(), 1000));
}
function anatZoomLbl() { const l = document.getElementById("zoom-lbl"); if (l && LABV) l.textContent = LABV.zoomPct() + "%"; }
function anatLayersToggle() { const p = document.getElementById("layers-pop"); if (p) p.hidden = !p.hidden; }
function anatRefreshPanels() { const l = document.getElementById("lab-left"); if (l) l.innerHTML = anatLeftHtml(); if (AN.sub === "estudo") anatStudyPanel(AN.sel); }

// Coluna esquerda: progresso e sistemas como capítulos
function anatLeftHtml() {
  if (!AN) return "";
  const total = ANAT.length, done = AN.explored.size, pct = Math.round((done / total) * 100);
  const segs = 5, filled = Math.round((done / total) * segs * 10) / 10;
  const bySys = Object.entries(ANAT_SYS).map(([k, s]) => {
    const list = ANAT.filter((a) => a.sys[0] === k || (k === "endocrino" && a.sys.includes("endocrino")));
    const ex = list.filter((a) => AN.explored.has(a.id)).length;
    return { k, s, list, ex, p: list.length ? Math.round((ex / list.length) * 100) : 0 };
  });
  return `
    <div class="fs-card">
      <div class="fs-head">${ICON.book}<span></span></div>
      <h2>Anatomia Humana</h2><small>Atlas 3D interativo · MedQuest Lab</small>
      <div class="fs-prog"><div><span>PROGRESSO</span><b>${done}/${total} ESTRUTURAS (${pct}%)</b></div>
        <div class="segbar">${Array.from({ length: segs }, (_, i) => `<i style="--f:${Math.max(0, Math.min(1, filled - i))}"></i>`).join("")}</div></div>
      <dl class="fs-meta">
        <div><dt>${ICON.monitor} Tipo</dt><dd>Modelo 3D esquemático</dd></div>
        <div><dt>${ICON.chart} Nível</dt><dd>${esc(LAB_DIFF[AN.diff].n)}</dd></div>
        <div><dt>${ICON.clock} Sistemas</dt><dd>10 sistemas · ${total} estruturas</dd></div>
        <div><dt>${ICON.spark} IA</dt><dd>${aiOn() ? "Conectada" : "Modo offline"}</dd></div>
      </dl>
    </div>
    <div class="fs-card">
      <div class="fs-sub">${ICON.book}<b>10 Sistemas</b></div>
      ${bySys.map(({ k, s, list, ex, p }) => `
        <div class="chap ${AN.open === k ? "open" : ""} ${AN.sys.has(k) ? "" : "off"}">
          <button class="chap-h" onclick="AN.open=AN.open==='${k}'?null:'${k}';anatRefreshPanels()">
            <span class="ring-s" style="--p:${p}">${p === 100 ? "✓" : p + "%"}</span>
            <span class="chap-t"><small>Sistema</small><b>${esc(s.n)}</b></span>
            <span class="chap-eye" title="Mostrar ou ocultar" onclick="event.stopPropagation();anatToggleSys('${k}')">${AN.sys.has(k) ? ICON.eye : ICON.eyeOff}</span>
            <span class="chev">${ICON.chev}</span>
          </button>
          ${AN.open === k ? `<div class="chap-list">${list.map((a) => { const [lv, cls] = anatLevel(a.id); return `<button class="chap-item ${AN.sel === a.id ? "cur" : ""}" onclick="anatPickFromList('${a.id}')"><span class="ck ${AN.explored.has(a.id) ? "on" : ""}">${AN.explored.has(a.id) ? "✓" : AN.sel === a.id ? "▶" : ""}</span><span>${AN.evalMode && !AN.explored.has(a.id) && AN.sub !== "estudo" ? "?" : esc(a.n)}</span><em class="lv ${cls}">${ICON.bars}${lv}</em></button>`; }).join("")}</div>` : ""}
        </div>`).join("")}
    </div>`;
}
function anatPickFromList(id) {
  const a = anatById(id);
  if (!AN.sys.has(a.sys[0])) { AN.sys.add(a.sys[0]); anatSystemsOn(AN.sys); }
  document.getElementById("lab-left").classList.remove("open");
  if (AN.sub === "estudo") anatSelect(id);
  else AN.view.focus(id);
}
function anatToggleSys(k) { AN.sys.has(k) ? AN.sys.delete(k) : AN.sys.add(k); anatSystemsOn(AN.sys); anatRefreshPanels(); }
function anatAll(on) { AN.sys = new Set(on ? Object.keys(ANAT_SYS) : []); anatSystemsOn(AN.sys); anatRefreshPanels(); }
function anatIsolate(id) { AN.isolated = AN.isolated ? null : id; anatSystemsOn(AN.sys); if (AN.isolated) AN.view.focus(id); else AN.view.unfocus(); anatStudyPanel(AN.sel); }

// Seleção no estudo livre
function anatSelect(id) {
  if (AN.sel && AN.sel !== id) AN.view.glow(AN.sel, null);
  AN.sel = id; AN.revealed = false; AN.ai = null;
  if (!AN.explored.has(id)) { AN.explored.add(id); S.lab.explored = [...AN.explored]; save(); }
  sfx.flip();
  AN.thumbs = null;
  if (AN.view.kind === "3d") {
    AN.thumbs = AN.view.thumbs(id);
    AN.view.glow(id, 0x19c3c8);
    const a = anatById(id);
    AN.view.callout(id, `<img src="${AN.thumbs[0]}" alt=""><b>${AN.evalMode && !AN.revealed ? "?" : esc(a.n)}</b>`);
    const c = anatCenter(a); LABV.flyTo([c[0] * 0.5, c[1], c[2] * 0.3], 1.5);
  } else AN.view.glow(id, 0x19c3c8);
  anatRefreshPanels();
  setProgress(AN.explored.size / ANAT.length);
}
function anatNextPath() {
  const sysOrder = Object.keys(ANAT_SYS);
  const cur = AN.sel ? anatById(AN.sel).sys[0] : AN.open || "cardiovascular";
  const ordered = ANAT.filter((a) => a.sys[0] === cur).concat(ANAT.filter((a) => a.sys[0] !== cur).sort((x, y) => sysOrder.indexOf(x.sys[0]) - sysOrder.indexOf(y.sys[0])));
  return ordered.find((a) => !AN.explored.has(a.id) && a.id !== AN.sel && (!a.sex || a.sex === AN.sex)) || null;
}
function anatStudyPanel(sel) {
  const a = sel && anatById(sel);
  const goal = Math.min(DAILY_GOAL, dayVal("xp")), gp = Math.round((goal / DAILY_GOAL) * 100);
  const nxt = anatNextPath();
  const hidden = AN.evalMode && !AN.revealed;
  setSide(`
    <div class="fs-card detail">
      ${a ? `
        <h2>${hidden ? "Estrutura selecionada" : esc(a.n)}</h2><small>${hidden ? "Modo avaliação" : a.sys.map((s) => "Sistema " + ANAT_SYS[s].n.toLowerCase()).join(" · ")}</small>
        ${AN.thumbs ? `<div class="thumbs">${AN.thumbs.map((t, i) => `<figure><img src="${t}" alt="${["Vista anterior", "Vista lateral", "Vista posterior", "Em contexto"][i]}"><figcaption>${["Anterior", "Lateral", "Posterior", "Contexto"][i]}</figcaption></figure>`).join("")}</div>` : ""}
        ${hidden ? `<p class="muted-txt">Tente dizer o nome, a função e a relevância clínica antes de revelar.</p><button class="btn teal block" onclick="AN.revealed=true;anatSelect('${a.id}');AN.revealed=true;anatStudyPanel('${a.id}')">Revelar</button>` :
        `<p>${esc(a.info)} <b>Função:</b> ${esc(a.fn)}.</p><p class="clin"><b>Na clínica:</b> ${esc(a.clin)}.</p>`}
        <div class="ai-box">
          <div class="ai-box-h">${ICON.spark}<b>Ações de IA</b>${aiOn() ? "" : `<em>offline</em>`}</div>
          <div class="ai-acts">
            <button onclick="anatAI('explain')">${ICON.doc} Explicar clinicamente</button>
            <button onclick="anatAI('note')">${ICON.book} Adicionar às notas</button>
            <button onclick="anatAI('compare')">${ICON.compare} Comparar anatomia</button>
            <button onclick="anatAI('quiz')">${ICON.brain} Me teste</button>
          </div>
          <div class="ai-out" id="ai-out">${AN.ai || ""}</div>
        </div>
        <div class="row wrap"><button class="btn ghost small-btn" onclick="anatIsolate('${a.id}')">${AN.isolated ? "Mostrar todos" : "Isolar estrutura"}</button><button class="btn ghost small-btn" onclick="AN.view.focus('${a.id}')">Aproximar</button></div>
        <button class="btn teal block" onclick="${nxt ? `anatPickFromList('${nxt.id}')` : "anatEndStudy()"}">CONTINUAR</button>`
      : `<h2>Explore o corpo humano</h2><small>Toque numa estrutura do modelo ou escolha na lista à esquerda.</small>
        <p class="muted-txt">Você verá miniaturas da estrutura, a descrição, a função, a relevância clínica e as Ações de IA.</p>
        ${nxt ? `<button class="btn teal block" onclick="anatPickFromList('${nxt.id}')">COMEÇAR POR ${esc(nxt.n.toUpperCase())}</button>` : ""}`}
    </div>
    <div class="fs-card goal">
      <div class="fs-sub">${ICON.target}<b>Meta de estudo do dia</b></div>
      <div class="goal-row"><div class="donut" style="--p:${gp}"><span>${gp}%</span></div>
      <div><span class="chip-goal">${gp >= 100 ? "META BATIDA!" : gp >= 60 ? "QUASE LÁ!" : "BORA!"}</span><p class="goal-n"><b>${goal}</b> / ${DAILY_GOAL} <small>XP</small></p><small>${gp >= 100 ? "Você bateu a meta de hoje." : `Faltam ${DAILY_GOAL - goal} XP para a meta de hoje.`}</small></div></div>
    </div>
    ${nxt ? `<div class="fs-card"><div class="fs-sub">${ICON.next}<b>Próximo caminho</b></div><button class="next-path" onclick="anatPickFromList('${nxt.id}')"><span>${AN.evalMode ? "Estrutura não explorada" : esc(nxt.n)}</span><em class="lv ${anatLevel(nxt.id)[1]}">${ICON.bars}${anatLevel(nxt.id)[0]}</em></button></div>` : ""}
    <div class="fs-card"><small>Exploradas: <b>${AN.explored.size}</b> de ${ANAT.length}</small><button class="btn ghost block" onclick="anatEndStudy()">Concluir estudo</button></div>
    <p class="muted-txt small">Modelo 3D esquemático gerado por código, com posições e proporções aproximadas. Não substitui atlas, peças anatômicas e aulas práticas.</p>`);
}
async function anatAI(kind) {
  const a = anatById(AN.sel); if (!a) return;
  const out = document.getElementById("ai-out");
  const show = (html) => { AN.ai = html; const o = document.getElementById("ai-out"); if (o) o.innerHTML = html; };
  if (kind === "note") {
    const id = "c:anat-" + a.id;
    if (!S.custom.some((c) => c.id === id)) { S.custom.unshift({ id, f: `${a.n}: localização, função e clínica`, b: `${a.info} Função: ${a.fn}. Clínica: ${a.clin}.`, tag: "Anatomia 3D" }); addXp(3); save(); }
    return show(`<p class="ok-txt">✅ “${esc(a.n)}” foi para as suas notas e para a Revisão do dia.</p>`);
  }
  if (kind === "quiz") {
    const others = shuffle(ANAT.filter((x) => x.id !== a.id));
    AN.q = [
      { q: `Qual é a função de: ${a.n}?`, o: shuffle([a.fn, ...others.slice(0, 3).map((x) => x.fn)]), a: a.fn },
      { q: `A qual sistema pertence: ${a.n}?`, o: shuffle([ANAT_SYS[a.sys[0]].n, ...shuffle(Object.values(ANAT_SYS).map((s) => s.n).filter((n) => n !== ANAT_SYS[a.sys[0]].n)).slice(0, 3)]), a: ANAT_SYS[a.sys[0]].n },
      { q: `Qual estrutura está relacionada a: “${a.clin}”?`, o: shuffle([a.n, ...others.slice(3, 6).map((x) => x.n)]), a: a.n }
    ];
    AN.qi = 0; AN.qok = 0;
    return show(anatQuizHtml());
  }
  show(`<div class="bubble typing"><i></i><i></i><i></i></div>`);
  let prompt, ctx = `${a.n} (${a.sys.map((s) => ANAT_SYS[s].n).join(", ")}). ${a.info} Função: ${a.fn}. Clínica: ${a.clin}.`;
  if (kind === "explain") prompt = `Explique clinicamente a estrutura "${a.n}": anatomia relevante, função, como avaliar no exame físico e 2 situações clínicas importantes.`;
  else {
    const c = anatCenter(a);
    const near = ANAT.filter((x) => x.id !== a.id).map((x) => { const d = anatCenter(x); return { x, d: Math.hypot(d[0] - c[0], d[1] - c[1], d[2] - c[2]) }; }).sort((p, q) => p.d - q.d)[0].x;
    prompt = `Compare a anatomia de "${a.n}" com "${near.n}": localização, relação entre elas, função e por que é importante diferenciá-las na clínica.`;
    ctx += ` Estrutura vizinha: ${near.n}. ${near.info} Função: ${near.fn}.`;
    if (!aiOn()) return show(aiFormat(`🔌 Modo offline\n\n**${a.n}**\n${a.info} Função: ${a.fn}.\n\n**${near.n}** (estrutura vizinha)\n${near.info} Função: ${near.fn}.\n\n**Na clínica:** ${a.clin}; ${near.clin}.`));
  }
  if (!aiOn()) return show(aiFormat(`🔌 Modo offline\n\n**${a.n}**\n${a.info}\n\n**Função:** ${a.fn}.\n\n**Na clínica:** ${a.clin}.\n\n${aiSearch(a.n, 2).filter((h) => h.src !== "Anatomia 3D").map((h) => `• ${h.t}: ${h.b}`).join("\n")}`));
  const r = await aiAsk(prompt, { context: ctx, onText: (t) => show(aiFormat(t)) });
  show(aiFormat(r.text));
}
function anatQuizHtml() {
  const it = AN.q[AN.qi];
  if (!it) { addXp(AN.qok * 5); return `<p><b>${AN.qok}/3</b> acertos. ${AN.qok === 3 ? "Perfeito! 🏆" : "Revise a descrição acima e tente de novo."}</p>`; }
  return `<small>Pergunta ${AN.qi + 1} de 3</small><p><b>${esc(it.q)}</b></p>${it.o.map((o, i) => `<button class="opt" onclick="anatQuizAns(${i})"><span>${esc(o)}</span></button>`).join("")}`;
}
function anatQuizAns(i) {
  const it = AN.q[AN.qi], ok = it.o[i] === it.a;
  if (ok) { AN.qok++; sfx.ok(); } else sfx.bad();
  labFlash(ok ? "✅ Correto" : `❌ ${esc(it.a)}`, ok);
  AN.qi++; AN.ai = anatQuizHtml();
  const o = document.getElementById("ai-out"); if (o) o.innerHTML = AN.ai;
}

// Ícones de linha (estilo das referências)
const ICON = (() => {
  const s = (d, w = 18) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  return {
    layers: s('<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="m2 13 10 5 10-5"/><path d="m2 17 10 5 10-5"/>'),
    eye: s('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    eyeOff: s('<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.8 9.8 0 0 0 5.4-1.6"/>'),
    rotate: s('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>'),
    target: s('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    list: s('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    plus: s('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>'),
    minus: s('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6"/>'),
    book: s('<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>'),
    monitor: s('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'),
    chart: s('<path d="M4 20V10M10 20V4M16 20v-6M22 20H2"/>'),
    clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    spark: s('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>'),
    doc: s('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'),
    compare: s('<path d="M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4"/>'),
    brain: s('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>'),
    next: s('<path d="M5 4l10 8-10 8z"/><path d="M19 5v14"/>'),
    chev: s('<path d="m6 9 6 6 6-6"/>', 16),
    bars: s('<path d="M5 20v-4M12 20v-9M19 20V6"/>', 12),
    bell: s('<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    menu: s('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    scan: s('<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/>'),
    map: s('<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
    flask: s('<path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-11V3"/><path d="M7 15h10"/>'),
    swords: s('<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 6.5 21 3v3l-6 6M5 14l-2 2 3 3 2-2"/>'),
    repeat: s('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'),
    folder: s('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    user: s('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>')
  };
})();
