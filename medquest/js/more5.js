// Conteúdo ampliado (parte 5): Nefrologia, Endocrinologia, Hematologia, Reumatologia.
addContent("nefro", {
  flashcards: [
    ["Hiponatremia: primeiro passo da investigação", "Medir a osmolalidade plasmática (verdadeira hipotônica × pseudo-hiponatremia ou hiperglicemia)."],
    ["SIADH: achados", "Hiponatremia hipotônica, urina inapropriadamente concentrada, sódio urinário alto e paciente euvolêmico."],
    ["Velocidade máxima de correção da hiponatremia crônica", "Em geral 8 a 10 mEq/L em 24 h (menos em alto risco)."],
    ["Causas de acidose metabólica com ânion gap normal", "Diarreia e acidose tubular renal (hiperclorêmica)."],
    ["Fórmula do ânion gap", "Na⁺ − (Cl⁻ + HCO₃⁻). Normal: cerca de 8 a 12."],
    ["Doença renal policística do adulto", "Autossômica dominante (PKD1/PKD2): cistos renais bilaterais, hipertensão, aneurismas cerebrais."],
    ["Nefropatia por IgA (doença de Berger)", "Hematúria 1 a 3 dias após infecção respiratória; glomerulopatia primária mais comum no mundo."],
    ["Glomerulopatia nefrótica mais comum em adultos negros e em HIV", "Glomeruloesclerose segmentar e focal."],
    ["Glomerulopatia membranosa", "Nefrótica em adultos; anticorpo anti-PLA2R; associada a neoplasias, hepatite B e lúpus."],
    ["Síndrome de Goodpasture", "Anticorpo anti-membrana basal glomerular: hemorragia pulmonar e glomerulonefrite rapidamente progressiva."],
    ["Agentes nefrotóxicos comuns", "AINEs, aminoglicosídeos, contraste iodado, anfotericina B, vancomicina e IECA em hipovolemia."],
    ["Complicações da DRC avançada", "Anemia, hipercalemia, acidose, hiperfosfatemia, hiperparatireoidismo secundário e hipervolemia."]
  ],
  quiz: [
    ["Hipernatremia em idoso acamado indica principalmente:", ["Déficit de água livre", "Excesso de sódio na dieta", "SIADH", "Insuficiência adrenal"], 0, "Falta de acesso à água e sede reduzida."],
    ["Acidose metabólica: compensação respiratória esperada (fórmula de Winter):", ["PaCO₂ = 1,5 × HCO₃⁻ + 8 (±2)", "PaCO₂ = HCO₃⁻ + 15", "PaCO₂ = 40 sempre", "PaCO₂ = 2 × HCO₃⁻"], 0, "Se a PaCO₂ estiver acima, há acidose respiratória associada."],
    ["Lesão renal aguda pós-renal mais comum em homem idoso:", ["Hiperplasia prostática", "Glomerulonefrite", "Necrose tubular aguda", "Nefrite intersticial"], 0, "Ultrassom mostra hidronefrose."],
    ["Nefrite intersticial aguda por fármacos: achados:", ["Febre, rash, eosinofilia e leucocitúria estéril", "Cilindros hemáticos", "Proteinúria nefrótica", "Hematúria macroscópica isolada"], 0, "Causas: betalactâmicos, AINEs, IBP."],
    ["Prevenção da nefropatia por contraste:", ["Hidratação adequada e menor volume de contraste", "Furosemida em dose alta", "AINE antes do exame", "Restringir líquidos"], 0, "Suspender nefrotóxicos quando possível."],
    ["Rabdomiólise: achado que sugere o diagnóstico:", ["CPK muito elevada e urina escura com fita positiva para sangue sem hemácias", "Glicosúria", "Cilindros leucocitários", "Proteinúria nefrótica"], 0, "Mioglobinúria."],
    ["Tratamento da rabdomiólise:", ["Hidratação vigorosa com cristaloide", "Restringir líquidos", "Diurético de alça isolado", "Corticoide"], 0, "Corrigir hipercalemia e acompanhar a função renal."],
    ["Hipercalemia: medida que reduz o potássio total do corpo:", ["Resina de troca, diuréticos de alça ou diálise", "Insulina com glicose", "Salbutamol", "Gluconato de cálcio"], 0, "Insulina e salbutamol só deslocam o potássio para dentro da célula."],
    ["Doença renal crônica: TFG estimada pela fórmula:", ["CKD-EPI", "Child-Pugh", "Glasgow", "Friedewald"], 0, "Usa creatinina (e cistatina C)."]
  ],
  tf: [
    ["Na desidratação, o hematócrito e a ureia tendem a subir.", true, "Verdadeiro: hemoconcentração e azotemia pré-renal."],
    ["A relação ureia/creatinina alta sugere causa pré-renal.", true, "Verdadeiro."],
    ["O ultrassom é útil para descartar obstrução na lesão renal aguda.", true, "Verdadeiro."],
    ["Na DRC, o fósforo costuma estar baixo.", false, "Falso: costuma estar alto."],
    ["Na SIADH, a restrição hídrica é parte do tratamento.", true, "Verdadeiro."],
    ["Os iSGLT2 aumentam a progressão da DRC.", false, "Falso: reduzem a progressão, mesmo em não diabéticos."]
  ],
  pairs: [["SIADH", "Hiponatremia euvolêmica"], ["Goodpasture", "Anti-membrana basal"], ["Nefropatia por IgA", "Hematúria pós-infecção"], ["Rabdomiólise", "CPK muito alta"]],
  seq: [{ t: "Interpretação de uma gasometria", items: ["Olhar o pH (acidemia ou alcalemia)", "Identificar o distúrbio primário (PaCO₂ ou HCO₃⁻)", "Checar a compensação esperada", "Calcular o ânion gap se acidose metabólica", "Procurar distúrbios mistos", "Buscar a causa clínica"], e: "Sempre interpretar junto com o quadro clínico." }],
  cases: [
    { title: "Confusão e sódio baixo", story: "Homem de 68 anos, tabagista, com confusão. Na⁺ 118 mEq/L, osmolalidade plasmática baixa, urina concentrada e sódio urinário alto. Está euvolêmico. Raio-X com massa pulmonar central.", steps: [
      ["Diagnóstico do distúrbio?", ["SIADH", "Desidratação", "Polidipsia primária", "Insuficiência cardíaca"], 0, "Hiponatremia euvolêmica com urina concentrada."],
      ["Tumor associado mais provável?", ["Carcinoma de pequenas células de pulmão", "Adenocarcinoma de próstata", "Melanoma", "Lipoma"], 0, "Síndrome paraneoplásica."],
      ["Se houver convulsão, conduta?", ["Solução salina hipertônica a 3% em bolus", "Restrição hídrica apenas", "Soro glicosado", "Furosemida isolada"], 0, "Elevar 4 a 6 mEq/L rapidamente e depois respeitar o limite diário."]] },
    { title: "Rim que parou após contraste", story: "Mulher de 70 anos diabética, com creatinina basal de 1,6 mg/dL, fez tomografia com contraste. Dois dias depois a creatinina subiu para 2,8 mg/dL.", steps: [
      ["Classificação pelo KDIGO?", ["Lesão renal aguda", "Normal", "DRC estágio 5", "Síndrome nefrótica"], 0, "Aumento ≥ 1,5 vez em 7 dias."],
      ["Fatores de risco presentes:", ["Diabetes, DRC prévia e idade", "Sexo feminino apenas", "Uso de vitamina C", "Nenhum"], 0, "Principais fatores para nefropatia por contraste."],
      ["Conduta:", ["Hidratar, suspender nefrotóxicos e monitorar função e eletrólitos", "Novo contraste para comparar", "AINE para dor", "Diálise imediata em todos"], 0, "Diálise só se indicação clássica."]] }
  ]
});

