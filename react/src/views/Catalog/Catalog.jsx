import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
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

    // executer fonction
    useEffect(() => {
        getBottles();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="flex flex-col gap-2">
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
