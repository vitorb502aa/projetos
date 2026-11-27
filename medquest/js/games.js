/* MedQuest: modos de jogo. */
"use strict";

let G = null;      // jogo em andamento
let timers = [];   // timeouts do jogo atual
const clearTimers = () => { timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); timers = []; };

// ---------- Fases dos mundos ----------
function start(wid, key) {
  const w = worldById(wid);
  if (!w) return;
  S.ui.last = { w: wid, k: key }; save();
  const base = { worldId: wid, stageKey: key, back: () => go("world", wid), restart: () => start(wid, key), xp: 0, bestCombo: 0, combo: 0 };
  if (key === "flash") {
    // Até 12 cards por rodada: primeiro os nunca estudados, depois os que vencem antes.
    const ids = w.flashcards.map((_, i) => `${w.id}:${i}`);
    const fresh = shuffle(ids.filter((id) => !S.srs[id]));
    const seen = ids.filter((id) => S.srs[id]).sort((a, b) => S.srs[a].due - S.srs[b].due);
    return startFlashRunner(Object.assign(base, { title: `${w.icon} ${w.name} · Flashcards`, queue: shuffle(fresh.concat(seen).slice(0, 12)) }));
  }
  if (key === "quiz") {
    return startQRunner(Object.assign(base, {
      title: `${w.icon} ${w.name} · Quiz`, hearts: 3,
      items: shuffle(w.quiz.map((it, i) => ({ ...it, errKey: `${w.id}:quiz:${i}`, tag: w.name }))).slice(0, 10)
    }));
  }
  if (key === "tf") {
    G = Object.assign(base, {
      mode: "tf", title: `${w.icon} ${w.name} · Verdadeiro ou Falso`, idx: 0, correct: 0, answered: false,
      items: shuffle(w.tf.map((it, i) => prepItem({ q: it.s, o: ["Verdadeiro", "Falso"], a: it.v ? 0 : 1, e: it.e, noShuffle: true, errKey: `${w.id}:tf:${i}`, tag: w.name }))).slice(0, 10)
    });
    return beginTfItem();
  }
  if (key === "pairs") {
    const pairs = shuffle(w.pairs).slice(0, 6).map((p, i) => ({ id: i, l: p[0], r: p[1] }));
    G = Object.assign(base, { mode: "pairs", title: `${w.icon} ${w.name} · Ligue os pares`, left: shuffle(pairs), right: shuffle(pairs), matched: [], selL: null, selR: null, wrong: null, mistakes: 0 });
    return renderGame();
  }
  if (key === "puzzle") {
    return startPuzzle(Object.assign(base, { title: `${w.icon} ${w.name} · Quebra-cabeça`, puzzles: shuffle(w.seq).slice(0, 2) }));
  }
  if (key === "boss") {
    const c = w.cases[Math.floor(Math.random() * w.cases.length)];
    return startQRunner(Object.assign(base, {
      title: `👑 Chefão · ${c.title}`, hearts: 2, story: c.story,
      items: c.steps.map((it, i) => ({ ...it, errKey: `${w.id}:case:${c.title}:${i}`, tag: `${w.name} · caso clínico` }))
    }));
  }
}

function startReview() {
  const q = shuffle(dueCards());
  if (!q.length) return toast("Nada para revisar agora. 👌");
  startFlashRunner({ title: "🔁 Revisão do dia", queue: q, back: () => go("review"), restart: null, xp: 0, review: true });
}
function startCustom() {
  if (!S.custom.length) return;
  startFlashRunner({ title: "🃏 Meus cards", queue: shuffle(S.custom.map((c) => c.id)), back: () => go("materials"), restart: startCustom, xp: 0, review: true });
}
function filteredErrors() {
  let list = S.errors.slice();
  if (S.ui.errTag) list = list.filter((e) => e.tag === S.ui.errTag);
  if (S.ui.errSort === "count") list.sort((a, b) => (b.count || 1) - (a.count || 1) || b.at - a.at);
  else if (S.ui.errSort === "recent") list.sort((a, b) => b.at - a.at);
  else list = shuffle(list);
  return list;
}
function startErrors() {
  const list = filteredErrors().slice(0, 15);
  if (!list.length) return;
  startQRunner({ title: "❌ Caderno de erros", hearts: Infinity, errorsMode: true, showTag: true, items: list.map((e) => ({ ...e })), back: () => go("review"), restart: startErrors, xp: 0, combo: 0, bestCombo: 0 });
}
function startPuzzleArcade() {
  const all = [];
  allWorlds().forEach((w) => (w.seq || []).forEach((s) => all.push({ ...s, tag: w.name })));
  if (!all.length) return toast("Nenhum quebra-cabeça disponível.");
  startPuzzle({ title: "🧩 Quebra-cabeças", puzzles: shuffle(all).slice(0, 4), arcade: true, showTag: true, back: () => go("arena"), restart: startPuzzleArcade, xp: 0, combo: 0, bestCombo: 0 });
}

// ---------- Flashcards ----------
function startFlashRunner(cfg) {
  clearTimers();
  G = Object.assign({ mode: "flash", idx: 0, flipped: false, good: 0, rated: {}, requeued: {} }, cfg);
  G.total = G.queue.length;
  renderGame();
}
function flip() { if (G && G.mode === "flash" && !G.flipped) { G.flipped = true; sfx.flip(); renderGame(); } }
function rate(q) {
  if (!G || G.mode !== "flash" || !G.flipped) return;
  const id = G.queue[G.idx];
  S.srs[id] = srsNext(S.srs[id], q);
  S.stats.reviews++; bump("cards");
  if (!(id in G.rated)) { G.rated[id] = q; if (q >= 4) G.good++; }
  if (q < 3 && !G.requeued[id]) { G.requeued[id] = true; G.queue.push(id); }
  const gain = q < 3 ? 2 : 5;
  G.xp += gain; addXp(gain);
  q >= 3 ? sfx.ok() : sfx.bad();
  G.idx++; G.flipped = false;
  if (G.idx >= G.queue.length) return finish({ acc: G.total ? G.good / G.total : 1, correct: G.good, total: G.total });
  renderGame();
}

