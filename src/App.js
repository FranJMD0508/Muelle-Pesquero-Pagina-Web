import React, { useState } from 'react';
//Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Main from './components/Main';

function App() {
  const [route, setRoute] = useState('Dashboard');

  return (
    <>
      <Header />
      <SideBar setRoute={setRoute}/>
      <Main route={route}/>
    </>
  );
}

export default App;
