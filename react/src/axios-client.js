import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function getCsrfToken() {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/csrf-token`);
  return response.data.token;
}

// Add an Axios interceptor to include the CSRF token header
axiosClient.interceptors.request.use(async function(config) {
  config.headers['X-CSRF-TOKEN'] = await getCsrfToken();
  return config;
}, 
  function (error) {
  return Promise.reject(error);
}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle error responses
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect the user to the login page if they are unauthorized
        //a modifier puisque ca marche pas comme ca notre redirection login je pense
        window.location.href = '/login';
      }
      if (error.response.status === 422) {
        // Handle validation errors
        // You can customize this to match your validation error response structure
        const errors = error.response.data.errors;
        const errorMessages = Object.keys(errors).map((key) => errors[key][0]);
        return Promise.reject(errorMessages);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
