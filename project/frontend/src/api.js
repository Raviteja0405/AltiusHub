import axios from "axios";

/**
 * Centralized Axios instance. In production, consider env vars:
 * VITE_API_BASE_URL, etc.
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 8000,
});

export default api;

