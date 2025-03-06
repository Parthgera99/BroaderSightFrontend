"use client"

import React from 'react'
import { useAuth } from '@/context/UserContext';

function page() {
    const { user, isAuthenticated, isAdmin, loading, logout } = useAuth();

    if (loading) return <p>Loading...</p>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome, {user?.name}</h1>
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