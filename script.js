const casas = document.querySelectorAll(".casa");
const mensagem = document.querySelector("#mensagem");
const botaoIniciar = document.querySelector("#iniciar");
const botaoReiniciar = document.querySelector("#reiniciar");
const botaoNovoJogo = document.querySelector("#novo-jogo");
const botaoNome = document.querySelector("#escolher-nome");
const botaoX = document.querySelector("#escolher-x");
const botaoO = document.querySelector("#escolher-o");
const info = document.querySelector("#info");
const alertaVitoria = document.querySelector("#alerta-vitoria");
const botaoAlertaReiniciar = document.querySelector("#alerta-reiniciar");
const botaoAlertaNovoJogo = document.querySelector("#alerta-novo-jogo");
const alertaTitulo = document.querySelector("#alerta-titulo");
const alertaTexto = document.querySelector("#alerta-texto");
const alertaNome = document.querySelector("#alerta-nome");
const campoNome = document.querySelector("#campo-nome");
const botaoSalvarNome = document.querySelector("#salvar-nome");
const textoTempo = document.querySelector("#tempo");
const caixaTempo = document.querySelector("#caixa-tempo");
const listaRanking = document.querySelector("#lista-ranking");
const textoRankingVazio = document.querySelector("#ranking-vazio");

const TEMPO_MAXIMO = 15;
const chaveRanking = "rankingJogoDaVelha";

let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogador = "";
let computador = "";
let nomeJogador = "";
let jogoComecou = false;
let jogoTerminou = false;
let vezDoComputador = false;
let esperaComputador = null;
let tempoRestante = TEMPO_MAXIMO;
let intervaloTempo = null;
let ranking = [];

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

carregarRanking();
mostrarRanking();
atualizarInfo();

for (let i = 0; i < casas.length; i++) {
    casas[i].addEventListener("click", function () {
        fazerJogada(i);
    });
}

botaoNome.addEventListener("click", function () {
    abrirAlertaNome();
});

botaoX.addEventListener("click", function () {
    escolherSimbolo("X");
});

botaoO.addEventListener("click", function () {
    escolherSimbolo("O");
});

botaoIniciar.addEventListener("click", function () {
    iniciarJogo();
});

botaoReiniciar.addEventListener("click", function () {
    reiniciarJogo();
});

botaoNovoJogo.addEventListener("click", function () {
    novoJogo();
});

botaoAlertaReiniciar.addEventListener("click", function () {
    esconderAlerta();
    reiniciarJogo();
});

botaoAlertaNovoJogo.addEventListener("click", function () {
    esconderAlerta();
    novoJogo();
});

botaoSalvarNome.addEventListener("click", function () {
    salvarNome();
});

campoNome.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        salvarNome();
    }
});

function escolherSimbolo(simbolo) {
    jogador = simbolo;

    if (simbolo === "X") {
        computador = "O";
        botaoX.classList.add("escolhido");
        botaoO.classList.remove("escolhido");
    } else {
        computador = "X";
        botaoO.classList.add("escolhido");
        botaoX.classList.remove("escolhido");
    }

    atualizarInfo();

    if (!jogoComecou) {
        mensagem.textContent = "Clique em Iniciar jogo";
    }
}

function atualizarInfo() {
    if (nomeJogador === "" && jogador === "") {
        info.textContent = "Escolha um nome e um símbolo para começar.";
        return;
    }

    if (nomeJogador === "") {
        info.textContent = "Símbolo: " + jogador + ". Agora escolha um nome.";
        return;
    }

    if (jogador === "") {
        info.textContent = "Jogador: " + nomeJogador + ". Agora escolha X ou O.";
        return;
    }

    info.textContent = nomeJogador + " é " + jogador + " e o computador é " + computador + ".";
}

function abrirAlertaNome() {
    campoNome.value = nomeJogador;
    alertaNome.classList.add("aberto");
    alertaNome.setAttribute("aria-hidden", "false");
    campoNome.focus();
}

function fecharAlertaNome() {
    alertaNome.classList.remove("aberto");
    alertaNome.setAttribute("aria-hidden", "true");
}

function salvarNome() {
    let nome = campoNome.value.trim();

    if (nome === "") {
        mensagem.textContent = "Digite um nome para o jogador.";
        return;
    }

    nomeJogador = nome;
    botaoNome.classList.add("escolhido");
    fecharAlertaNome();
    atualizarInfo();

    if (!jogoComecou) {
        mensagem.textContent = "Clique em Iniciar jogo";
    }
}

function iniciarJogo() {
    if (nomeJogador === "") {
        mensagem.textContent = "Escolha o nome do jogador primeiro.";
        return;
    }

    if (jogador === "") {
        mensagem.textContent = "Escolha X ou O primeiro.";
        return;
    }

    limparTabuleiro();
    jogoComecou = true;
    iniciarTemporizador();

    // X sempre começa
    if (jogador === "X") {
        mensagem.textContent = "Sua vez!";
    } else {
        chamarComputador();
    }
}

function fazerJogada(indice) {
    if (!jogoComecou) {
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
        let tempoDaVitoria = TEMPO_MAXIMO - tempoRestante;
        mensagem.textContent = "Você venceu!";
        finalizarJogo();
        registrarVencedor(nomeJogador, tempoDaVitoria);
        mostrarAlerta("Parabéns, " + nomeJogador + "!", "Você venceu em " + formatarTempo(tempoDaVitoria) + "!");
        return;
    }

    if (verificarEmpate()) {
        mensagem.textContent = "Empate!";
        finalizarJogo();
        mostrarAlerta("Empate!", "Ninguém venceu dessa vez.");
        return;
    }

    chamarComputador();
}

