import React,{ useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import  ThirdDataSet  from "./DataSetC";
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/piestats`;

ChartJS.register(ArcElement, Tooltip, Legend);

const SecondDataSet = () => {
  const [wineData, setWineData] = useState({ red: 0, white: 0 });

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await axios.get(baseURL);
        setWineData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWineData();
  }, []);

  const data = {
    labels: ["Vin rouge", "Vin blanc"],
    datasets: [
      {
        label: "nombre de bouteilles",
        data: [wineData.redWineCount, wineData.whiteWineCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
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
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-small mb-4">
        Statistiques celliers
      </h2>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex justify-center w-full h-56 md:h-64 lg:h-96">
          <Pie data={data} options={options} />
        </div>
        <div className="flex justify-center w-full h-56 md:h-64 lg:h-96">
          <ThirdDataSet/>
        </div>
      </div>
    </div>
  );

}
export default SecondDataSet;