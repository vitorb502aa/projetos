/* MedQuest: IA central (Tutor IA e ações de IA espalhadas pelo app).
   Com a IA da página publicada (claude.use("sample")), as respostas são geradas pelo Claude.
   Sem ela, o tutor responde no modo offline, buscando no próprio conteúdo do MedQuest. */
"use strict";

const aiOn = () => !!(typeof ON !== "undefined" && ON.sample);
const AI_SYS = "Você é o Tutor IA do MedQuest, um app de estudo para estudantes de medicina no Brasil. Responda em português do Brasil, de forma didática, correta e objetiva (no máximo 220 palavras, use tópicos quando ajudar). Conteúdo educacional: não dê orientação para pacientes reais nem prescrições individuais; quando o tema for conduta, lembre de conferir diretrizes atualizadas.";

// Texto simples com **negrito**, listas e quebras de linha (sempre escapado)
function aiFormat(t) {
  return esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/^#{1,3}\s*(.+)$/gm, "<b>$1</b>").replace(/^\s*[-•]\s+(.+)$/gm, "<span class='ai-li'>• $1</span>").replace(/\n/g, "<br>");
}
async function aiAsk(prompt, o = {}) {
  if (!aiOn()) return { text: aiOffline(prompt, o.context), offline: true };
  try {
    const r = await ON.sample(`${AI_SYS}\n\n${o.context ? "Contexto: " + o.context + "\n\n" : ""}${prompt}`, { modelTier: "default", onText: o.onText ? ({ text }) => o.onText(text) : undefined });
    return { text: r.text };
  } catch (e) {
    const msg = e && e.code === "not_granted" ? "Você não autorizou o uso da IA nesta página." : e && e.code === "rate_limited" ? "Muitas perguntas seguidas. Espere um pouco." : "A IA não respondeu agora.";
    return { text: `${msg}\n\n${aiOffline(prompt, o.context)}`, offline: true };
  }
}
// Busca no conteúdo do app (modo offline)
const STOP = new Set("a o os as de da do das dos e em no na nos nas um uma para por com que qual quais é ser como sobre me explique explica o que mais".split(" "));
function aiTokens(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)); }
function aiSearch(q, n = 5) {
  const qt = aiTokens(q);
  if (!qt.length) return [];
  const docs = [];
  allWorlds().forEach((w) => {
    (w.flashcards || []).forEach((c) => docs.push({ t: c.f, b: c.b, src: w.name }));
    (w.quiz || []).forEach((x) => docs.push({ t: x.q, b: `${x.o[x.a]}. ${x.e}`, src: w.name }));
    (w.tf || []).forEach((x) => docs.push({ t: x.s, b: x.e, src: w.name }));
  });
  if (typeof ANAT !== "undefined") ANAT.forEach((a) => docs.push({ t: a.n, b: `${a.info} Função: ${a.fn}. Na clínica: ${a.clin}.`, src: "Anatomia 3D" }));
  return docs.map((d) => { const dt = aiTokens(d.t + " " + d.b); const sc = qt.reduce((s, w) => s + (dt.includes(w) ? (aiTokens(d.t).includes(w) ? 3 : 1) : 0), 0); return { d, sc }; })
    .filter((x) => x.sc > 0).sort((a, b) => b.sc - a.sc).slice(0, n).map((x) => x.d);
}
function aiOffline(prompt, context) {
  const hits = aiSearch((context || "") + " " + prompt, 4);
  if (!hits.length) return "🔌 Modo offline: não encontrei esse tema no conteúdo do MedQuest. Na versão publicada, o Tutor IA responde qualquer pergunta.";
  return "🔌 Modo offline (respostas do conteúdo do app):\n\n" + hits.map((h) => `**${h.t}**\n${h.b} (${h.src})`).join("\n\n");
}
// Quiz rápido gerado a partir do conteúdo do app (sempre disponível)
function aiQuizOffline(topic, n = 3) {
  const pool = [];
  allWorlds().forEach((w) => (w.quiz || []).forEach((x) => pool.push({ ...x, tag: w.name })));
  const qt = aiTokens(topic);
  let items = pool.map((x) => ({ x, sc: qt.reduce((s, w) => s + (aiTokens(x.q + " " + x.o.join(" ") + " " + x.e).includes(w) ? 1 : 0), 0) })).filter((y) => y.sc > 0).sort((a, b) => b.sc - a.sc).map((y) => y.x);
  if (items.length < n) items = items.concat(shuffle(pool).slice(0, n - items.length));
  return items.slice(0, n).map((x) => prepItem(x));
}

