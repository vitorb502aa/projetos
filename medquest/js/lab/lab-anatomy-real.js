/* MedQuest Lab — modelos anatômicos 3D realistas, gerados por código.
   Cada função devolve um grupo Three.js com a forma da estrutura (mesmas coordenadas da lista ANAT). */
"use strict";

const RG = (...k) => { const g = new THREE.Group(); k.flat().forEach((x) => x && g.add(x)); return g; };
const both = (fn) => [fn(1), fn(-1)];
const curveAt = (pts, n) => { const c = new THREE.CatmullRomCurve3(pts.map(V3)); return Array.from({ length: n }, (_, i) => c.getPointAt(i / (n - 1))); };

// Ossos longos
const longBone = (pts, r, e1, e2) => mVarTube(pts, boneR(r, e1, e2), "#e9dfc7", { preset: "bone", radial: 16 });
// Músculo fusiforme com tendões claros nas pontas
function fusiMuscle(pts, r, o = {}) {
  const m = mVarTube(pts, fusiR(r, o.bias || 0.5), "#c25a4f", { material: MAT.muscle(o.c || "#c25a4f"), radial: 18, flat: o.flat, uvRep: 1 });
  return m;
}
function sheetMuscle(p, s, r, o = {}) { return mEll(p, s, "#c25a4f", { material: MAT.muscle(o.c), r, organic: 0.035, freq: 2.4, seed: o.seed || 2, seg: 36 }); }

