import axios from "axios";

export const registerUser = async (userInfo) => {
  return await axios.post(
    "https://test.xpresspayments.com:9000/register",
    userInfo
  );
};