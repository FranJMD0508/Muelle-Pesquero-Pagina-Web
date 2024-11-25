// Respuesta Estandarizadas de las funciones
import { 
    createClienteService,
    createHerramientaService, 
    createPescadoService, 
    createTransaccionesService, 
    deleteClienteServiceByid, 
    deleteHerramientaServiceByid, 
    deletePescadoServiceByid, 
    deleteTransaccionesServiceByid, 
    getAllClientesService, 
    getAllHerramientasService, 
    getAllPescadosService, 
    getAllTransaccionesService, 
    getClienteServiceByid, 
    getHerramientasServiceByid, 
    getMontoNetoService, 
    getMontoTotalEntreFechasService, 
    getPescadosServiceByid, 
    updateClienteServiceByid, 
    updateHerramientaServiceByid, 
    updatePescadoServiceByid,
    getTransaccionesEntreFechasService,
    getTransaccionesServiceByid } from "../models/userModel.js";

const handleResponse = (res,status,message,data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createpescado = async (req, res, next) => {
    const { codigo_pescado, pescado, peso_pescado } = req.body;

    // Convertir peso_pescado a un número entero
    const pesoPescadoInt = parseFloat(peso_pescado);

    // Verificar si la conversión fue exitosa
    if (isNaN(pesoPescadoInt)) {
        return res.status(400).json({ message: "El peso del pescado debe ser un número entero válido." });
    }

    try {
        const newPescado = await createPescadoService(codigo_pescado, pescado, pesoPescadoInt);
        handleResponse(res, 201, "Pescado Creado Con Éxito", newPescado);
    } catch (e) {
        next(e);
    }
};


export const createherramienta = async (req, res, next) => {
    const { codigo_herramienta, herramienta, cantidad_herramienta } = req.body;

    // Convertir cantidad_herramienta a un número entero
    const cantidadHerramientaInt = parseInt(cantidad_herramienta, 10);

    // Verificar si la conversión fue exitosa
    if (isNaN(cantidadHerramientaInt)) {
        return res.status(400).json({ message: "La cantidad de la herramienta debe ser un número entero válido." });
    }

    try {
        const newHerramienta = await createHerramientaService(codigo_herramienta, herramienta, cantidadHerramientaInt);
        handleResponse(res, 201, "Herramienta Creada Con Éxito", newHerramienta);
    } catch (e) {
        next(e);
    }
};

export const createcliente = async (req, res, next) => {
    const { nombre,cedula,email,telefono,direccion } = req.body;
    try {
        const newCliente = await createClienteService(nombre,cedula,email,telefono,direccion);
        handleResponse(res, 201, "Cliente Creado Con Éxito", newCliente);
    } catch (e) {
        next(e);
    }
};

export const createtransacciones = async (req, res, next) => {
    const { tipo,monto,descripcion } = req.body;
        // Validación de parámetros (opcional pero recomendable)
    if (!tipo || !monto) {
            return handleResponse(res,404,"Faltan datos requeridos: Tipo, Monto")
        }
    try {
        const transaccion = await createTransaccionesService(tipo,monto,descripcion);
        handleResponse(res, 201, "Transaccion Creada Con Éxito", transaccion);
    } catch (e) {
        next(e);
    }
};


export const getAllPescados = async (req,res,next) => {
    try{
        const Pescados = await getAllPescadosService();
        handleResponse(res,200,"Pescados Mostrados con Exito", Pescados);
    }
    catch(e){
        next(e);
    };
};


export const getAllHerramientas = async (req,res,next) => {
    try{
        const herramientas = await getAllHerramientasService();
        handleResponse(res,200,"Herramientas Mostrados con Exito", herramientas);
    }
    catch(e){
        next(e);
    };
};

export const getAllClientes = async (req,res,next) => {
    try{
        const clientes = await getAllClientesService();
        handleResponse(res,200,"Clientes Mostrados con Exito", clientes);
    }
    catch(e){
        next(e);
    };
};


export const getAllTransacciones = async (req,res,next) => {
    try{
        const transacciones = await getAllTransaccionesService();
        handleResponse(res,200,"Transacciones Mostradas con Exito", transacciones);
    }
    catch(e){
        next(e);
    };
};


export const getMontoNeto = async(req,res,next) => {
    try {
        const monto_neto = await getMontoNetoService();
        handleResponse(res,200,"Obteniendo el Monto Neto",monto_neto)
    } catch (e) {
        next(e)
    };
    
    };
    
    export const getTransaccionesByRangoFecha = async (req, res, next) => {
        const { fechaInicio, fechaFin } = req.body;
    
        // Validación simple de fechas (puedes agregar validaciones más estrictas)
        if (!fechaInicio || !fechaFin) {
            return handleResponse(res,400,"Ambas Fechas Son Requeridas ");
        }
        try {
            const transacciones = await getTransaccionesEntreFechasService(fechaInicio, fechaFin);
            handleResponse(res, 200, "Transacciones obtenidas con éxito", transacciones);
        } catch (e) {
            next(e);
        }
    };

    export const getTransaccionesByid = async (req, res, next) => {
        try {
            const transacciones = await getTransaccionesServiceByid(req.params.id);
            handleResponse(res, 200, "Transaccion obtenida con éxito", transacciones);
        } catch (e) {
            next(e);
        }
    };

    

    

    export const getTransaccionesMontosByRangoFecha = async (req, res, next) => {
        const { fechaInicio, fechaFin } = req.body;
    
        // Validación simple de fechas (puedes agregar validaciones más estrictas)
        if (!fechaInicio || !fechaFin) {
            return handleResponse(res,400,"Ambas Fechas Son Requeridas ");
        }
        try {
            const transacciones = await getMontoTotalEntreFechasService(fechaInicio, fechaFin);
            handleResponse(res, 200, "Transacciones obtenidas con éxito", transacciones);
        } catch (e) {
            next(e);
        }
    };

export const getPescadoById = async (req,res,next) => {
    try{
        const Pescado = await getPescadosServiceByid(req.params.id);
        if(!Pescado) return handleResponse(res,404,"Pescado no encontrado");
        handleResponse(res,200,"Pescado Encontrado Con exito",Pescado);
    }
    catch(e){
        next(e);
    };
};

export const getClienteById = async (req,res,next) => {
    try{
        const Cliente = await getClienteServiceByid(req.params.id);
        if(!Cliente) return handleResponse(res,404,"Cliente no encontrado");
        handleResponse(res,200,"Cliente Encontrado Con exito",Cliente);
    }
    catch(e){
        next(e);
    };
};

export const getHerramientaById = async (req,res,next) => {
    try{
        const herramienta = await getHerramientasServiceByid(req.params.id);
        if(!herramienta) return handleResponse(res,404,"Herramienta no encontrado");
        handleResponse(res,200,"Herramienta Encontrado Con exito",herramienta);
    }
    catch(e){
        next(e);
    };
};


export const updatePescado = async (req,res,next) => {
    const {codigo_pescado,pescado,peso_pescado} = req.body
    try{
        const updatePescado = await updatePescadoServiceByid(codigo_pescado,pescado,peso_pescado,req.params.id);
        if(!updatePescado) return handleResponse(res,404,"Pescado no encontrado");
        handleResponse(res,200,"Pescado Actualizado Con exito",updatePescado)
    }
    catch(e){
        next(e);
    };
};

export const updateCliente = async (req,res,next) => {
    const {nombre,cedula,email,telefono,direccion} = req.body
    try{
        const updatePescado = await updateClienteServiceByid(nombre,cedula,email,telefono,direccion,req.params.id);
        if(!updatePescado) return handleResponse(res,404,"Cliente no encontrado");
        handleResponse(res,200,"Cliente Actualizado Con exito",updatePescado)
    }
    catch(e){
        next(e);
    };
};

export const updateherramienta = async (req,res,next) => {
    const {codigo_herramienta,herramienta,cantidad_herramienta} = req.body
    try{
        const updateherramienta = await updateHerramientaServiceByid(codigo_herramienta,herramienta,cantidad_herramienta,req.params.id);
        if(!updateherramienta) return handleResponse(res,404,"Herramienta no encontrado");
        handleResponse(res,200,"Herramienta Actualizado Con exito",updateherramienta)
    }
    catch(e){
        next(e);
    };
};

export const deletePescado = async (req,res,next) => {
    try{
        const deletePescado = await deletePescadoServiceByid(req.params.id);
        if(!deletePescado) return handleResponse(res,404,"Pescado no encontrado");
        handleResponse(res,200,"Pescado Eliminado Con exito",deletePescado)
    }
    catch(e){
        next(e);
    };
};

export const deleteHerramienta = async (req,res,next) => {
    try{
        const deleteHerramienta = await deleteHerramientaServiceByid(req.params.id);
        if(!deleteHerramienta) return handleResponse(res,404,"Herramienta no encontrada");
        handleResponse(res,200,"Herramienta Eliminada Con exito",deleteHerramienta)
    }
    catch(e){
        next(e);
    };
};

export const deleteCliente = async (req,res,next) => {
    try{
        const deletecliente = await deleteClienteServiceByid(req.params.id);
        if(!deletecliente) return handleResponse(res,404,"Cliente no encontrado");
        handleResponse(res,200,"Cliente Eliminado Con exito",deletecliente)
    }
    catch(e){
        next(e);
    };
};

export const deleteTransaccion = async (req,res,next) => {
    try{
        const deletetransaccion = await deleteTransaccionesServiceByid(req.params.id);
        if(!deletetransaccion) return handleResponse(res,404,"Transaccion no encontrada");
        handleResponse(res,200,"Transaacion Eliminada Con exito",deletetransaccion)
    }
    catch(e){
        next(e);
    };
};
