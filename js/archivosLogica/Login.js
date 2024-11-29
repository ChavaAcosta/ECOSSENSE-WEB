import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://yoivlmsqywxgzjjcgndu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaXZsbXNxeXd4Z3pqamNnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTM2NzUsImV4cCI6MjA0NzQ2OTY3NX0.T1fAHEak9xwao9sMUbDAXVDANEatSD2f5whXIkmkkI0';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Manejar el evento "submit" del formulario
document.getElementById('form-login').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Obtén los valores del formulario
    const email = document.getElementById('correo').value;
    const password = document.getElementById('contra').value;
    const responseMessage = document.getElementById('responseMessage');
  
    // Busca el usuario por correo en la base de datos
    const { data: user, error } = await supabase
      .from('Usuario')
      .select('*')
      .eq('correo', email)
      .single();
  
    if (error) {
      console.error('Error al buscar usuario:', error.message);
      responseMessage.textContent = '❌ Usuario no encontrado o datos incorrectos.';
      responseMessage.style.color = 'red';
      return;
    }
  
  
    if (user.contrasenia != password) {
      responseMessage.textContent = '❌ Contraseña incorrecta.';
      responseMessage.style.color = 'red';
      return;
    }

    const userSessionData = {
        id: user.id_Usuario,
        nombre: user.nombre,
        correo: user.correo,
        tel: user.telefono,
      };
      sessionStorage.setItem('user', JSON.stringify(userSessionData));
  
    // Si las credenciales son correctas
    responseMessage.textContent = '✅ Inicio de sesión exitoso.';
    responseMessage.style.color = 'green';
  
    // Redirigir a otra página después de 3 segundos
    setTimeout(() => {
      window.location.href = '../../index.html';
    }, 2000);
  });