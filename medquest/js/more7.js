// Conteúdo ampliado (parte 7): Pediatria, Ginecologia e Obstetrícia, Cirurgia, Urgência & Emergência.
addContent("pedi", {
  flashcards: [
    ["Escala de Apgar: o que avalia", "Frequência cardíaca, respiração, tônus, irritabilidade reflexa e cor, no 1º e no 5º minuto."],
    ["Recém-nascido que não respira ao nascer: primeiro passo", "Aquecer, posicionar, aspirar se necessário e secar; se apneia ou FC < 100, ventilação com pressão positiva no primeiro minuto (minuto de ouro)."],
    ["Icterícia fisiológica do recém-nascido", "Aparece após 24 h, pico em 3 a 5 dias, bilirrubina indireta, sem outros sinais."],
    ["Tratamento da hiperbilirrubinemia indireta", "Fototerapia; exsanguineotransfusão em níveis muito altos."],
    ["Vacinas ao nascer (calendário brasileiro)", "BCG e hepatite B."],
    ["Febre sem sinais de localização em < 3 meses", "Avaliar com exames (urina, hemograma, PCR, hemocultura) por risco de infecção bacteriana grave."],
    ["Causa mais comum de infecção bacteriana grave no lactente febril", "Infecção urinária."],
    ["Otite média aguda: agente mais comum", "Streptococcus pneumoniae. Tratamento: amoxicilina."],
    ["Diarreia aguda na criança: tratamento principal", "Reidratação oral e manter a alimentação; zinco por 10 a 14 dias."],
    ["Desnutrição grave: tipos", "Marasmo (emagrecimento grave) e kwashiorkor (edema, alterações de pele e cabelo, hipoalbuminemia)."],
    ["Sinais de maus-tratos na criança", "Lesões em diferentes estágios, fraturas inexplicadas, história incompatível e demora na procura de atendimento."],
    ["Asma na criança: tratamento de manutenção", "Corticoide inalatório em dose baixa (com espaçador)."]
  ],
  quiz: [
    ["Criança de 2 anos com febre há 5 dias, conjuntivite sem secreção, lábios rachados, exantema e edema de mãos:", ["Doença de Kawasaki", "Sarampo","Escarlatina","Mononucleose"], 0, "Ecocardiograma para avaliar coronárias."],
    ["Vacina rotavírus: idade máxima para a 1ª dose:", ["3 meses e 15 dias", "1 ano","5 anos","Ao nascer"], 0, "Pelo risco de intussuscepção."],
    ["Lactente com choro intermitente, pernas encolhidas, fezes em geleia de framboesa:", ["Intussuscepção intestinal", "Cólica do lactente","Apendicite","Gastroenterite viral"], 0, "Ultrassom: imagem em alvo."],
    ["Tratamento da intussuscepção sem sinais de perfuração:", ["Redução por enema (ar ou contraste) guiada por imagem", "Antibiótico","Laxante","Observação em casa"], 0, "Cirurgia se falhar."],
    ["Crise febril simples:", ["Generalizada, < 15 min, uma vez em 24 h, entre 6 meses e 5 anos", "Focal e prolongada","Com febre ausente","Em adolescentes"], 0, "Bom prognóstico; não exige anticonvulsivante contínuo."],
    ["Recém-nascido prematuro com desconforto respiratório e vidro fosco difuso no raio-X:", ["Doença da membrana hialina (falta de surfactante)", "Taquipneia transitória","Pneumonia lobar","Pneumotórax"], 0, "Surfactante exógeno e CPAP."],
    ["Taquipneia transitória do recém-nascido é mais comum em:", ["Cesárea sem trabalho de parto", "Parto normal prolongado","Prematuros extremos apenas","Pós-termo"], 0, "Retenção de líquido pulmonar; melhora em 24 a 72 h."],
    ["Faringoamigdalite estreptocócica: tratamento:", ["Penicilina benzatina IM ou amoxicilina por 10 dias", "Antiviral","Só sintomáticos","Azitromicina por 1 dia"], 0, "Previne febre reumática."],
    ["Pneumonia em criança com tiragem subcostal e sem sinais de perigo (OMS):", ["Amoxicilina oral", "Internação obrigatória","Ceftriaxona sempre","Só nebulização"], 0, "Sinais de perigo indicam internação."]
  ],
  tf: [
    ["O leite de vaca integral não é recomendado antes de 1 ano.", true, "Verdadeiro: risco de anemia e sobrecarga renal."],
    ["Febre por si só causa dano cerebral na maioria das crianças.", false, "Falso: tratar para conforto, não pelo número."],
    ["A posição recomendada para o bebê dormir é de barriga para cima.", true, "Verdadeiro: reduz morte súbita."],
    ["Antibiótico é indicado para toda diarreia aguda em crianças.", false, "Falso: a maioria é viral."],
    ["O teste do olhinho (reflexo vermelho) rastreia catarata e retinoblastoma.", true, "Verdadeiro."],
    ["O teste do coraçãozinho mede a saturação no braço direito e em um pé.", true, "Verdadeiro: entre 24 e 48 h de vida."]
  ],
  pairs: [["Intussuscepção", "Fezes em geleia de framboesa"], ["Membrana hialina", "Falta de surfactante"], ["Otite média aguda", "Amoxicilina"], ["Kwashiorkor", "Edema e hipoalbuminemia"]],
  seq: [{ t: "Reanimação neonatal (passos iniciais)", items: ["Prover calor", "Posicionar a cabeça", "Aspirar boca e narinas se necessário", "Secar e estimular", "Avaliar respiração e frequência cardíaca", "Ventilação com pressão positiva se apneia ou FC < 100"], e: "Os primeiros passos devem ocorrer em até 30 segundos." }],
  cases: [
    { title: "Febre no lactente pequeno", story: "Bebê de 6 semanas com febre de 38,5 °C, mamando menos, sem foco aparente ao exame.", steps: [
      ["Conduta?", ["Investigação com exames (urina, sangue e, conforme risco, líquor)", "Alta com antitérmico", "Antibiótico oral sem exames", "Raio-X apenas"], 0, "Risco alto de infecção bacteriana grave."],
      ["Infecção bacteriana mais comum nesse cenário:", ["Infecção urinária", "Otite", "Faringite", "Sinusite"], 0, "Colher urina por sondagem ou punção."],
      ["Se houver sinais de toxemia:", ["Internar e iniciar antibiótico IV após culturas", "Observar 1 semana", "Só soro oral", "Vacinar"], 0, "Ex.: ampicilina + cefotaxima/gentamicina."]] },
    { title: "Criança com diarreia e sede", story: "Criança de 2 anos com diarreia há 2 dias, irritada, olhos fundos, bebe com avidez, prega cutânea volta lentamente.", steps: [
      ["Classificação da OMS?", ["Desidratação (algum grau), plano B", "Sem desidratação, plano A", "Desidratação grave, plano C", "Choque"], 0, "Irritada e bebe com avidez."],
      ["Tratamento?", ["Soro de reidratação oral na unidade, em 4 horas", "Hidratação venosa imediata", "Antibiótico", "Jejum"], 0, "Reavaliar após."],
      ["Suplemento recomendado:", ["Zinco por 10 a 14 dias", "Ferro em dose alta", "Vitamina C", "Probiótico obrigatório"], 0, "Reduz duração e recorrência."]] }
  ]
});

