import BlogsList from '@/app/explore-blogs/blog-list';
import CategoryHeroLayout from '@/components/CategoryHeroLayout';
import ExploreCategories from '@/components/ExploreCategories';
import LoadMore from '@/components/LoadMore';
import TrendingAuthors from '@/components/TrendingAuthors';
import api from '@/lib/api';
import { getCategories } from '@/lib/categoryService';
import { getTrendingAuthors } from '@/lib/trendingAuthors';
import { User2, VerifiedIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from "next/navigation";
import React ,  {use} from 'react'
export const dynamic = "force-dynamic";



interface ExplorePageProps {
  searchParams: { filter?: string };
  page: number|undefined
}

type Blog = {
  _id: string;
  displayImage: string;
  title: string;
  slug: string;
  metaDescription: string;
  metaTitle:string;
  date: string;
  tags:string[];
  faq:[{
      question:string,
      answer:string
  }];
  author:{
    fullname: string;
    username: string;
    profilePicture: string;
    role: string;
  }
  content:[{
      type:string,
      value:any
  }]
};

type Category = {
  _id: string;
  name: string;
  slug: string;
}


type FetchBlogsResponse = { blogs: Blog[]; totalBlogs: number };


export async function latestBlogsByCategory(slug:string) : Promise<FetchBlogsResponse> {
  const limit = 3
  try {
    const res = await api.post(`/blog/category/${slug}?type=latest&limit=${limit}&page=1`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    const blogObject = {
      blogs : res.data.data.blogs || [],
      totalBlogs : res.data.data.totalBlogs || 0
    }
    return blogObject  ;  
  } catch (error:any) {
    if(error.response?.status === 404) {
      return  {
        blogs : [],
        totalBlogs : 0
      };
    }
    return  {
      blogs : [],
      totalBlogs : 0
    };
  }
}


export async function trendingBlogsByCategory(excludedIds:string[], slug:string) : Promise<FetchBlogsResponse> {
  let limit;
  if(excludedIds.length === 0) {
    limit = 4
  } else{
    limit = 8
  }
  try {
    let res;
    // console.log(slug)

      res = await api.post(`/blog/category/${slug}?type=trending&limit=${limit}`, 
        { excludedIds: excludedIds }, // Assuming you are excluding blogs in future pagination
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

    // console.log(res.data.data.blogs.length)
    const blogObject = {
      blogs : res.data.data.blogs || [],
      totalBlogs : res.data.data.totalBlogs || 0
    }
    return blogObject ;  
  } catch (error:any) {
    if(error.response?.status === 404) {
      return  {
        blogs : [],
        totalBlogs : 0
      };
    }
    return {
      blogs : [],
      totalBlogs : 0
    };
  }
}


const CategoryPage = ({ slug, filter }: {slug: string , filter: string }) => {
    // const { slug } =  await params;
    const categories:any[] = use(getCategories());

    const categoryExists = categories.some((category: { slug: string }) => category.slug === slug);

    if (!categoryExists) {
        return notFound(); 
    }


    // const params2 = await searchParams;
    // const filter = params2.filter === "latest" ? "latest" : "trending";
    

    const blogs  = use(trendingBlogsByCategory([], slug));
    // console.log(blogs)
    const latestBlogs = use(latestBlogsByCategory(slug));
    // console.log(latestBlogs)
    
    
  return (
      <div className="mx-12 p-10 max-sm:px-4 2xl:w-[1400px] max-lg:w-[750px] max-md:w-full mx-auto">
        <h1 className="text-4xl font-bold text-center dark:text-zinc-50 text-zinc-700 max-md:text-left max-sm:text-center mb-16">
          <b className='dark:text-purple-300 font-bold text-purple-800'>
            {slug[0].toUpperCase() + slug.slice(1) + " "}
          </b>
          Blogs</h1>
  
            
        <CategoryHeroLayout blogs={blogs.blogs} />

        <div className="flex gap-4">
  
          <div className="w-[60%] max-lg:w-full flex flex-col gap-4  max-sm:gap-12">
            <LoadMore filter={filter} componentType='category' slug={slug} excludedIds={ blogs?.blogs?.map((blog:Blog) => blog._id) }/>
          </div>
  
          <div className="w-[2px] max-lg:hidden mb-12 rounded dark:bg-zinc-800 bg-zinc-200 mx-8">
              {/* Divider Line   */}
          </div>
  
          <div className="w-[35%] mt-4 max-lg:hidden font-montserrat flex flex-col gap-12">
            <div className='w-full flex flex-col gap-6'>
              <h1 className='text-2xl font-bold dark:text-purple-300 text-purple-700'>Latest in {slug[0].toUpperCase() + slug.slice(1)}</h1>
              <div className='flex flex-col gap-10'>
                  {latestBlogs?.blogs?.map((blog:Blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog._id} className='flex gap-4 pr-6 dark:bg-zinc-800 bg-zinc-200 rounded-xl'>
                      {blog.displayImage ?
                      <img src={blog.displayImage} alt={blog.title} className='-ml-4 -mb-4 mt-4 mr-4 shadow-xl w-32 h-28 object-cover rounded-2xl'/>
                      : 
                        <div className='-ml-4 -mb-4 mt-4 mr-4 shadow-xl w-32 h-28 dark:bg-purple-200 bg-purple-400 rounded-2xl'></div>
                      }
                      <div className='flex flex-col justify-center'>
                        <h1 className='text-lg max-xl:text-base font-semibold dark:text-zinc-50 text-zinc-700 font-montserrat'>{blog.title}</h1>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <ExploreCategories />
            <TrendingAuthors />
          </div>
        </div>
      </div>
    );
}

export default CategoryPage

