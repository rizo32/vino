/* imporantations des composantes et modules */
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from "react-chartjs-2";
import axios from "axios";
import TopWinePieChart from "./TopWinePieChart";
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/piestats`;/* Déclarations du baseURL */

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = () => {
  /* declaration de l'état pour wineDaata */
  const [wineData, setWineData] = useState({ red: 0, white: 0 });

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await axios.get(baseURL); /* requête axios pour récupérer les données de l'API */
        setWineData(response.data); /* déclaration des données a utilisé pour le graphique */
        
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWineData();
  }, []);

  const data = {
    labels: ["Vin rouge", "Vin blanc", "Vin rosé"], /* déclaration des labels */
    datasets: [
      {
        label: "nombre de bouteilles", /* déclaration du label:hover*/
        data: [
          wineData.redWineCount,
          wineData.whiteWineCount,
          wineData.pinkWineCount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Vin Rouge
          "rgba(255, 206, 86, 0.2)", // Vin Blanc
          "rgba(255, 159, 243, 0.2)", // Vin Rosé
          
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // idem avec opacity 1
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 243, 1)",
          
        ],

        borderWidth: 1,
      },
    ],
  };
  const options = {
    /* Déclaration des options au niveau esthétiques  et labels pour se graphique */
    plugins: {
      title: {
        display: true,
        text: "Total des bouteilles par type",
        font: {
          size: 13,
          weight: "normal",
        },
      },
      legend: {
        position: "chartArea",
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
        formatter: function (value, context) { /* ajout du % de la partie a l'intérieur de celle-ci */
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return percentage + '%';
        },
        /* placement et style du % */
        anchor: "end",  
        align: "end", 
        offset: -25, 
        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        borderRadius: 4, 
      },
      
      
    },
  };
  

  return (
    <div className="flex flex-col items-center w-full">
      <h6 className=' text-sm width-full text-center font-semibold text-gray-500'>Celliers</h6>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex justify-center w-full h-56 md:h-64 lg:h-96">
          <Pie data={data} options={options}  plugins={[ChartDataLabels]}/> {/* déclaration du graphique a l'aide des options et données déclarés plus haut*/}
        </div>
        <div className="flex justify-center w-full h-56 md:h-64 lg:h-96">
          <TopWinePieChart /> {/* déclaration du graphique a l'aide des options et données importées depuis TopWinePieChart */}
        </div>
      </div>
    </div>
  );
};
export default PieCharts;
