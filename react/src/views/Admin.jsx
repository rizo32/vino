/* importation des modules */
import { useEffect, useState } from "react";
import axios from "axios";
import LinePlotChart from "../components/Stats/LinePlotChart";
import PieCharts from "../components/Stats/PieCharts";
import QuickStats from "../components/Stats/QuickStats";

/* Creation des URLs */
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/admin`;
const deleteURL = `${import.meta.env.VITE_API_BASE_URL}/api/deleteUser`;

/* Creation de la fonction Admin */
const Admin = () => {
  /* Creation des states */
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("stats"); /* par defaut le tab est sur stats */
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    axios
      .get(baseURL) /* Requete Get a baseURL */
      .then((response) => {
        setUsers(response.data.users);  /* Modifies l'etat avec les donnees recu */
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value); /* modifie l'etat avec l"entree de l'utilisateurs */
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) /* Filtre avec la valeur de l'etat */
  );

  /* Ouverture de la modal */
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  /* Fermeture de la modal */
   const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  /* Reset le barre de recherche - mis ajour de l'etat  '' */
  const clearSearch = () => {
    setSearchTerm("");
  };


  /* Suppression d'un utilisateur */
  const deleteUser = () => {
    if (selectedUser) {
      const userId = selectedUser.id;
      axios
        .delete(`${deleteURL}/${userId}`)
        .then((response) => {
          /* utilisations de séquence des méthodes */
          refreshUsers();
          closeModal();
          clearSearch();
          setSuccessMessage("Utilisateurs supprimer");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* Mise à jour de la liste utilisateur */
  const refreshUsers = () => {
    axios
      .get(baseURL)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    refreshUsers();
  }, []);
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        /* apres 3 seconde, change l'etat de Message(le ferme) */
        setSuccessMessage("");
      }, 3000); 
  
      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  /* Mise à jour de l'utilisateur */
  const updateUser = () => {
    axios
      .put(`${baseURL}/${selectedUser.id}`, {
        user_type_id: document.getElementById("userTypes").value,
      })
      .then((response) => {
        /* sequences des methodes */
        closeModal();
        refreshUsers();
        clearSearch();
        setSuccessMessage("Utilisateurs mis à jour");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    /* Creation de deux tabs pour le pannel Admin -> Stats et Users */
    <div className="pt-4 container mx-auto">
       {successMessage && (
      <div className="success-message fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-6 py-3 rounded shadow-lg transition-all duration-500 z-50 flex items-center space-x-3">
        <span className="mr-2">{successMessage}</span>
        <button onClick={() => setSuccessMessage("")} className="hover:text-green-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )}
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
      {/* < users */}
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
                <div
                  key={user.id}
                  className="bg-white p-2 rounded-lg shadow-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-bold mb-1">{user.first_name}</p>
                    <p className="mb-1">{user.email}</p>
                  </div>
                  <button
                    className="px-2 py-1 bg-red-900 text-white rounded-lg"
                    onClick={() => openModal(user)}
                  >
                    Modifications
                  </button>
                </div>
              ))
            ) : (
              <p>Aucun utilisateur correspondant</p>
            )}
          </div>
          {/* < modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 max-w-lg mx-auto rounded-lg shadow-2xl border-2 border-gray-300 relative">
                <button
                  className="absolute top-2 right-2 bg-red-900 text-white rounded-full p-1"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold mb-4">
                  Modifications utilisateur
                </h2>
                {selectedUser && (
                  <div>
                    <p className="text-lg">User: {selectedUser.first_name}</p>
                    <p>Email: {selectedUser.email}</p>
                    <label htmlFor="userTypes">Type d'utilisateurs</label>
                    <select
                      name="userTypes"
                      id="userTypes"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option
                        value="1"
                        selected={
                          selectedUser ? selectedUser.user_type_id == 1 : false
                        }
                      >
                        Admin
                      </option>
                      <option
                        value="2"
                        selected={
                          selectedUser ? selectedUser.user_type_id == 2 : false
                        }
                      >
                        Employées
                      </option>
                      <option
                        value="3"
                        selected={
                          selectedUser ? selectedUser.user_type_id == 3 : false
                        }
                      >
                        Utilisateurs
                      </option>
                      <option
                        value="4"
                        selected={
                          selectedUser ? selectedUser.user_type_id == 4 : false
                        }
                      >
                        Bannir
                      </option>
                    </select>
                  </div>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-red-900 text-white rounded-lg"
                    onClick={deleteUser}
                  >
                    Supprimer
                  </button>
                  <button
                    className="px-4 py-2 bg-red-900 text-white rounded-lg"
                    onClick={updateUser}
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* </ modal */}
        </div>
      )}
      {/* </ users */}

      {/* < stats */}
      {activeTab === "stats" && (
        <div>
          <div className=" pb-5">
            {" "}
            <QuickStats />
          </div>
          <LinePlotChart />
          <div className="pt-6 pb-6">
            {" "}
            <PieCharts />
          </div>
        </div>
      )}
      {/* </ stats */}
    </div>
  );
};
export default Admin;
