import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Helmet } from "react-helmet";

export default function GuestLayout() {
    const { token } = useStateContext();

    // Gestion du nom de la page actuelle
    const location = useLocation();
    const [viewName, setViewName] = useState("Home");
    useEffect(() => {
        const updateViewName = () => {
            switch (location.pathname) {
                case "/login":
                    setViewName("Connexion");
                    break;
                case "/signup":
                    setViewName("Bienvenue!");
                    break;
                default:
                    setViewName("Accueil");
            }
        };

        updateViewName();
    }, [location]);

    // si l'utilisateur est connecté, il n'accèdera pas aux pages enfants de GuestLayout (login, signup)
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div id="GuestLayout">
            <Helmet>
                <title>Le Cellier - {viewName}</title>
            </Helmet>
            <main className="pt-16 bg-red-50 min-h-screen">
                {/* Outlet va aller chercher la vue appropriée dans le router */}
                <Outlet />
            </main>
        </div>
    );
}
