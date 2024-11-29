// Inicialización de Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let carrito;
let costoTotal;
let total;



document.addEventListener('DOMContentLoaded', () => {
    // Mostrar nombre de usuario si está logueado
    const userLink = document.getElementById('user-link'); // Enlace del usuario
    const usuarioString = sessionStorage.getItem('user'); // Obtén el string del usuario

    if (usuarioString) {
        const usuario = JSON.parse(usuarioString); // Convierte el string en objeto
        userLink.innerHTML = `<span style="font-size: 1.2rem; margin: .5rem">Bienvenido<br>${usuario.nombre}!</span>`;
        userLink.href = "#"; // Redirige a la página del usuario
    }
    // Retrieve data from sessionStorage
    const carritoString = sessionStorage.getItem('carrito');
    const costoTotalString = sessionStorage.getItem('costoTotal');
    const totalString = sessionStorage.getItem('total');

    // Parse the JSON strings into JavaScript objects
    carrito = JSON.parse(carritoString);
    costoTotal = JSON.parse(costoTotalString);
    total = JSON.parse(totalString);
    console.log(carrito);

    const carritoPago = document.querySelector('.carrito_pago');
    carritoPago.innerHTML = `
        <h3 class="total_title">Total a pagar</h3>
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
    `;

    const btnPagar = document.querySelector('.pay');
    btnPagar.addEventListener('click', () => pagar());
});


function pagar() {
    alert("Pago exitoso");
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