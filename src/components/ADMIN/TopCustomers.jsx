import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter'
import './topCustomers.css'
import config from './config';

function TopSelling() {
    const now = new Date();
    const [filter, setFilter] = useState('Hoy');
    const [items, setItems] = useState([]);
    const [fechaInicio, setFechaInicio] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString());
    const [fechaFin, setFechaFin] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString());

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
        else if (filter === 'Este mes' || filter === "Este mes"){
            startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        }
        else if (filter === 'Este año' || filter === "Este año"){
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

    const fetchData = (url) => {
        fetch(url, {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
        })
        .then(res => res.json())
        .then(data => {
            setItems(data.data.ventasYclientes)
        })
        .catch(e => console.log(e.message))
    };

    useEffect(() => {
        if (fechaInicio && fechaFin) {
            fetchData(`${config.apiUrl}transacciones/concurrido?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);        
        }
    }, [fechaInicio, fechaFin]);

  return (
    <div className="card top-customers">
        <CardFilter filterChange={handleFilterChange} />

        <div className="card-body pb-0">
            <h5 className='card-title'>
                Clientes usuales <span>| {filter}</span>
            </h5>
            <table className="table table-borderless overflow-auto">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cédula</th>
                        <th scope="col" className='text-center'>Compras realizadas</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length > 0 ? (
                        items.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <a href="#">{item.nombre_cliente}</a>
                                </td>
                                <td>
                                    <a href="#" className="text-primary fw-bold">{item.cedula_cliente}</a>
                                </td>
                                <td className='text-center'>
                                    {item.cantidad_compras}
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan='3' className='text-center'>No hay datos</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TopSelling