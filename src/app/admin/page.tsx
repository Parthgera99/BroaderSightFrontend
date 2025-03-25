// "use client"
// import { useAuth } from '@/context/UserContext';
// import { Separator } from '@radix-ui/react-dropdown-menu';
// import { useRouter } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import api from '@/lib/api';

// function page() {
//     const { user, isAuthenticated, isAdmin, loading, fetchUser } = useAuth();
//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalBlogs: 0,
//         totalAdmins: 0,
//         totalBannedUsers: 0,
//         totalCategories: 0
//     });

//     const fetchStats = async () => {
//         try {
//             const response = await api.get(`/admin/stats`, { withCredentials: true });
//             console.log(response.data.data);
//             setStats(response.data.data);
//         } catch (error) {
//             console.error('Error fetching Website Stats ', error);
//         }
//     };

//     useEffect(() => {
//         fetchStats();
//     }, []);

//     if (loading || !user || !isAdmin) {
//         return <div>Loading...</div>;
//     }
    
//     return (
//         <div className='px-64 py-24 flex flex-col gap-10 items-center justify-center'>
//             <h1 className='text-5xl text-center font-montserrat'>
//                 Welcome {user.fullname} to Your Admin Panel
//             </h1>
//             <div className='grid grid-cols-3 gap-10 items-center'>
//                 <div className='p-4 font-montserrat dark:bg-green-800 bg-zinc-100 flex flex-col gap-1 items-center justify-center rounded-lg'>
//                     <p className='text-center text-lg'>Total Users</p>
//                     <h2 className='text-4xl'>{stats.totalUsers}</h2>
//                 </div>
//                 <div className='p-4 font-montserrat dark:bg-purple-800 bg-zinc-100 flex flex-col gap-1 items-center justify-center rounded-lg'>
//                     <p className='text-center text-lg'>Total Blogs</p>
//                     <h2 className='text-4xl'>{stats.totalBlogs}</h2>
//                 </div>
//                 <div className='p-4 font-montserrat dark:bg-blue-800 bg-zinc-100 flex flex-col gap-1 items-center justify-center rounded-lg'>
//                     <p className='text-center text-lg'>Total Admins</p>
//                     <h2 className='text-4xl'>{stats.totalAdmins}</h2>
//                 </div>
//                 <div className='p-4 font-montserrat dark:bg-red-800 bg-zinc-100 flex flex-col gap-1 items-center justify-center rounded-lg'>
//                     <p className='text-center text-lg'>Total Banned Users</p>
//                     <h2 className='text-4xl'>{stats.totalBannedUsers}</h2>
//                 </div>
//                 <div className='p-4 font-montserrat dark:bg-yellow-800 bg-zinc-100 flex flex-col gap-1 items-center justify-center rounded-lg'>
//                     <p className='text-center text-lg'>Total Categories</p>
//                     <h2 className='text-4xl'>{stats.totalCategories}</h2>
//                 </div>
                
//             </div>
//         </div>

//     )
// }

// export default page



"use client"
import { useAuth } from '@/context/UserContext';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import api from '@/lib/api';

function Page() {
    const { user, isAuthenticated, isAdmin, loading } = useAuth();
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
        <div className='px-64 pt-20 flex flex-col gap-16 items-center justify-center'>
            <h1 className='text-5xl text-center dark:text-zinc-200 text-zinc-700 font-montserrat'>
                Welcome <b className='font-medium dark:text-purple-200 text-purple-800'>{user.fullname}</b> to Your Admin Panel
            </h1>
            <div className='grid grid-cols-3 gap-10 items-center'>
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
