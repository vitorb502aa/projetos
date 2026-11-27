/* MedQuest Lab — Plantão virtual.
   Pacientes fictícios. O estudante pergunta, examina, pede exames, formula a hipótese e decide a conduta.
   Peso de cada ação: 1 = essencial · 0 = aceitável · -1 = desnecessária ou atrasa o cuidado. */
"use strict";

const WARD_CASES = [
  {
    id: "iam", area: "cardio", title: "Dor no peito no fim do expediente", setting: "Sala de emergência",
    patient: { name: "Sr. Antônio Ferreira", age: 62, sex: "M", job: "motorista de caminhão", avatar: "👨🏽‍🦳" },
    complaint: "Doutor, estou com uma dor muito forte no peito faz uma hora.",
    vitals: { PA: "150/90 mmHg", FC: "98 bpm", FR: "20 irpm", T: "36,6 °C", SatO2: "96%" },
    questions: [
      ["Como é a dor e onde fica?", "É um aperto no meio do peito, como um peso em cima.", 1],
      ["A dor vai para algum outro lugar?", "Vai para o braço esquerdo e para o queixo.", 1],
      ["Quando começou e o que o senhor estava fazendo?", "Há uma hora, descarregando caixas do caminhão.", 1],
      ["Está sentindo mais alguma coisa?", "Estou suando frio e com enjoo.", 1],
      ["Tem alguma doença ou toma remédios?", "Tenho pressão alta e colesterol, mas parei os remédios há meses.", 1],
      ["O senhor fuma?", "Fumo um maço por dia há 40 anos.", 1],
      ["A dor muda ao respirar fundo ou ao mudar de posição?", "Não, fica igual o tempo todo.", 1],
      ["Tem alergia a algum medicamento?", "Que eu saiba, não.", 1],
      ["Viajou de avião ou ficou imobilizado recentemente?", "Não.", 0],
      ["Como anda o seu sono?", "Normal.", -1],
      ["Tem casos de câncer na família?", "Uma tia teve câncer de mama.", -1]
    ],
    exam: [
      ["Ausculta cardíaca", "Ritmo regular, bulhas normofonéticas, sem sopros ou atrito.", 1],
      ["Ausculta pulmonar", "Murmúrio vesicular presente, sem estertores (Killip I).", 1],
      ["Pulsos e PA nos dois braços", "Pulsos simétricos; PA de 150/90 nos dois braços.", 1],
      ["Pele e extremidades", "Sudorese fria, sem edema.", 0],
      ["Exame do abdome", "Flácido e indolor.", 0]
    ],
    tests: [
      ["ECG de 12 derivações", "Supradesnivelamento de ST de 3 mm em DII, DIII e aVF, com infra em DI e aVL.", 1],
      ["Troponina", "Coletada. Resultado em 1 h; não deve atrasar a reperfusão.", 1],
      ["Raio-X de tórax", "Sem alterações agudas.", 0],
      ["Glicemia capilar", "132 mg/dL.", 0],
      ["D-dímero", "Não indicado neste quadro.", -1],
      ["Tomografia de crânio", "Normal. Exame sem indicação.", -1]
    ],
    dx: { correct: "IAM com supra de ST de parede inferior", wrong: ["Pericardite aguda", "Dissecção aguda de aorta", "Angina estável"], advWrong: ["Tromboembolismo pulmonar", "Espasmo esofágico"], explain: "Dor típica há 1 h com supra de ST em DII, DIII e aVF (parede inferior) e imagem em espelho em DI e aVL. Pulsos simétricos e dor que não varia com a posição tornam dissecção e pericardite menos prováveis." },
    conduct: [["AAS mastigado e um segundo antiagregante", 1, "A dupla antiagregação reduz a mortalidade."], ["Reperfusão imediata: angioplastia primária (ou trombólise se não houver hemodinâmica em até 120 min)", 1, "Tempo é músculo: porta-balão ≤ 90 min."], ["ECG com derivações direitas (V3R e V4R) para avaliar o ventrículo direito", 1, "No IAM inferior, o VD pode estar acometido; nesse caso, evite nitratos."], ["Aguardar o resultado da troponina para decidir a reperfusão", 0, "Com supra de ST, o ECG já define a conduta: não espere a troponina."], ["Nitrato sublingual mesmo se houver hipotensão", 0, "Nitrato é contraindicado com hipotensão ou IAM de VD."], ["Analgesia e alta com retorno ambulatorial", 0, "É uma emergência com alto risco de morte."]],
    reasoning: "Dor torácica com características isquêmicas → ECG em até 10 min → supra de ST em parede inferior = IAMCSST → antiagregação dupla, anticoagulação e reperfusão o mais rápido possível, avaliando o ventrículo direito.",
    review: ["cardio", "clinica", "farmaco"]
  },
  {
    id: "pac", area: "pneumo", title: "Febre, tosse e confusão", setting: "Pronto-socorro",
    patient: { name: "Dona Lúcia Martins", age: 74, sex: "F", job: "aposentada", avatar: "👵🏼" },
    complaint: "(a filha) Doutor, minha mãe está com febre e tosse, e desde ontem está confusa.",
    vitals: { PA: "88/52 mmHg", FC: "112 bpm", FR: "32 irpm", T: "38,9 °C", SatO2: "89%" },
    questions: [
      ["Há quanto tempo começou a tosse? Tem catarro?", "Há 3 dias, com catarro amarelado.", 1],
      ["Ela teve febre? Desde quando?", "Febre alta desde anteontem.", 1],
      ["Está com falta de ar?", "Sim, piorou hoje.", 1],
      ["Quando ela ficou confusa?", "Desde ontem à noite, não reconhece direito a gente.", 1],
      ["Ela tem alguma doença crônica?", "Diabetes e pressão alta.", 1],
      ["Usou antibiótico ou foi internada nos últimos 3 meses?", "Não.", 1],
      ["Dói o peito ao respirar?", "Ela reclama de dor do lado direito ao respirar fundo.", 1],
      ["Ela tomou a vacina da gripe este ano?", "Não tomou.", 0],
      ["Teve sangue no catarro ou perdeu peso?", "Não.", 0],
      ["Ela gosta de novela?", "Gosta…", -1]
    ],
    exam: [
      ["Ausculta pulmonar", "Estertores crepitantes e sopro tubário na base direita.", 1],
      ["Percussão do tórax", "Macicez na base direita.", 1],
      ["Estado mental", "Desorientada no tempo e no espaço.", 1],
      ["Perfusão periférica", "Tempo de enchimento capilar de 4 s, extremidades frias.", 1],
      ["Ausculta cardíaca", "Taquicárdica, sem sopros.", 0]
    ],
    tests: [
      ["Raio-X de tórax", "Consolidação no lobo inferior direito com broncograma aéreo.", 1],
      ["Ureia", "62 mg/dL.", 1],
      ["Gasometria arterial com lactato", "pH 7,33; PaO2 58 mmHg; lactato 3,8 mmol/L.", 1],
      ["Hemoculturas (antes do antibiótico)", "Colhidas: 2 amostras.", 1],
      ["Hemograma", "Leucócitos 18.000 com desvio à esquerda.", 0],
      ["Ecocardiograma", "Exame sem indicação neste momento.", -1],
      ["Tomografia de crânio", "A confusão é explicada pela sepse; exame sem prioridade agora.", -1]
    ],
    dx: { correct: "Pneumonia adquirida na comunidade grave, com sepse", wrong: ["Exacerbação de DPOC", "Insuficiência cardíaca descompensada", "Tuberculose pulmonar"], advWrong: ["Tromboembolismo pulmonar", "AVC isquêmico"], explain: "Febre, tosse produtiva, consolidação com broncograma e sinais de disfunção orgânica (confusão, hipotensão, hipoxemia, lactato alto). CURB-65 = 5." },
    conduct: [["Internar, considerando UTI (CURB-65 = 5)", 1, "Escore de 3 ou mais indica pneumonia grave."], ["Antibiótico IV na primeira hora: betalactâmico + macrolídeo", 1, "Ex.: ceftriaxona + azitromicina."], ["Oxigênio e cristaloide 30 mL/kg pela hipotensão", 1, "Faz parte do pacote da primeira hora na sepse."], ["Amoxicilina oral e alta", 0, "Inadequado para pneumonia grave com sepse."], ["Esperar o resultado da cultura para iniciar o antibiótico", 0, "Cada hora de atraso aumenta a mortalidade."], ["Corticoide em dose alta como tratamento principal", 0, "Não é o tratamento principal."]],
    reasoning: "Síndrome infecciosa respiratória + consolidação = pneumonia. Avaliar gravidade (CURB-65 e sinais de sepse) → local de tratamento e antibiótico empírico precoce, junto com o pacote da sepse.",
    review: ["pneumo", "infecto", "clinica"]
  },
  {
    id: "avc", area: "neuro", title: "Fala enrolada no café da manhã", setting: "Sala de emergência",
    patient: { name: "Sr. Carlos Almeida", age: 69, sex: "M", job: "aposentado", avatar: "👴🏾" },
    complaint: "(a filha) Ele estava bem no café e de repente ficou com a boca torta e a fala enrolada.",
    vitals: { PA: "178/96 mmHg", FC: "84 bpm, irregular", FR: "16 irpm", T: "36,5 °C", SatO2: "97%" },
    questions: [
      ["A que horas ele foi visto bem pela última vez?", "Às 8h, no café. Agora são 9h30.", 1],
      ["Quais sintomas a senhora percebeu?", "A boca torta, o braço direito sem força e a fala embolada.", 1],
      ["Ele teve convulsão?", "Não.", 1],
      ["Caiu ou bateu a cabeça?", "Não.", 1],
      ["Ele usa anticoagulante?", "Não, só remédio para pressão.", 1],
      ["Fez cirurgia ou teve sangramento recente?", "Não.", 1],
      ["Teve dor de cabeça forte e súbita?", "Não reclamou de dor de cabeça.", 1],
      ["Tem outras doenças?", "Pressão alta, e o coração às vezes “dispara descompassado”.", 1],
      ["Tem alergias?", "Não.", 0],
      ["Ele dorme bem?", "Ronca muito.", -1]
    ],
    exam: [
      ["Escala NIHSS", "Desvio de rima, paresia braquiofacial à direita e afasia: NIHSS 9.", 1],
      ["Ausculta cardíaca", "Ritmo irregularmente irregular.", 1],
      ["Nível de consciência", "Glasgow 15.", 1],
      ["Rigidez de nuca", "Ausente.", 0],
      ["Fundo de olho", "Sem papiledema.", 0]
    ],
    tests: [
      ["Glicemia capilar", "118 mg/dL (hipoglicemia excluída).", 1],
      ["TC de crânio sem contraste", "Sem sangramento e sem hipodensidade extensa.", 1],
      ["Angiotomografia de crânio e pescoço", "Oclusão do segmento M1 da artéria cerebral média esquerda.", 1],
      ["ECG", "Fibrilação atrial com FC de 84 bpm.", 0],
      ["Coagulograma e plaquetas", "Normais. Sem suspeita, não é preciso esperar para trombolisar.", 0],
      ["Ressonância eletiva", "Atrasaria a decisão.", -1],
      ["Punção lombar", "Sem indicação; atrasa o tratamento.", -1]
    ],
    dx: { correct: "AVC isquêmico agudo no território da artéria cerebral média esquerda", wrong: ["AVC hemorrágico", "Hipoglicemia", "Paralisia de Bell"], advWrong: ["Crise epiléptica com paralisia de Todd", "Tumor cerebral"], explain: "Déficit focal súbito (braquiofacial direito e afasia) há 1h30, com TC sem sangramento e oclusão de grande vaso. A fibrilação atrial sugere origem cardioembólica." },
    conduct: [["Trombólise IV (dentro de 4,5 h e sem contraindicações), mantendo PA < 185/110", 1, "Quanto mais cedo, melhor o resultado."], ["Avaliar trombectomia mecânica pela oclusão de grande vaso", 1, "Indicada na oclusão proximal da circulação anterior."], ["Internar em unidade de AVC com monitorização", 1, "Reduz mortalidade e sequelas."], ["Baixar a PA rapidamente para 120/80", 0, "A queda brusca piora a perfusão da penumbra."], ["Dar AAS junto com o trombolítico", 0, "Antiagregantes ficam suspensos nas primeiras 24 h após a trombólise."], ["Aguardar 24 h para ver se melhora", 0, "Perderia a janela terapêutica."]],
    reasoning: "Déficit neurológico súbito → hora do último momento bem → glicemia → TC sem contraste para excluir hemorragia → trombólise na janela e investigação de oclusão de grande vaso para trombectomia.",
    review: ["neuro", "clinica", "anato"]
  },
  {
    id: "desid", area: "pedi", title: "Diarreia na creche", setting: "Pronto atendimento pediátrico",
    patient: { name: "Miguel", age: 2, sex: "M", job: "vai à creche", avatar: "👶🏻" },
    complaint: "(a mãe) Ele está com diarreia há 2 dias e hoje começou a vomitar.",
    vitals: { FC: "150 bpm", FR: "36 irpm", T: "38,0 °C", Peso: "12 kg", SatO2: "98%" },
    questions: [
      ["Quantas evacuações por dia? Como são?", "Umas 8 por dia, bem líquidas.", 1],
      ["Tem sangue nas fezes?", "Não.", 1],
      ["Está vomitando? Quantas vezes?", "Três vezes hoje.", 1],
      ["Como está o xixi?", "Fez pouco xixi hoje.", 1],
      ["Ele está aceitando líquidos?", "Bebe com muita sede.", 1],
      ["Teve febre?", "Ontem, 38 °C.", 0],
      ["As vacinas estão em dia?", "Está, mas não tomou a do rotavírus.", 0],
      ["Outras crianças da creche estão doentes?", "Sim, alguns coleguinhas com diarreia.", 0],
      ["Com que idade ele começou a andar?", "Com 1 ano.", -1]
    ],
    exam: [
      ["Estado geral", "Irritado, chora sem lágrimas.", 1],
      ["Olhos", "Fundos.", 1],
      ["Sinal da prega cutânea", "A prega desaparece lentamente.", 1],
      ["Pulsos e enchimento capilar", "Pulsos cheios, enchimento capilar de 2 s (sem choque).", 1],
      ["Abdome", "Ruídos aumentados, sem dor à palpação.", 0]
    ],
    tests: [
      ["Glicemia capilar", "92 mg/dL.", 0],
      ["Eletrólitos", "Na 138 e K 3,8 mEq/L.", 0],
      ["Coprocultura", "Sem sangue nas fezes: não é indicada.", -1],
      ["Parasitológico de fezes", "Não ajuda no manejo agudo.", -1],
      ["Raio-X de abdome", "Sem indicação.", -1]
    ],
    dx: { correct: "Diarreia aguda com desidratação (algum grau): plano B da OMS", wrong: ["Diarreia sem desidratação: plano A", "Desidratação grave: plano C", "Disenteria bacteriana"], advWrong: ["Intussuscepção intestinal", "Apendicite aguda"], explain: "Irritado, olhos fundos, bebe com avidez e prega que volta lentamente = algum grau de desidratação. Não há letargia nem incapacidade de beber (plano C)." },
    conduct: [["Terapia de reidratação oral na unidade: 50 a 100 mL/kg em 4 h, reavaliando", 1, "Plano B da OMS."], ["Manter a alimentação e o aleitamento após reidratar", 1, "O jejum piora a nutrição."], ["Zinco por 10 a 14 dias", 1, "Reduz a duração e as recorrências."], ["Antibiótico empírico", 0, "A maioria é viral e não há sangue nas fezes."], ["Antidiarreico (loperamida)", 0, "Contraindicado em crianças pequenas."], ["Hidratação venosa imediata como primeira opção", 0, "Reservada ao plano C ou à falha da via oral."]],
    reasoning: "Diarreia aguda → avaliar o grau de desidratação pelos sinais clínicos da OMS → plano A, B ou C. Exames não são necessários na maioria dos casos.",
    review: ["pedi", "infecto", "fisio"]
  },
  {
    id: "hda", area: "gastro", title: "Vômito com sangue", setting: "Sala de emergência",
    patient: { name: "Sr. Roberto Lima", age: 55, sex: "M", job: "pedreiro", avatar: "🧔🏽" },
    complaint: "Doutor, vomitei muito sangue agora há pouco e estou tonto.",
    vitals: { PA: "86/50 mmHg", FC: "122 bpm", FR: "22 irpm", T: "36,4 °C", SatO2: "96%" },
    questions: [
      ["Quanto sangue o senhor vomitou? Como era?", "Muito, sangue vivo, umas três vezes.", 1],
      ["As fezes estão escuras?", "Pretas, há 2 dias.", 1],
      ["O senhor bebe? Quanto?", "Bebo cachaça todo dia há 30 anos.", 1],
      ["Já disseram que o senhor tem doença no fígado?", "Disseram que tenho cirrose.", 1],
      ["Usa anti-inflamatório ou anticoagulante?", "Não.", 1],
      ["Desmaiou ou quase desmaiou?", "Quase desmaiei no banheiro.", 1],
      ["Tem dor na barriga?", "Um desconforto leve.", 0],
      ["Pratica atividade física?", "No trabalho, sim.", -1]
    ],
    exam: [
      ["Pele e estigmas de hepatopatia", "Icterícia, aranhas vasculares e eritema palmar.", 1],
      ["Abdome", "Ascite moderada e esplenomegalia.", 1],
      ["Nível de consciência", "Sonolento, responde a comandos; asterixis leve.", 1],
      ["Perfusão", "Pálido, extremidades frias.", 1],
      ["Toque retal", "Melena.", 0]
    ],
    tests: [
      ["Hemograma", "Hb 7,2 g/dL; plaquetas 68.000.", 1],
      ["Coagulograma", "INR 1,8.", 1],
      ["Tipagem e reserva de sangue", "O+; 2 concentrados reservados.", 1],
      ["Endoscopia digestiva alta", "Varizes de esôfago de grosso calibre com sangramento ativo.", 1],
      ["Ureia e creatinina", "Ureia 88; creatinina 1,1.", 0],
      ["Colonoscopia", "Sem indicação: o sangramento é alto.", -1],
      ["Tomografia de abdome", "Atrasaria o tratamento.", -1]
    ],
    dx: { correct: "Hemorragia digestiva alta varicosa em paciente cirrótico", wrong: ["Úlcera péptica sangrante", "Síndrome de Mallory-Weiss", "Câncer gástrico"], advWrong: ["Hemoptise por tuberculose", "Gastrite erosiva"], explain: "Etilista com sinais de cirrose e hipertensão portal (ascite, esplenomegalia, plaquetopenia), hematêmese volumosa e instabilidade. A endoscopia confirma varizes com sangramento ativo." },
    conduct: [["Estabilizar: 2 acessos calibrosos, proteger a via aérea e transfusão restritiva (Hb alvo de 7 a 8)", 1, "Transfusão excessiva aumenta a pressão portal."], ["Terlipressina (ou octreotide) e ceftriaxona antes da endoscopia", 1, "A droga vasoativa reduz o sangramento; o antibiótico reduz infecções e mortalidade."], ["Endoscopia em até 12 h com ligadura elástica", 1, "É o tratamento endoscópico de escolha."], ["Transfundir até Hb de 12", 0, "Piora o sangramento varicoso."], ["Propranolol IV na emergência para baixar a FC", 0, "Betabloqueador é para profilaxia, não na fase aguda com choque."], ["Esperar 48 h para fazer a endoscopia", 0, "Deve ser feita em até 12 h."]],
    reasoning: "HDA → estabilizar (ABC, acesso e transfusão restritiva) → suspeita de varizes em cirrótico → droga vasoativa e antibiótico → endoscopia precoce com ligadura.",
    review: ["gastro", "clinica", "hemato"]
  },
  {
    id: "cad", area: "endo", title: "Sede, vômitos e respiração ofegante", setting: "Pronto-socorro",
    patient: { name: "Júlia Rocha", age: 17, sex: "F", job: "estudante", avatar: "👧🏽" },
    complaint: "Estou vomitando desde cedo, com dor na barriga e muito cansada.",
    vitals: { PA: "98/60 mmHg", FC: "120 bpm", FR: "30 irpm, profunda", T: "36,8 °C", SatO2: "98%" },
    questions: [
      ["Tem bebido muita água e urinado muito?", "Sim, faz um mês que bebo água o tempo todo.", 1],
      ["Perdeu peso?", "Perdi uns 6 kg sem tentar.", 1],
      ["Quantas vezes vomitou? Tem dor?", "Quatro vezes, e a barriga dói.", 1],
      ["Você tem diabetes?", "Não que eu saiba.", 1],
      ["Teve alguma infecção recente?", "Tive gripe na semana passada.", 1],
      ["Quando foi sua última menstruação?", "Há 2 semanas.", 0],
      ["Usa alguma droga ou remédio?", "Não.", 0],
      ["Gosta da escola?", "Mais ou menos.", -1]
    ],
    exam: [
      ["Padrão respiratório", "Respiração profunda e rápida (Kussmaul), hálito cetônico.", 1],
      ["Hidratação", "Mucosas secas, enchimento capilar de 3 s.", 1],
      ["Abdome", "Dor difusa leve, sem sinais de peritonite.", 1],
      ["Neurológico", "Sonolenta, Glasgow 14.", 0]
    ],
    tests: [
      ["Glicemia capilar", "486 mg/dL.", 1],
      ["Gasometria venosa", "pH 7,12; bicarbonato 8 mEq/L.", 1],
      ["Cetonemia", "Beta-hidroxibutirato 5,2 mmol/L.", 1],
      ["Potássio sérico", "4,1 mEq/L.", 1],
      ["Ânion gap", "26 (aumentado).", 0],
      ["Tomografia de abdome", "Sem indicação: a dor é explicada pela cetoacidose.", -1],
      ["Amilase", "Pouco útil aqui.", -1]
    ],
    dx: { correct: "Cetoacidose diabética (abertura de DM1)", wrong: ["Estado hiperosmolar hiperglicêmico", "Gastroenterite aguda", "Apendicite aguda"], advWrong: ["Intoxicação por salicilato", "Acidose lática"], explain: "Poliúria, polidipsia e perda de peso, com hiperglicemia, acidose metabólica (pH 7,12; HCO3 8) e cetonemia. A gripe foi o provável desencadeante." },
    conduct: [["Hidratação com SF 0,9% (cerca de 1 L na primeira hora)", 1, "É a primeira medida."], ["Insulina regular IV contínua, após confirmar K ≥ 3,3", 1, "A insulina leva o potássio para dentro das células."], ["Repor potássio e monitorar glicemia, eletrólitos e gasometria", 1, "Glicemia de hora em hora; eletrólitos a cada 2 a 4 h."], ["Bicarbonato de rotina", 0, "Só se pH < 6,9."], ["Insulina IV antes da hidratação, sem checar o potássio", 0, "Risco de hipocalemia grave e arritmia."], ["Insulina NPH subcutânea e alta", 0, "Inadequado para CAD."]],
    reasoning: "Hiperglicemia + acidose metabólica com ânion gap aumentado + cetose = CAD → hidratação, potássio, insulina IV e busca do fator desencadeante.",
    review: ["endo", "fisio", "bioq"]
  },
  {
    id: "dengue", area: "infecto", title: "Febre que passou, dor que piorou", setting: "Unidade de pronto atendimento",
    patient: { name: "Paula Souza", age: 29, sex: "F", job: "professora", avatar: "👩🏻" },
    complaint: "A febre baixou hoje, mas a barriga começou a doer muito e não paro de vomitar.",
    vitals: { PA: "104/70 mmHg (deitada)", FC: "108 bpm", FR: "20 irpm", T: "37,4 °C", SatO2: "98%" },
    questions: [
      ["Como foi a febre?", "Febre alta por 4 dias, baixou hoje.", 1],
      ["Como é a dor na barriga?", "Forte e contínua, desde ontem.", 1],
      ["Quantas vezes vomitou?", "Cinco vezes hoje.", 1],
      ["Teve algum sangramento?", "A gengiva sangrou ao escovar.", 1],
      ["Teve outras dores?", "Atrás dos olhos e no corpo todo.", 1],
      ["Tem casos de dengue perto de você?", "Vários vizinhos tiveram.", 1],
      ["Tomou algum remédio?", "Tomei ibuprofeno para a dor.", 1],
      ["Você pode estar grávida?", "Não.", 0],
      ["Esteve em área de mata?", "Não.", 0],
      ["Pratica esportes?", "Caminho no fim de semana.", -1]
    ],
    exam: [
      ["Palpação do abdome", "Dor à palpação e fígado palpável a 2 cm do rebordo.", 1],
      ["PA deitada e em pé", "104/70 deitada e 88/60 em pé (hipotensão postural).", 1],
      ["Prova do laço", "Positiva.", 0],
      ["Pele", "Petéquias nos membros.", 0],
      ["Pesquisa de derrames", "Sem sinais clínicos.", 0]
    ],
    tests: [
      ["Hemograma", "Hematócrito 47% (basal 38%); plaquetas 42.000.", 1],
      ["NS1 para dengue", "Positivo.", 0],
      ["Ultrassom de abdome", "Pequena quantidade de líquido livre e parede da vesícula espessada.", 0],
      ["Transaminases", "TGO 180 e TGP 150.", 0],
      ["Tomografia de abdome", "Sem indicação.", -1],
      ["Hemocultura", "Não ajuda no manejo da dengue.", -1]
    ],
    dx: { correct: "Dengue com sinais de alarme (grupo C)", wrong: ["Dengue sem sinais de alarme (grupo B)", "Leptospirose", "Apendicite aguda"], advWrong: ["Chikungunya", "Febre amarela"], explain: "Na fase crítica (quando a febre cai), há sinais de alarme: dor abdominal intensa, vômitos persistentes, hepatomegalia, hipotensão postural, sangramento de mucosa e hematócrito subindo com queda das plaquetas." },
    conduct: [["Internar e hidratar por via venosa: 10 mL/kg de cristaloide na primeira hora, reavaliando", 1, "Conduta do grupo C."], ["Suspender o AINE e usar paracetamol ou dipirona", 1, "AINEs e AAS aumentam o risco de sangramento."], ["Repetir o hematócrito e reavaliar a clínica após a expansão", 1, "Guia as próximas etapas da hidratação."], ["Transfusão de plaquetas de rotina", 0, "Não é indicada sem sangramento grave."], ["Alta com hidratação oral apenas", 0, "Com sinais de alarme, a paciente precisa ser internada."], ["Antibiótico empírico", 0, "Dengue é viral."]],
    reasoning: "Doença febril em área endêmica → classificar a dengue pelos sinais de alarme e de choque → grupos A, B, C ou D → hidratação conforme o grupo, com reavaliação frequente.",
    review: ["infecto", "clinica", "hemato"]
  }
];

