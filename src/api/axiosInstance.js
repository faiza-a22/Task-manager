import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://test.xpresspayments.com:9000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userInfo) => {
  const response = await axios.post("https://test.xpresspayments.com:9000/register", userInfo);
  return response.data;
};

export default axiosInstance;