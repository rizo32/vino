import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import UserDisplay from "../components/UserViewComponents/UserDisplay";
import UserForm from "../components/UserViewComponents/UserForm";
import { useStateContext } from "../contexts/ContextProvider";

function UserView() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState([]);
    const { setToken } = useStateContext();
    const navigate = useNavigate();

    // fonction Log out
    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setToken(null);
            setUser({});
            navigate("/login", { replace: true });
        });
    };

    // Va chercher l'information et le met dans le state
    useEffect(() => {
        // if (!id) return; // check if id exists
        // if (user && user.id === id) return; // check if user already exists
        axiosClient.get(`/users/${id}`).then((response) => {
            setUser(response.data);
        });
    }, [id]);

    if (!user) {
        return <div>Chargement...</div>;
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
                    <UserDisplay
                        user={user}
                        onEdit={toggleEdit}
                        onLogout={onLogout}
                    />
                )}
            </div>
        </div>
    );
}

export default UserView;
