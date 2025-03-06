"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api"; 
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";


interface User {
  id: string;
  fullname: string;
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
      setLoading(true);
    
      // Check if accessToken exists in cookies/localStorage
      // const accessToken = document.cookie
      //   .split("; ")
      //   .find((row) => row.startsWith("accessToken="))
      //   ?.split("=")[1];

        // const cookies = Object.fromEntries(
        //   document.cookie.split("; ").map(c => c.split("="))
        // );
        // const accessToken = cookies.accessToken;

        // const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
        // const accessToken = match ? match[1] : undefined;

        console.log(document.cookie)
            
        // console.log(accessToken)
        //   if (!accessToken) {
        //     console.warn("No access token found. Skipping API call.");
        //     setUser(null);
        //     setLoading(false);
        //     return;
        //   }
      
          try {
            const response = await api.get("/users/details", { withCredentials: true });
            console.log("User data = ", response.data.data);
            const fetchedUser = response.data.data.givableUser;
            setUser(response.data.data.givableUser);

            if (!fetchedUser.fullname) {
               // Redirect new users
            }
        
            
          } catch (error: any) {
            if (error.response?.status === 401) {
              console.warn("User not authenticated.");
              setUser(null); // Ensure user state is set to null
            } else {
              console.error("Failed to fetch user", error);
            }
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
