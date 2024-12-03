import React, { useState, useEffect } from 'react';
import Inicio from './Inicio'
import Perfil from './Perfil'
import './main.css'

function ComercialMain({ route }) {
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: 'white' });

  useEffect(() => {
    if (route === 'Perfil') {
      setBackgroundStyle({
        background: 'linear-gradient(to bottom, rgb(50, 120, 154), rgb(20, 50, 90))',
      });
    } else {
      setBackgroundStyle({ backgroundColor: 'white' });
    }
  }, [route]);

  const renderContent = () => {
    if (route === 'Inicio') {
      return <Inicio />
    }
    else if (route === 'Perfil') {
      return <Perfil />
    }
  }

  return (
    <main id='comercialMain' style={backgroundStyle}>
      {renderContent()}
    </main>
  )
}

export default ComercialMain