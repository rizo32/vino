import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Admin from "./views/Admin.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Cellar from "./views/Cellar/Cellar.jsx";
import ProductView from "./views/ProductView.jsx";
import Catalog from "./views/Catalog/Catalog.jsx";
import Home from "./views/Home.jsx";
import NotFound from "./views/NotFound.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                // redirection si aucune adresse n'est entrée
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/cellar",
                element: <Cellar />,
            },
            {
                path: "/catalog",
                element: <Catalog />,
            },
            {
                path: "/product/:id",
                element: <ProductView />,
            },
            {
                path: "/admin",
                element: <Admin />, 
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
