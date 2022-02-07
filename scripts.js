let quantidadeDeCartas = 0;

//Função principal do jogo
function comecarOJogo() {
    document.querySelector("section").classList.remove("escondido")
    document.querySelector("section").innerHTML = "";

    if (!document.querySelector("button").classList.contains("escondido")) {
        document.querySelector("button").classList.add("escondido")
    }

    quantidadeDeCartas = parseInt(prompt("Digite quantas cartas você quer no jogo (entre 4 e 14 cartas, número par)"))

    while (quantidadeDeCartas % 2 != 0 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14) {
        quantidadeDeCartas = prompt("Você digitou uma quantidade inválida! \nDigite uma quantidade de cartas válida (entre 4 e 14 cartas, número par) \n")
    }

    let bancoDeImagensDiferentes = ["<img src='imagens-e-gifs/bobrossparrot.gif'>", "<img src='imagens-e-gifs/explodyparrot.gif'>", "<img src='imagens-e-gifs/fiestaparrot.gif'", "<img src='imagens-e-gifs/metalparrot.gif'", "<img src='imagens-e-gifs/revertitparrot.gif'", "<img src='imagens-e-gifs/tripletsparrot.gif'", "<img src='imagens-e-gifs/unicornparrot.gif'"]
    bancoDeImagensDiferentes.sort(comparador);
    let quantidadeDeCartasDiferentesEmbaralhadas = [];
    for (let i = 0; i < (quantidadeDeCartas / 2); i++) {
        quantidadeDeCartasDiferentesEmbaralhadas[i] = bancoDeImagensDiferentes[i];
    }
    let cartasParaOJogo = []
    for (let i = 0; i < (quantidadeDeCartas / 2); i++) {
        cartasParaOJogo.push(quantidadeDeCartasDiferentesEmbaralhadas[i]);
        cartasParaOJogo.push(quantidadeDeCartasDiferentesEmbaralhadas[i]);
    }
    cartasParaOJogo.sort(comparador)

    for (let i = 0; i < quantidadeDeCartas; i++) {
        //Aqui houve uma pequena confusão sobre o que era "front-face" e o que era "back-face" em relação ao código passado para rotacionar cartas e em relação ao data-identifier
        document.querySelector("section").innerHTML = document.querySelector("section").innerHTML +
            ` 
        <div class="card" onclick="clicarNaCarta(this, 1)" data-identifier="card">
            <div class="front-face face" data-identifier="back-face">
            <img src="imagens-e-gifs/papagaio-frente.png" alt="imagem de papagaio">
            </div>
            <div class="back-face face" data-identifier="front-face">
            ${cartasParaOJogo[i]}
            </div>
        </div>
        `
    }
}

//função embaralhar
function comparador() {
    return Math.random() - 0.5;
}

let contador = 0;
let primeiraCartaVirada = null;
let segundaCartaVirada = null;
let quantidadeDeCartasViradas = 0;
let quantidadeDeParesAcertados = 0;
let podeclicar = true

//Função que verifica a quantidade de cartas viradas e as compara
function clicarNaCarta(elementoClicado, clique) {
    if (podeclicar == true) {

        quantidadeDeCartasViradas += 1;
        contador += clique;

        if (contador == 1) {
            primeiraCartaVirada = elementoClicado;
            virarCarta(primeiraCartaVirada)
        }

        if (contador == 2) {
            podeclicar = false;
            if (elementoClicado == primeiraCartaVirada) {
                contador = 1;
                podeclicar = true;

            } else {
                segundaCartaVirada = elementoClicado;
                virarCarta(segundaCartaVirada)

                if (primeiraCartaVirada.querySelector(".back-face").innerHTML == segundaCartaVirada.querySelector(".back-face").innerHTML) {
                    quantidadeDeParesAcertados += 1;
                    contador = 0;
                    podeclicar = true;

                    if (quantidadeDeParesAcertados == quantidadeDeCartas / 2) {
                        setTimeout(terminouOJogo, 1000);
                    }

                } else {
                    setTimeout(desvirarCartas, 2250, primeiraCartaVirada);
                    setTimeout(desvirarCartas, 2250, segundaCartaVirada);
                    primeiraCartaVirada.setAttribute("onclick", "clicarNaCarta(this, 1)");
                    segundaCartaVirada.setAttribute("onclick", "clicarNaCarta(this, 1)");
                    contador = 0;
                }

            }
        }
    }
}

let segundos = parseInt(document.querySelector("time p").innerHTML);
let intervalo = null

//Para cronometrar
function cronometrar() {
    document.querySelector("time").classList.remove("escondido")
    intervalo = setInterval(iniciarOCronometro, 1000)
}

function iniciarOCronometro() {
    if (quantidadeDeParesAcertados == quantidadeDeCartas / 2) {
        clearInterval(intervalo);
    } else {
        segundos += 1;
        document.querySelector("time p").innerHTML = segundos;
    }
}

//Para virar a carta
function virarCarta(cartaAVirar){
    cartaAVirar.querySelector(".front-face").classList.add("rotacionar_frente");
    cartaAVirar.querySelector(".back-face").classList.add("rotacionar_verso");
    cartaAVirar.removeAttribute("onclick");
}

//para desvirar ambas as cartas
function desvirarCartas(cartaAdesvirar) {
    cartaAdesvirar.querySelector(".front-face").classList.remove("rotacionar_frente");
    cartaAdesvirar.querySelector(".back-face").classList.remove("rotacionar_verso");
    podeclicar = true;
}

//Quando virar todas as cartas
function terminouOJogo() {
    alert("Você ganhou em " + quantidadeDeCartasViradas + " jogadas e em " + segundos + " segundos!")
    let reiniciar = prompt("Deseja reiniciar o jogo? \"sim\" ou \"não\"");
    if (reiniciar == "sim" || reiniciar == "Sim" || reiniciar == "SIM") {
        quantidadeDeCartas = 0;
        contador = 0;
        primeiraCartaVirada = null;
        segundaCartaVirada = null;
        quantidadeDeCartasViradas = 0;
        quantidadeDeParesAcertados = 0;

        clearInterval(intervalo);
        segundos = -1;
        //Se o jogador quiser recomeçar, chama de novo as funções cronometrar e iniciar jogo
        setTimeout(comecarOJogo, 100)
        setTimeout(cronometrar, 100)
    }
    else if (reiniciar == 'não' || reiniciar == 'nao' || reiniciar == 'Nao' || reiniciar == 'Não' || reiniciar == 'NAO' || reiniciar == 'NÃO') {
        alert('Obrigado por jogar, até uma próxima (caso queira reiniciar o jogo, atualize a página)')
    }

    else {
        alert('Desculpe, não entendi. Caso queira reiniciar o jogo, atualize a página!')
    }
}