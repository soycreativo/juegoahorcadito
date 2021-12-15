// Contenedor de la palabra y palabras para el juego
const contenedor = document.querySelector('.contenedor__letras'),
palabras = ['gato', 'juego', 'plato', 'camino', 'jirafa', 'cooperar'];

// Obtener palabra random de la lista
let palabra = palabras[Math.floor((Math.random() * palabras.length))];

// Recuardros de las letras
let posiciones = document.getElementsByClassName('letra');

// vidas
let vidas = 6;

// ABCEDARIO
const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
contenedorAbc = document.getElementById('abc');

// Variables de aciertos
let aciertos = 0;

// Dibuja los botones con las letras
for(let abcedario in abc){
    contenedorAbc.innerHTML += `<input type="button" value="${abc[abcedario]}" onclick="procesar('${abc[abcedario]}')">`;
}

// Dibuja las lineas en pantalla
// console.log(palabra);
for(let p in palabra){
    contenedor.innerHTML += `<div class="contenedor__letras-o letra"></div>`;
}

// Validar si la letra existe en la palabra y colocarla en la posicion
function procesar(letter){
    // let campoLetra = document.querySelector("#text");
    // let letra = campoLetra.value.toLowerCase();
    let letra = letter;

    //Buscar el indice donde se encuentra la letra
    let indices = [],
    indice = palabra.indexOf(letra);

    while(indice != -1){
        indices.push(indice);
        indice = palabra.indexOf(letra, indice + 1);
    }

    // Coloca la palabra en el lugar que corresponde
    for(let i in indices){
        posiciones[indices[i]].innerText = letra;
    }

    if(indices.length != 0){
        aciertos += indices.length;
        if(aciertos == palabra.length){
            document.getElementById('gameover').innerText = 'YouWin';
            contenedorAbc.innerHTML = null;
            document.getElementById('ahorcado').innerHTML = null;
        }
    }

    // Quita vidas cuando se equivocan de palabra 
    if(indices.length == 0){
        vidas--;
        document.getElementById('ahorcado').innerHTML = `<img src="img/${vidas}.jpg">`
    }

    // Si las vidas se acaban pierde y se quita el teclado para que no agregue más letras
    if(vidas == 0){
        document.getElementById('gameover').innerText = 'GameOver';
        contenedorAbc.innerHTML = null;
    }
}