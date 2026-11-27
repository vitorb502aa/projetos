/* MedQuest Lab — Encontre o erro.
   Ambientes 3D montados com móveis e personagens configuráveis. Cada partida sorteia quais objetos
   estão errados (e qual erro), então o cenário muda a cada vez. */
"use strict";

// ---------- Construtores de objetos ----------
const C = { white: "#e5e7eb", steel: "#9aa4b2", dark: "#334155", wood: "#a47148", blue: "#3b82f6", green: "#16a34a", red: "#dc2626", yellow: "#facc15", skin: "#c99372" };
const grp = (...kids) => { const g = new THREE.Group(); kids.flat().forEach((k) => k && g.add(k)); return g; };
const lbl = (txt, p, s, o = {}) => mPlane(p, s, textTex(txt, { bg: o.bg || "#ffffff", fg: o.fg || "#111827", border: o.border, w: o.w || 512, h: o.h || 256, size: o.size }), { r: o.r });

function bPerson(L = {}) {
  const gown = L.gown || "#2f855a", sk = L.skin || C.skin, pants = L.pants || gown;
  const F = (c) => MAT.fabric(c), SK = MAT.skin(sk);
  const parts = [];
  // Pernas e sapatos
  [-1, 1].forEach((k) => {
    parts.push(capsule([k * 0.09, 0.1, 0], [k * 0.095, 0.5, 0.01], 0.062, null, { material: F(pants), r2: 0.07 }));
    parts.push(capsule([k * 0.095, 0.5, 0.01], [k * 0.1, 0.9, 0], 0.075, null, { material: F(pants), r2: 0.09 }));
    parts.push(mBox([k * 0.09, 0.035, 0.04], [0.1, 0.07, 0.25], "#e5e7eb", { round: 0.03, rough: 0.5 }));
  });
  // Tronco (jaleco/roupa) com ombros arredondados
  const torso = new THREE.Mesh(varTubeGeo([[0, 0.86, 0], [0, 1.05, 0.005], [0, 1.25, 0.01], [0, 1.42, 0]], (t) => 0.165 + 0.035 * Math.sin(Math.PI * t) - 0.03 * t, { radial: 24 }), F(gown));
  torso.scale.z = 0.62; parts.push(torso);
  parts.push(mEll([0, 1.41, 0], [0.2, 0.06, 0.11], null, { material: F(gown) }));
  // Pescoço e cabeça
  parts.push(mCyl([0, 1.43, 0], [0, 1.52, 0.005], 0.045, null, { material: SK }));
  parts.push(mEll([0, 1.62, 0.005], [0.093, 0.118, 0.105], null, { material: SK, seg: 40 }));
  parts.push(mEll([0, 1.585, 0.1], [0.018, 0.026, 0.02], null, { material: SK }));
  [-1, 1].forEach((k) => { parts.push(mEll([k * 0.034, 1.635, 0.088], [0.012, 0.008, 0.006], "#2b1b12", { rough: 0.2, clearcoat: 1 })); parts.push(mEll([k * 0.092, 1.615, 0], [0.012, 0.025, 0.016], null, { material: SK })); });
  // Braços
  const handC = L.gloves ? (L.gloveColor || "#4f8fe8") : null;
  const handMat = handC ? mkMat(handC, { rough: 0.42, clearcoat: 0.35, sheen: "#1c2c48" }) : SK;
  const armR = L.armUp ? [[-0.2, 1.38, 0], [-0.27, 1.16, 0.1], [-0.3, 1.04, 0.27]] : [[-0.2, 1.38, 0], [-0.25, 1.12, 0.02], [-0.27, 0.86, 0.06]];
  const armL = [[0.2, 1.38, 0], [0.25, 1.12, 0.02], [0.27, 0.86, 0.06]];
  [armR, armL].forEach((a) => {
    parts.push(capsule(a[0], a[1], 0.05, null, { material: F(gown), r2: 0.043 }));
    parts.push(capsule(a[1], a[2], 0.042, null, { material: L.coatOpen || L.gloves ? F(gown) : SK, r2: 0.035 }));
    parts.push(mEll([a[2][0], a[2][1] - 0.035, a[2][2]], [0.033, 0.05, 0.022], null, { material: handMat }));
  });
  // Cabelo, gorro, máscara e EPIs
  if (L.cap) parts.push(mEll([0, 1.67, -0.005], [0.103, 0.085, 0.113], null, { material: F(L.capColor || "#93c5fd") }));
  else if (L.hair === "loose") parts.push(mEll([0, 1.6, -0.06], [0.12, 0.2, 0.08], "#3f2a1d", { rough: 0.7, sheen: "#2a1d14" }), mEll([0, 1.68, -0.005], [0.1, 0.07, 0.11], "#3f2a1d", { rough: 0.7 }));
  else parts.push(mEll([0, 1.68, -0.012], [0.098, 0.065, 0.108], "#3f2a1d", { rough: 0.7, sheen: "#2a1d14" }));
  if (L.mask === "ok") parts.push(mEll([0, 1.575, 0.075], [0.08, 0.05, 0.045], null, { material: F(L.maskColor || "#bfdbfe") }));
  if (L.mask === "down") parts.push(mEll([0, 1.49, 0.07], [0.08, 0.035, 0.04], null, { material: F(L.maskColor || "#bfdbfe") }));
  if (L.n95) parts.push(mEll([0, 1.575, 0.08], [0.07, 0.055, 0.05], "#f8fafc", { rough: 0.8 }));
  if (L.goggles) parts.push(mBox([0, 1.64, 0.1], [0.17, 0.045, 0.02], "#a5f3fc", { opacity: 0.55, round: 0.012, rough: 0.05, clearcoat: 1 }));
  if (L.ring) parts.push(mTorus([0.27, 0.8, 0.07], 0.02, 0.006, "#fbbf24", { metal: 1, rough: 0.15 }), mBox([-0.27, 0.9, 0.06], [0.05, 0.035, 0.05], "#fbbf24", { metal: 1, rough: 0.2 }));
  if (L.coatOpen) parts.push(mBox([0, 1.1, 0.12], [0.1, 0.5, 0.02], "#1e3a8a"));
  if (L.badge) parts.push(lbl(L.badge, [0.1, 1.27, 0.165], [0.1, 0.045]));
  if (L.pipetteMouth) parts.push(mCyl([0, 1.57, 0.11], [0.02, 1.25, 0.35], 0.006, "#e2e8f0", { opacity: 0.7, rough: 0.1 }));
  if (L.holdChart) parts.push(mBox([-0.3, 1.05, 0.3], [0.2, 0.28, 0.015], "#f8fafc", { round: 0.006 }));
  const g = grp(parts);
  if (L.sit) g.scale.set(1, 0.8, 1);
  return g;
}
function bLyingPatient(L = {}) {
  const sk = L.skin || C.skin, SK = MAT.skin(sk);
  const g = grp(
    mEll([0, 0.04, -0.75], [0.1, 0.1, 0.12], null, { material: SK, seg: 36 }),
    mEll([0, 0.1, -0.68], [0.06, 0.035, 0.03], null, { material: SK }),
    mBox([0, -0.02, 0.08], [0.56, 0.2, 1.36], null, { material: MAT.fabric(L.sheet || "#bfdbfe"), round: 0.08 }),
    mBox([0, 0.075, -0.45], [0.58, 0.03, 0.2], null, { material: MAT.fabric("#f8fafc"), round: 0.015 }),
    capsule([-0.3, 0.05, -0.42], [-0.32, 0.05, 0.12], 0.045, null, { material: SK, r2: 0.038 })
  );
  if (L.band) g.add(mTorus([-0.32, 0.05, 0.08], 0.045, 0.012, L.bandColor || "#ffffff", { r: [0, 0, 0] }));
  if (L.tube) g.add(mCyl([0, 0.1, -0.68], [0.25, 0.32, -0.9], 0.01, "#e2e8f0", { opacity: 0.7, rough: 0.1 }));
  if (L.mark) g.add(mBox([0.18, 0.1, 0.35], [0.06, 0.01, 0.06], "#111827"));
  if (L.dressing) g.add(mBox([-0.1, 0.11, -0.62], [0.08, 0.015, 0.06], L.dressing));
  if (L.plate) g.add(mBox([0.16, 0.1, 0.25], [0.12, 0.01, 0.16], L.plate));
  if (L.confused) g.add(lbl(["Paciente idoso,", "confuso"], [0, 0.55, -0.9], [0.5, 0.2], { bg: "#fef3c7" }));
  return g;
}
function bBed(L = {}) {
  const head = L.head ?? 0;
  const st = MAT.steel(), wheel = mkMat("#1f2937", { rough: 0.6 });
  const g = grp(
    mBox([0, 0.35, 0], [0.95, 0.1, 2.0], "#d6dbe1", { round: 0.03, rough: 0.35, clearcoat: 0.4 }),
    ...[[-0.42, -0.9], [0.42, -0.9], [-0.42, 0.9], [0.42, 0.9]].flatMap(([x, z]) => [mCyl([x, 0.08, z], [x, 0.32, z], 0.025, null, { material: st }), mCyl([x - 0.03, 0.045, z], [x + 0.03, 0.045, z], 0.045, null, { material: wheel })]),
    mBox([0, 0.68, -1.0], [0.98, 0.6, 0.05], "#e8edf2", { round: 0.03, rough: 0.35, clearcoat: 0.5 }),
    mBox([0, 0.58, 1.0], [0.98, 0.36, 0.05], "#e8edf2", { round: 0.03, rough: 0.35, clearcoat: 0.5 })
  );
  const mattress = mBox([0, 0.48, 0.25], [0.88, 0.14, 1.45], null, { material: MAT.fabric("#dbeafe"), round: 0.05 });
  const backrest = grp(mBox([0, 0, -0.3], [0.88, 0.14, 0.6], null, { material: MAT.fabric("#dbeafe"), round: 0.05 }), mBox([0, 0.1, -0.42], [0.62, 0.1, 0.32], null, { material: MAT.fabric("#ffffff"), round: 0.05 }));
  backrest.position.set(0, 0.48, -0.15); backrest.rotation.x = (head * Math.PI) / 180;
  g.add(mattress, backrest);
  const railY = L.rails === "down" ? 0.4 : 0.72;
  [-0.48, 0.48].forEach((x) => g.add(mBox([x, railY, -0.1], [0.03, 0.2, 1.2], "#cfd6dd", { round: 0.012, rough: 0.3, clearcoat: 0.5 })));
  if (L.patient) { const p = bLyingPatient(L.patient); p.position.set(0, 0.66, 0.15); g.add(p); }
  if (L.label) g.add(lbl(L.label, [0, 0.98, -1.03], [0.5, 0.2]));
  if (L.wheelsUnlocked) g.add(mBox([0.42, 0.05, 0.95], [0.08, 0.06, 0.06], C.red));
  return g;
}
function bBin(L = {}) {
  const bag = L.bag === "black" ? "#111827" : L.bag === "red" ? "#b91c1c" : "#f8fafc";
  return grp(
    mCyl([0, 0, 0], [0, 0.6, 0], 0.2, L.color || "#e5e7eb", { rad2: 0.22 }),
    mTorus([0, 0.6, 0], 0.21, 0.025, bag, { r: [Math.PI / 2, 0, 0] }),
    L.lidOpen ? null : mCyl([0, 0.62, 0], [0, 0.65, 0], 0.23, L.color || "#e5e7eb"),
    lbl(L.text || ["RESÍDUO", "INFECTANTE"], [0, 0.35, 0.215], [0.3, 0.15], { bg: L.bag === "black" ? "#e5e7eb" : "#ffffff", fg: L.bag === "black" ? "#111827" : "#b91c1c", border: L.bag === "black" ? "#6b7280" : "#b91c1c" }),
    L.overflow ? mEll([0, 0.7, 0], [0.18, 0.1, 0.18], "#fca5a5") : null
  );
}
function bSharps(L = {}) {
  const f = L.fill ?? 0.4;
  return grp(
    mBox([0, 0.15, 0], [0.32, 0.3, 0.22], "#facc15", { opacity: 0.85 }),
    mBox([0, 0.02 + (0.26 * f) / 2, 0], [0.3, 0.26 * f, 0.2], "#78350f"),
    mBox([0, 0.23, 0.112], [0.32, 0.008, 0.005], C.red),
    lbl(["PERFURO-", "CORTANTE"], [0, 0.12, 0.115], [0.24, 0.12], { bg: "#fde68a", fg: "#7c2d12" }),
    L.needleOut ? mCyl([0.1, 0.3, 0], [0.18, 0.42, 0.05], 0.005, "#cbd5e1") : null
  );
}
function bGel(L = {}) {
  const lv = L.level ?? 0.7;
  return grp(mBox([0, 0, 0], [0.16, 0.26, 0.09], "#f8fafc"), mBox([0, -0.11 + (0.18 * lv) / 2, 0.047], [0.06, 0.18 * lv, 0.005], "#22c55e"), mBox([0, -0.11 + 0.09, 0.046], [0.065, 0.18, 0.003], "#e5e7eb", { opacity: 0.5 }), lbl("ÁLCOOL 70%", [0, 0.09, 0.047], [0.14, 0.05]));
}
function bCounter(L = {}) {
  return grp(mBox([0, 0.45, 0], [L.w || 1.8, 0.9, 0.6], L.color || "#cbd5e1"), mBox([0, 0.91, 0], [(L.w || 1.8) + 0.04, 0.04, 0.64], L.top || "#f1f5f9"));
}
function bSink(L = {}) {
  const g = grp(bCounter({ w: 1.0 }), mBox([0, 0.88, 0], [0.5, 0.1, 0.4], "#e2e8f0"), mCyl([0, 0.93, -0.22], [0, 1.15, -0.22], 0.02, C.steel, { metal: 0.7 }), mCyl([0, 1.15, -0.22], [0, 1.12, -0.08], 0.015, C.steel, { metal: 0.7 }));
  const towel = grp(mBox([0, 0, 0], [0.3, 0.32, 0.12], "#f8fafc"), lbl(L.towel === false ? ["PAPEL", "VAZIO"] : ["PAPEL", "TOALHA"], [0, 0, 0.062], [0.26, 0.14], { fg: L.towel === false ? C.red : "#111827" }));
  if (L.towel !== false) towel.add(mBox([0, -0.18, 0.03], [0.18, 0.06, 0.02], "#f8fafc"));
  towel.position.set(0.42, 1.45, -0.26);
  const soap = bGel({ level: L.soap ?? 0.7 }); soap.position.set(-0.35, 1.4, -0.26);
  g.add(towel, soap);
  return g;
}
function bTable(L = {}) {
  const w = L.w || 1.2, d = L.d || 0.7, h = L.h || 0.85;
  return grp(mBox([0, h, 0], [w, 0.04, d], L.top || C.steel, { metal: 0.4 }), ...[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => mCyl([(a * w) / 2.2, 0, (b * d) / 2.2], [(a * w) / 2.2, h, (b * d) / 2.2], 0.02, C.dark)));
}
function bTray(L = {}) {
  const g = grp(bTable({ w: 0.9, d: 0.55, h: 0.95 }), mBox([0, 0.98, 0], [0.8, 0.02, 0.48], L.wet ? "#1e3a5f" : "#16a34a"));
  const ins = (x, z, c = C.steel) => mBox([x, 1.0, z], [0.03, 0.01, 0.22], c, { metal: 0.8, rough: 0.2 });
  [-0.3, -0.22, -0.14, -0.06, 0.02, 0.1].forEach((x) => g.add(ins(x, -0.05)));
  if (L.wet) g.add(mEll([0.15, 0.995, 0.1], [0.18, 0.003, 0.12], "#60a5fa", { opacity: 0.6 }));
  if (L.looseNeedle) g.add(mTorus([0.25, 1.0, 0.1], 0.025, 0.002, "#e2e8f0", { arc: Math.PI * 1.2, r: [Math.PI / 2, 0, 0] }));
  if (L.capped) g.add(mCyl([0.22, 1.01, -0.12], [0.36, 1.01, -0.12], 0.012, "#e2e8f0"), mCyl([0.36, 1.01, -0.12], [0.43, 1.01, -0.12], 0.007, "#f97316"));
  if (L.syringeOk) g.add(mCyl([0.22, 1.01, -0.12], [0.36, 1.01, -0.12], 0.012, "#e2e8f0"));
  if (L.pack) g.add(mBox([0.25, 1.0, 0.12], [0.22, 0.02, 0.14], "#e5e7eb"), mBox([0.25, 1.012, 0.12], [0.18, 0.004, 0.02], L.pack));
  return g;
}
function bSign(lines, L = {}) { return lbl(lines, [0, 0, 0], L.s || [0.8, 0.4], { bg: L.bg || "#ffffff", fg: L.fg || "#111827", border: L.border || "#0f172a", size: L.size }); }
function bMonitor(lines, L = {}) {
  return grp(mBox([0, 0, 0], [0.55, 0.38, 0.06], "#111827"), mPlane([0, 0, 0.032], [0.5, 0.32], textTex(lines, { bg: "#020617", fg: L.fg || "#4ade80", size: L.size || 34 })), L.stand ? mCyl([0, -0.2, 0], [0, -1.1, 0], 0.03, C.dark) : null);
}
function bIV(L = {}) {
  return grp(mCyl([0, 0, 0], [0, 1.9, 0], 0.015, C.steel, { metal: 0.6 }), mBox([0, 0.02, 0], [0.4, 0.04, 0.4], C.dark), mEll([0.08, 1.7, 0], [0.07, 0.12, 0.03], "#e0f2fe", { opacity: 0.85 }),
    L.label === false ? null : lbl(L.label || ["SF 0,9% 500 mL", "Paciente: M.S.", "Início: 08h"], [0.08, 1.7, 0.035], [0.12, 0.09], { size: 34 }),
    mCyl([0.08, 1.58, 0], [0.05, 0.9, 0.3], 0.004, "#e2e8f0"),
    L.pump ? grp(mBox([0, 1.15, 0.05], [0.2, 0.24, 0.12], "#e5e7eb"), mPlane([0, 1.17, 0.112], [0.16, 0.1], textTex(L.pump, { bg: "#0f172a", fg: "#fde047", size: 40 }))) : null);
}
function bCart(L = {}) {
  const g = grp(mBox([0, 0.5, 0], [0.7, 1.0, 0.5], C.red), ...[0.2, 0.45, 0.7].map((y) => mBox([0, y, 0.255], [0.6, 0.18, 0.01], "#b91c1c")), lbl(["CARRINHO DE", "EMERGÊNCIA"], [0, 0.92, 0.256], [0.5, 0.12], { bg: "#fee2e2", fg: "#991b1b" }));
  g.add(mBox([0.3, 0.7, 0.26], [0.04, 0.06, 0.01], L.seal === "broken" ? "#6b7280" : "#22c55e"));
  if (L.drawerOpen) g.add(mBox([0, 0.45, 0.45], [0.6, 0.16, 0.38], "#7f1d1d"));
  if (L.check !== undefined) g.add(lbl(L.check, [0, 1.25, 0], [0.5, 0.25], { size: 34, bg: "#fff7ed" }));
  return g;
}
function bO2(L = {}) {
  const c = grp(mCyl([0, 0, 0], [0, 1.2, 0], 0.11, "#15803d"), mEll([0, 1.2, 0], [0.11, 0.08, 0.11], "#15803d"), mCyl([0, 1.26, 0], [0, 1.36, 0], 0.03, C.steel, { metal: 0.8 }));
  if (L.loose) { c.rotation.z = Math.PI / 2; c.position.y = 0.11; return grp(c); }
  return grp(c, mTorus([0, 0.8, 0], 0.13, 0.012, C.dark, { r: [Math.PI / 2, 0, 0] }), mBox([0, 0.02, 0], [0.34, 0.04, 0.34], C.dark));
}
function bDoor(L = {}) {
  const frame = grp(mBox([-0.5, 1.05, 0], [0.06, 2.1, 0.12], "#64748b"), mBox([0.5, 1.05, 0], [0.06, 2.1, 0.12], "#64748b"), mBox([0, 2.12, 0], [1.06, 0.06, 0.12], "#64748b"));
  const leaf = grp(mBox([0.47, 1.03, 0], [0.94, 2.04, 0.04], L.color || "#94a3b8"));
  leaf.position.x = -0.47; const pivot = grp(leaf); pivot.position.x = 0.47 - 0.94 + 0.47; pivot.rotation.y = L.open ? -1.2 : 0;
  const g = grp(frame, pivot);
  if (L.sign) g.add(lbl(L.sign, [0, 1.6, 0.08], [0.6, 0.3], { bg: L.signBg || "#ffffff", fg: L.signFg || "#111827", border: L.signBorder || "#111827" }));
  return g;
}
function bWetFloor(L = {}) {
  const g = grp(mEll([0, 0.002, 0], [0.7, 0.002, 0.45], "#60a5fa", { opacity: 0.55, rough: 0.05 }));
  if (L.cone) g.add(mCyl([0.6, 0, 0.3], [0.6, 0.6, 0.3], 0.14, "#facc15", { rad2: 0.03 }), lbl(["PISO", "MOLHADO"], [0.6, 0.35, 0.39], [0.2, 0.1], { bg: "#facc15" }));
  return g;
}
function bFridge(L = {}) {
  return grp(mBox([0, 0.85, 0], [0.7, 1.7, 0.65], "#f8fafc"), mBox([0.3, 1.0, 0.33], [0.03, 0.4, 0.03], C.steel), lbl(L.sign || ["AMOSTRAS", "BIOLÓGICAS"], [0, 1.4, 0.33], [0.5, 0.22], { fg: C.red, border: C.red }),
    mPlane([0, 1.05, 0.33], [0.3, 0.12], textTex(L.temp || "4 °C", { bg: "#0f172a", fg: "#4ade80", size: 90 })),
    L.food ? grp(mBox([-0.15, 0.6, 0.36], [0.2, 0.1, 0.06], "#f59e0b"), mCyl([0.1, 0.55, 0.36], [0.1, 0.72, 0.36], 0.04, "#7c2d12")) : null);
}
function bTubes(L = {}) {
  const g = grp(mBox([0, 0.95, 0], [0.4, 0.06, 0.12], "#e2e8f0"));
  [-0.15, -0.075, 0, 0.075, 0.15].forEach((x, i) => {
    g.add(mCyl([x, 0.93, 0], [x, 1.08, 0], 0.012, "#fecaca", { opacity: 0.8 }), mCyl([x, 1.08, 0], [x, 1.11, 0], 0.014, ["#a855f7", "#ef4444", "#3b82f6", "#facc15", "#22c55e"][i]));
    if (!(L.unlabeled && i === 2)) g.add(mBox([x, 1.0, 0.013], [0.022, 0.05, 0.002], "#ffffff"));
  });
  return g;
}
function bCentrifuge(L = {}) {
  const g = grp(mCyl([0, 0.92, 0], [0, 1.1, 0], 0.18, "#e2e8f0"), mPlane([0, 1.0, 0.18], [0.16, 0.06], textTex(L.running ? "4000 rpm" : "PARADA", { bg: "#0f172a", fg: L.running ? "#fde047" : "#94a3b8", size: 80 })));
  const lid = mCyl([0, 0, 0], [0, 0.02, 0], 0.18, "#94a3b8");
  if (L.lidOpen) { lid.position.set(0, 1.25, -0.16); lid.rotation.x = -1.2; } else lid.position.set(0, 1.1, 0);
  g.add(lid);
  return g;
}
function bHood(L = {}) {
  return grp(mBox([0, 1.25, 0], [1.2, 0.9, 0.7], "#e2e8f0", { opacity: 0.35 }), mBox([0, 0.8, 0], [1.3, 0.05, 0.75], "#cbd5e1"), mBox([0, 1.75, 0], [1.3, 0.2, 0.75], "#94a3b8"),
    lbl(["CABINE DE SEGURANÇA", "BIOLÓGICA"], [0, 1.75, 0.38], [0.8, 0.14], { size: 40 }), L.empty ? null : mCyl([0, 0.83, 0], [0, 0.98, 0], 0.03, "#fca5a5"));
}
function bEyewash(L = {}) {
  const g = grp(mCyl([0, 0, 0], [0, 2.1, 0], 0.025, "#16a34a"), mCyl([0, 2.1, 0], [0, 2.1, 0.3], 0.02, "#16a34a"), mCyl([0, 2.05, 0.3], [0, 2.1, 0.3], 0.12, "#16a34a"), mCyl([0, 1.0, 0.0], [0, 1.0, 0.25], 0.02, "#16a34a"), mCyl([0, 1.0, 0.27], [0, 1.03, 0.27], 0.09, "#16a34a"),
    lbl(["CHUVEIRO E", "LAVA-OLHOS"], [0, 1.55, 0.03], [0.4, 0.18], { bg: "#16a34a", fg: "#ffffff" }));
  if (L.blocked) g.add(mBox([0, 0.25, 0.45], [0.6, 0.5, 0.4], "#a47148"), mBox([0.1, 0.65, 0.45], [0.45, 0.3, 0.35], "#b7835a"));
  return g;
}
function bFood() { return grp(mCyl([0, 0.93, 0], [0, 1.03, 0], 0.04, "#7c2d12"), mCyl([0, 1.03, 0], [0, 1.035, 0], 0.035, "#3b1d0e"), mBox([0.15, 0.95, 0], [0.18, 0.06, 0.12], "#f59e0b")); }
function bWasteBottle(L = {}) {
  if (L.sinkPour) return grp(bSink({}), mCyl([0.05, 1.05, 0], [0.12, 1.15, 0.05], 0.05, "#a16207", { opacity: 0.8 }), lbl(["XILOL"], [0.1, 1.2, 0.08], [0.15, 0.06], { size: 60 }));
  return grp(bCounter({ w: 1.0 }), mCyl([0, 0.93, 0], [0, 1.25, 0], 0.08, "#fef3c7", { opacity: 0.85 }), lbl(["RESÍDUO QUÍMICO", "XILOL · GRUPO B"], [0, 1.08, 0.082], [0.16, 0.08], { size: 36, fg: "#92400e" }));
}
function bMicroscope() { return grp(mBox([0, 0.93, 0], [0.22, 0.03, 0.18], C.dark), mCyl([0, 0.95, -0.06], [0, 1.25, -0.04], 0.025, C.dark), mCyl([0, 1.2, 0.0], [0, 1.32, -0.06], 0.02, "#111827"), mBox([0, 1.05, 0.02], [0.14, 0.02, 0.12], C.dark)); }
function bDesk(L = {}) {
  const g = grp(bTable({ w: 1.4, d: 0.75, h: 0.75, top: C.wood }));
  if (L.screen) { const m = bMonitor(L.screen, { fg: L.screenFg || "#e2e8f0", size: 28 }); m.position.set(0, 1.0, -0.2); g.add(m); }
  if (L.meds) g.add(mBox([0.45, 0.8, 0.1], [0.2, 0.08, 0.12], "#fef3c7"), lbl(L.meds, [0.45, 0.85, 0.165], [0.2, 0.07], { size: 34 }));
  if (L.doc) g.add(mBox([-0.35, 0.775, 0.1], [0.3, 0.005, 0.4], "#f8fafc"), mPlane([-0.35, 0.79, 0.1], [0.28, 0.36], textTex(L.doc, { h: 512, size: 30 }), { r: [-Math.PI / 2, 0, 0] }));
  if (L.bp) g.add(mBox([0.1, 0.8, 0.15], [0.12, 0.06, 0.08], "#1e293b"), mTorus([-0.05, 0.79, 0.2], L.bp === "small" ? 0.04 : 0.07, 0.02, "#1e40af", { r: [Math.PI / 2, 0, 0] }), lbl(L.bp === "small" ? "INFANTIL" : "ADULTO", [-0.05, 0.84, 0.28], [0.12, 0.05], { size: 50 }));
  return g;
}
function bExamTable(L = {}) {
  return grp(mBox([0, 0.4, 0], [0.7, 0.8, 1.8], "#64748b"), mBox([0, 0.85, 0], [0.72, 0.1, 1.82], "#1e293b"), mBox([0, 0.91, 0], [0.6, 0.01, 1.7], L.dirty ? "#d6c7a1" : "#f8fafc"), L.dirty ? mEll([0.1, 0.915, 0.2], [0.12, 0.002, 0.08], "#b45309", { opacity: 0.6 }) : null);
}
function bLamp() { return grp(mCyl([0, 2.8, 0], [0, 2.3, 0], 0.03, C.steel), mCyl([0, 2.3, 0], [0, 2.2, 0], 0.4, "#e2e8f0", { rad2: 0.28 }), mEll([0, 2.18, 0], [0.25, 0.02, 0.25], "#fef9c3", { emissive: 0xfef08a })); }
function bVent(L = {}) {
  const g = grp(mBox([0, 0.6, 0], [0.45, 1.2, 0.4], "#e2e8f0"));
  const m = bMonitor(L.screen || ["VM · VC 420 mL", "PEEP 8 · FiO2 40%"], { size: 30, fg: "#38bdf8" }); m.position.set(0, 1.4, 0); g.add(m);
  return g;
}
function bFoley(L = {}) {
  const y = L.floor ? 0.08 : L.high ? 0.95 : 0.35;
  return grp(mBox([0, y, 0], [0.22, 0.28, 0.03], "#fef3c7", { opacity: 0.8 }), mBox([0, y - 0.05, 0.016], [0.18, 0.12, 0.002], "#facc15"), mCyl([0, y + 0.14, 0], [-0.1, 0.62, -0.1], 0.006, "#e2e8f0"));
}
function bBottle(L = {}) { return grp(mCyl([0, 0.93, 0], [0, 1.15, 0], 0.045, "#fbcfe8"), mCyl([0, 1.15, 0], [0, 1.2, 0], 0.02, "#f8fafc"), lbl(L.text || ["CLOREXIDINA", "Aberto: 12/03"], [0, 1.04, 0.047], [0.09, 0.07], { size: 38 })); }

