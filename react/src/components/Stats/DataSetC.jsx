
import React from 'react';

import { Pie } from 'react-chartjs-2';

export const data2 = {
    labels: ['Region 1', 'Region 2'],
    datasets: [
      {
        label: 'nombre de bouteilles',
        data: [95, 53],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };
  
  export const options2 = {
    plugins: {
      title: {
        display: true,
        text: 'Total des bouteilles par région',
      },
      legend: {
        position: 'top',
      },
    },
  };
  export function thirdDataSet() {
    return (
      <div className="flex justify-center w-48 h-48">
        <Pie data={data2} options={options2} />
      </div>
    );
  }
  
  
  