addContent("go", {
  flashcards: [
    ["Exames do 1º trimestre do pré-natal", "Tipagem e Rh, hemograma, glicemia, sorologias (HIV, sífilis, hepatites B e C, toxoplasmose), urina e urocultura, ultrassom."],
    ["Gestante Rh negativo com parceiro Rh positivo", "Coombs indireto; imunoglobulina anti-D com 28 semanas e após o parto se RN Rh positivo."],
    ["Sinais de trabalho de parto", "Contrações regulares e dilatação cervical progressiva."],
    ["Fases do trabalho de parto", "Dilatação, expulsão, dequitação (saída da placenta) e período de Greenberg (1ª hora)."],
    ["Manejo ativo do 3º período", "Ocitocina 10 UI IM logo após o nascimento, tração controlada do cordão e massagem uterina."],
    ["Corticoide antenatal: quando", "Risco de parto prematuro entre 24 e 34 semanas (betametasona)."],
    ["Rotura prematura de membranas: risco principal", "Infecção (corioamnionite) e prematuridade."],
    ["Sangramento no 1º trimestre: causas", "Abortamento, gravidez ectópica e doença trofoblástica."],
    ["Mola hidatiforme completa", "Cariótipo 46,XX paterno, beta-hCG muito alto, útero grande, imagem em “flocos de neve”."],
    ["Método contraceptivo reversível mais eficaz", "DIU (cobre ou hormonal) e implante subdérmico."],
    ["Rastreamento do câncer de mama (Brasil, MS)", "Mamografia a cada 2 anos dos 50 aos 69 anos (podendo começar aos 40 com decisão compartilhada)."],
    ["Endometriose: sintomas", "Dismenorreia progressiva, dor pélvica crônica, dispareunia e infertilidade."]
  ],
  quiz: [
    ["Corrimento branco grumoso com prurido intenso:", ["Candidíase", "Vaginose bacteriana","Tricomoníase","Gonorreia"], 0, "Tratamento: fluconazol ou azólico tópico."],
    ["Corrimento acinzentado com odor de peixe e teste das aminas positivo:", ["Vaginose bacteriana", "Candidíase","Clamídia","Herpes"], 0, "Gardnerella; metronidazol."],
    ["Doença inflamatória pélvica: tratamento ambulatorial:", ["Ceftriaxona IM + doxiciclina + metronidazol", "Só fluconazol","Amoxicilina por 3 dias","Nada"], 0, "Tratar parceiro."],
    ["Sangramento uterino anormal em mulher após a menopausa:", ["Investigar câncer de endométrio (ultrassom e biópsia)", "Normal, não investigar","Só hormônio","Só antibiótico"], 0, "Sempre investigar."],
    ["Mioma uterino: sintoma mais comum:", ["Sangramento menstrual aumentado", "Febre","Icterícia","Tosse"], 0, "Também dor e compressão."],
    ["Gestação ectópica íntegra, estável, beta-hCG baixo e sem batimento:", ["Metotrexato pode ser opção", "Cirurgia de urgência obrigatória sempre","Ocitocina","Nada"], 0, "Critérios específicos."],
    ["Diabetes gestacional não controlado com dieta: primeira opção:", ["Insulina", "Glibenclamida obrigatória","iSGLT2","Pioglitazona"], 0, "Metformina pode ser usada em situações específicas."],
    ["Sífilis na gestação: tratamento:", ["Penicilina benzatina", "Azitromicina","Ceftriaxona","Doxiciclina"], 0, "Única que trata o feto adequadamente."],
    ["Pré-eclâmpsia: prevenção em gestantes de alto risco:", ["AAS em dose baixa a partir de 12–16 semanas e cálcio se baixa ingestão", "Repouso absoluto","Diurético","Nada"], 0, "Iniciar antes de 16 semanas."]
  ],
  tf: [
    ["A vacina contra o HPV previne a maioria dos casos de câncer de colo do útero.", true, "Verdadeiro."],
    ["Na gestação, a gestante deve receber vacina contra influenza.", true, "Verdadeiro."],
    ["A amamentação exclusiva protege contra gravidez em qualquer situação.", false, "Falso: só como método de amenorreia lactacional, com critérios rigorosos, até 6 meses."],
    ["O exame preventivo (Papanicolau) diagnostica câncer de ovário.", false, "Falso: rastreia lesões do colo do útero."],
    ["Na eclâmpsia, a convulsão deve ser tratada com sulfato de magnésio.", true, "Verdadeiro."],
    ["O sangramento vaginal na gestação de 3º trimestre exige avaliação imediata.", true, "Verdadeiro: placenta prévia, descolamento e outros."]
  ],
  pairs: [["Candidíase", "Corrimento grumoso"], ["Vaginose bacteriana", "Odor de peixe"], ["Mola completa", "Beta-hCG muito alto"], ["Rh negativo", "Imunoglobulina anti-D"]],
  seq: [{ t: "Fases clínicas do parto", items: ["Dilatação (contrações regulares)", "Expulsão do feto", "Dequitação (saída da placenta)", "Período de Greenberg (1ª hora após)"], e: "A 4ª fase é a de maior risco de hemorragia." }],
  cases: [
    { title: "Sangramento após o parto", story: "Puérpera, 20 minutos após parto vaginal de bebê de 4 kg, com sangramento intenso, útero amolecido acima da cicatriz umbilical. PA 90x60, FC 115.", steps: [
      ["Causa mais provável?", ["Atonia uterina", "Laceração de colo", "Retenção placentária", "Coagulopatia"], 0, "Útero amolecido."],
      ["Primeiras medidas?", ["Massagem uterina e ocitocina", "Esperar", "Curetagem imediata", "Antibiótico"], 0, "E acesso venoso, reposição e chamar ajuda."],
      ["Se não responder:", ["Ácido tranexâmico e outros uterotônicos (metilergometrina, misoprostol)", "Alta", "Diurético", "Nada"], 0, "Balão de tamponamento e cirurgia se persistir."]] },
    { title: "Atraso menstrual e dor", story: "Mulher de 27 anos com atraso de 7 semanas, dor forte em fossa ilíaca esquerda e sangramento vaginal discreto. Beta-hCG positivo e ultrassom sem saco gestacional no útero, com líquido livre. PA 85x50.", steps: [
      ["Diagnóstico?", ["Gravidez ectópica rota", "Abortamento completo", "Mola", "Cisto funcional"], 0, "Instável com líquido livre."],
      ["Conduta?", ["Cirurgia de urgência", "Metotrexato", "Observação", "Ocitocina"], 0, "Instabilidade contraindica tratamento clínico."],
      ["Fator de risco clássico para esse quadro:", ["Doença inflamatória pélvica prévia", "Uso de pílula", "Exercício", "Dieta"], 0, "Também cirurgia tubária e DIU (se engravidar)."]] }
  ]
});

