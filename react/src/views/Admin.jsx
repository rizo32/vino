import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  

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

  const updateUser = () => {
    axios
      .put(`${baseURL}/${selectedUser.id}`, {
        user_type_id: selectedUser.user_type_id, 
      })
      .then((response) => {
        console.log(response);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  


  return (
    <div className="pt-4 container mx-auto">
      <div className="flex justify-center mb-4">
        <button
          className={`mr-4 ${activeTab === "users" ? "font-bold" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`ml-4 ${activeTab === "stats" ? "font-bold" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
      </div>
      {activeTab === "users" && (
        <div className="px-4">
          <h1 className="text-2xl font-bold mb-4">Modifications utilisateurs</h1>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Rechercher par Prénom"
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="bg-gray-200 p-4 rounded-lg shadow">
                  <div>
                    <p className="text-lg font-bold">{user.first_name}</p>
                    <p>{user.email}</p>
                  </div>
                  <button className="px-4 py-2 bg-red-900 text-white rounded-lg mt-4" onClick={() => openModal(user)}>
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
                {/* Existing code for the modal */}
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "stats" && (
        <div>
          {/* Add your stats content here */}
        </div>
      )}
    </div>
  );
  
    };

export default Admin;

