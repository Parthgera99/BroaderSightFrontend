import { Suspense } from "react";
import BlogsList from "./blog-list";
import Link from "next/link";
import api from "@/lib/api";
import LoadMore from "@/components/LoadMore";

interface ExplorePageProps {
  searchParams: { filter?: string };
  page: number|undefined
}
type Blog = {
  _id: string;
  title: string;
  author: {
    fullname: string;
    username: string;
    profilePicture: string;
    role: string;
  };
  createdAt: string;
};

type FetchBlogsResponse = { blogs: Blog[]; totalBlogs: number };


export async function fetchBlogs(filter: string, page: number|undefined, excludedIds:string[]) : Promise<FetchBlogsResponse> {
  const limit = 5;
  try {
    let endpoint = filter === "trending" ? `/blog/list?limit=${limit}` : `/blog/list/sorted?limit=${limit}&page=${page}`;
    let res;

    if (filter === "trending") {
      res = await api.post(endpoint, 
        { excludedIds: excludedIds }, // Assuming you are excluding blogs in future pagination
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    } else {
      res = await api.get(endpoint, { // Pagination for "latest"
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    // console.log(res.data.data.blogs)
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


export default async function ExplorePage({ searchParams }: ExplorePageProps)  {

  const params = await searchParams;
  const filter = params.filter === "latest" ? "latest" : "trending";

  const blogs  = await fetchBlogs(filter, 1,[]);
  
  return (
    <div className="mx-12 p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center mb-6">Explore {filter === "latest" ? "Latest" : "Trending"} Blogs</h1>
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link href="/explore-blogs?filter=latest">
            <button className={`px-4 py-2 rounded-xl ${filter === "latest" ? "bg-purple-600 text-white" : "bg-zinc-800"}`}>
              Latest Blogs
            </button>
          </Link>
          <Link href="/explore-blogs?filter=trending">
            <button className={`px-4 py-2 rounded-xl ${filter === "trending" ? "bg-purple-600 text-white" : "bg-zinc-800"}`}>
              Trending Blogs
            </button>
          </Link>
        </div>
      </div>

      {/* Blog List - Suspense for smooth loading */}
      <div className="flex flex-col gap-4">

        <div className="w-[60%] flex flex-col gap-4">
          <BlogsList blogs={blogs.blogs} />
          <LoadMore filter={filter} excludedIds={ blogs?.blogs?.map((blog:Blog) => blog._id) }/>
        </div>
      </div>
    </div>
  );
}
