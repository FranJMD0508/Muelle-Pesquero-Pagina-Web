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
                categories: ['2024-01-01','2024-02-01','2024-03-01','2024-04-01','2024-05-01', '2024-06-01', '2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', '2024-11-01', '2024-12-01'],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        }
    });

    const fetchTransacciones = () => {
        fetch('http://localhost:5001/api/transacciones')
        .then(response => response.json())
        .then(data => {
          procesarTransacciones(data.data);
        })
        .catch(e => console.log(e.message));
    }

    const procesarTransacciones = (transacciones) => {
        const ganancias = transacciones.reduce((acc, transaccion) => {
          const fecha = new Date(transaccion.fecha).toISOString().split('T')[0]; 
          const monto = transaccion.tipo === 'ingreso' ? parseFloat(transaccion.monto) : -parseFloat(transaccion.monto);
          if (!acc[fecha]) {
            acc[fecha] = 0;
          }
          acc[fecha] += monto;
          return acc;
        }, {});
    
          const gananciaData = Object.keys(ganancias).map(fecha => ({
            x: fecha,
            y: ganancias[fecha],
            
          }));

          setData(prevData => ({
            ...prevData,
            series: [
                {
                    name: 'Ventas',
                    data: [10, 41, 35, 51, 49, 62, 500]
                },
                {
                    name: 'Ganancias',
                    data: gananciaData
                },
                {
                    name: 'Clientes',
                    data: [10, 20, 30, 40, 50, 60, 90]
                },
            ],
        }));
        console.log("Ganancia Despues: ",gananciaData);
    };
    

    const updateSeries = (filter) => {
        let newSeries, newColors;

        if (filter === 'Todo' || filter === "Todo") {
            newSeries = [
                {
                    name: 'Ventas',
                    data: [10, 41, 35, 51, 49, 62, 90]
                },
                {
                    name: 'Ganancias',
                    data: [{
                        x: '2024-01-01',
                        y: null
                      },
                      {
                        x: '2024-01-01',
                        y: 44
                      },
                      {
                        x: 'Dec 25 2024',
                        y: 31
                      },     
                    ]
                },
                {
                    name: 'Clientes',
                    data: [10, 20, 30, 40, 50, 60, 90]
                },
            ];
            newColors = ['#4154f1', '#2eca6a', '#ff771d'];
        }
        else if (filter === 'Ventas' || filter === "Ventas") {
            newSeries = [
                {
                    name: 'Ventas',
                    data: [10, 41, 35, 51, 49, 62, 90]
                },
            ];
            newColors = ['#4154f1', '#2eca6a', '#ff771d'];
        }
        else if (filter === 'Ganancias' || filter === "Ganancias") {
            newSeries = [
                {
                    name: 'Ganancias',
                    data: [0]
                },
            ];
            newColors = ['#2eca6a', '#4154f1', '#ff771d'];
        }
        else if (filter === 'Clientes' || filter === "Clientes") {
            newSeries = [
                {
                    name: 'Clientes',
                    data: [10, 20, 30, 40, 50, 60, 90]
                },
            ];
            newColors = ['#ff771d', '#4154f1', '#2eca6a'];
        }
        

        setData((prevData) => ({
            ...prevData,
            series: newSeries,
            options: {
                ...prevData.options,
                colors: newColors
            }

        }));
    };

    useEffect(() => {
        updateSeries(filter);
    }, [filter]);

    useEffect(() => {
        fetchTransacciones();
    }, []);

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