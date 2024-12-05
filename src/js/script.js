import { language } from './Datatable/lanaguage/es-ES.js'

const actionNew = () => {
    const bodyContent = `
   <!-- Datos del Cliente -->
    <fieldset class="border p-3 mb-4">
      <legend class="w-auto">Datos del Proveedor</legend>
      <div class="row g-3">
        <div class="col-md-6">
          <label for="nombreCliente" class="form-label">Nombre del Proveedor</label>
          <input type="text" class="form-control" id="nombreProveedor" placeholder="Nombre completo" required>
        </div>
        <div class="col-md-6">
          <label for="emailCliente" class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" id="emailProveedor" placeholder="proveedor@ejemplo.com" required>
        </div>
        <div class="col-md-6">
          <label for="telefonoCliente" class="form-label">Teléfono</label>
          <input type="tel" class="form-control" id="telefonoProveedor" placeholder="123-456-7890" required>
        </div>
        <div class="col-md-6">
          <label for="direccionCliente" class="form-label">Dirección</label>
          <input type="text" class="form-control" id="direccionProveedor" placeholder="Calle, número, ciudad" required>
        </div>
        <div class="col-md-6">
          <label for="direccionCliente" class="form-label">Cedula</label>
          <input type="text" class="form-control" id="cedula" placeholder="Cedula" required>
        </div>
      </div>
    </fieldset>
    <!-- Productos a Facturar -->
    <fieldset class="border p-3 mb-4">
    <legend class="w-auto">Productos</legend>
    <div id="productos">
        <div class="row g-3 mb-3">
            <div class="col-md-6">
                <label for="tipoProducto" class="form-label">Tipo de Producto</label>
                <select class="form-control" id="tipoProducto" required>
                    <option value="">Seleccione un tipo</option>
                    <option value="Herramienta">Herramienta</option>
                    <option value="Material para muelle">Material para muelle</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="producto1" class="form-label">Descripción del Producto</label>
                <input type="text" class="form-control" id="producto1" placeholder="Ej: Chocolate" required>
            </div>
            <div class="col-md-3">
                <label for="cantidad1" class="form-label">Cantidad</label>
                <input type="number" class="form-control" id="cantidad1" min="1" required>
            </div>
            <div class="col-md-3">
                <label for="precio1" class="form-label">Precio Unitario</label>
                <input type="number" class="form-control" id="precio1" min="0" step="0.01" placeholder="0.00" required>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-success btn-sm" id="addProduct">Añadir Producto</button>
</fieldset>

    <!-- Resumen -->
    <fieldset class="border p-3 mb-4">
      <legend class="w-auto">Resumen</legend>
      <div class="mb-3">
        <label for="subtotal" class="form-label">Subtotal</label>
        <input type="number" class="form-control" id="subtotal" placeholder="0.00" readonly>
      </div>
      <div class="mb-3">
        <label for="impuestos" class="form-label">Impuestos (IVA 16%)</label>
        <input type="number" class="form-control" id="impuestos" placeholder="0.00" readonly>
      </div>
      <div class="mb-3">
        <label for="total" class="form-label">Total</label>
        <input type="number" class="form-control" id="total" placeholder="0.00" readonly>
      </div>
    </fieldset>
    `;

    const footerContent = `
        <button class="btn btn-primary" id="${BTN.id.saveNew}">Guardar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `

    MODAL.setContent(MODAL_TITLES.new, bodyContent, footerContent);
    MODAL.show();

document.getElementById('productos').addEventListener('input', function(e) {
    if (e.target.id.startsWith('cantidad') || e.target.id.startsWith('precio')) {
        calcularTotales();
    }
});


function calcularTotales() {
    let subtotal = 0;
    const productos = document.getElementById('productos').getElementsByClassName('row');

    for (let i = 0; i < productos.length; i++) {
        const cantidad = parseFloat(productos[i].querySelector('[id^="cantidad"]').value) || 0;
        const precio = parseFloat(productos[i].querySelector('[id^="precio"]').value) || 0;
        subtotal += cantidad * precio;
    }

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    document.getElementById('subtotal').value = subtotal.toFixed(2);
    document.getElementById('impuestos').value = iva.toFixed(2);
    document.getElementById('total').value = total.toFixed(2);
}


document.getElementById('addProduct').addEventListener('click', function() {
    const productCount = document.getElementById('productos').getElementsByClassName('row').length + 1;
    const newRow = `
        <div class="row g-3 mb-3">
            <div class="col-md-6">
                <label for="producto${productCount}" class="form-label">Descripción del Producto</label>
                <input type="text" class="form-control" id="producto${productCount}" placeholder="Ej: Chocolate" required>
            </div>
            <div class="col-md-3">
                <label for="cantidad${productCount}" class="form-label">Cantidad</label>
                <input type="number" class="form-control" id="cantidad${productCount}" min="1" required>
            </div>
            <div class="col-md-3">
                <label for="precio${productCount}" class="form-label">Precio Unitario</label>
                <input type="number" class="form-control" id="precio${productCount}" min="0" step="0.01" placeholder="0.00" required>
            </div>
        </div>
    `;
    document.getElementById('productos').insertAdjacentHTML('beforeend', newRow);
});

}

