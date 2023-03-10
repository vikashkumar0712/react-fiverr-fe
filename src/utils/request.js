import axios from "axios";

export const newRequest = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
  withCredentials: true,
});
