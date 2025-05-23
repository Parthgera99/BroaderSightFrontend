"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/UserContext';
import { useRouter } from "next/navigation";
import api from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pencil, ShieldCheckIcon, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DialogForInfo from '@/components/DialogForInfo';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';

function page() {
  const { user, isAuthenticated, isAdmin, loading, fetchUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState('');
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [redirecting, setRedirecting] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

    useEffect(() => {
      fetchUser().finally(() => {
        setCheckingAuth(false);
      });
    }, []);

  // useEffect(() => {
  //   if (!loading && (!user?.username || !user?.fullname)) {
  //     setOpenModal(true);
  //   }
  //   console.log("this is user",user);
  // }, [loading, isAuthenticated, router]);


  const createBlog = () => {
    setCreateModal(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.post("/blog/create", { title }, { withCredentials: true });
      setRedirecting(true)
      const newBlog = response.data.data.blog;
      router.push(`/dashboard/${newBlog.slug}/edit`);
      setTimeout( async () => {
        await fetchUser();
        setCreateModal(false), 200
        setSaving(false), 200;
        setRedirecting(false),200;
      });
    } catch (error) {
      toast.error("Blog with this name already Exists");
      setSaving(false);
    }
  };

  const handleDeleteModal = (blogId: string) => {
    setSelectedBlog(blogId);
    setDeleteModal(true);
  };

  const handleDelete = async (blogId: string) => {
      try {
        await api.delete(`/blog/delete/${blogId}`, { withCredentials: true });
        await fetchUser();
        setDeleteModal(false);

      } catch (error) {
        toast.error("Error deleting blog, try again!");
      }
    
  };

  const redirectToBlog = (slug: string | undefined) => {
    if (!slug) return
    setRedirecting(true)
    router.push(`/dashboard/${slug}/edit`)
    setRedirecting(false)
  }

  useEffect(() => {
    if(!checkingAuth){
      if (!user) {
        router.replace("/sign-in"); // Redirect if not authenticated
      } else{
        if (!loading && (!user?.username || !user?.fullname)) {
          setOpenModal(true);
        }
        setRedirecting(false);
      }
    }
  }, [checkingAuth,user, loading]);

  if (loading || redirecting ) return (
    <div className="flex flex-col space-x-4 py-6 mx-12 max-sm:mx-4">
      <Skeleton className="h-8 w-64 mx-6 max-sm:mx-0 rounded-xl" />
      <div className="space-y-6 flex mx-12 max-sm:mx-0">
        <Skeleton className="mx-12 max-sm:mx-0 my-12 h-32 w-32" />
        <div className='flex flex-col'>
          <Skeleton className="mt-6 mb-2 h-6 w-[200px]" />
          <Skeleton className="my-2 h-12 w-[400px]" />
          <Skeleton className="my-2 h-6 w-[100px]" />
        </div>
      </div>
      <div className="space-y-6 flex mx-12 max-sm:mx-0">
        <Skeleton className="mx-12 max-sm:mx-0 my-12 h-32 w-32" />
        <div className='flex flex-col'>
          <Skeleton className="mt-6 mb-2 h-6 w-[200px]" />
          <Skeleton className="my-2 h-12 w-[400px]" />
          <Skeleton className="my-2 h-6 w-[100px]" />
        </div>
      </div>
      <div className="space-y-6 flex mx-12 max-sm:mx-0">
        <Skeleton className="mx-12 max-sm:mx-0 my-12 h-32 w-32" />
        <div className='flex flex-col'>
          <Skeleton className="mt-6 mb-2 h-6 w-[200px]" />
          <Skeleton className="my-2 h-12 w-[400px]" />
          <Skeleton className="my-2 h-6 w-[100px]" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-[5vw] max-w-[1300px] 2xl:mx-auto py-5">
      <DialogForInfo openModal={openModal} setOpenModal={setOpenModal} />

      {isAuthenticated ? (
        <>
          <div className="flex max-sm:flex-col max-sm:space-y-4 font-montserrat justify-between items-center mb-5">
            <h1 className="text-2xl dark:text-purple-200 text-purple-900 font-bold">Welcome, {user?.fullname}</h1>
            <div className="space-x-2">
              <Button variant={filter === "published" ? "default" : "outline"} onClick={() => setFilter("published")}>Published Only</Button>
              <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All Blogs</Button>
            </div>
          </div>

          <div className="flex gap-24 max-lg:gap-12 max-lg:flex-col-reverse">
            {/* Left Side: Blog Cards */}
            <div className="w-[60%] max-lg:w-full flex flex-col gap-2">
              {user?.blogs?.filter(blog => filter === "all" || blog.isPublished).map((blog) => (
                <Card key={blog._id} className="dark:bg-zinc-900 bg-white cursor-pointer group shadow-none border-0 flex gap-4 max-sm:gap-2 justify-between items-center p-4 max-sm:px-0" >


                  <div className="flex items-center group relative gap-8 max-sm:gap-6 w-full p-4" onClick={()=>redirectToBlog(blog?.slug)}>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <Pencil className="text-white text-4xl transition-transform duration-300" />
                  </div>
                    <div className='relative max-lg:w-16 max-lg:h-16 w-32 h-32 shrink-0' >
                      <Image src={blog.displayImage || "logo.svg"} alt="Blog Image" fill className=" rounded-lg object-cover" />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <CardTitle className='line-clamp-2 text-lg font-montserrat'>{blog.title}</CardTitle>
                      <CardDescription className='line-clamp-3 font-montserrat text-sm'>{blog.metaDescription}</CardDescription>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        {/* <Image src={user?.profilePicture || "logo.svg"} alt="Author" width={24} height={24} className="shrink-0 rounded-full" /> */}
                        {/* {user.fullname} - */}
                        {blog?.date ? new Date(blog.date).toDateString() : "No Date Available"}
                        </div>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 max-lg:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="destructive" className='hover:bg-red-600' onClick={() => handleDeleteModal(blog._id)}><Trash className="w-5 h-5 " /></Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Side: Create New Blog */}
            <div className="w-[35%] max-lg:w-[60%] max-sm:w-[90%] max-lg:mx-auto">
              <Card className="flex items-center justify-center h-48 cursor-pointer group" onClick={createBlog}>
                <h1 className="text-6xl font-bold group-hover:scale-110 group-hover:text-purple-700 dark:group-hover:text-purple-300 duration-300">+</h1>
              </Card>

              {user?.role === "admin" && (
                <div className="mt-8">
                  <Link href="/admin" className="flex items-center gap-2 mt-4 text-sm font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400">
                    <h2 className='text-xl flex gap-2 items-center font-semibold px-4 py-2 rounded-xl dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-100 text-zinc-700 font-montserrat mx-auto'>
                      Admin Panel
                      <ShieldCheckIcon className="w-5 h-5" />
                    </h2>
                  </Link>
                </div>
              )}

              
            </div>
          </div>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}

      <Dialog open={createModal} onOpenChange={setCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Blog</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input type="text" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save & Continue"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this blog?</p>
          <div className="flex justify-end gap-4">
            <Button onClick={() => setDeleteModal(false)} variant="outline">Cancel</Button>
            <Button onClick={() => handleDelete(selectedBlog)} variant="destructive">Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default page;
