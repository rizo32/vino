import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";

export default function GuestLayout() {
  const { token } = useStateContext();

  // si l'utilisateur est connecté, il n'accèdera pas aux pages enfants de GuestLayout (login, signup)
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div id="GuestLayout">
      <header>
        <MobileNavbar />
      </header>
      <main className="pt-16">
        {/* Outlet va aller chercher la vue appropriée dans le router */}
        <Outlet />
      </main>
      <aside className="fixed bottom-0 w-full bg-white h-10 flex justify-around">
        <div className="text-violet-500">Hello, Guest</div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </aside>
    </div>
  );
}
