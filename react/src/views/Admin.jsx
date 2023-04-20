import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/saq";

const Admin = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.post(`${baseURL}/fetch`, {
      nombre: 24,
      page: 1,
    });
    setProducts(response.data);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <button
        onClick={fetchProducts}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-4"
      >
        Fetch Products
      </button>
      {products.map((product, index) => (
        <div key={index}>
          <h2>{product.nom}</h2>
          <p>Result: {product.result.raison}</p>
        </div>
      ))}
    </div>
  );
};

export default Admin;
