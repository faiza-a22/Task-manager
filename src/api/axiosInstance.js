import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://test.xpresspayments.com:9000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;