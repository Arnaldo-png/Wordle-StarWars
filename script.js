let palabraSecreta = "";
let intentos = 6;
        
        const diccionario = ["ACTOR", "BACHE", "CAJAS", "DADOS", "ERROR", "FERIA"];
        const max = diccionario.length - 1;
        
        const API = "https://www.swapi.tech/api/people";
        
        function obtenerPalabraSecreta() {
            fetch(API)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(body => {
                    if (body.results && Array.isArray(body.results)) {
                        const personajes = body.results;
                        const indicePersonaje = Math.floor(Math.random() * personajes.length);
                        const personajeSeleccionado = personajes[indicePersonaje];
                        return fetch(personajeSeleccionado.url);
                    } else {
                        throw new Error("Estructura de respuesta API inesperada");
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La respuesta de la red no fue correcta");
                    }
                    return response.json();
                })
                .then(personajeDetalle => {
                    if (personajeDetalle.result && personajeDetalle.result.properties && personajeDetalle.result.properties.name) {
                        palabraSecreta = personajeDetalle.result.properties.name.toUpperCase();
                        console.log("Palabra secreta obtenida de la API:", palabraSecreta);
                        iniciarJuego(); // Una vez que se obtiene la palabra secreta, se inicia el juego
                    } else {
                        throw new Error("La estructura del detalle del personaje no es la esperada:");
                    }
                })
                .catch(error => {
                    console.error("Error al obtener la palabra secreta de la API:", error);
                    // Manejar el error de acuerdo a necesidades
                });
        }

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
            if (intentos > 0) {
                intentos--;
                console.log("Intentos restantes:", intentos);
        
                const input = document.getElementById('guess-input');
                const value = input.value.toUpperCase();
                console.log(value);
        
                const grid = document.getElementById('grid');
                const row = document.createElement('div');
                row.className = 'row';
        
                for (let i = 0; i < palabraSecreta.length; i++) {
                    const letterSpan = document.createElement('span');
                    letterSpan.className = 'letter';
                    letterSpan.textContent = value[i];
        
                    if (value[i] === palabraSecreta[i]) {
                        letterSpan.classList.add('green');
                    } else if (palabraSecreta.includes(value[i])) {
                        letterSpan.classList.add('yellow');
                    } else {
                        letterSpan.classList.add('gray');
                    }
        
                    row.appendChild(letterSpan);
                }
        
                grid.appendChild(row);
        
                if (value === palabraSecreta) {
                    terminar("<h2>Ganaste</h2>", true);
                    return;
                }
        
                if (intentos === 0) {
                    terminar("<h3>Has perdido</h3>", false);
                }
            }
        }
        
        function terminar(mensaje, esVictoria) {
            const input = document.getElementById('guess-input');
            const button = document.getElementById('guess-button');
            const resetButton = document.getElementById('reset-button');
        
            input.disabled = true;
            button.disabled = true;
            resetButton.disabled = false;
        
            const contenedor = document.getElementById('guesses');
            contenedor.innerHTML = mensaje;
        
            
            if (esVictoria) {
                
                    for (let i = 0; i < 50; i++) {
                        let confetti = document.createElement('div');
                        confetti.className = 'confetti';
                        confetti.style.left = Math.random() * window.innerWidth + 'px';
                        confetti.style.animationDelay = Math.random() * 2 + 's';
                        document.body.appendChild(confetti);
                    }
                } 
        }
        
        function reiniciarJuego() {
            intentos = 6;
            console.log("Juego reiniciado. Intentos restantes:", intentos);
        
            document.getElementById('guess-input').value = '';
            document.getElementById('grid').innerHTML = '';
            document.getElementById('guesses').innerHTML = '';
            document.getElementById("guess-input").disabled = false; // Habilitar el input y el botón de adivinar
            button.disabled = false;

            resetButton.disabled = true; // Deshabilitar el botón "Intentar de nuevo" hasta que se pierda o gane nuevamente
        
            let indice = Math.floor(Math.random() * (max +1));
                palabraSecreta = diccionario[indice];
            }
        
        function iniciarJuego() {
            const input = document.getElementById('guess-input');
            const button = document.getElementById('guess-button');
            const resetButton = document.getElementById('reset-button');
        
            input.disabled = false;
            button.disabled = false;
            resetButton.disabled = true;
        
            // Limpia cualquier juego anterior si es necesario
            document.getElementById('grid').innerHTML = '';
            document.getElementById('guesses').innerHTML = '';
        }
        
        // Iniciar el juego al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            obtenerPalabraSecreta();
        });
        