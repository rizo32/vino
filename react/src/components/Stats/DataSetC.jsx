import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/topWineStats`;

const ThirdDataSet = () => {
  const [topWineData, setTopWineData] = useState(null);

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await axios.get(baseURL);
        setTopWineData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWineData();
  }, []);

  const data2 = {
    labels: ['Italie', 'Portugal', 'France', 'Espagne', 'Chili'],
    datasets: [
      {
        label: 'nombre de bouteilles',
        data: [95, 53, 22, 100, 111],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const options2 = {
    plugins: {
      title: {
        display: true,
        text: 'Total des bouteilles dans les top 5 régions',
      },
      legend: {
        position: 'chartArea',
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Pie data={data2} options={options2} />
    </div>
  );
};

export default ThirdDataSet;