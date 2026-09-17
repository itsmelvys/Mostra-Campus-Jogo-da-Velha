# Mostra Campus | Jogo da Velha

Projeto desenvolvido para a **Mostra Campus 2026.2 da UNINASSAU Caruaru**, como uma forma interativa de apresentar o curso de **Análise e Desenvolvimento de Sistemas (ADS)** aos visitantes do evento.

A proposta foi unir tecnologia e diversão em uma experiência simples: um jogo da velha no qual o visitante pode desafiar o computador enquanto conhece um pouco mais sobre o curso e a área de tecnologia.

## Sobre o projeto

O projeto conta com duas páginas principais:

- **Início:** onde acontece o jogo da velha;
- **Sobre o curso:** apresenta informações sobre Análise e Desenvolvimento de Sistemas na UNINASSAU Caruaru.

No jogo, o visitante informa seu nome, escolhe entre **X** ou **O** e tem 15 segundos para tentar vencer o computador.

O computador joga de forma simples: se puder ganhar na hora, ele ganha; senão, escolhe uma casa vazia. Assim o visitante consegue vencer e entrar no ranking.

## Funcionalidades

- Identificação do jogador;
- Escolha entre X e O;
- Partidas contra o computador;
- Jogadas simples do computador, para o visitante poder vencer;
- Cronômetro de 15 segundos;
- Avisos de vitória, derrota e empate;
- Ranking com os 10 melhores vencedores;
- Classificação pelo menor tempo de vitória;
- Ranking salvo localmente no navegador;
- Opção de reiniciar a partida;
- Opção de iniciar um jogo com um novo participante;
- Página com informações sobre o curso de ADS.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

- HTML5
- CSS3
- JavaScript
- LocalStorage

Não foram utilizados frameworks ou bibliotecas JavaScript.

## Como jogar

1. Clique em **Escolher nome** e informe seu nome.
2. Escolha se deseja jogar com **X** ou **O**.
3. Clique em **Iniciar jogo**.
4. Tente formar uma sequência de três símbolos antes do computador.
5. Você terá **15 segundos** para concluir o desafio.

Quem escolhe X ou O sempre começa a partida. O computador só joga depois da primeira jogada do usuário.

Caso o jogador vença, seu nome e tempo poderão entrar no ranking. Quanto mais rápida a vitória, melhor será sua posição.

## Ranking

O ranking registra até **10 vencedores**.

Somente jogadores que venceram o computador são adicionados. Derrotas, empates e partidas encerradas pelo tempo não entram na classificação.

Os resultados ficam armazenados no navegador através do `localStorage`.

## Estrutura do projeto

```text
mostra-campus-jogo-da-velha/
│
├── index.html
├── sobre.html
├── style.css
├── script.js
├── fundo.jpg
├── pin-mostra-campus.png
└── logo-mostra-campus.png