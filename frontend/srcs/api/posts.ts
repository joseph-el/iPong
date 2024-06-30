import axios from 'axios';
// import { env } from 'process';


// console.log("-----ENVS-->", env);
// import dotenv from 'dotenv';
// dotenv.config();

// console.log(dotenv);
const url = import.meta.env.VITE_URL;

const api = axios.create({
  baseURL: `http://${url}:3000`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export default api;