addContent("cirurgia", {
  flashcards: [
    ["Classificação de ferida operatória", "Limpa, potencialmente contaminada, contaminada e infectada (suja)."],
    ["Escala de risco anestésico", "ASA (I a VI)."],
    ["Escala de risco cirúrgico cardíaco em cirurgia não cardíaca", "Índice de Lee (RCRI)."],
    ["Profilaxia de tromboembolismo no pós-operatório", "Deambulação precoce, compressão mecânica e heparina conforme risco (escore de Caprini)."],
    ["Febre no pós-operatório: causas por tempo (5 W)", "Wind (pulmão, 1-2 dias), Water (urina, 3-5), Wound (ferida, 5-7), Walking (TVP), Wonder drugs (medicamentos)."],
    ["Abdome agudo obstrutivo: achados", "Dor em cólica, distensão, vômitos e parada de eliminação de gases e fezes; níveis hidroaéreos no raio-X."],
    ["Volvo de sigmoide: imagem clássica", "Grão de café no raio-X; descompressão por colonoscopia/retossigmoidoscopia."],
    ["Isquemia mesentérica aguda", "Dor desproporcional ao exame em idoso com FA ou aterosclerose; lactato alto."],
    ["Colecistite aguda: sinais", "Dor em hipocôndrio direito, febre, Murphy positivo; ultrassom com parede espessada e cálculo."],
    ["Escore de Glasgow modificado no TCE", "Glasgow 13–15: leve; 9–12: moderado; ≤ 8: grave."],
    ["Pneumotórax hipertensivo: local da descompressão (ATLS atual)", "4º ou 5º espaço intercostal na linha axilar média (em adultos)."],
    ["Choque hemorrágico classe III", "Perda de 30 a 40% do volume: hipotensão, FC > 120 e confusão; precisa de sangue."]
  ],
  quiz: [
    ["Paciente politraumatizado com via aérea pérvia, mas sangramento de membro em jato:", ["Controle imediato da hemorragia (compressão, torniquete)", "Raio-X antes","Intubação primeiro sempre","Tomografia"], 0, "O X do XABCDE."],
    ["Trauma torácico com hipotensão, turgência jugular e murmúrio presente bilateral:", ["Tamponamento cardíaco", "Pneumotórax hipertensivo","Hemotórax maciço","Contusão pulmonar"], 0, "Tríade de Beck; pericardiocentese ou toracotomia."],
    ["Hemotórax maciço: definição na drenagem:", ["≥ 1.500 mL imediatos ou > 200 mL/h por 2 a 4 h", "50 mL","200 mL total","Qualquer volume"], 0, "Indica toracotomia."],
    ["Abdome agudo perfurativo: exame inicial simples:", ["Raio-X de tórax em pé (pneumoperitônio)", "Hemograma apenas","Endoscopia","Colonoscopia"], 0, "Tomografia se dúvida."],
    ["Hérnia femoral: característica:", ["Abaixo do ligamento inguinal, mais comum em mulheres e com alto risco de encarceramento", "Acima do ligamento","Sempre em crianças","Nunca encarcera"], 0, "Indicar correção."],
    ["Colangite aguda grave (pêntade de Reynolds) acrescenta à tríade de Charcot:", ["Hipotensão e confusão mental", "Febre e vômitos","Prurido e colúria","Ascite e edema"], 0, "Drenagem biliar urgente (CPRE)."],
    ["Fístula pós-operatória de alto débito: complicação metabólica comum:", ["Desidratação e distúrbios eletrolíticos", "Hipertensão","Hiperglicemia","Policitemia"], 0, "Repor perdas e nutrir."],
    ["Primeira medida na queimadura de face com rouquidão e escarro carbonáceo:", ["Avaliar e garantir via aérea precocemente (intubação)", "Pomada","Alta","Antibiótico tópico"], 0, "Lesão inalatória."],
    ["Trauma raquimedular: sinal de choque neurogênico:", ["Hipotensão com bradicardia", "Hipotensão com taquicardia","Hipertensão","Febre"], 0, "Perda do tônus simpático."]
  ],
  tf: [
    ["Todo paciente politraumatizado inconsciente deve ter a coluna cervical protegida.", true, "Verdadeiro, até excluir lesão."],
    ["O exame FAST negativo exclui qualquer lesão abdominal.", false, "Falso: lesões de víscera oca e retroperitoneais podem não aparecer."],
    ["Deambulação precoce reduz complicações pulmonares e tromboembólicas.", true, "Verdadeiro."],
    ["A sutura primária é indicada em mordeduras muito contaminadas de mãos.", false, "Falso: em geral evita-se fechar mordeduras de mão."],
    ["Na apendicite complicada com abscesso, a drenagem percutânea pode ser feita antes da cirurgia.", true, "Verdadeiro em casos selecionados."],
    ["A antibioticoprofilaxia de cirurgia colorretal cobre Gram-negativos e anaeróbios.", true, "Verdadeiro: ex.: cefazolina + metronidazol."]
  ],
  pairs: [["Volvo de sigmoide", "Grão de café"], ["Choque neurogênico", "Hipotensão com bradicardia"], ["Pêntade de Reynolds", "Colangite grave"], ["Hemotórax maciço", "≥ 1.500 mL"]],
  seq: [{ t: "Avaliação primária no trauma (XABCDE)", items: ["X: hemorragia exsanguinante", "A: via aérea com proteção cervical", "B: respiração e ventilação", "C: circulação e controle de sangramento", "D: disfunção neurológica", "E: exposição e controle da temperatura"], e: "Reavaliar sempre após cada intervenção." }],
  cases: [
    { title: "Motociclista sem ar", story: "Motociclista de 25 anos após colisão: dispneia intensa, desvio da traqueia para a esquerda, murmúrio abolido à direita, hipertimpanismo, PA 80x50 e jugular túrgida.", steps: [
      ["Diagnóstico?", ["Pneumotórax hipertensivo à direita", "Tamponamento", "Hemotórax maciço", "Contusão pulmonar"], 0, "Hipertimpanismo e desvio da traqueia."],
      ["Conduta imediata?", ["Descompressão com agulha (ou dedo) seguida de drenagem", "Raio-X primeiro", "Tomografia", "Intubação apenas"], 0, "Diagnóstico clínico."],
      ["Dreno definitivo onde?", ["5º espaço intercostal entre linhas axilares anterior e média", "2º espaço na linha clavicular", "Abdome", "Dorso"], 0, "Triângulo de segurança."]] },
    { title: "Idoso com dor e barriga inchada", story: "Homem de 78 anos, constipado há dias, com distensão abdominal importante, dor em cólica e parada de eliminação de gases. Raio-X: alça colônica muito distendida em forma de U invertido.", steps: [
      ["Diagnóstico provável?", ["Volvo de sigmoide", "Apendicite", "Úlcera perfurada", "Pancreatite"], 0, "Imagem em grão de café."],
      ["Tratamento inicial sem sinais de isquemia?", ["Descompressão endoscópica", "Laxante", "Alta", "Antibiótico apenas"], 0, "Cirurgia eletiva depois, pelo risco de recidiva."],
      ["Indicação de cirurgia de urgência:", ["Sinais de isquemia, perfuração ou peritonite", "Dor leve", "Febre baixa isolada", "Idade"], 0, "Ressecção."]] }
  ]
});

