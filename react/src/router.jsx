import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import ErrorLayout from "./components/ErrorLayout.jsx";

import Login from "./views/Login.jsx";
import Admin from "./views/Admin.jsx";
import Signup from "./views/Signup.jsx";
import Cellar from "./views/Cellar/Cellar.jsx";
import ProductView from "./views/Product/ProductView.jsx";
import Catalog from "./views/Catalog/Catalog.jsx";
import UserView from "./views/UserView.jsx";
import ErrorPage from "./views/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                // redirection si aucune adresse n'est entrée
                path: "/",
                element: <Navigate to="/cellar" />,
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
                path: "/users/:id",
                element: <UserView />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" />,
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
        element: <ErrorLayout />,
        children: [
            {
                path: "*",
                element: <ErrorPage errorStatus={404} />,
            },
        ],
    },
]);

export default router;
