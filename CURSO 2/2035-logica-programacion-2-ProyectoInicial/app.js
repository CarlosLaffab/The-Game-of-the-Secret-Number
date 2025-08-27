let intentos = 0;
let numeroMaximo = 10;
let listaNumerosDisponibles = Array.from({length: numeroMaximo}, (_, i) => i + 1);
let numeroSecreto;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function generaNumeroSecreto() {
    if (listaNumerosDisponibles.length === 0) {
        asignarTextoElemento("h1", "¡Juego terminado!");
        asignarTextoElemento("p", "¡Se han agotado todos los números posibles!");
        document.getElementById("valorUsuario").setAttribute("disabled", "true");
        document.getElementById("valorUsuario").style.display = "none";
        document.getElementById("reiniciar").setAttribute("disabled", "true"); // Ya no se puede reiniciar
        return null;
    }

    let indice = Math.floor(Math.random() * listaNumerosDisponibles.length);
    let numero = listaNumerosDisponibles[indice];
    listaNumerosDisponibles.splice(indice, 1); // elimina el número para no repetirlo
    return numero;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p", `¡Felicidades! Adivinaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        asignarTextoElemento("h1", "¡Has ganado!");
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("valorUsuario").setAttribute("disabled", "true");
        document.getElementById("valorUsuario").style.display = "none";
    } else if (intentos >= 3) {
        asignarTextoElemento("p", `El juego terminó. El número secreto era ${numeroSecreto}.`);
        asignarTextoElemento("h1", "¡Has perdido!");
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("valorUsuario").setAttribute("disabled", "true");
        document.getElementById("valorUsuario").style.display = "none";
    } else if (numeroDeUsuario < numeroSecreto) {
        asignarTextoElemento("p", "El número secreto es mayor. ¡Intenta de nuevo!");
    } else {
        asignarTextoElemento("p", "El número secreto es menor. ¡Intenta de nuevo!");
    }

    document.getElementById("valorUsuario").value = "";
}

function reiniciarJuego() {
    if (listaNumerosDisponibles.length === 0) {
        asignarTextoElemento("h1", "¡Juego terminado!");
        asignarTextoElemento("p", "Ya jugaste todas las partidas posibles.");
        document.getElementById("valorUsuario").setAttribute("disabled", "true");
        document.getElementById("valorUsuario").style.display = "none";
        document.getElementById("reiniciar").setAttribute("disabled", "true");
        return; // no sigue
    }

    numeroSecreto = generaNumeroSecreto();
    intentos = 0;
    asignarTextoElemento("h1", "¡Adivina el número secreto entre 1 y 10!");
    asignarTextoElemento("p", "Tienes 3 intentos para adivinar.");
    document.getElementById("reiniciar").setAttribute("disabled", "true");
    document.getElementById("valorUsuario").removeAttribute("disabled");
    document.getElementById("valorUsuario").style.display = "inline";
    document.getElementById("valorUsuario").value = "";
}

document.addEventListener("DOMContentLoaded", reiniciarJuego);
