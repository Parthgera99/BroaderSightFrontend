"use client"
import { useAuth } from '@/context/UserContext';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function page() {
    const { user, isAuthenticated, isAdmin, loading, fetchUser } = useAuth();

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            Admin Page
            <Separator className=" h-[2px] dark:bg-zinc-700 w-[100%]"/>
        </div>

    )
}

export default page