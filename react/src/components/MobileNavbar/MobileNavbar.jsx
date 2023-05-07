import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoShort from "./img/Cthick.png";
import { useStateContext } from "../../contexts/ContextProvider";

const MobileNavbar = () => {
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const location = useLocation();
    const searchInputRef = useRef(null);
    const { searchValue, setSearchValue } = useStateContext();
    const navigate = useNavigate();

    // La barre de recherche deviens active (ouvre le clavier sur mobile) dès l'ouverture de la page Catalogue
    // afin d'aider les usagers à trouver la bouteille rapidement
    useEffect(() => {
        if (location.pathname === "/catalog") {
            setSearchBarOpen(true);
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        // réinitialisation du contenu de la barre de recherche sauf dans la page produit
        // afin de pouvoir revenir vers le retour de recherche intact
        } else if (!location.pathname.includes("/product/")) {
            setSearchBarOpen(false);
            setSearchValue("");
            if (searchInputRef.current) {
                searchInputRef.current.value = "";
            }
        }
    }, [location, setSearchValue]);

    // Update en temps réel de la barre de recherche
    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    // La barre de recherche navigue vers le cellier sauf si l'on part du catalogue
    const handleSearchInputKeyDown = (e) => {
        if (e.key === "Enter" && location.pathname !== '/catalog' ) {
            navigate("/cellar");
        }
    };

    // La barre de recherche est invisible par defaut pour simplifier la présentation
    const toggleSearchBar = () => {
        if (searchBarOpen && searchInputRef.current.value.trim() !== "") {
            // On peut refermer la barre si le contenu est vide, sinon la recherche s'enclenche
            if (location.pathname !== '/catalog') {
                navigate("/cellar");
            }
        } else {
            if (!searchBarOpen) {
                // Ouverture du clavier lors de l'ouverture de la barre
                searchInputRef.current.focus();
            }
            setSearchBarOpen(!searchBarOpen);
        }
    };

    return (
        <nav className="fixed w-full bg-white h-16 shadow-shadow-tiny flex items-center justify-between px-2 z-20">
            <Link to="/cellar">
                {/* Logo */}
                {/* Padding autour permet d'agrandir la zone de clique */}
                <img src={logoShort} alt="logo" className="h-16 p-4" />
            </Link>

            {/* Search bar */}
            <div className="flex flex-grow justify-end items-center">
                <div
                    className={`${
                        searchBarOpen
                            ? "w-full ml-auto"
                            : "w-0 ml-auto opacity-0"
                    } transition-all duration-200 ease-in-out`}
                >
                    <input
                        ref={searchInputRef}
                        type="text"
                        className="shadow-shadow-tiny-inset bg-gray-100 rounded-lg py-1 px-4 w-full h-9 placeholder-gray-500"
                        placeholder="Trouvez votre bouteille"
                        onChange={handleSearchInputChange}
                        onKeyDown={handleSearchInputKeyDown}
                    />
                </div>

                {/* Right-side icons */}
                <div className="flex items-center">
                    {/* Magnifying glass icon */}
                    {/* Padding autour permet d'agrandir la zone de clique */}
                    <button
                        className="text-gray-600 p-4 z-10 focus:outline-none"
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
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>

                {/* MENU BURGER SI NECESSAIRE */}

                {/* Hamburger menu icon */}
                {/* <button className="text-gray-600 focus:outline-none ml-12">
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
            </button> */}
            </div>
        </nav>
    );
};

export default MobileNavbar;
