import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorLayout = () => {
    return (
        <div id="ErrorLayout">
            <Helmet>
                <title>Cellar Smart - Erreur</title>
            </Helmet>
            <main className="pt-16 bg-red-50 min-h-screen">
                
                {/* Outlet va aller chercher la vue appropriée dans le router */}
                <Outlet />
            </main>
        </div>
    );
};

export default ErrorLayout;
