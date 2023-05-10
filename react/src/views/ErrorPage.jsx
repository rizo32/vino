import NotFound from "../components/Errors/NotFound.jsx";
import InternalServerError from "../components/Errors/InternalServerError.jsx";
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorStatus }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    switch (errorStatus) {
        case 404:
            return <NotFound handleBackClick={handleBackClick} />;
        case 500:
            return <InternalServerError handleBackClick={handleBackClick} />;
        case 666:
            return (
                <div>
                   
                    <p>
                        Hmmmm, vous n'avez rien a faire ici. Vous êtes un petit malin!
                    </p>
                    <button onClick={handleBackClick}>Retour</button>
                </div>
            );
        default:
            return (
                <div>
                    <h1>Erreur: {errorStatus}</h1>
                    <p>
                        Il y a eu un petit soucis de notre côté. Nous vous en
                        faites pas!
                    </p>
                    <button onClick={handleBackClick}>Retour</button>
                </div>
            );
    }
};

export default ErrorPage;
