import React from 'react'
import { notFound } from "next/navigation";
import api from "@/lib/api";
import axios from 'axios';
import Link from 'next/link';
import { Trash2Icon, User2, VerifiedIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import HeadingDisplay from '@/components/displayComponents/HeadingDisplay';
import ParagraphDisplay from '@/components/displayComponents/ParagraphDisplay';
import ImageDisplay from '@/components/displayComponents/ImageDisplay';
import VideoDisplay from '@/components/displayComponents/VideoDisplay';
import ListDisplay from '@/components/displayComponents/ListDisplay';
import TableDisplay from '@/components/displayComponents/TableDisplay';
import Footer from '@/components/Footer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import BlogDeleteButton from '@/components/BlogDeleteButton';
import { getUser } from '@/lib/GetUserService';


async function getBlogDetails(blogSlug:string): Promise<Blog | null> {
    try {
        const response = await api.get(`/blog/${blogSlug}`);
        // console.log(response.data.data)
        return response.data.data.blog; 
    } catch (err) {
        if (axios.isAxiosError(err)) {
            let error = err.response?.status;
            if(error = 404){
                return null
            }
            console.error("API error:", err.response?.data || err.message);
        } else {
            console.error("Unexpected error:", err);
        }
        return null;  
    }
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

async function page({params}:{params:{slug:string}}) {
    const { slug } = await params;

    const blog:Blog|null = await getBlogDetails(slug);
    const user = await getUser();
    // console.log(user)
    
    if (!blog) {
        return notFound(); 
    }

    const socialPlatforms = [
        {
          name: "WhatsApp",
          url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this blog: http://192.168.29.237:3000/blog/${slug}`)}`,
          svg: (
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 48L3.374 35.674C1.292 32.066 0.198 27.976 0.2 23.782C0.206 10.67 10.876 0 23.986 0C30.348 0.002 36.32 2.48 40.812 6.976C45.302 11.472 47.774 17.448 47.772 23.804C47.766 36.918 37.096 47.588 23.986 47.588C20.006 47.586 16.084 46.588 12.61 44.692L0 48ZM13.194 40.386C16.546 42.376 19.746 43.568 23.978 43.57C34.874 43.57 43.75 34.702 43.756 23.8C43.76 12.876 34.926 4.02 23.994 4.016C13.09 4.016 4.22 12.884 4.216 23.784C4.214 28.234 5.518 31.566 7.708 35.052L5.71 42.348L13.194 40.386ZM35.968 29.458C35.82 29.21 35.424 29.062 34.828 28.764C34.234 28.466 31.312 27.028 30.766 26.83C30.222 26.632 29.826 26.532 29.428 27.128C29.032 27.722 27.892 29.062 27.546 29.458C27.2 29.854 26.852 29.904 26.258 29.606C25.664 29.308 23.748 28.682 21.478 26.656C19.712 25.08 18.518 23.134 18.172 22.538C17.826 21.944 18.136 21.622 18.432 21.326C18.7 21.06 19.026 20.632 19.324 20.284C19.626 19.94 19.724 19.692 19.924 19.294C20.122 18.898 20.024 18.55 19.874 18.252C19.724 17.956 18.536 15.03 18.042 13.84C17.558 12.682 17.068 12.838 16.704 12.82L15.564 12.8C15.168 12.8 14.524 12.948 13.98 13.544C13.436 14.14 11.9 15.576 11.9 18.502C11.9 21.428 14.03 24.254 14.326 24.65C14.624 25.046 18.516 31.05 24.478 33.624C25.896 34.236 27.004 34.602 27.866 34.876C29.29 35.328 30.586 35.264 31.61 35.112C32.752 34.942 35.126 33.674 35.622 32.286C36.118 30.896 36.118 29.706 35.968 29.458Z" fill="#25D366"/>
    </svg>
    
          ),
        },
        {
          name: "LinkedIn",
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`http://192.168.29.237:3000/blog/${slug}`)}`,
          svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_11_574)">
                        <path d="M22.2283 0H1.77167C1.30179 0 0.851161 0.186657 0.518909 0.518909C0.186657 0.851161 0 1.30179 0 1.77167V22.2283C0 22.6982 0.186657 23.1488 0.518909 23.4811C0.851161 23.8133 1.30179 24 1.77167 24H22.2283C22.6982 24 23.1488 23.8133 23.4811 23.4811C23.8133 23.1488 24 22.6982 24 22.2283V1.77167C24 1.30179 23.8133 0.851161 23.4811 0.518909C23.1488 0.186657 22.6982 0 22.2283 0ZM7.15333 20.445H3.545V8.98333H7.15333V20.445ZM5.34667 7.395C4.93736 7.3927 4.53792 7.2692 4.19873 7.04009C3.85955 6.81098 3.59584 6.48653 3.44088 6.10769C3.28591 5.72885 3.24665 5.31259 3.32803 4.91145C3.40941 4.51032 3.6078 4.14228 3.89816 3.85378C4.18851 3.56529 4.55782 3.36927 4.95947 3.29046C5.36112 3.21165 5.77711 3.25359 6.15495 3.41099C6.53279 3.56838 6.85554 3.83417 7.08247 4.17481C7.30939 4.51546 7.43032 4.91569 7.43 5.325C7.43386 5.59903 7.38251 5.87104 7.27901 6.1248C7.17551 6.37857 7.02198 6.6089 6.82757 6.80207C6.63316 6.99523 6.40185 7.14728 6.14742 7.24915C5.893 7.35102 5.62067 7.40062 5.34667 7.395ZM20.4533 20.455H16.8467V14.1933C16.8467 12.3467 16.0617 11.7767 15.0483 11.7767C13.9783 11.7767 12.9283 12.5833 12.9283 14.24V20.455H9.32V8.99167H12.79V10.58H12.8367C13.185 9.875 14.405 8.67 16.2667 8.67C18.28 8.67 20.455 9.865 20.455 13.365L20.4533 20.455Z" fill="#0A66C2"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_11_574">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
          ),
        },
        {
          name: "X",
          url: `https://x.com/intent/tweet?url=${encodeURIComponent(`http://192.168.29.237:3000/blog/${slug}`)}&text=${encodeURIComponent("Check out this blog!")}`,
          svg: (
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3263 0.903931H20.6998L13.3297 9.32742L22 20.7899H15.2112L9.89403 13.838L3.80995 20.7899H0.434432L8.31743 11.78L0 0.903931H6.96111L11.7674 7.25826L17.3263 0.903931ZM16.1423 18.7707H18.0116L5.94539 2.81706H3.93946L16.1423 18.7707Z" className="fill-black dark:fill-white"/>
                    </svg>
          ),
        },
        {
          name: "Facebook",
          url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`http://192.168.29.237:3000/blog/${slug}`)}`,
          svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_11_79)">
                        <path d="M24 12C24 5.3726 18.6274 1.52588e-05 12 1.52588e-05C5.37259 1.52588e-05 0 5.3726 0 12C0 17.6278 3.87432 22.3499 9.10108 23.6466V15.667H6.62659V12H9.10108V10.4199C9.10108 6.33548 10.9495 4.44236 14.9594 4.44236C15.7196 4.44236 17.0314 4.5914 17.568 4.74049V8.06468C17.2848 8.03487 16.7929 8.01995 16.1817 8.01995C14.214 8.01995 13.4538 8.76529 13.4538 10.7031V12H17.3734L16.7001 15.667H13.4538V23.9121C19.3955 23.1945 24 18.1353 24 12Z" fill="#0866FF"/>
                        <path d="M16.7001 15.667L17.3734 12H13.4538V10.7031C13.4538 8.76524 14.214 8.01995 16.1817 8.01995C16.7929 8.01995 17.2848 8.03483 17.568 8.06464V4.7405C17.0314 4.59141 15.7196 4.44232 14.9594 4.44232C10.9495 4.44232 9.10108 6.33549 9.10108 10.4199V12H6.62659V15.667H9.10108V23.6466C10.0295 23.8769 11.0003 24 12 24C12.4922 24 12.9772 23.9697 13.4538 23.9121V15.667H16.7001Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_11_79">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
          ),
        },
      ];


  return (
    <div>
    <div className='mx-auto 2xl:w-[1100px] xl:w-[1000px] lg:w-[900px] max-lg:w-[90%]  max-sm:mx-4 flex justify-center py-20 pb-6 max-sm:py-16 max-sm:pb-0'>
        {/* Main Content  */}
        <div className='flex flex-col gap-6 2xl:w-[85%] xl:w-[100%] w-[100%] max-md:w-full'>
            <h1 className='text-[40px] max-sm:text-3xl leading-[50px] text-zinc-700 dark:text-purple-200 font-bold font-montserratAlt'>
                 {blog.title}
            </h1>
            <p className='text-base max-sm:text-sm max-lg:pr-4 text-zinc-500 dark:text-zinc-300 font-medium font-montserrat pr-16 '>
                {blog.metaDescription}
            </p>
            <div className="flex justify-between gap-4 items-center">
                {/* Author  */}
                <div className='flex gap-4 items-center'>
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
                    <div className='h-1 w-1 bg-zinc-500 rounded-full'></div>
                <p className="text-right text-sm text-zinc-500">{new Date(blog.date).toDateString()}</p>
                </div>
                {user?.role === "admin" ? 
                    <div className='flex justify-end'>
                        <BlogDeleteButton blogId={blog._id}/>
                    </div> 
                    : 
                    <></>
                }
            </div>


            {/* <div>
                <img className='rounded-2xl max-h-[400px] mx-auto' src={blog.displayImage}/>
            </div> */}

            <div className="flex justify-center my-4">
            <Image
                src={blog.displayImage}
                alt="Blog image"
                className="rounded-2xl"
                width={800} // or a reasonably large default width
                height={0} // let height auto-adjust based on width
                style={{
                height: "auto",
                maxHeight: "400px",
                width: "auto",
                }}
                priority
            />
            </div>

            <div className="h-[1px] max-sm:my-4 w-full bg-zinc-200 dark:bg-zinc-800">
                {/* Divider  */}
            </div>

            {/* Main Content  */}
            <div className='flex flex-col gap-4'>
                {blog.content.map((block, index)=>{
                    switch (block.type.toLowerCase()) {
                        case "heading":
                          return <HeadingDisplay key={index} value={block.value} />;
                        case "paragraph":
                          return <ParagraphDisplay key={index} value={block.value} />;
                        case "image":
                          return <ImageDisplay key={index} value={block.value} />;
                        case "youtube video":
                          return <VideoDisplay key={index} value={block.value} />;
                        case "list":
                          return <ListDisplay key={index} value={block.value} />;
                        case "table":
                          return <TableDisplay key={index} value={block.value} />;
                        default:
                          return null;
                      }
                })}
            </div>

        </div>
        {/* Ads  */}
        {/* <div className='flex flex-col w-[24%] max-md:hidden bg-purple-100 dark:bg-zinc-800 rounded-xl'>
            Future Work
        </div> */}
    </div>

    <div className="h-[1px] my-12 w-full bg-zinc-200 dark:bg-zinc-800">
        {/* Divider  */}
    </div>

    {/* Tags, Faq's, Share  */}
    <div className='mx-auto 2xl:w-[1100px] xl:w-[1000px] lg:w-[900px] max-lg:w-[90%]  max-sm:mx-4 flex flex-col gap-16 my-16'>
        {/* Tags  */}
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-montserrat font-semibold text-purple-800 dark:text-purple-300'>Tags</h2>
            <div className='w-full flex flex-wrap gap-4'>
                {blog.tags.map((tag)=>{
                    return (
                        <p className='font-montserrat px-4 py-2 text-sm font-medium bg-purple-200 text-purple-900 rounded-xl'>
                            {tag}
                        </p>
                    )
                })}
            </div>
        </div>

        {/* FAQ's  */}
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-montserrat font-semibold text-purple-800 dark:text-purple-300'>FAQ's</h2>
                <Accordion type="single" className='w-[600px] max-sm:w-full mx-auto' collapsible>
                    {blog.faq.map((faq, index)=>{
                        return (
                            <AccordionItem value={index.toString()} className='' key={index}>
                                <AccordionTrigger className='text-lg font-semibold font-montserrat text-purple-800 dark:text-purple-200'>{faq.question}</AccordionTrigger>
                                <AccordionContent className='text-base font-medium font-montserrat'>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
        </div>

        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-montserrat font-semibold text-purple-800 dark:text-purple-300'>Share this Blog</h2>
            <div className='flex justify-center gap-10'>
            {socialPlatforms.map(({ name, url, svg }) => (
                <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-50 dark:text-zinc-700 rounded-lg hover:bg-purple-200 dark:hover:bg-zinc-800 transition"
                >
                {svg}
                </a>
            ))}
            </div>
        </div>
    </div>

    

    <Footer/>
    </div>
    
  )
}

export default page