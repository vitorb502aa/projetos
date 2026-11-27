/* MedQuest Lab — Anatomia interativa.
   Modelos esquemáticos montados em código (posições e proporções aproximadas de um adulto de 1,75 m).
   Arquitetura pronta para trocar por modelos GLB licenciados e validados (campo "glb" no sistema). */
"use strict";

const ANAT_SYS = {
  esqueletico: { n: "Esquelético", c: "#e9dfc7" }, muscular: { n: "Muscular", c: "#b5473d" },
  cardiovascular: { n: "Cardiovascular", c: "#d94a3a" }, respiratorio: { n: "Respiratório", c: "#f0a6b3" },
  digestorio: { n: "Digestório", c: "#e0a070" }, nervoso: { n: "Nervoso", c: "#f2cf86" },
  urinario: { n: "Urinário", c: "#b3563a" }, endocrino: { n: "Endócrino", c: "#a66bd1" },
  linfatico: { n: "Linfático", c: "#6fbf73" }, reprodutor: { n: "Reprodutor", c: "#e78fb3" }
};
// Partes: ["e", centro, raios, rotação?] elipsoide · ["c", a, b, raio] cilindro · ["t", pontos, raio, segmentado?] tubo · ["b", centro, tamanho, rotação?] caixa
const mir = (p) => {
  const f = (v) => [-v[0], v[1], v[2]];
  if (p[0] === "e" || p[0] === "b") return [p[0], f(p[1]), p[2], p[3] ? [p[3][0], -p[3][1], -p[3][2]] : undefined];
  if (p[0] === "c") return ["c", f(p[1]), f(p[2]), p[3]];
  return ["t", p[1].map(f), p[2], p[3]];
};
const MP = (p) => [p, mir(p)];
function ribParts() {
  const out = [];
  for (let i = 0; i < 10; i++) {
    const y = 1.385 - i * 0.026, w = 0.085 + 0.045 * Math.sin((Math.PI * (i + 1.5)) / 11);
    const end = i < 7 ? [0.028, y - 0.06, 0.1] : [w * 0.75, y - 0.06, 0.07];
    const pts = [[0.012, y, -0.065], [w * 0.7, y - 0.005, -0.05], [w, y - 0.02, 0.0], [w * 0.8, y - 0.04, 0.065], end];
    out.push(["t", pts, 0.0055], mir(["t", pts, 0.0055]));
  }
  return out;
}
function smallBowel() {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const a = i * 0.55, r = 0.025 + 0.055 * (i / 60);
    pts.push([Math.cos(a) * r * 1.2, 0.95 - (i / 60) * 0.08 + Math.sin(a * 0.5) * 0.01, 0.06 + Math.sin(a) * r * 0.35]);
  }
  return [["t", pts, 0.011]];
}
const SPINE = [[0, 1.53, -0.03], [0, 1.44, -0.045], [0, 1.33, -0.07], [0, 1.2, -0.075], [0, 1.08, -0.06], [0, 0.99, -0.055], [0, 0.93, -0.07]];

