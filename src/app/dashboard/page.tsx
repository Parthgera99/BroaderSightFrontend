// "use client"

// import React, { useState, useEffect } from 'react'
// import { useAuth } from '@/context/UserContext';
// import { useRouter } from "next/navigation";
// import api from '@/lib/api';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import Image from 'next/image';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Pencil } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import DialogForInfo from '@/components/DialogForInfo';


// function page() {
//     const { user, isAuthenticated, isAdmin, loading, fetchUser, logout } = useAuth();
//     const [openModal, setOpenModal] = useState(false);
//     const [createModal, setCreateModal] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [title, setTitle] = useState("");
//     const router = useRouter();
    
//     useEffect(() => {
//       console.log(user)
//       if(!loading){
//         if (!user?.username || !user?.fullname) {
//          setOpenModal(true);
//         }
//       }
//     },[loading])

//     const createBlog = () => {
//       setCreateModal(true);
//     }

//     const handleSave = async () => {
//       try {
//         const response = await api.post("/blog/create", { title } , { withCredentials: true });
//         console.log(response);
//         const newBlog = response.data.data.blog;
//         await fetchUser(); // Refresh user data
//         setCreateModal(false); // Close modal after saving
//         router.push(`/dashboard/edit/${newBlog.slug}`); // Ensure re-render
//       } catch (error) {
//         alert("Error creating blog, try again!");
//       }
//     };

    

//     if (loading) return <p>Loading...</p>;

//   return (
//     <div>
      
//       <DialogForInfo openModal={openModal} setOpenModal={setOpenModal} />

//       {isAuthenticated ? (
//         <>
//           <h1>Welcome, {user?.fullname}</h1>
//           <h2>Username - {user?.username}</h2>
//           <p>Email: {user?.email}</p>
//           <p>Role: {user?.role}</p>
//           {isAdmin && <p>You have admin access.</p>}
//           <h1>Blogs -</h1>
//           <div className='mx-[5vw] my-5 grid grid-cols-1 md:grid-cols-3 gap-10'>
//             <Card className="w-[90%] items-center cursor-pointer group"  onClick={createBlog}>
//               <CardHeader className="flex items-center justify-center h-full">
//                 <h1 className="text-6xl font-bold transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-700 dark:group-hover:text-purple-300">
//                   +
//                 </h1>
//               </CardHeader>
//             </Card>
//             {user?.blogs?.map((blog) => (
//               <Card className="w-[90%] relative items-center group cursor-pointer" key={blog._id} onClick={() => router.push(`/dashboard/edit/${blog.slug}`)}>

//                 <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
//                   <Pencil className="text-white text-4xl transition-transform duration-300" />
//                 </div>

//                 <CardHeader className=''>
//                     <div className='flex flex-row items-start gap-4 justify-between'>
//                       <div className='flex flex-col gap-2 justify-between'>
//                         <CardTitle className='text-lg leading-6 line-clamp-2'>{blog.title}</CardTitle>
//                         {blog.metaDescription && <CardDescription className="max-w-[100%] line-clamp-4">{blog.metaDescription}</CardDescription>}
//                       </div>
//                       <div className='relative h-32 w-32 shrink-0'>
//                         <Image src={blog?.displayImage || "logo.svg"} alt="Blog Display Image" fill className=" rounded-lg object-cover"  />
//                       </div>
//                     </div>
//                 </CardHeader>
//                 <CardFooter className="relative">
//                   <div className="flex flex-row gap-2 w-full">
//                     <div className="font-bold items-center flex ">Categories:</div>

//                     {/* Scrollable Horizontal Container */}
//                     <div className="max-w-full overflow-x-auto pr-2 custom-scrollbar">
//                       <div className="flex gap-x-2 whitespace-nowrap">
//                         {blog.category?.map((category, index) => (
//                           <div
//                             className="dark:bg-zinc-900 bg-zinc-100 px-2 py-1 rounded-lg"
//                             key={index}
//                           >
//                             {category.name}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </CardFooter>



                                
//               </Card>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p>You are not logged in.</p>
//       )}

