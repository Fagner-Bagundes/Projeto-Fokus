//  Botões
const html = document.querySelector(`html`)
const focuBT = document.querySelector(`.app__card-button--foco`);
const curtoBT = document.querySelector(`.app__card-button--curto`);
const longoBT = document.querySelector(`.app__card-button--longo`);
const banner = document.querySelector(`.app__image`);
const startPauseBT = document.querySelector(`#start-pause`)
//  musica
const musicaFocoinput = document.querySelector(`#alternar-musica`)
const titulo = document.querySelector(`.app__title`)
const musica = new Audio(`/sons/luna-rise-part-one.mp3`)
musica.loop = true

//  temporizador

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;


musicaFocoinput.addEventListener(`change`, () =>{
    if (musica.paused) {
        musica.play();
    } else{
        musica.pause();
    };
})

focuBT.addEventListener(`click`, () => {
    alterarContexto(`foco`);
});

curtoBT.addEventListener(`click`, () => {
    alterarContexto(`descanso-curto`);
});

longoBT.addEventListener(`click`, () => {
    alterarContexto(`descanso-longo`);
})


function alterarContexto(contexto) {
    html.setAttribute(`data-contexto`, contexto);
    banner.setAttribute(`src`, `/imagens/${contexto}.png`)
    if (contexto === `foco`) {
        titulo.innerHTML= ` Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong`;
    }
    if (contexto == `descanso-curto`) {
        titulo.innerHTML= `Que tal dar uma respirada?<br>
        <strong class="app__title-strong"> Faça uma pausa curta!</strong`; 
    }
    if (contexto === `descanso-longo`) {
        titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">
        Faça uma pausa longa.</strong`
        longoBT.classList.add(`active`)
    }

    
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos -=0) {
        zerar();
        alert(`tempo finalizado`)
        return
    }
    iniciar();
    tempoDecorridoEmSegundos -=1
    console.log(`temprizador: ` + tempoDecorridoEmSegundos);
}

startPauseBT.addEventListener(`click`, iniciar)

function iniciar() {
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}