const ANAT = [
  // Esquelético
  { id: "cranio", n: "Crânio", sys: ["esqueletico"], parts: [["e", [0, 1.645, 0], [0.088, 0.1, 0.105]]], info: "Neurocrânio (protege o encéfalo) e viscerocrânio (face).", fn: "Estrutura óssea que protege o encéfalo", clin: "Osso cuja fratura na região temporal pode romper a artéria meníngea média" },
  { id: "mandibula", n: "Mandíbula", sys: ["esqueletico"], parts: [["t", [[-0.052, 1.565, -0.005], [-0.048, 1.515, 0.04], [0, 1.495, 0.078], [0.048, 1.515, 0.04], [0.052, 1.565, -0.005]], 0.011]], info: "Único osso móvel do crânio; articula-se na ATM.", fn: "Osso que se movimenta na mastigação", clin: "Osso da face cuja luxação deixa a boca travada aberta" },
  { id: "coluna", n: "Coluna vertebral", sys: ["esqueletico"], parts: [["t", SPINE, 0.019, true]], info: "33 vértebras: 7 cervicais, 12 torácicas, 5 lombares, sacro e cóccix.", fn: "Eixo do corpo que protege a medula espinal", clin: "Local da punção lombar, entre L3–L4 ou L4–L5" },
  { id: "costelas", n: "Costelas", sys: ["esqueletico"], parts: ribParts(), info: "12 pares: 7 verdadeiros, 3 falsos e 2 flutuantes (aqui, os 10 superiores).", fn: "Ossos que formam a caixa torácica", clin: "Na toracocentese, a agulha passa pela borda superior delas para poupar o feixe vasculonervoso" },
  { id: "esterno", n: "Esterno", sys: ["esqueletico"], parts: [["b", [0, 1.27, 0.105], [0.035, 0.17, 0.015]]], info: "Manúbrio, corpo e processo xifoide.", fn: "Osso central do tórax onde se articulam as costelas", clin: "Local das compressões torácicas na RCP (metade inferior)" },
  { id: "clavicula", n: "Clavícula", sys: ["esqueletico"], parts: MP(["c", [0.015, 1.415, 0.085], [0.165, 1.43, 0.0], 0.009]), info: "Liga o esterno ao acrômio da escápula.", fn: "Osso que une o membro superior ao tronco", clin: "Um dos ossos mais fraturados em quedas sobre o ombro" },
  { id: "escapula", n: "Escápula", sys: ["esqueletico"], parts: MP(["e", [0.115, 1.33, -0.085], [0.055, 0.075, 0.012], [0, 0, 0.15]]), info: "Osso plano posterior; a cavidade glenoide articula com o úmero.", fn: "Osso posterior onde se inserem os músculos do manguito rotador", clin: "Fica “alada” na lesão do nervo torácico longo" },
  { id: "umero", n: "Úmero", sys: ["esqueletico"], parts: MP(["c", [0.19, 1.39, -0.005], [0.235, 1.09, -0.005], 0.017]), info: "Osso do braço; colo cirúrgico e sulco do nervo radial.", fn: "Osso longo do braço", clin: "Sua fratura na diáfise pode lesar o nervo radial (mão caída)" },
  { id: "radioulna", n: "Rádio e ulna", sys: ["esqueletico"], parts: [...MP(["c", [0.235, 1.075, 0.005], [0.27, 0.83, 0.03], 0.01]), ...MP(["c", [0.245, 1.075, -0.015], [0.28, 0.83, -0.01], 0.009])], info: "Ossos do antebraço; o rádio fica do lado do polegar.", fn: "Ossos que permitem a pronação e a supinação", clin: "A fratura distal do rádio é comum em queda com a mão estendida (Colles)" },
  { id: "mao", n: "Ossos da mão", sys: ["esqueletico"], parts: MP(["e", [0.29, 0.765, 0.012], [0.024, 0.05, 0.012]]), info: "8 ossos do carpo, 5 metacarpos e 14 falanges.", fn: "Ossos que dão a destreza da mão", clin: "Dor na tabaqueira anatômica sugere fratura do escafoide" },
  { id: "pelve", n: "Pelve (quadril e sacro)", sys: ["esqueletico"], parts: [...MP(["e", [0.095, 0.965, -0.01], [0.065, 0.065, 0.025], [0, 0.6, 0]]), ["e", [0, 0.93, -0.075], [0.04, 0.055, 0.02]], ...MP(["c", [0.07, 0.88, 0.05], [0.012, 0.865, 0.07], 0.012])], info: "Ílio, ísquio, púbis e sacro.", fn: "Anel ósseo que transmite o peso do tronco aos membros inferiores", clin: "Sua fratura pode causar hemorragia grave no trauma" },
  { id: "femur", n: "Fêmur", sys: ["esqueletico"], parts: [...MP(["c", [0.085, 0.905, 0.0], [0.105, 0.505, 0.01], 0.02]), ...MP(["e", [0.075, 0.91, 0.0], [0.022, 0.022, 0.022]])], info: "Maior osso do corpo.", fn: "Osso da coxa", clin: "Fratura do colo frequente em idosas com osteoporose" },
  { id: "patela", n: "Patela", sys: ["esqueletico"], parts: MP(["e", [0.107, 0.485, 0.055], [0.022, 0.026, 0.01]]), info: "Osso sesamoide dentro do tendão do quadríceps.", fn: "Osso que aumenta a alavanca do quadríceps", clin: "O reflexo patelar é testado percutindo o tendão logo abaixo dela" },
  { id: "tibia", n: "Tíbia e fíbula", sys: ["esqueletico"], parts: [...MP(["c", [0.105, 0.47, 0.005], [0.1, 0.085, 0.0], 0.017]), ...MP(["c", [0.135, 0.46, -0.01], [0.13, 0.085, -0.01], 0.008])], info: "A tíbia, medial, suporta o peso; a fíbula fica lateral.", fn: "Ossos da perna", clin: "A fratura exposta da tíbia é comum no trauma de moto" },
  { id: "pe", n: "Ossos do pé", sys: ["esqueletico"], parts: MP(["b", [0.11, 0.035, 0.04], [0.05, 0.03, 0.14]]), info: "Tarso (7), metatarsos (5) e falanges (14).", fn: "Ossos que sustentam o corpo em pé e na marcha", clin: "O calcâneo fratura em quedas de altura, caindo de pé" },
  // Muscular
  { id: "deltoide", n: "Deltoide", sys: ["muscular"], parts: MP(["e", [0.205, 1.36, 0.0], [0.045, 0.065, 0.05]]), info: "Inervado pelo nervo axilar.", fn: "Músculo que abduz o braço", clin: "Local comum de injeção intramuscular de vacinas em adultos" },
  { id: "peitoral", n: "Peitoral maior", sys: ["muscular"], parts: MP(["e", [0.075, 1.29, 0.095], [0.085, 0.06, 0.025], [0, 0, -0.25]]), info: "Origem na clavícula e no esterno; insere-se no úmero.", fn: "Músculo que aduz e roda medialmente o braço", clin: "Músculo do tórax anterior, logo abaixo da mama" },
  { id: "reto_abd", n: "Reto do abdome", sys: ["muscular"], parts: [["e", [0, 1.07, 0.105], [0.055, 0.13, 0.02]]], info: "Envolto pela bainha do reto; as duas metades se unem na linha alba.", fn: "Músculo que flexiona o tronco", clin: "Sua diástase é comum depois de gestações" },
  { id: "obliquo", n: "Oblíquo externo", sys: ["muscular"], parts: MP(["e", [0.115, 1.06, 0.07], [0.04, 0.1, 0.04]]), info: "Camada mais superficial da parede lateral do abdome.", fn: "Músculo que roda e inclina o tronco", clin: "Sua aponeurose forma o ligamento inguinal" },
  { id: "biceps", n: "Bíceps braquial", sys: ["muscular"], parts: MP(["e", [0.222, 1.23, 0.03], [0.022, 0.085, 0.024]]), info: "Inervado pelo nervo musculocutâneo.", fn: "Músculo que flexiona o cotovelo e supina o antebraço", clin: "Seu reflexo avalia a raiz C5–C6" },
  { id: "triceps", n: "Tríceps braquial", sys: ["muscular"], parts: MP(["e", [0.222, 1.23, -0.03], [0.024, 0.09, 0.026]]), info: "Inervado pelo nervo radial.", fn: "Músculo que estende o cotovelo", clin: "Seu reflexo avalia a raiz C7" },
  { id: "trapezio", n: "Trapézio", sys: ["muscular"], parts: [["e", [0, 1.39, -0.075], [0.15, 0.07, 0.025]]], info: "Inervado pelo nervo acessório (XI).", fn: "Músculo que eleva e retrai a escápula", clin: "Dificuldade de elevar o ombro sugere lesão do nervo acessório" },
  { id: "ecm", n: "Esternocleidomastóideo", sys: ["muscular"], parts: MP(["c", [0.055, 1.56, -0.01], [0.02, 1.405, 0.085], 0.012]), info: "Do esterno e da clavícula ao processo mastoide.", fn: "Músculo que roda e flexiona a cabeça", clin: "Referência para o acesso venoso central na jugular interna" },
  { id: "gluteo", n: "Glúteo máximo", sys: ["muscular"], parts: MP(["e", [0.085, 0.9, -0.085], [0.07, 0.07, 0.04]]), info: "Inervado pelo nervo glúteo inferior.", fn: "Músculo que estende o quadril", clin: "Injeção IM só no quadrante superolateral, para poupar o nervo isquiático" },
  { id: "quadriceps", n: "Quadríceps femoral", sys: ["muscular"], parts: MP(["e", [0.105, 0.7, 0.035], [0.055, 0.17, 0.045]]), info: "Reto femoral e três vastos; inervado pelo nervo femoral.", fn: "Músculo que estende o joelho", clin: "O vasto lateral é local de injeção IM em lactentes" },
  { id: "isquio", n: "Isquiotibiais", sys: ["muscular"], parts: MP(["e", [0.105, 0.7, -0.045], [0.05, 0.16, 0.04]]), info: "Bíceps femoral, semitendíneo e semimembranáceo.", fn: "Músculos que flexionam o joelho e estendem o quadril", clin: "Estiramentos frequentes em corredores" },
  { id: "gastrocnemio", n: "Gastrocnêmio", sys: ["muscular"], parts: MP(["e", [0.11, 0.33, -0.035], [0.035, 0.1, 0.035]]), info: "Forma a panturrilha com o sóleo; termina no tendão calcâneo.", fn: "Músculo que faz a flexão plantar", clin: "Dor e edema na panturrilha levantam suspeita de trombose venosa profunda" },
  // Cardiovascular
  { id: "coracao", n: "Coração", sys: ["cardiovascular"], color: "#c0392b", parts: [["e", [0.025, 1.235, 0.045], [0.05, 0.062, 0.045], [0, 0, -0.5]]], info: "Quatro câmaras; o ápice fica no 5º espaço intercostal esquerdo.", fn: "Órgão que bombeia o sangue", clin: "Órgão acometido no infarto agudo do miocárdio" },
  { id: "aorta", n: "Aorta", sys: ["cardiovascular"], parts: [["t", [[0.02, 1.27, 0.05], [0.005, 1.33, 0.04], [0.02, 1.355, 0.0], [0.03, 1.32, -0.04], [0.02, 1.2, -0.045], [0.012, 1.05, -0.03], [0.0, 0.97, -0.02]], 0.011]], info: "Ascendente, arco e descendente (torácica e abdominal).", fn: "Maior artéria do corpo: leva o sangue do ventrículo esquerdo para o corpo", clin: "Vaso da dissecção com dor súbita “rasgando” para o dorso" },
  { id: "pulmonar", n: "Tronco pulmonar", sys: ["cardiovascular"], color: "#3b6fd8", parts: [["t", [[0.035, 1.265, 0.07], [0.04, 1.3, 0.05], [0.0, 1.315, 0.02]], 0.009], ["t", [[0, 1.31, 0.02], [-0.06, 1.29, 0.01]], 0.006], ["t", [[0.04, 1.3, 0.04], [0.07, 1.29, 0.01]], 0.006]], info: "Sai do ventrículo direito e se divide nas artérias pulmonares.", fn: "Leva sangue pobre em oxigênio aos pulmões", clin: "Seus ramos ficam obstruídos na embolia pulmonar" },
  { id: "cavas", n: "Veias cavas", sys: ["cardiovascular"], color: "#3b6fd8", parts: [["t", [[-0.025, 1.36, 0.03], [-0.028, 1.3, 0.04], [-0.022, 1.24, 0.04]], 0.01], ["t", [[-0.02, 1.2, 0.02], [-0.025, 1.1, -0.02], [-0.02, 0.97, -0.01]], 0.012]], info: "Superior e inferior; desembocam no átrio direito.", fn: "Veias que trazem o sangue do corpo de volta ao coração", clin: "A inferior é comprimida pelo útero gravídico em decúbito dorsal" },
  { id: "carotidas", n: "Artérias carótidas", sys: ["cardiovascular"], parts: MP(["t", [[0.012, 1.345, 0.02], [0.025, 1.42, 0.04], [0.03, 1.52, 0.03]], 0.006]), info: "A carótida comum se divide em interna e externa.", fn: "Artérias que levam sangue à cabeça e ao encéfalo", clin: "Sua estenose pode causar AIT e AVC" },
  { id: "subclavias", n: "Artérias subclávias e braquiais", sys: ["cardiovascular"], parts: MP(["t", [[0.01, 1.345, 0.0], [0.08, 1.39, 0.0], [0.18, 1.38, 0], [0.235, 1.1, 0.02], [0.27, 0.85, 0.03]], 0.005]), info: "A subclávia vira axilar e depois braquial.", fn: "Artérias que irrigam os membros superiores", clin: "A artéria braquial é onde se ausculta a pressão arterial" },
  { id: "femorais", n: "Artérias ilíacas e femorais", sys: ["cardiovascular"], parts: MP(["t", [[0.0, 0.97, -0.02], [0.05, 0.92, 0.01], [0.09, 0.85, 0.04], [0.1, 0.6, 0.03], [0.105, 0.45, -0.01], [0.11, 0.15, -0.01]], 0.007]), info: "A aorta se divide nas ilíacas comuns na altura de L4.", fn: "Artérias que irrigam os membros inferiores", clin: "A artéria femoral é uma via de acesso para cateterismo" },
  // Respiratório
  { id: "laringe", n: "Laringe", sys: ["respiratorio"], parts: [["e", [0, 1.495, 0.05], [0.018, 0.024, 0.018]]], info: "Contém as pregas vocais; a cartilagem tireoide forma o “pomo de Adão”.", fn: "Órgão da fonação que protege a via aérea", clin: "A cricotireoidostomia de emergência é feita logo abaixo dela" },
  { id: "traqueia", n: "Traqueia", sys: ["respiratorio"], parts: [["c", [0, 1.475, 0.045], [0, 1.33, 0.03], 0.011]], info: "Tubo de anéis cartilaginosos em C; bifurca na carina.", fn: "Conduz o ar da laringe aos brônquios", clin: "Desvia para o lado oposto no pneumotórax hipertensivo" },
  { id: "bronquios", n: "Brônquios principais", sys: ["respiratorio"], parts: [["t", [[0, 1.335, 0.03], [-0.04, 1.3, 0.02], [-0.06, 1.27, 0.015]], 0.007], ["t", [[0, 1.335, 0.03], [0.045, 1.31, 0.02], [0.065, 1.28, 0.015]], 0.006]], info: "O direito é mais curto, largo e vertical.", fn: "Conduzem o ar a cada pulmão", clin: "Corpos estranhos aspirados vão mais para o direito" },
  { id: "pulmao_d", n: "Pulmão direito", sys: ["respiratorio"], parts: [["e", [-0.08, 1.24, 0.015], [0.065, 0.12, 0.07]]], info: "Três lobos: superior, médio e inferior.", fn: "Órgão das trocas gasosas, à direita, com três lobos", clin: "O lobo médio fica silencioso à ausculta anterior na pneumonia desse lobo" },
  { id: "pulmao_e", n: "Pulmão esquerdo", sys: ["respiratorio"], parts: [["e", [0.085, 1.235, 0.01], [0.06, 0.115, 0.068]]], info: "Dois lobos e a língula; tem a incisura cardíaca.", fn: "Órgão das trocas gasosas, à esquerda, com dois lobos", clin: "É ligeiramente menor por causa do coração" },
  { id: "diafragma", n: "Diafragma", sys: ["respiratorio", "muscular"], color: "#c76b5e", parts: [["e", [0, 1.115, 0], [0.15, 0.035, 0.095]]], info: "Separa o tórax do abdome; inervado pelo nervo frênico (C3–C5).", fn: "Principal músculo da inspiração", clin: "Sua irritação causa dor referida no ombro (sinal de Kehr)" },
  // Digestório
  { id: "esofago", n: "Esôfago", sys: ["digestorio"], color: "#d98b6a", parts: [["t", [[0, 1.48, 0.0], [0, 1.3, -0.01], [0.01, 1.16, 0], [0.04, 1.11, 0.02]], 0.008]], info: "Passa atrás da traqueia e atravessa o diafragma pelo hiato esofágico.", fn: "Leva o alimento da faringe ao estômago", clin: "Local das varizes que sangram na hipertensão portal" },
  { id: "estomago", n: "Estômago", sys: ["digestorio"], color: "#e6a27a", parts: [["e", [0.065, 1.075, 0.04], [0.07, 0.045, 0.04], [0, 0, -0.5]]], info: "Cárdia, fundo, corpo, antro e piloro.", fn: "Órgão que armazena o alimento e produz ácido e pepsina", clin: "Local da úlcera péptica associada ao H. pylori" },
  { id: "figado", n: "Fígado", sys: ["digestorio"], color: "#8e3b2b", parts: [["e", [-0.065, 1.105, 0.035], [0.11, 0.055, 0.07], [0, 0, 0.18]]], info: "Maior glândula do corpo, no hipocôndrio direito.", fn: "Órgão que produz bile, metaboliza fármacos e sintetiza albumina", clin: "Fica aumentado e doloroso na insuficiência cardíaca direita" },
  { id: "vesicula", n: "Vesícula biliar", sys: ["digestorio"], color: "#5f8f3a", parts: [["e", [-0.055, 1.055, 0.095], [0.013, 0.022, 0.013]]], info: "Sob o fígado; liga-se ao colédoco pelo ducto cístico.", fn: "Armazena e concentra a bile", clin: "O sinal de Murphy indica sua inflamação (colecistite)" },
  { id: "pancreas", n: "Pâncreas", sys: ["digestorio", "endocrino"], color: "#e8c07a", parts: [["e", [0.025, 1.03, -0.005], [0.07, 0.014, 0.016], [0, 0, 0.15]]], info: "Cabeça (no arco do duodeno), corpo e cauda (perto do baço). Retroperitoneal.", fn: "Glândula que produz enzimas digestivas e insulina", clin: "Sua inflamação causa dor epigástrica em faixa irradiando para o dorso" },
  { id: "duodeno", n: "Duodeno", sys: ["digestorio"], color: "#e6a27a", parts: [["t", [[0.03, 1.05, 0.04], [-0.02, 1.04, 0.03], [-0.03, 1.0, 0.02], [0, 0.985, 0.01], [0.03, 0.99, 0]], 0.012]], info: "Primeira porção do intestino delgado, em forma de C.", fn: "Recebe a bile e o suco pancreático", clin: "Local mais comum das úlceras pépticas" },
  { id: "delgado", n: "Intestino delgado", sys: ["digestorio"], color: "#e9b48f", parts: smallBowel(), info: "Jejuno e íleo, com cerca de 6 metros.", fn: "Principal local da digestão e absorção de nutrientes", clin: "A obstrução por bridas é comum após cirurgias abdominais" },
  { id: "grosso", n: "Intestino grosso", sys: ["digestorio"], color: "#cf9a73", parts: [["t", [[-0.105, 0.875, 0.055], [-0.11, 0.96, 0.05], [-0.1, 1.03, 0.05], [0, 1.045, 0.07], [0.1, 1.03, 0.05], [0.11, 0.95, 0.04], [0.1, 0.88, 0.04], [0.04, 0.85, 0.05], [0, 0.86, 0.0], [0, 0.8, -0.03]], 0.019]], info: "Ceco, cólons ascendente, transverso, descendente e sigmoide, e reto.", fn: "Absorve água e forma as fezes", clin: "A diverticulite costuma acometer o sigmoide (fossa ilíaca esquerda)" },
  { id: "apendice", n: "Apêndice vermiforme", sys: ["digestorio"], color: "#cf9a73", parts: [["t", [[-0.1, 0.87, 0.06], [-0.095, 0.845, 0.07], [-0.085, 0.83, 0.07]], 0.005]], info: "Sai do ceco, na fossa ilíaca direita.", fn: "Pequeno divertículo do ceco com tecido linfoide", clin: "Sua inflamação causa dor no ponto de McBurney" },
  // Nervoso
  { id: "encefalo", n: "Cérebro", sys: ["nervoso"], color: "#e9b9b5", parts: [["e", [0, 1.648, 0.005], [0.08, 0.072, 0.092]]], info: "Lobos frontal, parietal, temporal e occipital.", fn: "Centro do pensamento, da motricidade voluntária e da sensibilidade", clin: "Órgão lesado no AVC" },
  { id: "cerebelo", n: "Cerebelo", sys: ["nervoso"], color: "#d79a93", parts: [["e", [0, 1.585, -0.06], [0.045, 0.025, 0.035]]], info: "Na fossa posterior, atrás do tronco encefálico.", fn: "Coordena o equilíbrio e os movimentos", clin: "Sua lesão causa ataxia e dismetria (prova index-nariz alterada)" },
  { id: "tronco_enc", n: "Tronco encefálico", sys: ["nervoso"], color: "#e2a79f", parts: [["c", [0, 1.6, -0.02], [0, 1.53, -0.03], 0.012]], info: "Mesencéfalo, ponte e bulbo; origem da maioria dos nervos cranianos.", fn: "Controla a respiração, a frequência cardíaca e a consciência", clin: "Lesão na ponte causa pupilas puntiformes no coma" },
  { id: "medula", n: "Medula espinal", sys: ["nervoso"], parts: [["t", [[0, 1.53, -0.025], [0, 1.44, -0.035], [0, 1.33, -0.06], [0, 1.2, -0.065], [0, 1.08, -0.05], [0, 1.0, -0.045]], 0.006]], info: "Termina no cone medular, em L1–L2 no adulto.", fn: "Conduz informações entre o encéfalo e o corpo", clin: "Por terminar em L1–L2, a punção lombar é feita abaixo, em L3–L5" },
  { id: "isquiatico", n: "Nervo isquiático", sys: ["nervoso"], parts: MP(["t", [[0.05, 0.93, -0.07], [0.09, 0.88, -0.08], [0.1, 0.7, -0.06], [0.105, 0.5, -0.04]], 0.005]), info: "Maior nervo do corpo (raízes L4–S3).", fn: "Nervo que inerva a parte posterior da coxa e quase toda a perna", clin: "Sua compressão causa a dor ciática" },
  { id: "nervos_ms", n: "Nervos do membro superior", sys: ["nervoso"], parts: MP(["t", [[0.03, 1.42, -0.02], [0.12, 1.4, -0.0], [0.2, 1.35, 0.01], [0.235, 1.1, 0.03], [0.265, 0.85, 0.035]], 0.004]), info: "Plexo braquial: mediano, ulnar, radial, musculocutâneo e axilar.", fn: "Nervos que comandam e dão sensibilidade ao braço e à mão", clin: "O mediano é comprimido no túnel do carpo" },
  // Urinário
  { id: "rins", n: "Rins", sys: ["urinario"], color: "#9c4a2f", parts: [["e", [-0.065, 1.005, -0.05], [0.026, 0.048, 0.022]], ["e", [0.065, 1.025, -0.05], [0.026, 0.048, 0.022]]], info: "Retroperitoneais, entre T12 e L3; o direito fica um pouco mais baixo.", fn: "Filtram o sangue e produzem a urina", clin: "Sinal de Giordano positivo sugere pielonefrite" },
  { id: "ureteres", n: "Ureteres", sys: ["urinario"], color: "#c7784e", parts: MP(["t", [[0.055, 0.99, -0.04], [0.045, 0.92, -0.03], [0.035, 0.86, 0.03]], 0.004]), info: "Passam por baixo das artérias uterinas (“água sob a ponte”).", fn: "Levam a urina dos rins à bexiga", clin: "Local de impactação de cálculos na cólica renal" },
  { id: "bexiga", n: "Bexiga urinária", sys: ["urinario"], color: "#d6a64a", parts: [["e", [0, 0.845, 0.055], [0.038, 0.032, 0.032]]], info: "Atrás da sínfise púbica.", fn: "Armazena a urina", clin: "O globo vesical é palpável na retenção urinária" },
  // Endócrino
  { id: "hipofise", n: "Hipófise", sys: ["endocrino"], parts: [["e", [0, 1.615, 0.025], [0.009, 0.009, 0.009]]], info: "Na sela túrcica, ligada ao hipotálamo.", fn: "Glândula que produz GH, prolactina, TSH, ACTH, FSH e LH", clin: "O prolactinoma é seu adenoma funcionante mais comum" },
  { id: "tireoide", n: "Tireoide", sys: ["endocrino"], parts: [...MP(["e", [0.018, 1.445, 0.055], [0.014, 0.022, 0.01]]), ["b", [0, 1.44, 0.062], [0.02, 0.008, 0.006]]], info: "Dois lobos ligados pelo istmo, na frente da traqueia.", fn: "Produz T3, T4 e calcitonina", clin: "Fica difusamente aumentada (bócio) na doença de Graves" },
  { id: "suprarrenais", n: "Glândulas suprarrenais", sys: ["endocrino"], parts: [["e", [-0.065, 1.06, -0.05], [0.018, 0.012, 0.012]], ["e", [0.065, 1.08, -0.05], [0.018, 0.012, 0.012]]], info: "Córtex (aldosterona, cortisol, andrógenos) e medula (catecolaminas).", fn: "Glândulas sobre os rins que produzem cortisol e adrenalina", clin: "Sede do feocromocitoma" },
  // Linfático
  { id: "baco", n: "Baço", sys: ["linfatico"], color: "#7b2f4a", parts: [["e", [0.13, 1.095, -0.03], [0.03, 0.05, 0.025]]], info: "No hipocôndrio esquerdo, entre a 9ª e a 11ª costelas.", fn: "Filtra o sangue, remove hemácias velhas e participa da imunidade", clin: "Órgão abdominal mais lesado no trauma contuso" },
  { id: "timo", n: "Timo", sys: ["linfatico"], parts: [["e", [0, 1.335, 0.075], [0.028, 0.032, 0.012]]], info: "No mediastino anterior; involui após a puberdade.", fn: "Local de maturação dos linfócitos T", clin: "Fica ausente na síndrome de DiGeorge" },
  { id: "linfonodos", n: "Linfonodos (cervicais, axilares e inguinais)", sys: ["linfatico"], parts: [...MP(["e", [0.04, 1.46, 0.03], [0.009, 0.009, 0.009]]), ...MP(["e", [0.048, 1.43, 0.02], [0.008, 0.008, 0.008]]), ...MP(["e", [0.15, 1.31, 0.0], [0.011, 0.011, 0.011]]), ...MP(["e", [0.08, 0.87, 0.06], [0.01, 0.01, 0.01]])], info: "Filtram a linfa ao longo dos vasos linfáticos.", fn: "Filtros da linfa onde os linfócitos encontram antígenos", clin: "Linfonodo supraclavicular esquerdo aumentado (Virchow) sugere neoplasia abdominal" },
  { id: "ducto_toracico", n: "Ducto torácico", sys: ["linfatico"], parts: [["t", [[0.0, 1.0, -0.04], [0.005, 1.2, -0.05], [0.01, 1.35, -0.02], [0.03, 1.4, 0.0]], 0.003]], info: "Maior vaso linfático; drena no ângulo venoso esquerdo.", fn: "Leva a linfa da maior parte do corpo para o sangue venoso", clin: "Sua lesão causa quilotórax" },
  // Reprodutor (feminino e masculino)
  { id: "utero", n: "Útero", sys: ["reprodutor"], sex: "f", parts: [["e", [0, 0.875, 0.02], [0.028, 0.036, 0.022]]], info: "Fundo, corpo e colo; entre a bexiga e o reto.", fn: "Órgão onde o embrião se implanta e se desenvolve", clin: "Local dos miomas, causa comum de sangramento menstrual aumentado" },
  { id: "ovarios", n: "Ovários", sys: ["reprodutor", "endocrino"], sex: "f", parts: MP(["e", [0.055, 0.885, 0.01], [0.012, 0.009, 0.009]]), info: "Produzem óvulos, estrogênio e progesterona.", fn: "Gônadas femininas", clin: "Sua torção causa dor pélvica súbita e é emergência cirúrgica" },
  { id: "tubas", n: "Tubas uterinas", sys: ["reprodutor"], sex: "f", parts: MP(["t", [[0.022, 0.9, 0.02], [0.04, 0.905, 0.02], [0.055, 0.895, 0.012]], 0.003]), info: "Infundíbulo, ampola, istmo e porção intramural.", fn: "Local habitual da fecundação (ampola)", clin: "Local mais comum da gravidez ectópica" },
  { id: "prostata", n: "Próstata", sys: ["reprodutor"], sex: "m", parts: [["e", [0, 0.815, 0.025], [0.018, 0.015, 0.015]]], info: "Abaixo da bexiga, envolvendo a uretra.", fn: "Glândula que produz parte do líquido seminal", clin: "Sua hiperplasia benigna é a principal causa de retenção urinária em idosos" },
  { id: "testiculos", n: "Testículos", sys: ["reprodutor", "endocrino"], sex: "m", parts: MP(["e", [0.018, 0.735, 0.07], [0.013, 0.018, 0.013]]), info: "Produzem espermatozoides e testosterona.", fn: "Gônadas masculinas", clin: "Sua torção é emergência: dor súbita e reflexo cremastérico ausente" },
  { id: "deferentes", n: "Ductos deferentes", sys: ["reprodutor"], sex: "m", parts: MP(["t", [[0.018, 0.75, 0.07], [0.04, 0.83, 0.06], [0.03, 0.88, 0.0], [0.01, 0.83, 0.0]], 0.003]), info: "Passam pelo canal inguinal dentro do funículo espermático.", fn: "Levam os espermatozoides do epidídimo à uretra", clin: "São seccionados na vasectomia" }
];
const anatById = (id) => ANAT.find((a) => a.id === id);
function anatCenter(a) {
  const pts = [];
  a.parts.forEach((p) => {
    if (p[0] === "e" || p[0] === "b") pts.push(p[1]);
    else if (p[0] === "c") pts.push([(p[1][0] + p[2][0]) / 2, (p[1][1] + p[2][1]) / 2, (p[1][2] + p[2][2]) / 2]);
    else pts.push(p[1][Math.floor(p[1].length / 2)]);
  });
  const c = [0, 1, 2].map((k) => pts.reduce((s, p) => s + p[k], 0) / pts.length);
  // para pares simétricos, a etiqueta vai no lado direito do paciente (esquerda da tela)
  if (pts.length > 1 && Math.abs(c[0]) < 0.01 && Math.abs(pts[0][0]) > 0.03) return pts.find((p) => p[0] < 0) || pts[0];
  return c;
}
const SKIN = [["e", [0, 1.625, 0.0], [0.1, 0.125, 0.115]], ["c", [0, 1.46, -0.01], [0, 1.54, 0.0], 0.05], ["e", [0, 1.2, 0.0], [0.175, 0.27, 0.115]], ["e", [0, 0.92, 0], [0.17, 0.1, 0.105]],
  ...MP(["c", [0.205, 1.4, 0], [0.245, 1.06, 0], 0.045]), ...MP(["c", [0.245, 1.06, 0], [0.28, 0.8, 0.01], 0.035]), ...MP(["e", [0.29, 0.75, 0.01], [0.032, 0.065, 0.017]]),
  ...MP(["c", [0.1, 0.9, 0], [0.11, 0.48, 0.01], 0.07]), ...MP(["c", [0.11, 0.48, 0.01], [0.11, 0.08, 0], 0.048]), ...MP(["b", [0.11, 0.03, 0.04], [0.06, 0.04, 0.15]])];

