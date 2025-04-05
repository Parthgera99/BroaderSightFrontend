"use client"
import React, { useState , useEffect} from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";
import { Squash as Hamburger } from "hamburger-react"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from "./navbar.module.css";
import { Skeleton } from "./ui/skeleton";
import { User2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";


function Navbar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Hamburger state
  const [openDropDown, setOpenDropDown] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutFn = () => {
    logout();
    setLogoutModal(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);
  

  return (
    <>
    <nav className="fixed w-full z-50 top-0 flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b">
      
      {/* Left Side - Logo & Name (Desktop) / Hamburger Menu (Mobile) */}
      <div className="flex items-center gap-4 lg:hidden ">
        {/* Hamburger (Visible only on Mobile) */}
        <div onClick={() => setIsOpen(!isOpen)} className="z-60">
          <Hamburger toggled={isOpen} toggle={setIsOpen} direction="left" size={24}/>
        </div>
        
      </div>
      
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-lg font-semibold nav-link text-zinc-700 dark:text-zinc-50 hover:text-purple-600 hover:dark:text-purple-300 duration-300">
            BroaderSight
          </h1>
        </Link>

          <ul className="font-montserrat lg:flex max-lg:hidden items-center gap-16">
            <Link href="/explore-blogs" className="nav-link text-zinc-700 dark:text-zinc-50 hover:text-purple-600 hover:dark:text-purple-300 font-semibold duration-300">Explore</Link>
            <Link href="/category" className="nav-link text-zinc-700 dark:text-zinc-50 hover:text-purple-600 hover:dark:text-purple-300 font-semibold duration-300">Categories</Link>
            <Link href="/about" className="nav-link text-zinc-700 dark:text-zinc-50 hover:text-purple-600 hover:dark:text-purple-300 font-semibold duration-300">About</Link>
          </ul>
      

      {/* Right Side - Sign In / User Profile */}
      <div className="h-[45px]">
        {loading ? (
          <Skeleton className="w-[75px] h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></Skeleton>
        ) : isAuthenticated ? (
          <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <Avatar>
                <AvatarFallback>
                  <div className="w-10 h-10 rounded-full dark:bg-gray-800 bg-gray-200 p-auto flex text-center items-center">
                    <User2 className="w-[60%] h-[60%] dark:text-gray-300 text-gray-600 my-auto m-auto" />
                  </div>                
                </AvatarFallback>
              <AvatarImage
                src={user?.profilePicture}
                className="h-10 border rounded-full"
              />
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem><Link onClick={() => setOpenDropDown(false)} href="/dashboard/profile" className="w-full">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem><Link onClick={() => setOpenDropDown(false)}  href="/dashboard" className="w-full">Dashboard</Link></DropdownMenuItem>
              {user?.role === "admin" && <DropdownMenuItem><Link onClick={() => setOpenDropDown(false)} className="w-full" href="/admin">Admin</Link></DropdownMenuItem>}
              <DropdownMenuItem><ThemeToggle /></DropdownMenuItem>
              <DropdownMenuItem><Button className="bg-red-500 dark:bg-red-200 hover:dark:bg-red-300 hover:bg-red-600" onClick={()=>{setLogoutModal(true); setOpenDropDown(false)}}>Logout</Button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in">
            <Button variant="outline" className="max-sm:text-xs h-[40px]">Sign In</Button>
          </Link>
        )}
      </div>

    </nav>

        {/* SideNavbar */}
    <div className={`${isOpen ? styles.sideNavOpen : styles.sideNavClose} dark:bg-zinc-950 bg-zinc-50 dark:text-zinc-50 text-zinc-900`} >
          <ul className={styles.navList}>
            <Link href="/explore-blogs" onClick={() => setIsOpen(false)} className="dark:hover:bg-zinc-700 hover:bg-zinc-200 dark:text-zinc-50 py-4 nav-link font-montserrat font-semibold">Explore</Link>
            <Link href="/category" onClick={() => setIsOpen(false)} className="dark:hover:bg-zinc-700 hover:bg-zinc-200 dark:text-zinc-50 py-4 nav-link font-montserrat font-semibold">Categories</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="dark:hover:bg-zinc-700 hover:bg-zinc-200 dark:text-zinc-50 py-4 nav-link font-montserrat font-semibold">About</Link>
          </ul>
        </div>


        {/* Logout Modal  */}
        <Dialog open={logoutModal} onOpenChange={setLogoutModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to Logout?</p>
        <div className="flex justify-end gap-4">
          <Button onClick={() => setLogoutModal(false)} variant="outline">Cancel</Button>
          <Button onClick={logoutFn} variant="destructive">Logout</Button>
        </div>
      </DialogContent>
    </Dialog>
      
      </>
  );
}

export default Navbar;
