/* MedQuest Lab — motor 3D.
   Three.js (r128, UMD) carregado sob demanda. Renderização com iluminação de estúdio (mapa de ambiente
   gerado), tons de cinema (ACES), sombras suaves, texturas procedurais e geometrias orgânicas.
   Controles: órbita (modelos) e primeira pessoa (salas), com arraste, pinça, roda, teclado (WASD) e joystick. */
"use strict";

const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
let LABV = null;
let LABT = [];

async function loadThree() {
  if (window.THREE) return window.THREE;
  await loadScript(THREE_URL);
  return window.THREE;
}
function webglOK() {
  try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); }
  catch (e) { return false; }
}
const use2D = () => !!(S.lab && S.lab.force2d) || !webglOK();
function labCleanup() {
  if (LABV) { try { LABV.dispose(); } catch (e) {} LABV = null; }
  LABT.forEach((t) => { clearTimeout(t); clearInterval(t); });
  LABT = [];
  document.body.classList.remove("lab-full");
}

// ---------- Ruído e texturas procedurais ----------
function hash3(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); }
function noise3(x, y, z) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x - ix, fy = y - iy, fz = z - iz;
  const sm = (t) => t * t * (3 - 2 * t), u = sm(fx), v = sm(fy), w = sm(fz);
  const L = (a, b, t) => a + (b - a) * t;
  const c = (dx, dy, dz) => hash3(ix + dx, iy + dy, iz + dz);
  return L(L(L(c(0, 0, 0), c(1, 0, 0), u), L(c(0, 1, 0), c(1, 1, 0), u), v), L(L(c(0, 0, 1), c(1, 0, 1), u), L(c(0, 1, 1), c(1, 1, 1), u), v), w) * 2 - 1;
}
const fbm = (x, y, z, o = 3) => { let a = 0, f = 1, amp = 0.5; for (let i = 0; i < o; i++) { a += amp * noise3(x * f, y * f, z * f); f *= 2.03; amp *= 0.5; } return a; };
const TEX = {};
function canvasTex(key, w, h, draw, rep = [1, 1]) {
  const k = key + rep.join("x");
  if (TEX[k]) return TEX[k];
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]);
  t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
  return (TEX[k] = t);
}
function speckle(g, w, h, n, colors, size = 2) { for (let i = 0; i < n; i++) { g.fillStyle = colors[i % colors.length]; g.globalAlpha = 0.05 + Math.random() * 0.12; const s = Math.random() * size + 0.5; g.fillRect(Math.random() * w, Math.random() * h, s, s); } g.globalAlpha = 1; }
const TEXTURES = {
  muscle: (rep) => canvasTex("muscle", 256, 256, (g, w, h) => {
    g.fillStyle = "#9e3a32"; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 2) { const v = 0.75 + Math.random() * 0.4; g.fillStyle = `rgba(${200 * v | 0},${70 * v | 0},${60 * v | 0},0.55)`; g.fillRect(x, 0, 1.3, h); }
    for (let i = 0; i < 40; i++) { g.fillStyle = "rgba(255,220,210,0.08)"; g.fillRect(Math.random() * w, 0, 1, h); }
    speckle(g, w, h, 900, ["#5a1a16", "#d0705f"], 2);
  }, rep),
  tendon: (rep) => canvasTex("tendon", 128, 128, (g, w, h) => { g.fillStyle = "#e9e1d2"; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 3) { g.fillStyle = "rgba(180,170,150,0.35)"; g.fillRect(x, 0, 1, h); } }, rep),
  bone: (rep) => canvasTex("bone", 256, 256, (g, w, h) => { g.fillStyle = "#e7dcc3"; g.fillRect(0, 0, w, h); speckle(g, w, h, 2500, ["#b9a98a", "#fff8ea", "#cbbd9f"], 3); }, rep),
  organ: (rep) => canvasTex("organ", 256, 256, (g, w, h) => { g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h); for (let i = 0; i < 260; i++) { const r = 4 + Math.random() * 18; const gr = g.createRadialGradient(0, 0, 0, 0, 0, r); gr.addColorStop(0, "rgba(120,40,40,0.10)"); gr.addColorStop(1, "rgba(120,40,40,0)"); g.save(); g.translate(Math.random() * w, Math.random() * h); g.fillStyle = gr; g.fillRect(-r, -r, 2 * r, 2 * r); g.restore(); } speckle(g, w, h, 1500, ["#d8c0c0", "#ffffff"], 2); }, rep),
  tile: (rep) => canvasTex("tile", 512, 512, (g, w, h) => { g.fillStyle = "#c9d0d6"; g.fillRect(0, 0, w, h); const n = 4, s = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = 205 + Math.random() * 18 | 0; g.fillStyle = `rgb(${v},${v + 4},${v + 8})`; g.fillRect(i * s + 2, j * s + 2, s - 4, s - 4); } speckle(g, w, h, 4000, ["#9aa4ad", "#ffffff"], 2); g.strokeStyle = "rgba(90,100,110,0.55)"; g.lineWidth = 3; for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo(i * s, 0); g.lineTo(i * s, h); g.stroke(); g.beginPath(); g.moveTo(0, i * s); g.lineTo(w, i * s); g.stroke(); } }, rep),
  wall: (rep) => canvasTex("wall", 256, 256, (g, w, h) => { g.fillStyle = "#eef1f4"; g.fillRect(0, 0, w, h); speckle(g, w, h, 1800, ["#d8dde3", "#ffffff"], 2); }, rep),
  fabric: (rep) => canvasTex("fabric", 128, 128, (g, w, h) => { g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 2) { g.fillStyle = "rgba(0,0,0,0.05)"; g.fillRect(0, y, w, 1); } for (let x = 0; x < w; x += 2) { g.fillStyle = "rgba(0,0,0,0.04)"; g.fillRect(x, 0, 1, h); } speckle(g, w, h, 500, ["#000000"], 1.5); }, rep),
  metal: (rep) => canvasTex("metal", 256, 64, (g, w, h) => { g.fillStyle = "#c9cdd3"; g.fillRect(0, 0, w, h); for (let i = 0; i < 400; i++) { const v = 170 + Math.random() * 70 | 0; g.fillStyle = `rgba(${v},${v},${v + 6},0.25)`; g.fillRect(0, Math.random() * h, w, 0.6); } }, rep),
  wood: (rep) => canvasTex("wood", 256, 256, (g, w, h) => { g.fillStyle = "#a9743f"; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 1) { const v = Math.sin(y * 0.18 + Math.sin(y * 0.03) * 4) * 0.5 + 0.5; g.fillStyle = `rgba(80,45,20,${0.08 + v * 0.12})`; g.fillRect(0, y, w, 1); } }, rep),
  ceiling: (rep) => canvasTex("ceil", 256, 256, (g, w, h) => { g.fillStyle = "#f3f4f6"; g.fillRect(0, 0, w, h); speckle(g, w, h, 3000, ["#c7cbd1"], 1.5); g.strokeStyle = "#cfd4da"; g.lineWidth = 3; g.strokeRect(0, 0, w, h); }, rep),
  window: () => canvasTex("window", 512, 384, (g, w, h) => {
    const sky = g.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, "#9fd0f5"); sky.addColorStop(0.6, "#d9eefc"); sky.addColorStop(1, "#bfe3c4"); g.fillStyle = sky; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { const x = Math.random() * w, r = 30 + Math.random() * 60, y = h * 0.55 + Math.random() * h * 0.35; g.fillStyle = `rgba(${40 + Math.random() * 40},${100 + Math.random() * 60},${50 + Math.random() * 30},0.85)`; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = "rgba(255,255,255,0.18)"; g.fillRect(0, 0, w, h);
  })
};

