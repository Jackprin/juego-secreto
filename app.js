
//Variables inicializados
let numeroSecreto = 0;
let intentos = 0;
//Variable del arreglo donde se guardan los num elegidos por el ususario
let listaNumerosSorteados = [];
let numeroMaximo = 10;


//funcion que............... 
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


//funcion que verifica los intentos del usuario 
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    //verifica si el numero ingresado por el ususario es igual al num secreto generado automaticamente
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //hace al boton usable removiendo el atributo despues de que se acerto 
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó si el numero es mayor o menos le da una pista
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        //se incrementa el num de intentos
        intentos++;
        //se llama la funcion para eliminar lo que esta en pantalla
        limpiarCaja();
    }
    return;
}
//funcion para eliminar el numero que se jugo anteriormente
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// funcion que genera un numero secreto aleatoriamente, usando la funcion math random y se multiplica por el num maximo ya que esto significa que solo deja generar numeros enteros y ese num es el limite
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
// se muestra el num y la lista de num escogidos pero en consola
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números , si llega al maximo de intentos
    if (listaNumerosSorteados.length == numeroMaximo) {
        //le le muestra el mensaje al ususario que ya todo fue jugado
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista .................
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
// se le asigna las condiciones iniciales cada vez que se inicializa el juego
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();