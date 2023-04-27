import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/FilterPanel";

// Elodie
export default function Cellar() {
    const { searchValue } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        country: [],
        type: [],
        ratings: [],
    });

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

    // const filteredBottles = !searchValue
    //     ? bottles
    //     : bottles.filter((cellarBottle) => {
    //           return (
    //               cellarBottle.bottle.name &&
    //               cellarBottle.bottle.name
    //                   .toLowerCase()
    //                   .includes(searchValue.toLowerCase())
    //           );
    //       });

    const filteredBottles = bottles.filter((cellarBottle) => {
        const bottle = cellarBottle.bottle;
        const nameMatch =
            !searchValue ||
            (bottle.name &&
                bottle.name.toLowerCase().includes(searchValue.toLowerCase()));
        const countryMatch =
            filters.country.length === 0 ||
            filters.country.includes(bottle.country_name);
        // const typeMatch =
        //     filters.type.length === 0 || filters.type.includes(bottle.type.types);
        // const ratingsMatch =
        //     filters.ratings.length === 0 ||
        //     filters.ratings.includes(bottle.rating);

        // return nameMatch && countryMatch && typeMatch && ratingsMatch;
        return nameMatch && countryMatch;
    });

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

    return (
        <div className="flex flex-col gap-2">
            <FilterPanel filters={filters} setFilters={setFilters} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {filteredBottles.map((bottle) => (
                        <li key={bottle.id}>
                            <ProductCard
                                bottle={bottle.bottle}
                                quantity={bottle.quantity}
                                removeFromCellar={removeFromCellar}
                                cellarHasBottleId={bottle.id}
                            />
                            {/* mettre en place le comportement swipe */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
