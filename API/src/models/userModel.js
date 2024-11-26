import pool from "../config/db.js";

export const getAllPescadosService = async () => {
    const result = await pool.query("SELECT * FROM pescados");
    return result.rows;
};

export const getAllClientesService = async () => {
    const result = await pool.query("SELECT * FROM Clientes");
    return result.rows;
};

export const getAllTransaccionesService = async () => {
    const result = await pool.query("SELECT * FROM Transacciones");
    return result.rows;
};

export const getAllHerramientasService = async () => {
    const result = await pool.query("SELECT * FROM herramientas");
    return result.rows;
};

export const getPescadosServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM pescados where id = $1", [id])
    return result.rows[0];
}

export const getHerramientasServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM herramientas where id = $1", [id])
    return result.rows[0];
}


export const getClienteServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM clientes where id = $1", [id])
    return result.rows[0];
}

export const getTransaccionesServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM Transacciones where id = $1", [id])
    return result.rows[0];
}

export const createPescadoService = async (codigo_pescado, pescado,peso_pescado) => {
    const result = await pool.query("INSERT INTO pescados (codigo_pescado, pescado,peso_pescado) VALUES ($1,$2,$3) RETURNING *", [codigo_pescado, pescado,peso_pescado]);
    return result.rows[0];
};

export const createHerramientaService = async (codigo_herramienta,herramienta,cantidad_herramienta) => {
    const result = await pool.query("INSERT INTO herramientas (codigo_herramienta,herramienta,cantidad_herramienta) VALUES ($1,$2,$3) RETURNING *", [codigo_herramienta,herramienta,cantidad_herramienta]);
    return result.rows[0];
};

export const createClienteService = async (nombre,cedula,email,telefono,direccion) => {
    const result = await pool.query("INSERT INTO Clientes (nombre,cedula,email,telefono,direccion) VALUES ($1,$2,$3,$4,$5) RETURNING *", [nombre,cedula,email,telefono,direccion]);
    return result.rows[0];
};

export const createTransaccionesService = async (tipo, monto, descripcion) => {
    // Se realiza la consulta de inserción
    const result = await pool.query(
        "INSERT INTO transacciones (tipo, monto, descripcion) VALUES ($1, $2, $3) RETURNING *", 
        [tipo, monto, descripcion]
    );
    return result.rows[0];
};

export const updatePescadoServiceByid = async (codigo_pescado, pescado,peso_pescado,id) => {
    const result = await pool.query("UPDATE pescados SET codigo_pescado = $1, pescado = $2 , peso_pescado = $3 WHERE id=$4 RETURNING *", [codigo_pescado, pescado,peso_pescado,id]);
    return result.rows[0];
};

export const updateHerramientaServiceByid = async (codigo_herramienta,herramienta,cantidad_herramienta,id) => {
    const result = await pool.query("UPDATE herramientas SET codigo_herramienta = $1, herramienta = $2 , cantidad_herramienta = $3 WHERE id=$4 RETURNING *", [codigo_herramienta,herramienta,cantidad_herramienta,id]);
    return result.rows[0];
};


export const updateClienteServiceByid = async (nombre,cedula,email,telefono,direccion,id) => {
    const result = await pool.query("UPDATE Clientes SET nombre = $1, cedula= $2, email = $3 , telefono = $4,direccion = $5 WHERE id= $6 RETURNING *", [nombre,cedula,email,telefono,direccion,id]);
    return result.rows[0];
};

export const deletePescadoServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM pescados WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteHerramientaServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM herramientas WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteClienteServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Clientes WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteTransaccionesServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Transacciones WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

//Funcion para obtener el Monto Neto de todas las transacciones realizadas
export const getMontoNetoService = async () => {
    const result = await pool.query(`SELECT 
            COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) - 
            COALESCE(SUM(CASE WHEN tipo = 'egreso' THEN monto ELSE 0 END), 0) AS monto_neto
        FROM transacciones
        WHERE fecha BETWEEN $1 AND $2`);
    // Retorna el monto neto, o 0 si es null
    return result.rows[0].monto_neto;
};

export const getTransaccionesEntreFechasService = async (fechaInicio, fechaFin) => {
    //La Fecha se Tiene que consultar YYYY-MM-DD HH:MM:SS
    const result = await pool.query(
        "SELECT * FROM transacciones WHERE fecha BETWEEN $1 AND $2 ORDER BY fecha ASC", 
        [fechaInicio, fechaFin]
    );
    return result.rows;
}

export const getMontoTotalEntreFechasService = async (fechaInicio, fechaFin) => {
    // Asegúrate de que las fechas estén en el formato 'YYYY-MM-DD HH:MM:SS'

    const result = await pool.query(
        `SELECT 
    COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) - 
    COALESCE(SUM(CASE WHEN tipo = 'egreso' THEN monto ELSE 0 END), 0) AS monto_neto
    FROM transacciones
         WHERE fecha BETWEEN $1 AND $2`, 
        [fechaInicio, fechaFin]
    );
    
    // Verificamos si hay resultados y devolvemos el monto total
    if (result.rows.length === 0 || result.rows[0].monto_total === null) {
        return 0;  // Si no hay transacciones en el rango, devolvemos 0
    }
    return parseFloat(result.rows[0].monto_neto);  // Convertimos el resultado a un número decimal
}