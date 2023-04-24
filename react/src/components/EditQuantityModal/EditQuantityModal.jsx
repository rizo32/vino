import axiosClient from "../../axios-client";
import "./style/EditQuantityModal.css";

export default function ({cellarId, bottleId, handleClose}) {

    return (
        <div className="edit-modal items-center justify-center">
            test
            <span className="close-btn" onClick={handleClose}>x</span>
        </div>
    );
}