import React from 'react'
import { getCategories } from "@/lib/categoryService";
import Link from 'next/link';
import { fetchCategory3BlogsList } from '@/lib/fetchBlogList';
import BlogSection from '@/components/BlogSection';

type Category = {
  _id: string;
  name: string;
  slug: string;
}



async function page() {

  const MainCategories = ["education", "business", "technology", "health", "finance", "lifestyle"];

  const categories = await getCategories();

  // const categoryBlogs = await fetchCategory3BlogsList();

  const categoryBlogs = await Promise.all(
    MainCategories.map(async (category) => {
      const blogs = await fetchCategory3BlogsList(category); // Pass category as parameter
      return { category, blogs };
    })
  );



  return (
    <div className='flex font-montserrat flex-col gap-12 mt-12'>
      {/* TOP Section  */}
      <h1 className='mx-24 text-4xl max-lg:text-3xl max-sm:text-center max-lg:mx-16 font-semibold text-purple-800 dark:text-purple-300 '>Explore a Ton of Categories</h1>
      <ul className='mx-24 max-lg:mx-16 max-sm:mx-6 flex gap-4 max-sm:gap-3 flex-wrap'>
        {categories.map((category:Category) => (
          <Link href={`/category/${category.slug}`} key={category._id}>
            <li className='px-8 py-2 max-sm:px-4 rounded-lg dark:bg-zinc-800 bg-zinc-200 hover:dark:bg-purple-800 hover:bg-purple-200 duration-300 text-zinc-800 dark:text-zinc-50 font-semibold text-sm'>
              {category.name[0].toUpperCase() + category.name.slice(1)}
            </li>
          </Link>
        ))}
      </ul>

      {/* Extra Category with Blogs Section  */}
      <div>
        {categoryBlogs.map(({ category, blogs }) => (
          <div key={category}>
            <BlogSection blogs={blogs} title={category} type="category" />
          </div>
        ))}
      </div>

    </div>
  )
}

export default page