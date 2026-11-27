// Matérias adicionais (parte 2): completam a grade do curso.
window.WORLDS.push(
  {
    id: "genet", cycle: "basico", name: "Genética", icon: "🧬", color: "#06b6d4",
    desc: "Herança, cromossomos e síndromes.",
    flashcards: [
      { f: "Padrão de herança da fibrose cística", b: "Autossômica recessiva (gene CFTR)." },
      { f: "Cariótipo da síndrome de Down", b: "47,XX,+21 ou 47,XY,+21. Na maioria dos casos, por não disjunção materna." },
      { f: "Cariótipo da síndrome de Turner", b: "45,X." },
      { f: "Cariótipo da síndrome de Klinefelter", b: "47,XXY." },
      { f: "Padrão de herança da hemofilia A", b: "Recessiva ligada ao X." },
      { f: "Padrão de herança da doença de Huntington", b: "Autossômica dominante, por expansão de repetições CAG." },
      { f: "Como é transmitida a herança mitocondrial?", b: "Apenas pela mãe." },
      { f: "Genes do câncer hereditário de mama e ovário", b: "BRCA1 e BRCA2." }
    ],
    quiz: [
      { q: "Casal de portadores de uma doença autossômica recessiva. Risco de cada filho ser afetado:", o: ["0%", "25%", "50%", "100%"], a: 1, e: "Aa × Aa: 25% afetados, 50% portadores e 25% sem o alelo." },
      { q: "Homem com doença dominante ligada ao X. Chance de suas filhas serem afetadas:", o: ["0%", "25%", "50%", "100%"], a: 3, e: "Ele passa o X para todas as filhas e o Y para todos os filhos, que ficam sem a doença." },
      { q: "A síndrome do X frágil é causada por:", o: ["Trissomia do X", "Expansão de repetições CGG no gene FMR1", "Deleção do cromossomo 15", "Mutação mitocondrial"], a: 1, e: "É a causa hereditária mais comum de deficiência intelectual." },
      { q: "A antecipação genética ocorre tipicamente em:", o: ["Doenças por expansão de trinucleotídeos", "Doenças mitocondriais", "Trissomias", "Doenças ligadas ao Y"], a: 0, e: "A doença aparece mais cedo e mais grave a cada geração (ex.: Huntington, distrofia miotônica)." },
      { q: "A translocação t(9;22), o cromossomo Philadelphia, caracteriza:", o: ["Leucemia linfoide crônica", "Leucemia mieloide crônica", "Linfoma de Burkitt", "Mieloma múltiplo"], a: 1, e: "Forma o gene de fusão BCR-ABL, alvo do imatinibe." },
      { q: "A síndrome de Marfan envolve mutação em:", o: ["Colágeno tipo I", "Fibrilina-1 (FBN1)", "Distrofina", "CFTR"], a: 1, e: "É autossômica dominante, com alto risco de dissecção aórtica." }
    ],
    tf: [
      { s: "Mulheres são afetadas com mais frequência por doenças recessivas ligadas ao X.", v: false, e: "Falso: homens, que têm um só X, são os mais afetados." },
      { s: "Doenças mitocondriais são transmitidas pelo pai.", v: false, e: "Falso: as mitocôndrias vêm do óvulo." },
      { s: "O risco de trissomia do 21 aumenta com a idade materna avançada.", v: true, e: "Verdadeiro." },
      { s: "Na herança autossômica dominante, o genitor afetado tem 50% de chance de transmitir em cada gestação.", v: true, e: "Verdadeiro." },
      { s: "Penetrância incompleta significa que alguém com o genótipo pode não manifestar a doença.", v: true, e: "Verdadeiro." },
      { s: "A síndrome de Turner ocorre em homens.", v: false, e: "Falso: ocorre em pessoas do sexo feminino (45,X)." }
    ],
    pairs: [
      ["Fibrose cística", "CFTR"],
      ["Síndrome de Marfan", "Fibrilina-1"],
      ["X frágil", "FMR1"],
      ["Huntington", "Repetições CAG"],
      ["Leucemia mieloide crônica", "Cromossomo Philadelphia"],
      ["Neurofibromatose tipo 1", "Manchas café com leite"]
    ],
    seq: [
      { t: "Fases da mitose", items: ["Prófase", "Prometáfase", "Metáfase", "Anáfase", "Telófase", "Citocinese"], e: "Na metáfase os cromossomos se alinham; na anáfase as cromátides se separam." }
    ],
    cases: [{
      title: "Baixa estatura e sem menarca",
      story: "Menina de 14 anos com baixa estatura, sem menarca, pescoço alado, tórax em escudo e coarctação da aorta.",
      steps: [
        { q: "Qual é a principal hipótese?", o: ["Síndrome de Down", "Síndrome de Turner", "Síndrome de Klinefelter", "Hiperplasia adrenal"], a: 1, e: "É o quadro clássico de disgenesia gonadal com baixa estatura." },
        { q: "Qual exame confirma?", o: ["Ultrassom pélvico", "Cariótipo", "Dosagem de GH", "Teste do suor"], a: 1, e: "O cariótipo mostra a alteração cromossômica." },
        { q: "Qual é o resultado esperado?", o: ["47,XXY", "45,X", "47,XX,+21", "46,XY"], a: 1, e: "Também pode haver mosaicismo (45,X/46,XX)." }
      ]
    }]
  },
  {
    id: "parasito", cycle: "basico", name: "Parasitologia", icon: "🪱", color: "#a3e635",
    desc: "Helmintos, protozoários e vetores.",
    flashcards: [
      { f: "Agente da esquistossomose e seu hospedeiro intermediário", b: "Schistosoma mansoni. Hospedeiro intermediário: caramujo Biomphalaria." },
      { f: "Como se transmite o Ascaris lumbricoides?", b: "Pela ingestão de ovos (via fecal-oral)." },
      { f: "Parasita que penetra pela pele de quem anda descalço e causa anemia", b: "Ancilostomídeos (Ancylostoma duodenale e Necator americanus)." },
      { f: "Para que serve o teste da fita adesiva (Graham)?", b: "Diagnosticar Enterobius vermicularis (oxiúro), que causa prurido anal noturno." },
      { f: "O que é o ciclo de Loss (pulmonar)?", b: "A passagem de larvas pelo pulmão (Ascaris, ancilostomídeos, Strongyloides). Pode causar a síndrome de Löffler." },
      { f: "Como se adquire a cisticercose?", b: "Pela ingestão de ovos de Taenia solium. Pode causar neurocisticercose." },
      { f: "Como se adquire a teníase?", b: "Pela ingestão de carne mal cozida com cisticercos (T. solium: porco; T. saginata: boi)." },
      { f: "Tratamento da giardíase", b: "Metronidazol, tinidazol ou secnidazol." }
    ],
    quiz: [
      { q: "Hiperinfecção em imunossuprimidos (ex.: uso de corticoide) ocorre com:", o: ["Ascaris lumbricoides", "Strongyloides stercoralis", "Enterobius vermicularis", "Taenia saginata"], a: 1, e: "O estrongiloide faz autoinfecção e pode se disseminar." },
      { q: "Hospedeiro definitivo do Toxoplasma gondii:", o: ["Cão", "Gato", "Porco", "Ser humano"], a: 1, e: "Os oocistos saem nas fezes do gato." },
      { q: "Ameba que causa abscesso hepático:", o: ["Entamoeba coli", "Entamoeba histolytica", "Iodamoeba", "Endolimax nana"], a: 1, e: "É a única ameba intestinal patogênica relevante." },
      { q: "Fármaco de escolha na esquistossomose:", o: ["Albendazol", "Praziquantel", "Ivermectina", "Metronidazol"], a: 1, e: "O praziquantel também trata teníases." },
      { q: "Agente da leishmaniose visceral (calazar) no Brasil:", o: ["Leishmania braziliensis", "Leishmania infantum", "Trypanosoma cruzi", "Toxoplasma gondii"], a: 1, e: "O cão é o principal reservatório urbano." },
      { q: "Exame básico para diagnosticar parasitoses intestinais:", o: ["Hemocultura", "Exame parasitológico de fezes", "Urocultura", "Sorologia para HIV"], a: 1, e: "De preferência em mais de uma amostra." }
    ],
    tf: [
      { s: "O Ascaris lumbricoides é transmitido pela picada de mosquito.", v: false, e: "Falso: a transmissão é fecal-oral." },
      { s: "A toxoplasmose congênita tende a ser mais grave quando a infecção ocorre no início da gestação.", v: true, e: "Verdadeiro, embora a transmissão seja mais frequente no fim da gestação." },
      { s: "O albendazol trata várias helmintíases.", v: true, e: "Verdadeiro: ascaridíase, ancilostomíase, oxiuríase e outras." },
      { s: "Giardia lamblia é um helminto.", v: false, e: "Falso: é um protozoário flagelado." },
      { s: "A esquistossomose pode causar hipertensão portal.", v: true, e: "Verdadeiro: na forma hepatoesplênica." },
      { s: "O barbeiro transmite a doença de Chagas principalmente pelas fezes.", v: true, e: "Verdadeiro. Hoje a transmissão oral (alimentos contaminados) também é importante no Brasil." }
    ],
    pairs: [
      ["Schistosoma mansoni", "Biomphalaria"],
      ["Toxoplasma gondii", "Gato"],
      ["Trypanosoma cruzi", "Barbeiro"],
      ["Leishmania", "Flebotomíneo"],
      ["Taenia solium", "Porco"],
      ["Plasmodium", "Anopheles"]
    ],
    seq: [
      { t: "Ciclo do Schistosoma mansoni", items: ["Ovos eliminados nas fezes", "Miracídio liberado na água", "Penetração no caramujo Biomphalaria", "Liberação de cercárias", "Penetração na pele humana", "Vermes adultos nas veias mesentéricas"], e: "Os ovos retidos no fígado causam a fibrose periportal." }
    ],
    cases: [{
      title: "Barriga d'água",
      story: "Homem de 40 anos, da zona rural de Minas Gerais, que toma banho de rio desde a infância. Tem hepatoesplenomegalia e varizes de esôfago.",
      steps: [
        { q: "Qual é a principal hipótese?", o: ["Cirrose alcoólica", "Esquistossomose hepatoesplênica", "Hepatite B", "Leishmaniose cutânea"], a: 1, e: "Área endêmica, contato com água doce e hipertensão portal." },
        { q: "Qual exame ajuda no diagnóstico?", o: ["Parasitológico de fezes (Kato-Katz)", "Gota espessa", "Teste de Graham", "Hemocultura"], a: 0, e: "Pesquisa de ovos com espícula lateral." },
        { q: "Qual é o tratamento antiparasitário?", o: ["Albendazol", "Praziquantel", "Benznidazol", "Cloroquina"], a: 1, e: "A hipertensão portal exige acompanhamento próprio." }
      ]
    }]
  },
  {
    id: "saude", cycle: "basico", name: "Saúde Coletiva", icon: "📊", color: "#94a3b8",
    desc: "SUS, epidemiologia e estudos.",
    flashcards: [
      { f: "Princípios doutrinários do SUS", b: "Universalidade, integralidade e equidade." },
      { f: "Lei Orgânica da Saúde", b: "Lei 8.080/1990, complementada pela Lei 8.142/1990 (participação social)." },
      { f: "Prevalência", b: "Proporção de casos existentes (novos e antigos) numa população em um dado momento." },
      { f: "Incidência", b: "Casos novos numa população em risco, durante um período." },
      { f: "Sensibilidade de um teste", b: "Capacidade de identificar os doentes (verdadeiros positivos)." },
      { f: "Especificidade de um teste", b: "Capacidade de identificar os sadios (verdadeiros negativos)." },
      { f: "Prevenção quaternária", b: "Evitar intervenções desnecessárias, a iatrogenia e a medicalização excessiva." },
      { f: "Estudo que acompanha expostos e não expostos ao longo do tempo", b: "Estudo de coorte." }
    ],
    quiz: [
      { q: "Melhor desenho para avaliar a eficácia de um tratamento:", o: ["Relato de caso", "Estudo transversal", "Ensaio clínico randomizado", "Estudo ecológico"], a: 2, e: "A randomização equilibra os fatores de confusão." },
      { q: "Estudo que parte de doentes e controles e investiga exposições passadas:", o: ["Coorte", "Caso-controle", "Ensaio clínico", "Transversal"], a: 1, e: "É bom para doenças raras." },
      { q: "Medida de associação típica do estudo caso-controle:", o: ["Risco relativo", "Odds ratio", "Incidência", "NNT"], a: 1, e: "Não dá para calcular incidência num caso-controle." },
      { q: "Um teste de alta sensibilidade é mais útil para:", o: ["Confirmar a doença", "Rastrear e, quando negativo, afastar a doença", "Medir mortalidade", "Avaliar custo"], a: 1, e: "Sensível e negativo descarta. Específico e positivo confirma." },
      { q: "A vacinação é exemplo de prevenção:", o: ["Primária", "Secundária", "Terciária", "Quaternária"], a: 0, e: "Evita que a doença aconteça. O rastreamento é prevenção secundária." },
      { q: "Qual destas exige notificação imediata (em até 24 h)?", o: ["Sarampo", "Hanseníase", "Hepatite B crônica", "Tuberculose"], a: 0, e: "Suspeita de sarampo exige notificação imediata e bloqueio vacinal." }
    ],
    tf: [
      { s: "O valor preditivo positivo de um teste depende da prevalência da doença.", v: true, e: "Verdadeiro: com prevalência baixa, os falsos positivos aumentam." },
      { s: "A Estratégia Saúde da Família é o modelo prioritário de atenção primária no SUS.", v: true, e: "Verdadeiro." },
      { s: "Estudos transversais medem incidência.", v: false, e: "Falso: medem prevalência, num único momento." },
      { s: "O rastreamento do câncer do colo do útero usa o exame citopatológico ou o teste de DNA-HPV.", v: true, e: "Verdadeiro. O Brasil está incorporando o teste de DNA-HPV." },
      { s: "Equidade significa tratar todos exatamente da mesma forma.", v: false, e: "Falso: é oferecer mais a quem precisa mais." },
      { s: "Num estudo de coorte é possível calcular o risco relativo.", v: true, e: "Verdadeiro: a coorte mede incidência em expostos e não expostos." }
    ],
    pairs: [
      ["Coorte", "Risco relativo"],
      ["Caso-controle", "Odds ratio"],
      ["Estudo transversal", "Prevalência"],
      ["Ensaio clínico", "Intervenção randomizada"],
      ["Sensibilidade", "Verdadeiros positivos"],
      ["Especificidade", "Verdadeiros negativos"]
    ],
    seq: [
      { t: "Força da evidência (da menor para a maior)", items: ["Opinião de especialista", "Relato ou série de casos", "Estudo caso-controle", "Estudo de coorte", "Ensaio clínico randomizado", "Revisão sistemática com metanálise"], e: "A qualidade de cada estudo também conta, não só o desenho." }
    ],
    cases: [{
      title: "O novo teste rápido",
      story: "Um teste novo foi aplicado em 100 doentes (90 deram positivo) e em 100 pessoas sadias (80 deram negativo).",
      steps: [
        { q: "Qual é a sensibilidade?", o: ["80%", "90%", "85%", "10%"], a: 1, e: "90 verdadeiros positivos ÷ 100 doentes = 90%." },
        { q: "Qual é a especificidade?", o: ["20%", "80%", "90%", "70%"], a: 1, e: "80 verdadeiros negativos ÷ 100 sadios = 80%." },
        { q: "Se o teste for usado numa população em que a doença é rara, o valor preditivo positivo:", o: ["Aumenta", "Diminui", "Não muda", "Vira 100%"], a: 1, e: "Com prevalência baixa, boa parte dos positivos será falso positivo." }
      ]
    }]
  },
  {
    id: "semio", cycle: "clinico", name: "Semiologia", icon: "👂", color: "#2563eb",
    desc: "Anamnese, exame físico e sinais.",
    flashcards: [
      { f: "Ordem do exame físico do abdome", b: "Inspeção, ausculta, percussão e palpação (ausculta antes de palpar)." },
      { f: "Localização normal do ictus cordis", b: "5º espaço intercostal esquerdo, na linha hemiclavicular." },
      { f: "Frêmito toracovocal aumentado indica…", b: "Consolidação pulmonar (ex.: pneumonia)." },
      { f: "Sinal de Giordano", b: "Dor à punho-percussão lombar. Sugere pielonefrite ou litíase." },
      { f: "Sinal de Rovsing", b: "Dor na fossa ilíaca direita ao comprimir a esquerda. Sugere apendicite." },
      { f: "Estertores crepitantes", b: "Indicam líquido nos alvéolos (pneumonia, congestão pulmonar)." },
      { f: "Sibilos", b: "Indicam estreitamento das vias aéreas (asma, DPOC)." },
      { f: "Edema que deixa uma depressão ao ser pressionado", b: "Sinal de Godet (cacifo)." }
    ],
    quiz: [
      { q: "Parte da anamnese que descreve início, duração e evolução dos sintomas:", o: ["Queixa principal", "História da doença atual", "Antecedentes familiares", "Hábitos de vida"], a: 1, e: "A HDA detalha a queixa, em ordem cronológica." },
      { q: "Macicez móvel à percussão abdominal indica:", o: ["Gases", "Ascite", "Hepatomegalia", "Globo vesical"], a: 1, e: "O líquido se desloca com a mudança de decúbito." },
      { q: "Pulso paradoxal (queda da PAS > 10 mmHg na inspiração) sugere:", o: ["Estenose aórtica", "Tamponamento cardíaco", "Insuficiência aórtica", "Hipertireoidismo"], a: 1, e: "Também ocorre na asma grave." },
      { q: "O baqueteamento digital está associado a:", o: ["Asma leve", "Doenças pulmonares crônicas e cardiopatias cianóticas", "Anemia ferropriva", "Gota"], a: 1, e: "Ex.: bronquiectasias, câncer de pulmão e fibrose pulmonar." },
      { q: "Hepatimetria normal na linha hemiclavicular direita:", o: ["2 a 4 cm", "6 a 12 cm", "15 a 20 cm", "Acima de 20 cm"], a: 1, e: "Valores acima sugerem hepatomegalia." },
      { q: "A Escala de Coma de Glasgow avalia:", o: ["Força, sensibilidade e reflexos", "Abertura ocular, resposta verbal e resposta motora", "Pupilas, PA e FC", "Memória e atenção"], a: 1, e: "A versão atual inclui também a reatividade pupilar (Glasgow-P)." }
    ],
    tf: [
      { s: "A ausência de ruídos hidroaéreos pode indicar íleo paralítico.", v: true, e: "Verdadeiro." },
      { s: "O sinal de Murphy é pesquisado na fossa ilíaca direita.", v: false, e: "Falso: é pesquisado no hipocôndrio direito." },
      { s: "Na DPOC com enfisema, o tórax pode ficar em tonel.", v: true, e: "Verdadeiro: o diâmetro anteroposterior aumenta." },
      { s: "Os estertores crepitantes são mais audíveis no fim da inspiração.", v: true, e: "Verdadeiro." },
      { s: "No derrame pleural, o frêmito toracovocal fica aumentado.", v: false, e: "Falso: fica diminuído ou abolido." },
      { s: "A icterícia costuma aparecer primeiro nas escleras.", v: true, e: "Verdadeiro: com bilirrubina acima de cerca de 2,5 a 3 mg/dL." }
    ],
    pairs: [
      ["Sinal de Murphy", "Colecistite"],
      ["Sinal de Blumberg", "Peritonite"],
      ["Sinal de Giordano", "Pielonefrite"],
      ["Sinal de Rovsing", "Apendicite"],
      ["Sinal de Kernig", "Meningite"],
      ["Sinal de Godet", "Edema com cacifo"]
    ],
    seq: [
      { t: "Etapas da anamnese", items: ["Identificação", "Queixa principal", "História da doença atual", "Interrogatório sintomatológico", "Antecedentes pessoais", "Antecedentes familiares", "Hábitos de vida"], e: "A ordem pode variar um pouco conforme o livro, mas a HDA sempre vem logo após a queixa." },
      { t: "Exame físico do abdome", items: ["Inspeção", "Ausculta", "Percussão", "Palpação"], e: "Auscultar antes de palpar evita alterar os ruídos intestinais." }
    ],
    cases: [{
      title: "Dor no flanco",
      story: "Mulher de 28 anos com febre de 39 °C, ardência ao urinar e dor lombar à direita.",
      steps: [
        { q: "Como se pesquisa o sinal de Giordano?", o: ["Palpação profunda do hipocôndrio", "Punho-percussão da região lombar", "Descompressão brusca do abdome", "Flexão do pescoço"], a: 1, e: "É positivo quando a percussão causa dor." },
        { q: "Giordano positivo. Qual é a principal hipótese?", o: ["Cistite simples", "Pielonefrite aguda", "Apendicite", "Lombalgia mecânica"], a: 1, e: "Febre, sintomas urinários e dor lombar." },
        { q: "Quais exames iniciais pedir?", o: ["Tomografia de crânio", "Urina tipo 1 e urocultura", "Endoscopia", "Eletrocardiograma"], a: 1, e: "A urocultura orienta o ajuste do antibiótico." }
      ]
    }]
  },
  {
    id: "gastro", cycle: "clinico", name: "Gastroenterologia", icon: "🍽️", color: "#d97706",
    desc: "Tubo digestivo, fígado e pâncreas.",
    flashcards: [
      { f: "Causa mais comum de hemorragia digestiva alta", b: "Doença ulcerosa péptica." },
      { f: "Sinais de Cullen e Grey-Turner", b: "Equimoses periumbilical e em flancos: hemorragia retroperitoneal (ex.: pancreatite grave)." },
      { f: "Causas mais comuns de pancreatite aguda", b: "Litíase biliar e álcool." },
      { f: "Tríade de Charcot", b: "Febre, icterícia e dor no hipocôndrio direito: colangite." },
      { f: "Enzimas de lesão hepatocelular e de colestase", b: "Lesão: ALT e AST. Colestase: fosfatase alcalina e GGT." },
      { f: "Anticorpo de rastreio da doença celíaca", b: "Antitransglutaminase IgA (com dosagem de IgA total)." },
      { f: "Doença inflamatória transmural, com lesões salteadas", b: "Doença de Crohn." },
      { f: "Retocolite ulcerativa", b: "Inflamação contínua da mucosa, que começa no reto." }
    ],
    quiz: [
      { q: "Esquema clássico de erradicação do H. pylori:", o: ["IBP isolado", "IBP + amoxicilina + claritromicina", "Antiácido + sucralfato", "Ranitidina + metronidazol"], a: 1, e: "Geralmente por 14 dias." },
      { q: "Cirrótico com ascite, febre e dor abdominal. Paracentese com ≥ 250 neutrófilos/mm³:", o: ["Peritonite secundária", "Peritonite bacteriana espontânea", "Síndrome hepatorrenal", "Ascite pancreática"], a: 1, e: "Tratar com cefalosporina de 3ª geração e albumina." },
      { q: "Tratamento inicial da encefalopatia hepática:", o: ["Lactulose", "Benzodiazepínico", "Dieta sem proteína", "Furosemida"], a: 0, e: "Rifaximina pode ser associada. Sempre buscar o fator desencadeante." },
      { q: "Relação AST/ALT acima de 2 sugere:", o: ["Hepatite viral aguda", "Hepatopatia alcoólica", "Colestase", "Esteatose não alcoólica"], a: 1, e: "Na hepatite viral, geralmente predomina a ALT." },
      { q: "Droga vasoativa na hemorragia por varizes esofágicas:", o: ["Omeprazol", "Terlipressina ou octreotide", "Noradrenalina", "Propranolol IV"], a: 1, e: "Deve ser iniciada antes da endoscopia." },
      { q: "Exame inicial para diagnosticar colelitíase:", o: ["Ultrassonografia de abdome", "Raio-X simples", "Endoscopia digestiva alta", "Colonoscopia"], a: 0, e: "É sensível, barato e não usa radiação." }
    ],
    tf: [
      { s: "Na pancreatite aguda, a lipase é mais específica que a amilase.", v: true, e: "Verdadeiro." },
      { s: "O tabagismo é fator de proteção na retocolite ulcerativa.", v: true, e: "Verdadeiro (mas piora a doença de Crohn)." },
      { s: "A hepatite A evolui com frequência para hepatite crônica.", v: false, e: "Falso: a hepatite A não cronifica." },
      { s: "Melena geralmente indica sangramento digestivo alto.", v: true, e: "Verdadeiro: é o sangue digerido." },
      { s: "A doença celíaca é desencadeada pelo glúten.", v: true, e: "Verdadeiro: o tratamento é a dieta sem glúten por toda a vida." },
      { s: "Na cirrose, a albumina sérica costuma estar aumentada.", v: false, e: "Falso: cai por menor síntese hepática." }
    ],
    pairs: [
      ["Doença de Crohn", "Lesões transmurais salteadas"],
      ["Retocolite ulcerativa", "Inflamação contínua desde o reto"],
      ["Doença celíaca", "Antitransglutaminase"],
      ["Colangite", "Tríade de Charcot"],
      ["Pancreatite aguda", "Lipase elevada"],
      ["Peritonite bacteriana espontânea", "Neutrófilos ≥ 250 na ascite"]
    ],
    seq: [
      { t: "Trajeto do alimento", items: ["Boca", "Esôfago", "Estômago", "Duodeno", "Jejuno", "Íleo", "Cólon", "Reto"], e: "A vitamina B12 e os sais biliares são absorvidos no íleo terminal." }
    ],
    cases: [{
      title: "Vômito com sangue",
      story: "Homem de 55 anos, etilista e cirrótico, com hematêmese volumosa. PA 85x50 mmHg, FC 120 bpm.",
      steps: [
        { q: "Qual é a causa mais provável do sangramento?", o: ["Úlcera péptica", "Varizes esofágicas", "Síndrome de Mallory-Weiss", "Câncer gástrico"], a: 1, e: "Em cirróticos com sangramento volumoso, pensar primeiro em varizes." },
        { q: "Qual é a prioridade inicial?", o: ["Endoscopia imediata, antes de tudo", "Estabilizar: via aérea, acessos venosos e reposição volêmica", "Alta com omeprazol", "Tomografia de abdome"], a: 1, e: "Primeiro o ABC. Evitar transfusão excessiva (alvo de Hb em torno de 7 a 8 g/dL)." },
        { q: "Que medicamentos iniciar antes da endoscopia?", o: ["Apenas analgésico", "Droga vasoativa + antibiótico profilático", "Anticoagulante", "Corticoide"], a: 1, e: "Terlipressina ou octreotide, e ceftriaxona como profilaxia." },
        { q: "Qual é o tratamento endoscópico de escolha?", o: ["Ligadura elástica", "Biópsia", "Dilatação", "Gastrostomia"], a: 0, e: "A ligadura é a primeira escolha para varizes esofágicas." }
      ]
    }]
  },
  {
    id: "nefro", cycle: "clinico", name: "Nefrologia", icon: "🫘", color: "#fb7185",
    desc: "Rins, eletrólitos e glomerulopatias.",
    flashcards: [
      { f: "Definição de lesão renal aguda (KDIGO)", b: "Creatinina sobe ≥ 0,3 mg/dL em 48 h ou ≥ 1,5 vez em 7 dias, ou diurese < 0,5 mL/kg/h por 6 h." },
      { f: "Síndrome nefrótica", b: "Proteinúria > 3,5 g/24 h, hipoalbuminemia, edema e dislipidemia." },
      { f: "Síndrome nefrítica", b: "Hematúria, hipertensão, edema e oligúria." },
      { f: "Causa mais comum de síndrome nefrótica em crianças", b: "Doença de lesões mínimas." },
      { f: "Principais causas de doença renal crônica", b: "Diabetes e hipertensão." },
      { f: "Glomerulonefrite pós-estreptocócica", b: "Síndrome nefrítica 1 a 3 semanas após faringite (ou 3 a 6 após impetigo), com C3 baixo." },
      { f: "Cilindros hemáticos na urina indicam…", b: "Glomerulonefrite." },
      { f: "Fármacos que retardam a doença renal crônica com proteinúria", b: "IECA ou BRA, e iSGLT2." }
    ],
    quiz: [
      { q: "Hipercalemia com alteração no ECG. Primeira medida:", o: ["Furosemida", "Gluconato de cálcio IV", "Resina de troca oral", "Hemodiálise imediata"], a: 1, e: "Estabiliza a membrana do miocárdio. Depois, insulina com glicose e beta-2 agonista." },
      { q: "Fração de excreção de sódio típica da lesão renal pré-renal:", o: ["< 1%", "> 2%", "> 5%", "Sempre 0%"], a: 0, e: "O rim está preservado e retém sódio." },
      { q: "Qual destas é indicação de diálise de urgência?", o: ["Creatinina de 2,0 mg/dL", "Pericardite urêmica", "Ureia de 60 mg/dL", "Hematúria"], a: 1, e: "Outras: hipercalemia ou acidose refratárias, hipervolemia refratária e encefalopatia urêmica." },
      { q: "Tipo mais comum de cálculo renal:", o: ["Ácido úrico", "Oxalato de cálcio", "Estruvita", "Cistina"], a: 1, e: "Hidratação é a principal prevenção." },
      { q: "Doença renal crônica com TFG entre 15 e 29 mL/min:", o: ["G2", "G3a", "G4", "G5"], a: 2, e: "G5 corresponde a TFG < 15 mL/min." },
      { q: "Exemplo de acidose metabólica com ânion gap aumentado:", o: ["Diarreia", "Cetoacidose diabética", "Acidose tubular renal", "Infusão de soro fisiológico"], a: 1, e: "Mnemônico MUDPILES: metanol, uremia, cetoacidose, ... A diarreia causa ânion gap normal." }
    ],
    tf: [
      { s: "A creatinina sobe logo nas primeiras pequenas perdas de função renal.", v: false, e: "Falso: pode ser preciso perder grande parte da função antes de ela subir." },
      { s: "AINEs podem causar lesão renal aguda.", v: true, e: "Verdadeiro, sobretudo em idosos e desidratados." },
      { s: "A doença renal crônica causa anemia por falta de eritropoetina.", v: true, e: "Verdadeiro." },
      { s: "Na síndrome nefrótica, o risco de trombose é maior.", v: true, e: "Verdadeiro: há perda de anticoagulantes naturais na urina." },
      { s: "Na lesão renal pré-renal, o sódio urinário costuma ser alto.", v: false, e: "Falso: costuma ser baixo (< 20 mEq/L)." },
      { s: "A hiponatremia crônica grave pode ser corrigida rapidamente, sem limite.", v: false, e: "Falso: corrigir rápido demais causa desmielinização osmótica." }
    ],
    pairs: [
      ["Síndrome nefrótica", "Proteinúria > 3,5 g/dia"],
      ["Síndrome nefrítica", "Hematúria e hipertensão"],
      ["Lesões mínimas", "Nefrótica em crianças"],
      ["Pós-estreptocócica", "C3 baixo"],
      ["Lesão pré-renal", "Fração de excreção de sódio < 1%"],
      ["Necrose tubular aguda", "Cilindros granulosos"]
    ],
    seq: [
      { t: "Sistema renina-angiotensina-aldosterona", items: ["Queda da perfusão renal", "Liberação de renina", "Angiotensinogênio vira angiotensina I", "A ECA converte em angiotensina II", "Liberação de aldosterona", "Reabsorção de sódio e água"], e: "A angiotensina II também causa vasoconstrição e estimula a sede." }
    ],
    cases: [{
      title: "Urina cor de coca-cola",
      story: "Criança de 8 anos com urina escura, edema nas pálpebras e PA elevada, 2 semanas depois de uma faringite.",
      steps: [
        { q: "Qual síndrome renal?", o: ["Nefrótica", "Nefrítica", "Infecção urinária", "Lesão pré-renal"], a: 1, e: "Hematúria, edema e hipertensão." },
        { q: "Qual é a causa mais provável?", o: ["Doença de lesões mínimas", "Glomerulonefrite pós-estreptocócica", "Nefropatia por IgA", "Síndrome hemolítico-urêmica"], a: 1, e: "Faringite estreptocócica algumas semanas antes." },
        { q: "Como fica o complemento?", o: ["C3 normal", "C3 baixo, normalizando em até 8 semanas", "C3 alto", "C4 isolado muito alto"], a: 1, e: "Se o C3 continuar baixo depois de 8 semanas, investigar outra glomerulopatia." }
      ]
    }]
  },
  {
    id: "hemato", cycle: "clinico", name: "Hematologia", icon: "🩸", color: "#dc2626",
    desc: "Anemias, coagulação e neoplasias.",
    flashcards: [
      { f: "Anemia mais comum no mundo", b: "Anemia ferropriva." },
      { f: "O que indica a ferritina baixa?", b: "Deficiência de ferro (estoques baixos)." },
      { f: "Anemia macrocítica com alterações neurológicas", b: "Deficiência de vitamina B12." },
      { f: "Hemácias em forma de foice", b: "Anemia falciforme (hemoglobina S)." },
      { f: "O que avalia o tempo de protrombina (TP/INR)?", b: "A via extrínseca (fator VII). Usado para monitorar a varfarina." },
      { f: "O que avalia o TTPa?", b: "A via intrínseca. Usado para monitorar a heparina não fracionada." },
      { f: "Púrpura trombocitopênica imune", b: "Plaquetopenia isolada, de causa autoimune, com petéquias." },
      { f: "Febre, sudorese noturna e perda de peso com linfonodos aumentados", b: "Sintomas B: pensar em linfoma." }
    ],
    quiz: [
      { q: "Ferro sérico baixo, ferritina alta e transferrina baixa sugerem:", o: ["Anemia ferropriva", "Anemia de doença crônica", "Talassemia", "Deficiência de B12"], a: 1, e: "O ferro fica preso nos estoques pela inflamação (hepcidina)." },
      { q: "Bastonetes de Auer no sangue periférico indicam:", o: ["Leucemia linfoide aguda", "Leucemia mieloide aguda", "Mieloma", "Anemia aplástica"], a: 1, e: "São típicos da linhagem mieloide." },
      { q: "Leucemia mais comum na infância:", o: ["Leucemia mieloide crônica", "Leucemia linfoblástica aguda", "Leucemia linfoide crônica", "Leucemia mieloide aguda"], a: 1, e: "Tem bom prognóstico com tratamento." },
      { q: "A hemofilia A é a deficiência do:", o: ["Fator VII", "Fator VIII", "Fator IX", "Fator de von Willebrand"], a: 1, e: "A hemofilia B é a deficiência do fator IX." },
      { q: "Base do tratamento da crise vaso-oclusiva na anemia falciforme:", o: ["Transfusão de rotina", "Analgesia, hidratação e O₂ se houver hipoxemia", "Antibiótico apenas", "Anticoagulação"], a: 1, e: "A analgesia deve ser rápida e adequada, incluindo opioides se necessário." },
      { q: "Esquizócitos, plaquetopenia, febre, alteração neurológica e piora renal:", o: ["Púrpura trombocitopênica imune", "Púrpura trombocitopênica trombótica", "Hemofilia", "Anemia ferropriva"], a: 1, e: "É emergência: plasmaférese." }
    ],
    tf: [
      { s: "A anemia ferropriva é microcítica e hipocrômica.", v: true, e: "Verdadeiro." },
      { s: "O ácido fólico corrige as alterações neurológicas da falta de B12.", v: false, e: "Falso: pode corrigir a anemia e mascarar a lesão neurológica, que continua." },
      { s: "Na hemofilia, o TTPa está prolongado.", v: true, e: "Verdadeiro; o TP é normal." },
      { s: "O mieloma múltiplo pode causar hipercalcemia e lesões ósseas líticas.", v: true, e: "Verdadeiro: mnemônico CRAB (cálcio, rim, anemia, ossos)." },
      { s: "Na anemia hemolítica, a bilirrubina indireta costuma estar baixa.", v: false, e: "Falso: costuma estar alta, junto com LDH alto e haptoglobina baixa." },
      { s: "A heparina pode causar plaquetopenia induzida (HIT).", v: true, e: "Verdadeiro: paradoxalmente aumenta o risco de trombose." }
    ],
    pairs: [
      ["Anemia ferropriva", "Ferritina baixa"],
      ["Anemia falciforme", "Hemoglobina S"],
      ["Hemofilia A", "Fator VIII"],
      ["Leucemia mieloide aguda", "Bastonetes de Auer"],
      ["Mieloma múltiplo", "Pico monoclonal"],
      ["Linfoma de Hodgkin", "Célula de Reed-Sternberg"]
    ],
    seq: [
      { t: "Hemostasia", items: ["Lesão do vaso", "Vasoconstrição", "Adesão plaquetária (fator de von Willebrand)", "Agregação plaquetária (tampão primário)", "Cascata de coagulação", "Formação de fibrina (tampão secundário)"], e: "Depois, a fibrinólise remove o coágulo." }
    ],
    cases: [{
      title: "Cansaço e unhas em colher",
      story: "Mulher de 32 anos com menstruação muito abundante, cansaço, palidez e unhas em colher. Hb 8 g/dL, VCM 70 fL.",
      steps: [
        { q: "Como se classifica essa anemia?", o: ["Macrocítica", "Microcítica e hipocrômica", "Normocítica", "Hemolítica"], a: 1, e: "VCM baixo (< 80 fL)." },
        { q: "Qual exame confirma a falta de ferro?", o: ["Ferritina", "Vitamina B12", "Eletroforese de hemoglobina", "Coombs direto"], a: 0, e: "Ferritina baixa confirma estoques reduzidos." },
        { q: "Qual é a conduta?", o: ["Apenas transfusão", "Repor ferro e investigar e tratar a causa do sangramento", "Vitamina B12 IM", "Corticoide"], a: 1, e: "Tratar só a anemia, sem a causa, leva à recidiva." }
      ]
    }]
  },
  {
    id: "reumato", cycle: "clinico", name: "Reumatologia", icon: "🤲", color: "#ca8a04",
    desc: "Artrites, lúpus e autoanticorpos.",
    flashcards: [
      { f: "Autoanticorpos mais específicos do lúpus", b: "Anti-DNA dupla hélice e anti-Sm." },
      { f: "Autoanticorpo mais sensível para lúpus", b: "FAN (fator antinuclear)." },
      { f: "Padrão típico da artrite reumatoide", b: "Poliartrite simétrica das pequenas articulações das mãos, com rigidez matinal maior que 1 h." },
      { f: "Autoanticorpo mais específico da artrite reumatoide", b: "Anti-CCP." },
      { f: "Cristais da gota", b: "Monourato de sódio: em agulha, com birrefringência negativa." },
      { f: "Cristais da pseudogota", b: "Pirofosfato de cálcio: romboides, com birrefringência positiva fraca." },
      { f: "Associação genética da espondilite anquilosante", b: "HLA-B27." },
      { f: "Primeira escolha de DMARD na artrite reumatoide", b: "Metotrexato." }
    ],
    quiz: [
      { q: "Articulação mais típica da primeira crise de gota:", o: ["Joelho", "Metatarsofalângica do hálux", "Ombro", "Quadril"], a: 1, e: "É a podagra." },
      { q: "Fármaco para reduzir o ácido úrico a longo prazo:", o: ["Colchicina", "Alopurinol", "Prednisona", "Ibuprofeno"], a: 1, e: "Não deve ser iniciado no meio da crise. Se o paciente já usa, mantém." },
      { q: "Autoanticorpo do lúpus induzido por drogas:", o: ["Anti-Sm", "Anti-histona", "Anti-CCP", "Anticentrômero"], a: 1, e: "Ex.: hidralazina, procainamida e isoniazida." },
      { q: "Artrite após uretrite ou diarreia, com conjuntivite:", o: ["Artrite séptica", "Artrite reativa", "Gota", "Osteoartrite"], a: 1, e: "É uma espondiloartrite, associada ao HLA-B27." },
      { q: "Autoanticorpo da esclerose sistêmica limitada (CREST):", o: ["Anticentrômero", "Anti-Scl-70", "Anti-Ro", "Anti-Jo-1"], a: 0, e: "O anti-Scl-70 é da forma difusa." },
      { q: "Arterite de células gigantes com cefaleia e alteração visual. Conduta urgente:", o: ["Aguardar a biópsia", "Corticoide em dose alta imediatamente", "Apenas analgésico", "AAS isolado"], a: 1, e: "Há risco de cegueira irreversível: não atrasar o corticoide." }
    ],
    tf: [
      { s: "A osteoartrite causa rigidez matinal prolongada, maior que 1 hora.", v: false, e: "Falso: a rigidez é curta (menos de 30 min). A prolongada sugere artrite inflamatória." },
      { s: "O lúpus é mais comum em mulheres jovens.", v: true, e: "Verdadeiro." },
      { s: "A hidroxicloroquina é usada no tratamento do lúpus.", v: true, e: "Verdadeiro: é indicada para quase todos os pacientes." },
      { s: "Na crise aguda de gota, deve-se iniciar alopurinol para aliviar a dor.", v: false, e: "Falso: a crise se trata com AINE, colchicina ou corticoide." },
      { s: "A espondilite anquilosante causa lombalgia inflamatória que melhora com exercício.", v: true, e: "Verdadeiro, e piora com o repouso." },
      { s: "Nódulos de Heberden aparecem nas interfalangianas distais na osteoartrite.", v: true, e: "Verdadeiro. Os de Bouchard ficam nas interfalangianas proximais." }
    ],
    pairs: [
      ["Artrite reumatoide", "Anti-CCP"],
      ["Lúpus", "Anti-DNA dupla hélice"],
      ["Lúpus induzido por drogas", "Anti-histona"],
      ["CREST", "Anticentrômero"],
      ["Espondilite anquilosante", "HLA-B27"],
      ["Gota", "Monourato de sódio"]
    ],
    seq: [
      { t: "Cuidado do paciente com gota", items: ["Confirmar os cristais na punção articular", "Tratar a crise (AINE, colchicina ou corticoide)", "Orientar dieta e reduzir o álcool", "Iniciar hipouricemiante, se indicado", "Manter ácido úrico abaixo de 6 mg/dL"], e: "Ao iniciar o hipouricemiante, faz-se profilaxia de novas crises (ex.: colchicina)." }
    ],
    cases: [{
      title: "Mãos rígidas pela manhã",
      story: "Mulher de 45 anos com dor e inchaço em punhos e nas articulações dos dedos das duas mãos há 4 meses, com rigidez matinal de 2 horas.",
      steps: [
        { q: "Qual é a principal hipótese?", o: ["Osteoartrite", "Artrite reumatoide", "Gota", "Fibromialgia"], a: 1, e: "Poliartrite simétrica de pequenas articulações, com rigidez prolongada." },
        { q: "Qual autoanticorpo é o mais específico?", o: ["FAN", "Anti-CCP", "Anti-DNA", "ANCA"], a: 1, e: "O fator reumatoide é menos específico." },
        { q: "Qual é o tratamento de base inicial?", o: ["Apenas AINE", "Metotrexato", "Alopurinol", "Antibiótico"], a: 1, e: "Corticoide em dose baixa pode ser usado como ponte." }
      ]
    }]
  },
  {
    id: "psiq", cycle: "clinico", name: "Psiquiatria", icon: "💭", color: "#7c3aed",
    desc: "Humor, psicoses e dependências.",
    flashcards: [
      { f: "Tempo mínimo de sintomas para um episódio depressivo maior", b: "2 semanas, na maior parte dos dias." },
      { f: "Sintomas centrais da depressão", b: "Humor deprimido e/ou anedonia (perda do prazer)." },
      { f: "Primeira linha de medicamento na depressão", b: "ISRS (ex.: sertralina, fluoxetina, escitalopram)." },
      { f: "Estabilizador de humor clássico no transtorno bipolar", b: "Lítio." },
      { f: "Febre, rigidez muscular e CPK alta após antipsicótico", b: "Síndrome neuroléptica maligna." },
      { f: "Sintomas positivos da esquizofrenia", b: "Delírios, alucinações, discurso e comportamento desorganizados." },
      { f: "Tratamento da abstinência alcoólica", b: "Benzodiazepínico + tiamina." },
      { f: "Síndrome serotoninérgica", b: "Agitação, hipertermia, clônus e hiperreflexia, e diarreia, após drogas serotoninérgicas." }
    ],
    quiz: [
      { q: "Paciente com ideação suicida, plano e acesso a meios:", o: ["Alta com retorno em 1 mês", "Avaliação de risco e proteção imediata, com internação se o risco for alto", "Apenas iniciar antidepressivo", "Ignorar, pois quem fala não faz"], a: 1, e: "Restringir o acesso aos meios e não deixar o paciente sozinho." },
      { q: "Classe de antidepressivo que frequentemente causa disfunção sexual:", o: ["ISRS", "Bupropiona", "Mirtazapina", "Agomelatina"], a: 0, e: "A bupropiona causa pouca disfunção sexual." },
      { q: "O que monitorar em quem usa lítio?", o: ["Apenas a glicemia", "Nível sérico, função renal e tireoide", "Apenas o hemograma", "Nada"], a: 1, e: "A janela terapêutica é estreita." },
      { q: "Efeito adverso da clozapina que exige hemograma seriado:", o: ["Hepatite", "Agranulocitose", "Hipercalemia", "Pancreatite"], a: 1, e: "É indicada na esquizofrenia resistente a outros antipsicóticos." },
      { q: "Tratamento de longo prazo do transtorno de pânico:", o: ["Benzodiazepínico isolado por anos", "ISRS + terapia cognitivo-comportamental", "Antipsicótico", "Lítio"], a: 1, e: "O benzodiazepínico serve, no máximo, como ponte no início." },
      { q: "O delirium se caracteriza por:", o: ["Perda de memória lenta e progressiva", "Alteração aguda e flutuante da atenção e da consciência", "Humor deprimido por 2 semanas", "Delírios sem alteração da consciência"], a: 1, e: "Sempre buscar a causa orgânica (infecção, fármacos, distúrbios metabólicos)." }
    ],
    tf: [
      { s: "O delirium tem início agudo e curso flutuante.", v: true, e: "Verdadeiro, ao contrário da demência." },
      { s: "Benzodiazepínicos são a primeira linha para tratar ansiedade generalizada a longo prazo.", v: false, e: "Falso: a primeira linha são ISRS ou IRSN e psicoterapia." },
      { s: "Perguntar sobre suicídio aumenta o risco de suicídio.", v: false, e: "Falso: perguntar com acolhimento ajuda a identificar o risco e proteger o paciente." },
      { s: "O lítio tem janela terapêutica estreita.", v: true, e: "Verdadeiro." },
      { s: "Antipsicóticos típicos causam mais efeitos extrapiramidais que os atípicos.", v: true, e: "Verdadeiro (ex.: haloperidol)." },
      { s: "No transtorno bipolar, antidepressivo sem estabilizador pode desencadear mania.", v: true, e: "Verdadeiro." }
    ],
    pairs: [
      ["Lítio", "Transtorno bipolar"],
      ["Clozapina", "Agranulocitose"],
      ["Haloperidol", "Efeitos extrapiramidais"],
      ["Sertralina", "ISRS"],
      ["Tiamina", "Encefalopatia de Wernicke"],
      ["Naltrexona", "Dependência de álcool"]
    ],
    seq: [
      { t: "Abstinência alcoólica: linha do tempo", items: ["Tremores e ansiedade (6–12 h)", "Alucinose alcoólica (12–24 h)", "Convulsões (24–48 h)", "Delirium tremens (48–72 h)"], e: "O delirium tremens é uma emergência, com mortalidade relevante sem tratamento." }
    ],
    cases: [{
      title: "Tristeza há um mês",
      story: "Mulher de 30 anos com tristeza, perda de interesse, insônia, falta de apetite e culpa há 5 semanas. Nunca teve episódios de euforia. Nega planos suicidas.",
      steps: [
        { q: "Qual é o diagnóstico mais provável?", o: ["Luto normal", "Episódio depressivo maior", "Transtorno bipolar", "Esquizofrenia"], a: 1, e: "Mais de 2 semanas com humor deprimido, anedonia e outros sintomas." },
        { q: "O que é essencial investigar antes de tratar?", o: ["Tipo sanguíneo", "Episódios prévios de mania ou hipomania e risco de suicídio", "Apenas a função renal", "Nada"], a: 1, e: "Um bipolar tratado só com antidepressivo pode virar para mania." },
        { q: "Qual é o tratamento inicial?", o: ["Benzodiazepínico isolado", "ISRS + psicoterapia", "Antipsicótico", "Lítio"], a: 1, e: "Reavaliar a resposta em 4 a 6 semanas." }
      ]
    }]
  },
  {
    id: "go", cycle: "clinico", name: "Ginecologia e Obstetrícia", icon: "🤰", color: "#e879f9",
    desc: "Pré-natal, parto e saúde da mulher.",
    flashcards: [
      { f: "Regra de Naegele (data provável do parto)", b: "Data da última menstruação + 7 dias − 3 meses (e + 1 ano)." },
      { f: "Quando usar ácido fólico na gestação?", b: "Desde pelo menos 30 dias antes da concepção até o fim do 1º trimestre." },
      { f: "Pré-eclâmpsia", b: "PA ≥ 140/90 após 20 semanas, com proteinúria ou lesão de órgão-alvo." },
      { f: "Fármaco que previne e trata a eclâmpsia", b: "Sulfato de magnésio." },
      { f: "Tríade da gravidez ectópica", b: "Atraso menstrual, dor abdominal e sangramento vaginal." },
      { f: "Sangramento indolor, vermelho vivo, no 3º trimestre", b: "Placenta prévia." },
      { f: "Sangramento com dor, útero endurecido e sofrimento fetal", b: "Descolamento prematuro de placenta." },
      { f: "Uterotônico de primeira linha na hemorragia pós-parto", b: "Ocitocina." }
    ],
    quiz: [
      { q: "Antídoto do sulfato de magnésio:", o: ["Naloxona", "Gluconato de cálcio", "Flumazenil", "Protamina"], a: 1, e: "Sinais de intoxicação: perda do reflexo patelar e depressão respiratória." },
      { q: "O toque vaginal é contraindicado até que se exclua:", o: ["Infecção urinária", "Placenta prévia", "Diabetes gestacional", "Anemia"], a: 1, e: "O toque pode provocar hemorragia grave." },
      { q: "Glicemia de jejum que diagnostica diabetes gestacional:", o: ["70 a 91 mg/dL", "92 a 125 mg/dL", "≥ 200 mg/dL", "Qualquer valor acima de 80"], a: 1, e: "≥ 126 mg/dL na gestação indica diabetes prévio (overt)." },
      { q: "Anti-hipertensivo seguro na gestação:", o: ["Captopril", "Losartana", "Metildopa", "Espironolactona"], a: 2, e: "Nifedipino e labetalol também podem ser usados. IECA e BRA são contraindicados." },
      { q: "Critérios de Rotterdam para síndrome dos ovários policísticos:", o: ["3 de 3 obrigatórios", "2 de 3: anovulação, hiperandrogenismo e ovários policísticos ao ultrassom", "Apenas ultrassom", "Apenas LH alto"], a: 1, e: "Excluídas outras causas de hiperandrogenismo." },
      { q: "Principal causa de hemorragia pós-parto:", o: ["Atonia uterina", "Laceração de trajeto", "Retenção placentária", "Coagulopatia"], a: 0, e: "Mnemônico dos 4 Ts: tônus, trauma, tecido e trombina." }
    ],
    tf: [
      { s: "IECA são contraindicados na gestação.", v: true, e: "Verdadeiro: são teratogênicos e tóxicos para o rim fetal." },
      { s: "A placenta prévia costuma causar sangramento doloroso.", v: false, e: "Falso: o sangramento é tipicamente indolor." },
      { s: "O ácido fólico ajuda a prevenir defeitos do tubo neural.", v: true, e: "Verdadeiro." },
      { s: "A atonia uterina é a principal causa de hemorragia pós-parto.", v: true, e: "Verdadeiro." },
      { s: "A vacina dTpa é recomendada em toda gestação.", v: true, e: "Verdadeiro: protege o bebê contra a coqueluche." },
      { s: "O beta-hCG não ajuda no diagnóstico de gravidez ectópica.", v: false, e: "Falso: beta-hCG seriado junto com o ultrassom transvaginal é fundamental." }
    ],
    pairs: [
      ["Pré-eclâmpsia", "Sulfato de magnésio"],
      ["Placenta prévia", "Sangramento indolor"],
      ["Descolamento de placenta", "Dor e hipertonia uterina"],
      ["Atonia uterina", "Ocitocina"],
      ["Gravidez ectópica", "Atraso, dor e sangramento"],
      ["Ovários policísticos", "Critérios de Rotterdam"]
    ],
    seq: [
      { t: "Mecanismo do parto (apresentação cefálica)", items: ["Insinuação", "Descida", "Rotação interna", "Desprendimento da cabeça", "Rotação externa", "Desprendimento dos ombros"], e: "A flexão da cabeça acompanha a insinuação e a descida." }
    ],
    cases: [{
      title: "Gestante com dor de cabeça",
      story: "Gestante de 34 semanas com PA de 160x110 mmHg, cefaleia intensa, pontos brilhantes na visão e proteinúria.",
      steps: [
        { q: "Qual é o diagnóstico?", o: ["Hipertensão crônica", "Pré-eclâmpsia com sinais de gravidade", "Enxaqueca", "Diabetes gestacional"], a: 1, e: "PA ≥ 160x110 e sintomas neurológicos são sinais de gravidade." },
        { q: "Como prevenir a convulsão?", o: ["Diazepam", "Sulfato de magnésio", "Fenitoína", "Nada"], a: 1, e: "O sulfato de magnésio é superior aos anticonvulsivantes comuns." },
        { q: "Qual anti-hipertensivo usar na crise?", o: ["Hidralazina IV ou nifedipino oral", "Captopril", "Losartana", "Furosemida"], a: 0, e: "Meta: baixar a PA sem quedas bruscas." },
        { q: "Qual é a conduta obstétrica definitiva?", o: ["Esperar até 40 semanas", "Interromper a gestação após estabilizar", "Alta para casa", "Repouso apenas"], a: 1, e: "Com 34 semanas e sinais de gravidade, o parto é o tratamento definitivo." }
      ]
    }]
  },
  {
    id: "cirurgia", cycle: "clinico", name: "Cirurgia", icon: "🩹", color: "#0f766e",
    desc: "Trauma, abdome agudo e cuidados cirúrgicos.",
    flashcards: [
      { f: "Primeira prioridade no atendimento ao politraumatizado", b: "XABCDE: controlar hemorragia exsanguinante e garantir via aérea com proteção da coluna cervical." },
      { f: "Classificação do choque hemorrágico no ATLS", b: "Classes I a IV, de acordo com a perda de volume." },
      { f: "Tríade letal do trauma", b: "Hipotermia, acidose e coagulopatia." },
      { f: "Abdome agudo inflamatório mais comum", b: "Apendicite aguda." },
      { f: "Sinais de irritação peritoneal", b: "Defesa, descompressão brusca dolorosa (Blumberg) e rigidez abdominal." },
      { f: "Hérnia inguinal indireta", b: "Passa pelo anel inguinal interno, lateral aos vasos epigástricos inferiores." },
      { f: "Escore clínico para apendicite", b: "Escore de Alvarado." },
      { f: "Jejum para sólidos antes de cirurgia eletiva", b: "6 a 8 horas (líquidos claros: 2 horas)." }
    ],
    quiz: [
      { q: "Paciente de trauma, hipotenso, com FAST positivo no abdome:", o: ["Tomografia antes de tudo", "Laparotomia exploradora", "Observação", "Alta"], a: 1, e: "Instável com líquido livre: centro cirúrgico." },
      { q: "Causa mais comum de obstrução do intestino delgado em adultos:", o: ["Tumor", "Bridas (aderências)", "Hérnia de hiato", "Volvo de sigmoide"], a: 1, e: "Geralmente após cirurgias abdominais prévias." },
      { q: "Tratamento definitivo da colecistite aguda:", o: ["Apenas antibiótico", "Colecistectomia videolaparoscópica", "Dieta", "Endoscopia"], a: 1, e: "De preferência precoce, na mesma internação." },
      { q: "Quando fazer a antibioticoprofilaxia cirúrgica?", o: ["Até 60 minutos antes da incisão", "No dia seguinte", "Somente se houver febre", "Por 10 dias após a cirurgia"], a: 0, e: "Em geral, dose única (repetir em cirurgias longas)." },
      { q: "Regra usada para estimar a área queimada em adultos:", o: ["Regra dos nove (Wallace)", "Regra de Naegele", "CURB-65", "Glasgow"], a: 0, e: "Ex.: cada membro superior equivale a 9%." },
      { q: "Fórmula de Parkland para a reposição no queimado:", o: ["2 mL × peso × % SCQ", "4 mL × peso × % SCQ, metade nas primeiras 8 h", "10 mL/kg em bolus", "1 L de soro a cada hora"], a: 1, e: "Ajustar pela diurese (cerca de 0,5 mL/kg/h no adulto)." }
    ],
    tf: [
      { s: "Hérnia encarcerada com sinais de estrangulamento é urgência cirúrgica.", v: true, e: "Verdadeiro: há risco de necrose intestinal." },
      { s: "O FAST é usado no trauma para pesquisar líquido livre.", v: true, e: "Verdadeiro, no abdome e no pericárdio." },
      { s: "Na apendicite, a dor começa na fossa ilíaca direita e migra para o epigástrio.", v: false, e: "Falso: começa periumbilical ou epigástrica e migra para a fossa ilíaca direita." },
      { s: "Pneumoperitônio no raio-X indica perfuração de víscera oca.", v: true, e: "Verdadeiro (fora do pós-operatório recente)." },
      { s: "Em toda cirurgia limpa, o antibiótico profilático deve ser mantido por 7 dias.", v: false, e: "Falso: a profilaxia é de dose única ou de até 24 h." },
      { s: "A queimadura de 3º grau costuma ser indolor.", v: true, e: "Verdadeiro: as terminações nervosas são destruídas." }
    ],
    pairs: [
      ["Apendicite", "Escore de Alvarado"],
      ["Área queimada", "Regra dos nove"],
      ["Reposição no queimado", "Fórmula de Parkland"],
      ["Trauma abdominal", "FAST"],
      ["Obstrução do delgado", "Bridas"],
      ["Perfuração de víscera", "Pneumoperitônio"]
    ],
    seq: [
      { t: "Tempos cirúrgicos fundamentais", items: ["Diérese", "Hemostasia", "Exérese", "Síntese"], e: "Diérese: abrir os tecidos. Exérese: o procedimento em si. Síntese: fechar." }
    ],
    cases: [{
      title: "A dor que mudou de lugar",
      story: "Homem de 22 anos com dor ao redor do umbigo há 12 horas, que migrou para a fossa ilíaca direita. Tem falta de apetite, febre de 38 °C e leucocitose.",
      steps: [
        { q: "Qual é o diagnóstico mais provável?", o: ["Gastroenterite", "Apendicite aguda", "Cólica renal", "Diverticulite"], a: 1, e: "Dor que migra, anorexia, febre e leucocitose: Alvarado alto." },
        { q: "O sinal de Blumberg positivo indica:", o: ["Obstrução intestinal", "Irritação peritoneal", "Cólica biliar", "Infecção urinária"], a: 1, e: "Dor à descompressão brusca." },
        { q: "Qual é o tratamento?", o: ["Analgesia e alta", "Apendicectomia (de preferência por vídeo) com antibiótico", "Somente observar", "Colonoscopia"], a: 1, e: "Em casos selecionados não complicados, o tratamento só com antibiótico é discutido, mas a cirurgia é o padrão." }
      ]
    }]
  }
);

// Grade típica por período (cada faculdade é diferente: o aluno pode editar).
window.GRADE_PADRAO = {
  1: ["anato", "histo", "embrio", "bioq", "saude"],
  2: ["anato", "fisio", "histo", "bioq", "genet"],
  3: ["fisio", "imuno", "micro", "parasito", "saude"],
  4: ["pato", "farmaco", "semio", "micro", "genet"],
  5: ["semio", "cardio", "pneumo", "gastro", "nefro"],
  6: ["endo", "hemato", "reumato", "neuro", "infecto"],
  7: ["pedi", "go", "dermato", "psiq", "cirurgia"],
  8: ["cirurgia", "go", "pedi", "psiq", "clinica"],
  internato: ["clinica", "cirurgia", "pedi", "go", "saude", "cardio", "pneumo", "gastro", "nefro", "endo", "infecto", "neuro", "psiq", "hemato"]
};
