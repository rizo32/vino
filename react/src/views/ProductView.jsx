import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ProductView(props) {
    const location = useLocation();
    const data = location.state;
    console.log(data);

    // Récupère les informations de bottle passées depuis la page précédente
    const bottle = location.state.bottle;

    return (
        <div>
            <h1>Produit</h1>
            <h1>{bottle.name}</h1>
            <p>{bottle.description}</p>
            <img src={bottle.image} alt={bottle.name} />
        </div>
    );
}
