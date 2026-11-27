/* MedQuest — interações da página de vendas. */
(function () {
  "use strict";
  const C = window.MQ_CONFIG, T = window.MQT, O = window.MQO, D = window.MQ_DISCIPLINAS || [];
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let toastT = 0;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 3600); }

  // ---------- Oferta e preços ----------
  const pad = (n) => String(n).padStart(2, "0");
  function applyOffer(s) {
    if (!s) return;
    const current = s.active ? s.annualPromo : s.annualRegular;
    const set = (k, v) => $$(`[data-price="${k}"]`).forEach((e) => (e.textContent = v));
    set("monthly", brl(s.monthly)); set("annual-regular", brl(s.annualRegular)); set("annual-promo", brl(s.annualPromo));
    set("annual-current", brl(current)); set("annual-month", brl(Math.floor((current / 12) * 100) / 100));
    $$("[data-save]").forEach((e) => (e.textContent = Math.round((1 - current / (s.monthly * 12)) * 100) + "%"));
    $$('[data-show="promo"]').forEach((e) => (e.hidden = !s.active));
    $("#offer-bar").hidden = !s.active; $("#offer-box").hidden = !s.active;
    $$("[data-cta-annual]").forEach((e) => (e.textContent = s.active ? "Quero garantir meu acesso anual" : "Quero meu acesso anual"));
    $('[data-terms="monthly"]').textContent = `${brl(s.monthly)} por mês. ${C.terms.monthly}`;
    $('[data-terms="annual"]').textContent = `${brl(current)} por 12 meses${s.active ? " (valor de boas-vindas)" : ""}. ${C.terms.annual}`;
    const ms = O.remaining(), h = Math.floor(ms / 3600e3), m = Math.floor((ms % 3600e3) / 60e3), sec = Math.floor((ms % 60e3) / 1000);
    $$("[data-countdown]").forEach((e) => (e.textContent = `${pad(h)}:${pad(m)}:${pad(sec)}`));
    const cd = { h, m, s: sec }; $$("[data-cd]").forEach((e) => (e.textContent = pad(cd[e.dataset.cd])));
    document.documentElement.dataset.offer = s.active ? "ativa" : "encerrada";
    faqRender();
  }
  O.onChange(applyOffer);
  const ob = $("#offer-bar");
  new ResizeObserver(() => document.documentElement.style.setProperty("--obh", ob.offsetHeight + "px")).observe(ob);

  // Checkout: dispara InitiateCheckout e segue para o link validado pelo servidor.
  $$("[data-checkout]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const plan = a.dataset.checkout, s = O.state, c = O.checkoutUrl(plan);
    if (!c) return toast("O link de pagamento ainda não foi configurado. Fale com o suporte para assinar.");
    const value = plan === "monthly" ? s.monthly : s.active ? s.annualPromo : s.annualRegular;
    T.track("InitiateCheckout", { value, currency: "BRL", content_name: plan === "monthly" ? "MedQuest Mensal" : "MedQuest Anual", content_ids: [plan], num_items: 1 }, { eventID: "ic_" + c.ref });
    T.store.set("mq_last_order", { ref: c.ref, plan, value, at: Date.now() });
    setTimeout(() => { location.href = c.url; }, 150);
  }));
  // Botões que levam aos planos
  $$("[data-cta]").forEach((a) => a.addEventListener("click", () => (window.dataLayer = window.dataLayer || []).push({ event: "cta_click", place: a.dataset.cta })));

  // ---------- Hero: alternância de telas ----------
  const slides = $$("#hero-slides img"), tabs = $$(".slide-tabs button");
  let si = 0, sT = 0;
  function showSlide(i) { si = i; slides.forEach((im, k) => im.classList.toggle("on", k === i)); tabs.forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); }); }
  function autoSlides() { clearInterval(sT); if (!reduce) sT = setInterval(() => showSlide((si + 1) % slides.length), 4500); }
  tabs.forEach((b) => b.addEventListener("click", () => { showSlide(+b.dataset.slide); autoSlides(); }));
  autoSlides();

  // ---------- Vídeos só tocam quando visíveis ----------
  const vio = new IntersectionObserver((es) => es.forEach((en) => { const v = en.target; if (en.isIntersecting) { if (v.preload === "none") v.preload = "auto"; if (!reduce) v.play().catch(() => {}); } else v.pause(); }), { threshold: 0.35 });
  $$("video[data-autoplay]").forEach((v) => vio.observe(v));
  // Animações de entrada (o conteúdo já está visível; só acrescenta movimento)
  const aio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); aio.unobserve(en.target); } }), { threshold: 0.4 });
  $$(".b-xp").forEach((e) => aio.observe(e));

  // ---------- 3D sob demanda ----------
  $("#open-3d").addEventListener("click", () => {
    const live = $(".lf-live"), fr = $("iframe", live);
    if (!fr.src) fr.src = "app/index.html#demo-anat";
    live.hidden = false; $("#lab-3d video").pause();
    toast("Carregando o modelo 3D… Arraste para girar e toque nas estruturas.");
  });

  // ---------- Experimente: quiz demonstrativo ----------
  const QZ = [
    { q: "Qual nervo craniano inerva o músculo reto lateral do olho?", o: ["Oculomotor (III)", "Troclear (IV)", "Abducente (VI)", "Facial (VII)"], a: 2, e: "O abducente (VI) inerva o reto lateral, que abduz o olho. Mnemônico: LR6 SO4: reto lateral pelo VI, oblíquo superior pelo IV e os demais pelo III." },
    { q: "O músculo serrátil anterior é inervado pelo nervo:", o: ["Toracodorsal", "Torácico longo", "Dorsal da escápula", "Supraescapular"], a: 1, e: "O nervo torácico longo inerva o serrátil anterior. A lesão desse nervo causa a escápula alada, que fica evidente ao empurrar uma parede." },
    { q: "O ponto de McBurney, referência na apendicite, fica:", o: ["No terço lateral da linha entre a espinha ilíaca anterossuperior e o umbigo", "No hipocôndrio direito", "Na linha média abaixo do umbigo", "No flanco esquerdo"], a: 0, e: "Fica no terço lateral da linha que une a espinha ilíaca anterossuperior direita ao umbigo e corresponde aproximadamente à base do apêndice." }
  ];
  const Z = { i: 0, xp: 0, ok: 0, chosen: null };
  function qzRender() {
    $("#qz-xp").textContent = Z.xp; $("#qz-bar").style.width = Math.min(100, (Z.xp / 45) * 100) + "%";
    const body = $("#qz-body"), it = QZ[Z.i];
    if (!it) {
      $("#qz-count").textContent = "Concluído";
      body.innerHTML = `<div class="qz-end"><span class="score">${Z.ok}/3</span><p>${Z.ok === 3 ? "Gabaritou! " : ""}Imagine revisar suas matérias e evoluir nos estudos dessa forma todos os dias.</p>
        <div class="row"><a class="btn" href="#planos" data-cta="quiz">Quero desbloquear todos os jogos</a><button class="btn btn-ghost" type="button" id="qz-again">Jogar de novo</button></div></div>`;
      $("#qz-again").onclick = () => { Object.assign(Z, { i: 0, xp: 0, ok: 0, chosen: null }); qzRender(); };
      return;
    }
    $("#qz-count").textContent = `${Z.i + 1} de ${QZ.length}`;
    const ans = Z.chosen !== null;
    body.innerHTML = `<p class="qz-q">${esc(it.q)}</p><div class="qz-opts">${it.o.map((o, k) => `<button type="button" class="qz-opt ${ans ? (k === it.a ? "ok" : k === Z.chosen ? "no" : "dim") : ""}" ${ans ? "disabled" : ""} data-k="${k}"><span class="k">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`).join("")}</div>
      ${ans ? `<div class="qz-fb"><b class="${Z.chosen === it.a ? "okt" : "badt"}">${Z.chosen === it.a ? 'Correto! <span class="qz-gain">+15 XP</span>' : "Não foi dessa vez."}</b><p>${esc(it.e)}</p><button type="button" class="btn btn-sm" id="qz-next">${Z.i + 1 < QZ.length ? "Próxima pergunta" : "Ver resultado"}</button></div>` : ""}`;
    $$(".qz-opt", body).forEach((b) => (b.onclick = () => { Z.chosen = +b.dataset.k; if (Z.chosen === it.a) { Z.ok++; Z.xp += 15; } qzRender(); (window.dataLayer = window.dataLayer || []).push({ event: "quiz_answer", q: Z.i + 1 }); }));
    const nx = $("#qz-next"); if (nx) nx.onclick = () => { Z.i++; Z.chosen = null; qzRender(); $("#quiz").scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" }); };
  }
  qzRender();

  // ---------- Disciplinas ----------
  const ab = (n) => { const w = n.replace(/&/g, "").split(/\s+/).filter((x) => x.length > 2); return w.length > 1 && !/^(Medicina|Saúde)$/.test(w[0]) ? (w[0][0] + w[1][0]).toUpperCase() : n.slice(0, 2); };
  $("#disc-total").textContent = `${D.length} disciplinas`;
  $("#item-total").textContent = `${D.reduce((a, d) => a + d.items, 0).toLocaleString("pt-BR")} itens de estudo`;
  let cyc = "all", open = null;
  function discRender() {
    const list = D.filter((d) => cyc === "all" || d.c === cyc);
    $("#disc-grid").innerHTML = list.map((d) => `<button type="button" class="disc" style="--dc:${d.color}" data-id="${d.id}" aria-expanded="${open === d.id}" aria-controls="disc-detail"><span class="disc-ic" aria-hidden="true">${esc(ab(d.n))}</span><span><b>${esc(d.n)}</b><small>${d.modes.length} modos de jogo${d.lab.length ? ` · ${d.lab.length} no Lab` : ""}</small></span></button>`).join("");
    $$("#disc-grid .disc").forEach((b) => (b.onclick = () => { open = open === b.dataset.id ? null : b.dataset.id; discRender(); }));
    const d = D.find((x) => x.id === open), box = $("#disc-detail");
    box.hidden = !d;
    if (d) box.innerHTML = `<h3>${esc(d.n)}</h3><h4>Modos de jogo</h4><div class="chips">${d.modes.map((m) => `<span class="chip">${esc(m)}</span>`).join("")}<span class="chip">Contra o relógio</span><span class="chip">Simulado</span></div>
      ${d.lab.length ? `<h4>No MedQuest Lab</h4><div class="chips">${d.lab.map((m) => `<span class="chip lab">${esc(m)}</span>`).join("")}</div>` : ""}<p class="small" style="margin-top:12px">${d.items} itens de estudo nesta disciplina.</p>`;
  }
  $$("#disciplinas .seg button").forEach((b) => (b.onclick = () => { cyc = b.dataset.cyc; open = null; $$("#disciplinas .seg button").forEach((x) => x.classList.toggle("on", x === b)); discRender(); }));
  discRender();

  // ---------- Depoimentos (só aparecem se houver depoimentos reais e autorizados) ----------
  const TS = (C.testimonials || []).filter((t) => t && t.consent && t.text && t.name);
  if (TS.length) {
    $("#depoimentos").hidden = false;
    const card = (t) => `<figure class="tcard">${t.img ? `<img src="${esc(t.img)}" alt="" loading="lazy">` : ""}<p>“${esc(t.text)}”</p><footer><b>${esc(t.name)}</b>${esc(t.term || "")}</footer></figure>`;
    $("#mq-track").innerHTML = TS.concat(TS).map(card).join("");
    const mq = $("#marquee"); let paused = reduce, hold = false;
    const btn = $("#mq-pause");
    btn.onclick = () => { paused = !paused; btn.textContent = paused ? "Continuar" : "Pausar"; btn.setAttribute("aria-pressed", paused); };
    ["pointerenter", "focusin", "touchstart"].forEach((ev) => mq.addEventListener(ev, () => (hold = true), { passive: true }));
    ["pointerleave", "focusout", "touchend"].forEach((ev) => mq.addEventListener(ev, () => setTimeout(() => (hold = false), 1200), { passive: true }));
    (function step() { if (!paused && !hold) { mq.scrollLeft += 0.5; if (mq.scrollLeft >= mq.scrollWidth / 2) mq.scrollLeft -= mq.scrollWidth / 2; } requestAnimationFrame(step); })();
  }

  // ---------- Bônus disponíveis ----------
  const BS = (C.bonuses || []).filter((b) => b.available);
  if (!BS.length) $("#bonus").hidden = true;
  $("#bonus-grid").innerHTML = BS.map((b, i) => `<article class="bonus"><div class="bonus-art"><div class="phone"><img src="${esc(b.img)}" alt="Tela do bônus ${esc(b.title)} no app" loading="lazy"></div></div><div class="bonus-txt"><span class="tag">Bônus ${pad(i + 1)}</span><h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p></div></article>`).join("");

  // ---------- FAQ ----------
  function faqRender() {
    const s = O.state || { monthly: C.pricing.monthly.price, annualPromo: C.pricing.annual.promo, annualRegular: C.pricing.annual.regular, active: true };
    const cur = s.active ? s.annualPromo : s.annualRegular, sup = C.support;
    const names = D.map((d) => d.n).join(", ");
    const F = [
      ["O que é o MedQuest?", `<p>É uma plataforma de estudos gamificados para a graduação em medicina. Cada disciplina vira uma trilha de fases com flashcards de repetição espaçada, quizzes, verdadeiro ou falso, ligue os pares, quebra-cabeças e casos clínicos. Você ganha XP, sobe de nível, cumpre missões diárias e conquista medalhas.</p><p>Inclui também o MedQuest Lab, com simulações interativas em 3D.</p>`],
      ["Para quem a plataforma é indicada?", `<p>Para estudantes de medicina do ciclo básico ao internato. Ao informar seu semestre, o app mostra primeiro as matérias que você está cursando, e você pode ajustar a grade quando quiser.</p>`],
      ["Quais disciplinas estão disponíveis?", `<p>${D.length} disciplinas: ${esc(names)}.</p>`],
      ["Como funcionam os jogos?", `<p>Cada disciplina tem fases em sequência. Ao conquistar ao menos uma estrela, a próxima fase é liberada. Os flashcards entram na revisão espaçada, que agenda cada card no melhor momento, e os erros vão para um caderno de erros para você praticar de novo.</p><p>Também há os modos Contra o relógio, Quebra-cabeças, Simulado com correção comentada e desafios para enviar a amigos. Você ainda pode enviar seus PDFs, slides, resumos e anotações para gerar flashcards e questões com o seu conteúdo.</p>`],
      ["O que é o MedQuest Lab?", `<p>É a área de simulações educacionais: Anatomia 3D, Encontre o erro (7 ambientes hospitalares), Plantão virtual (7 casos fictícios), Instrumentos cirúrgicos, Laboratório virtual de microscopia e 8 estações no formato OSCE. Cada simulação tem 3 níveis de dificuldade, pontuação e revisão dos erros ao final.</p><p>As simulações complementam o estudo e não substituem aulas práticas nem o treinamento clínico supervisionado.</p>`],
      ["Como funcionam os simuladores em 3D?", `<p>Eles rodam no próprio navegador. No celular, você arrasta para girar e usa o movimento de pinça para aproximar; no computador, usa o mouse e o teclado. Em aparelhos sem suporte a 3D, o app oferece um modo leve em 2D.</p><p>Os modelos são esquemáticos, gerados por computador, com posições e proporções aproximadas, feitos para estudo e revisão.</p>`],
      ["Posso acessar pelo celular?", `<p>Sim. O MedQuest foi feito para celular, tablet e computador, e o seu progresso fica salvo no aparelho em que você estuda.</p>`],
      ["Preciso instalar algum aplicativo?", `<p>Não. Basta abrir no navegador. Se quiser, adicione à tela inicial do celular para abrir como um aplicativo.</p>`],
      ["Como recebo meu acesso?", `<p>Assim que o pagamento é confirmado, você recebe no e-mail informado na compra as instruções de acesso. O tempo de confirmação depende da forma de pagamento escolhida.</p>`],
      ["Qual é a diferença entre os planos?", `<p>O plano mensal custa ${brl(s.monthly)} por mês, com cobrança recorrente. O plano anual custa ${brl(cur)} por 12 meses${s.active ? ` no valor de boas-vindas (o valor regular é ${brl(s.annualRegular)})` : ""}, inclui o MedQuest Lab, todos os bônus disponíveis e sai por ${brl(Math.floor((cur / 12) * 100) / 100)} por mês.</p>`],
      ["Como funciona a assinatura?", `<p><b>Mensal:</b> ${esc(C.terms.monthly)}</p><p><b>Anual:</b> ${esc(C.terms.annual)}</p>`],
      ["Receberei novas funcionalidades?", `<p>Sim. As atualizações lançadas durante a sua assinatura ficam disponíveis para você. Novas modalidades do Lab, como investigação diagnóstica e desafios de farmacologia, estão em desenvolvimento e só serão liberadas depois de prontas e revisadas.</p>`],
      ["Como funciona a oferta de boas-vindas?", `<p>No seu primeiro acesso a esta página, você recebe uma oferta individual: 12 meses por ${brl(s.annualPromo)}, válida por 24 horas. O contador não reinicia quando você atualiza a página. Depois do prazo, o plano anual volta ao valor de ${brl(s.annualRegular)}.</p>`],
      ["Como funciona a garantia?", `<p>Você tem ${C.terms.guaranteeDays} dias a partir da compra para conhecer a plataforma. Se não ficar satisfeito, pode solicitar o reembolso dentro desse período pelo suporte ou pela plataforma de pagamento, conforme as condições informadas na contratação.</p>`],
      ["Como posso entrar em contato com o suporte?", `<p>Pelo e-mail <b>${esc(sup.email)}</b>${sup.whatsapp ? ` ou pelo WhatsApp <b>${esc(sup.whatsapp)}</b>` : ""}. Atendimento: ${esc(sup.hours)}.</p>`]
    ];
    const box = $("#faq-list"), openIdx = $$("details", box).map((d) => d.open);
    box.innerHTML = F.map(([q, a], i) => `<details ${openIdx[i] ? "open" : ""}><summary>${esc(q)}</summary><div class="ans">${a}</div></details>`).join("");
  }
  faqRender();

  // ---------- Rodapé ----------
  $("[data-company]").textContent = `${C.company.name} · ${C.company.doc}`;
  $("[data-support-email]").textContent = C.support.email;
  $("[data-support-hours]").textContent = C.support.hours;

  // ---------- CTA fixo no celular ----------
  const sticky = $("#sticky-cta"); let pastHero = false, nearPlans = false;
  const upd = () => { sticky.hidden = false; sticky.classList.toggle("away", !pastHero || nearPlans); };
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; upd(); }).observe($(".hero .cta-group"));
  const near = new Set();
  const nio = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target))); nearPlans = near.size > 0; upd(); }, { threshold: 0.05 });
  nio.observe($("#planos")); nio.observe($(".final"));

  // ---------- Eventos ----------
  T.track("ViewContent", { content_name: "Página de vendas MedQuest", content_category: "Assinatura" }, { onceKey: "vc_page", session: true });
  O.refresh();
  if (new URLSearchParams(location.search).get("checkout") === "indisponivel") setTimeout(() => toast("O link de pagamento deste plano ainda não foi configurado. Fale com o suporte para assinar."), 400);
})();