// ---------- Jogo ----------
let WD = null;
function wardLaunch(caseId, diff) {
  const cs = WARD_CASES.find((c) => c.id === caseId);
  const sim = labSim("ward-" + caseId);
  labBegin(sim, diff, { objective: "Investigue, formule a hipótese e decida a conduta.", help: `<ul class="list"><li>Escolha as perguntas, os exames físicos e os exames complementares. Tudo o que você descobre vai para as anotações.</li><li>Ações essenciais somam pontos; ações desnecessárias ${diff === "ini" ? "não tiram pontos no nível iniciante" : "tiram pontos"}.</li>${diff === "adv" ? "<li>No avançado, você tem um número limitado de ações.</li>" : ""}<li>Quando estiver pronto(a), siga para a hipótese diagnóstica.</li></ul>` });
  WD = { cs, diff, stage: "intro", asked: [], examined: [], tested: [], notes: [], score: 0, budget: diff === "adv" ? 12 : Infinity, vitalsSeen: diff === "ini", tab: "q" };
  $app.innerHTML = labSceneShell({ title: `Plantão · ${cs.title}`, objective: LABCTX.objective, progress: 0, score: 0, timer: "up", noCam: true,
    viewInner: `<div class="ward-scene" id="ward-scene"></div>` });
  LABT.push(setInterval(() => labTickHud(), 1000));
  wardRender();
}
function wardScene() {
  const c = WD.cs, p = c.patient;
  return `<svg viewBox="0 0 400 220" class="ward-svg" aria-hidden="true">
    <rect width="400" height="220" fill="#16213a"/><rect y="150" width="400" height="70" fill="#1d2a48"/>
    <rect x="20" y="30" width="120" height="70" rx="6" fill="#0b1220" stroke="#334155"/><text x="80" y="58" fill="#4ade80" font-size="13" text-anchor="middle" font-family="monospace">${WD.vitalsSeen ? esc(c.vitals.FC || "") : "-- bpm"}</text><text x="80" y="80" fill="#38bdf8" font-size="12" text-anchor="middle" font-family="monospace">${WD.vitalsSeen ? "SpO2 " + esc(c.vitals.SatO2 || "") : "SpO2 --"}</text>
    <rect x="160" y="110" width="200" height="40" rx="8" fill="#94a3b8"/><rect x="165" y="100" width="190" height="20" rx="6" fill="#e0f2fe"/><rect x="330" y="80" width="30" height="40" rx="6" fill="#cbd5e1"/>
    <text x="270" y="105" font-size="58" text-anchor="middle">${p.avatar}</text>
    <text x="20" y="190" fill="#e2e8f0" font-size="14" font-family="Nunito, sans-serif" font-weight="800">${esc(p.name)}, ${p.age} ${p.age === 1 ? "ano" : "anos"}</text>
    <text x="20" y="208" fill="#94a3b8" font-size="11" font-family="Nunito, sans-serif">${esc(c.setting)} · ${esc(p.job)}</text>
  </svg>`;
}
function wardAct(kind, i) {
  if (!WD || WD.stage !== "inv" || (LABCTX && LABCTX.pausedAt)) return;
  const list = kind === "q" ? WD.cs.questions : kind === "e" ? WD.cs.exam : WD.cs.tests;
  const done = kind === "q" ? WD.asked : kind === "e" ? WD.examined : WD.tested;
  if (done.includes(i)) return;
  if (WD.budget <= 0) return labFlash("Você não tem mais ações neste caso. Siga para a hipótese.");
  const [label, ans, w] = list[i];
  done.push(i); WD.budget--;
  const pen = WD.diff === "ini" ? 0 : WD.diff === "int" ? 3 : 6;
  const pts = w === 1 ? (kind === "t" ? 15 : 10) : w === -1 ? -(kind === "t" ? pen * 2 : pen) : 0;
  WD.score = Math.max(0, WD.score + pts); setScore(WD.score);
  WD.notes.unshift({ kind, label, ans, w });
  w === 1 ? sfx.ok() : w === -1 ? sfx.bad() : sfx.flip();
  if (w === -1 && WD.diff !== "ini") labFlash(`Pouco útil neste caso ${pts ? "(" + pts + ")" : ""}`, false);
  wardRender();
}
function wardVitals() { if (WD.vitalsSeen) return; WD.vitalsSeen = true; WD.budget--; WD.score += 10; setScore(WD.score); WD.notes.unshift({ kind: "v", label: "Sinais vitais", ans: Object.entries(WD.cs.vitals).map(([k, v]) => `${k} ${v}`).join(" · "), w: 1 }); sfx.ok(); wardRender(); }
function wardRender() {
  const c = WD.cs, scene = document.getElementById("ward-scene");
  if (scene) scene.innerHTML = wardScene();
  if (WD.stage === "intro") {
    return setSide(`<div class="side-sec prompt-card"><span class="tag">${esc(discName(c.area))} · ${esc(c.setting)}</span><h3>${esc(c.patient.name)}, ${c.patient.age} ${c.patient.age === 1 ? "ano" : "anos"}</h3>
      <p class="speech">“${esc(c.complaint)}”</p>${WD.vitalsSeen ? `<p class="small">${Object.entries(c.vitals).map(([k, v]) => `<b>${k}</b> ${esc(v)}`).join(" · ")}</p>` : ""}
      <p class="muted-txt small">Paciente fictício. Atenda como faria no plantão: colha a história, examine e peça só os exames que mudam a conduta.</p>
      <button class="btn primary block" onclick="WD.stage='inv';wardRender()">Iniciar o atendimento</button></div>`);
  }
  if (WD.stage === "inv") {
    const tabs = [["q", "💬 Anamnese", c.questions, WD.asked], ["e", "🩺 Exame físico", c.exam, WD.examined], ["t", "🧪 Exames", c.tests, WD.tested]];
    const cur = tabs.find((t) => t[0] === WD.tab);
    const keys = c.questions.concat(c.exam, c.tests).filter((x) => x[2] === 1).length;
    const found = WD.notes.filter((n) => n.w === 1 && n.kind !== "v").length;
    setProgress(found / keys);
    return setSide(`
      <div class="side-sec"><div class="seg small">${tabs.map((t) => `<button class="${WD.tab === t[0] ? "on" : ""}" onclick="WD.tab='${t[0]}';wardRender()">${t[1]}</button>`).join("")}</div>
        ${!WD.vitalsSeen ? `<button class="btn accent block" onclick="wardVitals()">📈 Aferir sinais vitais</button>` : ""}
        ${WD.budget !== Infinity ? `<p class="small">Ações restantes: <b>${WD.budget}</b></p>` : ""}
        <div class="act-list">${cur[2].map((x, i) => `<button class="act ${cur[3].includes(i) ? "done" : ""}" onclick="wardAct('${cur[0]}',${i})">${WD.diff === "ini" && x[2] === 1 && !cur[3].includes(i) ? "⭐ " : ""}${esc(x[0])}</button>`).join("")}</div></div>
      <div class="side-sec"><b>Anotações</b>${WD.notes.length ? WD.notes.map((n) => `<p class="note ${n.w === 1 ? "k" : n.w === -1 ? "x" : ""}"><b>${esc(n.label)}</b><br>${esc(n.ans)}</p>`).join("") : `<p class="muted-txt small">O que você descobrir aparece aqui.</p>`}</div>
      <button class="btn primary block" onclick="WD.stage='dx';wardRender()">Formular hipótese diagnóstica ›</button>`);
  }
  if (WD.stage === "dx") {
    const opts = WD.opts || (WD.opts = shuffle([c.dx.correct, ...c.dx.wrong.slice(0, WD.diff === "ini" ? 2 : 3), ...(WD.diff === "adv" ? c.dx.advWrong : [])]));
    return setSide(`<div class="side-sec prompt-card"><h3>Qual é a hipótese diagnóstica principal?</h3><p class="muted-txt small">Baseie-se nas suas anotações.</p></div>
      <div class="options">${opts.map((o, i) => `<button class="opt" onclick="wardDx(${i})"><span>${esc(o)}</span></button>`).join("")}</div>
      <div class="side-sec"><b>Anotações</b>${WD.notes.map((n) => `<p class="note"><b>${esc(n.label)}</b><br>${esc(n.ans)}</p>`).join("") || `<p class="muted-txt small">Você não coletou informações.</p>`}</div>`);
  }
  if (WD.stage === "conduct") {
    const sel = WD.csel || (WD.csel = []);
    const items = WD.citems || (WD.citems = shuffle(c.conduct.map((x, i) => i)));
    const need = c.conduct.filter((x) => x[1]).length;
    return setSide(`<div class="side-sec prompt-card"><h3>Conduta: escolha as medidas adequadas</h3><p class="muted-txt small">${WD.diff === "int" ? `Escolha ${need} medidas.` : "Escolha todas as medidas adequadas: o número não é informado."}</p></div>
      <div class="options">${items.map((i) => `<button class="opt ${sel.includes(i) ? "picked" : ""}" onclick="wardToggle(${i})"><span class="k">${sel.includes(i) ? "✓" : ""}</span><span>${esc(c.conduct[i][0])}</span></button>`).join("")}</div>
      <button class="btn primary block" onclick="wardFinish()">Confirmar conduta</button>`);
  }
}
function wardDx(i) {
  const c = WD.cs, choice = WD.opts[i], ok = choice === c.dx.correct;
  WD.dxOk = ok; WD.dxChoice = choice;
  S.stats.answered++;
  if (ok) { WD.score += 100; S.stats.correct++; bump("correct"); sfx.ok(); labFlash("✅ Hipótese correta! +100", true); }
  else { sfx.bad(); labFlash("❌ A hipótese não é essa", false); }
  setScore(WD.score);
  setSide(`<div class="side-sec info-card ${ok ? "ok" : ""}"><span class="tag">${ok ? "✅ Correto" : "Hipótese esperada"}</span><h3>${esc(c.dx.correct)}</h3><p>${esc(c.dx.explain)}</p>
    <button class="btn primary block" onclick="${WD.diff === "ini" ? "wardFinish()" : "WD.stage='conduct';wardRender()"}">${WD.diff === "ini" ? "Ver o relatório" : "Decidir a conduta ›"}</button></div>`);
}
function wardToggle(i) { const s = WD.csel; const k = s.indexOf(i); if (k >= 0) s.splice(k, 1); else s.push(i); wardRender(); }
function wardFinish() {
  const c = WD.cs, mistakes = [], good = [];
  // Ações essenciais esquecidas
  [["q", c.questions, WD.asked, "Não perguntou"], ["e", c.exam, WD.examined, "Não examinou"], ["t", c.tests, WD.tested, "Não pediu"]].forEach(([k, list, done, verb]) => {
    list.forEach((x, i) => {
      if (x[2] === 1 && !done.includes(i)) mistakes.push({ title: `${verb}: ${x[0]}`, explain: `Resposta esperada: ${x[1]}`, disc: c.area });
      if (x[2] === 1 && done.includes(i)) good.push({ title: x[0], explain: x[1] });
      if (x[2] === -1 && done.includes(i)) mistakes.push({ title: `Desnecessário: ${x[0]}`, explain: x[1], disc: c.area });
    });
  });
  if (!WD.vitalsSeen) mistakes.push({ title: "Não aferiu os sinais vitais", explain: Object.entries(c.vitals).map(([k, v]) => `${k} ${v}`).join(" · "), disc: c.area });
  if (!WD.dxOk) mistakes.push({ title: `Hipótese: você escolheu “${WD.dxChoice}”`, explain: `Esperado: ${c.dx.correct}. ${c.dx.explain}`, disc: c.area, card: { f: `${c.patient.name}: ${c.complaint} Qual é a hipótese?`, b: `${c.dx.correct}. ${c.dx.explain}` }, mc: { q: `Plantão virtual: ${c.complaint} (${Object.values(c.vitals).join(", ")}). Hipótese principal?`, o: [c.dx.correct, ...c.dx.wrong.slice(0, 3)], a: 0, e: c.dx.explain } });
  else good.push({ title: `Hipótese: ${c.dx.correct}`, explain: c.dx.explain });
  let condOk = 0, condTotal = 0;
  if (WD.diff !== "ini") {
    c.conduct.forEach((x, i) => {
      const picked = WD.csel.includes(i);
      if (x[1]) { condTotal++; if (picked) { condOk++; WD.score += 40; good.push({ title: `Conduta: ${x[0]}`, explain: x[2] }); } else mistakes.push({ title: `Faltou na conduta: ${x[0]}`, explain: x[2], disc: c.area, card: { f: `${c.dx.correct}: qual medida não pode faltar?`, b: `${x[0]}. ${x[2]}` } }); }
      else if (picked) { WD.score = Math.max(0, WD.score - 30); mistakes.push({ title: `Conduta inadequada: ${x[0]}`, explain: x[2], disc: c.area, card: { f: `${c.dx.correct}: por que não fazer “${x[0]}”?`, b: x[2] } }); }
    });
  }
  S.lab.stats.cases++; if (WD.dxOk) S.lab.stats.dxOk++;
  bumpWeek("cases");
  const keys = c.questions.concat(c.exam, c.tests).filter((x) => x[2] === 1).length;
  const keysDone = good.filter((g) => !g.title.startsWith("Hipótese") && !g.title.startsWith("Conduta")).length;
  const total = keys + 1 + condTotal, correct = keysDone + (WD.dxOk ? 1 : 0) + condOk;
  const max = c.questions.filter((x) => x[2] === 1).length * 10 + c.exam.filter((x) => x[2] === 1).length * 10 + c.tests.filter((x) => x[2] === 1).length * 15 + 10 + 100 + condTotal * 40;
  labFinish({ score: WD.score, max, correct, total, mistakes, good, recs: c.review,
    notes: [`<b>Raciocínio esperado:</b> ${esc(c.reasoning)}`, `Decisões corretas: <b>${correct}</b> · Decisões incorretas ou esquecidas: <b>${mistakes.length}</b>`] });
  WD = null;
}

