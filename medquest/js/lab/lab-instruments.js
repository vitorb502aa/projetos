/* MedQuest Lab — Instrumentos cirúrgicos em 3D.
   Instrumentos desenhados por perfil (anéis, hastes, garras, serrilhas e dentes) e "extrudados" em 3D;
   o mesmo perfil gera o desenho 2D do modo leve. */
"use strict";

const INSTR_CLASSES = {
  dierese: { n: "Diérese", d: "Corte e separação de tecidos", c: "#f87171" },
  preensao: { n: "Preensão", d: "Segurar tecidos e campos", c: "#60a5fa" },
  hemostasia: { n: "Hemostasia", d: "Pinçar vasos e conter sangramento", c: "#facc15" },
  exposicao: { n: "Exposição", d: "Afastar tecidos para expor o campo", c: "#a78bfa" },
  sintese: { n: "Síntese", d: "Aproximar e suturar tecidos", c: "#34d399" },
  especiais: { n: "Especiais e apoio", d: "Aspiração, antissepsia e apoio", c: "#fb923c" }
};
// Perfil: lista de primitivas 2D (x lateral, y ao longo do comprimento, em metros)
// ["ring", cx, cy, r] · ["bar", x1, y1, x2, y2, w] · ["curve", [[x,y]...], w] · ["serr", x1,y1,x2,y2, n] · ["tooth", x, y, size] · ["oval", cx, cy, rx, ry]
function ringed(o) {
  const sh = o.shank || 0.08, jw = o.jaw || 0.04, w = o.w || 0.006, P = [];
  P.push(["ring", -0.016, 0.012, 0.011], ["ring", 0.016, 0.012, 0.011]);
  P.push(["bar", -0.016, 0.022, -0.003, sh - 0.004, 0.005], ["bar", 0.016, 0.022, 0.003, sh - 0.004, 0.005]);
  P.push(["oval", 0, sh, 0.006, 0.006]);
  const bend = o.curved ? 0.012 : 0;
  const jawPts = (dx) => [[dx, sh], [dx + bend * 0.2, sh + jw * 0.5], [dx + bend, sh + jw]];
  if (o.blades) {
    P.push(["curve", jawPts(-0.002), o.bladeW || 0.008], ["curve", jawPts(0.002), (o.bladeW || 0.008) * 0.9]);
  } else {
    P.push(["curve", jawPts(-0.0015), w], ["curve", jawPts(0.0015), w]);
    if (o.serr === "full") P.push(["serr", 0, sh + 0.003, bend, sh + jw, 9]);
    if (o.serr === "half") P.push(["serr", bend * 0.25, sh + jw * 0.5, bend, sh + jw, 5]);
    if (o.serr === "cross") P.push(["serr", 0, sh + 0.002, bend, sh + jw, 6], ["serr", 0.0015, sh + 0.002, bend + 0.0015, sh + jw, 6]);
  }
  if (o.teeth) P.push(["tooth", bend, sh + jw + 0.002, 0.004]);
  if (o.tip === "fen") P.push(["ring", bend, sh + jw + 0.006, 0.007]);
  if (o.tip === "allis") P.push(["bar", bend - 0.006, sh + jw + 0.002, bend + 0.006, sh + jw + 0.002, 0.003], ["tooth", bend - 0.004, sh + jw + 0.004, 0.002], ["tooth", bend, sh + jw + 0.004, 0.002], ["tooth", bend + 0.004, sh + jw + 0.004, 0.002]);
  if (o.tip === "towel") P.push(["curve", [[-0.002, sh + jw], [-0.012, sh + jw + 0.012], [0.002, sh + jw + 0.016]], 0.003], ["curve", [[0.002, sh + jw], [0.012, sh + jw + 0.012], [-0.002, sh + jw + 0.016]], 0.003]);
  if (o.tip === "oval") P.push(["oval", bend, sh + jw + 0.01, 0.009, 0.014]);
  return P;
}
function forceps(o) {
  const L = 0.14, P = [["bar", -0.003, 0, -0.006, L, 0.006], ["bar", 0.003, 0, 0.006, L, 0.006], ["bar", -0.003, 0.0, 0.003, 0.0, 0.006]];
  P.push(["serr", -0.006, L - 0.03, -0.006, L - 0.06, 5], ["serr", 0.006, L - 0.03, 0.006, L - 0.06, 5]);
  if (o.teeth) P.push(["tooth", -0.006, L + 0.003, 0.004], ["tooth", 0.006, L + 0.003, 0.004], ["tooth", 0, L + 0.003, 0.003]);
  else P.push(["serr", -0.006, L - 0.002, -0.006, L - 0.012, 4], ["serr", 0.006, L - 0.002, 0.006, L - 0.012, 4]);
  return P;
}
const INSTR = [
  { id: "bisturi", n: "Cabo de bisturi nº 4 com lâmina", cls: "dierese", lvl: 1, prof: [["bar", 0, 0, 0, 0.12, 0.012], ["bar", 0, 0.12, 0.004, 0.16, 0.006], ["curve", [[0.002, 0.12], [0.01, 0.14], [0.004, 0.165]], 0.006]], fn: "Incisão e corte de tecidos", tip: "O cabo nº 3 recebe lâminas pequenas (10 a 15); o nº 4, lâminas grandes (20 a 24).", sim: ["tesoura_mayo"] },
  { id: "tesoura_mayo", n: "Tesoura de Mayo", cls: "dierese", lvl: 1, prof: ringed({ shank: 0.08, jaw: 0.05, blades: true, bladeW: 0.011 }), fn: "Corte de fios e de tecidos resistentes, como a aponeurose", tip: "Lâminas grossas e mais longas que as da Metzenbaum.", sim: ["tesoura_metz"] },
  { id: "tesoura_metz", n: "Tesoura de Metzenbaum", cls: "dierese", lvl: 2, prof: ringed({ shank: 0.11, jaw: 0.035, blades: true, bladeW: 0.006, curved: true }), fn: "Dissecção e corte de tecidos delicados", tip: "Hastes longas e lâminas curtas e finas. Não deve ser usada para cortar fios.", sim: ["tesoura_mayo"] },
  { id: "anatomica", n: "Pinça anatômica (sem dente)", cls: "preensao", lvl: 1, prof: forceps({}), fn: "Preensão delicada de tecidos, como vasos e alças", tip: "As pontas têm só ranhuras, sem dentes.", sim: ["dente_rato"] },
  { id: "dente_rato", n: "Pinça dente de rato", cls: "preensao", lvl: 1, prof: forceps({ teeth: true }), fn: "Preensão firme de pele e aponeurose", tip: "Dentes na ponta: traumática para tecidos delicados.", sim: ["anatomica"] },
  { id: "allis", n: "Pinça de Allis", cls: "preensao", lvl: 2, prof: ringed({ shank: 0.09, jaw: 0.04, w: 0.004, tip: "allis" }), fn: "Preensão de tecidos resistentes ou que serão retirados", tip: "Pontas alargadas com pequenos dentes: traumática.", sim: ["babcock"] },
  { id: "babcock", n: "Pinça de Babcock", cls: "preensao", lvl: 2, prof: ringed({ shank: 0.09, jaw: 0.045, w: 0.004, tip: "fen" }), fn: "Preensão atraumática de alças intestinais, tubas e apêndice", tip: "Pontas arredondadas e fenestradas, sem dentes.", sim: ["allis"] },
  { id: "backhaus", n: "Pinça de Backhaus", cls: "preensao", lvl: 2, prof: ringed({ shank: 0.06, jaw: 0.015, w: 0.004, tip: "towel" }), fn: "Fixação dos campos cirúrgicos", tip: "Pontas curvas e pontiagudas que se cruzam.", sim: ["kocher"] },
  { id: "kelly", n: "Pinça de Kelly", cls: "hemostasia", lvl: 1, prof: ringed({ shank: 0.085, jaw: 0.045, serr: "half", curved: true }), fn: "Pinçamento de vasos (hemostasia)", tip: "Serrilhado só na metade distal da garra.", sim: ["crile", "kocher", "halsted"] },
  { id: "crile", n: "Pinça de Crile", cls: "hemostasia", lvl: 2, prof: ringed({ shank: 0.085, jaw: 0.045, serr: "full", curved: true }), fn: "Pinçamento de vasos (hemostasia)", tip: "Serrilhado em toda a extensão da garra.", sim: ["kelly", "kocher", "halsted"] },
  { id: "kocher", n: "Pinça de Kocher", cls: "hemostasia", lvl: 2, prof: ringed({ shank: 0.09, jaw: 0.05, serr: "full", teeth: true }), fn: "Pinçamento de tecidos densos e resistentes", tip: "Reta, toda serrilhada e com dente na ponta (traumática).", sim: ["kelly", "crile"] },
  { id: "halsted", n: "Pinça de Halsted (mosquito)", cls: "hemostasia", lvl: 3, prof: ringed({ shank: 0.06, jaw: 0.028, w: 0.004, serr: "full", curved: true }), fn: "Hemostasia de vasos pequenos", tip: "Pequena e delicada, toda serrilhada.", sim: ["crile", "kelly"] },
  { id: "farabeuf", n: "Afastador de Farabeuf", cls: "exposicao", lvl: 1, prof: [["bar", -0.012, 0, 0.012, 0, 0.012], ["bar", -0.012, 0, -0.012, 0.13, 0.012], ["bar", -0.012, 0.13, 0.008, 0.13, 0.012], ["bar", 0.012, 0, 0.012, -0.015, 0.012]], fn: "Afastamento manual de pele e subcutâneo", tip: "Lâmina chata dobrada nas duas pontas, usada aos pares.", sim: ["babcock"] },
  { id: "porta_agulha", n: "Porta-agulha de Mayo-Hegar", cls: "sintese", lvl: 1, gold: true, prof: ringed({ shank: 0.085, jaw: 0.025, w: 0.009, serr: "cross" }), fn: "Segurar a agulha durante a sutura", tip: "Garra curta e larga, com serrilhado cruzado; anéis dourados indicam pastilhas de tungstênio.", sim: ["kocher"] },
  { id: "yankauer", n: "Aspirador de Yankauer", cls: "especiais", lvl: 2, prof: [["curve", [[0, 0], [0, 0.12], [0.01, 0.17], [0.025, 0.2]], 0.012], ["oval", 0.027, 0.205, 0.008, 0.008]], fn: "Aspiração de sangue e secreções do campo", tip: "Tubo rígido curvo com ponta em bulbo.", sim: ["foerster"] },
  { id: "foerster", n: "Pinça de Foerster (antissepsia)", cls: "especiais", lvl: 3, prof: ringed({ shank: 0.14, jaw: 0.03, w: 0.004, tip: "oval" }), fn: "Antissepsia da pele com gaze", tip: "Longa, com pontas ovais fenestradas.", sim: ["babcock"] },
  { id: "cuba", n: "Cuba rim", cls: "especiais", lvl: 1, prof: [["curve", [[-0.06, 0], [-0.07, 0.05], [-0.03, 0.08], [0, 0.06], [0.03, 0.08], [0.07, 0.05], [0.06, 0], [0, -0.02], [-0.06, 0]], 0.012]], fn: "Receber secreções, gazes e materiais usados", tip: "Recipiente em forma de rim.", sim: [] }
];
const instrById = (id) => INSTR.find((x) => x.id === id);

