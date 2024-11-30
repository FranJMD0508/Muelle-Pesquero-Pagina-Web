import React from 'react'
import './main.css'
import PageTitle from './PageTitle'
import Dashboard from './Dashboard'
import Alimentos from './Alimentos'
import Herramientas from './Herramientas'
import Transacciones from './Transacciones'
import Clientes from './Clientes'
import Maquinaria from './Maquinaria'
import Nomina from './Nomina'


function Main({ route }) {
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
    else if (route === 'Nomina' || route === "Nomina") {
      return <Nomina />
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