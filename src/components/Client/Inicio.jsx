import React from 'react'
import './inicio.css'
import CarruselInfo from './CarruselInfo'
import Destacados from './Destacados'

function Inicio({ setRoute }) {
  return (
    <div className="inicio">
        <div id="hero">
            <h1><p>EL MEJOR MUELLE PESQUERO<br/>DE VENEZUELA</p></h1>
            <h4><p>Descubre más sobre el muelle pesquero más grande de toda Venezuela.<br/>
                El pescado más fresco y de calidad en toda la nación.</p></h4>
            <a id='boton' onClick={() => setRoute('Cliente Compras')}>Ordenar ahora</a>
        </div>
        <Destacados />
        <CarruselInfo />
    </div>
  )
}

export default Inicio