import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import "./style/EditQuantityModal.css";

export default function ({ cellarId, bottleId, quantity, handleClose, removeFromCellar, cellarHasBottleId }) {
    const [count, setCount] = useState(quantity);
    const [deleteBottles, setDeleteBottles] = useState(false);

    const handleDeleteBottles = () => {
        if(deleteBottles){
            setDeleteBottles(false);
        }else if(!deleteBottles){
            setDeleteBottles(true);
        }
    }

    const removeAll = () => {
        removeFromCellar(cellarHasBottleId);
        handleClose();
    }


    function incrementCount() {
        setCount(count + 1);
    }

    function decrementCount() {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return (
        <div className="flex edit-modal items-center justify-center">
            <span className="close-btn" onClick={handleClose}>
                x
            </span>
            <article className="container flex flex-col flex-nowrap absolute place-content-center w-fit">
                <div className="flex flex-row flex-nowrap w-fit mx-auto">
                    <div
                        className="increment-btn border-solid border-2 rounded border-red-900 h-10 w-10 m-2"
                        onClick={decrementCount}
                    >
                        <span className="text-red-900">-</span>
                    </div>
                    <input
                        type="number"
                        className="quantity h-10 border-solid border-2 rounded border-red-900 m-2 bg-transparent text-red-900 text-center"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    />
                    <div
                        className="increment-btn border-solid border-2 rounded border-red-900 h-10 w-10 m-2"
                        onClick={incrementCount}
                    >
                        <span className="text-red-900">+</span>
                    </div>
                </div>
                { !deleteBottles ?
                <div className="flex flex-row flex-nowrap w-full mx-auto">
                    <button className="rounded p-2 bg-red-900 w-1/2 m-2 text-white" onClick={handleDeleteBottles}>supprimer tout</button>
                    <button className="rounded p-2 bg-transparent w-1/2 m-2 text-red-900 border-solid border-2 border-red-900">sauvegarder</button>
                </div>
                : null
                }
                {deleteBottles ?
                    <div className="flex flex-row flex-nowrap w-full mx-auto">
                    <button className="rounded p-2 bg-red-900 w-[80%] m-2 text-white" onClick={removeAll}>oui, supprimer de mon cellier</button>
                    <button className="rounded p-2 bg-transparent m-2 text-red-900 border-solid border-2 border-red-900" onClick={handleDeleteBottles}>x</button>
                </div>
                : null
                }
            </article>
        </div>
    );
}
