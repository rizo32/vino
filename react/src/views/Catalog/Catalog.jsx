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

        if(bottleUpdt){
            const updatedBottles = bottles.map(bottle => {
                if (bottle.id === bottleUpdt.id && !bottle.quantity) {
                  // Create a new object with the same properties as the current `bottle`, but with the additional `newProperty`
                  return {
                    ...bottle,
                    quantity: 1
                  };
                }else if (bottle.id === bottleUpdt.id && bottle.quantity) {
                    return {
                        ...bottle,
                        quantity: bottle.quantity + 1
                      };
                }
                // If the `bottle` is not the one we want to modify, return the original `bottle` object
                return bottle;
            });
            setBottles(updatedBottles);
            setLoading(false);
            return;
        }

        axiosClient
            .get(`/bottles?${filterParams.toString()}&page=${page}`)
            .then(({ data }) => {
                setBottles([...bottles, ...data.data]);
                setMeta(data.meta);
                setLinks(data.links);
                setPage(data.meta.current_page + 1);
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
            getBottles();
        }
    };

    // executer fonction
    useEffect(() => {
        getBottles();
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
                    <div ref={(el) => (sentinelRef.current = el)}>test</div>
                </ul>
            )}
        </div>
    );
}
