/* importation des modules */
import { useEffect, useState } from "react"; 
import axios from "axios";

const baseURL = "http://localhost:8000/api/saq"; /* definition de l'url de base de notre api/backend */

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [nombre, setNombre] = useState(24);
    const [page, setPage] = useState(1);

    const parseProductData = (data) => {
        return data.map((product) => ({
            ...product,
            desc: {
                ...product.desc,
                /* nettoyage des formats  */
                type: product.desc.type.trim(),
                format: product.desc.format.trim(),
                pays: product.desc.pays.trim(),
            },
        }));
    };

    const fetchProducts = async () => { /* Fonction fetch qui va être utilisée pour récupérer la liste des produits à montrer sur la page */
        const response = await axios.post(`${baseURL}/fetch`, {
            nombre,
            page,
        });
        const parsedProducts = parseProductData(response.data);
        setProducts(parsedProducts); /* mis a jour de la liste des produits */
        
    };
    useEffect(() => { /* useeffect pour appeler fetchProducts  on mount de notre composante */
        fetchProducts(); 
    }, []);
    return ( /* retour de la section qui affichera les produis */
        <div className="flex flex-col items-center bg-red-50">
            <h1 className="text-2xl font-semibold mb-4">Admin</h1>
            <select
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mb-2"
            >
                <option value={24}>24</option>
                <option value={48}>48</option>
                <option value={96}>96</option>
            </select>
            <select
                value={page}
                onChange={(e) => setPage(e.target.value)}
                placeholder="Page number"
                className="mb-2"
            >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={13}>13</option>
                <option value={21}>21</option>
            </select>
            <button
                onClick={fetchProducts}
                className="bg-red-900 border-2 border-red-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-transparent hover:border-2 hover:border-red-900 hover:text-black mb-4"
            >
                Fetch Products
            </button>

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
                                        /* onClick={() => addToCellar(bottle)} */
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
                                {/* {bottle.numberOfReview????} */}
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