// ---------- Perguntas (quiz, chefão, caderno de erros) ----------
function startQRunner(cfg) {
  clearTimers();
  G = Object.assign({ mode: "q", idx: 0, correct: 0, answered: false, chosen: null, storyOpen: true }, cfg);
  G.items = G.items.map((it) => prepItem(it));
  G.maxHearts = G.hearts;
  renderGame();
}
function registerAnswer(item, ok) {
  S.stats.answered++;
  if (ok) {
    S.stats.correct++; bump("correct");
    G.correct++;
    G.combo = (G.combo || 0) + 1;
    G.bestCombo = Math.max(G.bestCombo || 0, G.combo);
    S.stats.bestCombo = Math.max(S.stats.bestCombo, G.combo);
    if (G.errorsMode) removeError(item.errKey);
    sfx.ok();
  } else {
    G.combo = 0;
    addError(item);
    sfx.bad();
  }
}
function answer(i) {
  if (!G || G.answered) return;
  const item = G.items[G.idx];
  if (G.mode === "tf") clearTimers();
  G.answered = true; G.chosen = i;
  const ok = i === item.ans;
  registerAnswer(item, ok);
  let gain = 0;
  if (ok) {
    gain = 10 + 2 * Math.min(G.combo - 1, 5);
    if (G.mode === "tf") { G.lastBonus = Math.round(Math.max(0, TF_SECONDS - (Date.now() - G.t0) / 1000)); gain += G.lastBonus; }
  } else if (G.mode === "q" && G.hearts !== Infinity) G.hearts--;
  G.lastGain = gain; G.xp += gain; addXp(gain);
  renderGame();
}
function next() {
  if (!G || !G.answered) return;
  if (G.mode === "q" && G.hearts <= 0) return finish({ failed: true, acc: 0, correct: G.correct, total: G.items.length });
  G.idx++; G.answered = false; G.chosen = null;
  if (G.idx >= G.items.length) return finish({ acc: G.correct / G.items.length, correct: G.correct, total: G.items.length });
  if (G.mode === "tf") return beginTfItem();
  renderGame();
  window.scrollTo(0, 0);
}
function beginTfItem() {
  clearTimers();
  G.t0 = Date.now(); G.answered = false; G.chosen = null;
  renderGame();
  timers.push(setTimeout(() => { if (G && G.mode === "tf" && !G.answered) answer(-1); }, TF_SECONDS * 1000));
}

// ---------- Ligue os pares ----------
function pick(side, id) {
  if (!G || G.mode !== "pairs" || G.wrong || G.matched.includes(id)) return;
  if (side === "l") G.selL = G.selL === id ? null : id; else G.selR = G.selR === id ? null : id;
  if (G.selL !== null && G.selR !== null) {
    S.stats.answered++;
    if (G.selL === G.selR) {
      G.matched.push(G.selL);
      S.stats.correct++; bump("correct");
      G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo); S.stats.bestCombo = Math.max(S.stats.bestCombo, G.combo);
      G.xp += 8; addXp(8); sfx.ok();
      G.selL = G.selR = null;
      if (G.matched.length === G.left.length) {
        const total = G.left.length;
        return timers.push(setTimeout(() => finish({ acc: total / (total + G.mistakes), correct: total, total, mistakes: G.mistakes }), 450));
      }
    } else {
      G.mistakes++; G.combo = 0; G.wrong = [G.selL, G.selR]; sfx.bad();
      renderGame();
      return timers.push(setTimeout(() => { if (G) { G.wrong = null; G.selL = G.selR = null; renderGame(); } }, 650));
    }
  }
  renderGame();
}

// ---------- Quebra-cabeça: montar a sequência ----------
function startPuzzle(cfg) {
  clearTimers();
  G = Object.assign({ mode: "puzzle", pi: 0, mistakes: 0, placedTotal: 0 }, cfg);
  G.total = G.puzzles.reduce((t, p) => t + p.items.length, 0);
  loadPuzzle();
}
function loadPuzzle() {
  const p = G.puzzles[G.pi];
  G.placed = 0; G.solved = false; G.wrongChip = null;
  let chips = shuffle(p.items.map((t, i) => ({ i, t })));
  if (chips.every((c, k) => c.i === k) && chips.length > 1) chips = chips.reverse();
  G.chips = chips;
  renderGame();
}
function place(i) {
  if (!G || G.mode !== "puzzle" || G.solved) return;
  const p = G.puzzles[G.pi];
  if (i === G.placed) {
    G.placed++; G.placedTotal++;
    G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo);
    G.xp += 4; addXp(4); sfx.ok();
    if (G.placed === p.items.length) {
      G.solved = true; S.stats.puzzles++; bump("puzzles");
      G.xp += 10; addXp(10); sfx.win();
    }
  } else {
    G.mistakes++; G.combo = 0; G.wrongChip = i; sfx.bad();
    timers.push(setTimeout(() => { if (G && G.mode === "puzzle") { G.wrongChip = null; renderGame(); } }, 500));
  }
  renderGame();
}
function nextPuzzle() {
  if (!G || !G.solved) return;
  G.pi++;
  if (G.pi >= G.puzzles.length) return finish({ acc: G.total / (G.total + G.mistakes), correct: G.puzzles.length, total: G.puzzles.length, mistakes: G.mistakes, unit: "montados" });
  loadPuzzle();
}