// ---------- Tutor IA (tela central) ----------
S.tutor = Array.isArray(S.tutor) ? S.tutor.slice(-30) : [];
let TUT = { busy: false, quiz: null };
function tutorScreen() {
  const msgs = S.tutor;
  const weak = Object.entries(S.lab && S.lab.weak || {}).filter(([, w]) => w.n > 3).sort((a, b) => b[1].miss / b[1].n - a[1].miss / a[1].n).slice(0, 1).map(([k]) => (worldById(k) || {}).name).filter(Boolean)[0];
  const quick = [
    ["🧠", "Explique um conceito", "Explique de forma simples: "],
    ["📝", "Crie um quiz para mim", "quiz:"],
    ["🗓️", "Plano de estudo do semestre", `Monte um plano de estudo semanal para o ${semLabel()}, com as matérias: ${(hasGrade() ? myGrade().map((id) => worldById(id).name) : ["Anatomia", "Fisiologia"]).join(", ")}. Use revisão espaçada e simulados.`],
    ["❌", "Revise meus erros", `Explique os pontos em que errei recentemente: ${S.errors.slice(0, 5).map((e) => e.q).join(" | ") || "ainda não tenho erros registrados"}.`],
    ["🩺", "Caso clínico rápido", "Crie um caso clínico curto e fictício para eu treinar raciocínio, e me faça uma pergunta sobre ele."]
  ];
  return `
    <div class="tutor">
      <section class="tutor-hero">
        <div class="tutor-bot">${mascotSvg(64)}</div>
        <div><span class="tag">${aiOn() ? "✨ IA conectada" : "🔌 Modo offline"}</span><h1>Tutor IA</h1>
        <p>Tire dúvidas, peça explicações, quizzes, casos clínicos e planos de estudo.${weak ? ` Seu ponto fraco agora: <b>${esc(weak)}</b>.` : ""}</p></div>
      </section>
      <div class="quick-ai">${quick.map(([i, t, p]) => `<button onclick="tutorQuick(${JSON.stringify(p).replace(/"/g, "&quot;")})"><span>${i}</span>${esc(t)}</button>`).join("")}</div>
      <div class="chat" id="chat">
        ${msgs.length ? msgs.map(tutorMsgHtml).join("") : `<div class="msg bot"><div class="bubble">Olá! Sou o seu Tutor IA. Pergunte qualquer coisa sobre as matérias. Por exemplo: “qual a diferença entre síndrome nefrótica e nefrítica?”</div></div>`}
        ${TUT.busy ? `<div class="msg bot"><div class="bubble typing" id="typing"><i></i><i></i><i></i></div></div>` : ""}
        ${TUT.quiz ? tutorQuizHtml() : ""}
      </div>
      <form class="chat-in" onsubmit="event.preventDefault();tutorSend()">
        <textarea id="tut-in" rows="1" placeholder="Pergunte ao Tutor IA…" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();tutorSend()}"></textarea>
        <button class="btn primary" type="submit" ${TUT.busy ? "disabled" : ""}>Enviar</button>
      </form>
      ${msgs.length ? `<button class="btn ghost small-btn" onclick="S.tutor=[];TUT.quiz=null;save();rerender()">Limpar conversa</button>` : ""}
      <p class="muted-txt small">Conteúdo educacional. A IA pode errar: confira condutas em diretrizes atualizadas.</p>
    </div>`;
}
function tutorMsgHtml(m) { return `<div class="msg ${m.r}"><div class="bubble">${m.r === "bot" ? aiFormat(m.t) : esc(m.t)}</div></div>`; }
function tutorQuick(p) {
  if (p === "quiz:") { const el = document.getElementById("tut-in"); const topic = (el && el.value.trim()) || (hasGrade() ? worldById(myGrade()[0]).name : "Fisiologia"); return tutorQuiz(topic); }
  const el = document.getElementById("tut-in");
  if (p.endsWith(": ")) { if (el) { el.value = p; el.focus(); } return; }
  tutorSend(p);
}
async function tutorSend(text) {
  const el = document.getElementById("tut-in");
  const q = (text || (el && el.value) || "").trim();
  if (!q || TUT.busy) return;
  S.tutor.push({ r: "me", t: q }); TUT.busy = true; save(); rerender(); tutorScroll();
  const hist = S.tutor.slice(-6, -1).map((m) => `${m.r === "me" ? "Estudante" : "Tutor"}: ${m.t}`).join("\n");
  const res = await aiAsk(q, { context: hist, onText: (t) => { const ty = document.getElementById("typing"); if (ty) { ty.classList.remove("typing"); ty.innerHTML = aiFormat(t); tutorScroll(); } } });
  TUT.busy = false;
  S.tutor.push({ r: "bot", t: res.text }); S.tutor = S.tutor.slice(-30);
  addXp(2); save();
  if (view.name === "tutor" && !G) { rerender(); tutorScroll(); }
}
function tutorScroll() { const c = document.getElementById("chat"); if (c) c.scrollTop = c.scrollHeight; window.scrollTo(0, document.body.scrollHeight); }
async function tutorQuiz(topic) {
  S.tutor.push({ r: "me", t: `Crie um quiz sobre: ${topic}` });
  let items = null;
  if (aiOn()) {
    TUT.busy = true; rerender();
    try {
      const data = await ON.sample.json(`${AI_SYS}\nCrie 3 questões de múltipla escolha sobre "${topic}" para estudante de medicina. Responda só JSON: {"q":[{"q":"enunciado","o":["A","B","C","D"],"a":0,"e":"explicação"}]}`, { modelTier: "default" });
      items = (data.q || []).map(cleanMC).filter(Boolean).map((x) => prepItem(Object.assign(x, { tag: topic })));
    } catch (e) { items = null; }
    TUT.busy = false;
  }
  if (!items || !items.length) items = aiQuizOffline(topic, 3);
  TUT.quiz = { topic, items, i: 0, ok: 0, chosen: null };
  S.tutor.push({ r: "bot", t: `Vamos lá! 3 questões sobre **${topic}**${aiOn() ? "" : " (modo offline, do banco do app)"}.` });
  save(); rerender(); tutorScroll();
}
function tutorQuizHtml() {
  const z = TUT.quiz, it = z.items[z.i];
  if (!it) return `<div class="msg bot"><div class="bubble">Fim do quiz: <b>${z.ok}/${z.items.length}</b> acertos. ${z.ok === z.items.length ? "Excelente! 🏆" : "Os erros foram para o seu caderno de erros."}</div></div>`;
  return `<div class="msg bot"><div class="bubble quiz-b"><small>Questão ${z.i + 1} de ${z.items.length}</small><p><b>${esc(it.q)}</b></p>
    ${it.opts.map((o, i) => `<button class="opt ${z.chosen !== null ? (i === it.ans ? "correct" : i === z.chosen ? "wrong" : "dim") : ""}" ${z.chosen !== null ? "disabled" : ""} onclick="tutorQuizAns(${i})"><span class="k">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}
    ${z.chosen !== null ? `<p class="small">${esc(it.e || "")}</p><button class="btn primary small-btn" onclick="TUT.quiz.i++;TUT.quiz.chosen=null;rerender();tutorScroll()">${z.i + 1 < z.items.length ? "Próxima" : "Ver resultado"}</button>` : ""}</div></div>`;
}
function tutorQuizAns(i) {
  const z = TUT.quiz, it = z.items[z.i];
  z.chosen = i; S.stats.answered++;
  if (i === it.ans) { z.ok++; S.stats.correct++; bump("correct"); addXp(8); sfx.ok(); } else { addError(Object.assign({ errKey: "tut:" + hashStr(it.q) }, it)); sfx.bad(); }
  save(); rerender(); tutorScroll();
}
// Botão "Explicar com IA" nos feedbacks das questões
async function aiExplainItem(q, ans, e) {
  const m = document.createElement("div");
  m.className = "modal ai-modal";
  m.innerHTML = `<div class="modal-card left wide"><div class="ai-head">${mascotSvg(36)}<b>Tutor IA</b><span class="tag">${aiOn() ? "IA" : "offline"}</span></div><div class="ai-body" id="ai-body"><div class="bubble typing"><i></i><i></i><i></i></div></div><button class="btn primary block" onclick="this.closest('.modal').remove()">Fechar</button></div>`;
  document.body.appendChild(m);
  const out = m.querySelector("#ai-body");
  const res = await aiAsk(`Explique por que a resposta correta da questão abaixo é "${ans}". Dê o raciocínio, o conceito-chave e uma dica para memorizar.\nQuestão: ${q}\nExplicação curta do gabarito: ${e}`, { onText: (t) => (out.innerHTML = aiFormat(t)), context: q });
  out.innerHTML = aiFormat(res.offline ? `${e}\n\n${res.text}` : res.text);
}
// Mascote do tutor (SVG próprio)
function mascotSvg(s = 48) {
  return `<svg viewBox="0 0 64 64" width="${s}" height="${s}" aria-hidden="true"><defs><radialGradient id="mg${s}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd07a"/><stop offset=".55" stop-color="#ff8a1f"/><stop offset="1" stop-color="#c2410c"/></radialGradient></defs>
    <circle cx="32" cy="32" r="30" fill="url(#mg${s})"/><rect x="14" y="20" width="36" height="26" rx="13" fill="#2a1406"/>
    <circle cx="25" cy="33" r="5" fill="#ffe8c2"/><circle cx="39" cy="33" r="5" fill="#ffe8c2"/><circle cx="26" cy="33" r="2.2" fill="#2a1406"/><circle cx="40" cy="33" r="2.2" fill="#2a1406"/>
    <path d="M27 41 q5 4 10 0" stroke="#ffe8c2" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M32 6 v8" stroke="#2a1406" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="6" r="3.5" fill="#ffd07a"/></svg>`;
}
