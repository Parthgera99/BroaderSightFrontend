"use client"
import { trendingBlogsByCategory } from '@/app/category/[slug]/categoryPage';
import BlogsList from '@/app/explore-blogs/blog-list';
import { fetchBlogs } from '@/app/explore-blogs/explorePage';
import { Loader2 } from 'lucide-react';
import React , { useState, useEffect } from 'react'
import {useInView} from "react-intersection-observer"


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


  
  
  function LoadMore({filter,excludedIds, componentType, slug}:{filter:string, excludedIds:string[], componentType:string, slug:string}) {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [page, setPage] = useState(2);
    const {ref, inView} = useInView();
    const [hasMore, setHasMore] = useState(true)
    const [type, setType] = useState<string>(componentType)
    const [excludedIdArray,setExcludedIdArray] = useState<string[]>(excludedIds)

    useEffect(() => {
      if(inView){
        loadMoreBlogs(filter,page,excludedIdArray, type)
      }
    
    }, [inView])

    useEffect(() => {
      setType(componentType)
    }, [])


    useEffect(() => {
        setBlogs([]); // Reset blogs when filter changes
        setPage(2); // Reset page number
        setExcludedIdArray(excludedIds); // Reset excluded IDs
        setHasMore(true)
      }, [filter]); // Run effect when filter changes
      
    
    
    const loadMoreBlogs = async (filter:string,page:number,excludedIdArray:string[], type:string) => {
        
      if(type==="explore"){
          let newBlogs = await fetchBlogs(filter, page, excludedIdArray);
          if(filter==="latest") {
          //   newBlogs = await fetchBlogs(filter,page);
          setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs.blogs]);
          setPage((prev) => prev + 1);
          if(newBlogs.totalBlogs<1){
              setHasMore(false)
          }
        } else {
          setBlogs((prevBlogs)=>[...prevBlogs, ...newBlogs.blogs])
          const newIds = newBlogs.blogs.map((blog:Blog) => blog._id)
          setExcludedIdArray((prev)=>[...prev,...newIds])
          if(newBlogs.totalBlogs<1){
              setHasMore(false)
          }
        }
      }
      else if(type==="category"){
        let newBlogs = await trendingBlogsByCategory(excludedIdArray, slug);
        setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs.blogs]);
        const newIds = newBlogs.blogs.map((blog:Blog) => blog._id)
        setExcludedIdArray((prev)=>[...prev,...newIds])
        if(newBlogs.totalBlogs<1){
          setHasMore(false)
        }
      }
    }

  return (
    <>
        {page>1 ? <BlogsList blogs={blogs} /> : <div></div>}
        <div ref={ref} className='flex justify-center'>
            { hasMore ? 
                <Loader2 className='animate-spin '/> 
                : <div className='w-[3px] h-[3px] rounded-full bg-zinc-500'>

                </div>
            }
        </div>
    </>
  )
}

export default LoadMore