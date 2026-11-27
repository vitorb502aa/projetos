# MedQuest: página de vendas

Página de vendas do MedQuest com:
- capturas e gravações reais do app;
- quiz de demonstração jogável;
- anatomia 3D carregada sob demanda;
- oferta de boas-vindas de 24 horas controlada pelo servidor;
- rastreamento com Meta Pixel e UTMify.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html`, `css/vendas.css`, `js/vendas.js` | Página de vendas |
| `js/config.js` | Configuração pública: Pixel, UTMify, suporte, empresa, textos de cobrança, bônus e depoimentos |
| `js/offer.js` | Identificador anônimo, oferta de 24 h e links de checkout |
| `js/tracking.js` | Meta Pixel, UTMify, preservação de UTMs e eventos sem duplicidade |
| `js/disciplinas.js` | Disciplinas, modos de jogo e simulações, gerados a partir dos dados reais do app |
| `img/`, `video/` | Capturas (WebP) e gravações (MP4) do app |
| `app/index.html` | App completo em um arquivo, usado na demonstração 3D (`#demo-anat`) |
| `obrigado.html` | Página pós-compra. Dispara o `Purchase` só depois que o servidor confirma o pagamento |
| `admin.html` | Painel para alterar preços e links sem mexer no código |
| `privacidade.html`, `termos.html` | Política de privacidade e termos. Revise com o seu jurídico |
| `server/server.js` | Servidor Node 18+, sem dependências |
| `server/config.json` | Preços, links de checkout, oferta e preços planejados |

## Como rodar

```bash
cd medquest-vendas
ADMIN_TOKEN=um-token-forte WEBHOOK_SECRET=outro-segredo PORT=8080 node server/server.js
```

Variáveis opcionais:

| Variável | Para quê |
|---|---|
| `META_PIXEL_ID` + `META_CAPI_TOKEN` | Enviar o Purchase também pela API de Conversões, com o mesmo `event_id` do navegador para deduplicar |
| `PUBLIC_URL` | URL pública da página, enviada à API de Conversões |
| `DATA_DIR` | Pasta onde ficam os registros. Padrão: `server/data` |

## O que configurar antes de publicar

1. **Links de checkout** (em `admin.html` ou em `server/config.json`):
   - um link para o plano mensal;
   - um link para o anual pelo preço regular;
   - um link para o anual pelo preço promocional.

   Na plataforma de pagamento, crie duas ofertas do plano anual: R$ 127 e R$ 97.
2. **Retorno da compra:** configure a plataforma para:
   - redirecionar o comprador para `https://SEU-DOMINIO/obrigado.html`;
   - enviar o webhook de compra para `https://SEU-DOMINIO/api/webhook?token=WEBHOOK_SECRET`.

   O código do pedido segue no parâmetro `sck`, configurável em `refParam`. Confira se a sua plataforma devolve esse parâmetro no webhook.
3. **Rastreamento** (em `js/config.js`): preencha `metaPixelId` e ative `utmify.enabled`.
4. **Empresa e contato:** `company`, `support` e os textos de `terms`, com as regras reais de cobrança, renovação e reembolso.
5. **Depoimentos:** só adicione depoimentos reais e autorizados (`consent: true`). Com a lista vazia, a seção fica oculta.

## Como a oferta funciona

- Na primeira visita, o navegador recebe um código aleatório, guardado no armazenamento local e em um cookie próprio. O servidor registra a data e a hora pelo próprio relógio.
- O contador usa a hora do servidor e não reinicia ao recarregar a página.
- Ao vencer:
  - o preço muda para R$ 127;
  - o contador e a barra somem;
  - a economia passa a 65%;
  - o botão leva ao checkout regular.
- `/api/go` decide no servidor qual link de checkout entregar. Quem pedir o link promocional depois do prazo recebe o regular.
- Ao vincular um e-mail (`MQO.linkAccount(email)`) ou receber o webhook com e-mail, a oferta passa a usar a visita mais antiga daquela conta.
- **Limites:**
  - quem limpa os dados do navegador ganha uma nova oferta. Isso é inerente a não usar identificação invasiva;
  - um link promocional copiado e usado fora do prazo não é bloqueado pela plataforma de pagamento. O webhook marca esse pedido com `flag: "promocao_fora_do_prazo"` para revisão.

## Preços planejados

Os valores R$ 47 (mensal) e R$ 197 (anual) estão em `planned` com `active: false`. Para ativar no futuro, marque a opção em `admin.html`.

## Testes realizados

Foram 59 verificações automatizadas, todas aprovadas:
- oferta ativa e vencida, inclusive a troca ao vivo quando o tempo acaba;
- persistência após recarregar;
- validação do preço no servidor;
- vínculo com a conta;
- checkout com UTMs e `sck`;
- `InitiateCheckout`;
- `Purchase` só após o webhook, sem duplicar;
- webhook sem token recusado e webhook duplicado ignorado;
- todos os botões, o quiz, as disciplinas, o FAQ e o 3D sob demanda;
- CTA fixo no celular;
- larguras de 320 a 1920 px, sem rolagem lateral.

A rota `/api/test/age` só existe com `TEST_MODE=1`.
