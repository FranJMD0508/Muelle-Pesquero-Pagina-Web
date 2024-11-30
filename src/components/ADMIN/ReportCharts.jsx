import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import config from './config';

function ReportCharts({ filter }) {
    const [data, setData] = useState({
      series: [
        {
          data: [],
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false,
          },
          toolbar:{
            show: false,
          }
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 4,
        },
        fill: {
          type: 'gradient',
          gradient: {
            stops: [0, 90, 100],
          }
        },
        xaxis: {
          categories: [],
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        plotOptions: {
          line: {
            colors: {
              threshold: 0,
            },
          },
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          }
        },
      },
    });

    const fetchTransacciones = (array) => {
      fetch(config.apiUrl + "transacciones", {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
        .then(response => response.json())
        .then(data => {
          procesarTransacciones(data.data,array);
        })
        .catch(e => console.log(e.message));
    }

    const procesarTransacciones = (transacciones, array) => {
        array.length = 0;
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
          if (array.includes(transaccion.cedula_cliente) === false) {
            acc[fecha] += nclientes;
            array.push(transaccion.cedula_cliente);
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
          console.log("Ganancia: ", gananciaData.map(fecha => fecha.x));

          let newSeries, newColors, newCategories;
          if (filter === 'Ventas' || filter === "Ventas") {
              newSeries = [
                  {
                      name: 'Ventas',
                      data: ventasData
                  },
              ];
              newColors = ['#4154f1'];
              newCategories = ventasData.map(fecha => fecha.x)
          }
          else if (filter === 'Ganancias' || filter === "Ganancias") {
              newSeries = [
                  {
                      name: 'Ganancias',
                      data: gananciaData
                  },
              ];
              newColors = ['#2eca6a'];
              newCategories = gananciaData.map(fecha => fecha.x);
          }
          else if (filter === 'Clientes' || filter === "Clientes") {
              newSeries = [
                  {
                      name: 'Clientes',
                      data: clientesData
                  },
              ];
              newColors = ['#ff771d'];
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
        height={data.options.chart.height}
    />
  );
}

export default ReportCharts;