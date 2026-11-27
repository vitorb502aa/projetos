/* MedQuest Lab — motor 3D.
   Three.js (r128, UMD) é carregado sob demanda, só quando uma simulação 3D abre.
   Controles próprios: órbita (modelos) e olhar em primeira pessoa (salas),
   com arraste, pinça, roda do mouse, teclado e toque para selecionar objetos. */
"use strict";

const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
let LABV = null;          // visualizador ativo
let LABT = [];            // timers do Lab

async function loadThree() {
  if (window.THREE) return window.THREE;
  await loadScript(THREE_URL);
  return window.THREE;
}
function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch (e) { return false; }
}
const use2D = () => !!(S.lab && S.lab.force2d) || !webglOK();

function labCleanup() {
  if (LABV) { try { LABV.dispose(); } catch (e) {} LABV = null; }
  LABT.forEach((t) => { clearTimeout(t); clearInterval(t); });
  LABT = [];
  document.body.classList.remove("lab-full");
}

// ---------- Geometria utilitária ----------
const V3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
function mkMat(color, o = {}) {
  return new THREE.MeshStandardMaterial({
    color, roughness: o.rough ?? 0.6, metalness: o.metal ?? 0,
    transparent: (o.opacity ?? 1) < 1, opacity: o.opacity ?? 1, side: o.side ?? THREE.FrontSide,
    map: o.map || null, emissive: o.emissive || 0x000000
  });
}
function mEll(p, s, color, o = {}) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, o.seg || 24, Math.round((o.seg || 24) * 0.7)), mkMat(color, o));
  m.position.set(p[0], p[1], p[2]); m.scale.set(s[0], s[1], s[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
function mBox(p, s, color, o = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(s[0], s[1], s[2]), mkMat(color, o));
  m.position.set(p[0], p[1], p[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
function mCyl(a, b, rad, color, o = {}) {
  const A = V3(a), B = V3(b);
  const len = A.distanceTo(B);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(o.rad2 ?? rad, rad, len, o.seg || 14), mkMat(color, o));
  m.position.copy(A).add(B).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  return m;
}
function mTube(pts, rad, color, o = {}) {
  const curve = new THREE.CatmullRomCurve3(pts.map(V3));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(16, pts.length * 10), rad, o.seg || 10, !!o.closed), mkMat(color, o));
}
function mTorus(p, R, r, color, o = {}) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(R, r, 10, 28, o.arc || Math.PI * 2), mkMat(color, o));
  m.position.set(p[0], p[1], p[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}
// Textura com texto (placas, rótulos, telas de monitor)
function textTex(lines, o = {}) {
  const w = o.w || 512, h = o.h || 256;
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d");
  g.fillStyle = o.bg || "#ffffff"; g.fillRect(0, 0, w, h);
  if (o.border) { g.strokeStyle = o.border; g.lineWidth = 12; g.strokeRect(6, 6, w - 12, h - 12); }
  g.fillStyle = o.fg || "#111827"; g.textAlign = "center"; g.textBaseline = "middle";
  const arr = Array.isArray(lines) ? lines : [lines];
  const fs = o.size || Math.min(64, Math.floor(h / (arr.length + 0.6)));
  g.font = `800 ${fs}px Nunito, Arial, sans-serif`;
  arr.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (arr.length - 1) / 2) * fs * 1.15));
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return t;
}
function mPlane(p, s, tex, o = {}) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(s[0], s[1]), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: !!o.transparent }));
  m.position.set(p[0], p[1], p[2]);
  if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
  return m;
}

