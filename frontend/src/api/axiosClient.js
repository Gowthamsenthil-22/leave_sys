import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://leave-sys-backend.onrender.com",
});

export default axiosClient;
