import React from 'react'
import './footer.css'

function ComercialFooter() {
  return (
    <footer>
        <a href="/" id="logo-footer">
            <img src="./assets/images/pez.png" alt="Logo" />
            <h2>MUELLE
              PESQUERO</h2>
        </a>

        <div className="apartado">
          <h4>CONTACTO</h4>
          <h5>DIRECCIÓN</h5>
          <h6>Aquí no sé qué poner porque no tenemos direccion en este momento.
            Pero ponle que estamos en puerto cabello, por ahi pues. Esto es relleno.</h6>
          <a href="" className='link'>
            <i className="bi bi-envelope-fill"></i>
            Enviar un e-mail
          </a>
          <a href="" className='link'>
            <i className="bi bi-whatsapp"></i>
            +58 412-4755652
          </a>
          <a href="" className='link'>
            <i className="bi bi-telephone-fill"></i>
            04124755652
          </a>
        </div>

        <div className="apartado">
          <h4>PERFIL</h4>
          <div id="perfil">
            <a href="">
              <i className="bi bi-caret-right-fill"></i>
              Iniciar Sesión
            </a>
            <a href="">
              <i className="bi bi-caret-right-fill"></i>
              Registrarse
            </a>
            <a href="">
              <i className="bi bi-caret-right-fill"></i>
              Perfil
            </a>
            <a href="">
              <i className="bi bi-caret-right-fill"></i>
              Carrito
            </a>
          </div>
        </div>

        <div className="apartado">
          <h4>MÉTODOS DE PAGO SEGURO</h4>
          <div className="pagos">
            <img src="./assets/images/visa.jpg" alt="visa" />
            <img src="./assets/images/master.jpg" alt="mastercard" />
            <img src="./assets/images/american.jpg" alt="american express" />
          </div>
          <h6>Tarjeta de crédito, Pago por Whatsapp, Link de pago, Transferencia, Contra Entrega.</h6>
        </div>
    </footer>
  )
}

export default ComercialFooter