// ---------- Materiais ----------
const V3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
function mkMat(color, o = {}) {
  const P = {
    color, roughness: o.rough ?? 0.55, metalness: o.metal ?? 0,
    transparent: (o.opacity ?? 1) < 1, opacity: o.opacity ?? 1, side: o.side ?? THREE.FrontSide,
    map: o.map || null, emissive: o.emissive || 0x000000, envMapIntensity: o.env ?? 1
  };
  if (o.bump) { P.bumpMap = o.bump; P.bumpScale = o.bumpScale ?? 0.002; }
  if (o.clearcoat !== undefined || o.sheen) {
    const m = new THREE.MeshPhysicalMaterial(Object.assign(P, { clearcoat: o.clearcoat ?? 0, clearcoatRoughness: o.ccRough ?? 0.3 }));
    if (o.sheen) m.sheen = new THREE.Color(o.sheen);
    return m;
  }
  return new THREE.MeshStandardMaterial(P);
}
// Predefinições realistas
const MAT = {
  bone: (c = "#e9dfc7") => mkMat(c, { rough: 0.62, map: TEXTURES.bone([2, 2]), bump: TEXTURES.bone([2, 2]), bumpScale: 0.0015 }),
  muscle: (c = "#c25a4f", op = 1) => mkMat(c, { rough: 0.42, clearcoat: 0.35, ccRough: 0.45, map: TEXTURES.muscle([1, 2]), bump: TEXTURES.muscle([1, 2]), bumpScale: 0.003, opacity: op }),
  organ: (c, o = {}) => mkMat(c, Object.assign({ rough: 0.35, clearcoat: 0.6, ccRough: 0.25, map: TEXTURES.organ([1, 1]), bump: TEXTURES.organ([1, 1]), bumpScale: 0.0015 }, o)),
  vessel: (c) => mkMat(c, { rough: 0.28, clearcoat: 0.8, ccRough: 0.2 }),
  nerve: (c = "#f2d58a") => mkMat(c, { rough: 0.45, clearcoat: 0.3 }),
  steel: (c = "#cfd4da") => mkMat(c, { metal: 1, rough: 0.22, map: TEXTURES.metal([1, 1]) }),
  plastic: (c) => mkMat(c, { rough: 0.45, clearcoat: 0.25 }),
  fabric: (c) => mkMat(c, { rough: 0.95, map: TEXTURES.fabric([4, 4]), bump: TEXTURES.fabric([4, 4]), bumpScale: 0.003, sheen: "#2e2e2e" }),
  skin: (c = "#c99372") => mkMat(c, { rough: 0.55, clearcoat: 0.08, sheen: "#4a3024" })
};

