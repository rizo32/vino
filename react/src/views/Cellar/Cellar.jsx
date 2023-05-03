import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/Filter/FilterPanel";

// Elodie
export default function Cellar() {
    const { searchValue } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        type: [],
        country: [],
        ratings: [],
    });

    // aller chercher les bouteilles du cellier de l'usager dans la base de données et les mettre dans le state
    const getBottles = () => {
        setLoading(true);

        const filterParams = new URLSearchParams();

        // Change la requête selon recherche/filtre
        if (filters.country.length > 0) {
            filterParams.append("country", filters.country.join(","));
        }

        // Change la requête selon recherche/filtre
        if (filters.type.length > 0) {
            filterParams.append("type", filters.type.join(","));
        }

        if (searchValue) {
            filterParams.append("search", searchValue);
        }
        // autres filtres

        axiosClient
            .get(`/cellarHasBottles?${filterParams.toString()}`)
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
    }, [filters, searchValue]);

    //retirer la bouteille du cellier de l'usager
    const removeFromCellar = (id) => {
        axiosClient
            .delete(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/cellarHasBottles/${id}`
            )
            .then(() => {
                getBottles();
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    // modifier quantite bouteille
    const updateBottleQty = (id, data) => {
        axiosClient
            .put(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/cellarHasBottles/${id}`,
                data
            )
            .then(() => {
                getBottles();
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="flex flex-col gap-2">
            <FilterPanel filters={filters} setFilters={setFilters} />
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {bottles.map((bottle) => (
                        <li key={bottle.id}>
                            <ProductCard
                                bottle={bottle.bottle}
                                quantity={bottle.quantity}
                                removeFromCellar={removeFromCellar}
                                cellarHasBottleId={bottle.id}
                                updateBottleQty={updateBottleQty}
                            />
                            {/* mettre en place le comportement swipe */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
