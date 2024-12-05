import express from "express";
import { 
    // Pescados
    createpescado, 
    getAllPescados, 
    getPescadoById, 
    updatePescado, 
    deletePescado,
    
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
    //Facturas
    getAllFacturasCompras,
    getAllFacturasVentas,
    createFacturaCompras,
    createFacturaVentas,
    deleteFacturaCompra,
    deleteFacturaVenta,

    // Monto Neto (si es necesario)
    getMontoNeto,
    getVentasYClientesEntreFechas,
    // Registro de pescado
    createInventariopescado,
    getAllInventarioPescados,
    getInventarioPescadoById,
    updateInventarioPescado,
    deleteInvetarioPescado,
    // Empleados
    getAllNomina,
    getNominaById,
    createnomina,
    updateNomina,
    deleteNomina,
    getAllEmbarcacion,
    getEmbarcacionsByid,
    createEmbarcacion,
    updateEmbarcacion,
    deleteEmbarcacion,
    //Inventario
    createInventario,
    getAllInventario,
    getInventarioById,
    deleteInventario,
    createSolicitudVenta,
    getAllSolicitudVentas,
    updateSolicitudVenta,
    deleteSolicitudVenta,
    getPescadoConMayoresIngresosEntreFechas,
    getClientesMasCocurridos,
    getSolicitudPescadoById,
    getAllMantenimiento,
    updateMantenimiento,
    createMantenimiento
} from "../controller/userController.js";
import { updateInventarioServiceByid } from "../models/userModel.js";

const router = express.Router();

// Rutas de Pescados
router.get("/inventario/pescado",getAllInventarioPescados)
router.post("/inventario/pescado",createInventariopescado)
router.get("/inventario/pescado/:id",getInventarioPescadoById)
router.put("/inventario/pescado/:id",updateInventarioPescado)
router.delete("/inventario/pescado/:id",deleteInvetarioPescado)
router.post("/pescados", createpescado);                // Crear pescado
router.get("/pescados", getAllPescados);                // Obtener todos los pescados
router.get("/pescados/:id", getPescadoById);            // Obtener pescado por ID
router.put("/pescados/:id", updatePescado);             // Actualizar pescado
router.delete("/pescados/:id", deletePescado);          // Eliminar pescado

// Rutas de Herramientas
router.post("/inventario", createInventario);        // Crear producto
router.get("/inventario", getAllInventario);        // Obtener todas las producto
router.get("/inventario/:id", getInventarioById);    // Obtener producto por ID
router.put("/inventario/:id", updateInventarioServiceByid);     // Actualizar producto
router.delete("/inventario/:id", deleteInventario);  // Eliminar producto

// Rutas de Clientes
router.post("/clientes", createcliente);                // Crear cliente
router.get("/clientes", getAllClientes);                // Obtener todos los clientes
router.get("/clientes/:id", getClienteById);            // Obtener cliente por ID
router.put("/clientes/:id", updateCliente);             // Actualizar cliente
router.delete("/clientes/:id", deleteCliente);          // Eliminar cliente
// Solicitudes

router.post("/solicitud", createSolicitudVenta);               
router.get("/solicitud", getAllSolicitudVentas);               
router.get("/solicitud/:id",getSolicitudPescadoById);            
router.put("/solicitud/:id", updateSolicitudVenta);             
router.delete("/solicitud/:id", deleteSolicitudVenta);

// Rutas de Transacciones
router.post("/transacciones", createtransacciones);       // Crear transacción
router.get("/transacciones", getAllTransacciones);      // Obtener todas las transacciones
router.get("/transacciones/masvendidos",getPescadoConMayoresIngresosEntreFechas)
router.get("/transacciones/rango", getTransaccionesByRangoFecha);  // Obtener transacciones por rango de fecha
router.get("/transacciones/clientes", getVentasYClientesEntreFechas)
router.get("/transacciones/concurrido",getClientesMasCocurridos)
router.get("/transacciones/:id", getTransaccionesByid); // Obtener transacción por ID
router.get("/transacciones/monto/rango", getTransaccionesMontosByRangoFecha);  // Obtener monto total por rango de fecha
router.delete("/transacciones/:id", deleteTransaccion); // Eliminar transacción


// Facturas
router.get("/factura/compras",getAllFacturasCompras)
router.get("/factura/ventas",getAllFacturasVentas)
router.post("/factura/compras",createFacturaCompras)
router.post("/factura/ventas",createFacturaVentas)
router.delete("/factura/compras",deleteFacturaCompra)
router.delete("/factura/ventas",deleteFacturaVenta)

// Rutas de Empleados
router.get("/nomina",getAllNomina)
router.get("/nomina/:id",getNominaById)
router.post("/nomina",createnomina)
router.post("/nomina/:id",updateNomina)
router.delete("/nomina/:id",deleteNomina)

// Rutas de Embarcacion
router.get("/Embarcacion",getAllEmbarcacion)
router.get("/embarcacion/:id",getEmbarcacionsByid)
router.post("/Embarcacion",createEmbarcacion)
router.put("/Embarcacion/:id",updateEmbarcacion)
router.delete("/Embarcacion/:id",deleteEmbarcacion)

//Mantenimiento 
router.get("/mantenimiento", getAllMantenimiento)
router.post("/mantenimiento", createMantenimiento)
router.put("/mantenimiento/:id", updateMantenimiento)
// Ruta para obtener el monto neto (si es necesario)
router.get("/monto/total", getMontoNeto);               // Obtener el monto neto

export default router;
