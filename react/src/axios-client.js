import axios from "axios";

// elodie

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.get('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
})

axiosClient.interceptors.response.use((response) =>{
    return response;
}, (error) =>{
    const {response} = error;
    if(response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN');
    }

    throw error;
})

export default axiosClient;

// exemple sur view
// axiosClient.post('/login', payload)
// .then(({data}) => {
//   setUser(data.user) 
//   setToken(data.token)
// })
// .catch(err => {
//   const response = err.response;
//   if(response && response.status === 422){
//     console.log(response.data.errors);
//   }
// })