import pool from "../config/db.js";

// Obtener todos los registros
export const getAllPescadosService = async () => {
    const result = await pool.query("SELECT * FROM pescados");
    return result.rows;
};



export const getAllInventarioPescadosService = async () => {
    const result = await pool.query("SELECT * FROM inventario_pescado");
    return result.rows;
};

export const getAllClientesService = async () => {
    const result = await pool.query("SELECT * FROM Clientes");
    return result.rows;
};


export const getAllSolicitudVentasService = async () => {
    const result = await pool.query("SELECT * FROM solicitud_ventas");
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

export const getAllFacturasComprasService = async () => {
    const result = await pool.query("SELECT * FROM factura_compras");
    return result.rows;
};


export const getAllFacturasVentasService = async () => {
    const result = await pool.query("SELECT * FROM factura_ventas");
    return result.rows;
};

export const getAllInventarioService = async () => {
    const result = await pool.query("SELECT * FROM Inventario");
    return result.rows;
};

export const getAllEmbarcacionService = async () => {
    const result = await pool.query("SELECT * FROM Embarcaciones");
    return result.rows;
};

// Obtener un registro por ID
export const getPescadosServiceByid = async (id_pescado) => {
    const result = await pool.query("SELECT * FROM pescados where id_pescado = $1", [id_pescado]);
    return result.rows[0];
};

export const getInventarioPescadosServiceByid = async (id_pescado) => {
    const result = await pool.query("SELECT * FROM inventario_pescado where id_pescado = $1", [id_pescado]);
    return result.rows[0];
};

export const getInventarioServiceByid = async (codigo_producto) => {
    const result = await pool.query("SELECT * FROM inventario where codigo_producto = $1", [codigo_producto]);
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

export const getFacturaComprasServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM factura_compra where id = $1", [id]);
    return result.rows[0];
};



export const getFacturaVentasServiceByid = async (id) => {
    const result = await pool.query("SELECT * FROM factura_ventas where id = $1", [id]);
    return result.rows[0];
};

export const getEmbarcacionServiceByid = async (id_embarcacion) => {
    const result = await pool.query("SELECT * FROM embarcacion where id_embarcacion = $1", [id_embarcacion]);
    return result.rows[0];
};


// Crear registros
export const createPescadoService = async (id_pescado, nombre, precio) => {
    const result = await pool.query(
        "INSERT INTO pescados (id_pescado,nombre,precio) VALUES ($1,$2,$3) RETURNING *",
        [id_pescado,nombre,precio]
    );
    return result.rows[0];
};



export const createInvetarioPescadoService = async (id_pescado,id_lote,clasificacion, nombre,peso,fecha_ingreso, fecha_caducidad,estado,proceso,id_embarcacion) => {
    const result = await pool.query(
        "INSERT INTO inventario_pescado (id_pescado, id_lote,clasificacion,nombre,peso,fecha_ingreso, fecha_caducidad,estado,proceso,id_embarcacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
        [id_pescado, id_lote,clasificacion,nombre,peso,fecha_ingreso, fecha_caducidad,estado,proceso,id_embarcacion]
    );
    return result.rows[0];
};

export const createInventarioService = async (codigo_producto, nombre_producto, tipo_producto,cantidad) => {
    const result = await pool.query(
        "INSERT INTO inventario (codigo_producto, nombre_producto, tipo_producto,cantidad) VALUES ($1,$2,$3,$4) RETURNING *",
        [codigo_producto, nombre_producto, tipo_producto,cantidad]
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

export const createSolicitudVentaService = async (nombre_cliente, cedula_cliente, peso_pez, nombre_solicitud, estatus) => {
    const queryText = `
    INSERT INTO solicitud_ventas (nombre_cliente, cedula_cliente, peso_pez, nombre_solicitud, estatus)
    VALUES ($1, $2, $3, $4, $5);
    RETURNING * 
    `;
    
    try {
        await pool.query(queryText, [nombre_cliente, cedula_cliente, peso_pez, nombre_solicitud, estatus]);
        console.log("Solicitud de venta ingresada correctamente.");
    } catch (e) {
        console.log("Error al ingresar solicitud de venta: ", e);
    }
};


export const createNominaService = async (nombre, apellido, cedula, clave) => {
    const result = await pool.query(
        "INSERT INTO Nomina (nombre, apellido, cedula, clave) VALUES ($1,$2,$3,$4) RETURNING *",
        [nombre, apellido, cedula, clave]
    );
    return result.rows[0];
};

export const createEmbarcacionService = async (id_embarcacion,nombre,capacidad,tipo_embarcacion,estado) => {
    const result = await pool.query(
        "INSERT INTO embarcaciones (id_embarcacion,nombre,capacidad,tipo_embarcacion,estado) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [id_embarcacion,nombre,capacidad,tipo_embarcacion,estado]
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


export const createFacturaCompraService = async (
    nombre_cliente,
    cedula_rif,
    email,
    telefono,
    direccion,
    tipo_producto,
    descripcion_producto,
    cantidad,
    precio_unitario,
    total
) => {
    const result = await pool.query(
        `INSERT INTO factura_compras (
            nombre_cliente,
            cedula_rif,
            email,
            telefono,
            direccion,
            tipo_producto,
            descripcion_producto,
            cantidad,
            precio_unitario,
            total
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) 
        RETURNING *`,
        [
            nombre_cliente,
            cedula_rif,
            email,
            telefono,
            direccion,
            tipo_producto,
            descripcion_producto,
            cantidad,
            precio_unitario,
            total]
    );
    return result.rows[0];
};



export const createFacturaVentasService = async (
    numero_factura,
    codigo_pescado,
    cantidad,
    precio_unitario,
    total,
    nombre_cliente,
    cedula_cliente,
    email_cliente,
    telefono_cliente,
    direccion_cliente
) => {
    const result = await pool.query(
        `INSERT INTO factura_ventas (
            numero_factura,
            codigo_pescado,
            cantidad,
            precio_unitario,     
            total, 
            nombre_cliente,
            cedula_cliente,
            email_cliente,
            telefono_cliente,
            direccion_cliente
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) 
        RETURNING *`,
        [   numero_factura,
            codigo_pescado,
            cantidad,
            precio_unitario,
            total,
            nombre_cliente,
            cedula_cliente,
            email_cliente,
            telefono_cliente,
            direccion_cliente]
    );
    return result.rows[0];
};


// Actualizar registros
export const updatePescadoServiceByid = async (id_pescado, nombre, precio, id) => {
    const result = await pool.query(
        "UPDATE pescados SET id_pescado = $1, nombre = $2, precio = $3 WHERE id_pescado = $4 RETURNING *",
        [id_pescado, nombre, precio, id]
    );
    return result.rows[0];
};


export const updateInventarioPescadoServiceByid = async (clasificacion ,nombre, peso, fecha_ingreso, fecha_caducidad, estado, proceso, id_embarcacion,id_lote) => {
    const result = await pool.query(
        "UPDATE inventario_pescado SET clasificacion = $1, nombre = $2, peso = $3, fecha_ingreso = $4, fecha_caducidad = $5, estado = $6, proceso = $7, id_embarcacion = $8 WHERE id_lote = $9 RETURNING *",
        [clasificacion,nombre,peso, fecha_ingreso, fecha_caducidad, estado, proceso, id_embarcacion, id_lote]
    );
    return result.rows[0];
};


export const updateInventarioServiceByid = async (nombre_producto, tipo_producto,cantidad, codigo_producto) => {
    const result = await pool.query(
        "UPDATE inventario SET nombre = $1, tipo_producto = $2 , cantidad = $3 WHERE codigo_producto =$4 RETURNING *",
        [nombre_producto, tipo_producto,cantidad, codigo_producto]
    );
    return result.rows[0];
};

export const updateEmbarcacionServiceByid = async (nombre, capacidad, tipo_embarcacion, estado, id_embarcacion) => {
    const result = await pool.query(
        "UPDATE embarcaciones SET nombre = $1, capacidad = $2, tipo_embarcacion = $3, estado = $4 WHERE id_embarcacion = $5 RETURNING *",
        [nombre, capacidad, tipo_embarcacion, estado, id_embarcacion]
    );
    return result.rows[0];  // Retorna el registro actualizado
};


export const updateClienteServiceByid = async (nombre, cedula, email, telefono, direccion, id) => {
    const result = await pool.query(
        "UPDATE Clientes SET nombre = $1, cedula= $2, email = $3 , telefono = $4, direccion = $5 WHERE id= $6 RETURNING *",
        [nombre, cedula, email, telefono, direccion, id]
    );
    return result.rows[0];
};

export const updateSolicitudVentaService = async (id, nombre_cliente, cedula_cliente, peso_pez, nombre_solicitud, estatus) => {
    const queryText = `
    UPDATE solicitud_ventas
    SET
        nombre_cliente = $1,
        cedula_cliente = $2,
        peso_pez = $3,
        nombre_solicitud = $4,
        estatus = $5
    WHERE id = $6;
    RETURNING *
    `;
    
    try {
        await pool.query(queryText, [nombre_cliente, cedula_cliente, peso_pez, nombre_solicitud, estatus, id]);
        console.log("Solicitud de venta actualizada correctamente.");
    } catch (e) {
        console.log("Error al actualizar la solicitud de venta: ", e);
    }
};


export const updateNominaServiceByid = async (nombre, apellido, cedula, clave,id) => {
    const result = await pool.query(
        "UPDATE nomina SET nombre = $1, apellido= $2, cedula = $3 , clave = $4 WHERE id= $5 RETURNING *",
        [nombre, apellido,cedula, clave, id]
    );
    return result.rows[0];
};

// Eliminar registros
export const deletePescadoServiceByid = async (id_pescado) => {
    const result = await pool.query(
        "DELETE FROM pescados WHERE id_pescado = $1 RETURNING *",
        [id_pescado]
    );
    return result.rows[0];
};

export const deleteInventarioPescadoServiceByid = async (id_lote) => {
    const result = await pool.query(
        "DELETE FROM inventario_pescado WHERE id_lote = $1 RETURNING *",
        [id_lote]
    );
    return result.rows[0];  
};


export const deleteInventarioServiceByid = async (codigo_producto) => {
    const result = await pool.query("DELETE FROM inventario WHERE codigo_producto =$1 RETURNING *", [codigo_producto]);
    return result.rows[0];
};

export const deleteClienteServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Clientes WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteSolicitudVentaService = async (id) => {
    const queryText = `
    DELETE FROM solicitud_ventas
    WHERE id = $1;
    RETURNING *
    `;
    
    try {
        await pool.query(queryText, [id]);
        console.log("Solicitud de venta eliminada correctamente.");
    } catch (e) {
        console.log("Error al eliminar la solicitud de venta: ", e);
    }
};

export const getSolicitudVentaByIdService = async (id) => {
    const queryText = `
    SELECT * FROM solicitud_ventas
    WHERE id = $1;
    `;
    
    try {
        const result = await pool.query(queryText, [id]);
        
        if (result.rows.length > 0) {
            return result.rows[0];  // Devuelve el primer resultado encontrado
        } else {
            console.log("No se encontró ninguna solicitud de venta con ese ID.");
            return null;  // Si no se encuentra el registro, retorna null
        }
    } catch (e) {
        console.log("Error al buscar la solicitud de venta: ", e);
        throw e;  // Lanzamos el error para que el consumidor de esta función pueda manejarlo
    }
};

export const deleteNominaServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Nomina WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteEmbarcacionServiceByid = async (id_embarcacion) => {
    const result = await pool.query("DELETE FROM embarcaciones WHERE id_embarcacion=$1 RETURNING *", [id_embarcacion]);
    return result.rows[0];
};

export const deleteTransaccionesServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM Transacciones WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};

export const deleteFacturaComprasServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM factura_compras WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
};



export const deleteFacturaVentasServiceByid = async (id) => {
    const result = await pool.query("DELETE FROM factura_ventas WHERE id=$1 RETURNING *", [id]);
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
        `
    SELECT 
    COUNT(DISTINCT cedula_cliente) AS cantidad_clientes,  -- Cuenta la cantidad de clientes únicos
    COUNT(id) AS cantidad_ventas  -- Cuenta la cantidad de ventas
    FROM factura_ventas
    WHERE fecha BETWEEN $1 AND $2;  -- Rango de fechas
`, 
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
    f.codigo_pescado, 
    p.nombre, 
    SUM(f.total) AS total_ventas
    FROM 
    factura_ventas f
    JOIN 
    pescados p ON f.codigo_pescado = p.id_pescado
    WHERE
    f.fecha BETWEEN $1 AND $2  -- Rango de fechas dinámico
    GROUP BY 
    f.codigo_pescado, p.nombre
    ORDER BY 
    total_ventas DESC
    LIMIT 5;
`,  
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

export const getClientesMasConcurridosService = async (fechaInicio, fechaFin) => {
    const result = await pool.query(
        `
        SELECT 
    nombre_cliente,
    cedula_cliente,
    COUNT(*) AS cantidad_compras
    FROM 
    factura_ventas
    WHERE 
    fecha BETWEEN $1 AND $2  
    GROUP BY 
    cedula_cliente, nombre_cliente
    ORDER BY 
    cantidad_compras desc
    LIMIT 5;
`,  
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

