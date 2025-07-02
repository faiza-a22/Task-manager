import axiosInstance from "./axiosInstance";

export const registerUser = async (userInfo) => {
  return await axiosInstance.post("/register", userInfo);
};