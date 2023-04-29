import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorLayout = () => {
    return (
        <div id="ErrorLayout">
            <Helmet>
                <title>Le Cellier - Error</title>
            </Helmet>
            <main className="pt-16 bg-red-50 min-h-screen">
                
                {/* Outlet will render the appropriate view from the router */}
                <Outlet />
            </main>
        </div>
    );
};

export default ErrorLayout;
