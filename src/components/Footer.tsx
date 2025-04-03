import { Copyright, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-zinc-100 dark:bg-zinc-950'>

    <div className='p-8 pt-0 2xl:w-[1400px] 2xl:mx-auto'>
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800">
            {/* Divider  */}
        </div>
        <div className='flex flex-wrap gap-24 max-sm:gap-4 justify-center items-start p-8 max-sm:px-4'>
            <div className='flex flex-col gap-3 max-sm:px-32 items-center max-md:items-center'>
                <h3 className='font-semibold text-xl font-montserrat dark:text-purple-300 text-purple-700 max-sm:hidden'>Explore</h3>
                <Link href={"/explore-blogs"} className='font-semibold text-xl font-montserrat dark:text-zinc-100 text-zinc-700 sm:hidden hover:underline'>Explore</Link>
                <Link href="/explore-blogs?filter=trending" className='max-sm:hidden hover:underline duration-300'>Trending</Link>
                <Link href="/explore-blogs?filter=latest" className='max-sm:hidden hover:underline duration-300'>Latest</Link>
                <Link href="/category" className='max-sm:hidden hover:underline duration-300'>Categories</Link>
            </div>
            <div className='flex flex-col gap-3 max-sm:px-32 items-center max-md:items-center'>
                <h3 className='font-semibold text-xl font-montserrat dark:text-purple-300 text-purple-700 max-sm:hidden'>Categories</h3>
                <Link href={"/category"} className='font-semibold text-xl font-montserrat dark:text-zinc-100 text-zinc-700 sm:hidden hover:underline'>Categories</Link>
                <Link href="/category/education" className='max-sm:hidden hover:underline duration-300' >Education</Link>
                <Link href="/category/business" className='max-sm:hidden hover:underline duration-300'>Business</Link>
                <Link href="/category/technology" className='max-sm:hidden hover:underline duration-300'>Technology</Link>
                <Link href="/category/health" className='max-sm:hidden hover:underline duration-300'>Health</Link>
                <Link href="/category/self-improvement" className='max-sm:hidden hover:underline duration-300'>Self-Improvement</Link>
            </div>
            <div className='flex flex-col gap-3 max-sm:px-32 items-center max-md:items-center'>
                <h3 className='font-semibold text-xl font-montserrat dark:text-purple-300 text-purple-700 max-sm:hidden'>Company</h3>
                <Link href={"/about"} className='font-semibold text-xl font-montserrat dark:text-zinc-100 text-zinc-700 sm:hidden whitespace-nowrap hover:underline'>About Us</Link>
                <Link href="/" className='max-sm:hidden hover:underline duration-300'>Contact us</Link>
                <Link href="/about" className='max-sm:hidden hover:underline duration-300'>About us</Link>
                <Link href="/" className='max-sm:hidden hover:underline duration-300'>Privacy Policy</Link>
                <Link href="/" className='max-sm:hidden hover:underline duration-300'>Terms & Conditions</Link>
            </div>
            <div className='w-[30%] max-lg:w-[40%] max-sm:mt-8 max-md:w-full flex flex-col justify-center items-center gap-5'>
                <img src='/logo.svg' className='w-[100px] h-[100px]' alt='brodersight blogs'/>
                <h2 className='font-bold text-2xl max-sm:text-xl font-montserrat text-zinc-800 dark:text-zinc-50'>Broader Sight Blogs</h2>
                <div className='flex items-center justify-center gap-8'>
                {/* x  */}
                <Link href="https://x.com/" target='_blank'>
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3263 0.903931H20.6998L13.3297 9.32742L22 20.7899H15.2112L9.89403 13.838L3.80995 20.7899H0.434432L8.31743 11.78L0 0.903931H6.96111L11.7674 7.25826L17.3263 0.903931ZM16.1423 18.7707H18.0116L5.94539 2.81706H3.93946L16.1423 18.7707Z" className="fill-black dark:fill-white"/>
                </svg>
                </Link>
                {/* facebook  */}
                <Link href="https://www.facebook.com/" target='_blank'>
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
                </Link>
                {/* instagram  */}
                <Link href="https://www.instagram.com/" target='_blank'>
                    <img src='/instagram.svg' className='w-[24px] h-[24px]' alt='instagram'/>
                </Link>
                {/* linked in  */}
                <Link href="https://www.linkedin.com/" target='_blank'>
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
                </Link>
                </div>
            </div>
        </div>

        
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-800">
            {/* Divider  */}
        </div>

        <p className='mt-4 font-montserrat text-sm text-center'><Copyright className="inline-block mr-1" size={18} /> 2025 Broader Sight, All Rights Reserved.</p>
    </div>
    </div>
  )
}

export default Footer