function chamarComputador() {
    vezDoComputador = true;
    mensagem.textContent = "O computador está pensando...";

    esperaComputador = setTimeout(function () {
        if (jogoTerminou) {
            return;
        }
        jogadaComputador();
    }, 1000);
}

function jogadaComputador() {
    if (jogoTerminou) {
        return;
    }

    vezDoComputador = false;

    let indice = melhorJogadaMinimax();

    if (indice === -1) {
        return;
    }

    marcarCasa(indice, computador);

    if (verificarVencedor(computador)) {
        mensagem.textContent = "O computador venceu!";
        finalizarJogo();
        mostrarAlerta("Você perdeu!", "O computador venceu a partida.");
        return;
    }

    if (verificarEmpate()) {
        mensagem.textContent = "Empate!";
        finalizarJogo();
        mostrarAlerta("Empate!", "Ninguém venceu dessa vez.");
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

    pararTemporizador();
    tempoRestante = TEMPO_MAXIMO;
    atualizarTelaTempo();

    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoTerminou = false;
    jogoComecou = false;
    vezDoComputador = false;
    esconderAlerta();

    for (let i = 0; i < casas.length; i++) {
        casas[i].textContent = "";
        casas[i].classList.remove("x");
        casas[i].classList.remove("o");
    }
}

function mostrarAlerta(titulo, texto) {
    if (!jogoTerminou) {
        return;
    }

    alertaTitulo.textContent = titulo;
    alertaTexto.textContent = texto;
    alertaVitoria.classList.add("aberto");
    alertaVitoria.setAttribute("aria-hidden", "false");
}

function esconderAlerta() {
    alertaVitoria.classList.remove("aberto");
    alertaVitoria.setAttribute("aria-hidden", "true");
}

function formatarTempo(segundos) {
    if (segundos < 0) {
        segundos = 0;
    }

    let minutos = Math.floor(segundos / 60);
    let resto = segundos % 60;

    if (resto < 10) {
        return minutos + ":0" + resto;
    }

    return minutos + ":" + resto;
}

function atualizarTelaTempo() {
    textoTempo.textContent = formatarTempo(tempoRestante);

    if (tempoRestante <= 3) {
        caixaTempo.classList.add("urgente");
    } else {
        caixaTempo.classList.remove("urgente");
    }
}

function iniciarTemporizador() {
    pararTemporizador();
    tempoRestante = TEMPO_MAXIMO;
    atualizarTelaTempo();

    intervaloTempo = setInterval(function () {
        if (jogoTerminou || !jogoComecou) {
            pararTemporizador();
            return;
        }

        tempoRestante = tempoRestante - 1;
        atualizarTelaTempo();

        if (tempoRestante <= 0) {
            tempoEsgotado();
        }
    }, 1000);
}

function pararTemporizador() {
    if (intervaloTempo !== null) {
        clearInterval(intervaloTempo);
        intervaloTempo = null;
    }
}

function finalizarJogo() {
    pararTemporizador();
    jogoTerminou = true;
    jogoComecou = false;
    vezDoComputador = false;

    if (esperaComputador !== null) {
        clearTimeout(esperaComputador);
        esperaComputador = null;
    }
}

function tempoEsgotado() {
    if (jogoTerminou) {
        pararTemporizador();
        return;
    }

    finalizarJogo();

    if (esperaComputador !== null) {
        clearTimeout(esperaComputador);
        esperaComputador = null;
    }

    mensagem.textContent = "O tempo acabou! O computador venceu!";
    mostrarAlerta("Você perdeu!", "O tempo acabou e o computador venceu.");
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
    iniciarJogo();
}

function novoJogo() {
    limparTabuleiro();
    jogador = "";
    computador = "";
    nomeJogador = "";
    campoNome.value = "";

    botaoX.classList.remove("escolhido");
    botaoO.classList.remove("escolhido");
    botaoNome.classList.remove("escolhido");

    fecharAlertaNome();
    atualizarInfo();
    mensagem.textContent = "Escolha o nome, o símbolo e clique em Iniciar jogo";
}

function carregarRanking() {
    let salvo = localStorage.getItem(chaveRanking);

    if (salvo === null) {
        ranking = [];
        return;
    }

    ranking = [];

    try {
        ranking = JSON.parse(salvo);
    } catch (erro) {
        ranking = [];
    }

    if (!Array.isArray(ranking)) {
        ranking = [];
    }
}

function registrarVencedor(nome, tempoUsado) {
    ranking.push({
        nome: nome,
        tempo: tempoUsado
    });

    ranking.sort(function (a, b) {
        return a.tempo - b.tempo;
    });

    if (ranking.length > 10) {
        ranking = ranking.slice(0, 10);
    }

    localStorage.setItem(chaveRanking, JSON.stringify(ranking));
    mostrarRanking();
}

function mostrarRanking() {
    listaRanking.innerHTML = "";

    if (ranking.length === 0) {
        textoRankingVazio.classList.remove("escondido");
        return;
    }

    textoRankingVazio.classList.add("escondido");

    for (let i = 0; i < ranking.length; i++) {
        let item = document.createElement("li");

        let posicao = document.createElement("span");
        posicao.className = "posicao";
        posicao.textContent = (i + 1) + "º";

        let nome = document.createElement("span");
        nome.className = "nome-ranking";
        nome.textContent = ranking[i].nome;

        let tempo = document.createElement("span");
        tempo.className = "tempo-ranking";
        tempo.textContent = formatarTempo(ranking[i].tempo);

        item.appendChild(posicao);
        item.appendChild(nome);
        item.appendChild(tempo);
        listaRanking.appendChild(item);
    }
}
