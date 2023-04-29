import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import UserDisplay from "../components/UserViewComponents/UserDisplay";
import UserForm from "../components/UserViewComponents/UserForm";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

function UserView() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState([]);
    const { setToken } = useStateContext();

    // fonction Log out
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            return <Navigate to="/login" replace />;
        });
    };

    // Va chercher l'information et le met dans le state
    useEffect(() => {
        axiosClient.get(`/users/${id}`).then((response) => {
            setUser(response.data);
        });
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update
        axiosClient
            .put(`/users/${user.id}`, user)
            .then(() => {
                setIsEditing(false);
            })
            .catch((err) => {
                console.log(err);
                const response = err;
                setMessage(response);
            });
    };

    // Toggle les composantes edit et show
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="w-full">
            <div className="form w-full mx-auto">
                <h1 className="text-2xl text-center mt-vh-4">
                    Vos informations
                </h1>
                {isEditing ? (
                    <UserForm
                        user={user}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onReturn={toggleEdit}
                        message={message}
                        setMessage={setMessage}
                    />
                ) : (
                    <UserDisplay user={user} onEdit={toggleEdit} />
                )}

                <div className="w-full flex justify-center">
                        <button
                            type="button"
                            className="bg-red-900 btn btn-block mt-8 rounded-md text-white h-8 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover w-10/12 ml-auto mr-auto"
                            onClick={onLogout}
                        >
                            Déconnexion
                        </button>
                </div>
            </div>
        </div>
    );
}

export default UserView;
