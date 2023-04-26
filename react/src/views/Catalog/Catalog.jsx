import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import TextOnImage from "../../components/TextOnImage/TextOnImage";
import img from "./img/white-wine.webp";
import "./style/catalog.css";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function Catalog() {
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    // Elodie
    // aller chercher les bouteilles dans la base de données et les mettre dans le state
    const getBottles = () => {
        setLoading(true); // à mettre en place (eg Gif)
        axiosClient
            .get("/bottles")
            .then(({ data }) => {
                //console.log(data);
                setBottles(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.response);
                setLoading(false);
            });
    };
    //  ----
    // executer fonction
    useEffect(() => {
        getBottles();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {/* <TextOnImage
                text="Vins blancs"
                imagePath={img}
                alt="vins blancs"
                objectTop="object-top-20"
                contrast="contrast-120"
                saturation="saturation-70"
                brightness="brightness-90"
            /> */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {bottles.map((bottle) => (
                        <li key={bottle.id}>
                            <ProductCard
                                bottle={bottle}
                                setBottles={setBottles}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
