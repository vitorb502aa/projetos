# MedQuest 🩺🎮

Um app para estudar medicina como um jogo, com técnicas que ajudam a fixar o conteúdo.

## Como abrir

O app fica na pasta `medquest/` e não precisa de instalação nem de internet (depois do primeiro acesso).

- **Rápido:** abra `medquest/index.html` no navegador.
- **Com servidor local** (ativa o modo offline e "Adicionar à tela inicial" no celular):
  ```bash
  cd medquest && python3 -m http.server 8000
  ```
  Depois acesse http://localhost:8000.
- **Publicar:** ative o GitHub Pages no repositório e acesse `/medquest/`.

O progresso fica salvo no próprio navegador (localStorage).

## Como o jogo funciona

**6 mundos (sessões):** Anatomia, Fisiologia, Farmacologia, Microbiologia, Patologia e Urgência & Clínica.
Cada mundo tem 5 fases. Ganhe pelo menos 1 ⭐ para liberar a próxima.

| Fase | Método de estudo |
|---|---|
| 🃏 Flashcards | Recordação ativa + revisão espaçada (algoritmo SM-2) |
| ❓ Quiz | Teste de múltipla escolha com explicação · 3 vidas |
| ⚡ Verdadeiro ou Falso | Rodada relâmpago (10 s), com bônus de velocidade |
| 🔗 Ligue os pares | Associação de conceitos |
| 👑 Chefão | Caso clínico em etapas · 2 vidas |

**Aba Revisão**
- 🔁 **Revisão do dia:** os flashcards voltam no momento certo para não serem esquecidos.
- ❌ **Caderno de erros:** toda questão errada entra aqui e só sai quando você acertar.
- 🧩 **Modo Desafio:** 12 questões misturando todas as matérias (intercalação).
- 🍅 **Pomodoro:** 25 min de foco, que rendem +30 XP.

**Meus cards:** crie seus próprios flashcards; eles entram na revisão espaçada.

**Gamificação:** XP, níveis com títulos (de Calouro(a) a Lenda do Plantão), combo de acertos,
sequência de dias 🔥, meta diária 🎯 e 14 conquistas.

## Adicionar conteúdo

Todo o conteúdo fica em `medquest/js/data.js`. Para criar um mundo novo, copie um dos objetos de
`WORLDS` e preencha `flashcards`, `quiz`, `tf`, `pairs` e `cases`.

> Conteúdo para fins educacionais. Sempre confira condutas em referências atualizadas.
