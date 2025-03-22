import { getCategories } from '@/lib/categoryService';
import { notFound } from "next/navigation";
import React from 'react'


const page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const categories = await getCategories();

    const categoryExists = categories.some((category: { slug: string }) => category.slug === slug);

    if (!categoryExists) {
        return notFound(); 
    }
    
  return (
    <div>
        {slug}
    </div>
  )
}

export default page

