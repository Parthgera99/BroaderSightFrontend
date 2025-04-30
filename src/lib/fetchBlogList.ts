import api from "@/lib/api";

type Blog = {
    _id: string;
    displayImage: string;
    category: [Category];
    title: string;
    metaDescription: string;
    authorName: string;
    slug: string;
    authorProfilePicture: string;
    date: string;
    authorRole: string;
    author:{
      fullname: string;
      username: string;
      profilePicture: string;
      role: string;
    }
  };
  
  type Category = {
    _id: string;
    name: string;
    slug: string;
  }



export async function fetch3BlogList(): Promise<Blog[]> {
    try {
      const response = await api.post("/blog/list?limit=3", {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
  
      // console.log(response.data.data.blogs)
  
      // ✅ Axios automatically parses JSON, so no need for `.json()`
      if (!response.data.data || !response.data.data.blogs) {
        throw new Error("Failed to fetch blogs");
      }
  
      return response.data.data.blogs;
    } catch (error) {
    //   console.error("Error fetching blogs:", error);
      return [];
    }
  }


  export async function fetchCategory3BlogsList(category: string): Promise<Blog[]> {
    try {
      const baseURL =   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const res = await fetch(`${baseURL}/blog/category/${category}?type=trending&limit=3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } 
      });
  
      if (!res.ok) {
        console.log(`Failed to fetch ${category} blogs`);
        return [];
      }
  
      const json = await res.json();
  
      if (!json?.data?.blogs) {
        throw new Error("No blogs found in response");
      }
  
      return json.data.blogs;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  }
  