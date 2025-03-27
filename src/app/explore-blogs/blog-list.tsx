// import { Separator } from "@/components/ui/separator";
// import api from "@/lib/api";

// type Blog = {
//     _id: string;
//     title: string;
//     author: {
//       fullname: string;
//       username: string;
//       profilePicture: string;
//       role: string;
//     };
//     createdAt: string;
//   };
  
//   // Fetch blogs on the server before rendering
//   async function fetchBlogs(filter: string) {
//     try {
//         const endpoint = filter === "trending" ? "/blog/list" : "/blog/list/sorted";
//         const res = await api.get(`${endpoint}`, {
//             headers: {
//               "Cache-Control": "no-cache, no-store, must-revalidate",
//               Pragma: "no-cache",
//               Expires: "0",
//             },
//           });
//         return res.data.data.blogs;
//     } catch (error) {
//         console.error("Error fetching blogs:", error);
//         return [];
//     }
//   }
  
//   export default async function BlogsList({ filter }: { filter: string | undefined }) {
//     if(!filter) {
//         filter = "trending";
//     }
//     const blogs: Blog[] = await fetchBlogs(filter);
  
//     return (
//         <div className="flex gap-12 mt-8">
//             <div className="space-y-4 w-[60%]">
//                 {blogs && blogs.length === 0 ? (
//                 <p className="text-center">No blogs found.</p>
//                 ) : (
//                 blogs?.map((blog) => (
//                     <div key={blog._id} className="p-4 border rounded shadow w-[100%]">
//                     <h2 className="text-xl font-semibold">{blog.title}</h2>
//                     <p className="text-gray-600">By {blog.author.fullname}</p>
//                     <p className="text-sm text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
//                     </div>
//                 ))
//                 )}
//             </div>
//             <div className="w-[2px] mb-12 rounded dark:bg-zinc-700 bg-zinc-400 ml-12">
//                 {/* Divider Line   */}
//             </div>       
//             <div className="w-[35%]">

//             </div>
//         </div>
//     );
//   }
  








// "use client";
// import { useState, useEffect, useRef } from "react";
// import api from "@/lib/api";
// import { fetchBlogs } from "./page";
// import { Loader2 } from "lucide-react";

// type Blog = {
//   _id: string;
//   title: string;
//   author: {
//     fullname: string;
//     username: string;
//     profilePicture: string;
//     role: string;
//   };
//   createdAt: string;
// };

// export default function BlogsList({ initialBlogs, filter }: { initialBlogs: Blog[]; filter: string }) {
//   const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const lastBlogRef = useRef<HTMLDivElement | null>(null);  const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1); // Reset page when filter changes

//   async function fetchMoreBlogs(filter: string, page: number) {
//     setLoading(true);
//     try {
//       let endpoint = filter === "trending" ? "/blog/list" : "/blog/list/sorted";
//       let res;

//       if (filter === "trending") {
//         res = await api.post(endpoint, 
//           { excludedIds: blogs.map((blog) => blog._id) }, 
//           { headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }
//         );
//       } else {
//         res = await api.get(endpoint, {
//           params: { page, limit: 10 },
//           headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
//         });
//       }

//       const newBlogs = res.data.data.blogs || [];

      
//         setBlogs((prev) => [...prev, ...newBlogs]); // Append for pagination
      

//     } catch (error : any) {
//       if (error.response?.status === 404) {
//         setHasMore(false);
//       }
//     }
//     setLoading(false);
//   }

//   const changeFilterFetch = async () => {
//     const blogs = await fetchBlogs(filter,1);
//     setBlogs(blogs);
//   }

//   // Fetch blogs when filter changes
//   useEffect(() => {
//     setLoading(true);
//     setPage(1); 
//     setBlogs([]);
//     setHasMore(true);
//     changeFilterFetch();
//     setLoading(false);
//   }, [filter]); 

//   // // Infinite Scroll Effect
//   useEffect(() => {
//     if (loading || !hasMore) return;
//     if (observerRef.current) observerRef.current.disconnect();

//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prev) => prev + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (lastBlogRef.current) observerRef.current.observe(lastBlogRef.current);

//     return () => observerRef.current?.disconnect();
//   }, [loading, hasMore]);// Re-run observer when `filter` changes


//   useEffect(() => {
//     if (filter === "latest" && page > 1) {
//       fetchMoreBlogs(filter, page);
//     }
//   }, [page]);


//   return (
//     <div className="space-y-4">
//       {blogs.length === 0 && !loading ? (
//         <p className="text-center">No blogs found.</p>
//       ) : (
//         blogs.map((blog, index) => (
//           <div key={blog._id} className="p-4 border rounded shadow" ref={index === blogs.length - 1 ? lastBlogRef : null}>
//             <h2 className="text-xl font-semibold">{blog.title}</h2>
//             <p className="text-gray-600">By {blog.author.fullname}</p>
//             <p className="text-sm text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
//           </div>
//         ))
//       )}
//       {/* Infinite Scroll Trigger */}
//       <div className="h-10"></div>

//       {loading && <p className="text-center">
//         <Loader2 className="animate-spin" />
//       </p>}
//     </div>
//   );
// }


"use client"

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

export default function BlogsList({ blogs }: { blogs: Blog[] }) {
  
 return (


  
  <div className="flex flex-col gap-4">
       {blogs.length > 0 && (
          blogs.map((blog, index) => (
            <div key={blog._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">By {blog.author.fullname}</p>
              <p className="text-sm text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
            </div>
          ))
        )}
        

      </div>
 )
}