// Conteúdo dos mundos (sessões) do MedQuest.
// Cada mundo tem: flashcards, quiz, verdadeiro/falso, pares e casos clínicos.
window.WORLDS = [
  {
    id: "anato", cycle: "basico",
    name: "Anatomia",
    icon: "🦴",
    color: "#f59e0b",
    desc: "Ossos, músculos, nervos e vasos.",
    flashcards: [
      { f: "Nervo que inerva o diafragma", b: "Nervo frênico (raízes C3–C5). “C3, 4, 5 mantêm o diafragma vivo.”" },
      { f: "Quantos ossos tem o esqueleto adulto?", b: "206 ossos." },
      { f: "Artéria que irriga a maior parte da face lateral do hemisfério cerebral", b: "Artéria cerebral média." },
      { f: "Músculos do manguito rotador", b: "Supraespinal, infraespinal, redondo menor e subescapular (mnemônico: SIRS)." },
      { f: "Valva entre átrio esquerdo e ventrículo esquerdo", b: "Valva mitral (bicúspide)." },
      { f: "Lesão do nervo radial causa…", b: "“Mão caída”: perda da extensão do punho e dos dedos." },
      { f: "Brônquio principal onde corpos estranhos aspirados mais se alojam", b: "Brônquio principal direito: mais curto, largo e vertical." },
      { f: "Nervo comprimido na síndrome do túnel do carpo", b: "Nervo mediano." }
    ],
    quiz: [
      { q: "Qual nervo craniano inerva o músculo reto lateral do olho?", o: ["Oculomotor (III)", "Troclear (IV)", "Abducente (VI)", "Facial (VII)"], a: 2, e: "O abducente (VI) inerva o reto lateral. Mnemônico: LR6 SO4 (reto lateral → VI; oblíquo superior → IV)." },
      { q: "Qual é o maior e mais longo osso do corpo humano?", o: ["Tíbia", "Úmero", "Fêmur", "Fíbula"], a: 2, e: "O fêmur é o maior osso do corpo." },
      { q: "O ligamento cruzado anterior (LCA) impede principalmente:", o: ["Deslocamento anterior da tíbia em relação ao fêmur", "Deslocamento posterior da tíbia", "Valgo do joelho", "Rotação da patela"], a: 0, e: "O LCA impede a anteriorização da tíbia (teste da gaveta anterior e teste de Lachman)." },
      { q: "Na maioria das pessoas, o nó sinoatrial é irrigado por um ramo da:", o: ["Artéria descendente anterior", "Artéria coronária direita", "Artéria circunflexa", "Artéria marginal esquerda"], a: 1, e: "Em cerca de 60% das pessoas, a artéria do nó SA vem da coronária direita." },
      { q: "O ducto torácico desemboca na:", o: ["Veia cava inferior", "Junção das veias subclávia e jugular interna esquerdas", "Veia ázigos", "Junção das veias subclávia e jugular interna direitas"], a: 1, e: "O ducto torácico drena no ângulo venoso esquerdo (junção subclávia + jugular interna esquerdas)." },
      { q: "Principal músculo da inspiração:", o: ["Intercostais internos", "Reto abdominal", "Diafragma", "Esternocleidomastóideo"], a: 2, e: "O diafragma é o principal músculo inspiratório." }
    ],
    tf: [
      { s: "O fígado é a maior glândula do corpo humano.", v: true, e: "Verdadeiro: pesa cerca de 1,5 kg no adulto." },
      { s: "O pulmão direito tem dois lobos.", v: false, e: "Falso: o direito tem 3 lobos; o esquerdo tem 2 (e a língula)." },
      { s: "A veia porta leva sangue do trato gastrointestinal ao fígado.", v: true, e: "Verdadeiro: forma-se pela união da veia mesentérica superior com a esplênica." },
      { s: "O nervo vago é o X par craniano.", v: true, e: "Verdadeiro." },
      { s: "O baço localiza-se no hipocôndrio direito.", v: false, e: "Falso: o baço fica no hipocôndrio esquerdo." },
      { s: "O apêndice vermiforme se origina do ceco.", v: true, e: "Verdadeiro: na confluência das tênias do ceco." },
      { s: "O ureter passa por cima (anterior) da artéria uterina.", v: false, e: "Falso: “a água passa debaixo da ponte”. O ureter passa por baixo da artéria uterina." },
      { s: "A glândula tireoide localiza-se anteriormente à traqueia.", v: true, e: "Verdadeiro: o istmo fica sobre o 2º–4º anéis traqueais." }
    ],
    pairs: [
      ["Nervo mediano", "Túnel do carpo"],
      ["Nervo ulnar", "Mão em garra"],
      ["Nervo fibular comum", "Pé caído"],
      ["Nervo torácico longo", "Escápula alada"],
      ["Nervo axilar", "Músculo deltoide"],
      ["Nervo frênico", "Diafragma"]
    ],
    seq: [
      { t: "Trajeto do ar inspirado", items: ["Cavidade nasal", "Faringe", "Laringe", "Traqueia", "Brônquio principal", "Bronquíolos", "Alvéolos"], e: "A troca gasosa acontece só nos alvéolos." },
      { t: "Camadas do couro cabeludo (SCALP)", items: ["Pele", "Tecido conjuntivo denso", "Aponeurose epicrânica", "Tecido conjuntivo frouxo", "Pericrânio"], e: "Skin, Connective tissue, Aponeurosis, Loose tissue, Pericranium. A camada frouxa é a “camada perigosa”." }
    ],
    cases: [
      {
        title: "Queda sobre o ombro",
        story: "Homem de 67 anos cai sobre o ombro direito. O raio-X mostra fratura do colo cirúrgico do úmero. Ele não consegue abduzir o braço e perdeu a sensibilidade na face lateral do ombro.",
        steps: [
          { q: "Qual nervo foi mais provavelmente lesado?", o: ["Radial", "Axilar", "Musculocutâneo", "Ulnar"], a: 1, e: "O nervo axilar contorna o colo cirúrgico do úmero e é lesado nessas fraturas." },
          { q: "Além do deltoide, qual músculo esse nervo inerva?", o: ["Redondo maior", "Supraespinal", "Redondo menor", "Infraespinal"], a: 2, e: "O nervo axilar inerva o deltoide e o redondo menor." },
          { q: "Qual artéria acompanha esse nervo pelo espaço quadrangular?", o: ["Circunflexa umeral posterior", "Braquial profunda", "Circunflexa da escápula", "Toracoacromial"], a: 0, e: "O nervo axilar e a artéria circunflexa umeral posterior passam juntos pelo espaço quadrangular." }
        ]
      }
    ]
  },
  {
    id: "fisio", cycle: "basico",
    name: "Fisiologia",
    icon: "🌡️",
    color: "#ef4444",
    desc: "Como o corpo funciona.",
    flashcards: [
      { f: "Fórmula do débito cardíaco", b: "DC = Frequência cardíaca × Volume sistólico." },
      { f: "Principal íon responsável pelo potencial de repouso", b: "Potássio (K⁺), pela alta permeabilidade da membrana em repouso." },
      { f: "Hormônio que aumenta a reabsorção de água no ducto coletor", b: "ADH (vasopressina), que insere aquaporinas-2 na membrana." },
      { f: "Lei de Frank-Starling", b: "Quanto maior o estiramento das fibras (pré-carga), maior a força de contração, até um limite." },
      { f: "Valor normal do pH arterial", b: "7,35 a 7,45." },
      { f: "Células que produzem renina", b: "Células justaglomerulares da arteríola aferente." },
      { f: "Células que produzem o surfactante pulmonar", b: "Pneumócitos tipo II." },
      { f: "Marca-passo natural do coração", b: "Nó sinoatrial (60–100 bpm)." }
    ],
    quiz: [
      { q: "A fase 0 do potencial de ação do músculo ventricular se deve a:", o: ["Efluxo de K⁺", "Influxo rápido de Na⁺", "Influxo de Ca²⁺ tipo L", "Efluxo de Cl⁻"], a: 1, e: "A despolarização rápida (fase 0) é causada pela abertura dos canais rápidos de Na⁺." },
      { q: "Hormônio liberado pelas células alfa do pâncreas:", o: ["Insulina", "Somatostatina", "Glucagon", "Polipeptídeo pancreático"], a: 2, e: "Alfa → glucagon; beta → insulina; delta → somatostatina." },
      { q: "A maior parte do sódio filtrado é reabsorvida no:", o: ["Túbulo contorcido proximal", "Alça de Henle", "Túbulo contorcido distal", "Ducto coletor"], a: 0, e: "Cerca de 65% do Na⁺ filtrado é reabsorvido no túbulo proximal." },
      { q: "O que desvia a curva de dissociação da hemoglobina para a direita?", o: ["Alcalose", "Hipotermia", "Aumento da temperatura", "Redução do 2,3-BPG"], a: 2, e: "↑CO₂, ↑H⁺ (acidose), ↑temperatura e ↑2,3-BPG desviam a curva para a direita, liberando mais O₂." },
      { q: "Volume de ar que permanece nos pulmões após expiração máxima:", o: ["Volume corrente", "Volume residual", "Capacidade vital", "Volume de reserva expiratório"], a: 1, e: "O volume residual não pode ser expirado e não é medido pela espirometria simples." },
      { q: "Principal estímulo para a ventilação em uma pessoa saudável:", o: ["Queda da PaO₂", "Aumento da PaCO₂", "Aumento do pH", "Queda da hemoglobina"], a: 1, e: "O CO₂ atravessa a barreira hematoencefálica, gera H⁺ e estimula os quimiorreceptores centrais." }
    ],
    tf: [
      { s: "A insulina reduz a glicemia.", v: true, e: "Verdadeiro: favorece a captação de glicose pelos tecidos." },
      { s: "A aldosterona aumenta a excreção de sódio.", v: false, e: "Falso: aumenta a reabsorção de Na⁺ e a excreção de K⁺ e H⁺." },
      { s: "A taxa de filtração glomerular normal é de cerca de 125 mL/min.", v: true, e: "Verdadeiro (~180 L/dia)." },
      { s: "O sistema nervoso simpático causa miose.", v: false, e: "Falso: o simpático causa midríase; o parassimpático, miose." },
      { s: "As células parafoliculares da tireoide produzem calcitonina.", v: true, e: "Verdadeiro: são as células C." },
      { s: "A bile é produzida pela vesícula biliar.", v: false, e: "Falso: a bile é produzida no fígado; a vesícula armazena e concentra." },
      { s: "O paratormônio (PTH) aumenta a calcemia.", v: true, e: "Verdadeiro: age no osso, no rim e (via vitamina D) no intestino." },
      { s: "O ventrículo direito bombeia sangue para a aorta.", v: false, e: "Falso: o VD bombeia para o tronco pulmonar; o VE, para a aorta." }
    ],
    pairs: [
      ["Gastrina", "Secreção ácida gástrica"],
      ["Secretina", "Bicarbonato pancreático"],
      ["Colecistocinina", "Contração da vesícula"],
      ["Somatostatina", "Inibe secreções digestivas"],
      ["Grelina", "Estimula a fome"],
      ["Leptina", "Promove saciedade"]
    ],
    seq: [
      { t: "Sistema de condução cardíaca", items: ["Nó sinoatrial", "Vias internodais", "Nó atrioventricular", "Feixe de His", "Ramos direito e esquerdo", "Fibras de Purkinje"], e: "O nó AV atrasa o impulso para que os átrios terminem de encher os ventrículos." },
      { t: "Trajeto do filtrado no néfron", items: ["Cápsula de Bowman", "Túbulo contorcido proximal", "Alça de Henle descendente", "Alça de Henle ascendente", "Túbulo contorcido distal", "Ducto coletor"], e: "A alça descendente é permeável à água; a ascendente, não." }
    ],
    cases: [
      {
        title: "Maratonista desidratado",
        story: "Homem de 30 anos corre uma maratona sob calor intenso, quase sem se hidratar. Chega com sede intensa, mucosas secas e urina escura e concentrada.",
        steps: [
          { q: "Qual hormônio aumentado explica a urina concentrada?", o: ["Aldosterona", "ADH (vasopressina)", "Peptídeo natriurético atrial", "Cortisol"], a: 1, e: "O aumento da osmolaridade plasmática estimula a liberação de ADH, que reabsorve água no ducto coletor." },
          { q: "Onde o ADH é sintetizado?", o: ["Neuro-hipófise", "Adeno-hipófise", "Núcleos supraóptico e paraventricular do hipotálamo", "Córtex da suprarrenal"], a: 2, e: "É sintetizado no hipotálamo e armazenado/liberado pela neuro-hipófise." },
          { q: "Que sistema, ativado pela hipovolemia, aumenta a retenção de sódio?", o: ["Sistema renina-angiotensina-aldosterona", "Sistema parassimpático", "Peptídeo natriurético", "Eixo tireoidiano"], a: 0, e: "A queda da perfusão renal libera renina → angiotensina II → aldosterona → retenção de Na⁺ e água." }
        ]
      }
    ]
  },
  {
    id: "farmaco", cycle: "basico",
    name: "Farmacologia",
    icon: "💊",
    color: "#8b5cf6",
    desc: "Mecanismos, efeitos adversos e antídotos.",
    flashcards: [
      { f: "Antídoto do paracetamol", b: "N-acetilcisteína (repõe a glutationa)." },
      { f: "Antídoto dos opioides", b: "Naloxona." },
      { f: "Antídoto dos benzodiazepínicos", b: "Flumazenil (cuidado: pode precipitar convulsões)." },
      { f: "Mecanismo dos IECA (ex.: captopril, enalapril)", b: "Inibem a enzima conversora de angiotensina, que converte angiotensina I em II." },
      { f: "Efeito adverso clássico dos IECA", b: "Tosse seca, pelo acúmulo de bradicinina. Também angioedema e hipercalemia." },
      { f: "Mecanismo da aspirina", b: "Inibição irreversível da COX-1 e da COX-2 (acetilação)." },
      { f: "Antídoto da heparina não fracionada", b: "Sulfato de protamina." },
      { f: "Antídoto da varfarina", b: "Vitamina K. Em sangramento grave, também complexo protrombínico ou plasma." }
    ],
    quiz: [
      { q: "A furosemida pertence a qual classe?", o: ["Tiazídico", "Diurético de alça", "Poupador de potássio", "Inibidor da anidrase carbônica"], a: 1, e: "Inibe o cotransportador Na⁺/K⁺/2Cl⁻ (NKCC2) na alça de Henle." },
      { q: "Fármaco de primeira escolha na anafilaxia:", o: ["Prometazina IV", "Hidrocortisona IV", "Adrenalina IM", "Salbutamol inalatório"], a: 2, e: "Adrenalina IM (0,3–0,5 mg no adulto, na face lateral da coxa) é a primeira linha." },
      { q: "Principal mecanismo da metformina:", o: ["Estimula a secreção de insulina", "Reduz a gliconeogênese hepática", "Inibe a alfa-glicosidase", "Aumenta a glicosúria"], a: 1, e: "Reduz a produção hepática de glicose (ativação da AMPK) e melhora a sensibilidade à insulina." },
      { q: "Efeitos adversos típicos dos aminoglicosídeos:", o: ["Hepatotoxicidade", "Ototoxicidade e nefrotoxicidade", "Síndrome do homem vermelho", "Prolongamento do QT"], a: 1, e: "Ex.: gentamicina e amicacina. Monitorar a função renal." },
      { q: "Qual é um betabloqueador cardiosseletivo (β1)?", o: ["Propranolol", "Metoprolol", "Carvedilol", "Nadolol"], a: 1, e: "Metoprolol, atenolol e bisoprolol são β1-seletivos. O carvedilol bloqueia β1, β2 e α1." },
      { q: "As estatinas inibem qual enzima?", o: ["HMG-CoA redutase", "Lipase lipoproteica", "Acetil-CoA carboxilase", "COX-2"], a: 0, e: "Reduzem a síntese hepática de colesterol, o que aumenta os receptores de LDL." }
    ],
    tf: [
      { s: "As penicilinas inibem a síntese da parede celular bacteriana.", v: true, e: "Verdadeiro: são betalactâmicos que se ligam às PBPs." },
      { s: "A espironolactona é um diurético que espolia potássio.", v: false, e: "Falso: é poupadora de potássio (antagonista da aldosterona)." },
      { s: "A atropina é um antagonista muscarínico.", v: true, e: "Verdadeiro." },
      { s: "O omeprazol bloqueia receptores H2.", v: false, e: "Falso: é inibidor da bomba de prótons (H⁺/K⁺-ATPase)." },
      { s: "A varfarina antagoniza a vitamina K.", v: true, e: "Verdadeiro: inibe a vitamina K epóxido redutase (VKORC1)." },
      { s: "A digoxina inibe a Na⁺/K⁺-ATPase.", v: true, e: "Verdadeiro: aumenta o Ca²⁺ intracelular e a contratilidade." },
      { s: "Os AINEs protegem a mucosa gástrica.", v: false, e: "Falso: reduzem as prostaglandinas protetoras e favorecem úlceras." },
      { s: "A hipocalemia aumenta o risco de intoxicação digitálica.", v: true, e: "Verdadeiro: menos K⁺ competindo pela Na⁺/K⁺-ATPase." }
    ],
    pairs: [
      ["Paracetamol", "N-acetilcisteína"],
      ["Opioides", "Naloxona"],
      ["Benzodiazepínicos", "Flumazenil"],
      ["Heparina", "Protamina"],
      ["Organofosforados", "Atropina + pralidoxima"],
      ["Metanol", "Fomepizol"]
    ],
    seq: [
      { t: "Farmacocinética (LADME)", items: ["Liberação", "Absorção", "Distribuição", "Metabolização", "Excreção"], e: "A metabolização é sobretudo hepática (fases I e II); a excreção, sobretudo renal." },
      { t: "Fases do desenvolvimento de um fármaco", items: ["Estudos pré-clínicos", "Fase I: segurança em voluntários", "Fase II: eficácia e dose", "Fase III: grandes ensaios comparativos", "Fase IV: farmacovigilância"], e: "A fase IV acontece depois da aprovação, na comercialização." }
    ],
    cases: [
      {
        title: "Intoxicação no pronto-socorro",
        story: "Jovem de 22 anos é encontrado sonolento na rua. FR 6 irpm, pupilas puntiformes e marcas de agulha nos antebraços.",
        steps: [
          { q: "Qual síndrome tóxica é a mais provável?", o: ["Anticolinérgica", "Simpatomimética", "Opioide", "Serotoninérgica"], a: 2, e: "Tríade opioide: depressão respiratória, miose e rebaixamento da consciência." },
          { q: "Qual é a conduta farmacológica específica?", o: ["Flumazenil", "Naloxona", "Atropina", "N-acetilcisteína"], a: 1, e: "A naloxona é um antagonista competitivo dos receptores opioides (após garantir via aérea e ventilação)." },
          { q: "Por que manter o paciente em observação após a reversão?", o: ["A naloxona causa hipertensão tardia", "A naloxona tem meia-vida mais curta que muitos opioides", "Risco de alergia tardia", "Não é necessário observar"], a: 1, e: "O efeito da naloxona pode acabar antes do opioide, com risco de nova sedação e depressão respiratória." }
        ]
      }
    ]
  },
  {
    id: "micro", cycle: "basico",
    name: "Microbiologia",
    icon: "🦠",
    color: "#10b981",
    desc: "Bactérias, vírus, fungos e parasitas.",
    flashcards: [
      { f: "Agente etiológico da sífilis", b: "Treponema pallidum." },
      { f: "Coloração usada para BAAR (micobactérias)", b: "Ziehl-Neelsen." },
      { f: "Principal agente de infecção urinária comunitária", b: "Escherichia coli." },
      { f: "Agente da tuberculose", b: "Mycobacterium tuberculosis (bacilo de Koch)." },
      { f: "Cor das bactérias Gram-positivas na coloração de Gram", b: "Roxo/violeta: a parede espessa de peptidoglicano retém o cristal violeta." },
      { f: "Célula infectada principalmente pelo HIV", b: "Linfócitos T CD4⁺." },
      { f: "Causa mais comum de pneumonia adquirida na comunidade", b: "Streptococcus pneumoniae (pneumococo)." },
      { f: "Agente da doença de Chagas", b: "Trypanosoma cruzi. Vetor: triatomíneo (barbeiro)." }
    ],
    quiz: [
      { q: "Bactéria associada à úlcera péptica e ao câncer gástrico:", o: ["Campylobacter jejuni", "Helicobacter pylori", "Salmonella typhi", "Shigella"], a: 1, e: "O H. pylori produz urease e é carcinógeno do grupo 1 da OMS." },
      { q: "Vetor da dengue:", o: ["Anopheles", "Culex", "Aedes aegypti", "Lutzomyia"], a: 2, e: "O Aedes aegypti também transmite zika, chikungunya e febre amarela urbana." },
      { q: "Espécie causadora da forma mais grave de malária:", o: ["Plasmodium vivax", "Plasmodium malariae", "Plasmodium ovale", "Plasmodium falciparum"], a: 3, e: "O P. falciparum causa malária grave e cerebral." },
      { q: "Meningite com petéquias e púrpura sugere:", o: ["Haemophilus influenzae", "Neisseria meningitidis", "Listeria monocytogenes", "Streptococcus agalactiae"], a: 1, e: "Meningococcemia: diplococo Gram-negativo, com risco de púrpura fulminante." },
      { q: "A toxina tetânica (tetanospasmina) atua:", o: ["Bloqueando a liberação de acetilcolina", "Bloqueando a liberação de GABA e glicina", "Ativando canais de sódio", "Lisando hemácias"], a: 1, e: "Ao bloquear neurônios inibitórios, causa espasmos e rigidez. A toxina botulínica é que bloqueia a acetilcolina." },
      { q: "Fungo encapsulado que causa meningite em imunossuprimidos (positivo na tinta nanquim):", o: ["Candida albicans", "Aspergillus fumigatus", "Cryptococcus neoformans", "Histoplasma capsulatum"], a: 2, e: "A cápsula do Cryptococcus aparece como halo na tinta da China (nanquim)." }
    ],
    tf: [
      { s: "Antibióticos tratam infecções virais.", v: false, e: "Falso: antibióticos agem em bactérias. O uso inadequado gera resistência." },
      { s: "Staphylococcus aureus é Gram-positivo.", v: true, e: "Verdadeiro: cocos em cachos, coagulase positivo." },
      { s: "O vírus da hepatite B é um vírus de DNA.", v: true, e: "Verdadeiro: é o único vírus hepatotrópico clássico de DNA (Hepadnaviridae)." },
      { s: "Escherichia coli é anaeróbia estrita.", v: false, e: "Falso: é anaeróbia facultativa." },
      { s: "A vacina BCG previne todas as formas de tuberculose em adultos.", v: false, e: "Falso: protege principalmente contra as formas graves (miliar e meníngea) em crianças." },
      { s: "A leishmaniose é transmitida pelo flebotomíneo (mosquito-palha).", v: true, e: "Verdadeiro: gêneros Lutzomyia e Phlebotomus." },
      { s: "A infecção por Clostridioides difficile está associada ao uso de antibióticos.", v: true, e: "Verdadeiro: causa colite pseudomembranosa." },
      { s: "Bactérias Gram-negativas têm membrana externa com LPS.", v: true, e: "Verdadeiro: o LPS (endotoxina) pode desencadear choque séptico." }
    ],
    pairs: [
      ["Treponema pallidum", "Sífilis"],
      ["Mycobacterium leprae", "Hanseníase"],
      ["Trypanosoma cruzi", "Doença de Chagas"],
      ["Schistosoma mansoni", "Esquistossomose"],
      ["Vibrio cholerae", "Cólera"],
      ["Bordetella pertussis", "Coqueluche"]
    ],
    seq: [
      { t: "Coloração de Gram", items: ["Cristal violeta", "Lugol (mordente)", "Álcool-acetona (descoloração)", "Fucsina ou safranina (contracorante)"], e: "As Gram-positivas retêm o violeta; as Gram-negativas perdem e ficam rosadas." },
      { t: "Ciclo de replicação viral", items: ["Adsorção", "Penetração", "Desnudamento", "Síntese de componentes", "Montagem", "Liberação"], e: "Os antivirais podem agir em cada uma dessas etapas." }
    ],
    cases: [
      {
        title: "Febre e rigidez de nuca",
        story: "Universitário de 19 anos, morador de república, com febre alta, cefaleia intensa, rigidez de nuca e petéquias nos membros. O líquor está turvo, com diplococos Gram-negativos.",
        steps: [
          { q: "Qual é o agente mais provável?", o: ["Streptococcus pneumoniae", "Neisseria meningitidis", "Listeria monocytogenes", "Haemophilus influenzae"], a: 1, e: "Diplococo Gram-negativo + petéquias em adulto jovem: meningococo." },
          { q: "Qual antibiótico empírico deve ser iniciado?", o: ["Amoxicilina VO", "Ceftriaxona IV", "Azitromicina VO", "Ciprofloxacino VO"], a: 1, e: "A ceftriaxona IV é a escolha empírica na meningite bacteriana comunitária do adulto." },
          { q: "Conduta para os contatos íntimos (colegas de república):", o: ["Nenhuma", "Vacinar e aguardar", "Quimioprofilaxia com rifampicina", "Isolamento por 30 dias"], a: 2, e: "Quimioprofilaxia com rifampicina (alternativas: ceftriaxona ou ciprofloxacino)." }
        ]
      }
    ]
  },
  {
    id: "pato", cycle: "clinico",
    name: "Patologia",
    icon: "🔬",
    color: "#ec4899",
    desc: "Lesão celular, inflamação e neoplasias.",
    flashcards: [
      { f: "Tipo de necrose típico do infarto do miocárdio", b: "Necrose de coagulação." },
      { f: "Tipo de necrose típico do sistema nervoso central", b: "Necrose liquefativa." },
      { f: "Tipo de necrose típico da tuberculose", b: "Necrose caseosa." },
      { f: "Célula característica do linfoma de Hodgkin", b: "Célula de Reed-Sternberg (“olhos de coruja”)." },
      { f: "Tríade de Virchow", b: "Estase sanguínea, lesão endotelial e hipercoagulabilidade." },
      { f: "Metaplasia do esôfago de Barrett", b: "Epitélio escamoso substituído por colunar do tipo intestinal (com células caliciformes)." },
      { f: "Marcador tumoral do carcinoma hepatocelular", b: "Alfafetoproteína (AFP)." },
      { f: "Diferença entre hiperplasia e hipertrofia", b: "Hiperplasia: aumenta o número de células. Hipertrofia: aumenta o tamanho das células." }
    ],
    quiz: [
      { q: "Célula predominante nas primeiras horas da inflamação aguda:", o: ["Linfócito", "Neutrófilo", "Plasmócito", "Eosinófilo"], a: 1, e: "Os neutrófilos predominam nas primeiras 6–24 h; depois chegam os monócitos/macrófagos." },
      { q: "O granuloma é característico de qual processo?", o: ["Inflamação aguda serosa", "Inflamação crônica granulomatosa", "Necrose gordurosa", "Edema"], a: 1, e: "É um agregado de macrófagos epitelioides, por exemplo na tuberculose e na sarcoidose." },
      { q: "Neoplasia maligna de origem epitelial:", o: ["Sarcoma", "Carcinoma", "Linfoma", "Adenoma"], a: 1, e: "Carcinoma vem do epitélio; sarcoma, do mesênquima. O adenoma é benigno." },
      { q: "Calcificação em tecido lesado com cálcio sérico normal:", o: ["Metastática", "Distrófica", "Fisiológica", "Hipercalcêmica"], a: 1, e: "A distrófica ocorre em tecido necrótico; a metastática, em tecido normal com hipercalcemia." },
      { q: "Gene supressor de tumor mutado com mais frequência nos cânceres humanos:", o: ["RAS", "MYC", "TP53", "HER2"], a: 2, e: "O TP53 (“guardião do genoma”) está mutado em cerca de metade dos cânceres. RAS, MYC e HER2 são oncogenes." },
      { q: "Corpúsculos de Mallory-Denk estão classicamente associados a:", o: ["Hepatite alcoólica", "Hepatite A", "Cirrose biliar", "Hemocromatose"], a: 0, e: "São agregados de filamentos intermediários nos hepatócitos, típicos da hepatopatia alcoólica." }
    ],
    tf: [
      { s: "A apoptose geralmente desencadeia inflamação intensa.", v: false, e: "Falso: a apoptose não provoca inflamação; a necrose, sim." },
      { s: "A metástase é critério definitivo de malignidade.", v: true, e: "Verdadeiro." },
      { s: "O lipoma é um tumor maligno.", v: false, e: "Falso: é benigno. O maligno do tecido adiposo é o lipossarcoma." },
      { s: "A hipoalbuminemia pode causar edema.", v: true, e: "Verdadeiro: reduz a pressão oncótica do plasma." },
      { s: "O infarto branco ocorre tipicamente em órgãos sólidos de circulação terminal.", v: true, e: "Verdadeiro: coração, rim e baço." },
      { s: "A displasia é sempre irreversível.", v: false, e: "Falso: a displasia de baixo grau pode regredir se o estímulo for removido." },
      { s: "O amiloide cora com vermelho Congo e mostra birrefringência verde-maçã.", v: true, e: "Verdadeiro, sob luz polarizada." },
      { s: "Um trombo e um coágulo pós-morte são idênticos.", v: false, e: "Falso: o trombo tem linhas de Zahn e fica aderido à parede do vaso." }
    ],
    pairs: [
      ["Necrose de coagulação", "Infarto do miocárdio"],
      ["Necrose liquefativa", "AVC isquêmico"],
      ["Necrose caseosa", "Tuberculose"],
      ["Necrose gordurosa", "Pancreatite aguda"],
      ["Necrose fibrinoide", "Vasculites"],
      ["Gangrena seca", "Isquemia de membro"]
    ],
    seq: [
      { t: "Fases da cicatrização", items: ["Hemostasia", "Inflamação", "Proliferação (tecido de granulação)", "Remodelamento"], e: "O remodelamento troca colágeno III por colágeno I e pode durar meses." },
      { t: "Sequência adenoma–carcinoma colorretal", items: ["Mucosa normal", "Adenoma", "Adenoma com displasia de alto grau", "Carcinoma in situ", "Carcinoma invasivo", "Metástase"], e: "É por isso que a colonoscopia com retirada de pólipos previne câncer." }
    ],
    cases: [
      {
        title: "Dor na panturrilha após o voo",
        story: "Mulher de 45 anos, em uso de anticoncepcional oral, chega de um voo de 12 horas com a panturrilha esquerda dolorosa e edemaciada. Horas depois, tem dispneia súbita e dor torácica pleurítica.",
        steps: [
          { q: "Qual é o diagnóstico mais provável na perna?", o: ["Celulite", "Trombose venosa profunda", "Ruptura de cisto de Baker", "Insuficiência arterial"], a: 1, e: "Edema e dor unilateral na panturrilha após imobilidade sugerem TVP." },
          { q: "Quais componentes da tríade de Virchow estão presentes?", o: ["Lesão endotelial e estase", "Estase e hipercoagulabilidade", "Apenas lesão endotelial", "Nenhum"], a: 1, e: "Estase pela imobilidade no voo e hipercoagulabilidade pelo estrogênio." },
          { q: "O que explica a dispneia súbita?", o: ["Pneumotórax", "Tromboembolismo pulmonar", "Crise de asma", "Pneumonia"], a: 1, e: "Um êmbolo da TVP migra até a artéria pulmonar (TEP)." }
        ]
      }
    ]
  },
  {
    id: "clinica", cycle: "clinico",
    name: "Urgência & Emergência",
    icon: "🚑",
    color: "#0ea5e9",
    desc: "Raciocínio clínico e emergência.",
    flashcards: [
      { f: "Sequência do ABCDE no trauma", b: "A: via aérea + coluna cervical · B: respiração · C: circulação · D: disfunção neurológica · E: exposição." },
      { f: "Relação compressão:ventilação na RCP do adulto (sem via aérea avançada)", b: "30:2." },
      { f: "Frequência e profundidade das compressões na RCP do adulto", b: "100–120 por minuto, com 5–6 cm de profundidade." },
      { f: "Ritmos chocáveis na parada cardiorrespiratória", b: "Fibrilação ventricular e taquicardia ventricular sem pulso." },
      { f: "Critérios do qSOFA", b: "FR ≥ 22 irpm, alteração do estado mental e PAS ≤ 100 mmHg." },
      { f: "Pontuação mínima e máxima da Escala de Coma de Glasgow", b: "3 a 15." },
      { f: "Marcador mais específico de lesão miocárdica", b: "Troponina (I ou T)." },
      { f: "O sinal de Murphy indica…", b: "Colecistite aguda: a dor interrompe a inspiração profunda à palpação do hipocôndrio direito." }
    ],
    quiz: [
      { q: "Supradesnivelamento de ST em DII, DIII e aVF sugere IAM de parede:", o: ["Anterior", "Lateral", "Inferior", "Septal"], a: 2, e: "DII, DIII e aVF são as derivações inferiores, geralmente pela coronária direita." },
      { q: "Prioridade inicial no tratamento da cetoacidose diabética:", o: ["Bicarbonato IV", "Insulina subcutânea", "Hidratação venosa com soro fisiológico", "Potássio VO"], a: 2, e: "Primeiro, hidratação vigorosa. A insulina IV só começa se K⁺ ≥ 3,3 mEq/L." },
      { q: "Fármaco na PCR em assistolia ou AESP:", o: ["Amiodarona 300 mg", "Adrenalina 1 mg a cada 3–5 min", "Atropina 1 mg", "Lidocaína"], a: 1, e: "Em ritmos não chocáveis, adrenalina o quanto antes, repetida a cada 3–5 minutos." },
      { q: "Paciente inconsciente com glicemia capilar de 35 mg/dL. Conduta imediata:", o: ["Suco de laranja VO", "Glicose hipertônica IV", "Insulina regular", "Observar"], a: 1, e: "Paciente inconsciente não recebe nada por via oral: glicose 50% IV (ou glucagon IM se não houver acesso)." },
      { q: "Valor da Escala de Glasgow que geralmente indica intubação para proteger a via aérea:", o: ["≤ 13", "≤ 11", "≤ 8", "≤ 3"], a: 2, e: "“Glasgow 8, intuba.”" },
      { q: "Dor à descompressão brusca do abdome (irritação peritoneal) é o sinal de:", o: ["Rovsing", "Blumberg", "Murphy", "Giordano"], a: 1, e: "Sinal de Blumberg; no ponto de McBurney, sugere apendicite." }
    ],
    tf: [
      { s: "Na PCR em fibrilação ventricular, deve-se desfibrilar o mais rápido possível.", v: true, e: "Verdadeiro: a desfibrilação precoce é o principal determinante da sobrevida na FV." },
      { s: "A assistolia é um ritmo chocável.", v: false, e: "Falso: assistolia e AESP não são chocáveis." },
      { s: "Hipotensão, turgência jugular e abafamento de bulhas formam a tríade de Beck.", v: true, e: "Verdadeiro: sugere tamponamento cardíaco." },
      { s: "No AVC isquêmico, a trombólise IV pode ser feita até 4,5 h do início dos sintomas, se houver critérios.", v: true, e: "Verdadeiro (alteplase ou tenecteplase, respeitando as contraindicações)." },
      { s: "Na anafilaxia, o anti-histamínico é o fármaco de primeira linha.", v: false, e: "Falso: a primeira linha é a adrenalina IM." },
      { s: "No pneumotórax hipertensivo, deve-se aguardar o raio-X antes de descomprimir.", v: false, e: "Falso: o diagnóstico é clínico e a descompressão é imediata." },
      { s: "Febre em paciente neutropênico é uma emergência.", v: true, e: "Verdadeiro: antibiótico de amplo espectro em até 1 hora." },
      { s: "Na hipercalemia grave com alteração no ECG, o gluconato de cálcio estabiliza a membrana do miocárdio.", v: true, e: "Verdadeiro: ele não baixa o K⁺, mas protege o coração." }
    ],
    pairs: [
      ["Tríade de Beck", "Tamponamento cardíaco"],
      ["Sinal de Murphy", "Colecistite aguda"],
      ["Sinal de Blumberg", "Irritação peritoneal"],
      ["Respiração de Kussmaul", "Cetoacidose diabética"],
      ["Sinal de Babinski", "Lesão do neurônio motor superior"],
      ["Sinal de Kernig", "Irritação meníngea"]
    ],
    seq: [
      { t: "Cadeia de sobrevivência na PCR fora do hospital", items: ["Reconhecer e acionar o socorro", "RCP imediata", "Desfibrilação rápida", "Suporte avançado", "Cuidados pós-PCR", "Recuperação"], e: "As compressões de qualidade e o choque precoce são o que mais salva vidas." },
      { t: "Avaliação primária no trauma (ABCDE)", items: ["Via aérea e coluna cervical", "Respiração e ventilação", "Circulação e controle de hemorragias", "Disfunção neurológica", "Exposição e controle do ambiente"], e: "Em hemorragia exsanguinante, o controle do sangramento vem antes (XABCDE)." }
    ],
    cases: [
      {
        title: "Dor torácica no plantão",
        story: "Homem de 58 anos, hipertenso e tabagista, com dor retroesternal em aperto há 40 minutos, irradiando para o braço esquerdo, com sudorese. O ECG mostra supradesnivelamento de ST de V1 a V4.",
        steps: [
          { q: "Qual é o diagnóstico?", o: ["Pericardite aguda", "IAM com supra de ST de parede anterior", "Dissecção de aorta", "Angina estável"], a: 1, e: "Supra de ST em V1–V4 com dor típica indica IAMCSST anterior." },
          { q: "Qual artéria está mais provavelmente ocluída?", o: ["Coronária direita", "Circunflexa", "Descendente anterior", "Descendente posterior"], a: 2, e: "A parede anterior/septal é irrigada pela descendente anterior." },
          { q: "Que antiagregante deve ser dado logo de início, se não houver contraindicação?", o: ["AAS (ácido acetilsalicílico)", "Varfarina", "Clopidogrel isolado", "Nenhum"], a: 0, e: "AAS 160–325 mg mastigado, junto com um segundo antiagregante (dupla antiagregação)." },
          { q: "Melhor estratégia de reperfusão se disponível em até 120 minutos:", o: ["Trombólise em 24 h", "Angioplastia primária", "Tratamento clínico apenas", "Cirurgia de revascularização eletiva"], a: 1, e: "A ICP primária é preferível quando realizada em tempo hábil (porta-balão ≤ 90–120 min)." }
        ]
      }
    ]
  }
];

window.STUDY_TIPS = [
  "🧠 Recordação ativa: tente lembrar a resposta ANTES de virar o card. O esforço é o que fixa.",
  "📅 Revisão espaçada: revise no dia seguinte, depois em 3 dias, 1 semana… O app agenda para você.",
  "🔀 Intercalação: misture matérias no Modo Desafio. Isso treina o raciocínio de prova.",
  "❌ Caderno de erros: seus erros viram uma revisão própria. É onde está o maior ganho.",
  "🍅 Pomodoro: 25 min de foco total + 5 min de pausa. A cada 4 ciclos, uma pausa longa.",
  "🗣️ Técnica de Feynman: explique o tema em voz alta como se fosse para um leigo.",
  "😴 O sono consolida a memória. Revisar à noite e dormir bem rende mais que virar a madrugada.",
  "🏥 Casos clínicos conectam a teoria à prática. Pergunte-se sempre: “e se fosse meu paciente?”"
];
