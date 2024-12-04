import pool from "../config/db.js";

export const createPescadoTable = async () => {
    const queryText = ` 
    CREATE TABLE IF NOT EXISTS pescados(
    id_pescado VARCHAR(20) PRIMARY KEY,  -- Identificador único para cada especie de pescado (ej. "ATUN")
    nombre VARCHAR(100) NOT NULL,        -- Nombre del pescado (ej. "Atún")
    precio DECIMAL(10, 2) NOT NULL       -- Precio por unidad o kilogramo del pescado
);`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};

export const createNominaTable = async () => {
    const queryText = ` 
    CREATE TABLE if not exists Nomina(
    id SERIAL PRIMARY KEY,             -- ID único para cada empleado (auto-incremental)
    nombre VARCHAR(100) NOT NULL,      -- Nombre completo del empleado
    apellido VARCHAR(100) NOT NULL,    -- Apellido del empleado
    cedula VARCHAR(20) UNIQUE NOT NULL, -- Cédula de identidad (única para cada empleado)
    clave VARCHAR(255) unique NOT NULL      -- Clave de acceso (puede ser una contraseña)
);
`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};


export const createEmbarcacionTable = async () => {
    const queryText = ` 
-- Crear la tabla solo si no existe
    CREATE TABLE IF NOT EXISTS embarcaciones (
    id_embarcacion VARCHAR(20) PRIMARY KEY,  -- Identificador único para la embarcación (ej. "EMB001")
    nombre VARCHAR(100) NOT NULL,            -- Nombre o descripción de la embarcación (ej. "Embarcación Pesquera 1")
    capacidad DECIMAL(10, 2) NOT NULL,       -- Capacidad de la embarcación (en toneladas o kg)
    tipo_embarcacion VARCHAR(50) NOT NULL,   -- Tipo de embarcación (ej. "Pesquera", "Recreativa", "Comercial")
    estado VARCHAR(50) NOT NULL              -- Estado de la embarcación (ej. "Operativa", "En mantenimiento")
);
`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};


export const createInventarioPescadoTable = async () => {
    const queryText = ` 
    CREATE TABLE IF NOT EXISTS inventario_pescado(
    id_pescado VARCHAR(20) REFERENCES pescados(id_pescado),  -- Relacionado con la tabla pescados
    nombre VARCHAR(100) NOT NULL,        -- Nombre del pescado (ej. "Atún")
    peso DECIMAL(10, 2) NOT NULL,        -- Peso total del lote de pescado (en kg)
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de ingreso al inventario
    fecha_caducidad TIMESTAMP NOT NULL,  -- Fecha de caducidad del pescado
    estado VARCHAR(50) NOT NULL,         -- Estado del pescado (ej. "nuevo", "en proceso", etc.)
    proceso VARCHAR(50) NOT NULL,        -- Proceso al que ha sido sometido el pescado (ej. "fresco", "congelado")
    id_embarcacion VARCHAR(20) REFERENCES embarcaciones(id_embarcacion),  -- Embarcación que trajo el lote
    PRIMARY KEY (id_pescado, fecha_ingreso)  -- Clave primaria compuesta: pescado y fecha de ingreso
);`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};



export const createInventarioTable = async () => {
    const queryText = `Create table if not exists inventario(
        codigo_producto VARCHAR(100) PRIMARY KEY,  -- Usamos codigo_producto como la clave primaria
        nombre_producto VARCHAR(100) NOT NULL,
        tipo_producto VARCHAR(50) NOT NULL,  -- Herramienta, Comida, Bebida, etc.
        cantidad INT NOT NULL DEFAULT 0,
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_tipo_producto FOREIGN KEY (tipo_producto) REFERENCES TiposProductos(tipo_producto)
    )`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};

export const createTipoProductos = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS TiposProductos (
    tipo_producto VARCHAR(50) PRIMARY KEY
);`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
}

export const createClienteTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS Clientes (
    id SERIAL PRIMARY KEY,               -- Identificador único de cliente (interno)
    nombre VARCHAR(100) NOT NULL,         -- Nombre del cliente
    cedula VARCHAR(100) UNIQUE NOT NULL,  -- Cédula del cliente (única, ya que cada cliente tiene una cédula única)
    email VARCHAR(100),                  -- Correo electrónico del cliente
    telefono VARCHAR(30),                -- Teléfono del cliente
    direccion TEXT                       -- Dirección del cliente
);`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};

export const createTransaccionesTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS transacciones (
    id SERIAL PRIMARY KEY,                 -- Identificador único de la transacción
    tipo VARCHAR(10) CHECK (tipo IN ('ingreso', 'egreso')),  -- Tipo de transacción (ingreso o egreso)
    monto NUMERIC(15, 2) NOT NULL,          -- Monto de la transacción
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora de la transacción
    descripcion TEXT,                      -- Descripción de la transacción
    codigo_pescado VARCHAR(100),           -- Código de pescado asociado
    nombre_cliente VARCHAR(100) NOT NULL,   -- Nombre del cliente que realiza la transacción
    cedula_cliente VARCHAR(100) NOT NULL,   -- Cédula del cliente que realiza la transacción
    email_cliente VARCHAR(100),             -- Correo electrónico del cliente
    telefono_cliente VARCHAR(30),           -- Teléfono del cliente
    direccion_cliente TEXT,                 -- Dirección del cliente
    CONSTRAINT fk_codigo_pescado FOREIGN KEY (codigo_pescado) REFERENCES TiposPescado(codigo_pescado),  -- Relación con la tabla pescados
    CONSTRAINT fk_cedula_cliente FOREIGN KEY (cedula_cliente) REFERENCES clientes(cedula)   -- Relación con la tabla clientes (cedula)
);
 `;
    try {
        await pool.query(queryText);
        console.log("Tabla transacciones creada correctamente.");
    } catch (e) {
        console.log("Error al crear la tabla transacciones: ", e);
    }
};

export const ingresarTiposProductos = async () => {

    const queryText = `
    -- Insertar los tipos de productos en la tabla TiposProductos
INSERT INTO TiposProductos (tipo_producto)
VALUES
    ('Comida'),
    ('Bebida'),
    ('Herramienta'),
    ('Material de Reparacion')
ON CONFLICT (tipo_producto) DO NOTHING;

    `;

    try {
            await pool.query(queryText);
        console.log("Tipos de productos ingresados o ya existen.");
    } catch (e) {
        console.log("Error al ingresar tipos de productos: ", e);
    }
};

export const createSolicitudVentasTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS solicitud_ventas (
        id SERIAL PRIMARY KEY,                     -- Identificador único de la solicitud
        nombre_cliente VARCHAR(100) NOT NULL,       -- Nombre del cliente
        cedula_cliente VARCHAR(100) NOT NULL,      -- Cédula del cliente (clave foránea)
        peso_pez DECIMAL(10, 2) NOT NULL,          -- Peso del pez en kg
        nombre_solicitud VARCHAR(255) NOT NULL,     -- Nombre o descripción de la solicitud
        estatus VARCHAR(50) CHECK (estatus IN ('Pendiente', 'Completada', 'Cancelada')) NOT NULL,  -- Estado de la solicitud
        fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de la solicitud
        CONSTRAINT fk_cedula_cliente FOREIGN KEY (cedula_cliente) REFERENCES Clientes(cedula)  -- Relación con la tabla Clientes
    );
    `;

    try {
        await pool.query(queryText);
        console.log("Tabla solicitud_ventas creada correctamente.");
    } catch (e) {
        console.log("Error al crear la tabla solicitud_ventas: ", e);
    }
};
