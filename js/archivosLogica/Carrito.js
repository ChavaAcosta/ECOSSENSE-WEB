// Inicialización de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener productos donde 'comprado' es mayor a 10
async function obtenerCarrito() {
    const usuarioString = sessionStorage.getItem('user'); // Obtén el string del usuario
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString); // Convierte el string en objeto
        console.log(usuario.id);
        const { data, error } = await supabase
        .from('Usuario_Seleciona_Producto')
        .select('*').eq('id_Usuario', usuario.id); 

        if (error) {
            console.error("Error al obtener productos:", error);
        } else {
            obtenerProductos(data);
        }
    } else {
        alert('Por favor, inicie sesión antes de realizar alguna compra');
        window.location.href = '../../login.html';
    }
}

// Función para mostrar productos en la sección HTML
async function obtenerProductos(carrito) {
    const carritoProductos = document.querySelector('.carrito_productos'); // Contenedor de productos
    carritoProductos.innerHTML = `
        <div class="indices">
            <h3 class="pro">Producto</h3>
            <h3>Cantidad</h3>
            <h3>Subtotal</h3>
        </div>
        <div class="linea"></div>
    `; // Limpiar productos previos

    let total = 0;

    // Crear una lista de promesas para esperar todas las consultas
    const promesas = carrito.map(async (item) => {
        const { data, error } = await supabase
            .from('Producto')
            .select('*')
            .eq('id_Producto', item.id_Producto)
            .single();

        if (error) {
            console.error("Error al obtener productos:", error);
            return null;
        } else {
            console.log(data);

            // Convertir valores a números
            const cantidad = Number(item.cantidad);
            const precio = Number(data.precio_Producto);

            // Calcular subtotal
            const subtotal = cantidad * precio;
            total += subtotal;

            // Crear elemento de producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('carritoItem');

            // Asignar el HTML del producto
            productoDiv.innerHTML = `
                <img src="${data.imagen}" alt="productoImg">
                <div class="nom">
                    <p class="nom_nom wrap-text">${data.nombre}</p>
                    <p>$${precio.toFixed(2)}</p>
                </div>
                <p class="cant">${cantidad}</p>
                <p>$${subtotal.toFixed(2)}</p>
            `;
            carritoProductos.appendChild(productoDiv);

            const lineaDiv = document.createElement('div');
            lineaDiv.classList.add('linea_ligera');
            carritoProductos.appendChild(lineaDiv);
        }
    });

    // Esperar a que todas las promesas terminen
    await Promise.all(promesas);

    // Agregar el subtotal al final
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('sub');
    totalDiv.innerHTML = `
        <h3>Subtotal: $${total.toFixed(2)}</h3>
    `;
    carritoProductos.appendChild(totalDiv);


    const costoTotal = total + 40;
    const carritoPago = document.querySelector('.carrito_pago');
    carritoPago.innerHTML = `
        <h3 class="total_title">Total del carrito</h3>
        <div class="pago_item">
            <h3>Subtotal</h3>
            <p>$${total.toFixed(2)}</p>
        </div>
        <div class="pago_item">
            <h3>Envio</h3>
            <p>$40</p>
        </div>
        <div class="pago_item">
            <h3>Total</h3>
            <p>$${costoTotal.toFixed(2)}</p>
        </div>
        <div class="linea_pago"></div>
        <button class="pay">Pagar</button>
            
        <button class="btn_vaciar">Vaciar carrito</button>
    `;
    const btnVaciar = document.querySelector('.btn_vaciar');
    btnVaciar.addEventListener('click', () => vaciarCarrito(carrito));


    const btnPagar = document.querySelector('.pay');
    btnPagar.addEventListener('click', () => pagar(carrito, costoTotal, total));
}

function vaciarCarrito(carrito) {
    carrito.forEach(async (item) => {
        const { data, error } = await supabase
                .from('Usuario_Seleciona_Producto')
                .delete()
                .eq('id_Usuario_Producto', item.id_Usuario_Producto)
    
            if (error) {
                console.error("Error al obtener productos:", error);
                return null;
            }else{
                window.location.href = '../../index.html';
            }
    });
    // 4. (Opcional) Sincronizar el cambio con el backend
    console.log("El carrito ha sido vaciado");

}



function pagar(carrito, costoTotal, total) {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    sessionStorage.setItem('costoTotal', JSON.stringify(costoTotal));
    sessionStorage.setItem('total', JSON.stringify(total));
    window.location.href = '../../pagoFinal.html';

}



// Función para mostrar el nombre del usuario (si está logueado)
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar nombre de usuario si está logueado
    const userLink = document.getElementById('user-link'); // Enlace del usuario
    const usuarioString = sessionStorage.getItem('user'); // Obtén el string del usuario

    if (usuarioString) {
        const usuario = JSON.parse(usuarioString); // Convierte el string en objeto
        userLink.innerHTML = `<span style="font-size: 1.2rem; margin: .5rem">Bienvenido<br>${usuario.nombre}!</span>`;
        userLink.href = "#"; // Redirige a la página del usuario
    }
    obtenerCarrito();
    
});