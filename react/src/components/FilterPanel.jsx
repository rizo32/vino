import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// const element = <FontAwesomeIcon icon={faCheck} />

const FilterPanel = ({ filters, setFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [countries, setCountries] = useState([]);
    const [types, setTypes] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [checkedItems, setCheckedItems] = useState({ country: {}, type: {} });

    useEffect(() => {
        // Pour aller chercher les options de filtres
        axiosClient.get("/countries").then((response) => {
            setCountries(response.data);
        });
        axiosClient.get("/types").then((response) => {
            setTypes(response.data);
        });
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setOptionsVisible(true);
    };

    const uncheck = () => {
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
    };

    const handleFilterChange = (e, filterCategory) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [filterCategory]: {
                ...prevCheckedItems[filterCategory],
                [value]: isChecked,
            },
        }));

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
                newFilters[filterCategory] = prevFilters[filterCategory].filter(
                    (item) => item !== value
                );
            }

            return newFilters;
        });
        console.log(filters);
    };

    // faudrait voir avec les autres filres qu'on a mais je vais surement changer switch pour foreach
    const renderOptions = () => {
        switch (selectedCategory) {
            case "country":
                return countries.map((country, index) => (
                    <label
                        key={country.id}
                        className={`${
                            index !== countries.length - 1 ? "border-b-2" : ""
                        } leading-tight cursor-pointer flex justify-between mx-4 py-4`}
                    >
                        {country.name}
                        <input
                            type="checkbox"
                            className="hidden"
                            value={country.name}
                            checked={
                                checkedItems.country[country.name] || false
                            }
                            onChange={(e) => handleFilterChange(e, "country")}
                        />
                        <span
                            className={`inline-block w-5 h-5 border-2 rounded-full border-gray-300 ml-3 ${
                                checkedItems.country[country.name]
                                    ? "bg-red-900"
                                    : "bg-white"
                            }`}
                        >
                            {checkedItems.country[country.name] && (
                                // <FontAwesomeIcon icon="fa-solid fa-check" />
                                <span className="block w-3 h-3 rounded-full bg-white mx-auto mt-1"></span>
                            )}
                        </span>
                    </label>
                ));
            case "type":
                return types.map((type, index) => (
                    <label
                        key={type.id}
                        className={`${
                            index !== types.length - 1 ? "border-b-2" : ""
                        } leading-tight cursor-pointer flex justify-between mx-4 py-4`}
                    >
                        {type.name}
                        <input
                            type="checkbox"
                            className="mr-2"
                            value={type.name}
                            checked={checkedItems.type[type.name] || false}
                            onChange={(e) => handleFilterChange(e, "type")}
                        />
                    </label>
                ));
            default:
                return <div>Select an option</div>;
        }
    };

    const categoryIsActive = (category) => {
        return filters[category] && filters[category].length > 0;
    };

    return (
        <div
            className={`relative z-10 transition-all duration-200 ease-in-out overflow-hidden ${
                showCategories ? "max-h-[100px]" : "max-h-0"
            }`}
        >
            <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex justify-center items-center fixed bottom-32 right-12 h-16 w-16 text-white rounded-full bg-red-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
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
                <button
                    className={`${
                        categoryIsActive("country")
                            ? "text-white bg-red-900"
                            : "text-black bg-gray-200"
                    } px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-3 flex-shrink-0 w-[25%] max-w-[200px]`}
                    onClick={() => handleCategoryClick("country")}
                >
                    <div>icon</div>
                    <div>Country</div>
                </button>
                <button
                    className={`${
                        categoryIsActive("type")
                            ? "text-white bg-red-900"
                            : "text-black bg-gray-200"
                    } px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-3 flex-shrink-0 w-[25%] max-w-[200px]`}
                    onClick={() => handleCategoryClick("type")}
                >
                    <div>icon</div>
                    <div>Type</div>
                </button>
                <button
                    className={`${
                        categoryIsActive("ratings")
                            ? "text-white bg-red-900"
                            : "text-black bg-gray-200"
                    } px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-3 flex-shrink-0 w-[25%] max-w-[200px]`}
                    onClick={() => handleCategoryClick("ratings")}
                >
                    <div>icon</div>
                    <div>Ratings</div>
                </button>
                <button
                    className={`${
                        categoryIsActive("ratings")
                            ? "text-white bg-red-900"
                            : "text-black bg-gray-200"
                    } px-4 py-2 rounded-lg flex flex-col justify-center items-center gap-3 flex-shrink-0 w-[25%] max-w-[200px]`}
                >
                    <div>icon</div>
                    <div>bitch</div>
                </button>
            </div>
            {/* {selectedCategory && ( */}
            {/* la taille du navbar */}
            <div
                className={`fixed inset-0 bg-white p-8 top-16 transition-all duration-300 ease-in-out ${
                    optionsVisible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="options-list bg-red-50 rounded-lg py-4">
                    {renderOptions()}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => setOptionsVisible(false)}
                        className="btn btn-block mt-12 bg-red-900 rounded-md text-white h-12 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover w-10/12 mx-auto"
                    >
                        Confirmation
                    </button>
                    <div className="text-center absolute bottom-14 left-1/2 transform -translate-x-1/2 w-10/12">
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
