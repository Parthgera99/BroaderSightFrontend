import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User2, VerifiedIcon } from 'lucide-react';


type Blog = {
    _id: string;
    displayImage: string;
    category: [Category];
    title: string;
    slug: string;
    metaDescription: string;
    authorName: string;
    authorProfilePicture: string;
    date: string;
    authorRole: string;
    author:{
      fullname: string;
      username: string;
      profilePicture: string;
      role: string;
    }
};

  type Category = {
    _id: string;
    name: string;
    slug: string;
}
  
  

function CategoryHeroLayout({ blogs }: { blogs: Blog[] }) {
  return (
    <div className='flex flex-col mb-16 max-sm:gap-8 gap-16'>
        {/* Top Section  */}
        <div>
            {
                blogs.slice(0,1).map((blog) => (
                    <div className='flex justify-center mb-4 max-md:flex-col-reverse gap-20 max-xl:gap-12 max-md:gap-6 mx-auto'>

                        {/* left  */}
                        <div className='md:w-[500px] flex flex-col gap-4 md:justify-start max-md:w-[320px] max-md:mx-auto'>
                            {/* Author Info */}
                            <div className="flex max-xl:flex-col max-xl:gap-4 relative justify-between pt-3">
                                <div className="flex items-center gap-3 w-fit">
                                    <Link href={`/user/${blog.author.username}`}>
                                    {blog.author.profilePicture && <img src={blog.author.profilePicture} alt={blog.authorName} className="w-10 h-10 rounded-full" />}
                                    {!blog.author?.profilePicture && 
                                        <div className="w-10 h-10 rounded-full bg-gray-800 p-auto flex text-center items-center">
                                        <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto" />
                                        </div>
                                    }
                                    </Link>
                                    <div>
                                        <Link href={`/user/${blog.author.username}`}>
                                        <p className="text-sm font-montserrat dark:text-zinc-300 text-zinc-500 hover:dark:text-purple-200 hover:text-purple-600 duration-300 flex gap-2 font-medium">
                                        {blog.author.fullname} {blog.author.role==="admin" ? 
                                        <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                            <VerifiedIcon className="text-green-400 my-auto w-4 h-4"/> 
                                            </TooltipTrigger>
                                            <TooltipContent className="dark:bg-zinc-700 bg-zinc-300">
                                            <p className="dark:text-zinc-50 text-zinc-800 font-montserrat">Official Admin</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        </TooltipProvider>
                                        : ""} 
                                        </p>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>

                            <Link href={`/blog/${blog.slug}`} className='flex flex-col gap-6'>
                                <h1 className={` ${blog.title.length > 30 ? "text-4xl max-xl:text-3xl max-md:text-2xl" : "text-5xl max-xl:text-4xl max-md:text-3xl"} font-bold dark:text-purple-300  text-purple-800`}>
                                    {blog.title}
                                </h1>
                                <p className='text-sm dark:text-zinc-300 text-zinc-500 font-montserrat'>
                                {blog.metaDescription ? blog.metaDescription.length > 80 ? blog.metaDescription.substring(0, 80) + "..." : blog.metaDescription : ""}
                                </p>
                                <button className="text-md px-4 py-2 w-fit font-semibold bg-purple-200 dark:bg-purple-800 rounded-xl font-montserrat text-purple-700 dark:text-purple-200 hover:text-purple-900 duration-300">Read More</button>
                            </Link>
                        </div>

                        {/* Right  */}
                        <div className='max-md:mx-auto'>
                            <Link href={`/blog/${blog.slug}`}>
                                

                                {blog.displayImage ?
                                    <img src={blog.displayImage || "/blogDefault.svg"} alt={blog.title} className="2xl:w-[450px] 2xl:h-[320px] w-[400px] max-sm:w-[340px] h-[280px] rounded-3xl  object-cover" />
                                    : 
                                    <div className='2xl:w-[450px] 2xl:h-[320px] w-[400px] max-sm:w-[340px] h-[280px] rounded-3xl dark:bg-red-200 bg-red-400'></div>
                                }
                            </Link>
                        </div>
                        
                    
                    </div>
                ))
            }
            
        </div>

        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800">
                {/* Divider  */}
        </div>

        {/* Second Three Blogs Section  */}
        <div className="flex my-4 lg:flex-nowrap max-lg:flex-wrap max-md:flex-col max-md:items-center justify-center 2xl:gap-12 gap-8 max-sm:gap-12">
              {blogs.slice(1,4).map((blog) => (
                <div key={blog._id} className="flex flex-col gap-4 rounded-lg w-full 2xl:w-[380px] max-2xl:w-[320px] max-xl:w-[290px] max-lg:w-[290px] max-md:w-[400px] max-sm:w-full max-sm:max-w-[350px] flex-shrink-0">
                  {/* Blog Image */}
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.displayImage!==undefined ? 
                    <img src={blog.displayImage || "/blogDefault.svg"} alt={blog.title} className="w-full rounded-3xl h-[240px] object-cover" />
                    : <div className="w-full rounded-3xl h-[240px] bg-gray-200"></div>}
                  </Link>

                  {/* Author Info */}
                  <div className="flex max-xl:flex-col max-xl:gap-4 relative justify-between pt-2">
                    <div className="flex items-center gap-3 w-fit">
                      <Link href={`/user/${blog.author.username}`}>
                      {blog.author.profilePicture && <img src={blog.author.profilePicture} alt={blog.authorName} className="w-10 h-10 rounded-full" />}
                      {!blog.author?.profilePicture && 
                        <div className="w-10 h-10 rounded-full bg-gray-800 p-auto flex text-center items-center">
                          <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto" />
                        </div>
                      }
                      </Link>
                      <div>
                      <Link href={`/user/${blog.author.username}`}>
                        <p className="text-sm font-montserrat dark:text-zinc-300 text-zinc-500 hover:dark:text-purple-200 hover:text-purple-600 duration-300 flex gap-2 font-medium">
                          {blog.author.fullname} {blog.author.role==="admin" ? 
                          <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <VerifiedIcon className="text-green-400 my-auto w-4 h-4"/> 
                            </TooltipTrigger>
                            <TooltipContent className="dark:bg-zinc-700 bg-zinc-300">
                              <p className="dark:text-zinc-50 text-zinc-800 font-montserrat">Official Admin</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                          : ""} 
                        </p>
                        </Link>
                        <p className="text-xs text-gray-500">{new Date(blog.date).toDateString()}</p>
                      </div>
                    </div>
                    
                  </div>
                  

                  {/* Blog Content */}
                  <div className="">
                    <Link href={`/blog/${blog.slug}`} >
                    <h3 className="text-lg max-xl:text-base text-zinc-600 mr-4 dark:text-zinc-200 font-montserrat font-semibold mb-2 ">{blog.title}</h3>
                    {/* <p className="text-gray-600 dark:text-gray-500 text-sm mb-3 ">
                      {blog.metaDescription ? blog.metaDescription.length > 80 ? blog.metaDescription.substring(0, 80) + "..." : blog.metaDescription : ""}
                    </p> */}
                    </Link>      

                    
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[1px] mt-8 w-full bg-zinc-200 dark:bg-zinc-800">
                {/* Divider  */}
            </div>

    </div>
  )
}

export default CategoryHeroLayout