addContent("clinica", {
  flashcards: [
    ["Causas reversíveis de PCR (5 H e 5 T)", "Hipovolemia, hipóxia, H⁺ (acidose), hipo/hipercalemia, hipotermia; tensão (pneumotórax), tamponamento, toxinas, trombose pulmonar e coronária."],
    ["Dose de amiodarona na FV/TV sem pulso refratária", "300 mg IV após o 3º choque; depois 150 mg."],
    ["Energia do choque bifásico no adulto", "Conforme o fabricante (em geral 120 a 200 J); monofásico 360 J."],
    ["Intervalo para checar ritmo na RCP", "A cada 2 minutos, trocando quem comprime."],
    ["Capnografia na RCP", "EtCO₂ < 10 mmHg sugere compressões ruins; aumento súbito sugere retorno da circulação."],
    ["Anafilaxia: dose de adrenalina IM no adulto", "0,5 mg (0,01 mg/kg), na face lateral da coxa; repetir a cada 5 a 15 min se necessário."],
    ["Intoxicação por organofosforado: síndrome", "Colinérgica (SLUDGE): salivação, lacrimejamento, urina, diarreia, vômitos, miose e bradicardia."],
    ["Hipoglicemia: regra dos 15", "15 g de carboidrato rápido e reavaliar em 15 minutos (paciente consciente)."],
    ["Emergência hipertensiva", "PA muito elevada com lesão aguda de órgão-alvo; reduzir de forma controlada com droga IV."],
    ["Urgência hipertensiva", "PA muito elevada sem lesão aguda de órgão-alvo; reduzir em horas a dias com droga oral."],
    ["Escore de risco de sangramento digestivo alto", "Glasgow-Blatchford."],
    ["Critérios de alta da hipoglicemia por sulfonilureia", "Observação prolongada: risco de hipoglicemia recorrente por muitas horas."]
  ],
  quiz: [
    ["Primeiro passo ao encontrar alguém caído e irresponsivo:", ["Verificar segurança, chamar ajuda e checar respiração e pulso", "Iniciar ventilação boca a boca por 5 minutos", "Dar água", "Esperar o SAMU sem tocar"], 0, "Se sem pulso: compressões e DEA."],
    ["Na PCR, a adrenalina é dada:", ["1 mg IV a cada 3 a 5 minutos", "10 mg única", "Só no fim", "IM 0,5 mg"], 0, "Em ritmos chocáveis, após o 2º choque."],
    ["Ritmo de PCR com atividade elétrica organizada e sem pulso:", ["AESP", "FV", "TV sem pulso", "Assistolia"], 0, "Não chocável: buscar causas reversíveis."],
    ["Taquicardia de QRS estreito regular estável, após manobra vagal:", ["Adenosina 6 mg em bolus rápido", "Choque não sincronizado", "Amiodarona 300 mg em bolus", "Atropina"], 0, "Depois 12 mg se necessário."],
    ["Edema agudo de pulmão hipertensivo: primeira linha:", ["Ventilação não invasiva, nitrato e diurético", "Volume","Betabloqueador IV em dose alta","Morfina obrigatória"], 0, "Sentar o paciente."],
    ["Organofosforado: tratamento:", ["Atropina em doses crescentes e pralidoxima", "Flumazenil","Naloxona","N-acetilcisteína"], 0, "Descontaminação e suporte."],
    ["Intoxicação por monóxido de carbono: tratamento:", ["Oxigênio a 100% (hiperbárico em casos graves)", "Ar ambiente","Antídoto específico","Diurético"], 0, "A oximetria pode ser falsamente normal."],
    ["Choque com pele quente, hipotensão e lactato alto após infecção:", ["Choque distributivo (séptico)", "Cardiogênico","Hipovolêmico","Obstrutivo"], 0, "Resistência vascular baixa."],
    ["Hipotermia grave em PCR: conduta:", ["RCP e reaquecimento ativo; não declarar óbito antes de aquecer", "Parar a RCP logo","Só cobertor","Nada"], 0, "“Ninguém está morto até estar quente e morto.”"]
  ],
  tf: [
    ["Interrupções nas compressões devem ser mínimas.", true, "Verdadeiro: menos de 10 segundos."],
    ["Na PCR com via aérea avançada, ventila-se 1 vez a cada 6 segundos sem pausar compressões.", true, "Verdadeiro: 10 ventilações por minuto."],
    ["O DEA deve ser usado assim que disponível.", true, "Verdadeiro."],
    ["Na urgência hipertensiva sem lesão de órgão, deve-se baixar a PA ao normal em minutos.", false, "Falso: reduzir gradualmente, em horas a dias."],
    ["Carvão ativado é útil em intoxicações por ferro e lítio.", false, "Falso: não adsorve metais e álcoois."],
    ["Hipercalemia grave pode causar PCR.", true, "Verdadeiro: tratar rápido."]
  ],
  pairs: [["Organofosforado", "Atropina"], ["Monóxido de carbono", "Oxigênio a 100%"], ["AESP", "Ritmo não chocável"], ["Emergência hipertensiva", "Lesão aguda de órgão-alvo"]],
  seq: [{ t: "Algoritmo da PCR em FV/TV sem pulso", items: ["Iniciar RCP e oxigênio", "Choque", "RCP 2 minutos e acesso", "Choque", "RCP + adrenalina a cada 3–5 min", "Choque", "RCP + amiodarona e tratar causas"], e: "Checar ritmo a cada 2 minutos." }],
  cases: [
    { title: "Parada no corredor", story: "Paciente de 60 anos cai no corredor do hospital, não responde, não respira e está sem pulso. O monitor mostra fibrilação ventricular.", steps: [
      ["Primeira ação?", ["Compressões imediatas e desfibrilação o quanto antes", "Intubar antes de tudo", "Adrenalina antes do choque", "Esperar o cardiologista"], 0, "Na FV, o choque precoce é decisivo."],
      ["Após 2 choques sem retorno, droga a dar:", ["Adrenalina 1 mg", "Atropina", "Adenosina", "Bicarbonato de rotina"], 0, "Depois amiodarona após o 3º choque."],
      ["Após o retorno da circulação, cuidado importante:", ["Controle de temperatura, PA e oxigenação; ECG e investigar causa", "Alta", "Parar monitorização", "Nada"], 0, "Cuidados pós-PCR."]] },
    { title: "Agricultor que baba e treme", story: "Agricultor de 40 anos é trazido após aplicar agrotóxico sem proteção: salivação intensa, sudorese, miose, vômitos, diarreia, broncorreia e FC 45.", steps: [
      ["Síndrome tóxica?", ["Colinérgica (organofosforado/carbamato)", "Anticolinérgica", "Simpatomimética", "Opioide"], 0, "SLUDGE com miose e bradicardia."],
      ["Tratamento?", ["Atropina até secar secreções, e pralidoxima", "Naloxona", "Flumazenil", "N-acetilcisteína"], 0, "A meta é secar as secreções brônquicas."],
      ["Medida de proteção da equipe:", ["Retirar roupas e lavar a pele com equipamento de proteção", "Nada", "Só máscara cirúrgica", "Dar banho sem luvas"], 0, "Evitar contaminação."]] }
  ]
});
