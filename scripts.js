let quantidadeDeCartas = 0;

function comecarOJogo() {
    document.querySelector("section").innerHTML = "";
    if (!document.querySelector("button").classList.contains("escondido")) {
        document.querySelector("button").classList.add("escondido")
    }


    quantidadeDeCartas = parseInt(prompt("Digite quantas cartas você quer no jogo (entre 4 e 14 cartas, número par)"))

    while (quantidadeDeCartas % 2 != 0 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14) {
        quantidadeDeCartas = prompt("Digite quantas cartas válido (entre 4 e 14 cartas, número par)")
    }

    // o maximo de cartas diferente que eu posso ter 
    let bancoDeImagensDiferentes = ["<img src='imagens-e-gifs/bobrossparrot.gif'>", "<img src='imagens-e-gifs/explodyparrot.gif'>", "<img src='imagens-e-gifs/fiestaparrot.gif'", "<img src='imagens-e-gifs/metalparrot.gif'", "<img src='imagens-e-gifs/revertitparrot.gif'", "<img src='imagens-e-gifs/tripletsparrot.gif'", "<img src='imagens-e-gifs/unicornparrot.gif'"]
    //Vamos embaralhar essas cartas
    let bancoDeImagensDiferentesEmbaralhado = bancoDeImagensDiferentes.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
    // preciso pegar apenas a quantidade de cartas DIFERENTES necessárias para o jogo i.e. quantidadeDeCartas/2
    let quantidadeDeCartasDiferentesEmbaralhadas = []
    for (let i = 0; i < (quantidadeDeCartas / 2); i++) {
        quantidadeDeCartasDiferentesEmbaralhadas[i] = bancoDeImagensDiferentesEmbaralhado[i];
    }
    // console.log(quantidadeDeCartasDiferentesEmbaralhadas)
    let cartasParaOJogo = []
    for (let i = 0; i < (quantidadeDeCartas / 2); i++) {
        cartasParaOJogo.push(quantidadeDeCartasDiferentesEmbaralhadas[i]);
        cartasParaOJogo.push(quantidadeDeCartasDiferentesEmbaralhadas[i]);
    }
    cartasParaOJogo.sort(comparador)

    for (let i = 0; i < quantidadeDeCartas; i++) {
        document.querySelector("section").innerHTML = document.querySelector("section").innerHTML + ` 
        <div class="card" onclick="clicarNaCarta(this, 1)">
            <div class="front-face face">
            <img src="imagens-e-gifs/papagaio-frente.png" alt="imagem de papagaio">
            </div>
            <div class="back-face face">
            ${cartasParaOJogo[i]}
            </div>
        </div>
    
    `
    }





    // Esta função pode ficar separada do código acima, onde você preferir
    function comparador() {
        return Math.random() - 0.5;
    }

}

let contador = 0;
let primeiraCartaVirada = null;
let segundaCartaVirada = null;
let quantidadeDeCartasViradas = 0;
let quantidadeDeParesAcertados = 0;
let podeclicar = true

function clicarNaCarta(elementoClicado, clique) {
    if (podeclicar == true) {

        quantidadeDeCartasViradas += 1;
        contador = contador + clique;

        if (contador == 1) {
            if (elementoClicado.querySelector(".front-face").classList.contains("rotacionar_frente") &&
                elementoClicado.querySelector(".back-face").classList.contains("rotacionar_verso")) {

            } else {
                elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente");
                elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso");
                primeiraCartaVirada = elementoClicado;
                primeiraCartaVirada.removeAttribute("onclick");
            }
            //
            //console.log(elementoClicado.querySelector(".front-face").classList.contains("rotacionar_frente"), elementoClicado.querySelector(".back-face").classList.contains("rotacionar_verso"))
        }

        if (contador == 2) {
            podeclicar = false;
            if (elementoClicado == primeiraCartaVirada) {
                contador = 1;
                podeclicar = true;
                //alert("Voce clicou na mesma carta");
            } else {
                elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente");
                elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso");
                segundaCartaVirada = elementoClicado;
                segundaCartaVirada.removeAttribute("onclick");

                if (primeiraCartaVirada.querySelector(".back-face").innerHTML == segundaCartaVirada.querySelector(".back-face").innerHTML) {
                    quantidadeDeParesAcertados += 1;
                    contador = 0;
                    podeclicar = true;

                    if (quantidadeDeParesAcertados == quantidadeDeCartas / 2) {
                        setTimeout(terminouOJogo, 1000);
                    }
                } else {
                    setTimeout(desvirarCartas, 2500);
                    primeiraCartaVirada.setAttribute("onclick", "clicarNaCarta(this, 1)");
                    segundaCartaVirada.setAttribute("onclick", "clicarNaCarta(this, 1)");
                    contador = 0;
                }

            }
        }
    }
}

let segundos = parseInt(document.querySelector("article p").innerHTML);
let intervalo = null

function cronometrar() {
    document.querySelector("article").classList.remove("escondido")

    intervalo = setInterval(iniciarOCronometro, 1000)
}

function iniciarOCronometro() {
    if (quantidadeDeParesAcertados == quantidadeDeCartas / 2) {
        clearInterval(intervalo);
        //     //alert("Hora da janta!");
    } else {
        segundos += 1;
        document.querySelector("article p").innerHTML = segundos;
    }
}

function desvirarCartas() {
    primeiraCartaVirada.querySelector(".front-face").classList.remove("rotacionar_frente");
    primeiraCartaVirada.querySelector(".back-face").classList.remove("rotacionar_verso");

    segundaCartaVirada.querySelector(".front-face").classList.remove("rotacionar_frente");
    segundaCartaVirada.querySelector(".back-face").classList.remove("rotacionar_verso");
    podeclicar = true;

}

function terminouOJogo() {
    alert("Você ganhou em " + quantidadeDeCartasViradas + " jogadas!")
    let reiniciar = prompt("Deseja reiniciar o jogo? \"sim\" ou \"não\"");
    if (reiniciar = "sim") {
        quantidadeDeCartas = 0;
        contador = 0;
        primeiraCartaVirada = null;
        segundaCartaVirada = null;
        quantidadeDeCartasViradas = 0;
        quantidadeDeParesAcertados = 0;

        clearInterval(intervalo);
        segundos = 0;
        comecarOJogo();
        cronometrar();
    }
}