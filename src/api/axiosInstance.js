import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://test.xpresspayments.com:9000/swagger/index.html",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;