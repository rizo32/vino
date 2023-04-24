import axios from 'axios';
// Elodie

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

let cachedCsrfToken = null;
async function getCsrfToken() {
  if (cachedCsrfToken) {
    return cachedCsrfToken;
  }
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/csrf-token`);
  cachedCsrfToken = response.data.token;
  return cachedCsrfToken;
}

// Access token pour l'authentification
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  // Attach the token to the Authorization header
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

// Gestion du token CSRF
axiosClient.interceptors.request.use(async function(config) {
  config.headers['X-CSRF-TOKEN'] = await getCsrfToken();
  return config;
}, 
  function (error) {
  return Promise.reject(error);
}
);


axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle error responses
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      if (error.response.status === 422) {
        // Retour des messages d'erreur
        const errors = error.response.data.errors;
        const errorMessages = Object.keys(errors).map((key) => errors[key][0]);
        return Promise.reject(errorMessages);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
