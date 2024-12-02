import pool from "../config/db.js";

// Obtener todos los registros
export const getAllPescadosService = async () => {
    const result = await pool.query("SELECT * FROM pescados");
    return result.rows;
};

export const getAllRegistroPescadosService = async () => {
    const result = await pool.query("SELECT * FROM Tipospescado");
    return result.rows;
};
export const getAllClientesService = async () => {
    const result = await pool.query("SELECT * FROM Clientes");
    return result.rows;
};

export const getAllNominaService = async () => {
    const result = await pool.query("SELECT * FROM Nomina");
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

export const getAllEmbarcacionService = async () => {
    const result = await pool.query("SELECT * FROM Embarcaciones");
    return result.rows;
};

// Obtener un registro por ID
export const getPescadosServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM pescados where id = $1", [id]);
    return result.rows[0];
};


export const getHerramientasServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM herramientas where id = $1", [id]);
    return result.rows[0];
};

export const getClienteServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM clientes where id = $1", [id]);
    return result.rows[0];
};

export const getNominaServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM Nomina where id = $1", [id]);
    return result.rows[0];
};

export const getTransaccionesServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM Transacciones where id = $1", [id]);
    return result.rows[0];
};

export const getEmbarcacionServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM embarcaciones where id = $1", [id]);
    return result.rows[0];
};


// Crear registros
export const createPescadoService = async (codigo_pescado, pescado, cantidad_pescado, fecha_entrada, fecha_caducidad) => {
    const result = await pool.query(
        "INSERT INTO pescados (codigo_pescado, pescado, cantidad_pescado, fecha_entrada, fecha_caducidad) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [codigo_pescado, pescado, cantidad_pescado, fecha_entrada, fecha_caducidad]
    );
    return result.rows[0];
};



export const createIngresoPescadoService = async (codigo_pescado, pescado, descripcion) => {
    const result = await pool.query(
        "INSERT INTO TiposPescado (codigo_pescado, pescado, descripcion) VALUES ($1,$2,$3) RETURNING *",
        [codigo_pescado, pescado, descripcion]
    );
    return result.rows[0];
};

export const createHerramientaService = async (codigo_herramienta, herramienta, cantidad_herramienta) => {
    const result = await pool.query(
        "INSERT INTO herramientas (codigo_herramienta, herramienta, cantidad_herramienta) VALUES ($1,$2,$3) RETURNING *",
        [codigo_herramienta, herramienta, cantidad_herramienta]
    );
    return result.rows[0];
};

export const createClienteService = async (nombre, cedula, email, telefono, direccion) => {
    const result = await pool.query(
        "INSERT INTO Clientes (nombre, cedula, email, telefono, direccion) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [nombre, cedula, email, telefono, direccion]
    );
    return result.rows[0];
};

export const createNominaService = async (nombre, apellido, cedula, clave) => {
    const result = await pool.query(
        "INSERT INTO Nomina (nombre, apellido, cedula, clave) VALUES ($1,$2,$3,$4) RETURNING *",
        [nombre, apellido, cedula, clave]
    );
    return result.rows[0];
};

