import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { Helmet } from "react-helmet";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    // un utilisateur non connecté n'a pas accès aux vues enfants de DefaultLayout
    if (!token) {
        return <Navigate to="/login" />;
    }

    // fonction Log out
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    // aller chercher les informtions de l'user lorsque quelqu'un est connecté
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <Helmet>
                <title>Le Cellier</title>
            </Helmet>
            <header>
                <MobileNavbar />
            </header>
            <main className="bg-red-50 pt-16 min-h-screen">
                {/* Outlet va aller chercher la vue appropriée dans le router */}
                <Outlet />
            </main>
            <aside className="fixed bottom-0 w-full bg-white h-10 flex justify-around">
                <Link to={`/users/${user.id}`}>{user.first_name}</Link>
                <a href="#" onClick={onLogout} className="btn-logout">
                    Logout
                </a>
                <Link to="/cellar">Mon cellier</Link>
                <Link to="/catalog">Catalogue</Link>
            </aside>
        </div>
    );
}
