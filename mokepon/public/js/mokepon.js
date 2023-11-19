
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('boton-reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataques-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const ContenedorAtaques = document.getElementById('ContenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let enemigoId = null
let jugadorId = null
let mokeponesEnemigos = []
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputCharizar 
let inputBlastoise 
let inputVenusaur 
let mascotaJugador
let mascotaJugadorObjetos
let ataquesMokepon
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './img/Mokemap.jpeg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 550

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Charizar = new Mokepon ('Charizar', './img/Charizar.png', 5, './img/CabezaC.png')
let Blastoise = new Mokepon ('Blastoise', './img/Blastoise.png', 5, './img/CabezaB.webp')
let Venusaur = new Mokepon ('Venusaur', './img/Venusaur.png', 5, './img/Cabezav.webp')

const BLASTOISE_ATAQUES = [
    {nombre:'💧', id: 'boton-agua' },
    {nombre:'💧', id: 'boton-agua' },
    {nombre:'💧', id: 'boton-agua' },
    {nombre:'🔥', id: 'boton-fuego' },
    {nombre:'🌱', id: 'boton-tierra' },
]

Blastoise.ataques.push(...BLASTOISE_ATAQUES)

const VENASAUR_ATAQUES = [
    {nombre:'🌱', id: 'boton-tierra' },
    {nombre:'🌱', id: 'boton-tierra' },
    {nombre:'🌱', id: 'boton-tierra' },
    {nombre:'💧', id: 'boton-agua' },
    {nombre:'🔥', id: 'boton-fuego' },
]

Venusaur.ataques.push(...VENASAUR_ATAQUES)

const CHARIZAR_ATAQUES = [
    {nombre:'🔥', id: 'boton-fuego' },
    {nombre:'🔥', id: 'boton-fuego' },
    {nombre:'🔥', id: 'boton-fuego' },
    {nombre:'🌱', id: 'boton-tierra' },
    {nombre:'💧', id: 'boton-agua' },
]

Charizar.ataques.push(...CHARIZAR_ATAQUES )

mokepones.push(Charizar, Blastoise, Venusaur)

function iniciarJuego(){
   
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputCharizar = document.getElementById('Charizar')
        inputBlastoise = document.getElementById('Blastoise')
        inputVenusaur = document.getElementById('Venusaur')

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
    unirseAlJuego()
}


function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}


function seleccionarMascotaJugador(){
    if(inputCharizar.checked){
        spanMascotaJugador. innerHTML = inputCharizar.id
        mascotaJugador = inputCharizar.id
    } else if(inputBlastoise.checked){
        spanMascotaJugador. innerHTML = inputBlastoise.id
        mascotaJugador = inputBlastoise.id
    } else if(inputVenusaur.checked){
        spanMascotaJugador. innerHTML = inputVenusaur.id
        mascotaJugador = inputVenusaur.id
    } else{
        alert('selecciona alguna de las mascotas')
        return
    }
    
    sectionSeleccionarMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataques) => {
        ataquesMokepon = `
        <button id=${ataques.id} class="boton-de-ataque BAtaque">${ataques.nombre}</button>
        `
        ContenedorAtaques.innerHTML += ataquesMokepon
    })
     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaques(){
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
            if(e.target.textContent == '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled = true
            } else if (e.target.textContent == '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled = true
            } else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled = true
            }
            if(ataqueJugador.length == 5){
                EnviarAtaques()
            }  
        })
    })
}

function EnviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
} 

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res){
        if (res.ok){
            res.json()
                .then(function({ataques}){
                    if ( ataques.length === 5){
                        ataqueEnemigo = ataques
                        Combate()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaques();
}


function AtaqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1);

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO');
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }    
    console.log(ataqueEnemigo);
    iniciarPelea();

}

function iniciarPelea(){
    if(ataqueJugador.length == 5){
        Combate();
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function Combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexAmbosOponentes(index,index)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA'){
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE!!!")
            victoriasJugador ++
            spanVidasJugador.innerHTML=victoriasJugador

        } else if(ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO'){
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE!!!")
            victoriasJugador ++
            spanVidasJugador.innerHTML=victoriasJugador

        } else if(ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA'){
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE!!!")
            victoriasJugador ++
            spanVidasJugador.innerHTML=victoriasJugador

        } else{
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE!!!")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas();
}

function revisarVidas(){

    if( victoriasJugador == victoriasEnemigo){
        crearMensajeFinal('ESTO FUE UN EMPATE 🎉🎉🎉')
    } else if( victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('GANASTE EL COMBATE 🎉🎉🎉')
        
    }else{
        crearMensajeFinal('PERDISTE EL COMBATE 😢😭😭') 
    }
    
}

function crearMensaje(resultado){
    let NuevoAtaqueDelJugador = document.createElement('p')
    let NuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    NuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    NuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataqueDelJugador.appendChild(NuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(NuevoAtaqueDelEnemigo)

}   

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'flex'
}   
function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor( Math.random() * (max - min + 1 ) + min )
}

function pintarCanvas(){

    mascotaJugadorObjetos.x = mascotaJugadorObjetos.x + mascotaJugadorObjetos.velocidadX
    mascotaJugadorObjetos.y = mascotaJugadorObjetos.y + mascotaJugadorObjetos.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height )
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjetos.pintarMokepon()

    enviarPosicion(mascotaJugadorObjetos.x , mascotaJugadorObjetos.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        RevisarColision(mokepon)
    })

    
    
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Charizar"){
                            mokeponEnemigo = new Mokepon ('Charizar', './img/Charizar.png', 5, './img/CabezaC.png',enemigo.id)
                        }else if (mokeponNombre === "Blastoise"){
                            mokeponEnemigo = new Mokepon ('Blastoise', './img/Blastoise.png', 5, './img/CabezaB.webp',enemigo.id)
                        }else if (mokeponNombre === "Venusaur"){
                            mokeponEnemigo = new Mokepon ('Venusaur', './img/Venusaur.png', 5, './img/Cabezav.webp',enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjetos.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjetos.velocidadX = -5
}
function moverAbajo(){
    mascotaJugadorObjetos.velocidadY = 5
}
function moverArriba(){
    mascotaJugadorObjetos.velocidadY = -5
}
function detenerMovimiento(){
    
    mascotaJugadorObjetos.velocidadX = 0
    mascotaJugadorObjetos.velocidadY = 0
}
   
function sePresionioUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
             break
        case 'ArrowRight':
            moverDerecha()
             break
        default:
            break;
    }
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function iniciarMapa(){
    
    mascotaJugadorObjetos = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionioUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)

}

function RevisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x +enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjetos.y
    const abajoMascota = mascotaJugadorObjetos.y + mascotaJugadorObjetos.alto
    const derechaMascota = mascotaJugadorObjetos.x +mascotaJugadorObjetos.ancho
    const izquierdaMascota = mascotaJugadorObjetos.x


    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return;
    } else {
        detenerMovimiento()
        clearInterval(intervalo)

        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
    
    }
}

window.addEventListener('load', iniciarJuego)
