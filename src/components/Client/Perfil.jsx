import React, { useState } from 'react';
import './perfil.css'	

function Perfil() {
  const [estado, setEstado] = useState(false);

  const toggleForm = () => {
    setEstado(!estado);
  };

  return (
    <div className={`contenedorForm ${estado ? 'open' : 'closed'}`}>
      <div className={`avisoIniciar ${estado ? 'open' : 'closed'}`}>
        <h1>Bienvenido<br></br>cliente</h1>
        <p>¿Ya tienes una cuenta?</p>
        <button id="iniciarBtn" onClick={toggleForm}>
          <i className='bi bi-arrow-left'></i>
          Iniciar sesión
        </button>
      </div>
      <div className={`avisoRegistrar ${!estado ? 'open' : 'closed'}`}>
        <h1>Registra tu<br></br>perfil ahora</h1>
        <p>¿No tienes una cuenta?</p>
        <button id="registrarBtn" onClick={toggleForm}>
          Registrarse
          <i className='bi bi-arrow-right'></i>
        </button>
      </div>
      <div className={`iniciar ${estado ? 'open' : 'closed'}`}>
        <h2>Inicia sesión aquí</h2>
        <form action="" id="iniciarForm">
          <div className="inputbox">
              <input type="email" id="correo" placeholder='Correo electrónico' required />
          </div>
          <div className="inputbox">
              <input type="password" id="password" placeholder='Contraseña' required />
          </div>
          <div className="opciones">
            <div id="recordarDiv">
              <input type="checkbox" id="recordar" />
              <label for="recordar">Recuérdame</label>
            </div>
            <a href="#">¿Olvidaste tu<br></br>contraseña?</a>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className={`registrar ${estado ? 'open' : 'closed'}`}>
        <h2>Regístrate aquí</h2>
        <form action="" id="registrarForm">
          <div className="inputbox">
              <input type="text" id="nombre" placeholder='Nombre' required />
          </div>
          <div className="inputbox">
              <input type="number" id="cedula" placeholder='Cédula' required />
          </div>
          <div className="inputbox">
              <input type="email" id="correo" placeholder='Correo electrónico' required />
          </div>
          <div className="inputbox">
              <input type="password" id="password" placeholder='Contraseña' required />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Perfil