// ---------- Contra o relógio (também usado nos desafios entre amigos) ----------
function startClock(scope = S.ui.clockScope, seed = newSeed(), challenge = null) {
  const label = scopeLabel(scope);
  scope = concreteScope(scope);
  const rand = rng(seed);
  const pool = shuffle(questionPool(scope, ["quiz", "tf"]), rand).map((it) => prepItem(it, rand));
  if (pool.length < 4) return toast("Poucas questões nessa matéria para o modo Contra o relógio.");
  clearTimers();
  G = {
    mode: "clock", title: `⏱️ Contra o relógio · ${label}`, scope, seed, challenge,
    items: pool, idx: 0, pts: 0, correct: 0, wrongs: 0, combo: 0, bestCombo: 0, xp: 0,
    endAt: Date.now() + CLOCK_SECONDS * 1000, flash: null,
    back: () => go("arena"), restart: () => startClock(scope)
  };
  timers.push(setInterval(clockTick, 100));
  renderGame();
}
function clockTick() {
  if (!G || G.mode !== "clock") return;
  const left = G.endAt - Date.now();
  const el = document.getElementById("clock-left");
  if (el) { el.textContent = (Math.max(0, left) / 1000).toFixed(1) + "s"; el.classList.toggle("low", left < 10000); }
  const bar = document.getElementById("clock-bar");
  if (bar) bar.style.transform = `scaleX(${Math.max(0, left) / (CLOCK_SECONDS * 1000)})`;
  if (left <= 0) endClock();
}
function clockAnswer(i) {
  if (!G || G.mode !== "clock" || G.flash) return;
  const it = G.items[G.idx % G.items.length];
  const ok = i === it.ans;
  S.stats.answered++;
  if (ok) {
    G.correct++; G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo);
    S.stats.correct++; S.stats.bestCombo = Math.max(S.stats.bestCombo, G.combo); bump("correct");
    const gain = 10 + 2 * Math.min(G.combo - 1, 5);
    G.pts += gain; sfx.ok();
  } else {
    G.wrongs++; G.combo = 0; G.endAt -= 3000; addError(it); sfx.bad();
  }
  G.flash = { chosen: i, ok };
  renderGame();
  timers.push(setTimeout(() => { if (G && G.mode === "clock") { G.flash = null; G.idx++; renderGame(); } }, ok ? 350 : 900));
}
function endClock() {
  if (!G || G.mode !== "clock" || G.ended) return;
  G.ended = true;
  clearTimers();
  S.stats.clockGames++; bump("clock");
  if (G.challenge) { S.stats.battles++; bump("battle"); }
  const record = G.pts > S.records.clock;
  if (record) S.records.clock = G.pts;
  const gain = Math.round(G.pts / 3);
  G.xp = gain; addXp(gain);
  checkMedals(); save();
  showClockResult(record);
}

// ---------- Batalhas (online e no mesmo aparelho) ----------
const BATTLE_N = 10;
const BATTLE_Q_MS = 15000;
function battleItems(seed, scope) {
  const rand = rng(seed);
  return shuffle(questionPool(scope, ["quiz", "case"]), rand).slice(0, BATTLE_N).map((it) => prepItem(it, rand));
}
// cfg: { seed, scope, title, onDone(result), back }
function startBattleRun(cfg) {
  const items = battleItems(cfg.seed, cfg.scope);
  if (items.length < 5) return toast("Poucas questões nessa matéria para uma batalha.");
  clearTimers();
  G = Object.assign({ mode: "battle", items, idx: 0, pts: 0, correct: 0, ms: 0, combo: 0, bestCombo: 0, xp: 0, answered: false, chosen: null }, cfg);
  beginBattleItem();
}
function beginBattleItem() {
  clearTimers();
  G.t0 = Date.now(); G.answered = false; G.chosen = null;
  renderGame();
  timers.push(setTimeout(() => { if (G && G.mode === "battle" && !G.answered) battleAnswer(-1); }, BATTLE_Q_MS));
}
function battleAnswer(i) {
  if (!G || G.mode !== "battle" || G.answered) return;
  clearTimers();
  const it = G.items[G.idx];
  const spent = Math.min(BATTLE_Q_MS, Date.now() - G.t0);
  G.ms += spent;
  G.answered = true; G.chosen = i;
  S.stats.answered++;
  if (i === it.ans) {
    const bonus = Math.round(50 * (1 - spent / BATTLE_Q_MS));
    G.pts += 100 + bonus; G.correct++; G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo);
    S.stats.correct++; bump("correct"); sfx.ok();
    G.lastGain = 100 + bonus;
  } else { G.combo = 0; addError(it); sfx.bad(); G.lastGain = 0; }
  renderGame();
}
function battleNext() {
  if (!G || G.mode !== "battle" || !G.answered) return;
  G.idx++;
  if (G.idx >= G.items.length) {
    const res = { pts: G.pts, ok: G.correct, ms: G.ms, at: Date.now() };
    S.stats.battles++; bump("battle");
    const gain = 10 + G.correct * 3;
    addXp(gain); checkMedals(); save();
    const cb = G.onDone; G = null;
    return cb(res, gain);
  }
  beginBattleItem();
}

