import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'];

export const data = {
  labels,
  datasets: [
    {
      label: `nombre d'utilisateurs`,
      data: [450, 700, 320, 580, 820],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      fill: false,
    },
    {
      label: `nombre de bouteilles ajouter`,
      data: [280, 540, 760, 390, 620],
      borderColor: 'rgba(53, 162, 235, 1)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: false,
    },
    {
        label: `nombre de bouteilles supprimer`,
        data: [180, 240, 360, 190, 320],
        borderColor: 'rgba(127,29,29,1)',
        backgroundColor: 'rgba(127,29,29,0.5)',
        fill: false,
      },
  ],
};

export function dataset1() {
  return <Line options={options} data={data} />;
}
