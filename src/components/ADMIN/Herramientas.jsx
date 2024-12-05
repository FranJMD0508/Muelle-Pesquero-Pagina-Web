import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

const Herramientas = () => {
  const [datos, setDatos] = useState([]);
  const [newHerramienta, setNewHerramienta] = useState({
    codigo_producto: '',
    nombre_producto: '',
    tipo_producto: '',
    cantidad: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Function to fetch data from the API
  const getDatos = async () => {
    try {
      const response = await fetch(config.apiUrl + 'inventario', {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const data = await response.json();
      setDatos(data.data);
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
    setNewHerramienta(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission for adding or editing
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data being sent:", newHerramienta); // Log the data being sent

    if (isEditing) {
      // Update existing entry
      fetch(`${config.apiUrl}inventario/${currentId}`, {
        method: "PUT",
        headers: new Headers({
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        }),
        body: JSON.stringify(newHerramienta)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setDatos(prevData => prevData.map(herramienta => herramienta.codigo_producto === currentId ? newHerramienta : herramienta));
            alert('Herramienta modificada exitosamente!');
            resetForm();
          } 
        })
        .catch(e => {
          console.error("Error modifying herramienta:", e.message);
        });
    } else {
      // Add new entry
      fetch(config.apiUrl + "inventario", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(newHerramienta)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setDatos(prevData => [...prevData, newHerramienta]);
            alert('Herramienta agregada exitosamente!');
            resetForm();
          }
        })
        .catch(e => {
          console.error("Error adding herramienta:", e.message);
          alert('Error al agregar la herramienta.');
        });
    }
  };

  // Handle editing an entry
  const handleEdit = (herramienta) => {
    setNewHerramienta(herramienta);
    setIsEditing(true);
    setCurrentId(herramienta.codigo_producto);
  };

  // Handle deleting an entry
  const handleDelete = (id) => {
    fetch(`${config.apiUrl}inventario/${id}`, {
      method: "DELETE",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDatos(prevData => prevData.filter(herramienta => herramienta.codigo_producto !== id));
          alert('Herramienta eliminada exitosamente!');
        } else {
          alert('Error al eliminar la herramienta.');
        }
      })
      .catch(e => {
        console.error("Error deleting herramienta:", e.message);
        alert('Error al eliminar la herramienta.');
      });
  };

  // Reset form fields
  const resetForm = () => {
    setNewHerramienta({
      codigo_producto: '',
      nombre_producto: '',
      tipo_producto: '',
      cantidad: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <>
      <div className="contenedor-tabla">
        <h1>Inventario de Suministros</h1>
        <table id="herramientas">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Tipo de Suministro</th>
              <th>Cantidad (unidades)</th>
              <th></th>
              <th>
                <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={resetForm}>AGREGAR</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {datos.map(herramienta => (
              <tr key={herramienta.codigo_producto}>
                <td>{herramienta.codigo_producto}</td>
                <td>{herramienta.nombre_producto}</td>
                <td>{herramienta.tipo_producto}</td>
                <td>{herramienta.cantidad}</td>
                <td><button className='btn btn-outline-warning' onClick={() => handleEdit(herramienta)} data-bs-toggle="modal" data-bs-target="#exampleModal">MODIFICAR</button></td>
                <td><button className='btn btn-outline-dark' onClick={() => handleDelete(herramienta.codigo_producto)}>ELIMINAR</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Herramientas */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{isEditing ? 'Modificar Herramienta' : 'Agregar Herramienta'}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetForm} />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Código Producto */}
                <div className="mb-3">
                  <label htmlFor="codigo_producto" className="form-label">Código</label>
                  <input type="text" name="codigo_producto" value={newHerramienta.codigo_producto} onChange={handleChange} className="form-control" required />
                </div>

                {/* Nombre Producto */}
                <div className="mb-3">
                  <label htmlFor="nombre_producto" className="form-label">Nombre</label>
                  <input type="text" name="nombre_producto" value={newHerramienta.nombre_producto} onChange={handleChange} className="form-control" required />
                </div>

                {/* Tipo Producto */}
                <div className="mb-3">
                  <label htmlFor="tipo_producto" className="form-label">Tipo de Suministro</label>
                  <select name="tipo_producto" value={newHerramienta.tipo_producto} onChange={handleChange} className="form-select" required>
                    <option value="">Seleccione un tipo</option>
                    <option value="Comida">Comida</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Herramienta">Herramienta</option>
                    <option value="Material de Reparacion">Material de Reparación</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
               

                {/* Cantidad */}
                <div className="mb-3">
                  <label htmlFor="cantidad" className="form-label">Cantidad</label>
                  <input type="number" name="cantidad" value={newHerramienta.cantidad} onChange={handleChange} className="form-control" required />
                </div>

                {/* Submit Button */}
                <button type="submit" className='btn btn-primary'>{isEditing ? 'Modificar Suministro' : 'Agregar Suministro'}</button>
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

export default Herramientas;