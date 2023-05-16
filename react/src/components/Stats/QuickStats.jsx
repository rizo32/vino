import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/stats`;
const QuickStats = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [avgCellarTotalWorth, setAvgCellarTotalWorth] = useState(0);
  const [totalCellarWorth, setTotalCellarWorth] = useState(0);
  const [wineOfTheMoment, setFourthStat] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();

      setNumberOfUsers(data.numberOfUsers);
      setAvgCellarTotalWorth(data.avgCellarTotalWorth);
      setTotalCellarWorth(data.totalCellarWorth);
      setFourthStat(data.wineOfTheMoment);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard title="Total des utilisateurs" value={numberOfUsers} />
          <StatCard title="Prix moyen d'un cellier" value={`$${formatNumber(avgCellarTotalWorth)}`} />
        <StatCard title="Valeur total des celliers" value={`$${formatNumber(totalCellarWorth)}`} />
        <StatCard title="Vin de l'heure" value={wineOfTheMoment} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-2 md:p-4 rounded-lg shadow-lg border border-gray-300">
      <p className="text-sm md:text-md text-center font-bold mb-1 md:mb-2">{title}</p>
      <p className="text-base md:text-lg text-center font-semibold text-red-900">{value}</p>
    </div>
  );
};

export default QuickStats;
