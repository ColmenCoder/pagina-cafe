// script.js
function validarFormulario() {
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    if (email === '' || telefono === '') {
        console.log('Por favor, completa todos los campos');
    } else {
        console.log('Formulario completo');
    }
}

const listaCarrito = document.getElementById('lista-carrito');

const productosContainer = document.getElementById("productos-container");
if (!productosContainer) {
    console.error("Contenedor de productos no encontrado");
} else {
    mostrarProductos();
}
    function mostrarProductos() {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                productosContainer.innerHTML = '';
                data.forEach((producto) => {
                    productosContainer.innerHTML += `
                        <div class="card">
                            <img src="${producto.image}" alt="${producto.title}">
                            <h3>${producto.title}</h3>
                            <p>Precio: $${producto.price}</p>
                            <button class="btn-agregar"
                                    data-id="${producto.id}"
                                    data-nombre="${producto.title}"
                                    data-precio="${producto.price}">
                                    Añadir al carrito
                            </button>
                        </div>
                    `;
                });


                document.querySelectorAll('.btn-agregar').forEach(button => {
                    button.addEventListener('click', agregarProducto);
                });
            })
            .catch((error) => console.error("Error al obtener productos:", error));
    }



//carrito
function agregarProducto(event) {
    var producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio'),
    };

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


function actualizarCarrito() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';  // Limpiar lista

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li>No hay productos en el carrito.</li>';
    } else {

        carrito.forEach((producto, index) => {
            var item = document.createElement('li');
            item.innerHTML = `
                ${producto.nombre} - $${producto.precio}
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            listaCarrito.appendChild(item);
        });
    }
}


function eliminarProducto(index) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarrito();
}


document.getElementById('lista-carrito').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-eliminar')) {
        const index = event.target.getAttribute('data-index');
        eliminarProducto(index);
    }
});


document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);


window.onload = function() {
    actualizarCarrito();
};


document.querySelectorAll('.btn-agregar').forEach(button => {
    button.addEventListener('click', agregarProducto);
});

