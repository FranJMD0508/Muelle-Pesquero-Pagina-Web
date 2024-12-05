import React, { useState, useEffect } from 'react';
import Inicio from './Inicio'
import Perfil from './Perfil'
import './comercialMain.css'
import MenuCompras from './MenuCompras';
import Personalizado from './Personalizado';

function ComercialMain({ route, setRoute }) {
  const [rutaCompras, setCompras] = useState('Menu');
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: 'white' });

  useEffect(() => {
    if (route === 'Perfil') {
      setBackgroundStyle({
        background: 'linear-gradient(to bottom, rgb(50, 120, 154), rgb(20, 50, 90))',
      });
    } 
    else if (route === 'Compras') {
      setBackgroundStyle({
        background: 'url(./assets/images/catalogo-slide.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      });
    } 
    else {
      setBackgroundStyle({ backgroundColor: 'white' });
    }
  }, [route]);

  const renderContent = () => {
    if (route === 'Inicio') {
      return <Inicio setRoute={setRoute}/>
    }
    else if (route === 'Compras') {

      if (rutaCompras === 'Menu'){
        return <MenuCompras setRoute={setCompras}/>
      }
      else if (rutaCompras === 'Estandar'){
        return <div>HOLA</div>
      }
      else if (rutaCompras === 'Personalizadas'){
        return <Personalizado />
      }
    }
    else if (route === 'Perfil') {
      return <Perfil setRoute={setRoute}/>
    }
  }

  return (
    <main id='comercialMain' style={backgroundStyle}>
      {renderContent()}
    </main>
  )
}

export default ComercialMain