// ---------- Cenários ----------
const E = (id, n, build, pos, rot, ok, errs) => ({ id, n, build, pos, rot: rot || 0, ok, errs: errs || [] });
const ERR_SCENES = [
  {
    id: "cc", n: "Centro cirúrgico", icon: "🩺", disc: "cirurgia", wall: "#d1e7e0", floor: "#94a3b8",
    ctx: "Sala 3 do centro cirúrgico, minutos antes da incisão de uma colecistectomia. A equipe está paramentada.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.25 }, { p: [-2.2, 1.6, 0.6], y: 0.9, pt: -0.25 }, { p: [2.2, 1.6, 0.4], y: -1.0, pt: -0.2 }],
    decor: (v) => { const t = bBed({ patient: { sheet: "#16a34a", plate: "#cbd5e1" }, rails: "down" }); t.position.set(0, 0, -0.4); v.add(t); const l = bLamp(); l.position.set(0, 0, -0.4); v.add(l); },
    objects: [
      E("cir", "Cirurgião", bPerson, [0.9, 0, -0.3], -1.4, { look: { gown: "#2563eb", cap: true, mask: "ok", gloves: true }, desc: "Cirurgião com gorro, máscara cobrindo nariz e boca, avental estéril e luvas, mãos acima da cintura." },
        [{ lvl: 1, look: { gown: "#2563eb", cap: true, mask: "down", gloves: true }, desc: "Cirurgião paramentado, mas com a máscara abaixo do nariz.", why: "A máscara precisa cobrir nariz e boca durante todo o procedimento", no: ["O avental deveria ser branco", "Ele deveria estar sem luvas até a incisão"], explain: "Máscara abaixo do nariz não protege o campo operatório de gotículas e microrganismos da via aérea do profissional." },
         { lvl: 2, look: { gown: "#2563eb", cap: true, mask: "ok", gloves: true, ring: true }, desc: "Cirurgião paramentado, usando aliança e relógio por baixo das luvas e do avental.", why: "Adornos são proibidos: acumulam microrganismos e rasgam luvas", no: ["Relógio é permitido se for de pulso fino", "Só o anel precisa sair, o relógio não"], explain: "A NR-32 proíbe adornos para quem atua em áreas de assistência. Eles impedem a degermação adequada e podem perfurar as luvas." }]),
      E("inst", "Instrumentadora", bPerson, [-0.9, 0, -0.2], 1.3, { look: { gown: "#2563eb", cap: true, mask: "ok", gloves: true }, desc: "Instrumentadora paramentada, com as mãos acima da cintura e na frente do corpo." },
        [{ lvl: 3, look: { gown: "#2563eb", cap: true, mask: "ok", gloves: true, armUp: false, coatOpen: false }, desc: "Instrumentadora paramentada que, após ajeitar a máscara com a mão enluvada, volta a manusear os instrumentos.", why: "Tocar na máscara contamina a luva: ela precisa trocar as luvas", no: ["A máscara é estéril, então não há problema", "Basta passar álcool na luva"], explain: "A máscara não é estéril. Qualquer toque em área não estéril contamina a luva, que deve ser trocada antes de voltar ao campo." }]),
      E("mesa", "Mesa de instrumentos", bTray, [1.6, 0, 1.0], -0.4, { look: {}, desc: "Mesa de instrumentos com campo estéril seco e instrumentais organizados por tempo cirúrgico." },
        [{ lvl: 3, look: { wet: true }, desc: "Mesa de instrumentos com uma área do campo estéril molhada de soro.", why: "Campo molhado perde a barreira estéril e deve ser considerado contaminado", no: ["Soro é estéril, então o campo segue estéril", "Só preocupa se o líquido for sangue"], explain: "Tecidos úmidos permitem a passagem de microrganismos por capilaridade. A área precisa ser coberta com novo campo estéril ou trocada." },
         { lvl: 2, look: { looseNeedle: true }, desc: "Mesa de instrumentos com uma agulha de sutura solta sobre o campo, fora do porta-agulha.", why: "Agulhas devem ficar presas ou em local próprio, contadas e controladas", no: ["Agulha solta facilita o uso rápido", "Não há problema se for contada no fim"], explain: "Perfurocortante solto aumenta o risco de acidente com a equipe e de corpo estranho retido. Mantê-lo no porta-agulha ou em contador próprio." }]),
      E("porta", "Porta da sala", bDoor, [2.0, 0, -2.45], 0, { look: { sign: ["SALA 3", "EM CIRURGIA"], signBg: "#fee2e2", signFg: "#991b1b" }, desc: "Porta da sala fechada, com aviso de cirurgia em andamento." },
        [{ lvl: 1, look: { open: true, sign: ["SALA 3", "EM CIRURGIA"], signBg: "#fee2e2", signFg: "#991b1b" }, desc: "Porta da sala aberta durante o procedimento, com circulação de pessoas no corredor.", why: "A porta deve ficar fechada para manter a pressão e a qualidade do ar da sala", no: ["Porta aberta melhora a ventilação", "Só importa fechar no fim da cirurgia"], explain: "Portas abertas aumentam a turbulência e a contagem de partículas no ar, elevando o risco de infecção do sítio cirúrgico." }]),
      E("check", "Quadro do checklist", (L) => bSign(L.lines, { s: [1.0, 0.6], size: 40 }), [-1.2, 1.7, -2.45], 0, { look: { lines: ["CIRURGIA SEGURA", "Antes da indução ✓", "Antes da incisão ✓", "Antes de sair ☐"] }, desc: "Checklist de cirurgia segura com as pausas de antes da indução e antes da incisão já cumpridas." },
        [{ lvl: 2, look: { lines: ["CIRURGIA SEGURA", "Antes da indução ✓", "Antes da incisão ☐", "Antes de sair ☐"] }, desc: "Checklist com a pausa de “antes da incisão” (time-out) em branco, e o cirurgião já pediu o bisturi.", why: "A pausa cirúrgica (time-out) deve ser feita antes da incisão", no: ["O time-out é feito só no fim", "Basta o cirurgião conferir sozinho"], explain: "No time-out, toda a equipe confirma paciente, procedimento, lado, antibiótico profilático e eventos críticos esperados (Protocolo de Cirurgia Segura da OMS)." }]),
      E("lixo", "Lixeira da sala", bBin, [-2.2, 0, 1.3], 0.4, { look: { bag: "white" }, desc: "Lixeira com tampa e pedal, saco branco leitoso com símbolo de infectante, com compressas sujas de sangue." },
        [{ lvl: 1, look: { bag: "black", text: ["RESÍDUO", "COMUM"] }, desc: "Lixeira de saco preto (resíduo comum) contendo compressas com sangue.", why: "Material com sangue é resíduo infectante (Grupo A): saco branco leitoso", no: ["Saco preto é o correto para qualquer resíduo de sala", "Compressas devem ir para a caixa de perfurocortante"], explain: "Pela RDC 222/2018, resíduos com sangue vão em saco branco leitoso identificado como infectante. Saco preto é para resíduo comum (Grupo D)." }]),
      E("perfuro", "Caixa de perfurocortante", bSharps, [-1.9, 0.9, -2.2], 0, { look: { fill: 0.45 }, desc: "Caixa de perfurocortante abaixo da linha de preenchimento." },
        [{ lvl: 1, look: { fill: 1.0, needleOut: true }, desc: "Caixa de perfurocortante cheia acima da linha, com uma agulha para fora.", why: "A caixa deve ser fechada e trocada ao atingir a linha indicada (cerca de 3/4)", no: ["Pode encher até a tampa para economizar", "Basta empurrar a agulha para dentro"], explain: "Encher acima do limite causa acidentes com perfurocortantes. A troca é na linha de preenchimento (RDC 222/2018)." }]),
      E("placa", "Placa do bisturi elétrico", (L) => grp(mBox([0, 0.4, 0], [0.4, 0.8, 0.4], "#e2e8f0"), mPlane([0, 0.6, 0.21], [0.3, 0.14], textTex(L.lines, { bg: "#0f172a", fg: "#fde047", size: 34 }))), [1.6, 0, -1.4], -0.6, { look: { lines: ["Placa: OK", "Coxa direita"] }, desc: "Gerador do bisturi elétrico indicando placa dispersiva bem aderida na coxa." },
        [{ lvl: 3, look: { lines: ["ALERTA: placa", "contato parcial"] }, desc: "Gerador do bisturi elétrico com alerta de contato parcial da placa, colocada sobre a crista ilíaca.", why: "A placa deve ficar totalmente aderida em músculo bem vascularizado, longe de proeminências ósseas", no: ["O alerta pode ser ignorado se o bisturi funciona", "A placa deve ficar sempre sobre um osso"], explain: "Contato parcial concentra a corrente e pode queimar a pele. Reposicionar em área muscular, seca e sem pelos, próxima ao sítio cirúrgico." }]),
      E("anest", "Monitor de anestesia", (L) => { const m = bMonitor(["FC 72 · PA 118/76", "SpO2 99% · EtCO2 35"], { stand: true }); m.position.y = 1.4; return grp(m); }, [-1.6, 0, -1.6], 0.5, { look: {}, desc: "Monitor com oximetria, ECG, pressão arterial e capnografia funcionando." })
    ]
  },
  {
    id: "enf", n: "Enfermaria", icon: "🛏️", disc: "clinica", wall: "#e0e7ef", floor: "#a8b4c4",
    ctx: "Enfermaria de clínica médica às 14h. Você está acompanhando a passagem de visita.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.2 }, { p: [-2.0, 1.6, 0.8], y: 0.8, pt: -0.25 }, { p: [2.0, 1.6, 0.6], y: -0.8, pt: -0.25 }],
    objects: [
      E("leito", "Leito 2: paciente idoso", bBed, [-1.3, 0, -1.2], 0, { look: { rails: "up", head: 30, patient: { band: true, confused: true }, label: "LEITO 2" }, desc: "Paciente idoso e confuso, com grades elevadas e cama na altura mínima." },
        [{ lvl: 1, look: { rails: "down", head: 30, patient: { band: true, confused: true }, label: "LEITO 2" }, desc: "Paciente idoso e confuso, com as grades da cama abaixadas.", why: "Paciente com risco de queda deve ficar com as grades elevadas", no: ["Grades baixas evitam claustrofobia em todos os casos", "Só precisa levantar a grade à noite"], explain: "Confusão mental e idade avançada aumentam muito o risco de queda. As medidas incluem grades elevadas, cama baixa e reavaliação do risco (Protocolo de Prevenção de Quedas)." }]),
      E("pulseira", "Leito 4: identificação", bBed, [1.3, 0, -1.2], 0, { look: { rails: "up", patient: { band: true }, label: "LEITO 4" }, desc: "Paciente com pulseira contendo nome completo e data de nascimento." },
        [{ lvl: 1, look: { rails: "up", patient: { band: false }, label: "LEITO 4" }, desc: "Paciente sem pulseira de identificação; a equipe se orienta pelo número do leito.", why: "Todo paciente internado deve ter pulseira com pelo menos 2 identificadores", no: ["O número do leito já identifica o paciente", "Só pacientes cirúrgicos usam pulseira"], explain: "O número do leito não é identificador. Use dois identificadores (ex.: nome completo e data de nascimento) e confira antes de medicações e procedimentos." }]),
      E("soro", "Soro em infusão", bIV, [-0.55, 0, -1.6], 0, { look: {}, desc: "Frasco de soro rotulado com nome do paciente, solução, volume e horário de início." },
        [{ lvl: 2, look: { label: false }, desc: "Frasco de soro com medicação adicionada, sem nenhum rótulo.", why: "Soluções devem ser rotuladas com paciente, conteúdo, dose e horário", no: ["Soro fisiológico nunca precisa de rótulo", "Basta anotar no prontuário"], explain: "Medicamentos sem rótulo favorecem trocas e erros de administração. Identificar sempre o que foi preparado e para quem." }]),
      E("gel", "Dispensador de álcool", bGel, [0, 1.3, -2.45], 0, { look: { level: 0.7 }, desc: "Dispensador de álcool gel abastecido, ao lado da porta." },
        [{ lvl: 2, look: { level: 0.02 }, desc: "Dispensador de álcool gel vazio, sem outro ponto de higiene das mãos por perto.", why: "Dispensadores vazios impedem a higiene das mãos nos 5 momentos", no: ["Álcool gel é opcional se usar luvas", "Basta lavar as mãos no fim do plantão"], explain: "A higiene das mãos é a medida mais importante contra infecções. O álcool deve estar disponível no ponto de assistência." }]),
      E("isol", "Placa na porta do quarto", (L) => bDoor({ sign: L.sign, signBg: L.bg, signFg: "#1e293b" }), [2.4, 0, 0.8], -Math.PI / 2, { look: { sign: ["PRECAUÇÃO", "DE CONTATO"], bg: "#fde68a" }, desc: "Quarto de paciente com bactéria multirresistente, com placa de precaução de contato e avental e luvas na entrada." },
        [{ lvl: 3, look: { sign: ["PRECAUÇÃO", "PADRÃO"], bg: "#e5e7eb" }, desc: "Quarto de paciente com tuberculose pulmonar bacilífera, porta aberta, só com placa de precaução padrão. O profissional entra com máscara cirúrgica.", why: "TB bacilífera exige precaução para aerossóis: quarto fechado e máscara N95/PFF2", no: ["Máscara cirúrgica protege contra tuberculose", "Basta precaução de contato"], explain: "O bacilo é transmitido por aerossóis. O profissional deve usar N95/PFF2, com porta fechada (idealmente pressão negativa). O paciente usa máscara cirúrgica ao sair do quarto." }]),
      E("prof", "Profissional de enfermagem", bPerson, [0.6, 0, 0.4], 2.6, { look: { gown: "#f8fafc", pants: "#1e40af", mask: "ok", badge: "ENF." }, desc: "Profissional que retira as luvas e higieniza as mãos antes de pegar o prontuário." },
        [{ lvl: 2, look: { gown: "#f8fafc", pants: "#1e40af", gloves: true, gloveColor: "#a78bfa", holdChart: true, badge: "ENF." }, desc: "Profissional que acabou de trocar um curativo e, com as mesmas luvas, escreve no prontuário e abre a porta.", why: "Luvas usadas no paciente contaminam superfícies: retirar e higienizar as mãos", no: ["Luvas protegem tudo que é tocado", "Pode usar a mesma luva no plantão inteiro"], explain: "Luvas não substituem a higiene das mãos e devem ser trocadas entre tarefas e pacientes. Tocar superfícies com luvas usadas espalha microrganismos." }]),
      E("piso", "Piso do corredor", bWetFloor, [-0.5, 0, 1.2], 0, { look: { cone: true }, desc: "Piso recém-limpo e ainda úmido, com placa de piso molhado." },
        [{ lvl: 1, look: { cone: false }, desc: "Piso molhado no caminho do banheiro, sem sinalização.", why: "Piso molhado deve ser sinalizado para evitar quedas", no: ["Pacientes já sabem que o piso é molhado", "Só precisa sinalizar à noite"], explain: "Quedas são eventos adversos graves em hospitais. Sinalizar e secar rapidamente as áreas molhadas." }]),
      E("carrinho", "Carrinho de medicação", (L) => grp(mBox([0, 0.5, 0], [0.7, 1.0, 0.5], "#e5e7eb"), lbl(L.lines, [0, 0.8, 0.255], [0.55, 0.3], { size: 34, bg: L.bg || "#ffffff" })), [-2.3, 0, 0.3], Math.PI / 2, { look: { lines: ["MEDICAÇÕES", "Alta vigilância em", "gaveta separada ⚠"] }, desc: "Carrinho com medicamentos de alta vigilância em gaveta separada e sinalizada." },
        [{ lvl: 3, look: { lines: ["MEDICAÇÕES", "KCl 19,1% junto", "com dipirona"], bg: "#fee2e2" }, desc: "Ampolas de cloreto de potássio concentrado (19,1%) guardadas misturadas a analgésicos comuns.", why: "Medicamentos de alta vigilância devem ficar separados e sinalizados", no: ["Cloreto de potássio é inofensivo", "Basta deixar a ampola mais perto da porta"], explain: "Potássio concentrado IV pode causar parada cardíaca se administrado por engano. Armazenar separado, sinalizado e com dupla checagem." }]),
      E("refeicao", "Mesa de refeição", (L) => grp(bTable({ w: 0.7, d: 0.4, h: 0.85, top: "#f1f5f9" }), mCyl([0, 0.87, 0], [0, 0.89, 0], 0.15, "#f8fafc")), [1.8, 0, 0.6], 0, { look: {}, desc: "Mesa de refeição limpa, com a bandeja do almoço do paciente." })
    ]
  },
  {
    id: "lab", n: "Laboratório de análises", icon: "🧫", disc: "micro", wall: "#e5edf5", floor: "#9ca3af",
    ctx: "Laboratório de microbiologia de um hospital-escola. Amostras de escarro e sangue chegaram para processamento.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.3 }, { p: [-2.0, 1.6, 1.0], y: 0.85, pt: -0.3 }, { p: [2.0, 1.6, 1.0], y: -0.85, pt: -0.3 }],
    decor: (v) => { const c = bCounter({ w: 4.4 }); c.position.set(0, 0, -2.1); v.add(c); const m = bMicroscope(); m.position.set(-1.6, 0, -2.0); v.add(m); },
    objects: [
      E("bancada", "Bancada de trabalho", (L) => (L.food ? bFood() : grp(mBox([0, 0.93, 0], [0.3, 0.02, 0.2], "#f8fafc"))), [-0.9, 0, -2.0], 0, { look: {}, desc: "Bancada limpa, com papel absorvente e desinfetante." },
        [{ lvl: 1, look: { food: true }, desc: "Copo de café e um lanche sobre a bancada, ao lado das amostras.", why: "É proibido comer e beber em áreas de manipulação de material biológico", no: ["Pode comer se a amostra estiver tampada", "Só é proibido fumar"], explain: "A NR-32 proíbe consumir alimentos nos locais de trabalho com risco biológico. Há risco de ingestão de agentes infecciosos." }]),
      E("tubos", "Tubos de amostra", bTubes, [0.0, 0, -2.0], 0, { look: {}, desc: "Tubos com etiqueta de identificação do paciente." },
        [{ lvl: 1, look: { unlabeled: true }, desc: "Um dos tubos de sangue está sem etiqueta de identificação.", why: "Toda amostra deve estar identificada com o paciente antes de ser processada", no: ["Pela cor da tampa dá para saber de quem é", "Basta etiquetar depois do resultado"], explain: "Amostras sem identificação devem ser recusadas ou ter a coleta repetida. Trocas de amostra levam a diagnósticos errados." }]),
      E("tecnico", "Técnico de laboratório", bPerson, [0.9, 0, -1.4], 0.2, { look: { gown: "#f8fafc", pants: "#334155", gloves: true, goggles: true, cap: false }, desc: "Técnico de jaleco fechado, luvas, óculos e cabelo preso, usando pipeta automática." },
        [{ lvl: 1, look: { gown: "#f8fafc", pants: "#334155", gloves: true, pipetteMouth: true }, desc: "Técnico pipetando uma amostra com a boca.", why: "Pipetagem com a boca é proibida: usar pipetadores mecânicos", no: ["Pode pipetar com a boca se for rápido", "Só é proibido com sangue"], explain: "Pipetar com a boca expõe à ingestão de material infeccioso ou químico. Sempre usar pera ou pipeta automática." },
         { lvl: 2, look: { gown: "#f8fafc", pants: "#334155", gloves: true, coatOpen: true, hair: "loose" }, desc: "Técnico com o jaleco aberto e o cabelo comprido solto sobre a bancada.", why: "Jaleco deve ficar fechado e cabelos presos", no: ["Jaleco aberto ventila melhor", "Cabelo solto só importa no centro cirúrgico"], explain: "Jaleco aberto não protege a roupa e a pele; cabelo solto pode tocar o material e as superfícies, contaminando-se." }]),
      E("cabine", "Cabine de segurança biológica", bHood, [2.1, 0, -1.6], -0.6, { look: {}, desc: "Amostra de escarro de paciente com suspeita de tuberculose sendo aberta dentro da cabine de segurança biológica." },
        [{ lvl: 3, look: { empty: true }, desc: "Cabine de segurança biológica vazia; a amostra de escarro de suspeita de tuberculose é aberta na bancada comum.", why: "Amostras com risco de aerossóis devem ser manipuladas na cabine de segurança biológica", no: ["A cabine serve só para culturas de fungos", "Basta usar máscara cirúrgica na bancada"], explain: "Abrir e processar escarro pode gerar aerossóis com M. tuberculosis. A cabine classe II protege o profissional e o ambiente." }]),
      E("geladeira", "Geladeira", bFridge, [-2.3, 0, -0.6], Math.PI / 2, { look: {}, desc: "Geladeira exclusiva para amostras, identificada, a 4 °C." },
        [{ lvl: 2, look: { food: true }, desc: "Geladeira de amostras com marmita e refrigerante guardados junto às amostras.", why: "Alimentos não podem ser guardados com material biológico", no: ["Se estiver tampado, pode", "Basta separar em prateleiras diferentes"], explain: "A geladeira de amostras é exclusiva. Alimentos ali podem se contaminar e serem ingeridos." }]),
      E("centri", "Centrífuga", bCentrifuge, [-0.2, 0, -2.0], 0, { look: { running: true }, desc: "Centrífuga girando com a tampa fechada e travada." },
        [{ lvl: 2, look: { running: true, lidOpen: true }, desc: "Centrífuga a 4.000 rpm com a tampa aberta.", why: "A tampa deve ficar fechada durante a centrifugação e só ser aberta com o rotor parado", no: ["Tampa aberta ajuda a resfriar", "Só precisa fechar com amostras de sangue"], explain: "Centrifugar com a tampa aberta pode lançar tubos e aerossóis. Abrir só após a parada total do rotor." }]),
      E("quimico", "Descarte de xilol", bWasteBottle, [1.3, 0, 1.6], Math.PI, { look: {}, desc: "Xilol usado guardado em frasco identificado de resíduo químico (Grupo B)." },
        [{ lvl: 3, look: { sinkPour: true }, desc: "Técnico despejando xilol usado na pia.", why: "Resíduo químico (Grupo B) não pode ir para o esgoto: frasco próprio e coleta especial", no: ["Pode descartar na pia com água corrente", "Xilol é biodegradável"], explain: "Solventes tóxicos devem ser segregados como Grupo B, conforme a ficha de segurança, para tratamento adequado." }]),
      E("chuveiro", "Chuveiro e lava-olhos", bEyewash, [2.3, 0, 0.6], -Math.PI / 2, { look: {}, desc: "Chuveiro de emergência e lava-olhos sinalizados e desobstruídos." },
        [{ lvl: 2, look: { blocked: true }, desc: "Caixas de material empilhadas na frente do chuveiro e do lava-olhos.", why: "Equipamentos de emergência devem ficar sempre desobstruídos", no: ["Pode empilhar se a caixa for leve", "O lava-olhos só é usado em testes"], explain: "Em acidente com respingo químico ou biológico, segundos importam. O acesso precisa estar livre." }])
    ]
  },
  {
    id: "ps", n: "Pronto-socorro", icon: "🚑", disc: "clinica", wall: "#e2e8f0", floor: "#a3a3a3",
    ctx: "Sala de emergência de um pronto-socorro no início do plantão. Você confere a sala com o médico responsável.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.25 }, { p: [-2.0, 1.6, 0.8], y: 0.8, pt: -0.25 }, { p: [2.0, 1.6, 0.8], y: -0.8, pt: -0.25 }],
    objects: [
      E("carro", "Carrinho de emergência", bCart, [-1.8, 0, -2.0], 0.3, { look: { check: ["Checado hoje 07h", "Lacre nº 4521"] }, desc: "Carrinho de emergência lacrado, com checagem diária registrada." },
        [{ lvl: 2, look: { seal: "broken", drawerOpen: true, check: ["Última checagem:", "há 9 dias"] }, desc: "Carrinho de emergência com o lacre rompido, gaveta aberta e última checagem há 9 dias.", why: "O carrinho deve ser checado e relacrado após cada uso e conferido periodicamente", no: ["Lacre é só formalidade", "Só precisa checar uma vez por mês"], explain: "Na parada cardiorrespiratória, faltar adrenalina ou laringoscópio custa vidas. Checar, repor e lacrar com registro." }]),
      E("desfib", "Desfibrilador", (L) => grp(mBox([0, 0.5, 0], [0.5, 1.0, 0.45], "#334155"), mBox([0, 1.1, 0], [0.42, 0.3, 0.3], "#facc15"), mPlane([0, 1.15, 0.152], [0.3, 0.14], textTex(L.lines, { bg: "#0f172a", fg: L.fg || "#4ade80", size: 40 }))), [-0.8, 0, -2.1], 0, { look: { lines: ["Teste diário OK", "Bateria 100%"] }, desc: "Desfibrilador conectado à energia, com teste diário registrado." },
        [{ lvl: 2, look: { lines: ["BATERIA BAIXA", "Desconectado"], fg: "#f87171" }, desc: "Desfibrilador desconectado da tomada, indicando bateria baixa.", why: "O desfibrilador deve ficar carregado, ligado à energia e testado diariamente", no: ["A bateria aguenta vários choques mesmo baixa", "Só se testa quando for usar"], explain: "Na FV, o choque precoce é o que mais salva vidas. Equipamento sem carga atrasa a desfibrilação." }]),
      E("o2", "Cilindro de oxigênio", bO2, [0.3, 0, -2.1], 0, { look: {}, desc: "Cilindro de oxigênio preso em suporte com corrente." },
        [{ lvl: 1, look: { loose: true }, desc: "Cilindro de oxigênio solto, deitado no chão da sala.", why: "Cilindros devem ficar presos em suporte, na vertical", no: ["Deitado é mais seguro", "Só precisa prender se estiver cheio"], explain: "Cilindro solto pode cair, danificar a válvula e virar um projétil por causa da alta pressão." }]),
      E("maca", "Maca com paciente", bBed, [1.4, 0, -1.0], -0.2, { look: { rails: "up", patient: { band: true }, label: "SALA 1" }, desc: "Maca travada, com grades elevadas e paciente identificado." },
        [{ lvl: 2, look: { rails: "up", wheelsUnlocked: true, patient: { band: true }, label: "SALA 1" }, desc: "Maca com paciente agitado, rodas destravadas (trava vermelha solta).", why: "A maca deve ficar travada quando parada", no: ["Rodas soltas facilitam o transporte urgente", "Só trava em ambulância"], explain: "Maca destravada pode se deslocar e causar queda do paciente ou lesão da equipe." }]),
      E("triagem", "Painel da classificação de risco", (L) => { const m = bMonitor(L.lines, { size: 30, fg: "#e2e8f0" }); m.scale.set(2, 2, 2); return grp(m); }, [0.6, 1.8, -2.4], 0, { look: { lines: ["Manchester", "Laranja: atendido em 6 min", "Amarelo: aguardando 35 min"] }, desc: "Painel de classificação de risco com os tempos de espera dentro das metas." },
        [{ lvl: 3, look: { lines: ["Manchester", "LARANJA: aguardando 2 h", "Dor torácica, 58 anos"] }, desc: "Paciente classificado como laranja (dor torácica) aguardando há 2 horas.", why: "No Manchester, laranja é muito urgente: atendimento em até 10 minutos", no: ["Laranja pode esperar até 4 horas", "Quem chega primeiro deve ser atendido primeiro"], explain: "A cor define a prioridade: vermelho imediato, laranja até 10 min, amarelo até 60 min, verde até 120 min, azul até 240 min." }]),
      E("lixops", "Lixeira comum", bBin, [2.2, 0, 0.8], -0.5, { look: { bag: "black", text: ["RESÍDUO", "COMUM"] }, desc: "Lixeira de resíduo comum com embalagens e papéis." },
        [{ lvl: 1, look: { bag: "black", text: ["RESÍDUO", "COMUM"], overflow: true }, desc: "Lixeira de resíduo comum com uma seringa com agulha descartada dentro.", why: "Agulhas e seringas com agulha vão na caixa de perfurocortante", no: ["Pode descartar no lixo comum se a agulha estiver tampada", "Agulha vai no saco branco"], explain: "Perfurocortante no lixo comum causa acidentes com a equipe de limpeza. O descarte é na caixa rígida própria, sem reencapar." }]),
      E("pia", "Pia para higiene das mãos", bSink, [-2.1, 0, 0.6], Math.PI / 2, { look: {}, desc: "Pia com sabonete e papel toalha abastecidos." },
        [{ lvl: 2, look: { towel: false }, desc: "Pia sem papel toalha; os profissionais secam as mãos no jaleco.", why: "A pia deve ter sabonete e papel toalha descartável", no: ["Secar no jaleco é aceitável", "Ar quente é obrigatório"], explain: "Mãos úmidas e secas em tecido sujo se recontaminam. A falta de insumos é barreira para a higiene das mãos." }]),
      E("espera", "Paciente com tosse", bPerson, [1.0, 0, 1.4], 2.8, { look: { gown: "#f59e0b", mask: "ok", sit: true }, desc: "Paciente com tosse e febre aguardando com máscara cirúrgica." },
        [{ lvl: 2, look: { gown: "#f59e0b", sit: true }, desc: "Paciente com tosse produtiva e febre aguardando sem máscara, ao lado de outros pacientes.", why: "Sintomático respiratório deve usar máscara e ser separado (etiqueta respiratória)", no: ["Máscara só é necessária com diagnóstico confirmado", "Só os profissionais precisam de máscara"], explain: "Oferecer máscara e separar o paciente com sintomas respiratórios reduz a transmissão de gripe, COVID-19 e tuberculose na sala de espera." }])
    ]
  },
  {
    id: "uti", n: "Unidade de terapia intensiva", icon: "🫁", disc: "clinica", wall: "#dbeafe", floor: "#94a3b8",
    ctx: "Leito 5 da UTI: paciente em ventilação mecânica, com cateter venoso central e sonda vesical de demora.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.3 }, { p: [-1.9, 1.6, 0.8], y: 0.75, pt: -0.3 }, { p: [1.9, 1.6, 0.8], y: -0.75, pt: -0.3 }],
    objects: [
      E("cabeceira", "Paciente em ventilação mecânica", bBed, [0, 0, -1.0], 0, { look: { rails: "up", head: 35, patient: { band: true, tube: true }, label: "LEITO 5" }, desc: "Paciente intubado com cabeceira elevada a 35°." },
        [{ lvl: 2, look: { rails: "up", head: 0, patient: { band: true, tube: true }, label: "LEITO 5" }, desc: "Paciente intubado deitado com a cabeceira a 0°.", why: "Manter a cabeceira entre 30° e 45° para prevenir pneumonia associada à ventilação", no: ["Cabeceira reta melhora a oxigenação de todos", "Só eleva durante a dieta"], explain: "A cabeceira elevada reduz a aspiração de secreções. Faz parte do pacote de prevenção de pneumonia associada à ventilação mecânica." }]),
      E("cvc", "Curativo do cateter central", (L) => grp(mBox([0, 1.15, 0], [0.5, 0.3, 0.02], "#f8fafc"), lbl(L.lines, [0, 1.15, 0.012], [0.46, 0.26], { size: 34, bg: L.bg || "#ffffff" })), [-0.8, 0, -2.45], 0, { look: { lines: ["Curativo CVC", "Filme transparente", "Troca: 05/03 ✓ íntegro"] }, desc: "Curativo do cateter venoso central íntegro, limpo e com data de troca." },
        [{ lvl: 2, look: { lines: ["Curativo CVC", "Gaze úmida e descolada", "Sem data"], bg: "#fef3c7" }, desc: "Curativo do cateter central com gaze úmida, descolado e sem data.", why: "Curativo sujo, úmido ou solto deve ser trocado de imediato, com registro da data", no: ["Curativo de CVC nunca é trocado", "Basta reforçar com esparadrapo"], explain: "Curativo úmido ou solto aumenta o risco de infecção da corrente sanguínea. Gaze é trocada a cada 48 h; filme transparente, a cada 7 dias ou antes se necessário." }]),
      E("bomba", "Bomba de infusão", bIV, [0.75, 0, -1.6], 0, { look: { pump: ["NORADRENALINA", "8 mL/h"] }, desc: "Bomba de infusão de noradrenalina com seringa identificada e alarmes ativos." },
        [{ lvl: 3, look: { pump: ["??? 8 mL/h", "SEM RÓTULO"], label: false }, desc: "Droga vasoativa correndo em bomba, com seringa sem identificação.", why: "Drogas em infusão contínua devem estar identificadas na seringa e na linha", no: ["A bomba já sabe qual é a droga", "Só identificar no fim do plantão"], explain: "Drogas vasoativas são de alta vigilância. Sem rótulo, o risco de troca ou bolus acidental é grande." }]),
      E("sonda", "Bolsa da sonda vesical", bFoley, [0.45, 0, -0.2], 0, { look: {}, desc: "Bolsa coletora presa à cama, abaixo do nível da bexiga, sem tocar o chão." },
        [{ lvl: 2, look: { floor: true }, desc: "Bolsa coletora apoiada no chão.", why: "A bolsa deve ficar abaixo da bexiga e sem contato com o chão", no: ["No chão drena melhor", "Pode ficar no chão se fechada"], explain: "Contato com o chão contamina o sistema; bolsa acima da bexiga causa refluxo. Ambos aumentam o risco de infecção urinária." }]),
      E("medico", "Médico plantonista", bPerson, [-1.2, 0, 0.3], 0.6, { look: { gown: "#f8fafc", pants: "#0f766e", badge: "MÉD." }, desc: "Médico que higieniza as mãos com álcool antes de examinar o próximo paciente." },
        [{ lvl: 1, look: { gown: "#f8fafc", pants: "#0f766e", badge: "MÉD.", gloves: true, gloveColor: "#a78bfa" }, desc: "Médico que examinou o leito 4 e passa ao leito 5 sem retirar as luvas nem higienizar as mãos.", why: "Higienizar as mãos e trocar as luvas entre pacientes", no: ["Luvas dispensam a higiene entre pacientes", "Basta lavar no fim da visita"], explain: "As mãos e luvas levam microrganismos de um paciente a outro. Os 5 momentos da OMS incluem antes e depois do contato com cada paciente." }]),
      E("precau", "Porta do leito 6", (L) => bDoor({ sign: L.sign, signBg: L.bg }), [2.4, 0, -0.5], -Math.PI / 2, { look: { sign: ["PRECAUÇÃO", "DE CONTATO"], bg: "#fde68a" }, desc: "Leito de paciente com bactéria multirresistente, com placa de precaução de contato e EPI na entrada." },
        [{ lvl: 2, look: { sign: ["LEITO 6"], bg: "#ffffff" }, desc: "Leito de paciente colonizado por bactéria produtora de carbapenemase, sem nenhuma sinalização de precaução.", why: "Pacientes com multirresistentes exigem precaução de contato sinalizada", no: ["A sinalização assusta a família", "Só precisa sinalizar se tiver febre"], explain: "A placa informa toda a equipe sobre o uso de avental e luvas, reduzindo a transmissão cruzada." }]),
      E("monitor", "Monitor multiparamétrico", (L) => { const m = bMonitor(["FC 96 · PAM 72", "SpO2 95% · FR 18"], { stand: true }); m.position.y = 1.4; return grp(m); }, [-0.9, 0, -1.6], 0.2, { look: {}, desc: "Monitor com alarmes ativos e parâmetros dentro das metas." }),
      E("lixouti", "Lixeira infectante", bBin, [2.0, 0, 1.4], 0, { look: { bag: "white" }, desc: "Lixeira de resíduo infectante com tampa e pedal." })
    ]
  },
  {
    id: "cons", n: "Consultório médico", icon: "🩻", disc: "semio", wall: "#f1f5f9", floor: "#b8a68c",
    ctx: "Consultório de clínica geral numa unidade básica de saúde, entre uma consulta e outra.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.3 }, { p: [-2.0, 1.6, 0.8], y: 0.8, pt: -0.3 }, { p: [2.0, 1.6, 0.8], y: -0.8, pt: -0.3 }],
    objects: [
      E("tela", "Computador do consultório", (L) => bDesk({ screen: L.screen }), [-0.9, 0, -1.8], 0, { look: { screen: ["Prontuário eletrônico", "(tela bloqueada)"] }, desc: "Computador com a tela bloqueada entre os atendimentos." },
        [{ lvl: 2, look: { screen: ["J. P. S., 45 anos", "HIV + | Depressão", "Últimos exames…"] }, desc: "Prontuário do paciente anterior aberto na tela, virada para a cadeira do próximo paciente.", why: "Dados de saúde são sigilosos: bloquear a tela entre atendimentos", no: ["O próximo paciente não vai ler", "Sigilo vale só para papel"], explain: "O Código de Ética Médica e a LGPD protegem os dados de saúde. Bloqueie a tela e posicione o monitor longe da vista de terceiros." }]),
      E("amostras", "Amostras de medicamentos", (L) => bDesk({ meds: L.meds }), [1.0, 0, -1.8], 0, { look: { meds: ["Validade:", "10/2027"] }, desc: "Amostras de medicamentos dentro da validade, guardadas na gaveta." },
        [{ lvl: 2, look: { meds: ["Validade:", "03/2024"] }, desc: "Amostras de anti-hipertensivo vencidas sendo entregues ao paciente.", why: "Nunca dispensar medicamentos vencidos", no: ["Vencido há pouco tempo ainda funciona", "Pode entregar se o paciente aceitar"], explain: "Medicamentos vencidos podem perder eficácia ou se degradar. Devem ser descartados conforme o plano de resíduos." }]),
      E("maca", "Maca de exame", bExamTable, [-1.8, 0, 0.3], Math.PI / 2, { look: {}, desc: "Maca com lençol de papel trocado após o último paciente." },
        [{ lvl: 1, look: { dirty: true }, desc: "Lençol de papel amassado e manchado do paciente anterior.", why: "O lençol descartável deve ser trocado entre pacientes, com limpeza da maca", no: ["Só se troca no fim do dia", "Basta virar o papel"], explain: "Superfícies de contato direto com o paciente precisam de troca da barreira e limpeza entre atendimentos." }]),
      E("pa", "Medida da pressão arterial", (L) => bDesk({ bp: L.bp }), [1.5, 0, 0.4], -Math.PI / 2, { look: { bp: "adult" }, desc: "Esfigmomanômetro com manguito adulto adequado ao braço do paciente." },
        [{ lvl: 3, look: { bp: "small" }, desc: "Paciente adulto com obesidade (circunferência do braço de 38 cm) tendo a PA medida com manguito infantil.", why: "O manguito deve ser adequado à circunferência do braço", no: ["O manguito pequeno subestima a PA", "Qualquer manguito serve se apertar bem"], explain: "Manguito pequeno superestima a PA e pode levar a diagnóstico e tratamento indevidos de hipertensão. A bolsa deve cobrir cerca de 80% da circunferência." }]),
      E("portac", "Porta do consultório", bDoor, [2.2, 0, -2.45], 0, { look: { sign: ["CONSULTÓRIO 2"] }, desc: "Porta fechada durante a consulta." },
        [{ lvl: 1, look: { open: true, sign: ["CONSULTÓRIO 2"] }, desc: "Porta escancarada durante o exame físico, com pessoas passando no corredor.", why: "A privacidade do paciente deve ser garantida durante a consulta e o exame", no: ["Porta aberta é mais seguro para o médico", "Privacidade só vale para exame ginecológico"], explain: "Respeitar a privacidade é dever ético. Use porta fechada, biombo e, quando indicado, a presença de um acompanhante." }]),
      E("perfcons", "Lixeira do consultório", bBin, [0.2, 0, 1.6], Math.PI, { look: { bag: "black", text: ["RESÍDUO", "COMUM"] }, desc: "Lixeira de resíduo comum com papéis." },
        [{ lvl: 1, look: { bag: "black", text: ["RESÍDUO", "COMUM"], overflow: true }, desc: "Seringa e agulha da aplicação de vacina descartadas no lixo comum.", why: "Agulhas vão na caixa de perfurocortante", no: ["Se a agulha estiver tampada, pode ir no lixo comum", "Agulha vai no saco branco"], explain: "Descarte inadequado de perfurocortantes causa acidentes com a equipe de limpeza." }]),
      E("pias", "Pia do consultório", bSink, [-2.2, 0, -1.2], Math.PI / 2, { look: {}, desc: "Pia com sabonete, papel toalha e álcool gel." }),
      E("medc", "Médica", bPerson, [0.4, 0, -0.5], 2.9, { look: { gown: "#f8fafc", pants: "#1d4ed8", badge: "MÉD." }, desc: "Médica que higieniza as mãos antes de examinar o paciente." })
    ]
  },
  {
    id: "proc", n: "Sala de procedimentos", icon: "💉", disc: "cirurgia", wall: "#e2f0eb", floor: "#9ca3af",
    ctx: "Sala de procedimentos de um ambulatório: uma sutura e uma biópsia de pele estão agendadas.",
    views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.3 }, { p: [-1.9, 1.6, 0.8], y: 0.8, pt: -0.3 }, { p: [1.9, 1.6, 0.8], y: -0.8, pt: -0.3 }],
    decor: (v) => { const t = bExamTable({}); t.position.set(0, 0, -1.0); t.rotation.y = Math.PI / 2; v.add(t); const l = bLamp(); l.position.set(0, 0, -1.0); v.add(l); },
    objects: [
      E("bandeja", "Bandeja de procedimento", bTray, [1.3, 0, -1.4], -0.3, { look: { syringeOk: true }, desc: "Bandeja com seringa e agulha prontas para descarte direto na caixa de perfurocortante." },
        [{ lvl: 1, look: { capped: true }, desc: "Profissional reencapando a agulha da anestesia com as duas mãos.", why: "É proibido reencapar agulhas: descartar direto na caixa de perfurocortante", no: ["Reencapar com cuidado é seguro", "Só é proibido reencapar agulha de sangue"], explain: "A NR-32 proíbe o reencape e a desconexão manual de agulhas, principal causa de acidentes com perfurocortantes." }]),
      E("pacote", "Pacote estéril", (L) => bTray({ pack: L.pack }), [-1.2, 0, -1.5], 0.3, { look: { pack: "#1e293b" }, desc: "Pacote estéril íntegro, com indicador químico que mudou de cor (processado)." },
        [{ lvl: 3, look: { pack: "#e7d9a8" }, desc: "Pacote de instrumental com o indicador químico ainda na cor original (não mudou de cor).", why: "Indicador químico sem viragem: o material não pode ser considerado estéril", no: ["A cor do indicador não importa", "Basta o pacote estar fechado"], explain: "O indicador mostra que o pacote passou pelo processo de esterilização. Sem viragem, o material deve voltar à central de material." }]),
      E("medproc", "Médico realizando a sutura", bPerson, [0.7, 0, -0.4], 2.6, { look: { gown: "#16a34a", cap: true, mask: "ok", gloves: true, goggles: true }, desc: "Médico com gorro, máscara, óculos de proteção e luvas estéreis." },
        [{ lvl: 2, look: { gown: "#16a34a", cap: true, mask: "ok", gloves: true }, desc: "Médico irrigando uma ferida com jato de soro, sem óculos nem protetor facial.", why: "Procedimentos com risco de respingo exigem proteção ocular", no: ["Óculos só são necessários em cirurgias grandes", "A máscara já protege os olhos"], explain: "Respingos de sangue e secreções nas mucosas oculares podem transmitir HIV e hepatites. Óculos ou protetor facial fazem parte da precaução padrão." }]),
      E("antis", "Frasco de antisséptico", (L) => grp(bCounter({ w: 0.8 }), bBottle({ text: L.text })), [-2.1, 0, -0.2], Math.PI / 2, { look: { text: ["CLOREXIDINA", "Aberto: 12/03"] }, desc: "Frasco de clorexidina identificado com a data de abertura." },
        [{ lvl: 2, look: { text: ["CLOREXIDINA", "sem data"] }, desc: "Frasco de antisséptico aberto sem data de abertura.", why: "Frascos multidose devem ter data de abertura e validade após abertos", no: ["Antisséptico não estraga", "A data só importa em medicamentos"], explain: "Após aberto, o antisséptico tem validade limitada e pode se contaminar. Sem data, não dá para saber se ainda está adequado." }]),
      E("termo", "Termo de consentimento", (L) => bDesk({ doc: L.doc }), [1.6, 0, 0.6], -Math.PI / 2, { look: { doc: ["TERMO DE", "CONSENTIMENTO", "Biópsia de pele", "", "Assinado: ✓ M.A.S."] }, desc: "Termo de consentimento da biópsia assinado pela paciente." },
        [{ lvl: 3, look: { doc: ["TERMO DE", "CONSENTIMENTO", "Biópsia de pele", "", "Assinatura: ______"] }, desc: "Biópsia eletiva prestes a começar com o termo de consentimento em branco.", why: "Procedimento eletivo exige consentimento informado e registrado", no: ["Consentimento verbal dispensa qualquer registro", "Só cirurgias grandes exigem termo"], explain: "O paciente tem direito a ser informado de riscos, benefícios e alternativas e a decidir. O consentimento deve ser documentado." }]),
      E("perfproc", "Caixa de perfurocortante", bSharps, [-0.4, 0.9, -2.3], 0, { look: { fill: 0.5 }, desc: "Caixa de perfurocortante dentro do limite, perto do local do procedimento." },
        [{ lvl: 1, look: { fill: 1.0, needleOut: true }, desc: "Caixa de perfurocortante transbordando, com agulhas para fora.", why: "Trocar a caixa ao atingir a linha de preenchimento", no: ["Pode apertar para caber mais", "Só troca no fim do mês"], explain: "Caixa acima do limite expõe a equipe a acidentes. A troca é feita na linha indicada." }]),
      E("gelp", "Dispensador de álcool", bGel, [0.8, 1.3, -2.45], 0, { look: { level: 0.8 }, desc: "Dispensador de álcool abastecido." }),
      E("pacproc", "Paciente", (L) => { const p = bLyingPatient({ band: true }); p.position.y = 0.98; return grp(p); }, [0, 0, -1.0], Math.PI / 2, { look: {}, desc: "Paciente identificada, deitada na maca para a biópsia." })
    ]
  }
];

