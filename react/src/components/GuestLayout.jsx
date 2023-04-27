import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Helmet } from "react-helmet";

export default function GuestLayout() {
  const { token } = useStateContext();

  // si l'utilisateur est connecté, il n'accèdera pas aux pages enfants de GuestLayout (login, signup)
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    // Gab: pas de barre de navigation dans Guest Layout. Faut utiliser 'login' et 'signup'
    <div id="GuestLayout">
      <Helmet>
        <title>Le Cellier</title>
      </Helmet>
      <main className="pt-16 bg-red-50 min-h-screen">
        {/* Outlet va aller chercher la vue appropriée dans le router */}
        <Outlet />
      </main>
    </div>
  );
}