// ---------- Visualizador ----------
// o: { mode: "orbit"|"look", target, dist, theta, phi, minDist, maxDist, pos, yaw, pitch, fov, bg }
function createViewer(el, o = {}) {
  const T = THREE;
  const renderer = new T.WebGLRenderer({ antialias: true, preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = T.sRGBEncoding;
  el.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction = "none";
  const scene = new T.Scene();
  scene.background = new T.Color(o.bg || "#0d1526");
  const camera = new T.PerspectiveCamera(o.fov || 45, 1, 0.01, 60);
  scene.add(new T.HemisphereLight(0xffffff, 0x2b3550, 0.85));
  const dl = new T.DirectionalLight(0xffffff, 0.75); dl.position.set(2, 4, 3); scene.add(dl);
  const dl2 = new T.DirectionalLight(0x9ab8ff, 0.3); dl2.position.set(-3, 2, -2); scene.add(dl2);
  const labels = document.createElement("div"); labels.className = "v-labels"; el.appendChild(labels);

  const st = {
    mode: o.mode || "orbit",
    target: new T.Vector3(...(o.target || [0, 1, 0])),
    theta: o.theta || 0, phi: o.phi || Math.PI / 2, r: o.dist || 2,
    minR: o.minDist || 0.25, maxR: o.maxDist || 6,
    pos: new T.Vector3(...(o.pos || [0, 1.6, 0])), yaw: o.yaw || 0, pitch: o.pitch || 0, fov: o.fov || 55
  };
  const home = JSON.parse(JSON.stringify({ t: st.target.toArray(), theta: st.theta, phi: st.phi, r: st.r, pos: st.pos.toArray(), yaw: st.yaw, pitch: st.pitch, fov: st.fov }));
  let dirty = true, raf = 0, alive = true;
  const anims = new Set();
  const pickables = [];
  let pickCb = null, hoverCb = null;

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
  }
  const ro = new ResizeObserver(resize); ro.observe(el);

  // Etiquetas HTML presas a pontos 3D
  const labelList = [];
  function addLabel(text, pos, cls = "") {
    const d = document.createElement("div"); d.className = "v-label " + cls; d.textContent = text;
    labels.appendChild(d);
    const L = { el: d, pos: pos.isVector3 ? pos : V3(pos), obj: null };
    labelList.push(L); dirty = true;
    return L;
  }
  function clearLabels() { labelList.splice(0).forEach((l) => l.el.remove()); }
  function updateLabels() {
    const w = el.clientWidth, h = el.clientHeight;
    labelList.forEach((L) => {
      const p = (L.obj ? L.obj.getWorldPosition(new T.Vector3()) : L.pos.clone()).project(camera);
      const vis = p.z < 1 && p.z > -1 && Math.abs(p.x) < 1.2 && Math.abs(p.y) < 1.2;
      L.el.style.display = vis ? "" : "none";
      if (vis) L.el.style.transform = `translate(${((p.x + 1) / 2) * w}px, ${((1 - p.y) / 2) * h}px) translate(-50%,-120%)`;
    });
  }

  function loop() {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    const now = performance.now();
    if (anims.size) { anims.forEach((fn) => { if (fn(now) === false) anims.delete(fn); }); dirty = true; }
    if (!dirty) return;
    dirty = false;
    renderer.render(scene, camera);
    updateLabels();
  }

  // ---------- Entrada (mouse, toque, teclado) ----------
  const ptrs = new Map();
  let down = null, pinch0 = 0;
  const cv = renderer.domElement;
  const ray = new T.Raycaster();
  function pickAt(cx, cy) {
    const r = cv.getBoundingClientRect();
    const v = new T.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(v, camera);
    const hits = ray.intersectObjects(pickables.filter((m) => m.visible && isShown(m)), false);
    for (const h of hits) { const id = findPick(h.object); if (id) return { id, point: h.point }; }
    return null;
  }
  function isShown(m) { let o = m; while (o) { if (!o.visible) return false; o = o.parent; } return true; }
  function findPick(obj) { let o = obj; while (o) { if (o.userData && o.userData.pick) return o.userData.pick; o = o.parent; } return null; }
  function onDown(e) {
    cv.setPointerCapture && cv.setPointerCapture(e.pointerId);
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); }
  }
  function onMove(e) {
    if (!ptrs.has(e.pointerId)) {
      if (hoverCb && e.pointerType === "mouse") { const p = pickAt(e.clientX, e.clientY); hoverCb(p ? p.id : null); cv.style.cursor = p ? "pointer" : "grab"; }
      return;
    }
    const prev = ptrs.get(e.pointerId);
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) {
      if (down) down.moved += Math.abs(dx) + Math.abs(dy);
      if (st.mode === "orbit") { st.theta -= dx * 0.008; st.phi -= dy * 0.008; }
      else { st.yaw -= dx * 0.004; st.pitch += dy * 0.004; }
      apply();
    } else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch0) { zoom(pinch0 / d); }
      pinch0 = d; if (down) down.moved += 50;
    }
  }
  function onUp(e) {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch0 = 0;
    if (ptrs.size === 0 && down) {
      if (down.moved < 8 && performance.now() - down.t < 700 && pickCb) { pickCb(pickAt(e.clientX, e.clientY)); }
      down = null;
    }
  }
  function zoom(f) {
    if (st.mode === "orbit") st.r *= f; else st.fov *= f;
    apply();
  }
  function onWheel(e) { e.preventDefault(); zoom(1 + Math.sign(e.deltaY) * 0.08); }
  function onKey(e) {
    if (/input|textarea|select/i.test((e.target || {}).tagName || "")) return;
    const k = e.key;
    if (k === "ArrowLeft") { if (st.mode === "orbit") st.theta += 0.12; else st.yaw -= 0.12; apply(); }
    else if (k === "ArrowRight") { if (st.mode === "orbit") st.theta -= 0.12; else st.yaw += 0.12; apply(); }
    else if (k === "ArrowUp") { if (st.mode === "orbit") st.phi -= 0.1; else st.pitch += 0.08; apply(); }
    else if (k === "ArrowDown") { if (st.mode === "orbit") st.phi += 0.1; else st.pitch -= 0.08; apply(); }
    else if (k === "+" || k === "=") zoom(0.9);
    else if (k === "-") zoom(1.1);
  }
  cv.addEventListener("pointerdown", onDown);
  cv.addEventListener("pointermove", onMove);
  cv.addEventListener("pointerup", onUp);
  cv.addEventListener("pointercancel", onUp);
  cv.addEventListener("pointerleave", () => hoverCb && hoverCb(null));
  cv.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("keydown", onKey);

  const api = {
    THREE: T, scene, camera, renderer, el, st,
    add(obj, pickId) {
      scene.add(obj);
      if (pickId) { obj.userData.pick = pickId; obj.traverse((m) => { if (m.isMesh) pickables.push(m); }); }
      dirty = true; return obj;
    },
    makePickable(obj, id) { obj.userData.pick = id; obj.traverse((m) => { if (m.isMesh && !pickables.includes(m)) pickables.push(m); }); },
    onPick(fn) { pickCb = fn; },
    onHover(fn) { hoverCb = fn; },
    zoom, refresh() { dirty = true; },
    rotate(d) { if (st.mode === "orbit") st.theta += d; else st.yaw += d; apply(); },
    tilt(d) { if (st.mode === "orbit") st.phi += d; else st.pitch -= d; apply(); },
    panY(d) { st.target.y += d; apply(); },
    setTarget(t, r) { st.target.set(t[0], t[1], t[2]); if (r) st.r = r; apply(); },
    moveTo(p, yaw, pitch) { st.pos.set(p[0], p[1], p[2]); if (yaw !== undefined) st.yaw = yaw; if (pitch !== undefined) st.pitch = pitch; apply(); },
    reset() {
      st.target.fromArray(home.t); st.theta = home.theta; st.phi = home.phi; st.r = home.r;
      st.pos.fromArray(home.pos); st.yaw = home.yaw; st.pitch = home.pitch; st.fov = home.fov; apply();
    },
    animate(fn) { anims.add(fn); },
    stopAnim(fn) { anims.delete(fn); },
    addLabel, clearLabels,
    dispose() {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      document.removeEventListener("keydown", onKey);
      scene.traverse((m) => {
        if (m.geometry) m.geometry.dispose();
        if (m.material) { (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { if (mt.map) mt.map.dispose(); mt.dispose(); }); }
      });
      renderer.dispose();
      cv.remove(); labels.remove();
    }
  };
  resize(); apply(); loop();
  return api;
}

