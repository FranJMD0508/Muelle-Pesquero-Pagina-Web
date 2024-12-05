import React, { useState } from 'react';
import './main.css'
import PageTitle from './PageTitle'
import Dashboard from './Dashboard'
import Alimentos from './Alimentos'
import Herramientas from './Herramientas'
import Transacciones from './Transacciones'
import Clientes from './Clientes'
import Maquinaria from './Maquinaria'
import Nomina from './Nomina'
import HeaderMantenimiento from './mantenimiento/HeaderMantenimiento'
import LevantarReportes from './mantenimiento/LevantarReportes'
import Barcos from './mantenimiento/page/Barcos'


function Main({ route }) {
  const [rutaMant, setRutaMant] = useState('Reportes');

  const renderContent = () => {
    if (route === 'Dashboard' || route === "Dashboard") {
      return <Dashboard />
    }
    else if (route === 'Alimentos' || route === "Alimentos") {
      return <Alimentos />
    }
    else if (route === 'Herramientas' || route === "Herramientas") {
      return <Herramientas />
    }
    else if (route === 'Transacciones' || route === "Transacciones") {
      return <Transacciones />
    }
    else if (route === 'Clientes' || route === "Clientes") {
      return <Clientes />
    }
    else if (route === 'Maquinaria' || route === "Maquinaria") {
      return <Maquinaria />
    }
    else if (route === 'Nómina' || route === "Nómina") {
      return <Nomina />
    }
    else if (route === 'Mantenimiento' || route === "Mantenimiento") {

      if (rutaMant === 'Reportes') {
        return (
          <div id="mantenimiento">
            <HeaderMantenimiento setRoute={setRutaMant}/>
            <LevantarReportes />
          </div>
        )
      }
      else if (rutaMant === 'Barcos') {
        return (
          <div id="mantenimiento">
            <HeaderMantenimiento setRoute={setRutaMant}/>
            <Barcos />
          </div>
        )
      }
    }
    else{
      return <Dashboard />
    }
  }

  return (
    <main id='main' className='main'>
      <PageTitle page={route}/>
      {renderContent()}
    </main>
  )
}

export default Main