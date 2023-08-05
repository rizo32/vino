import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken,setUserTypesId } = useStateContext(); /* ajout setUserTypesId YG */
    const [message, setMessage] = useState([]);


    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setUserTypesId(data.user.user_type_id); /* ajout pour user_types YG */
                console.log("user_types_id set to:", data.user.user_type_id);
            })
            .catch((err) => {
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
                    <span className="text-center mt-vh-5 flex items-center justify-center">
                      <img src="/logoLong.webp" className="inline-block ml-2 h-10"></img>
                    </span>
                    {message.email && (
                        <div className="text-red-900 mt-vh-15 absolute w-full text-center left-1/2 transform -translate-x-1/2">
                            <p>{message.email[0]}</p>
                        </div>
                    )}
                    <label htmlFor="email" className="mt-vh-10 text-xl ml-2">
                        Courriel <span className="text-sm text-blue-800">guest@guest.com</span>
                    </label>
                    <input
                        id="email"
                        ref={emailRef}
                        type="email"
                        placeholder="johndoe@cmaisonneuve.qc.ca"
                        className="rounded-lg bg-white h-12 pl-2 shadow-shadow-tiny-inset"
                    />
                    {!message.email && message.password && (
                        <div className="text-red-900 mt-vh-15 absolute w-full text-center left-1/2 transform -translate-x-1/2">
                            <p>{message.password[0]}</p>
                        </div>
                    )}
                    <label htmlFor="password" className="mt-5 text-xl ml-2">
                        Mot de passe <span className="text-sm text-blue-800">guest123$</span>
                    </label>
                    <input
                        id="password"
                        ref={passwordRef}
                        type="password"
                        placeholder="********"
                        className="rounded-lg bg-white h-12 pl-2 shadow-shadow-tiny-inset"
                    />
                    <button className="btn btn-block mt-12 bg-red-900 rounded-md text-white h-12 text-xl shadow-shadow-tiny hover:shadow-none hover:bg-red-hover active:bg-red-hover active:shadow-none">
                        Connexion
                    </button>
                </form>
                <p className="text-center mt-6 underline">
                    <Link to="/signup">
                        Créer un nouveau compte
                    </Link>
                </p>
            </div>
        </div>
    );
}
