import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
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
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },

  {
    path: '*',
    element: <NotFound />
  },
])

export default router;

