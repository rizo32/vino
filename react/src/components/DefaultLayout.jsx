import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
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
            <aside className="fixed bottom-0 w-full bg-white h-14 flex items-center justify-around">
                {/* <a href="#" onClick={onLogout} className="btn-logout">
                    Logout
                </a> */}
                {/*                 <Link to="/wishlist">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                    </svg>
                </Link> */}
                <NavLink
                    to="/cellar"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Mon cellier
                </NavLink>
                <NavLink
                    to="/catalog"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    Catalogue
                </NavLink>
                <NavLink
                    to={`/users/${user.id}`}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                    </svg>
                </NavLink>
            </aside>
        </div>
    );
}