addContent("endo", {
  flashcards: [
    ["Metas gerais de controle no DM2", "HbA1c < 7% para a maioria (individualizar), PA < 130/80 e LDL conforme risco."],
    ["Critérios do estado hiperosmolar hiperglicêmico", "Glicemia > 600 mg/dL, osmolalidade > 320 mOsm/kg, sem cetoacidose significativa."],
    ["Tríade de Whipple", "Sintomas de hipoglicemia, glicemia baixa documentada e melhora com glicose."],
    ["Causa de hipoglicemia com insulina alta e peptídeo C alto", "Insulinoma ou sulfonilureia."],
    ["Hipoglicemia com insulina alta e peptídeo C baixo", "Insulina exógena."],
    ["Tempestade tireoidiana: tratamento", "Betabloqueador, tionamida (propiltiouracil ou metimazol), iodo (após a tionamida) e corticoide."],
    ["Coma mixedematoso", "Hipotireoidismo grave descompensado: hipotermia, bradicardia, rebaixamento. Levotiroxina IV e hidrocortisona."],
    ["Nódulo tireoidiano: primeiro exame", "TSH e ultrassonografia. Punção (PAAF) conforme tamanho e características."],
    ["Câncer de tireoide mais comum", "Carcinoma papilífero (corpos psamomatosos, núcleos em “olho da Órfã Annie”)."],
    ["Carcinoma medular da tireoide", "Das células C (calcitonina); associado a NEM 2 (gene RET)."],
    ["Insuficiência adrenal aguda: tratamento", "Hidrocortisona IV e soro fisiológico, sem esperar exames."],
    ["Teste de rastreio para síndrome de Cushing", "Cortisol salivar noturno, cortisol livre urinário de 24 h ou supressão com 1 mg de dexametasona."]
  ],
  quiz: [
    ["Hipotireoidismo subclínico:", ["TSH alto com T4 livre normal", "TSH baixo com T4 alto", "TSH e T4 baixos", "TSH normal com T4 baixo"], 0, "Tratar conforme TSH, sintomas e contexto."],
    ["Tireoidite subaguda (de De Quervain):", ["Dor na tireoide após infecção viral, VHS alta e captação baixa", "Indolor no pós-parto", "Bócio difuso com exoftalmia", "Nódulo quente"], 0, "Tratamento sintomático: AINE e betabloqueador."],
    ["Medicação de escolha no hipertireoidismo no 1º trimestre da gestação:", ["Propiltiouracil", "Metimazol", "Iodo radioativo", "Amiodarona"], 0, "Depois do 1º trimestre, trocar para metimazol."],
    ["Hiperplasia adrenal congênita mais comum:", ["Deficiência de 21-hidroxilase", "Deficiência de 11-beta-hidroxilase", "Deficiência de 17-alfa-hidroxilase", "Deficiência de aromatase"], 0, "Virilização e crise perdedora de sal; 17-OH-progesterona alta."],
    ["Hipercalcemia com PTH baixo sugere:", ["Neoplasia (PTHrP ou metástases ósseas)", "Hiperparatireoidismo primário", "Hipoparatireoidismo", "Deficiência de vitamina D"], 0, "No primário o PTH está alto ou inapropriadamente normal."],
    ["Tratamento inicial da hipercalcemia grave:", ["Hidratação vigorosa com SF, depois bisfosfonato", "Diurético tiazídico", "Cálcio IV", "Vitamina D"], 0, "Calcitonina para efeito rápido e temporário."],
    ["Diabetes insípido central × nefrogênico: diferencia-se com:", ["Teste de restrição hídrica e resposta à desmopressina", "Glicemia", "TSH", "Cortisol"], 0, "No central, a urina concentra após desmopressina."],
    ["Fármaco antidiabético que causa perda de peso e protege o coração:", ["Agonista do GLP-1 (ex.: semaglutida)", "Glibenclamida", "Pioglitazona", "Insulina NPH"], 0, "Também reduz eventos cardiovasculares."],
    ["Sulfonilureias (glibenclamida, gliclazida) têm como principal risco:", ["Hipoglicemia", "Acidose lática", "Infecção genital", "Pancreatite"], 0, "Maior em idosos e na DRC."]
  ],
  tf: [
    ["A cetoacidose diabética pode ocorrer no DM2.", true, "Verdadeiro, em situações de estresse grave."],
    ["A levotiroxina deve ser tomada junto com cálcio e ferro para melhor absorção.", false, "Falso: esses sais reduzem sua absorção."],
    ["O feocromocitoma é rastreado com metanefrinas plasmáticas ou urinárias.", true, "Verdadeiro."],
    ["Na doença de Addison, a aldosterona costuma estar baixa.", true, "Verdadeiro: por isso há hipercalemia e hiponatremia."],
    ["O teste de tolerância oral à glicose usa 75 g de glicose.", true, "Verdadeiro, em adultos não gestantes e gestantes."],
    ["A osteoporose é diagnosticada pela densitometria com T-score ≤ −2,5.", true, "Verdadeiro (ou por fratura por fragilidade)."]
  ],
  pairs: [["Carcinoma papilífero", "Corpos psamomatosos"], ["Carcinoma medular", "Calcitonina"], ["21-hidroxilase", "Hiperplasia adrenal congênita"], ["Insulina exógena", "Peptídeo C baixo"]],
  seq: [{ t: "Tratamento da cetoacidose diabética", items: ["Expansão volêmica com SF 0,9%", "Checar potássio", "Insulina regular IV contínua (se K⁺ ≥ 3,3)", "Repor potássio conforme níveis", "Adicionar glicose quando glicemia ≈ 250 mg/dL", "Transição para insulina subcutânea após resolução"], e: "Bicarbonato só em acidose muito grave (pH < 6,9)." }],
  cases: [
    { title: "Palpitações e perda de peso", story: "Mulher de 30 anos com palpitações, tremor, intolerância ao calor, perda de 5 kg, bócio difuso e olhos saltados. TSH suprimido e T4 livre alto.", steps: [
      ["Diagnóstico?", ["Doença de Graves", "Tireoidite de Hashimoto", "Nódulo tóxico", "Tireoidite subaguda"], 0, "Bócio difuso e oftalmopatia."],
      ["Anticorpo característico:", ["TRAb (anti-receptor de TSH)", "Anti-TPO apenas", "Antitireoglobulina", "ANCA"], 0, "Estimula o receptor de TSH."],
      ["Tratamento inicial para sintomas e controle:", ["Betabloqueador + metimazol", "Levotiroxina", "Iodo radioativo imediato na gestante", "Corticoide isolado"], 0, "Iodo radioativo ou cirurgia são opções definitivas fora da gestação."]] },
    { title: "Hipotensão no pós-operatório", story: "Paciente que usou prednisona por 2 anos e parou há 1 semana evolui, após cirurgia, com hipotensão refratária a volume, hiponatremia e hipoglicemia.", steps: [
      ["Hipótese?", ["Insuficiência adrenal aguda (supressão do eixo)", "Choque séptico apenas", "Hipotireoidismo", "SIADH"], 0, "Suspensão do corticoide crônico e estresse cirúrgico."],
      ["Tratamento imediato:", ["Hidrocortisona IV e soro fisiológico", "Noradrenalina isolada", "Levotiroxina", "Restrição hídrica"], 0, "Não esperar resultados."],
      ["Como prevenir?", ["Reduzir o corticoide gradualmente e dar dose de estresse em cirurgias", "Parar de uma vez", "Dar só mineralocorticoide", "Nada"], 0, "Após uso prolongado, o eixo fica suprimido."]] }
  ]
});

