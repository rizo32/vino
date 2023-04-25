import { Link } from "react-router-dom";

import axiosClient from "../../axios-client";
import EditQuantityModal from "../EditQuantityModal/EditQuantityModal";
import "./style/ProductCard.css";

export default function ProductCard({ bottle, quantity, setBottles }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fonction pour ajouter une bouteille au cellier
  const addToCellar = (bottle) => {
    axiosClient
        .post(
            `${import.meta.env.VITE_API_BASE_URL}/api/cellarHasBottles`,
            bottle
        )
        .then(({ data }) => {
            setBottles(data.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
};

    return (
        // Il faudra mettre le lien en évitant que d'appuyer sur le "+" ou swiper
        // enclenche la redirection
        /* <Link to={`/product/${bottle.id}`}> */
        <article
            id="ProductCard"
            className="flex flex-row justify-center py-4 mb-2 bg-white relative"
        >
            {location.pathname === "/cellar" ? (
                <span className="quantity-chip">{quantity}</span>
            ) : bottle.quantity ? (
                <span className="quantity-chip">{bottle.quantity}</span>
            ) : null}
            <div className="flex flex-col justify-center">
                <img
                    className="h-36 object-contain"
                    src={bottle.image_url}
                    alt=""
                />
            </div>
            <section className="flex flex-col justify-start items-start gap-3 bg-white flex-grow">
                <h2 className="font-bold">{bottle.name}</h2>
                <div className="flex gap-3">
                    <p className="font-light">{bottle.type}</p>{" "}
                    <span className="font-light">|</span>{" "}
                    <p className="font-light">{bottle.format}</p>
                </div>
                <p className="font-light">
                    {bottle.country}, {bottle.state}
                </p>
                <div className="flex gap-4">
                    <span className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-6 fill-black"
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
                            className="w-4 h-6 fill-black"
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
                            className="w-4 h-6 fill-black"
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
                            className="w-4 h-6 fill-black"
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
                            className="w-4 h-6 fill-gray-200"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                        </svg>
                    </span>
                    {/* Propriété à venir?: {bottle.numberOfReview????} */}
                    <p>37 avis</p>
                </div>
            </section>
            <Link to={`/product/${bottle.id}`} state={{ bottle }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
            </Link>
            {location.pathname != "/cellar" ? (
                <div className="px-4 py-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-12 h-12"
                        onClick={() => addToCellar(bottle)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                        />
                    </svg>
                </div>
            ) : null}
            {location.pathname === "/cellar" ? (
                <img
                    className="rm-bottle"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGklEQVR4nO2du2oWQRiGnyYa4wFTaBFBy3i4AvECbBQsLLRRkwsQLTxEe+8gdyB25iBskUvwgDZiFMEiAUEsoiSghfDJ4PwQAsHk3+zMN7PvA2/773zvO4fd+YddEEIIIYQQQgghhBBi94wD08AC8BHYAKwSbcSa5oGpWKsbDgCPgB8OjLJECrXOxNqzMgG8cmCIZdI74GQu808Aqw5MsMxajV4kJQy9Nw6KNycKs8BoygAeOyjanOlhKvPHe7bg2g61luruaNpBseZUt1IEMO+gUHOquRQBfHZQqDlVeFjrnHUHhZpTBW86J3eR5lwKAAWQvReaRoAv/QGeAlfitsEIcBw4DzwBvmsKojPzw5bJmf9MzEeAWa0B7Ln5L4CxXayKt/fgmlqE+WdE+GNo3xButB0JCgBogP1DOnEY+KYASN7zNxMWZo0A8pgfuKAASDrtbOWYAiBLzx8QgtQURPqeP+CUAiCb+YGrCoDk085mnikAspl/Lu4daQ0g7bQzOG7zWk/CZOn54XcXW5pf9VZE02HPH9nDwwadI/PpVwBNIT2/ygCawsyvKoCmQPOrCaAp1PwqAmgKNr/4AJrCzS86gKYC84sNoKnE/CIDaCoyv7gAmsrMLyqAxY431hYymF9MAO93eWKtFPOLCeBapeYbCWjbwN/AoYrmfCstgKWKzTcS0LaBdyo230hA2wZOVmy+kYA2jftSuflGAto0Lpy9r9l8IwFtGnepcvONBOS8/Rxxbr7rAJZ6YL6RgGEbdrfFNQ/u0aGpXgdwdkjjrwMfHBhbfAA7faXXZBwtYcr65cDQagK4uM3vjcW7o9n4nJDbwGoD+ApcjtPK6cJ7uZUYQF/UObkLNOdSAFQegF5Zxrbm/0wRwCcHw9ycajlFACVsB1gmPU8RwJSDQs2pbqQIYDy+pjd3seZMwZOjJGLGQcHmTPdIyGjPP9xgW/Qy9evrB1/PWHFQvGXWSvQiCxMxfeup3ub8hMmAMPQe9GxhXgPud3iyeyjCHcDN+Ar35cqemNdjTXOxxmR3O0IIIYQQQgghhBCCavgLyCF3vmwLdZkAAAAASUVORK5CYII="
                />
            ) : null}
        </article>
        /* </Link> */
    );
}
