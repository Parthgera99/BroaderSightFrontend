import BlogsList from "./blog-list";
import Link from "next/link";
import api from "@/lib/api";
import LoadMore from "@/components/LoadMore";
import { getCategories } from "@/lib/categoryService";
import { getTrendingAuthors } from "@/lib/trendingAuthors";
import { User2 } from "lucide-react";
import ExploreCategories from "@/components/ExploreCategories";
import TrendingAuthors from "@/components/TrendingAuthors";

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


export default async function ExplorePage({ filter}: {filter:string})  {

//   const params = await searchParams;
//   const filter = params.filter === "latest" ? "latest" : "trending";


  const blogs  = await fetchBlogs(filter, 1,[]);
  
  return (
    <div className="p-10 pt-12 max-sm:px-6 2xl:w-[1300px] xl:w-[1100px] lg:w-[1000px] max-lg:w-[750px] max-md:w-full mx-auto">
      <h1 className="text-4xl max-sm:text-3xl font-bold font-montserrat text-center dark:text-zinc-50 text-zinc-700 mb-12">Explore {filter === "latest" ? "Latest" : "Trending"} Blogs</h1>
      
        {/* Filter Buttons */}
        <div className="flex justify-start gap-4 mb-12  max-lg:justify-center">
          <Link href="/explore-blogs?filter=latest">
            <button className={`px-4 py-2 rounded-xl ${filter === "latest" ? "bg-purple-600 text-white" : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"}`}>
              Latest Blogs
            </button>
          </Link>
          <Link href="/explore-blogs?filter=trending">
            <button className={`px-4 py-2 rounded-xl ${filter === "trending" ? "bg-purple-600 text-white" : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"}`}>
              Trending Blogs
            </button>
          </Link>
        </div>
      

      
      <div className="flex gap-4">

        <div className="w-[65%] max-2xl:w-[60%] max-lg:w-full flex flex-col gap-12 max-sm:gap-12">
          <BlogsList blogs={blogs.blogs} />
          <LoadMore filter={filter} componentType="explore" slug="" excludedIds={ blogs?.blogs?.map((blog:Blog) => blog._id) }/>
        </div>

        <div className="w-[2px] max-lg:hidden mb-12 rounded dark:bg-zinc-700 bg-zinc-200 mx-8">
            {/* Divider Line   */}
        </div>       

        <div className="w-[30%] max-2xl:w-[35%] mt-4 max-lg:hidden font-montserrat flex flex-col gap-8">
          <ExploreCategories />
          <TrendingAuthors />
        </div>
      </div>
    </div>
  );
}
