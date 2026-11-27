/* MedQuest Lab — Laboratório virtual de microscopia.
   Laboratório 3D com microscópio, bandeja de lâminas e telão. As lâminas são ilustrações procedurais
   (desenhadas por código, esquemáticas), com troca de objetiva, foco, luz e óleo de imersão. */
"use strict";

// ---------- Desenho das lâminas ----------
function mRand(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const MIC = {
  // Cada lâmina desenha no sistema de coordenadas do "campo real" (1 unidade = 1 µm, campo de ±S µm)
  rbc(g, x, y, r, R, o = {}) {
    const gr = g.createRadialGradient(x, y, r * 0.15, x, y, r);
    gr.addColorStop(0, o.pale || "#f3b6b0"); gr.addColorStop(0.55, o.mid || "#e07c78"); gr.addColorStop(1, o.edge || "#c4504e");
    g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, r, r * (0.92 + R() * 0.1), R() * 3, 0, Math.PI * 2); g.fill();
  },
  sickle(g, x, y, r, R) {
    g.save(); g.translate(x, y); g.rotate(R() * Math.PI * 2);
    g.fillStyle = "#c95552"; g.beginPath(); g.arc(0, 0, r, 0.3, Math.PI - 0.3); g.arc(0, -r * 0.45, r * 0.85, Math.PI - 0.45, 0.45, true); g.closePath(); g.fill(); g.restore();
  },
  neutro(g, x, y, r, R) {
    g.fillStyle = "#e9d6ea"; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#5b2c83"; for (let i = 0; i < 4; i++) { const a = i * 1.3 + R(); g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.38, y + Math.sin(a) * r * 0.38, r * 0.27, r * 0.2, a, 0, Math.PI * 2); g.fill(); }
  },
  lympho(g, x, y, r) { g.fillStyle = "#cfd6f3"; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.fillStyle = "#3b2479"; g.beginPath(); g.arc(x + r * 0.08, y, r * 0.82, 0, Math.PI * 2); g.fill(); },
  dots(g, n, S, R, f) { for (let i = 0; i < n; i++) f((R() * 2 - 1) * S, (R() * 2 - 1) * S, i); }
};
const SLIDES = [
  { id: "sangue", S: 32, n: "Esfregaço de sangue periférico normal", stain: "Leishman", disc: "pato", mag: 40, cat: "hemato",
    find: "Hemácias com palidez central, um neutrófilo segmentado, um linfócito pequeno e plaquetas.",
    draw(g, S, R) { MIC.dots(g, 260, S, R, (x, y) => MIC.rbc(g, x, y, 3.8, R)); MIC.neutro(g, -12, 8, 6.5, R); MIC.lympho(g, 20, -14, 4.6); g.fillStyle = "#7b4ea3"; MIC.dots(g, 30, S, R, (x, y) => { g.beginPath(); g.arc(x, y, 0.9, 0, 7); g.fill(); }); } },
  { id: "falciforme", S: 32, n: "Anemia falciforme (drepanócitos)", stain: "Leishman", disc: "pato", mag: 40, cat: "hemato",
    find: "Hemácias em forma de foice (drepanócitos) entre hemácias normais e em alvo.",
    draw(g, S, R) { MIC.dots(g, 200, S, R, (x, y, i) => (i % 3 === 0 ? MIC.sickle(g, x, y, 4.2, R) : MIC.rbc(g, x, y, 3.7, R))); } },
  { id: "malaria", S: 22, n: "Malária: Plasmodium falciparum (trofozoítos em anel)", stain: "Giemsa", disc: "micro", mag: 100, cat: "parasito",
    find: "Hemácias com anéis finos de cromatina (aspecto de anel de sinete), alguns com dupla cromatina.",
    draw(g, S, R) { MIC.dots(g, 240, S, R, (x, y, i) => { MIC.rbc(g, x, y, 3.8, R, { pale: "#f1c9c4", mid: "#e19a94", edge: "#cf7a75" }); if (i % 6 === 0) { g.strokeStyle = "#4b2a8a"; g.lineWidth = 0.45; g.beginPath(); g.arc(x + 0.6, y, 1.3, 0, 7); g.stroke(); g.fillStyle = "#8b1d5c"; g.beginPath(); g.arc(x + 1.9, y - 0.2, 0.45, 0, 7); g.fill(); } }); } },
  { id: "gram_pos", S: 9, n: "Cocos Gram-positivos em cachos (sugere Staphylococcus)", stain: "Gram", disc: "micro", mag: 100, cat: "bacterio",
    find: "Cocos roxos (retêm o cristal violeta) agrupados em cachos irregulares.",
    bg: "#f4d7de",
    draw(g, S, R) { for (let c = 0; c < 28; c++) { const cx = (R() * 2 - 1) * S, cy = (R() * 2 - 1) * S; for (let i = 0; i < 9; i++) { g.fillStyle = "#3d1a6e"; g.beginPath(); g.arc(cx + (R() - 0.5) * 3.2, cy + (R() - 0.5) * 3.2, 0.5, 0, 7); g.fill(); } } } },
  { id: "gram_neg", S: 14, n: "Bacilos Gram-negativos (sugere enterobactéria)", stain: "Gram", disc: "micro", mag: 100, cat: "bacterio",
    find: "Bastonetes curtos rosados/vermelhos (safranina), isolados.", bg: "#f6e2e6",
    draw(g, S, R) { g.lineCap = "round"; MIC.dots(g, 220, S, R, (x, y) => { const a = R() * Math.PI; g.strokeStyle = "#c2335a"; g.lineWidth = 0.9; g.beginPath(); g.moveTo(x - Math.cos(a) * 1.1, y - Math.sin(a) * 1.1); g.lineTo(x + Math.cos(a) * 1.1, y + Math.sin(a) * 1.1); g.stroke(); }); } },
  { id: "neisseria", S: 22, n: "Diplococos Gram-negativos intracelulares (sugere Neisseria)", stain: "Gram", disc: "micro", mag: 100, cat: "bacterio",
    find: "Pares de cocos em forma de rim dentro de neutrófilos.", bg: "#f6e2e6",
    draw(g, S, R) { for (let k = 0; k < 7; k++) { const x = (R() * 2 - 1) * S * 0.8, y = (R() * 2 - 1) * S * 0.8; g.fillStyle = "#f0c3cf"; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); g.fillStyle = "#b04a7a"; g.beginPath(); g.ellipse(x - 2, y + 1, 2.4, 1.6, 0.4, 0, 7); g.fill(); for (let i = 0; i < 6; i++) { const px = x + (R() - 0.5) * 8, py = y + (R() - 0.5) * 8; g.fillStyle = "#c2335a"; g.beginPath(); g.ellipse(px - 0.45, py, 0.42, 0.55, 0, 0, 7); g.ellipse(px + 0.45, py, 0.42, 0.55, 0, 0, 7); g.fill(); } } } },
  { id: "baar", S: 16, n: "Bacilos álcool-ácido resistentes (BAAR)", stain: "Ziehl-Neelsen", disc: "micro", mag: 100, cat: "bacterio",
    find: "Bacilos finos vermelhos (fucsina) sobre fundo azul (azul de metileno), às vezes em agrupamentos.", bg: "#b9cdea",
    draw(g, S, R) { g.lineCap = "round"; MIC.dots(g, 46, S, R, (x, y) => { const a = R() * Math.PI; g.strokeStyle = "#d1123f"; g.lineWidth = 0.45; g.beginPath(); g.moveTo(x - Math.cos(a) * 1.6, y - Math.sin(a) * 1.6); g.quadraticCurveTo(x, y + 0.4, x + Math.cos(a) * 1.6, y + Math.sin(a) * 1.6); g.stroke(); }); g.fillStyle = "rgba(40,70,150,.35)"; MIC.dots(g, 30, S, R, (x, y) => { g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }); } },
  { id: "candida", S: 40, n: "Leveduras com pseudo-hifas (sugere Candida)", stain: "Gram", disc: "micro", mag: 40, cat: "fungo",
    find: "Células ovais roxas em brotamento e filamentos segmentados (pseudo-hifas).", bg: "#f2dbe2",
    draw(g, S, R) { g.fillStyle = "#4a2384"; MIC.dots(g, 90, S, R, (x, y) => { g.beginPath(); g.ellipse(x, y, 2.2, 1.6, R() * 3, 0, 7); g.fill(); if (R() < 0.4) { g.beginPath(); g.ellipse(x + 2.4, y, 1.2, 0.9, 0, 0, 7); g.fill(); } }); g.strokeStyle = "#4a2384"; g.lineWidth = 1.3; for (let k = 0; k < 6; k++) { let x = (R() * 2 - 1) * S, y = (R() * 2 - 1) * S, a = R() * 6; g.beginPath(); g.moveTo(x, y); for (let i = 0; i < 6; i++) { a += (R() - 0.5) * 0.6; x += Math.cos(a) * 4; y += Math.sin(a) * 4; g.lineTo(x, y); } g.stroke(); } } },
  { id: "epitelio", n: "Epitélio estratificado pavimentoso não queratinizado", stain: "H&E", disc: "histo", mag: 10, cat: "histo",
    find: "Várias camadas de células: basais cúbicas, intermediárias poligonais e superficiais achatadas; lâmina própria abaixo.", bg: "#f4dbe6",
    draw(g, S, R) { for (let y = -S; y < S; y += 9) { const layer = (y + S) / (2 * S); for (let x = -S; x < S; x += 9 + layer * 8) { const flat = 1 - layer; g.fillStyle = `rgb(${236 - flat * 20},${170 + flat * 20},${205})`; g.beginPath(); g.ellipse(x + R() * 3, y, 4 + layer * 4, 4 - flat * 2.6 + 0.6, 0, 0, 7); g.fill(); g.fillStyle = "#5b2a88"; g.beginPath(); g.ellipse(x + R() * 3, y, 1.6 + layer * 0.6, 1.6 - flat * 0.9 + 0.3, 0, 0, 7); g.fill(); } } g.fillStyle = "rgba(236,150,190,.6)"; g.fillRect(-S, S * 0.7, 2 * S, S); } },
  { id: "musculo", S: 60, n: "Músculo estriado esquelético (corte longitudinal)", stain: "H&E", disc: "histo", mag: 40, cat: "histo",
    find: "Fibras longas e paralelas com estrias transversais e vários núcleos periféricos.", bg: "#f1cddb",
    draw(g, S, R) { for (let y = -S; y < S; y += 11) { g.fillStyle = "#e58fb0"; g.fillRect(-S, y, 2 * S, 9.5); g.fillStyle = "rgba(150,40,90,.35)"; for (let x = -S; x < S; x += 1.6) g.fillRect(x, y, 0.6, 9.5); g.fillStyle = "#4a1f74"; for (let x = -S + R() * 10; x < S; x += 14 + R() * 10) { g.beginPath(); g.ellipse(x, y + (R() < 0.5 ? 0.9 : 8.6), 2.4, 0.8, 0, 0, 7); g.fill(); } } } },
  { id: "figado", n: "Fígado: lóbulo hepático com veia centrolobular", stain: "H&E", disc: "histo", mag: 10, cat: "histo",
    find: "Cordões de hepatócitos irradiando de uma veia central, com sinusoides entre eles.", bg: "#f0c6d4",
    draw(g, S, R) { g.fillStyle = "#fff5f8"; g.beginPath(); g.arc(0, 0, 9, 0, 7); g.fill(); for (let k = 0; k < 64; k++) { const a = (k / 64) * Math.PI * 2; for (let d = 12; d < S * 1.4; d += 5) { const x = Math.cos(a) * d, y = Math.sin(a) * d; g.fillStyle = "#d77fa3"; g.beginPath(); g.arc(x, y, 2.3, 0, 7); g.fill(); g.fillStyle = "#4a1f74"; g.beginPath(); g.arc(x, y, 0.8, 0, 7); g.fill(); } } } }
];
// Campo do microscópio: aumento, foco, luz e óleo
function micDraw(cv, sl, st) {
  const g = cv.getContext("2d"), W = cv.width, H = cv.height;
  g.save(); g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  g.beginPath(); g.arc(W / 2, H / 2, W * 0.48, 0, Math.PI * 2); g.clip();
  const need = st.mag === 100 && !st.oil;
  const blur = Math.abs(st.focus - st.ideal) * 0.12 + (need ? 4.5 : 0);
  g.filter = blur > 0.25 ? `blur(${blur.toFixed(1)}px)` : "none";
  g.fillStyle = sl.bg || "#f4e8ea"; g.fillRect(0, 0, W, H);
  const field = 1200 / st.mag; // µm visíveis no diâmetro
  const sc = W / field;
  g.translate(W / 2 + st.px * sc, H / 2 + st.py * sc); g.scale(sc, sc);
  sl.draw(g, sl.S || 80, mRand(hashStr(sl.id)));
  g.restore();
  // Iluminação e vinheta
  g.save(); g.beginPath(); g.arc(W / 2, H / 2, W * 0.48, 0, Math.PI * 2); g.clip();
  const lum = st.light / 100;
  g.fillStyle = `rgba(0,0,0,${Math.max(0, 0.75 - lum * 0.75)})`; g.fillRect(0, 0, W, H);
  if (lum > 0.85) { g.fillStyle = `rgba(255,255,255,${(lum - 0.85) * 2.2})`; g.fillRect(0, 0, W, H); }
  const vg = g.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.49); vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,.65)"); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  g.restore();
  // Régua e indicação de aumento
  g.fillStyle = "rgba(255,255,255,.9)"; g.font = "600 13px Inter, Arial"; g.fillText(`${st.mag}x · campo de ${Math.round(1200 / st.mag)} µm (ilustrativo)`, 12, H - 12);
}

