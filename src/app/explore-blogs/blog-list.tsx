
"use client"

import { User2 } from "lucide-react";
import Link from "next/link";

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
  
 return (


  
  <div className="flex flex-col gap-4">
       {blogs.length > 0 && (
          blogs.map((blog) => (
            
            <div className="relative" key={blog._id}>
              
            <Link href={`/blog/${blog.slug}`} className="cursor-pointer font-montserrat relative px-8 pt-6 pb-10 border rounded shadow flex gap-16 justify-between">

              <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-semibold">{blog.title}</h1>
                  <p className="text-sm text-zinc-400">
                    {blog.metaDescription?.length > 130 
                      ? blog.metaDescription.slice(0, 130) + "..." 
                      : blog.metaDescription}
                  </p>

              </div>
              <div className="w-40 self-center flex-shrink-0">
                <img src={blog.displayImage || "logo.svg"} alt={blog.title} className="w-40 h-40 object-cover rounded-lg" />
              </div>
              <p className="absolute right-60 bottom-4 text-sm text-gray-500">{new Date(blog.date).toDateString()}</p>
            </Link>
                {/* Author  */}
                <Link href={`/user/${blog.author.username}`} className="absolute bottom-6 left-8 w-fit group">
                      <div className="flex items-center gap-4 rounded-lg">
                        {/* <img src={author.profilePicture} alt={author.fullname} className="w-12 h-12 rounded-full" /> */}
                        {blog.author.profilePicture ? <img src={blog.author.profilePicture} alt={blog.author.fullname} className="w-10 h-10 rounded-full group-hover:scale-105 duration-300" /> :
                          <div className="w-10 h-10 rounded-full p-auto flex text-center items-center">
                            <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto group-hover:scale-105 duration-300" />
                          </div>
                        }
                        <div className="flex flex-col">
                          <p className="font-semibold text-zinc-50 group-hover:text-purple-300 duration-300">{blog.author.fullname}</p>
                          <p className="text-sm text-zinc-200 group-hover:text-purple-300 duration-300">{blog.author.username}</p>
                        </div>
                      </div>
                    </Link>
            </div>
          ))
        )}
        

      </div>
 )
}