"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
// import { MoreDropdown } from './layout/MoreDropdown';
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image';
import { useAuth } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggle from './ThemeToggle';



function Navbar() {
  const { user, isAuthenticated, isAdmin, loading, logout } = useAuth();
  return (

    <nav className="flex justify-between items-center px-12 py-4 bg-zinc-50 dark:bg-zinc-800 border-b">
      {/* Left - Brand Logo */}
      <Link href="/" className="text-lg flex gap-4 items-center font-semibold">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={32}
        height={32}
        className="mr-2"
      />
        <h1 className='text-md text-zinc-900 hover:text-purple-700 duration-500 dark:hover:text-purple-200 dark:text-slate-50 font-montserrat'>
          BroaderSight  
        </h1>
      </Link>

      {/* Middle - Navigation Links */}
      <div className="flex gap-12 items-center font-montserrat">
        <Link href="/explore-blogs" className="text-base px-4 font-semibold hover:text-purple-700 dark:hover:text-purple-200 text-zinc-900 dark:text-slate-50 duration-500">Explore</Link>
        <Link href="/category" className="text-base px-4 font-semibold hover:text-purple-700 dark:hover:text-purple-200 text-zinc-900 dark:text-slate-50 dark:hover:text-gray-300 duration-500">Categories</Link>
        <Link href="/about" className="text-base px-4 font-semibold hover:text-purple-700 dark:hover:text-purple-200 text-zinc-900 dark:text-slate-50 dark:hover:text-gray-300 duration-500">About</Link>

        {/* More Dropdown (Client Component) */}
        {/* <MoreDropdown/> */}
      </div>

      {/* Right - Sign In Button */}
      {loading ? (
        <Button variant="nav" className='bg-slate-200 dark:bg-zinc-800 w-[8vw] h-[40px]'>
          <Skeleton /> 
        </Button>
) : isAuthenticated ? (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.profilePicture || undefined} className='h-10 border rounded-full' />
              <AvatarFallback>{user?.email.charAt(0).toUpperCase()}</AvatarFallback>
              {/* <AvatarFallback>
                {user?.name
                  ? user.name.split(" ").map(word => word[0]).join("").toUpperCase()
                  : user?.email?.slice(0, 2).toUpperCase()} 
              </AvatarFallback> */}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={"/dashboard/profile"}>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link href={"/dashboard"}>
                DashBoard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ThemeToggle/>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button onClick={logout}>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          
        </>
      ) : (
        <Link href="/sign-in">
          <Button variant="outline" className='w-[8vw] h-[40px]'>Sign In</Button>
        </Link>
      )}
      
    </nav>


  )
}

export default Navbar