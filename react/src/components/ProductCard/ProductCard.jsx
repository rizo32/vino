import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import EditQuantityModal from "../EditQuantityModal/EditQuantityModal";
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
    const [count, setCount] = useState(quantity);
    const [inWishlist, setInWishlist] = useState(bottle.isInWishlist);

    // fonction pour ajouter une bouteille au cellier
    const addToCellar = (bottle, quantity, initialQty) => {
        bottle.quantity = quantity;
        axiosClient
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/cellarHasBottles`,
                bottle
            )
            .then(({ data }) => {
                bottle.initialQty = initialQty;
                getBottles(bottle);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    // -----------

    // update quantity
    const updateQty = (quantity, type) => {
      if (quantity == 1 && type == 'rmv') {
        removeFromCellar(cellarHasBottleId);
      } else if( type === 'rmv') {
        quantity = parseInt(quantity) - parseInt(1);
        const data = {'quantity': quantity};
        setCount(quantity);
        updateBottleQty(cellarHasBottleId, data);
      }else if( type === 'add') {
        quantity = parseInt(quantity) + parseInt(1);
        const data = {'quantity': quantity};
        setCount(quantity);
        updateBottleQty(cellarHasBottleId, data);
      }
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
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="block w-10 h-10 cursor-pointer"
                        onClick={() => handleOpen()}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={inWishlist ? "#b91c1c" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.25}
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
                            bottle={bottle}
                            quantity={bottle.quantity}
                            handleClose={handleClose}
                            addToCellar={addToCellar}
                        />
                    )}
                </div>
            ) : null}
            {/* Zone édition bouteille (svg style) */}
            {location.pathname === "/cellar" ? (
                <section className="px-3 flex flex-col justify-start items-center">
                  {/* add */}
                    <div
                        className="border-solid border-[1px] rounded-full border-black h-10 w-10 m-2 text-center cursor-pointer"
                        onClick={() => updateQty(count, "add")}
                    >
                        <span className="text-red-900">
                            <svg viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="#000000"></path> </g></svg>
                        </span>
                    </div>
                    {/* remove */}
                    <div
                        className="border-solid border-[1px] rounded-full border-black h-10 w-10 m-2 mt-1 text-center cursor-pointer"
                        onClick={() => updateQty(count, "rmv")}
                    >
                        <span className="text-red-900">
                            <svg viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="#000000"></path> </g></svg>
                        </span>
                    </div>
                    {/* add to wishlist */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={inWishlist ? "#b91c1c" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.25}
                        stroke="currentColor"
                        className="block w-11 h-11 cursor-pointer m-1"
                        onClick={() => toggleWishlist(bottle)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </section>
            ) : null}
        </article>
    );
}
