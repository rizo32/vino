import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/Filter/FilterPanel";

export default function Cellar() {
    const { searchValue, searchBarOpen } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onPage, setOnPage] = useState();
    const [total, setTotal] = useState();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
    const sentinelRef = useRef();

    // aller chercher les bouteilles du cellier de l'usager dans la base de données et les mettre dans le state
    const getBottles = (dataUpdt, bottleRmv) => {
        setLoading(true);
        //sauvegarder la position avant de fetch les prochaines bouteilles
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

        // si on ajoute la bouteille au cellier, refleter la nouvelle quantite sans devoir fetch toutes les bouteilles a nouveau
        if (dataUpdt) {
            const updatedBottles = bottles.map((bottle) => {
                if (bottle.bottle.id === dataUpdt.bottle.id) {
                    // ajouter la propriete quantite sans recharger toutes les bouteilles
                    return {
                        ...bottle,
                        quantity: dataUpdt.quantity,
                    };
                }
                // garder meme bouteille et proprietes si rien change
                return bottle;
            });
            setBottles(updatedBottles);
            setLoading(false);
            //arreter la fonction
            return;
        } else if (bottleRmv) {
            const updatedBottles = bottles.filter(
                (bottle) => bottle.bottle.id != bottleRmv.bottle.id
            );
            setBottles(updatedBottles);
            setLoading(false);
            //arreter la fonction
            return;
        }

        //verifier si une recherche a ete effectuee ou un filre choisi/enlever pour repartir a page 1 et enlever les anciens resultats
        if (oldFilters != filters || oldSearch != searchValue) {
            setPage(1);
            setScrollPosition(0);
        } else {
            //si on est encore avec les memes filtres et recherche, ca veut dire qu'on scroll vers la nouvelle page donc on augmente le compte vers la prochaine page
            setPage(page + 1);
        }

        axiosClient
            .get(`/cellarHasBottles?${filterParams.toString()}&page=${page}`)
            .then(({ data }) => {
                if (page == 1) {
                    //si on est a la page 1, on veut repartir a neuf et enlever les autres resultats de la page
                    setBottles(data.data);
                } else {
                    //si on va vers la prochaine page, on veut seulement ajouter les resultats a ceux qui sont deja la
                    setBottles([...bottles, ...data.data]);
                }
                //sauvegarder le compte de resultats presents sur la page
                setOnPage(data.meta.to);
                //sauvegarder le nombre de resultats total
                setTotal(data.meta.total);
                setLoading(false);
                //mettre a jour les filtres et recherche 'anciens' pour faire la comparaison dans la prochaine loop
                setOldFilters(filters);
                setOldSearch(searchValue);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    // vider les filtres
    const handleClearFilters = () => {
        setFilters({
            type: [],
            country: [],
        });
    };

    //lorsque le sentinel entre en vue, charger la prochaine page
    const handleIntersection = (entries) => {
        //declencher le fetch seulement si les resultats sont plus grand que 10 (prochaine page existe) et seulement si nous ne sommes pas a la derniere page
        if (
            entries[0].isIntersecting &&
            !(onPage % 10) &&
            total > 10 &&
            onPage != total
        ) {
            getBottles();
        }
    };

    // initialiser les filtres
    const [filters, setFilters] = useState({
        type: [],
        country: [],
    });

    const [oldFilters, setOldFilters] = useState();
    const [oldSearch, setOldSearch] = useState();

    //retirer la bouteille du cellier de l'usager
    const removeFromCellar = (id) => {
        axiosClient
            .delete(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/cellarHasBottles/${id}`
            )
            .then(({ data }) => {
                getBottles(false, data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    // modifier quantite bouteille
    const updateBottleQty = (id, dataUpdt) => {
        axiosClient
            .put(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/cellarHasBottles/${id}`,
                dataUpdt
            )
            .then(({ data }) => {
                getBottles(data.data, false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //executer la fonction
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

        //s'assurer que la ref existe
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, [sentinelRef.current]);

    //lorsque que le state bottles est mis a jour, on scroll a la position sauvegardée
    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [bottles]);

    return (
        <div className="flex flex-col">
            <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onClearFilters={handleClearFilters}
            />
            {total && total != 1 && searchValue ? (
                <p className="ml-2 mb-1 mt-4">{total} résultats</p>
            ) : total == 1 && searchValue ? (
                <span className="ml-2 mb-1 mt-4">1 résultat</span>
            ) : total == 0 && searchValue ? (
                <div className="flex flex-col h-[80vh] place-content-center text-center text-gray-500">
                    <div className="mx-auto">
                        Aucun résultats, modifier vos filtres
                        <br />
                        ou effectuez une nouvelle recherche
                    </div>
                </div>
            ) : null}
            {loading ? (
                <p className="ml-2 mb-1 mt-4">Chargement...</p>
            ) : (
                <ul
                    className={`${
                        searchBarOpen ? "mt-23" : "mt-23"
                    } flex flex-col gap-2 transition-all duration-200 ease-in-out`}
                >
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

                    <div
                        ref={(el) => (sentinelRef.current = el)}
                        id="sentinel"
                        className="opacity-0"
                    >
                        sentinel
                    </div>

                    {bottles.length == 0 && searchValue == "" ? (
                        <div className="flex flex-col h-[70vh] place-content-center text-center text-gray-500">
                            <div className="mx-auto">
                                Votre cellier semble vide...
                            </div>
                            <div className="mx-auto mt-2">
                                Ajoutez vos bouteilles à l'aide
                                <br />
                                du "+" dans la barre de navigation
                            </div>
                        </div>
                    ) : null}
                </ul>
            )}
        </div>
    );
}
