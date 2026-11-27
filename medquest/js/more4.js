// Conteúdo ampliado (parte 4): Patologia, Cardiologia, Pneumologia, Gastroenterologia.
addContent("pato", {
  flashcards: [
    ["Lesão celular reversível: alterações típicas", "Tumefação celular (edema), esteatose e bolhas na membrana."],
    ["Sinal de lesão celular irreversível", "Dano à membrana e às mitocôndrias, com picnose, cariorrexe e cariólise do núcleo."],
    ["Os 5 sinais cardinais da inflamação", "Calor, rubor, tumor (edema), dor e perda de função."],
    ["Mediador que causa vasodilatação imediata", "Histamina, liberada pelos mastócitos."],
    ["Células gigantes de Langhans", "Núcleos dispostos em ferradura na periferia: granulomas da tuberculose."],
    ["Trombo × êmbolo", "Trombo: massa sólida formada dentro do vaso. Êmbolo: massa que se desloca pelo sangue."],
    ["Tipos de choque", "Hipovolêmico, cardiogênico, obstrutivo e distributivo (séptico, anafilático, neurogênico)."],
    ["Diferença entre neoplasia benigna e maligna", "A maligna invade tecidos e dá metástases; a benigna cresce de forma expansiva e encapsulada."],
    ["Via de metástase típica dos carcinomas", "Linfática. Os sarcomas costumam ir pelo sangue."],
    ["Oncogene amplificado em parte dos cânceres de mama", "HER2 (ERBB2): alvo do trastuzumabe."],
    ["Marcador tumoral do câncer de próstata", "PSA (antígeno prostático específico)."],
    ["Marcador do câncer colorretal no seguimento", "CEA (antígeno carcinoembrionário)."]
  ],
  quiz: [
    ["Atrofia é:", ["Redução do tamanho e da função das células", "Aumento do número de células", "Troca de um epitélio por outro", "Morte celular"], 0, "Ex.: músculo imobilizado."],
    ["O útero na gestação cresce por:", ["Só hipertrofia", "Hipertrofia e hiperplasia", "Metaplasia", "Displasia"], 1, "Por estímulo hormonal."],
    ["A pancreatite aguda causa necrose:", ["Gordurosa", "Caseosa", "Liquefativa do SNC", "Fibrinoide"], 0, "A saponificação forma depósitos de cálcio."],
    ["Mediador da inflamação que a aspirina inibe a síntese:", ["Prostaglandinas", "Histamina", "Bradicinina", "Complemento"], 0, "Pela inibição da COX."],
    ["Infarto vermelho (hemorrágico) ocorre tipicamente em:", ["Pulmão e intestino (dupla circulação ou tecidos frouxos)", "Coração", "Rim", "Baço"], 0, "Também em torção ovariana e testicular."],
    ["Carcinoma in situ é:", ["Neoplasia maligna que ainda não ultrapassou a membrana basal", "Tumor benigno", "Metástase", "Inflamação crônica"], 0, "Não tem capacidade de metastatizar enquanto for in situ."],
    ["Estadiamento TNM avalia:", ["Tumor, linfonodos e metástases", "Tipo histológico apenas", "Grau de diferenciação", "Idade"], 0, "O grau é a diferenciação histológica; o estádio é a extensão."],
    ["Amiloidose AL está associada a:", ["Discrasias de plasmócitos (cadeias leves)", "Inflamação crônica (proteína A sérica)", "Alzheimer", "Diálise"], 0, "A amiloidose AA vem da inflamação crônica."],
    ["Edema por aumento da pressão hidrostática ocorre em:", ["Insuficiência cardíaca", "Síndrome nefrótica", "Desnutrição", "Cirrose (apenas oncótico)"], 0, "Na nefrótica, o mecanismo principal é a queda da pressão oncótica."]
  ],
  tf: [
    ["Metaplasia é uma adaptação reversível.", true, "Verdadeiro, se o estímulo cessar."],
    ["Na necrose há inflamação; na apoptose, em geral não.", true, "Verdadeiro."],
    ["Todo tumor maligno é chamado de carcinoma.", false, "Falso: carcinomas vêm do epitélio; sarcomas do mesênquima; há ainda linfomas, leucemias e outros."],
    ["Neutrófilos predominam na inflamação crônica.", false, "Falso: na crônica predominam linfócitos, plasmócitos e macrófagos."],
    ["A embolia pulmonar geralmente se origina de trombose venosa profunda dos membros inferiores.", true, "Verdadeiro."],
    ["A calcificação metastática ocorre em tecidos normais com hipercalcemia.", true, "Verdadeiro."]
  ],
  pairs: [["Histamina", "Vasodilatação imediata"], ["HER2", "Trastuzumabe"], ["PSA", "Próstata"], ["Células de Langhans", "Granuloma da tuberculose"]],
  seq: [{ t: "Da lesão à morte celular por isquemia", items: ["Falta de oxigênio", "Queda da fosforilação oxidativa e do ATP", "Falha da bomba de Na⁺/K⁺ (tumefação)", "Glicólise anaeróbia e acidose", "Lesão de membranas e entrada de Ca²⁺", "Necrose"], e: "Até a lesão de membranas, a lesão ainda pode ser reversível." }],
  cases: [
    { title: "Gânglio no pescoço", story: "Jovem de 22 anos com linfonodos cervicais indolores, febre, sudorese noturna e prurido. A biópsia mostra células grandes binucleadas em fundo inflamatório.", steps: [
      ["Qual é o diagnóstico?", ["Linfoma de Hodgkin", "Tuberculose ganglionar", "Mononucleose", "Linfoma de Burkitt"], 0, "Células de Reed-Sternberg."],
      ["Marcadores típicos dessas células:", ["CD15 e CD30", "CD3 e CD4", "CD20 isolado", "CD34"], 0, "Na forma clássica."],
      ["O que são febre, sudorese noturna e perda de peso nesse contexto?", ["Sintomas B", "Sintomas paraneoplásicos neurológicos", "Efeito colateral", "Irrelevantes"], 0, "Influenciam o estadiamento e o prognóstico."]] },
    { title: "Necrópsia de um infartado", story: "Um homem morreu 3 dias após um infarto extenso. O miocárdio da região afetada está amolecido e amarelado.", steps: [
      ["Que tipo de necrose ocorre no infarto?", ["Coagulação", "Liquefativa", "Caseosa", "Gordurosa"], 0, "A arquitetura do tecido é preservada no início."],
      ["Que célula predomina na região nesse momento (1 a 3 dias)?", ["Neutrófilos", "Fibroblastos", "Células gigantes", "Eosinófilos"], 0, "Depois chegam os macrófagos (3 a 7 dias)."],
      ["Complicação típica entre 3 e 7 dias, quando o tecido está mais frágil:", ["Ruptura da parede ventricular", "Aneurisma tardio", "Síndrome de Dressler", "Fibrose"], 0, "Pode causar tamponamento."]] }
  ]
});

