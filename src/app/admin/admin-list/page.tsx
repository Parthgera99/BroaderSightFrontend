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
    blogCount: number;
  };

function Page() {
    const { user, isAdmin, loading } = useAuth();
    const [adminList, setAdminList] = useState<User[]>([]);
    const [error, setError] = useState<boolean>(false);

    const Router = useRouter();


    const fetchAdminList = async () => {
        try {
            const response = await api.get(`/admin/list`, { withCredentials: true });
            console.log(response.data.data.adminList);
            setAdminList(response.data.data.adminList) 
        } catch (error:any) {
            if (error.response && error.response.status === 403) {
                setError(true); 
            } else {
                console.error("Error fetching admin list:", error);
            }
            setAdminList([]);
        }
    };

    useEffect(() => {
        fetchAdminList();
    }, []);

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <h1 className="text-center mt-8 text-red-500 font-semibold">Access Denied</h1>;
    }
    
    return (
        <div className='pt-16 flex flex-col justify-center gap-10'>
            <h1 className='text-2xl font-semibold text-center font-montserrat'>Admin List</h1>

            {setAdminList.length === 0 ? (<div>Access Denied</div>) : (
            <div className="w-[100%] scrollbar-hidden whitespace-nowrap overflow-x-auto pr-[290px] max-sm:pr-[80px]">
                <table className="min-w-max shadow-md">
                    <thead className="dark:bg-zinc-800 dark:text-zinc-100 bg-zinc-300 text-zinc-700">
                        <tr>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap"></th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Full Name</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Email</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Role</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Username</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Is Banned</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Blogs Count</th>
                            <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminList.map((admin, index) => (
                            <tr onClick={() => Router.push(`/user/${admin.username}`)} key={admin._id} className={index % 2 === 0 ? "dark:bg-zinc-700 bg-zinc-200 cursor-pointer" : "dark:bg-zinc-600 bg-zinc-100 cursor-pointer"}>
                                <td className="border border-zinc-400 px-4 py-2 text-center">{index +1}</td>
                                <td className="border border-zinc-400 px-4 py-2">{admin.fullname ? admin.fullname : 'N/A'}</td>
                                <td className="border border-zinc-400 px-4 py-2">{admin.email}</td>
                                <td className="border border-zinc-400 px-4 py-2">{admin.role}</td>
                                <td className="border border-zinc-400 px-4 py-2"> {admin.username} </td>
                                <td className="border border-zinc-400 px-4 py-2 text-center">{admin.isBanned ? 'Yes' : 'No'}</td>
                                <td className="border border-zinc-400 px-4 py-2"> {admin.blogCount} </td>
                                <td className="border border-zinc-400 px-4 py-2">{admin.earnings}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

        
        </div>

    )
}

export default Page