/* MedQuest Lab — ambientes em primeira pessoa: sala hospitalar realista, mãos com luvas e HUD de jogo. */
"use strict";

// Sala com piso vinílico, paredes com faixa de proteção, teto modular com luminárias e janela.
function roomShell(v, o = {}) {
  const W = o.w || 6, D = o.d || 5, H = o.h || 2.8, T = THREE;
  const floorTex = TEXTURES.tile([W / 1.2, D / 1.2]);
  const floor = new T.Mesh(new T.PlaneGeometry(W, D), mkMat(o.floor || "#c9d0d6", { map: floorTex, rough: 0.32, clearcoat: 0.5, ccRough: 0.35 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; floor.userData.noShadow = true;
  v.add(floor); floor.receiveShadow = true;
  const wallMat = mkMat(o.wall || "#eef1f4", { map: TEXTURES.wall([3, 1.4]), rough: 0.85 });
  const lower = mkMat(o.wainscot || "#9fb3c8", { rough: 0.6 });
  const wall = (p, s) => { const m = new T.Mesh(new T.BoxGeometry(s[0], s[1], s[2]), wallMat); m.position.set(p[0], p[1], p[2]); m.receiveShadow = true; m.userData.noShadow = true; v.add(m); return m; };
  wall([0, H / 2, -D / 2], [W, H, 0.06]); wall([-W / 2, H / 2, 0], [0.06, H, D]); wall([W / 2, H / 2, 0], [0.06, H, D]);
  // Faixa inferior lavável + corrimão de proteção
  [[0, -D / 2 + 0.035, W, 0], [-W / 2 + 0.035, 0, D, Math.PI / 2], [W / 2 - 0.035, 0, D, Math.PI / 2]].forEach(([x, z, len, r]) => {
    const b = new T.Mesh(new T.BoxGeometry(len, 0.9, 0.012), lower); b.position.set(x, 0.45, z); b.rotation.y = r; b.userData.noShadow = true; v.add(b);
    const rail = new T.Mesh(new T.BoxGeometry(len, 0.08, 0.04), mkMat("#d7dee6", { rough: 0.4, clearcoat: 0.4 })); rail.position.set(x, 0.92, z); rail.rotation.y = r; rail.userData.noShadow = true; v.add(rail);
    const base = new T.Mesh(new T.BoxGeometry(len, 0.1, 0.02), mkMat("#5b6774", { rough: 0.5 })); base.position.set(x, 0.05, z); base.rotation.y = r; base.userData.noShadow = true; v.add(base);
  });
  // Divisória de vidro na frente (de onde o jogador observa)
  const glass = mBox([0, H / 2, D / 2], [W, H, 0.03], "#cfe7f5", { opacity: 0.12, rough: 0.05 }); glass.userData.noShadow = true; v.add(glass);
  // Teto modular com luminárias
  const ceil = new T.Mesh(new T.PlaneGeometry(W, D), mkMat("#f3f4f6", { map: TEXTURES.ceiling([W / 0.6, D / 0.6]), rough: 0.9 }));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = H; ceil.userData.noShadow = true; v.add(ceil);
  const lights = o.lights || [[-1.4, -0.8], [1.4, -0.8], [-1.4, 1.1], [1.4, 1.1]];
  lights.forEach(([x, z]) => {
    const pnl = new T.Mesh(new T.BoxGeometry(1.1, 0.02, 0.55), new T.MeshBasicMaterial({ color: new T.Color("#ffffff").multiplyScalar(1.6), toneMapped: false }));
    pnl.position.set(x, H - 0.012, z); pnl.userData.noShadow = true; v.add(pnl);
    const fr = mBox([x, H - 0.006, z], [1.16, 0.012, 0.61], "#cbd2da", { rough: 0.4 }); fr.userData.noShadow = true; v.add(fr);
  });
  [[-1.4, 0.15], [1.4, 0.15]].forEach(([x, z]) => { const pl = new T.PointLight(0xfff6ea, 0.22, 7, 2); pl.position.set(x, H - 0.25, z); v.scene.add(pl); });
  // Janela com vista externa
  if (o.window !== false) {
    const win = mPlane([-W / 2 + 0.04, 1.55, -0.6], [1.6, 1.1], TEXTURES.window(), { r: [0, Math.PI / 2, 0] }); v.add(win);
    const frm = new T.Group();
    [[0, 0.57, 1.7, 0.05], [0, -0.57, 1.7, 0.08], [0, 0, 0.04, 1.1]].forEach(([y, yy, w, h], i) => { const b = mBox([0, 0, 0], [0.06, i === 2 ? 1.14 : h, i === 2 ? w : w], "#e5e9ee", { rough: 0.4 }); b.position.set(0, i === 2 ? 0 : yy, 0); frm.add(b); });
    frm.position.set(-W / 2 + 0.05, 1.55, -0.6); v.add(frm);
    const sill = mBox([-W / 2 + 0.12, 0.98, -0.6], [0.18, 0.04, 1.75], "#e5e9ee", { rough: 0.35 }); v.add(sill);
  }
  // Placa do setor
  if (o.label) v.add(mPlane([0, H - 0.3, -D / 2 + 0.04], [1.8, 0.28], textTex(o.label, { bg: "#0f2b3a", fg: "#e6fbff", size: 64, w: 768 })));
  // Tomadas/gases na parede do fundo (régua de leito)
  if (o.headwall !== false) {
    const hw = mBox([0, 1.45, -D / 2 + 0.06], [W * 0.8, 0.16, 0.06], "#dde3ea", { rough: 0.35, clearcoat: 0.3 }); v.add(hw);
    for (let i = 0; i < 6; i++) { const x = -W * 0.35 + i * (W * 0.7 / 5); v.add(mCyl([x, 1.45, -D / 2 + 0.09], [x, 1.45, -D / 2 + 0.11], 0.025, ["#16a34a", "#e5e7eb", "#facc15", "#e5e7eb", "#16a34a", "#e5e7eb"][i], { r: 0 })); }
  }
}

// Mãos com luvas de procedimento presas à câmera (primeira pessoa)
function fpHands(v, o = {}) {
  const T = THREE, glove = mkMat(o.glove || "#1d4fb0", { rough: 0.55, env: 0.3 });
  const sleeve = mkMat(o.sleeve || "#2c6e8f", { rough: 0.9, map: TEXTURES.fabric([2, 2]) });
  const hand = (k) => {
    const g = new T.Group();
    const arm = new T.Mesh(varTubeGeo([[0, 0, 0.32], [0, 0.01, 0.12], [0, 0.015, 0]], (t) => 0.03 + 0.008 * (1 - t), { radial: 18 }), glove); g.add(arm);
    const palm = mEll([0, 0.012, -0.045], [0.042, 0.018, 0.055], null, { material: glove }); g.add(palm);
    [-0.027, -0.009, 0.009, 0.026].forEach((x, i) => {
      const L = [0.05, 0.058, 0.055, 0.045][i];
      const f = new T.Mesh(varTubeGeo([[x, 0.012, -0.09], [x * 1.08, 0.006, -0.09 - L * 0.55], [x * 1.12, -0.012, -0.09 - L]], (t) => 0.0095 - t * 0.0025, { radial: 10 }), glove); g.add(f);
      g.add(mEll([x * 1.12, -0.012, -0.09 - L], [0.0072, 0.0072, 0.0072], null, { material: glove }));
    });
    const th = new T.Mesh(varTubeGeo([[-k * 0.035, 0.005, -0.03], [-k * 0.055, 0.0, -0.06], [-k * 0.058, -0.008, -0.09]], (t) => 0.012 - t * 0.003, { radial: 10 }), glove); g.add(th);
    g.scale.setScalar(0.85); g.position.set(k * 0.22, -0.2, -0.45); g.rotation.set(0.6, -k * 0.3, k * 0.25);
    g.userData.base = { p: g.position.clone(), r: g.rotation.clone() };
    return g;
  };
  const R = hand(1), L = hand(-1);
  [R, L].forEach((h) => { h.traverse((m) => { if (m.isMesh) { m.renderOrder = 20; m.material.depthTest = true; } }); v.camera.add(h); });
  let poke = 0;
  v.animate((t) => {
    const s = Math.sin(t / 900) * 0.004, moving = v.st.mode === "look";
    [R, L].forEach((h, i) => { const b = h.userData.base; h.position.y = b.p.y + s * (i ? -1 : 1); });
    if (poke) { const f = Math.max(0, 1 - (t - poke) / 380); R.position.z = R.userData.base.p.z - Math.sin(f * Math.PI) * 0.09; if (!f) poke = 0; }
    return moving;
  });
  return { poke() { poke = performance.now(); } };
}

// ECG animado (SVG) para os cartões de sinais vitais
function ecgPath(phase, w = 100, h = 22, hr = 80) {
  const beat = 60 / hr, pts = [];
  for (let x = 0; x <= w; x += 1) {
    const t = ((x / w) * 2.2 + phase) % beat / beat;
    let y = 0;
    if (t > 0.1 && t < 0.18) y = -2 * Math.sin(((t - 0.1) / 0.08) * Math.PI);
    else if (t > 0.22 && t < 0.24) y = 2;
    else if (t > 0.24 && t < 0.28) y = -9;
    else if (t > 0.28 && t < 0.31) y = 4;
    else if (t > 0.42 && t < 0.56) y = -3 * Math.sin(((t - 0.42) / 0.14) * Math.PI);
    pts.push(`${x},${(h / 2 + y).toFixed(1)}`);
  }
  return pts.join(" ");
}
function fpVitalsHtml(vt) {
  if (!vt) return "";
  return `<div class="fp-vitals">
    <div class="vcard"><small>FC</small><b id="vt-hr">${vt.hr}<em>bpm</em></b><svg viewBox="0 0 100 22" preserveAspectRatio="none"><polyline id="vt-ecg" fill="none" stroke="#4ade80" stroke-width="1.4" points="${ecgPath(0, 100, 22, vt.hr)}"/></svg></div>
    <div class="vcard cy"><small>SpO₂</small><b id="vt-sat">${vt.sat}<em>%</em></b></div>
    <div class="vcard ${vt.pas < 90 ? "red" : "yl"}"><small>PA</small><b>${vt.pas}/${vt.pad}<em>mmHg</em></b></div>
    ${vt.fr ? `<div class="vcard"><small>FR</small><b>${vt.fr}<em>irpm</em></b></div>` : ""}
    ${vt.t ? `<div class="vcard yl"><small>Temp</small><b>${vt.t}<em>°C</em></b></div>` : ""}
  </div>`;
}
function fpVitalsTick(vt) {
  if (!vt) return;
  let ph = 0;
  LABT.push(setInterval(() => {
    if (LABCTX && LABCTX.pausedAt) return;
    ph += 0.06; const e = document.getElementById("vt-ecg"); if (e) e.setAttribute("points", ecgPath(ph, 100, 22, vt.hr));
    if (Math.random() < 0.05) { const h = document.getElementById("vt-hr"); if (h) h.innerHTML = `${vt.hr + Math.round((Math.random() - 0.5) * 4)}<em>bpm</em>`; }
  }, 60));
}
// HUD completo: sinais vitais, cronômetro, objetivos, pontuação e barra de ferramentas com atalhos
function fpHudHtml(o) {
  return `<div class="fp-hud">
    ${fpVitalsHtml(o.vitals)}
    <div class="fp-timer"><small>${o.timerLabel || "TEMPO"}</small><span id="fp-time">00:00</span></div>
    <div class="fp-obj"><b>Objetivos da simulação</b><ul id="fp-obj">${(o.objectives || []).map((t) => `<li>☐ ${esc(t)}</li>`).join("")}</ul></div>
    <div class="fp-score"><div><small>PONTOS</small><b id="fp-score">0</b></div><div><small>${o.metaLabel || "ACHADOS"}</small><b id="fp-meta">${o.meta || "0"}</b></div></div>
    <div class="hotbar">${(o.tools || []).map((t) => `<button onclick="${t.run}" title="${esc(t.n)} (${t.k})" aria-label="${esc(t.n)}"><kbd>${t.k}</kbd>${t.i}<small>${esc(t.n)}</small></button>`).join("")}</div>
    ${o.crosshair ? `<div class="crosshair"></div>` : ""}
  </div>`;
}
function fpObjectives(list) {
  const ul = document.getElementById("fp-obj"); if (!ul) return;
  ul.innerHTML = list.map(([t, done]) => `<li class="${done ? "done" : ""}">${done ? "☑" : "☐"} ${esc(t)}</li>`).join("");
}
function fpSet(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }
