function comecarOJogo() {
    document.querySelector("button").classList.add("escondido")

    let quantidadeDeCartas = parseInt(prompt("Digite quantas cartas você quer no jogo (entre 4 e 14 cartas, número par)"))

    while (quantidadeDeCartas % 2 != 0 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14) {
        quantidadeDeCartas = prompt("Digite quantas cartas válido (entre 4 e 14 cartas, número par)")
    }

    // o maximo de cartas diferente que eu posso ter 
    let bancoDeImagensDiferentes = ["verso1", "verso2", "verso3", "verso4", "verso5", "verso6", "verso7"]
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
function clicarNaCarta(elementoClicado, clique) {
    contador = contador + clique;

    if (contador == 1) {
        if (elementoClicado.querySelector(".front-face").classList.contains("rotacionar_frente") &&
            elementoClicado.querySelector(".back-face").classList.contains("rotacionar_verso")) {
            


        } else {
            elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente");
            elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso");
            primeiraCartaVirada = elementoClicado;
        }
        //
        //console.log(elementoClicado.querySelector(".front-face").classList.contains("rotacionar_frente"), elementoClicado.querySelector(".back-face").classList.contains("rotacionar_verso"))
    }

    if (contador == 2) {
        if (elementoClicado == primeiraCartaVirada) {
            contador = 1;
            alert("Voce clicou na mesma carta");
        } else {
            elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente");
            elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso");
            segundaCartaVirada = elementoClicado;
            if (primeiraCartaVirada.querySelector(".back-face").innerHTML == segundaCartaVirada.querySelector(".back-face").innerHTML) {
                //alert("as cartas se manterão viradas");
            }

        }
    }

    console.log(contador);
    console.log(primeiraCartaVirada, segundaCartaVirada)

    if (contador == 3 && segundaCartaVirada != null && primeiraCartaVirada.querySelector(".back-face").innerHTML == segundaCartaVirada.querySelector(".back-face").innerHTML) {
        elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente");
        elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso");

        primeiraCartaVirada = elementoClicado;
        contador = 1;
    }
    else if (contador == 3 && segundaCartaVirada != null && primeiraCartaVirada.querySelector(".back-face").innerHTML != segundaCartaVirada.querySelector(".back-face").innerHTML) {
        primeiraCartaVirada.querySelector(".front-face").classList.remove("rotacionar_frente");
        primeiraCartaVirada.querySelector(".back-face").classList.remove("rotacionar_verso");

        segundaCartaVirada.querySelector(".front-face").classList.remove("rotacionar_frente");
        segundaCartaVirada.querySelector(".back-face").classList.remove("rotacionar_verso");

        elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente");
        elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso");

        contador = 1;

        primeiraCartaVirada = elementoClicado;
        segundaCartaVirada = null;


    }

    else if(contador == 3 || contador == 2  && segundaCartaVirada == null){
        contador = 1;
    }











    // if (elementoClicado != elementoClicadoSalvo) {
    //     contador = contador + clique;
    //     console.log(contador, elementoClicado, elementoClicadoSalvo)

    //     if (contador % 2 != 0) { //eh impar
    //         elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente")
    //         elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso")


    //     } else { //eh par
    //         elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente")
    //         elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso")

    //         // console.log(elementoClicado.querySelector(".back-face").innerHTML)
    //         // console.log(elementoClicadoSalvo.querySelector(".back-face").innerHTML)

    //         // if (elementoClicado.querySelector(".back-face").innerHTML != elementoClicadoSalvo.querySelector(".back-face").innerHTML) {
    //         //     elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente")
    //         //     elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso")

    //         //     // elementoClicado.querySelector(".front-face").classList.remove("rotacionar_frente")
    //         //     // elementoClicado.querySelector(".back-face").classList.remove("rotacionar_verso")

    //         //     // elementoClicadoSalvo.querySelector(".front-face").classList.remove("rotacionar_frente")
    //         //     // elementoClicadoSalvo.querySelector(".back-face").classList.remove("rotacionar_verso")
    //         // }
    //         // else if (elementoClicado.querySelector(".back-face").innerHTML == elementoClicadoSalvo.querySelector(".back-face").innerHTML) {
    //         //     elementoClicado.querySelector(".front-face").classList.add("rotacionar_frente")
    //         //     elementoClicado.querySelector(".back-face").classList.add("rotacionar_verso")

    //         // }

    //     }
    //     elementoClicadoSalvo = elementoClicado;
    // }
    // else {
    //     elementoClicado.querySelector(".front-face").classList.toggle("rotacionar_frente")
    //     elementoClicado.querySelector(".back-face").classList.toggle("rotacionar_verso")
    // }


}