addContent("cardio", {
  flashcards: [
    ["Classes funcionais da NYHA", "I: sem limitação. II: sintomas aos esforços habituais. III: aos pequenos esforços. IV: em repouso."],
    ["Fração de ejeção que define IC com FE reduzida", "FE ≤ 40%."],
    ["Diagnóstico de hipertensão no consultório", "PA ≥ 140/90 mmHg em mais de uma ocasião (confirmar com MAPA ou MRPA quando possível)."],
    ["Primeira escolha de anti-hipertensivo (sem comorbidade específica)", "IECA ou BRA, bloqueador de canal de cálcio ou tiazídico, muitas vezes combinados."],
    ["Critérios do IAM com supra de ST", "Supradesnivelamento ≥ 1 mm em 2 derivações contíguas (com valores maiores em V2–V3) ou BRE novo com clínica."],
    ["Tempo porta-balão ideal no IAM com supra", "≤ 90 minutos (porta-agulha da trombólise ≤ 30 minutos)."],
    ["Escore de risco na síndrome coronariana sem supra", "TIMI, GRACE ou HEART."],
    ["Achados da endocardite infecciosa", "Febre, sopro novo, fenômenos embólicos, nódulos de Osler, lesões de Janeway e manchas de Roth."],
    ["Agente mais comum da endocardite (geral)", "Staphylococcus aureus (sobretudo em usuários de drogas IV e próteses). Em valvas nativas com doença dental: estreptococos do grupo viridans."],
    ["Efeito da digoxina no ECG", "Infradesnivelamento de ST em “colher” (pá de pedreiro)."],
    ["QT longo congênito ou por drogas: arritmia associada", "Torsades de pointes. Tratamento: sulfato de magnésio."],
    ["Bloqueio AV de 2º grau Mobitz I", "Prolongamento progressivo do PR até uma onda P não conduzida (Wenckebach)."]
  ],
  quiz: [
    ["Bloqueio AV de 2º grau Mobitz II:", ["PR progressivamente maior", "PR constante com P não conduzida súbita, risco de BAVT", "Sem relação entre P e QRS", "PR > 200 ms sem falhas"], 1, "Costuma exigir marca-passo."],
    ["Bradicardia sintomática instável, primeira droga:", ["Atropina", "Adenosina", "Amiodarona", "Verapamil"], 0, "Se falhar: marca-passo transcutâneo, dopamina ou adrenalina."],
    ["Fármaco que reduz mortalidade após IAM e na IC:", ["Betabloqueador", "Nifedipino de ação curta", "Digoxina", "Verapamil na IC com FE reduzida"], 0, "Ex.: carvedilol, bisoprolol, metoprolol de liberação prolongada."],
    ["Estatina de alta intensidade após síndrome coronariana aguda:", ["Atorvastatina 40–80 mg ou rosuvastatina 20–40 mg", "Sinvastatina 10 mg", "Pravastatina 10 mg", "Nenhuma"], 0, "Meta de LDL muito baixa em alto risco."],
    ["Sopro sistólico em crescendo-decrescendo no 2º espaço intercostal direito irradiando para carótidas:", ["Estenose aórtica", "Insuficiência mitral", "CIV", "Estenose pulmonar"], 0, "Idoso com síncope ou angina."],
    ["Achado do ECG na hipocalemia:", ["Onda U proeminente", "Onda T apiculada", "QRS largo com onda sinusoidal", "Supra de ST difuso"], 0, "Também achatamento da onda T."],
    ["Tratamento da pericardite aguda viral/idiopática:", ["AINE (ou AAS) + colchicina", "Anticoagulação", "Antibiótico", "Cirurgia"], 0, "A colchicina reduz recorrências."],
    ["No IAM de parede inferior com hipotensão e pulmões limpos, pensar em:", ["Infarto do ventrículo direito: evitar nitrato e dar volume", "Edema agudo de pulmão","Tamponamento sempre","Embolia gordurosa"], 0, "Fazer derivações direitas (V3R, V4R)."],
    ["Fármaco de controle de frequência na fibrilação atrial com IC com FE reduzida:", ["Betabloqueador ou digoxina", "Verapamil", "Diltiazem", "Flecainida"], 0, "Bloqueadores de canal de cálcio não di-hidropiridínicos pioram a IC com FE reduzida."]
  ],
  tf: [
    ["O tabagismo é fator de risco modificável para doença coronariana.", true, "Verdadeiro."],
    ["Na estenose aórtica grave sintomática, o tratamento definitivo é a troca valvar.", true, "Verdadeiro: cirúrgica ou percutânea (TAVI)."],
    ["Nitratos são seguros após uso recente de sildenafila.", false, "Falso: risco de hipotensão grave."],
    ["A pressão arterial deve ser medida com manguito adequado ao braço.", true, "Verdadeiro: manguito pequeno superestima a PA."],
    ["A troponina pode subir em situações sem infarto, como sepse e embolia pulmonar.", true, "Verdadeiro: lesão miocárdica não isquêmica."],
    ["No BAV de 1º grau, sempre se indica marca-passo.", false, "Falso: em geral não exige tratamento."]
  ],
  pairs: [["Mobitz I", "Wenckebach"], ["Torsades de pointes", "Sulfato de magnésio"], ["Endocardite", "Critérios de Duke"], ["Hipocalemia", "Onda U"]],
  seq: [{ t: "Atendimento do IAM com supra de ST", items: ["Reconhecer a dor e fazer ECG em até 10 minutos", "Monitorar, acesso venoso e O₂ se SatO₂ < 90%", "AAS e segundo antiagregante", "Anticoagulante", "Reperfusão (angioplastia ou trombólise)", "Betabloqueador, estatina e IECA após estabilização"], e: "Tempo é músculo: cada minuto conta." }],
  cases: [
    { title: "Síncope ao esforço", story: "Homem de 75 anos desmaiou ao subir uma ladeira. Tem sopro sistólico rude em foco aórtico, irradiando para as carótidas, e B2 hipofonética.", steps: [
      ["Qual é a hipótese?", ["Estenose aórtica grave", "Insuficiência mitral", "Pericardite", "CIA"], 0, "Síncope ao esforço é um sinal de gravidade."],
      ["Qual exame confirma?", ["Ecocardiograma", "Raio-X de tórax", "Holter apenas", "Teste ergométrico"], 0, "O teste ergométrico é contraindicado na EA grave sintomática."],
      ["Qual é o tratamento?", ["Troca valvar (cirúrgica ou TAVI)", "Só diurético", "Vasodilatador potente", "Observação"], 0, "Após o início dos sintomas, a sobrevida sem troca é curta."]] },
    { title: "Dor no peito que melhora inclinado", story: "Homem de 30 anos com dor torácica há 2 dias, que piora ao deitar e melhora ao inclinar o tronco para a frente, após uma gripe. O ECG mostra supra de ST difuso e infra de PR.", steps: [
      ["Qual é o diagnóstico?", ["Pericardite aguda", "IAM anterior", "Dissecção de aorta", "TEP"], 0, "Dor posicional e ECG típico."],
      ["Achado da ausculta:", ["Atrito pericárdico", "B4", "Sopro diastólico", "Estalido de abertura"], 0, "Pode ser transitório."],
      ["Tratamento inicial:", ["AINE + colchicina", "Trombólise", "Anticoagulação plena", "Cirurgia"], 0, "Sem trombólise: não é infarto."]] }
  ]
});

