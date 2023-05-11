import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { thirdDataSet } from "./DataSetC";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Vin rouge", "Vin blanc"],
  datasets: [
    {
      label: "nombre de bouteilles",
      data: [123, 73],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Total des bouteilles par type",
    },
    legend: {
      position: "top",
    },
  },
};

export function secondDataSet() {
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
          {thirdDataSet()}
        </div>
      </div>
    </div>
  );

}
