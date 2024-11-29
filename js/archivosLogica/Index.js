// Inicialización de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener productos donde 'comprado' es mayor a 10
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

// Función para mostrar el nombre del usuario (si está logueado)
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar productos
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




