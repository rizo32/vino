import { Component } from "react";
import ErrorPage from "../../views/ErrorPage.jsx";

// Ceci est la logique qui va amener le serveur à aller chercher la page d'erreur selon le type

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorStatus: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        // Log les informations de l'erreur afin de débugger
        console.error("Error caught in Error Boundary:", error);
        console.error("Error info:", errorInfo);

        // On pourrait ajouter de la logique pour détecter le status de l'erreur du server, de l'information spécifique, à voir
        const errorStatusMatch = error.message.match(/Erreur: (\d+)/);

        console.log(errorStatusMatch);

        if (errorStatusMatch) {
            const errorStatus = parseInt(errorStatusMatch[1], 10);
            this.setState({ errorStatus });
        } else {
            // Si le message d'erreur n'a pas l'information nécéssaire, on envoit vers erreur 500
            this.setState({ errorStatus: 500 });
        }
    }

    render() {
        if (this.state.errorStatus) {
            return <ErrorPage errorStatus={this.state.errorStatus} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
