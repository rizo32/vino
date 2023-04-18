import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";

export default function DefaultLayout() {
  const { user, token } = useStateContext();

  // un utilisateur non connecté n'a pas accès aux vues enfants de DefaultLayout
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="defaultLayout">
      <header>
        <MobileNavbar />
      </header>
      <main className="bg-red-50">
        {/* Outlet va aller chercher la vue appropriée dans le router */}
        <Outlet />
      </main>
      <aside className="bg-purple-500 h-10 flex justify-around">
        <Link to="/cellar">Mon cellier</Link>
        <Link to="/catalog">Catalogue</Link>
      </aside>
    </div>
  );
}