// ---------- Geometria ----------
function applyMat(m, color, o) { return o.material || (o.preset ? MAT[o.preset](color) : mkMat(color, o)); }
function mEll(p, s, color, o = {}) {
  const geo = new THREE.SphereGeometry(1, o.seg || 32, Math.round((o.seg || 32) * 0.7));
  if (o.organic) organicGeo(geo, o.organic, o.freq || 3.5, o.seed || 1);
  const m = new THREE.Mesh(geo, applyMat(null, color, o));
  m.position.set(p[0], p[1], p[2]); m.scale.set(s[0], s[1], s[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
function mBox(p, s, color, o = {}) {
  const geo = o.round ? roundBoxGeo(s[0], s[1], s[2], o.round) : new THREE.BoxGeometry(s[0], s[1], s[2]);
  const m = new THREE.Mesh(geo, applyMat(null, color, o));
  m.position.set(p[0], p[1], p[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
function mCyl(a, b, rad, color, o = {}) {
  const A = V3(a), B = V3(b), len = A.distanceTo(B);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(o.rad2 ?? rad, rad, len, o.seg || 18), applyMat(null, color, o));
  m.position.copy(A).add(B).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  return m;
}
function mTube(pts, rad, color, o = {}) {
  const curve = new THREE.CatmullRomCurve3(pts.map(V3));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, pts.length * 12), rad, o.seg || 12, !!o.closed), applyMat(null, color, o));
}
function mTorus(p, R, r, color, o = {}) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(R, r, 14, 36, o.arc || Math.PI * 2), applyMat(null, color, o));
  m.position.set(p[0], p[1], p[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
// Tubo de raio variável ao longo de uma curva (ossos, músculos, intestinos, vasos com afunilamento)
function varTubeGeo(pts, rfn, o = {}) {
  const curve = new THREE.CatmullRomCurve3(pts.map(V3));
  const tub = o.tub || Math.max(32, pts.length * 14), rad = o.radial || 18;
  const frames = curve.computeFrenetFrames(tub, false);
  const pos = [], uv = [], idx = [];
  const sx = o.flat ? o.flat[0] : 1, sy = o.flat ? o.flat[1] : 1;
  for (let i = 0; i <= tub; i++) {
    const t = i / tub, P = curve.getPointAt(t), N = frames.normals[i], B = frames.binormals[i], r = rfn(t);
    for (let j = 0; j <= rad; j++) {
      const v = (j / rad) * Math.PI * 2, cx = Math.cos(v) * sx, cy = Math.sin(v) * sy;
      pos.push(P.x + r * (cx * N.x + cy * B.x), P.y + r * (cx * N.y + cy * B.y), P.z + r * (cx * N.z + cy * B.z));
      uv.push(j / rad, t * (o.uvRep || 1));
    }
  }
  for (let i = 0; i < tub; i++) for (let j = 0; j < rad; j++) {
    const a = i * (rad + 1) + j, b = a + rad + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
function mVarTube(pts, rfn, color, o = {}) { return new THREE.Mesh(varTubeGeo(pts, rfn, o), applyMat(null, color, o)); }
// Raio de osso longo: diáfise fina e epífises alargadas, fechado nas pontas
const boneR = (r, e1 = 1.9, e2 = 1.7) => (t) => {
  const close = Math.min(1, Math.sqrt(Math.min(t, 1 - t) / 0.025));
  return r * close * (1 + (e1 - 1) * Math.exp(-((t / 0.09) ** 2)) + (e2 - 1) * Math.exp(-(((1 - t) / 0.09) ** 2)));
};
// Raio de músculo fusiforme
const fusiR = (r, bias = 0.5) => (t) => r * Math.pow(Math.sin(Math.PI * Math.pow(t, Math.log(0.5) / Math.log(bias))), 0.75) + 0.0006;
function organicGeo(geo, amp, freq, seed) {
  const p = geo.attributes.position, v = new THREE.Vector3();
  geo.computeVertexNormals();
  const n = geo.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const k = fbm(v.x * freq + seed, v.y * freq + seed * 2, v.z * freq + seed * 3) * amp;
    p.setXYZ(i, v.x + n.getX(i) * k, v.y + n.getY(i) * k, v.z + n.getZ(i) * k);
  }
  p.needsUpdate = true; geo.computeVertexNormals();
  return geo;
}
function deformGeo(geo, fn) {
  const p = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); fn(v); p.setXYZ(i, v.x, v.y, v.z); }
  p.needsUpdate = true; geo.computeVertexNormals(); return geo;
}
function roundBoxGeo(w, h, d, r) {
  r = Math.min(r, w / 2, h / 2, d / 2) * 0.999;
  const sh = new THREE.Shape(), x = -w / 2, y = -h / 2;
  sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r); sh.lineTo(x + w, y + h - r); sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  sh.lineTo(x + r, y + h); sh.quadraticCurveTo(x, y + h, x, y + h - r); sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(sh, { depth: Math.max(0.0001, d - 2 * r), bevelEnabled: true, bevelThickness: r, bevelSize: r * 0.98, bevelSegments: 3, curveSegments: 6 });
  g.translate(0, 0, -(d - 2 * r) / 2); g.computeVertexNormals();
  return g;
}
function capsule(a, b, r, color, o = {}) {
  const g = new THREE.Group();
  g.add(mCyl(a, b, r, color, Object.assign({ rad2: o.r2 ?? r }, o)), mEll(a, [r, r, r], color, o), mEll(b, [o.r2 ?? r, o.r2 ?? r, o.r2 ?? r], color, o));
  return g;
}
// Textura com texto (placas, rótulos, telas)
function textTex(lines, o = {}) {
  const w = o.w || 512, h = o.h || 256;
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d");
  g.fillStyle = o.bg || "#ffffff"; g.fillRect(0, 0, w, h);
  if (o.border) { g.strokeStyle = o.border; g.lineWidth = 12; g.strokeRect(6, 6, w - 12, h - 12); }
  g.fillStyle = o.fg || "#111827"; g.textAlign = "center"; g.textBaseline = "middle";
  const arr = Array.isArray(lines) ? lines : [lines];
  const fs = o.size || Math.min(64, Math.floor(h / (arr.length + 0.6)));
  g.font = `700 ${fs}px Outfit, Inter, Arial, sans-serif`;
  arr.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (arr.length - 1) / 2) * fs * 1.15));
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return t;
}
function mPlane(p, s, tex, o = {}) {
  const mat = o.lit ? mkMat("#ffffff", { map: tex, rough: 0.6 }) : new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: !!o.transparent, toneMapped: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(s[0], s[1]), mat);
  m.position.set(p[0], p[1], p[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
// Corpo translúcido com brilho de borda (efeito “holograma”), usado como pele
function fresnelMat(color = "#7dd3fc", power = 2.2, strength = 0.9) {
  return new THREE.ShaderMaterial({
    uniforms: { c: { value: new THREE.Color(color) }, p: { value: power }, s: { value: strength } },
    vertexShader: "varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }",
    fragmentShader: "uniform vec3 c; uniform float p; uniform float s; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), p) * s; gl_FragColor = vec4(c, f); }",
    transparent: true, depthWrite: false, side: THREE.FrontSide, blending: THREE.AdditiveBlending
  });
}

// ---------- Ambiente de iluminação ----------
function makeEnvMap(renderer, kind) {
  const T = THREE, pm = new T.PMREMGenerator(renderer), sc = new T.Scene();
  const geo = new T.SphereGeometry(10, 32, 16), cols = [], pos = geo.attributes.position;
  const top = new T.Color(kind === "room" ? "#ffffff" : kind === "lab" ? "#e8f4ff" : "#a9bedc"), bot = new T.Color(kind === "room" ? "#8a949e" : kind === "lab" ? "#9fb3c8" : "#0d1118");
  for (let i = 0; i < pos.count; i++) { const y = pos.getY(i) / 10, c = bot.clone().lerp(top, Math.pow((y + 1) / 2, 0.8)); cols.push(c.r, c.g, c.b); }
  geo.setAttribute("color", new T.Float32BufferAttribute(cols, 3));
  sc.add(new T.Mesh(geo, new T.MeshBasicMaterial({ vertexColors: true, side: T.BackSide })));
  const panel = (x, y, z, w, h, i, col = "#ffffff") => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(i), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); sc.add(m); };
  panel(0, 8, 0, 7, 7, 3.2); panel(7, 3, 5, 3, 5, 2.0); panel(-7, 2, -4, 3, 5, 1.3, kind === "studio" ? "#9fe7ff" : "#ffffff"); panel(0, 1, 8, 6, 2, 0.8);
  const rt = pm.fromScene(sc, 0.03); pm.dispose();
  return rt.texture;
}

