import axios from "axios";
const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",
  timeout: 10000,
  withCredentials: true,
});
export default baseApi;
