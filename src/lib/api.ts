import axios from "axios";

// ✅ Define the base API instance
const api = axios.create({
  baseURL: "http://192.168.29.237:8000/api/v1", 
  withCredentials: true, // Needed for cookies (authentication)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
