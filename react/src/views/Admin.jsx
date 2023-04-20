import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/saq";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [nombre, setNombre] = useState(24);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await axios.post(`${baseURL}/fetch`, {
      nombre,
      page,
    });
    setProducts(response.data);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <select
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="mb-2"
      >
        <option value={24}>24</option>
        <option value={48}>48</option>
        <option value={96}>96</option>
      </select>
      <select
        value={page}
        onChange={(e) => setPage(e.target.value)}
        placeholder="Page number"
        className="mb-2"> 
        <option value={1}>1</option>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={8}>8</option>
        <option value={13}>13</option>
        <option value={21}>21</option>
      
      </select>
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
