import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const FirstDataSet = () => {
  const [chartData, setChartData] = useState([]);

  const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/appStats`;
  
  const options = {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching app stats:', error);
      }
    };
  
    fetchData();
  }, []);
  
  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  const labels = chartData.map((data) => data.month);

  const data = {
    labels,
    datasets: [
      {
        label: `nombre total d'utilisateurs`,
        data: chartData.map((data) => data.totalUsers),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      },
      {
        label: `moyennes des bouteilles  / utilisateur`,
        data: chartData.map((data) => data.avgBottlesPerUser),
        borderColor: 'rgba(53, 162, 235, 1)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: false,
      },
      {
        label: `moyenne des bouteilles ajouter / utilisateur`,
        data: chartData.map((data) => data.avgAddedBottlesPerUser),
        borderColor: 'rgba(127,29,29,1)',
        backgroundColor: 'rgba(127,29,29,0.5)',
        fill: false,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default FirstDataSet;