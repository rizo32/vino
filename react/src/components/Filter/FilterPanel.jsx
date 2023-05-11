import { useState, useEffect, useMemo, useCallback } from "react";
import axiosClient from "../../axios-client";
import OptionsList from "./OptionsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEarthAmericas,
    faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";

const FilterPanel = ({ filters, setFilters, onClearFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    // const [countries, setCountries] = useState([]);
    // const [types, setTypes] = useState([]);
    // const { showCategories, setShowCategories } = useStateContext();
    const [optionsVisible, setOptionsVisible] = useState(false);
    const { searchBarOpen, setSearchBarOpen } = useStateContext();
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const anyCategoryIsActive = () => {
        return Object.keys(filters).some(
            (category) => filters[category].length > 0
        );
    };
    const [tempFilters, setTempFilters] = useState(filters);

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

    const applyFilters = () => {
        setFilters(tempFilters);
        setOptionsVisible(false);
    };

    const [checkedItems, setCheckedItems] = useState({
        [CATEGORIES.type.internalName]: {},
        [CATEGORIES.country.internalName]: {},
    });

    useEffect(() => {
        fetchFilteredCountries();
        fetchFilteredTypes();
    }, [filters]);

    useEffect(() => {
        if (!optionsVisible) {
            // Reset tempFilters to the current filters
            setTempFilters(filters);
    
            // Reset checkedItems based on the current filters
            const newCheckedItems = {
                [CATEGORIES.type.internalName]: {},
                [CATEGORIES.country.internalName]: {},
            };
    
            for (const category in filters) {
                for (const filterValue of filters[category]) {
                    newCheckedItems[category][filterValue] = true;
                }
            }
    
            setCheckedItems(newCheckedItems);
        }
    }, [optionsVisible, filters]);

    const fetchFilteredCountries = async () => {
        const response = await axiosClient.post("/countries", {
            filters,
        });
        setFilteredCountries(response.data);
    };
    const fetchFilteredTypes = async () => {
        const response = await axiosClient.post("/types", {
            filters,
        });
        setFilteredTypes(response.data);
    };

    // Définition des catégories
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
        // ajouter d'autres catégories ici si nécessaire
    ];

    // Fetch les icones des catégories
    const getCategoryIcon = (internalName) => {
        if (CATEGORIES.hasOwnProperty(internalName)) {
            return CATEGORIES[internalName].icon;
        }
        return null;
    };

    // useMemo = Évite de refaire le fetch des filtres si pas nécéssaire
    const categories = useMemo(
        () => getCategories(filteredCountries, filteredTypes),
        [filteredCountries, filteredTypes]
    );

    // Ouvre la page des options
    const handleCategoryClick = useCallback((category) => {
        setSelectedCategory(category);
        setOptionsVisible(true);
    }, []);

    // supprime tous les filtres en cours
    const clearAllFilters = useCallback(() => {
        // Clear filters for all categories
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
            setFilters((prevFilters) => {
                const newFilters = { ...prevFilters };
                newFilters[selectedCategory] = [];
                return newFilters;
            });

            // Update the UI
            setCheckedItems((prevCheckedItems) => {
                const newCheckedItems = { ...prevCheckedItems };
                newCheckedItems[selectedCategory] = {};
                return newCheckedItems;
            });
        }
    }, [selectedCategory, setFilters]);

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

    // Defini si la catégorie de filtre est active (pour colorer)
    const categoryIsActive = (category) => {
        return filters[category] && filters[category].length > 0;
    };

    return (
        <div
            className={`${
                searchBarOpen ? "pt-2" : "pt-6"
            } z-20 w-full fixed transition-all duration-200 ease-in-out overflow-hidden max-h-[100px] bg-white shadow-shadow-tiny pt-6 pb-0`}
        >
            {/* Liste des catégories de filtre */}
            <div
                className="overflow-x-auto scrollbar-hide left-0 top-full flex gap-4 px-2 mb-4 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 visible"
            >
                <button
                    className={`${
                        anyCategoryIsActive() ? "" : "hidden"
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
                {categories.map((category) => (
                    <button
                        key={category.internalName}
                        className={`${
                            categoryIsActive(category.internalName)
                                ? "text-white bg-red-900 shadow-shadow-tiny"
                                : "text-black"
                        } px-6 py-2 rounded-3xl flex justify-center items-center gap-3 flex-shrink-0 border border-black hover:text-white active:text-white hover:bg-red-900 active:bg-red-900`}
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

            {/* Page d'options */}
            <div
                className={`fixed inset-0 bg-white p-8 top-16 transition-all duration-300 ease-in-out z-20 ${
                    optionsVisible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between px-2 pb-1">
                    <h1 className="text-lg font-bold">Filtres</h1>
                    <button
                        className="text-gray-700 z-10"
                        onClick={() => {
                            setOptionsVisible(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <OptionsList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    checkedItems={checkedItems}
                    handleFilterChange={handleFilterChange}
                />
                <div className="flex flex-col justify-center">
                    <button
                        onClick={applyFilters}
                        className="btn btn-block mt-6 bg-red-900 rounded-md text-white h-12 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover w-10/12 mx-auto"
                    >
                        Confirmation
                    </button>
                    <div className="text-center mt-6 underline">
                        <p
                            className="cursor-pointer underline"
                            onClick={clearSelectedFilters}
                        >
                            Retirer les filtres
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
