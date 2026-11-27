// Conteúdo ampliado (parte 1). Formato compacto:
// flashcards: [frente, verso] · quiz: [pergunta, [alternativas], índice certo, explicação]
// tf: [afirmação, verdadeiro?, explicação] · pairs: [termo, par] · cases.steps: igual ao quiz
window.addContent = function (id, c) {
  const w = window.WORLDS.find((x) => x.id === id);
  if (!w) return;
  const mc = (x) => (Array.isArray(x) ? { q: x[0], o: x[1], a: x[2], e: x[3] } : x);
  (c.flashcards || []).forEach((x) => w.flashcards.push(Array.isArray(x) ? { f: x[0], b: x[1] } : x));
  (c.quiz || []).forEach((x) => w.quiz.push(mc(x)));
  (c.tf || []).forEach((x) => w.tf.push(Array.isArray(x) ? { s: x[0], v: x[1], e: x[2] } : x));
  (c.pairs || []).forEach((x) => w.pairs.push(x));
  (c.seq || []).forEach((x) => (w.seq = w.seq || []).push(x));
  (c.cases || []).forEach((x) => w.cases.push({ title: x.title, story: x.story, steps: x.steps.map(mc) }));
};

addContent("anato", {
  flashcards: [
    ["Nervo que inerva o deltoide e o redondo menor", "Nervo axilar (C5–C6)."],
    ["Ramos do arco aórtico, da direita para a esquerda", "Tronco braquiocefálico, carótida comum esquerda e subclávia esquerda."],
    ["Estruturas que passam pelo forame magno", "Bulbo, artérias vertebrais e raiz espinal do nervo acessório (XI)."],
    ["Conteúdo do canal inguinal no homem", "Funículo espermático (ducto deferente, vasos testiculares e plexo pampiniforme) e nervo ilioinguinal."],
    ["Nervo lesado na fratura da diáfise do úmero", "Nervo radial, no sulco do nervo radial."],
    ["Limites do triângulo de Hesselbach", "Vasos epigástricos inferiores, borda lateral do reto abdominal e ligamento inguinal. É onde ocorre a hérnia inguinal direta."],
    ["Artéria lesada no hematoma epidural clássico", "Artéria meníngea média (fratura do temporal, na região do ptério)."],
    ["Músculos inervados pelo nervo facial (VII)", "Músculos da expressão facial, além do estapédio, do estilo-hióideo e do ventre posterior do digástrico."],
    ["Músculos da mastigação e sua inervação", "Masseter, temporal e pterigóideos medial e lateral, inervados pelo nervo mandibular (V3)."],
    ["Inervação dos 2/3 anteriores da língua", "Sensibilidade geral: nervo lingual (V3). Gustação: corda do tímpano (VII)."],
    ["Ossos da fileira proximal do carpo (de lateral para medial)", "Escafoide, semilunar, piramidal e pisiforme."],
    ["Osso do carpo mais fraturado", "Escafoide: dor na tabaqueira anatômica e risco de necrose avascular."]
  ],
  quiz: [
    ["O músculo serrátil anterior é inervado pelo nervo:", ["Toracodorsal", "Torácico longo", "Dorsal da escápula", "Supraescapular"], 1, "Sua lesão causa a escápula alada."],
    ["A veia safena magna desemboca na:", ["Veia poplítea", "Veia femoral", "Veia ilíaca interna", "Veia safena parva"], 1, "Na junção safenofemoral, logo abaixo do ligamento inguinal."],
    ["O nervo laríngeo recorrente inerva:", ["Só o cricotireóideo", "Todos os músculos intrínsecos da laringe, exceto o cricotireóideo", "A língua", "O platisma"], 1, "O cricotireóideo é inervado pelo laríngeo superior. A lesão do recorrente causa rouquidão."],
    ["No adulto, a cabeça do fêmur é irrigada principalmente pela artéria:", ["Do ligamento redondo", "Circunflexa femoral medial", "Obturatória", "Glútea inferior"], 1, "Sua lesão na fratura do colo do fêmur pode causar necrose da cabeça."],
    ["A “tríade infeliz” do joelho envolve:", ["LCA, LCP e menisco lateral", "LCA, ligamento colateral medial e menisco medial", "Patela, tendão patelar e menisco", "LCP e ligamentos colaterais"], 1, "Ocorre em trauma com valgo e rotação."],
    ["O ducto colédoco se forma pela união de:", ["Ducto cístico e ducto hepático comum", "Ducto pancreático e ducto cístico", "Ductos hepáticos direito e esquerdo", "Ducto cístico e duodeno"], 0, "Desemboca na papila duodenal maior com o ducto pancreático (ampola de Vater)."],
    ["Qual músculo da mão NÃO é inervado pelo nervo mediano?", ["Abdutor curto do polegar", "Oponente do polegar", "Adutor do polegar", "Flexor curto do polegar (cabeça superficial)"], 2, "O adutor do polegar é inervado pelo ulnar."],
    ["O ponto de McBurney fica:", ["No terço lateral da linha entre a espinha ilíaca anterossuperior e o umbigo", "No hipocôndrio direito", "Na linha média abaixo do umbigo", "No flanco esquerdo"], 0, "Corresponde aproximadamente à base do apêndice."],
    ["O rompimento das veias ponte que drenam para o seio sagital superior causa:", ["Hematoma epidural", "Hematoma subdural", "Hemorragia subaracnóidea aneurismática", "AVC lacunar"], 1, "Comum em idosos e alcoolistas, após trauma leve."]
  ],
  tf: [
    ["O nervo frênico desce sobre a face anterior do músculo escaleno anterior.", true, "Verdadeiro."],
    ["O rim direito costuma ficar mais alto que o esquerdo.", false, "Falso: fica um pouco mais baixo, por causa do fígado."],
    ["No trígono femoral, a artéria femoral fica lateral à veia femoral.", true, "Verdadeiro. De lateral para medial: nervo, artéria, veia e linfáticos (NAVL)."],
    ["O nervo ulnar passa por trás do epicôndilo medial.", true, "Verdadeiro: é o “osso da graça”."],
    ["O cólon transverso é retroperitoneal.", false, "Falso: é intraperitoneal, com mesocólon. Os cólons ascendente e descendente são retroperitoneais."],
    ["O nervo oculomotor inerva o levantador da pálpebra superior.", true, "Verdadeiro: sua lesão causa ptose e olho “para baixo e para fora”."]
  ],
  pairs: [["Nervo radial", "Extensores do punho"], ["Nervo musculocutâneo", "Bíceps braquial"], ["Nervo femoral", "Quadríceps"], ["Nervo tibial", "Flexão plantar"]],
  seq: [{ t: "Parede abdominal anterolateral (de fora para dentro)", items: ["Pele", "Tecido subcutâneo", "Oblíquo externo", "Oblíquo interno", "Transverso do abdome", "Fáscia transversal", "Peritônio parietal"], e: "São as camadas atravessadas numa incisão de McBurney." }],
  cases: [
    { title: "Queda com a mão estendida", story: "Jovem de 20 anos cai com a mão estendida. Tem dor na tabaqueira anatômica, e o primeiro raio-X é normal.", steps: [
      ["Qual fratura suspeitar?", ["Rádio distal (Colles)", "Escafoide", "Semilunar", "Ulna"], 1, "Dor na tabaqueira anatômica após queda com a mão estendida."],
      ["Por que essa fratura preocupa?", ["Lesa o nervo ulnar", "Risco de necrose avascular do fragmento proximal", "Sempre infecciona", "Causa síndrome compartimental"], 1, "A irrigação entra pela parte distal do osso."],
      ["Qual é a conduta com raio-X normal e suspeita clínica?", ["Alta sem imobilizar", "Imobilizar e repetir a imagem ou fazer ressonância", "Cirurgia imediata", "Só anti-inflamatório"], 1, "A fratura pode não aparecer no primeiro raio-X."]] },
    { title: "Rouquidão após cirurgia", story: "Mulher de 45 anos fica rouca logo depois de uma tireoidectomia total.", steps: [
      ["Qual nervo foi provavelmente lesado?", ["Laríngeo recorrente", "Hipoglosso", "Vago no forame jugular", "Frênico"], 0, "Ele passa junto da artéria tireóidea inferior."],
      ["Qual músculo NÃO é inervado por esse nervo?", ["Cricoaritenóideo posterior", "Cricotireóideo", "Tireoaritenóideo", "Aritenóideo"], 1, "O cricotireóideo é inervado pelo laríngeo superior."],
      ["Que outra complicação essa cirurgia pode causar?", ["Hipocalcemia por lesão das paratireoides", "Hiperglicemia", "Hipertireoidismo", "Anemia"], 0, "Procurar os sinais de Chvostek e Trousseau."]] }
  ]
});

