import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/Filter/FilterPanel";

export default function Catalog() {
    const { searchValue } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState({
        type: [],
        country: [],
        ratings: [],
    });

    // Elodie
    // aller chercher les bouteilles dans la base de données et les mettre dans le state
    const getBottles = () => {
        setLoading(true); // à mettre en place (eg Gif)

        console.log(filters);
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
            .get(`/bottles?${filterParams.toString()}`)
            .then(({ data }) => {
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
    }, [filters, searchValue]);

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
                                bottle={bottle}
                                getBottles={getBottles}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
