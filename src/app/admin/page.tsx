"use client"
import { useAuth } from '@/context/UserContext';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import api from '@/lib/api';

function Page() {
    const { user, isAdmin, loading } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBlogs: 0,
        totalAdmins: 0,
        totalBannedUsers: 0,
        totalCategories: 0,
        newUsersThisMonth: 0
    });

    const fetchStats = async () => {
        try {
            const response = await api.get(`/admin/stats`, { withCredentials: true });
            setStats(response.data.data);
        } catch (error) {
            console.error('Error fetching Website Stats ', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }

    return (
        <div className='px-64 max-md:px-8 max-xl:px-32 max-lg:px-16 py-20 flex flex-col gap-16 items-center justify-center'>
            <h1 className='text-5xl max-md:text-3xl text-center dark:text-zinc-200 text-zinc-700 font-montserrat'>
                Welcome <b className='font-medium dark:text-purple-200 text-purple-800'>{user.fullname}</b> to Your Admin Panel
            </h1>
            <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 items-center'>
                {[
                    { label: "Total Users", value: stats.totalUsers, darkBg: "dark:bg-green-800", bg:"bg-green-200" },
                    { label: "Total Blogs", value: stats.totalBlogs, darkBg: "dark:bg-purple-800", bg:"bg-purple-200" },
                    { label: "Total Admins", value: stats.totalAdmins, darkBg: "dark:bg-blue-800", bg:"bg-blue-200" },
                    { label: "Total Banned Users", value: stats.totalBannedUsers, darkBg: "dark:bg-red-800", bg:"bg-red-200" },
                    { label: "Total Categories", value: stats.totalCategories, darkBg: "dark:bg-pink-800", bg:"bg-pink-200" },
                    { label: "New Users", value: stats.newUsersThisMonth, darkBg: "dark:bg-teal-700", bg:"bg-teal-200" }
                ].map((stat, index) => (
                    <div 
                        key={index} 
                        className={`p-4 font-montserrat ${stat.darkBg} ${stat.bg} flex flex-col gap-1 items-center justify-center rounded-lg`}
                    >
                        <p className='text-center text-lg'>{stat.label}</p>
                        <h2 className='text-4xl'>
                            <CountUp start={0} end={stat.value} duration={2} separator="," />
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
