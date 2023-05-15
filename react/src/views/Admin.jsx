import { useEffect, useState } from "react";
import axios from "axios";
import  LinePlotChart  from "../components/Stats/LinePlotChart";
import  PieCharts  from "../components/Stats/PieCharts";
import QuickStats from '../components/Stats/QuickStats';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("stats");

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
        user_type_id: document.getElementById("userTypes").value,
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
      className={`mr-4 px-4 py-2 rounded-lg border ${
        activeTab === "stats" ? "bg-red-900 text-white" : "border-gray-300"
      }`}
      onClick={() => setActiveTab("stats")}
    >
      Statistique
    </button>
    <button
      className={`ml-4 px-4 py-2 rounded-lg border ${
        activeTab === "users" ? "bg-red-900 text-white" : "border-gray-300"
      }`}
      onClick={() => setActiveTab("users")}
    >
      Utilisateurs
    </button>
  </div>

  {activeTab === "users" && (
    <div className="px-4">
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
                    <div key={user.id} className="bg-white p-2 rounded-lg shadow-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-bold mb-1">{user.first_name}</p>
                            <p className="mb-1">{user.email}</p>
                        </div>
                        <button className="px-2 py-1 bg-red-900 text-white rounded-lg" onClick={() => openModal(user)}>
                            Modifications
                        </button>
                    </div>
                ))
            ) : (
                <p>Aucun utilisateur correspondant</p>
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
                            <select name="userTypes" id="userTypes" className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="1">Admin</option>
                                <option value="2">Employées</option>
                                <option value="3">Utilisateurs</option>
                                <option value="4">Bannir</option>
                            </select>
                        </div>
                    )}
                    <div className="flex justify-between mt-4">
                        <button className="px-4 py-2 bg-red-900 text-white rounded-lg" onClick={closeModal}>
                            Fermer
                        </button>
                        <button className="px-4 py-2 bg-red-900 text-white rounded-lg" onClick={updateUser}>
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
)}


        {activeTab === "stats" && (
          <div>
            <QuickStats />
            <LinePlotChart/>
            <PieCharts/>
          </div>
        )}
      </div>
    );
  };
  export default Admin;
