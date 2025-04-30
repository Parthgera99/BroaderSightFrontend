import api from "@/lib/api";
import { AxiosError } from "axios";

export async function getCategories() {
  try {
    console.log("Fetching categories...");

    const baseURL =   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    const res = await fetch(`${baseURL}/category/list`, {
      next: { revalidate: 120 }, // cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const json = await res.json();
    console.log("Categories fetched");
    return json.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
