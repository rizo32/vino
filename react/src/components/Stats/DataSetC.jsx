
import React from 'react';

import { Pie } from 'react-chartjs-2';

export const data2 = {
    labels: ['Italie', 'Portugal', 'France', 'Espagne', 'Chili'],
    datasets: [
      {
        label: 'nombre de bouteilles',
        data: [95, 53,22,100,111],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  
  export const options2 = {
    plugins: {
      title: {
        display: true,
        text: 'Total des bouteilles dans les top 5 régions',
      },
      legend: {
        position: 'top',
      },
    },
  };
  export function thirdDataSet() {
    return (
      <div className="w-full h-full">
        <Pie data={data2} options={options2} />
      </div>
    );
  }
  
  
  