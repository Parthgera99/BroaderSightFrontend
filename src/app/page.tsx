import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative ">
      <div className="relative w-full pb-[60px]">

        {/* Background Image */}
        <div className="absolute inset-0 h-90% bg-[url('/homegridbg2.svg')] dark:opacity-80 bg-cover bg-center"></div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.95)_50%,rgba(255,255,255,1)_100%)] dark:bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,1)_100%)] pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center pt-32">

          {/* Hero Section  */}
          <div className="flex flex-col items-center gap-10 max-sm:gap-8">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-medium text-purple-900 dark:text-purple-200 font-montserrat ">See - Think - Grow</h1>
            <p className="2xl:text-xl md:text-sm max-sm:text-xs text-sm lg:text-md xl:text-md text-zinc-700 dark:text-zinc-200 font-montserrat font-regular max-lg:mx-32 max-sm:mx-8 mx-64 text-center">Join the ultimate platform where authors & aspiring writers can effortlessly create, publish, and monetize their content.</p>
            <div className="flex gap-8 max-sm:gap-2 mt-2">
              <Link href="/explore" className="hover:dark:bg-zinc-700 font-montserrat font-regular max-sm:text-sm max-lg:text-base hover:bg-zinc-300 duration-300 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline">
              Explore
              <ArrowRight className="inline-block ml-2 w-6 h-6"/>
              </Link>
              <Link href="/sign-in" className="bg-purple-200 hover:bg-purple-300 max-sm:text-sm max-lg:text-base duration-300 font-montserrat text-purple-800 font-semibold py-2 max-sm:px-4 px-8 rounded-full focus:outline-none focus:shadow-outline">Start Writing</Link>
            </div>
          </div>

        {/* Animated div  */}
        <div className="relative z-20 w-[80vw] max-sm:mt-[60px] mt-[80px] mx-auto rounded-xl dark:bg-zinc-700/30 bg-zinc-300/30 h-[650px] max-sm:p-[10px] p-[20px]">
          <div className="w-full h-full dark:bg-zinc-950/80 bg-zinc-50 rounded-xl">

          </div>
        </div>

        </div>


      </div>

      {/* <div className="bg-purple-100 dark:bg-purple-900">
        
      </div> */}

    </div>
  );
}
