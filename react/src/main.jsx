import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvider } from "./contexts/ContextProvider";
import ErrorBoundary from './components/Errors/ErrorBoundary';

ReactDOM.createRoot(document.getElementById("root")).render(

    // Envois d'avertissement dans la console pour les fonctions dangereuses ou dépréciées
    <React.StrictMode>

        {/* Gestion des erreurs 403, 500, etc */}
        <ErrorBoundary>

            {/* ContexteProvider protège les vues nécéssitant une authentification */}
            <ContextProvider>

                {/* Contenu */}
                <RouterProvider router={router} />

            </ContextProvider>

        </ErrorBoundary>

    </React.StrictMode>
);
