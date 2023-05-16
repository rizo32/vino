import { useState, useEffect, useMemo, useCallback, useLocation } from "react";
import axiosClient from "../../axios-client";
import OptionPage from "./OptionPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEarthAmericas,
    faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";

const FilterPanel = ({ filters, setFilters, onClearFilters }) => {
    // visibilité de la page d'options
    const [optionsVisible, setOptionsVisible] = useState(false);

    // Categorie de filtre affiché dans la page d'options
    const [selectedCategory, setSelectedCategory] = useState(null);

    // visibilité de la barre de recherche
    const { searchBarOpen, setSearchBarOpen } = useStateContext();

    // pays pouvant être filtrés
    const [filteredCountries, setFilteredCountries] = useState([]);

    // types pouvant être filtrés
    const [filteredTypes, setFilteredTypes] = useState([]);

    // filtres en transition (sélectionné, pas confirmés)
    const [tempFilters, setTempFilters] = useState(filters);

    // state indiquant si un filtre est en place
    const anyCategoryIsActive = () => {
        return Object.keys(filters).some(
            (category) => filters[category].length > 0
        );
    };

    // confirmation de filtre
    const applyFilters = () => {
        setFilters(tempFilters);
        setOptionsVisible(false);
    };

    // objet des catégories de filtres pour définir label et icone
    const CATEGORIES = {
        type: {
            internalName: "type",
            displayName: "Couleur",
            icon: faWineBottle,
        },
        country: {
            internalName: "country",
            displayName: "Région",
            icon: faEarthAmericas,
        },
        // cepage: { internalName: "cepage", displayName: "Cépages", icon: faEarthAmericas }
    };

    // reinitialisation de l'interface de la page d'options
    const [checkedItems, setCheckedItems] = useState({
        [CATEGORIES.type.internalName]: {},
        [CATEGORIES.country.internalName]: {},
    });

    let source = location.pathname;

    // les options de filtres sont récupérés
    const fetchFilteredCountries = async () => {
        const response = await axiosClient.post(`/countries${ source }`, {
            filters,
        });
        setFilteredCountries(response.data);
    };
    const fetchFilteredTypes = async () => {
        const response = await axiosClient.post(`/types${ source }`, {
            filters,
        });
        setFilteredTypes(response.data);
    };

    // les filtres possibles sont mis à jour à chaque nouveau filtre appliqué
    useEffect(() => {
        fetchFilteredCountries();
        fetchFilteredTypes();
    }, [filters]);

    // l'interface graphique des filtres est mis à jour avec les filtres confirmés lors de la fermeture de la page de filtre
    useEffect(() => {
        if (!optionsVisible) {
            // reinit
            setTempFilters(filters);
            const newCheckedItems = {
                [CATEGORIES.type.internalName]: {},
                [CATEGORIES.country.internalName]: {},
            };
            // mise à jour
            for (const category in filters) {
                for (const filterValue of filters[category]) {
                    newCheckedItems[category][filterValue] = true;
                }
            }
            setCheckedItems(newCheckedItems);
        }
    }, [optionsVisible, filters]);

    // Mise à jour des catégories
    const getCategories = (filteredCountries, filteredTypes) => [
        {
            internalName: "type",
            displayName: CATEGORIES.type.displayName,
            options: filteredTypes,
        },
        {
            internalName: "country",
            displayName: CATEGORIES.country.displayName,
            options: filteredCountries,
        },
        // ajouter d'autres catégories ici si nécessaire (sprint 4...)
    ];

    // useMemo = Évite de refaire le fetch des filtres si pas nécéssaire
    const categories = useMemo(
        () => getCategories(filteredCountries, filteredTypes),
        [filteredCountries, filteredTypes]
    );

    // Fetch les icones des catégories
    const getCategoryIcon = (internalName) => {
        if (CATEGORIES.hasOwnProperty(internalName)) {
            return CATEGORIES[internalName].icon;
        }
        return null;
    };

    // Ouvre la page des options
    const handleCategoryClick = useCallback((category) => {
        setSelectedCategory(category);
        setOptionsVisible(true);
    }, []);

    // supprime tous les filtres en cours
    const clearAllFilters = useCallback(() => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            Object.keys(newFilters).forEach((category) => {
                newFilters[category] = [];
            });
            return newFilters;
        });

        // met à jour le UI
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems };
            Object.keys(newCheckedItems).forEach((category) => {
                newCheckedItems[category] = {};
            });
            return newCheckedItems;
        });

        setOptionsVisible(false);
        onClearFilters();
    }, [setFilters, onClearFilters]);

    const clearSelectedFilters = useCallback(() => {
        if (selectedCategory) {
            setTempFilters((prevFilters) => {
                const newFilters = { ...prevFilters };
                newFilters[selectedCategory] = [];
                return newFilters;
            });

            // met à jour le UI
            setCheckedItems((prevCheckedItems) => {
                const newCheckedItems = { ...prevCheckedItems };
                newCheckedItems[selectedCategory] = {};
                return newCheckedItems;
            });
        }
    }, [selectedCategory, setTempFilters]);

    // Nouveau fetch à chaque filtre
    const handleFilterChange = useCallback(
        (e, filterCategory) => {
            const value = e.target.value;
            const isChecked = e.target.checked;

            setTempFilters((prevFilters) => {
                const newFilters = { ...prevFilters };

                if (isChecked) {
                    // Ajoute le nouveau filtre à un tableau de filtres
                    newFilters[filterCategory] = [
                        ...prevFilters[filterCategory],
                        value,
                    ];
                } else {
                    // Enleve le filtre du tableau de filtre
                    newFilters[filterCategory] = prevFilters[
                        filterCategory
                    ].filter((item) => item !== value);
                }
                return newFilters;
            });

            // Mise à jour de l'interface
            setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [filterCategory]: {
                    ...prevCheckedItems[filterCategory],
                    [value]: isChecked,
                },
            }));
        },
        [setFilters]
    );

    // Defini si la catégorie de filtre est active (pour coloration)
    const categoryIsActive = (category) => {
        return filters[category] && filters[category].length > 0;
    };

    return (
        <div
            className={`${
                searchBarOpen ? "pt-2" : "pt-6"
            } z-20 w-full fixed transition-all duration-200 ease-in-out overflow-hidden max-h-[100px] bg-white shadow-shadow-tiny pt-6 pb-0`}
        >
            {/* Rangée des catégories de filtre */}
            <div className="overflow-x-auto scrollbar-hide left-0 top-full flex gap-4 px-2 mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 visible">
                {/* Annulation de tous les filtres */}
                <button
                    className={`${
                        anyCategoryIsActive() ? "" : "opacity-0"
                    } p-2 rounded-3xl flex justify-center items-center gap-3 flex-shrink-0 border border-black bg-red-900 text-white`}
                    onClick={clearAllFilters}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Catégories de filtre */}
                {categories.map((category) => (
                    <button
                        key={category.internalName}
                        className={`${
                            categoryIsActive(category.internalName)
                                ? "text-white bg-red-900 shadow-shadow-tiny"
                                : "text-black"
                        }  duration-200 ease-in-out px-6 py-2 rounded-3xl flex justify-center items-center gap-3 flex-shrink-0 border border-black hover:text-white active:text-white hover:bg-red-900 active:bg-red-900 ${!anyCategoryIsActive() ? "translate-x-[-58px]" : ""} `}
                        onClick={() =>
                            handleCategoryClick(category.internalName)
                        }
                    >
                        <div>{category.displayName}</div>
                        <FontAwesomeIcon
                            icon={getCategoryIcon(category.internalName)}
                        />
                    </button>
                ))}
            </div>
            <OptionPage
                categories={categories}
                selectedCategory={selectedCategory}
                checkedItems={checkedItems}
                handleFilterChange={handleFilterChange}
                applyFilters={applyFilters}
                clearSelectedFilters={clearSelectedFilters}
                optionsVisible={optionsVisible}
                setOptionsVisible={setOptionsVisible}
            />
        </div>
    );
};

export default FilterPanel;
