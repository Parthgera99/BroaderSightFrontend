import { getCategories } from '@/lib/categoryService';
import Link from 'next/link';
import React from 'react'

async function ExploreCategories() {
    const categories:any[] = await getCategories();

  return (
    <div className='font-montserrat flex flex-col gap-8'>
        {/* Categories  */}
        <h2 className="text-2xl dark:text-purple-300 text-purple-700 font-bold">Explore Categories</h2>
          <div className="relative flex flex-wrap gap-4 pb-12">
            {categories.slice(0, 15).map((category) => (
              <Link href={`/category/${category.slug}`} key={category._id}>
                <p className="px-4 py-2 rounded-full dark:bg-zinc-800 bg-zinc-100 hover:dark:bg-purple-700 hover:bg-purple-200 duration-300 cursor-pointer">{category.name}</p>
              </Link>
            ))}
            <Link href={"/category"}>
              <p className="px-4 absolute right-0 bottom-0 py-2 rounded-xl hover:dark:text-purple-300 hover:text-purple-700 duration-300 text-zinc-700 dark:text-zinc-50 font-semibold hover:dark:bg-zinc-700 hover:bg-zinc-200 cursor-pointer">View More</p>
            </Link>
          </div>
    </div>
  )
}

export default ExploreCategories