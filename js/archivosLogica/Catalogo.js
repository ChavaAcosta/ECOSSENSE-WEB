// Inicialización de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener productos donde 'comprado' es mayor a 10
async function obtenerSecciones() {
    const { data, error } = await supabase
        .from('Seccion')
        .select('*'); 

    if (error) {
        console.error("Error al obtener productos:", error);
    } else {
        obtenerProductos(data);
    }
}

// Función para mostrar productos en la sección HTML
async function obtenerProductos(secciones) {
    
    const { data, error } = await supabase
        .from('Producto')
        .select('*'); 

    if (error) {
        console.error("Error al obtener productos:", error);
    } else {
        mostrarProductos(secciones, data);
    }
   
}


function mostrarProductos(secciones, productos) {
    const itemsContainer = document.querySelector('.catalogo'); // Contenedor principal
    itemsContainer.innerHTML = ''; // Limpiar contenido previo

    secciones.forEach((seccion) => {
        // Crear contenedor de la sección
        const seccionDiv = document.createElement('div');
        seccionDiv.classList.add('categoria');

        // Agregar título de la sección
        seccionDiv.innerHTML = `
            <h2>${seccion.seccion}</h2>
            <div class="items"></div>
        `;

        // Filtrar productos que pertenecen a esta sección
        const productosDeSeccion = productos.filter(producto => producto.id_Seccion === seccion.id_Seccion);

        // Contenedor para los productos
        const itemsDiv = seccionDiv.querySelector('.items');

        productosDeSeccion.forEach((producto) => {
            // Crear elemento de producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('item');

            // Asignar contenido del producto
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <span>$${producto.precio_Producto}</span>
            `;

            // Agregar evento de clic para redirigir a la página de detalle
            productoDiv.addEventListener('click', () => {
                sessionStorage.setItem('productoIndex', producto.id_Producto); // Guardar ID del producto
                window.location.href = '../../producto.html'; // Redirigir
            });

            // Agregar producto al contenedor
            itemsDiv.appendChild(productoDiv);
        });

        // Agregar la sección completa al contenedor principal
        itemsContainer.appendChild(seccionDiv);
    });
}

// Función para mostrar el nombre del usuario (si está logueado)
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar productos
    obtenerSecciones();

    // Mostrar nombre de usuario si está logueado
    const userLink = document.getElementById('user-link'); // Enlace del usuario
    const usuarioString = sessionStorage.getItem('user'); // Obtén el string del usuario

    if (usuarioString) {
        const usuario = JSON.parse(usuarioString); // Convierte el string en objeto
        userLink.innerHTML = `<span style="font-size: 1.2rem; margin: .5rem">Bienvenido<br>${usuario.nombre}!</span>`;
        userLink.href = "#"; // Redirige a la página del usuario
    }
});