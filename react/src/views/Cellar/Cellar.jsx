import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "../Catalog/style/catalog.css";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function Cellar() {
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
      getBottles();
  }, []);

  return (
      <div className="flex flex-col gap-2">
          {loading ? (
              <p>Loading...</p>
          ) : (
              <ul>
                  {bottles.map((el) => (
                      // <li key={bottle.id}>{bottle.name} - {bottle.description}</li>
                      
                      <li key={el.bottle.id}>
                          {/* <Link to={`/product/${bottle.id}`}> */}
                          <ProductCard bottle={el.bottle} />
                          {/* </Link> */}
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
}

