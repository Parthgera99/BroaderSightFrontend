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


function Navbar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Hamburger state
  const [openDropDown, setOpenDropDown] = useState(false);

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
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
            BroaderSight
          </h1>
        </Link>

          <ul className="font-montserrat lg:flex max-lg:hidden items-center gap-16">
            <Link href="/explore-blogs" className="nav-link">Explore</Link>
            <Link href="/category" className="nav-link">Categories</Link>
            <Link href="/about" className="nav-link">About</Link>
          </ul>
      

      {/* Right Side - Sign In / User Profile */}
      <div className="h-[45px]">
        {loading ? (
          <Skeleton className="w-[75px] h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></Skeleton>
        ) : isAuthenticated ? (
          <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
            <DropdownMenuTrigger>
            <Avatar>
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              <AvatarImage
                src={user?.profilePicture}
                className="h-10 border rounded-full"
              />
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem><Link onClick={() => setOpenDropDown(false)} href="/dashboard/profile" className="w-full">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem><Link onClick={() => setOpenDropDown(false)}  href="/dashboard">Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem><ThemeToggle /></DropdownMenuItem>
              <DropdownMenuItem><Button onClick={logout}>Logout</Button></DropdownMenuItem>
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
      
      </>
  );
}

export default Navbar;
