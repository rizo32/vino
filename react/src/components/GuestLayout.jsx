import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const {token} = useStateContext()

  // si l'utilisateur est connecté, il n'accèdera pas aux pages enfants de GuestLayout (login, signup)
  if (token) {
    return <Navigate to="/" />
  }
  return (
    <div>
      Guest
      <Outlet />
    </div>
  )
}
