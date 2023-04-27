// Importation des modules nécessaires
import { useEffect, useState } from "react";
import axios from "axios";

// URL de base pour les requêtes à l'API
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/saq`;

const Admin = () => {
    // Déclaration des états
    const [products, setProducts] = useState([]);
    // const [nombre, setNombre] = useState(24);
    // const [page, setPage] = useState(1);
    const [progress, setProgress] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showButton, setShowButton] = useState(true);

    // Initialisation des compteurs pour les produits insérés et les doublons
    // let insert = 0;
    // let double = 0;

    // Fonction pour nettoyer les données des produits
    const parseProductData = (data) => {
        return data.map((product) => ({
            ...product,
            desc: {
                ...product.desc,
                // Nettoyage des formats
                type: product.desc?.type?.trim() || "",
                format: product.desc?.format?.trim() || "",
                pays: product.desc?.pays?.trim() || "",
            },
        }));
    };

// Fonction pour récupérer les produits depuis l'API
const fetchProducts = () => {
    // Afficher la barre de progression
    setShowProgressBar(true);
    // Mesurer le temps d'exécution de la requête
    const t0 = performance.now();
    // Créer un flux d'événements pour suivre la progression
    const eventSource = new EventSource(`${baseURL}/fetch`);

    // Traitement des messages reçus depuis le flux d'événements
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Mettre à jour la progression si une valeur de pourcentage est disponible
        if (data.progressPercentage) {
            setProgress(data.progressPercentage);
        }
        // Si les données sont complètes, traiter et afficher les produits
        else if (data.done) {
            const parsedProducts = parseProductData(data.produits);
            setProducts(parsedProducts);

            // Calculer et afficher le temps d'exécution de la requête
            const t1 = performance.now();
            const timeDiff = t1 - t0;
            console.log(
                `FetchProducts prend ${timeDiff} millisecondes (${(
                    timeDiff / 1000
                ).toFixed(2)} secondes ou ${(timeDiff / 60000).toFixed(2)} minutes)`
            );

            // Fermer le flux d'événements et masquer la barre de progression
            eventSource.close();
            setShowProgressBar(false);
        }
    };
};

// Gestionnaire pour confirmer la récupération des produits
const handleConfirm = () => {
    // Fermer la fenêtre modale et masquer le bouton
    setShowModal(false);
    setShowButton(false);
    // Lancer la récupération des produits
    fetchProducts();
};

// Gestionnaire pour annuler la récupération des produits
const handleCancel = () => {
    // Fermer la fenêtre modale
    setShowModal(false);
};


    return (
        /* retour de la section qui affichera les produis */
        <div className="flex flex-col items-center bg-red-50">
             {/* ajout et logique du Progress bar */}
{showProgressBar && (
        <div className="w-full bg-gray-300 rounded relative h-6">
        <div className={`absolute top-0 left-0 w-full h-full bg-red-900 ${progress === 0 ? "opacity-0" : "opacity-100"}`} style={{ width: `${progress}%` }}>
            <span className="absolute top-0 left-0 w-full text-center h-full flex items-center justify-center text-white">
                {progress.toFixed(2)}%
            </span>
        </div>
    </div>



)}
           {/* centrer et logique pour btn */}
           {showButton && (
                <div className="flex items-center justify-center h-full w-full absolute inset-0">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-900 border-2 border-red-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-transparent hover:border-2 hover:border-red-900 hover:text-black mb-4"
                    >
                        Fetch Products
                    </button>
                </div>
            )}

                {/* ajout et logique du mdodal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
                        <p>Le processus peut être long. Souhaitez-vous poursuivre ?</p>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 text-black py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 mr-2"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-red-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
                            >
                                Je confirme
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <section></section>
            <section className="flex flex-col gap-4 items-start justify-start">
                {products.map((product, index) => (
                    <article
                        id="ProductCard"
                        className="flex flex-row items-center justify-center py-6 mb-2 bg-white"
                    >
                        <img className="h-40" src={product.img} alt="" />

                        <section className="flex-flex_column justify-start gap-3 bg-white">
                            <div className="flex ">
                                <h2 className="font-bold">{product.nom}</h2>
                                <div className="px-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-12 h-12"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v12m6-6H6"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <p>{product.desc.type}</p> <span>|</span>{" "}
                                <p>{product.desc.format}</p>
                            </div>
                            <p>{product.desc.pays}</p>
                            <div className="flex gap-4">
                                <p className="flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 fill-black"
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
                                        className="w-6 h-6 fill-black"
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
                                        className="w-6 h-6 fill-black"
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
                                        className="w-6 h-6 fill-black"
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
                                        className="w-6 h-6 fill-gray-200"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                    </svg>
                                </p>
                                <span>|</span> <p>? avis</p>
                            </div>
                        </section>
                        <div>
                            index: {index}
                            <br />
                            Result: {product.result.raison}
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Admin;
