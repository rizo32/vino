import { useState } from "react";
import axiosClient from "../../axios-client";
import { useLocation, useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating.jsx";
import { useStateContext } from "../../contexts/ContextProvider";
import ImageOnImage from "../../components/ImageOnImage/ImageOnImage.jsx";

export default function ProductView(props) {
    const { searchBarOpen } = useStateContext();
    const location = useLocation();
    const navigate = useNavigate();
    const handleRetour = () => {
        navigate(-1);
    };

    // Récupère les informations de bottle passées depuis la page précédente
    const bottle = location.state.bottle;

    // est-ce la bouteille fait partie de la liste de souhait
    const [inWishlist, setInWishlist] = useState(bottle.isInWishlist);

    // fonction pour ajouter une bouteille à la wishlist
    const toggleWishlist = (bottle) => {
        axiosClient
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist`)
            .then(({ data }) => {
                const wishlistItem = data.data.find(
                    (item) => item.bottle.id === bottle.id
                );
                if (wishlistItem) {
                    // If the bottle is in the wishlist, remove it
                    axiosClient
                        .delete(
                            `${
                                import.meta.env.VITE_API_BASE_URL
                            }/api/wishlist/${wishlistItem.id}`
                        )
                        .then(({ data }) => {
                            setInWishlist(false);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    // If the bottle is not in the wishlist, add it
                    axiosClient
                        .post(
                            `${import.meta.env.VITE_API_BASE_URL}/api/wishlist`,
                            { id: bottle.id }
                        )
                        .then(() => {
                            setInWishlist(true);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    window.scrollTo(0, 0);

    return (
        <div className="flex flex-col justify-center items-center">
            <div
                className={`${
                    searchBarOpen ? "mt-18" : ""
                } absolute top-20 w-full flex flex-col justify-between z-30 transition-all duration-200 ease-in-out`}
            >
                <div className="flex flex-row justify-between">
                    <button
                        onClick={handleRetour}
                        className="flex flex-row ml-5 items-center justify-center gap-1 text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="block w-8 h-8 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        {/* Retour */}
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mr-5 text-white block w-11 h-11 cursor-pointer"
                        onClick={() => handleOpen()}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={inWishlist ? "#b91c1c" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.25}
                    stroke="currentColor"
                    className="ml-auto mr-5 mt-48 text-white block w-10 h-10 cursor-pointer"
                    onClick={() => toggleWishlist(bottle)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
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
