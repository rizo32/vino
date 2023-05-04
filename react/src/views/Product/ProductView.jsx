import React from "react";
import { useLocation } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating.jsx";
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
                <div className="flex gap-1">
                    {bottle.type_name ? (
                        <p className="font-light">{bottle.type_name}</p>
                    ) : null}
                    {bottle.format_name ? (
                        <p className="font-light">| {bottle.format_name}</p>
                    ) : null}
                </div>
                <div className="flex gap-1">
                    <p className="font-light">{bottle.country_name}</p>
                    {bottle.region_name ? (
                        <p className="font-light">, {bottle.region_name}</p>
                    ) : null}
                </div>
                <div className="flex gap-1">
                    <StarRating note={bottle.rating_saq} />
                    {bottle.num_comments ? (
                        <p className="font-light">
                            | {bottle.num_comments} avis
                        </p>
                    ) : null}
                </div>
            </section>
            {/* Zone informations détaillées */}
            <section className="w-full border border-t-black-50 bg-white pb-10">
                <h2 className="pt-9 pb-3 px-6 bg-red-50">
                    Informations détaillées
                </h2>
                <div className="flex flex-col gap-6 p-6">
                    {bottle.country_name ? (
                        <div>
                            <p>Pays</p>
                            <strong>{bottle.country_name}</strong>
                        </div>
                    ) : null}
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
            {/* Zone dégustation A VENIR */}
            {/*             <section className="w-full border border-t-black-50 bg-white ">
                <h2 className="pt-9 pb-3 px-6 bg-red-50">Dégustation</h2>
            </section> */}
        </div>
    );
}
