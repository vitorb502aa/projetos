// Conteúdo ampliado (parte 6): Neurologia, Infectologia, Dermatologia, Psiquiatria.
addContent("neuro", {
  flashcards: [
    ["Escala usada para quantificar o déficit no AVC agudo", "NIHSS (National Institutes of Health Stroke Scale)."],
    ["Trombectomia mecânica no AVC isquêmico", "Oclusão de grande vaso na circulação anterior, em geral até 6 h (até 24 h em selecionados)."],
    ["Sinais de hipertensão intracraniana", "Cefaleia, vômitos, papiledema e tríade de Cushing (hipertensão, bradicardia e respiração irregular)."],
    ["Cefaleia com sinais de alarme (SNOOP)", "Sintomas sistêmicos, neurológicos, início súbito, após 50 anos e mudança de padrão."],
    ["Enxaqueca: tratamento da crise", "Analgésicos/AINEs e triptanos; antiemético se náuseas."],
    ["Profilaxia da enxaqueca", "Propranolol, topiramato, amitriptilina ou flunarizina (anticorpos anti-CGRP em refratários)."],
    ["Cefaleia em salvas", "Dor orbitária intensa unilateral com lacrimejamento e rinorreia, em homens. Crise: O₂ a 100% ou sumatriptano."],
    ["Neuralgia do trigêmeo: tratamento", "Carbamazepina."],
    ["Crise focal com comprometimento da consciência", "Antes chamada de crise parcial complexa (lobo temporal)."],
    ["Fármacos de primeira linha na epilepsia focal", "Lamotrigina, levetiracetam, carbamazepina ou oxcarbazepina."],
    ["Síndrome de Wallenberg", "Infarto lateral do bulbo (artéria vertebral/PICA): ataxia, Horner, disfagia e perda de dor/temperatura cruzada."],
    ["Hematoma epidural: curso clássico", "Trauma, perda breve de consciência, intervalo lúcido e piora rápida. TC: lente biconvexa."]
  ],
  quiz: [
    ["Hematoma subdural na TC:", ["Imagem em crescente que cruza suturas", "Lente biconvexa que não cruza suturas", "Sangue nas cisternas", "Ar intracraniano"], 0, "Veias ponte rompidas."],
    ["Hemorragia subaracnóidea com TC normal e forte suspeita:", ["Punção lombar (xantocromia)", "Alta", "RM eletiva em 1 mês","EEG"], 0, "Investigar aneurisma com angiotomografia."],
    ["Doença de Parkinson: tratamento mais eficaz dos sintomas motores:", ["Levodopa (com carbidopa/benserazida)", "Haloperidol","Donepezila","Fenitoína"], 0, "Agonistas dopaminérgicos são alternativa em jovens."],
    ["Fármaco que piora a miastenia e deve ser evitado:", ["Aminoglicosídeos e alguns betabloqueadores", "Piridostigmina","Prednisona com cautela","Imunoglobulina"], 0, "Também magnésio IV e fluoroquinolonas."],
    ["Tratamento da crise miastênica com insuficiência respiratória:", ["Suporte ventilatório + imunoglobulina IV ou plasmaférese", "Só piridostigmina oral","Antibiótico","Nada"], 0, "Monitorar capacidade vital."],
    ["Síndrome de Guillain-Barré: achado no líquor:", ["Dissociação proteinocitológica", "Pleocitose neutrofílica","Glicose muito baixa","Bandas oligoclonais"], 0, "Proteína alta com células normais."],
    ["Tratamento do Guillain-Barré:", ["Imunoglobulina IV ou plasmaférese", "Corticoide em dose alta","Antibiótico","Anticoagulante"], 0, "Corticoide não ajuda."],
    ["Demência com flutuações, alucinações visuais e parkinsonismo:", ["Demência com corpos de Lewy", "Alzheimer","Vascular","Frontotemporal"], 0, "Sensibilidade grave a antipsicóticos."],
    ["Esclerose múltipla: exame de imagem de escolha:", ["Ressonância magnética de crânio e medula", "TC sem contraste","Raio-X","Ultrassom"], 0, "Lesões periventriculares e justacorticais."]
  ],
  tf: [
    ["No AIT, o risco de AVC nos dias seguintes é alto.", true, "Verdadeiro: escore ABCD² ajuda a estratificar."],
    ["A glicemia deve ser checada em todo déficit neurológico agudo.", true, "Verdadeiro: hipoglicemia imita AVC."],
    ["A punção lombar é segura mesmo com sinais de hipertensão intracraniana por massa.", false, "Falso: risco de herniação; fazer TC antes."],
    ["A doença de Alzheimer pode ser tratada com inibidores da colinesterase.", true, "Verdadeiro: donepezila, rivastigmina, galantamina."],
    ["O tremor essencial melhora com álcool e com propranolol.", true, "Verdadeiro."],
    ["Na paralisia facial de Bell, o corticoide precoce melhora a recuperação.", true, "Verdadeiro: iniciar em até 72 h."]
  ],
  pairs: [["Hematoma epidural", "Lente biconvexa"], ["Hematoma subdural", "Imagem em crescente"], ["Neuralgia do trigêmeo", "Carbamazepina"], ["Síndrome de Wallenberg", "Infarto lateral do bulbo"]],
  seq: [{ t: "Estado de mal epiléptico: escalonamento", items: ["ABC, glicemia e acesso venoso", "Benzodiazepínico (até 2 doses)", "Fenitoína, ácido valproico ou levetiracetam IV", "Se persistir: intubação e anestésico (midazolam, propofol)", "Investigar e tratar a causa"], e: "Tempo é cérebro: agir em minutos." }],
  cases: [
    { title: "Cefaleia em trovoada", story: "Mulher de 45 anos com cefaleia súbita, a pior da vida, durante exercício, com vômitos e rigidez de nuca. Glasgow 15.", steps: [
      ["Hipótese principal?", ["Hemorragia subaracnóidea", "Enxaqueca", "Sinusite", "Cefaleia tensional"], 0, "Início em trovoada."],
      ["Primeiro exame?", ["TC de crânio sem contraste", "RM eletiva", "EEG", "Raio-X de crânio"], 0, "Se normal, punção lombar."],
      ["Causa mais comum (não traumática)?", ["Ruptura de aneurisma sacular", "Tumor", "Meningite", "AVC isquêmico"], 0, "Investigar com angiotomografia."]] },
    { title: "Formigamento que sobe", story: "Homem de 30 anos, 2 semanas após diarreia, com fraqueza que começou nos pés e agora atinge as coxas, sem reflexos profundos e com formigamento.", steps: [
      ["Diagnóstico?", ["Síndrome de Guillain-Barré", "Miastenia gravis", "AVC", "Mielite"], 0, "Paralisia flácida ascendente arreflexa."],
      ["Agente infeccioso clássico associado:", ["Campylobacter jejuni", "Salmonella", "Rotavírus", "Giardia"], 0, "Também Zika e outros vírus."],
      ["Monitorização mais importante:", ["Função respiratória (capacidade vital)", "Glicemia apenas", "Diurese", "Temperatura"], 0, "Até 30% precisam de ventilação."]] }
  ]
});

