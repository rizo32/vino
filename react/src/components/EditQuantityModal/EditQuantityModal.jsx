import axiosClient from "../../axios-client";
import "./style/EditQuantityModal.css";

export default function ({cellarId, bottleId, handleClose}) {

    return (
        <div className="flex edit-modal items-center justify-center">
            <span className="close-btn" onClick={handleClose}>x</span>
            <article className="container flex absolute place-content-center">
            <div className="increment-btn border-solid border-2 rounded border-rose-900 h-10 w-10 m-2">
                <span className="text-rose-900">-</span>
            </div>
            <input type="number" className="h-10 border-solid border-2 rounded border-rose-900 m-2 bg-transparent text-rose-900 text-center" placeholder={1} />
            <div className="increment-btn border-solid border-2 rounded border-rose-900 h-10 w-10 m-2">
                <span className="text-rose-900">+</span>
            </div>
            </article>
        </div>
    );
}