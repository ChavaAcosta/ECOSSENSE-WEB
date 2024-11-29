document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
  
    // Espera a que la animación se complete (ajusta al tiempo de la animación)
    setTimeout(() => {
      body.classList.remove("loading"); // Elimina el estado de carga
      body.classList.add("loaded"); // Aplica el estado final
    }, 500); // Duración de la animación en milisegundos
  });
  
  