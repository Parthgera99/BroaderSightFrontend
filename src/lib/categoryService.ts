import api from "@/lib/api";
import { AxiosError } from "axios";

export async function getCategories() {
    try {
      console.log("Fetching categories...");
      const response = await api.get("/category/list");
      console.log("Categories fetched");
      return response.data.data;  
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error fetching categories:", err.response?.data || err.message);
      return [];  
    }
  }