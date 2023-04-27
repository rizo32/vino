import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import EditQuantityModal from "../EditQuantityModal/EditQuantityModal";
import { useState } from "react";

export default function ProductCard({ bottle, quantity, setBottles }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // fonction pour ajouter une bouteille au cellier
    const addToCellar = (bottle) => {
        axiosClient
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/cellarHasBottles`,
                bottle
            )
            .then(({ data }) => {
                setBottles(data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <article
            id="ProductCard"
            className="relative flex flex-row justify-start py-2 bg-white"
        >
            <Link
                to={`/product/${bottle.id}`}
                state={{ bottle }}
                className="w-full flex flex-row justify-between bg-white relative"
            >
                {location.pathname === "/cellar" ? (
                    <span className="absolute left-3 h-8 w-8 bg-red-900 text-white rounded-full flex items-center justify-center">
                        {quantity}
                    </span>
                ) : bottle.quantity ? (
                    <span className="absolute left-3 h-8 w-8 bg-red-900 text-white rounded-full flex items-center justify-center">
                        {bottle.quantity}
                    </span>
                ) : null}
                {/* Zone image */}
                <section className="h-40 w-20 flex flex-col justify-center ">
                    <img
                        className="h-full object-cover"
                        src={bottle.image_url}
                        alt={bottle.name}
                    />
                </section>
                {/* Zone information */}
                <section className="flex flex-col justify-start items-start gap-3 bg-white flex-grow w-[60%]">
                    <h2 className="font-bold">{bottle.name}</h2>
                    <div className="flex gap-3">
                        <p className="font-light">{bottle.type}</p>{" "}
                        <span className="font-light">|</span>{" "}
                        <p className="font-light">{bottle.format}</p>
                    </div>
                    <p className="font-light">{bottle.country_name}</p>

                    <div className="flex gap-4">
                        <span className="flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-6 fill-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-6 fill-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-6 fill-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-6 fill-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-4 h-6 fill-gray-200"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                        </span>
                        {/* Propriété à venir?: {bottle.numberOfReview????} */}
                        <p>37 avis</p>
                    </div>
                </section>
            </Link>
            {/* Zone bouton d'action */}
            {/* Zone ajout bouteille (svg +) */}
            {location.pathname != "/cellar" ? (
                <div className="px-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-10 h-10 cursor-pointer"
                        onClick={() => addToCellar(bottle)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                </div>
            ) : null}
            {/* Zone édition bouteille (svg style) */}
            {location.pathname === "/cellar" ? (
                <section className="px-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-9 h-9 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                    {open && (
                        <EditQuantityModal
                            //utiliser le cellier de l'usagé connecté
                            cellarId={1}
                            bottleId={bottle.id}
                            handleClose={handleClose}
                        />
                    )}
                </section>
            ) : null}
        </article>
    );
}