// ---------- Construção 3D e 2D ----------
function instrMesh(it) {
  const col = "#cbd5e1", g = new THREE.Group(), t = 0.004;
  const metal = { metal: 0.85, rough: 0.25 };
  it.prof.forEach((p) => {
    if (p[0] === "ring") g.add(mTorus([p[1], p[2], 0], p[3], 0.0022, it.gold && p[2] < 0.02 ? "#d4a017" : col, metal));
    else if (p[0] === "bar") g.add(mCyl([p[1], p[2], 0], [p[3], p[4], 0], p[5] / 2, col, Object.assign({ seg: 6 }, metal)));
    else if (p[0] === "curve") g.add(mTube(p[1].map((q) => [q[0], q[1], 0]), p[2] / 2, col, Object.assign({ seg: 6 }, metal)));
    else if (p[0] === "oval") { const m = mTorus([p[1], p[2], 0], 1, 0.25, col, metal); m.scale.set(p[3], p[4], p[3]); g.add(m); }
    else if (p[0] === "tooth") { const m = new THREE.Mesh(new THREE.ConeGeometry(p[3] / 2, p[3], 6), mkMat(col, metal)); m.position.set(p[1], p[2], 0); g.add(m); }
    else if (p[0] === "serr") { for (let i = 0; i < p[5]; i++) { const f = i / Math.max(1, p[5] - 1); g.add(mBox([p[1] + (p[3] - p[1]) * f, p[2] + (p[4] - p[2]) * f, 0.0025], [0.008, 0.0012, 0.001], "#475569")); } }
  });
  g.rotation.x = -Math.PI / 2; // deitado sobre a mesa
  const holder = new THREE.Group(); holder.add(g);
  holder.scale.set(1.6, 1.6, 1.6); // ampliado para facilitar a visualização
  return holder;
}
function instrSvg(it, size = 120) {
  const s = (v) => (v * 1000).toFixed(1);
  const body = it.prof.map((p) => {
    if (p[0] === "ring") return `<circle cx="${s(p[1])}" cy="${s(-p[2])}" r="${s(p[3])}" fill="none" stroke="${it.gold && p[2] < 0.02 ? "#d4a017" : "#cbd5e1"}" stroke-width="4"/>`;
    if (p[0] === "bar") return `<line x1="${s(p[1])}" y1="${s(-p[2])}" x2="${s(p[3])}" y2="${s(-p[4])}" stroke="#cbd5e1" stroke-width="${s(p[5])}" stroke-linecap="round"/>`;
    if (p[0] === "curve") return `<polyline points="${p[1].map((q) => s(q[0]) + "," + s(-q[1])).join(" ")}" fill="none" stroke="#cbd5e1" stroke-width="${s(p[2])}" stroke-linecap="round"/>`;
    if (p[0] === "oval") return `<ellipse cx="${s(p[1])}" cy="${s(-p[2])}" rx="${s(p[3])}" ry="${s(p[4])}" fill="none" stroke="#cbd5e1" stroke-width="3"/>`;
    if (p[0] === "tooth") return `<circle cx="${s(p[1])}" cy="${s(-p[2])}" r="${s(p[3] / 2)}" fill="#94a3b8"/>`;
    if (p[0] === "serr") return Array.from({ length: p[5] }, (_, i) => { const f = i / Math.max(1, p[5] - 1); const x = p[1] + (p[3] - p[1]) * f, y = p[2] + (p[4] - p[2]) * f; return `<line x1="${s(x - 0.004)}" y1="${s(-y)}" x2="${s(x + 0.004)}" y2="${s(-y)}" stroke="#475569" stroke-width="1.5"/>`; }).join("");
    return "";
  }).join("");
  return `<svg viewBox="-90 -230 180 260" width="${size}" height="${size * 1.4}" class="instr-svg">${body}</svg>`;
}