// ---------- Jogo ----------
let EF = null;
function errBuildRun(scene, diff) {
  const nErr = { ini: 3, int: 4, adv: 5 }[diff];
  const maxLvl = { ini: 1, int: 2, adv: 3 }[diff];
  const cands = scene.objects.filter((o) => o.errs.some((e) => e.lvl <= maxLvl));
  let pick = shuffle(cands);
  if (diff === "adv") pick.sort((a, b) => Math.max(...b.errs.map((e) => e.lvl)) - Math.max(...a.errs.map((e) => e.lvl)) + (Math.random() - 0.5) * 1.5);
  pick = pick.slice(0, Math.min(nErr, pick.length));
  const run = {};
  scene.objects.forEach((o) => {
    if (pick.includes(o)) { const opts = o.errs.filter((e) => e.lvl <= maxLvl); run[o.id] = Object.assign({ err: true }, opts[Math.floor(Math.random() * opts.length)]); }
    else run[o.id] = Object.assign({ err: false }, o.ok);
  });
  return run;
}
async function errLaunch(sceneId, diff) {
  const scene = ERR_SCENES.find((s) => s.id === sceneId);
  const sim = labSim("err-" + sceneId);
  const run = errBuildRun(scene, diff);
  const n = Object.values(run).filter((r) => r.err).length;
  labBegin(sim, diff, { objective: `Encontre os ${n} erros do cenário.`, help: `<ul class="list"><li>Arraste para olhar em volta; use + e − para aproximar. Mude de posição com ◀ ▶.</li><li>Toque num objeto ou pessoa para inspecionar.</li><li>Se achar que há um erro, toque em “Há um erro aqui”. Marcar algo correto como erro tira pontos.</li>${diff === "adv" ? "<li>No avançado, você também precisa apontar qual é o problema.</li>" : ""}<li>A dica revela a área de um erro, mas custa 25 pontos.</li></ul>` });
  EF = { scene, diff, run, n, found: new Set(), wrong: [], score: 0, hints: 0, judged: new Set(), view: 0, classOk: 0 };
  EF.vitals = ERR_VITALS[scene.id] || null;
  const two = use2D();
  $app.innerHTML = labSceneShell({ title: `Encontre o erro · ${scene.n}`, objective: LABCTX.objective, progress: 0, score: 0, timer: diff === "adv" ? "down" : "up", left: 6 * MIN,
    viewInner: two ? "" : fpHudHtml({ vitals: EF.vitals, timerLabel: diff === "adv" ? "RESTANTE" : "TEMPO", objectives: [], metaLabel: "ERROS", meta: `0/${n}`, crosshair: true,
      tools: [{ k: "E", i: "🔍", n: "Inspecionar", run: "errCenter()" }, { k: "F", i: "💡", n: "Dica", run: "errHint()" }, { k: "Q", i: "🚶", n: "Posição", run: "errView(1)" }, { k: "R", i: "📋", n: "Relatório", run: "errFinishAsk()" }, { k: "Esc", i: "⏸", n: "Pausa", run: "labPause()" }] }),
    camExtra: `<button onclick="errView(-1)" aria-label="Posição anterior">◀</button><button onclick="errView(1)" aria-label="Próxima posição">▶</button>`, noCam: two });
  if (diff === "adv") { EF.endAt = Date.now() + 6 * MIN; LABCTX.onPause = () => (EF._pz = Date.now()); LABCTX.onResume = () => (EF.endAt += Date.now() - EF._pz); }
  LABT.push(setInterval(() => {
    if (!LABCTX || LABCTX.pausedAt) return;
    if (EF.endAt) { const left = EF.endAt - Date.now(); labTickHud(left); fpSet("fp-time", fmtTime(Math.max(0, left))); if (left <= 0) errEnd(true); } else { labTickHud(); fpSet("fp-time", fmtTime(labElapsed())); }
  }, 500));
  fpVitalsTick(EF.vitals);
  errIntro();
  const el = document.getElementById("lab-view");
  if (use2D()) return errBuild2D(el);
  await loadThree();
  const v0 = scene.views[0];
  const v = createViewer(el, { mode: "look", pos: v0.p, yaw: v0.y, pitch: v0.pt, fov: 62, bg: "#dfe6ec", env: "room", shadows: true, exposure: 0.85, bounds: [-2.6, 2.6, -1.9, 2.3],
    onKey: (k) => { if (!EF || (LABCTX && LABCTX.pausedAt)) return; if (k === "e") errCenter(); else if (k === "f") errHint(); else if (k === "q") errView(1); else if (k === "r") errFinishAsk(); } });
  LABV = v;
  roomShell(v, { floor: scene.floor, wall: scene.wall, wainscot: scene.wainscot, label: scene.n.toUpperCase(), window: scene.id !== "cc" });
  EF.hands = fpHands(v, { sleeve: "#2c6e8f" });
  if (scene.decor) scene.decor(v);
  EF.groups = {};
  scene.objects.forEach((o) => {
    const g = o.build(run[o.id].look || {});
    g.position.set(o.pos[0], o.pos[1], o.pos[2]); g.rotation.y = o.rot;
    v.add(g, o.id);
    EF.groups[o.id] = g;
  });
  v.scene.traverse((m) => { if (m.material && !m.material.isShaderMaterial && m.material.envMapIntensity !== undefined) m.material.envMapIntensity = 0.42; });
  v.onPick((h) => { if (h) { EF.hands && EF.hands.poke(); errInspect(h.id); } });
  errHud();
  v.onHover((id) => { Object.entries(EF.groups).forEach(([k, g]) => { if (!EF.found.has(k) && k !== EF.sel) setGlow(g, k === id ? 0x334155 : null, 0.6); }); v.refresh(); });
}
const ERR_VITALS = {
  cc: { hr: 72, sat: 99, pas: 118, pad: 72, fr: 12 }, enf: { hr: 84, sat: 96, pas: 128, pad: 82, fr: 18, t: "36,8" }, ps: { hr: 108, sat: 93, pas: 100, pad: 64, fr: 24, t: "38,1" },
  uti: { hr: 96, sat: 94, pas: 94, pad: 58, fr: 22, t: "37,4" }, cons: { hr: 78, sat: 98, pas: 124, pad: 80 }, proc: { hr: 76, sat: 98, pas: 122, pad: 78 }
};
function errCenter() { if (!EF || !LABV || !LABV.pickCenter) return; const h = LABV.pickCenter(); if (h) { EF.hands && EF.hands.poke(); errInspect(h.id); } else labFlash("Mire no objeto (círculo central) e aperte E, ou toque nele."); }
function errHud() {
  if (!EF) return;
  fpSet("fp-score", EF.score); fpSet("fp-meta", `${EF.found.size}/${EF.n}`);
  fpObjectives([[`Encontrar os ${EF.n} erros (${EF.found.size}/${EF.n})`, EF.found.size >= EF.n], [`Inspecionar 6 itens (${Math.min(6, EF.judged.size)}/6)`, EF.judged.size >= 6], ["Não marcar itens adequados como erro", EF.found.size >= EF.n && !EF.wrong.length], ["Usar no máximo 1 dica", EF.found.size >= EF.n && EF.hints <= 1]].concat(EF.diff !== "ini" ? [[`Identificar o problema (${EF.classOk})`, EF.classOk >= EF.n]] : []));
}
function errBuild2D(el) {
  el.innerHTML = `<div class="err2d">${EF.scene.objects.map((o) => `<button class="err2d-item" data-o="${o.id}" onclick="errInspect('${o.id}')"><b>${esc(o.n)}</b><small>Toque para inspecionar</small></button>`).join("")}</div>`;
}
function errView(d) {
  const vs = EF.scene.views;
  EF.view = (EF.view + d + vs.length) % vs.length;
  const v = vs[EF.view];
  if (LABV) LABV.moveTo(v.p, v.y, v.pt);
}
function errIntro() {
  setSide(`
    <div class="side-sec prompt-card"><span class="tag">${EF.scene.icon} ${esc(EF.scene.n)}</span><h3>${esc(EF.scene.ctx)}</h3>
      <p>Há <b>${EF.n} erros</b> neste ambiente. Explore e inspecione objetos e pessoas.</p></div>
    ${errStatus()}`);
}
function errStatus() {
  setTimeout(errHud, 0);
  return `<div class="side-sec"><small>Erros encontrados</small><div class="found-dots">${Array.from({ length: EF.n }, (_, i) => `<i class="${i < EF.found.size ? "on" : ""}"></i>`).join("")}</div>
    <small>Marcações erradas: ${EF.wrong.length} · Dicas: ${EF.hints}</small>
    <div class="row wrap"><button class="btn ghost small-btn" onclick="errHint()">💡 Dica (−25)</button><button class="btn accent small-btn" onclick="errFinishAsk()">Finalizar</button></div></div>
    ${EF.found.size ? `<div class="side-sec"><small>Encontrados</small>${[...EF.found].map((id) => `<p class="small">✅ ${esc(EF.scene.objects.find((o) => o.id === id).n)}</p>`).join("")}</div>` : ""}`;
}
function errInspect(id) {
  if (!EF || (LABCTX && LABCTX.pausedAt)) return;
  const o = EF.scene.objects.find((x) => x.id === id);
  const r = EF.run[id];
  if (EF.sel && EF.groups && EF.groups[EF.sel] && !EF.found.has(EF.sel)) setGlow(EF.groups[EF.sel], null);
  EF.sel = id;
  if (EF.groups && EF.groups[id] && !EF.found.has(id)) { setGlow(EF.groups[id], 0x0ea5e9, 0.5); LABV.refresh(); }
  sfx.flip();
  const done = EF.found.has(id);
  setSide(`
    <div class="side-sec info-card"><span class="tag">Inspecionando</span><h3>${esc(o.n)}</h3><p>${esc(r.desc)}</p>
      ${done ? `<p class="ok-txt">✅ Erro já encontrado.</p>` : EF.judged.has(id) ? `<p class="muted-txt">Você já avaliou este item.</p>` :
      `<div class="col"><button class="btn danger block" onclick="errFlag('${id}')">⚠️ Há um erro aqui</button><button class="btn ghost block" onclick="errOk('${id}')">✔ Está adequado</button></div>`}</div>
    ${errStatus()}`);
}
function errOk(id) { EF.judged.add(id); errIntro(); if (EF.groups && EF.groups[id]) { setGlow(EF.groups[id], null); LABV.refresh(); } }
function errFlag(id) {
  const r = EF.run[id];
  const o = EF.scene.objects.find((x) => x.id === id);
  if (!r.err) {
    EF.judged.add(id);
    EF.score = Math.max(0, EF.score - 40);
    EF.wrong.push({ title: `Marcou como erro: ${o.n}`, explain: `Estava adequado: ${r.desc}`, disc: EF.scene.disc });
    sfx.bad(); labFlash("❌ Isso está adequado. −40 pontos", false); setScore(EF.score);
    if (EF.groups && EF.groups[id]) { setGlow(EF.groups[id], 0xf43f5e); LABT.push(setTimeout(() => { setGlow(EF.groups[id], null); LABV.refresh(); }, 900)); }
    return errInspect(id);
  }
  if (EF.diff !== "ini") {
    const opts = shuffle([r.why, ...r.no.slice(0, EF.diff === "adv" ? 2 : 1)]);
    setSide(`<div class="side-sec info-card"><span class="tag">Qual é o problema?</span><h3>${esc(o.n)}</h3><p>${esc(r.desc)}</p>
      <div class="options">${opts.map((t, i) => `<button class="opt" data-i="${i}"><span>${esc(t)}</span></button>`).join("")}</div></div>`);
    document.querySelectorAll("#lab-side .opt").forEach((b) => (b.onclick = () => errConfirm(id, opts[+b.dataset.i] === r.why)));
    return;
  }
  errConfirm(id, true);
}
function errConfirm(id, classOk) {
  const r = EF.run[id];
  const o = EF.scene.objects.find((x) => x.id === id);
  EF.found.add(id); EF.judged.add(id);
  const pts = 100 + (EF.diff !== "ini" && classOk ? 50 : 0);
  EF.score += pts; if (classOk) EF.classOk++;
  S.lab.stats.errorsFound++; bumpWeek("errors");
  if (!classOk) EF.wrong.push({ title: `Problema mal identificado: ${o.n}`, explain: `${r.why}. ${r.explain}`, disc: EF.scene.disc, card: { f: `${EF.scene.n}: ${r.desc} Qual é o problema?`, b: `${r.why}. ${r.explain}` } });
  sfx.ok(); setScore(EF.score); setProgress(EF.found.size / EF.n);
  labFlash(`✅ Erro encontrado! +${pts}`, true);
  if (EF.groups && EF.groups[id]) { setGlow(EF.groups[id], 0x22c55e, 0.4); LABV.refresh(); }
  const b = document.querySelector(`.err2d-item[data-o="${id}"]`); if (b) b.classList.add("found");
  setSide(`<div class="side-sec info-card ok"><span class="tag">✅ Erro encontrado</span><h3>${esc(o.n)}</h3><p>${esc(r.desc)}</p>
    ${EF.diff !== "ini" ? `<p>${classOk ? "✔ Você identificou o problema corretamente." : "✖ O problema era outro:"} <b>${esc(r.why)}</b>.</p>` : `<p><b>${esc(r.why)}</b>.</p>`}
    <p class="muted-txt">${esc(r.explain)}</p></div>${errStatus()}`);
  if (EF.found.size >= EF.n) LABT.push(setTimeout(() => errEnd(false), 1500));
}
function errHint() {
  const left = EF.scene.objects.filter((o) => EF.run[o.id].err && !EF.found.has(o.id));
  if (!left.length) return;
  const o = left[Math.floor(Math.random() * left.length)];
  EF.hints++; EF.score = Math.max(0, EF.score - 25); setScore(EF.score);
  if (EF.groups && EF.groups[o.id]) {
    const g = EF.groups[o.id];
    const fn = (t) => { if (!EF || EF.found.has(o.id) || EF.sel === o.id) { setGlow(g, null); return false; } setGlow(g, 0xfacc15, 0.25 + 0.25 * Math.sin(t / 150)); };
    LABV.animate(fn);
    LABT.push(setTimeout(() => { if (LABV) { LABV.stopAnim(fn); if (EF && !EF.found.has(o.id)) setGlow(g, null); LABV.refresh(); } }, 6000));
  }
  labFlash(`💡 Observe: <b>${esc(o.n)}</b>`);
  errIntro();
}
function errFinishAsk() {
  if (EF.found.size >= EF.n) return errEnd(false);
  ask(`Você encontrou ${EF.found.size} de ${EF.n} erros. Finalizar mesmo assim?`, [{ label: "Finalizar", run: () => errEnd(false) }]);
}
function errEnd(timeout) {
  if (!EF || EF.ended) return;
  EF.ended = true;
  const missed = EF.scene.objects.filter((o) => EF.run[o.id].err && !EF.found.has(o.id)).map((o) => {
    const r = EF.run[o.id];
    return { title: `Erro não encontrado: ${o.n}`, explain: `${r.desc} ${r.why}. ${r.explain}`, disc: EF.scene.disc, card: { f: `${EF.scene.n}: ${r.desc} Qual é o problema?`, b: `${r.why}. ${r.explain}` } };
  });
  const good = EF.scene.objects.filter((o) => EF.found.has(o.id)).map((o) => ({ title: o.n, explain: `${EF.run[o.id].why}. ${EF.run[o.id].explain}` }));
  if (EF.found.size === EF.n && !EF.wrong.length) S.lab.stats.perfectScenes++;
  const max = EF.n * (EF.diff === "ini" ? 100 : 150);
  labFinish({ score: EF.score, max, correct: EF.found.size, total: EF.n, mistakes: missed.concat(EF.wrong), good, recs: [EF.scene.disc, "micro", "saude"].filter((x, i, a) => a.indexOf(x) === i),
    notes: [timeout ? "⏰ O tempo acabou." : "", EF.wrong.length ? `Você marcou ${EF.wrong.length} item(ns) adequado(s) como erro.` : "", EF.hints ? `Dicas usadas: ${EF.hints}.` : ""].filter(Boolean) });
  EF = null;
}