// Batalha no mesmo aparelho (passa o celular)
let LOCAL = null;
function startLocalBattle() {
  const a = (document.getElementById("lb-a") || {}).value || "Jogador 1";
  const b = (document.getElementById("lb-b") || {}).value || "Jogador 2";
  const scope = concreteScope((document.getElementById("lb-scope") || {}).value || "all");
  LOCAL = { names: [a.trim() || "Jogador 1", b.trim() || "Jogador 2"], seed: newSeed(), scope, res: [] };
  runLocalTurn();
}
function runLocalTurn() {
  const k = LOCAL.res.length;
  if (k === 2) return showLocalResult();
  const name = LOCAL.names[k];
  G = { mode: "handoff" };
  $app.innerHTML = `
    <div class="result">
      <div class="big-emoji pop">${k === 0 ? "⚔️" : "📱"}</div>
      <h1>${k === 0 ? "Batalha no mesmo aparelho" : "Passe o aparelho!"}</h1>
      <p>Vez de <b>${esc(name)}</b>: ${BATTLE_N} questões de ${esc(scopeLabel(LOCAL.scope))}. Quanto mais rápido acertar, mais pontos.</p>
      <div class="col"><button class="btn primary block" id="go-turn">Estou pronto(a)</button>
      <button class="btn ghost block" onclick="G=null;LOCAL=null;go('arena')">Cancelar</button></div>
    </div>`;
  document.getElementById("go-turn").onclick = () => startBattleRun({
    seed: LOCAL.seed, scope: LOCAL.scope, title: `⚔️ ${name}`, back: () => { LOCAL = null; go("arena"); },
    onDone: (res) => { LOCAL.res.push(res); runLocalTurn(); }
  });
}
function showLocalResult() {
  const [ra, rb] = LOCAL.res;
  const win = ra.pts === rb.pts ? -1 : ra.pts > rb.pts ? 0 : 1;
  G = { mode: "result" };
  if (win >= 0) { confetti(); sfx.win(); }
  $app.innerHTML = `
    <div class="result">
      <div class="big-emoji pop">🏆</div>
      <h1>${win < 0 ? "Empate!" : `${esc(LOCAL.names[win])} venceu!`}</h1>
      <div class="vs">
        ${[0, 1].map((k) => `<div class="vs-side ${win === k ? "win" : ""}"><b>${esc(LOCAL.names[k])}</b><span>${LOCAL.res[k].pts}</span><small>${LOCAL.res[k].ok}/${BATTLE_N} acertos · ${(LOCAL.res[k].ms / 1000).toFixed(0)} s</small></div>`).join('<div class="vs-x">VS</div>')}
      </div>
      <div class="col"><button class="btn primary block" onclick="startLocalRematch()">Revanche</button>
      <button class="btn ghost block" onclick="G=null;LOCAL=null;go('arena')">Voltar à Arena</button></div>
    </div>`;
}
function startLocalRematch() { LOCAL = { names: LOCAL.names, seed: newSeed(), scope: LOCAL.scope, res: [] }; runLocalTurn(); }

// ---------- Simulado ----------
function startSim() {
  const picked = Object.keys(SIMCFG.worlds).filter((k) => SIMCFG.worlds[k]);
  if (!picked.length) return toast("Escolha pelo menos uma matéria.");
  let pool = [];
  picked.forEach((wid) => { pool = pool.concat(questionPool(wid, ["quiz", "case"])); });
  pool = shuffle(pool).slice(0, SIMCFG.n).map((it) => prepItem(it));
  if (pool.length < 5) return toast("Poucas questões nas matérias escolhidas. Adicione mais matérias.");
  clearTimers();
  G = {
    mode: "sim", title: "📝 Simulado", items: pool, idx: 0, picks: pool.map(() => null), flags: pool.map(() => false),
    endAt: SIMCFG.timed ? Date.now() + pool.length * 90 * 1000 : 0, startAt: Date.now(), xp: 0,
    back: () => go("simcfg"), restart: null
  };
  if (G.endAt) timers.push(setInterval(simTick, 500));
  renderGame();
}
function simTick() {
  if (!G || G.mode !== "sim") return;
  const left = G.endAt - Date.now();
  const el = document.getElementById("sim-left");
  if (el) { el.textContent = fmtTime(left); el.classList.toggle("low", left < 5 * MIN); }
  if (left <= 0) { toast("⏰ Tempo esgotado! Corrigindo o simulado."); finishSim(); }
}
function simPick(i) { if (G && G.mode === "sim") { G.picks[G.idx] = i; renderGame(); } }
function simGo(i) { if (G && G.mode === "sim" && i >= 0 && i < G.items.length) { G.idx = i; renderGame(); window.scrollTo(0, 0); } }
function simFlag() { if (G && G.mode === "sim") { G.flags[G.idx] = !G.flags[G.idx]; renderGame(); } }
function simSubmit() {
  const blank = G.picks.filter((p) => p === null).length;
  ask(blank ? `Você deixou ${blank} questão(ões) em branco. Finalizar mesmo assim?` : "Finalizar e corrigir o simulado?", [{ label: "Finalizar", run: finishSim }]);
}
function finishSim() {
  if (!G || G.mode !== "sim") return;
  clearTimers();
  const g = G;
  const bySub = {};
  let ok = 0;
  g.items.forEach((it, k) => {
    const right = g.picks[k] === it.ans;
    S.stats.answered++;
    if (right) { ok++; S.stats.correct++; } else addError(it);
    const b = bySub[it.tag] || (bySub[it.tag] = { ok: 0, n: 0 });
    b.n++; if (right) b.ok++;
  });
  bump("correct", ok);
  const pct = Math.round((ok / g.items.length) * 100);
  S.stats.sims++; bump("sim");
  S.sims.unshift({ at: Date.now(), n: g.items.length, ok, pct, ms: Date.now() - g.startAt, subs: Object.keys(bySub).slice(0, 6) });
  S.sims = S.sims.slice(0, 20);
  const gain = 20 + ok * 3;
  addXp(gain); checkMedals(); save();
  if (pct >= 70) { confetti(); sfx.win(); }
  G = { mode: "result" };
  $app.innerHTML = `
    <div class="sim-result">
      <div class="result-top">
        <div class="big-emoji pop">${pct >= 70 ? "🎉" : pct >= 50 ? "📈" : "📚"}</div>
        <h1>${pct}% de acerto</h1>
        <p>${ok} de ${g.items.length} questões · ${fmtTime(Date.now() - g.startAt)} · +${gain} XP</p>
      </div>
      <h2 class="sec">Desempenho por matéria</h2>
      <div class="panel">
        ${Object.entries(bySub).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n).map(([t, b]) => {
          const p = Math.round((b.ok / b.n) * 100);
          return `<div class="subrow"><span>${esc(t)}</span><span class="bar small"><span style="width:${p}%;background:${p >= 70 ? "var(--ok)" : p >= 50 ? "var(--gold)" : "var(--bad)"}"></span></span><b>${b.ok}/${b.n}</b></div>`;
        }).join("")}
        <p class="muted-txt small">As matérias com menor acerto aparecem primeiro. Os erros foram para o caderno de erros.</p>
      </div>
      <h2 class="sec">Correção</h2>
      <div class="review-list">
        ${g.items.map((it, k) => {
          const right = g.picks[k] === it.ans;
          return `<details class="rev ${right ? "ok" : "bad"}"><summary><span>${right ? "✅" : g.picks[k] === null ? "⬜" : "❌"} ${k + 1}.</span> ${esc(it.q.length > 110 ? it.q.slice(0, 110) + "…" : it.q)}</summary>
            <p>${esc(it.q)}</p>
            <p>Sua resposta: <b>${g.picks[k] === null ? "em branco" : esc(it.opts[g.picks[k]])}</b></p>
            ${right ? "" : `<p>Correta: <b>${esc(it.opts[it.ans])}</b></p>`}
            <p class="muted-txt">${esc(it.e)}</p></details>`;
        }).join("")}
      </div>
      <div class="col" style="margin:16px 0 30px">
        ${S.errors.length ? `<button class="btn danger block" onclick="G=null;go('review')">Revisar meus erros</button>` : ""}
        <button class="btn primary block" onclick="G=null;go('simcfg')">Voltar</button>
      </div>
    </div>`;
  window.scrollTo(0, 0);
}

