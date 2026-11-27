// Conteúdo ampliado (parte 2): Embriologia, Genética, Imunologia, Microbiologia.
addContent("embrio", {
  flashcards: [
    ["Derivados do 1º arco faríngeo", "Músculos da mastigação, maxila, mandíbula, martelo e bigorna. Nervo: trigêmeo (V3)."],
    ["Derivados do 2º arco faríngeo", "Músculos da expressão facial, estribo e processo estiloide. Nervo: facial (VII)."],
    ["Derivados da 3ª bolsa faríngea", "Paratireoides inferiores e timo."],
    ["Derivados da 4ª bolsa faríngea", "Paratireoides superiores e células parafoliculares (C) da tireoide."],
    ["Síndrome de DiGeorge", "Falha da 3ª e da 4ª bolsas (deleção 22q11): hipocalcemia, ausência de timo e cardiopatia."],
    ["Origem da tireoide", "Endoderma do assoalho da faringe (forame cego). Ela desce pelo ducto tireoglosso."],
    ["Massa mais comum na linha média do pescoço", "Cisto do ducto tireoglosso: sobe ao engolir e ao pôr a língua para fora."],
    ["Derivados do ducto mesonéfrico (de Wolff) no homem", "Epidídimo, ducto deferente, vesícula seminal e ducto ejaculatório."],
    ["Derivados dos ductos paramesonéfricos (de Müller)", "Tubas uterinas, útero e terço superior da vagina."],
    ["Hormônio que faz os ductos de Müller regredirem", "Hormônio antimülleriano, das células de Sertoli."],
    ["Gene que determina a formação do testículo", "SRY, no cromossomo Y."],
    ["Gastrosquise × onfalocele", "Gastrosquise: defeito ao lado do umbigo, sem membrana. Onfalocele: no umbigo, coberta por membrana e associada a síndromes."]
  ],
  quiz: [
    ["Hérnia diafragmática congênita mais comum:", ["De Morgagni, anterior", "De Bochdalek, posterolateral esquerda", "Hiatal", "Central"], 1, "Causa hipoplasia pulmonar."],
    ["O rim em ferradura fica preso embaixo da artéria:", ["Mesentérica superior", "Mesentérica inferior", "Aorta", "Renal"], 1, "A fusão dos polos inferiores impede a subida."],
    ["A tetralogia de Fallot resulta do desvio anterossuperior do:", ["Septo interatrial", "Septo infundibular (conal)", "Seio venoso", "Coxim endocárdico"], 1, "Estenose pulmonar, CIV, aorta cavalgando e hipertrofia do VD."],
    ["Talidomida no 1º trimestre causa:", ["Focomelia", "Só fenda labial", "Anencefalia", "Hidropisia"], 0, "Encurtamento grave dos membros."],
    ["A isotretinoína na gestação é:", ["Segura", "Um teratógeno potente", "Indicada no 1º trimestre", "Usada contra náuseas"], 1, "Exige contracepção eficaz durante o uso."],
    ["Achado clássico da estenose hipertrófica do piloro:", ["Vômitos biliosos ao nascer", "Vômitos em jato não biliosos entre 2 e 6 semanas, com oliva palpável", "Diarreia com sangue", "Icterícia"], 1, "Há alcalose metabólica hipoclorêmica e hipocalêmica."],
    ["A atresia de esôfago geralmente vem com:", ["Fístula traqueoesofágica", "Divertículo de Meckel", "Doença de Hirschsprung", "Pâncreas anular"], 0, "Recém-nascido com salivação excessiva e engasgos; polidrâmnio na gestação."],
    ["A doença de Hirschsprung é causada por:", ["Falha na migração das células da crista neural para o cólon", "Excesso de gânglios", "Estenose do piloro", "Má rotação"], 0, "Aganglionose: atraso na eliminação do mecônio."],
    ["A hipospádia ocorre por falha de fusão das:", ["Pregas uretrais", "Pregas labioescrotais", "Cristas gonadais", "Ductos de Müller"], 0, "A uretra se abre na face ventral do pênis."]
  ],
  tf: [
    ["O úraco é resquício da alantoide.", true, "Verdadeiro: se persistir, pode vazar urina pelo umbigo."],
    ["O ligamento redondo do fígado é resquício do ducto arterioso.", false, "Falso: é resquício da veia umbilical. O ducto arterioso vira o ligamento arterioso."],
    ["A crista neural origina as células de Schwann.", true, "Verdadeiro."],
    ["O coração deriva do endoderma.", false, "Falso: deriva do mesoderma."],
    ["A fossa oval do adulto é resquício do forame oval.", true, "Verdadeiro."],
    ["O epitélio dos pulmões deriva do endoderma.", true, "Verdadeiro: vem do divertículo respiratório; o conjuntivo vem do mesoderma."]
  ],
  pairs: [["1º arco faríngeo", "Nervo trigêmeo"], ["2º arco faríngeo", "Nervo facial"], ["3ª bolsa faríngea", "Timo"], ["Ductos de Müller", "Útero e tubas"]],
  seq: [{ t: "Formação do coração", items: ["Campo cardiogênico no mesoderma", "Formação do tubo cardíaco", "Início dos batimentos (4ª semana)", "Dobramento em alça", "Septação de átrios e ventrículos", "Formação das valvas"], e: "A septação vai até por volta da 8ª semana." }],
  cases: [
    { title: "Bebê que vomita em jato", story: "Lactente de 4 semanas com vômitos em jato logo após as mamadas, sem bile, e uma massa em forma de oliva no epigástrio.", steps: [
      ["Qual é o diagnóstico?", ["Refluxo fisiológico", "Estenose hipertrófica do piloro", "Atresia duodenal", "Má rotação intestinal"], 1, "Idade típica e oliva palpável."],
      ["Qual distúrbio metabólico esperar?", ["Acidose metabólica", "Alcalose metabólica hipoclorêmica e hipocalêmica", "Hipercalemia", "Hipernatremia isolada"], 1, "Perda de HCl pelos vômitos."],
      ["Qual é o tratamento?", ["Antibiótico", "Piloromiotomia, depois de corrigir hidratação e eletrólitos", "Dieta zero por 1 mês", "Endoscopia"], 1, "É a cirurgia de Ramstedt."]] },
    { title: "Convulsões e infecções no recém-nascido", story: "Recém-nascido com cardiopatia conotruncal, convulsões por hipocalcemia e sem sombra do timo no raio-X.", steps: [
      ["Qual síndrome?", ["Down", "DiGeorge (deleção 22q11)", "Turner", "Edwards"], 1, "Falha da 3ª e da 4ª bolsas faríngeas."],
      ["Por que há hipocalcemia?", ["Excesso de vitamina D", "Ausência das paratireoides", "Excesso de PTH", "Rim imaturo"], 1, "As paratireoides vêm da 3ª e da 4ª bolsas."],
      ["Que imunodeficiência ocorre?", ["De linfócitos T, pela falta do timo", "De neutrófilos", "De complemento", "Só de IgA"], 0, "O timo vem da 3ª bolsa."]] }
  ]
});

