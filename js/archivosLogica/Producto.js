// Inicialización de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener productos donde 'comprado' es mayor a 10
async function obtenerProducto(idProducto) {
    const { data, error } = await supabase
        .from('Producto')
        .select('*')
        .eq('id_Producto', idProducto); // Filtra productos donde 'comprado' > 10

    if (error) {
        console.error("Error al obtener productos:", error);
    } else {
        mostrarProducto(data[0]);
    }
}

async function obtenerProductos() {
    const { data, error } = await supabase
        .from('Producto')
        .select('id_Producto, nombre, precio_Producto, imagen')
        .gt('comprado', 10); // Filtra productos donde 'comprado' > 10

    if (error) {
        console.error("Error al obtener productos:", error);
    } else {
        mostrarProductos(data);
    }
}

// Función para mostrar productos en la sección HTML
function mostrarProductos(productos) {
    const itemsContainer = document.querySelector('.item-scroll'); // Contenedor de productos
    itemsContainer.innerHTML = ''; // Limpiar productos previos

    productos.forEach((producto) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('item');
        
        // Asignar el HTML del producto
        productoDiv.innerHTML = `
            <img src="${producto.imagen || 'img/default-image.webp'}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <span>$${producto.precio_Producto}</span>
        `;
        
        // Agregar un evento de clic para cada producto
        productoDiv.addEventListener('click', () => {
            // Almacenar el índice del producto en sessionStorage
            sessionStorage.setItem('productoIndex', producto.id_Producto);
  
            // Redirigir a la página de detalle del producto (por ejemplo, producto.html)
            window.location.href = '../../producto.html';
        });
        
        // Agregar el producto al contenedor
        itemsContainer.appendChild(productoDiv);
    });
}

// Función para mostrar productos en la sección HTML
// Función para mostrar un producto
function mostrarProducto(producto) {
    const productoItem = document.querySelector('.producto'); // Contenedor de productos
    productoItem.innerHTML = ''; // Limpiar productos previos

    productoItem.innerHTML = ` 
            <img src="${producto.imagen}" alt="imagenProducto" class="img_producto">
            <div class="info_producto">
                <h1 class="wrap-text">${producto.nombre}</h1>
                <h1 class="wrap-text">$${producto.precio_Producto}</h1>
                <div class="compra_producto">
                    <button id="add-to-cart">Agregar al Carrito</button>
                    <div class="btn">
                        <button id="decrement" class="counter-button">-</button>
                        <span id="counter-value" class="counter-value">0</span>
                        <button id="increment" class="counter-button">+</button>
                    </div>
                </div>
            </div>
    `;

    const productoItem2 = document.querySelector('.desc_ing'); // Contenedor de descripción
    productoItem2.innerHTML = ''; // Limpiar productos previos

    productoItem2.innerHTML = ` 
        <div class="ing">
            <h1>Ingredientes:</h1>
            <h3>${producto.ingredientes}</h3>
        </div>
        <div class="desc">
            <h1>Descripción: </h1>
            <p>${producto.descripcion}</p>
        </div>
    `;


    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const counterValue = document.getElementById('counter-value');
    const addToCartButton = document.getElementById('add-to-cart');

    // Contador inicial
    let counter = 0;

    // Incrementar contador
    incrementButton.addEventListener('click', () => {
        counter++;
        counterValue.textContent = counter;
    });

    // Decrementar contador (sin permitir valores negativos)
    decrementButton.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            counterValue.textContent = counter;
        }
    });

    // Agregar al carrito y guardar en Supabase
    addToCartButton.addEventListener('click', async () => {
        if (counter === 0) {
            alert('Por favor, selecciona al menos un producto antes de agregar al carrito.');
            return;
        }

        // Mostrar nombre de usuario si está logueado
        const usuarioString = sessionStorage.getItem('user'); // Obtén el string del usuario
        if (usuarioString) {
            const usuario = JSON.parse(usuarioString); // Convierte el string en objeto
            console.log(usuario.id);
            try {
                const { data, error } = await supabase
                    .from('Usuario_Seleciona_Producto')
                    .insert([
                        {
                            cantidad: counter,
                            id_Producto: producto.id_Producto, // Asegúrate de que producto.id_Producto no es null
                            id_Usuario: usuario.id, // Asegúrate de que usuario.id_Usuario no es null
                        }
                    ]);
        
                if (error) throw error;
        
                alert('Producto agregado al carrito exitosamente.');
                counter = 0;
                counterValue.textContent = counter;
            } catch (err) {
                console.error('Error al agregar al carrito:', err.message);
                alert('Hubo un error al agregar el producto al carrito.');
            }
        } else {
            alert('Por favor, inicie sesión antes de realizar alguna compra');
            window.location.href = '../login.html';
        }
        

        
    });
}


// Función para mostrar el nombre del usuario (si está logueado)
document.addEventListener('DOMContentLoaded', () => {
    const idProducto = sessionStorage.getItem('productoIndex');
    obtenerProducto(idProducto);

    obtenerProductos();

    // Mostrar nombre de usuario si está logueado
    const userLink = document.getElementById('user-link'); // Enlace del usuario
    const usuarioString = sessionStorage.getItem('user'); // Obtén el string del usuario

    if (usuarioString) {
        const usuario = JSON.parse(usuarioString); // Convierte el string en objeto
        userLink.innerHTML = `<span style="font-size: 1.2rem; margin: .5rem">Bienvenido<br>${usuario.nombre}!</span>`;
        userLink.href = "#"; // Redirige a la página del usuario
    }
});
