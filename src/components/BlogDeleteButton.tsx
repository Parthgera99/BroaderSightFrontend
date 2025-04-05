"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function BlogDeleteButton({blogId}: {blogId : string}) {
    const [deleteModal , setDeleteModal] = useState(false);
    const Router = useRouter()


    const handleDeleteBlog = async () => {
        try {
            const response = await api.delete(`/admin/delete/${blogId}` , { withCredentials: true });
            if (response.status === 200) {
                setDeleteModal(false);
                toast.success('Blog deleted successfully');
                Router.replace('/dashboard');
            }
            return ;
        } catch (error) {
            toast.error('Error deleting blog, try again!');
            console.error('Error deleting blog:', error);
        }
    }
  return (
    <div>
        <Trash2Icon onClick={() => setDeleteModal(true)} className="w-5 h-5 text-zinc-500 hover:text-red-700 duration-300 dark:text-zinc-300 dark:hover:text-red-200 cursor-pointer" />

        <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Confirm Blog Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to Delete this Blog?</p>
                <div className="flex justify-end gap-4">
                <Button onClick={() => setDeleteModal(false)} variant="outline">Cancel</Button>
                <Button onClick={handleDeleteBlog} variant="destructive">Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default BlogDeleteButton