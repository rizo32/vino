import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    // un utilisateur non connecté n'a pas accès aux vues enfants de DefaultLayout
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div id="defaultLayout">
            <aside className="bg-purple-500">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <header>
                <h1 className="text-9xl">Users</h1>
            </header>
            <main>
                {/* Outlet va aller chercher la vue appropriée dans le router */}
                <Outlet />
            </main>
        </div>
    );
}
