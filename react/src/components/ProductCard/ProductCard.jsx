import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import EditQuantityModal from "../EditQuantityModal/EditQuantityModal";
import StarRating from "../../components/StarRating/StarRating.jsx";
import { useState, useEffect } from "react";

export default function ProductCard({
    bottle,
    quantity,
    getBottles,
    removeFromCellar,
    cellarHasBottleId,
    updateBottleQty,
    onRemoveFromWishlist,
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inWishlist, setInWishlist] = useState(bottle.isInWishlist);

    // fonction pour ajouter une bouteille au cellier
    const addToCellar = (bottle) => {
        axiosClient
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/cellarHasBottles`,
                bottle
            )
            .then(({ data }) => {
                getBottles(bottle);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    // -----------

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
                            console.log("Bottle removed from wishlist.");
                            setInWishlist(false);
                            // Si on est dans la wishlist page, on enlève directement de la page
                            if (onRemoveFromWishlist) {
                                onRemoveFromWishlist(bottle.id);
                            }
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
                            console.log("Bottle added to wishlist.");
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
    // --------

    return (
        <article
            id="ProductCard"
            className="relative flex flex-row justify-start py-2 bg-white shadow-shadow-tiny hover:shadow-none active:shadow-none hover:bg-gray-50"
        >
            <Link
                to={`/product/${bottle.id}`}
                state={{ bottle }}
                className="w-full flex flex-row justify-between relative"
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
                <section className="flex flex-col justify-start items-start gap-3 flex-grow w-[60%]">
                    <h2 className="font-bold">{bottle.name}</h2>
                    <div className="flex gap-3">
                        <p className="font-light">{bottle.type_name}</p>
                        {/* Si il n'y a pas la valeur dans l'objet, on n'affiche pas l'information */}

                        {bottle.format_name ? (
                            <div className="flex gap-3">
                                <span className="font-light">|</span>
                                <p className="font-light">
                                    {bottle.format_name}
                                </p>
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
                </section>
            </Link>
            {/* Zone bouton d'action */}
            {/* Zone ajout bouteille (svg +) */}
            {location.pathname != "/cellar" ? (
                <div className="px-3 flex flex-col justify-between">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="block w-10 h-10 cursor-pointer"
                        onClick={() => addToCellar(bottle)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={inWishlist ? "#7F1D1D" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="block w-10 h-10 cursor-pointer"
                        onClick={() => toggleWishlist(bottle)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </div>
            ) : null}
            {/* Zone édition bouteille (svg style) */}
            {location.pathname === "/cellar" ? (
                <section className="px-3 flex flex-col justify-between">
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={inWishlist ? "#7F1D1D" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="block w-10 h-10 cursor-pointer"
                        onClick={() => toggleWishlist(bottle)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                    {open && (
                        <EditQuantityModal
                            //utiliser le cellier de l'usagé connecté
                            cellarId={1}
                            bottleId={bottle.id}
                            quantity={quantity}
                            handleClose={handleClose}
                            removeFromCellar={removeFromCellar}
                            cellarHasBottleId={cellarHasBottleId}
                            updateBottleQty={updateBottleQty}
                        />
                    )}
                </section>
            ) : null}
        </article>
    );
}
