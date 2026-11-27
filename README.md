# MedQuest 🩺🎮

App para estudar medicina como um jogo, usando técnicas que ajudam a fixar o conteúdo.

## Como abrir

O app fica na pasta `medquest/` e não precisa de instalação.

- **Rápido:** abra `medquest/index.html` no navegador.
- **Com servidor local** (ativa o modo offline e "Adicionar à tela inicial" no celular):
  ```bash
  cd medquest && python3 -m http.server 8000
  ```
  Depois acesse http://localhost:8000.
- **Versão publicada (arquivo único):** `python3 medquest/build_single.py medquest.html`.

O progresso fica salvo no navegador (localStorage).

## Matérias (28)

| Ciclo básico | Ciclo clínico |
|---|---|
| Anatomia, Fisiologia, Bioquímica, Histologia | Semiologia, Patologia, Cardiologia, Pneumologia |
| Embriologia, Genética, Imunologia, Microbiologia | Gastroenterologia, Nefrologia, Endocrinologia, Hematologia |
| Parasitologia, Farmacologia, Saúde Coletiva | Reumatologia, Neurologia, Infectologia, Dermatologia |
| | Psiquiatria, Pediatria, Ginecologia e Obstetrícia, Cirurgia, Urgência & Emergência |

Cada matéria é um mundo com 6 fases e cerca de 70 itens: 20 flashcards, 15 questões, 12 de verdadeiro ou falso, 10 pares, 2 ou 3 quebra-cabeças e 3 casos clínicos (cerca de 1.900 itens no total). A cada partida, a fase sorteia um lote diferente (12 cards, 10 questões, 6 pares). Os flashcards nunca estudados aparecem primeiro.

Cada matéria é um mundo com 6 fases. É preciso ganhar pelo menos 1 ⭐ numa fase para liberar a próxima:
🃏 Flashcards (revisão espaçada) · ❓ Quiz · ⚡ Verdadeiro ou Falso · 🔗 Ligue os pares ·
🧩 Quebra-cabeça (montar estruturas e processos na ordem certa) · 👑 Chefão: caso clínico.

## Meu semestre

Na primeira abertura, o aluno escolhe o período (1º ao 12º). O Mapa abre em **⭐ Meu semestre**, só com as matérias daquele período.
O Contra o relógio e o simulado também partem dessas matérias.

- A grade padrão (`GRADE_PADRAO`, em `js/data-extra2.js`) segue um currículo típico. Do 9º ao 12º período (internato) entram as grandes áreas clínicas.
- Cada faculdade é diferente, então o aluno pode marcar e desmarcar matérias em **Editar grade** ou restaurar a grade padrão.
- Trocar de período não apaga o progresso das matérias anteriores.
- Em desafios e batalhas, "Meu semestre" vira uma lista fixa de matérias. Assim todos os participantes jogam as mesmas questões, mesmo estando em períodos diferentes.

## Seu material vira jogo

Na aba **Materiais**, envie PDFs de aulas, slides (.pptx), resumos, anotações (.docx, .txt, .md) ou apostilas.
O texto é lido no próprio navegador e vira um mundo com flashcards, quiz, V ou F, pares, quebra-cabeças e caso clínico.

- **Na versão publicada** (link do Claude), a IA cria as questões a partir do seu conteúdo. Ela também lê fotos de anotações.
- **Fora dela**, o modo offline monta os jogos a partir de definições ("Termo: explicação", "X é …") e de listas numeradas.
- PDFs escaneados (só imagem) não têm texto. Nesse caso, envie fotos das páginas na versão publicada.

## Arena e progressão

- ⏱️ **Contra o relógio:** 60 segundos; cada erro tira 3 s; combos valem mais. Tem recorde.
- 🤝 **Desafio entre amigos:** você joga e gera um código (`MQ1-…`). Seu amigo cola o código, joga as mesmas perguntas e vê quem ganhou. Funciona sem internet e sem servidor.
- ⚔️ **Batalhas de conhecimento:**
  - online, na versão publicada: as mesmas 10 questões para todos, e acertar rápido vale mais;
  - no mesmo aparelho: dois jogadores revezam o celular.
- 🏆 **Ranking semanal** de XP entre estudantes (versão publicada).
- 🎯 **Missões diárias:** 3 por dia; cumprir todas abre o baú com bônus.
- 🔥 Sequência de dias, ✨ XP e níveis, 🏅 16 medalhas (bronze, prata e ouro).
- 🧑‍⚕️ **Avatar personalizável:** acessórios e molduras desbloqueados com nível e conquistas.

## Revisão

- 🔁 **Revisão espaçada** (algoritmo SM-2) dos flashcards.
- ❌ **Caderno de erros personalizado:** filtra por matéria, mostra as questões mais erradas e tira a questão do caderno quando você acerta.
- 📝 **Simulados:** você escolhe as matérias, a quantidade e se tem cronômetro. A correção vem só no fim, com o desempenho por matéria.
- 🍅 **Pomodoro** com XP.

## Código

| Arquivo | Conteúdo |
|---|---|
| `js/data.js`, `js/data-extra.js`, `js/data-extra2.js` | Conteúdo base das matérias e grade por período |
| `js/more1.js` … `js/more7.js` | Conteúdo ampliado (formato compacto, via `addContent`) |
| `js/core.js` | Estado, XP, missões, medalhas, avatar, revisão espaçada |
| `js/games.js` | Modos de jogo |
| `js/online.js` | Desafio por código, ranking e batalhas online |
| `js/materials.js` | Leitura de arquivos e geração de jogos |
| `js/screens.js` | Telas e navegação |

Para criar uma matéria, copie um objeto de `WORLDS` e preencha `flashcards`, `quiz`, `tf`, `pairs`, `seq` e `cases`.

> Conteúdo para fins educacionais, não revisado por médicos. Sempre confira condutas em referências atualizadas.
