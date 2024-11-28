import pool from "../config/db.js";

export const createPescadoTable = async () => {
    const queryText = ` 
    CREATE TABLE IF NOT EXISTS Pescados(
    id serial PRIMARY KEY,
    codigo_pescado varchar(100) NOT NULL,     -- Clave foránea que hace referencia a TiposPescado
    pescado varchar(100) not null,
    cantidad_pescado float NOT NULL DEFAULT 0,  -- Peso del pescado ingresado
    fecha_entrada DATE,                       -- Fecha de entrada
    fecha_caducidad DATE,                        -- Fecha de salida
    CONSTRAINT fk_codigo_pescado FOREIGN KEY (codigo_pescado)
        REFERENCES TiposPescado(codigo_pescado)
        ON DELETE CASCADE  -- Opcional: Elimina los registros en IngresoPescado cuando se elimina un tipo de pescado
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
    -- Crear el tipo ENUM si no existe previamente
    DO $$ BEGIN
    CREATE TYPE estado_embarcacion AS ENUM ('Operando', 'Inactivo');
    EXCEPTION
    WHEN duplicate_object THEN NULL; -- Si el tipo ya existe, no hacer nada
    END $$;

-- Crear la tabla solo si no existe
    CREATE TABLE IF NOT EXISTS embarcaciones (
    id SERIAL PRIMARY KEY,               -- Identificador único para cada embarcación
    cantidad_barco int default 0,
    tipo_embarcacion VARCHAR(100),       -- Nombre o tipo de la embarcación
    estado estado_embarcacion not null,           -- Estado de la embarcación (Operando/Inactivo)
    capacidad_carga_max FLOAT           -- Capacidad máxima de carga (en toneladas)
);
`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};


export const createResgistroPescadoTable = async () => {
    const queryText = ` 
    CREATE TABLE IF NOT EXISTS TiposPescado(
    codigo_pescado varchar(100) PRIMARY KEY,  -- Código único para cada tipo de pescado
    pescado varchar(100) NOT NULL,            -- Tipo de pescado
    descripcion text         -- Descripción opcional
);`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};



export const createHerramientaTable = async () => {
    const queryText = `Create table if not exists Herramientas(
    id serial primary key,
    codigo_herramienta varchar(100) unique not null,
    herramienta varchar(100)  not null,
    cantidad_herramienta int not null default 0
)`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};

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

//Crear el trigger para las base de datos

export const createFunction = async () => {
    const queryText = `
    CREATE OR REPLACE FUNCTION insertar_o_actualizar_cliente()
    	RETURNS TRIGGER AS $$
    BEGIN
    -- Verifica si el cliente ya existe en la tabla 'clientes' por su cédula
    IF NOT EXISTS (SELECT 1 FROM clientes WHERE cedula = NEW.cedula_cliente) THEN
        -- Si no existe, inserta un nuevo cliente en la tabla 'clientes'
        INSERT INTO clientes (nombre, cedula, email, telefono, direccion)
        VALUES (NEW.nombre_cliente, NEW.cedula_cliente, NEW.email_cliente, NEW.telefono_cliente, NEW.direccion_cliente);
    ELSE
        -- Si ya existe, actualiza la información del cliente
        UPDATE clientes 
        SET nombre = NEW.nombre_cliente,
            email = NEW.email_cliente,
            telefono = NEW.telefono_cliente,
            direccion = NEW.direccion_cliente
        WHERE cedula = NEW.cedula_cliente;
    END IF;
    -- Devuelve el nuevo registro de la transacción
    RETURN NEW;
    END;
$$ LANGUAGE plpgsql;
    `;
  
    try {
      await pool.query(queryText);  // Ejecuta la función en la base de datos
      console.log("Función 'insertar_o_actualizar_cliente' creada correctamente.");
    } catch (e) {
      console.log("Error al crear la función: ", e);
    }
  };

  export const createTrigger = async () => {
    // Consulta para verificar si el trigger ya existe
    const checkTriggerQuery = `
      SELECT 1
      FROM pg_trigger t
      JOIN pg_class c ON c.oid = t.tgrelid
      WHERE c.relname = 'transacciones' 
      AND t.tgname = 'trigger_insertar_cliente';
    `;
  
    try {
      // Verificamos si el trigger ya existe
      const result = await pool.query(checkTriggerQuery);
  
      // Si el trigger no existe, lo creamos
      if (result.rowCount === 0) {
        const createTriggerQuery = `
        CREATE TRIGGER trigger_insertar_cliente
    AFTER INSERT ON transacciones
    FOR EACH ROW
    EXECUTE FUNCTION insertar_o_actualizar_cliente();
        `;
        
        // Ejecutamos la consulta para crear el trigger
        await pool.query(createTriggerQuery);
        console.log("Trigger creado exitosamente.");
      } else {
        console.log("El trigger ya existe, no se creó.");
      }
    } catch (err) {
      console.error("Error al crear el trigger:", err);
    }
  };