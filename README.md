# Jogo da Velha - Mostra Campus

Olá! Esse é um projeto que eu fiz para a **Mostra Campus** da UNINASSAU Caruaru, do curso de Análise e Desenvolvimento de Sistemas.

É um jogo da velha contra o computador, com a cara do evento. Também tem uma página falando um pouco sobre o curso.

## Como abrir

Não precisa instalar nada.

1. Abra a pasta do projeto no VS Code (ou no Cursor).
2. Clique com o botão direito no arquivo `index.html`.
3. Escolha **Open with Live Server**.

Se não tiver o Live Server, dá para abrir o `index.html` direto no navegador.

## O que tem no site

- **Início:** o jogo da velha
- **Sobre o curso:** informações do ADS da UNINASSAU Caruaru

Na tela do jogo tem o tabuleiro no centro, um cronômetro e um ranking do lado direito.

## Como jogar

1. Clique em **Escolher nome** e digite como você quer aparecer no ranking.
2. Escolha se você quer ser **X** ou **O**. O que sobrar fica com o computador.
3. Clique em **Iniciar jogo**. Só então o tabuleiro libera e o cronômetro começa.
4. O **X** sempre começa. Se você for O, o computador joga primeiro (ele espera 1 segundo).
5. Você tem **15 segundos** para tentar vencer. Se o tempo chegar a zero, você perde e o computador ganha.

O computador tenta jogar da melhor forma possível. Se os dois jogarem bem, a partida pode empatar.

## Botões da partida

- **Iniciar jogo:** começa a partida e o cronômetro (precisa ter nome e símbolo).
- **Reiniciar jogo:** começa outra partida na hora, com o mesmo jogador. O timer volta a contar sozinho.
- **Novo Jogo:** limpa o nome e o símbolo para outra pessoa jogar. O ranking continua.

Os três botões ficam na mesma linha, embaixo do tabuleiro.

## Cronômetro

O tempo só começa quando a partida inicia.

Ele **para** quando a pessoa vence, perde ou empata. O número fica parado na tela até começar o próximo jogo.

## Aviso no fim da partida

O aviso na tela **só aparece** depois de:

- **Vencer**
- **Perder** (o computador ganhou ou o tempo acabou)
- **Empatar**

Nesse aviso dá para escolher:

- **Reiniciar jogo** — mesma pessoa, nova partida na hora
- **Novo Jogo** — outra pessoa pode entrar (escolhe nome e símbolo de novo)

## Ranking

Do lado direito aparece um ranking de até **10 vencedores**.

Só entra quem **venceu** o computador. Empate, derrota ou tempo esgotado não entram.

Cada linha mostra o nome e o tempo que a pessoa levou para ganhar. Quem vence mais rápido fica em cima. O ranking fica salvo no navegador.

## Arquivos

- `index.html` — página do jogo
- `sobre.html` — página sobre o curso
- `style.css` — visual do site
- `script.js` — regras, timer, ranking, avisos e jogadas

Foi feito só com HTML, CSS e JavaScript.