//       <Dialog open={createModal} onOpenChange={setCreateModal}>
//         <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create a New Blog</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-3">
//           <Input  type="text"
//             placeholder="Blog Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}/>
//           <Button onClick={handleSave} disabled={saving}>
//             {saving ? "Saving..." : "Save & Continue"}
//           </Button>
//         </div>
//         </DialogContent>
//       </Dialog>


//     </div>

//   )
// }

// export default page



"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/UserContext';
import { useRouter } from "next/navigation";
import api from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pencil, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DialogForInfo from '@/components/DialogForInfo';
import { toast } from 'sonner';

function DashboardPage() {
  const { user, isAuthenticated, isAdmin, loading, fetchUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState('');
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [redirecting, setRedirecting] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user?.username || !user?.fullname)) {
      setOpenModal(true);
    }
    console.log("this is user",user);
  }, [loading, isAuthenticated, router]);


  const createBlog = () => {
    setCreateModal(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.post("/blog/create", { title }, { withCredentials: true });
      const newBlog = response.data.data.blog;
      router.push(`/dashboard/edit/${newBlog.slug}`);
      setTimeout( async () => {
        await fetchUser();
        setCreateModal(false), 200
      });
      setSaving(false);
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

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/sign-in"); // Redirect if not authenticated
    } else{
      if (!loading && (!user?.username || !user?.fullname)) {
        setOpenModal(true);
      }
      setRedirecting(false);
    }
  }, [isAuthenticated, loading, router]);

  if (loading || redirecting) return <p>Loading...</p>;

  return (
    <div className="mx-[5vw] my-5">
      <DialogForInfo openModal={openModal} setOpenModal={setOpenModal} />

      {isAuthenticated ? (
        <>
          <div className="flex  font-montserrat justify-between items-center mb-5">
            <h1 className="text-2xl dark:text-purple-200 text-purple-900 font-bold">Welcome, {user?.fullname}</h1>
            <div className="space-x-2">
              <Button variant={filter === "published" ? "default" : "outline"} onClick={() => setFilter("published")}>Published Only</Button>
              <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All Blogs</Button>
            </div>
          </div>

          <div className="flex gap-24">
            {/* Left Side: Blog Cards */}
            <div className="w-[60%] flex flex-col gap-2">
              {user?.blogs?.filter(blog => filter === "all" || blog.isPublished).map((blog) => (
                <Card key={blog._id} className="cursor-pointer group shadow-none border-0 flex gap-4 justify-between items-center p-4" >


                  <div className="flex items-center group relative gap-8 w-full p-4" onClick={() => router.push(`/dashboard/edit/${blog.slug}`)}>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <Pencil className="text-white text-4xl transition-transform duration-300" />
                  </div>
                    <div className='relative w-32 h-32 shrink-0' >
                      <Image src={blog.displayImage || "logo.svg"} alt="Blog Image" fill className=" rounded-lg object-cover" />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <CardTitle className='line-clamp-2 text-lg font-montserrat'>{blog.title}</CardTitle>
                      <CardDescription className='line-clamp-3 font-montserrat text-sm'>{blog.metaDescription}</CardDescription>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Image src={user?.profilePicture || "logo.svg"} alt="Author" width={24} height={24} className="shrink-0 rounded-full" />
                        {user.fullname} - {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="destructive" className='hover:bg-red-600' onClick={() => handleDeleteModal(blog._id)}><Trash className="w-5 h-5 " /></Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Side: Create New Blog */}
            <div className="w-[35%]">
              <Card className="flex items-center justify-center h-48 cursor-pointer group" onClick={createBlog}>
                <h1 className="text-6xl font-bold group-hover:scale-110 group-hover:text-purple-700 dark:group-hover:text-purple-300 duration-300">+</h1>
              </Card>
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

export default DashboardPage;
