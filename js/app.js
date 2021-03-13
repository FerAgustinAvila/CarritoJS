// You don't have to import JQuery to load your JS script after the DOM
// No tienes porque importar JQuery para cargar el script luego del DOM

// $(document).ready(function() {
//     $('#logoU').click(function(){
//         $('html, body').animate({scrollTop:0}, 'slow');
//         return false;
//     });
// });

// You can do it by using anonymous or setUp vanilla JavaScript functions
// Puedes hacerlo llamando a una función anónima o setUp de JavaScript puro


function setUp() {
    /*
    Función que da inicio a todo el JS script luego de que cargue el DOM.
    */
    var logoAnimado = document.getElementById("logoU");
    logoAnimado.addEventListener(
        "click",function() {window.scrollBy({top: 0});}, false);
}

// Carrito
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    // Agregar curso al presionar "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina curso del carrito
    carrito.addEventListener('click', eliminaCurso)

    // Muestra los cursos del Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];

        carritoHTML();
    });


    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

// Funciones
function agregarCurso(e){
    e.preventDefault();
    if ( e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminaCurso(e){
    e.preventDefault();
    if ( e.target.classList.contains('borrar-curso') ){
        const idCurso = e.target.getAttribute('data-id');

        // Eliminar del arreglo
        articulosCarrito.forEach( curso => {
            if( curso.id === idCurso){
                if( curso.cantidad > 1 ) {
                    curso.cantidad--;
                    carritoHTML();
                } else {
                    articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso);
                    carritoHTML();
                }
            }
        })
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisar si existe un elemento
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso // retorna objeto actualizado
            } else {
                return curso // retorna objeto que no son duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito);
    carritoHTML();
}


function carritoHTML(){
    // Limpiar HTML
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML =
            `<td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" >
                    X
                </a>
            </td>`;

        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';

    while( contenedorCarrito.firstChild ){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

window.addEventListener('load', setUp, false);  // Starts the script
