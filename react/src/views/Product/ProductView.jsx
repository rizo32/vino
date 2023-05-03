import React from "react";
import { useLocation } from "react-router-dom";
import bgImgRedWine from "./img/bgImgRedWine.png";
import bgImgWhiteWine from "./img/bgImgWhiteWine.png";
import bgImgDefault from "./img/bgImgWhiteWine.png";

export default function ProductView(props) {
    const location = useLocation();

    // Récupère les informations de bottle passées depuis la page précédente
    const bottle = location.state.bottle;
    console.log("bottle:", bottle);

    let imageSrc;
    if (bottle.type === "Vin rouge") {
        imageSrc = bgImgRedWine;
    } else if (bottle.type === "Vin blanc") {
        imageSrc = bgImgWhiteWine;
    } else {
        imageSrc = bgImgDefault;
    }

    return (
        <div
            className="flex flex-col justify-center items-center pb-10 bg-no-repeat bg-contain bg-blend-overlay bg-black/70"
            style={{
                backgroundImage: `url(${imageSrc})`,
            }}
        >
            {/* Zone image */}
            <section className="pt-6 ">
                <img
                    className="h-72 object-contain"
                    src={bottle.image_url}
                    alt={bottle.name}
                />
            </section>
            {/* Zone sous image */}
            <section className="w-full flex flex-col justify-start items-start gap-3 p-6 bg-white ">
                <h1 className="font-bold">
                    {bottle.name.charAt(0).toUpperCase() + bottle.name.slice(1)}
                </h1>
                <div className="flex gap-3">
                    <p className="font-light">{bottle.type}</p>{" "}
                    <span className="font-light">|</span>{" "}
                    <p className="font-light">{bottle.format}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-light">{bottle.country_name}</p>
                    {bottle.region_name ? (
                        <p className="font-light">, {bottle.region_name}</p>
                    ) : null}
                </div>
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
                    <span className="font-light">|</span>{" "}
                    <p className="font-light">? avis</p>
                </div>
            </section>
            {/* Zone informations détaillées */}
            <section className="w-full border border-t-black-50 bg-white ">
                <h2 className="pt-9 pb-3 px-6 bg-red-50">
                    Informations détaillées
                </h2>
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <p>Pays</p>
                        <strong>{bottle.country_name}</strong>
                    </div>
                    <div>
                        <p>Désignation réglementée</p>
                        <strong>À venir</strong>
                    </div>
                    {bottle.cepage_name ? (
                        <div>
                            <p>Cépage</p>
                            <strong>{bottle.cepage_name.name}</strong>
                        </div>
                    ) : null}
                    <div>
                        <p>Degré d'alcool</p>
                        <strong>À venir</strong>
                    </div>
                    <div>
                        <p>Taux de sucre</p>
                        <strong>À venir</strong>
                    </div>
                    <div>
                        <p>Couleur</p>
                        <strong>{bottle.type}</strong>
                    </div>
                </div>
            </section>
            {/* Zone dégustation */}
            <section className="w-full border border-t-black-50 bg-white ">
                <h2 className="pt-9 pb-3 px-6 bg-red-50">Dégustation</h2>
            </section>
        </div>
    );
}
