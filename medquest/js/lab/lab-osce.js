/* MedQuest Lab — Estações práticas no estilo OSCE.
   Cada estação tem contexto, objetivo, tempo, tarefas interativas e checklist de avaliação.
   Tipos de tarefa: pick (escolher todas as ações corretas), order (ordenar), mcq (uma resposta), dialog (melhor fala). */
"use strict";

const OSCE = [
  {
    id: "anamnese", cat: "Anamnese", disc: "semio", icon: "💬", title: "Dor abdominal: colha a história", time: { ini: 8, int: 6, adv: 5 },
    ctx: "Ambulatório. Mariana, 32 anos, procura atendimento por dor abdominal há 2 dias.", objective: "Conduzir uma anamnese completa e organizada.",
    patient: { name: "Mariana", age: 32, avatar: "👩🏽" },
    tasks: [
      { type: "pick", comp: "Abertura da consulta", prompt: "Como começar a consulta? Escolha as atitudes adequadas.", items: [["Apresentar-se pelo nome e função", 1, "Cria vínculo e transparência."], ["Confirmar o nome da paciente e como prefere ser chamada", 1, "Identificação e respeito."], ["Perguntar de forma aberta o que a trouxe", 1, "Pergunta aberta deixa a paciente contar a história."], ["Começar direto pelo exame físico", 0, "O exame vem depois da história."], ["Interromper a paciente nos primeiros segundos", 0, "Prejudica a coleta de informações."], ["Usar termos técnicos sem explicar", 0, "Dificulta a comunicação.", true]] },
      { type: "pick", comp: "Caracterização da queixa", prompt: "Quais aspectos da dor você precisa investigar?", items: [["Início e duração", 1, ""], ["Localização e irradiação", 1, ""], ["Intensidade (escala de 0 a 10)", 1, ""], ["Fatores de melhora e de piora", 1, ""], ["Sintomas associados (febre, vômitos, alteração intestinal ou urinária)", 1, ""], ["Time de futebol preferido", 0, "Não tem relação com o caso."], ["Fazer várias perguntas fechadas ao mesmo tempo", 0, "Confunde a paciente.", true]] },
      { type: "pick", comp: "Antecedentes", prompt: "Que antecedentes são essenciais neste caso?", items: [["Data da última menstruação e possibilidade de gravidez", 1, "Mulher em idade fértil com dor abdominal: pensar em gravidez ectópica."], ["Cirurgias prévias", 1, ""], ["Medicamentos em uso", 1, ""], ["Alergias", 1, ""], ["Religião, sem relação com o caso", 0, "Não ajuda neste momento."], ["Marca do celular", 0, "Irrelevante.", true]] },
      { type: "dialog", comp: "Encerramento", prompt: "Como encerrar a anamnese antes do exame físico?", options: [["“Vou resumir o que entendi… está correto? Quer acrescentar algo? Agora vou examinar você.”", 1, "Resumir confirma a história e dá espaço para a paciente."], ["“Pronto, deite aí.”", 0, "Não confirma nem explica."], ["“Com certeza é gastrite.”", 0, "Conclusão precipitada antes do exame."], ["“Vou pedir uma tomografia para ver o que é.”", 0, "Exame sem raciocínio clínico."]] }
    ]
  },
  {
    id: "semio_abd", cat: "Semiologia", disc: "semio", icon: "🩺", title: "Exame físico do abdome", time: { ini: 7, int: 6, adv: 5 },
    ctx: "Enfermaria. Seu João, 40 anos, com dor em fossa ilíaca direita.", objective: "Realizar o exame do abdome na sequência correta e interpretar os achados.",
    patient: { name: "Seu João", age: 40, avatar: "👨🏻" },
    tasks: [
      { type: "order", comp: "Sequência do exame", prompt: "Coloque as etapas na ordem correta.", steps: ["Higienizar as mãos", "Explicar o exame e pedir consentimento", "Posicionar em decúbito dorsal e expor o abdome", "Inspeção", "Ausculta", "Percussão", "Palpação superficial", "Palpação profunda", "Higienizar as mãos ao final"], adv: 9, ini: 6 },
      { type: "mcq", comp: "Interpretação", prompt: "Dor à descompressão brusca na fossa ilíaca direita é o sinal de:", options: [["Blumberg", 1, "Indica irritação peritoneal."], ["Murphy", 0, "Colecistite."], ["Giordano", 0, "Pielonefrite."], ["Rovsing", 0, "Dor na direita ao comprimir a esquerda."]] },
      { type: "pick", comp: "Achados de irritação peritoneal", prompt: "Quais achados sugerem irritação peritoneal?", items: [["Defesa abdominal involuntária", 1, ""], ["Descompressão brusca dolorosa", 1, ""], ["Dor ao tossir ou ao percutir", 1, ""], ["Ruídos hidroaéreos aumentados isolados", 0, "Não indicam peritonite."], ["Abdome flácido e indolor", 0, "Achado normal."], ["Timpanismo difuso isolado", 0, "Inespecífico.", true]] }
    ]
  },
  {
    id: "spikes", cat: "Comunicação médica", disc: "clinica", icon: "🤝", title: "Comunicar uma notícia difícil", time: { ini: 8, int: 6, adv: 5 },
    ctx: "Consultório. Dona Helena, 58 anos, volta para o resultado da biópsia, que confirmou câncer de mama.", objective: "Comunicar a notícia com empatia, usando o protocolo SPIKES.",
    patient: { name: "Dona Helena", age: 58, avatar: "👩🏾‍🦳" },
    tasks: [
      { type: "order", comp: "Protocolo SPIKES", prompt: "Ordene as etapas do protocolo SPIKES.", steps: ["Preparar o ambiente (privacidade, sentar, sem interrupções)", "Avaliar o que a paciente já sabe", "Perguntar quanto ela deseja saber", "Dar a informação de forma clara, aos poucos", "Acolher as emoções", "Combinar estratégia e próximos passos"] },
      { type: "dialog", comp: "Percepção", prompt: "Qual é a melhor forma de começar?", options: [["“O que a senhora já sabe ou imagina sobre o resultado da biópsia?”", 1, "Avalia a percepção antes de informar."], ["“Infelizmente é câncer.”", 0, "Notícia sem preparo."], ["“Não é nada demais.”", 0, "Minimiza e cria falsa expectativa."], ["“Vou explicar o laudo: carcinoma ductal invasivo grau 2…”", 0, "Jargão técnico sem preparo."]] },
      { type: "dialog", comp: "Acolhimento", prompt: "A paciente começa a chorar. O que dizer?", options: [["“Percebo que isso é muito difícil. Estou aqui com a senhora; podemos ir com calma.”", 1, "Reconhece a emoção e oferece apoio."], ["“Não chore, vai ficar tudo bem.”", 0, "Invalida a emoção e promete o que não sabe."], ["“Precisamos ser rápidos, tenho outros pacientes.”", 0, "Falta de empatia."], ["Ficar em silêncio olhando para o computador", 0, "O silêncio pode ajudar, mas não olhando para a tela."]] },
      { type: "pick", comp: "Atitudes durante a conversa", prompt: "Quais atitudes são adequadas?", items: [["Perguntar se ela quer um acompanhante presente", 1, ""], ["Usar pausas e respeitar o silêncio", 1, ""], ["Verificar o que ela entendeu", 1, ""], ["Combinar o plano e o retorno", 1, ""], ["Dar falsas esperanças", 0, "Quebra a confiança."], ["Atender o celular durante a conversa", 0, "Desrespeitoso."], ["Explicar tudo de uma vez, sem pausas", 0, "Sobrecarrega a paciente.", true]] }
    ]
  },
  {
    id: "epi", cat: "Biossegurança", disc: "micro", icon: "🥽", title: "Paramentação e higiene das mãos", time: { ini: 7, int: 6, adv: 5 },
    ctx: "Você vai atender um paciente em precaução para aerossóis (suspeita de tuberculose pulmonar).", objective: "Colocar e retirar os EPI na sequência correta e aplicar os 5 momentos da higiene das mãos.",
    patient: { name: "Sr. Paulo", age: 45, avatar: "👨🏼" },
    tasks: [
      { type: "mcq", comp: "Escolha do EPI", prompt: "Qual proteção respiratória usar?", options: [["Respirador N95/PFF2", 1, "Filtra aerossóis com o bacilo da tuberculose."], ["Máscara cirúrgica", 0, "Não protege contra aerossóis."], ["Nenhuma, se o paciente estiver de máscara", 0, "O profissional precisa de proteção."], ["Máscara de tecido", 0, "Inadequada."]] },
      { type: "order", comp: "Colocação dos EPI", prompt: "Ordene a colocação dos EPI (orientação da ANVISA).", steps: ["Higienizar as mãos", "Avental", "Respirador N95/PFF2", "Óculos ou protetor facial", "Gorro", "Luvas"] },
      { type: "order", comp: "Retirada dos EPI", prompt: "Ordene a retirada dos EPI.", steps: ["Luvas", "Avental", "Higienizar as mãos", "Gorro", "Óculos ou protetor facial", "Respirador (fora do quarto)", "Higienizar as mãos"] },
      { type: "pick", comp: "5 momentos da higiene das mãos", prompt: "Quais são os momentos da higiene das mãos (OMS)?", items: [["Antes de tocar o paciente", 1, ""], ["Antes de realizar procedimento limpo ou asséptico", 1, ""], ["Após risco de exposição a fluidos corporais", 1, ""], ["Após tocar o paciente", 1, ""], ["Após tocar superfícies próximas ao paciente", 1, ""], ["Somente no início do plantão", 0, "A higiene é frequente, a cada momento."], ["Apenas quando as mãos parecerem sujas", 0, "A contaminação pode ser invisível.", true]] }
    ]
  },
  {
    id: "gaso", cat: "Interpretação de exames", disc: "fisio", icon: "🧪", title: "Interprete a gasometria", time: { ini: 7, int: 6, adv: 4 },
    ctx: "Paciente de 22 anos com diabetes tipo 1, vômitos e respiração profunda. Gasometria arterial: pH 7,25 · PaCO2 28 mmHg · HCO3 12 mEq/L · Na 140 · Cl 104 · glicemia 450 mg/dL · cetonas positivas.", objective: "Interpretar a gasometria passo a passo e formular a hipótese.",
    patient: { name: "Rafael", age: 22, avatar: "👦🏽" },
    tasks: [
      { type: "mcq", comp: "pH", prompt: "O pH de 7,25 indica:", options: [["Acidemia", 1, "pH abaixo de 7,35."], ["Alcalemia", 0, ""], ["pH normal", 0, ""]] },
      { type: "mcq", comp: "Distúrbio primário", prompt: "Qual é o distúrbio primário?", options: [["Acidose metabólica", 1, "HCO3 baixo, explicando o pH baixo."], ["Acidose respiratória", 0, "A PaCO2 está baixa, não alta."], ["Alcalose respiratória", 0, ""], ["Alcalose metabólica", 0, ""]] },
      { type: "mcq", comp: "Compensação", prompt: "Pela fórmula de Winter (PaCO2 esperada = 1,5 × HCO3 + 8 ± 2), a compensação é:", options: [["Adequada (esperado de 24 a 28)", 1, "1,5 × 12 + 8 = 26 ± 2."], ["Insuficiente: há acidose respiratória associada", 0, ""], ["Excessiva: há alcalose respiratória associada", 0, ""]] },
      { type: "mcq", comp: "Ânion gap", prompt: "Ânion gap = Na − (Cl + HCO3). O resultado é:", options: [["24: aumentado", 1, "140 − (104 + 12) = 24."], ["8: normal", 0, ""], ["36: aumentado", 0, "Erro de cálculo."], ["12: normal", 0, ""]] },
      { type: "mcq", comp: "Hipótese", prompt: "Qual é a hipótese mais provável?", options: [["Cetoacidose diabética", 1, "Acidose com ânion gap aumentado, hiperglicemia e cetose."], ["Diarreia", 0, "Causa ânion gap normal."], ["Hiperventilação por ansiedade", 0, ""], ["Vômitos (alcalose)", 0, ""]] }
    ]
  },
  {
    id: "choque", cat: "Reconhecimento de sinais clínicos", disc: "clinica", icon: "🚨", title: "Reconheça o choque", time: { ini: 6, int: 5, adv: 4 },
    ctx: "Motociclista de 30 anos após colisão, com fratura de fêmur e abdome distendido. FC 128 · PA 82/50 · FR 28 · enchimento capilar de 5 s · pele fria e pegajosa · confuso · jugulares colabadas.", objective: "Reconhecer os sinais de choque, classificar e priorizar a conduta.",
    patient: { name: "Diego", age: 30, avatar: "🧑🏻" },
    tasks: [
      { type: "pick", comp: "Sinais de má perfusão", prompt: "Quais achados indicam choque neste paciente?", items: [["Taquicardia (FC 128)", 1, ""], ["Hipotensão (PA 82/50)", 1, ""], ["Enchimento capilar de 5 s", 1, ""], ["Pele fria e pegajosa", 1, ""], ["Confusão mental", 1, ""], ["Saturação de 97%", 0, "Normal; não indica choque."], ["Temperatura de 36,8 °C", 0, "Normal."], ["Glicemia de 110 mg/dL", 0, "Normal.", true]] },
      { type: "mcq", comp: "Tipo de choque", prompt: "Qual é o tipo de choque mais provável?", options: [["Hipovolêmico hemorrágico", 1, "Trauma com fratura de fêmur e abdome distendido; jugulares colabadas."], ["Obstrutivo por tamponamento", 0, "As jugulares estariam túrgidas."], ["Cardiogênico", 0, ""], ["Neurogênico", 0, "Causaria bradicardia."]] },
      { type: "mcq", comp: "Classificação", prompt: "Pela classificação do ATLS, este quadro corresponde a:", options: [["Classe III (perda de 30 a 40%)", 1, "Hipotensão, FC acima de 120 e confusão."], ["Classe I (perda menor que 15%)", 0, ""], ["Classe II (perda de 15 a 30%)", 0, "A PA ainda estaria normal."], ["Classe IV (perda maior que 40%)", 0, ""]] },
      { type: "pick", comp: "Conduta inicial", prompt: "Quais medidas fazer de imediato?", items: [["Controlar a hemorragia (compressão, imobilizar o fêmur, pelve)", 1, ""], ["Dois acessos venosos calibrosos", 1, ""], ["Iniciar hemoderivados (protocolo de transfusão maciça se indicado)", 1, ""], ["Ácido tranexâmico nas primeiras 3 horas", 1, ""], ["Infundir 5 litros de cristaloide antes do sangue", 0, "O excesso de cristaloide piora a coagulopatia."], ["Vasopressor como primeira medida", 0, "No choque hemorrágico, a prioridade é repor volume e sangue."], ["Aguardar a tomografia antes de agir", 0, "O paciente instável não vai à tomografia.", true]] }
    ]
  },
  {
    id: "dispneia", cat: "Raciocínio clínico", disc: "pneumo", icon: "🫁", title: "Falta de ar no pós-operatório", time: { ini: 7, int: 6, adv: 5 },
    ctx: "Dona Rosa, 66 anos, 5º dia após prótese de quadril, com dispneia súbita, dor pleurítica e FC 118. SatO2 88%, PA 124/80.", objective: "Priorizar a avaliação, levantar hipóteses e escolher a investigação.",
    patient: { name: "Dona Rosa", age: 66, avatar: "👵🏽" },
    tasks: [
      { type: "order", comp: "Avaliação inicial", prompt: "Ordene a avaliação inicial (ABCDE).", steps: ["A: via aérea", "B: respiração e oxigênio", "C: circulação e acesso venoso", "D: estado neurológico e glicemia", "E: exposição (procurar edema e sinais de TVP)"] },
      { type: "pick", comp: "Hipóteses graves a considerar", prompt: "Quais hipóteses graves precisam ser consideradas logo?", items: [["Tromboembolismo pulmonar", 1, "Pós-operatório ortopédico, dor pleurítica e taquicardia."], ["Pneumonia", 1, ""], ["Infarto agudo do miocárdio", 1, ""], ["Pneumotórax", 1, ""], ["Ansiedade como primeira hipótese", 0, "É diagnóstico de exclusão."], ["Refluxo gastroesofágico", 0, "Não explica a hipoxemia.", true]] },
      { type: "mcq", comp: "Investigação", prompt: "Com alta probabilidade clínica de TEP e paciente estável, qual exame pedir?", options: [["Angiotomografia de tórax", 1, "Confirma o diagnóstico; o D-dímero não ajuda com probabilidade alta."], ["D-dímero apenas", 0, "Útil para excluir quando a probabilidade é baixa."], ["Espirometria", 0, ""], ["Endoscopia", 0, ""]] },
      { type: "mcq", comp: "Conduta", prompt: "Confirmado TEP, com paciente estável, a conduta é:", options: [["Anticoagulação", 1, "Trombólise só com instabilidade hemodinâmica."], ["Trombólise imediata", 0, "Não há instabilidade."], ["Só observar", 0, ""], ["Antibiótico", 0, ""]] }
    ]
  },
  {
    id: "anat_apl", cat: "Anatomia aplicada", disc: "anato", icon: "🦴", title: "Anatomia dos procedimentos", time: { ini: 7, int: 6, adv: 5 },
    ctx: "Você vai acompanhar uma punção lombar e uma toracocentese. Revise as referências anatômicas.", objective: "Aplicar a anatomia de superfície e as camadas em procedimentos comuns.",
    patient: { name: "Paciente simulado", age: 50, avatar: "🧑🏾" },
    tasks: [
      { type: "mcq", comp: "Punção lombar: nível", prompt: "Em que nível se faz a punção lombar no adulto?", options: [["Entre L3–L4 ou L4–L5", 1, "Abaixo do fim da medula (L1–L2). A linha entre as cristas ilíacas passa perto de L4."], ["Entre T12–L1", 0, "Risco de lesar a medula."], ["Entre L1–L2", 0, "Ainda há medula nesse nível."], ["Entre C7–T1", 0, ""]] },
      { type: "order", comp: "Camadas atravessadas", prompt: "Ordene as camadas atravessadas pela agulha na punção lombar.", steps: ["Pele", "Tecido subcutâneo", "Ligamento supraespinhal", "Ligamento interespinhal", "Ligamento amarelo", "Espaço epidural", "Dura-máter", "Aracnoide", "Espaço subaracnóideo"] },
      { type: "mcq", comp: "Toracocentese", prompt: "Onde introduzir a agulha na toracocentese?", options: [["Na borda superior da costela de baixo", 1, "O feixe vasculonervoso corre na borda inferior de cada costela."], ["Na borda inferior da costela de cima", 0, "Risco de lesar o feixe vasculonervoso."], ["No meio da costela", 0, ""], ["No esterno", 0, ""]] },
      { type: "mcq", comp: "Via aérea cirúrgica", prompt: "Na cricotireoidostomia, qual estrutura é perfurada?", options: [["Membrana cricotireóidea", 1, "Fica entre a cartilagem tireoide e a cricoide."], ["Membrana tireo-hióidea", 0, ""], ["Primeiro anel traqueal", 0, "Isso é traqueostomia."], ["Cartilagem cricoide", 0, ""]] },
      { type: "mcq", comp: "Drenagem torácica", prompt: "Onde fica o “triângulo de segurança” para o dreno de tórax?", options: [["No 5º espaço intercostal, entre as linhas axilares anterior e média", 1, "Limitado pela borda do peitoral maior e do grande dorsal."], ["No 2º espaço intercostal, na linha hemiclavicular", 0, "É o local clássico de punção de alívio (não do dreno)."], ["No 8º espaço intercostal posterior", 0, ""], ["Na região subxifoide", 0, ""]] }
    ]
  }
];

