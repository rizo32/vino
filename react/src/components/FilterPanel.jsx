import { useState, useEffect, useMemo, useCallback } from "react";
import axiosClient from "../axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const FilterPanel = ({ filters, setFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [countries, setCountries] = useState([]);
    const [types, setTypes] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [checkedItems, setCheckedItems] = useState({ country: {}, type: {} });
    const [isAtTop, setIsAtTop] = useState(true);

    // Vérifie si le scroll est en haut, pour changer le z-index du volet de filtre (pour enlever le box shadow du navbar)
    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.pageYOffset === 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fait défiler la fenêtre vers le haut
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Pour faire les deux fetchs en parallèles
    useEffect(() => {
        Promise.all([
            axiosClient.get("/countries"),
            axiosClient.get("/types"),
        ]).then(([countriesResponse, typesResponse]) => {
            setCountries(countriesResponse.data);
            setTypes(typesResponse.data);
        });
    }, []);

    // useMemo = Évite de refaire le fetch des filtres si pas nécéssaire
    const categories = useMemo(
        () => [
            { name: "country", options: countries },
            { name: "type", options: types },
            // ajouter d'autres catégories ici si nécessaire
        ],
        [countries, types]
    );

    const handleCategoryClick = useCallback((category) => {
        setSelectedCategory(category);
        setOptionsVisible(true);
    }, []);

    const uncheck = useCallback(() => {
        if (selectedCategory) {
            setFilters((prevFilters) => {
                const newFilters = { ...prevFilters };
                newFilters[selectedCategory] = [];
                return newFilters;
            });
        }
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems };
            newCheckedItems[selectedCategory] = {};
            return newCheckedItems;
        });
        setOptionsVisible(false);
    }, [selectedCategory, setFilters]);

    const handleFilterChange = useCallback(
        (e, filterCategory) => {
            const value = e.target.value;
            const isChecked = e.target.checked;

            setFilters((prevFilters) => {
                const newFilters = { ...prevFilters };

                if (isChecked) {
                    // Add the value to the filter category if it's checked
                    newFilters[filterCategory] = [
                        ...prevFilters[filterCategory],
                        value,
                    ];
                } else {
                    // Remove the value from the filter category if it's unchecked
                    newFilters[filterCategory] = prevFilters[
                        filterCategory
                    ].filter((item) => item !== value);
                }

                return newFilters;
            });

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

    const renderOptions = () => {
        const currentCategory = categories.find(
            (category) => category.name === selectedCategory
        );

        if (!currentCategory) {
            return <div>Select an option</div>;
        }

        return currentCategory.options.map((option, index) => (
            <label
                key={option.id}
                className={`${
                    index !== currentCategory.options.length - 1
                        ? "border-b-2 border-gray-300"
                        : ""
                } leading-tight cursor-pointer flex justify-between mx-4 py-4`}
            >
                {option.name}
                <input
                    type="checkbox"
                    className="hidden"
                    value={option.id}
                    checked={
                        checkedItems[currentCategory.name][option.id] || false
                    }
                    onChange={(e) =>
                        handleFilterChange(e, currentCategory.name)
                    }
                />
                <span
                    className={`flex justify-center items-center inline-block w-5 h-5 rounded-full ml-3 ${
                        checkedItems[currentCategory.name][option.id]
                            ? "bg-red-900"
                            : "bg-white border-2 border-gray-400"
                    }`}
                >
                    {checkedItems[currentCategory.name][option.id] && (
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="text-white text-sm"
                        />
                    )}
                </span>
            </label>
        ));
    };
    const categoryIsActive = (category) => {
        return filters[category] && filters[category].length > 0;
    };

    return (
        <div
            /* List des catégories de filtre */
            className={` ${
                isAtTop ? "z-20" : "z-10"
            } relative transition-all duration-200 ease-in-out overflow-hidden shadow-shadow-tiny bg-white ${
                showCategories ? "max-h-[100px]" : "max-h-0"
            }`}
        >
            <button
                onClick={() => {
                    setShowCategories(true);
                    scrollToTop();
                }}
                className="flex justify-center items-center fixed bottom-32 right-12 h-16 w-16 text-white rounded-full bg-red-900 shadow-shadow-tiny hover:shadow-none hover:bg-red-hover active:bg-red-hover active:shadow-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                </svg>
            </button>

            <div
                className={`relative overflow-x-auto scrollbar-hide left-0 top-full flex gap-4 p-2 transition-all duration-300 ease-in-out transform ${
                    showCategories
                        ? "translate-y-0 opacity-100 visible bg-white"
                        : "-translate-y-full opacity-0 invisible"
                }`}
            >
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className={`${
                            categoryIsActive(category.name)
                                ? "text-white bg-red-900 shadow-shadow-tiny"
                                : "text-black bg-gray-200 shadow-shadow-tiny-inset"
                        } px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-3 flex-shrink-0 w-[25%] max-w-[200px] shadow-shadow-tiny-inset hover:text-white active:text-white hover:bg-red-900 active:bg-red-900`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <div>icon</div>
                        <div>{category.name}</div>
                    </button>
                ))}
            </div>

            {/* {selectedCategory && ( */}
            {/* la taille du navbar */}
            <div
                className={`fixed inset-0 bg-white p-8 top-16 transition-all duration-300 ease-in-out ${
                    optionsVisible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <h1 className="text-lg font-bold">Filtres</h1>
                <div className="options-list bg-red-50 rounded-lg py-4 h-3/4 xs-h:h-2/3 overflow-y-auto shadow-shadow-tiny-inset">
                    {renderOptions()}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => setOptionsVisible(false)}
                        // className="btn btn-block mt-12 bg-red-900 rounded-md text-white h-12 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover w-10/12 mx-auto"
                        className="btn btn-block bottom-32 left-1/2 transform absolute -translate-x-1/2 bg-red-900 rounded-md text-white h-12 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover   active:bg-red-hover active:shadow-none w-10/12"
                    >
                        Confirmation
                    </button>
                    <div className="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10/12">
                        <p className="cursor-pointer" onClick={uncheck}>
                            {"<"} Retirer les filtres
                        </p>
                    </div>
                </div>
            </div>
            {/* )} */}
        </div>
    );
};

export default FilterPanel;
