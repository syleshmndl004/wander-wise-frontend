import axios from "axios"; // axios is for making HTTP requests

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseUrl,
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");//saves data stored in localStorage in the variable token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // adds the token to the Authorization header of the request
    }

    return config;// returns the modified config object to be used in the request
    
})

export default api; // exports the api instance for use in other parts of the application