addContent("fisio", {
  flashcards: [
    ["Estimativa da pressão arterial média", "PAM ≈ PA diastólica + 1/3 da pressão de pulso."],
    ["Lei de Poiseuille: o que mais influencia a resistência vascular?", "O raio do vaso: a resistência é proporcional a 1/r⁴."],
    ["Volume corrente normal do adulto", "Cerca de 500 mL (6 a 8 mL/kg)."],
    ["Espaço morto anatômico", "Volume das vias aéreas que não participa da troca gasosa (cerca de 150 mL)."],
    ["Principal forma de transporte do CO₂ no sangue", "Como bicarbonato (cerca de 70%)."],
    ["Hormônio que regula a calcemia minuto a minuto", "Paratormônio (PTH)."],
    ["Efeitos do glucagon", "Aumenta a glicemia: glicogenólise, gliconeogênese e cetogênese."],
    ["Onde se forma a vitamina D ativa (calcitriol)?", "No rim, pela 1-alfa-hidroxilase, estimulada pelo PTH."],
    ["Função da tireoglobulina", "É a proteína do coloide onde os hormônios tireoidianos são sintetizados e armazenados."],
    ["Potencial de ação do nó sinoatrial", "Fase 4: despolarização lenta (corrente If). Fase 0: entrada de Ca²⁺ (canais tipo L). Fase 3: repolarização por K⁺."],
    ["Barorreflexo quando a PA sobe", "Aumenta o tônus vagal e diminui o simpático: caem a FC e a resistência vascular."],
    ["Hormônios da adeno-hipófise", "GH, prolactina, TSH, ACTH, FSH e LH."]
  ],
  quiz: [
    ["A curva de Frank-Starling se desloca para cima com:", ["Betabloqueador", "Aumento da contratilidade (ex.: catecolaminas)", "Hipocalcemia", "Insuficiência cardíaca"], 1, "Inotrópicos positivos aumentam o volume sistólico para a mesma pré-carga."],
    ["A relação ventilação/perfusão é mais alta:", ["Na base do pulmão", "No ápice do pulmão", "Igual em todo o pulmão", "No hilo"], 1, "No ápice, a perfusão cai mais que a ventilação."],
    ["Principais estímulos para a secreção de aldosterona:", ["Hipernatremia", "Angiotensina II e hipercalemia", "ADH", "Glucagon"], 1, "O ACTH tem papel menor."],
    ["Hormônio responsável pela ejeção do leite:", ["Prolactina", "Ocitocina", "Estrogênio", "Progesterona"], 1, "A prolactina estimula a produção; a ocitocina, a ejeção."],
    ["A complacência pulmonar diminui em:", ["Enfisema", "Fibrose pulmonar", "Asma leve", "Repouso"], 1, "No enfisema, a complacência aumenta."],
    ["Fase do ciclo cardíaco com maior consumo de O₂ pelo miocárdio:", ["Enchimento rápido", "Contração isovolumétrica", "Diástase", "Relaxamento isovolumétrico"], 1, "É quando a tensão da parede sobe mais."],
    ["Na acidose respiratória aguda há:", ["pH baixo e PaCO₂ alta", "pH alto e PaCO₂ baixa", "pH baixo e bicarbonato baixo", "pH alto e bicarbonato alto"], 0, "É causada por hipoventilação."],
    ["Efeito da insulina sobre o potássio:", ["Aumenta o K⁺ sérico", "Leva o K⁺ para dentro das células", "Nenhum", "Aumenta a excreção renal direta"], 1, "Por isso é usada para tratar a hipercalemia."],
    ["O que o surfactante faz?", ["Aumenta a tensão superficial", "Reduz a tensão superficial e evita o colapso alveolar", "Faz a troca gasosa", "Produz muco"], 1, "Sua falta causa a doença da membrana hialina no prematuro."]
  ],
  tf: [
    ["O sistema parassimpático reduz a frequência cardíaca.", true, "Verdadeiro, pelo nervo vago."],
    ["A hemoglobina fetal tem menor afinidade pelo O₂ que a do adulto.", false, "Falso: tem maior afinidade, o que ajuda a captar O₂ da placenta."],
    ["O GH estimula o fígado a produzir IGF-1.", true, "Verdadeiro."],
    ["Na alcalose, o cálcio ionizado tende a cair.", true, "Verdadeiro: mais cálcio se liga à albumina, causando parestesias e até tetania."],
    ["A secretina estimula a secreção de ácido no estômago.", false, "Falso: ela inibe a gastrina e estimula o bicarbonato pancreático."],
    ["A filtração glomerular depende das forças de Starling no capilar glomerular.", true, "Verdadeiro."]
  ],
  pairs: [["Ocitocina", "Ejeção do leite"], ["Prolactina", "Produção de leite"], ["Calcitonina", "Reduz o cálcio"], ["Eritropoetina", "Produção de hemácias"]],
  seq: [{ t: "Contração do músculo esquelético", items: ["Potencial de ação no neurônio motor", "Liberação de acetilcolina", "Despolarização da placa motora", "Ca²⁺ sai do retículo sarcoplasmático", "Ca²⁺ se liga à troponina C", "Formação das pontes actina-miosina"], e: "O relaxamento exige ATP e a recaptação do Ca²⁺." }],
  cases: [
    { title: "Subida à montanha", story: "Turista saudável sobe a 4.000 m de altitude. No primeiro dia sente falta de ar e respira mais rápido.", steps: [
      ["O que estimula essa hiperventilação?", ["Hipercapnia", "Hipoxemia, nos quimiorreceptores periféricos", "Acidose metabólica", "Anemia"], 1, "Os corpos carotídeos detectam a queda da PaO₂."],
      ["Qual distúrbio acidobásico aparece primeiro?", ["Acidose respiratória", "Alcalose respiratória", "Acidose metabólica", "Nenhum"], 1, "A hiperventilação elimina CO₂."],
      ["Qual adaptação surge em semanas?", ["Queda do hematócrito", "Mais eritropoetina e hematócrito mais alto", "Bradicardia intensa", "Perda de 2,3-BPG"], 1, "O 2,3-BPG também aumenta."]] },
    { title: "Hemorragia aguda", story: "Homem de 30 anos perde cerca de 1 litro de sangue num acidente. Está pálido e taquicárdico, com PA ainda normal.", steps: [
      ["Que reflexo mantém a PA?", ["Barorreflexo, com ativação simpática", "Reflexo de Bezold-Jarisch", "Reflexo de Cushing", "Reflexo de Hering-Breuer"], 0, "Aumenta a FC, a contratilidade e a vasoconstrição."],
      ["O que o rim libera diante da baixa perfusão?", ["Apenas eritropoetina", "Renina", "Calcitonina", "Insulina"], 1, "Ativa o sistema renina-angiotensina-aldosterona."],
      ["Qual sinal costuma aparecer primeiro no choque hemorrágico?", ["Hipotensão", "Taquicardia", "Bradicardia", "Anúria"], 1, "A hipotensão é tardia (classe III do ATLS)."]] }
  ]
});

