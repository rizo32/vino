import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating.jsx";
import ImageOnImage from "../../components/ImageOnImage/ImageOnImage.jsx";

export default function ProductView(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleRetour = () => {
        navigate(-1);
    };

    // Récupère les informations de bottle passées depuis la page précédente
    const bottle = location.state.bottle;

    window.scrollTo(0,0);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="absolute top-20 left-5 flex flex-row z-30">
                {" "}
                <button
                    onClick={handleRetour}
                    className="flex flex-row items-center justify-center gap-1 text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    Retour
                </button>
            </div>

            {/* Zone image */}
            <ImageOnImage
                src={bottle.image_url}
                alt={bottle.name}
                type={bottle.type_name}
            />

            {/* Zone sous image */}
            <section className="w-full flex flex-col justify-start items-start gap-4 p-6 bg-white ">
                <h1 className="font-bold">
                    {bottle.name.charAt(0).toUpperCase() + bottle.name.slice(1)}
                </h1>
                <div className="flex gap-3">
                    <p className="font-light">{bottle.type_name}</p>{" "}
                    {bottle.format_name ? (
                        <div className="flex gap-3">
                            <span className="font-light">|</span>
                            <p className="font-light">{bottle.format_name}</p>
                        </div>
                    ) : null}
                </div>
                <div className="flex gap-1">
                    <p className="font-light">
                        {bottle.country_name}
                        {" ,"}
                        {/* Si il n'y a pas la valeur dans l'objet, on n'affiche pas l'information */}
                        {bottle.region_name ? (
                            <span className="font-light">
                                {bottle.region_name}
                            </span>
                        ) : null}
                    </p>
                </div>
                <div className="flex gap-3">
                    <StarRating note={bottle.rating_saq} />
                    {/* Si il n'y a pas la valeur dans l'objet, on n'affiche pas l'information */}
                    {bottle.num_comments ? (
                        <div className="flex gap-3">
                            <span className="font-light">|</span>
                            <p className="font-light">
                                {bottle.num_comments} avis
                            </p>
                        </div>
                    ) : null}
                </div>
            </section>
            {/* Zone informations détaillées */}
            <section className="w-full border border-t-black-50 bg-white pb-10">
                <h2 className="pt-9 pb-3 px-6 text-2xl bg-red-50">
                    Informations détaillées
                </h2>
                <div className="flex flex-col gap-6 p-6">
                    {/* Si il n'y a pas la valeur dans l'objet, on n'affiche pas l'information 
                    Commentaire valable pour toutes les informations de cette DIV */}
                    {bottle.type_name ? (
                        <div>
                            <p>Couleur</p>
                            <strong>{bottle.type_name}</strong>
                        </div>
                    ) : null}
                    {bottle.cepage_name ? (
                        <div>
                            <p>Cépage</p>
                            <strong>{bottle.cepage_name}</strong>
                        </div>
                    ) : null}
                    {bottle.country_name ? (
                        <div>
                            <p>Pays</p>
                            <strong>{bottle.country_name}</strong>
                        </div>
                    ) : null}
                    {bottle.region_name ? (
                        <div>
                            <p>Région</p>
                            <strong>{bottle.region_name}</strong>
                        </div>
                    ) : null}
                    {bottle.producteur_name ? (
                        <div>
                            <p>Producteur</p>
                            <strong>{bottle.producteur_name}</strong>
                        </div>
                    ) : null}
                    {bottle.designation_reglemente ? (
                        <div>
                            <p>Désignation réglementée</p>
                            <strong>{bottle.designation_reglemente}</strong>
                        </div>
                    ) : null}
                    {bottle.taux_alcool ? (
                        <div>
                            <p>Degré d'alcool</p>
                            <strong>{bottle.taux_alcool}</strong>
                        </div>
                    ) : null}
                    {bottle.taux_sucre ? (
                        <div>
                            <p>Taux de sucre</p>
                            <strong>{bottle.taux_sucre}</strong>
                        </div>
                    ) : null}
                    {bottle.format_name ? (
                        <div>
                            <p>Format</p>
                            <strong>{bottle.format_name}</strong>
                        </div>
                    ) : null}
                </div>
            </section>
            {/* Zone dégustation */}
            {/* Si il n'y a pas LES DEUX VALEURS dans l'objet, on n'affiche pas les informations */}
            {bottle.arome || bottle.temperature_service ? (
                <section className="w-full border border-t-black-50 bg-white ">
                    <h2 className="pt-9 pb-3 px-6 text-2xl bg-red-50">
                        Dégustation
                    </h2>
                    <div className="flex flex-col gap-6 p-6">
                        {/* Si il n'y a pas la valeur dans l'objet, on n'affiche pas l'information 
                        Commentaire valable pour toutes les informations de cette DIV */}
                        {bottle.arome ? (
                            <div>
                                <p>Arômes</p>
                                <strong>{bottle.arome}</strong>
                            </div>
                        ) : null}
                        {bottle.temperature_service ? (
                            <div>
                                <p>Température de service</p>
                                <strong>{bottle.temperature_service}</strong>
                            </div>
                        ) : null}
                    </div>
                </section>
            ) : null}
        </div>
    );
}
