import React from 'react'
import Inicio from './Inicio'
import './main.css'

function ComercialMain({ route }) {
  const renderContent = () => {
    if (route === 'Inicio') {
      return <Inicio />
    }
  }

  return (
    <main id='comercialMain'>
      {renderContent()}
    </main>
  )
}

export default ComercialMain