// ---------- Visualizador ----------
// o: { mode: "orbit"|"look", target, dist, theta, phi, minDist, maxDist, pos, yaw, pitch, fov, bg, env, shadows, bounds, transparent }
function createViewer(el, o = {}) {
  const T = THREE;
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: !!o.transparent, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = o.exposure || 1.05;
  if (o.shadows) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap; }
  el.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction = "none";
  const scene = new T.Scene();
  if (!o.transparent) scene.background = new T.Color(o.bg || "#0d1526");
  scene.environment = makeEnvMap(renderer, o.env || "studio");
  if (o.fog) scene.fog = new T.Fog(o.fog[0], o.fog[1], o.fog[2]);
  const camera = new T.PerspectiveCamera(o.fov || 40, 1, 0.01, 80);
  scene.add(camera);
  scene.add(new T.HemisphereLight(0xffffff, o.env === "room" ? 0x6f7680 : 0x1b2233, o.env === "room" ? 0.3 : 0.45));
  const key = new T.DirectionalLight(0xfff4e6, o.env === "room" ? 0.9 : 1.15); key.position.set(2.5, 5, 3.5); scene.add(key);
  if (o.shadows) { key.castShadow = true; key.shadow.mapSize.set(1536, 1536); const sc = key.shadow.camera; sc.left = -4; sc.right = 4; sc.top = 4; sc.bottom = -4; sc.near = 0.5; sc.far = 14; key.shadow.bias = -0.0008; key.shadow.radius = 3; }
  const rim = new T.DirectionalLight(o.env === "studio" ? 0x7fdcff : 0xdbeafe, o.env === "room" ? 0.25 : 0.7); rim.position.set(-3, 2, -3); scene.add(rim);
  const labels = document.createElement("div"); labels.className = "v-labels"; el.appendChild(labels);
  const svgNS = "http://www.w3.org/2000/svg";
  const callSvg = document.createElementNS(svgNS, "svg"); callSvg.setAttribute("class", "v-callsvg"); el.appendChild(callSvg);

  const st = {
    mode: o.mode || "orbit", target: new T.Vector3(...(o.target || [0, 1, 0])),
    theta: o.theta || 0, phi: o.phi || Math.PI / 2, r: o.dist || 2, minR: o.minDist || 0.25, maxR: o.maxDist || 6,
    pos: new T.Vector3(...(o.pos || [0, 1.6, 0])), yaw: o.yaw || 0, pitch: o.pitch || 0, fov: o.fov || 55,
    bounds: o.bounds || null, auto: false
  };
  const home = { t: st.target.toArray(), theta: st.theta, phi: st.phi, r: st.r, pos: st.pos.toArray(), yaw: st.yaw, pitch: st.pitch, fov: st.fov };
  let dirty = true, raf = 0, alive = true, lastT = performance.now();
  const anims = new Set(), pickables = [], keys = new Set();
  let pickCb = null, hoverCb = null, moveVec = { x: 0, z: 0 };

  function apply() {
    if (st.mode === "orbit") {
      st.phi = Math.min(Math.PI - 0.08, Math.max(0.08, st.phi));
      st.r = Math.min(st.maxR, Math.max(st.minR, st.r));
      const sp = Math.sin(st.phi);
      camera.position.set(st.target.x + st.r * sp * Math.sin(st.theta), st.target.y + st.r * Math.cos(st.phi), st.target.z + st.r * sp * Math.cos(st.theta));
      camera.lookAt(st.target);
    } else {
      st.pitch = Math.min(1.2, Math.max(-1.2, st.pitch));
      st.fov = Math.min(80, Math.max(25, st.fov));
      if (st.bounds) { st.pos.x = Math.min(st.bounds[1], Math.max(st.bounds[0], st.pos.x)); st.pos.z = Math.min(st.bounds[3], Math.max(st.bounds[2], st.pos.z)); }
      camera.fov = st.fov; camera.updateProjectionMatrix();
      camera.position.copy(st.pos);
      const d = new T.Vector3(Math.sin(st.yaw) * Math.cos(st.pitch), Math.sin(st.pitch), -Math.cos(st.yaw) * Math.cos(st.pitch));
      camera.lookAt(st.pos.clone().add(d));
    }
    dirty = true;
  }
  function resize() {
    const w = el.clientWidth || 300, h = el.clientHeight || 300;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = w + "px"; renderer.domElement.style.height = h + "px";
    camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true;
    callSvg.setAttribute("width", w); callSvg.setAttribute("height", h);
  }
  const ro = new ResizeObserver(resize); ro.observe(el);

  const labelList = [];
  let callout = null;
  function addLabel(text, pos, cls = "") {
    const d = document.createElement("div"); d.className = "v-label " + cls; d.textContent = text;
    labels.appendChild(d);
    const L = { el: d, pos: pos.isVector3 ? pos : V3(pos) };
    labelList.push(L); dirty = true; return L;
  }
  function clearLabels() { labelList.splice(0).forEach((l) => l.el.remove()); }
  function project(v) { const p = v.clone().project(camera); return { x: ((p.x + 1) / 2) * el.clientWidth, y: ((1 - p.y) / 2) * el.clientHeight, vis: p.z < 1 && p.z > -1 }; }
  function updateLabels() {
    labelList.forEach((L) => {
      const p = project(L.pos);
      const vis = p.vis && p.x > -50 && p.x < el.clientWidth + 50;
      L.el.style.display = vis ? "" : "none";
      if (vis) L.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-120%)`;
    });
    if (callout) {
      const p = project(callout.pos), w = el.clientWidth;
      const left = p.x > w * 0.5;
      const bx = Math.max(8, Math.min(w - 180, left ? p.x - 230 : p.x + 60)), by = Math.max(8, p.y - 130);
      callout.box.style.transform = `translate(${bx}px, ${by}px)`;
      callout.box.style.display = p.vis ? "" : "none";
      const ax = left ? bx + 168 : bx, ay = by + 52;
      callSvg.innerHTML = p.vis ? `<line x1="${ax}" y1="${ay}" x2="${p.x}" y2="${p.y}" class="cl-line"/><circle cx="${ax}" cy="${ay}" r="5" class="cl-dot"/><circle cx="${p.x}" cy="${p.y}" r="7" class="cl-end"/>` : "";
    }
  }
  function setCallout(pos, html) {
    if (callout) { callout.box.remove(); callout = null; callSvg.innerHTML = ""; }
    if (!pos) return;
    const box = document.createElement("div"); box.className = "v-callout"; box.innerHTML = html;
    labels.appendChild(box);
    callout = { pos: pos.isVector3 ? pos : V3(pos), box }; dirty = true;
  }

  function loop(now) {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    if (st.mode === "look" && (keys.size || moveVec.x || moveVec.z)) {
      let f = 0, s = 0;
      if (keys.has("w")) f += 1; if (keys.has("s")) f -= 1; if (keys.has("a")) s -= 1; if (keys.has("d")) s += 1;
      f += -moveVec.z; s += moveVec.x;
      if (f || s) { const sp = 1.6 * dt; st.pos.x += (Math.sin(st.yaw) * f + Math.cos(st.yaw) * s) * sp; st.pos.z += (-Math.cos(st.yaw) * f + Math.sin(st.yaw) * s) * sp; apply(); }
    }
    if (st.auto && st.mode === "orbit") { st.theta += dt * 0.35; apply(); }
    if (anims.size) { anims.forEach((fn) => { if (fn(now) === false) anims.delete(fn); }); dirty = true; }
    if (!dirty) return;
    dirty = false;
    renderer.render(scene, camera);
    updateLabels();
  }

  // Entrada
  const ptrs = new Map();
  let down = null, pinch0 = 0;
  const cv = renderer.domElement, ray = new T.Raycaster();
  const isShown = (m) => { let x = m; while (x) { if (!x.visible) return false; x = x.parent; } return true; };
  const findPick = (obj) => { let x = obj; while (x) { if (x.userData && x.userData.pick) return x.userData.pick; x = x.parent; } return null; };
  function pickAt(cx, cy) {
    const r = cv.getBoundingClientRect();
    ray.setFromCamera(new T.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
    const hits = ray.intersectObjects(pickables.filter((m) => isShown(m) && m.parent), false);
    for (const h of hits) { const id = findPick(h.object); if (id) return { id, point: h.point }; }
    return null;
  }
  function onDown(e) {
    cv.setPointerCapture && cv.setPointerCapture(e.pointerId);
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); }
    st.auto = false;
  }
  function onMove(e) {
    if (!ptrs.has(e.pointerId)) {
      if (hoverCb && e.pointerType === "mouse") { const p = pickAt(e.clientX, e.clientY); hoverCb(p ? p.id : null); cv.style.cursor = p ? "pointer" : "grab"; }
      return;
    }
    const prev = ptrs.get(e.pointerId), dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) {
      if (down) down.moved += Math.abs(dx) + Math.abs(dy);
      if (st.mode === "orbit") { st.theta -= dx * 0.008; st.phi -= dy * 0.008; } else { st.yaw -= dx * 0.004; st.pitch += dy * 0.004; }
      apply();
    } else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch0) zoom(pinch0 / d);
      pinch0 = d; if (down) down.moved += 50;
    }
  }
  function onUp(e) {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch0 = 0;
    if (ptrs.size === 0 && down) { if (down.moved < 8 && performance.now() - down.t < 700 && pickCb) pickCb(pickAt(e.clientX, e.clientY)); down = null; }
  }
  function zoom(f) { if (st.mode === "orbit") st.r *= f; else st.fov *= f; apply(); }
  function onWheel(e) { e.preventDefault(); zoom(1 + Math.sign(e.deltaY) * 0.08); }
  function typing(e) { return /input|textarea|select/i.test((e.target || {}).tagName || ""); }
  function onKey(e) {
    if (typing(e)) return;
    const k = e.key.toLowerCase();
    if (st.mode === "look" && "wasd".includes(k) && k.length === 1) { keys.add(k); return; }
    if (k === "arrowleft") { if (st.mode === "orbit") st.theta += 0.12; else st.yaw -= 0.12; apply(); }
    else if (k === "arrowright") { if (st.mode === "orbit") st.theta -= 0.12; else st.yaw += 0.12; apply(); }
    else if (k === "arrowup") { if (st.mode === "orbit") st.phi -= 0.1; else st.pitch += 0.08; apply(); }
    else if (k === "arrowdown") { if (st.mode === "orbit") st.phi += 0.1; else st.pitch -= 0.08; apply(); }
    else if (k === "+" || k === "=") zoom(0.9);
    else if (k === "-") zoom(1.1);
    if (o.onKey) o.onKey(k, e);
  }
  function onKeyUp(e) { keys.delete(e.key.toLowerCase()); }
  cv.addEventListener("pointerdown", onDown);
  cv.addEventListener("pointermove", onMove);
  cv.addEventListener("pointerup", onUp);
  cv.addEventListener("pointercancel", onUp);
  cv.addEventListener("pointerleave", () => hoverCb && hoverCb(null));
  cv.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("keydown", onKey);
  document.addEventListener("keyup", onKeyUp);

  const api = {
    THREE: T, scene, camera, renderer, el, st,
    add(obj, pickId) {
      scene.add(obj);
      if (o.shadows && !obj.userData.noShadow) obj.traverse((m) => { if (m.isMesh && !(m.material && m.material.transparent)) { m.castShadow = true; m.receiveShadow = true; } });
      if (pickId) { obj.userData.pick = pickId; obj.traverse((m) => { if (m.isMesh) pickables.push(m); }); }
      dirty = true; return obj;
    },
    makePickable(obj, id) { obj.userData.pick = id; obj.traverse((m) => { if (m.isMesh && !pickables.includes(m)) pickables.push(m); }); },
    onPick(fn) { pickCb = fn; }, onHover(fn) { hoverCb = fn; },
    zoom, refresh() { dirty = true; },
    zoomPct() { return st.mode === "orbit" ? Math.round((home.r / st.r) * 100) : Math.round((home.fov / st.fov) * 100); },
    rotate(d) { if (st.mode === "orbit") st.theta += d; else st.yaw += d; apply(); },
    tilt(d) { if (st.mode === "orbit") st.phi += d; else st.pitch -= d; apply(); },
    panY(d) { st.target.y += d; apply(); },
    setTarget(t, r) { st.target.set(t[0], t[1], t[2]); if (r) st.r = r; apply(); },
    flyTo(t, r, ms = 600) { const from = st.target.clone(), fr = st.r, to = V3(t), t0 = performance.now(); anims.add((now) => { const f = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - f, 3); st.target.lerpVectors(from, to, e); st.r = fr + ((r || fr) - fr) * e; apply(); return f < 1; }); },
    moveTo(p, yaw, pitch) { st.pos.set(p[0], p[1], p[2]); if (yaw !== undefined) st.yaw = yaw; if (pitch !== undefined) st.pitch = pitch; apply(); },
    setMove(x, z) { moveVec = { x, z }; },
    setAuto(b) { st.auto = b; },
    reset() { st.target.fromArray(home.t); st.theta = home.theta; st.phi = home.phi; st.r = home.r; st.pos.fromArray(home.pos); st.yaw = home.yaw; st.pitch = home.pitch; st.fov = home.fov; apply(); },
    animate(fn) { anims.add(fn); }, stopAnim(fn) { anims.delete(fn); },
    addLabel, clearLabels, setCallout, project,
    pickCenter() { const r = cv.getBoundingClientRect(); return pickAt(r.left + r.width / 2, r.top + r.height / 2); },
    snapshot(w = 160, h = 120) { renderer.render(scene, camera); return renderer.domElement.toDataURL("image/jpeg", 0.8); },
    dispose() {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      document.removeEventListener("keydown", onKey); document.removeEventListener("keyup", onKeyUp);
      scene.traverse((m) => {
        if (m.geometry) m.geometry.dispose();
        if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { if (mt.map && !Object.values(TEX).includes(mt.map)) mt.map.dispose(); mt.dispose(); });
      });
      if (scene.environment) scene.environment.dispose();
      renderer.dispose(); cv.remove(); labels.remove(); callSvg.remove();
    }
  };
  resize(); apply(); requestAnimationFrame(loop);
  return api;
}

function setGlow(obj, color, intensity = 0.55) {
  obj.traverse((m) => {
    if (!m.isMesh || !m.material || !m.material.emissive) return;
    if (m.userData.baseEm === undefined) { m.userData.baseEm = m.material.emissive.getHex(); m.userData.baseEi = m.material.emissiveIntensity; }
    if (color === null) { m.material.emissive.setHex(m.userData.baseEm); m.material.emissiveIntensity = m.userData.baseEi; }
    else { m.material.emissive.setHex(color); m.material.emissiveIntensity = intensity; }
  });
}
function setOpacity(obj, op) {
  obj.traverse((m) => {
    if (!m.isMesh || !m.material || m.material.isShaderMaterial) return;
    if (m.userData.baseOp === undefined) m.userData.baseOp = m.material.opacity;
    const v = op === null ? m.userData.baseOp : op;
    m.material.opacity = v; m.material.transparent = v < 1; m.material.depthWrite = v > 0.5;
  });
}

// Barra de câmera padrão
function camControlsHtml(extra = "") {
  return `<div class="cam-ctrl">
    <button onclick="LABV&&LABV.rotate(0.35)" aria-label="Girar para a esquerda" title="Girar">⟲</button>
    <button onclick="LABV&&LABV.rotate(-0.35)" aria-label="Girar para a direita" title="Girar">⟳</button>
    <button onclick="LABV&&LABV.tilt(-0.2)" aria-label="Inclinar para cima" title="Inclinar">⤒</button>
    <button onclick="LABV&&LABV.tilt(0.2)" aria-label="Inclinar para baixo" title="Inclinar">⤓</button>
    <button onclick="LABV&&LABV.zoom(0.85)" aria-label="Aproximar" title="Aproximar">＋</button>
    <button onclick="LABV&&LABV.zoom(1.15)" aria-label="Afastar" title="Afastar">－</button>
    <button onclick="LABV&&LABV.reset()" aria-label="Recentralizar" title="Recentralizar">◎</button>
    ${extra}
  </div>`;
}
// Joystick virtual para andar nas salas (toque)
function joystickHtml() { return `<div class="joy" id="joy" aria-label="Andar"><i></i></div>`; }
function bindJoystick() {
  const j = document.getElementById("joy"); if (!j) return;
  const knob = j.querySelector("i");
  let id = null, cx = 0, cy = 0;
  j.addEventListener("pointerdown", (e) => { id = e.pointerId; j.setPointerCapture(id); const r = j.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; });
  j.addEventListener("pointermove", (e) => { if (e.pointerId !== id) return; let dx = (e.clientX - cx) / 40, dy = (e.clientY - cy) / 40; const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; } knob.style.transform = `translate(${dx * 26}px, ${dy * 26}px)`; LABV && LABV.setMove(dx, dy); });
  const end = () => { id = null; knob.style.transform = ""; LABV && LABV.setMove(0, 0); };
  j.addEventListener("pointerup", end); j.addEventListener("pointercancel", end);
}
