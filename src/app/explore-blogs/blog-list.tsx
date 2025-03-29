
"use client"

import { User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { headers } from "next/headers";



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
      setDescMaxLength(100); // Small screens (mobile)
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


  
  <div className="flex flex-col gap-4 max-sm:gap-12">
       {blogs.length > 0 && (
          blogs.map((blog) => (
            
            <div className="relative" key={blog._id}>
              
            <Link href={`/blog/${blog.slug}`} className="cursor-pointer font-montserrat relative px-8 max-sm:px-0 py-8 rounded-lg border dark:shadow max-sm:shadow-none max-sm:border-none max-md:pb-20 max-sm:pb-0 flex max-sm:pt-4 max-[490px]:pt-0 max-sm:flex-col-reverse gap-16 max-sm:gap-20 justify-between">

              <div className="flex flex-col max-sm:px-3 md:pt-16 gap-4 max-sm:gap-2">
                  <h1 className="text-xl max-xl:text-lg dark:text-zinc-50 text-zinc-800 font-semibold">
                  {blog.title?.length > titleMaxLength 
                      ? blog.title.slice(0, titleMaxLength) + "..." 
                      : blog.title}
                  </h1>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    {blog.metaDescription?.length > descMaxLength 
                      ? blog.metaDescription.slice(0, descMaxLength) + "..." 
                      : blog.metaDescription}
                  </p>

              </div>
              <div className="w-40 h-40 max-xl:w-32 max-xl:h-32 max-sm:w-full max-sm:h-[200px] self-center flex-shrink-0">
                <img src={blog.displayImage || "logo.svg"} alt={blog.title} className="w-40 h-40 max-xl:w-32 max-xl:h-32 max-sm:w-[400px] max-sm:h-[200px] max-sm:mx-auto  max-[490px]:w-full object-cover sm:rounded-lg max-sm:rounded-t-lg" />
              </div>
              <p className="absolute right-60 max-xl:right-48 max-md:bottom-6 md:top-6 max-sm:top-[215px] max-sm:right-2 text-sm text-zinc-500">{new Date(blog.date).toDateString()}</p>
            </Link>
                {/* Author  */}
                <Link href={`/user/${blog.author.username}`} className="absolute md:top-6 left-8 max-md:bottom-6 max-sm:top-[220px] max-sm:left-3 w-fit group">
                      <div className="flex items-center gap-4 rounded-lg">
                        {/* <img src={author.profilePicture} alt={author.fullname} className="w-12 h-12 rounded-full" /> */}
                        {blog.author.profilePicture ? <img src={blog.author.profilePicture} alt={blog.author.fullname} className="w-10 h-10 rounded-full group-hover:scale-105 duration-300" /> :
                          <div className="w-10 h-10 rounded-full p-auto flex text-center items-center">
                            <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto group-hover:scale-105 duration-300" />
                          </div>
                        }
                        <div className="flex flex-col">
                          <p className="font-semibold dark:text-zinc-200 text-zinc-600 group-hover:text-purple-700 group-hover:dark:text-purple-300 duration-300">{blog.author.fullname}</p>
                          <p className="text-sm dark:text-zinc-200 text-zinc-600 group-hover:text-purple-700 group-hover:dark:text-purple-300 duration-300">{blog.author.username}</p>
                        </div>
                      </div>
                    </Link>
            </div>
          ))
        )}
        

      </div>
 )
}