addContent("bioq", {
  flashcards: [
    ["Enzima que converte piruvato em acetil-CoA", "Piruvato desidrogenase (cofatores: B1, B2, B3, B5 e ácido lipoico)."],
    ["Hormônios que ativam a lipase hormônio-sensível", "Glucagon e catecolaminas. A insulina a inibe."],
    ["Onde ocorre a β-oxidação dos ácidos graxos?", "Na mitocôndria. Os de cadeia muito longa começam no peroxissomo."],
    ["Função da carnitina", "Levar os ácidos graxos de cadeia longa para dentro da mitocôndria."],
    ["Lipoproteína que leva colesterol dos tecidos ao fígado", "HDL (transporte reverso do colesterol)."],
    ["Lipoproteína que transporta os triglicerídeos da dieta", "Quilomícron."],
    ["Enzima deficiente na doença de von Gierke", "Glicose-6-fosfatase: hipoglicemia de jejum, hepatomegalia e acidose lática."],
    ["Via que gera NADPH e ribose-5-fosfato", "Via das pentoses-fosfato (enzima-chave: G6PD)."],
    ["Vitamina cofator das transaminases", "Piridoxina (B6), como piridoxal-fosfato."],
    ["Doença de depósito lisossômico mais comum", "Doença de Gaucher (deficiência de glicocerebrosidase)."],
    ["Mutação da hemoglobina S", "Troca de ácido glutâmico por valina na posição 6 da cadeia beta."],
    ["Precursores do heme", "Glicina e succinil-CoA. A enzima limitante é a ALA sintase."]
  ],
  quiz: [
    ["Na deficiência de vitamina B12, acumulam-se:", ["Ácido metilmalônico e homocisteína", "Só homocisteína", "Fenilalanina", "Ácido úrico"], 0, "Na falta de folato, só a homocisteína sobe."],
    ["Enzima limitante da gliconeogênese:", ["Hexocinase", "Frutose-1,6-bisfosfatase", "Piruvato cinase", "Glicogênio fosforilase"], 1, "Outras enzimas exclusivas: piruvato carboxilase, PEPCK e glicose-6-fosfatase."],
    ["O cianeto bloqueia:", ["Complexo I", "Complexo IV (citocromo c oxidase)", "ATP sintase", "Ciclo de Krebs"], 1, "As células deixam de usar o O₂."],
    ["A porfiria intermitente aguda é deficiência de:", ["Ferroquelatase", "Porfobilinogênio desaminase", "ALA desidratase", "Uroporfirinogênio descarboxilase"], 1, "Causa dor abdominal, sintomas neuropsiquiátricos e urina escura."],
    ["A alcaptonúria cursa com:", ["Urina que escurece em contato com o ar", "Odor de xarope de bordo", "Hipoglicemia", "Catarata"], 0, "Deficiência de homogentisato oxidase."],
    ["Principal corpo cetônico no sangue na cetoacidose:", ["Acetona", "Beta-hidroxibutirato", "Acetoacetato", "Lactato"], 1, "A fita urinária detecta sobretudo acetoacetato."],
    ["A doença de McArdle é deficiência de:", ["Glicogênio fosforilase muscular", "Glicose-6-fosfatase", "Enzima ramificadora", "Maltase ácida"], 0, "Causa cãibras e mioglobinúria com exercício."],
    ["Vitamina antioxidante cuja falta causa neuropatia e hemólise:", ["A", "D", "E", "K"], 2, "É a vitamina E."],
    ["A homocistinúria clássica é deficiência de:", ["Cistationina beta-sintase", "Fenilalanina hidroxilase", "Tirosinase", "Ornitina transcarbamilase"], 0, "Luxação do cristalino para baixo, tromboses e deficiência intelectual."]
  ],
  tf: [
    ["A insulina estimula a síntese de ácidos graxos.", true, "Verdadeiro: ativa a acetil-CoA carboxilase."],
    ["Hemácias usam corpos cetônicos como energia.", false, "Falso: sem mitocôndrias, as hemácias só usam glicose."],
    ["O LDL é o colesterol “ruim” porque leva colesterol aos tecidos e às artérias.", true, "Verdadeiro."],
    ["A frutose é metabolizada principalmente no músculo.", false, "Falso: principalmente no fígado."],
    ["A falta de niacina causa dermatite, diarreia e demência.", true, "Verdadeiro: é a pelagra (os 3 Ds)."],
    ["Enzimas aumentam a energia de ativação das reações.", false, "Falso: elas diminuem a energia de ativação."]
  ],
  pairs: [["Glicose-6-fosfatase", "Von Gierke"], ["Glicocerebrosidase", "Gaucher"], ["Hexosaminidase A", "Tay-Sachs"], ["Homogentisato oxidase", "Alcaptonúria"]],
  seq: [{ t: "Intermediários do ciclo de Krebs", items: ["Citrato", "Isocitrato", "Alfa-cetoglutarato", "Succinil-CoA", "Succinato", "Fumarato", "Malato", "Oxaloacetato"], e: "Mnemônico: “Cada Isca Alimenta Seu Sapo Faminto, Mas Obeso”." }],
  cases: [
    { title: "Bebê com hipoglicemia", story: "Lactente de 4 meses com hipoglicemia grave de madrugada, abdome volumoso por hepatomegalia e acidose lática.", steps: [
      ["Qual é a hipótese?", ["Doença de von Gierke (glicogenose tipo I)", "Doença de McArdle", "Fenilcetonúria", "Galactosemia"], 0, "O glicogênio não consegue virar glicose livre."],
      ["Qual enzima falta?", ["Glicogênio fosforilase", "Glicose-6-fosfatase", "Enzima desramificadora", "Hexocinase"], 1, "É a última etapa da glicogenólise e da gliconeogênese."],
      ["Qual é a base do tratamento?", ["Refeições frequentes e amido de milho cru", "Jejum prolongado", "Dieta sem proteína", "Insulina"], 0, "Evitar o jejum e a hipoglicemia."]] },
    { title: "Confusão no alcoolista", story: "Homem de 50 anos, etilista e desnutrido, chega confuso, com marcha atáxica e alteração dos movimentos oculares.", steps: [
      ["Qual é a síndrome?", ["Encefalopatia de Wernicke", "AVC", "Hipoglicemia", "Meningite"], 0, "Tríade: confusão, ataxia e oftalmoplegia."],
      ["Qual vitamina está em falta?", ["B12", "Tiamina (B1)", "Folato", "Vitamina C"], 1, "A tiamina é cofator da piruvato desidrogenase e da alfa-cetoglutarato desidrogenase."],
      ["Que cuidado tomar ao dar soro glicosado?", ["Nenhum", "Dar tiamina antes ou junto da glicose", "Dar insulina junto", "Evitar a tiamina"], 1, "Glicose sem tiamina pode piorar o quadro."]] }
  ]
});

