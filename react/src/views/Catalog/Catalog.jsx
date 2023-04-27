import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/FilterPanel";

export default function Catalog() {
    const { searchValue } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        country: [],
        type: [],
        ratings: [],
    });

    // Elodie
    // aller chercher les bouteilles dans la base de données et les mettre dans le state
    const getBottles = () => {
        setLoading(true); // à mettre en place (eg Gif)

        const filterParams = new URLSearchParams();

        if (filters.country.length > 0) {
            filterParams.append("country", filters.country.join(","));
        }

        if (searchValue) {
            filterParams.append("search", searchValue);
        }
        // autres filtres


        axiosClient
            .get(`/bottles?${filterParams.toString()}`)
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
    }, [filters, searchValue]);

    // const filteredBottles = !searchValue
    //     ? bottles
    //     : bottles.filter((bottle) => {
    //           return (
    //               bottle.name &&
    //               bottle.name.toLowerCase().includes(searchValue.toLowerCase())
    //           );
    //       });

    
    const filteredBottles = bottles.filter((bottle) => {
        const nameMatch =
            !searchValue ||
            (bottle.name &&
                bottle.name.toLowerCase().includes(searchValue.toLowerCase()));
        const countryMatch =
            filters.country.length === 0 ||
            filters.country.includes(bottle.country_name);
        // const typeMatch =
        //     filters.type.length === 0 || filters.type.includes(bottle.type);
        // const ratingsMatch =
        //     filters.ratings.length === 0 ||
        //     filters.ratings.includes(bottle.rating);

        // return nameMatch && countryMatch && typeMatch && ratingsMatch;
        // console.log(filters.country);
        return nameMatch && countryMatch;
    });

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