// ---------- Fim de fase ----------
function finish(res) {
  clearTimers();
  const g = G;
  let stars = 0;
  if (g.worldId && !res.failed) stars = res.acc >= 0.9 ? 3 : res.acc >= 0.7 ? 2 : res.acc >= 0.5 ? 1 : 0;
  let bonus = 0, newRecord = false;
  if (g.worldId) {
    const k = `${g.worldId}:${g.stageKey}`;
    const prev = S.stages[k] || 0;
    if (stars > prev) { S.stages[k] = stars; newRecord = prev > 0; }
    if (stars) bump("stages");
    if (stars === 3) bump("perfect");
    if (g.stageKey === "boss" && stars) S.stats.bosses++;
    bonus = stars * 10 + (g.stageKey === "boss" && stars ? 40 : 0);
    const w = worldById(g.worldId);
    if (w && !S.mastery[w.id] && stagesOf(w).every((st) => starsOf(w.id, st.key) >= 3)) {
      S.mastery[w.id] = Date.now(); bonus += 100;
      toast(`🏆 Domínio de <b>${esc(w.name)}</b>! +100 XP`, "gold");
    }
  }
  if (g.errorsMode) bonus = res.correct * 3;
  g.xp += bonus; addXp(bonus);
  checkMedals(); save();

  const passed = g.worldId ? stars >= 1 : !res.failed;
  if (stars === 3) { confetti(); sfx.win(); } else if (passed) sfx.win();
  const emoji = res.failed ? "💔" : stars === 3 ? "🏆" : passed ? "🎉" : "💪";
  const title = res.failed ? "Sem vidas!" : g.worldId ? (stars ? "Fase concluída!" : "Quase lá!") : g.review ? "Revisão concluída!" : g.errorsMode ? "Erros revisados!" : "Muito bem!";
  const sub = res.failed ? "Revise as explicações e tente de novo. Errar faz parte do aprendizado."
    : g.worldId && !stars ? "Faça pelo menos 50% para ganhar 1 estrela e liberar a próxima fase."
    : g.review ? "Os cards foram reagendados para o momento ideal."
    : g.errorsMode ? `${S.errors.length} questão(ões) restante(s) no caderno.`
    : stars === 3 ? "Desempenho perfeito!" : "Bom trabalho! Busque as 3 estrelas.";
  G = { mode: "result" };
  $app.innerHTML = `
    <div class="result">
      <div class="big-emoji pop">${emoji}</div>
      <h1>${title}</h1>
      ${g.worldId ? `<div class="res-stars">${[1, 2, 3].map((n) => `<span class="${n <= stars ? "on" : ""}" style="animation-delay:${n * 0.2}s">★</span>`).join("")}</div>` : ""}
      ${newRecord ? `<div class="badge">Novo recorde!</div>` : ""}
      <p>${esc(sub)}</p>
      <div class="res-grid">
        <div><b>${res.correct}/${res.total}</b><small>${g.mode === "flash" ? "lembrei de primeira" : res.unit || "acertos"}</small></div>
        <div><b>+${g.xp}</b><small>XP ganho</small></div>
        ${res.mistakes !== undefined ? `<div><b>${res.mistakes}</b><small>erros</small></div>` : `<div><b>${g.bestCombo || 0}</b><small>combo máx.</small></div>`}
      </div>
      <div class="col">
        <button class="btn primary block" id="res-continue">Continuar</button>
        ${g.restart ? `<button class="btn ghost block" id="res-again">Jogar de novo</button>` : ""}
      </div>
    </div>`;
  document.getElementById("res-continue").onclick = () => { G = null; g.back(); };
  const again = document.getElementById("res-again");
  if (again) again.onclick = () => { G = null; g.restart(); };
}

