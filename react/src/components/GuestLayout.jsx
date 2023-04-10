import {Navigate, Outlet, Link} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const {token} = useStateContext()

  // si l'utilisateur est connecté, il n'accèdera pas aux pages enfants de GuestLayout (login, signup)
  if (token) {
    return <Navigate to="/" />
  }
  return (
    <div id="GuestLayout">
      <aside className="bg-purple-500">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </aside>
      <header>

      </header>
      <main>
        {/* Outlet va aller chercher la vue appropriée dans le router */}
        <Outlet />
      </main>
    </div>
  )
}
