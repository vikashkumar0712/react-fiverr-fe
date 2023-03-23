import axios from "axios";
import constants from "../common/constants";

export const newRequest = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL || constants.ENUMS.BE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
