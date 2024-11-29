import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Manejar el evento "submit" del formulario
document.getElementById('form-registro').addEventListener('submit', async (event) => {
  event.preventDefault(); // Previene el envío por defecto del formulario

  // Obtener los valores de los campos
  const name = document.getElementById('nombre').value;
  const email = document.getElementById('correo').value;
  const password = document.getElementById('contra').value;
  const phone = document.getElementById('tel').value;

  // Insertar los datos en la tabla 'users'
  const { data, error } = await supabase.from('Usuario').insert([
    {
      nombre: name,
      correo: email,
      contrasenia: password, // Asegúrate de manejar contraseñas de forma segura (hashing recomendado)
      telefono: phone,
    },
  ]);
  const responseMessage = document.getElementById('responseMessage');
  if (error) {
    console.error('Error al registrar el usuario:', error);
  
    let errorMessage = '❌ Ocurrió un error al crear la cuenta.';
    if (error.message.includes('duplicate key value')) {
      errorMessage = '❌ El correo ya está registrado.';
    }
  
    responseMessage.textContent = errorMessage;
    responseMessage.style.color = 'red';
  } else {
    console.log('Usuario registrado:', data);
    responseMessage.textContent = '✅ Cuenta creada con éxito.';
    responseMessage.style.color = 'green';
    
    setTimeout(() => {
        window.location.href = '../login.html';
      }, 2000); // 2000 ms = 2 segundos

  }
});