import axios from "axios";

const baseURL =   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// ✅ Define the base API instance
const api = axios.create({
  baseURL, 
  withCredentials: true, // Needed for cookies (authentication)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
