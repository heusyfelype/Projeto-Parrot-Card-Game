function comecarOJogo() {
    document.querySelector("button").classList.add("escondido")

    let quantidadeDeCartas = parseInt(prompt("Digite quantas cartas você quer no jogo (entre 4 e 14 cartas, número par)"))

    while (quantidadeDeCartas % 2 != 0 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14) {
        quantidadeDeCartas = prompt("Digite quantas cartas válido (entre 4 e 14 cartas, número par)")
    }

    

    for (let i = 0; i < quantidadeDeCartas; i++) {
        document.querySelector("section").innerHTML = document.querySelector("section").innerHTML + ` 
        <div class="card">
            <div class="front-face face">
            <img src="imagens-e-gifs/papagaio-frente.png" alt="imagem de papagaio">
            </div>
            <div class="back-face face">
                Verso
            </div>
        </div>
    
    `
    }
    // o maximo de cartas diferente que eu posso ter 
    let bancoDeImagensDiferentes = ["verso1", "verso2", "verso3", "verso4", "verso5", "verso6", "verso7"]

    //Vamos embaralhar essas cartas
    let bancoDeImagensDiferentesEmbaralhado = bancoDeImagensDiferentes.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

    // preciso pegar apenas a quantidade de cartas DIFERENTES necessárias para o jogo i.e. quantidadeDeCartas/2
    let quantidadeDeCartasDiferentesEmbaralhadas = []
    for(let i = 0; i < (quantidadeDeCartas/2); i++){
        quantidadeDeCartasDiferentesEmbaralhadas[i] = bancoDeImagensDiferentesEmbaralhado[i];
    }

    console.log(quantidadeDeCartasDiferentesEmbaralhadas)
    let cartasParaOJogo = []
    for(let i = 0; i < (quantidadeDeCartas/2); i++){
        cartasParaOJogo.push(quantidadeDeCartasDiferentesEmbaralhadas[i]);
        cartasParaOJogo.push(quantidadeDeCartasDiferentesEmbaralhadas[i]);
    }

    //cartasParaOJogo.sort(comparador)

    console.log(cartasParaOJogo)

    // Esta função pode ficar separada do código acima, onde você preferir
    function comparador() {
        return Math.random() - 0.5;
    }

    


}