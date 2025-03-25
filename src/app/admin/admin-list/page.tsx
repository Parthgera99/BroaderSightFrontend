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
    const [adminList, setAdminList] = useState<User[]>([]);

    const fetchAdminList = async () => {
        try {
            const response = await api.get(`/admin/list`, { withCredentials: true });
            console.log(response.data.data.admins);
            setAdminList(response.data.data.admins) 
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };

    useEffect(() => {
        fetchAdminList();
    }, []);

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <div className='flex gap-6 flex-wrap'>
                {adminList.map((admin) => (
                    <div key={admin._id}>
                        <p>Full Name: {admin.fullname}</p>
                        <p>Email: {admin.email}</p>
                        <p>Role: {admin.role}</p>
                        <p>Username: {admin.username}</p>
                        <p>Is Banned: {admin.isBanned ? 'Yes' : 'No'}</p>
                        <p>Earnings : {admin.earnings}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default page