import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from "react-chartjs-2";
import axios from "axios";
import TopWinePieChart from "./TopWinePieChart";
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/piestats`;

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = () => {
  const [wineData, setWineData] = useState({ red: 0, white: 0 });

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await axios.get(baseURL);
        setWineData(response.data);
        
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWineData();
  }, []);

  const data = {
    labels: ["Vin rouge", "Vin blanc", "Vin rosé"],
    datasets: [
      {
        label: "nombre de bouteilles",
        data: [
          wineData.redWineCount,
          wineData.whiteWineCount,
          wineData.pinkWineCount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red Wine
          "rgba(255, 206, 86, 0.2)", // White Wine
          "rgba(255, 159, 243, 0.2)", // Pink Wine
          
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // idem
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 243, 1)",
          
        ],

        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total des bouteilles par type",
      },
      legend: {
        position: "chartArea",
      },
      datalabels: {
        color: '#000',
        formatter: function (value, context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return percentage + '%';
        },
        anchor: "end", 
        align: "end", 
        offset:-25, 
      },
    },
  };
  

  return (
    <div className="flex flex-col items-center w-full">
      <h6 className=' text-sm width-full text-center font-semibold text-gray-500'>Celliers</h6>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex justify-center w-full h-56 md:h-64 lg:h-96">
          <Pie data={data} options={options}  plugins={[ChartDataLabels]}/>
        </div>
        <div className="flex justify-center w-full h-56 md:h-64 lg:h-96">
          <TopWinePieChart />
        </div>
      </div>
    </div>
  );
};
export default PieCharts;
