// Conteúdo ampliado (parte 3): Parasitologia, Farmacologia, Saúde Coletiva, Semiologia.
addContent("parasito", {
  flashcards: [
    ["Agente da amebíase", "Entamoeba histolytica: disenteria e abscesso hepático."],
    ["Tratamento do abscesso hepático amebiano", "Metronidazol, seguido de um amebicida intraluminal."],
    ["Larva migrans visceral (toxocaríase)", "Toxocara canis: eosinofilia, hepatomegalia e lesão ocular, em crianças que brincam na areia."],
    ["Larva migrans cutânea (bicho geográfico)", "Ancylostoma braziliense: trilha serpiginosa e coceira na pele. Trata-se com albendazol ou ivermectina."],
    ["Agente da tungíase (bicho-de-pé)", "Tunga penetrans."],
    ["Tricomoníase", "Trichomonas vaginalis: corrimento amarelo-esverdeado bolhoso e colo em framboesa. Tratar também o parceiro."],
    ["Esquistossomose aguda (febre de Katayama)", "Febre, urticária, tosse e eosinofilia semanas depois do banho em água contaminada."],
    ["Tratamento da doença de Chagas aguda", "Benznidazol (ou nifurtimox)."],
    ["Formas do T. cruzi no sangue e no tecido", "No sangue: tripomastigota. No tecido: amastigota."],
    ["Toxoplasmose ocular", "Retinocoroidite, muitas vezes por reativação."],
    ["Vetor da malária", "Fêmea do mosquito Anopheles."],
    ["Lesão típica da leishmaniose tegumentar", "Úlcera indolor com bordas elevadas em moldura. No Brasil, o principal agente é a L. braziliensis."]
  ],
  quiz: [
    ["Exame para diagnosticar estrongiloidíase:", ["Baermann-Moraes (larvas nas fezes)", "Teste de Graham", "Gota espessa", "Kato-Katz"], 0, "Busca larvas, não ovos."],
    ["Tratamento de escolha da estrongiloidíase:", ["Ivermectina", "Praziquantel", "Metronidazol", "Benznidazol"], 0, "O albendazol é alternativa."],
    ["Tratamento clássico da leishmaniose no Brasil:", ["Antimoniato de meglumina", "Albendazol", "Cloroquina", "Ivermectina"], 0, "Anfotericina B lipossomal nos casos graves, em gestantes e imunossuprimidos."],
    ["A ancilostomíase causa principalmente:", ["Anemia ferropriva", "Obstrução biliar", "Prurido anal", "Convulsões"], 0, "O verme suga sangue da mucosa intestinal."],
    ["A teníase por Taenia saginata vem de:", ["Carne bovina mal cozida", "Carne suína mal cozida", "Água com ovos", "Picada de inseto"], 0, "A Taenia solium vem da carne de porco."],
    ["A neurocisticercose costuma se apresentar com:", ["Convulsões", "Diarreia", "Anemia", "Icterícia"], 0, "É causa importante de epilepsia em países em desenvolvimento."],
    ["Forma do Plasmodium inoculada pelo mosquito:", ["Esporozoíto", "Merozoíto", "Gametócito", "Trofozoíto"], 0, "Vai primeiro ao fígado."],
    ["Uma ascaridíase maciça na criança pode causar:", ["Obstrução intestinal", "Hematúria", "Cegueira", "Nefrite"], 0, "Por bolo de áscaris; os vermes também podem migrar para as vias biliares."],
    ["A giardíase crônica pode causar:", ["Má absorção com esteatorreia", "Hematêmese", "Icterícia obstrutiva", "Pneumonia"], 0, "Diarreia gordurosa, distensão e perda de peso."]
  ],
  tf: [
    ["A toxoplasmose pode ser adquirida comendo carne crua ou malpassada.", true, "Verdadeiro: pelos cistos no tecido."],
    ["O Enterobius vermicularis é mais bem diagnosticado pelo exame de fezes comum.", false, "Falso: pelo teste da fita adesiva (Graham), pela manhã."],
    ["A malária por P. falciparum pode causar malária cerebral.", true, "Verdadeiro."],
    ["A cisticercose se adquire comendo carne de porco com cisticercos.", false, "Falso: isso causa teníase. A cisticercose vem da ingestão de ovos."],
    ["Eosinofilia é comum nas helmintíases com fase nos tecidos.", true, "Verdadeiro."],
    ["O metronidazol trata giardíase, amebíase e tricomoníase.", true, "Verdadeiro."]
  ],
  pairs: [["Strongyloides", "Ivermectina"], ["Giardia", "Metronidazol"], ["Ancilostomídeo", "Anemia ferropriva"], ["Enterobius", "Teste de Graham"]],
  seq: [{ t: "Ciclo da malária no ser humano", items: ["Picada do Anopheles (esporozoítos)", "Multiplicação no fígado", "Merozoítos saem para o sangue", "Invasão das hemácias", "Ruptura das hemácias (febre)", "Formação de gametócitos"], e: "No P. vivax e no P. ovale, os hipnozoítos podem ficar latentes no fígado." }],
  cases: [
    { title: "Corticoide e diarreia grave", story: "Paciente de 60 anos, da zona rural, começa prednisona em dose alta. Semanas depois tem diarreia, dor abdominal, tosse e sepse por Gram-negativo.", steps: [
      ["Qual parasita suspeitar?", ["Strongyloides stercoralis (hiperinfecção)", "Ascaris", "Giardia", "Enterobius"], 0, "A imunossupressão amplifica a autoinfecção."],
      ["Por que há bacteremia por Gram-negativo?", ["As larvas levam bactérias do intestino para o sangue", "Contaminação do cateter", "Efeito do corticoide no rim", "Não há relação"], 0, "Elas atravessam a parede do intestino."],
      ["Como prevenir em casos parecidos?", ["Rastrear ou tratar com ivermectina antes de imunossuprimir pacientes de risco", "Nada", "Antibiótico profilático", "Vacina"], 0, "Medida simples que evita casos graves."]] },
    { title: "A ferida que não fecha", story: "Agricultor de 35 anos da região amazônica com úlcera indolor na perna há 2 meses, de bordas elevadas e fundo granuloso.", steps: [
      ["Qual é a hipótese?", ["Leishmaniose tegumentar", "Úlcera venosa", "Câncer de pele", "Pioderma"], 0, "Área endêmica e lesão típica."],
      ["Qual é o vetor?", ["Flebotomíneo (mosquito-palha)", "Aedes", "Barbeiro", "Carrapato"], 0, "Gênero Lutzomyia."],
      ["Qual é o tratamento clássico?", ["Antimoniato de meglumina", "Penicilina", "Aciclovir", "Albendazol"], 0, "Antes, avaliar ECG e funções renal e hepática."]] }
  ]
});