addContent("hemato", {
  flashcards: [
    ["Índice de reticulócitos alto na anemia indica", "Medula respondendo: hemólise ou sangramento agudo."],
    ["Anemia aplástica", "Pancitopenia com medula hipocelular. Causas: drogas, vírus, radiação, idiopática."],
    ["Esferocitose hereditária", "Esferócitos, anemia hemolítica, esplenomegalia e teste de fragilidade osmótica aumentada (ou EMA)."],
    ["Talassemia minor (traço)", "Microcitose acentuada com anemia leve ou ausente, ferritina normal e Hb A2 aumentada (beta)."],
    ["Coagulação intravascular disseminada (CIVD)", "Consumo de fatores e plaquetas: TP e TTPa alargados, fibrinogênio baixo, D-dímero alto."],
    ["Doença de von Willebrand", "Distúrbio hemorrágico hereditário mais comum: sangramento mucoso e menorragia."],
    ["Trombofilia hereditária mais comum", "Fator V de Leiden."],
    ["Leucemia linfoide crônica", "Idosos, linfocitose madura, células em esfregaço (manchas de Gumprecht)."],
    ["Leucemia promielocítica aguda (LMA M3)", "t(15;17), CIVD; tratada com ácido transretinoico (ATRA)."],
    ["Policitemia vera", "Mutação JAK2: hematócrito alto, prurido após banho, esplenomegalia."],
    ["Critérios de transfusão de hemácias em geral (estáveis)", "Hb < 7 g/dL (< 8 em cardiopatas ou cirurgias cardíacas)."],
    ["Reação transfusional mais grave e imediata", "Hemolítica aguda por incompatibilidade ABO."]
  ],
  quiz: [
    ["Linfoma de Burkitt está associado a:", ["Translocação t(8;14) e c-MYC", "t(9;22)", "t(15;17)", "JAK2"], 0, "Padrão em céu estrelado; associado ao EBV."],
    ["Profilaxia de infecções na anemia falciforme em crianças:", ["Penicilina profilática e vacinas", "Ferro contínuo", "Corticoide", "Nada"], 0, "Pela asplenia funcional."],
    ["Medicação que reduz crises na anemia falciforme:", ["Hidroxiureia", "Ferro", "Varfarina", "Vitamina K"], 0, "Aumenta a hemoglobina fetal."],
    ["Tratamento da trombocitopenia imune com sangramento grave:", ["Corticoide e imunoglobulina IV (e transfusão de plaquetas se ameaça à vida)", "Só observação", "Heparina", "Ferro"], 0, "Em casos leves sem sangramento, pode-se observar."],
    ["Anemia megaloblástica por folato: causa comum:", ["Alcoolismo e dieta pobre", "Gastrite atrófica autoimune", "Ressecção ileal", "Metformina"], 0, "Gastrite autoimune causa deficiência de B12 (anemia perniciosa)."],
    ["Mieloma múltiplo: exame para detectar proteína monoclonal:", ["Eletroforese e imunofixação de proteínas séricas e urinárias", "Hemograma apenas", "Ferritina", "TSH"], 0, "Também cadeias leves livres."],
    ["Reação transfusional com febre sem hemólise, mais comum:", ["Reação febril não hemolítica", "TRALI", "Anafilaxia", "Hemólise ABO"], 0, "Reduzida com leucorredução."],
    ["Anticoagulação na trombocitopenia induzida por heparina:", ["Suspender toda heparina e usar anticoagulante não heparínico", "Trocar por enoxaparina", "Dar plaquetas", "Parar qualquer anticoagulação"], 0, "Ex.: argatrobana ou fondaparinux."],
    ["Linfoma não Hodgkin mais comum em adultos:", ["Difuso de grandes células B", "Folicular", "Burkitt", "Do manto"], 0, "Agressivo, mas potencialmente curável."]
  ],
  tf: [
    ["A ferritina pode estar normal ou alta na deficiência de ferro com inflamação.", true, "Verdadeiro: é proteína de fase aguda."],
    ["Hemácias em alvo podem aparecer na talassemia.", true, "Verdadeiro, e na hepatopatia."],
    ["Leucemia mieloide crônica é tratada com inibidores de tirosina-quinase.", true, "Verdadeiro: ex.: imatinibe."],
    ["Todo paciente com D-dímero positivo tem trombose.", false, "Falso: sobe em várias situações."],
    ["Na CIVD, o fibrinogênio costuma estar alto.", false, "Falso: costuma estar baixo por consumo."],
    ["Pacientes esplenectomizados devem ser vacinados contra pneumococo, meningococo e Haemophilus.", true, "Verdadeiro."]
  ],
  pairs: [["Fator V de Leiden", "Trombofilia"], ["JAK2", "Policitemia vera"], ["t(15;17)", "Leucemia promielocítica"], ["t(8;14)", "Linfoma de Burkitt"]],
  seq: [{ t: "Cascata de coagulação (via comum)", items: ["Ativação do fator X", "Fator Xa + fator Va (protrombinase)", "Protrombina vira trombina", "Trombina converte fibrinogênio em fibrina", "Fator XIII estabiliza a fibrina"], e: "Heparina e DOACs agem no Xa e na trombina." }],
  cases: [
    { title: "Sangramento e febre na leucemia", story: "Homem de 35 anos com febre, petéquias, sangramento gengival e cansaço. Hemograma: anemia, plaquetas 20.000 e muitos blastos com bastonetes de Auer. TP alargado e fibrinogênio baixo.", steps: [
      ["Diagnóstico?", ["Leucemia promielocítica aguda com CIVD", "Púrpura trombocitopênica imune", "Anemia aplástica", "LLC"], 0, "Bastonetes de Auer e coagulopatia."],
      ["Alteração genética:", ["t(15;17) PML-RARA", "t(9;22)", "JAK2", "t(8;14)"], 0, "Confirma o subtipo."],
      ["Tratamento a iniciar já na suspeita:", ["Ácido transretinoico (ATRA)", "Imatinibe", "Hidroxiureia", "Esplenectomia"], 0, "Reduz a mortalidade precoce por sangramento."]] },
    { title: "Icterícia e anemia de repetição", story: "Adolescente de 14 anos com anemia, icterícia leve, esplenomegalia e cálculos na vesícula. O pai teve o baço retirado. Esfregaço com esferócitos e Coombs negativo.", steps: [
      ["Diagnóstico?", ["Esferocitose hereditária", "Anemia hemolítica autoimune", "Talassemia major", "Deficiência de G6PD"], 0, "Coombs negativo e história familiar."],
      ["Por que há cálculos biliares?", ["Bilirrubina indireta alta por hemólise crônica (cálculos pigmentares)", "Excesso de colesterol", "Infecção", "Gravidez"], 0, "Cálculos pretos."],
      ["Tratamento em casos graves:", ["Esplenectomia (após vacinas) e ácido fólico", "Corticoide", "Imunoglobulina", "Ferro"], 0, "Reduz a hemólise."]] }
  ]
});

