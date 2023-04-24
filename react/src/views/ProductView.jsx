import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ProductView(props) {
    const location = useLocation();
    const data = location.state;
    console.log(data);

    // Récupère les informations de bottle passées depuis la page précédente
    const bottle = location.state.bottle;

    return (
        <div className="flex flex-col justify-center items-center pb-10">
            <section className="pt-6 ">
                <img
                    className="h-60 object-contain"
                    src={bottle.image_url}
                    alt=""
                />
            </section>
            <section className="w-full flex flex-col justify-start items-start gap-3 p-6 bg-white flex-grow">
                <h1 className="font-bold">{bottle.name}</h1>
                <div className="flex gap-3">
                    <p className="font-light">{bottle.type}</p> <span>|</span>{" "}
                    <p className="font-light">{bottle.format}</p>
                </div>
                <p className="font-light">
                    {bottle.country_name}, (manque la région) {bottle.state}
                </p>
                <div className="flex gap-4">
                    <span className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-black"
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
                            className="w-5 h-5 fill-black"
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
                            className="w-5 h-5 fill-black"
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
                            className="w-5 h-5 fill-black"
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
                            className="w-5 h-5 fill-gray-200"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                        </svg>
                    </span>
                    {/* Propriété à venir?: {bottle.numberOfReview????} */}
                    <span>|</span> <p className="font-light">? avis</p>
                </div>
            </section>
            <section className="w-full bg-white ">
                <h2 className="pt-9 pb-3 px-6 bg-red-50">
                    Information détaillées
                </h2>
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <p>Pays</p>
                        <strong>{bottle.country_name}</strong>
                    </div>
                    <div>
                        <p>Désignation réglementée</p>
                        <strong>{}</strong>
                    </div>
                    <div>
                        <p>Cépage</p>
                        <strong>{}</strong>
                    </div>
                    <div>
                        <p>Degré d'alcool</p>
                        <strong>{}</strong>
                    </div>
                    <div>
                        <p>Taux de sucre</p>
                        <strong>{}</strong>
                    </div>
                    <div>
                        <p>Couleur</p>
                        <strong>{}</strong>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white ">
                <h2 className="pt-9 pb-3 px-6 bg-red-50">Dégustation</h2>
            </section>
        </div>
    );
}
