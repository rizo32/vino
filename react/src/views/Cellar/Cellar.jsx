import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "../Catalog/style/catalog.css";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";

// Elodie

export default function Cellar() {
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);

  // aller chercher les bouteilles du cellier de l'usager dans la base de données et les mettre dans le state
  const getBottles = () => {
      setLoading(true);
      axiosClient
          .get("/cellarHasBottles")
          .then(({ data }) => {
              //console.log(data);
              setBottles(data.data);
              setLoading(false);
          })
          .catch((error) => {
              console.error(error);
              setLoading(false);
          });
  };

//executer la fonction
  useEffect(() => {
      getBottles();
  }, []);

//retirer la bouteille du cellier de l'usager
  const removeFromCellar = (id) => {
    axiosClient.delete(`${import.meta.env.VITE_API_BASE_URL}/api/cellarHasBottles/${id}`)
    .then(() => {
      getBottles();
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  return (
      <div className="flex flex-col gap-2">
          {loading ? (
              <p>Loading...</p>
          ) : (
              <ul>
                  {bottles.map((el) => (                     
                      <li key={el.id}>
                          <ProductCard bottle={el.bottle} quantity={el.quantity} />
                          {/* mettre en place le comportement swipe */}
                          <span onClick={() => removeFromCellar(el.id)}>delete</span>
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
}

