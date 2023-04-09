import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Users from "./views/Users.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        // redirection si aucune adresse n'est entrée
        path: '/',
        element: <Navigate to="/users" />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
    ]
  }
])

export default router;

