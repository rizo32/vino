import axios from "axios";
// Elodie

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Gestion du Cross-site request forgery token
let cachedCsrfToken = null;
async function getCsrfToken() {
    if (cachedCsrfToken) {
        return cachedCsrfToken;
    }
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/csrf-token`
    );
    cachedCsrfToken = response.data.token;
    return cachedCsrfToken;
}

axiosClient.interceptors.request.use(
    async function (config) {
        config.headers["X-CSRF-TOKEN"] = await getCsrfToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Access token pour l'authentification
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    // Attache le token au header d'authorization
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // Retour des messages d'erreur
        console.log(error);
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
            if (error.response.status === 422) {
                const errors = error.response.data.errors;
                // Gab: j'ai enlevé la ligne suivante pour pouvoir gérer l'erreur différemment dans la vue selon la clé
                // const errorMessages = Object.keys(errors).map((key) => errors[key][0]);
                return Promise.reject(errors);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