// ---------- Visualizadores (3D e 2D com a mesma interface) ----------
function anatPartMesh(p, color, o) {
  if (p[0] === "e") return mEll(p[1], p[2], color, Object.assign({ r: p[3] }, o));
  if (p[0] === "b") return mBox(p[1], p[2], color, Object.assign({ r: p[3] }, o));
  if (p[0] === "c") return mCyl(p[1], p[2], p[3], color, o);
  if (p[3]) { // tubo segmentado (vértebras)
    const g = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3(p[1].map(V3));
    const n = 26;
    for (let i = 0; i < n; i++) {
      const a = curve.getPoint(i / n), b = curve.getPoint((i + 0.7) / n);
      g.add(mCyl(a.toArray(), b.toArray(), p[2], color, o));
    }
    return g;
  }
  return mTube(p[1], p[2], color, o);
}
async function anatView3D(el, opts) {
  await loadThree();
  const v = createViewer(el, { mode: "orbit", target: [0, 1.0, 0], dist: 2.3, minDist: 0.25, maxDist: 4, bg: "#0d1526" });
  LABV = v;
  const groups = {};
  ANAT.forEach((a) => {
    const g = new THREE.Group();
    const col = a.color || ANAT_SYS[a.sys[0]].c;
    a.parts.forEach((p) => g.add(anatPartMesh(p, col, { rough: 0.55, opacity: a.sys[0] === "muscular" ? 0.92 : 1 })));
    v.add(g, a.id);
    groups[a.id] = g;
  });
  const skin = new THREE.Group();
  SKIN.forEach((p) => skin.add(anatPartMesh(p, "#f1c7a5", { opacity: 0.12, rough: 0.9, emissive: 0x3a2418 })));
  skin.traverse((m) => { if (m.material) m.material.depthWrite = false; });
  v.add(skin);
  const markers = {};
  let labelsOn = false, labelMap = {};
  const api = {
    kind: "3d",
    setVisible(id, b) { groups[id].visible = b; v.refresh(); },
    glow(id, color) { setGlow(groups[id], color === null ? null : color); v.refresh(); },
    ghost(id, b) { setOpacity(groups[id], b ? 0.12 : null); v.refresh(); },
    skin(op) { skin.visible = op > 0.01; skin.traverse((m) => { if (m.material) m.material.opacity = op; }); v.refresh(); },
    muscleOp(op) { ANAT.filter((a) => a.sys[0] === "muscular").forEach((a) => setOpacity(groups[a.id], op)); v.refresh(); },
    focus(id) { const c = anatCenter(anatById(id)); v.setTarget([c[0], c[1], c[2]], 0.9); },
    unfocus() { v.setTarget([0, 1.0, 0], 2.3); },
    onPick(cb) { v.onPick((h) => cb(h ? h.id : null)); },
    onHover(cb) { v.onHover(cb); },
    labels(on, ids) {
      v.clearLabels(); labelMap = {}; labelsOn = on;
      if (on) (ids || []).forEach((id) => { const a = anatById(id); labelMap[id] = v.addLabel(a.n, anatCenter(a)); });
    },
    addMarker(key, pos, num) {
      const m = mEll(pos, [0.018, 0.018, 0.018], "#22d3ee", { opacity: 0.85, emissive: 0x0e7490 });
      v.add(m, "mk:" + key); markers[key] = { m, L: v.addLabel(String(num), pos, "num") };
      v.animate((t) => { if (!markers[key]) return false; const s = 0.018 * (1 + 0.15 * Math.sin(t / 250)); m.scale.set(s, s, s); });
    },
    removeMarker(key) { const k = markers[key]; if (!k) return; k.m.visible = false; v.scene.remove(k.m); k.L.el.remove(); delete markers[key]; v.refresh(); },
    pulse(id) { let on = true; const fn = (t) => { if (!api._pulse || api._pulse !== fn) return false; setGlow(groups[id], 0xfacc15, 0.35 + 0.35 * Math.sin(t / 180)); }; api._pulse = fn; v.animate(fn); },
    stopPulse(id) { api._pulse = null; if (id) setGlow(groups[id], null); v.refresh(); }
  };
  return api;
}
function anatView2D(el) {
  const W = 0.9, H = 1.85;
  el.insertAdjacentHTML("afterbegin", `<svg class="anat2d" viewBox="-0.45 -0.02 ${W} ${H}" preserveAspectRatio="xMidYMid meet"></svg>`);
  const svg = el.querySelector("svg.anat2d");
  let back = false;
  const y = (v) => 1.8 - v;
  const els = [];
  function draw() {
    svg.innerHTML = "";
    const items = [];
    SKIN.forEach((p) => items.push({ p, id: null, color: "#e9b38f", skin: true }));
    ANAT.forEach((a) => a.parts.forEach((p) => items.push({ p, id: a.id, color: a.color || ANAT_SYS[a.sys[0]].c })));
    const zOf = (p) => (p[0] === "t" ? p[1][Math.floor(p[1].length / 2)][2] : p[0] === "c" ? (p[1][2] + p[2][2]) / 2 : p[1][2]);
    items.sort((a, b) => (back ? zOf(b.p) - zOf(a.p) : zOf(a.p) - zOf(b.p)));
    items.forEach((it) => {
      const p = it.p, X = (v) => (back ? -v[0] : v[0]);
      let s = "";
      const base = `data-id="${it.id || ""}" class="${it.skin ? "skin" : "st"}"`;
      const area = `${base} fill="${it.color}" stroke="${it.color}" stroke-width="0.002"`;
      const line = (w) => `${base} fill="none" stroke="${it.color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
      if (p[0] === "e") s = `<ellipse ${area} cx="${X(p[1])}" cy="${y(p[1][1])}" rx="${p[2][0]}" ry="${p[2][1]}" transform="rotate(${-(p[3] ? p[3][2] : 0) * 57.3 * (back ? -1 : 1)} ${X(p[1])} ${y(p[1][1])})"/>`;
      else if (p[0] === "b") s = `<rect ${area} x="${X(p[1]) - p[2][0] / 2}" y="${y(p[1][1]) - p[2][1] / 2}" width="${p[2][0]}" height="${p[2][1]}"/>`;
      else if (p[0] === "c") s = `<line ${line(p[3] * 2)} x1="${X(p[1])}" y1="${y(p[1][1])}" x2="${X(p[2])}" y2="${y(p[2][1])}"/>`;
      else s = `<polyline ${line(p[2] * 2)} points="${p[1].map((q) => `${X(q)},${y(q[1])}`).join(" ")}"/>`;
      svg.insertAdjacentHTML("beforeend", s);
    });
    apply();
  }
  const st = { vis: {}, glow: {}, ghost: {}, skin: 0.12, mus: 0.92 };
  function apply() {
    svg.querySelectorAll(".skin").forEach((e) => { e.style.opacity = st.skin; e.style.pointerEvents = "none"; });
    svg.querySelectorAll(".st").forEach((e) => {
      const id = e.dataset.id, a = anatById(id);
      e.style.display = st.vis[id] === false ? "none" : "";
      let op = st.ghost[id] ? 0.12 : a.sys[0] === "muscular" ? st.mus : 1;
      e.style.opacity = op;
      e.classList.toggle("glow", !!st.glow[id]);
      e.style.setProperty("--gc", st.glow[id] || "");
    });
    svg.querySelectorAll(".mk").forEach((m) => svg.appendChild(m));
  }
  let pickCb = null;
  svg.addEventListener("click", (e) => {
    const t = e.target.closest("[data-id]");
    const mk = e.target.closest("[data-mk]");
    if (mk && pickCb) return pickCb("mk:" + mk.dataset.mk);
    if (pickCb) pickCb(t && t.dataset.id ? t.dataset.id : null);
  });
  draw();
  const api = {
    kind: "2d",
    setVisible(id, b) { st.vis[id] = b; apply(); },
    glow(id, c) { st.glow[id] = c === null ? null : "#" + c.toString(16).padStart(6, "0"); apply(); },
    ghost(id, b) { st.ghost[id] = b; apply(); },
    skin(op) { st.skin = op; apply(); },
    muscleOp(op) { st.mus = op; apply(); },
    focus() {}, unfocus() {},
    onPick(cb) { pickCb = cb; }, onHover() {},
    labels() {},
    flip() { back = !back; draw(); },
    addMarker(key, pos, num) {
      const X = back ? -pos[0] : pos[0];
      svg.insertAdjacentHTML("beforeend", `<g class="mk" data-mk="${key}"><circle cx="${X}" cy="${y(pos[1])}" r="0.022"/><text x="${X}" y="${y(pos[1]) + 0.008}" font-size="0.022" text-anchor="middle">${num}</text></g>`);
    },
    removeMarker(key) { const m = svg.querySelector(`[data-mk="${key}"]`); if (m) m.remove(); },
    pulse(id) { st.glow[id] = "#facc15"; apply(); }, stopPulse(id) { if (id) st.glow[id] = null; apply(); }
  };
  return api;
}

// ---------- Sessão de anatomia ----------
let AN = null; // estado da sessão
function anatSystemsOn(set) {
  ANAT.forEach((a) => {
    const sexOk = !a.sex || a.sex === AN.sex;
    AN.view.setVisible(a.id, sexOk && a.sys.some((s) => set.has(s)) && !(AN.isolated && AN.isolated !== a.id) && !(AN.hidden && AN.hidden.has(a.id)));
  });
}
async function anatLaunch(diff, sub) {
  const sim = labSim("anat3d");
  const SUBN = { estudo: "Estudo livre", localize: "Localize a estrutura", qual: "Qual é essa estrutura?", monte: "Monte o sistema", desafio: "Desafio anatômico" };
  labBegin(sim, diff, { sub, subLabel: SUBN[sub], objective: { estudo: "Explore os sistemas, camadas e estruturas.", localize: "Encontre no modelo a estrutura pedida.", qual: "Identifique a estrutura destacada.", monte: "Coloque cada estrutura na posição correta.", desafio: "Cumpra o máximo de missões antes do tempo acabar." }[sub],
    help: `<ul class="list"><li>Arraste para girar o corpo; use pinça ou a roda do mouse para aproximar.</li><li>Use ⤒ ⤓ para subir ou descer a câmera e ◎ para recentralizar.</li><li>No painel, ligue e desligue sistemas e ajuste as camadas (pele e músculos).</li><li>${sub === "estudo" ? "Toque numa estrutura para ver nome, função e relevância clínica." : "Toque na estrutura para responder. Erros tiram pontos."}</li></ul>` });
  AN = { sub, diff, sex: "f", sys: new Set(["esqueletico", "cardiovascular", "respiratorio", "digestorio", "nervoso", "urinario", "endocrino", "linfatico", "reprodutor"]), isolated: null, hidden: null, explored: new Set(), score: 0, round: 0, correct: 0, total: 0, mistakes: [], good: [], evalMode: sub !== "estudo" };
  $app.innerHTML = labSceneShell({ title: `Anatomia 3D · ${SUBN[sub]}`, objective: LABCTX.objective, progress: 0, score: sub === "estudo" ? undefined : 0, timer: sub === "desafio" ? "down" : "up", left: 0,
    camExtra: `<button onclick="LABV&&LABV.panY(0.12)" aria-label="Subir câmera">▲</button><button onclick="LABV&&LABV.panY(-0.12)" aria-label="Descer câmera">▼</button>${use2D() ? `<button onclick="AN.view.flip&&AN.view.flip()" aria-label="Virar">↺ frente/costas</button>` : ""}`, noCam: use2D() });
  const el = document.getElementById("lab-view");
  AN.view = use2D() ? anatView2D(el) : await anatView3D(el);
  if (use2D()) el.querySelector(".cam-ctrl") && el.querySelector(".cam-ctrl").remove();
  AN.view.onPick((id) => anatPick(id));
  AN.view.onHover((id) => { if (AN.sub === "estudo" && !AN.evalMode) { const h = document.getElementById("an-hover"); if (h) h.textContent = id && anatById(id) ? anatById(id).n : ""; } });
  anatSystemsOn(AN.sys);
  if (sub === "estudo") anatStudyPanel();
  else if (sub === "monte") anatMonteStart();
  else if (sub === "desafio") { AN.endAt = Date.now() + { ini: 120, int: 100, adv: 80 }[diff] * 1000; anatNextRound(); LABT.push(setInterval(() => { if (LABCTX && !LABCTX.pausedAt) { const left = AN.endAt - Date.now(); labTickHud(left); if (left <= 0) anatEnd(); } }, 250)); LABCTX.onResume = () => { AN.endAt += Date.now() - (LABCTX._pz || Date.now()); }; LABCTX.onPause = () => { LABCTX._pz = Date.now(); }; }
  else anatNextRound();
  if (sub !== "desafio") LABT.push(setInterval(() => labTickHud(), 1000));
}

// Estudo livre
function anatStudyPanel(sel) {
  const a = sel && anatById(sel);
  const counts = {};
  ANAT.forEach((x) => x.sys.forEach((s) => (counts[s] = (counts[s] || 0) + 1)));
  setSide(`
    <div class="side-sec"><b>Sistemas</b><div class="filter-chips">${Object.entries(ANAT_SYS).map(([k, s]) => `<button class="fchip sys ${AN.sys.has(k) ? "on" : ""}" style="--sc:${s.c}" onclick="anatToggleSys('${k}')">${esc(s.n)} <small>${counts[k]}</small></button>`).join("")}</div>
      <div class="row wrap"><button class="btn ghost small-btn" onclick="anatAll(true)">Ligar todos</button><button class="btn ghost small-btn" onclick="anatAll(false)">Desligar todos</button></div></div>
    <div class="side-sec"><b>Camadas</b>
      <label class="rng">Pele <input type="range" min="0" max="80" value="${Math.round((AN.skinOp ?? 0.12) * 100)}" oninput="AN.skinOp=this.value/100;AN.view.skin(AN.skinOp)"></label>
      <label class="rng">Músculos <input type="range" min="10" max="100" value="${Math.round((AN.musOp ?? 0.92) * 100)}" oninput="AN.musOp=this.value/100;AN.view.muscleOp(AN.musOp)"></label>
      <div class="row wrap"><button class="btn ghost small-btn" onclick="AN.sex=AN.sex==='f'?'m':'f';anatSystemsOn(AN.sys);anatStudyPanel()">Modelo: ${AN.sex === "f" ? "feminino" : "masculino"} ⇄</button>
      <label class="switch-row inline"><span>Modo avaliação (sem nomes)</span><input type="checkbox" ${AN.evalMode ? "checked" : ""} onchange="AN.evalMode=this.checked;anatStudyPanel(AN.sel)"></label></div></div>
    <div class="side-sec info-card">
      ${a ? (AN.evalMode && !AN.revealed ? `<b>Estrutura selecionada</b><p class="muted-txt">Modo avaliação: tente dizer o nome antes de revelar.</p><button class="btn accent block" onclick="AN.revealed=true;anatStudyPanel(AN.sel)">Revelar</button>` :
        `<span class="tag" style="color:${ANAT_SYS[a.sys[0]].c}">${a.sys.map((s) => ANAT_SYS[s].n).join(" · ")}</span><h3>${esc(a.n)}</h3><p>${esc(a.info)}</p><p><b>Função:</b> ${esc(a.fn)}.</p><p><b>Na clínica:</b> ${esc(a.clin)}.</p>`) +
        `<div class="row wrap"><button class="btn ghost small-btn" onclick="anatIsolate('${a.id}')">${AN.isolated ? "Mostrar todos" : "Isolar"}</button><button class="btn ghost small-btn" onclick="AN.view.focus('${a.id}')">Aproximar</button></div>`
      : `<b>Toque numa estrutura</b><p class="muted-txt">Você verá o nome, a função e a relevância clínica. <span id="an-hover"></span></p>`}
    </div>
    <div class="side-sec"><small>Estruturas exploradas: <b>${AN.explored.size}</b> de ${ANAT.length}</small><div class="bar small"><span style="width:${Math.round((AN.explored.size / ANAT.length) * 100)}%"></span></div>
      <button class="btn primary block" onclick="anatEndStudy()">Concluir estudo</button></div>
    <p class="muted-txt small">Modelo esquemático educacional (posições e proporções aproximadas). Não substitui atlas, peças anatômicas e aulas práticas.</p>`);
  setProgress(AN.explored.size / ANAT.length);
}
function anatToggleSys(k) { AN.sys.has(k) ? AN.sys.delete(k) : AN.sys.add(k); anatSystemsOn(AN.sys); anatStudyPanel(AN.sel); }
function anatAll(on) { AN.sys = new Set(on ? Object.keys(ANAT_SYS) : []); anatSystemsOn(AN.sys); anatStudyPanel(AN.sel); }
function anatIsolate(id) { AN.isolated = AN.isolated ? null : id; anatSystemsOn(AN.sys); if (AN.isolated) AN.view.focus(id); else AN.view.unfocus(); anatStudyPanel(AN.sel); }
function anatEndStudy() {
  const n = AN.explored.size;
  labFinish({ score: n * 10, max: ANAT.length * 10, correct: n, total: ANAT.length, mistakes: [], recs: ["anato", "fisio", "histo"], notes: [`Você explorou ${n} de ${ANAT.length} estruturas. Volte para completar os sistemas que faltam.`] });
}

// Seleção de estruturas
function anatPick(id) {
  if (!AN || (LABCTX && LABCTX.pausedAt)) return;
  if (AN.sub === "estudo") {
    if (!id || !anatById(id)) return;
    if (AN.sel) AN.view.glow(AN.sel, null);
    AN.sel = id; AN.revealed = false; AN.explored.add(id);
    AN.view.glow(id, 0x22d3ee); sfx.flip();
    return anatStudyPanel(id);
  }
  if (AN.sub === "monte") return anatMontePick(id);
  if (AN.sub === "qual") return;
  if (!id || !anatById(id) || AN.lock) return;
  const target = AN.target;
  if (id === target) {
    AN.lock = true;
    const pts = Math.max(30, 100 - AN.tries * 35);
    AN.score += pts + (AN.sub === "desafio" ? 20 : 0); AN.correct++;
    AN.good.push({ title: anatById(target).n, explain: anatById(target).fn });
    S.stats.correct++; S.stats.answered++; bump("correct");
    AN.view.glow(id, 0x22c55e); sfx.ok(); labFlash(`✅ ${esc(anatById(id).n)} · +${pts}`, true);
    setScore(AN.score);
    LABT.push(setTimeout(() => { AN.view.glow(id, null); anatNextRound(); }, 900));
  } else {
    AN.tries++; AN.score = Math.max(0, AN.score - 20); setScore(AN.score);
    S.stats.answered++;
    AN.view.glow(id, 0xf43f5e); sfx.bad();
    labFlash(`❌ Isso é ${AN.evalMode && AN.diff === "adv" ? "outra estrutura" : esc(anatById(id).n)}`, false);
    LABT.push(setTimeout(() => AN.view.glow(id, null), 700));
    const limit = AN.diff === "adv" ? 2 : 3;
    if (AN.tries >= limit) {
      AN.lock = true;
      const a = anatById(target);
      AN.mistakes.push({ title: `${AN.prompt} → ${a.n}`, explain: `${a.info} Função: ${a.fn}.`, disc: "anato", card: { f: AN.prompt.startsWith("Encontre") ? `Onde fica: ${a.n}?` : AN.prompt, b: `${a.n}. ${a.info}` } });
      AN.view.glow(target, 0xfacc15); labFlash(`A estrutura era: <b>${esc(a.n)}</b>`);
      LABT.push(setTimeout(() => { AN.view.glow(target, null); anatNextRound(); }, 1700));
    }
  }
}

// Escolha da próxima estrutura (a dificuldade muda o tipo de pista e o que fica visível)
function anatPool() {
  const base = ANAT.filter((a) => !a.sex || a.sex === AN.sex);
  if (AN.diff === "ini") return base.filter((a) => !["linfonodos", "ducto_toracico", "hipofise", "tubas", "deferentes", "nervos_ms"].includes(a.id));
  return base;
}
function anatNextRound() {
  AN.lock = false; AN.tries = 0;
  const rounds = { ini: 6, int: 8, adv: 10 }[AN.diff];
  if (AN.sub !== "desafio" && AN.round >= rounds) return anatEnd();
  AN.round++; AN.total++;
  setProgress(AN.sub === "desafio" ? 0 : (AN.round - 1) / rounds);
  const used = new Set((AN.used = AN.used || []));
  let pool = anatPool().filter((a) => !used.has(a.id));
  if (!pool.length) { AN.used = []; pool = anatPool(); }
  const a = pool[Math.floor(Math.random() * pool.length)] || anatPool()[0];
  AN.used.push(a.id); AN.target = a.id;
  // Visibilidade por nível
  let set;
  if (AN.diff === "ini") set = new Set([a.sys[0]]);
  else if (AN.diff === "int") { const others = shuffle(Object.keys(ANAT_SYS).filter((s) => s !== a.sys[0] && s !== "muscular")).slice(0, 2); set = new Set([a.sys[0], ...others]); }
  else set = new Set(Object.keys(ANAT_SYS).filter((s) => s !== "muscular" || a.sys.includes("muscular")));
  if (a.sys.includes("muscular")) set.add("esqueletico");
  AN.sys = set; anatSystemsOn(set);
  AN.view.skin(AN.diff === "adv" ? 0.08 : 0.05);
  if (AN.sub === "qual") return anatQualRound(a);
  AN.prompt = AN.diff === "ini" || (AN.sub === "desafio" && AN.diff === "ini") ? `Encontre: ${a.n}` : AN.diff === "int" ? `Encontre a estrutura: ${a.fn.toLowerCase()}` : `Caso: ${a.clin}`;
  setSide(`
    <div class="side-sec prompt-card"><small>${AN.sub === "desafio" ? "Missão " + AN.round : `Rodada ${AN.round} de ${rounds}`}</small><h3>${esc(AN.prompt)}</h3>
      <p class="muted-txt small">${AN.diff === "ini" ? `Dica: sistema ${esc(ANAT_SYS[a.sys[0]].n.toLowerCase())}.` : AN.diff === "int" ? "Pista pela função. Vários sistemas estão visíveis." : "Pista clínica. Todos os sistemas visíveis, sem nomes."}</p></div>
    <div class="side-sec"><small>Sistemas visíveis</small><div class="filter-chips">${[...set].map((s) => `<span class="fchip sys on" style="--sc:${ANAT_SYS[s].c}">${esc(ANAT_SYS[s].n)}</span>`).join("")}</div></div>
    <div class="side-sec"><small>Acertos: ${AN.correct} · Tentativas nesta rodada: ${AN.tries}</small></div>`);
}
function anatQualRound(a) {
  AN.view.pulse(a.id); AN.view.focus(a.id);
  let opts;
  if (AN.diff === "ini") opts = shuffle(anatPool().filter((x) => x.sys[0] === a.sys[0] && x.id !== a.id)).slice(0, 2);
  else if (AN.diff === "int") opts = shuffle(anatPool().filter((x) => x.sys[0] === a.sys[0] && x.id !== a.id)).slice(0, 3);
  else { const c = anatCenter(a); opts = anatPool().filter((x) => x.id !== a.id).map((x) => { const d = anatCenter(x); return { x, d: Math.hypot(d[0] - c[0], d[1] - c[1], d[2] - c[2]) }; }).sort((p, q) => p.d - q.d).slice(0, 3).map((p) => p.x); }
  while (opts.length < (AN.diff === "ini" ? 2 : 3)) { const r = anatPool()[Math.floor(Math.random() * anatPool().length)]; if (r.id !== a.id && !opts.includes(r)) opts.push(r); }
  const all = shuffle([a, ...opts]);
  AN.prompt = "Qual é a estrutura destacada?";
  setSide(`
    <div class="side-sec prompt-card"><small>Rodada ${AN.round} de ${{ ini: 6, int: 8, adv: 10 }[AN.diff]}</small><h3>Qual é a estrutura destacada em amarelo?</h3>
      <p class="muted-txt small">${AN.diff === "adv" ? "As opções são estruturas vizinhas: observe a posição com cuidado." : "Gire o modelo para ver melhor."}</p></div>
    <div class="options">${all.map((x) => `<button class="opt" onclick="anatQualAnswer('${x.id}')"><span>${esc(x.n)}</span></button>`).join("")}</div>`);
}
function anatQualAnswer(id) {
  if (AN.lock) return;
  AN.lock = true;
  const a = anatById(AN.target);
  AN.view.stopPulse(a.id);
  S.stats.answered++;
  if (id === a.id) { AN.score += 100; AN.correct++; S.stats.correct++; bump("correct"); AN.good.push({ title: a.n, explain: a.fn }); AN.view.glow(a.id, 0x22c55e); sfx.ok(); labFlash(`✅ ${esc(a.n)} · +100`, true); }
  else {
    AN.view.glow(a.id, 0xf43f5e); sfx.bad(); labFlash(`❌ Era <b>${esc(a.n)}</b>`, false);
    AN.mistakes.push({ title: `Estrutura destacada: ${a.n} (você marcou ${anatById(id).n})`, explain: `${a.info} Função: ${a.fn}.`, disc: "anato", card: { f: `Estrutura: ${a.info}`, b: a.n }, mc: { q: `Qual estrutura: ${a.info}`, o: [a.n, anatById(id).n], a: 0, e: a.fn } });
  }
  setScore(AN.score);
  LABT.push(setTimeout(() => { AN.view.glow(a.id, null); AN.view.unfocus(); anatNextRound(); }, 1300));
}

// Monte o sistema
function anatMonteStart() {
  const sysChoices = { ini: ["respiratorio", "urinario", "cardiovascular"], int: ["digestorio", "cardiovascular", "respiratorio", "esqueletico", "nervoso"], adv: ["digestorio", "esqueletico", "nervoso", "endocrino", "linfatico"] }[AN.diff];
  const s1 = sysChoices[Math.floor(Math.random() * sysChoices.length)];
  let list = ANAT.filter((a) => a.sys[0] === s1 && (!a.sex || a.sex === AN.sex));
  if (AN.diff === "adv") { const s2 = shuffle(sysChoices.filter((s) => s !== s1))[0]; list = list.concat(ANAT.filter((a) => a.sys[0] === s2 && (!a.sex || a.sex === AN.sex))); AN.sysNames = [s1, s2]; } else AN.sysNames = [s1];
  list = shuffle(list).slice(0, { ini: 5, int: 7, adv: 10 }[AN.diff]);
  AN.place = list.map((a) => a.id);
  AN.total = list.length;
  AN.hidden = new Set(AN.place);
  AN.sys = new Set(["esqueletico", ...AN.sysNames]);
  anatSystemsOn(AN.sys);
  AN.view.skin(0.06);
  const nums = shuffle(AN.place.map((_, i) => i + 1));
  AN.place.forEach((id, i) => AN.view.addMarker(id, anatCenter(anatById(id)), nums[i]));
  AN.left = AN.place.slice();
  AN.pick = null;
  anatMontePanel();
}
function anatMontePanel() {
  setSide(`
    <div class="side-sec prompt-card"><small>Monte o sistema ${AN.sysNames.map((s) => ANAT_SYS[s].n.toLowerCase()).join(" + ")}</small>
      <h3>${AN.pick ? `Agora toque no marcador onde fica: ${esc(anatById(AN.pick).n)}` : "Escolha uma estrutura e depois toque no marcador numerado onde ela fica."}</h3></div>
    <div class="chips-pool">${shuffle(AN.left.slice()).sort().map((id) => `<button class="chip-btn ${AN.pick === id ? "sel" : ""}" onclick="AN.pick='${id}';anatMontePanel()">${esc(anatById(id).n)}${AN.diff === "ini" ? `<small>${esc(anatById(id).fn)}</small>` : ""}</button>`).join("")}</div>
    <div class="side-sec"><small>Colocadas: ${AN.correct} de ${AN.total} · Erros: ${AN.mistakes.length}</small></div>`);
  setProgress(AN.correct / AN.total);
}
function anatMontePick(id) {
  if (!id || !id.startsWith("mk:")) return;
  const key = id.slice(3);
  if (!AN.pick) return labFlash("Escolha primeiro uma estrutura na lista.");
  S.stats.answered++;
  if (key === AN.pick) {
    AN.view.removeMarker(key); AN.hidden.delete(key); anatSystemsOn(AN.sys);
    AN.view.glow(key, 0x22c55e); LABT.push(setTimeout(() => AN.view.glow(key, null), 800));
    AN.left = AN.left.filter((x) => x !== key); AN.correct++; AN.score += 100; S.stats.correct++; bump("correct");
    AN.good.push({ title: anatById(key).n, explain: anatById(key).info });
    sfx.ok(); labFlash(`✅ ${esc(anatById(key).n)}: posição correta!`, true);
    AN.pick = null; setScore(AN.score);
    if (!AN.left.length) return LABT.push(setTimeout(anatEnd, 900));
  } else {
    AN.score = Math.max(0, AN.score - 25); setScore(AN.score); sfx.bad();
    const a = anatById(AN.pick);
    if (!AN.mistakes.some((m) => m.id === a.id)) AN.mistakes.push({ id: a.id, title: `Posição de: ${a.n}`, explain: a.info, disc: "anato", card: { f: `Onde fica: ${a.n}?`, b: a.info } });
    labFlash("❌ Essa não é a posição dessa estrutura.", false);
  }
  anatMontePanel();
}
function anatEnd() {
  if (!AN || AN.ended) return;
  AN.ended = true;
  if (AN.sub !== "estudo") { const pct = AN.total ? AN.correct / AN.total : 0; if (pct >= 0.7) S.lab.stats.anatomy++; bumpWeek("anat"); }
  const max = AN.sub === "desafio" ? Math.max(AN.score, AN.total * 120) : AN.total * 100;
  labFinish({ score: AN.score, max, correct: AN.correct, total: AN.total, mistakes: AN.mistakes, good: AN.good, recs: ["anato", "fisio", "semio"],
    notes: AN.sub === "desafio" ? [`Você cumpriu ${AN.correct} missões em ${AN.total} tentativas.`] : [] });
}

labRegister({
  id: "anat3d", mode: "anatomy", disc: "anato", icon: "🫀", title: "Anatomia interativa 3D", category: "Exploração e jogos anatômicos",
  desc: "Corpo humano em 3D com 10 sistemas e cerca de 70 estruturas. Gire, aproxime, ajuste as camadas, isole estruturas e jogue.",
  objective: "Reconhecer estruturas anatômicas, sua localização, função e relevância clínica.",
  subs: [
    { id: "estudo", n: "Estudo livre", d: "Explore à vontade: sistemas, camadas, isolamento e informações de cada estrutura." },
    { id: "localize", n: "Localize a estrutura", d: "O app pede uma estrutura e você toca nela no modelo." },
    { id: "qual", n: "Qual é essa estrutura?", d: "Uma estrutura é destacada e você escolhe o nome." },
    { id: "monte", n: "Monte o sistema", d: "Coloque as estruturas nas posições corretas." },
    { id: "desafio", n: "Desafio anatômico", d: "Missões contra o relógio: quantas você cumpre?" }
  ],
  diffs: { ini: "Um sistema por vez, pistas pelo nome e opções do mesmo sistema.", int: "Vários sistemas visíveis e pistas pela função.", adv: "Todos os sistemas, pistas clínicas e opções entre estruturas vizinhas." },
  time: { ini: 5, int: 7, adv: 10 }, xp: { ini: 40, int: 60, adv: 90 },
  refs: ["Moore KL. Anatomia orientada para a clínica", "Netter FH. Atlas de anatomia humana"],
  review: { status: "pendente" },
  launch: anatLaunch,
  count: () => ANAT.length,
  data: () => ({ sistemas: ANAT_SYS, estruturas: ANAT.map((a) => ({ id: a.id, nome: a.n, sistemas: a.sys, info: a.info, funcao: a.fn, clinica: a.clin })) }),
  validate: () => ANAT.filter((a) => !a.n || !a.sys || !a.sys.every((s) => ANAT_SYS[s]) || !a.parts.length || !a.fn || !a.clin).map((a) => "estrutura incompleta: " + a.id)
});
