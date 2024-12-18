import React, { useState } from 'react';
//Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import Header from './components/ADMIN/Header';
import SideBar from './components/ADMIN/SideBar';
import Main from './components/ADMIN/Main';
import ComercialHeader from './components/Client/ComercialHeader';
import ComercialMain from './components/Client/ComercialMain';
import ComercialFooter from './components/Client/ComercialFooter';
import NavBar from './components/Client/NavBar';

function App() {
  const [route, setRoute] = useState('Cliente Inicio');
  const ruta = route.split(' ');

  const renderContent = () => {
    if (ruta[0] === 'Cliente') {
      return (
        <>
          <ComercialHeader />
          <NavBar setRoute={setRoute}/>
          <ComercialMain setRoute={setRoute} route={ruta[1]} />
          <ComercialFooter setRoute={setRoute}/>
        </>
      );
    } 
    else if (ruta[0] === 'Admin') {
      return (
        <>
          <Header />
          <SideBar setRoute={setRoute} />
          <Main route={ruta[1]} />
        </>
      );
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