addContent("histo", {
  flashcards: [
    ["Tipos de cartilagem", "Hialina, elástica e fibrocartilagem."],
    ["Onde há fibrocartilagem?", "Nos discos intervertebrais, na sínfise púbica e nos meniscos."],
    ["Células que produzem anticorpos", "Plasmócitos (linfócitos B diferenciados)."],
    ["Células gástricas que produzem pepsinogênio", "Células principais (zimogênicas)."],
    ["Células de Paneth", "Ficam no fundo das criptas intestinais e produzem lisozima e defensinas."],
    ["Epitélio do túbulo contorcido proximal", "Simples cúbico, com borda em escova (microvilosidades)."],
    ["Células que formam a barreira hematoencefálica com o endotélio", "Astrócitos, com seus pés vasculares."],
    ["Células de Langerhans da epiderme", "São as células apresentadoras de antígeno da pele."],
    ["Unidade funcional do músculo estriado", "O sarcômero, entre duas linhas Z."],
    ["Onde ficam as células C (parafoliculares)?", "Na tireoide, entre os folículos. Produzem calcitonina."],
    ["Tipos de tecido ósseo", "Primário (imaturo, não lamelar) e secundário (lamelar, com sistemas de Havers)."],
    ["Zona do córtex suprarrenal que produz aldosterona", "Zona glomerulosa. Mnemônico GFR: glomerulosa-sal, fasciculada-açúcar, reticular-sexo."]
  ],
  quiz: [
    ["Células perissinusoidais do fígado que armazenam vitamina A:", ["Células de Kupffer", "Células estreladas (de Ito)", "Hepatócitos", "Colangiócitos"], 1, "Quando ativadas, produzem colágeno e causam fibrose."],
    ["A zona fasciculada da suprarrenal produz:", ["Aldosterona", "Cortisol", "Adrenalina", "Só andrógenos"], 1, "Glicocorticoides."],
    ["A medula da suprarrenal é formada por:", ["Células cromafins, derivadas da crista neural", "Células de Leydig", "Células foliculares", "Células de Sertoli"], 0, "Produzem catecolaminas."],
    ["Epitélio dos alvéolos responsável pela troca gasosa:", ["Simples pavimentoso (pneumócito tipo I)", "Pseudoestratificado", "Cúbico simples", "Estratificado"], 0, "É fino para facilitar a difusão."],
    ["Os corpúsculos de Hassall ficam no:", ["Baço", "Timo", "Linfonodo", "Tonsila"], 1, "Na medula do timo."],
    ["A polpa branca do baço contém:", ["Hemácias velhas", "Tecido linfoide (bainhas periarteriolares e folículos)", "Hepatócitos", "Fibras musculares"], 1, "A polpa vermelha filtra o sangue."],
    ["Célula óssea derivada da linhagem monócito-macrófago:", ["Osteoblasto", "Osteócito", "Osteoclasto", "Condrócito"], 2, "É multinucleada e reabsorve osso."],
    ["A fibra muscular esquelética do tipo I (vermelha) é:", ["Rápida e glicolítica", "Lenta, oxidativa e rica em mioglobina", "Sem mitocôndrias", "Exclusiva do coração"], 1, "Serve para postura e resistência."],
    ["Exemplo de glândula de secreção holócrina:", ["Sebácea", "Sudorípara écrina", "Pâncreas", "Mamária"], 0, "A célula inteira é eliminada junto com a secreção."]
  ],
  tf: [
    ["A camada córnea da epiderme é formada por células mortas queratinizadas.", true, "Verdadeiro."],
    ["O endotélio é um epitélio simples pavimentoso.", true, "Verdadeiro."],
    ["A mucosa do esôfago tem vilosidades.", false, "Falso: vilosidades são do intestino delgado."],
    ["Os neurônios do SNC adulto se regeneram com facilidade.", false, "Falso: a regeneração é muito limitada."],
    ["O tecido adiposo marrom é especializado em produzir calor.", true, "Verdadeiro, pela termogenina (UCP-1)."],
    ["O pâncreas endócrino corresponde às ilhotas de Langerhans.", true, "Verdadeiro."]
  ],
  pairs: [["Célula de Paneth", "Lisozima"], ["Célula parietal", "Ácido clorídrico"], ["Célula principal gástrica", "Pepsinogênio"], ["Plasmócito", "Anticorpos"]],
  seq: [{ t: "Ossificação endocondral", items: ["Molde de cartilagem hialina", "Hipertrofia dos condrócitos", "Calcificação da matriz", "Invasão de vasos", "Osteoblastos depositam matriz óssea", "Remodelação em osso lamelar"], e: "É assim que os ossos longos crescem, pela placa epifisária." }],
  cases: [
    { title: "Osso sendo reabsorvido", story: "A biópsia de um osso mostra muitas células multinucleadas dentro de lacunas de Howship.", steps: [
      ["Que células são essas?", ["Osteoblastos", "Osteoclastos", "Condrócitos", "Osteócitos"], 1, "Elas reabsorvem a matriz óssea."],
      ["Qual hormônio as estimula indiretamente?", ["Calcitonina", "PTH (via RANKL dos osteoblastos)", "Insulina", "Glucagon"], 1, "A calcitonina as inibe."],
      ["Qual fármaco as inibe e é usado na osteoporose?", ["Bisfosfonato", "Corticoide", "Heparina", "Levotiroxina"], 0, "Ex.: alendronato."]] },
    { title: "Biópsia do duodeno", story: "Biópsia duodenal de paciente com diarreia crônica e anemia: vilosidades atrofiadas, criptas hiperplásicas e muitos linfócitos intraepiteliais.", steps: [
      ["Qual estrutura normal ficou achatada?", ["Só as microvilosidades", "As vilosidades intestinais", "As glândulas de Brunner", "As placas de Peyer"], 1, "As vilosidades aumentam a área de absorção."],
      ["Qual é o diagnóstico mais provável?", ["Doença celíaca", "Úlcera péptica", "Doença de Crohn do cólon", "Câncer gástrico"], 0, "É o padrão de Marsh."],
      ["Por que há anemia ferropriva?", ["Perda de ferro na urina", "Má absorção de ferro no duodeno", "Excesso de ferro", "Hemólise"], 1, "O ferro é absorvido sobretudo no duodeno."]] }
  ]
});