function errRegister(s) {
  labRegister({
  id: "err-" + s.id, mode: "error", disc: s.disc, icon: s.icon, title: `Encontre o erro: ${s.n}`, category: "Biossegurança e segurança do paciente",
  desc: `${s.ctx} Explore o ambiente em 3D, inspecione objetos e pessoas e encontre os erros. A cada partida, os erros mudam.`,
  objective: "Identificar falhas de biossegurança, organização, higiene e segurança do paciente.",
  diffs: { ini: "3 erros evidentes; basta encontrá-los.", int: "4 erros, incluindo os menos óbvios; é preciso apontar o problema.", adv: "5 erros, incluindo os sutis, com tempo limite; é preciso justificar entre 3 opções." },
  time: { ini: 4, int: 6, adv: 6 }, xp: { ini: 40, int: 60, adv: 90 },
  refs: ["NR-32 (Ministério do Trabalho)", "RDC ANVISA 222/2018 (resíduos)", "Protocolos de segurança do paciente (MS/ANVISA)", "OMS: higiene das mãos e cirurgia segura"],
  review: { status: "pendente" },
  launch: (d) => errLaunch(s.id, d),
  count: () => s.objects.length,
  data: () => ({ id: s.id, ambiente: s.n, contexto: s.ctx, objetos: s.objects.map((o) => ({ id: o.id, nome: o.n, correto: o.ok.desc, erros: o.errs.map((e) => ({ nivel: e.lvl, descricao: e.desc, problema: e.why, distratores: e.no, explicacao: e.explain })) })) }),
  validate: () => {
    const errs = [];
    if (s.objects.filter((o) => o.errs.some((e) => e.lvl === 1)).length < 3) errs.push("menos de 3 erros de nível 1");
    s.objects.forEach((o) => o.errs.forEach((e) => { if (!e.why || !e.explain || !e.no || e.no.length < 2) errs.push("erro incompleto em " + o.id); }));
    return errs;
  }
  });
}
ERR_SCENES.forEach(errRegister);

