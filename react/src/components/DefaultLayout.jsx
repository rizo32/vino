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
      <main className="bg-red-50 pt-16">
        {/* Outlet va aller chercher la vue appropriée dans le router */}
        <Outlet />
      </main>
      <aside className="fixed bottom-0 w-full bg-white h-10 flex justify-around">
        <Link to="/cellar">Mon cellier</Link>
        <Link to="/catalog">Catalogue</Link>
      </aside>
    </div>
  );
}
