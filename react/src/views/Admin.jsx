import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifications utilisateurs</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par Prenom"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <ul className="grid grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-gray-200 p-4 rounded-lg shadow">
            <p className="text-lg font-bold">{user.first_name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