function showClockResult(record) {
  const g = G;
  const ch = g.challenge;
  let versus = "";
  if (ch) {
    const win = g.pts > ch.p ? 1 : g.pts < ch.p ? -1 : 0;
    if (win > 0) { confetti(); sfx.win(); }
    versus = `
      <div class="vs">
        <div class="vs-side ${win < 0 ? "win" : ""}"><b>${esc(ch.n || "Amigo(a)")}</b><span>${ch.p}</span><small>${ch.k} acertos</small></div>
        <div class="vs-x">VS</div>
        <div class="vs-side ${win > 0 ? "win" : ""}"><b>Você</b><span>${g.pts}</span><small>${g.correct} acertos</small></div>
      </div>
      <h2 class="vs-title">${win > 0 ? "Você venceu o desafio! 🏆" : win < 0 ? "Seu amigo venceu desta vez 💪" : "Empate!"}</h2>`;
  } else if (record) { confetti(); sfx.win(); }
  const code = challengeCode({ s: g.seed, sc: g.scope, p: g.pts, k: g.correct, n: S.nick || "Estudante" });
  G = { mode: "result" };
  $app.innerHTML = `
    <div class="result">
      <div class="big-emoji pop">⏱️</div>
      <h1>${g.pts} pontos</h1>
      ${record ? `<div class="badge">Novo recorde!</div>` : `<p>Recorde: ${S.records.clock} pontos</p>`}
      ${versus}
      <div class="res-grid">
        <div><b>${g.correct}</b><small>acertos</small></div>
        <div><b>${g.wrongs}</b><small>erros (−3 s cada)</small></div>
        <div><b>+${g.xp}</b><small>XP ganho</small></div>
      </div>
      <div class="panel share">
        <b>${ch ? "Devolva o desafio" : "Desafie um amigo"}</b>
        <small>Envie este código. Seu amigo joga as mesmas perguntas e compara a pontuação com a sua.</small>
        <div class="code-row"><input id="code-out" readonly value="${esc(code)}"><button class="btn accent" onclick="copyText(document.getElementById('code-out').value,'code-out')">Copiar</button></div>
      </div>
      <div class="col">
        <button class="btn primary block" onclick="G=null;startClock('${esc(g.scope)}')">Jogar de novo</button>
        <button class="btn ghost block" onclick="G=null;go('arena')">Voltar à Arena</button>
      </div>
    </div>`;
}

function quit() {
  if (!G) return;
  if (G.mode === "result" || G.mode === "handoff") { G = null; LOCAL = null; return go(view.name === "world" ? "world" : view.name, view.arg); }
  const back = G.back;
  const leave = () => { clearTimers(); G = null; LOCAL = null; back(); };
  const started = G.idx > 0 || (G.matched && G.matched.length) || G.placedTotal > 0 || G.mode === "clock" || G.mode === "sim";
  if (started) return ask(G.mode === "sim" ? "Sair do simulado? Suas respostas serão perdidas." : "Sair? O progresso desta rodada será perdido, mas o XP ganho fica.", [{ label: "Sair", cls: "danger", run: leave }]);
  leave();
}

// ---------- Renderização dos jogos ----------
function gameTop(progress, extra = "") {
  return `
    <div class="game-top">
      <button class="icon-btn" onclick="quit()" aria-label="Sair">✕</button>
      <div class="bar grow"><span style="width:${Math.round(progress * 100)}%"></span></div>
      ${extra}
    </div>
    <div class="game-title">${esc(G.title)}</div>`;
}
const heartsHtml = () => (G.hearts === Infinity || G.hearts === undefined) ? "" :
  `<span class="hearts">${"❤️".repeat(Math.max(0, G.hearts))}${"🤍".repeat(Math.max(0, G.maxHearts - G.hearts))}</span>`;
const comboHtml = () => G.combo >= 2 ? `<span class="combo">🔥x${G.combo}</span>` : "";

function renderGame() {
  if (!G) return rerender();
  const r = { flash: renderFlash, q: renderQuestion, tf: renderQuestion, pairs: renderPairs, puzzle: renderPuzzle, clock: renderClock, battle: renderBattle, sim: renderSim }[G.mode];
  if (r) r();
}

function renderFlash() {
  const id = G.queue[G.idx];
  const c = getCard(id) || { f: "(card removido)", b: "" };
  const cur = S.srs[id];
  $app.innerHTML = `
    <div class="game">
      ${gameTop(G.idx / G.queue.length, `<span class="counter">${G.idx + 1}/${G.queue.length}</span>`)}
      <p class="method">🧠 Tente lembrar a resposta <b>antes</b> de virar o card.</p>
      <div class="flashcard ${G.flipped ? "flipped" : ""}" onclick="flip()">
        <div class="fc-inner">
          <div class="fc-face fc-front">${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ""}<div class="fc-text">${esc(c.f)}</div><small class="fc-hint">Toque para ver a resposta</small></div>
          <div class="fc-face fc-back"><span class="tag">Resposta</span><div class="fc-q">${esc(c.f)}</div><div class="fc-text">${esc(c.b)}</div></div>
        </div>
      </div>
      ${G.flipped ? `
        <p class="method">Como foi lembrar?</p>
        <div class="rates">
          <button class="rate r1" onclick="rate(1)"><b>Errei</b><small>${intervalLabel(cur, 1)}</small></button>
          <button class="rate r3" onclick="rate(3)"><b>Difícil</b><small>${intervalLabel(cur, 3)}</small></button>
          <button class="rate r4" onclick="rate(4)"><b>Bom</b><small>${intervalLabel(cur, 4)}</small></button>
          <button class="rate r5" onclick="rate(5)"><b>Fácil</b><small>${intervalLabel(cur, 5)}</small></button>
        </div>` : `<button class="btn primary block" onclick="flip()">Mostrar resposta</button>`}
    </div>`;
}

function aiExplainG(k) {
  const it = G && G.items[k === undefined ? G.idx : k];
  if (it) aiExplainItem(it.q, it.opts[it.ans], it.e || "");
}
function optionButtons(it, chosen, answered, onclickFn) {
  return `<div class="options">${it.opts.map((o, i) => {
    let cls = "";
    if (answered) cls = i === it.ans ? "correct" : i === chosen ? "wrong" : "dim";
    return `<button class="opt ${cls}" ${answered ? "disabled" : ""} onclick="${onclickFn}(${i})"><span class="k">${"ABCDE"[i] || i + 1}</span><span>${esc(o)}</span></button>`;
  }).join("")}</div>`;
}

