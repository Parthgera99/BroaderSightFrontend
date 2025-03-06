"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api"; 
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";


interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?:string;
  username?:string;
  role: "user" | "admin" | "superadmin";
}

interface AuthContextProps {
  user: User | null;
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
    setLoading(true)
    try {
      
        const response = await api.get("/users/details",{withCredentials:true}); // Replace with your API route
        console.log("user data = ", response.data.data)
        setUser(response.data.data.givableUser);
      
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true)
    try {
      await api.post("/users/logout", {withCredentials:true}); // Backend should clear cookies
      setUser(null);
      router.push("/sign-in");
    } catch (error) {
      console.error(error)
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
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, loading, fetchUser, logout }}>
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