export const createEmbarcacionService = async (cantidad_barco,tipo_embarcacion,estado,capacidad_carga_max) => {
    const result = await pool.query(
        "INSERT INTO embarcaciones (cantidad_barco,tipo_embarcacion,estado,capacidad_carga_max) VALUES ($1,$2,$3,$4) RETURNING *",
        [cantidad_barco,tipo_embarcacion,estado,capacidad_carga_max]
    );
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

// Actualizar registros
export const updateIngresoPescadoServiceByid = async (codigo_pescado, pescado, descripcion, id) => {
    const result = await pool.query(
        "UPDATE TiposPescado SET codigo_pescado = $1, pescado = $2, descripcion = $3 WHERE id=$4 RETURNING *",
        [codigo_pescado, pescado, descripcion, id]
    );
    return result.rows[0];
};

export const updatePescadoServiceByid = async (codigo_pescado, pescado, peso_pescado, fecha_entrada, fecha_caducidad, id) => {
    const result = await pool.query(
        "UPDATE pescados SET codigo_pescado = $1, pescado = $2 , peso_pescado = $3 , fecha_entrada = $4, fecha_caducidad = $5 WHERE id=$6 RETURNING *",
        [codigo_pescado, pescado, peso_pescado, fecha_entrada, fecha_caducidad, id]
    );
    return result.rows[0];
};

export const updateHerramientaServiceByid = async (codigo_herramienta, herramienta, cantidad_herramienta, id) => {
    const result = await pool.query(
        "UPDATE herramientas SET codigo_herramienta = $1, herramienta = $2 , cantidad_herramienta = $3 WHERE id=$4 RETURNING *",
        [codigo_herramienta, herramienta, cantidad_herramienta, id]
    );
    return result.rows[0];
};

export const updateEmbarcacionServiceByid = async (cantidad_embarcacion,tipo_embarcacion,estado_embarcacion,capacidad_carga_max, id) => {
    const result = await pool.query(
        "UPDATE embarcaciones SET cantidad_barco = $1 tipo_embarcacion = $2, estado_embarcacion = $3 , capacidad_carga_max = $4 WHERE id=$5 RETURNING *",
        [cantidad_barco,tipo_embarcacion,estado_embarcacion,capacidad_carga_max, id]
    );
    return result.rows[0];
};

export const updateClienteServiceByid = async (nombre, cedula, email, telefono, direccion, id) => {
    const result = await pool.query(
        "UPDATE Clientes SET nombre = $1, cedula= $2, email = $3 , telefono = $4, direccion = $5 WHERE id= $6 RETURNING *",
        [nombre, cedula, email, telefono, direccion, id]
    );
    return result.rows[0];
};

export const updateNominaServiceByid = async (nombre, apellido, cedula, clave,id) => {
    const result = await pool.query(
        "UPDATE nomina SET nombre = $1, apellido= $2, cedula = $3 , clave = $4 WHERE id= $5 RETURNING *",
        [nombre, apellido,cedula, clave, id]
    );
    return result.rows[0];
};

// Eliminar registros
export const deletePescadoServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM pescados WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteIngresoPescadoServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM TiposPescado WHERE id=$1 RETURNING *", [id]);
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

export const deleteNominaServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Nomina WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteEmbarcacionServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM embarcaciones WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteTransaccionesServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Transacciones WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

// Consultas de transacciones
export const getMontoNetoService = async () => {
    const result = await pool.query(`
        SELECT 
            COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) - 
            COALESCE(SUM(CASE WHEN tipo = 'egreso' THEN monto ELSE 0 END), 0) AS monto_neto
        FROM transacciones
        WHERE fecha BETWEEN $1 AND $2
    `);
    return result.rows[0].monto_neto;
};

export const getTransaccionesEntreFechasService = async (fechaInicio, fechaFin) => {
    const result = await pool.query(
        "SELECT * FROM transacciones WHERE fecha BETWEEN $1 AND $2 ORDER BY fecha ASC", 
        [fechaInicio, fechaFin]
    );
    return result.rows;
};

export const getMontoTotalEntreFechasService = async (fechaInicio, fechaFin) => {
    const result = await pool.query(
        `SELECT 
            COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) - 
            COALESCE(SUM(CASE WHEN tipo = 'egreso' THEN monto ELSE 0 END), 0) AS monto_neto
        FROM transacciones
        WHERE fecha BETWEEN $1 AND $2`, 
        [fechaInicio, fechaFin]
    );
    
    if (result.rows.length === 0 || result.rows[0].monto_total === null) {
        return 0;
    }
    return parseFloat(result.rows[0].monto_neto);
};

export const getVentasYClientesEntreFechasService = async (fechaInicio, fechaFin) => {
    const result = await pool.query(
        `SELECT 
            COUNT(DISTINCT cedula_cliente) AS cantidad_clientes,
            COUNT(id) AS cantidad_ventas
        FROM transacciones
        WHERE tipo = 'ingreso'
        AND fecha BETWEEN $1 AND $2`, 
        [fechaInicio, fechaFin]
    );

    if (result.rows.length === 0) {
        return {
            cantidad_clientes: 0,
            cantidad_ventas: 0
        };
    }

    return {
        cantidad_clientes: result.rows[0].cantidad_clientes,
        cantidad_ventas: result.rows[0].cantidad_ventas
    };
};

export const getPescadoConMayoresIngresosEntreFechasService = async (fechaInicio, fechaFin) => {
        const result = await pool.query(
            `SELECT 
                t.codigo_pescado,
                p.pescado,
                SUM(t.monto) AS total_ingresos
            FROM transacciones t
            JOIN Pescados p ON t.codigo_pescado = p.codigo_pescado
            WHERE t.tipo = 'ingreso'
            AND t.fecha BETWEEN $1 AND $2
            GROUP BY t.codigo_pescado, p.pescado
            ORDER BY total_ingresos DESC
            LIMIT 5;`,  
            [fechaInicio, fechaFin]  
        );
    
        // Si no se encuentran resultados
        if (result.rows.length === 0) {
            return {
                message: "No se encontraron ingresos para ningún pescado en el rango de fechas proporcionado.",
                data: []
            };
        }
        console.log(result.rows)
        // Retornamos los resultados obtenidos
        return result.rows;
    };