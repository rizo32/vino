import { createContext, useContext, useState } from "react"

const StateContext = createContext({
  // valeurs par défaut
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {}
})

// Créer un composant fournisseur de contexte pour gérer et fournir l'authentification
export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  // const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  // Utiliser la ligne suivante pour accéder aux vues protégées
  const [token, _setToken] = useState(123);

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      // lorsque l'utilisateur s'authentifie, on sauvegarde son token dans localStorage
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <StateContext.Provider value={{ 
      user,
      token,
      setUser,
      setToken
    }}>
      {children}
    </StateContext.Provider>
  )
}

// Créer un hook personnalisé pour utiliser facilement le contexte d'état dans les composants
export const useStateContext = () => useContext(StateContext)