import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandling from "./middleware/errorHandler.js";
import {createPescadoTable, createInventarioTable, createClienteTable, createTransaccionesTable, createNominaTable, createEmbarcacionTable, createInventarioPescadoTable, createTipoProductos, ingresarTiposProductos, createSolicitudVentasTable} from "./data/createUserTable.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middleware

app.use(express.json())
app.use(cors())

//Rutas
app.use("/api", userRoutes);
//Manejo de Errores en el Middleware
app.use(errorHandling);
// Crear esta tabla antes de empezar el servidor
createInventarioTable();
createPescadoTable();
ingresarTiposProductos();
createSolicitudVentasTable();
createTipoProductos();
createInventarioPescadoTable();
createClienteTable();
createNominaTable();
createEmbarcacionTable();
// Probando la conexion con la base de datos
app.get("/", async(req,res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`EL nombre de la base de datos es: ${result.rows[0].current_database}`)
});

// Correr el Servidor
app.listen(port, () => {
    console.log(`El server Esta corriendo en el http:localhost:${port}`)
});