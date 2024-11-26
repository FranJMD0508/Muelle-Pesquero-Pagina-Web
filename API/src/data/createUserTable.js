import pool from "../config/db.js";

export const createPescadoTable = async () => {
    const queryText = `Create table if not exists Pescados(
    id serial primary key,
    codigo_pescado varchar(100) unique not null,
    pescado varchar(100)  not null,
    peso_pescado float not null default 0
)`;
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
    const queryText = `Create table if not exists Clientes(
    id serial primary key,
    nombre varchar(100) not null,
    cedula varchar(100) unique not null,
    email varchar(100),
    telefono varchar(30),
    direccion text
)`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};

export const createTransaccionesTable = async () => {
    const queryText = `CREATE TABLE if not exists transacciones(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(10) CHECK (tipo IN ('ingreso', 'egreso')),  
    monto NUMERIC(15, 2) NOT NULL,   
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    descripcion TEXT
);`;
try{
    pool.query(queryText);
    //console.log("Tabla Creada si no existe");
}catch(e){
    console.log("Error al crear la tabla: ",e);
};
};