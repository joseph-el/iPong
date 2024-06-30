import axios from "axios";
import { env } from "process";

const api = axios.create({
  baseURL: env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export default api;
