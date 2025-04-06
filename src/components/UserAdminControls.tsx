"use client"
import React, { useState , useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import api from '@/lib/api';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
  

  type User = {
    _id: string;
    fullname: string;
    email: string;
    profilePicture?:string;
    username?:string;
    mobileNumber?:string;
    bio?:string;
    earnings?:number;
    blogs:Blog[];
    role: "user" | "admin";
    createdAt: Date;
    isBanned: boolean
  }

  type Blog = {
    _id: string;
    displayImage: string;
    title: string;
    slug: string;
    metaDescription: string;
    metaTitle:string;
    date: string;
    tags:string[];
    faq:[{
        question:string,
        answer:string
    }];
    author:{
      fullname: string;
      username: string;
      profilePicture: string;
      role: string;
    }
    content:[{
        type:string,
        value:any
    }]
  };

  

  
  
    
function UserAdminControls({user, currentUser}:{user:User , currentUser:User}) {
        
    const router = useRouter();
    const isSuperAdmin = currentUser.email === "parthgera2004@gmail.com";
    const isOtherUserAdmin = user.role === "admin";
    const isOtherUserBanned = user.isBanned;


    const makeAdmin = async (user:User) => {
        try {
            const response = await api.post(`/admin/make-admin/${user.username}`);
            toast.success(response.data.message);
            router.refresh();
        } catch (error) {
            if(axios.isAxiosError(error)) toast.error(error.response?.data.message);
        }
      };

    const removeAdmin = async (user:User) => {
        try {
            const response = await api.post(`/admin/remove-admin/${user.username}`);
            toast.success(response.data.message);
            router.refresh();
          } catch (error) {
              if(axios.isAxiosError(error)) toast.error(error.response?.data.message);
          }
      };

    const banUser = async (user:User) => {
        try {
            const response = await api.post(`/admin/ban/${user.username}`, {unpublishBlogs : true});
            toast.success(response.data.message);
            router.refresh();
          } catch (error) {
              if(axios.isAxiosError(error)) toast.error(error.response?.data.message);
          }
      };

    const unbanUser = async (user:User) => {
        try {
            const response = await api.post(`/admin/unban/${user.username}`);
            toast.success(response.data.message);
            router.refresh();
          } catch (error) {
              if(axios.isAxiosError(error)) toast.error(error.response?.data.message);
          }
      };
    

  return (
    
    <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
            <div className='flex flex-col gap-1 w-[36px] duration-300 rounded-full p-2 hover:dark:bg-zinc-800 hover:bg-zinc-200 items-center justify-center'>
                <div className='w-1 h-1 rounded-full dark:bg-zinc-50 bg-zinc-900'></div>
                <div className='w-1 h-1 rounded-full dark:bg-zinc-50 bg-zinc-900'></div>
                <div className='w-1 h-1 rounded-full dark:bg-zinc-50 bg-zinc-900'></div>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='min-w-[200px]'>
        <DropdownMenuLabel className='text-purple-700 dark:text-purple-300'>Admin Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
            {user.role === "user" && (
            <DropdownMenuItem className='cursor-pointer' onClick={() => makeAdmin(user)}>
                Make Admin
            </DropdownMenuItem>
            )}

            {isOtherUserAdmin && isSuperAdmin && (
            <DropdownMenuItem className='cursor-pointer' onClick={() => removeAdmin(user)}>
                Remove Admin
            </DropdownMenuItem>
            )}

            {!isOtherUserBanned && (
            <DropdownMenuItem className='cursor-pointer' onClick={() => banUser(user)}>
                Ban User
            </DropdownMenuItem>
            )}

            {isOtherUserBanned && (
            <DropdownMenuItem className='cursor-pointer' onClick={() => unbanUser(user)}>
                Unban User
            </DropdownMenuItem>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  
  )
}

export default UserAdminControls