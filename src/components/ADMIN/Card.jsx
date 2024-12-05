import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter'
import './card.css'
import config from './config';

function Card({card, icon}) {
  const now = new Date();
  const [filter, setFilter] = useState('Hoy');
  const [fechaInicio, setFechaInicio] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString());
  const [fechaFin, setFechaFin] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString());
  const [monto, setMonto] = useState(null);
  const [transacciones, setTransacciones] = useState({ventasYclientes: {cantidad_ventas: 0, cantidad_clientes: 0}});

  const handleFilterChange = (filter) => {
    setFilter(filter);
    updateDates(filter);
  };

  const updateDates = (filter) => {
    const now = new Date();
    let startDate, endDate;

    if (filter === 'Hoy' || filter === "Hoy"){
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    }
    else if (filter === 'Este Mes' || filter === "Este mes"){
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    }
    else if (filter === 'Este Año' || filter === "Este año"){
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }
    else{
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23,)
      console.log("Filtro no reconocido")
    }
    
    setFechaInicio(startDate.toISOString());
    setFechaFin(endDate.toISOString());
  };

  const fetchMonto = (url) => {
    fetch(url, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then(response => response.json())
      .then(data => {
        setMonto(data.data)
      })
      .catch(e => console.log(e.message));
  };

  const fetchTransacciones = (url) => {
    fetch(url, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then(response => response.json())
      .then(data => {
        setTransacciones(data.data)
        console.log(data.data.ventasYclientes)
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    if (fechaInicio && fechaFin) {
        fetchMonto(`${config.apiUrl}transacciones/monto/rango?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    }
  }, [fechaInicio, fechaFin]);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      fetchTransacciones(`${config.apiUrl}transacciones/clientes?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    }
  }, [fechaInicio, fechaFin]);

  return (
    <div className='col-xxl-4 col-md-6'>
    <div className='card info-card sales-card'>
      <CardFilter filterChange={handleFilterChange}/>
      
      <div className='card-body'>
        <h5 className='card-title'>
          {card} <span>| {filter} </span>
        </h5>

        <div className='d-flex align-items-center'>
          <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
            <i className={icon}></i>
          </div>
          <div className='ps-3'>
            <h6>
                {
                    card === 'Ganancias'
                    ? '$' + (monto?.montoTotal?.toLocaleString('en-US') || '0')
                    : card === 'Ventas'
                    ? (transacciones?.ventasYclientes?.cantidad_ventas?.toLocaleString('en-US') || '0')
                    : card === 'Clientes'
                    ? (transacciones?.ventasYclientes?.cantidad_clientes?.toLocaleString('en-US') || '0')
                    : 'Cargando...'
                }
            </h6>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Card