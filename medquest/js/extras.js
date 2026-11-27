/* MedQuest: Planner de estudos, Guia de técnicas de memorização e links de demonstração. */
"use strict";

S.planner = Object.assign({ exams: [] }, S.planner || {});

// ---------- Planner de estudos ----------
const dayMs = 86400000;
const dateKey = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const daysUntil = (iso) => Math.round((new Date(iso + "T00:00:00") - new Date(dateKey(new Date()) + "T00:00:00")) / dayMs);
function worldProgress(w) { const max = stagesOf(w).length * 3; return max ? Math.round((worldStars(w) / max) * 100) : 0; }
function worldDue(w) { const now = Date.now(); return Object.entries(S.srs).filter(([id, c]) => id.startsWith(w.id + ":") && c.due <= now).length; }
function plannerAdd() {
  const n = document.getElementById("pl-name"), d = document.getElementById("pl-date"), w = document.getElementById("pl-world");
  const name = (n.value || "").trim(), date = d.value, wid = w.value;
  if (!date) return toast("Escolha a data da prova.");
  if (daysUntil(date) < 0) return toast("Essa data já passou. Escolha uma data futura.");
  S.planner.exams.push({ id: "p" + Date.now().toString(36), name: name || `Prova de ${worldById(wid).name}`, date, wid });
  S.planner.exams.sort((a, b) => a.date.localeCompare(b.date)); save(); toast("📅 Prova adicionada ao planner."); rerender();
}
function plannerDel(id) { S.planner.exams = S.planner.exams.filter((e) => e.id !== id); save(); rerender(); }
// Plano dos próximos 7 dias: prioriza as provas mais próximas e as matérias com menos progresso.
function plannerWeek() {
  const ex = S.planner.exams.filter((e) => daysUntil(e.date) >= 0 && worldById(e.wid));
  const base = ex.length ? ex : (hasGrade() ? myGrade().map((wid) => ({ wid, date: null })) : []);
  if (!base.length) return [];
  const out = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(Date.now() + i * dayMs), key = dateKey(day);
    const scored = base.map((e) => {
      const w = worldById(e.wid), left = e.date ? daysUntil(e.date) - i : 30;
      return { e, w, left, s: left < 0 ? -1 : (e.date ? 100 / (left + 1) : 1) + (100 - worldProgress(w)) / 50 + ((i + hashStr(e.wid)) % 3) * 0.3 };
    }).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s);
    const picks = scored.slice(0, 2).map((x) => {
      const act = x.left === 0 ? "Dia da prova: revisão leve dos flashcards" : x.left === 1 ? "Véspera: simulado curto e caderno de erros" : x.left <= 3 ? "Quiz + caso clínico (chefão)" : worldProgress(x.w) < 40 ? "Flashcards novos + ligue os pares" : "Revisão espaçada + verdadeiro ou falso";
      return { w: x.w, act, left: x.left, exam: x.e.date ? x.e : null };
    });
    out.push({ key, day, picks });
  }
  return out;
}
function plannerScreen() {
  const worlds = window.WORLDS.slice().sort((a, b) => a.name.localeCompare(b.name));
  const week = plannerWeek(), wd = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const next = S.planner.exams.filter((e) => daysUntil(e.date) >= 0);
  return `
    <div class="sub-head"><button class="back" onclick="go('home')" aria-label="Voltar">‹</button><h1>Planner de estudos</h1></div>
    <p class="muted-txt">Cadastre suas provas. O MedQuest monta um plano para os próximos 7 dias e mostra o que revisar em cada matéria.</p>
    <div class="panel">
      <b>Adicionar prova</b>
      <label class="lbl" for="pl-name">Nome (opcional)</label><input id="pl-name" maxlength="60" placeholder="Ex.: P2 de Fisiologia">
      <div class="pl-row">
        <div><label class="lbl" for="pl-date">Data</label><input id="pl-date" type="date" min="${dateKey(new Date())}"></div>
        <div><label class="lbl" for="pl-world">Matéria</label><select id="pl-world">${worlds.map((w) => `<option value="${w.id}">${w.icon} ${esc(w.name)}</option>`).join("")}</select></div>
      </div>
      <button class="btn primary block" onclick="plannerAdd()">Adicionar ao planner</button>
    </div>
    <h2 class="sec">Próximas provas <small>${next.length}</small></h2>
    ${next.length ? `<div class="card-list">${next.map((e) => { const w = worldById(e.wid), d = daysUntil(e.date); return `
      <div class="mini-card exam"><span class="w-ic">${w ? w.icon : "📅"}</span><div><b>${esc(e.name)}</b>
        <p>${new Date(e.date + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} · <b class="${d <= 3 ? "bad-txt" : ""}">${d === 0 ? "é hoje" : d === 1 ? "amanhã" : `faltam ${d} dias`}</b></p>
        ${w ? `<span class="mbar"><em>Progresso</em><span class="bar"><span style="width:${worldProgress(w)}%"></span></span><small>${worldProgress(w)}%</small></span><p class="small">${worldDue(w)} card(s) para revisar hoje</p>
        <div class="row wrap"><button class="btn primary small-btn" onclick="go('world','${w.id}')">Estudar</button><button class="btn ghost small-btn" onclick="plannerSim('${w.id}')">Simulado da matéria</button></div>` : ""}</div>
        <button class="icon-btn" aria-label="Remover prova" onclick="plannerDel('${e.id}')">✕</button></div>`; }).join("")}</div>`
      : `<div class="panel center"><p>Nenhuma prova cadastrada. ${hasGrade() ? "Enquanto isso, o plano abaixo usa as matérias do seu semestre." : "Escolha seu semestre ou cadastre uma prova para gerar o plano."}</p></div>`}
    <h2 class="sec">Plano dos próximos 7 dias</h2>
    ${week.length ? `<div class="week">${week.map((d, i) => `<div class="wday ${i === 0 ? "today" : ""}"><div class="wd-h"><b>${i === 0 ? "Hoje" : wd[d.day.getDay()]}</b><small>${d.day.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</small></div>
      ${d.picks.map((p) => `<button class="wd-item" style="--c:${p.w.color}" onclick="go('world','${p.w.id}')"><span>${p.w.icon}</span><span><b>${esc(p.w.name)}</b><small>${esc(p.act)}</small></span></button>`).join("") || `<small class="muted-txt">Descanso ou revisão livre</small>`}</div>`).join("")}</div>`
      : `<p class="muted-txt">Cadastre uma prova ou escolha seu semestre para gerar o plano.</p>`}
    <p class="muted-txt small center">Dica: estudos curtos e frequentes rendem mais do que uma maratona na véspera.</p>`;
}
function plannerSim(wid) { SIMCFG.worlds = { [wid]: true }; SIMCFG.init = true; go("simcfg"); }

