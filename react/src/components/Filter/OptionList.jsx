import React from "react";
import Option from "./Option";

const OptionList = React.memo(({
    categories, // la liste des catégories de filtre
    selectedCategory, // la catégorie sélectionnée
    checkedItems, // la liste des éléments de filtre cochés
    handleFilterChange, // la fonction qui gère le changement de filtre
}) => {
    // récupère la catégorie courante
    const currentCategory = categories.find(
        (category) => category.internalName === selectedCategory
    );

    if (!currentCategory) {
        return null;
    }

    // Si aucune catégorie n'est sélectionnée, renvoie null
    return (
        
        // Affiche la liste des options de filtre
        <div className="options-list bg-red-50 rounded-lg py-4 h-2/3 xs-h:h-3/5 overflow-y-auto shadow-shadow-tiny-inset">
            {currentCategory.options.map((option, index) => (
                <Option
                    key={option.id}
                    option={option}
                    category={currentCategory}
                    checkedItems={checkedItems}
                    handleFilterChange={handleFilterChange}
                    index={index}
                    currentCategory={currentCategory}
                />
            ))}
        </div>
    );
});

export default React.memo(OptionList);