addContent("pneumo", {
  flashcards: [
    ["Classificação da asma pelo controle", "Controlada, parcialmente controlada e não controlada (sintomas diurnos, noturnos, uso de resgate e limitação)."],
    ["Tratamento preferido de manutenção na asma (GINA)", "Corticoide inalatório, de preferência associado ao formoterol (também como resgate)."],
    ["Tratamento de manutenção da DPOC sintomática", "Broncodilatadores de longa ação (LAMA e/ou LABA). Corticoide inalatório se exacerbações e eosinófilos elevados."],
    ["Critérios de Light para exsudato (pelo menos 1)", "Proteína pleural/sérica > 0,5; LDH pleural/sérico > 0,6; LDH pleural > 2/3 do limite superior sérico."],
    ["Causa mais comum de derrame pleural transudativo", "Insuficiência cardíaca."],
    ["Escore de Wells para TEP", "Estima a probabilidade clínica: TVP, FC > 100, imobilização, TEP prévio, hemoptise, câncer e diagnóstico alternativo menos provável."],
    ["Tratamento do TEP com instabilidade hemodinâmica", "Trombólise sistêmica (se não houver contraindicação)."],
    ["Tratamento inicial do TEP estável", "Anticoagulação (heparina ou anticoagulante oral direto)."],
    ["Pneumotórax espontâneo primário: paciente típico", "Homem jovem, alto, magro e fumante."],
    ["Câncer de pulmão mais associado ao tabagismo", "Carcinoma de pequenas células e epidermoide (o adenocarcinoma é o mais comum no geral)."],
    ["Síndrome de Pancoast", "Tumor no ápice pulmonar: dor no ombro e braço, Horner e atrofia da mão."],
    ["Teste de difusão (DLCO) reduzido", "Enfisema, doenças intersticiais e vasculares pulmonares. Normal na asma."]
  ],
  quiz: [
    ["Antibiótico empírico para pneumonia comunitária ambulatorial em adulto saudável:", ["Amoxicilina ou macrolídeo", "Vancomicina", "Meropenem", "Fluconazol"], 0, "Conforme a diretriz local e fatores de risco."],
    ["Pneumonia comunitária grave internada: esquema típico:", ["Betalactâmico (ex.: ceftriaxona) + macrolídeo", "Só amoxicilina oral", "Metronidazol", "Aciclovir"], 0, "Ou fluoroquinolona respiratória."],
    ["Espirometria com VEF1/CVF normal e CVF reduzida sugere:", ["Distúrbio restritivo", "Distúrbio obstrutivo", "Normalidade", "Asma"], 0, "Confirmar com volumes pulmonares."],
    ["Exacerbação de DPOC com piora da tosse e escarro purulento:", ["Broncodilatador, corticoide sistêmico e antibiótico", "Só oxigênio a 100%", "Betabloqueador", "Nada"], 0, "Ventilação não invasiva se acidose respiratória."],
    ["Na crise de asma grave, sinal de iminência de parada:", ["Tórax silencioso e confusão", "Sibilos expiratórios leves", "FR 18","Tosse seca"], 0, "Indica fluxo aéreo mínimo."],
    ["Derrame pleural com pH < 7,2 e glicose baixa numa pneumonia:", ["Derrame complicado ou empiema: drenar","Transudato","Normal","Quilotórax"], 0, "Além do antibiótico."],
    ["Fibrose pulmonar idiopática: achado na TC:", ["Faveolamento subpleural basal", "Nódulo único cavitado", "Árvore em brotamento", "Vidro fosco difuso em ápice"], 0, "Padrão de pneumonia intersticial usual."],
    ["Tuberculose pulmonar: exame inicial recomendado no Brasil:", ["Teste rápido molecular (TRM-TB) do escarro", "Hemocultura", "Tomografia de rotina", "PPD isolado"], 0, "Detecta também resistência à rifampicina."],
    ["Síndrome da apneia obstrutiva do sono: exame diagnóstico:", ["Polissonografia", "Espirometria", "Raio-X de tórax", "Gasometria isolada"], 0, "Tratamento: CPAP nos casos moderados e graves."]
  ],
  tf: [
    ["Na asma, broncodilatador de longa ação (LABA) não deve ser usado sem corticoide inalatório.", true, "Verdadeiro: aumenta o risco de eventos graves."],
    ["A vacinação contra influenza e pneumococo é recomendada na DPOC.", true, "Verdadeiro."],
    ["O D-dímero elevado confirma o TEP.", false, "Falso: é pouco específico; serve para excluir quando negativo."],
    ["Oxigenoterapia domiciliar prolongada reduz mortalidade na DPOC com hipoxemia grave.", true, "Verdadeiro: PaO₂ ≤ 55 mmHg ou SatO₂ ≤ 88%."],
    ["O adenocarcinoma é o tipo mais comum de câncer de pulmão.", true, "Verdadeiro, inclusive em não fumantes."],
    ["Pneumonia aspirativa acomete mais o lobo superior esquerdo.", false, "Falso: mais os segmentos posteriores do lobo superior e o superior do lobo inferior direito (em decúbito)."]
  ],
  pairs: [["Critérios de Light", "Exsudato"], ["Wells", "Probabilidade de TEP"], ["Pancoast", "Tumor de ápice"], ["Polissonografia", "Apneia do sono"]],
  seq: [{ t: "Manejo da crise de asma no pronto-socorro", items: ["Avaliar gravidade (fala, FR, SatO₂, pico de fluxo)", "Oxigênio para SatO₂ de 93 a 95%", "Salbutamol inalatório repetido", "Ipratrópio nas crises graves", "Corticoide sistêmico", "Sulfato de magnésio IV se grave", "Reavaliar e decidir alta ou internação"], e: "Na alta, iniciar ou ajustar o corticoide inalatório." }],
  cases: [
    { title: "Falta de ar súbita", story: "Mulher de 35 anos, 10 dias após cirurgia ortopédica, com dispneia súbita, dor pleurítica e FC 115. SatO₂ 89%. PA normal.", steps: [
      ["Qual é a principal hipótese?", ["TEP", "Pneumonia", "Asma", "Ansiedade"], 0, "Pós-operatório e imobilização."],
      ["Qual exame de imagem confirma?", ["Angiotomografia de tórax", "Raio-X apenas", "Espirometria", "Ultrassom de abdome"], 0, "Cintilografia V/Q é alternativa."],
      ["Qual é o tratamento, com PA normal?", ["Anticoagulação", "Trombólise imediata", "Antibiótico", "Broncodilatador"], 0, "Trombólise só com instabilidade hemodinâmica."]] },
    { title: "Fumante com tosse crônica", story: "Homem de 62 anos, tabagista de 40 maços-ano, com tosse produtiva há anos e dispneia progressiva. Espirometria: VEF1/CVF 0,60 pós-broncodilatador, VEF1 55% do previsto.", steps: [
      ["Qual é o diagnóstico?", ["DPOC", "Asma", "Fibrose pulmonar", "Insuficiência cardíaca"], 0, "Obstrução persistente após broncodilatador."],
      ["Qual intervenção mais muda a evolução?", ["Parar de fumar", "Antibiótico contínuo", "Corticoide oral crônico", "Mucolítico"], 0, "Junto com vacinas e reabilitação pulmonar."],
      ["Tratamento de manutenção inicial para sintomas:", ["Broncodilatador de longa ação (LAMA e/ou LABA)", "Só corticoide inalatório", "Teofilina isolada", "Nada"], 0, "Ajustar conforme sintomas e exacerbações."]] }
  ]
});

