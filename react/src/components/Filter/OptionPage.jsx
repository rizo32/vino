import OptionsList from "./OptionsList";

const OptionPage = ({
    categories,
    selectedCategory,
    checkedItems,
    handleFilterChange,
    applyFilters,
    clearSelectedFilters,
    optionsVisible,
    setOptionsVisible
}) => {
    return (
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
    );
};

export default OptionPage;