function wardRegister(c) {
  labRegister({
    id: "ward-" + c.id, mode: "ward", disc: c.area, icon: c.patient.avatar, title: `Plantão: ${c.title}`, category: "Raciocínio clínico",
    desc: `${c.setting}. ${c.patient.name}, ${c.patient.age} ${c.patient.age === 1 ? "ano" : "anos"}: “${c.complaint}”`,
    objective: "Colher a história, examinar, pedir exames com critério, formular a hipótese e definir a conduta.",
    diffs: { ini: "Dicas nas ações essenciais, 3 hipóteses e sem etapa de conduta.", int: "Sem dicas; ações desnecessárias tiram pontos; conduta com o número de medidas informado.", adv: "Ações limitadas, mais diagnósticos diferenciais e conduta sem saber quantas medidas escolher." },
    time: { ini: 5, int: 8, adv: 10 }, xp: { ini: 50, int: 70, adv: 100 },
    refs: ["Diretrizes brasileiras e Ministério da Saúde da área correspondente", "Harrison: Medicina Interna"],
    review: { status: "pendente" },
    launch: (d) => wardLaunch(c.id, d),
    count: () => c.questions.length + c.exam.length + c.tests.length + c.conduct.length,
    data: () => c,
    validate: () => wardValidate(c)
  });
}
function wardValidate(c) {
  const e = [];
  if (!c.id || !c.title || !c.patient || !c.complaint) e.push("faltam id, título, paciente ou queixa");
  ["questions", "exam", "tests", "conduct"].forEach((k) => { if (!Array.isArray(c[k]) || !c[k].length) e.push("lista vazia: " + k); });
  if (!c.dx || !c.dx.correct || !Array.isArray(c.dx.wrong) || c.dx.wrong.length < 3) e.push("diagnóstico incompleto");
  if (c.conduct && !c.conduct.some((x) => x[1])) e.push("nenhuma conduta correta");
  if (!worldById(c.area)) e.push("área desconhecida: " + c.area);
  return e;
}
WARD_CASES.forEach(wardRegister);
LAB_IMPORTERS.ward = { validate: (it) => { if (it.dx) it.dx.advWrong = it.dx.advWrong || []; it.review = it.review || [it.area]; it.vitals = it.vitals || {}; it.patient = Object.assign({ avatar: "🧑", job: "", age: 30 }, it.patient); it.setting = it.setting || "Pronto-socorro"; return wardValidate(it); }, add: (it) => { if (!WARD_CASES.some((c) => c.id === it.id)) WARD_CASES.push(it); wardRegister(it); } };