// ---------- Cena 3D ----------
function bMicroscopeReal() {
  const body = mkMat("#f4f6f8", { rough: 0.35, clearcoat: 0.6, ccRough: 0.2 }), dark = mkMat("#1f2937", { rough: 0.45, clearcoat: 0.3 }), st = MAT.steel(), blue = mkMat("#1e6fd9", { rough: 0.35, clearcoat: 0.5 });
  const g = grp(
    mBox([0, 0.025, 0.02], [0.24, 0.05, 0.3], null, { material: body, round: 0.02 }),
    mCyl([0, 0.05, 0.02], [0, 0.07, 0.02], 0.035, null, { material: dark }),
    mEll([0, 0.075, 0.02], [0.03, 0.006, 0.03], "#fff7d6", { emissive: 0xfff1b0 }),
    mVarTube([[0, 0.05, -0.1], [0, 0.18, -0.1], [0, 0.3, -0.07], [0, 0.36, -0.01]], (t) => 0.035 - t * 0.008, null, { material: body }),
    mBox([0, 0.13, 0.03], [0.16, 0.012, 0.14], null, { material: dark, round: 0.004 }),
    mBox([0, 0.138, 0.03], [0.075, 0.002, 0.026], "#e0f2fe", { opacity: 0.8, rough: 0.05 }),
    mCyl([0, 0.3, 0.02], [0, 0.27, 0.02], 0.04, null, { material: dark }),
    ...[0, 1, 2, 3].map((i) => { const a = (i / 4) * Math.PI * 2 + 0.4, x = Math.cos(a) * 0.024, z = 0.02 + Math.sin(a) * 0.024; return mCyl([x, 0.27, z], [x * 0.7, 0.2 + (i === 0 ? 0 : 0.012), z], 0.008 - i * 0.0008, null, { material: i === 0 ? blue : st }); }),
    mCyl([0, 0.34, 0.0], [0, 0.39, 0.06], 0.025, null, { material: body }),
    ...[-1, 1].map((k) => mCyl([k * 0.022, 0.39, 0.06], [k * 0.03, 0.44, 0.1], 0.011, null, { material: dark })),
    ...[-1, 1].map((k) => mCyl([k * 0.05, 0.11, -0.1], [k * 0.075, 0.11, -0.1], 0.028, null, { material: dark })),
    ...[-1, 1].map((k) => mCyl([k * 0.075, 0.11, -0.1], [k * 0.09, 0.11, -0.1], 0.017, null, { material: st }))
  );
  return g;
}
async function micBuild3D(el) {
  await loadThree();
  if (!MC) return;
  const v = createViewer(el, { mode: "orbit", target: [0, 1.3, -0.6], dist: 2.3, theta: 0.42, phi: 1.33, minDist: 0.35, maxDist: 3.4, bg: "#e9f0f6", env: "lab", shadows: true, exposure: 0.95 });
  LABV = v;
  roomShell(v, { floor: "#d5dde5", wall: "#f3f6f9", wainscot: "#cfe0f2", label: "LABORATÓRIO DE MICROSCOPIA", headwall: false, lights: [[-1.2, -0.6], [1.2, -0.6], [0, 1.0]] });
  // Bancada com tampo de resina
  v.add(mBox([0, 0.45, -0.55], [2.6, 0.9, 0.7], "#e7edf3", { round: 0.02, rough: 0.5 }));
  v.add(mBox([0, 0.92, -0.55], [2.66, 0.04, 0.76], "#2b3b4f", { round: 0.01, rough: 0.25, clearcoat: 0.7 }));
  [-0.9, -0.3, 0.3, 0.9].forEach((x) => v.add(mBox([x, 0.5, -0.19], [0.5, 0.7, 0.01], "#dbe4ec", { round: 0.005 })));
  const mic = bMicroscopeReal(); mic.position.set(0, 0.94, -0.45); mic.scale.setScalar(1.5); mic.rotation.y = 0.35; v.add(mic, "mic");
  // Bandeja de lâminas
  const tray = grp(mBox([0, 0.012, 0], [0.3, 0.024, 0.16], "#f8fafc", { round: 0.006 }));
  SLIDES.slice(0, 8).forEach((s, i) => { tray.add(mBox([-0.11 + (i % 4) * 0.073, 0.027, -0.035 + Math.floor(i / 4) * 0.07], [0.06, 0.003, 0.025], "#dff3ff", { opacity: 0.75, rough: 0.05 }), mBox([-0.125 + (i % 4) * 0.073, 0.03, -0.035 + Math.floor(i / 4) * 0.07], [0.018, 0.002, 0.022], ["#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6", "#ec4899", "#10b981", "#f97316", "#6366f1"][i])); });
  tray.position.set(0.5, 0.94, -0.45); v.add(tray, "tray");
  v.add(bBottle({ text: ["ÓLEO DE", "IMERSÃO"] }).translateX(-0.45).translateZ(-0.4).translateY(0.0));
  // Telão com o campo do microscópio
  MC.screenTex = new THREE.CanvasTexture(MC.cv); MC.screenTex.encoding = THREE.sRGBEncoding;
  const scr = grp(mBox([0, 0, 0], [1.3, 0.78, 0.04], "#111827", { round: 0.015 }), mPlane([0.2, 0, 0.022], [0.72, 0.72], MC.screenTex), mPlane([-0.43, 0, 0.022], [0.4, 0.72], MC.infoTex = textTex(micInfoLines(), { bg: "#0b1a2b", fg: "#bfe6ff", size: 30, w: 320, h: 576 })));
  scr.position.set(0, 1.75, -1.0); v.add(scr, "scr");
  // Painel de condições do laboratório
  v.add(mPlane([-2.0, 1.55, -2.46], [0.9, 0.6], textTex(["CONDIÇÕES DO LABORATÓRIO", "Temperatura 22 °C", "Umidade 45%", "Iluminação LED 6500 K", "Biossegurança NB-2"], { bg: "#eef6ff", fg: "#0f3a5f", size: 34, w: 640, h: 420, border: "#93c5fd" })));
  const sci = bPerson({ gown: "#f8fafc", pants: "#1e3a5f", gloves: true, mask: "ok", goggles: true, cap: true, capColor: "#bfdbfe" }); sci.position.set(-1.25, 0, -0.15); sci.rotation.y = 0.6; v.add(sci);
  v.scene.traverse((m) => { if (m.material && !m.material.isShaderMaterial && m.material.envMapIntensity !== undefined) m.material.envMapIntensity = 0.5; });
  v.onPick((h) => { if (!h || !MC) return; if (h.id === "tray") micLoad(); else if (h.id === "mic") v.flyTo([0, 1.2, -0.45], 0.55); else if (h.id === "scr") v.flyTo([0, 1.75, -1.0], 1.1); });
}
function micInfoLines() {
  if (!MC || !MC.sl) return ["AMOSTRA", "—", "", "Coloque uma", "lâmina na", "platina."];
  return ["AMOSTRA", `Nº ${MC.round + 1}`, `Coloração:`, MC.sl.stain, "", `Objetiva ${MC.st.mag}x`, MC.st.oil ? "Óleo: sim" : "Óleo: não", `Luz ${MC.st.light}%`];
}

