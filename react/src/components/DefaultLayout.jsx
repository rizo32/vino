import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import MobileNavbar from "../components/MobileNavbar/MobileNavbar";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { Helmet } from "react-helmet";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    // un utilisateur non connecté n'a pas accès aux vues enfants de DefaultLayout
    if (!token) {
        return <Navigate to="/login" />;
    }

    // fonction Log out
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    // aller chercher les informtions de l'user lorsque quelqu'un est connecté
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <Helmet>
                <title>Le Cellier</title>
            </Helmet>
            <header>
                <MobileNavbar />
            </header>
            <main className="bg-red-50 pt-16 min-h-screen">
                {/* Outlet va aller chercher la vue appropriée dans le router */}
                <Outlet />
                <aside className="fixed bottom-0 w-full bg-white h-16 flex items-center justify-around">
                    {/* <a href="#" onClick={onLogout} className="btn-logout">
                    Logout
                </a> */}
                    {/*                 <Link to="/wishlist">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                    </svg>
                </Link> */}
                    <NavLink
                        to="/catalog"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                viewBox="0 0 179 267"
                                fill="000000"
                                className="w-8 h-8"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M66.6846 69.8668C63.96 69.0548 62.5856 68.2649 61.46 66.5548C59.46 63.0548 59.9307 60.4503 59.9307 56.7703V2.06799C59.9307 0.963989 59.0215 0.0548096 57.9175 0.0548096H29.5597C28.4557 0.0548096 27.5466 0.963989 27.5466 2.06799V52.2677V57.463C27.5466 60.7967 27.7414 63.2428 25.9447 66.295C24.6891 68.3948 22.8275 69.8668 20.4247 70.8193C15.2726 72.984 11.0731 76.1878 7.78273 80.4306C4.38413 84.8033 1.9813 90.2801 0.487651 96.7742V196.07V249.971C0.162944 257.591 2.69566 262.505 7.99921 264.799C11.0947 266.12 13.0213 266.012 16.2468 266.012H64.5199C68.0917 266.012 71.4253 266.163 74.9538 265.535C83.8508 263.955 87.0762 259.258 87.2494 251.162V99.3502C86.3185 83.9375 72.96 70.8193 66.6846 69.8668Z"
                                />
                                <path d="M146.038 129.265H92.9202V115.055H146.036L146.038 129.265ZM92.9202 140.317V154.527H179V140.317H92.9202ZM146.038 165.577H92.9202V179.787H146.036L146.038 165.577ZM92.9202 205.055H179V190.845H92.9202V205.055Z" />
                            </svg>
                            <small className="active">catalogue</small>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/cellar"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                className="w-10 h-8"
                                viewBox="0 0 283 131"
                                fill="000000"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M197.021 66.4433C197.833 63.7186 198.622 62.3443 200.333 61.2186C203.833 59.2186 206.437 59.6893 210.117 59.6893L264.819 59.6893C265.923 59.6893 266.833 58.7802 266.833 57.6762V29.3184C266.833 28.2144 265.923 27.3052 264.819 27.3052L214.62 27.3052H209.424C206.091 27.3052 203.645 27.5001 200.592 25.7033C198.493 24.4478 197.021 22.5862 196.068 20.1833C193.903 15.0313 190.7 10.8318 186.457 7.5414C182.084 4.1428 176.607 1.73997 170.113 0.246318L70.8177 0.246318L16.9163 0.246318C9.29654 -0.0783893 4.38264 2.45433 2.08804 7.75787C0.767568 10.8534 0.875793 12.78 0.875793 16.0054V64.2785C0.875793 67.8503 0.724284 71.184 1.35205 74.7124C2.93229 83.6094 7.62971 86.8348 15.7257 87.008L167.537 87.008C182.95 86.0772 196.068 72.7186 197.021 66.4433Z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M210.511 96.5889C211.344 93.8643 212.153 92.4899 213.907 91.3643C217.495 89.3643 220.165 89.835 223.938 89.835H280.021C281.153 89.835 282.085 88.9258 282.085 87.8218V59.464C282.085 58.36 281.153 57.4509 280.021 57.4509L228.554 57.4509H223.228C219.81 57.4509 217.302 57.6457 214.173 55.849C212.02 54.5934 210.511 52.7318 209.534 50.329C207.315 45.1769 204.031 40.9774 199.681 37.687C195.197 34.2884 189.583 31.8856 182.925 30.3919L81.123 30.3919L25.8613 30.3919C18.0492 30.0672 13.0112 32.6 10.6587 37.9035C9.30493 40.999 9.41588 42.9256 9.41588 46.1511V94.4242C9.41588 97.9959 9.26055 101.33 9.90416 104.858C11.5243 113.755 16.3403 116.98 24.6406 117.154L180.283 117.154C196.085 116.223 209.534 102.864 210.511 96.5889Z"
                                    fill="white"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M212.273 109.838C213.085 107.113 213.875 105.739 215.585 104.613C219.085 102.613 221.689 103.084 225.369 103.084H280.072C281.176 103.084 282.085 102.175 282.085 101.071V72.7131C282.085 71.6091 281.176 70.6999 280.072 70.6999H229.872H224.677C221.343 70.6999 218.897 70.8947 215.845 69.098C213.745 67.8425 212.273 65.9808 211.32 63.578C209.156 58.426 205.952 54.2264 201.709 50.9361C197.336 47.5375 191.86 45.1346 185.366 43.641L86.0701 43.641L32.1688 43.641C24.549 43.3163 19.6351 45.849 17.3405 51.1525C16.02 54.2481 16.1282 56.1747 16.1282 59.4001V107.673C16.1282 111.245 15.9767 114.579 16.6045 118.107C18.1847 127.004 22.8822 130.23 30.9782 130.403L182.79 130.403C198.202 129.472 211.32 116.113 212.273 109.838Z"
                                />
                            </svg>
                            <small className="active">cellier</small>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/users/${user.id}`}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="000000"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            <small className="active">{user.first_name}</small>
                        </div>
                    </NavLink>
                </aside>
            </main>
        </div>
    );
}