// Cenários importados pela área de conteúdo usam os construtores pelo nome.
const ERR_BUILDERS = { person: bPerson, bed: bBed, bin: bBin, sharps: bSharps, gel: bGel, sink: bSink, tray: bTray, iv: bIV, cart: bCart, o2: bO2, door: bDoor, wet: bWetFloor, fridge: bFridge, tubes: bTubes, centrifuge: bCentrifuge, hood: bHood, eyewash: bEyewash, desk: bDesk, exam: bExamTable, foley: bFoley };
function errValidateRaw(it) {
  const e = [];
  if (!it.id || !it.n || !it.ctx || !Array.isArray(it.objects)) e.push("faltam id, n (nome), ctx ou objects");
  (it.objects || []).forEach((o) => {
    if (!ERR_BUILDERS[o.build]) e.push(`objeto ${o.id}: build deve ser um de ${Object.keys(ERR_BUILDERS).join(", ")}`);
    if (!o.ok || !o.ok.desc) e.push(`objeto ${o.id}: falta ok.desc`);
    (o.errs || []).forEach((x) => { if (!x.desc || !x.why || !x.explain || !Array.isArray(x.no) || x.no.length < 2 || !x.lvl) e.push(`objeto ${o.id}: erro incompleto`); });
  });
  if ((it.objects || []).filter((o) => (o.errs || []).some((x) => x.lvl === 1)).length < 3) e.push("são necessários ao menos 3 objetos com erro de nível 1");
  return e;
}
LAB_IMPORTERS.error = {
  validate: errValidateRaw,
  add: (it) => {
    const sc = Object.assign({ icon: "🔎", disc: "clinica", wall: "#e2e8f0", floor: "#9ca3af", views: [{ p: [0, 1.6, 2.2], y: 0, pt: -0.25 }, { p: [-2, 1.6, 0.8], y: 0.8, pt: -0.25 }, { p: [2, 1.6, 0.8], y: -0.8, pt: -0.25 }] }, it);
    sc.objects = it.objects.map((o) => ({ id: o.id, n: o.n, build: ERR_BUILDERS[o.build], pos: o.pos || [0, 0, 0], rot: o.rot || 0, ok: o.ok, errs: o.errs || [] }));
    if (!ERR_SCENES.some((x) => x.id === sc.id)) ERR_SCENES.push(sc);
    errRegister(sc);
  }
};
