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
    <div>
      <h1>Admin</h1>
      <button onClick={fetchProducts}>Fetch Products</button>
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
