import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Helmet } from "react-helmet";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, searchBarOpen } = useStateContext();

    // Gestion du nom de la page actuelle
    const location = useLocation();
    const [viewName, setViewName] = useState("Home");
    useEffect(() => {
        const updateViewName = () => {
            switch (location.pathname) {
                case "/catalog":
                    setViewName("Catalogue");
                    break;
                case "/cellar":
                    setViewName("Cellier");
                    break;
                case `/users/${user.id}`:
                    setViewName(`${user.first_name}`);
                    break;
                default:
                    setViewName("Accueil");
            }
        };

        updateViewName();
    }, [location, user]);

    // aller chercher les informations de l'user lorsque quelqu'un est connecté
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    // un utilisateur non connecté n'a pas accès aux vues enfants de DefaultLayout
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div id="defaultLayout">
            <Helmet>
                <title>Cellar Smart - {viewName}</title>
            </Helmet>
            <header>
                <TopNavbar />
            </header>
            <main className={`${
                searchBarOpen ? "pt-32" : "pt-14"
            } transition-all duration-200 ease-in-out bg-red-50 pb-10 min-h-screen`}>
                {/* Outlet va aller chercher la vue appropriée dans le router */}
                <Outlet />
                <footer>
                    <BottomNavbar />
                </footer>
            </main>
        </div>
    );
}