addContent("infecto", {
  flashcards: [
    ["Definição de sepse (Sepsis-3)", "Disfunção orgânica ameaçadora à vida por resposta desregulada à infecção (SOFA ≥ 2)."],
    ["Pacote da primeira hora na sepse", "Lactato, hemoculturas, antibiótico de amplo espectro, 30 mL/kg de cristaloide se hipotensão ou lactato ≥ 4, e vasopressor se necessário."],
    ["Vasopressor de primeira escolha no choque séptico", "Noradrenalina."],
    ["Tratamento da sífilis latente tardia", "Penicilina benzatina 2,4 milhões UI IM, 1 vez por semana por 3 semanas."],
    ["Teste não treponêmico para seguimento da sífilis", "VDRL: deve cair pelo menos 2 diluições."],
    ["Neurossífilis: tratamento", "Penicilina cristalina IV por 10 a 14 dias."],
    ["Esquema antirretroviral inicial preferencial no Brasil", "Tenofovir + lamivudina + dolutegravir."],
    ["Toxoplasmose cerebral no HIV", "CD4 < 100: lesões com realce anelar; tratamento com sulfadiazina + pirimetamina + ácido folínico."],
    ["Criptococose meníngea", "HIV avançado: cefaleia, hipertensão intracraniana; tinta da China e antígeno criptocócico."],
    ["Febre amarela: tratamento", "Suporte (não há antiviral). Prevenção por vacina."],
    ["Chikungunya", "Febre e artralgia intensa, que pode cronificar."],
    ["Hanseníase multibacilar: tempo de tratamento", "12 doses (meses) de poliquimioterapia."]
  ],
  quiz: [
    ["Antibiótico para gonorreia não complicada (diretriz brasileira):", ["Ceftriaxona IM + azitromicina", "Amoxicilina oral","Penicilina benzatina","Metronidazol"], 0, "A azitromicina cobre clamídia."],
    ["Uretrite com corrimento e Gram sem diplococos:", ["Clamídia ou micoplasma: tratar com azitromicina ou doxiciclina", "Gonorreia","Sífilis","Herpes"], 0, "Uretrite não gonocócica."],
    ["Profilaxia do tétano em ferimento sujo, vacinação incompleta:", ["Vacina + imunoglobulina antitetânica", "Só lavar","Só antibiótico","Nada"], 0, "E limpeza adequada."],
    ["Mordedura de cão: antibiótico profilático de escolha:", ["Amoxicilina com clavulanato", "Ciprofloxacino","Metronidazol","Vancomicina"], 0, "Cobre Pasteurella e anaeróbios. Avaliar raiva."],
    ["Profilaxia da raiva após mordida de cão que não pode ser observado, ferimento grave:", ["Soro (ou imunoglobulina) antirrábico + vacina", "Só vacina 1 dose","Nada","Só antibiótico"], 0, "Segundo o protocolo do Ministério da Saúde."],
    ["Dengue com sinais de alarme: conduta:", ["Internação e hidratação venosa", "Alta com AINE","Antibiótico","Corticoide"], 0, "Grupo C."],
    ["Malária grave por P. falciparum: tratamento:", ["Artesunato IV", "Cloroquina oral","Primaquina isolada","Doxiciclina isolada"], 0, "Emergência."],
    ["Leptospirose: sinal clássico ao exame:", ["Dor intensa na panturrilha e sufusão conjuntival", "Rash em alvo","Linfonodo inguinal","Úlcera genital"], 0, "História de enchente."],
    ["Infecção hospitalar por bactéria produtora de carbapenemase (KPC): opção terapêutica:", ["Ceftazidima-avibactam (conforme antibiograma)", "Amoxicilina","Cefalexina","Penicilina"], 0, "Controle de infecção é essencial."]
  ],
  tf: [
    ["A hemocultura deve ser colhida antes do antibiótico, se não atrasar o tratamento.", true, "Verdadeiro."],
    ["O teste rápido para sífilis é treponêmico e fica positivo para sempre.", true, "Verdadeiro na maioria dos casos: não serve para seguimento."],
    ["A reação de Jarisch-Herxheimer contraindica o tratamento da sífilis.", false, "Falso: é transitória; manter o tratamento."],
    ["Pessoas vivendo com HIV com carga viral indetectável não transmitem o vírus por via sexual.", true, "Verdadeiro: indetectável = intransmissível."],
    ["A vacina BCG impede a infecção pelo bacilo da tuberculose.", false, "Falso: protege contra formas graves na infância."],
    ["Na suspeita de meningite bacteriana, não se deve atrasar o antibiótico para fazer TC.", true, "Verdadeiro: colher hemocultura e iniciar."]
  ],
  pairs: [["Choque séptico", "Noradrenalina"], ["Neurossífilis", "Penicilina cristalina"], ["Malária grave", "Artesunato"], ["Mordedura de cão", "Amoxicilina-clavulanato"]],
  seq: [{ t: "Pacote da primeira hora na sepse", items: ["Reconhecer a sepse", "Medir o lactato", "Colher hemoculturas", "Iniciar antibiótico de amplo espectro", "Cristaloide 30 mL/kg se hipotensão ou lactato ≥ 4", "Noradrenalina se PAM < 65 mmHg apesar de volume"], e: "Reavaliar lactato e perfusão." }],
  cases: [
    { title: "Febre e queda da pressão", story: "Mulher de 70 anos com febre, disúria, confusão, PA 80x40 mmHg, FC 120 e lactato de 4,5 mmol/L.", steps: [
      ["Diagnóstico?", ["Choque séptico de foco urinário", "Cistite simples", "AVC", "Desidratação leve"], 0, "Hipotensão e lactato alto."],
      ["Primeiras medidas?", ["Hemoculturas, antibiótico em até 1 h e cristaloide 30 mL/kg", "Aguardar urocultura", "Só antitérmico", "Diurético"], 0, "Pacote da 1ª hora."],
      ["Se persistir PAM < 65 após volume:", ["Noradrenalina", "Mais 5 litros de soro", "Dopamina como 1ª escolha", "Furosemida"], 0, "Vasopressor de escolha."]] },
    { title: "Dor de cabeça no HIV avançado", story: "Homem de 32 anos com HIV sem tratamento, CD4 de 80. Tem febre, cefaleia intensa e vômitos há 2 semanas. Líquor com pressão de abertura alta.", steps: [
      ["Hipótese principal?", ["Meningite criptocócica", "Enxaqueca", "Meningite viral simples", "Sinusite"], 0, "HIV avançado e hipertensão intracraniana."],
      ["Exame no líquor que confirma?", ["Antígeno criptocócico ou tinta da China", "VDRL", "Gram para cocos", "Glicose isolada"], 0, "Também cultura."],
      ["Tratamento de indução?", ["Anfotericina B + flucitosina (ou fluconazol)", "Penicilina", "Aciclovir", "Corticoide isolado"], 0, "Punções de alívio para a pressão intracraniana."]] }
  ]
});

