import axios from "axios";

export const registerUser = async (userInfo) => {
  return await axios.post(
    "https://test.xpresspayments.com:9000/register",
    userInfo
  );
};

export const loginUser = async (credentials) => {
  return await axios.post(
    "https://test.xpresspayments.com:9000/login",
    credentials
  );
};