addContent("genet", {
  flashcards: [
    ["Síndrome de Edwards", "Trissomia do 18: mãos fechadas com dedos sobrepostos, pés em mata-borrão e cardiopatia."],
    ["Síndrome de Patau", "Trissomia do 13: fenda labiopalatina, polidactilia e holoprosencefalia."],
    ["Síndrome de Prader-Willi", "Falta da contribuição paterna do 15q11-13: hipotonia, hiperfagia e obesidade."],
    ["Síndrome de Angelman", "Falta da contribuição materna do 15q11-13: riso frequente, epilepsia e ataxia."],
    ["O que é imprinting genômico?", "Quando a expressão de um gene depende de qual genitor ele veio."],
    ["Herança da distrofia muscular de Duchenne", "Recessiva ligada ao X (gene da distrofina). Sinal de Gowers."],
    ["Herança da anemia falciforme", "Autossômica recessiva."],
    ["Equilíbrio de Hardy-Weinberg", "p² + 2pq + q² = 1, numa população sem seleção, mutação ou migração."],
    ["O que é mosaicismo?", "Duas ou mais linhagens de células com genótipos diferentes na mesma pessoa."],
    ["Gene do retinoblastoma", "RB1, supressor de tumor (hipótese dos dois eventos de Knudson)."],
    ["Síndrome de Lynch", "Câncer colorretal hereditário sem polipose, por mutação em genes de reparo (MLH1, MSH2…)."],
    ["Polipose adenomatosa familiar", "Gene APC: centenas de pólipos, com risco de câncer próximo de 100%."]
  ],
  quiz: [
    ["Exame que detecta microdeleções como a 22q11:", ["Cariótipo convencional", "FISH ou microarray (CGH-array)", "Hemograma", "Eletroforese de hemoglobina"], 1, "São pequenas demais para o cariótipo comum."],
    ["Qual doença tem herança autossômica dominante?", ["Fibrose cística", "Neurofibromatose tipo 1", "Fenilcetonúria", "Anemia falciforme"], 1, "Outras: Marfan, Huntington e rins policísticos do adulto."],
    ["Pais saudáveis têm um filho com doença recessiva. Os pais são:", ["Afetados", "Heterozigotos (portadores)", "Homozigotos normais", "Impossível saber"], 1, "Cada um passou um alelo mutado."],
    ["No 1º trimestre, translucência nucal aumentada sugere risco de:", ["Diabetes", "Aneuploidias, como a trissomia do 21", "Anemia", "Pré-eclâmpsia"], 1, "Confirma-se com NIPT ou exame invasivo."],
    ["Mutação que troca o códon de um aminoácido por um códon de parada:", ["Missense", "Nonsense", "Silenciosa", "Frameshift"], 1, "Gera proteína truncada."],
    ["A inserção de 1 nucleotídeo numa sequência codificante causa:", ["Mutação silenciosa", "Mudança da fase de leitura (frameshift)", "Nenhuma alteração", "Trissomia"], 1, "É o mecanismo de muitos casos de Duchenne."],
    ["Síndrome com risco aumentado de leucemia e de Alzheimer precoce:", ["Turner", "Down", "Klinefelter", "Marfan"], 1, "Trissomia do 21."],
    ["A síndrome de Klinefelter cursa com:", ["Baixa estatura", "Hipogonadismo, testículos pequenos e infertilidade", "Pescoço alado", "Coarctação da aorta"], 1, "Também ginecomastia e estatura alta."],
    ["Teste de rastreio fetal feito no sangue materno:", ["Amniocentese", "NIPT (DNA fetal livre)", "Biópsia de vilo corial", "Cordocentese"], 1, "É rastreio: resultado positivo precisa de confirmação."]
  ],
  tf: [
    ["Uma mãe com mutação mitocondrial pode transmiti-la a todos os filhos.", true, "Verdadeiro, com intensidade variável (heteroplasmia)."],
    ["A síndrome de Down é sempre causada por não disjunção.", false, "Falso: cerca de 4% são por translocação robertsoniana e 1 a 2% por mosaicismo."],
    ["O aconselhamento genético deve ser não diretivo.", true, "Verdadeiro: informa e apoia a decisão da família."],
    ["A distrofia de Duchenne é mais grave que a de Becker.", true, "Verdadeiro: na de Becker, a distrofina está reduzida, mas presente."],
    ["A consanguinidade aumenta principalmente o risco de doenças dominantes.", false, "Falso: aumenta sobretudo o risco de doenças recessivas."],
    ["BRCA1 e BRCA2 são genes supressores de tumor.", true, "Verdadeiro: atuam no reparo do DNA."]
  ],
  pairs: [["Trissomia do 18", "Edwards"], ["Trissomia do 13", "Patau"], ["Distrofina", "Duchenne"], ["APC", "Polipose adenomatosa familiar"]],
  seq: [{ t: "Etapas da meiose", items: ["Prófase I (crossing-over)", "Metáfase I (homólogos alinhados)", "Anáfase I (separação dos homólogos)", "Telófase I", "Meiose II (separação das cromátides)"], e: "A não disjunção na meiose I é a causa mais comum de trissomias." }],
  cases: [
    { title: "O menino que cai muito", story: "Menino de 4 anos com quedas frequentes, panturrilhas grossas e que apoia as mãos nas pernas para se levantar do chão.", steps: [
      ["Que sinal é esse ao levantar?", ["Gowers", "Babinski", "Romberg", "Lasègue"], 0, "Ele “escala” o próprio corpo com as mãos."],
      ["Qual é o diagnóstico provável?", ["Distrofia de Duchenne", "Atrofia muscular espinhal", "Miastenia", "Paralisia cerebral"], 0, "Há pseudo-hipertrofia das panturrilhas."],
      ["Qual exame inicial reforça a hipótese?", ["CPK muito elevada", "Glicemia", "TSH", "Hemograma"], 0, "A confirmação é pelo teste genético da distrofina."]] },
    { title: "Recém-nascido hipotônico", story: "Recém-nascido com hipotonia, prega palmar única, fendas palpebrais oblíquas e sopro cardíaco.", steps: [
      ["Qual é a hipótese?", ["Síndrome de Down", "Síndrome de Turner", "Síndrome de Edwards", "Prader-Willi"], 0, "É o fenótipo clássico."],
      ["Cardiopatia mais típica:", ["Defeito do septo atrioventricular", "Coarctação da aorta", "Transposição das grandes artérias", "Estenose aórtica"], 0, "Defeito do coxim endocárdico."],
      ["Qual exame confirma e orienta o aconselhamento?", ["Cariótipo", "Só ecocardiograma", "Teste do pezinho", "Tomografia"], 0, "Diferencia não disjunção de translocação, que pode ser herdada."]] }
  ]
});

