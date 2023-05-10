import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Participation des utilisateurs',
    },
  },
};

const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai']

export const data = {
  labels,
  datasets: [
    {
      label: `nombre d'utilisateurs`,
      data: [450, 700, 320, 580, 820],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: `nombre de bouteilles ajouter`,
      data: [280, 540, 760, 390, 620],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function dataset() {
  return <Bar options={options} data={data} />;
}
