// Importation des modules nécessaires
import { useEffect, useState } from "react";
import axios from "axios";

// URL de base pour les requêtes à l'API
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;
const Admin = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Fetch the user list from the API
      axios.get(`${baseURL}`)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div className="pt-4 container mx-auto">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <ul className="grid grid-cols-3 gap-4">
          {users.map(user => (
            <li
              key={user.id}
              className="bg-gray-200 p-4 rounded-lg shadow"
            >
              <p className="text-lg font-bold">{user.first_name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Admin;
  