addContent("dermato", {
  flashcards: [
    ["Carcinoma espinocelular (epidermoide) da pele", "Lesão em área exposta ao sol, que pode ulcerar; precursor: ceratose actínica."],
    ["Ceratose seborreica", "Lesão benigna “colada” na pele, verrucosa e acastanhada, em idosos."],
    ["Melasma", "Manchas acastanhadas na face, ligadas a hormônios e sol; tratar com fotoproteção."],
    ["Dermatite de contato alérgica", "Hipersensibilidade tipo IV; diagnóstico com teste de contato (patch test)."],
    ["Urticária crônica: tratamento de primeira linha", "Anti-histamínico H1 de segunda geração (doses até 4 vezes a padrão)."],
    ["Herpes-zóster: tratamento", "Aciclovir, valaciclovir ou famciclovir nas primeiras 72 h."],
    ["Necrólise epidérmica tóxica", "Descolamento > 30% da pele por reação a drogas (alopurinol, anticonvulsivantes, sulfas)."],
    ["Sinal de Nikolsky positivo", "Descolamento da pele à pressão: pênfigo vulgar, NET e síndrome da pele escaldada."],
    ["Pênfigo × penfigoide", "Pênfigo: bolhas flácidas e erosões orais (intraepidérmico). Penfigoide: bolhas tensas em idosos (subepidérmico)."],
    ["Tinea capitis: tratamento", "Antifúngico oral (griseofulvina ou terbinafina)."],
    ["Onicomicose: tratamento oral comum", "Terbinafina."],
    ["Hanseníase: forma com muitas lesões e baciloscopia positiva", "Virchowiana (multibacilar)."]
  ],
  quiz: [
    ["Acne moderada a grave refratária: tratamento oral eficaz:", ["Isotretinoína (com contracepção)", "Corticoide oral contínuo","Antifúngico","Anti-histamínico"], 0, "Teratogênica."],
    ["Rosácea: características:", ["Eritema facial, telangiectasias e pápulas, sem comedões", "Comedões abertos","Bolhas","Placas escamosas em cotovelos"], 0, "Gatilhos: calor, álcool e picantes."],
    ["Escabiose: lesão característica:", ["Túnel (sulco) entre os dedos", "Placa prateada","Vesículas em dermátomo","Mancha café com leite"], 0, "Prurido noturno."],
    ["Psoríase: tratamento sistêmico clássico:", ["Metotrexato", "Antibiótico","Antifúngico","Aciclovir"], 0, "Biológicos em casos moderados a graves."],
    ["Lesão com pequenas pápulas em placa de borda ativa e centro claro, com coceira:", ["Tinea corporis", "Psoríase","Vitiligo","Melanoma"], 0, "Exame micológico direto."],
    ["Erisipela: agente principal:", ["Streptococcus pyogenes", "Pseudomonas","Candida","HPV"], 0, "Placa vermelha bem delimitada e febre."],
    ["Molusco contagioso é causado por:", ["Poxvírus", "HPV","Herpesvírus","Bactéria"], 0, "Pápulas umbilicadas."],
    ["Pele com manchas hipocrômicas e perda de sensibilidade térmica: exame a fazer:", ["Teste de sensibilidade e baciloscopia/biópsia", "Raspado para fungo apenas","Nada","Patch test"], 0, "Suspeita de hanseníase."],
    ["Fotoproteção diária reduz o risco de:", ["Carcinomas de pele e melanoma", "Psoríase","Vitiligo","Acne"], 0, "FPS 30 ou mais, reaplicar."]
  ],
  tf: [
    ["Ceratose actínica pode evoluir para carcinoma espinocelular.", true, "Verdadeiro."],
    ["O vitiligo é contagioso.", false, "Falso: é autoimune, não contagioso."],
    ["Herpes-zóster ocorre pela reativação do vírus da varicela.", true, "Verdadeiro."],
    ["Corticoide tópico potente pode ser usado por meses na face sem risco.", false, "Falso: causa atrofia, telangiectasia e dermatite perioral."],
    ["Na dermatite atópica, hidratar a pele é parte essencial do tratamento.", true, "Verdadeiro."],
    ["O melanoma pode surgir em mucosas e embaixo das unhas.", true, "Verdadeiro (lentiginoso acral)."]
  ],
  pairs: [["Pênfigo vulgar", "Bolhas flácidas"], ["Penfigoide bolhoso", "Bolhas tensas em idosos"], ["Molusco contagioso", "Pápula umbilicada"], ["Erisipela", "Streptococcus pyogenes"]],
  seq: [{ t: "Como descrever uma lesão de pele", items: ["Tipo de lesão elementar (mácula, pápula…)", "Cor", "Tamanho", "Forma e bordas", "Distribuição e localização", "Sintomas associados (prurido, dor)"], e: "Descrever bem já sugere o diagnóstico." }],
  cases: [
    { title: "Bolhas depois do remédio", story: "Homem de 40 anos começou alopurinol há 2 semanas. Agora tem febre, lesões em alvo atípicas, erosões na boca e nos olhos e descolamento de 35% da pele.", steps: [
      ["Diagnóstico?", ["Necrólise epidérmica tóxica", "Urticária", "Varicela", "Psoríase"], 0, "Descolamento > 30%."],
      ["Primeira medida?", ["Suspender o fármaco suspeito", "Aumentar a dose", "Iniciar outro anticonvulsivante", "Corticoide tópico apenas"], 0, "E transferir para unidade de queimados."],
      ["Principal causa de morte?", ["Sepse e distúrbios hidroeletrolíticos", "Hipertensão", "AVC", "Hipoglicemia"], 0, "Cuidados como grande queimado."]] },
    { title: "Placas que coçam nos cotovelos", story: "Homem de 35 anos com placas avermelhadas com escamas prateadas nos cotovelos, joelhos e couro cabeludo, unhas com depressões puntiformes e dor nas articulações dos dedos.", steps: [
      ["Diagnóstico?", ["Psoríase com artrite psoriásica", "Dermatite atópica", "Tinea", "Lúpus"], 0, "Pitting ungueal e artrite."],
      ["Sinal ao raspar as escamas:", ["Sinal de Auspitz", "Nikolsky", "Darier", "Koebner"], 0, "Orvalho sangrento."],
      ["Tratamento sistêmico inicial com artrite:", ["Metotrexato (ou biológico se grave)", "Antibiótico", "Corticoide oral prolongado como base", "Antifúngico"], 0, "Corticoide sistêmico pode piorar ao suspender."]] }
  ]
});

