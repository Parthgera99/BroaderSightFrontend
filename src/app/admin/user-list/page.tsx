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
    blogCount: number
  };

function page() {
    const { user, isAdmin, loading } = useAuth();
    const [userList, setUserList] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const [totalPages, setTotalPages] = useState(1);

    const Router = useRouter();

    const fetchUserList = async (pageNumber : Number) => {
        try {
            const response = await api.get(`/admin/userlist?page=${pageNumber}&limit=${limit}`, { withCredentials: true });
            console.log(response.data.data.userList);
            setTotalPages(response.data.data.totalPages);
            setUserList(response.data.data.userList) 
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        fetchUserList(page);
    }, [page]);

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className='pt-16 flex flex-col gap-10'>
            <h1 className='text-2xl dark:text-zinc-100 text-zinc-700 font-semibold text-center font-montserrat'>All Users List</h1>
            
            <div className="w-[100%] scrollbar-hidden whitespace-nowrap overflow-x-auto pr-[290px] max-sm:pr-[80px]">
            <table className="min-w-max shadow-md">
                <thead className="dark:bg-zinc-800 dark:text-zinc-100 bg-zinc-300 text-zinc-700 ">
                    <tr>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap"></th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Full Name</th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Email</th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Role</th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Username</th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Is Banned</th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Blog Count</th>
                        <th className="border border-zinc-400 dark:border-zinc-400 px-8 py-2 whitespace-nowrap">Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => (
                        <tr onClick={() => Router.push(`/user/${user.username}`)} key={user._id} className={index % 2 === 0 ? "dark:bg-zinc-700 bg-zinc-200 cursor-pointer" : "dark:bg-zinc-600 bg-zinc-100 cursor-pointer"}>
                            <td className="border border-zinc-400 px-4 py-2 text-center">{(page - 1) * limit + index + 1}</td>
                            <td className="border border-zinc-400 px-4 py-2">
                                {user.fullname ? user.fullname : 'N/A'}
                            </td>
                            <td className="border border-zinc-400 px-4 py-2">{user.email}</td>
                            <td className="border border-zinc-400 px-4 py-2">{user.role}</td>
                            <td className="border border-zinc-400 px-4 py-2">{user.username}</td>
                            <td className="border border-zinc-400 px-4 py-2 text-center">{user.isBanned ? 'Yes' : 'No'}</td>
                            <td className="border border-zinc-400 px-4 py-2 text-center">{user.blogCount}</td>
                            <td className="border border-zinc-400 px-4 py-2">{user.earnings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


            
            <div className="flex items-center justify-center mt-6 gap-4">
              <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 dark:bg-zinc-950 dark:text-zinc-100 bg-zinc-200 rounded disabled:opacity-50"
                  >
                  Previous
              </button>

              <span>Page {page} of {totalPages}</span>

              <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 dark:bg-zinc-950 dark:text-zinc-100 bg-zinc-200  bg-gray-200 rounded disabled:opacity-50"
                  >
                  Next
              </button>
            </div>

        </div>

    )
}

export default page