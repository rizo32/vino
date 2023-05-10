import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setUsers(response.data.users);
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

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="pt-4 container mx-auto">
      <h1 className="text-2xl flex justify-center font-bold mb-4">Modifications utilisateurs</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Rechercher par Prénom"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-200 p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">{user.first_name}</p>
                <p>{user.email}</p>
              </div>
              <button className="px-4 py-2 bg-red-900 text-white rounded-lg" onClick={() => openModal(user)}>
                Modifications
              </button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modifications utilisateur</h2>
            {selectedUser && (
              <div>
                <p className="text-lg">User: {selectedUser.first_name}</p>
                <p>Email: {selectedUser.email}</p>
                <label htmlFor="userTypes">Type d'utilisateurs</label>
                <select name="userTypes" id="userTypes">
                    <option value="1">Admin</option>
                    <option value="2">Employées</option>
                    <option value="3">Utilisateurs</option>
                    <option value="4">Bannir</option>
                </select>


              </div>
            )}
            <button className="px-4 py-2 bg-red-900 text-white rounded-lg mt-4" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
