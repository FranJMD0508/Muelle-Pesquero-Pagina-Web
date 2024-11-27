import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'

function ReportCharts({ filter }) {
    const [data, setData] = useState({
        series: [
            {
                name: 'Ventas',
                data: []
            },
            {
                name: 'Ganancias',
                data: []
            },
            {
                name: 'Clientes',
                data: []
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            markers: {
                size: 4,
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                type: 'datetime',
                categories: [],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        }
    });

    const fetchTransacciones = (array) => {
        fetch('http://localhost:5001/api/transacciones')
        .then(response => response.json())
        .then(data => {
          procesarTransacciones(data.data,array);
        })
        .catch(e => console.log(e.message));
    }

    const procesarTransacciones = (transacciones, array) => {
        const ganancias = transacciones.reduce((acc, transaccion) => {
          const fecha = new Date(transaccion.fecha).toISOString().split('T')[0]; 
          const monto = transaccion.tipo === 'ingreso' ? parseFloat(transaccion.monto) : -parseFloat(transaccion.monto);
          if (!acc[fecha]) {
            acc[fecha] = 0;
          }
          acc[fecha] += monto;
          return acc;
        }, {});

        const ventas = transacciones.reduce((acc, transaccion) => {
          const fecha = new Date(transaccion.fecha).toISOString().split('T')[0]; 
          const nventas = transaccion.tipo === 'ingreso' ? 1 : 0;
          if (!acc[fecha]) {
            acc[fecha] = 0;
          }
          acc[fecha] += nventas;
          return acc;
        }, {});

        const clientes = transacciones.reduce((acc, transaccion) => {
          const fecha = new Date(transaccion.fecha).toISOString().split('T')[0]; 
          const nclientes = transaccion.tipo === 'ingreso' ? 1 : 0;

          if (!acc[fecha]) {
            acc[fecha] = 0;
          }
          if (array.includes(transaccion.tipo) === false) {
            acc[fecha] += nclientes;
            array.push(transaccion.tipo);
          }
          return acc;
        }, {});
    
        const gananciaData = Object.keys(ganancias).map(fecha => ({
            x: fecha,
            y: ganancias[fecha],
            
          }));

        const ventasData = Object.keys(ventas).map(fecha => ({
            x: fecha,
            y: ventas[fecha],
            
          }));

        const clientesData = Object.keys(clientes).map(fecha => ({
            x: fecha,
            y: clientes[fecha],
            
          }));

          let newSeries, newColors, newCategories;
          if (filter === 'Ventas' || filter === "Ventas") {
              newSeries = [
                  {
                      name: 'Ventas',
                      data: ventasData
                  },
              ];
              newColors = ['#4154f1', '#2eca6a', '#ff771d'];
              newCategories = ventasData.map(fecha => fecha.x)
          }
          else if (filter === 'Ganancias' || filter === "Ganancias") {
              newSeries = [
                  {
                      name: 'Ganancias',
                      data: gananciaData
                  },
              ];
              newColors = ['#2eca6a', '#4154f1', '#ff771d'];
              newCategories = gananciaData.map(fecha => fecha.x);
          }
          else if (filter === 'Clientes' || filter === "Clientes") {
              newSeries = [
                  {
                      name: 'Clientes',
                      data: clientesData
                  },
              ];
              newColors = ['#ff771d', '#4154f1', '#2eca6a'];
              newCategories = clientesData.map(fecha => fecha.x);
          }

          setData(prevData => ({
            ...prevData,
            series: newSeries,
            options: {
              ...prevData.options,
              xaxis: {
                ...prevData.options.xaxis,
                categories: newCategories,
              },
              colors: newColors,
            },
          }));
          console.log("Ganancia: ", gananciaData.map(fecha => fecha.x));
    };

    useEffect(() => {
        const clientes = []
        fetchTransacciones(clientes);
    }, [filter]);

  return (
    <Chart
        options={data.options}
        series={data.series}
        type={data.options.chart.type}
        height={350}
    />
  );
}

export default ReportCharts;