"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/UserContext';
import { useRouter } from "next/navigation";
import api from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DialogForInfo from '@/components/DialogForInfo';


function page() {
    const { user, isAuthenticated, isAdmin, loading, fetchUser, logout } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      console.log(user)
      if(!loading){
        if (!user?.username || !user?.fullname) {
         setOpenModal(true);
        }
      }
    },[loading])

    

    if (loading) return <p>Loading...</p>;

  return (
    <div>
      
      <DialogForInfo openModal={openModal} setOpenModal={setOpenModal} />

      {isAuthenticated ? (
        <>
          <h1>Welcome, {user?.fullname}</h1>
          <h2>Username - {user?.username}</h2>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          {isAdmin && <p>You have admin access.</p>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  )
}

export default page