addContent("reumato", {
  flashcards: [
    ["Exames que indicam atividade do lúpus", "Complemento baixo (C3 e C4) e anti-DNA em alta."],
    ["Síndrome antifosfolípide", "Trombose e/ou perdas gestacionais com anticoagulante lúpico, anticardiolipina ou anti-beta-2-glicoproteína."],
    ["Síndrome de Sjögren", "Olho seco e boca seca; anti-Ro e anti-La."],
    ["Anticorpo de miosites (síndrome antissintetase)", "Anti-Jo-1."],
    ["Dermatomiosite: lesões de pele", "Heliotropo nas pálpebras e pápulas de Gottron nas articulações dos dedos."],
    ["Polimialgia reumática", "Idosos com dor e rigidez de cinturas escapular e pélvica, VHS alta; resposta dramática a corticoide em dose baixa."],
    ["Vasculite com ANCA-c (anti-PR3)", "Granulomatose com poliangeíte (Wegener): sinusite, pulmão e rim."],
    ["Vasculite associada à asma e eosinofilia", "Granulomatose eosinofílica com poliangeíte (Churg-Strauss)."],
    ["Doença de Kawasaki é uma vasculite de", "Médios vasos (coronárias) em crianças."],
    ["Artrite séptica: agente mais comum em adultos", "Staphylococcus aureus (em jovens sexualmente ativos, pensar em gonococo)."],
    ["Fibromialgia", "Dor difusa crônica com fadiga, sono não reparador e alterações cognitivas, sem inflamação."],
    ["Febre reumática: critérios maiores de Jones", "Cardite, poliartrite migratória, coreia de Sydenham, eritema marginado e nódulos subcutâneos."]
  ],
  quiz: [
    ["Monoartrite aguda com febre: exame mais importante:", ["Punção articular com análise do líquido", "Raio-X", "Ácido úrico sérico", "FAN"], 0, "Excluir artrite séptica."],
    ["Lúpus com proteinúria e cilindros hemáticos:", ["Nefrite lúpica: biópsia renal", "Infecção urinária", "Normal no lúpus","Efeito da hidroxicloroquina"], 0, "A classe histológica orienta o tratamento."],
    ["Gestante com síndrome antifosfolípide e perdas gestacionais prévias: tratamento:", ["AAS em dose baixa + heparina de baixo peso molecular", "Varfarina", "Nada","Só corticoide"], 0, "A varfarina é teratogênica."],
    ["Doença de Behçet:", ["Úlceras orais e genitais recorrentes e uveíte", "Artrite simétrica de mãos","Rash em asa de borboleta","Esclerodactilia"], 0, "Vasculite de vasos variáveis."],
    ["Esclerose sistêmica: complicação renal grave:", ["Crise renal esclerodérmica (hipertensão maligna): tratar com IECA", "Litíase","Glomerulonefrite pós-estreptocócica","Nefrite intersticial"], 0, "Corticoide em dose alta é fator de risco."],
    ["Corticoide crônico: efeito adverso ósseo:", ["Osteoporose", "Osteopetrose","Hipercalcemia","Paget"], 0, "Associar cálcio, vitamina D e às vezes bisfosfonato."],
    ["Fenômeno de Raynaud: fases de cor:", ["Palidez, cianose e rubor", "Rubor, palidez e cianose","Só cianose","Icterícia"], 0, "Pode ser primário ou secundário (esclerodermia, lúpus)."],
    ["Lombalgia inflamatória em homem jovem com uveíte anterior:", ["Espondilite anquilosante", "Hérnia de disco","Osteoartrite","Fibromialgia"], 0, "Sacroileíte na imagem."],
    ["Biológico usado em artrite reumatoide refratária ao metotrexato:", ["Anti-TNF (ex.: adalimumabe)", "Alopurinol","Colchicina","Insulina"], 0, "Rastrear TB latente e hepatites antes."]
  ],
  tf: [
    ["O FAN positivo isolado em baixo título é comum em pessoas saudáveis.", true, "Verdadeiro: não fecha diagnóstico sozinho."],
    ["A hidroxicloroquina exige acompanhamento oftalmológico.", true, "Verdadeiro: risco de retinopatia."],
    ["O metotrexato pode ser usado com segurança na gestação.", false, "Falso: é teratogênico e abortivo."],
    ["A artrite séptica é uma urgência.", true, "Verdadeiro: pode destruir a articulação em dias."],
    ["A febre reumática ocorre após infecção de pele por estreptococo.", false, "Falso: ocorre após faringite. A infecção de pele pode causar glomerulonefrite."],
    ["Na polimialgia reumática, deve-se investigar arterite de células gigantes.", true, "Verdadeiro: cefaleia, claudicação de mandíbula e alteração visual."]
  ],
  pairs: [["Sjögren", "Anti-Ro e anti-La"], ["Dermatomiosite", "Heliotropo"], ["Granulomatose com poliangeíte", "ANCA anti-PR3"], ["Síndrome antifosfolípide", "Trombose e perdas gestacionais"]],
  seq: [{ t: "Avaliação de uma monoartrite aguda", items: ["História e exame (trauma, febre, crises prévias)", "Punção articular", "Celularidade, Gram e cultura do líquido", "Pesquisa de cristais", "Tratar conforme a causa (antibiótico se séptica)"], e: "Na dúvida, tratar como séptica até a cultura." }],
  cases: [
    { title: "Rash no rosto e dor nas juntas", story: "Mulher de 24 anos com eritema em asa de borboleta que piora ao sol, artralgias, úlceras orais e edema. Exames: FAN positivo, anti-DNA alto, C3 baixo e proteinúria de 2 g/24 h.", steps: [
      ["Diagnóstico?", ["Lúpus eritematoso sistêmico com nefrite", "Artrite reumatoide", "Rosácea", "Dermatomiosite"], 0, "Critérios clínicos e imunológicos."],
      ["Próximo exame para guiar o tratamento renal:", ["Biópsia renal", "Ultrassom apenas", "Raio-X de mãos", "Eletroneuromiografia"], 0, "Define a classe da nefrite."],
      ["Medicamento indicado para quase todos os pacientes com lúpus:", ["Hidroxicloroquina", "Alopurinol", "Colchicina", "Nenhum"], 0, "Reduz atividade e mortalidade."]] },
    { title: "Joelho quente e febril", story: "Homem de 60 anos com joelho direito muito inchado, quente e doloroso há 1 dia, com febre de 38,5 °C. Líquido articular turvo com 80.000 leucócitos/mm³ e predomínio de neutrófilos.", steps: [
      ["Principal hipótese?", ["Artrite séptica", "Osteoartrite", "Artrite reumatoide", "Fibromialgia"], 0, "Leucócitos > 50.000 sugerem infecção."],
      ["Agente mais provável?", ["Staphylococcus aureus", "Neisseria meningitidis", "Candida", "Pseudomonas sempre"], 0, "Em adultos sem fator de risco sexual."],
      ["Conduta?", ["Antibiótico IV e drenagem articular", "Só corticoide intra-articular", "AINE e alta", "Fisioterapia"], 0, "Corticoide intra-articular é contraindicado na infecção."]] }
  ]
});
