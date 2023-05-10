import { NavLink } from "react-router-dom";

const BottomNavbar = () => {
    return (
        <div className="fixed bottom-0 w-full bg-white h-16 flex items-center justify-around z-20">
            <NavLink
                to="/cellar"
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
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M66.6846 69.8668C63.96 69.0548 62.5856 68.2649 61.46 66.5548C59.46 63.0548 59.9307 60.4503 59.9307 56.7703V2.06799C59.9307 0.963989 59.0215 0.0548096 57.9175 0.0548096H29.5597C28.4557 0.0548096 27.5466 0.963989 27.5466 2.06799V52.2677V57.463C27.5466 60.7967 27.7414 63.2428 25.9447 66.295C24.6891 68.3948 22.8275 69.8668 20.4247 70.8193C15.2726 72.984 11.0731 76.1878 7.78273 80.4306C4.38413 84.8033 1.9813 90.2801 0.487651 96.7742V196.07V249.971C0.162944 257.591 2.69566 262.505 7.99921 264.799C11.0947 266.12 13.0213 266.012 16.2468 266.012H64.5199C68.0917 266.012 71.4253 266.163 74.9538 265.535C83.8508 263.955 87.0762 259.258 87.2494 251.162V99.3502C86.3185 83.9375 72.96 70.8193 66.6846 69.8668Z"
                        />
                        <path d="M146.038 129.265H92.9202V115.055H146.036L146.038 129.265ZM92.9202 140.317V154.527H179V140.317H92.9202ZM146.038 165.577H92.9202V179.787H146.036L146.038 165.577ZM92.9202 205.055H179V190.845H92.9202V205.055Z" />
                    </svg>
                </div>
            </NavLink>
            <NavLink
                to="/catalog"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-12 h-12 p-2 bg-red-900 text-white rounded-full"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </div>
            </NavLink>
            <NavLink
                to="/wishlist"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </div>
            </NavLink>
            {/* <NavLink
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
            className="w-8 h-10"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </svg>
    </div>
</NavLink> */}
        </div>
    );
};
export default BottomNavbar;
