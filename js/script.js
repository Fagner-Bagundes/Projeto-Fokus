//  Botões
const html = document.querySelector(`html`)
const focuBT = document.querySelector(`.app__card-button--foco`);
const curtoBT = document.querySelector(`.app__card-button--curto`);
const longoBT = document.querySelector(`.app__card-button--longo`);
const banner = document.querySelector(`.app__image`);
const titulo = document.querySelector(`.app__title`)
const startPauseBT = document.querySelector(`#start-pause`)
const iniciarOuPausarBT = document.querySelector(`#start-pause span`)
const playPouseIcon = document.querySelector(`.app__card-primary-butto-icon`)

// tempo na tela
const tempoNaTela = document.querySelector(`#timer`)

//  musica
const musicaFocoinput = document.querySelector(`#alternar-musica`)
const musica = new Audio(`/sons/luna-rise-part-one.mp3`)
const somPlay = new Audio(`/sons/play.wav`)
const somPause = new Audio(`/sons/pause.mp3`)
const somBeep = new Audio(`/sons/beep.mp3`)

musica.loop = true

//  temporizador

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


musicaFocoinput.addEventListener(`change`, () =>{
    if (musica.paused) {
        musica.play();
    } else{
        musica.pause();
    };
})

focuBT.addEventListener(`click`, () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto(`foco`);
});

curtoBT.addEventListener(`click`, () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto(`descanso-curto`);
});

longoBT.addEventListener(`click`, () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto(`descanso-longo`);
})


function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute(`data-contexto`, contexto);
    banner.setAttribute(`src`, `./imagens/${contexto}.png`)
    if (contexto === `foco`) {
        titulo.innerHTML= ` Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong`;
        focuBT.classList.add(`active`)
        curtoBT.classList.remove(`active`)
        longoBT.classList.remove(`active`)
    }
    if (contexto == `descanso-curto`) {
        titulo.innerHTML= `Que tal dar uma respirada?<br>
        <strong class="app__title-strong"> Faça uma pausa curta!</strong`; 
        focuBT.classList.remove(`active`)
        curtoBT.classList.add(`active`)
        longoBT.classList.remove(`active`)
    }
    if (contexto === `descanso-longo`) {
        titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">
        Faça uma pausa longa.</strong`
        focuBT.classList.remove(`active`)
        curtoBT.classList.remove(`active`)
        longoBT.classList.add(`active`)
    }

    
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somBeep.play();
        alert(`tempo finalizado`)
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBT.addEventListener(`click`, iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play()
        iniciarOuPausarBT.textContent = `Começar`
        playPouseIcon.setAttribute(`src`, `./imagens/play_arrow.png`)
        zerar();
        
        return
    } else{
        playPouseIcon.setAttribute(`src`, `./imagens/pause.png`)
        somPlay.play()
        iniciarOuPausarBT.textContent = `Pausar`
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString(`pt-br`, {minute: `2-digit`, second: `2-digit`})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();