addContent("imuno", {
  flashcards: [
    ["Imunodeficiência sem linfócitos B, com infecções a partir dos 6 meses", "Agamaglobulinemia de Bruton (ligada ao X, gene BTK)."],
    ["Imunodeficiência primária mais comum", "Deficiência seletiva de IgA."],
    ["Doença granulomatosa crônica", "Defeito da NADPH oxidase dos fagócitos: infecções por germes catalase-positivos (S. aureus, Aspergillus)."],
    ["Teste de triagem da doença granulomatosa crônica", "Di-hidrorrodamina (DHR) ou nitroazul de tetrazólio."],
    ["Deficiência de C5 a C9 predispõe a…", "Infecções por Neisseria."],
    ["Deficiência do inibidor de C1", "Angioedema hereditário (mediado por bradicinina, sem urticária)."],
    ["Citocinas Th1", "IFN-γ e IL-2: ativam macrófagos (imunidade celular)."],
    ["Citocinas Th2", "IL-4, IL-5 e IL-13: IgE e eosinófilos (alergia e helmintos)."],
    ["Linfócitos T reguladores", "CD4+ CD25+ FOXP3+: mantêm a tolerância imunológica."],
    ["Rejeição hiperaguda", "Em minutos a horas, por anticorpos pré-formados (ABO ou HLA)."],
    ["Rejeição aguda celular", "Em semanas a meses, mediada por linfócitos T."],
    ["Doença do enxerto contra o hospedeiro", "Linfócitos T do doador atacam o receptor (pele, fígado e intestino)."]
  ],
  quiz: [
    ["A BCG é contraindicada em:", ["Recém-nascido saudável", "Imunodeficiência grave (ex.: SCID)", "Filho de mãe asmática", "Prematuro estável acima de 2 kg"], 1, "Vacinas vivas podem se disseminar."],
    ["A imunodeficiência combinada grave (SCID) cursa com:", ["Só infecções bacterianas leves", "Infecções graves virais, fúngicas e oportunistas nos primeiros meses", "Só alergias", "Lúpus"], 1, "O tratamento é o transplante de medula."],
    ["Anticorpo monoclonal anti-TNF:", ["Rituximabe", "Infliximabe", "Trastuzumabe", "Omalizumabe"], 1, "Antes de usar, rastrear tuberculose latente."],
    ["O rituximabe age contra:", ["CD20 dos linfócitos B", "TNF", "IL-6", "IgE"], 0, "Usado em linfomas e doenças autoimunes."],
    ["O omalizumabe age contra:", ["IgE", "CD20", "HER2", "VEGF"], 0, "Usado na asma alérgica grave e na urticária crônica."],
    ["Contra vírus dentro das células, o principal mecanismo é:", ["Anticorpos IgE", "Linfócitos T CD8 e células NK", "Neutrófilos", "Mastócitos"], 1, "O CD8 reconhece antígenos no MHC I."],
    ["Tríade da síndrome de Wiskott-Aldrich:", ["Eczema, plaquetopenia com plaquetas pequenas e infecções", "Febre, exantema e artrite", "Ptose, miose e anidrose", "Hipocalcemia, ausência de timo e cardiopatia"], 0, "É ligada ao X."],
    ["O Coombs direto detecta:", ["Anticorpos ou complemento ligados às hemácias do paciente", "Anticorpos livres no soro", "IgE específica", "Plaquetas"], 0, "É positivo na anemia hemolítica autoimune."],
    ["Exame que ajuda a confirmar uma anafilaxia depois do episódio:", ["Triptase sérica", "PCR", "Troponina", "Ferritina"], 0, "Colher em até 1 a 3 horas do início."]
  ],
  tf: [
    ["A IgA secretora tem uma peça secretória que a protege na mucosa.", true, "Verdadeiro."],
    ["Vacinas inativadas podem ser dadas a imunossuprimidos.", true, "Verdadeiro, embora a resposta possa ser menor."],
    ["Linfócitos T reconhecem antígenos livres, sem apresentação.", false, "Falso: precisam do antígeno apresentado no MHC."],
    ["Quem tem deficiência seletiva de IgA pode ter anafilaxia em transfusões.", true, "Verdadeiro: por anticorpos anti-IgA."],
    ["A febre é mediada por IL-1, IL-6 e TNF agindo no hipotálamo.", true, "Verdadeiro, via prostaglandina E2."],
    ["Na rejeição hiperaguda, os imunossupressores revertem o quadro.", false, "Falso: é irreversível e o enxerto precisa ser retirado."]
  ],
  pairs: [["Agamaglobulinemia de Bruton", "Sem linfócitos B"], ["DiGeorge", "Sem timo"], ["Doença granulomatosa crônica", "NADPH oxidase"], ["Inibidor de C1", "Angioedema hereditário"]],
  seq: [{ t: "Resposta inflamatória aguda", items: ["Reconhecimento do agressor", "Vasodilatação e aumento da permeabilidade", "Marginação e rolamento dos leucócitos", "Adesão firme ao endotélio", "Diapedese", "Quimiotaxia e fagocitose"], e: "Selectinas fazem o rolamento; integrinas, a adesão firme." }],
  cases: [
    { title: "Infecções de repetição", story: "Menino de 1 ano com otites e pneumonias bacterianas de repetição desde os 6 meses. Quase não tem amígdalas nem linfonodos palpáveis.", steps: [
      ["Qual é a hipótese?", ["Agamaglobulinemia de Bruton", "Deficiência de IgA", "Síndrome de DiGeorge", "Alergia"], 0, "Começa quando acabam os anticorpos que vieram da mãe."],
      ["O que os exames devem mostrar?", ["Imunoglobulinas muito baixas e ausência de linfócitos B (CD19)", "IgE muito alta", "Só linfopenia T", "Complemento baixo"], 0, "A causa é a mutação do gene BTK."],
      ["Qual é o tratamento?", ["Reposição de imunoglobulina", "Corticoide", "Vacina viva", "Nada"], 0, "Imunoglobulina IV ou subcutânea, periodicamente."]] },
    { title: "Inchaço sem coceira", story: "Mulher de 25 anos com crises de inchaço nos lábios e dor abdominal, sem urticária e sem melhora com anti-histamínico. A mãe tem o mesmo problema.", steps: [
      ["Qual é a hipótese?", ["Alergia alimentar", "Angioedema hereditário", "Anafilaxia", "Urticária crônica"], 1, "Familiar e sem urticária."],
      ["Qual é o mediador principal?", ["Histamina", "Bradicinina", "IgE", "Serotonina"], 1, "Por isso o anti-histamínico não funciona."],
      ["Qual exame de triagem pedir?", ["C4 e inibidor de C1 (dosagem e função)", "Triptase", "IgE total", "PCR"], 0, "O C4 costuma estar baixo mesmo fora das crises."]] }
  ]
});

