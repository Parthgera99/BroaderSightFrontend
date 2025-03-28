import api from "@/lib/api";
import { AxiosError } from "axios";

export async function getTrendingAuthors() {
    try {
      const response = await api.get("/users/trending-authors");
      return response.data.data;  
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error fetching categories:", err.response?.data || err.message);
      return [];  
    }
  }