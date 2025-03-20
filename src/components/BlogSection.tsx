import React from "react";
import Link from "next/link";
import { ArrowRight, VerifiedIcon } from "lucide-react";
import api from "@/lib/api";

type Blog = {
  _id: string;
  displayImage: string;
  categoryDetails: [Category];
  title: string;
  metaDescription: string;
  authorName: string;
  authorProfilePicture: string;
  date: string;
  authorRole: string;
  authorDetails:{
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


// ✅ Renamed the function to prevent conflict
async function fetchBlogsData(): Promise<Blog[]> {
  try {
    const response = await api.get("/blog/list?limit=3", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    // console.log(response.data.data.blogs)

    // ✅ Axios automatically parses JSON, so no need for `.json()`
    if (!response.data.data || !response.data.data.blogs) {
      throw new Error("Failed to fetch blogs");
    }

    return response.data.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// ✅ Now a proper React component
export default async function BlogSection() {
  const blogs = await fetchBlogsData(); // Call the function properly

  return (
    <div className="mx-auto dark:bg-zinc-950 px-40 max-lg:px-16 max-sm:px-6 py-16">
      {/* Header with View All Blogs */}
      <div className="flex font-montserrat mb-12 justify-between items-center">
        <h2 className="text-3xl font-bold">Trending Blogs</h2>
        <Link href="/explore-blogs" className="flex max-sm:hidden font-medium items-center text-purple-800 bg-purple-200 dark:text-purple-200 dark:bg-purple-800 rounded-full px-4 py-2 hover:dark:bg-purple-700 hover:bg-purple-300 duration-300">
          Explore More <ArrowRight className="ml-1" size={18} />
        </Link>
      </div>

      {/* Blogs Section */}
      <div className="flex lg:flex-nowrap max-lg:flex-wrap max-md:flex-col max-md:items-center justify-center 2xl:gap-12 gap-8">
        {blogs.slice(0,3).map((blog) => (
          <div key={blog._id} className="dark:bg-zinc-950 flex flex-col justify-between  rounded-lg w-full 2xl:w-[380px] max-2xl:w-[320px] max-xl:w-[290px] max-lg:w-[290px] max-md:w-[400px] max-sm:w-full max-sm:max-w-[350px] flex-shrink-0">
            {/* Blog Image */}
            <Link href={"/sign-in"}>
              {blog.displayImage!==undefined ? 
              <img src={blog.displayImage || "/blogDefault.svg"} alt={blog.title} className="w-full rounded-lg h-[240px] object-cover" />
              : <div className="w-full rounded-lg h-[240px] bg-gray-200"></div>}
            </Link>

            {/* Author Info */}
            <div className="flex max-xl:flex-col max-xl:gap-4 relative justify-between pt-3">
              <div className="flex items-center gap-3 w-fit">
                <Link href={`/user/${blog.authorDetails.username}`}>
                <img src={blog.authorDetails.profilePicture} alt={blog.authorName} className="w-10 h-10 rounded-full" />
                </Link>
                <div>
                <Link href={`/user/${blog.authorDetails.username}`}>
                  <p className="text-sm flex gap-2 font-medium">
                    {blog.authorDetails.fullname} {blog.authorDetails.role==="admin" ? <VerifiedIcon className="text-green-400 my-auto w-4 h-4"/> : ""} 
                  </p>
                  </Link>
                  <p className="text-xs text-gray-500">{new Date(blog.date).toDateString()}</p>
                </div>
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-scroll scrollbar-hidden xl:min-w-[25%] xl:max-w-[45%] max-xl:w-full relative ml-auto max-xl:ml-0">
              {blog.categoryDetails && Array.isArray(blog.categoryDetails) && blog.categoryDetails.length > 0 ? (
                blog.categoryDetails.map((category, index) => (
                  <Link href={`/category/${category.slug}`} className="py-1" key={`${blog._id}-${category._id}-${index}`}>
                    <p className="dark:bg-zinc-700 bg-zinc-300 dark:text-zinc-100 text-zinc-700 font-sm py-1 px-2 rounded-lg whitespace-nowrap">{category.name}</p>
                  </Link>
                ))
              ) : (
                "No categories found"
              )}
              </div>
            </div>
            

            {/* Blog Content */}
            <div className="py-4 min-h-[140px] max-2xl:min-h-[175px] max-md:min-h-fit">
              <Link href={"/sign-in"} >
              <h3 className="text-lg max-xl:text-base text-zinc-700 dark:text-zinc-200 font-semibold mb-2 ">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-500 text-sm mb-3 ">
                {blog.metaDescription ? blog.metaDescription.length > 80 ? blog.metaDescription.substring(0, 80) + "..." : blog.metaDescription : ""}
              </p>
              </Link>

              

              

              
            </div>
          </div>
        ))}
      </div>
    </div>
    // <></>
  );
}
