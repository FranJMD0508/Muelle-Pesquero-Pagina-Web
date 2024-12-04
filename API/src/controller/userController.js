// Respuesta Estandarizadas de las funciones
import { 
    createClienteService,
    createInvetarioPescadoService, 
    createPescadoService, 
    createTransaccionesService, 
    deleteClienteServiceByid, 
    deletePescadoServiceByid, 
    deleteTransaccionesServiceByid, 
    getAllClientesService, 
    getAllPescadosService, 
    getAllTransaccionesService, 
    getClienteServiceByid,  
    getMontoNetoService, 
    getMontoTotalEntreFechasService, 
    getPescadosServiceByid, 
    updateClienteServiceByid, 
    updatePescadoServiceByid,
    getTransaccionesEntreFechasService,
    getTransaccionesServiceByid, 
    getVentasYClientesEntreFechasService,
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
    getAllInventarioPescadosService,
    getInventarioPescadosServiceByid,
    updateInventarioPescadoServiceByid,
    deleteInventarioPescadoServiceByid,
    createInventarioService,
    getAllInventarioService,
    getInventarioServiceByid,
    updateInventarioServiceByid,
    deleteInventarioServiceByid,
    createSolicitudVentaService,
    updateSolicitudVentaService,
    deleteSolicitudVentaService,
    getAllFacturasVentasService,
    getAllFacturasComprasService,
    createFacturaCompraService,
    createFacturaVentasService,
    deleteFacturaVentasServiceByid,
    getPescadoConMayoresIngresosEntreFechasService,
    getClientesMasConcurridosService} from "../models/userModel.js";

const handleResponse = (res,status,message,data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createpescado = async (req, res, next) => {
    const { id_pescado, nombre, precio } = req.body;
    // Validar que los campos estén presentes
    if (!id_pescado || !nombre || !precio) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    // Convertir precio a número flotante
    const precioFloat = parseFloat(precio);

    // Validar que el precio sea un número válido
    if (isNaN(precioFloat)) {
        return res.status(400).json({ message: "El precio debe ser un número válido." });
    }

    try {
        // Crear el pescado en la base de datos llamando al servicio
        const newPescado = await createPescadoService(id_pescado, nombre, precioFloat);
        
        // Responder con el pescado creado
        return handleResponse(res, 201, "Pescado creado con éxito", newPescado);
    } catch (e) {
        next(e);  // Manejo de errores
    }
};

export const createInventariopescado = async (req, res, next) => {
    const { id_pescado, id_lote,clasificacion,nombre, peso, fecha_ingreso, fecha_caducidad, estado, proceso, id_embarcacion } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!id_pescado || !nombre || !peso || !fecha_ingreso || !fecha_caducidad || !estado || !proceso || !id_embarcacion) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    // Convertir el peso a número flotante
    const pesoFloat = parseFloat(peso);

    // Validar que el peso sea un número válido
    if (isNaN(pesoFloat)) {
        return res.status(400).json({ message: "El peso debe ser un número válido." });
    }

    // Validar las fechas
    const isValidDate = (date) => !isNaN(Date.parse(date));
    if (!isValidDate(fecha_ingreso) || !isValidDate(fecha_caducidad)) {
        return res.status(400).json({ message: "Las fechas deben ser válidas." });
    }

    try {
        // Llamar al servicio para crear el registro de pescado en el inventario
        const newPescado = await createInvetarioPescadoService(
            id_pescado,
            id_lote,
            clasificacion, 
            nombre, 
            pesoFloat, 
            fecha_ingreso, 
            fecha_caducidad, 
            estado, 
            proceso, 
            id_embarcacion
        );
        
        // Responder con el pescado creado
        return handleResponse(res, 201, "Pescado creado con éxito", newPescado);
    } catch (e) {
        next(e);  // Manejo de errores
    }
};


