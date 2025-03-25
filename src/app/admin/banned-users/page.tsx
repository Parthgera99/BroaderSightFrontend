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
    const { user, isAuthenticated, isAdmin, loading, fetchUser } = useAuth();
    const [bannedUserList, setBannedUserList] = useState<User[]>([]);

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
        <div>
            <div className='flex gap-6 flex-wrap'>
                {bannedUserList.map((bannedUser) => (
                    <div key={bannedUser._id}>
                        <p>Email: {bannedUser.email}</p>
                        <p>Role: {bannedUser.role}</p>
                        <p>Username: {bannedUser.username}</p>
                        <p>Is Banned: {bannedUser.isBanned ? 'Yes' : 'No'}</p>
                        <p>Earnings : {bannedUser.earnings}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default page