const actionSaveNew = async () => {
    try {
        // Get base form data
        const baseFormData = {
            numero_factura: 'FC' + Math.random().toString().slice(2, 8),
            nombre_cliente: document.getElementById('nombreProveedor').value,
            cedula_rif: document.getElementById('cedula').value,
            email: document.getElementById('emailProveedor').value,
            telefono: document.getElementById('telefonoProveedor').value,
            direccion: document.getElementById('direccionProveedor').value,
            fecha: new Date().toISOString()
        };

        const requiredBaseFields = ['nombre_cliente', 'cedula_rif', 'email', 'telefono', 'direccion'];
        const emptyBaseFields = requiredBaseFields.filter(field => !baseFormData[field]);

        if (emptyBaseFields.length > 0) {
            throw new Error(`Por favor complete los campos requeridos: ${emptyBaseFields.join(', ')}`);
        }

        const productosContainer = document.getElementById('productos');
        const productRows = productosContainer.getElementsByClassName('row');
        const productos = [];

        for (let i = 0; i < productRows.length; i++) {
            const productoId = i + 1;
            const descripcion = document.getElementById(`producto${productoId}`).value;
            const cantidad = document.getElementById(`cantidad${productoId}`).value;
            const precioUnitario = document.getElementById(`precio${productoId}`).value;

            if (descripcion && cantidad && precioUnitario) {
                productos.push({
                    descripcion_producto: descripcion,
                    cantidad: parseInt(cantidad),
                    precio_unitario: parseFloat(precioUnitario).toFixed(2),
                    total: (parseInt(cantidad) * parseFloat(precioUnitario)).toFixed(2)
                });
            }
        }

        if (productos.length === 0) {
            throw new Error('Debe agregar al menos un producto');
        }

        const formData = {
            ...baseFormData,
            tipo_producto: "Producto", 
            descripcion_producto: productos[0].descripcion_producto,
            cantidad: productos[0].cantidad,
            precio_unitario: productos[0].precio_unitario,
            total: document.getElementById('total').value
        };

        // Make API call
        const response = await fetch('https://affd-168-194-111-17.ngrok-free.app/Api/factura/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        alert(`Factura guardada`);


        const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
        modal.hide();



    } catch (error) {
        console.error('Error:', error);
        alert(`Error al guardar la factura: ${error.message}`);
    }
};


const actionEdit = (id) => {
    const bodyContent = `Datos de factura nro ${id}`;

    const footerContent = `
        <button class="btn btn-primary" id="${BTN.id.saveEdit}">Guardar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `

    MODAL.setContent(MODAL_TITLES.edit, bodyContent, footerContent);
    MODAL.show();
}

const actionSaveEdit = () => {
    alert("Guardo los cambios");

    //
    //Modal abierto
    //

    MODAL.hide();
}

const actionView = (id) => {
    const bodyContent = `Datos de factura nro ${id}`;

    const footerContent = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `

    MODAL.setContent(MODAL_TITLES.edit, bodyContent, footerContent);
    MODAL.show();
}

const columnas_mostrar = [0, 1, 2, 3, 4,5]
const title = "Facturación";

const MODAL = {
    element: null,
    title: null,
    body: null,
    footer: null,
    bootstrapModal: null,
    init() {
        this.element = document.getElementById("modal");
        this.title = this.element.querySelector('.modal-title');
        this.body = this.element.querySelector('.modal-body');
        this.footer = this.element.querySelector('.modal-footer');
        this.bootstrapModal = new bootstrap.Modal(this.element);
    },
    show() {
        this.bootstrapModal.show();
    },
    hide() {
        this.clear();
        this.bootstrapModal.hide();
    },
    setContent(title, bodyContent, footerContent) {
        this.title.textContent = title;
        this.body.innerHTML = bodyContent;
        this.footer.innerHTML = footerContent;
    },
    clear() {
        this.setContent('', '', '');
    }
};

function getFactured() {
    //Consulta a la api

}

let facturas = [
    { nro_factura: "001", cliente: "Juan Pérez", fecha: "2024-11-25", total: "\$100.00", estado: "Pagado" },
    { nro_factura: "002", cliente: "Ana García", fecha: "2024-11-26", total: "\$250.50", estado: "Pendiente" },
    { nro_factura: "003", cliente: "Carlos López", fecha: "2024-11-27", total: "\$450.75", estado: "Pendiente" },
    { nro_factura: "004", cliente: "Lucía Fernández", fecha: "2024-11-28", total: "\$300.00", estado: "Pagado" },
    { nro_factura: "005", cliente: "Mario Sánchez", fecha: "2024-11-29", total: "\$150.00", estado: "Pendiente" },
    { nro_factura: "006", cliente: "Laura Gómez", fecha: "2024-11-30", total: "\$500.00", estado: "Pagado" },
    { nro_factura: "007", cliente: "Pedro Martel", fecha: "2024-12-01", total: "\$400.00", estado: "Pendiente" },
    { nro_factura: "008", cliente: "Sara Mora", fecha: "2024-12-02", total: "\$350.00", estado: "Pagado" },
    { nro_factura: "009", cliente: "Jorge Ruiz", fecha: "2024-12-03", total: "\$200.00", estado: "Pendiente" },
    { nro_factura: "010", cliente: "Marta Rojas", fecha: "2024-12-04", total: "\$450.00", estado: "Pagado" },
    { nro_factura: "011", cliente: "Diego Torres", fecha: "2024-12-05", total: "\$300.50", estado: "Pendiente" },
    { nro_factura: "012", cliente: "Elena Méndez", fecha: "2024-12-06", total: "\$220.00", estado: "Pagado" },
    { nro_factura: "013", cliente: "Ricardo Salinas", fecha: "2024-12-07", total: "\$380.75", estado: "Pendiente" },
    { nro_factura: "014", cliente: "Luisa Aguilar", fecha: "2024-12-08", total: "\$290.10", estado: "Pagado" },
    { nro_factura: "015", cliente: "Pablo Castillo", fecha: "2024-12-09", total: "\$310.20", estado: "Pendiente" },
    { nro_factura: "016", cliente: "Sofía Vargas", fecha: "2024-12-10", total: "\$275.30", estado: "Pagado" },
    { nro_factura: "017", cliente: "Andrés Flores", fecha: "2024-12-11", total: "\$460.50", estado: "Pendiente" },
    { nro_factura: "018", cliente: "Carmen Toledo", fecha: "2024-12-12", total: "\$490.00", estado: "Pagado" },
    { nro_factura: "019", cliente: "Fernando Núñez", fecha: "2024-12-13", total: "\$360.00", estado: "Pendiente" },
    { nro_factura: "020", cliente: "Gabriela Herrera", fecha: "2024-12-14", total: "$330.00", estado: "Pagado" }
  ];



const configDataTable = {
    language: language,
    data: facturas,
    fixedHeader: true,
    autoWidth: false,
    buttons: [
        {
            extend: 'collection',
            text: '<i class="bx bx-export me-1"></i> Exportar / Imprimir',
            className: 'btn btn-primary dropdown-toggle',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    text: '<i class="bx bxs-file-pdf me-1"></i> Exportar a PDF',
                    className: 'dropdown-item',
                    title: title,
                    exportOptions: {
                        columns: columnas_mostrar
                    },
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="bx bxs-file me-1"></i> Exportar a Excel',
                    className: 'dropdown-item',
                    title: title,
                    exportOptions: {
                        columns: columnas_mostrar,
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="bx bxs-printer me-1"></i> Imprimir',
                    className: 'dropdown-item',
                    title: title,
                    exportOptions: {
                        columns: columnas_mostrar
                    }
                }
            ]
        }
    ],
    columns: [
        {
            data: null,
            render: function(data, type, row) {
              return '<input type="checkbox" class="select-checkbox" data-id="' + row.nro_factura + '">';
            }
        },
        {
            data: 'nro_factura'
        },
        {
            data: 'cliente'
        },
        {
            data: 'fecha'
        },
        {
            data: 'total'
        },
        {
            data: 'estado'
        },
        {
            data: null,
            render: function (data, type, row) {
                return `
                    <button type="button" class="btn btn-primary action-btn" data-action="${BTN.id.edit}" data-id="${row.nro_factura}">Modificar</button>
                    <button type="button" class="btn btn-dark action-btn" data-action="${BTN.id.view}" data-id="${row.nro_factura}">Ver</button>
                    <button type="button" class="btn btn-danger action-btn">Eliminar</button>
                `;
            }
        }
    ],
    columnDefs: [
        {
            targets: [0,6],
            orderable: false,
            search: false
        },
        {
            targets: [0, 1, 2, 3, 4, 5,6],
            className: "text-center"
        }
    ],
    dom: '<"row mb-3"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
        '<"row mb-3"<"col-sm-12 col-md-6"Q><"col-sm-12 col-md-6 text-end"B>>' +
        '<"row"<"col-sm-12"tr>>' +
        '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
    // Asegurar que los estilos se apliquen después de la inicialización
    initComplete: function (settings, json) {
        $('ul.pagination').parent().addClass('d-flex justify-content-end mt-3');
    },
}

const BTN = {
    id: {
        new: "btnNew",
        saveNew: "btnSaveNew",

        edit: "btnEdit",
        saveEdit: "btnSaveEdit",

        view: "btnView",
    }
}

const MODAL_TITLES = {
    new: "Nueva factura",
    edit: "Editar factura",
    delete: "Eliminar factura",
    detail: "Detalles de la factura",
    deleteSelected: "Eliminar Facturas Seleccionados",
};




const buttonActions = {
    [BTN.id.new]: actionNew,
    [BTN.id.saveNew]: actionSaveNew,

    [BTN.id.edit]: actionEdit,
    [BTN.id.saveEdit]: actionSaveEdit,

    [BTN.id.view]: actionView
}

document.addEventListener('click', function (event) {
    const target = event.target;
    const button = target.closest('button');

    if (button && button.id in buttonActions) {
        event.preventDefault();
        buttonActions[button.id]();
    }
});

$('#tablaFacturas').on('click', '.action-btn', function (e) {
    const action = $(this).data('action');
    const id = $(this).data('id');
    if (action in buttonActions) {
        buttonActions[action](id);
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const table = new DataTable('#tablaFacturas', configDataTable);
    MODAL.init();
});
