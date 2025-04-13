"use client"
import { useAuth } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

type User = {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    isBanned: boolean;
    username: string;
    earnings: number;
  };

function Page() {
    const { user, isAdmin, loading } = useAuth();
    const [bannedUserList, setBannedUserList] = useState<User[]>([]);

    const Router = useRouter();

    const fetchBannedUserList = async () => {
            try {
                const response = await api.get(`/admin/banned-user-list`, { withCredentials: true });
                console.log(response.data.data.users);
                setBannedUserList(response.data.data.users) 
            } catch (error) {
                console.error('Error fetching admin list:', error);
            }
        };
    
        useEffect(() => {
            fetchBannedUserList();
        }, []);
  

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }
    
    return (

        <div className='pt-16 flex flex-col gap-10'>
            <h1 className='text-2xl font-semibold text-center font-montserrat'>Banned Users List</h1>

            <div className="w-[100%] scrollbar-hidden whitespace-nowrap overflow-x-auto pr-[290px] max-sm:pr-[80px]">
                <table className="min-w-max shadow-md">
                    <thead className="dark:bg-zinc-800 dark:text-zinc-100 bg-zinc-300 text-zinc-700">
                        <tr>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap"></th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Full Name</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Email</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Role</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Username</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bannedUserList.map((bannedUser, index) => (
                            <tr onClick={() => Router.push(`/user/${bannedUser.username}`)} key={bannedUser._id} className={index % 2 === 0 ? "dark:bg-zinc-700 bg-zinc-200 cursor-pointer" : "dark:bg-zinc-600 bg-zinc-100 cursor-pointer"}>
                                <td className="border border-zinc-400 px-4 py-2 text-center">{index +1}</td>
                                <td className="border border-zinc-400 px-4 py-2">{bannedUser.fullname ? bannedUser.fullname : 'N/A'}</td>
                                <td className="border border-zinc-400 px-4 py-2">{bannedUser.email}</td>
                                <td className="border border-zinc-400 px-4 py-2">{bannedUser.role}</td>
                                <td className="border border-zinc-400 px-4 py-2"> {bannedUser.username} </td>
                                <td className="border border-zinc-400 px-4 py-2">{bannedUser.earnings}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        
        </div>

    )
}

export default Page