// Realce (emissivo) de um grupo inteiro
function setGlow(obj, color, intensity = 0.55) {
  obj.traverse((m) => {
    if (!m.isMesh || !m.material || !m.material.emissive) return;
    if (m.userData.baseEm === undefined) m.userData.baseEm = m.material.emissive.getHex();
    if (color === null) m.material.emissive.setHex(m.userData.baseEm);
    else { m.material.emissive.setHex(color); m.material.emissiveIntensity = intensity; }
  });
}
function setOpacity(obj, op) {
  obj.traverse((m) => {
    if (!m.isMesh || !m.material) return;
    if (m.userData.baseOp === undefined) m.userData.baseOp = m.material.opacity;
    const v = op === null ? m.userData.baseOp : op;
    m.material.opacity = v; m.material.transparent = v < 1; m.material.depthWrite = v > 0.5;
  });
}

// Barra de controles de câmera padrão (para todas as cenas 3D)
function camControlsHtml(extra = "") {
  return `<div class="cam-ctrl">
    <button onclick="LABV&&LABV.rotate(0.35)" aria-label="Girar para a esquerda">⟲</button>
    <button onclick="LABV&&LABV.rotate(-0.35)" aria-label="Girar para a direita">⟳</button>
    <button onclick="LABV&&LABV.tilt(-0.2)" aria-label="Inclinar para cima">⤒</button>
    <button onclick="LABV&&LABV.tilt(0.2)" aria-label="Inclinar para baixo">⤓</button>
    <button onclick="LABV&&LABV.zoom(0.85)" aria-label="Aproximar">＋</button>
    <button onclick="LABV&&LABV.zoom(1.15)" aria-label="Afastar">－</button>
    <button onclick="LABV&&LABV.reset()" aria-label="Recentralizar">◎</button>
    ${extra}
  </div>`;
}
