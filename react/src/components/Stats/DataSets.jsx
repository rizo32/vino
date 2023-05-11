import React from 'react';

const DataSets = () => {
  const numberOfUsers = 1000;
  const avgCellarTotalWorth = 1583;
  const totalCellarWorth = 1600000;
  const fourthStat = "Alastro Planeta Sicilia 2021";

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard title="Total des utilisateurs" value={numberOfUsers} />
      <StatCard title="Prix moyen d'un cellier" value={`$${avgCellarTotalWorth}`} />
      <StatCard title="Valeur total des celliers" value={`$${totalCellarWorth}`} />
      <StatCard title="Vin de l'heure" value={fourthStat} />
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
    <p className="text-md font-bold mb-2">{title}</p>
    <p className="text-l font-semibold text-red-900">{value}</p>
  </div>
  );
};

export default DataSets;
