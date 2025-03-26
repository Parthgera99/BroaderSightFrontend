"use client"
import { useAuth } from '@/context/UserContext';
import React, { useState, useEffect } from 'react';
import { getCategories } from '@/lib/categoryService';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash } from 'lucide-react';

type Category = {
    _id: string;
    name: string;
    slug: string;
  }

function page() {
    const { user, isAdmin, loading } = useAuth();
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
          const response = await getCategories();
          setCategories(response);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

    useEffect(() => {
        fetchCategories();
      }, []);
    

    const createCategory = () => {
        setCreateModal(true);
    };

    const handleDeleteModal = (category: Category) => {
        setSelectedCategory(category);
        setDeleteModal(true);
      };

      const handleDelete = async () => {
            if (!selectedCategory) return;
            try {
              await api.delete(`/category/delete/${selectedCategory._id}`, { withCredentials: true });
              fetchCategories();
              setDeleteModal(false);
              toast.success(`Category "${selectedCategory.name}" deleted successfully!`);
            } catch (error) {
              toast.error("Error deleting Category, try again!");
            }
          
        };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await api.post("/category/create", { name }, { withCredentials: true });
            const newCategory = response.data.data;
            setCategories([...categories, newCategory]);
            console.log(response.data.data);
            toast.success("Category Created Successfully");
            setSaving(false);
            setCreateModal(false)
        } catch (error) {
            toast.error("Category with this name already Exists");
            setSaving(false);
        }
      };
  
    

    if (loading || !user || !isAdmin) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className='pt-16 flex flex-col gap-10 pr-[15px]'>
            <Card className="flex w-fit py-4 px-12 items-center justify-center cursor-pointer group" onClick={createCategory}>
                <h1 className="text-lg font-semibold font-montserrat text-zinc-700 dark:text-zinc-50 group-hover:text-purple-700 dark:group-hover:text-purple-300 duration-300">+ Add a New Category</h1>
            </Card>

            <div className='flex flex-wrap gap-4'>
                {categories.map((category) => (
                    <div 
                    key={category._id} 
                    className="relative flex dark:bg-zinc-800 bg-zinc-300 rounded-full py-2 px-6 items-center justify-center cursor-pointer group duration-300 hover:dark:bg-red-900 hover:bg-red-200" 
                    onClick={() => handleDeleteModal(category)}
                  >
                    <h1 className="text-normal max-sm:text-sm font-normal group-hover:opacity-30 font-montserrat font-bold duration-300">
                      {category.name}
                    </h1>
                    
                   
                    <Trash className="absolute top-1/2 left-1/2 transform dark:text-zinc-200 text-red-700 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300" />
                  </div>
                  
                ))}
            </div>

            <Dialog open={createModal} onOpenChange={setCreateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Category</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                    <Input type="text" placeholder="Enter a New Category" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !saving && handleSave()} />
                    <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save & Continue"}</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to <b className='font-normal dark:text-red-400'>delete {selectedCategory?.name}</b> Category?</p>
                    <div className="flex justify-end gap-4">
                    <Button onClick={() => setDeleteModal(false)} variant="outline">Cancel</Button>
                    <Button onClick={() => handleDelete()} variant="destructive">Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default page