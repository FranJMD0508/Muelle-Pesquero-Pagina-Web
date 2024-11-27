import React from 'react'
import './main.css'
import PageTitle from './PageTitle'
import Dashboard from './Dashboard'

function Main() {
  const elementos = ['Elemento A', 'Elemento B', 'Elemento C', 'Elemento D'];
  const posiciones = [2, 0, 3, 1];
  return (
    <main id='main' className='main'>
      <PageTitle page="Centro de administración"/>
      <Dashboard />
    </main>
  )
}

export default Main