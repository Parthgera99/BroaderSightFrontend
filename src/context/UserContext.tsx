"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api"; 
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";


interface Category {
  _id: string;
  name: string;
  slug?: string;
}

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  displayImage?: string;
  content?: string;
  category?: Category[];
  metaDescription?: string;
  metaTitle?: string;
  tags?: string[];
  author?: User;
  isPublished?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  date?: Date;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  profilePicture?:string;
  username?:string;
  mobileNumber?:string;
  bio?:string;
  earnings?:number;
  blogs?:Blog[];
  role: "user" | "admin" | "superadmin";
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch user data
  const fetchUser = async () => {
    setLoading(true);
    console.log(document.cookie);
  
    try {
      const response = await api.get("/users/details", { withCredentials: true });
  
      if (!response) {
        console.log("Failed to fetch user details")
      }

      
  
      const fetchedUser = response?.data.data.givableUser;
      
      // Fetch blogs only if user exists
      let blogs = [];
      if (fetchedUser?.username) {
        const blogsResponse = await api.get(`/blog/user/${fetchedUser.username}`);
        blogs = blogsResponse ? blogsResponse.data.data.user.blogs : [];
      }
      
      fetchedUser.blogs = blogs;
      setUser(fetchedUser);
      
    } catch (error: any) {
        console.log("refreshing")
        // Attempt to refresh token
        const refreshed = await refreshToken();
        if (refreshed) {
          return fetchUser(); 
        }
  
        setUser(null); // Clear user state if refresh fails
      
    } finally {
      setLoading(false);
      console.clear()
    }
  };
  
  // ✅ Fixed refreshToken function
  const refreshToken = async () => {
    try {
      const res = await api.post("/users/refreshtoken", {}, { withCredentials: true }).catch(() => null);
      if (res?.status === 200) {
        console.log("Access token refreshed successfully.");
        return true;
      }
    } catch (error) {
      console.warn("Error refreshing token");
    }
    return false;
  };

  
  

  // Logout function
  const logout = async () => {
    setLoading(true)
    try {
      await api.post("/users/logout", {withCredentials:true}); // Backend should clear cookies
      setUser(null);
      router.push("/sign-in");
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on mount
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, isAdmin, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook to use the user context
// export function useUser() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }
