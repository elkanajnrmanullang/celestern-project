import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api",
  withCredentials: false, // untuk Sanctum tidak perlu if you're not using cookies
});

instance.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem("auth_user"));
  if (authData?.token) {
    config.headers.Authorization = `Bearer ${authData.token}`;
  }
  return config;
});

export default instance;
