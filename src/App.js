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

function App() {
  const [route, setRoute] = useState('Cliente');

  const renderContent = () => {
    if (route === 'Cliente') {
      return (
        <>
          <ComercialHeader />
        </>
      );
    } 
    else if (route === 'Dashboard') {
      return (
        <>
          <Header />
          <SideBar setRoute={setRoute} />
          <Main route={route} />
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
