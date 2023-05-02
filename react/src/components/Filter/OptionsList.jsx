import React from "react";
import Option from "./Option";

const OptionsList = React.memo(({
    categories,
    selectedCategory,
    checkedItems,
    handleFilterChange,
}) => {
    const currentCategory = categories.find(
        (category) => category.internalName === selectedCategory
    );

    if (!currentCategory) {
        return null;
    }

    return (
        <div className="options-list bg-red-50 rounded-lg py-4 h-3/4 xs-h:h-2/3 overflow-y-auto shadow-shadow-tiny-inset">
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

export default React.memo(OptionsList);
