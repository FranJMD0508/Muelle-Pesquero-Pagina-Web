import express from "express";
import { 
    // Pescados
    createpescado, 
    getAllPescados, 
    getPescadoById, 
    updatePescado, 
    deletePescado,

    // Herramientas
    createherramienta, 
    getAllHerramientas, 
    getHerramientaById, 
    updateherramienta, 
    deleteHerramienta,

    // Clientes
    createcliente, 
    getAllClientes, 
    getClienteById, 
    updateCliente, 
    deleteCliente,

    // Transacciones
    createtransacciones, 
    getAllTransacciones, 
    getTransaccionesByid, 
    getTransaccionesByRangoFecha, 
    getTransaccionesMontosByRangoFecha, 
    deleteTransaccion,

    // Monto Neto (si es necesario)
    getMontoNeto,
    getVentasYClientesEntreFechas,
    // Registro de pescado
    createResgistropescado,
    updateIngresoPescado,
    deleteIngresoPescado,
    // Empleados
    getAllNomina,
    getNominaById,
    createnomina,
    updateNomina,
    deleteNomina
} from "../controller/userController.js";

const router = express.Router();

// Rutas de Pescados
router.post("/ingreso/pescado",createResgistropescado)
router.put("/ingreso/pescado",updateIngresoPescado)
router.delete("/ingreso/pescado/:id",deleteIngresoPescado)
router.post("/pescados", createpescado);                // Crear pescado
router.get("/pescados", getAllPescados);                // Obtener todos los pescados
router.get("/pescados/:id", getPescadoById);            // Obtener pescado por ID
router.put("/pescados/:id", updatePescado);             // Actualizar pescado
router.delete("/pescados/:id", deletePescado);          // Eliminar pescado

// Rutas de Herramientas
router.post("/herramientas", createherramienta);        // Crear herramienta
router.get("/herramientas", getAllHerramientas);        // Obtener todas las herramientas
router.get("/herramientas/:id", getHerramientaById);    // Obtener herramienta por ID
router.put("/herramientas/:id", updateherramienta);     // Actualizar herramienta
router.delete("/herramientas/:id", deleteHerramienta);  // Eliminar herramienta

// Rutas de Clientes
router.post("/clientes", createcliente);                // Crear cliente
router.get("/clientes", getAllClientes);                // Obtener todos los clientes
router.get("/clientes/:id", getClienteById);            // Obtener cliente por ID
router.put("/clientes/:id", updateCliente);             // Actualizar cliente
router.delete("/clientes/:id", deleteCliente);          // Eliminar cliente

// Rutas de Transacciones
router.post("/transacciones", createtransacciones);       // Crear transacción
router.get("/transacciones", getAllTransacciones);      // Obtener todas las transacciones
router.get("/transacciones/rango", getTransaccionesByRangoFecha);  // Obtener transacciones por rango de fecha
router.get("/transacciones/clientes", getVentasYClientesEntreFechas)
router.get("/transacciones/:id", getTransaccionesByid); // Obtener transacción por ID
router.get("/transacciones/monto/rango", getTransaccionesMontosByRangoFecha);  // Obtener monto total por rango de fecha
router.delete("/transacciones/:id", deleteTransaccion); // Eliminar transacción

// Rutas de Empleados
router.get("/nomina",getAllNomina)
router.get("/nomina/:id",getNominaById)
router.post("/nomina",createnomina)
router.post("/nomina",updateNomina)
router.delete("/nomina",deleteNomina)

// Ruta para obtener el monto neto (si es necesario)
router.get("/monto/total", getMontoNeto);               // Obtener el monto neto

export default router;
