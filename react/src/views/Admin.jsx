import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/saq/getProduits";

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${baseURL}/24/1`);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Admin</h1>
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