addContent("gastro", {
  flashcards: [
    ["Sinais de alarme na dispepsia", "Perda de peso, disfagia, anemia, sangramento, vômitos persistentes e início após 60 anos: indicar endoscopia."],
    ["Tratamento da doença do refluxo gastroesofágico", "Medidas comportamentais e inibidor da bomba de prótons."],
    ["Complicação do refluxo crônico com metaplasia", "Esôfago de Barrett."],
    ["Acalasia", "Falha de relaxamento do esfíncter esofágico inferior: disfagia para sólidos e líquidos; esôfago em “bico de pássaro”."],
    ["Causa de acalasia no Brasil", "Doença de Chagas (megaesôfago)."],
    ["Escore de gravidade da cirrose", "Child-Pugh (bilirrubina, albumina, INR, ascite, encefalopatia) e MELD."],
    ["Profilaxia primária de sangramento por varizes", "Betabloqueador não seletivo (propranolol, carvedilol) ou ligadura elástica."],
    ["Marcadores da hepatite B crônica", "HBsAg positivo por mais de 6 meses."],
    ["Tratamento da hepatite C", "Antivirais de ação direta (ex.: sofosbuvir + velpatasvir), com cura acima de 95%."],
    ["Sinais de pancreatite crônica", "Dor abdominal recorrente, esteatorreia, diabetes e calcificações pancreáticas."],
    ["Síndrome do intestino irritável", "Dor abdominal recorrente associada a mudança do hábito intestinal, sem sinais de alarme (critérios de Roma IV)."],
    ["Rastreio do câncer colorretal na população de risco médio", "A partir dos 45–50 anos: pesquisa de sangue oculto/FIT ou colonoscopia."]
  ],
  quiz: [
    ["Diarreia aquosa, febre e dor abdominal após uso recente de antibiótico:", ["Colite por Clostridioides difficile", "Síndrome do intestino irritável", "Doença celíaca", "Intolerância à lactose"], 0, "Tratar com vancomicina oral ou fidaxomicina."],
    ["Icterícia indolor com vesícula palpável (sinal de Courvoisier) sugere:", ["Neoplasia de cabeça de pâncreas", "Coledocolitíase", "Hepatite A", "Cirrose"], 0, "Na litíase, a vesícula costuma estar escleroatrófica."],
    ["Doença de Wilson: achados:", ["Hepatopatia, alterações neuropsiquiátricas e anel de Kayser-Fleischer", "Pele bronzeada e diabetes", "Prurido e anticorpo antimitocôndria", "Icterícia neonatal"], 0, "Ceruloplasmina baixa; acúmulo de cobre."],
    ["Hemocromatose hereditária: achados:", ["Pele bronzeada, diabetes e cirrose, com ferritina e saturação de transferrina altas", "Anemia ferropriva","Anel de Kayser-Fleischer","Hepatite autoimune"], 0, "Gene HFE; tratamento: flebotomias."],
    ["Colangite biliar primária: anticorpo característico:", ["Antimitocôndria", "Antitransglutaminase", "ANCA", "Anti-CCP"], 0, "Mulher de meia-idade com prurido e fosfatase alcalina alta."],
    ["Colangite esclerosante primária associa-se a:", ["Retocolite ulcerativa", "Doença celíaca", "Hepatite B", "Gota"], 0, "Estenoses biliares em contas de rosário."],
    ["Diverticulite aguda: localização mais comum no Ocidente:", ["Cólon sigmoide (fossa ilíaca esquerda)", "Ceco", "Reto", "Duodeno"], 0, "Diagnóstico com tomografia."],
    ["Profilaxia de PBE após um episódio:", ["Norfloxacino ou outra quinolona contínua (ou SMX-TMP)", "Nenhuma", "Vancomicina", "Metronidazol"], 0, "Profilaxia secundária."],
    ["Antídoto da intoxicação por paracetamol deve ser dado idealmente:", ["Até 8 horas da ingestão", "Somente após 48 h", "Só se houver icterícia","Nunca"], 0, "Pode ser dado mais tarde, mas o benefício é menor."]
  ],
  tf: [
    ["A hepatite B pode ser prevenida por vacina.", true, "Verdadeiro: 3 doses."],
    ["A hepatite C tem vacina disponível.", false, "Falso: não há vacina; há tratamento curativo."],
    ["Na retocolite ulcerativa, a colectomia pode ser curativa.", true, "Verdadeiro, ao contrário da doença de Crohn."],
    ["A esteatose hepática não alcoólica associa-se à síndrome metabólica.", true, "Verdadeiro."],
    ["Hematoquezia volumosa sempre indica sangramento do cólon.", false, "Falso: sangramento alto muito volumoso também pode causar."],
    ["Na doença celíaca, a dieta deve excluir trigo, cevada e centeio.", true, "Verdadeiro."]
  ],
  pairs: [["Acalasia", "Bico de pássaro"], ["Wilson", "Anel de Kayser-Fleischer"], ["Colangite biliar primária", "Antimitocôndria"], ["Hemocromatose", "Ferritina alta"]],
  seq: [{ t: "Abordagem da hemorragia digestiva alta", items: ["Avaliar estabilidade e proteger via aérea", "Dois acessos venosos calibrosos", "Reposição volêmica e transfusão se necessário", "IBP IV (e droga vasoativa se suspeita de varizes)", "Endoscopia em até 24 horas", "Tratar a causa e prevenir recidiva"], e: "Escore de Glasgow-Blatchford ajuda a estratificar o risco." }],
  cases: [
    { title: "Dor de barriga após festa", story: "Homem de 45 anos com dor epigástrica intensa que irradia para as costas, vômitos, após consumo de álcool. Lipase 3 vezes acima do normal.", steps: [
      ["Diagnóstico?", ["Pancreatite aguda", "Úlcera perfurada", "IAM inferior", "Cólica biliar"], 0, "Dor típica + lipase > 3x."],
      ["Medida inicial mais importante:", ["Hidratação venosa e analgesia", "Antibiótico de rotina", "Cirurgia", "Jejum prolongado obrigatório"], 0, "Dieta oral precoce quando tolerada."],
      ["Exame para investigar causa biliar:", ["Ultrassonografia de abdome", "Endoscopia digestiva alta", "Colonoscopia", "Raio-X de tórax"], 0, "Litíase é a outra grande causa."]] },
    { title: "Diarreia crônica no jovem", story: "Homem de 24 anos com diarreia há 4 meses, dor na fossa ilíaca direita, perda de peso e fístula perianal.", steps: [
      ["Hipótese?", ["Doença de Crohn", "Retocolite ulcerativa", "Síndrome do intestino irritável", "Giardíase"], 0, "Fístula perianal e íleo terminal."],
      ["Exame inicial principal:", ["Ileocolonoscopia com biópsias", "Endoscopia alta apenas", "Raio-X simples","Urocultura"], 0, "Lesões salteadas e granulomas não caseosos."],
      ["Fator que piora a doença e deve ser abandonado:", ["Tabagismo", "Café", "Exercício", "Leite"], 0, "O tabagismo piora o Crohn."]] }
  ]
});