addContent("psiq", {
  flashcards: [
    ["Episódio maníaco: critérios", "Humor elevado ou irritável com energia aumentada por ≥ 1 semana: grandiosidade, menos sono, fala acelerada, impulsividade."],
    ["Hipomania", "Como mania, mas por ≥ 4 dias, sem prejuízo grave e sem psicose."],
    ["Transtorno de ansiedade generalizada", "Preocupação excessiva e difícil de controlar, na maioria dos dias por ≥ 6 meses."],
    ["TOC: tratamento", "ISRS (em doses maiores) e terapia de exposição e prevenção de resposta."],
    ["TEPT", "Após trauma: revivescências, evitação, alterações negativas de humor e hiperexcitação por mais de 1 mês."],
    ["Anorexia nervosa: complicação grave na realimentação", "Síndrome de realimentação: hipofosfatemia, arritmias e insuficiência cardíaca."],
    ["Bulimia nervosa: achados", "Compulsão seguida de purgação; sinal de Russell, erosão dentária e hipocalemia."],
    ["TDAH: tratamento de primeira linha (medicamentoso)", "Metilfenidato ou lisdexanfetamina, com abordagem comportamental."],
    ["Escala de rastreio de depressão na atenção primária", "PHQ-9 (ou PHQ-2 inicial)."],
    ["Discinesia tardia", "Movimentos involuntários orofaciais após uso prolongado de antipsicóticos."],
    ["Acatisia", "Inquietação motora intensa causada por antipsicóticos."],
    ["Intoxicação por lítio: sinais", "Tremor grosseiro, ataxia, vômitos, diarreia, confusão e convulsões."]
  ],
  quiz: [
    ["Mania aguda com agitação: tratamento:", ["Lítio, valproato ou antipsicótico atípico", "ISRS isolado","Benzodiazepínico isolado por meses","Bupropiona"], 0, "Suspender antidepressivos."],
    ["Depressão na gestação moderada a grave:", ["Psicoterapia e ISRS (ex.: sertralina) avaliando riscos e benefícios", "Lítio de primeira linha","Nunca tratar","Valproato"], 0, "Depressão não tratada também traz riscos."],
    ["Antidepressivo com risco de convulsões e contraindicado em bulimia:", ["Bupropiona", "Sertralina","Escitalopram","Mirtazapina"], 0, "Útil para tabagismo."],
    ["Efeitos anticolinérgicos são mais comuns com:", ["Antidepressivos tricíclicos (ex.: amitriptilina)", "ISRS","Bupropiona","Lítio"], 0, "Boca seca, constipação, retenção urinária; perigosos em overdose."],
    ["Intoxicação por tricíclicos: achado no ECG e tratamento:", ["QRS alargado; bicarbonato de sódio IV", "Onda U; potássio","Supra de ST; trombólise","Nada"], 0, "Risco de arritmias e convulsões."],
    ["Esquizofrenia: tempo mínimo de sinais da doença (DSM-5):", ["6 meses", "2 semanas","1 dia","10 anos"], 0, "Com pelo menos 1 mês de sintomas ativos."],
    ["Benzodiazepínico em idosos aumenta o risco de:", ["Quedas e confusão", "Hipertensão","Hipoglicemia","Ganho muscular"], 0, "Evitar quando possível."],
    ["Abstinência alcoólica com convulsões ou delirium: dose de benzodiazepínico:", ["Doses guiadas por sintomas (ex.: diazepam)", "Nenhuma","Haloperidol isolado","Insulina"], 0, "Associar tiamina."],
    ["Primeiro passo diante de um paciente agitado e agressivo:", ["Garantir segurança e tentar a abordagem verbal (desescalada)", "Contenção mecânica imediata sempre","Ignorar","Dar alta"], 0, "Medicação e contenção se necessário."]
  ],
  tf: [
    ["Antidepressivos levam cerca de 2 a 4 semanas para começar a fazer efeito.", true, "Verdadeiro: a resposta completa pode levar mais."],
    ["O lítio reduz o risco de suicídio no transtorno bipolar.", true, "Verdadeiro."],
    ["Na síndrome neuroléptica maligna, o antipsicótico deve ser mantido.", false, "Falso: suspender e dar suporte (dantroleno ou bromocriptina em casos graves)."],
    ["A eletroconvulsoterapia é eficaz na depressão grave refratária.", true, "Verdadeiro, inclusive com risco de suicídio alto."],
    ["Burnout e depressão são exatamente a mesma coisa.", false, "Falso: burnout ligado ao trabalho; avaliar sempre depressão associada."],
    ["O Centro de Atenção Psicossocial (CAPS) é parte da rede de saúde mental do SUS.", true, "Verdadeiro."]
  ],
  pairs: [["Mania", "≥ 1 semana"], ["Hipomania", "≥ 4 dias"], ["Tricíclicos em overdose", "QRS largo"], ["Discinesia tardia", "Antipsicótico prolongado"]],
  seq: [{ t: "Avaliação do risco de suicídio", items: ["Perguntar diretamente sobre ideação", "Avaliar plano e acesso a meios", "Investigar tentativas prévias", "Identificar fatores de risco e de proteção", "Definir o nível de risco", "Plano de segurança e encaminhamento"], e: "Perguntar não aumenta o risco." }],
  cases: [
    { title: "Sem dormir e gastando tudo", story: "Homem de 28 anos há 10 dias dorme 2 horas por noite sem cansaço, fala sem parar, gastou todo o salário e diz ter sido escolhido para salvar o mundo.", steps: [
      ["Diagnóstico?", ["Episódio maníaco (transtorno bipolar tipo I)", "Depressão", "Ansiedade generalizada", "TDAH"], 0, "Duração ≥ 1 semana e sintomas psicóticos."],
      ["Tratamento?", ["Estabilizador de humor e/ou antipsicótico", "ISRS", "Só psicoterapia", "Benzodiazepínico isolado"], 0, "Avaliar internação pela gravidade."],
      ["Exames antes de iniciar lítio:", ["Função renal, tireoide (e teste de gravidez em mulheres)", "Só hemograma", "Nenhum", "Tomografia"], 0, "Seguimento com litemia."]] },
    { title: "Medo de morrer do nada", story: "Mulher de 26 anos com episódios súbitos de palpitação, falta de ar, tremor e medo de morrer, que atingem o pico em minutos. Exames cardiológicos normais. Passou a evitar sair de casa.", steps: [
      ["Diagnóstico?", ["Transtorno de pânico com agorafobia", "IAM", "Hipertireoidismo confirmado", "Esquizofrenia"], 0, "Ataques recorrentes e evitação."],
      ["Tratamento de longo prazo?", ["ISRS + terapia cognitivo-comportamental", "Benzodiazepínico isolado por anos", "Antipsicótico", "Betabloqueador isolado"], 0, "Benzodiazepínico só como ponte."],
      ["Antes de fechar o diagnóstico, excluir:", ["Causas clínicas (tireoide, arritmias, drogas)", "Nada", "Somente gravidez", "Somente anemia"], 0, "Investigação dirigida."]] }
  ]
});
