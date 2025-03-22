"use client"
import { useAuth } from '@/context/UserContext';
import { Separator } from '@radix-ui/react-dropdown-menu';
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

function page() {
    const { user, isAdmin, loading } = useAuth();
    const [userList, setUserList] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const limit = 50; // Adjust as needed
    const [totalPages, setTotalPages] = useState(1);

    const fetchUserList = async (pageNumber : Number) => {
        try {
            const response = await api.get(`/admin/userlist?page=${pageNumber}&limit=${limit}`, { withCredentials: true });
            console.log(response.data.data.users);
            setTotalPages(response.data.data.totalPages); // Assuming API returns total pages
            setUserList(response.data.data.users) 
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
        <div>
            User List Page
            
            <div className='flex gap-6 flex-wrap'>
                {userList.map((user) => (
                    <div key={user._id}>
                        <p>Full Name: {user.fullname}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>Username: {user.username}</p>
                        <p>Is Banned: {user.isBanned ? 'Yes' : 'No'}</p>
                        <p>Earnings : {user.earnings}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                  Previous
              </button>

              <span>Page {page} of {totalPages}</span>

              <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                  Next
              </button>
          </div>

        </div>

    )
}

export default page