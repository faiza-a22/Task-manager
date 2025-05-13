import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://taskmanagement-production-41fc.up.railway.app/api/Task",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;