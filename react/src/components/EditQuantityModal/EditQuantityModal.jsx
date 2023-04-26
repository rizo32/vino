import axiosClient from "../../axios-client";
import "./style/EditQuantityModal.css";

export default function ({ cellarId, bottleId, handleClose }) {
    return (
        <div className="absolute top-0 left-0 h-full w-full backdrop-brightness-[0.85] backdrop-blur-lg flex flex-row gap-3 items-center justify-center p-3">
            <section className="h-full flex flex-col gap-3 flex-grow items-center justify-center">
                <div className="h-10 w-3/5 flex items-center justify-center p-3 shadow-shadow-tiny bg-white rounded-xl ">
                    <input
                        type="number"
                        name=""
                        id=""
                        value={1}
                        className="w-12"
                    />
                    <p className="pl-3">bouteilles</p>
                </div>
                <div className="h-10 w-3/5 flex items-center justify-center p-3 shadow-shadow-tiny bg-white rounded-xl ">
                    <p className="">Cellier {cellarId}</p>
                </div>
                <div className="flex items-center justify-center w-full">
                    <button className="h-10 w-3/5 rounded-xl btn btn-block bg-red-900  text-white shadow-shadow-tiny hover:shadow-none hover:bg-red-hover">
                        OK
                    </button>
                </div>
            </section>
            <section className="absolute right-3 h-full w-10 flex flex-col justify-between py-6 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleClose}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
            </section>
        </div>
    );
}