const REAL3D = {
  // ---------- Esqueleto ----------
  cranio: () => {
    const cr = mEll([0, 1.655, -0.006], [0.088, 0.096, 0.104], null, { material: MAT.bone(), organic: 0.025, freq: 2, seed: 3, seg: 48 });
    const face = mEll([0, 1.598, 0.052], [0.063, 0.058, 0.052], null, { material: MAT.bone(), organic: 0.04, freq: 3, seed: 5 });
    const dark = (p, s) => mEll(p, s, "#2a1d14", { rough: 0.9 });
    const zyg = both((k) => mVarTube([[k * 0.07, 1.6, 0.03], [k * 0.08, 1.595, -0.01], [k * 0.072, 1.59, -0.04]], (t) => 0.007 * (1 - Math.abs(t - 0.5)), null, { material: MAT.bone() }));
    const teeth = mTube([[-0.032, 1.556, 0.06], [0, 1.552, 0.095], [0.032, 1.556, 0.06]], 0.0065, "#f8f4ea", { rough: 0.25, clearcoat: 0.6 });
    return RG(cr, face, ...zyg, teeth, dark([0.031, 1.622, 0.09], [0.019, 0.016, 0.012]), dark([-0.031, 1.622, 0.09], [0.019, 0.016, 0.012]), dark([0, 1.588, 0.103], [0.011, 0.017, 0.006]));
  },
  mandibula: () => RG(
    mVarTube([[-0.05, 1.6, -0.012], [-0.052, 1.545, 0.0], [-0.042, 1.512, 0.048], [0, 1.5, 0.083], [0.042, 1.512, 0.048], [0.052, 1.545, 0.0], [0.05, 1.6, -0.012]], (t) => 0.0095 * Math.min(1, Math.sqrt(Math.min(t, 1 - t) / 0.03)), null, { material: MAT.bone(), flat: [0.7, 1.5] }),
    mTube([[-0.03, 1.528, 0.062], [0, 1.523, 0.088], [0.03, 1.528, 0.062]], 0.006, "#f8f4ea", { rough: 0.25, clearcoat: 0.6 })),
  coluna: () => {
    const g = new THREE.Group(), pts = curveAt(SPINE, 26), mb = MAT.bone(), disc = mkMat("#cfd8dc", { rough: 0.5, clearcoat: 0.4 });
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], s = 0.75 + (i / pts.length) * 0.55, dir = b.clone().sub(a);
      const body = mCyl(a.toArray(), a.clone().add(dir.clone().multiplyScalar(0.72)).toArray(), 0.0145 * s, null, { material: mb });
      const d = mCyl(a.clone().add(dir.clone().multiplyScalar(0.72)).toArray(), b.toArray(), 0.0135 * s, null, { material: disc });
      const sp = mBox([a.x, a.y - 0.004, a.z - 0.024 * s], [0.006, 0.014 * s, 0.026 * s], null, { material: mb, round: 0.002, r: [0.5, 0, 0] });
      const tr = mBox([a.x, a.y, a.z - 0.01], [0.05 * s, 0.006, 0.008], null, { material: mb, round: 0.002 });
      g.add(body, d, sp, tr);
    }
    return g;
  },
  costelas: () => {
    const g = new THREE.Group(), mb = MAT.bone(), cart = mkMat("#dfe8ec", { rough: 0.35, clearcoat: 0.5 });
    ANAT.find((a) => a.id === "costelas").parts.forEach((p, i) => {
      const pts = p[1], isTrue = Math.floor(i / 2) < 7;
      g.add(mVarTube(pts.slice(0, 4), () => 0.0058, null, { material: mb, flat: [1, 0.5], radial: 10 }));
      if (isTrue) g.add(mVarTube(pts.slice(3), () => 0.0045, null, { material: cart, flat: [1, 0.55], radial: 8 }));
    });
    return g;
  },
  esterno: () => RG(mBox([0, 1.33, 0.104], [0.04, 0.05, 0.014], null, { material: MAT.bone(), round: 0.006 }), mBox([0, 1.25, 0.106], [0.03, 0.12, 0.012], null, { material: MAT.bone(), round: 0.005 }), mEll([0, 1.18, 0.105], [0.008, 0.016, 0.005], null, { material: MAT.bone() })),
  clavicula: () => RG(both((k) => mVarTube([[k * 0.015, 1.415, 0.085], [k * 0.06, 1.42, 0.07], [k * 0.12, 1.43, 0.04], [k * 0.165, 1.435, 0.0]], boneR(0.0075, 1.4, 1.5), null, { material: MAT.bone() }))),
  escapula: () => RG(both((k) => { const m = mEll([k * 0.115, 1.33, -0.088], [0.055, 0.078, 0.01], null, { material: MAT.bone(), r: [0, 0, k * 0.15], organic: 0.06, freq: 2, seed: 7 }); return m; })),
  umero: () => RG(both((k) => RG(longBone([[k * 0.19, 1.39, -0.005], [k * 0.205, 1.25, -0.006], [k * 0.235, 1.09, -0.005]], 0.0115, 2.1, 1.9), mEll([k * 0.188, 1.392, -0.004], [0.021, 0.021, 0.021], null, { material: MAT.bone() })))),
  radioulna: () => RG(both((k) => RG(longBone([[k * 0.235, 1.075, 0.005], [k * 0.255, 0.95, 0.02], [k * 0.27, 0.83, 0.03]], 0.0068, 1.4, 1.9), longBone([[k * 0.245, 1.085, -0.015], [k * 0.265, 0.95, -0.012], [k * 0.28, 0.83, -0.01]], 0.0062, 2.0, 1.3)))),
  mao: () => RG(both((k) => {
    const palm = mBox([k * 0.29, 0.775, 0.012], [0.045, 0.05, 0.012], null, { material: MAT.bone(), round: 0.005, r: [0, 0, k * 0.08] });
    const fingers = [-0.016, -0.005, 0.006, 0.017].map((dx, i) => mVarTube([[k * (0.29 + dx), 0.75, 0.014], [k * (0.292 + dx * 1.1), 0.715 - i * 0.002, 0.016], [k * (0.294 + dx * 1.2), 0.685 + Math.abs(dx) * 0.6, 0.018]], boneR(0.0035, 1.3, 1.2), null, { material: MAT.bone(), radial: 8 }));
    const thumb = mVarTube([[k * 0.272, 0.775, 0.02], [k * 0.262, 0.75, 0.03], [k * 0.258, 0.725, 0.034]], boneR(0.004, 1.3, 1.2), null, { material: MAT.bone(), radial: 8 });
    return RG(palm, ...fingers, thumb);
  })),
  pelve: () => {
    const mb = MAT.bone();
    const wing = (k) => mEll([k * 0.092, 0.965, -0.012], [0.07, 0.068, 0.018], null, { material: mb, r: [0.15, k * 0.65, k * 0.1], organic: 0.08, freq: 2.2, seed: 9 + k });
    const sacrum = mEll([0, 0.925, -0.075], [0.038, 0.06, 0.018], null, { material: mb, r: [0.35, 0, 0], organic: 0.05 });
    const arch = mVarTube([[0.085, 0.905, 0.01], [0.06, 0.87, 0.055], [0.0, 0.858, 0.072], [-0.06, 0.87, 0.055], [-0.085, 0.905, 0.01]], () => 0.009, null, { material: mb, radial: 12 });
    const acet = both((k) => mTorus([k * 0.08, 0.91, 0.0], 0.02, 0.006, null, { material: mb, r: [0, k * 1.3, 0] }));
    return RG(wing(1), wing(-1), sacrum, arch, ...acet);
  },
  femur: () => RG(both((k) => RG(
    longBone([[k * 0.082, 0.905, 0.0], [k * 0.105, 0.88, 0.0], [k * 0.1, 0.78, 0.008], [k * 0.104, 0.62, 0.014], [k * 0.105, 0.505, 0.0]], 0.0135, 1.8, 2.3),
    mEll([k * 0.076, 0.912, 0.0], [0.022, 0.022, 0.022], null, { material: MAT.bone() })))),
  patela: () => RG(both((k) => mEll([k * 0.107, 0.487, 0.052], [0.021, 0.025, 0.01], null, { material: MAT.bone(), organic: 0.08 }))),
  tibia: () => RG(both((k) => RG(longBone([[k * 0.105, 0.47, 0.005], [k * 0.102, 0.3, 0.006], [k * 0.1, 0.085, 0.0]], 0.0115, 2.0, 1.6), longBone([[k * 0.135, 0.46, -0.012], [k * 0.133, 0.27, -0.012], [k * 0.13, 0.08, -0.008]], 0.0048, 1.6, 1.8)))),
  pe: () => RG(both((k) => RG(mBox([k * 0.11, 0.04, 0.0], [0.05, 0.035, 0.07], null, { material: MAT.bone(), round: 0.012 }),
    ...[-0.016, -0.008, 0, 0.008, 0.016].map((dx) => mVarTube([[k * (0.11 + dx), 0.03, 0.03], [k * (0.11 + dx * 1.2), 0.022, 0.08], [k * (0.11 + dx * 1.3), 0.018, 0.105]], boneR(0.0038, 1.3, 1.2), null, { material: MAT.bone(), radial: 8 }))))),

  // ---------- Músculos ----------
  deltoide: () => RG(both((k) => sheetMuscle([k * 0.205, 1.36, 0.0], [0.045, 0.068, 0.05], [0, 0, k * -0.2], { seed: 11 }))),
  peitoral: () => RG(both((k) => sheetMuscle([k * 0.075, 1.29, 0.095], [0.088, 0.062, 0.022], [0, 0, k * -0.25], { seed: 12 }))),
  reto_abd: () => {
    const g = new THREE.Group();
    [1.155, 1.1, 1.045, 0.985].forEach((y, i) => both((k) => g.add(sheetMuscle([k * 0.027, y, 0.108 - i * 0.0015], [0.024, 0.027, 0.012], null, { seed: 20 + i }))));
    g.add(mBox([0, 1.07, 0.112], [0.006, 0.26, 0.004], null, { material: mkMat("#efe7da", { rough: 0.5, map: TEXTURES.tendon([1, 2]) }) }));
    return g;
  },
  obliquo: () => RG(both((k) => sheetMuscle([k * 0.115, 1.06, 0.07], [0.04, 0.1, 0.04], [0, 0, k * 0.2], { seed: 30 }))),
  biceps: () => RG(both((k) => fusiMuscle([[k * 0.205, 1.34, 0.025], [k * 0.222, 1.23, 0.04], [k * 0.235, 1.09, 0.028]], 0.024, { bias: 0.55 }))),
  triceps: () => RG(both((k) => fusiMuscle([[k * 0.2, 1.36, -0.03], [k * 0.225, 1.23, -0.042], [k * 0.24, 1.1, -0.025]], 0.026, { bias: 0.4 }))),
  trapezio: () => sheetMuscle([0, 1.39, -0.075], [0.15, 0.07, 0.024], null, { seed: 40 }),
  ecm: () => RG(both((k) => fusiMuscle([[k * 0.055, 1.56, -0.01], [k * 0.04, 1.48, 0.04], [k * 0.02, 1.405, 0.085]], 0.011))),
  gluteo: () => RG(both((k) => sheetMuscle([k * 0.085, 0.9, -0.085], [0.07, 0.072, 0.04], null, { seed: 50 }))),
  quadriceps: () => RG(both((k) => RG(fusiMuscle([[k * 0.095, 0.87, 0.04], [k * 0.105, 0.7, 0.062], [k * 0.107, 0.51, 0.05]], 0.034, { bias: 0.45 }), fusiMuscle([[k * 0.125, 0.84, 0.02], [k * 0.13, 0.68, 0.035], [k * 0.118, 0.52, 0.035]], 0.03, { bias: 0.55 })))),
  isquio: () => RG(both((k) => fusiMuscle([[k * 0.095, 0.86, -0.05], [k * 0.105, 0.7, -0.06], [k * 0.11, 0.5, -0.04]], 0.035, { bias: 0.4 }))),
  gastrocnemio: () => RG(both((k) => fusiMuscle([[k * 0.11, 0.46, -0.03], [k * 0.112, 0.34, -0.05], [k * 0.105, 0.14, -0.03]], 0.035, { bias: 0.3 }))),
  diafragma: () => { const geo = new THREE.SphereGeometry(1, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2); const m = new THREE.Mesh(geo, MAT.muscle("#b8584c")); m.position.set(0, 1.1, 0); m.scale.set(0.15, 0.05, 0.095); return RG(m); },

  // ---------- Cardiovascular ----------
  coracao: () => {
    const geo = new THREE.SphereGeometry(1, 48, 32);
    deformGeo(geo, (v) => { if (v.y < 0) { const f = 1 + v.y * 0.55; v.x *= f; v.z *= f; v.y *= 1.15; } else { v.x *= 1.05; } v.x += 0.12 * Math.max(0, v.y); });
    organicGeo(geo, 0.03, 3, 2);
    const heart = new THREE.Mesh(geo, MAT.organ("#a3261f", { clearcoat: 0.8 }));
    heart.scale.set(0.05, 0.06, 0.045);
    const g = RG(heart);
    const aur = (x, y, z) => mEll([x, y, z], [0.016, 0.012, 0.014], null, { material: MAT.organ("#8f1f1a"), organic: 0.1 });
    const cor = mkMat("#d23a2b", { rough: 0.3, clearcoat: 0.8 }), fat = mkMat("#e9c97a", { rough: 0.5, clearcoat: 0.4 });
    g.add(aur(0.034, 0.038, 0.02), aur(-0.032, 0.035, 0.022));
    g.add(mTube([[0.0, 0.035, 0.04], [0.008, 0.0, 0.047], [0.01, -0.035, 0.04], [0.014, -0.058, 0.02]], 0.0022, null, { material: cor }));
    g.add(mTube([[0.0, 0.035, 0.04], [-0.03, 0.02, 0.035], [-0.045, -0.01, 0.01]], 0.0019, null, { material: cor }));
    g.add(mTube([[-0.005, 0.03, 0.043], [0.004, -0.005, 0.05], [0.008, -0.04, 0.042]], 0.0038, null, { material: fat }));
    g.position.set(0.025, 1.235, 0.045); g.rotation.set(0.25, 0.15, -0.5);
    return g;
  },
  aorta: () => mVarTube(ANAT.find((a) => a.id === "aorta").parts[0][1], (t) => 0.0125 - t * 0.004, null, { material: MAT.vessel("#c9302c") }),
  pulmonar: () => RG(ANAT.find((a) => a.id === "pulmonar").parts.map((p) => mVarTube(p[1], (t) => p[2] * (1 - t * 0.2), null, { material: MAT.vessel("#3d66c9") }))),
  cavas: () => RG(ANAT.find((a) => a.id === "cavas").parts.map((p) => mVarTube(p[1], () => p[2], null, { material: MAT.vessel("#3254b8") }))),
  carotidas: () => RG(ANAT.find((a) => a.id === "carotidas").parts.map((p) => mVarTube(p[1], (t) => p[2] * (1 - t * 0.25), null, { material: MAT.vessel("#c9302c") }))),
  subclavias: () => RG(ANAT.find((a) => a.id === "subclavias").parts.map((p) => mVarTube(p[1], (t) => p[2] * (1 - t * 0.35), null, { material: MAT.vessel("#c9302c") }))),
  femorais: () => RG(ANAT.find((a) => a.id === "femorais").parts.map((p) => mVarTube(p[1], (t) => p[2] * (1 - t * 0.35), null, { material: MAT.vessel("#c9302c") }))),

  // ---------- Respiratório ----------
  pulmao_d: () => lung(-1), pulmao_e: () => lung(1),
  traqueia: () => {
    const g = RG(mCyl([0, 1.475, 0.045], [0, 1.33, 0.03], 0.0105, null, { material: mkMat("#e9d6d0", { rough: 0.4, clearcoat: 0.5 }) }));
    for (let i = 0; i < 12; i++) { const y = 1.47 - i * 0.012, z = 0.045 - i * 0.00125; g.add(mTorus([0, y, z], 0.011, 0.0022, null, { material: mkMat("#f1e6e1", { rough: 0.35, clearcoat: 0.5 }), r: [Math.PI / 2 + 0.08, 0, 0] })); }
    return g;
  },
  bronquios: () => RG(ANAT.find((a) => a.id === "bronquios").parts.map((p) => mVarTube(p[1], (t) => p[2] * (1 - t * 0.3), null, { material: mkMat("#ead5cf", { rough: 0.4, clearcoat: 0.5 }) }))),
  laringe: () => RG(both((k) => mBox([k * 0.009, 1.497, 0.054], [0.016, 0.03, 0.004], null, { material: mkMat("#e9d6d0", { rough: 0.35, clearcoat: 0.5 }), round: 0.002, r: [0, k * 0.55, 0] })), mTorus([0, 1.478, 0.046], 0.011, 0.003, null, { material: mkMat("#e9d6d0", { clearcoat: 0.5 }), r: [Math.PI / 2, 0, 0] })),

  // ---------- Digestório ----------
  esofago: () => mVarTube(ANAT.find((a) => a.id === "esofago").parts[0][1], () => 0.0075, null, { material: MAT.organ("#cf7d68") }),
  estomago: () => mVarTube([[0.012, 1.13, 0.01], [0.045, 1.115, 0.035], [0.09, 1.095, 0.045], [0.105, 1.06, 0.045], [0.085, 1.03, 0.05], [0.045, 1.022, 0.052], [0.012, 1.04, 0.045]], (t) => (0.008 + 0.034 * Math.sin(Math.PI * Math.pow(t, 0.65))) * Math.min(1, Math.sqrt(Math.min(t, 1 - t) / 0.03)), null, { material: MAT.organ("#e3967a"), radial: 22 }),
  figado: () => {
    const geo = new THREE.SphereGeometry(1, 48, 32);
    deformGeo(geo, (v) => { const l = Math.max(0, v.x); v.y *= 1 - 0.55 * l; v.z *= 1 - 0.35 * l; if (v.y < 0) v.y *= 0.55; v.x *= 1.05; });
    organicGeo(geo, 0.025, 2.5, 4);
    const m = new THREE.Mesh(geo, MAT.organ("#7a2a1e", { clearcoat: 0.9, ccRough: 0.15 }));
    m.position.set(-0.06, 1.105, 0.035); m.scale.set(0.115, 0.06, 0.072); m.rotation.set(0.1, 0.0, 0.12);
    return RG(m);
  },
  vesicula: () => mVarTube([[-0.052, 1.075, 0.085], [-0.055, 1.055, 0.097], [-0.058, 1.035, 0.1]], (t) => 0.004 + 0.011 * Math.sin(Math.PI * Math.pow(t, 0.7)), null, { material: MAT.organ("#4f7f2e", { clearcoat: 0.9 }) }),
  pancreas: () => { const m = mVarTube([[-0.025, 1.0, 0.015], [0.01, 1.03, -0.002], [0.05, 1.04, -0.01], [0.095, 1.05, -0.025]], (t) => 0.016 - t * 0.008, null, { material: MAT.organ("#e5bf7f", { clearcoat: 0.4 }), radial: 16 }); organicGeo(m.geometry, 0.004, 120, 5); return m; },
  duodeno: () => mVarTube(ANAT.find((a) => a.id === "duodeno").parts[0][1], () => 0.0115, null, { material: MAT.organ("#e09a7a") }),
  delgado: () => mVarTube(ANAT.find((a) => a.id === "delgado").parts[0][1], (t) => 0.0105 * (1 + 0.08 * Math.sin(t * 300)), null, { material: MAT.organ("#e7ad90"), tub: 520, radial: 12 }),
  grosso: () => mVarTube(ANAT.find((a) => a.id === "grosso").parts[0][1], (t) => 0.0175 * (1 + 0.16 * Math.sin(t * 95)) * (t > 0.85 ? 0.85 : 1), null, { material: MAT.organ("#cf9173"), tub: 360, radial: 18 }),
  apendice: () => mVarTube(ANAT.find((a) => a.id === "apendice").parts[0][1], (t) => 0.0048 * (1 - t * 0.3), null, { material: MAT.organ("#c98466") }),

  // ---------- Nervoso ----------
  encefalo: () => {
    const geo = new THREE.SphereGeometry(1, 96, 64);
    deformGeo(geo, (v) => {
      const sul = 1 - Math.abs(noise3(v.x * 5.2 + 3, v.y * 5.2, v.z * 5.2));
      let r = 1 + 0.06 * Math.pow(sul, 3);
      const mid = Math.exp(-((v.x / 0.06) ** 2)) * Math.max(0, v.y + 0.3);
      r -= 0.12 * mid;
      if (v.y < -0.2) r -= 0.08 * (-v.y - 0.2);
      v.multiplyScalar(r);
    });
    const m = new THREE.Mesh(geo, MAT.organ("#e2b2aa", { clearcoat: 0.55, map: null, bump: null }));
    m.position.set(0, 1.648, 0.005); m.scale.set(0.08, 0.072, 0.092);
    return RG(m);
  },
  cerebelo: () => { const geo = new THREE.SphereGeometry(1, 64, 40); deformGeo(geo, (v) => v.multiplyScalar(1 + 0.04 * Math.sin(v.y * 34))); const m = new THREE.Mesh(geo, MAT.organ("#d49890", { map: null })); m.position.set(0, 1.585, -0.06); m.scale.set(0.046, 0.026, 0.036); return RG(m); },
  tronco_enc: () => mVarTube([[0, 1.61, -0.018], [0, 1.57, -0.025], [0, 1.53, -0.03]], (t) => 0.013 - t * 0.004, null, { material: MAT.organ("#dca39b", { map: null }) }),
  medula: () => mVarTube(ANAT.find((a) => a.id === "medula").parts[0][1], () => 0.0055, null, { material: MAT.nerve("#f0e0b0") }),
  isquiatico: () => RG(ANAT.find((a) => a.id === "isquiatico").parts.map((p) => mVarTube(p[1], () => p[2], null, { material: MAT.nerve() }))),
  nervos_ms: () => RG(ANAT.find((a) => a.id === "nervos_ms").parts.map((p) => mVarTube(p[1], () => p[2], null, { material: MAT.nerve() }))),

  // ---------- Urinário ----------
  rins: () => RG(kidney(-1, 1.005), kidney(1, 1.025)),
  ureteres: () => RG(ANAT.find((a) => a.id === "ureteres").parts.map((p) => mVarTube(p[1], () => 0.0032, null, { material: MAT.organ("#d7a57e", { map: null }) }))),
  bexiga: () => mEll([0, 0.848, 0.055], [0.038, 0.032, 0.032], null, { material: MAT.organ("#d9b06a", { clearcoat: 0.7 }), organic: 0.05 }),

  // ---------- Endócrino, linfático e reprodutor ----------
  tireoide: () => RG(both((k) => mEll([k * 0.017, 1.446, 0.056], [0.012, 0.021, 0.009], null, { material: MAT.organ("#a8403a", { clearcoat: 0.7 }), organic: 0.06 })), mBox([0, 1.437, 0.063], [0.02, 0.007, 0.005], null, { material: MAT.organ("#a8403a"), round: 0.0025 })),
  suprarrenais: () => RG([[-0.065, 1.058], [0.065, 1.078]].map(([x, y]) => { const m = new THREE.Mesh(new THREE.ConeGeometry(0.017, 0.022, 12), MAT.organ("#d9a441")); m.position.set(x, y, -0.05); return m; })),
  hipofise: () => mEll([0, 1.615, 0.025], [0.008, 0.007, 0.008], null, { material: MAT.organ("#c98a8a") }),
  baco: () => { const m = mEll([0.13, 1.095, -0.03], [0.03, 0.05, 0.024], null, { material: MAT.organ("#6a2340", { clearcoat: 0.85 }), r: [0, 0, -0.3], organic: 0.05 }); return RG(m); },
  timo: () => RG(both((k) => mEll([k * 0.011, 1.335, 0.075], [0.014, 0.03, 0.01], null, { material: MAT.organ("#d9a5a0"), organic: 0.08 }))),
  utero: () => { const geo = new THREE.SphereGeometry(1, 40, 28); deformGeo(geo, (v) => { if (v.y < 0) { const f = 1 + v.y * 0.5; v.x *= f; v.z *= f; } }); const m = new THREE.Mesh(geo, MAT.organ("#c97f8a")); m.position.set(0, 0.875, 0.02); m.scale.set(0.028, 0.036, 0.022); m.rotation.x = 0.4; return RG(m); }
};
function lung(k) {
  // k = +1 pulmão esquerdo (x > 0), −1 direito
  const geo = new THREE.SphereGeometry(1, 64, 48);
  deformGeo(geo, (v) => {
    if (v.y > 0.25) { const f = 1 - (v.y - 0.25) * 0.6; v.x *= f; v.z *= f; }
    const med = -k * v.x;
    if (med > 0.15) v.x = -k * (0.15 + (med - 0.15) * 0.3);
    if (v.y < -0.55) v.y += 0.35 * Math.max(0, 1 - v.x * v.x - v.z * v.z) * (-v.y - 0.55);
    if (k > 0 && v.z > 0.2 && v.y < 0.1 && -v.x > 0) { v.x *= 0.6; }
  });
  organicGeo(geo, 0.015, 3, k + 6);
  const m = new THREE.Mesh(geo, MAT.organ("#e09aa2", { clearcoat: 0.45, ccRough: 0.4 }));
  const c = k > 0 ? [0.085, 1.235, 0.01] : [-0.08, 1.24, 0.015];
  m.position.set(...c); m.scale.set(k > 0 ? 0.062 : 0.067, k > 0 ? 0.118 : 0.122, 0.072);
  const fiss = mkMat("#9b5a63", { rough: 0.6 });
  const g = RG(m, mTube([[c[0] - k * 0.05, c[1] + 0.07, c[2] + 0.04], [c[0], c[1] - 0.01, c[2] + 0.07], [c[0] + k * 0.03, c[1] - 0.08, c[2] + 0.05]], 0.0012, null, { material: fiss }));
  if (k < 0) g.add(mTube([[c[0] - 0.06, c[1] + 0.005, c[2] + 0.045], [c[0] - 0.01, c[1] + 0.0, c[2] + 0.072]], 0.0012, null, { material: fiss }));
  return g;
}
function kidney(k, y) {
  const geo = new THREE.SphereGeometry(1, 40, 30);
  deformGeo(geo, (v) => { v.x += k * 0.25 * (v.y * v.y); if (-k * v.x > 0.55) v.x = -k * (0.55 + (-k * v.x - 0.55) * 0.3); });
  organicGeo(geo, 0.03, 3, 8);
  const m = new THREE.Mesh(geo, MAT.organ("#8a3322", { clearcoat: 0.85, ccRough: 0.2 }));
  m.position.set(k * 0.065, y, -0.05); m.scale.set(0.026, 0.048, 0.022); m.rotation.z = k * 0.2;
  return m;
}
// Corpo translúcido (pele) com brilho de borda
function skinBody() {
  const mat = fresnelMat("#7fd6ff", 2.4, 0.55);
  const tube = (pts, rfn) => new THREE.Mesh(varTubeGeo(pts, rfn, { radial: 28 }), mat);
  const g = RG(
    new THREE.Mesh(new THREE.SphereGeometry(1, 40, 30).scale(0.1, 0.125, 0.115).translate(0, 1.625, 0), mat),
    tube([[0, 1.44, -0.01], [0, 1.54, 0.0]], () => 0.05),
    tube([[0, 1.43, 0], [0, 1.3, 0.0], [0, 1.12, 0.0], [0, 0.95, 0], [0, 0.84, 0]], (t) => (0.12 + 0.065 * Math.sin(Math.PI * Math.min(1, t * 1.2)) - 0.02 * Math.exp(-(((t - 0.62) / 0.1) ** 2))) * Math.min(1, Math.sqrt(Math.min(t, 1 - t) / 0.04)) + 0.05),
    ...[1, -1].map((k) => tube([[k * 0.18, 1.41, 0], [k * 0.225, 1.25, 0], [k * 0.245, 1.06, 0.005], [k * 0.27, 0.9, 0.012], [k * 0.29, 0.72, 0.015]], (t) => (0.045 - t * 0.022) * Math.min(1, Math.sqrt(Math.min(t, 1 - t) / 0.03)))),
    ...[1, -1].map((k) => tube([[k * 0.09, 0.93, 0], [k * 0.105, 0.7, 0.01], [k * 0.11, 0.48, 0.01], [k * 0.112, 0.25, -0.01], [k * 0.11, 0.06, 0.0]], (t) => (0.075 - t * 0.04 + 0.01 * Math.exp(-(((t - 0.55) / 0.08) ** 2))) * Math.min(1, Math.sqrt(Math.min(t, 1 - t) / 0.03))))
  );
  g.renderOrder = 10;
  g.userData.noShadow = true;
  return g;
}
function anatRealGroup(a) {
  const f = REAL3D[a.id];
  if (f) { try { return f(); } catch (e) { console.warn("modelo", a.id, e); } }
  // Estruturas sem modelo específico: partes genéricas com material do sistema
  const g = new THREE.Group(), sys = a.sys[0], col = a.color || ANAT_SYS[sys].c;
  const mat = sys === "esqueletico" ? MAT.bone() : sys === "muscular" ? MAT.muscle() : sys === "nervoso" ? MAT.nerve() : sys === "cardiovascular" ? MAT.vessel(col) : MAT.organ(col);
  a.parts.forEach((p) => {
    if (p[0] === "e") g.add(mEll(p[1], p[2], null, { material: mat, r: p[3], organic: 0.04 }));
    else if (p[0] === "b") g.add(mBox(p[1], p[2], null, { material: mat, r: p[3], round: Math.min(...p[2]) * 0.3 }));
    else if (p[0] === "c") g.add(mCyl(p[1], p[2], p[3], null, { material: mat }));
    else g.add(mVarTube(p[1], () => p[2], null, { material: mat }));
  });
  return g;
}