export const createInventario = async (req, res, next) => {
    const {codigo_producto,nombre_producto,tipo_producto,cantidad} = req.body;

    // Convertir cantidad_herramienta a un número entero
    const cantidadproducotInt = parseInt(cantidad, 10);

    // Verificar si la conversión fue exitosa
    if (isNaN(cantidadproducotInt)) {
        return res.status(400).json({ message: "La cantidad de los productos debe ser un número entero válido." });
    }

    try {
        const newproducto = await createInventarioService(codigo_producto,nombre_producto,tipo_producto,cantidadproducotInt);
        handleResponse(res, 201, "Herramienta Creada Con Éxito", newproducto);
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

export const createSolicitudVenta = async (req, res, next) => {
    const { nombre_cliente,cedula_cliente,peso_pez,nombre_solicitud,estatus} = req.body;
    try {
        const newCliente = await createSolicitudVentaService(nombre_cliente,cedula_cliente,peso_pez,nombre_solicitud,estatus);
        handleResponse(res, 201, "Solicitud Creada Con Éxito", newCliente);
    } catch (e) {
        next(e);
    }
};


export const createEmbarcacion = async (req, res, next) => {
    const { id_embarcacion, nombre, capacidad, tipo_embarcacion,estado } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!id_embarcacion || !nombre || !capacidad || !tipo_embarcacion || !estado) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    // Convertir la capacidad de carga máxima a un número flotante
    const capacidadCargaMaxFloat = parseFloat(capacidad);

    // Validar que la capacidad de carga sea un número válido
    if (isNaN(capacidadCargaMaxFloat)) {
        return res.status(400).json({ message: "La capacidad de carga máxima debe ser un número válido." });
    }

    try {
        // Llamar al servicio para crear la embarcación en la base de datos
        const newEmbarcacion = await createEmbarcacionService(id_embarcacion, nombre, capacidad, tipo_embarcacion,estado);
        
        // Responder con la embarcación creada
        return handleResponse(res, 201, "Embarcación Creada Con Éxito", newEmbarcacion);
    } catch (e) {
        next(e);  // Manejo de errores
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



export const createFacturaCompras = async (req, res, next) => {
    const {     
        numero_factura,             
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
    } = req.body;


    // Validar que todos los campos obligatorios estén presentes (excepto dirección)
    if (!numero_factura || !nombre_cliente || !cedula_rif || !email || !telefono || !tipo_producto || !descripcion_producto || !cantidad || !precio_unitario || !total) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto la dirección." });
    }

    try {
        const transaccion = await createFacturaCompraService(         
            numero_factura,             
            nombre_cliente,
            cedula_rif,
            email,
            telefono,
            direccion, // Dirección es opcional
            tipo_producto,
            descripcion_producto,
            cantidad,
            precio_unitario,
            total
        );
        handleResponse(res, 201, "Factura Creada Con Éxito", transaccion);
    } catch (e) {
        next(e);
    }
};



export const createFacturaVentas = async (req, res, next) => {
    const {     
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
    } = req.body;
    // Validar que todos los campos obligatorios estén presentes (excepto dirección)
    if (!numero_factura || !codigo_pescado || !cantidad || !precio_unitario || !total || !nombre_cliente || !cedula_cliente || !email_cliente || !telefono_cliente) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto la dirección." });
    }
    try {
        const transaccion = await createFacturaVentasService(                   
            numero_factura,
            codigo_pescado,
            cantidad,
            precio_unitario,     
            total,
            nombre_cliente,
            cedula_cliente,
            email_cliente,
            telefono_cliente,
            direccion_cliente // Dirección es opcional
        );
        handleResponse(res, 201, "Factura Creada Con Éxito", transaccion);
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

export const getAllInventarioPescados = async (req,res,next) => {
    try{
        const Pescados = await getAllInventarioPescadosService();
        handleResponse(res,200,"Pescados Mostrados con Exito", Pescados);
    }
    catch(e){
        next(e);
    };
};


export const getAllInventario = async (req,res,next) => {
    try{
        const inventario = await getAllInventarioService();
        handleResponse(res,200,"Productos Mostrados con Exito", inventario);
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

export const getAllSolicitudVentas = async (req,res,next) => {
    try{
        const clientes = await getAllClientesService();
        handleResponse(res,200,"Solicitudes Mostrados con Exito", clientes);
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

export const getAllFacturasCompras = async (req,res,next) => {
    try{
        const transacciones = await getAllFacturasComprasService();
        handleResponse(res,200,"Facturas De Compras Mostradas con Exito", transacciones);
    }
    catch(e){
        next(e);
    };
};



export const getAllFacturasVentas = async (req,res,next) => {
    try{
        const transacciones = await getAllFacturasVentasService();
        handleResponse(res,200,"Factura de Ventas Mostradas con Exito", transacciones);
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

export const getInventarioPescadoById = async (req,res,next) => {
    try{
        const Pescado = await getInventarioPescadosServiceByid(req.params.id);
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

export const getInventarioById = async (req,res,next) => {
    try{
        const producto = await getInventarioServiceByid(req.params.id);
        if(!producto) return handleResponse(res,404,"Producto no encontrado");
        handleResponse(res,200,"producto Encontrado Con exito",producto);
    }
    catch(e){
        next(e);
    };
};


export const updatePescado = async (req, res, next) => {
    const { codigo_pescado, pescado, precio } = req.body;

    // Validación de los parámetros (se puede añadir más validación según sea necesario)
    if (!codigo_pescado || !pescado || !precio) {
        return res.status(400).json({ message: "Faltan datos requeridos (codigo_pescado, pescado, precio)" });
    }

    try {
        // Llamamos al servicio para actualizar el pescado
        const updatedPescado = await updatePescadoServiceByid(codigo_pescado, pescado, precio, req.params.id);

        // Si no se encuentra el pescado con el ID proporcionado, respondemos con 404
        if (!updatedPescado) {
            return handleResponse(res, 404, "Pescado no encontrado");
        }

        // Si la actualización es exitosa, respondemos con el pescado actualizado
        handleResponse(res, 200, "Pescado actualizado con éxito", updatedPescado);
    } catch (e) {
        next(e);  // En caso de error, lo pasamos al manejador de errores
    }
};



export const updateInventarioPescado = async (req, res, next) => {
    const { clasificacion,nombre,peso, fecha_ingreso, fecha_caducidad, estado, proceso, id_embarcacion } = req.body;
    
    if (!nombre || !clasificacion || !peso || !fecha_ingreso || !fecha_caducidad || !estado || !proceso || !id_embarcacion) {
        return res.status(400).json({ message: "Faltan datos requeridos." });
    }
    const isValidDate = (date) => !isNaN(Date.parse(date)); // Usamos Date.parse() para verificar fechas válidas

 if (!isValidDate(fecha_ingreso) || !isValidDate(fecha_caducidad)) {
     return handleResponse(res, 400, "Las fechas deben estar en un formato válido.");
 }
 console.log(typeof fecha_ingreso)
    try {
        // Llamar al servicio para actualizar el pescado en el inventario
        const updatedPescado = await updateInventarioPescadoServiceByid(clasificacion,nombre,peso, fecha_ingreso, fecha_caducidad, estado, proceso, id_embarcacion, req.params.id);

        // Si no se encuentra el pescado con el id_pescado
        if (!updatedPescado) {
            return handleResponse(res, 404, "Pescado no encontrado");
        }

        // Si la actualización fue exitosa, respondemos con el pescado actualizado
        handleResponse(res, 200, "Pescado actualizado con éxito", updatedPescado);
    } catch (e) {
        next(e);  // Si ocurre algún error, lo pasamos al manejador de errores
    }
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


export const updateSolicitudVenta= async (req,res,next) => {
    const {nombre_cliente, cedula_cliente,peso_pez,nombre_solicitud,estatus} = req.body
    try{
        const updatePescado = await updateSolicitudVentaService(nombre_cliente, cedula_cliente,peso_pez,nombre_solicitud,estatus,req.params.id);
        if(!updatePescado) return handleResponse(res,404,"Solicitud no encontrado");
        handleResponse(res,200,"Solicitud Actualizada Con exito",updatePescado)
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

export const updateInventario = async (req,res,next) => {
    const {nombre_producto,tipo_producto,cantidad} = req.body
    cantidad = parseInt(cantidad,10)
    try{
        const updateproducto = await updateInventarioServiceByid(nombre_producto,tipo_producto,cantidad,req.params.id);
        if(!updateproducto) return handleResponse(res,404,"producto no encontrado");
        handleResponse(res,200,"producto Actualizada Con exito",updateproducto)
    }
    catch(e){
        next(e);
    };
};

export const updateEmbarcacion = async (req, res, next) => {
    // Desestructuramos los datos recibidos del cuerpo de la solicitud
    const { nombre, capacidad, tipo_embarcacion, estado } = req.body;

    // Validamos que los datos sean correctos
    const capacidadNumerica = parseFloat(capacidad);

    if (isNaN(capacidadNumerica)) {
        return res.status(400).json({ message: "La capacidad debe ser un número válido." });
    }

    try {
        // Llamamos al servicio para actualizar la embarcación
        const updatedEmbarcacion = await updateEmbarcacionServiceByid(nombre, capacidadNumerica, tipo_embarcacion, estado, req.params.id);

        // Si no se encuentra la embarcación con el id_embarcacion
        if (!updatedEmbarcacion) {
            return handleResponse(res, 404, "Embarcación no encontrada");
        }

        // Si la actualización fue exitosa, respondemos con la embarcación actualizada
        handleResponse(res, 200, "Embarcación actualizada con éxito", updatedEmbarcacion);
    } catch (e) {
        next(e);  // Pasar el error al manejador de errores
    }
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

export const deleteInvetarioPescado = async (req,res,next) => {
    try{
        const deletePescado = await deleteInventarioPescadoServiceByid(req.params.id);
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


export const deleteInventario = async (req,res,next) => {
    try{
        const deleteproducto = await deleteInventarioServiceByid(req.params.id);
        if(!deleteproducto) return handleResponse(res,404,"Producto no encontrada");
        handleResponse(res,200,"Producto Eliminada Con exito",deleteproducto)
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


export const deleteSolicitudVenta = async (req,res,next) => {
    try{
        const deletecliente = await deleteSolicitudVentaService(req.params.id);
        if(!deletecliente) return handleResponse(res,404,"Solicitud no encontrado");
        handleResponse(res,200,"Solicitud Eliminado Con exito",deletecliente)
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

export const deleteFacturaCompra = async (req,res,next) => {
    try{
        const deletetransaccion = await deleteTransaccionesServiceByid(req.params.id);
        if(!deletetransaccion) return handleResponse(res,404,"Transaccion no encontrada");
        handleResponse(res,200,"Factura De Compra Eliminada Con exito",deletetransaccion)
    }
    catch(e){
        next(e);
    };
};

export const deleteFacturaVenta = async (req,res,next) => {
    try{
        const deletetransaccion = await deleteFacturaVentasServiceByid(req.params.id);
        if(!deletetransaccion) return handleResponse(res,404,"Transaccion no encontrada");
        handleResponse(res,200,"Factura De Ventas Eliminada Con exito",deletetransaccion)
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
    // Verificar que las fechas sean válidas
    const isValidDate = (date) => !isNaN(Date.parse(date)); // Usamos Date.parse() para verificar fechas válidas

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

export const getClientesMasCocurridos = async (req, res, next) => {
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
     const result = await getClientesMasConcurridosService(fechaInicio, fechaFin);

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