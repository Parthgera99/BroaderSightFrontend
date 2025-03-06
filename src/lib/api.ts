import axios from "axios";

// ✅ Define the base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1", // Replace with your backend URL
  withCredentials: true, // Needed for cookies (authentication)
});

export default api;
