import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  // Attach the token to the Authorization header
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}),
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      try {

        // Destructure the error and keeps the response
        const { response } = error;
        if (response.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch(e) {
        console.error(e);
      }
      
      // On pourrait rediriger vers d'autres erreurs ici
      throw error;
    }
  );

export default axiosClient;
