import { useState, useEffect, useRef } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/Filter/FilterPanel";

export default function Catalog() {
    const { searchValue } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState();
    const [links, setLinks] = useState();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
    const sentinelRef = useRef();
    const [hasMoreResults, setHasMoreResults] = useState(true);

    const [filters, setFilters] = useState({
        type: [],
        country: [],
        ratings: [],
    });

    // Elodie
    // aller chercher les bouteilles dans la base de données et les mettre dans le state
    const getBottles = (bottleUpdt) => {
        setLoading(true); // à mettre en place (eg Gif)
        setScrollPosition(window.pageYOffset);
        const filterParams = new URLSearchParams();

        // Change la requête selon filtre country
        if (filters.country.length > 0) {
            filterParams.append("country", filters.country.join(","));
        }

        // Change la requête selon filtre type
        if (filters.type.length > 0) {
            filterParams.append("type", filters.type.join(","));
        }

        // Change la requête selon recherche
        if (searchValue) {
            filterParams.append("search", searchValue);
        }

        if (bottleUpdt) {
            const updatedBottles = bottles.map((bottle) => {
                if (bottle.id === bottleUpdt.id && !bottle.quantity) {
                    // Create a new object with the same properties as the current `bottle`, but with the additional `newProperty`
                    return {
                        ...bottle,
                        quantity: 1,
                    };
                } else if (bottle.id === bottleUpdt.id && bottle.quantity) {
                    return {
                        ...bottle,
                        quantity: bottle.quantity + 1,
                    };
                }
                // If the `bottle` is not the one we want to modify, return the original `bottle` object
                return bottle;
            });
            setBottles(updatedBottles);
            setLoading(false);
            return;
        }

        // GAB DEBUG
        console.log("Current page:", page);

        axiosClient
            .get(`/bottles?${filterParams.toString()}&page=${page}`)
            .then(({ data }) => {
                setBottles([...bottles, ...data.data]);
                setMeta(data.meta);
                setLinks(data.links);
                setPage(data.meta.current_page + 1);

                // GAB DEBUG
                if (data.meta.current_page < data.meta.last_page) {
                    setPage(data.meta.current_page + 1);
                    setHasMoreResults(true);
                } else {
                    setHasMoreResults(false);
                }
                setPage(data.meta.current_page + 1);
                setHasMoreResults(data.meta.current_page < data.meta.last_page);
                console.log('Current page:', data.meta);

                setLoading(false);
            })
            .catch((error) => {
                console.error(error.response);
                setLoading(false);
            });
    };

    //lorsque le sentinel entre en vue, charger la prochaine page
    const handleIntersection = (entries) => {
        if (entries[0].isIntersecting) {
            // if (entries[0].isIntersecting && hasMoreResults) {
            getBottles();
        }
    };

    // Fetch bouteille seulement lors de la recherche
    useEffect(() => {
        if ((searchValue || filters.type.length > 0 || filters.country.length > 0) && hasMoreResults) {

            setPage(1); // Devrait reset la page à 1 à chaque changement de searchValue mais ne semble pas fonctionner...
            console.log('page ', page);
        getBottles();
        } else {
            setBottles([]);
        }
    }, [filters, searchValue]);

    //sentinel observer pour la pagination scroll
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, [sentinelRef.current]);

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [bottles]);

    return (
        <div className="flex flex-col gap-2 mb-[100px]" ref={containerRef}>
            {/* Désactivation du filtre dans le catalogue avant l'implantation d'une liste d'achat qui justifierait une recherche plus appronfondie */}
            {/* <FilterPanel filters={filters} setFilters={setFilters} /> */}

            {/* Loading state n'est pas nécéssaire dans l'état actuel des choses mais pourrait le devenir */}
            {/* {loading ? (
                <p>Chargement...</p>
            ) : ( */}
            <ul className="flex flex-col gap-2">
                {bottles.map((bottle) => (
                    <li key={bottle.id}>
                        <ProductCard bottle={bottle} getBottles={getBottles} />
                    </li>
                ))}
                {/* <div ref={(el) => (sentinelRef.current = el)}>test</div> */}
            </ul>
            {/* )} */}
        </div>
    );
}
