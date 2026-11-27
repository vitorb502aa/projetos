/* MedQuest: transforma PDFs, slides, resumos e anotações em jogos.
   1) Extrai o texto no próprio navegador (PDF com pdf.js; PPTX e DOCX com JSZip; TXT e MD direto).
   2) Gera flashcards, quiz, V ou F, pares, quebra-cabeças e caso clínico:
      - com IA (Claude), quando a página publicada oferece claude.use("sample");
      - ou no modo offline, a partir de definições e listas encontradas no texto. */
"use strict";

const LIBS = {
  pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  pdfWorker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  zip: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
};
const MAX_PDF_PAGES = 200;
const M = { files: [], text: "", sources: [], images: [], busy: false, status: "", name: "", amount: "normal", cycle: "meu", paste: "" };

function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = () => rej(new Error("Não foi possível carregar " + src));
    document.head.appendChild(s);
  });
}
async function ensurePdf() {
  if (window.pdfjsLib && window.pdfjsWorker) return;
  await loadScript(LIBS.pdf);
  await loadScript(LIBS.pdfWorker); // roda no mesmo processo da página (sem Web Worker externo)
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = LIBS.pdfWorker;
}
async function ensureZip() { if (!window.JSZip) await loadScript(LIBS.zip); }

async function pdfText(buf) {
  await ensurePdf();
  const doc = await window.pdfjsLib.getDocument({ data: buf, isEvalSupported: false }).promise;
  const n = Math.min(doc.numPages, MAX_PDF_PAGES);
  const pages = [];
  for (let i = 1; i <= n; i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    let line = "", out = [];
    tc.items.forEach((it) => { line += it.str; if (it.hasEOL) { out.push(line); line = ""; } else line += " "; });
    if (line.trim()) out.push(line);
    pages.push(out.join("\n"));
    setStatus(`Lendo PDF… página ${i} de ${n}`);
  }
  return pages.join("\n\n");
}
function xmlParagraphs(xml, pTag, tTag) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  return Array.from(doc.getElementsByTagName(pTag)).map((p) => Array.from(p.getElementsByTagName(tTag)).map((t) => t.textContent).join("")).filter((s) => s.trim());
}
async function pptxText(buf) {
  await ensureZip();
  const zip = await window.JSZip.loadAsync(buf);
  const slides = Object.keys(zip.files).filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
    .sort((a, b) => +a.match(/(\d+)\.xml/)[1] - +b.match(/(\d+)\.xml/)[1]);
  const out = [];
  for (const f of slides) out.push(xmlParagraphs(await zip.file(f).async("string"), "a:p", "a:t").join("\n"));
  return out.join("\n\n");
}
async function docxText(buf) {
  await ensureZip();
  const zip = await window.JSZip.loadAsync(buf);
  const f = zip.file("word/document.xml");
  if (!f) throw new Error("Documento Word sem conteúdo legível.");
  return xmlParagraphs(await f.async("string"), "w:p", "w:t").join("\n");
}

function setStatus(s) { M.status = s; const el = document.getElementById("mat-status"); if (el) el.textContent = s; }

function onMatFiles(input) { M.files = Array.from(input.files || []); readMaterials(); }

