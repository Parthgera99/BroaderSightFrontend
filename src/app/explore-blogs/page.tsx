import { Suspense } from "react";
import BlogsList from "./blog-list";
import Link from "next/link";
import api from "@/lib/api";
import LoadMore from "@/components/LoadMore";
import { getCategories } from "@/lib/categoryService";
import { getTrendingAuthors } from "@/lib/trendingAuthors";
import { User2 } from "lucide-react";

interface ExplorePageProps {
  searchParams: { filter?: string };
  page: number|undefined
}

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

  const categories:any[] = await getCategories();
  const trendingAuthors:any[] = await getTrendingAuthors();

  const blogs  = await fetchBlogs(filter, 1,[]);
  
  return (
    <div className="mx-12 p-10 max-sm:px-4 2xl:w-[1400px] max-lg:w-[750px] max-md:w-full mx-auto">
      <div className="flex max-md:flex-col max-md:justify-start justify-between max-md:gap-4">
        <h1 className="text-3xl font-bold text-center dark:text-zinc-50 text-zinc-700 max-md:text-left max-sm:text-center mb-6">Explore {filter === "latest" ? "Latest" : "Trending"} Blogs</h1>
        {/* Filter Buttons */}
        <div className="flex justify-center max-md:justify-end max-sm:justify-center gap-4 mb-6 max-sm:mb-12">
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
      </div>

      {/* Blog List - Suspense for smooth loading */}
      <div className="flex gap-4">

        <div className="w-[60%] max-lg:w-full flex flex-col gap-4  max-sm:gap-12">
          <BlogsList blogs={blogs.blogs} />
          <LoadMore filter={filter} excludedIds={ blogs?.blogs?.map((blog:Blog) => blog._id) }/>
        </div>

        <div className="w-[2px] max-lg:hidden mb-12 rounded dark:bg-zinc-700 bg-zinc-400 mx-8">
            {/* Divider Line   */}
        </div>       

        <div className="w-[35%] mt-4 max-lg:hidden font-montserrat flex flex-col gap-8">
          {/* Categories  */}
          <h2 className="text-2xl dark:text-purple-300 text-purple-800 font-semibold">Explore Categories</h2>
          <div className="relative flex flex-wrap gap-4 pb-12">
            {categories.slice(0, 15).map((category) => (
              <Link href={`/category/${category.slug}`} key={category._id}>
                <p className="px-4 py-2 rounded-full dark:bg-zinc-800 bg-zinc-200 hover:dark:bg-purple-700 hover:bg-purple-300 duration-300 cursor-pointer">{category.name}</p>
              </Link>
            ))}
            <Link href={"/category"}>
              <p className="px-4 absolute right-0 bottom-0 py-2 rounded-xl hover:dark:text-purple-300 hover:text-purple-700 duration-300 text-zinc-700 dark:text-zinc-50 font-semibold hover:dark:bg-zinc-700 hover:bg-zinc-200 cursor-pointer">View More</p>
            </Link>
          </div>
          {/* Trending Authors  */}
          <div>
            {trendingAuthors && (
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl dark:text-purple-300 text-purple-800 font-semibold">Trending Authors</h2>
                <div className="flex flex-col gap-4">
                  {trendingAuthors.slice(0, 5).map((author) => (
                    <Link href={`/user/${author.username}`} key={author._id}>
                      <div className="flex items-center gap-4 dark:bg-zinc-800 bg-zinc-200 group w-[90%] py-4 px-6 rounded-lg">
                        {/* <img src={author.profilePicture} alt={author.fullname} className="w-12 h-12 rounded-full" /> */}
                        {author.profilePicture ? <img src={author.profilePicture} alt={author.fullname} className="w-10 h-10 rounded-full" /> :
                          <div className="w-10 h-10 rounded-full bg-gray-800 p-auto flex text-center items-center">
                            <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto" />
                          </div>
                        }
                        <div className="flex flex-col">
                          <p className="font-semibold dark:text-zinc-50 text-zinc-700 group-hover:dark:text-purple-300 group-hover:text-purple-700 duration-300">{author.fullname}</p>
                          <p className="text-sm dark:text-zinc-200 text-zinc-600 group-hover:dark:text-purple-300 group-hover:text-purple-700 duration-300">{author.bio}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
