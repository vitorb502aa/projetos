/* MedQuest — configuração pública da página de vendas.
   Preços e links de checkout VÁLIDOS vêm do servidor (/api/offer), que é a fonte da verdade.
   Os valores abaixo são usados apenas quando o servidor não responde (por exemplo, na pré-visualização). */
window.MQ_CONFIG = {
  // Endereço da API. Deixe "" quando a página e a API estão no mesmo domínio.
  apiBase: "",

  // Rastreamento (vazio = desligado). Preencha com os seus IDs reais.
  metaPixelId: "",
  utmify: { enabled: false, script: "https://cdn.utmify.com.br/scripts/utms/latest.js" },
  // Parâmetro usado para levar o código do pedido até o checkout (confira o nome aceito pela sua plataforma).
  refParam: "sck",

  // Valores de reserva (o servidor sobrescreve). Os planejados NÃO estão ativos.
  pricing: {
    currency: "BRL",
    offer: { enabled: true, durationHours: 24 },
    monthly: { price: 29.9, checkout: "" },
    annual: { regular: 127, promo: 97, checkoutRegular: "", checkoutPromo: "" },
    planned: { active: false, monthly: 47, annual: 197 }
  },

  // Condições comerciais exibidas na página (ajuste para refletir a sua plataforma de pagamento).
  terms: {
    monthly: "Assinatura mensal com cobrança recorrente a cada 30 dias. Renova automaticamente até você cancelar; o cancelamento interrompe as próximas cobranças.",
    annual: "Pagamento à vista ou parcelado, conforme a plataforma de pagamento, por 12 meses de acesso. Ao fim do período, a renovação é automática pelo valor vigente do plano anual, com aviso por e-mail antes da cobrança. Você pode cancelar a renovação a qualquer momento.",
    guaranteeDays: 7
  },

  support: {
    email: "suporte@seudominio.com.br",
    whatsapp: "",
    hours: "Segunda a sexta, das 9h às 18h (horário de Brasília)"
  },
  company: { name: "Nome da empresa responsável", doc: "CNPJ 00.000.000/0000-00" },

  // Bônus: só aparecem os que estão disponíveis no app.
  bonuses: [
    { id: "planner", available: true, title: "Planner de Estudos para Medicina", desc: "Cadastre suas provas e receba um plano de 7 dias com o que revisar em cada matéria.", img: "img/p-planner2.webp" },
    { id: "mapas", available: false, title: "Mapas Mentais de Medicina", desc: "Revise conceitos importantes através de materiais visuais.", img: "" },
    { id: "guia", available: true, title: "Guia de Técnicas de Memorização", desc: "Dez técnicas com base científica e como aplicar cada uma dentro do MedQuest.", img: "img/p-guide.webp" },
    { id: "simulados", available: true, title: "Simulados de Revisão", desc: "Monte simulados com as matérias que quiser, com tempo, correção comentada e caderno de erros.", img: "img/p-simcfg.webp" }
  ],

  // Depoimentos reais e autorizados. Enquanto a lista estiver vazia, a seção fica oculta.
  // Formato: { name: "Nome", term: "5º semestre", text: "…", img: "img/depoimento-1.webp" (opcional), consent: true }
  testimonials: []
};
