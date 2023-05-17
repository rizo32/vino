import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating.jsx";
import ImageOnImage from "../../components/ImageOnImage/ImageOnImage.jsx";
import EditQuantityModal from "../../components/EditQuantityModal/EditQuantityModal";
import axiosClient from "../../axios-client";

export default function ProductView(props) {
    const { searchBarOpen } = useStateContext();
    const location = useLocation();
    const navigate = useNavigate();
    const handleRetour = () => {
        navigate(-1);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [bottle, setBottle] = useState(location.state.bottle);

    // Récupère les informations de bottle passées depuis la page précédente
    

    // fonction pour ajouter une bouteille au cellier
    const addToCellar = (bottleEdit, quantity, initialQty) => {
        bottleEdit.quantity = quantity;
        axiosClient
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/cellarHasBottles`,
                bottleEdit
            )
            .then(({ data }) => {
                bottleEdit.initialQty = initialQty;
            })
            .catch((err) => {
                console.log(err.response);
            });
        bottleEdit.quantity = parseInt(quantity) + parseInt(initialQty);
        setBottle(bottleEdit);
    };
    // -----------

    window.scrollTo(0,0);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="absolute top-20 left-5 flex flex-row justify-between z-30">
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-5 text-white block w-10 h-10 cursor-pointer" onClick={handleOpen}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
                </svg>
                
            </div>

            {open ? (
                <div className={`${
                    searchBarOpen ? "top-[135px]" : "top-[65px]"
                } absolute h-[315px] w-full z-30 pt-20 text-white`}>
                <EditQuantityModal
                bottle={bottle}
                quantity={bottle.quantity}
                handleClose={handleClose}
                addToCellar={addToCellar}
            />
            </div>
            )
            : null}

            {/* Zone image */}
            <ImageOnImage
                src={bottle.image_url}
                alt={bottle.name}
                type={bottle.type_name}
            />

            {/* Zone sous image */}
            <section className="w-full flex flex-col justify-start items-start gap-4 p-6 bg-white ">
                <span class="text-red-900 font-bold">{bottle.quantity} dans le cellier</span>
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
