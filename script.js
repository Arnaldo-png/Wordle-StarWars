let palabraSecreta = "APPLE";
let intentos = 6;

let diccionario = ["ACTOR", "BACHE", "CAJAS","DADOS", "ERROR", "FERIA"];
let max =diccionario.length -1;
let indice = Math.floor(Math.random()* 5 + 1);
palabraSecreta = diccionario [indice];

let button = document.getElementById("guess-button"); // Busca el botón
button.addEventListener("click", intentar); // En la función intentar, captura el texto al darle click

let resetButton = document.getElementById("reset-button"); // Se crea un evento para el botón de intentar de nuevo
resetButton.addEventListener("click", reiniciarJuego);
resetButton.disabled = true; // Deshabilitar el botón "Intentar de nuevo" inicialmente

let input = document.getElementById("guess-input");
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        intentar();
    }
});

function intentar() {
    intentos = intentos - 1;
    console.log("Cantidad de Intentos restantes", intentos);

    if (intentos === 0) {
        button.disabled = true; // Deshabilitar el botón de adivinar
        resetButton.disabled = false; // Habilitar el botón "Intentar de nuevo"
        terminar("<h3>Has perdido</h3>");
        return;
    }

    let input = document.getElementById("guess-input");
    let value = input.value.toUpperCase(); // Convertir el valor a mayúsculas
    console.log(value);

    let grid = document.getElementById('grid'); // Muestra las letras ingresadas con cuadros de colores indicando si son correctas o no.
    let row = document.createElement('div');
    row.className = 'row';

    for (let i = 0; i < value.length; i++) {
        let letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.textContent = value[i];

        if (value[i] == palabraSecreta[i]) {
            letterSpan.classList.add('green'); // Letra correcta en la posición correcta
        } else if (palabraSecreta.includes(value[i])) {
            letterSpan.classList.add('yellow'); // Letra correcta en la posición incorrecta
        } else {
            letterSpan.classList.add('gray'); // Letra incorrecta
        }

        row.appendChild(letterSpan);  
    }

    grid.appendChild(row);

    if (palabraSecreta === value) {
        terminar("<h2>Ganaste</h2>");
        return;
    }
    input.value = ""; // Limpiar el campo de entrada después de cada intento
}

function terminar(mensaje) {
    const input = document.getElementById("guess-input");
    input.disabled = true;
    button.disabled = true; 
    resetButton.disabled = false; // Asegurar que se habilite el botón "Intentar de nuevo"
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

    if (mensaje.includes("Ganaste")){
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
    }
    }
}


function reiniciarJuego() { // Función para reiniciar el juego
    intentos = 6;
    console.log("Juego reiniciado. Intentos restantes: ", intentos);

    document.getElementById("guess-input").value = "";
    document.getElementById("grid").innerHTML = "";
    document.getElementById('guesses').innerHTML = "";

    document.getElementById("guess-input").disabled = false; // Habilitar el input y el botón de adivinar
    button.disabled = false;
    resetButton.disabled = true; // Deshabilitar el botón "Intentar de nuevo" hasta que se pierda o gane nuevamente

    let indice = Math.floor(Math.random() * (max +1));
    palabraSecreta = diccionario[indice];
}
