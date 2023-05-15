import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';



const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/topWineStats`;

const TopWinePieChart = () => {
  const [topWineData, setTopWineData] = useState({ labels: [], data: [] }); /* doit mapper etant donner que les labels sont changeeant dépendemment du score  */


  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await axios.get(baseURL);
        const labels = response.data.topWineStats.map((item) => item.name);
        const data = response.data.topWineStats.map((item) => parseInt(item.bottles_count));
        setTopWineData({ labels, data });
        
       
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWineData();
  }, []);

  const data2 = {
    labels: topWineData.labels,
    datasets: [
      {
        label: 'nombre de bouteilles',
        data: topWineData.data,
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
        font: {
          size: 13,
          weight: "normal",
        },
       
      },
      legend: {
        position: 'chartArea',
        labels: {
          boxWidth: 2,
        },
      },
     
      datalabels: {
        color: '#000',
        font: {
          size: 10, 
          weight: 'bold' 
        },
        padding: 2, 
        formatter: function (value, context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return percentage + '%';
        },
        anchor: "end", 
        align: "end", 
        offset: -25, 
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        borderRadius: 4, 
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Pie data={data2} options={options2} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default TopWinePieChart;