function renderQuestion() {
  const it = G.items[G.idx];
  const isTf = G.mode === "tf";
  const ok = G.answered && G.chosen === it.ans;
  let fb = "";
  if (G.answered) {
    const heading = ok ? `✅ Correto! <span class="gain">+${G.lastGain} XP${isTf && G.lastBonus ? ` (⚡+${G.lastBonus})` : ""}</span>` : G.chosen === -1 ? "⏰ Tempo esgotado!" : "❌ Não foi dessa vez";
    fb = `<div class="feedback ${ok ? "ok" : "bad"}">
        <div class="fb-h">${heading}</div>
        ${!ok ? `<div class="fb-ans">Resposta: <b>${esc(it.opts[it.ans])}</b></div>` : ""}
        <div class="fb-e">${esc(it.e)}</div>
        ${!ok && it.errKey && !G.errorsMode ? `<small class="fb-note">📒 Adicionada ao caderno de erros</small>` : ""}
        <button class="btn ai-btn small-btn" onclick="aiExplainG()">🤖 Explicar com IA</button>
        <button class="btn ${ok ? "primary" : "danger"} block" onclick="next()">Continuar</button>
      </div>`;
  }
  const story = G.story ? `<details class="story" ${G.storyOpen ? "open" : ""} ontoggle="if(G)G.storyOpen=this.open"><summary>📋 Caso clínico</summary><p>${esc(G.story)}</p></details>` : "";
  const opts = isTf ? `<div class="tf-btns">${it.opts.map((o, i) => {
      let cls = i === 0 ? "tf-true" : "tf-false";
      if (G.answered) cls += i === it.ans ? " correct" : i === G.chosen ? " wrong" : " dim";
      return `<button class="tf-btn ${cls}" ${G.answered ? "disabled" : ""} onclick="answer(${i})">${i === 0 ? "✓" : "✗"}<span>${o}</span></button>`;
    }).join("")}</div>` : optionButtons(it, G.chosen, G.answered, "answer");
  const extra = G.errorsMode && it.count > 1 ? `<span class="tag warn">errada ${it.count}x</span>` : "";
  $app.innerHTML = `
    <div class="game ${G.answered ? "has-fb" : ""}">
      ${gameTop(G.idx / G.items.length, `${comboHtml()}${heartsHtml()}<span class="counter">${G.idx + 1}/${G.items.length}</span>`)}
      ${isTf ? `<div class="timer"><span style="animation-duration:${TF_SECONDS}s" class="${G.answered ? "stop" : ""}"></span></div>` : ""}
      ${story}
      ${(G.showTag || G.errorsMode) && it.tag ? `<span class="tag">${esc(it.tag)}</span> ` : ""}${extra}
      <div class="question ${isTf ? "tf" : ""}">${esc(it.q)}</div>
      ${opts}
      ${fb}
    </div>`;
}

function renderPairs() {
  const col = (side, list, key) => list.map((p) => {
    const matched = G.matched.includes(p.id);
    const sel = (side === "l" ? G.selL : G.selR) === p.id;
    const wrong = G.wrong && G.wrong[side === "l" ? 0 : 1] === p.id;
    return `<button class="pair ${matched ? "matched" : ""} ${sel ? "sel" : ""} ${wrong ? "wrong" : ""}" ${matched ? "disabled" : ""} onclick="pick('${side}',${p.id})">${esc(p[key])}</button>`;
  }).join("");
  $app.innerHTML = `
    <div class="game">
      ${gameTop(G.matched.length / G.left.length, `${comboHtml()}<span class="counter">❌ ${G.mistakes}</span>`)}
      <p class="method">🔗 Toque em um item de cada coluna para formar o par.</p>
      <div class="pairs"><div class="pcol">${col("l", G.left, "l")}</div><div class="pcol">${col("r", G.right, "r")}</div></div>
    </div>`;
}

function renderPuzzle() {
  const p = G.puzzles[G.pi];
  const slots = p.items.map((t, k) => `<div class="slot ${k < G.placed ? "filled" : k === G.placed ? "next" : ""}"><span class="sn">${k + 1}</span><span>${k < G.placed ? esc(t) : k === G.placed ? "?" : ""}</span></div>`).join("");
  const chips = G.chips.filter((c) => c.i >= G.placed).map((c) => `<button class="chip-btn ${G.wrongChip === c.i ? "wrong" : ""}" onclick="place(${c.i})">${esc(c.t)}</button>`).join("");
  $app.innerHTML = `
    <div class="game ${G.solved ? "has-fb" : ""}">
      ${gameTop((G.pi + G.placed / p.items.length) / G.puzzles.length, `${comboHtml()}<span class="counter">❌ ${G.mistakes}</span>`)}
      ${G.showTag && p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ""}
      <div class="question">${esc(p.t)}</div>
      <p class="method">🧩 Toque nas peças na ordem certa, começando pela posição 1.</p>
      <div class="slots">${slots}</div>
      ${G.solved ? "" : `<div class="chips-pool">${chips}</div>`}
      ${G.solved ? `<div class="feedback ok"><div class="fb-h">🧩 Montado! <span class="gain">+${p.items.length * 4 + 10} XP</span></div>${p.e ? `<div class="fb-e">${esc(p.e)}</div>` : ""}<button class="btn primary block" onclick="nextPuzzle()">${G.pi + 1 < G.puzzles.length ? "Próximo quebra-cabeça" : "Concluir"}</button></div>` : ""}
    </div>`;
}

function renderClock() {
  const it = G.items[G.idx % G.items.length];
  const left = G.endAt - Date.now();
  const f = G.flash;
  $app.innerHTML = `
    <div class="game">
      <div class="game-top">
        <button class="icon-btn" onclick="quit()" aria-label="Sair">✕</button>
        <div class="clock-bar"><span id="clock-bar" style="transform:scaleX(${Math.max(0, left) / (CLOCK_SECONDS * 1000)})"></span></div>
        <span class="clock-left ${left < 10000 ? "low" : ""}" id="clock-left">${(Math.max(0, left) / 1000).toFixed(1)}s</span>
      </div>
      <div class="clock-score"><span>⭐ <b>${G.pts}</b> pts</span>${comboHtml()}<span>✅ ${G.correct} · ❌ ${G.wrongs}</span></div>
      ${G.challenge ? `<p class="method">⚔️ Desafio de <b>${esc(G.challenge.n || "amigo(a)")}</b>: superar ${G.challenge.p} pontos</p>` : ""}
      <span class="tag">${esc(it.tag)}</span>
      <div class="question">${esc(it.q)}</div>
      ${optionButtons(it, f ? f.chosen : null, !!f, "clockAnswer")}
      ${f && !f.ok ? `<p class="method bad-txt">Errou: −3 segundos</p>` : ""}
    </div>`;
}