addContent("micro", {
  flashcards: [
    ["Bactéria sem parede celular", "Mycoplasma: não responde a betalactâmicos."],
    ["Agente da coqueluche e sua toxina", "Bordetella pertussis: toxina pertussis (aumenta o AMPc)."],
    ["Agente da difteria", "Corynebacterium diphtheriae: pseudomembrana acinzentada e toxina que inibe o EF-2."],
    ["Bactéria que cresce em ágar chocolate e causa epiglotite", "Haemophilus influenzae tipo b."],
    ["Causa mais comum da diarreia do viajante", "E. coli enterotoxigênica."],
    ["E. coli associada à síndrome hemolítico-urêmica", "E. coli êntero-hemorrágica O157:H7 (toxina Shiga-like)."],
    ["Como age a toxina botulínica?", "Bloqueia a liberação de acetilcolina: paralisia flácida descendente."],
    ["Fungo dimórfico endêmico no Brasil, com lesões pulmonares e orais", "Paracoccidioides brasiliensis (aspecto em roda de leme)."],
    ["Hepatites de transmissão fecal-oral", "Hepatite A e hepatite E."],
    ["Vírus da mononucleose", "Epstein-Barr (EBV): linfócitos atípicos e anticorpos heterófilos."],
    ["Agente da doença de Lyme", "Borrelia burgdorferi, transmitida por carrapato. Causa eritema migratório."],
    ["O que indica um PPD positivo?", "Infecção atual ou passada (ou BCG). Não diferencia doença ativa de infecção latente."]
  ],
  quiz: [
    ["Gram-negativo oxidase-positivo de infecções hospitalares e de pacientes com fibrose cística:", ["Klebsiella", "Pseudomonas aeruginosa", "E. coli", "Proteus"], 1, "Tem pigmento verde e cheiro de uva."],
    ["Antibiótico de escolha para infecção grave por MRSA:", ["Cefalexina", "Vancomicina", "Amoxicilina", "Ceftriaxona"], 1, "Linezolida é alternativa, conforme o caso."],
    ["Agente de infecção urinária que produz urease e cálculos de estruvita:", ["E. coli", "Proteus mirabilis", "Enterococcus", "Staphylococcus saprophyticus"], 1, "Alcaliniza a urina."],
    ["A Listeria monocytogenes acomete principalmente:", ["Adultos jovens saudáveis", "Gestantes, recém-nascidos, idosos e imunossuprimidos", "Só crianças em idade escolar", "Atletas"], 1, "Transmitida por laticínios não pasteurizados e frios."],
    ["Principais agentes de meningite no recém-nascido:", ["Neisseria meningitidis", "Streptococcus do grupo B, E. coli e Listeria", "H. influenzae", "Só pneumococo"], 1, "Esquema empírico: ampicilina + gentamicina ou cefotaxima."],
    ["Herpesvírus que fica latente nos gânglios sensitivos e causa zóster:", ["HSV-2", "Varicela-zóster", "CMV", "EBV"], 1, "A reativação segue um dermátomo."],
    ["HIV com CD4 < 200, infiltrado intersticial bilateral e LDH alto:", ["Pneumococo", "Pneumocystis jirovecii", "Klebsiella", "Mycoplasma"], 1, "Tratamento: sulfametoxazol-trimetoprima."],
    ["Clostridium perfringens causa:", ["Gangrena gasosa", "Tétano", "Botulismo", "Colite pseudomembranosa"], 0, "Pela toxina alfa (lecitinase)."],
    ["Agente da febre tifoide:", ["Salmonella Typhi", "Shigella", "Campylobacter", "Vibrio"], 0, "Febre prolongada, bradicardia relativa e roséolas."]
  ],
  tf: [
    ["Os HPV 16 e 18 estão associados ao câncer do colo do útero.", true, "Verdadeiro: as proteínas E6 e E7 inativam p53 e RB."],
    ["Todos os estafilococos são coagulase-positivos.", false, "Falso: entre os principais, só o S. aureus."],
    ["Todo vírus de RNA usa transcriptase reversa.", false, "Falso: só os retrovírus, como o HIV (e o HBV, que é de DNA)."],
    ["O Enterococcus é naturalmente resistente às cefalosporinas.", true, "Verdadeiro."],
    ["A autoclave destrói esporos bacterianos.", true, "Verdadeiro: vapor a 121 °C sob pressão."],
    ["O Streptococcus pyogenes é beta-hemolítico.", true, "Verdadeiro: grupo A, sensível à bacitracina."]
  ],
  pairs: [["Corynebacterium diphtheriae", "Pseudomembrana"], ["Vibrio vulnificus", "Ostras cruas e lesões bolhosas"], ["Epstein-Barr", "Mononucleose"], ["Paracoccidioides", "Roda de leme"]],
  seq: [{ t: "Curva de crescimento bacteriano", items: ["Fase lag (adaptação)", "Fase log (crescimento exponencial)", "Fase estacionária", "Fase de declínio"], e: "Antibióticos que agem na parede funcionam melhor na fase log." }],
  cases: [
    { title: "Diarreia com sangue e rim parando", story: "Criança de 5 anos, uma semana depois de diarreia com sangue após comer hambúrguer malpassado, fica pálida, com plaquetas baixas e urinando pouco.", steps: [
      ["Qual síndrome?", ["Púrpura trombocitopênica imune", "Síndrome hemolítico-urêmica", "Leucemia", "Nefrite lúpica"], 1, "Anemia hemolítica microangiopática, plaquetopenia e lesão renal."],
      ["Qual é o agente provável?", ["E. coli êntero-hemorrágica O157:H7", "Salmonella", "Rotavírus", "Giardia"], 0, "Pela toxina Shiga-like."],
      ["E o antibiótico nesse caso?", ["Sempre indicado", "Em geral é evitado, pois pode aumentar a liberação de toxina", "Só vancomicina", "Obrigatório por 14 dias"], 1, "O tratamento é de suporte, inclusive diálise se precisar."]] },
    { title: "Garganta inflamada e baço grande", story: "Adolescente de 16 anos com febre, faringite intensa, linfonodos cervicais posteriores aumentados e baço palpável. Depois de tomar amoxicilina, apareceu um exantema.", steps: [
      ["Qual é a hipótese?", ["Faringite estreptocócica", "Mononucleose infecciosa", "Difteria", "Sarampo"], 1, "Exantema após amoxicilina é clássico."],
      ["Qual achado no hemograma?", ["Linfócitos atípicos", "Eosinofilia", "Neutropenia grave", "Blastos"], 0, "Linfocitose com atipia."],
      ["Qual orientação é importante?", ["Evitar esportes de contato pelo risco de ruptura do baço", "Repouso absoluto por 6 meses", "Antibiótico prolongado", "Corticoide de rotina"], 0, "Por cerca de 3 a 4 semanas."]] }
  ]
});
