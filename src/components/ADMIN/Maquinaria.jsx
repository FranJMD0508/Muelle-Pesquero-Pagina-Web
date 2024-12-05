import React, { useState, useEffect } from 'react';
import './tablas.css';

function Maquinaria() {
  const API = 'https://affd-168-194-111-17.ngrok-free.app/Api/Embarcacion'; // Ensure the endpoint is correct
  const [data, setData] = useState([]);
  const [newBarco, setNewBarco] = useState({
    id_embarcacion: '',
    nombre: '',
    capacidad: '',
    tipo_embarcacion: '',
    estado: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Function to fetch data from the API
  const getDatos = async () => {
    try {
      const response = await fetch(API, {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const data = await response.json();
      setData(data.data);
    } catch (e) {
      console.error("Error fetching data:", e.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getDatos();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBarco(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data being sent:", newBarco); // Log the data being sent

    if (isEditing) {
      // Update existing entry
      fetch(`${API}/${currentId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(newBarco)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setData(prevData => prevData.map(barco => barco.id_embarcacion === currentId ? newBarco : barco));
            alert('Embarcación modificada exitosamente!');
            resetForm();
          } else {
            alert(`${data.message || 'Unknown error'}`);
          }
        })
        .catch(e => {
          console.error("Error modifying barco:", e.message);
          alert('Error al modificar la embarcación.');
        });
    } else {
      // Add new entry
      fetch(API, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(newBarco)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setData(prevData => [...prevData, newBarco]);
            alert('Embarcación agregada exitosamente!');
            resetForm();
          } else {
            alert(`x: ${data.message || 'Unknown error'}`);
          }
        })
        .catch(e => {
          console.error("Error adding barco:", e.message);
          alert('Error al agregar la embarcación.');
        });
    }
  };

  // Handle editing an entry
  const handleEdit = (barco) => {
    setNewBarco(barco);
    setIsEditing(true);
    setCurrentId(barco.id_embarcacion);
  };

  // Handle deleting an entry
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setData(prevData => prevData.filter(barco => barco.id_embarcacion !== id));
          alert('Embarcación eliminada exitosamente!');
        } else {
          alert(`${data.message || 'Unknown error'}`);
        }
      })
      .catch(e => {
        console.error("Error deleting barco:", e.message);
        alert('Error al eliminar la embarcación.');
      });
  };

  // Reset form fields
  const resetForm = () => {
    setNewBarco({
      id_embarcacion: '',
      nombre: '',
      capacidad: '',
      tipo_embarcacion: '',
      estado: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <>
      <div className="contenedor-tabla">
        <h1>Inventario de Embarcaciones</h1>
        <table id="maquinaria">
          <thead>
            <tr>
              <th>ID de embarcación</th>
              <th>Nombre</th>
              <th>Capacidad máxima (T)</th>
              <th>Tipo de embarcación</th>
              <th>Estado</th>
              <th></th>
              <th>
                <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={resetForm}>AGREGAR</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(barco => (
              <tr key={barco.id_embarcacion}>
                <td>{barco.id_embarcacion}</td>
                <td>{barco.nombre}</td>
                <td>{barco.capacidad}</td>
                <td>{barco.tipo_embarcacion}</td>
                <td>{barco.estado}</td>
                <td>
                  <button className='btn btn-outline-warning mb-2' onClick={() => handleEdit(barco)} data-bs-toggle="modal" data-bs-target="#exampleModal">MODIFICAR</button>
                </td>
                <td>
                  <button className='btn btn-outline-dark' onClick={() => handleDelete(barco.id_embarcacion)}>ELIMINAR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Entry */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{isEditing ? 'Modificar Embarcación' : 'Agregar Embarcación'}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetForm} />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* ID de Embarcación */}
                <div className="mb-3">
                  <label htmlFor="id_embarcacion" className="form-label">ID de Embarcación</label>
                  <input type="text" name="id_embarcacion" value={newBarco.id_embarcacion} onChange={handleChange} className="form-control" required />
                </div>

                {/* Nombre */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" name="nombre" value={newBarco.nombre} onChange={handleChange} className="form-control" required />
                </div>

                {/* Capacidad Máxima */}
                <div className="mb-3">
                  <label htmlFor="capacidad" className="form-label">Capacidad Máxima (T)</label>
                  <input type="number" name="capacidad" value={newBarco.capacidad} onChange={handleChange} className="form-control" required />
                </div>

                {/* Tipo de Embarcación */}
                <div className="mb-3">
                  <label htmlFor="tipo_embarcacion" className="form-label">Tipo de Embarcación</label>
                  <input type="text" name="tipo_embarcacion" value={newBarco.tipo_embarcacion} onChange={handleChange} className="form-control" required />
                </div>

                {/* Estado */}
                <div className="mb-3">
                  <label htmlFor="estado" className="form-label">Estado</label>
                  <input type="text" name="estado" value={newBarco.estado} onChange={handleChange} className="form-control" required />
                </div>

                {/* Submit Button */}
                <button type="submit" className='btn btn-primary'>{isEditing ? 'Modificar Embarcación' : 'Agregar Embarcación'}</button>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              {/* Close Button */}
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Maquinaria;