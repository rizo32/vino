import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faStarHalf,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ note }) => {
    const stars = [];
    const maxStars = 5;

    // Calcule le nombre d'étoiles entières à afficher
    const fullStars = Math.floor(note / 20);

    // Calcule le nombre de demi-étoiles à afficher
    const hasHalfStar = note % 20 >= 10;

    // Ajoute les étoiles entières
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }

    // Ajoute la demi-étoile si nécessaire
    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key="half" icon={faStarHalfStroke} />);
    }

    // Ajoute les étoiles vides pour atteindre le maximum
    while (stars.length < maxStars) {
        stars.push(
            <FontAwesomeIcon key={stars.length} icon={faStar} opacity="0.3" />
        );
    }

    return <div>{stars}</div>;
};
export default StarRating;