function renderBattle() {
  const it = G.items[G.idx];
  const ok = G.answered && G.chosen === it.ans;
  $app.innerHTML = `
    <div class="game ${G.answered ? "has-fb" : ""}">
      ${gameTop(G.idx / G.items.length, `<span class="counter">⭐ ${G.pts}</span><span class="counter">${G.idx + 1}/${G.items.length}</span>`)}
      ${G.answered ? "" : `<div class="timer"><span style="animation-duration:${BATTLE_Q_MS / 1000}s"></span></div>`}
      <span class="tag">${esc(it.tag)}</span>
      <div class="question">${esc(it.q)}</div>
      ${optionButtons(it, G.chosen, G.answered, "battleAnswer")}
      ${G.answered ? `<div class="feedback ${ok ? "ok" : "bad"}">
        <div class="fb-h">${ok ? `✅ +${G.lastGain} pontos` : G.chosen === -1 ? "⏰ Tempo esgotado" : "❌ Errou"}</div>
        ${!ok ? `<div class="fb-ans">Resposta: <b>${esc(it.opts[it.ans])}</b></div>` : ""}
        <div class="fb-e">${esc(it.e)}</div>
        <button class="btn ai-btn small-btn" onclick="aiExplainG()">🤖 Explicar com IA</button>
        <button class="btn ${ok ? "primary" : "danger"} block" onclick="battleNext()">${G.idx + 1 < G.items.length ? "Próxima" : "Ver resultado"}</button>
      </div>` : ""}
    </div>`;
}

function renderSim() {
  const it = G.items[G.idx];
  const answeredN = G.picks.filter((p) => p !== null).length;
  $app.innerHTML = `
    <div class="game sim">
      <div class="game-top">
        <button class="icon-btn" onclick="quit()" aria-label="Sair">✕</button>
        <div class="bar grow"><span style="width:${Math.round((answeredN / G.items.length) * 100)}%"></span></div>
        ${G.endAt ? `<span class="clock-left" id="sim-left">${fmtTime(G.endAt - Date.now())}</span>` : ""}
      </div>
      <div class="game-title">📝 Simulado · questão ${G.idx + 1} de ${G.items.length} · ${answeredN} respondida(s)</div>
      <span class="tag">${esc(it.tag)}</span>
      <div class="question">${esc(it.q)}</div>
      <div class="options">${it.opts.map((o, i) => `<button class="opt ${G.picks[G.idx] === i ? "picked" : ""}" onclick="simPick(${i})"><span class="k">${"ABCDE"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>
      <div class="row sim-nav">
        <button class="btn ghost" ${G.idx === 0 ? "disabled" : ""} onclick="simGo(${G.idx - 1})">‹ Anterior</button>
        <button class="btn ghost ${G.flags[G.idx] ? "flagged" : ""}" onclick="simFlag()">${G.flags[G.idx] ? "🚩 Marcada" : "🏳️ Marcar"}</button>
        ${G.idx + 1 < G.items.length ? `<button class="btn primary" onclick="simGo(${G.idx + 1})">Próxima ›</button>` : `<button class="btn accent" onclick="simSubmit()">Finalizar</button>`}
      </div>
      <div class="qgrid">${G.items.map((_, k) => `<button class="${k === G.idx ? "cur" : ""} ${G.picks[k] !== null ? "done" : ""} ${G.flags[k] ? "flag" : ""}" onclick="simGo(${k})">${k + 1}</button>`).join("")}</div>
      <button class="btn danger-ghost block" onclick="simSubmit()">Finalizar simulado</button>
    </div>`;
}

// ---------- Teclado (computador) ----------
document.addEventListener("keydown", (e) => {
  if (!G || /input|textarea|select/i.test(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  const map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
  if (G.mode === "flash") {
    if (!G.flipped && (k === " " || k === "enter")) { e.preventDefault(); flip(); }
    else if (G.flipped && ["1", "2", "3", "4"].includes(k)) rate([1, 3, 4, 5][+k - 1]);
  } else if (G.mode === "q" || G.mode === "tf") {
    if (G.answered && (k === "enter" || k === " ")) { e.preventDefault(); next(); }
    else if (!G.answered) {
      if (G.mode === "tf") { if (k === "v" || k === "1") answer(0); else if (k === "f" || k === "2") answer(1); }
      else if (k in map && map[k] < G.items[G.idx].opts.length) answer(map[k]);
    }
  } else if (G.mode === "clock") {
    if (k in map && map[k] < G.items[G.idx % G.items.length].opts.length) clockAnswer(map[k]);
  } else if (G.mode === "battle") {
    if (G.answered && (k === "enter" || k === " ")) { e.preventDefault(); battleNext(); }
    else if (!G.answered && k in map && map[k] < G.items[G.idx].opts.length) battleAnswer(map[k]);
  } else if (G.mode === "sim") {
    if (k in map && map[k] < G.items[G.idx].opts.length) simPick(map[k]);
    else if (k === "arrowright") simGo(G.idx + 1);
    else if (k === "arrowleft") simGo(G.idx - 1);
  } else if (G.mode === "puzzle" && G.solved && k === "enter") nextPuzzle();
  else if (G.mode === "result" && k === "enter") { const b = document.getElementById("res-continue"); if (b) b.click(); }
});