// ---------- Sessão ----------
let IN = null;
const SAFETY = [
  ["Confirmar identidade, procedimento, sítio e consentimento com o paciente", "in"], ["Sítio cirúrgico demarcado", "in"], ["Verificação do equipamento e dos medicamentos anestésicos", "in"],
  ["Oxímetro de pulso no paciente e funcionando", "in"], ["Alergias conhecidas", "in"], ["Risco de via aérea difícil ou de broncoaspiração", "in"], ["Risco de perda sanguínea > 500 mL (7 mL/kg em crianças)", "in"],
  ["Apresentação de todos os membros da equipe pelo nome e função", "to"], ["Confirmação verbal de paciente, sítio e procedimento pela equipe", "to"], ["Antibiótico profilático nos últimos 60 minutos", "to"],
  ["Eventos críticos previstos (cirurgião, anestesia e enfermagem)", "to"], ["Exames de imagem essenciais disponíveis", "to"],
  ["Registro do nome do procedimento realizado", "out"], ["Contagem de instrumentos, compressas e agulhas", "out"], ["Identificação e rotulagem das peças para anatomopatológico", "out"],
  ["Problemas com equipamentos a serem resolvidos", "out"], ["Revisão das preocupações para a recuperação pós-operatória", "out"]
];
const SAFE_PH = { in: "Antes da indução anestésica", to: "Antes da incisão (pausa cirúrgica)", out: "Antes de o paciente sair da sala" };
function instrSet(diff) { const lv = { ini: 1, int: 2, adv: 3 }[diff]; return INSTR.filter((x) => x.lvl <= lv); }
async function instrLaunch(diff, sub) {
  const sim = labSim("instr");
  const SUBN = { identify: "Encontre o instrumento", name: "Qual é este instrumento?", funcao: "Para que serve?", mesa: "Monte a mesa", seguranca: "Cirurgia segura" };
  labBegin(sim, diff, { sub, subLabel: SUBN[sub], objective: { identify: "Toque no instrumento pedido.", name: "Diga o nome do instrumento destacado.", funcao: "Indique a finalidade do instrumento destacado.", mesa: "Organize a mesa por tempos cirúrgicos.", seguranca: "Coloque cada item do checklist na pausa certa." }[sub],
    help: `<ul class="list"><li>Arraste para girar a mesa; aproxime com pinça ou roda do mouse.</li><li>Toque num instrumento para selecioná-lo. Use “🔍 Examinar” para ver os detalhes de perto, como serrilhas, dentes e pontas.</li>${sub === "mesa" ? "<li>Selecione o instrumento e toque na área da mesa onde ele deve ficar.</li>" : ""}</ul>` });
  const set = instrSet(diff);
  IN = { diff, sub, set, score: 0, correct: 0, total: 0, mistakes: [], good: [], round: 0, rounds: { ini: 6, int: 8, adv: 10 }[diff], used: [] };
  $app.innerHTML = labSceneShell({ title: `Instrumentos · ${SUBN[sub]}`, objective: LABCTX.objective, progress: 0, score: 0, timer: "up", noCam: use2D() || sub === "seguranca" });
  LABT.push(setInterval(() => labTickHud(), 1000));
  const el = document.getElementById("lab-view");
  if (sub === "seguranca") { el.innerHTML = `<div class="safety-bg">🛡️<p>Lista de verificação de cirurgia segura (OMS)</p></div>`; return instrSafetyStart(); }
  if (use2D()) { IN.two = true; instrDraw2D(el); }
  else {
    await loadThree();
    const v = createViewer(el, { mode: "orbit", target: [0, 0.95, 0], dist: 1.25, phi: 0.75, minDist: 0.25, maxDist: 2.6, bg: "#0b1220" });
    LABV = v;
    v.add(mBox([0, -0.01, 0], [6, 0.02, 6], "#94a3b8"));
    v.add(mBox([0, 1.4, -2.5], [6, 2.8, 0.05], "#d1e7e0"));
    v.add(lbl(["SALA CIRÚRGICA 2"], [0, 2.3, -2.47], [1.2, 0.25], { bg: "#0f172a", fg: "#e2e8f0", size: 60 }));
    const bed = bBed({ patient: { sheet: "#16a34a" } }); bed.position.set(0, 0, -1.6); bed.rotation.y = Math.PI / 2; v.add(bed);
    const lamp = bLamp(); lamp.position.set(0, 0, -1.6); v.add(lamp);
    v.add(mBox([0, 0.9, 0], [1.5, 0.04, 0.8], "#475569", { metal: 0.4 }));
    v.add(mBox([0, 0.925, 0], [1.46, 0.01, 0.76], "#15803d"));
    [[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]].forEach(([x, z]) => v.add(mCyl([x, 0, z], [x, 0.9, z], 0.02, "#334155")));
    IN.meshes = {};
    const slots = shuffle(set.map((_, i) => i));
    const cols = Math.ceil(set.length / 2);
    set.forEach((it, i) => {
      const m = instrMesh(it);
      const k = slots[i], col = k % cols, row = Math.floor(k / cols);
      const x = -0.62 + (col * 1.24) / Math.max(1, cols - 1), z = row === 0 ? -0.36 : 0.02;
      m.position.set(x, 0.935, z);
      if (sub === "mesa") m.position.set(-0.64 + (k * 1.28) / Math.max(1, set.length - 1), 0.935, 0.05);
      m.rotation.y = Math.PI; m.userData.home = m.position.clone();
      v.add(m, it.id); IN.meshes[it.id] = m;
    });
    if (sub === "mesa") instrZones(v);
    v.onPick((h) => instrPick(h ? h.id : null));
    v.onHover((id) => { Object.entries(IN.meshes).forEach(([k, m]) => { if (k !== IN.sel && k !== IN.target) setGlow(m, k === id ? 0x334155 : null, 0.5); }); v.refresh(); });
  }
  if (sub === "mesa") return instrMesaStart();
  instrNext();
}
function instrDraw2D(el) {
  el.innerHTML = `<div class="instr2d">${shuffle(IN.set.slice()).map((it) => `<button class="instr2d-item" data-i="${it.id}" onclick="instrPick('${it.id}')">${instrSvg(it, 70)}</button>`).join("")}</div>${IN.sub === "mesa" ? `<div class="zones2d">${Object.entries(INSTR_CLASSES).map(([k, c]) => `<button class="zone2d" style="--c:${c.c}" onclick="instrPick('zone:${k}')"><b>${c.n}</b><span id="z2-${k}"></span></button>`).join("")}</div>` : ""}`;
}
function instrZones(v) {
  const keys = Object.keys(INSTR_CLASSES);
  IN.zonePos = {};
  keys.forEach((k, i) => {
    const x = -0.6 + i * 0.24, c = INSTR_CLASSES[k];
    const z = mBox([x, 0.932, -0.22], [0.22, 0.004, 0.32], c.c, { opacity: 0.35 });
    v.add(z, "zone:" + k);
    v.add(lbl(c.n, [x, 0.936, -0.035], [0.22, 0.06], { bg: c.c, fg: "#0f172a", size: 96, r: [-Math.PI / 2, 0, 0] }));
    IN.zonePos[k] = { x, n: 0 };
  });
}
function glowI(id, c) { if (IN.meshes && IN.meshes[id]) { setGlow(IN.meshes[id], c, 0.6); LABV.refresh(); } const b = document.querySelector(`.instr2d-item[data-i="${id}"]`); if (b) { b.classList.toggle("hl", c === 0xfacc15); b.classList.toggle("ok", c === 0x22c55e); b.classList.toggle("bad", c === 0xf43f5e); } }
function instrFocus(id) {
  if (IN.two) { const it = instrById(id); const m = document.createElement("div"); m.className = "modal"; m.innerHTML = `<div class="modal-card"><div class="big-svg">${instrSvg(it, 160)}</div><p class="muted-txt">${IN.sub === "name" ? "Observe os detalhes da ponta e da garra." : esc(it.n)}</p><button class="btn primary block" onclick="this.closest('.modal').remove()">Fechar</button></div>`; document.body.appendChild(m); return; }
  const m = IN.meshes[id]; if (!m) return;
  const len = Math.max(...instrById(id).prof.map((p) => (p[0] === "bar" ? Math.max(p[2], p[4]) : p[0] === "curve" ? Math.max(...p[1].map((q) => q[1])) : p[2] || 0))) * m.scale.x;
  LABV.setTarget([m.position.x, 0.94, m.position.z + len / 2], Math.max(0.28, len * 1.25));
}
function instrPrompt(it) {
  if (IN.sub === "identify") return IN.diff === "adv" ? `Encontre o instrumento usado para: ${it.fn.toLowerCase()}` : `Encontre: ${it.n}`;
  if (IN.sub === "name") return "Qual é o instrumento destacado?";
  return `Qual é a finalidade do instrumento destacado?`;
}
function instrNext() {
  IN.lock = false; IN.tries = 0;
  if (IN.round >= IN.rounds) return instrEnd();
  IN.round++; IN.total++;
  setProgress((IN.round - 1) / IN.rounds);
  let pool = IN.set.filter((x) => !IN.used.includes(x.id));
  if (!pool.length) { IN.used = []; pool = IN.set.slice(); }
  const it = pool[Math.floor(Math.random() * pool.length)];
  IN.used.push(it.id); IN.target = it.id;
  if (LABV && !IN.two) LABV.setTarget([0, 0.95, 0], 1.25);
  if (IN.sub === "identify") {
    setSide(`<div class="side-sec prompt-card"><small>Rodada ${IN.round} de ${IN.rounds}</small><h3>${esc(instrPrompt(it))}</h3>
      ${IN.diff === "ini" ? `<p class="muted-txt small">Dica: ${esc(it.tip)}</p>` : ""}</div>${instrSelCard()}`);
    return;
  }
  glowI(it.id, 0xfacc15);
  if (!IN.two) instrFocus(it.id);
  let opts;
  if (IN.sub === "name") {
    const nOpt = IN.diff === "ini" ? 2 : 3;
    const sims = (it.sim || []).map(instrById).filter((x) => x && IN.set.includes(x));
    opts = (IN.diff === "ini" ? [] : sims).concat(shuffle(IN.set.filter((x) => x.id !== it.id && !sims.includes(x)))).slice(0, nOpt);
    opts = shuffle([it, ...opts]).map((x) => ({ id: x.id, t: x.n }));
  } else {
    const fns = shuffle(INSTR.filter((x) => x.id !== it.id && x.fn !== it.fn)).slice(0, IN.diff === "ini" ? 2 : 3).map((x) => ({ id: x.id, t: x.fn }));
    opts = shuffle([{ id: it.id, t: it.fn }, ...fns]);
    if (IN.diff === "adv") opts = opts.map((o) => o); // funções parecidas já aparecem entre as opções
  }
  setSide(`<div class="side-sec prompt-card"><small>Rodada ${IN.round} de ${IN.rounds}</small><h3>${esc(instrPrompt(it))}</h3>
    ${IN.sub === "funcao" && IN.diff !== "adv" ? `<p class="small">Instrumento: <b>${esc(it.n)}</b></p>` : ""}
    <button class="btn ghost small-btn" onclick="instrFocus('${it.id}')">🔍 Examinar de perto</button></div>
    <div class="options">${opts.map((o) => `<button class="opt" onclick="instrAnswer('${o.id}')"><span>${esc(o.t)}</span></button>`).join("")}</div>
    ${IN.sub === "funcao" && IN.diff === "adv" ? `<p class="muted-txt small">Avançado: o nome não é mostrado. Reconheça o instrumento pela forma.</p>` : ""}`);
}
function instrSelCard() {
  if (!IN.sel) return `<div class="side-sec"><small>Toque num instrumento para selecioná-lo e confirmar.</small></div>`;
  const it = instrById(IN.sel);
  return `<div class="side-sec info-card"><small>Selecionado</small><h3>${IN.diff === "adv" ? "Instrumento selecionado" : esc(it.n)}</h3>
    <div class="row wrap"><button class="btn ghost small-btn" onclick="instrFocus('${it.id}')">🔍 Examinar</button><button class="btn primary small-btn" onclick="instrConfirm()">É este!</button></div></div>`;
}
function instrPick(id) {
  if (!IN || IN.lock || (LABCTX && LABCTX.pausedAt)) return;
  if (IN.sub === "mesa") return instrMesaPick(id);
  if (IN.sub !== "identify" || !id || !instrById(id)) return;
  if (IN.sel) glowI(IN.sel, null);
  IN.sel = id; glowI(id, 0x0ea5e9); sfx.flip();
  const it = instrById(IN.target);
  setSide(`<div class="side-sec prompt-card"><small>Rodada ${IN.round} de ${IN.rounds}</small><h3>${esc(instrPrompt(it))}</h3>${IN.diff === "ini" ? `<p class="muted-txt small">Dica: ${esc(it.tip)}</p>` : ""}</div>${instrSelCard()}`);
}
function instrConfirm() { if (IN.sel) instrAnswer(IN.sel); }
function instrAnswer(id) {
  if (IN.lock) return;
  const it = instrById(IN.target);
  S.stats.answered++;
  if (id === it.id) {
    IN.lock = true;
    const pts = IN.sub === "identify" ? Math.max(40, 100 - IN.tries * 30) : 100;
    IN.score += pts; IN.correct++; S.stats.correct++; bump("correct");
    IN.good.push({ title: it.n, explain: `${it.fn}. ${it.tip}` });
    glowI(it.id, 0x22c55e); sfx.ok(); labFlash(`✅ ${esc(it.n)} · +${pts}`, true); setScore(IN.score);
    LABT.push(setTimeout(() => { glowI(it.id, null); if (IN.sel) glowI(IN.sel, null); IN.sel = null; instrNext(); }, 1300));
    setSide(`<div class="side-sec info-card ok"><h3>${esc(it.n)}</h3><p><b>Classe:</b> ${esc(INSTR_CLASSES[it.cls].n)}. <b>Finalidade:</b> ${esc(it.fn)}.</p><p class="muted-txt">${esc(it.tip)}</p></div>`);
  } else {
    IN.tries++; sfx.bad(); IN.score = Math.max(0, IN.score - 20); setScore(IN.score);
    const wrong = instrById(id);
    if (IN.sub === "identify") { glowI(id, 0xf43f5e); LABT.push(setTimeout(() => glowI(id, null), 700)); IN.sel = null; }
    labFlash(`❌ ${IN.sub === "identify" ? "Esse é " + (IN.diff === "adv" ? "outro instrumento" : esc(wrong.n)) : "Resposta errada"}`, false);
    if (IN.sub !== "identify" || IN.tries >= 2) {
      IN.lock = true;
      IN.mistakes.push({ title: `${it.n}`, explain: `${it.fn}. ${it.tip}`, disc: "cirurgia", card: { f: `Instrumento: ${it.tip} Qual é?`, b: `${it.n}: ${it.fn}.` }, mc: { q: `Qual instrumento: ${it.tip}`, o: [it.n, wrong.n], a: 0, e: it.fn } });
      glowI(it.id, 0xfacc15);
      setSide(`<div class="side-sec info-card"><span class="tag warn">Resposta</span><h3>${esc(it.n)}</h3><p><b>Classe:</b> ${esc(INSTR_CLASSES[it.cls].n)}. <b>Finalidade:</b> ${esc(it.fn)}.</p><p class="muted-txt">${esc(it.tip)}</p><button class="btn primary block" onclick="glowI('${it.id}',null);instrNext()">Continuar</button></div>`);
    }
  }
}
// Monte a mesa
function instrMesaStart() {
  IN.left = IN.set.map((x) => x.id); IN.total = IN.left.length; IN.sel = null;
  instrMesaPanel();
}
function instrMesaPanel(msg) {
  const it = IN.sel && instrById(IN.sel);
  setSide(`<div class="side-sec prompt-card"><small>Organização da mesa de instrumentação</small>
    <h3>${it ? `Onde fica: ${IN.diff === "adv" ? "o instrumento selecionado" : esc(it.n)}?` : "Toque num instrumento da fileira da frente e depois na área da mesa onde ele deve ficar."}</h3>
    ${it ? `<button class="btn ghost small-btn" onclick="instrFocus('${it.id}')">🔍 Examinar</button>` : ""}${msg ? `<p>${msg}</p>` : ""}</div>
    <div class="side-sec"><small>Áreas da mesa</small>${Object.values(INSTR_CLASSES).map((c) => `<p class="small"><i class="dot-c" style="background:${c.c}"></i><b>${esc(c.n)}</b>: ${esc(c.d)}</p>`).join("")}</div>
    <div class="side-sec"><small>Organizados: ${IN.correct} de ${IN.total} · Erros: ${IN.mistakes.length}</small></div>`);
  setProgress(IN.correct / IN.total);
}
function instrMesaPick(id) {
  if (!id) return;
  if (id.startsWith("zone:")) {
    if (!IN.sel) return labFlash("Selecione primeiro um instrumento.");
    const zone = id.slice(5), it = instrById(IN.sel);
    S.stats.answered++;
    if (it.cls === zone) {
      IN.correct++; IN.score += 100; S.stats.correct++; bump("correct");
      IN.good.push({ title: it.n, explain: `${INSTR_CLASSES[zone].n}: ${it.fn}.` });
      IN.left = IN.left.filter((x) => x !== it.id);
      if (IN.meshes) { const m = IN.meshes[it.id], zp = IN.zonePos[zone]; const tgt = new THREE.Vector3(zp.x - 0.08 + (zp.n % 5) * 0.04, 0.937 + Math.floor(zp.n / 5) * 0.01, -0.37); zp.n++; const from = m.position.clone(), t0 = performance.now(); setGlow(m, null); LABV.animate((t) => { const f = Math.min(1, (t - t0) / 500); m.position.lerpVectors(from, tgt, f); m.position.y = 0.935 + Math.sin(f * Math.PI) * 0.08; m.scale.setScalar(1.6 - f * 0.75); return f < 1; }); }
      const z2 = document.getElementById("z2-" + zone); if (z2) z2.textContent += (z2.textContent ? ", " : "") + it.n;
      const b = document.querySelector(`.instr2d-item[data-i="${it.id}"]`); if (b) b.remove();
      sfx.ok(); labFlash(`✅ ${esc(it.n)} → ${esc(INSTR_CLASSES[zone].n)}`, true); setScore(IN.score);
      IN.sel = null;
      if (!IN.left.length) return LABT.push(setTimeout(instrEnd, 900));
      return instrMesaPanel();
    }
    IN.score = Math.max(0, IN.score - 25); setScore(IN.score); sfx.bad();
    if (!IN.mistakes.some((m) => m.id === it.id)) IN.mistakes.push({ id: it.id, title: `${it.n}: área da mesa`, explain: `Fica em ${INSTR_CLASSES[it.cls].n}: ${it.fn}.`, disc: "cirurgia", card: { f: `Em que tempo cirúrgico se usa: ${it.n}?`, b: `${INSTR_CLASSES[it.cls].n}: ${it.fn}.` } });
    labFlash(`❌ ${esc(INSTR_CLASSES[zone].n)} não é a área desse instrumento.`, false);
    return instrMesaPanel();
  }
  if (!IN.left.includes(id)) return;
  if (IN.sel) glowI(IN.sel, null);
  IN.sel = id; glowI(id, 0x0ea5e9); sfx.flip(); instrMesaPanel();
}
// Cirurgia segura
function instrSafetyStart() {
  const n = { ini: 7, int: 11, adv: 17 }[IN.diff];
  IN.items = shuffle(SAFETY).slice(0, n).map(([t, ph], i) => ({ i, t, ph, ans: null }));
  IN.total = IN.items.length;
  instrSafetyPanel();
}
function instrSafetyPanel() {
  const left = IN.items.filter((x) => x.ans === null);
  setSide(`<div class="side-sec prompt-card"><small>Lista de verificação de cirurgia segura (OMS)</small><h3>Em que pausa cada item é conferido?</h3>
    ${IN.diff === "ini" ? `<p class="muted-txt small">${Object.values(SAFE_PH).map((x) => "• " + esc(x)).join("<br>")}</p>` : ""}</div>
    ${left.length ? left.slice(0, 1).map((x) => `<div class="side-sec info-card"><h3>${esc(x.t)}</h3><div class="col">${Object.entries(SAFE_PH).map(([k, n]) => `<button class="btn ghost block" onclick="instrSafetyAns(${x.i},'${k}')">${esc(n)}</button>`).join("")}</div></div>`).join("") : ""}
    <div class="side-sec"><small>${IN.total - left.length} de ${IN.total} classificados · Acertos: ${IN.correct}</small></div>`);
  setProgress((IN.total - left.length) / IN.total);
}
function instrSafetyAns(i, ph) {
  const x = IN.items.find((y) => y.i === i);
  x.ans = ph; S.stats.answered++;
  if (ph === x.ph) { IN.correct++; IN.score += 60; S.stats.correct++; bump("correct"); sfx.ok(); labFlash("✅ Correto", true); IN.good.push({ title: x.t, explain: SAFE_PH[x.ph] }); }
  else { sfx.bad(); labFlash(`❌ Esse item é conferido: ${esc(SAFE_PH[x.ph])}`, false); IN.mistakes.push({ title: x.t, explain: `É conferido ${SAFE_PH[x.ph].toLowerCase()}. A lista de verificação tem 3 pausas: antes da indução, antes da incisão e antes de sair da sala.`, disc: "cirurgia", card: { f: `Cirurgia segura: em que pausa se confere “${x.t}”?`, b: SAFE_PH[x.ph] } }); }
  setScore(IN.score);
  if (IN.items.every((y) => y.ans !== null)) return LABT.push(setTimeout(instrEnd, 900));
  instrSafetyPanel();
}
function instrEnd() {
  if (!IN || IN.ended) return;
  IN.ended = true;
  if (IN.total && IN.correct / IN.total >= 0.7) S.lab.stats.instr++;
  bumpWeek("instr");
  labFinish({ score: IN.score, max: IN.total * (IN.sub === "seguranca" ? 60 : 100), correct: IN.correct, total: IN.total, mistakes: IN.mistakes, good: IN.good, recs: ["cirurgia", "anato", "clinica"] });
  IN = null;
}

labRegister({
  id: "instr", mode: "instr", disc: "cirurgia", icon: "🛠️", title: "Instrumentos cirúrgicos 3D", category: "Simulador cirúrgico · instrumentação",
  desc: "Sala cirúrgica em 3D com 17 instrumentos. Examine de perto, identifique, associe à finalidade, organize a mesa e treine a lista de cirurgia segura.",
  objective: "Reconhecer os instrumentos cirúrgicos, suas finalidades, a organização da mesa e as etapas de segurança.",
  subs: [
    { id: "identify", n: "Encontre o instrumento", d: "O app pede um instrumento e você o encontra na mesa." },
    { id: "name", n: "Qual é este instrumento?", d: "Um instrumento é destacado e você escolhe o nome." },
    { id: "funcao", n: "Para que serve?", d: "Associe o instrumento à sua finalidade." },
    { id: "mesa", n: "Monte a mesa", d: "Organize a mesa de instrumentação por tempos cirúrgicos." },
    { id: "seguranca", n: "Cirurgia segura", d: "Classifique os itens da lista de verificação da OMS em cada pausa." }
  ],
  diffs: { ini: "7 instrumentos básicos com dicas; 3 opções.", int: "12 instrumentos, incluindo os parecidos (Kelly × Crile × Kocher); 4 opções.", adv: "17 instrumentos, pistas pela finalidade e nomes ocultos." },
  time: { ini: 4, int: 6, adv: 8 }, xp: { ini: 40, int: 60, adv: 90 },
  refs: ["OMS: Manual de Cirurgia Segura", "Manuais de instrumentação cirúrgica (técnica operatória)"],
  review: { status: "pendente" },
  launch: instrLaunch,
  count: () => INSTR.length + SAFETY.length,
  data: () => ({ instrumentos: INSTR.map((x) => ({ id: x.id, nome: x.n, classe: INSTR_CLASSES[x.cls].n, finalidade: x.fn, dica: x.tip, nivel: x.lvl })), checklist: SAFETY.map(([t, p]) => ({ item: t, pausa: SAFE_PH[p] })) }),
  validate: () => INSTR.filter((x) => !INSTR_CLASSES[x.cls] || !x.fn || !x.tip).map((x) => "instrumento incompleto: " + x.id)
});
