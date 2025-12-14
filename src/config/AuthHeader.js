import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    error => {
        // Backend responded (500, 400, etc.)
        console.log(error)
        if (error.response) {
            const message =
                error.response.data?.message ||
                error.response.data?.error ||
                "Something went wrong";

            toast.error(message);
        }
        // No response (server down, CORS, network)
        else {
            toast.error("Server not reachable");
        }

        // IMPORTANT: reject so calling code stops
        return {data: null};
    }
);

export default api;
