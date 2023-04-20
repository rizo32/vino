import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import TextOnImage from "../../components/TextOnImage/TextOnImage";
import img from "./img/white-wine.webp";
import "./style/catalog.css";
import axios from "axios";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import axiosClient from "../../axios-client";
>>>>>>> upstream/dev

export default function Catalog() {
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);

<<<<<<< HEAD
    const getBottles = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/bottles"
            );
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchBottles = async () => {
            const data = await getBottles();
            setBottles(data.data);
            setLoading(false);
        };

        fetchBottles();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <TextOnImage
                text="Vins blancs"
                imagePath={img}
                alt="vins blancs"
                objectTop="object-top-20"
                contrast="contrast-120"
                saturation="saturation-70"
                brightness="brightness-90"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {bottles.map((bottle) => (
                        // <li key={bottle.id}>{bottle.name} - {bottle.description}</li>
                        <li key={bottle.id}>
                            <Link to={`/product/${bottle.id}`}>
                                <ProductCard bottle={bottle} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
=======
  // const getBottles = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/bottles");
  //     console.log(response);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchBottles = async () => {
  //     const data = await getBottles();
  //     console.log(data);
  //     setBottles(data.data);
  //     setLoading(false);
  //   };

  //   fetchBottles();
  // }, []);
  
  const getBottles = () => {
    setLoading(true);
    axiosClient
      .get("/bottles")
      .then(({ data }) => {
        console.log(data);
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
      <TextOnImage
        text="Vins blancs"
        imagePath={img}
        alt="vins blancs"
        objectTop="object-top-20"
        contrast="contrast-120"
        saturation="saturation-70"
        brightness="brightness-90"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {bottles.map((bottle) => (
            // <li key={bottle.id}>{bottle.name} - {bottle.description}</li>
            <li key={bottle.id}>
              {/* <Link to={`/product/${bottle.id}`}> */}
              <ProductCard bottle={bottle} />
              {/* </Link> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
>>>>>>> upstream/dev
}
