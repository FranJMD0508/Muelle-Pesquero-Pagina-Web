import React from 'react';
import img from './barco.png';


const Card = ({ item, onChangeEstado }) => {
  return (
    <div key={item.id_embarcacion} className="col-6 col-md-4 col-lg-3 mb-4 position-relative">
      <div className="card h-100">
        <div className="card-header p-0">
          <img src={img} className="img-fluid" alt={item.nombre} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{item.nombre}</h5>
          <p className="card-text">Capacidad: {item.capacidad} - Tipo: {item.tipo_embarcacion}</p>
          <p className="card-text">Estado: {item.estado}</p>

          {/* Radio buttons para cambiar el estado */}
          <div className="form-check form-switch">
            <input
              type="radio"
              className="form-check-input"
              name={`estado-${item.id_embarcacion}`}
              id={`operativaSwitch-${item.id_embarcacion}`}
              checked={item.estado === 'Operativa'}
              onChange={() => onChangeEstado(item.id_embarcacion, 'Operativa')}
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
              checked={item.estado === 'Inactivo'}
              onChange={() => onChangeEstado(item.id_embarcacion, 'Inactivo')}
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
              checked={item.estado === 'En mantenimiento'}
              onChange={() => onChangeEstado(item.id_embarcacion, 'En mantenimiento')}
            />
            <label className="form-check-label" htmlFor={`mantenimientoSwitch-${item.id_embarcacion}`}>
              En Mantenimiento
            </label>
          </div>
        </div>
        <div className="card-footer text-center">
          <button type="button" className="btn btn-outline-success">
            Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;