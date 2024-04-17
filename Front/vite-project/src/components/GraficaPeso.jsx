import React from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function GraficaPeso(props) {
    const { peso } = props;

    const pesos = peso.map(item => item.peso);
    const fechas = peso.map(item => item.fecha.substr(0,10));

  return (
    <div className='h-64 w-full flex items-center justify-center'> 
         <Line
          data={{
            labels: fechas,
            datasets: [
              {
                label: "Registro de Pesos",
                data: pesos,
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              }
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Registro de pesos",
              },
            },
          }}
        />
    </div>
  )
}
