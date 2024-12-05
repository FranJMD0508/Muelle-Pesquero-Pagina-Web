import React, { useState } from 'react';
import config from '../ADMIN/config';
import './perfil.css'	

function Perfil({ setRoute }) {
  const [estado, setEstado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    email: '',
    telefono: '',
    contrasena: ''
  });

  const [loginData, setLoginData] = useState({
    correoInicio: '',
    contrasenaInicio: ''
  });

  const toggleForm = () => {
    setEstado(!estado);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log('Datos del formulario:', formData);
    e.preventDefault();
    try {
      const response = await fetch(config.apiUrl + "clientes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Registro exitoso');
        setEstado(!estado);
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', loginData); // Verifica los datos de inicio de sesión antes de enviarlos
    try {
      const response = await fetch(config.apiUrl + "clientes", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        }
      });
        const result = await response.json();
        const data = result.data;
        if (loginData.correoInicio === 'admin@email.com' && loginData.contrasenaInicio === 'admin') {
          sessionStorage.setItem('currentRoute', 'Admin Dashboard');
          setRoute('Admin Dashboard');
        }
        else{
          const user = data.find(user => user.email === loginData.correoInicio && user.contrasena === loginData.contrasenaInicio);
          console.log('Usuario:', user);
          if (user) {
            sessionStorage.setItem('currentRoute', 'Cliente Compras');
            setRoute('Cliente Compras');
            alert('Bienvenido de vuelta');
          } else {
            alert('Credenciales incorrectas');
          }
        }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión');
    }
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
        <form action="" id="iniciarForm" onSubmit={handleLoginSubmit}>
          <div className="inputbox">
              <input type="email" id="correoInicio" placeholder='Correo electrónico' value={loginData.correoInicio} onChange={handleLoginChange} required />
          </div>
          <div className="inputbox">
              <input type="password" id="contrasenaInicio" placeholder='Contraseña' value={loginData.contrasenaInicio} onChange={handleLoginChange} required />
          </div>
          <div className="opciones">
            <div id="recordarDiv">
              <input type="checkbox" id="recordar" />
              <label htmlforfor="recordar">Recuérdame</label>
            </div>
            <a href="#">¿Olvidaste tu<br></br>contraseña?</a>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className={`registrar ${estado ? 'open' : 'closed'}`}>
        <h2>Regístrate aquí</h2>
        <form action="" id="registrarForm" onSubmit={handleSubmit}>
          <div className="registrarDatos">
            <div className="inputbox">
                <input type="text" id="nombre" placeholder='Nombre' value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="inputbox">
                <input type="number" id="cedula" placeholder='Cédula' value={formData.cedula} onChange={handleChange} required />
            </div>
            <div className="inputbox">
                <input type="email" id="email" placeholder='Correo electrónico' value={formData.email} onChange={handleChange} required />
            </div>
            <div className="inputbox">
                <input type="text" id="telefono" placeholder='Teléfono' value={formData.telefono} onChange={handleChange} required />
            </div>
            <div className="inputbox">
                <input type="password" id="contrasena" placeholder='Contraseña' value={formData.contrasena} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Perfil