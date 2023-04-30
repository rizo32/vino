import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


const Option = React.memo(({ option, category, checkedItems, handleFilterChange, index, currentCategory }) => {
    return (
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
                checked={checkedItems[category.internalName][option.id] || false}
                onChange={(e) => handleFilterChange(e, category.internalName)}
            />
            <span
                className={`flex justify-center items-center inline-block w-5 h-5 rounded-full ml-3 ${
                    checkedItems[category.internalName][option.id]
                        ? "bg-red-900"
                        : "bg-white border-2 border-gray-400"
                }`}
            >
                {checkedItems[category.internalName][option.id] && (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white text-sm"
                    />
                )}
            </span>
        </label>
    );
});

export default React.memo(Option);
