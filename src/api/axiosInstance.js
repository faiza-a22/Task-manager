import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://test.xpresspayments.com/swagger/index.html",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;