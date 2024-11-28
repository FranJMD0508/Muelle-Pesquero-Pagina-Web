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
    getTransaccionesServiceByid, 
    getVentasYClientesEntreFechasService,
    createIngresoPescadoService,
    deleteIngresoPescadoServiceByid,
    createNominaService,
    getAllNominaService,
    getNominaServiceByid,
    deleteNominaServiceByid,
    updateNominaServiceByid,
    createEmbarcacionService,
    getAllEmbarcacionService,
    getEmbarcacionServiceByid,
    updateEmbarcacionServiceByid,
    deleteEmbarcacionServiceByid,
    getAllRegistroPescadosService,
    getPescadoConMayoresIngresosEntreFechasService} from "../models/userModel.js";

const handleResponse = (res,status,message,data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createpescado = async (req, res, next) => {
    const { codigo_pescado, pescado,cantidad_pescado,fecha_entrada,fecha_caducidad } = req.body;

    // Convertir peso_pescado a un número entero
    const pesoPescadoInt = parseFloat(cantidad_pescado);
    isValidDate(fecha_entrada);
    isValidDate(fecha_caducidad);
    // Verificar si la conversión fue exitosa
    if (isNaN(pesoPescadoInt)) {
        return res.status(400).json({ message: "El peso del pescado debe ser un número entero válido." });
    }

    try {
        const newPescado = await createPescadoService(codigo_pescado, pescado, pesoPescadoInt,fecha_entrada,fecha_caducidad);
        handleResponse(res, 201, "Pescado Creado Con Éxito", newPescado);
    } catch (e) {
        next(e);
    }
};

export const createResgistropescado = async (req, res, next) => {
    const { codigo_pescado, pescado, descripcion } = req.body;
    try {
        const newPescado = await createIngresoPescadoService(codigo_pescado, pescado, descripcion);
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


export const createEmbarcacion = async (req, res, next) => {
    const { cantidad_barco,tipo_embarcacion,estado,capacidad_carga_max} = req.body;
    const cantidad_de_barco = parseInt(cantidad_barco);
    const capacidad_carga = parseFloat(capacidad_carga_max);
    try {
        const newEmbarcacion = await createEmbarcacionService(cantidad_de_barco,tipo_embarcacion,estado,capacidad_carga);
        handleResponse(res, 201, "Embarcacion Creada Con Éxito", newEmbarcacion);
    } catch (e) {
        next(e);
    }
};

export const createnomina = async (req, res, next) => {
    const { nombre,apellido,cedula,clave} = req.body;
    try {
        const newEmpleado = await createNominaService(nombre,apellido,cedula,clave);
        handleResponse(res, 201, "Empleado Creado Con Éxito", newEmpleado);
    } catch (e) {
        next(e);
    }
};




export const createtransacciones = async (req, res, next) => {
    const {     tipo, 
        monto, 
        descripcion, 
        codigo_pescado, 
        nombre_cliente, 
        cedula_cliente, 
        email_cliente, 
        telefono_cliente, 
        direccion_cliente} = req.body;
        // Validación de parámetros (opcional pero recomendable)
    if (!tipo || !monto) {
            return handleResponse(res,404,"Faltan datos requeridos: Tipo, Monto")
        }
    try {
        const transaccion = await createTransaccionesService(    
            tipo, 
            monto, 
            descripcion, 
            codigo_pescado, 
            nombre_cliente, 
            cedula_cliente, 
            email_cliente, 
            telefono_cliente, 
            direccion_cliente);
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

export const getAllResgistroPescados = async (req,res,next) => {
    try{
        const Pescados = await getAllRegistroPescadosService();
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


export const getAllEmbarcacion = async (req,res,next) => {
    try{
        const embarcaciones = await getAllEmbarcacionService();
        handleResponse(res,200,"Embarcaciones Mostradas con Exito", embarcaciones);
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

export const getAllNomina = async (req,res,next) => {
    try{
        const clientes = await getAllNominaService();
        handleResponse(res,200,"Empleados Mostrados con Exito", clientes);
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
    
    const isValidDate = (date) => {
        // Verifica si la fecha es válida para el formato TIMESTAMP (YYYY-MM-DD HH:MM:SS)
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    };
    
    export const getTransaccionesByRangoFecha = async (req, res, next) => {
        const { fechaInicio, fechaFin } = req.query;
    
        if (!fechaInicio || !fechaFin) {
            return handleResponse(res, 400, "Ambas Fechas Son Requeridas");
        }
    
        // Verificar si las fechas son válidas
        if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
            return handleResponse(res, 400, "Las fechas deben estar en un formato válido.");
        }
    
        try {
            const transacciones = await getTransaccionesEntreFechasService(fechaInicio, fechaFin);
            handleResponse(res, 200, "Transacciones obtenidas con éxito", transacciones);
        } catch (e) {
            return handleResponse(res, 500, "Algo salió mal",  "Huevon" );
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

    export const getEmbarcacionsByid = async (req, res, next) => {
        try {
            const embarcacion = await getEmbarcacionServiceByid(req.params.id);
            handleResponse(res, 200, "Embarcacion obtenida con éxito", embarcacion);
        } catch (e) {
            next(e);
        }
    };

    

    export const getTransaccionesMontosByRangoFecha = async (req, res, next) => {
        const { fechaInicio, fechaFin } = req.query;
    
        // Validación simple de fechas
        if (!fechaInicio || !fechaFin) {
            return handleResponse(res, 400, "Ambas Fechas Son Requeridas");
        }
    
        // Verificar que las fechas sean válidas
        const isValidDate = (date) => !isNaN(Date.parse(date)); // Usamos Date.parse() para verificar fechas válidas
    
        if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
            return handleResponse(res, 400, "Las fechas deben estar en un formato válido.");
        }
    
        try {
            // Obtener el monto total entre las fechas
            const montoTotal = await getMontoTotalEntreFechasService(fechaInicio, fechaFin);
    
            if (montoTotal === 0) {
                return handleResponse(res, 200, "No se encontraron transacciones en el rango de fechas proporcionado.", { montoTotal });
            }
    
            // Devolver el monto total dentro de un objeto de respuesta
            handleResponse(res, 200, "Monto total obtenido con éxito", { montoTotal });
    
        } catch (e) {
            console.error("Error al obtener el monto total:", e.message);
            return handleResponse(res, 500, "Algo salió mal", { error: e.message });
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

export const getNominaById = async (req,res,next) => {
    try{
        const Empleado = await getNominaServiceByid(req.params.id);
        if(!Empleado) return handleResponse(res,404,"Empleado no encontrado");
        handleResponse(res,200,"Empleado Encontrado Con exito",Empleado);
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
    const {codigo_pescado,pescado,peso_pescado,fecha_entrada,fecha_caducidad} = req.body
    isValidDate(fecha_entrada);
    isValidDate(fecha_caducidad);
    try{
        const updatePescado = await updatePescadoServiceByid(codigo_pescado,pescado,peso_pescado,fecha_entrada,fecha_caducidad,req.params.id);
        if(!updatePescado) return handleResponse(res,404,"Pescado no encontrado");
        handleResponse(res,200,"Pescado Actualizado Con exito",updatePescado)
    }
    catch(e){
        next(e);
    };
};


export const updateIngresoPescado = async (req,res,next) => {
    const {codigo_pescado,pescado,descripcion} = req.body
    try{
        const updatePescado = await updateIngresoPescadoServiceByid(codigo_pescado,pescado,descripcion,req.params.id);
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

export const updateNomina = async (req,res,next) => {
    const {nombre,apellido,cedula,clave} = req.body
    try{
        const updateNomina = await updateNominaServiceByid(nombre,apellido,cedula,clave,req.params.id);
        if(!updateNomina) return handleResponse(res,404,"Nomina no encontrado");
        handleResponse(res,200,"Nomina Actualizado Con exito",updateNomina)
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
        handleResponse(res,200,"Herramienta Actualizada Con exito",updateherramienta)
    }
    catch(e){
        next(e);
    };
};

export const updateEmbarcacion = async (req,res,next) => {
    const {cantidad_barco,tipo_embarcacion,estado_embarcacion,capacidad_carga_max} = req.body
    const cantidad_de_barco = parseInt(cantidad_barco);
    const capacidad_carga = parseFloat(capacidad_carga_max);
    try{
        const updateEmbarcacion = await updateEmbarcacionServiceByid(cantidad_de_barco,capacidad_carga,estado_embarcacion,req.params.id);
        if(!updateEmbarcacion) return handleResponse(res,404,"Embarcacion no encontrada");
        handleResponse(res,200,"Embarcacion Actualizada Con exito",updateEmbarcacion)
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

export const deleteIngresoPescado = async (req,res,next) => {
    try{
        const deletePescado = await deleteIngresoPescadoServiceByid(req.params.id);
        if(!deletePescado) return handleResponse(res,404,"Pescado no encontrado");
        handleResponse(res,200,"Pescado Eliminado Con exito",deletePescado)
    }
    catch(e){
        next(e);
    };
};


export const deleteEmbarcacion = async (req,res,next) => {
    try{
        const deleteEmbarcacion = await deleteEmbarcacionServiceByid(req.params.id);
        if(!deleteEmbarcacion) return handleResponse(res,404,"Embarcacion no encontrada");
        handleResponse(res,200,"Embarcacion Eliminada Con exito",deleteEmbarcacion)
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

export const deleteNomina = async (req,res,next) => {
    try{
        const deleteNomina = await deleteNominaServiceByid(req.params.id);
        if(!deleteNomina) return handleResponse(res,404,"Empleado no encontrado");
        handleResponse(res,200,"Empleado Eliminado Con exito",deleteNomina)
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

export const getVentasYClientesEntreFechas = async(req,res,next) => {
    const { fechaInicio, fechaFin } = req.query;
    
    // Validación simple de fechas
    if (!fechaInicio || !fechaFin) {
        return handleResponse(res, 400, "Ambas Fechas Son Requeridas");
    }
    
    if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
        return handleResponse(res, 400, "Las fechas deben estar en un formato válido.");
    }

    try {
        // Obtener el monto total entre las fechas
        const ventasYclientes = await getVentasYClientesEntreFechasService(fechaInicio, fechaFin);

        if (ventasYclientes === 0) {
            return handleResponse(res, 200, "No se encontraron transacciones en el rango de fechas proporcionado.", { ventasYclientes });
        }

        // Devolver el monto total dentro de un objeto de respuesta
        handleResponse(res, 200, "Ventas y Clientes obtenidos con éxito", { ventasYclientes });

    } catch (e) {
        next(e)
        
    }  
};

export const getPescadoConMayoresIngresosEntreFechas = async (req, res, next) => {
           const { fechaInicio, fechaFin } = req.query;
    
        // Validación simple de fechas
        if (!fechaInicio || !fechaFin) {
            return handleResponse(res, 400, "Ambas Fechas Son Requeridas");
        }
    
        // Verificar que las fechas sean válidas
        const isValidDate = (date) => !isNaN(Date.parse(date)); // Usamos Date.parse() para verificar fechas válidas
    
        if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
            return handleResponse(res, 400, "Las fechas deben estar en un formato válido.");
        }
    
        try {
            // Llamar al servicio que consulta la base de datos
            const result = await getPescadoConMayoresIngresosEntreFechasService(fechaInicio, fechaFin);
    
            // Verificar que la respuesta no esté vacía o sea undefined
            if (!result || result.length === 0) {
                return handleResponse(res, 200, "No se encontraron transacciones en el rango de fechas proporcionado.");
            }
    
            // Devolver la respuesta con los datos obtenidos
            handleResponse(res, 200, "Ventas y Clientes obtenidos con éxito", { ventasYclientes: result });
            
        } catch (e) {
            next(e);
        }
    };