addContent("farmaco", {
  flashcards: [
    ["Efeitos adversos clássicos da amiodarona", "Disfunção da tireoide, fibrose pulmonar, hepatotoxicidade e depósitos na córnea."],
    ["Antídoto da intoxicação por ferro", "Deferoxamina."],
    ["Antídoto dos inibidores do fator Xa (rivaroxabana, apixabana)", "Andexanete alfa ou, se não houver, complexo protrombínico."],
    ["Antídoto da dabigatrana", "Idarucizumabe."],
    ["Efeitos adversos do anlodipino (di-hidropiridínico)", "Edema nos tornozelos, cefaleia e rubor."],
    ["Mecanismo dos iSGLT2 (dapagliflozina, empagliflozina)", "Inibem a reabsorção de glicose no túbulo proximal, causando glicosúria."],
    ["Efeitos adversos dos iSGLT2", "Candidíase genital, desidratação e cetoacidose euglicêmica."],
    ["Fármaco que causa a síndrome do homem vermelho", "Vancomicina infundida rápido demais."],
    ["Mecanismo das fluoroquinolonas", "Inibem a DNA girase e a topoisomerase IV."],
    ["Efeitos adversos das fluoroquinolonas", "Tendinite e ruptura de tendão, e prolongamento do QT."],
    ["Fármaco de escolha na crise de ausência", "Etossuximida (ou valproato)."],
    ["Inibidores potentes do citocromo P450", "Claritromicina, cetoconazol, ritonavir e suco de toranja (grapefruit)."]
  ],
  quiz: [
    ["Indutor do citocromo P450 que reduz o efeito dos anticoncepcionais:", ["Rifampicina", "Omeprazol", "Paracetamol", "Metformina"], 0, "Também carbamazepina, fenitoína e erva-de-são-joão."],
    ["Aminoglicosídeo + furosemida aumentam o risco de:", ["Ototoxicidade", "Hipoglicemia", "Hepatite", "Neutropenia"], 0, "Os dois são ototóxicos."],
    ["Antiepiléptico teratogênico que causa defeitos do tubo neural:", ["Ácido valproico", "Levetiracetam", "Lamotrigina", "Gabapentina"], 0, "Evitar em mulheres em idade fértil sem contracepção."],
    ["Betabloqueador não seletivo é contraindicado em:", ["Asma", "Hipertensão", "Tremor essencial", "Profilaxia de enxaqueca"], 0, "Pode causar broncoespasmo."],
    ["A naloxona é:", ["Antagonista opioide", "Agonista parcial", "Benzodiazepínico", "Anticolinérgico"], 0, "Reverte a depressão respiratória."],
    ["Efeito adverso raro e mais temido da metformina:", ["Acidose lática", "Hipoglicemia grave", "Ganho de peso", "Hipercalemia"], 0, "Risco maior na insuficiência renal grave."],
    ["As heparinas de baixo peso molecular agem principalmente inibindo o:", ["Fator Xa (via antitrombina)", "A vitamina K", "As plaquetas via COX", "O fibrinogênio"], 0, "Ex.: enoxaparina."],
    ["Primeira linha na emergência hipertensiva com edema agudo de pulmão:", ["Nitroglicerina IV e furosemida", "Atenolol oral", "Hidroclorotiazida", "Só clonidina oral"], 0, "Reduz a pré-carga e a pós-carga."],
    ["Efeito adverso da isoniazida prevenido com piridoxina:", ["Neuropatia periférica", "Hepatite", "Ototoxicidade", "Urina laranja"], 0, "A urina laranja é da rifampicina."]
  ],
  tf: [
    ["Os IECA podem causar hipercalemia.", true, "Verdadeiro: reduzem a aldosterona."],
    ["A rifampicina deixa urina, lágrimas e suor alaranjados.", true, "Verdadeiro."],
    ["O paracetamol tem forte efeito anti-inflamatório.", false, "Falso: é analgésico e antitérmico, com pouco efeito anti-inflamatório."],
    ["Macrolídeos podem prolongar o intervalo QT.", true, "Verdadeiro."],
    ["Benzodiazepínicos aumentam a frequência de abertura do canal de cloro do receptor GABA-A.", true, "Verdadeiro. Os barbitúricos aumentam a duração da abertura."],
    ["A varfarina começa a agir imediatamente.", false, "Falso: demora dias. Na trombose aguda, começa-se junto com heparina."]
  ],
  pairs: [["Ferro", "Deferoxamina"], ["Dabigatrana", "Idarucizumabe"], ["Isoniazida", "Piridoxina na prevenção"], ["Vancomicina", "Síndrome do homem vermelho"]],
  seq: [{ t: "Ação de um agonista num receptor acoplado à proteína G", items: ["O fármaco se liga ao receptor", "O receptor muda de conformação", "A proteína G é ativada", "A enzima efetora é ativada (ex.: adenilil ciclase)", "Forma-se o segundo mensageiro (AMPc)", "Resposta da célula"], e: "Os receptores β-adrenérgicos funcionam assim (proteína Gs)." }],
  cases: [
    { title: "O anticoncepcional que falhou", story: "Mulher de 25 anos em tratamento de tuberculose com RIPE engravida usando corretamente a pílula anticoncepcional.", steps: [
      ["O que explica a falha?", ["A rifampicina induz o citocromo P450 e acelera o metabolismo do hormônio", "O etambutol inibe o hormônio", "A isoniazida aumenta a fertilidade", "Só erro de uso"], 0, "É uma interação clássica."],
      ["Que método orientar durante o tratamento?", ["Método não hormonal, como DIU de cobre ou preservativo", "Dobrar a pílula por conta própria", "Nenhum", "Tabelinha"], 0, "Até algumas semanas depois de terminar a rifampicina."],
      ["Outro fármaco com interação importante com a rifampicina:", ["Varfarina (perde efeito)", "Paracetamol", "Amoxicilina", "Dipirona"], 0, "Também antirretrovirais e azólicos."]] },
    { title: "Confusão em quem usa lítio", story: "Homem de 40 anos usa lítio há anos. Começou hidroclorotiazida para a pressão e agora tem tremor grosseiro, vômitos e confusão.", steps: [
      ["Qual é a hipótese?", ["Intoxicação por lítio", "AVC", "Hipoglicemia", "Síndrome serotoninérgica"], 0, "O tiazídico reduz a excreção do lítio."],
      ["Que outros fármacos elevam o lítio?", ["IECA e AINEs", "Paracetamol", "Omeprazol", "Amoxicilina"], 0, "Reduzem a depuração renal."],
      ["Qual é a conduta na intoxicação grave?", ["Hemodiálise", "Carvão ativado resolve", "Mais lítio", "Diurético tiazídico"], 0, "O lítio não se liga ao carvão ativado."]] }
  ]
});