async function readMaterials() {
  if (M.busy) return;
  M.busy = true; M.sources = []; M.images = [];
  const texts = [];
  rerender();
  try {
    for (const f of M.files) {
      const name = f.name.toLowerCase();
      setStatus(`Lendo ${f.name}…`);
      let t = "";
      try {
        if (name.endsWith(".pdf")) t = await pdfText(await f.arrayBuffer());
        else if (name.endsWith(".pptx")) t = await pptxText(await f.arrayBuffer());
        else if (name.endsWith(".docx")) t = await docxText(await f.arrayBuffer());
        else if (/\.(txt|md|markdown|csv)$/.test(name)) t = await f.text();
        else if (/^image\//.test(f.type)) { M.images.push(f); M.sources.push({ name: f.name, chars: 0, img: true }); continue; }
        else if (/\.(ppt|doc)$/.test(name)) throw new Error("formato antigo: salve como .pptx/.docx ou PDF");
        else throw new Error("formato não suportado");
      } catch (e) {
        M.sources.push({ name: f.name, chars: 0, err: e.message || "erro ao ler" });
        continue;
      }
      t = t.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
      M.sources.push({ name: f.name, chars: t.length, err: t.length < 20 ? "sem texto (pode ser um PDF escaneado; tente fotos das páginas)" : "" });
      if (t.length >= 20) texts.push(`### ${f.name}\n${t}`);
    }
    M.text = texts.join("\n\n");
    if ((!M.name || M.nameAuto) && M.files[0]) { M.name = M.files[0].name.replace(/\.[^.]+$/, "").slice(0, 40); M.nameAuto = true; }
    setStatus("");
  } finally { M.busy = false; rerender(); }
}

function materialText() { return [M.text, M.paste.trim()].filter(Boolean).join("\n\n"); }

// ---------- Geração com IA ----------
const AMOUNTS = { pouco: { fc: 8, q: 6, tf: 6 }, normal: { fc: 15, q: 10, tf: 10 }, muito: { fc: 25, q: 18, tf: 15 } };

function aiPrompt(text, amt, cut) {
  return `Você é um professor de medicina e cria material de estudo gamificado em português do Brasil.
Use EXCLUSIVAMENTE o material do estudante abaixo (aulas, slides, resumos ou anotações). Não invente fatos que não estejam no material. Se algo no material parecer errado, não use.
${cut ? "O material foi cortado por ser longo; use o trecho disponível.\n" : ""}Responda APENAS com um JSON válido, sem texto antes ou depois, neste formato:
{"titulo":"tema curto","icone":"um emoji","flashcards":[{"f":"pergunta curta","b":"resposta objetiva"}],"quiz":[{"q":"enunciado","o":["alternativa A","B","C","D"],"a":0,"e":"explicação curta"}],"vf":[{"s":"afirmação","v":true,"e":"explicação curta"}],"pares":[["termo","definição com até 6 palavras"]],"sequencias":[{"t":"título","items":["passo 1","passo 2","passo 3"],"e":"explicação curta"}],"caso":{"title":"título","story":"caso clínico curto","steps":[{"q":"pergunta","o":["A","B","C","D"],"a":0,"e":"explicação"}]}}
Regras:
- ${amt.fc} flashcards, ${amt.q} questões de quiz com 4 alternativas plausíveis (varie a posição da correta; "a" é o índice de 0 a 3), ${amt.tf} afirmações de verdadeiro ou falso (metade falsas, com a correção na explicação) e 6 pares.
- "sequencias": até 2, SOMENTE se o material tiver processos, etapas, vias ou estruturas com ordem real (por exemplo, camadas, cascatas, ciclos). Caso contrário, use [].
- "caso": um caso clínico com 3 etapas, se o conteúdo permitir; caso contrário, null.
- Priorize o que mais cai em prova e os conceitos centrais. Textos curtos e claros.

MATERIAL:
"""
${text}
"""`;
}

function cleanStr(s, max = 400) { return String(s == null ? "" : s).replace(/\s+/g, " ").trim().slice(0, max); }
function cleanMC(x) {
  if (!x || !Array.isArray(x.o)) return null;
  const o = x.o.map((v) => cleanStr(v, 200)).filter(Boolean).slice(0, 5);
  const a = Number(x.a);
  if (o.length < 2 || !(a >= 0 && a < o.length) || !cleanStr(x.q)) return null;
  return { q: cleanStr(x.q, 600), o, a, e: cleanStr(x.e, 500) || "Revise este ponto no seu material." };
}
function worldFromAI(data, name) {
  const d = data && typeof data === "object" ? data : {};
  const w = {
    flashcards: (d.flashcards || []).map((c) => ({ f: cleanStr(c && c.f, 300), b: cleanStr(c && c.b, 500) })).filter((c) => c.f && c.b).slice(0, 40),
    quiz: (d.quiz || []).map(cleanMC).filter(Boolean).slice(0, 30),
    tf: (d.vf || d.tf || []).map((t) => ({ s: cleanStr(t && t.s, 400), v: !!(t && t.v), e: cleanStr(t && t.e, 400) || "" })).filter((t) => t.s).slice(0, 25),
    pairs: (d.pares || d.pairs || []).filter((p) => Array.isArray(p) && p[0] && p[1]).map((p) => [cleanStr(p[0], 60), cleanStr(p[1], 80)]).slice(0, 8),
    seq: (d.sequencias || d.seq || []).filter((s) => s && Array.isArray(s.items) && s.items.length >= 3).map((s) => ({ t: cleanStr(s.t, 120) || "Monte a sequência", items: s.items.map((i) => cleanStr(i, 80)).filter(Boolean).slice(0, 9), e: cleanStr(s.e, 300) })).filter((s) => s.items.length >= 3).slice(0, 3),
    cases: []
  };
  const c = d.caso || d.case;
  if (c && Array.isArray(c.steps)) {
    const steps = c.steps.map(cleanMC).filter(Boolean).slice(0, 5);
    if (steps.length >= 2 && cleanStr(c.story)) w.cases.push({ title: cleanStr(c.title, 80) || "Caso clínico", story: cleanStr(c.story, 1200), steps });
  }
  return finalizeWorld(w, name || cleanStr(d.titulo, 40) || M.name, cleanStr(d.icone, 4));
}

async function generateAI() {
  const text = materialText();
  if (!ON.sample) return generateOffline();
  if (text.length < 200 && !M.images.length) return toast("Envie ou cole mais conteúdo (pelo menos um parágrafo).");
  M.busy = true; rerender(); setStatus("Preparando…");
  try {
    const maxBytes = ((ON.limits && ON.limits.maxPromptBytes) || 100000) - 4000;
    const enc = new TextEncoder();
    let body = text, cut = false;
    const budget = Math.min(maxBytes, 150000);
    if (enc.encode(body).length > budget) { cut = true; body = body.slice(0, Math.floor(budget / 1.15)); while (enc.encode(body).length > budget) body = body.slice(0, Math.floor(body.length * 0.95)); }
    const opts = { modelTier: "default", onText: ({ text: t }) => setStatus(`Criando seus jogos com IA… ${t.length.toLocaleString("pt-BR")} caracteres gerados`) };
    const imgs = M.images.slice(0, (ON.limits && ON.limits.images && ON.limits.images.maxCount) || 0);
    if (imgs.length) opts.images = imgs;
    let prompt = aiPrompt(body || "(o conteúdo está nas imagens anexadas: leia o texto das fotos de anotações ou slides)", AMOUNTS[M.amount], cut);
    const data = await ON.sample.json(prompt, opts);
    const w = worldFromAI(data, M.nameAuto ? "" : M.name);
    if (!countItems(w)) throw { code: "empty_completion", message: "A IA não conseguiu criar questões com esse material." };
    saveMaterialWorld(w, cut);
  } catch (e) {
    const code = e && e.code;
    const msg = code === "not_granted" ? "Você não autorizou o uso da IA nesta página."
      : code === "rate_limited" ? "Muitas gerações seguidas. Espere um pouco e tente de novo."
      : code === "prompt_too_large" ? "O material é grande demais. Envie menos arquivos por vez."
      : (e && e.message) || "Não foi possível gerar agora.";
    toast("⚠️ " + esc(msg));
    setStatus("");
  } finally { M.busy = false; rerender(); }
}

// ---------- Geração offline (sem IA) ----------
function generateOffline() {
  const text = materialText();
  if (text.length < 100) return toast("Envie ou cole mais conteúdo (pelo menos um parágrafo).");
  const w = offlineWorld(text);
  if (countItems(w) < 3) return toast("Não encontrei definições suficientes. Escreva no formato “Termo: explicação” ou “Termo é …”.");
  saveMaterialWorld(finalizeWorld(w, M.name), false, true);
}
function offlineWorld(text) {
  const lines = text.split(/\n+/).map((l) => l.replace(/^[\s•\-–*·▪●◦]+/, "").trim()).filter(Boolean);
  const defs = [];
  const seen = new Set();
  const addDef = (t, d) => {
    t = cleanStr(t, 70).replace(/[:\-–]+$/, ""); d = cleanStr(d, 300);
    if (t.length < 3 || d.length < 8 || t.split(" ").length > 8 || seen.has(t.toLowerCase())) return;
    seen.add(t.toLowerCase()); defs.push({ t, d });
  };
  lines.forEach((l) => {
    let m = l.match(/^([^:]{3,70}):\s+(.{8,})$/) || l.match(/^([^–\-]{3,70})\s[–-]\s(.{8,})$/);
    if (m) return addDef(m[1], m[2]);
    l.split(/(?<=[.!?])\s+/).forEach((s) => {
      const m2 = s.match(/^(?:O |A |Os |As )?([A-ZÁÉÍÓÚÂÊÔÃÕÇ][^,.;]{2,60}?)\s(é|são|consiste em|caracteriza-se por|corresponde a|define-se como)\s(.{8,})$/);
      if (m2) addDef(m2[1], `${m2[2] === "é" || m2[2] === "são" ? "" : m2[2] + " "}${m2[3]}`.replace(/\.$/, ""));
    });
  });
  // Listas numeradas viram quebra-cabeças de sequência.
  const seq = [];
  let run = [], title = "";
  const flush = () => { if (run.length >= 3) seq.push({ t: title || "Coloque na ordem", items: run.slice(0, 9).map((s) => cleanStr(s, 80)), e: "Sequência retirada do seu material." }); run = []; };
  text.split(/\n+/).forEach((l, i, arr) => {
    const m = l.trim().match(/^(\d{1,2})[.)º]\s+(.{2,})$/);
    if (m && +m[1] === run.length + 1) { if (!run.length) title = cleanStr(arr[i - 1] || "", 80).replace(/:$/, ""); run.push(m[2]); }
    else if (run.length) flush();
  });
  flush();

  const pick = shuffle(defs);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const flashcards = pick.slice(0, 30).map((d) => ({ f: `O que é: ${d.t}?`, b: cap(d.d) }));
  const quiz = [];
  pick.slice(0, 15).forEach((d) => {
    const others = shuffle(defs.filter((x) => x !== d)).slice(0, 3);
    if (others.length < 2) return;
    const o = shuffle([d.t].concat(others.map((x) => x.t)));
    quiz.push({ q: `Qual termo corresponde a: “${cap(d.d)}”?`, o, a: o.indexOf(d.t), e: `${d.t}: ${d.d}.` });
  });
  const tf = [];
  pick.slice(0, 12).forEach((d, i) => {
    const other = defs.find((x) => x !== d && x.t !== d.t && i % 2 === 1);
    if (other) tf.push({ s: `${d.t}: ${other.d}.`, v: false, e: `Falso. ${d.t}: ${d.d}. (A descrição era de ${other.t}.)` });
    else tf.push({ s: `${d.t}: ${d.d}.`, v: true, e: "Verdadeiro, conforme o seu material." });
  });
  const pairs = pick.filter((d) => d.d.split(" ").length <= 10).slice(0, 6).map((d) => [d.t, cleanStr(d.d, 70)]);
  return { flashcards, quiz, tf, pairs, seq, cases: [] };
}

