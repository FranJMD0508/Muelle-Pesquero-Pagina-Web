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

export const createPescadoService = async (codigo_pescado, pescado,peso_pescado,fecha_entrada,fecha_caducidad) => {
    const result = await pool.query("INSERT INTO pescados (codigo_pescado, pescado,peso_pescado,fecha_entrada,fecha_caducidad) VALUES ($1,$2,$3,$4,$5) RETURNING *", [codigo_pescado, pescado,peso_pescado,fecha_entrada,fecha_caducidad]);
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

export const createTransaccionesService = async (
    tipo, 
    monto, 
    descripcion, 
    codigo_pescado, 
    nombre_cliente, 
    cedula_cliente, 
    email_cliente, 
    telefono_cliente, 
    direccion_cliente
) => {
    // Se realiza la consulta de inserción
    const result = await pool.query(
        `INSERT INTO transacciones (
            tipo, monto, descripcion, codigo_pescado, nombre_cliente, cedula_cliente, 
            email_cliente, telefono_cliente, direccion_cliente
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`, 
        [tipo, monto, descripcion, codigo_pescado, nombre_cliente, cedula_cliente, 
        email_cliente, telefono_cliente, direccion_cliente]
    );
    return result.rows[0];
};

export const updatePescadoServiceByid = async (codigo_pescado, pescado,peso_pescado,fecha_entrada,fecha_caducidad,id) => {
    const result = await pool.query("UPDATE pescados SET codigo_pescado = $1, pescado = $2 , peso_pescado = $3 , fecha_entrada = $4, fecha_caducidad = $5 WHERE id=$6 RETURNING *", [codigo_pescado, pescado,peso_pescado,fecha_entrada,fecha_caducidad,id]);
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

export const getVentasYClientesEntreFechasService = async (fechaInicio, fechaFin) => {
    const result = await pool.query(
        `SELECT 
            COUNT(DISTINCT cedula_cliente) AS cantidad_clientes,  -- Contamos clientes únicos
            COUNT(id) AS cantidad_ventas  -- Contamos las ventas exitosas (ingresos)
        FROM transacciones
        WHERE tipo = 'ingreso'  -- Solo consideramos las ventas exitosas
        AND fecha BETWEEN $1 AND $2`, 
        [fechaInicio, fechaFin]
    );

    // Verificamos si hay resultados y devolvemos el número de clientes y ventas
    if (result.rows.length === 0) {
        return {
            cantidad_clientes: 0,  // Si no hay ventas, devolvemos 0 clientes
            cantidad_ventas: 0     // Si no hay ventas, devolvemos 0 ventas
        };
    }

    return {
        cantidad_clientes: result.rows[0].cantidad_clientes,  // Número de clientes que compraron
        cantidad_ventas: result.rows[0].cantidad_ventas       // Número total de ventas exitosas
    };
};
