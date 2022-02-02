function comecarOJogo() {
    document.querySelector("button").classList.add("escondido")

    let quantidadeDeCartas = prompt("Digite quantas cartas você quer no jogo (entre 4 e 14 cartas, número par)")

    while (quantidadeDeCartas % 2 != 0 || quantidadeDeCartas < 4 || quantidadeDeCartas > 14) {
        quantidadeDeCartas = prompt("Digite quantas cartas válido (entre 4 e 14 cartas, número par)")
    }

    //let bancoDeImagens = [verso1, verso2, verso3]


    for (let i = 0; i < quantidadeDeCartas; i++) {
        document.querySelector("section").innerHTML =  document.querySelector("section").innerHTML + ` 
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



}