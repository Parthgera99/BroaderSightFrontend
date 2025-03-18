import CategorySlider from "@/components/CategorySlider";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowRight, BookOpen, PenLine, Upload, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  

  return (
    <div className="relative ">
      <div className="relative w-full pb-[150px]">

        {/* Background Image */}
        <div className="absolute inset-0 h-90% bg-[url('/homegridbg2.svg')] dark:opacity-80 bg-cover bg-center"></div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.95)_50%,rgba(255,255,255,1)_100%)] dark:bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,1)_100%)] pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center pt-32">

          {/* Hero Section  */}
          <div className="flex flex-col items-center gap-10 max-sm:gap-8">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-medium text-purple-900 dark:text-purple-200 font-montserrat ">Think Beyond Limits</h1>
            <p className="2xl:text-xl md:text-sm max-sm:text-xs text-sm lg:text-md xl:text-md text-zinc-700 dark:text-zinc-200 font-montserrat font-regular max-lg:mx-32 max-sm:mx-8 mx-64 text-center"><b className="font-medium">Broader Sight</b> - A Platform for curious minds to explore, learn and share knowledge across diverse topics.</p>
            <div className="flex gap-8 max-sm:gap-2 mt-2">
              <Link href="/explore" className="hover:dark:bg-zinc-700 font-montserrat font-regular max-sm:text-sm max-lg:text-base hover:bg-zinc-300 duration-300 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline">
              Explore
              <ArrowRight className="inline-block ml-2 w-6 h-6"/>
              </Link>
              <Link href="/sign-in" className="bg-purple-100 hover:bg-purple-200 max-sm:text-sm max-lg:text-base duration-300 font-montserrat text-purple-800 font-semibold py-2 max-sm:px-4 px-8 rounded-full focus:outline-none focus:shadow-outline">Start Writing</Link>
            </div>
          </div>

        {/* Animated div  */}
        <div className="relative z-20 w-[80vw] max-sm:mt-[60px] backdrop-blur-sm mt-[80px] mx-auto rounded-xl dark:bg-zinc-700/30 bg-zinc-400/30 h-[650px] max-sm:p-[10px] p-[20px]">
          <div className="w-full h-full overflow-hidden dark:bg-zinc-950 backdrop-blur-lg dark:opacity-50 opacity-50 bg-zinc-50 rounded-xl">

            {/* SUB Navbar Dummy */}
            <div className="dark:bg-purple-800 bg-purple-200 flex text-xs items-center justify-between mb-[30px] max-sm:rounded-t-md rounded-t-lg w-full">
              <div className="text-center max-sm:text-xs text-sm dark:text-zinc-50 text-zinc-50 rounded-tl-lg font-semibold py-2 dark:bg-purple-800 bg-purple-400 w-full">
                Edit
              </div>
              <div className="text-center text-sm max-sm:text-xs font-semibold dark:text-zinc-50 text-zinc-800 py-2 dark:bg-purple-600 bg-purple-200 w-full">
                Preview
              </div>
              <div className="text-center text-sm max-sm:text-xs font-semibold dark:text-zinc-50 text-zinc-800 py-2 rounded-tr-lg dark:bg-purple-600 bg-purple-200 w-full">
                Change Order
              </div>
            </div>

            {/* Add Section Dummy */}
            <div className="w-full py-2 flex pl-20 max-sm:pl-8 justify-start max-sm:gap-4 gap-8 overflow-x-hidden">
            <div
              className="py-2 opacity-0 whitespace-nowrap rounded px-4 font-montserrat dark:bg-zinc-900 bg-zinc-300 font-semibold text-sm max-sm:text-xs text-zinc-900 dark:text-zinc-50"
              style={{
                animation: "fadeIn 2s ease-in 3.2s forwards, clickEffect 0.4s ease-in-out 7.5s"
              }}
            >
              Add Heading
            </div>

              <div className="py-2  max-sm:text-xs opacity-0 whitespace-nowrap rounded px-4 font-montserrat dark:bg-zinc-900 bg-zinc-300 font-semibold text-sm text-zinc-900 dark:text-zinc-50" style={{animation: "fadeIn 2s ease-in 3.5s forwards, clickEffect 0.4s ease-in-out 9s"}}>
                Add Paragraph
              </div>
              <div className="py-2 max-sm:text-xs animate-fade-in opacity-0 whitespace-nowrap rounded px-4 font-montserrat dark:bg-zinc-900 bg-zinc-300 font-semibold text-sm text-zinc-900 dark:text-zinc-50" style={{animationDelay: "3.8s"}}>
                Add Image
              </div>
              <div className="py-2 max-sm:text-xs animate-fade-in opacity-0 whitespace-nowrap rounded px-4 font-montserrat dark:bg-zinc-900 bg-zinc-300 font-semibold text-sm text-zinc-900 dark:text-zinc-50" style={{animationDelay: "4.1s"}}>
                Add Video URL
              </div>
              <div className="py-2 max-sm:text-xs animate-fade-in opacity-0 whitespace-nowrap rounded px-4 font-montserrat dark:bg-zinc-900 bg-zinc-300 font-semibold text-sm text-zinc-900 dark:text-zinc-50" style={{animationDelay: "4.4s"}}>
                Add List
              </div>
              <div className="py-2 max-sm:text-xs animate-fade-in opacity-0  whitespace-nowrap rounded px-4 font-montserrat dark:bg-zinc-900 bg-zinc-300 font-semibold text-sm text-zinc-900 dark:text-zinc-50" style={{animationDelay: "4.7s"}}>
                Add Table
              </div>
            </div>

            <div className="mt-[40px] animate-fade-in opacity-0 whitespace-nowrap ml-20 max-sm:ml-8 dark:bg-zinc-800 text-2xl py-4 px-6 font-bold rounded-lg bg-zinc-300 w-[40%] max-sm:w-[80%]" style={{animationDelay: "5s"}}>
              Set Title
            </div>
            <div className="mt-[25px] max-sm:text-sm animate-fade-in opacity-0 whitespace-nowrap ml-20 max-sm:ml-8 dark:bg-zinc-800 text-md py-2 px-4 font-semibold rounded-lg bg-zinc-300 text-center w-[22%] max-lg:w-fit" style={{animationDelay: "5.3s"}}>
              Select Categories
            </div>
            <div className="flex gap-4 max-sm:text-sm animate-fade-in opacity-0 whitespace-nowrap justify-center mt-[25px] ml-20 max-sm:ml-8 dark:bg-zinc-800 text-md py-2 px-4 font-semibold rounded-lg bg-zinc-300 text-center w-[22%] max-lg:w-fit" style={{animationDelay: "5.6s"}}>
              Select Image 
              <Upload className="w-4 h-4 my-auto"/>
            </div>

            <Separator className="w-[80%] animate-fade-in opacity-0 ml-20 max-sm:ml-8 mt-[35px] h-[1px] bg-zinc-800" style={{animationDelay: "5.9s"}}/>

            {/* Heading Dummy  */}
            <h1 className="mt-[40px] max-sm:ml-8 animate-fade-in opacity-0 ml-20 dark:bg-zinc-800 whitespace-nowrap max-sm:text-lg max-sm:py-2 text-xl py-4 px-6 font-bold rounded-lg bg-zinc-300 w-[30%] max-lg:w-fit" style={{animationDelay: "7.5s"}}>Add Heading</h1>

            <div className="mt-[40px] max-sm:w-[80%] max-sm:ml-8 animate-fade-in opacity-0 ml-20 dark:bg-zinc-800 text-sm py-2 px-4 rounded-lg bg-zinc-300 w-[60%] h-[100px] overflow-y-hidden" style={{animationDelay: "9s"}}>
              <p className="text-zinc-600 text-sm dark:text-zinc-50 m-2">Add Paragraph</p>
            </div>

          </div>
        </div>

        </div>

      </div>

      <div className="px-64 max-2xl:px-32 max-md:px-10 py-32 flex max-lg:flex-col max-lg:gap-16 gap-32 max-lg:px-24 justify-center items-center bg-zinc-50 dark:bg-zinc-900">
        <div className="font-montserrat flex flex-col gap-2">
          <h1 className="flex gap-4 xl:whitespace-nowrap font-semibold text-lg text-zinc-700 dark:text-zinc-50">
            <PenLine className="w-6 h-6 my-auto"/>
            Effortless Blog Creation
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-300">Easily draft, edit, and publish your ideas with our seamless blog generator —no technical expertise needed!</p>
        </div>
        <div className="font-montserrat flex flex-col gap-2">
          <h1 className="flex gap-4 xl:whitespace-nowrap font-semibold text-lg text-zinc-700 dark:text-zinc-50">
            <BookOpen className="w-6 h-6 my-auto"/>
            Endless Learning Opportunities
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-300">Explore diverse topics across education, technology, personal growth, and more. Never stop expanding your knowledge and gaining fresh insights.</p>
        </div>
        <div className="font-montserrat flex flex-col gap-2">
          <h1 className="flex gap-4 xl:whitespace-nowrap font-semibold text-lg text-zinc-700 dark:text-zinc-50">
            <Wallet className="w-6 h-6 my-auto"/>
            Monetize Your Blogs
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-300">Share your knowledge and gain visibility while unlocking future opportunities to monetize your content.</p>
        </div>
      </div>

      {/* <div className="flex overflow-hidden space-x-10 py-32">
        <div className="flex space-x-10 animate-loop-scroll">
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Education
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Business
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Technology
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Health
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Finance
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Cryptocurrency
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Cars
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Tech
          </div>
        </div>
        <div className="flex space-x-10 animate-loop-scroll" aria-hidden="true">
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Education
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Business
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Technology
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Health
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Finance
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Cryptocurrency
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Cars
          </div>
          <div className="w-[170px] py-2 text-center text-base font-normal rounded-full bg-zinc-300 dark:bg-zinc-800">
            Tech
          </div>
        </div>
      </div> */}

      <CategorySlider/>

    </div>
  );
}