// ---------- Guia de técnicas de memorização ----------
const GUIDE = [
  { i: "🧠", t: "Recordação ativa", d: "Tente lembrar a resposta antes de olhar. O esforço de buscar a informação na memória é o que fortalece a lembrança.", how: "Leia a pergunta, diga a resposta em voz alta ou mentalmente e só então confira.", go: ["Flashcards", "go('review')"] },
  { i: "📅", t: "Repetição espaçada", d: "Revise em intervalos crescentes: no dia seguinte, depois de alguns dias, depois de uma semana. Cada revisão no momento certo dura mais.", how: "Avalie cada card (Errei, Difícil, Bom, Fácil). O MedQuest agenda a próxima revisão sozinho.", go: ["Revisão do dia", "go('review')"] },
  { i: "🔀", t: "Intercalação", d: "Misture assuntos e tipos de questão na mesma sessão. Fica mais difícil na hora, mas treina você a reconhecer o que cada questão pede, como na prova.", how: "Use o Contra o relógio ou o Simulado com várias matérias.", go: ["Contra o relógio", "startClock()"] },
  { i: "📝", t: "Testes práticos", d: "Fazer questões é uma das formas mais eficientes de estudar, não só de avaliar. Errar e entender o porquê também ensina.", how: "Faça simulados curtos e reveja a correção comentada de cada questão.", go: ["Simulado", "go('simcfg')"] },
  { i: "❓", t: "Elaboração", d: "Pergunte por quê e como: ligue o conteúdo novo ao que você já sabe, à fisiologia por trás e à aplicação clínica.", how: "Depois de responder, peça ao Tutor IA para explicar o raciocínio.", go: ["Tutor IA", "go('tutor')"] },
  { i: "🖼️", t: "Codificação dupla", d: "Combine palavras e imagens. Ver a estrutura em 3D enquanto lê sua função cria dois caminhos para a mesma lembrança.", how: "Estude anatomia no modelo 3D e leia a relevância clínica de cada estrutura.", go: ["Anatomia 3D", "go('lab')"] },
  { i: "🔤", t: "Mnemônicos", d: "Siglas, frases e histórias ajudam a guardar listas e sequências que não têm uma lógica própria.", how: "Crie seus cards com mnemônicos em Meu material e treine nos Quebra-cabeças.", go: ["Meu material", "go('materials')"] },
  { i: "🗣️", t: "Técnica Feynman", d: "Explique o assunto com palavras simples, como se ensinasse alguém. Onde você travar está a lacuna a estudar.", how: "Explique ao Tutor IA e peça que ele aponte erros e lacunas.", go: ["Tutor IA", "go('tutor')"] },
  { i: "🍅", t: "Blocos de foco", d: "Sessões curtas de foco total com pausas planejadas ajudam a manter a atenção e a constância.", how: "Use o Pomodoro de 25 minutos na tela de Revisão.", go: ["Pomodoro", "go('review')"] },
  { i: "😴", t: "Sono e constância", d: "O sono ajuda a consolidar o que foi estudado. Estudar um pouco todos os dias funciona melhor do que virar a noite.", how: "Mantenha a sequência de dias (🔥) e cumpra as missões diárias.", go: ["Missões", "go('home')"] }
];
function guideScreen() {
  return `
    <div class="sub-head"><button class="back" onclick="go('home')" aria-label="Voltar">‹</button><h1>Guia de memorização</h1></div>
    <p class="muted-txt">Técnicas de estudo com boa evidência científica e como aplicar cada uma no MedQuest.</p>
    <div class="guide">${GUIDE.map((g, k) => `
      <details class="panel guide-i" ${k === 0 ? "open" : ""}><summary><span class="g-ic">${g.i}</span><b>${esc(g.t)}</b></summary>
        <p>${esc(g.d)}</p><p class="small"><b>Como fazer:</b> ${esc(g.how)}</p>
        <button class="btn ghost small-btn" onclick="${g.go[1]}">Praticar: ${esc(g.go[0])}</button></details>`).join("")}</div>
    <p class="muted-txt small">Base: Dunlosky e colaboradores (2013), “Improving Students' Learning With Effective Learning Techniques”, Psychological Science in the Public Interest; e Roediger e Karpicke (2006), sobre o efeito do teste.</p>`;
}
SCREENS.planner = plannerScreen; SCREENS.guide = guideScreen;
TAB_OF.planner = "home"; TAB_OF.guide = "home";

// ---------- Links de demonstração (usados pela página de vendas) ----------
// #demo-anat, #demo-micro, #demo-err, #demo-ward abrem direto a simulação, sem onboarding.
(function demoBoot() {
  const map = { "#demo-anat": ["anat3d", "ini", "estudo"], "#demo-micro": ["micro-lab", "ini"], "#demo-err": ["err-enf", "ini"], "#demo-ward": ["ward-iam", "ini"] };
  const d = map[location.hash];
  if (!d) return;
  S.onboarded = true; S.semAsked = true;
  document.querySelectorAll(".modal").forEach((m) => m.remove());
  setTimeout(() => labLaunch(d[0], d[1], d[2]), 50);
})();
