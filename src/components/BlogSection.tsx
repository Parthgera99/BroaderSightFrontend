import React from "react";
import Link from "next/link";
import { ArrowRight, User2, VerifiedIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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


interface BlogSectionProps {
  blogs: Blog[];
  title: string;
  type: string
}

 const BlogSection: React.FC<BlogSectionProps> = ({ blogs,title,type}) =>  {

  return (
    <div className={`relative mx-auto dark:bg-zinc-950 px-40 max-lg:px-16 max-sm:px-6 pb-24 2xl:pb-12 max-sm:pb-12 ${title === "education" ? "py-24" : ""} ${type === "trending" ? "py-24" : ""}`}>
      {/* Header with View All Blogs */}
      <div className="flex font-montserrat mb-12 justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200">
          <Link href={type === "category" ? `/category/${title}` : "/explore-blogs"}>{title[0].toUpperCase() + title.slice(1)}</Link>
        </h2>
        <Link href={type === "category" ? `/category/${title}` : "/explore-blogs"}  className="flex max-sm:hidden font-medium items-center text-purple-800 bg-purple-200 dark:text-purple-200 dark:bg-purple-800 rounded-full px-4 py-2 hover:dark:bg-purple-700 hover:bg-purple-300 duration-300">
          Explore More <ArrowRight className="ml-1" size={18} />
        </Link>
      </div>

      {title === "education" && (
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b dark:from-zinc-900 dark:to-transparent"></div>
      )}

      {/* Blogs Section */}
      <div className="flex lg:flex-nowrap max-lg:flex-wrap max-md:flex-col max-md:items-center justify-center 2xl:gap-12 gap-8">
        {blogs.slice(0,3).map((blog) => (
          <div key={blog._id} className="dark:bg-zinc-950 flex flex-col gap-4 rounded-lg w-full 2xl:w-[380px] max-2xl:w-[320px] max-xl:w-[290px] max-lg:w-[290px] max-md:w-[400px] max-sm:w-full max-sm:max-w-[350px] flex-shrink-0">
            {/* Blog Image */}
            <Link href={`/blog/${blog.slug}`}>
              {blog.displayImage!==undefined ? 
              <img src={blog.displayImage || "/blogDefault.svg"} alt={blog.title} className="w-full rounded-2xl h-[240px] object-cover" />
              : <div className="w-full rounded-2xl h-[240px] bg-gray-200"></div>}
            </Link>

            {/* Author Info */}
            <div className="flex relative justify-between pt-3">
              <div className="flex items-center gap-3 mr-8 w-full">
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
                  <p className="text-sm flex gap-2 font-medium">
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

              {/* Categories */}
              {type==="trending" && 
                <div className="flex gap-2 overflow-x-scroll scrollbar-hidden xl:min-w-[25%] xl:max-w-[30%] max-xl:w-[60%] relative ml-auto max-xl:ml-0">
                {blog.category && Array.isArray(blog.category) && blog.category.length > 0 ? (
                  blog.category.slice(0,2).map((category, index) => (
                    <Link href={`/category/${category.slug}`} className="py-1" key={`${blog._id}-${category._id}-${index}`}>
                      <p className="dark:bg-zinc-700 bg-zinc-100 dark:text-zinc-100 text-zinc-700 font-sm py-1 px-2 rounded-lg whitespace-nowrap">{category.name}</p>
                    </Link>
                  ))
                ) : (
                  ""
                )}
                </div>
              }
              
            </div>
            

            {/* Blog Content */}
            <div className=" min-h-[140px] max-2xl:min-h-[18px] 2xl:min-h-[100px] max-md:min-h-fit">
              <Link href={`/blog/${blog.slug}`} >
              <h3 className="text-lg max-xl:text-base text-zinc-700 dark:text-zinc-200 font-semibold mb-2 ">{blog.title}</h3>
              {/* <p className="text-gray-600 dark:text-gray-500 text-sm mb-3 ">
                {blog.metaDescription ? blog.metaDescription.length > 80 ? blog.metaDescription.substring(0, 80) + "..." : blog.metaDescription : ""}
              </p> */}
              </Link>

              

              

              
            </div>
          </div>
        ))}
      </div>
    </div>
    // <></>
  );
}

export default BlogSection;
