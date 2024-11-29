// Elementos del DOM
const addBtn2 = document.getElementById('addBtn2');
const cuestionarioDatosForm = document.getElementById('cuestionarioDatosForm');
const cuestionarioDatosOverlay = document.getElementById('cuestionarioDatosOverlay');
const saveBtn = document.getElementById('saveBtn');
const closeBtn = document.getElementById('closeBtn');
const informacionUsuarioDireccion = document.getElementById('informacionUsuarioDireccion'); // El elemento específico a actualizar

// Mostrar el modal al hacer clic en addBtn2
addBtn2.addEventListener('click', () => {
  // Precargar los datos existentes del info-box, si es necesario
  const currentName = informacionUsuarioDireccion.querySelector('strong')?.textContent || '';
  const currentInfo = informacionUsuarioDireccion.querySelector('p')?.textContent || '';

  // Rellenar el modal con los datos existentes
  document.getElementById('name').value = currentName;
  document.getElementById('info').value = currentInfo;

  // Mostrar el modal
  cuestionarioDatosForm.style.display = 'block';
  cuestionarioDatosOverlay.style.display = 'block';
});

// Cerrar el modal
closeBtn.addEventListener('click', () => {
  cuestionarioDatosForm.style.display = 'none';
  cuestionarioDatosOverlay.style.display = 'none';
});

// Guardar datos y actualizar informacionUsuario
saveBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const info = document.getElementById('info').value.trim();

  if (name && info) {
    // Actualizar el contenido de informacionUsuario
    informacionUsuarioDireccion.querySelector('strong').textContent = name;
    informacionUsuarioDireccion.querySelector('p').textContent = info;

    // Cerrar el modal
    cuestionarioDatosForm.style.display = 'none';
    cuestionarioDatosOverlay.style.display = 'none';
  } else {
    alert('Por favor, completa todos los campos.');
  }
});