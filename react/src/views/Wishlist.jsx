import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import FilterPanel from "../components/Filter/FilterPanel";

export default function Wishlist() {
  const { searchValue, searchBarOpen } = useStateContext();
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onPage, setOnPage] = useState();
  const [total, setTotal] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const sentinelRef = useRef();

  // initialiser les filtres
  const [filters, setFilters] = useState({
    type: [],
    country: [],
  });

  const [oldFilters, setOldFilters] = useState();
  const [oldSearch, setOldSearch] = useState();

  // aller chercher les bouteilles favorites de l'usager dans la base de données et les mettre dans le state
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
            quantity: bottle.quantity,
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
      .get(`/wishlist?${filterParams.toString()}&page=${page}`)
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

  // suppression de la page de favoris
  const handleRemoveFromWishlist = (bottleId) => {
    getBottles(null, { bottle: { id: bottleId } });
    setTotal((prevTotal) => prevTotal - 1);
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
      <p className="mt-20"></p>
      <div className="h-16 bg-red-900 flex justify-center items-center text-white">
        <p className="text-xl">VOS FAVORIS</p>
      </div>
      {total && total !== 1 && !loading ? (
        <p className="ml-2 mb-1 mt-4">{total} résultats</p>
      ) : total === 1 && !loading ? (
        <span className="ml-2 mb-1 mt-4">1 résultat</span>
      ) : total === 0 && searchValue && !loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 w-full">
          <div className="mt-6">
            Aucun résultats, modifier vos filtres
            <br />
            ou effectuez une nouvelle recherche
          </div>
        </div>
      ) : null}
      {loading ? (
        <p className="ml-2 mb-1 mt-4">Chargement...</p>
      ) : (
        <ul className="flex flex-col gap-2 transition-all duration-200 ease-in-out">
          {bottles.map((bottle) => (
            <li key={bottle.id}>
              <ProductCard
                bottle={bottle.bottle}
                onRemoveFromWishlist={handleRemoveFromWishlist}
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

          {bottles.length == 0 && searchValue == "" ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 w-full">
              <div className="mt-6">Votre liste de favoris semble vide...</div>
              <div className="mt-3">
                Ajoutez vos bouteilles à l'aide
                <br />
                du "+" ci-dessous
              </div>
            </div>
          ) : null}
        </ul>
      )}
    </div>
  );
}