// ---------- Jogo ----------
let OS = null;
function osceLaunch(id, diff) {
  const st = OSCE.find((x) => x.id === id);
  const sim = labSim("osce-" + id);
  const timeMs = st.time[diff] * MIN;
  labBegin(sim, diff, { objective: st.objective, help: `<ul class="list"><li>Leia o contexto e cumpra as tarefas antes de o tempo acabar.</li><li>Nas tarefas de escolha, marque todas as opções corretas e confirme. Opções erradas tiram pontos.</li><li>Nas de ordenar, toque nos passos na ordem certa; use “Desfazer” para corrigir.</li><li>No fim, você recebe o checklist de avaliação e o que reforçar.</li></ul>` });
  OS = { st, diff, i: 0, checks: [], score: 0, endAt: Date.now() + timeMs, timeMs, sel: [], seq: [], started: false };
  LABCTX.onPause = () => (OS._pz = Date.now());
  LABCTX.onResume = () => { OS.endAt += Date.now() - OS._pz; };
  $app.innerHTML = labSceneShell({ title: `OSCE · ${st.title}`, objective: st.objective, progress: 0, score: 0, timer: "down", left: timeMs, noCam: true,
    viewInner: `<div class="osce-scene" id="osce-scene"></div>` });
  LABT.push(setInterval(() => {
    if (!OS || !OS.started || (LABCTX && LABCTX.pausedAt)) return;
    const left = OS.endAt - Date.now();
    labTickHud(left);
    if (left <= 0) { labFlash("⏰ Tempo esgotado!", false); osceEnd(true); }
  }, 500));
  osceRender();
}
function osceScene() {
  const st = OS.st;
  return `<div class="osce-room">
    <div class="osce-door">ESTAÇÃO ${OSCE.indexOf(st) + 1}</div>
    <div class="osce-avatar">${st.patient.avatar}</div>
    <div class="osce-card"><span class="tag">${esc(st.cat)}</span><b>${esc(st.patient.name)}${st.patient.age ? ", " + st.patient.age + " anos" : ""}</b><p>${esc(st.ctx)}</p></div>
    <div class="osce-steps">${st.tasks.map((t, i) => `<i class="${i < OS.i ? "done" : i === OS.i && OS.started ? "cur" : ""}">${i + 1}</i>`).join("")}</div>
  </div>`;
}
function osceTaskItems(t) {
  if (OS.cache && OS.cache.i === OS.i) return OS.cache.items;
  let items = t.items.filter((x) => !x[3] || OS.diff === "adv");
  items = shuffle(items.map((x, k) => ({ t: x[0], ok: !!x[1], e: x[2], k })));
  OS.cache = { i: OS.i, items };
  return items;
}
function osceRender() {
  const sc = document.getElementById("osce-scene"); if (sc) sc.innerHTML = osceScene();
  const st = OS.st;
  if (!OS.started) {
    return setSide(`<div class="side-sec prompt-card"><span class="tag">${esc(st.cat)} · ${st.time[OS.diff]} min</span><h3>${esc(st.title)}</h3><p>${esc(st.ctx)}</p><p><b>Objetivo:</b> ${esc(st.objective)}</p><p class="muted-txt small">${st.tasks.length} tarefas. O cronômetro começa quando você entrar na estação.</p>
      <button class="btn primary block" onclick="OS.started=true;OS.endAt=Date.now()+OS.timeMs;osceRender()">Entrar na estação</button></div>`);
  }
  const t = st.tasks[OS.i];
  setProgress(OS.i / st.tasks.length);
  if (t.type === "pick") {
    const items = osceTaskItems(t);
    const need = items.filter((x) => x.ok).length;
    return setSide(`<div class="side-sec prompt-card"><small>Tarefa ${OS.i + 1} de ${st.tasks.length} · ${esc(t.comp)}</small><h3>${esc(t.prompt)}</h3>${OS.diff === "ini" ? `<p class="muted-txt small">Escolha ${need} opções.</p>` : ""}</div>
      <div class="options">${items.map((x, j) => `<button class="opt ${OS.sel.includes(j) ? "picked" : ""}" onclick="osceToggle(${j})"><span class="k">${OS.sel.includes(j) ? "✓" : ""}</span><span>${esc(x.t)}</span></button>`).join("")}</div>
      <button class="btn primary block" onclick="osceSubmitPick()">Confirmar</button>`);
  }
  if (t.type === "order") {
    const steps = t.steps;
    const pool = OS.pool || (OS.pool = shuffle(steps.map((s, k) => k)));
    return setSide(`<div class="side-sec prompt-card"><small>Tarefa ${OS.i + 1} de ${st.tasks.length} · ${esc(t.comp)}</small><h3>${esc(t.prompt)}</h3>${OS.diff === "ini" ? `<p class="muted-txt small">O primeiro passo já está indicado.</p>` : ""}</div>
      <div class="slots">${steps.map((_, k) => `<div class="slot ${k < OS.seq.length ? "filled" : k === OS.seq.length ? "next" : ""}"><span class="sn">${k + 1}</span><span>${k < OS.seq.length ? esc(steps[OS.seq[k]]) : ""}</span></div>`).join("")}</div>
      <div class="chips-pool">${pool.filter((k) => !OS.seq.includes(k)).map((k) => `<button class="chip-btn" onclick="osceSeq(${k})">${OS.diff === "ini" && k === 0 && !OS.seq.length ? "⭐ " : ""}${esc(steps[k])}</button>`).join("")}</div>
      <div class="row"><button class="btn ghost" onclick="OS.seq.pop();osceRender()">↶ Desfazer</button>${OS.seq.length === steps.length ? `<button class="btn primary" onclick="osceSubmitOrder()">Confirmar ordem</button>` : ""}</div>`);
  }
  const opts = OS.mopts && OS.mopts.i === OS.i ? OS.mopts.o : (OS.mopts = { i: OS.i, o: shuffle(t.options.map((o, k) => ({ t: o[0], ok: !!o[1], e: o[2], k })).filter((o, k, arr) => OS.diff !== "ini" || o.ok || arr.filter((x) => !x.ok).indexOf(o) < 2)) }).o;
  return setSide(`<div class="side-sec prompt-card"><small>Tarefa ${OS.i + 1} de ${st.tasks.length} · ${esc(t.comp)}</small><h3>${esc(t.prompt)}</h3>${t.type === "dialog" ? `<p class="muted-txt small">Escolha a melhor fala.</p>` : ""}</div>
    <div class="options">${opts.map((o, j) => `<button class="opt" onclick="osceMcq(${j})"><span>${esc(o.t)}</span></button>`).join("")}</div>`);
}
function osceToggle(j) { const k = OS.sel.indexOf(j); if (k >= 0) OS.sel.splice(k, 1); else OS.sel.push(j); osceRender(); }
function osceNext(feedbackHtml) {
  setSide(`${feedbackHtml}<button class="btn primary block" onclick="osceAdvance()">${OS.i + 1 < OS.st.tasks.length ? "Próxima tarefa ›" : "Concluir estação"}</button>`);
  setScore(OS.score);
}
function osceAdvance() { OS.i++; OS.sel = []; OS.seq = []; OS.pool = null; OS.cache = null; if (OS.i >= OS.st.tasks.length) return osceEnd(false); osceRender(); }
function osceSubmitPick() {
  const t = OS.st.tasks[OS.i], items = osceTaskItems(t);
  let fb = "";
  items.forEach((x, j) => {
    const picked = OS.sel.includes(j);
    if (x.ok) { OS.checks.push({ comp: t.comp, t: x.t, ok: picked, e: x.e }); if (picked) OS.score += 10; }
    else if (picked) { OS.score = Math.max(0, OS.score - 8); OS.checks.push({ comp: t.comp, t: `Evitar: ${x.t}`, ok: false, e: x.e, wrongPick: true }); }
    fb += `<p class="small">${x.ok ? (picked ? "✅" : "⬜ Faltou:") : picked ? "❌ Inadequado:" : "·"} ${esc(x.t)}${(x.ok && !picked) || (!x.ok && picked) ? (x.e ? ` <span class="muted-txt">${esc(x.e)}</span>` : "") : ""}</p>`;
  });
  const okAll = items.every((x, j) => x.ok === OS.sel.includes(j));
  okAll ? sfx.ok() : sfx.bad();
  osceNext(`<div class="side-sec info-card ${okAll ? "ok" : ""}"><span class="tag">${okAll ? "✅ Perfeito" : "Correção"}</span><h3>${esc(t.comp)}</h3>${fb}</div>`);
}
function osceSeq(k) { OS.seq.push(k); sfx.flip(); osceRender(); }
function lisLen(a) { const d = []; a.forEach((x) => { let i = d.findIndex((v) => v >= x); if (i < 0) d.push(x); else d[i] = x; }); return d.length; }
function osceSubmitOrder() {
  const t = OS.st.tasks[OS.i], n = t.steps.length;
  const okN = lisLen(OS.seq);
  const exact = OS.seq.every((k, i) => k === i);
  OS.score += Math.round((okN / n) * n * 8);
  t.steps.forEach((s, i) => OS.checks.push({ comp: t.comp, t: `${i + 1}. ${s}`, ok: OS.seq[i] === i, e: "" }));
  exact ? sfx.ok() : sfx.bad();
  osceNext(`<div class="side-sec info-card ${exact ? "ok" : ""}"><span class="tag">${exact ? "✅ Ordem correta" : `${okN} de ${n} na sequência certa`}</span><h3>Ordem esperada</h3>${t.steps.map((s, i) => `<p class="small">${OS.seq[i] === i ? "✅" : "↔"} ${i + 1}. ${esc(s)}</p>`).join("")}</div>`);
}
function osceMcq(j) {
  const t = OS.st.tasks[OS.i], o = OS.mopts.o[j], right = OS.mopts.o.find((x) => x.ok);
  OS.checks.push({ comp: t.comp, t: right.t, ok: o.ok, e: right.e, mc: { q: `${OS.st.title}: ${t.prompt}`, o: [right.t, o.ok ? OS.mopts.o.find((x) => !x.ok).t : o.t], a: 0, e: right.e } });
  S.stats.answered++;
  if (o.ok) { OS.score += 20; S.stats.correct++; bump("correct"); sfx.ok(); } else sfx.bad();
  if (/Hipótese|Investigação|Interpretação|pH|Distúrbio|Ânion|Compensação|Tipo de choque/.test(t.comp) && o.ok) S.lab.stats.dxOk++;
  osceNext(`<div class="side-sec info-card ${o.ok ? "ok" : ""}"><span class="tag">${o.ok ? "✅ Correto" : "❌ Resposta esperada"}</span><h3>${esc(right.t)}</h3><p class="muted-txt">${esc(right.e || "")}</p>${!o.ok && o.e ? `<p class="small">Sua escolha: ${esc(o.t)}. ${esc(o.e)}</p>` : ""}</div>`);
}
function osceEnd(timeout) {
  if (!OS || OS.ended) return;
  OS.ended = true;
  const st = OS.st;
  // Tarefas não feitas por falta de tempo contam como itens não cumpridos
  st.tasks.slice(OS.i).forEach((t) => {
    if (t.type === "pick") t.items.filter((x) => x[1]).forEach((x) => OS.checks.push({ comp: t.comp, t: x[0], ok: false, e: "Não realizado no tempo." }));
    else if (t.type === "order") OS.checks.push({ comp: t.comp, t: "Sequência não realizada", ok: false, e: t.steps.join(" → ") });
    else OS.checks.push({ comp: t.comp, t: (t.options.find((o) => o[1]) || [""])[0], ok: false, e: "Não realizado no tempo." });
  });
  const items = OS.checks.filter((c) => !c.wrongPick);
  const okN = items.filter((c) => c.ok).length;
  const byComp = {};
  OS.checks.forEach((c) => { const b = (byComp[c.comp] = byComp[c.comp] || { ok: 0, n: 0 }); if (!c.wrongPick) { b.n++; if (c.ok) b.ok++; } else b.n++; });
  const weakComps = Object.entries(byComp).filter(([, b]) => b.ok / b.n < 0.7).map(([k]) => k);
  const pct = items.length ? okN / items.length : 0;
  S.lab.stats.osce++; if (pct >= 0.7) S.lab.stats.osceOk++;
  bumpWeek("osce");
  const checklist = `<div class="panel checklist">${Object.entries(byComp).map(([k, b]) => `<div class="subrow"><span>${esc(k)}</span><span class="bar small"><span style="width:${Math.round((b.ok / b.n) * 100)}%;background:${b.ok / b.n >= 0.7 ? "var(--ok)" : b.ok / b.n >= 0.5 ? "var(--gold)" : "var(--bad)"}"></span></span><b>${b.ok}/${b.n}</b></div>`).join("")}</div>`;
  labFinish({
    score: OS.score, max: OS.st.tasks.reduce((s, t) => s + (t.type === "pick" ? t.items.filter((x) => x[1]).length * 10 : t.type === "order" ? t.steps.length * 8 : 20), 0),
    correct: okN, total: items.length,
    mistakes: OS.checks.filter((c) => !c.ok).map((c) => ({ title: `${c.comp}: ${c.t}`, explain: c.e || "Item do checklist não cumprido.", disc: st.disc, card: c.wrongPick ? null : { f: `OSCE ${st.cat}: ${c.comp}. O que não pode faltar?`, b: c.t + (c.e ? `. ${c.e}` : "") }, mc: c.mc })),
    recs: [st.disc, "semio", "clinica"],
    notes: [timeout ? "⏰ O tempo da estação acabou antes do fim das tarefas." : "", `<b>Checklist de avaliação</b>${checklist}`, weakComps.length ? `<b>Reforce:</b> ${esc(weakComps.join(", "))}.` : "<b>Todas as competências atingiram pelo menos 70%.</b>", `Desempenho na estação: <b>${pct >= 0.85 ? "excelente" : pct >= 0.7 ? "satisfatório" : pct >= 0.5 ? "limítrofe" : "insuficiente"}</b> (${Math.round(pct * 100)}% do checklist).`].filter(Boolean)
  });
  OS = null;
}
function osceValidate(st) {
  const e = [];
  if (!st.id || !st.title || !st.tasks || !st.tasks.length) e.push("faltam id, título ou tarefas");
  (st.tasks || []).forEach((t, i) => {
    if (t.type === "pick" && !(t.items || []).some((x) => x[1])) e.push(`tarefa ${i + 1}: nenhuma opção correta`);
    if ((t.type === "mcq" || t.type === "dialog") && (t.options || []).filter((x) => x[1]).length !== 1) e.push(`tarefa ${i + 1}: precisa de exatamente 1 opção correta`);
    if (t.type === "order" && (!t.steps || t.steps.length < 3)) e.push(`tarefa ${i + 1}: ordem com menos de 3 passos`);
  });
  return e;
}
function osceRegister(st) {
  labRegister({
    id: "osce-" + st.id, mode: "osce", disc: st.disc, icon: st.icon, title: `OSCE: ${st.title}`, category: st.cat,
    desc: st.ctx, objective: st.objective,
    diffs: { ini: "Mostra quantas opções escolher e dá o primeiro passo das sequências; menos distratores.", int: "Sem dicas e com todas as opções.", adv: "Mais distratores e menos tempo." },
    time: { ini: st.time.ini, int: st.time.int, adv: st.time.adv }, xp: { ini: 50, int: 70, adv: 100 },
    refs: ["Manuais de habilidades clínicas e OSCE", "Diretrizes do Ministério da Saúde e da ANVISA"],
    review: { status: "pendente" },
    launch: (d) => osceLaunch(st.id, d),
    count: () => st.tasks.length,
    data: () => st,
    validate: () => osceValidate(st)
  });
}
OSCE.forEach(osceRegister);
LAB_IMPORTERS.osce = { validate: (it) => { it.time = it.time || { ini: 8, int: 6, adv: 5 }; it.patient = it.patient || { name: "Paciente", age: 0, avatar: "🧑" }; it.icon = it.icon || "📋"; it.cat = it.cat || "Estação"; it.disc = it.disc || "semio"; return osceValidate(it); }, add: (it) => { if (!OSCE.some((x) => x.id === it.id)) OSCE.push(it); osceRegister(it); } };
