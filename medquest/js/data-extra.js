// Matérias adicionais (ciclo básico e ciclo clínico).
window.WORLDS.push(
  {
    id: "bioq", cycle: "basico", name: "Bioquímica", icon: "🧪", color: "#14b8a6",
    desc: "Metabolismo, enzimas e vitaminas.",
    flashcards: [
      { f: "Enzima limitante da glicólise", b: "Fosfofrutocinase-1 (PFK-1)." },
      { f: "Saldo da glicólise por molécula de glicose", b: "2 ATP e 2 NADH (gera 2 piruvatos)." },
      { f: "Onde ocorre o ciclo de Krebs?", b: "Na matriz mitocondrial." },
      { f: "Enzima limitante da síntese de colesterol", b: "HMG-CoA redutase (alvo das estatinas)." },
      { f: "Vitamina cofator da piruvato desidrogenase, deficiente no alcoolismo", b: "Tiamina (B1)." },
      { f: "Enzima deficiente na fenilcetonúria", b: "Fenilalanina hidroxilase." },
      { f: "Onde ocorre o ciclo da ureia?", b: "No fígado (parte na mitocôndria, parte no citosol)." },
      { f: "Ligação que une aminoácidos nas proteínas", b: "Ligação peptídica." }
    ],
    quiz: [
      { q: "Produto final da glicólise anaeróbia nas hemácias:", o: ["Acetil-CoA", "Lactato", "Etanol", "Oxaloacetato"], a: 1, e: "Sem mitocôndrias, a hemácia converte o piruvato em lactato para regenerar NAD⁺." },
      { q: "Hormônio que estimula a gliconeogênese no jejum:", o: ["Insulina", "Glucagon", "Leptina", "Ocitocina"], a: 1, e: "O glucagon estimula a glicogenólise e a gliconeogênese hepáticas." },
      { q: "Vitamina necessária para a γ-carboxilação dos fatores II, VII, IX e X:", o: ["Vitamina A", "Vitamina D", "Vitamina E", "Vitamina K"], a: 3, e: "Por isso a varfarina, antagonista da vitamina K, é anticoagulante." },
      { q: "A deficiência de G6PD predispõe a:", o: ["Hemólise após estresse oxidativo", "Hipoglicemia de jejum", "Gota", "Hipercolesterolemia"], a: 0, e: "Sem NADPH suficiente, a hemácia não se protege de oxidantes como fava, sulfas e primaquina." },
      { q: "Aceptor final de elétrons na cadeia respiratória:", o: ["NAD⁺", "FAD", "Oxigênio", "Citocromo c"], a: 2, e: "O O₂ é reduzido a água no complexo IV." },
      { q: "Os corpos cetônicos são produzidos a partir de:", o: ["Glicose, no músculo", "Acetil-CoA, no fígado", "Aminoácidos, no rim", "Lactato, nas hemácias"], a: 1, e: "No jejum prolongado, o fígado transforma acetil-CoA da β-oxidação em corpos cetônicos." }
    ],
    tf: [
      { s: "O ciclo de Krebs ocorre no citosol.", v: false, e: "Falso: ocorre na matriz mitocondrial." },
      { s: "A insulina estimula a síntese de glicogênio.", v: true, e: "Verdadeiro: ativa a glicogênio sintase." },
      { s: "No jejum prolongado, o cérebro pode usar corpos cetônicos.", v: true, e: "Verdadeiro: isso poupa glicose e proteína muscular." },
      { s: "O fígado usa corpos cetônicos como fonte de energia.", v: false, e: "Falso: o fígado produz, mas não consegue usar (falta a enzima tioforase)." },
      { s: "A vitamina C é necessária para a hidroxilação do colágeno.", v: true, e: "Verdadeiro: a deficiência causa escorbuto." },
      { s: "O ácido úrico é produto da degradação das purinas.", v: true, e: "Verdadeiro: o acúmulo causa gota." }
    ],
    pairs: [
      ["Tiamina (B1)", "Beribéri e Wernicke"],
      ["Niacina (B3)", "Pelagra"],
      ["Vitamina C", "Escorbuto"],
      ["Vitamina D", "Raquitismo"],
      ["Vitamina B12", "Anemia megaloblástica com neuropatia"],
      ["Vitamina A", "Cegueira noturna"]
    ],
    seq: [
      { t: "Etapas da glicólise", items: ["Glicose", "Glicose-6-fosfato", "Frutose-6-fosfato", "Frutose-1,6-bisfosfato", "Gliceraldeído-3-fosfato", "Fosfoenolpiruvato", "Piruvato"], e: "A PFK-1 converte frutose-6-fosfato em frutose-1,6-bisfosfato: é o passo limitante." },
      { t: "Respiração celular", items: ["Glicólise (citosol)", "Descarboxilação do piruvato", "Ciclo de Krebs", "Cadeia transportadora de elétrons", "ATP sintase (fosforilação oxidativa)"], e: "A maior parte do ATP vem da fosforilação oxidativa." }
    ],
    cases: [{
      title: "Odor de mofo na urina",
      story: "Criança de 1 ano com atraso do desenvolvimento, pele e cabelos muito claros e urina com odor de mofo. O teste do pezinho não foi feito.",
      steps: [
        { q: "Qual é a hipótese diagnóstica?", o: ["Galactosemia", "Fenilcetonúria", "Doença do xarope de bordo", "Hipotireoidismo congênito"], a: 1, e: "O acúmulo de fenilalanina causa deficiência intelectual, hipopigmentação e odor de mofo." },
        { q: "Qual enzima é deficiente?", o: ["Tirosinase", "Fenilalanina hidroxilase", "Homogentisato oxidase", "Galactose-1-fosfato uridiltransferase"], a: 1, e: "Sem ela, a fenilalanina não é convertida em tirosina." },
        { q: "Qual é a base do tratamento?", o: ["Reposição de tiamina", "Dieta pobre em fenilalanina", "Transplante hepático imediato", "Dieta sem lactose"], a: 1, e: "Dieta restrita em fenilalanina, com suplementação de tirosina, por toda a vida." }
      ]
    }]
  },
  {
    id: "histo", cycle: "basico", name: "Histologia", icon: "🧫", color: "#f97316",
    desc: "Tecidos, células e epitélios.",
    flashcards: [
      { f: "Epitélio da epiderme", b: "Estratificado pavimentoso queratinizado." },
      { f: "Epitélio da traqueia", b: "Pseudoestratificado colunar ciliado, com células caliciformes." },
      { f: "Epitélio da bexiga", b: "Urotélio (epitélio de transição)." },
      { f: "Célula que forma a mielina no SNC", b: "Oligodendrócito. No SNP, é a célula de Schwann." },
      { f: "Colágeno mais abundante (osso, pele e tendão)", b: "Colágeno tipo I." },
      { f: "Célula que reabsorve osso", b: "Osteoclasto (multinucleado, de origem monocítica)." },
      { f: "Células gástricas que secretam HCl e fator intrínseco", b: "Células parietais (oxínticas)." },
      { f: "Junção que bloqueia a passagem entre as células", b: "Zônula de oclusão (tight junction)." }
    ],
    quiz: [
      { q: "Camada mais profunda da epiderme, onde ocorrem as mitoses:", o: ["Córnea", "Granulosa", "Espinhosa", "Basal"], a: 3, e: "A camada basal tem as células-tronco que renovam a epiderme." },
      { q: "Cartilagem da orelha externa e da epiglote:", o: ["Hialina", "Elástica", "Fibrocartilagem", "Calcificada"], a: 1, e: "As fibras elásticas dão flexibilidade." },
      { q: "Macrófago residente do fígado:", o: ["Célula de Kupffer", "Célula de Ito", "Micróglia", "Célula de Langerhans"], a: 0, e: "As células de Kupffer ficam nos sinusoides hepáticos." },
      { q: "As células de Leydig produzem:", o: ["Espermatozoides", "Inibina", "Testosterona", "Proteína ligadora de andrógenos"], a: 2, e: "Ficam no interstício testicular e respondem ao LH." },
      { q: "Músculo que apresenta discos intercalares:", o: ["Liso visceral", "Estriado esquelético", "Estriado cardíaco", "Liso vascular"], a: 2, e: "Os discos intercalares acoplam os cardiomiócitos elétrica e mecanicamente." },
      { q: "Epitélio do intestino delgado:", o: ["Estratificado pavimentoso", "Simples colunar com microvilosidades", "Pseudoestratificado ciliado", "Simples pavimentoso"], a: 1, e: "As microvilosidades (borda em escova) aumentam a absorção." }
    ],
    tf: [
      { s: "O tecido epitelial é avascular.", v: true, e: "Verdadeiro: é nutrido por difusão a partir do conjuntivo." },
      { s: "A cartilagem hialina é ricamente vascularizada.", v: false, e: "Falso: a cartilagem é avascular, por isso cicatriza mal." },
      { s: "As células de Sertoli sustentam a espermatogênese.", v: true, e: "Verdadeiro: formam também a barreira hematotesticular." },
      { s: "Os osteócitos ficam dentro de lacunas na matriz óssea.", v: true, e: "Verdadeiro." },
      { s: "O músculo liso tem estrias transversais.", v: false, e: "Falso: não tem sarcômeros organizados em estrias." },
      { s: "Os astrócitos formam a bainha de mielina no SNC.", v: false, e: "Falso: quem forma são os oligodendrócitos." }
    ],
    pairs: [
      ["Pneumócito tipo I", "Troca gasosa"],
      ["Pneumócito tipo II", "Surfactante"],
      ["Célula de Kupffer", "Macrófago hepático"],
      ["Micróglia", "Macrófago do SNC"],
      ["Osteoblasto", "Forma matriz óssea"],
      ["Melanócito", "Produz melanina"]
    ],
    seq: [
      { t: "Camadas da epiderme (da profunda à superficial)", items: ["Basal", "Espinhosa", "Granulosa", "Lúcida", "Córnea"], e: "A camada lúcida só aparece na pele espessa (palmas e plantas)." },
      { t: "Camadas do tubo digestivo (da luz para fora)", items: ["Mucosa", "Submucosa", "Muscular externa", "Serosa ou adventícia"], e: "O plexo de Meissner fica na submucosa; o de Auerbach, na muscular externa." }
    ],
    cases: [{
      title: "Biópsia de esôfago",
      story: "Homem de 55 anos com refluxo gastroesofágico há 15 anos. A biópsia do esôfago distal mostra epitélio colunar com células caliciformes.",
      steps: [
        { q: "Qual é o epitélio normal do esôfago?", o: ["Simples colunar", "Estratificado pavimentoso não queratinizado", "Pseudoestratificado ciliado", "Estratificado pavimentoso queratinizado"], a: 1, e: "É o epitélio de revestimento resistente ao atrito, sem queratina." },
        { q: "Como se chama essa troca adaptativa de epitélio?", o: ["Hiperplasia", "Displasia", "Metaplasia intestinal (esôfago de Barrett)", "Anaplasia"], a: 2, e: "Um epitélio maduro é substituído por outro mais resistente ao ácido." },
        { q: "Qual neoplasia tem risco aumentado?", o: ["Carcinoma epidermoide de pele", "Adenocarcinoma de esôfago", "Linfoma gástrico", "GIST"], a: 1, e: "O Barrett é o principal precursor do adenocarcinoma de esôfago." }
      ]
    }]
  },
  {
    id: "embrio", cycle: "basico", name: "Embriologia", icon: "👶", color: "#84cc16",
    desc: "Do zigoto à circulação fetal.",
    flashcards: [
      { f: "Os três folhetos embrionários", b: "Ectoderma, mesoderma e endoderma." },
      { f: "De qual folheto deriva o sistema nervoso?", b: "Ectoderma (tubo neural e crista neural)." },
      { f: "De qual folheto derivam o coração e os rins?", b: "Mesoderma." },
      { f: "De qual folheto deriva o epitélio dos tratos digestivo e respiratório?", b: "Endoderma." },
      { f: "O que previne defeitos de fechamento do tubo neural?", b: "Ácido fólico, iniciado antes da concepção." },
      { f: "Período mais crítico para malformações", b: "Da 3ª à 8ª semana (organogênese)." },
      { f: "Estrutura fetal que desvia sangue da artéria pulmonar para a aorta", b: "Ducto arterioso." },
      { f: "Estrutura fetal que desvia sangue do átrio direito para o esquerdo", b: "Forame oval." }
    ],
    quiz: [
      { q: "Em que semana ocorre a gastrulação?", o: ["1ª", "2ª", "3ª", "6ª"], a: 2, e: "Na 3ª semana, o disco bilaminar vira trilaminar (ectoderma, mesoderma e endoderma)." },
      { q: "Qual destes deriva da crista neural?", o: ["Hepatócitos", "Melanócitos", "Cardiomiócitos", "Pneumócitos"], a: 1, e: "A crista neural também origina gânglios, medula adrenal e parte da face." },
      { q: "O divertículo de Meckel é resquício do:", o: ["Úraco", "Ducto onfalomesentérico (vitelino)", "Ducto de Müller", "Seio urogenital"], a: 1, e: "Regra dos 2: 2% da população, a cerca de 2 pés da válvula ileocecal." },
      { q: "O ducto venoso leva sangue:", o: ["Da aorta para a artéria pulmonar", "Da veia umbilical para a veia cava inferior", "Do átrio direito para o esquerdo", "Da artéria umbilical para a placenta"], a: 1, e: "Desvia parte do sangue oxigenado do fígado direto para a cava inferior." },
      { q: "A fenda labial resulta da falha de fusão entre:", o: ["Processos palatinos", "Processo maxilar e processo nasal medial", "Processos mandibulares", "Processos nasais laterais"], a: 1, e: "A fenda palatina, por sua vez, vem da falha de fusão dos processos palatinos." },
      { q: "Quando ocorre a implantação do blastocisto?", o: ["1º dia", "6º–7º dia", "14º dia", "21º dia"], a: 1, e: "Cerca de uma semana após a fecundação, no endométrio." }
    ],
    tf: [
      { s: "A fecundação ocorre normalmente na ampola da tuba uterina.", v: true, e: "Verdadeiro." },
      { s: "O coração começa a bater por volta da 4ª semana.", v: true, e: "Verdadeiro: é o primeiro órgão funcional do embrião." },
      { s: "A notocorda origina os corpos vertebrais do adulto.", v: false, e: "Falso: a notocorda origina o núcleo pulposo; as vértebras vêm dos esclerótomos." },
      { s: "Após o nascimento, o ducto arterioso fecha e vira ligamento arterioso.", v: true, e: "Verdadeiro." },
      { s: "O sangue mais oxigenado do feto chega pelas artérias umbilicais.", v: false, e: "Falso: chega pela veia umbilical. As artérias levam sangue pobre em O₂ à placenta." },
      { s: "A placenta é formada apenas por tecido materno.", v: false, e: "Falso: tem parte fetal (córion) e parte materna (decídua)." }
    ],
    pairs: [
      ["Ectoderma", "Epiderme e sistema nervoso"],
      ["Mesoderma", "Músculos, ossos e coração"],
      ["Endoderma", "Epitélio do intestino e pulmões"],
      ["Crista neural", "Melanócitos e gânglios"],
      ["Notocorda", "Núcleo pulposo"],
      ["Ducto arterioso", "Ligamento arterioso"]
    ],
    seq: [
      { t: "Desenvolvimento inicial", items: ["Fecundação", "Zigoto", "Mórula", "Blastocisto", "Implantação", "Gastrulação", "Neurulação"], e: "Do zigoto à neurulação se passam cerca de 4 semanas." },
      { t: "Circulação fetal", items: ["Placenta", "Veia umbilical", "Ducto venoso", "Veia cava inferior", "Átrio direito", "Forame oval", "Átrio esquerdo"], e: "O forame oval leva o sangue mais oxigenado ao lado esquerdo, que irriga o cérebro." }
    ],
    cases: [{
      title: "Pré-natal sem ácido fólico",
      story: "Gestante de 24 anos que não usou ácido fólico. O ultrassom morfológico mostra um defeito aberto na região lombossacra e a alfafetoproteína materna está elevada.",
      steps: [
        { q: "Qual é o diagnóstico mais provável?", o: ["Gastrosquise", "Defeito do tubo neural (mielomeningocele)", "Hérnia diafragmática", "Síndrome de Down"], a: 1, e: "AFP elevada e defeito lombossacro aberto sugerem espinha bífida aberta." },
        { q: "Quando o tubo neural normalmente se fecha?", o: ["2ª semana", "4ª semana", "10ª semana", "20ª semana"], a: 1, e: "O neuróporo caudal fecha por volta do dia 26 a 28." },
        { q: "Como prevenir numa próxima gestação?", o: ["Ferro a partir do 2º trimestre", "Ácido fólico desde antes da concepção, em dose maior por ser de alto risco", "Vitamina A em altas doses", "Nada pode ser feito"], a: 1, e: "Em quem já teve filho afetado, recomenda-se dose maior (4–5 mg/dia) desde pelo menos 1 mês antes." }
      ]
    }]
  },
  {
    id: "imuno", cycle: "basico", name: "Imunologia", icon: "🛡️", color: "#6366f1",
    desc: "Anticorpos, células e hipersensibilidades.",
    flashcards: [
      { f: "Imunoglobulina mais abundante no soro, que atravessa a placenta", b: "IgG." },
      { f: "Primeira imunoglobulina produzida na resposta primária", b: "IgM (pentâmero)." },
      { f: "Imunoglobulina das mucosas e do leite materno", b: "IgA secretora (dímero)." },
      { f: "Imunoglobulina das alergias e parasitoses", b: "IgE." },
      { f: "MHC que apresenta antígenos aos linfócitos T CD8", b: "MHC classe I, presente em todas as células nucleadas." },
      { f: "MHC classe II apresenta antígenos a…", b: "Linfócitos T CD4. Está nas células apresentadoras de antígeno." },
      { f: "Principal célula apresentadora de antígeno", b: "Célula dendrítica." },
      { f: "Hipersensibilidade tipo I", b: "Imediata, mediada por IgE e mastócitos (ex.: anafilaxia)." }
    ],
    quiz: [
      { q: "O teste tuberculínico (PPD) é exemplo de hipersensibilidade:", o: ["Tipo I", "Tipo II", "Tipo III", "Tipo IV"], a: 3, e: "É tardia, mediada por linfócitos T, e aparece em 48–72 h." },
      { q: "A doença do soro é hipersensibilidade:", o: ["Tipo I", "Tipo II", "Tipo III", "Tipo IV"], a: 2, e: "É causada pela deposição de imunocomplexos." },
      { q: "A reação transfusional ABO é hipersensibilidade:", o: ["Tipo I", "Tipo II", "Tipo III", "Tipo IV"], a: 1, e: "Anticorpos se ligam a antígenos da superfície das hemácias." },
      { q: "Célula que mata células infectadas sem depender de MHC:", o: ["Linfócito B", "Natural killer", "Plasmócito", "Linfócito T CD4"], a: 1, e: "As NK reconhecem a perda do MHC I (“ausência do próprio”)." },
      { q: "Qual destas é uma vacina de vírus vivo atenuado?", o: ["Hepatite B", "Tríplice viral (sarampo, caxumba e rubéola)", "Influenza inativada", "Antitetânica"], a: 1, e: "Vacinas vivas são, em geral, contraindicadas em gestantes e imunossuprimidos graves." },
      { q: "Citocina que mais estimula o fígado a produzir PCR e outras proteínas de fase aguda:", o: ["IL-2", "IL-4", "IL-6", "IL-10"], a: 2, e: "IL-1, IL-6 e TNF-α são as citocinas pró-inflamatórias clássicas." }
    ],
    tf: [
      { s: "A imunidade inata tem memória imunológica clássica.", v: false, e: "Falso: memória é característica da imunidade adaptativa." },
      { s: "Os linfócitos T amadurecem no timo.", v: true, e: "Verdadeiro." },
      { s: "Os linfócitos B amadurecem na medula óssea.", v: true, e: "Verdadeiro." },
      { s: "O complemento pode formar o complexo de ataque à membrana (C5b–C9).", v: true, e: "Verdadeiro: forma poros que lisam a célula-alvo." },
      { s: "A IgM atravessa a placenta.", v: false, e: "Falso: só a IgG atravessa." },
      { s: "A imunização passiva protege de imediato, mas de forma temporária.", v: true, e: "Verdadeiro (ex.: soros e imunoglobulinas)." }
    ],
    pairs: [
      ["Tipo I", "Anafilaxia"],
      ["Tipo II", "Reação transfusional ABO"],
      ["Tipo III", "Doença do soro"],
      ["Tipo IV", "Teste tuberculínico"],
      ["IgA", "Mucosas e leite materno"],
      ["IgE", "Alergia e parasitas"]
    ],
    seq: [
      { t: "Resposta imune adaptativa", items: ["Célula dendrítica capta o antígeno", "Migração até o linfonodo", "Apresentação via MHC ao linfócito T", "Ativação e expansão clonal", "Ação efetora (citotoxicidade e anticorpos)", "Formação de células de memória"], e: "As células de memória tornam a segunda exposição mais rápida e intensa." },
      { t: "Via clássica do complemento", items: ["C1 se liga ao complexo antígeno-anticorpo", "Clivagem de C4 e C2", "Formação da C3 convertase", "C3b faz opsonização", "Formação da C5 convertase", "Complexo de ataque à membrana (C5b–C9)"], e: "A via clássica depende de anticorpos (IgM ou IgG)." }
    ],
    cases: [{
      title: "Picada de abelha",
      story: "Mulher de 30 anos é picada por uma abelha. Minutos depois tem urticária, edema de lábios, chiado no peito e PA de 80x50 mmHg.",
      steps: [
        { q: "Qual tipo de hipersensibilidade?", o: ["Tipo I", "Tipo II", "Tipo III", "Tipo IV"], a: 0, e: "É anafilaxia: reação imediata mediada por IgE." },
        { q: "Quais anticorpo e célula estão envolvidos?", o: ["IgG e neutrófilos", "IgE e mastócitos", "IgM e complemento", "Linfócitos T e macrófagos"], a: 1, e: "A IgE ligada aos mastócitos provoca a liberação de histamina e outros mediadores." },
        { q: "Qual é o tratamento imediato?", o: ["Anti-histamínico oral", "Adrenalina IM", "Corticoide inalatório", "Observação"], a: 1, e: "Adrenalina IM na coxa. Os demais são adjuvantes." }
      ]
    }]
  },
  {
    id: "cardio", cycle: "clinico", name: "Cardiologia", icon: "🫀", color: "#e11d48",
    desc: "Arritmias, sopros e insuficiência cardíaca.",
    flashcards: [
      { f: "Tríade de sintomas da estenose aórtica grave", b: "Angina, síncope e dispneia (insuficiência cardíaca)." },
      { f: "Sopro diastólico em ruflar no foco mitral", b: "Estenose mitral, geralmente reumática." },
      { f: "Critérios de Duke servem para…", b: "Diagnosticar endocardite infecciosa." },
      { f: "Os 4 pilares que reduzem mortalidade na IC com fração de ejeção reduzida", b: "IECA/BRA ou sacubitril-valsartana, betabloqueador, antagonista mineralocorticoide e iSGLT2." },
      { f: "Escore que guia a anticoagulação na fibrilação atrial", b: "CHA₂DS₂-VASc." },
      { f: "Onda T apiculada e QRS alargado no ECG", b: "Hipercalemia." },
      { f: "ECG típico da pericardite aguda", b: "Supra de ST difuso com infradesnivelamento de PR." },
      { f: "O que a terceira bulha (B3) indica?", b: "Sobrecarga de volume ou disfunção ventricular. Pode ser normal em jovens." }
    ],
    quiz: [
      { q: "Arritmia sustentada mais comum na prática clínica:", o: ["Flutter atrial", "Fibrilação atrial", "Taquicardia ventricular", "Bloqueio AV total"], a: 1, e: "A prevalência aumenta muito com a idade." },
      { q: "Em adultos, a principal causa de insuficiência cardíaca no mundo é:", o: ["Doença de Chagas", "Cardiopatia isquêmica", "Miocardite viral", "Amiloidose"], a: 1, e: "No Brasil, a doença de Chagas também é causa importante." },
      { q: "Pulso parvus et tardus é típico de:", o: ["Insuficiência aórtica", "Estenose aórtica", "Estenose mitral", "Tamponamento"], a: 1, e: "É um pulso de pequena amplitude e ascensão lenta." },
      { q: "Taquicardia com pulso e instabilidade (hipotensão, rebaixamento):", o: ["Amiodarona oral", "Cardioversão elétrica sincronizada", "Desfibrilação não sincronizada", "Observar"], a: 1, e: "Taquiarritmia instável com pulso pede cardioversão sincronizada." },
      { q: "Taquicardia supraventricular estável, após manobra vagal sem sucesso:", o: ["Adenosina IV", "Atropina", "Adrenalina", "Digoxina IM"], a: 0, e: "Adenosina em bolus rápido, seguida de flush de soro." },
      { q: "Quadro clássico da dissecção aguda de aorta:", o: ["Dor em pontada que melhora sentado", "Dor súbita lancinante irradiando para o dorso, com assimetria de pulsos", "Dor em queimação após refeições", "Dor que piora à palpação"], a: 1, e: "Nesse caso, nunca trombolisar sem antes excluir dissecção." }
    ],
    tf: [
      { s: "A fibrilação atrial aumenta o risco de AVC cardioembólico.", v: true, e: "Verdadeiro: forma trombos no apêndice atrial esquerdo." },
      { s: "O BNP costuma estar baixo na insuficiência cardíaca descompensada.", v: false, e: "Falso: o BNP sobe com o estiramento ventricular." },
      { s: "No bloqueio AV total, ondas P e QRS são dissociados.", v: true, e: "Verdadeiro: átrios e ventrículos batem de forma independente." },
      { s: "A doença de Chagas pode causar cardiomiopatia dilatada e arritmias.", v: true, e: "Verdadeiro: inclusive aneurisma de ponta e morte súbita." },
      { s: "Na IC com fração de ejeção reduzida estável, o betabloqueador deve ser suspenso de rotina.", v: false, e: "Falso: é um dos pilares que reduzem mortalidade." },
      { s: "A febre reumática é complicação da faringite por estreptococo do grupo A.", v: true, e: "Verdadeiro: tratar a faringite previne a doença." }
    ],
    pairs: [
      ["Estenose aórtica", "Sopro sistólico ejetivo"],
      ["Estenose mitral", "Ruflar diastólico"],
      ["Insuficiência mitral", "Holossistólico irradiado para axila"],
      ["Insuficiência aórtica", "Diastólico aspirativo"],
      ["Pericardite", "Atrito pericárdico"],
      ["Comunicação interventricular", "Holossistólico na borda esternal esquerda"]
    ],
    seq: [
      { t: "Ciclo cardíaco", items: ["Enchimento ventricular", "Contração atrial", "Fechamento das valvas AV (B1)", "Contração isovolumétrica", "Ejeção ventricular", "Fechamento das valvas semilunares (B2)", "Relaxamento isovolumétrico"], e: "B1 marca o início da sístole e B2, o início da diástole." },
      { t: "Trajeto do sangue", items: ["Veias cavas", "Átrio direito", "Ventrículo direito", "Artéria pulmonar", "Veias pulmonares", "Átrio esquerdo", "Ventrículo esquerdo", "Aorta"], e: "A artéria pulmonar leva sangue pobre em O₂; as veias pulmonares trazem sangue oxigenado." }
    ],
    cases: [{
      title: "Palpitações irregulares",
      story: "Mulher de 72 anos, hipertensa e diabética, com palpitações. O ECG mostra ritmo irregularmente irregular, sem ondas P, com FC de 110 bpm.",
      steps: [
        { q: "Qual é o diagnóstico?", o: ["Flutter atrial", "Fibrilação atrial", "Taquicardia sinusal", "Extrassístoles ventriculares"], a: 1, e: "Ritmo irregularmente irregular sem onda P é FA." },
        { q: "Qual é o CHA₂DS₂-VASc dela?", o: ["1", "2", "3", "4"], a: 3, e: "Sexo feminino (1) + idade 65–74 (1) + hipertensão (1) + diabetes (1) = 4." },
        { q: "Qual é a conduta para prevenir AVC?", o: ["Apenas AAS", "Anticoagulação oral", "Nenhuma", "Clopidogrel isolado"], a: 1, e: "Escore alto indica anticoagulação (DOAC ou varfarina), avaliando o risco de sangramento." }
      ]
    }]
  },
  {
    id: "neuro", cycle: "clinico", name: "Neurologia", icon: "🧠", color: "#a855f7",
    desc: "AVC, epilepsia e doenças neurodegenerativas.",
    flashcards: [
      { f: "Janela para trombólise IV no AVC isquêmico", b: "Até 4,5 h do início dos sintomas, respeitando os critérios." },
      { f: "Primeiro exame de imagem no AVC agudo", b: "TC de crânio sem contraste, para excluir hemorragia." },
      { f: "Tríade da hidrocefalia de pressão normal", b: "Demência, incontinência urinária e marcha magnética." },
      { f: "Tremor de repouso, rigidez e bradicinesia", b: "Doença de Parkinson." },
      { f: "“Pior dor de cabeça da vida”, súbita (em trovoada)", b: "Hemorragia subaracnóidea até prova em contrário." },
      { f: "Primeira linha no estado de mal epiléptico", b: "Benzodiazepínico (diazepam IV ou midazolam IM)." },
      { f: "Fraqueza ascendente após infecção, com arreflexia", b: "Síndrome de Guillain-Barré." },
      { f: "Afasia de Broca", b: "Fala não fluente com compreensão preservada (lobo frontal inferior esquerdo)." }
    ],
    quiz: [
      { q: "Hemiparesia direita de predomínio braquiofacial com afasia sugere oclusão da:", o: ["Cerebral anterior esquerda", "Cerebral média esquerda", "Cerebral posterior direita", "Basilar"], a: 1, e: "A ACM irriga a face lateral do hemisfério, incluindo as áreas da linguagem (à esquerda)." },
      { q: "Neurotransmissor deficiente na doença de Parkinson:", o: ["Acetilcolina", "Serotonina", "Dopamina", "GABA"], a: 2, e: "Há perda de neurônios dopaminérgicos da substância negra." },
      { q: "Anticorpos contra o receptor de acetilcolina caracterizam:", o: ["Esclerose múltipla", "Miastenia gravis", "Lambert-Eaton", "ELA"], a: 1, e: "A fraqueza flutua e piora com o esforço; ptose e diplopia são comuns." },
      { q: "Ptose, miose e anidrose formam a síndrome de:", o: ["Horner", "Wallenberg", "Brown-Séquard", "Weber"], a: 0, e: "É a lesão da via simpática para a face." },
      { q: "Achado da lesão do neurônio motor superior:", o: ["Fasciculações", "Hiporreflexia", "Hiperreflexia e sinal de Babinski", "Atrofia precoce"], a: 2, e: "Há também espasticidade. Fasciculações e atrofia indicam neurônio motor inferior." },
      { q: "O ataque isquêmico transitório (AIT) é:", o: ["Déficit que dura mais de 24 h", "Déficit focal transitório sem infarto na imagem", "Sempre hemorrágico", "Crise convulsiva"], a: 1, e: "É um alerta de alto risco para AVC: investigar e prevenir." }
    ],
    tf: [
      { s: "Na esclerose múltipla há desmielinização no SNC.", v: true, e: "Verdadeiro: com lesões disseminadas no tempo e no espaço." },
      { s: "O AVC hemorrágico é mais frequente que o isquêmico.", v: false, e: "Falso: cerca de 85% dos AVCs são isquêmicos." },
      { s: "A paralisia facial periférica (de Bell) poupa a testa.", v: false, e: "Falso: a periférica acomete toda a hemiface. A central é que poupa a testa." },
      { s: "Alzheimer é a causa mais comum de demência.", v: true, e: "Verdadeiro." },
      { s: "A punção lombar é útil na investigação de meningite.", v: true, e: "Verdadeiro, após excluir hipertensão intracraniana quando indicado." },
      { s: "Na lesão do neurônio motor inferior há fasciculações e atrofia.", v: true, e: "Verdadeiro, com hiporreflexia e flacidez." }
    ],
    pairs: [
      ["Doença de Parkinson", "Tremor de repouso"],
      ["Miastenia gravis", "Fraqueza que piora com esforço"],
      ["Guillain-Barré", "Paralisia flácida ascendente"],
      ["Esclerose múltipla", "Desmielinização do SNC"],
      ["Doença de Alzheimer", "Perda de memória recente"],
      ["ELA", "Neurônio motor superior e inferior"]
    ],
    seq: [
      { t: "Arco reflexo patelar", items: ["Percussão do tendão patelar", "Estiramento do fuso muscular", "Neurônio sensitivo (aferente)", "Sinapse na medula espinal", "Neurônio motor (eferente)", "Contração do quadríceps"], e: "É um reflexo monossináptico (L2–L4)." },
      { t: "Do couro cabeludo ao córtex", items: ["Couro cabeludo", "Crânio", "Dura-máter", "Aracnoide", "Espaço subaracnóideo (líquor)", "Pia-máter", "Córtex cerebral"], e: "O hematoma epidural fica entre o crânio e a dura; o subdural, entre a dura e a aracnoide." }
    ],
    cases: [{
      title: "Déficit súbito",
      story: "Homem de 68 anos com desvio da rima labial, fraqueza no braço direito e dificuldade para falar há 1h30. Glicemia capilar de 110 mg/dL.",
      steps: [
        { q: "Qual território vascular está provavelmente acometido?", o: ["Artéria cerebral média esquerda", "Artéria cerebral posterior direita", "Território vertebrobasilar", "Artéria cerebral anterior direita"], a: 0, e: "Déficit braquiofacial direito com afasia: ACM esquerda." },
        { q: "Qual é o primeiro exame de imagem?", o: ["RM com contraste", "TC de crânio sem contraste", "Doppler de carótidas", "Arteriografia"], a: 1, e: "É rápida e exclui hemorragia antes da trombólise." },
        { q: "TC sem sangramento e sem contraindicações. Qual é a conduta?", o: ["AAS e alta", "Trombólise IV", "Anticoagulação plena imediata", "Aguardar 24 h"], a: 1, e: "Está dentro da janela de 4,5 h. Avaliar também trombectomia se houver oclusão de grande vaso." }
      ]
    }]
  },
  {
    id: "pedi", cycle: "clinico", name: "Pediatria", icon: "🧸", color: "#f472b6",
    desc: "Desenvolvimento, exantemas e doenças da infância.",
    flashcards: [
      { f: "Taquipneia em menores de 2 meses (OMS)", b: "FR ≥ 60 irpm. De 2 a 11 meses: ≥ 50; de 1 a 4 anos: ≥ 40." },
      { f: "Idade em que a criança costuma sentar sem apoio", b: "Por volta dos 6 meses." },
      { f: "Até quando o aleitamento materno deve ser exclusivo?", b: "Até os 6 meses, complementado até 2 anos ou mais." },
      { f: "Vírus mais comum da bronquiolite", b: "Vírus sincicial respiratório (VSR)." },
      { f: "Febre alta por 3 dias e exantema quando a febre cede", b: "Exantema súbito (roséola), pelo herpesvírus humano 6." },
      { f: "Manchas de Koplik", b: "Sarampo." },
      { f: "Tosse ladrante, estridor e rouquidão", b: "Crupe viral (laringotraqueobronquite), geralmente por parainfluenza." },
      { f: "Quando coletar o teste do pezinho?", b: "Idealmente entre o 3º e o 5º dia de vida." }
    ],
    quiz: [
      { q: "Criança com desidratação grave (letárgica, não consegue beber). Qual plano da OMS?", o: ["Plano A", "Plano B", "Plano C", "Nenhum"], a: 2, e: "Plano C é hidratação venosa. Plano A é em casa; plano B é terapia de reidratação oral na unidade." },
      { q: "Tratamento da doença de Kawasaki:", o: ["Antibiótico", "Imunoglobulina IV + AAS", "Corticoide isolado", "Apenas observação"], a: 1, e: "Reduz o risco de aneurismas coronarianos." },
      { q: "Icterícia nas primeiras 24 h de vida é:", o: ["Fisiológica", "Sempre patológica", "Pelo leite materno", "Sem importância"], a: 1, e: "Pensar em hemólise (ex.: incompatibilidade Rh ou ABO)." },
      { q: "Exantema que começa com “face esbofeteada”:", o: ["Sarampo", "Eritema infeccioso (parvovírus B19)", "Escarlatina", "Rubéola"], a: 1, e: "Depois aparece um exantema rendilhado no tronco e nos membros." },
      { q: "Agente da escarlatina:", o: ["Staphylococcus aureus", "Streptococcus pyogenes", "Parvovírus B19", "HHV-6"], a: 1, e: "Exantema áspero (“em lixa”), língua em framboesa e sinal de Pastia." },
      { q: "Marco esperado por volta dos 12 meses:", o: ["Sorriso social", "Sustentar a cabeça", "Andar e falar as primeiras palavras", "Formar frases de 3 palavras"], a: 2, e: "Frases com 3 palavras surgem por volta dos 2 a 3 anos." }
    ],
    tf: [
      { s: "O sorriso social aparece por volta dos 2 meses.", v: true, e: "Verdadeiro." },
      { s: "Pode-se oferecer mel a bebês com menos de 1 ano.", v: false, e: "Falso: há risco de botulismo infantil." },
      { s: "Na bronquiolite viral típica, o tratamento é principalmente de suporte.", v: true, e: "Verdadeiro: hidratação, aspiração nasal e oxigênio se necessário." },
      { s: "A vacina BCG é aplicada ao nascer.", v: true, e: "Verdadeiro, em dose única." },
      { s: "Febre em lactente com menos de 3 meses exige avaliação cuidadosa.", v: true, e: "Verdadeiro: o risco de infecção bacteriana grave é maior." },
      { s: "O reflexo de Moro persiste normalmente até os 2 anos.", v: false, e: "Falso: desaparece por volta dos 4 a 6 meses." }
    ],
    pairs: [
      ["Sarampo", "Manchas de Koplik"],
      ["Rubéola", "Linfonodos retroauriculares"],
      ["Eritema infeccioso", "Face esbofeteada"],
      ["Exantema súbito", "Exantema após a febre ceder"],
      ["Escarlatina", "Língua em framboesa"],
      ["Varicela", "Lesões em vários estágios"]
    ],
    seq: [
      { t: "Marcos do desenvolvimento motor", items: ["Sustenta a cabeça", "Rola", "Senta sem apoio", "Engatinha", "Anda sozinho", "Sobe escadas"], e: "Aproximadamente: 3 meses, 4–5 meses, 6 meses, 9 meses, 12–15 meses e cerca de 2 anos." }
    ],
    cases: [{
      title: "Lactente chiando",
      story: "Bebê de 4 meses, no inverno, com coriza há 3 dias. Agora tem taquipneia, tiragem subcostal e sibilos. Saturação de 95%.",
      steps: [
        { q: "Qual é o diagnóstico mais provável?", o: ["Asma", "Bronquiolite viral aguda", "Pneumonia bacteriana", "Coqueluche"], a: 1, e: "Primeiro episódio de sibilância em menor de 2 anos, após pródromo viral." },
        { q: "Qual é o agente mais comum?", o: ["Rinovírus", "VSR", "Adenovírus", "Influenza"], a: 1, e: "O vírus sincicial respiratório." },
        { q: "Qual é a conduta principal?", o: ["Antibiótico", "Corticoide sistêmico", "Suporte: hidratação, aspiração nasal e O₂ se SatO₂ < 90–92%", "Broncodilatador de rotina"], a: 2, e: "Broncodilatadores e corticoides não são recomendados de rotina." }
      ]
    }]
  },
  {
    id: "endo", cycle: "clinico", name: "Endocrinologia", icon: "🦋", color: "#eab308",
    desc: "Diabetes, tireoide e adrenal.",
    flashcards: [
      { f: "Glicemia de jejum diagnóstica de diabetes", b: "≥ 126 mg/dL, confirmada." },
      { f: "HbA1c diagnóstica de diabetes", b: "≥ 6,5%." },
      { f: "Perfil do hipotireoidismo primário", b: "TSH alto e T4 livre baixo." },
      { f: "Causa mais comum de hipertireoidismo", b: "Doença de Graves (anticorpo TRAb estimulador)." },
      { f: "Causa mais comum de hipotireoidismo (em área com iodo suficiente)", b: "Tireoidite de Hashimoto." },
      { f: "Causa mais comum de síndrome de Cushing", b: "Uso de glicocorticoide exógeno." },
      { f: "Hiperaldosteronismo primário: achados clássicos", b: "Hipertensão + hipocalemia, com renina baixa." },
      { f: "Tratamento do hipotireoidismo", b: "Levotiroxina (T4), em jejum." }
    ],
    quiz: [
      { q: "Hiperpigmentação, hipotensão, hiponatremia e hipercalemia sugerem:", o: ["Cushing", "Doença de Addison", "Hiperaldosteronismo", "Feocromocitoma"], a: 1, e: "Na insuficiência adrenal primária, o ACTH alto escurece a pele." },
      { q: "Tríade da cetoacidose diabética:", o: ["Hipoglicemia, alcalose e cetose", "Hiperglicemia, acidose metabólica e cetonemia", "Hiperglicemia, hiperosmolaridade sem cetose", "Hiponatremia, hipercalemia e hipotensão"], a: 1, e: "Hiperglicemia sem cetose importante aponta para o estado hiperosmolar." },
      { q: "Exoftalmia é característica de:", o: ["Hashimoto", "Doença de Graves", "Tireoidite subaguda", "Bócio multinodular"], a: 1, e: "A oftalmopatia de Graves é autoimune." },
      { q: "Tríade clássica do feocromocitoma:", o: ["Cefaleia, sudorese e palpitações", "Poliúria, polidipsia e polifagia", "Febre, rigidez e confusão", "Dor abdominal, vômitos e diarreia"], a: 0, e: "Geralmente com hipertensão paroxística ou sustentada." },
      { q: "Causa mais comum de hiperparatireoidismo primário:", o: ["Carcinoma de paratireoide", "Adenoma de paratireoide", "Hiperplasia por insuficiência renal", "Deficiência de vitamina D"], a: 1, e: "É responsável por cerca de 85% dos casos." },
      { q: "Primeira linha no DM2, se não houver contraindicação:", o: ["Insulina NPH", "Metformina", "Glibenclamida", "Acarbose"], a: 1, e: "Associada a mudança de estilo de vida. Considerar iSGLT2 ou aGLP-1 se houver doença cardiovascular ou renal." }
    ],
    tf: [
      { s: "No DM1 há destruição autoimune das células beta.", v: true, e: "Verdadeiro." },
      { s: "Hipoglicemia é um efeito comum da metformina em monoterapia.", v: false, e: "Falso: a metformina sozinha raramente causa hipoglicemia." },
      { s: "TSH baixo com T4 livre alto sugere hipertireoidismo primário.", v: true, e: "Verdadeiro." },
      { s: "O prolactinoma é o adenoma hipofisário funcionante mais comum.", v: true, e: "Verdadeiro: o tratamento inicial é com agonista dopaminérgico (cabergolina)." },
      { s: "Excesso de GH após o fechamento das epífises causa acromegalia.", v: true, e: "Verdadeiro. Antes do fechamento, causa gigantismo." },
      { s: "O diabetes insípido central é causado por excesso de ADH.", v: false, e: "Falso: é causado pela falta de ADH." }
    ],
    pairs: [
      ["Doença de Graves", "Exoftalmia"],
      ["Hashimoto", "Hipotireoidismo autoimune"],
      ["Doença de Addison", "Hiperpigmentação"],
      ["Síndrome de Cushing", "Estrias violáceas"],
      ["Feocromocitoma", "Crises adrenérgicas"],
      ["Prolactinoma", "Galactorreia e amenorreia"]
    ],
    seq: [
      { t: "Eixo hipotálamo-hipófise-tireoide", items: ["Hipotálamo libera TRH", "Hipófise anterior libera TSH", "Tireoide produz T4 e T3", "T4 é convertido em T3 nos tecidos", "T3 e T4 inibem TRH e TSH"], e: "É o feedback negativo: no hipotireoidismo primário, o TSH sobe." },
      { t: "Secreção de insulina pela célula beta", items: ["Glicose entra pelo GLUT2", "Metabolismo da glicose gera ATP", "Canais de K⁺-ATP se fecham", "Membrana despolariza", "Canais de Ca²⁺ se abrem", "Exocitose de insulina"], e: "As sulfonilureias agem fechando os canais de K⁺-ATP." }
    ],
    cases: [{
      title: "Sede e perda de peso",
      story: "Adolescente de 16 anos com poliúria, polidipsia e perda de 6 kg. Hoje tem vômitos, dor abdominal e respiração profunda. Glicemia de 480 mg/dL, pH 7,10 e cetonúria.",
      steps: [
        { q: "Qual é o diagnóstico?", o: ["Estado hiperosmolar hiperglicêmico", "Cetoacidose diabética", "Gastroenterite", "Acidose lática"], a: 1, e: "Hiperglicemia, acidose e cetose, provavelmente abrindo um DM1." },
        { q: "Qual é a primeira medida?", o: ["Bicarbonato IV", "Hidratação com SF 0,9%", "Insulina subcutânea", "Dieta zero e observar"], a: 1, e: "Expansão volêmica vigorosa na primeira hora." },
        { q: "O que verificar antes de iniciar a insulina IV?", o: ["Sódio", "Potássio", "Cálcio", "Magnésio"], a: 1, e: "A insulina joga o K⁺ para dentro das células. Só iniciar se K⁺ ≥ 3,3 mEq/L." }
      ]
    }]
  },
  {
    id: "infecto", cycle: "clinico", name: "Infectologia", icon: "🦟", color: "#22c55e",
    desc: "Diagnóstico e tratamento das infecções.",
    flashcards: [
      { f: "Esquema básico de tratamento da TB em adultos", b: "RIPE (rifampicina, isoniazida, pirazinamida e etambutol) por 2 meses + RI por 4 meses." },
      { f: "Sinais de alarme da dengue", b: "Dor abdominal intensa, vômitos persistentes, sangramento de mucosa, letargia, hepatomegalia, acúmulo de líquidos e hematócrito subindo." },
      { f: "PrEP para HIV", b: "Profilaxia pré-exposição com tenofovir + entricitabina." },
      { f: "Prazo para iniciar a PEP após exposição ao HIV", b: "Até 72 h, de preferência nas primeiras 2 h." },
      { f: "Tratamento da sífilis primária", b: "Penicilina G benzatina 2,4 milhões UI IM, dose única." },
      { f: "Marcador de infecção aguda por hepatite B", b: "Anti-HBc IgM (com HBsAg positivo)." },
      { f: "Febre, icterícia e insuficiência renal após enchente", b: "Leptospirose (síndrome de Weil)." },
      { f: "Antibiótico na leptospirose grave", b: "Penicilina cristalina ou ceftriaxona." }
    ],
    quiz: [
      { q: "Contagem de CD4 que define AIDS:", o: ["< 500/mm³", "< 350/mm³", "< 200/mm³", "< 50/mm³"], a: 2, e: "Ou a presença de doença definidora de AIDS." },
      { q: "Profilaxia contra Pneumocystis em HIV com CD4 < 200:", o: ["Fluconazol", "Sulfametoxazol-trimetoprima", "Azitromicina", "Aciclovir"], a: 1, e: "Também protege contra toxoplasmose." },
      { q: "Tratamento da malária por P. vivax no Brasil:", o: ["Artemeter + lumefantrina", "Cloroquina + primaquina", "Quinino isolado", "Doxiciclina isolada"], a: 1, e: "A primaquina elimina os hipnozoítos e previne recaídas (dosar G6PD quando possível)." },
      { q: "Agente comum de pneumonia atípica em jovens:", o: ["Klebsiella pneumoniae", "Mycoplasma pneumoniae", "Pseudomonas aeruginosa", "Staphylococcus aureus"], a: 1, e: "Responde a macrolídeos. Betalactâmicos não agem, porque o micoplasma não tem parede celular." },
      { q: "A vacina da febre amarela é do tipo:", o: ["Inativada", "Vírus vivo atenuado", "Toxoide", "Subunidade"], a: 1, e: "Por isso tem restrições em imunossuprimidos." },
      { q: "Precaução indicada na TB pulmonar bacilífera:", o: ["Contato", "Gotículas", "Aerossóis (máscara N95)", "Padrão apenas"], a: 2, e: "Usar quarto com pressão negativa quando disponível." }
    ],
    tf: [
      { s: "Na dengue, AINEs e AAS devem ser evitados.", v: true, e: "Verdadeiro: aumentam o risco de sangramento." },
      { s: "Tratar a gestante previne a sífilis congênita.", v: true, e: "Verdadeiro: com penicilina benzatina no esquema adequado." },
      { s: "HBsAg positivo por mais de 6 meses indica hepatite B crônica.", v: true, e: "Verdadeiro." },
      { s: "Antibióticos são indicados no resfriado comum.", v: false, e: "Falso: é uma infecção viral autolimitada." },
      { s: "Um teste rápido de HIV negativo durante a janela imunológica exclui a infecção.", v: false, e: "Falso: repetir após o fim da janela." },
      { s: "A leptospirose está associada ao contato com urina de ratos.", v: true, e: "Verdadeiro, sobretudo em enchentes." }
    ],
    pairs: [
      ["Tuberculose", "RIPE"],
      ["Sífilis", "Penicilina benzatina"],
      ["Malária vivax", "Cloroquina + primaquina"],
      ["Pneumocistose", "Sulfametoxazol-trimetoprima"],
      ["Herpes-zóster", "Aciclovir ou valaciclovir"],
      ["Influenza grave", "Oseltamivir"]
    ],
    seq: [
      { t: "Evolução da dengue", items: ["Picada do Aedes infectado", "Incubação (4–10 dias)", "Fase febril", "Fase crítica (quando a febre cai)", "Fase de recuperação"], e: "Na fase crítica há risco de extravasamento plasmático e choque: atenção aos sinais de alarme." }
    ],
    cases: [{
      title: "Febre depois da viagem",
      story: "Homem de 35 anos voltou do Amazonas há 10 dias. Tem febre a cada 48 h, com calafrios intensos e sudorese.",
      steps: [
        { q: "Qual é a principal hipótese?", o: ["Dengue", "Malária", "Leptospirose", "Febre tifoide"], a: 1, e: "Febre periódica após estadia em área endêmica." },
        { q: "Qual é o exame diagnóstico padrão?", o: ["Hemocultura", "Gota espessa", "Sorologia IgM", "Urocultura"], a: 1, e: "Identifica a espécie e a parasitemia. Há também testes rápidos." },
        { q: "Se for P. vivax, qual é o tratamento?", o: ["Cloroquina + primaquina", "Penicilina", "Oseltamivir", "Ivermectina"], a: 0, e: "A primaquina trata as formas latentes no fígado." }
      ]
    }]
  },
  {
    id: "dermato", cycle: "clinico", name: "Dermatologia", icon: "🧴", color: "#fb923c",
    desc: "Lesões elementares e doenças de pele.",
    flashcards: [
      { f: "Regra ABCDE do melanoma", b: "Assimetria, Bordas irregulares, Cores variadas, Diâmetro > 6 mm, Evolução." },
      { f: "Câncer de pele mais comum", b: "Carcinoma basocelular." },
      { f: "Lesão elevada e sólida, menor que 1 cm", b: "Pápula." },
      { f: "Lesão elevada com líquido seroso, menor que 1 cm", b: "Vesícula (maior que 1 cm: bolha)." },
      { f: "Lesão típica da psoríase", b: "Placas eritematosas com escamas prateadas nas superfícies extensoras." },
      { f: "Sinal de Auspitz", b: "Sangramento puntiforme ao remover as escamas (psoríase)." },
      { f: "Tratamento da hanseníase", b: "Poliquimioterapia: rifampicina, dapsona e clofazimina." },
      { f: "Tratamento tópico da escabiose", b: "Permetrina 5% (ou ivermectina oral)." }
    ],
    quiz: [
      { q: "Lesão perolada com telangiectasias na face de um idoso:", o: ["Melanoma", "Carcinoma basocelular", "Ceratose seborreica", "Nevo"], a: 1, e: "Cresce devagar e raramente dá metástase." },
      { q: "Principal fator prognóstico do melanoma:", o: ["Cor da lesão", "Espessura de Breslow", "Idade do paciente", "Presença de prurido"], a: 1, e: "Quanto mais espesso, pior o prognóstico." },
      { q: "A dermatite atópica se associa a:", o: ["Diabetes e obesidade", "Asma e rinite alérgica", "Hipotireoidismo", "Doença celíaca"], a: 1, e: "É a “marcha atópica”." },
      { q: "Lesão em alvo (íris) é típica de:", o: ["Urticária", "Eritema multiforme", "Psoríase", "Pitiríase rósea"], a: 1, e: "Frequentemente desencadeado por herpes simples." },
      { q: "Agente da pitiríase versicolor:", o: ["Candida albicans", "Malassezia", "Trichophyton rubrum", "Sporothrix"], a: 1, e: "Causa máculas hipo ou hipercrômicas com descamação fina (sinal de Zileri)." },
      { q: "Mancha hipocrômica com alteração da sensibilidade sugere:", o: ["Vitiligo", "Hanseníase", "Pitiríase alba", "Micose"], a: 1, e: "No vitiligo, a sensibilidade é normal." }
    ],
    tf: [
      { s: "O carcinoma basocelular raramente dá metástases.", v: true, e: "Verdadeiro, mas pode ser localmente destrutivo." },
      { s: "A acne é causada principalmente por falta de higiene.", v: false, e: "Falso: envolve hormônios, sebo, queratinização e C. acnes." },
      { s: "No vitiligo há perda de melanócitos.", v: true, e: "Verdadeiro." },
      { s: "O prurido da escabiose piora à noite.", v: true, e: "Verdadeiro, e costuma afetar várias pessoas da casa." },
      { s: "O impetigo é causado principalmente por fungos.", v: false, e: "Falso: os agentes são S. aureus e S. pyogenes." },
      { s: "Na síndrome de Stevens-Johnson, o fármaco suspeito deve ser suspenso de imediato.", v: true, e: "Verdadeiro: é uma emergência dermatológica." }
    ],
    pairs: [
      ["Mácula", "Mudança de cor sem relevo"],
      ["Pápula", "Elevação sólida < 1 cm"],
      ["Vesícula", "Conteúdo líquido < 1 cm"],
      ["Pústula", "Conteúdo purulento"],
      ["Placa", "Elevação plana > 1 cm"],
      ["Urtica", "Lesão edematosa e fugaz"]
    ],
    seq: [
      { t: "Queimaduras: da mais superficial à mais profunda", items: ["1º grau (epiderme)", "2º grau superficial", "2º grau profundo", "3º grau (toda a derme)", "4º grau (músculo e osso)"], e: "As de 3º grau são indolores, porque destroem as terminações nervosas." }
    ],
    cases: [{
      title: "A pinta que mudou",
      story: "Homem de 50 anos, agricultor, com uma lesão pigmentada no dorso que cresceu nos últimos meses. Tem bordas irregulares, várias cores e 9 mm.",
      steps: [
        { q: "Qual é a principal hipótese?", o: ["Ceratose seborreica", "Melanoma", "Nevo comum", "Dermatofibroma"], a: 1, e: "Cumpre vários critérios ABCDE." },
        { q: "Qual é a conduta diagnóstica?", o: ["Observar por 1 ano", "Biópsia excisional com margens estreitas", "Crioterapia", "Laser"], a: 1, e: "A peça inteira permite medir a espessura com precisão." },
        { q: "Qual dado do laudo define o prognóstico?", o: ["Cor", "Espessura de Breslow", "Diâmetro", "Prurido"], a: 1, e: "Também guia a margem de ampliação e a biópsia de linfonodo sentinela." }
      ]
    }]
  },
  {
    id: "pneumo", cycle: "clinico", name: "Pneumologia", icon: "🫁", color: "#38bdf8",
    desc: "Asma, DPOC, pneumonias e TEP.",
    flashcards: [
      { f: "Espirometria que confirma DPOC", b: "VEF1/CVF pós-broncodilatador < 0,70." },
      { f: "Principal fator de risco para DPOC", b: "Tabagismo." },
      { f: "Escore de gravidade da pneumonia comunitária", b: "CURB-65: confusão, ureia, FR ≥ 30, PA baixa e idade ≥ 65." },
      { f: "Resgate na crise de asma", b: "Beta-2 agonista de curta ação (salbutamol), com corticoide sistêmico nas crises moderadas e graves." },
      { f: "Critérios que definem um derrame pleural como exsudato", b: "Critérios de Light." },
      { f: "Exame inicial na suspeita de TEP de baixa probabilidade", b: "D-dímero." },
      { f: "Exame de imagem de escolha para TEP", b: "Angiotomografia de tórax." },
      { f: "Sinal do pneumotórax no raio-X", b: "Linha pleural visceral, sem trama vascular além dela." }
    ],
    quiz: [
      { q: "Conduta imediata no pneumotórax hipertensivo:", o: ["Raio-X e aguardar", "Descompressão com agulha, seguida de drenagem", "Intubação apenas", "Antibiótico"], a: 1, e: "O diagnóstico é clínico. Não esperar a imagem." },
      { q: "Pneumonia em alcoolista com escarro em “geleia de groselha”:", o: ["Streptococcus pneumoniae", "Klebsiella pneumoniae", "Mycoplasma", "Legionella"], a: 1, e: "Costuma acometer lobos superiores e formar cavitações." },
      { q: "Na asma, a obstrução das vias aéreas é tipicamente:", o: ["Fixa", "Reversível", "Restritiva", "Ausente em crises"], a: 1, e: "Melhora com broncodilatador, ao contrário da DPOC." },
      { q: "Alvo de saturação na DPOC com retenção de CO₂:", o: ["100%", "95–98%", "88–92%", "80–84%"], a: 2, e: "O excesso de O₂ pode piorar a hipercapnia." },
      { q: "Tosse há 4 semanas, hemoptise e perda de peso. O que investigar primeiro?", o: ["Asma", "Tuberculose (baciloscopia ou teste rápido molecular)", "Refluxo", "Rinite"], a: 1, e: "Tosse há 3 semanas ou mais já é sintomático respiratório: investigar TB." },
      { q: "Ar nos brônquios dentro de uma consolidação, no raio-X:", o: ["Sinal da silhueta", "Broncograma aéreo", "Sinal do menisco", "Linhas B de Kerley"], a: 1, e: "Indica processo alveolar, como a pneumonia." }
    ],
    tf: [
      { s: "Parar de fumar é a medida que mais muda a evolução da DPOC.", v: true, e: "Verdadeiro, junto com a oxigenoterapia nos hipoxêmicos." },
      { s: "CURB-65 alto sugere tratamento ambulatorial.", v: false, e: "Falso: escore alto indica internação, às vezes em UTI." },
      { s: "A sarcoidose cursa com granulomas não caseosos.", v: true, e: "Verdadeiro." },
      { s: "Toda exacerbação de asma precisa de antibiótico.", v: false, e: "Falso: só se houver infecção bacteriana." },
      { s: "O mesotelioma está associado à exposição ao amianto.", v: true, e: "Verdadeiro." },
      { s: "D-dímero normal em paciente de baixa probabilidade ajuda a excluir TEP.", v: true, e: "Verdadeiro: tem alto valor preditivo negativo." }
    ],
    pairs: [
      ["DPOC", "VEF1/CVF < 0,70 persistente"],
      ["Asma", "Obstrução reversível"],
      ["Pneumonia", "Consolidação com broncograma"],
      ["Pneumotórax", "Hipertimpanismo e murmúrio abolido"],
      ["Derrame pleural", "Macicez à percussão"],
      ["TEP", "Dispneia súbita e taquicardia"]
    ],
    seq: [
      { t: "Mecânica da inspiração", items: ["Contração do diafragma e dos intercostais externos", "Aumento do volume torácico", "Pressão intrapleural fica mais negativa", "Pressão alveolar cai abaixo da atmosférica", "Ar entra nos pulmões"], e: "Na respiração tranquila, a expiração é passiva (recolhimento elástico)." }
    ],
    cases: [{
      title: "Idoso com tosse e febre",
      story: "Homem de 78 anos com febre, tosse com escarro purulento e confusão mental. FR 32 irpm, PA 85x50 mmHg, ureia 60 mg/dL. O raio-X mostra consolidação em lobo inferior direito.",
      steps: [
        { q: "Qual é o diagnóstico?", o: ["Exacerbação de DPOC", "Pneumonia adquirida na comunidade", "TEP", "Insuficiência cardíaca"], a: 1, e: "Quadro infeccioso com consolidação." },
        { q: "Quanto ele pontua no CURB-65?", o: ["2", "3", "4", "5"], a: 3, e: "Confusão, ureia > 43 mg/dL, FR ≥ 30, PAS < 90 e idade ≥ 65: 5 pontos." },
        { q: "Onde tratar?", o: ["Em casa, com amoxicilina", "Internação, considerando UTI", "Hospital-dia", "Retorno em 1 semana"], a: 1, e: "CURB-65 de 3 ou mais indica pneumonia grave." }
      ]
    }]
  }
);
