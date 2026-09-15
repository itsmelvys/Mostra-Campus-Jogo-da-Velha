const casas = document.querySelectorAll(".casa");
const mensagem = document.querySelector("#mensagem");
const botaoReiniciar = document.querySelector("#reiniciar");
const botaoX = document.querySelector("#escolher-x");
const botaoO = document.querySelector("#escolher-o");
const info = document.querySelector("#info");
const alertaVitoria = document.querySelector("#alerta-vitoria");
const botaoAlertaReiniciar = document.querySelector("#alerta-reiniciar");

let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogador = "";
let computador = "";
let jogoTerminou = false;
let vezDoComputador = false;
let esperaComputador = null;

const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < casas.length; i++) {
    casas[i].addEventListener("click", function () {
        fazerJogada(i);
    });
}

botaoX.addEventListener("click", function () {
    escolherSimbolo("X");
});

botaoO.addEventListener("click", function () {
    escolherSimbolo("O");
});

botaoReiniciar.addEventListener("click", function () {
    reiniciarJogo();
});

botaoAlertaReiniciar.addEventListener("click", function () {
    esconderAlertaVitoria();
    reiniciarJogo();
});

function escolherSimbolo(simbolo) {
    jogador = simbolo;

    if (simbolo === "X") {
        computador = "O";
    } else {
        computador = "X";
    }

    limparTabuleiro();

    info.textContent = "Você é " + jogador + " e o computador é " + computador + ".";

    // X sempre começa
    if (jogador === "X") {
        mensagem.textContent = "Sua vez!";
    } else {
        chamarComputador();
    }
}

function fazerJogada(indice) {
    if (jogador === "") {
        return;
    }

    if (jogoTerminou || vezDoComputador) {
        return;
    }

    if (tabuleiro[indice] !== "") {
        return;
    }

    marcarCasa(indice, jogador);

    if (verificarVencedor(jogador)) {
        mensagem.textContent = "Você venceu!";
        jogoTerminou = true;
        mostrarAlertaVitoria();
        return;
    }

    if (verificarEmpate()) {
        mensagem.textContent = "Empate!";
        jogoTerminou = true;
        return;
    }

    chamarComputador();
}

function chamarComputador() {
    vezDoComputador = true;
    mensagem.textContent = "O computador está pensando...";

    esperaComputador = setTimeout(function () {
        jogadaComputador();
    }, 1000);
}

function jogadaComputador() {
    vezDoComputador = false;

    let indice = melhorJogadaMinimax();

    if (indice === -1) {
        return;
    }

    marcarCasa(indice, computador);

    if (verificarVencedor(computador)) {
        mensagem.textContent = "O computador venceu!";
        jogoTerminou = true;
        return;
    }

    if (verificarEmpate()) {
        mensagem.textContent = "Empate!";
        jogoTerminou = true;
        return;
    }

    mensagem.textContent = "Sua vez!";
}

function melhorJogadaMinimax() {
    let melhorPontuacao = -1000;
    let jogada = -1;

    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === "") {
            tabuleiro[i] = computador;
            let pontuacao = minimax(false, 0);
            tabuleiro[i] = "";

            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao;
                jogada = i;
            }
        }
    }

    return jogada;
}

function minimax(vezDoComp, profundidade) {
    if (verificarVencedor(computador)) {
        return 10 - profundidade;
    }

    if (verificarVencedor(jogador)) {
        return profundidade - 10;
    }

    if (verificarEmpate()) {
        return 0;
    }

    if (vezDoComp) {
        let melhor = -1000;

        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] === "") {
                tabuleiro[i] = computador;
                let pontuacao = minimax(false, profundidade + 1);
                tabuleiro[i] = "";

                if (pontuacao > melhor) {
                    melhor = pontuacao;
                }
            }
        }

        return melhor;
    }

    let pior = 1000;

    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === "") {
            tabuleiro[i] = jogador;
            let pontuacao = minimax(true, profundidade + 1);
            tabuleiro[i] = "";

            if (pontuacao < pior) {
                pior = pontuacao;
            }
        }
    }

    return pior;
}

function verificarVencedor(simbolo) {
    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        let a = combinacoesVencedoras[i][0];
        let b = combinacoesVencedoras[i][1];
        let c = combinacoesVencedoras[i][2];

        if (tabuleiro[a] === simbolo && tabuleiro[b] === simbolo && tabuleiro[c] === simbolo) {
            return true;
        }
    }

    return false;
}

function verificarEmpate() {
    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === "") {
            return false;
        }
    }

    return true;
}

function limparTabuleiro() {
    if (esperaComputador !== null) {
        clearTimeout(esperaComputador);
        esperaComputador = null;
    }

    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoTerminou = false;
    vezDoComputador = false;
    esconderAlertaVitoria();

    for (let i = 0; i < casas.length; i++) {
        casas[i].textContent = "";
        casas[i].classList.remove("x");
        casas[i].classList.remove("o");
    }
}

function mostrarAlertaVitoria() {
    alertaVitoria.classList.add("aberto");
    alertaVitoria.setAttribute("aria-hidden", "false");
}

function esconderAlertaVitoria() {
    alertaVitoria.classList.remove("aberto");
    alertaVitoria.setAttribute("aria-hidden", "true");
}

function marcarCasa(indice, simbolo) {
    tabuleiro[indice] = simbolo;
    casas[indice].textContent = simbolo;

    if (simbolo === "X") {
        casas[indice].classList.add("x");
        casas[indice].classList.remove("o");
    } else {
        casas[indice].classList.add("o");
        casas[indice].classList.remove("x");
    }
}

function reiniciarJogo() {
    if (jogador === "") {
        mensagem.textContent = "Escolha X ou O para começar";
        return;
    }

    limparTabuleiro();

    if (jogador === "X") {
        mensagem.textContent = "Sua vez!";
    } else {
        chamarComputador();
    }
}
