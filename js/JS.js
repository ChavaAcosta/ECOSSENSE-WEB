let slideIndex = 0;
let autoSlideTimer; // Variable para almacenar el temporizador

// Función para mostrar la diapositiva según el índice
function mostrarSlide() {
    
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicators = document.querySelectorAll('.carrusel-indicators div');

    // Corregir el índice de acuerdo con el número de diapositivas
    if (slideIndex >= slides.length) slideIndex = 0; // Reiniciar al inicio si se sobrepasa el índice
    if (slideIndex < 0) slideIndex = slides.length - 1; // Ir al final si el índice es negativo

    // Mostrar la diapositiva actual y ocultar las demás
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });

    // Actualizar el estado activo de los indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

// Función para cambiar la diapositiva y reiniciar el temporizador
function cambiarSlide(n) {
    slideIndex += n; // Ajustar el índice
    mostrarSlide(); // Mostrar la nueva diapositiva
    reiniciarTemporizador(); // Reiniciar temporizador para 5 segundos
}

// Función para iniciar o reiniciar el temporizador de auto-slide
function reiniciarTemporizador() {
    clearInterval(autoSlideTimer); // Limpiar cualquier temporizador previo
    autoSlideTimer = setInterval(function() {
        slideIndex++; // Avanza una diapositiva en el tiempo
        mostrarSlide(); // Actualiza la vista de la diapositiva actual
    }, 5000); // 5000 ms = 5 segundos
}

// Inicializar la primera diapositiva al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarSlide();

    // Asignar eventos de clic a los botones de navegación
    document.querySelector('.prev').addEventListener('click', function() {
        cambiarSlide(-1); // Retrocede una diapositiva
    });

    document.querySelector('.next').addEventListener('click', function() {
        cambiarSlide(1); // Avanza una diapositiva
    });

    // Iniciar el temporizador al cargar la página
    reiniciarTemporizador();
});

// Manejo del botón de búsqueda
document.getElementById('search-icon').addEventListener('click', function(event) {
    event.preventDefault();
    const searchBar = document.querySelector('.search-bar');
    searchBar.classList.toggle('expanded');
    document.getElementById('search-input').focus();
});