// ---------- Jogo ----------
let MC = null;
async function micLaunch(diff) {
  const sim = labSim("micro-lab");
  const n = { ini: 4, int: 6, adv: 8 }[diff];
  labBegin(sim, diff, { objective: `Prepare o microscópio e identifique ${n} lâminas.`, help: `<ul class="list"><li>Toque na bandeja (ou em “Colocar lâmina”) para pôr a amostra na platina.</li><li>Comece com aumento menor, centralize e ajuste o foco. Em 100x, use óleo de imersão.</li><li>Identificar no aumento indicado e com foco correto rende bônus.</li><li>As lâminas são ilustrações esquemáticas desenhadas por código, para treino de reconhecimento de padrões.</li></ul>` });
  const pool = shuffle(SLIDES.slice());
  MC = { diff, n, pool, round: 0, score: 0, ok: 0, mistakes: [], good: [], cv: document.createElement("canvas"), sl: null, st: null, answered: false };
  MC.cv.width = MC.cv.height = 512;
  const two = use2D();
  $app.innerHTML = labSceneShell({ title: "Laboratório virtual · Microscopia", objective: LABCTX.objective, progress: 0, score: 0, timer: diff === "adv" ? "down" : "up", left: { ini: 0, int: 0, adv: 7 * MIN }[diff], noCam: true,
    viewInner: two ? `<div class="mic-2d"><canvas id="mic-big" width="512" height="512"></canvas></div>` : `<div class="anat-bg lab-light"></div>` });
  if (diff === "adv") { MC.endAt = Date.now() + 7 * MIN; LABCTX.onPause = () => (MC._pz = Date.now()); LABCTX.onResume = () => (MC.endAt += Date.now() - MC._pz); }
  LABT.push(setInterval(() => { if (!LABCTX || LABCTX.pausedAt || !MC) return; if (MC.endAt) { const l = MC.endAt - Date.now(); labTickHud(l); if (l <= 0) micEnd(); } else labTickHud(); }, 500));
  micPanel();
  if (!two) micBuild3D(document.getElementById("lab-view"));
}
function micLoad() {
  if (!MC || MC.sl) return;
  const sl = MC.pool[MC.round % MC.pool.length];
  MC.sl = sl; MC.answered = false;
  MC.st = { mag: 4, focus: 15 + Math.round(Math.random() * 20), ideal: 55 + Math.round(Math.random() * 25), light: 55, oil: false, px: 0, py: 0, steps: { load: true } };
  sfx.flip(); micRefresh(); micPanel();
}
function micRefresh() {
  if (!MC) return;
  if (MC.sl) micDraw(MC.cv, MC.sl, MC.st); else { const g = MC.cv.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, 512, 512); g.fillStyle = "#94a3b8"; g.font = "600 22px Inter"; g.textAlign = "center"; g.fillText("Sem lâmina na platina", 256, 256); g.textAlign = "left"; }
  const field = document.getElementById("mic-field"); if (field) field.getContext("2d").drawImage(MC.cv, 0, 0, field.width, field.height);
  const big = document.getElementById("mic-big"); if (big) big.getContext("2d").drawImage(MC.cv, 0, 0);
  if (MC.screenTex) { MC.screenTex.needsUpdate = true; const it = textTex(micInfoLines(), { bg: "#0b1a2b", fg: "#bfe6ff", size: 30, w: 320, h: 576 }); if (MC.infoTex) { MC.infoTex.image = it.image; MC.infoTex.needsUpdate = true; } if (LABV) LABV.refresh(); }
}
function micSet(k, v) {
  if (!MC || !MC.sl || MC.answered) return;
  const st = MC.st;
  if (k === "mag") {
    if (v === 100 && !st.oil && MC.diff !== "ini") labFlash("Em 100x, aplique óleo de imersão para formar a imagem.", false);
    if (v > st.mag * 4 && MC.diff === "adv") { MC.score = Math.max(0, MC.score - 5); setScore(MC.score); labFlash("Aumente aos poucos: pular objetivas dificulta achar o campo (−5).", false); }
    st.mag = v; st.ideal = Math.max(10, Math.min(95, st.ideal + (Math.random() - 0.5) * 16)); st.steps["m" + v] = true;
  } else if (k === "oil") { if (st.mag !== 100 && MC.diff === "adv") labFlash("Dica: o óleo é usado com a objetiva de 100x."); st.oil = true; st.steps.oil = true; }
  else st[k] = v;
  if (k === "focus" && Math.abs(st.focus - st.ideal) < 6) st.steps.focus = true;
  micRefresh();
  if (k !== "focus" && k !== "light" && k !== "px" && k !== "py") micPanel();
  else micSteps();
}
function micStepsList() {
  const st = MC.st || { steps: {} }, s = st.steps || {};
  return [["Colocar a lâmina na platina", !!s.load], ["Começar pela objetiva de 4x ou 10x", !!(s.m4 || s.m10 || (MC.sl && st.mag <= 10))], ["Ajustar o foco", Math.abs((st.focus || 0) - (st.ideal || 0)) < 6], [`Usar a objetiva indicada${MC.diff === "ini" && MC.sl ? ` (${MC.sl.mag}x)` : ""}`, MC.sl && st.mag === MC.sl.mag], ["Óleo de imersão em 100x", !MC.sl || MC.sl.mag !== 100 || st.oil]];
}
function micSteps() { const el = document.getElementById("mic-steps"); if (el) el.innerHTML = micStepsList().map(([t, d]) => `<li class="${d ? "done" : ""}">${d ? "☑" : "☐"} ${esc(t)}</li>`).join(""); }
function micOptions() {
  if (MC.opts && MC.opts.for === MC.sl.id) return MC.opts.list;
  const same = SLIDES.filter((s) => s.id !== MC.sl.id && s.cat === MC.sl.cat), other = SLIDES.filter((s) => s.id !== MC.sl.id && s.cat !== MC.sl.cat);
  const k = { ini: 2, int: 3, adv: 4 }[MC.diff];
  const wrong = (MC.diff === "ini" ? shuffle(other) : shuffle(same).concat(shuffle(other))).slice(0, k);
  MC.opts = { for: MC.sl.id, list: shuffle([MC.sl, ...wrong]) };
  return MC.opts.list;
}
function micPanel() {
  if (!MC) return;
  const st = MC.st, sl = MC.sl;
  setSide(`
    <div class="side-sec"><div class="mic-head"><span class="tag">🔬 Amostra ${Math.min(MC.round + 1, MC.n)} de ${MC.n}</span>${sl ? `<small>Coloração: <b>${esc(sl.stain)}</b></small>` : ""}</div>
      <div class="mic-field-wrap"><canvas id="mic-field" width="320" height="320" aria-label="Campo do microscópio"></canvas>
        ${sl ? `<div class="mic-pan"><button aria-label="Mover para cima" onclick="micSet('py',MC.st.py+6)">▲</button><div><button aria-label="Mover para a esquerda" onclick="micSet('px',MC.st.px+6)">◀</button><button aria-label="Mover para a direita" onclick="micSet('px',MC.st.px-6)">▶</button></div><button aria-label="Mover para baixo" onclick="micSet('py',MC.st.py-6)">▼</button></div>` : ""}</div>
      ${sl ? `
        <div class="obj-row">${[4, 10, 40, 100].map((m) => `<button class="${st.mag === m ? "on" : ""}" onclick="micSet('mag',${m})">${m}x</button>`).join("")}<button class="oil ${st.oil ? "on" : ""}" onclick="micSet('oil')">💧 Óleo</button></div>
        <label class="rng">Foco <input type="range" min="0" max="100" value="${st.focus}" oninput="micSet('focus',+this.value)"></label>
        <label class="rng">Luz <input type="range" min="10" max="100" value="${st.light}" oninput="micSet('light',+this.value)"></label>`
      : `<button class="btn primary block" onclick="micLoad()">🧫 Colocar lâmina na platina</button>`}
    </div>
    <div class="side-sec info-card"><b>Procedimento</b><ul class="steps" id="mic-steps"></ul></div>
    ${sl && !MC.answered ? `<div class="side-sec"><b>O que você vê?</b>${MC.diff === "ini" ? `<p class="small muted-txt">Dica: ${esc(sl.find.split(",")[0])}.</p>` : ""}
      <div class="options">${micOptions().map((o) => `<button class="opt" onclick="micAnswer('${o.id}')"><span>${esc(o.n)}</span></button>`).join("")}</div></div>` : ""}
    ${MC.answered && sl ? `<div class="side-sec info-card ${MC.lastOk ? "ok" : ""}"><b>${MC.lastOk ? "✅ Correto" : "❌ Era outra lâmina"}</b><p><b>${esc(sl.n)}</b> (${esc(sl.stain)}, melhor em ${sl.mag}x).</p><p>${esc(sl.find)}</p>
      <button class="btn ai-btn small-btn" onclick="micExplain()">🤖 Explicar com IA</button>
      <button class="btn primary block" onclick="micNext()">${MC.round + 1 < MC.n ? "Próxima lâmina" : "Ver resultado"}</button></div>` : ""}
    <p class="muted-txt small">Imagens esquemáticas geradas por código (não são fotomicrografias reais). Treine também com lâminas reais nas aulas práticas.</p>`);
  micSteps(); micRefresh();
}
function micAnswer(id) {
  if (!MC || MC.answered) return;
  const sl = MC.sl, st = MC.st, ok = id === sl.id;
  MC.answered = true; MC.lastOk = ok;
  const focusOk = Math.abs(st.focus - st.ideal) < 8, magOk = st.mag === sl.mag || (sl.mag === 40 && st.mag === 100 && st.oil), oilOk = sl.mag !== 100 || st.oil;
  if (ok) {
    const pts = 60 + (focusOk ? 20 : 0) + (magOk ? 15 : 0) + (oilOk && sl.mag === 100 ? 5 : 0);
    MC.score += pts; MC.ok++; sfx.ok(); labFlash(`✅ +${pts}${focusOk ? "" : " (foco fora do ideal)"}`, true);
    MC.good.push({ title: sl.n, explain: sl.find });
  } else {
    const chosen = SLIDES.find((s) => s.id === id);
    sfx.bad(); labFlash("❌ Não é essa", false);
    MC.mistakes.push({ title: `Lâmina: você marcou “${chosen.n}”`, explain: `Era ${sl.n} (${sl.stain}). ${sl.find}`, disc: sl.disc, card: { f: `Microscopia (${sl.stain}): ${sl.find} Qual é o achado?`, b: sl.n }, mc: { q: `Na coloração de ${sl.stain}, observa-se: ${sl.find} Qual é o achado?`, o: [sl.n, ...micOptions().filter((o) => o.id !== sl.id).map((o) => o.n).slice(0, 3)], a: 0, e: sl.find } });
  }
  if (!focusOk && MC.diff !== "ini") MC.mistakes.push({ title: `Foco fora do ideal em: ${sl.n}`, explain: "Ajuste o foco grosso no menor aumento e o fino no maior. Imagem nítida evita erro de leitura.", disc: sl.disc });
  setScore(MC.score); setProgress((MC.round + 1) / MC.n);
  micPanel();
}
function micExplain() { const sl = MC && MC.sl; if (sl) aiExplainItem(`Na microscopia com coloração de ${sl.stain}, como reconhecer: ${sl.n}?`, sl.n, sl.find); }
function micNext() {
  if (!MC) return;
  MC.round++; MC.sl = null; MC.st = null; MC.answered = false;
  if (MC.round >= MC.n) return micEnd();
  micRefresh(); micPanel();
}
function micEnd() {
  if (!MC || MC.ended) return;
  MC.ended = true;
  S.lab.stats.slides = (S.lab.stats.slides || 0) + MC.ok;
  labFinish({ score: MC.score, max: MC.n * 100, correct: MC.ok, total: MC.n, mistakes: MC.mistakes, good: MC.good, recs: ["micro", "histo", "pato"], notes: [MC.endAt && Date.now() >= MC.endAt ? "⏰ O tempo acabou." : ""].filter(Boolean) });
  MC = null;
}
labRegister({
  id: "micro-lab", mode: "lab", disc: "micro", icon: "🔬", title: "Laboratório virtual: microscopia", category: "Laboratório",
  desc: "Laboratório 3D com microscópio: coloque a lâmina, escolha a objetiva, ajuste foco e luz, use óleo de imersão e identifique sangue, bactérias, fungos, parasitas e tecidos.",
  objective: "Preparar o microscópio corretamente e reconhecer o padrão de cada lâmina.",
  diffs: { ini: "4 lâminas, dica do achado, objetiva indicada e opções de categorias diferentes.", int: "6 lâminas, sem dicas e opções parecidas.", adv: "8 lâminas, tempo limitado, penalidade por pular objetivas e opções muito parecidas." },
  time: { ini: 5, int: 8, adv: 7 }, xp: { ini: 45, int: 65, adv: 95 },
  refs: ["Junqueira & Carneiro. Histologia básica", "Murray. Microbiologia médica", "Manual de microbiologia clínica da ANVISA"],
  review: { status: "pendente" },
  launch: (d) => micLaunch(d),
  count: () => SLIDES.length,
  data: () => ({ laminas: SLIDES.map((s) => ({ id: s.id, nome: s.n, coloracao: s.stain, aumento: s.mag, achado: s.find })) })
});
