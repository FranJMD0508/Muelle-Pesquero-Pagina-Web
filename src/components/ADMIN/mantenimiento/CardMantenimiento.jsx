import React, { useState, useEffect } from 'react';
import img from './barco.png'; // Asegúrate de que esta imagen esté en la ruta correcta

const Card = ({ item }) => {
  // Estado local para manejar el estado de la embarcación
  const [estado, setEstado] = useState(item.estado);

  // Actualiza el estado local cuando cambie la prop item
  useEffect(() => {
    setEstado(item.estado);
  }, [item.estado]);

  const handleChangeEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
    // Aquí puedes agregar lógica adicional si necesitas notificar a un padre o realizar alguna acción
  };

  return (
    <div key={item.id_embarcacion} className="col-6 col-md-4 col-lg-3 mb-4 position-relative">
      <div className="card h-100">
        <div className="card-body text-center">
          <h5 className="card-title">{item.nombre}</h5>
          <p className="card-text">Capacidad: {item.capacidad} - Tipo: {item.tipo_embarcacion}</p>
          <p className="card-text">Estado: {estado}</p>

          {/* Radio buttons para cambiar el estado */}
          <div className="form-check form-switch">
            <input
              type="radio"
              className="form-check-input"
              name={`estado-${item.id_embarcacion}`}
              id={`operativaSwitch-${item.id_embarcacion}`}
              checked={estado === 'Operativa'}
              onChange={() => handleChangeEstado('Operativa')}
            />
            <label className="form-check-label" htmlFor={`operativaSwitch-${item.id_embarcacion}`}>
              Operativa
            </label>
          </div>
          <div className="form-check form-switch">
            <input
              type="radio"
              className="form-check-input"
              name={`estado-${item.id_embarcacion}`}
              id={`inactivoSwitch-${item.id_embarcacion}`}
              checked={estado === 'Inactivo'}
              onChange={() => handleChangeEstado('Inactivo')}
            />
            <label className="form-check-label" htmlFor={`inactivoSwitch-${item.id_embarcacion}`}>
              Inactivo
            </label>
          </div>
          <div className="form-check form-switch">
            <input
              type="radio"
              className="form-check-input"
              name={`estado-${item.id_embarcacion}`}
              id={`mantenimientoSwitch-${item.id_embarcacion}`}
              checked={estado === 'En mantenimiento'}
              onChange={() => handleChangeEstado('En mantenimiento')}
            />
            <label className="form-check-label" htmlFor={`mantenimientoSwitch-${item.id_embarcacion}`}>
              En Mantenimiento
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;