addContent("saude", {
  flashcards: [
    ["Como calcular o valor preditivo positivo", "Verdadeiros positivos ÷ todos os positivos (VP + FP)."],
    ["Como calcular o NNT", "1 ÷ redução absoluta do risco."],
    ["Risco relativo", "Incidência nos expostos ÷ incidência nos não expostos."],
    ["Viés de seleção", "Erro sistemático na forma como os participantes são escolhidos ou mantidos no estudo."],
    ["Fator de confusão", "Variável ligada à exposição e ao desfecho que distorce a associação estudada."],
    ["Taxa de mortalidade infantil", "Óbitos de menores de 1 ano ÷ nascidos vivos × 1.000."],
    ["Endemia, epidemia e pandemia", "Endemia: ocorrência habitual. Epidemia: acima do esperado. Pandemia: epidemia em vários continentes."],
    ["Atributos da atenção primária (Starfield)", "Primeiro contato, longitudinalidade, integralidade e coordenação do cuidado."],
    ["Níveis de prevenção de Leavell e Clark", "Primária (promoção e proteção), secundária (diagnóstico precoce) e terciária (reabilitação)."],
    ["Princípios organizativos do SUS", "Descentralização, regionalização, hierarquização e participação social."],
    ["Estudo duplo-cego", "Nem o participante nem o avaliador sabem quem recebeu a intervenção."],
    ["Curva ROC", "Relaciona a sensibilidade com 1 − especificidade em vários pontos de corte."]
  ],
  quiz: [
    ["Teste de alta especificidade com resultado positivo:", ["Ajuda a confirmar a doença", "Afasta a doença", "Não ajuda", "Serve para rastrear"], 0, "Mnemônico em inglês: SpIn (specific, positive, rule in)."],
    ["Redução absoluta do risco de 4%. Qual é o NNT?", ["4", "25", "40", "400"], 1, "1 ÷ 0,04 = 25."],
    ["Estudo que compara grupos populacionais (ex.: países), e não indivíduos:", ["Ecológico", "Coorte", "Caso-controle", "Ensaio clínico"], 0, "Está sujeito à falácia ecológica."],
    ["Intervalo de confiança de 95% do risco relativo que inclui o 1:", ["Associação sem significância estatística", "Associação forte", "Efeito protetor certo", "Erro de cálculo"], 0, "É compatível com ausência de efeito."],
    ["O erro tipo I é:", ["Rejeitar a hipótese nula verdadeira (falso positivo)", "Aceitar a hipótese nula falsa", "Erro de digitação", "Viés de seleção"], 0, "Sua probabilidade é o alfa (ex.: 5%)."],
    ["Medida que conta os casos novos numa população durante um período:", ["Incidência", "Prevalência", "Letalidade", "Odds ratio"], 0, "Prevalência ≈ incidência × duração da doença."],
    ["A letalidade é:", ["Óbitos pela doença ÷ doentes", "Óbitos ÷ população total", "Casos novos ÷ população", "Doentes ÷ população"], 0, "Mede a gravidade da doença."],
    ["Programa que organiza a vacinação no Brasil:", ["Programa Nacional de Imunizações (PNI)", "Mais Médicos", "Farmácia Popular", "SAMU"], 0, "Criado em 1973."],
    ["A análise por intenção de tratar:", ["Analisa cada participante no grupo em que foi randomizado", "Exclui quem abandonou", "Analisa só quem aderiu", "Troca participantes de grupo"], 0, "Preserva os benefícios da randomização."]
  ],
  tf: [
    ["Quanto maior a prevalência, maior o valor preditivo positivo.", true, "Verdadeiro."],
    ["Sensibilidade e especificidade variam muito com a prevalência.", false, "Falso: são propriedades do teste. Os valores preditivos é que variam."],
    ["Estudos de coorte são os melhores para doenças raras.", false, "Falso: para doenças raras, o caso-controle é mais eficiente."],
    ["A randomização reduz o viés de confusão.", true, "Verdadeiro: distribui os fatores conhecidos e desconhecidos entre os grupos."],
    ["O SUS é financiado pelas três esferas de governo.", true, "Verdadeiro: União, estados e municípios."],
    ["Um p menor que 0,05 prova que o efeito é clinicamente importante.", false, "Falso: significância estatística não é relevância clínica."]
  ],
  pairs: [["NNT", "1 ÷ redução absoluta do risco"], ["Letalidade", "Óbitos ÷ doentes"], ["Erro tipo I", "Falso positivo"], ["Estudo ecológico", "Dados de populações"]],
  seq: [{ t: "Investigação de um surto", items: ["Confirmar o diagnóstico e o surto", "Definir o que é um caso", "Buscar e contar os casos", "Descrever por tempo, lugar e pessoa", "Formular hipóteses", "Testar as hipóteses", "Controlar e comunicar"], e: "As medidas de controle podem começar cedo, sem esperar o fim." }],
  cases: [
    { title: "O remédio novo", story: "Num ensaio clínico, o evento ocorreu em 10% do grupo placebo e em 6% do grupo tratado.", steps: [
      ["Qual é a redução absoluta do risco?", ["4%", "40%", "6%", "10%"], 0, "10% − 6% = 4%."],
      ["Qual é o risco relativo?", ["0,6", "0,4", "1,6", "4"], 0, "6% ÷ 10% = 0,6."],
      ["Qual é o NNT?", ["25", "4", "10", "60"], 0, "1 ÷ 0,04 = 25 pessoas tratadas para evitar 1 evento."]] },
    { title: "Surto na festa", story: "Depois de uma festa, 30 de 50 convidados têm diarreia e vômitos em até 6 horas. Quase todos os doentes comeram salada de maionese.", steps: [
      ["Que estudo usar na investigação?", ["Coorte retrospectiva com todos os convidados", "Ensaio clínico", "Estudo ecológico", "Só série de casos"], 0, "Compara a taxa de ataque entre quem comeu e quem não comeu."],
      ["Qual é a taxa de ataque geral?", ["60%", "30%", "50%", "6%"], 0, "30 ÷ 50."],
      ["Agente provável, com início tão rápido:", ["Toxina pré-formada do Staphylococcus aureus", "HIV", "Hepatite A", "Tuberculose"], 0, "Incubação de 1 a 6 horas."]] }
  ]
});

