import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    // Valeurs pour l'authentification
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    // Pour la recherche
    searchBarOpen: false,
    setSearchBarOpen: () => {},


    searchValue: "",
    setSearchValue: () => {},
    // Pour l'affichage des catégories

    // showCategories: false,
    // setShowCategories: () => {},
});

// Créer un composant fournisseur de contexte pour gérer et fournir l'authentification
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    // La barre de recherche peut conserver l'information à travers les pages de l'application
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    // const [showCategories, setShowCategories] = useState(false);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            // lorsque l'utilisateur s'authentifie, on sauvegarde son token dans localStorage
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                searchBarOpen,
                setSearchBarOpen,
                searchValue,
                setSearchValue,
                // showCategories,
                // setShowCategories,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// Créer un hook personnalisé pour utiliser facilement le contexte d'état dans les composants
export const useStateContext = () => useContext(StateContext);
