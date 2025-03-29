"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { useEffect } from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";

const pageTitles: Record<string, string> = {
    "/admin": "Admin",
    "/admin/category-list": "Admin / Category List",
    "/admin/user-list": "Admin / Users List",
    "/admin/admin-list": "Admin / Admin List",
    "/admin/banned-users": "Admin / Banned Users",
  };

export default function Layout({ children }: { children: React.ReactNode }) {
    
    const { user, isAuthenticated, isAdmin, loading } = useAuth();
    const pathname = usePathname(); 
    const pageTitle = pageTitles[pathname] || "Admin Panel"; 
        const router = useRouter();
      
        useEffect(() => {
            if (loading) return; 
            
            if (!isAuthenticated) {
                router.replace("/sign-in"); 
            } else if (!isAdmin) {
                router.replace("/"); 
            }
        }, [loading, user, isAdmin]); 
    
        if (loading || !user || !isAdmin) {
            return <div><Loader2 className='animate-spin text-center mt-[45vh] max-sm:mt-[40vh] ml-[49vw]'/></div>;
        }



  return (
    <SidebarProvider>
    <AdminSidebar/>
      <main className="flex flex-col w-full">
        <div className="flex dark:bg-zinc-800 bg-zinc-50 items-center gap-8 w-full px-2 py-2">
            <SidebarTrigger className="hover:dark:bg-zinc-800"/>
            <h1>{pageTitle}</h1>
        </div>
        <Separator className="h-[1px] w-full dark:bg-zinc-800 bg-zinc-200"/>
        <div className="pl-[50px] max-sm:pl-[30px]">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