addContent("semio", {
  flashcards: [
    ["Sinal de Lasègue", "Dor lombar irradiada ao elevar a perna estendida (30° a 70°): radiculopatia, geralmente L5 ou S1."],
    ["Sinal de Romberg positivo", "Perde o equilíbrio ao fechar os olhos: ataxia sensitiva (cordão posterior)."],
    ["Sinal de Trousseau", "Espasmo do carpo ao insuflar o manguito acima da PA sistólica: hipocalcemia."],
    ["Sinal de Chvostek", "Contração da face ao percutir o nervo facial: hipocalcemia."],
    ["Turgência jugular a 45°", "Sugere pressão venosa central elevada (insuficiência cardíaca, tamponamento)."],
    ["Sopro sistólico que aumenta com a manobra de Valsalva", "Cardiomiopatia hipertrófica obstrutiva."],
    ["Pulso em martelo d'água (de Corrigan)", "Insuficiência aórtica."],
    ["Respiração de Cheyne-Stokes", "Ciclos de aumento e redução da amplitude, com apneia: IC grave ou lesão neurológica."],
    ["Sinal de Kussmaul (na jugular)", "A jugular enche mais na inspiração: pericardite constritiva."],
    ["Asterixis (flapping)", "Encefalopatia hepática, uremia ou hipercapnia."],
    ["Sinal de Cullen", "Equimose ao redor do umbigo: hemorragia retroperitoneal."],
    ["Linfonodo de Virchow", "Linfonodo supraclavicular esquerdo aumentado: sugere neoplasia abdominal (sinal de Troisier)."]
  ],
  quiz: [
    ["Sopro diastólico em foco aórtico, com pulso amplo:", ["Estenose aórtica", "Insuficiência aórtica", "Estenose mitral", "CIA"], 1, "A pressão de pulso fica alargada."],
    ["O atrito pericárdico é mais bem ouvido com o paciente:", ["Sentado e inclinado para a frente", "Em decúbito lateral esquerdo", "Em pé", "Durante Valsalva"], 0, "Na borda esternal esquerda."],
    ["Tórax maciço à percussão, com murmúrio e frêmito abolidos:", ["Pneumotórax", "Derrame pleural", "Pneumonia", "Enfisema"], 1, "No pneumotórax, a percussão é hipertimpânica."],
    ["Força muscular grau 3:", ["Vence a gravidade, mas não a resistência", "Contração sem movimento", "Força normal", "Movimento só sem gravidade"], 0, "Grau 5 é normal; grau 4 vence alguma resistência."],
    ["Pupilas puntiformes em paciente em coma sugerem:", ["Intoxicação por opioide ou lesão na ponte", "Hipóxia grave", "Atropina", "Herniação do úncus"], 0, "A herniação do úncus dá midríase de um lado."],
    ["Hiperreflexia com clônus indica lesão:", ["Do neurônio motor superior", "Do nervo periférico", "Muscular", "Da junção neuromuscular"], 0, "Geralmente com sinal de Babinski."],
    ["Dor na panturrilha à dorsiflexão do pé, com edema unilateral:", ["Sinal de Homans: sugere TVP", "Sinal de Murphy", "Sinal de Lasègue", "Sinal de Blumberg"], 0, "Tem baixa sensibilidade: confirmar com ultrassom."],
    ["Fraqueza da dorsiflexão do hálux numa lombociatalgia sugere raiz:", ["L5", "S1", "L2", "C7"], 0, "Na raiz S1 há fraqueza da flexão plantar e reflexo aquileu diminuído."],
    ["Na criança desidratada, prega cutânea que volta muito devagar (mais de 2 s) indica:", ["Desidratação grave", "Hidratação normal", "Edema", "Obesidade"], 0, "Faz parte da avaliação da OMS."]
  ],
  tf: [
    ["A primeira bulha corresponde ao fechamento das valvas mitral e tricúspide.", true, "Verdadeiro."],
    ["O desdobramento fisiológico da segunda bulha ocorre na expiração.", false, "Falso: ocorre na inspiração."],
    ["Baqueteamento digital é típico da asma.", false, "Falso: não é típico da asma nem da DPOC sem complicações."],
    ["A palpação deve começar longe da área dolorosa.", true, "Verdadeiro."],
    ["Os pulsos devem ser comparados entre os dois lados.", true, "Verdadeiro: assimetria sugere obstrução ou dissecção."],
    ["O sinal de Babinski é normal em lactentes até cerca de 1 ano.", true, "Verdadeiro."]
  ],
  pairs: [["Sinal de Lasègue", "Radiculopatia lombar"], ["Sinal de Romberg", "Ataxia sensitiva"], ["Sinal de Chvostek", "Hipocalcemia"], ["Pulso de Corrigan", "Insuficiência aórtica"]],
  seq: [{ t: "Exame do tórax", items: ["Inspeção estática", "Inspeção dinâmica", "Palpação (expansibilidade e frêmito)", "Percussão", "Ausculta"], e: "No tórax, ao contrário do abdome, a ausculta vem por último." }],
  cases: [
    { title: "Falta de ar e pernas inchadas", story: "Homem de 70 anos com falta de ar aos esforços, precisa de travesseiros para dormir, tem edema com cacifo nas pernas, jugular túrgida e estertores nas bases.", steps: [
      ["Qual síndrome?", ["Insuficiência cardíaca congestiva", "DPOC", "Asma", "Pneumonia"], 0, "Congestão sistêmica e pulmonar."],
      ["Qual bulha reforça a hipótese?", ["B3", "B1 hiperfonética isolada", "Estalido de abertura", "Clique mesossistólico"], 0, "Indica sobrecarga de volume."],
      ["O refluxo hepatojugular positivo indica:", ["Pressão venosa central elevada", "Cirrose", "Hepatite", "Normalidade"], 0, "Comprimir o fígado faz a jugular subir."]] },
    { title: "A dor que desce pela perna", story: "Mulher de 40 anos com dor lombar que irradia até o pé direito, depois de carregar peso. Elevar a perna esticada a 40° reproduz a dor.", steps: [
      ["Que sinal é esse?", ["Lasègue", "Romberg", "Babinski", "Kernig"], 0, "Teste da elevação da perna estendida."],
      ["Se houver fraqueza para levantar o hálux, qual raiz?", ["L5", "S1", "L2", "C7"], 0, "A S1 cuida da flexão plantar e do reflexo aquileu."],
      ["Qual sinal de alerta exige investigação urgente?", ["Anestesia em sela e retenção urinária", "Dor que piora sentada", "Dor em queimação", "Dor há 3 dias"], 0, "Sugere síndrome da cauda equina."]] }
  ]
});
