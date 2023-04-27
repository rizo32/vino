import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import "./style/EditQuantityModal.css";

export default function ({ cellarId, bottleId, quantity, handleClose }) {
    const [count, setCount] = useState(quantity);

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
            <span className="close-btn text-color" onClick={handleClose}>
                x
            </span>
            <article className="container flex absolute place-content-center">
                <div className="increment-btn border-solid border-2 rounded border-rose-900 h-10 w-10 m-2" onClick={decrementCount}>
                    <span className="text-rose-900">-</span>
                </div>
                <input
                    type="number"
                    className="quantity h-10 border-solid border-2 rounded border-rose-900 m-2 bg-transparent text-rose-900 text-center"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                />
                <div className="increment-btn border-solid border-2 rounded border-rose-900 h-10 w-10 m-2" onClick={incrementCount}>
                    <span className="text-rose-900">+</span>
                </div>
            </article>
        </div>
    );
}
