import { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logoShort from "./img/Cthick.png";
import { useStateContext } from "../../contexts/ContextProvider";

const TopNavbar = () => {
  const location = useLocation();
  const searchInputRef = useRef(null);
  const [hasOneCharacter, setHasOneCharacter] = useState(false);
  const {
    user,
    searchValue,
    setSearchValue,
    setShowCategories,
    searchBarOpen,
    setSearchBarOpen,
  } = useStateContext();
  const navigate = useNavigate();

  // Reinit la recherche
  const clearSearchValue = () => {
    setSearchValue("");
    setHasOneCharacter(false);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  // La barre de recherche s'ouvre dès l'ouverture de la page Catalogue
  // afin d'aider les usagers à trouver la bouteille rapidement
  // elle n'est pas active pour ne pas cacher la section barcode avec le claver
  useEffect(() => {
    if (location.pathname === "/catalog") {
      setSearchBarOpen(true);

      // réinitialisation du contenu de la barre de recherche sauf dans la page produit
      // afin de pouvoir revenir vers le retour de recherche intact
    } else if (!location.pathname.includes("/product/")) {
      setSearchBarOpen(false);
      setSearchValue("");
      clearSearchValue();
    }
  }, [location, setSearchValue]);

  // Update en temps réel de la barre de recherche
  const handleSearchInputChange = (e) => {
    if (e.target.value.length > 0) {
      setHasOneCharacter(true);
    } else {
      setHasOneCharacter(false);
    }

    // pas avant d'avoir inscrit 3 charactères, mais update lors de la suppression complète
    if (e.target.value.length > 2 || e.target.value.length === 0) {
      setSearchValue(e.target.value);
    }
  };

  // La barre de recherche navigue vers le cellier sauf si l'on part du catalogue
  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter" && location.pathname.includes("/product/")) {
      navigate("/catalog");
    }
  };

  // La barre de recherche est invisible par defaut pour simplifier la présentation
  const toggleSearchBar = () => {
    if (!searchBarOpen) {
      // Ouverture du clavier lors de l'ouverture de la barre
      searchInputRef.current.focus();
      setSearchBarOpen(!searchBarOpen);
    } else if (
    // si on recherche dans la page produit, on retourne vers catalogue
      searchBarOpen &&
      searchInputRef.current.value.trim() !== "" &&
      location.pathname.includes("/product/")
    ) {
      navigate("/catalog");
    } else if (
        searchBarOpen &&
        searchInputRef.current.value.trim() == ""
    ) {
        setSearchBarOpen(!searchBarOpen);
    }
  };

  return (
    <nav
      className={`${
        searchBarOpen ? "h-34" : "h-16"
      } transition-all duration-200 ease-in-out fixed w-full bg-white px-2 z-40 shadow-shadow-tiny`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        {/* Le logo n'est plus un lien vers le cellier pour ne pas créer de confusion avec des boutons redondants */}
        <img src={logoShort} alt="logo" className="h-16 p-4" />

        {/* Profil */}
        <div className="flex flex-grow justify-end items-center">
          <NavLink
            to={`/users/${user.id}`}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <div className="p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="000000"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </NavLink>

          {/* Search */}
          {!location.pathname.startsWith("/users/") && (
            <div className="flex items-center">
              {/* Padding autour permet d'agrandir la zone de clique */}
              <button
                className="text-gray-700 p-4 z-10 focus:outline-none"
                onClick={toggleSearchBar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Placeholder différent dans la barre de recherche selon la page */}
      <div
        className={`${
          searchBarOpen ? "my-4 w-full ml-auto" : "w-0 ml-auto opacity-0"
        } transition-all duration-200 ease-in-out relative flex items-center`}
      >
        {location.pathname === "/catalog" ? (
          <input
            ref={searchInputRef}
            type="text"
            className="focus:outline-2 shadow-shadow-tiny-inset bg-gray-100 rounded-lg py-1 px-4 w-full h-10 placeholder-gray-500"
            placeholder="Trouvez la bouteille à ajouter"
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />
        ) : location.pathname === "/wishlist" ? (
          <input
            ref={searchInputRef}
            type="text"
            className="focus:outline-2 shadow-shadow-tiny-inset bg-gray-100 rounded-lg py-1 px-4 w-full h-10 placeholder-gray-500"
            placeholder="Recherchez dans vos favoris"
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />
        ) : (
          <input
            ref={searchInputRef}
            type="text"
            className="focus:outline-2 shadow-shadow-tiny-inset bg-gray-100 rounded-lg py-1 px-4 w-full h-10 placeholder-gray-500"
            placeholder="Recherchez dans votre cellier"
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
          />
        )}

        {/* Un X permettant d'effacer la recherche apparait lorsque du contenu est inséré */}
        {hasOneCharacter && (
          <button
            className="absolute right-0 top-0 text-gray-700 z-10 focus:outline-none h-10 pr-2"
            onClick={clearSearchValue}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
