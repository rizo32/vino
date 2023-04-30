import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

// Gab
// Je vais changer les dimensions selon la hauteur du
export default function Signup() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [message, setMessage] = useState([]);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                console.log(err);
                const response = err;
                setMessage(response);
            });
    };

    return (
        <div className="w-full">
            <div className="form w-full mx-auto">
                <form
                    className="flex flex-col w-10/12 ml-auto mr-auto"
                    onSubmit={onSubmit}
                >
                    <h1 className="text-4xl text-center mt-vh-2">
                        Bienvenue!
                    </h1>
                    {/* À changer le titre */}
                    <label htmlFor="first-name" className="mt-vh-5 ml-2">
                        Prénom
                        {message.first_name && (
                            <span className="text-red-900 text-sm pl-2">
                                {message.first_name[0]}
                            </span>
                        )}
                    </label>
                    <input
                        id="first-name"
                        ref={firstNameRef}
                        type="text"
                        placeholder="Jon"
                        className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                    />
                    <label htmlFor="last-name" className="mt-vh-2 ml-2">
                        Nom de famille
                        {message.last_name && (
                            <span className="text-red-900 text-sm pl-2">
                                {message.last_name[0]}
                            </span>
                        )}
                    </label>
                    <input
                        id="last-name"
                        ref={lastNameRef}
                        type="text"
                        placeholder="Snow"
                        className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                    />
                    <label htmlFor="email" className="mt-vh-2 ml-2">
                        Courriel
                        {message.email && (
                            <span className="text-red-900 text-sm pl-2">
                                {message.email[0]}
                            </span>
                        )}
                    </label>
                    <input
                        id="email"
                        ref={emailRef}
                        type="email"
                        placeholder="king@north.com"
                        className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                    />
                    <label htmlFor="password" className="mt-vh-2 ml-2">
                        Mot de passe
                        {message.password && (
                            <span className="text-red-900 text-sm pl-2">
                                {message.password[0]}
                            </span>
                        )}
                    </label>
                    <input
                        id="password"
                        ref={passwordRef}
                        type="password"
                        placeholder="********"
                        className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                    />
                    <label
                        htmlFor="password-confirmation"
                        className="mt-vh-2 text ml-2"
                    >
                        Confirmation
                    </label>
                    <input
                        id="password-confirmation"
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="********"
                        className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset mt-2"
                    />
                    <button className="btn btn-block mt-8 bg-red-900 rounded-md text-white h-8 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover active:bg-red-hover active:shadow-none">
                        L'aventure commence!
                    </button>
                    <p className="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10/12">
                        <Link to="/login">Vous avez un compte? {">"}</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
