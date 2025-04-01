
"use client"

import { User2, VerifiedIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { headers } from "next/headers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



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


export default function BlogsList({ blogs }: { blogs: Blog[] }) {

  // const maxLength = await getMaxLength();
//62
  
const [descMaxLength, setDescMaxLength] = useState(130);
const [titleMaxLength, setTitleMaxLength] = useState(100);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 700) {
      setTitleMaxLength(80); // Large screens (desktop)
      setDescMaxLength(60); // Small screens (mobile)
    } else if (window.innerWidth < 1290) {
      setTitleMaxLength(60); // Large screens (desktop)
      setDescMaxLength(90); // Medium screens (tablet)
    } else if (window.innerWidth < 1500) {
      setTitleMaxLength(60); // Large screens (desktop)
      setDescMaxLength(100); // Medium screens (tablet)
    } else {
      setTitleMaxLength(100); // Large screens (desktop)
      setDescMaxLength(130); // Large screens (desktop)
    }
  };

  handleResize(); // Set initial value
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  
 return (


  
  <div className="flex flex-col gap-8 mx-12 max-2xl:mx-6 max-xl:mx-0">
       {blogs.length > 0 && (
          blogs.map((blog) => (
            
            <div className="relative" key={blog._id}>
              
            <div className="cursor-pointer group/card font-montserrat relative rounded-lg group  flex  gap-8 max-sm:gap-6 justify-start">

            <Link href={`/blog/${blog.slug}`} className="w-40 h-40 max-sm:w-24 max-sm:h-20 max-xl:w-32 max-xl:h-32 self-center max-sm:self-start flex-shrink-0">
                

                {blog.displayImage ?
                      <img src={blog.displayImage || "logo.svg"} alt={blog.title} className="w-40 h-40 max-sm:w-24 max-sm:h-20 max-xl:w-32 max-xl:h-32 object-cover rounded-lg " />
                      : 
                        <div className='w-40 h-40 max-sm:w-24 max-sm:h-20 max-xl:w-32 max-xl:h-32 rounded-lg dark:bg-red-200 bg-red-400 rounded-2xl'></div>
                      }
              </Link>

              <div className="flex flex-col justify-center w-full  gap-2 ">
                  <Link href={`/blog/${blog.slug}`} className="text-[20px]/7 font-montserrat max-xl:text-lg max-sm:text-base dark:text-zinc-200 text-zinc-600 group-hover/card:dark:text-purple-300 group-hover/card:text-purple-700 font-semibold max-sm:font-bold duration-300">
                  <h1>
                    {blog.title?.length > titleMaxLength 
                        ? blog.title.slice(0, titleMaxLength) + "..." 
                        : blog.title}
                  </h1>
                  </Link>
                  <Link href={`/blog/${blog.slug}`} className="text-sm dark:text-zinc-400 text-zinc-600 group-hover/card:dark:text-purple-200 group-hover/card:text-purple-600 duration-300">
                  <p>
                    {blog.metaDescription?.length > descMaxLength 
                      ? blog.metaDescription.slice(0, descMaxLength) + "..." 
                      : blog.metaDescription}
                  </p>
                  </Link>

                  <div className="flex justify-between items-center max-sm:hidden">
                    {/* Author  */}
                    <Link href={`/user/${blog.author.username}`} className=" w-fit group/author">
                        <div className="flex items-center gap-4 rounded-lg">
                          {/* <img src={author.profilePicture} alt={author.fullname} className="w-12 h-12 rounded-full" /> */}
                          {blog.author.profilePicture ? <img src={blog.author.profilePicture} alt={blog.author.fullname} className="w-8 h-8 rounded-full group-hover/author:scale-105 duration-300" /> :
                            <div className="w-8 h-8 rounded-full p-auto flex text-center items-center">
                              <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto group-hover/author:scale-105 duration-300" />
                            </div>
                          }
                          {/* <div className="flex flex-col">
                            <p className="font-semibold dark:text-zinc-200 text-zinc-600 group-hover/author:text-purple-700 group-hover/author:dark:text-purple-300 duration-300">{blog.author.fullname}</p>
                          </div> */}
                          <div>
                            <p className="font-semibold flex gap-2 dark:text-zinc-200 text-zinc-600 group-hover/author:text-purple-700 group-hover/author:dark:text-purple-300 duration-300">
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
                          </div>
                        </div>
                      </Link>
                    <p className="text-right text-sm text-zinc-500">{new Date(blog.date).toDateString()}</p>
                  </div>
              </div>
              
            </div>

            <div className="flex justify-between items-center mt-4 sm:hidden">
                    {/* Author  */}
                    <Link href={`/user/${blog.author.username}`} className=" w-fit group/author">
                        <div className="flex items-center gap-4 rounded-lg">
                          {/* <img src={author.profilePicture} alt={author.fullname} className="w-12 h-12 rounded-full" /> */}
                          {blog.author.profilePicture ? <img src={blog.author.profilePicture} alt={blog.author.fullname} className="w-6 h-6 rounded-full group-hover/author:scale-105 duration-300" /> :
                            <div className="w-6 h-6 rounded-full p-auto dark:bg-gray-800 bg-gray-200 flex text-center items-center">
                              <User2 className="w-[70%] h-[70%] dark:text-gray-300 text-gray-600 my-auto m-auto group-hover/author:scale-105 duration-300" />
                            </div>
                          }
                          <div>
                            <p className="font-semibold flex gap-2 dark:text-zinc-200 text-zinc-600 group-hover/author:text-purple-700 group-hover/author:dark:text-purple-300 duration-300">
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
                          </div>
                        </div>
                      </Link>
                    <p className="text-right text-sm text-zinc-500">{new Date(blog.date).toDateString()}</p>
                  </div>

            <div className="h-[1px] mt-8 w-full bg-zinc-200 dark:bg-zinc-800">
                {/* Divider  */}
            </div>
            </div>
          ))
        )}
        

      </div>
 )
}