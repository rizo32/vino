import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import FilterPanel from "../../components/Filter/FilterPanel";
import BarcodeScanner from "../../components/BarcodeScanner/BarcodeScanner";

export default function Catalog() {
    const { searchValue } = useStateContext();
    const [bottles, setBottles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onPage, setOnPage] = useState();
    const [total, setTotal] = useState();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
    const sentinelRef = useRef();
    const [showMessage, setShowMessage] = useState(false);
    const [scanned, setScanned] = useState();
    const [scannedBottle, setScannedBottle] = useState();

    const [filters, setFilters] = useState({
        type: [],
        country: [],
    });

    const [oldFilters, setOldFilters] = useState();
    const [oldSearch, setOldSearch] = useState();

    // Elodie + Gabriel
    // aller chercher les bouteilles dans la base de données et les mettre dans le state
    const getBottles = (bottleUpdt) => {
        setScanned(false);
        setLoading(true); // à mettre en place (eg Gif)
        //sauvegarder la position avant de fetch les prochaines bouteilles
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

        // si on ajoute la bouteille au cellier, refleter la nouvelle quantite sans devoir fetch toutes les bouteilles a nouveau
        if (bottleUpdt) {
            const updatedBottles = bottles.map((bottle) => {
                if (bottle.id === bottleUpdt.id && !bottleUpdt.initialQty) {
                    // ajouter la propriete quantite sans recharger toutes les bouteilles
                    return {
                        ...bottle,
                        quantity: bottleUpdt.quantity,
                    };
                } else if (bottle.id === bottleUpdt.id && bottleUpdt.initialQty) {
                    //augmenter la quantite si elle existe
                    return {
                        ...bottle,
                        quantity: bottleUpdt.initialQty + bottleUpdt.quantity,
                    };
                }
                // garder meme bouteille et proprietes si rien change
                return bottle;
            });
            setBottles(updatedBottles);
            setLoading(false);
            setShowMessage(true);
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
            .get(`/bottles?${filterParams.toString()}&page=${page}`)
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
                console.error(error.response);
                setLoading(false);
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

    // Fetch bouteille seulement lors de la recherche
    useEffect(() => {
        if (
            searchValue ||
            filters.type.length > 0 ||
            filters.country.length > 0
        ) {
            getBottles();
        } else {
            setLoading(false);
        }
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

    // message de succes lorsque bouteille(s) est ajoute au cellier
    useEffect(() => {
        if (showMessage) {
          const timeoutId = setTimeout(() => {
            setShowMessage(false);
          }, 5000); // Message will disappear after 3 seconds
    
          return () => {
            clearTimeout(timeoutId);
          };
        }
    }, [showMessage]);

    //fonction lorsque le code barre est detecté
    const onNewScanResult = (decodedText, decodedResult) => {
        setScanned(decodedText);
        getScanBottle(decodedText);
    };

    //fetch la bouteille scannée si elle existe
    const getScanBottle = (code) => {
        axiosClient.get(`/bottleScan?code=${code}`)
        .then(({data}) => {
            if(data.data){
                addScanToCellar(data.data);
                data.data.quantity = data.data.quantity + 1;
            }
            setScannedBottle(data.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    //ajouter au cellier, fait pour apres le scan
    const addScanToCellar = (bottle) => {
        axiosClient
            .post(
                `/storeScanBottle`,
                bottle
            )
            .then(({ data }) => {
                setScannedBottle(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //reset pour enlever le resultat du scan
    const resetScan = () => {
        setScanned(false);
        setScannedBottle(false);
    }

    return (
        <div className="flex flex-col" ref={containerRef}>
            {searchValue || scanned ? null : (
                <div className="flex flex-col h-[76vh] place-content-center text-center text-gray-500">
                    <div className="mx-auto">
                        Utilisez la barre de recherche
                        <br />
                        pour trouver votre bouteille
                    </div>
                    <div className="mx-auto">- ou -</div>
                    <div className="mx-auto">scanner votre bouteille</div>
                    <BarcodeScanner
                        fps={10}
                        qrbox={250}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </div>
            )}
            {scanned && scannedBottle ? (
                <div className="flex flex-col h-[75vh] place-content-center text-center">
                    <div className="mx-auto mb-6">Résultats du scan :</div>
                    <div className="text-lime-600 mb-4">La bouteille a été ajoutée à votre cellier !</div>
                    <Link
                            to={`/product/${scannedBottle.id}`}
                            state={{ scannedBottle }}
                    >
                    <div className="mx-auto pb-4 flex flex-row w-fit place-content-center">
                        <img className="h-[100px] mr-3 mt-1" src={scannedBottle.image_url} alt={scannedBottle.name} />
                        <div className="inline-block flex flex-col text-start w-1/2">
                            <div className="mb-1">{scannedBottle.name}</div>
                            <div className="mb-1">{scannedBottle.format_name}</div>
                            <div className="font-bold">Quantité : {scannedBottle.quantity}</div>
                        </div>
                    </div>
                    </Link>
                    <div className="mx-auto cursor-pointer text-red-900 underline mt-3" onClick={resetScan}>
                        retour
                    </div>
                </div>
            )
            : scanned ? (
                <div className="flex flex-col h-[75vh] place-content-center text-center text-gray-500">
                    <div className="mx-auto">(UPC {scanned})</div>
                    <div className="mx-auto">
                        Cette bouteille n'est pas dans
                        <br />
                        notre système.
                    </div>
                    <div className="mx-auto cursor-pointer text-red-900 underline mt-3" onClick={resetScan}>
                        retour
                    </div>
                </div>
            )
            : null}
            {/* Loading state n'est pas nécéssaire dans l'état actuel des choses mais pourrait le devenir */}
            {loading ? (
                <p className="ml-2 mb-1 mt-4">Chargement...</p>
            ) : searchValue ? (
                <>
                    {total && total != 1 ? (
                        <p className="ml-2 mb-1 mt-4">{total} résultats</p>
                    ) : total == 1 ? (
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

                    <ul className="flex flex-col gap-2">
                        {bottles.map((bottle) => (
                            <li key={bottle.id}>
                                <ProductCard
                                    bottle={bottle}
                                    getBottles={getBottles}
                                />
                            </li>
                        ))}

                        <div
                            ref={(el) => (sentinelRef.current = el)}
                            id="sentinel"
                            className="opacity-0"
                        >
                            sentinel
                        </div>
                    </ul>
                </>
            ): null}
            { showMessage ?
                <div className="fixed bg-green-50 text-white-100 m-3 mt-5 p-3 rounded-md border-2 border-lime-500">Vos bouteilles ont bien été ajoutées à votre cellier.</div>
            :null}
        </div>
    );
}