// ---------- Salvar o mundo gerado ----------
function countItems(w) { return w.flashcards.length + w.quiz.length + w.tf.length + (w.pairs.length >= 3 ? w.pairs.length : 0) + w.seq.length + w.cases.length; }
function finalizeWorld(w, name, icon) {
  const colors = ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#4ade80", "#fb923c", "#38bdf8"];
  return Object.assign(w, {
    id: "m-" + Date.now().toString(36),
    cycle: "meu",
    name: cleanStr(name, 40) || "Meu material",
    icon: icon && [...icon].length <= 3 ? icon : "📚",
    color: colors[Math.floor(Math.random() * colors.length)],
    desc: `${w.flashcards.length} cards · ${w.quiz.length} questões · ${w.tf.length} V/F`,
    at: Date.now()
  });
}
function saveMaterialWorld(w, cut, offline) {
  if (M.cycle && M.cycle !== "meu") w.tag = M.cycle;
  S.materials.unshift(w);
  S.stats.materials++;
  addXp(20); checkMedals(); save();
  M.files = []; M.text = ""; M.paste = ""; M.sources = []; M.images = []; M.name = ""; M.nameAuto = false; setStatus("");
  S.ui.cycle = "meu";
  sfx.win(); confetti();
  toast(`📚 Mundo “${esc(w.name)}” criado!${cut ? " (material longo: usei a primeira parte)" : ""}${offline ? " Modo offline: revise os cards." : ""}`, "gold");
  go("world", w.id);
}
function deleteMaterial(id) {
  const w = worldById(id);
  if (!w) return;
  ask(`Excluir o mundo “${esc(w.name)}”? O progresso dele também será apagado.`, [{ label: "Excluir", cls: "danger", run: () => {
    S.materials = S.materials.filter((x) => x.id !== id);
    Object.keys(S.stages).forEach((k) => { if (k.startsWith(id + ":")) delete S.stages[k]; });
    Object.keys(S.srs).forEach((k) => { if (k.startsWith(id + ":")) delete S.srs[k]; });
    save(); go("materials");
  } }]);
}
function renameMaterial(id) {
  const w = worldById(id);
  const el = document.getElementById("rn-" + id);
  if (!w || !el) return;
  w.name = cleanStr(el.value, 40) || w.name;
  save(); toast("Nome salvo ✅"); rerender();
}
