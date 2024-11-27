import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter'
import './card.css'

function Card({card, icon}) {
  const now = new Date();
  const [filter, setFilter] = useState('Hoy');
  const [fechaInicio, setFechaInicio] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString());
  const [fechaFin, setFechaFin] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString());
  const [monto, setMonto] = useState(null);
  const [transacciones, setTransacciones] = useState([]);

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
      console.log("fi:", startDate, "ff:", endDate);
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
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMonto(data.data)
      })
      .catch(e => console.log(e.message));
  };

  const fetchTransacciones = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTransacciones(data.data)
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      fetchMonto(`http://localhost:5001/API/transacciones/monto/rango?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    }
  }, [fechaInicio, fechaFin]);

  useEffect(() => {
    fetchTransacciones('http://localhost:5001/api/transacciones');
  }, []);


  const countIngresos = transacciones.reduce((acc, transaccion) => {
    return transaccion.tipo === 'ingreso' ? acc + 1 : acc;
  }, 0);

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
              {card === 'Ganancias' && monto
                ? '$' + (monto?.montoTotal?.toLocaleString('en-US') || '0')
                : card === 'Ventas' && monto
                ? (countIngresos?.toLocaleString('en-US') || '0')
                : card === 'Clientes' && monto
                ? monto?.totalClientes?.toLocaleString('en-US') || '0'
                : 'Cargando...'}
            </h6>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Card