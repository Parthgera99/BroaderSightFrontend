import CategorySlider from "@/components/CategorySlider";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowRight, ArrowUpRightIcon, BookOpen, PenLine, Upload, Wallet } from "lucide-react";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import BlogSection from "@/components/BlogSection";
import { AxiosError } from "axios";

async function getCategories() {
  try {
    const response = await api.get("/category/list");
    return response.data.data;  
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching categories:", err.response?.data || err.message);
    return [];  
  }
}




export default async function Home() {
  
  const categories = await getCategories();

  return (
    <div className="relative ">
      <div className="relative w-full pb-[100px]">

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
              <ArrowRight className="inline-block ml-2 w-6 h-6 max-sm:w-4 max-sm:h-4"/>
              </Link>
              <Link href="/sign-in" className="bg-purple-100 hover:bg-purple-200 max-sm:text-sm max-lg:text-base duration-300 font-montserrat text-purple-800 font-semibold py-2 max-sm:px-4 px-8 rounded-full focus:outline-none focus:shadow-outline">Start Writing</Link>
            </div>
          </div>

        {/* Animated div  */}
        <div className="relative z-20 w-[80vw] max-sm:mt-[60px] backdrop-blur-sm mt-[80px] mx-auto rounded-xl dark:bg-zinc-700/30 bg-purple-600/30 h-[650px] max-sm:p-[10px] p-[20px]">
          <div className="w-full h-full overflow-hidden dark:bg-zinc-950 backdrop-blur-lg dark:opacity-50 opacity-50 bg-zinc-50 rounded-xl">

            {/* SUB Navbar Dummy */}
            <div className="dark:bg-purple-800 bg-purple-200 flex text-xs items-center justify-between mb-[30px] max-sm:rounded-t-md rounded-t-lg w-full">
              <div className="text-center max-sm:text-xs text-sm dark:text-zinc-50 text-zinc-50 rounded-tl-lg font-semibold py-2 dark:bg-purple-800 bg-purple-400 w-full">
                Edit
              </div>
              <div className="text-center text-sm max-sm:text-xs font-semibold dark:text-zinc-50 text-zinc-800 py-2 dark:bg-purple-600 bg-zinc-200 w-full">
                Preview
              </div>
              <div className="text-center text-sm max-sm:text-xs font-semibold dark:text-zinc-50 text-zinc-800 py-2 rounded-tr-lg dark:bg-purple-600 bg-zinc-200 w-full">
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

        <h1 className="text-center mt-16 mx-64 max-xl:mx-32 max-md:mx-16 max-sm:text-lg max-sm:mx-8 font-montserrat font-semibold text-3xl text-zinc-700 dark:text-zinc-200">At Broader Sight, we dont just share knowledge - we think beyong limits.</h1>

        </div>
      </div>


      {/* Best Blog Generator Section  */}
      <div className="flex dark:bg-zinc-900 bg-zinc-200 py-32 px-48 max-2xl:px-32 max-xl:px-16 max-sm:py-16 max-sm:px-6">
        <div className="flex border max-lg:flex-col border-1 dark:border-zinc-700 border-zinc-400 w-full dark:border-zinc-700 rounded-xl gap-8">
          {/* left div  */}
          <div className="flex flex-col w-[60%] max-lg:w-[80%] max-md:w-[100%] py-12 px-12 max-sm:px-6 gap-6 font-montserrat">
            <h1 className="text-5xl max-md:text-4xl max-sm:text-2xl text-zinc-700 dark:text-zinc-200">
              Best Blog Generator Panel with Modern Interface 
            </h1>
            <Link href={"/sign-in"} className="py-2 px-4 mb-10 text-sm rounded-full dark:bg-purple-800 max-sm:dark:bg-violet-800 bg-purple-300 hover:bg-purple-400 hover:dark:bg-purple-950 duration-300  w-fit">Explore Dashboard</Link>
            <div className="flex flex-col gap-1 ">
              <Link href={"#"} className="flex gap-2 group">
              <h2 className="font-semibold text-regular dark:text-zinc-100 hover:dark:text-purple-200 duration-300 ">Fastest Blog Making</h2>
              <ArrowRight className="dark:text-purple-200 w-6 h-6 my-auto opacity-0 group-hover:opacity-100 duration-300"/>
              </Link>
              <p className="text-sm text-zinc-800 dark:text-zinc-300">Easily draft, edit, and publish your ideas. Our Blog Generator is an out of the box solution for creating new blogs in no time.</p>
            </div>
            <div className="flex flex-col gap-1 ">
              <Link href={"#"} className="flex gap-2 group">
              <h2 className="font-semibold text-regular dark:text-zinc-100 hover:dark:text-purple-200 duration-300">Grow Your Audience Rapidly</h2>
              <ArrowRight className="dark:text-purple-200 w-6 h-6 my-auto opacity-0 group-hover:opacity-100 duration-300"/>
              </Link>
              <p className="text-sm text-zinc-800 dark:text-zinc-300">Grow your audience effortlessly because our algorithm is there to handle that.</p>
            </div>
            <div className="flex flex-col gap-1 ">
              <Link href={"#"} className="flex gap-2 group">
              <h2 className="font-semibold text-regular dark:text-zinc-100 hover:dark:text-purple-200 duration-300">Full Blog Customization</h2>
              <ArrowRight className="dark:text-purple-200 w-6 h-6 my-auto opacity-0 group-hover:opacity-100 duration-300"/>
              </Link>
              <p className="text-sm text-zinc-800 dark:text-zinc-300">It offers every minor customization that you need for a blog that is ought to be viral.</p>
            </div>
            <div className="flex flex-col gap-1 ">
              <Link href={"#"} className="flex gap-2 group">
              <h2 className="font-semibold text-regular dark:text-zinc-100 hover:dark:text-purple-200 duration-300">Start Earning an Extra Income</h2>
              <ArrowRight className="dark:text-purple-200 w-6 h-6 my-auto opacity-0 group-hover:opacity-100 duration-300"/>
              </Link>
              <p className="text-sm text-zinc-800 dark:text-zinc-300">Get weekly Expert blogging tips. Start generating an extra income with just writing blogs daily.</p>
            </div>
          </div>
          {/* right div  */}
          <div className="dark:bg-purple-800 max-sm:dark:bg-violet-800 bg-purple-400 max-sm:bg-violet-400 w-[40%] max-lg:w-full max-lg:rounded-b-xl h-full lg:rounded-r-xl">
            <Image src={"/computerTick.svg"} alt="Best Blog Generator Panel" width={90} height={90} className="mx-auto max-lg:py-8 max-w-[370px] w-[90%] h-[90%] rounded-r-xl" />
          </div>
        </div>
      </div>


      

      {/* Click - NonClick Blocks Section  */}
      <div className="flex flex-col gap-16 dark:bg-zinc-950 bg-zinc-100 justify-center px-20 max-md:px-8 xl:px-32 max-sm:py-16 py-24">
        <h1 className="text-center font-montserrat font-semibold text-4xl mx-8 max-sm:mx-0 max-sm:text-3xl text-zinc-700 dark:text-zinc-200">About Our Team and Supporters</h1>
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-8 max-sm:gap-4 mx-auto">

        <Link href={"#"} className="relative rounded-xl dark:bg-sky-600 bg-sky-400 dark:hover:bg-sky-700 hover:bg-sky-500 duration-300 py-8 max-lg:py-4 max-xl:pt-4 max-xl:pb-8 min-w-[440px] max-xl:min-w-[380px] max-lg:min-w-[300px] max-sm:min-w-[200px] font-montserrat flex flex-col gap-4 max-lg:gap-2 px-10 max-lg:px-4 col-span-2">
          <h2 className="text-2xl max-xl:text-xl max-lg:text-lg font-semibold dark:text-zinc-100 text-sky-950">How BroaderSight Blogs Works?</h2>
          <p className="text-sm mb-4 max-md:mb-8 text-zinc-800 dark:text-zinc-100 pr-8 max-lg:pr-4">Get a sneal peak of how we curate top-quality Blogs for you and how are the blogs handled by us.</p>
          <button className="flex absolute gap-2 bottom-4 right-4 max-lg:bottom-2 font-medium text-sm text-zinc-800 dark:text-zinc-300">Read More <ArrowUpRightIcon className="w-6 h-6 my-auto"/> </button>
        </Link>

        <div className="rounded-xl font-montserrat cursor-drag flex flex-col justify-center items-center dark:bg-zinc-800 bg-zinc-300 min-w-[220px] max-xl:min-w-[180px] max-lg:min-w-[150px] max-sm:min-w-fit">
          <h3 className="max-sm:px-4 text-center duration-300 font-semibold dark:text-zinc-300 text-zinc-700 text-xl max-lg:text-lg max-md:py-12">Crystal Brain</h3>
        </div>

        <div className="rounded-xl font-montserrat flex justify-center items-center dark:bg-zinc-800 bg-zinc-300 min-w-[220px] max-xl:min-w-[180px] max-lg:min-w-[150px] max-sm:min-w-fit">
          <h3 className="max-sm:px-4 text-center font-semibold dark:text-zinc-300 text-zinc-700 text-xl max-lg:text-lg max-md:py-12">IBM Olympiads</h3>
        </div>

        <div className="rounded-xl font-montserrat flex justify-center items-center dark:bg-zinc-800 bg-zinc-300 min-w-[220px] max-xl:min-w-[180px] max-lg:min-w-[150px] max-sm:min-w-fit">
          <h3 className="max-sm:px-4 text-center font-semibold dark:text-zinc-300 text-zinc-700 text-xl max-lg:text-lg max-md:py-12">CrownSpire Jewelz</h3>
        </div>

        <div className="rounded-xl font-montserrat flex justify-center items-center dark:bg-zinc-800 bg-zinc-300 min-w-[220px] max-xl:min-w-[180px] max-lg:min-w-[150px] max-sm:min-w-fit">
          <h3 className="max-sm:px-4 text-center font-semibold dark:text-zinc-300 text-zinc-700 text-xl max-lg:text-lg max-md:py-12">Hindi Classes</h3>
        </div>

        <Link href={"#"} className="relative  rounded-xl dark:bg-lime-600 bg-lime-400 hover:bg-lime-500 dark:hover:bg-lime-700 duration-300 cursor-pointer  py-8 max-lg:py-4 max-xl:pt-4 max-xl:pb-8 min-w-[440px] max-xl:min-w-[380px] max-lg:min-w-[300px] max-sm:min-w-[200px] font-montserrat flex flex-col gap-4 max-lg:gap-2 px-10 max-lg:px-4 col-span-2">
          <h2 className="text-2xl max-xl:text-xl max-lg:text-lg font-semibold dark:text-zinc-50 text-lime-950">Why We Started This Platform</h2>
          <p className="text-sm mb-4 max-md:mb-8 text-zinc-800 dark:text-zinc-50 pr-8 max-lg:pr-4">Our journey, mission, and the vision behind BroaderSight.</p>
          <button className="flex absolute gap-2 bottom-4 right-4 max-lg:bottom-2 font-medium text-sm text-zinc-800 dark:text-zinc-300">Read More <ArrowUpRightIcon className="w-6 h-6 my-auto"/> </button>
        </Link>

        <Link href={"/about"} className="relative  rounded-xl dark:bg-pink-600 bg-pink-400 hover:bg-pink-500 dark:hover:bg-pink-700 duration-300 cursor-pointer  py-8 max-lg:py-4 max-xl:pt-4 max-xl:pb-8 min-w-[440px] max-xl:min-w-[380px] max-lg:min-w-[300px] max-sm:min-w-[200px] font-montserrat flex flex-col gap-4 max-lg:gap-2 px-10 max-lg:px-4 col-span-2">
          <h2 className="text-2xl max-xl:text-xl max-lg:text-lg font-semibold dark:text-zinc-50 text-pink-950">Meet the Team Behind BroaderSight</h2>
          <p className="text-sm mb-4 max-md:mb-8 text-zinc-800 dark:text-zinc-50 pr-8 max-lg:pr-4">Learn about the minds shaping the future of knowledge sharing.</p>
          <button className="flex absolute gap-2 bottom-4 right-4 max-lg:bottom-2 font-medium text-sm text-zinc-800 dark:text-zinc-300">About Us <ArrowUpRightIcon className="w-6 h-6 my-auto"/> </button>
        </Link>
        
        <div className="rounded-xl font-montserrat flex justify-center items-center dark:bg-zinc-800 bg-zinc-300 min-w-[220px] max-xl:min-w-[180px] max-lg:min-w-[150px] max-sm:min-w-fit">
          <h3 className="max-sm:px-4 text-center font-semibold dark:text-zinc-300 text-zinc-700 text-xl max-lg:text-lg max-md:py-12">Krystal Devs</h3>
        </div>

        <div className="rounded-xl font-montserrat flex justify-center items-center dark:bg-zinc-800 bg-zinc-300 min-w-[220px] max-xl:min-w-[180px] max-lg:min-w-[150px] max-sm:min-w-fit">
          <h3 className="max-sm:px-4 text-center font-semibold dark:text-zinc-300 text-zinc-700 text-xl max-lg:text-lg max-md:py-12">Apollo Tiles</h3>
        </div>

      </div>
      </div>


      {/* Infinite Scroller  */}
      <div className="relative dark:bg-purple-950 max-sm:dark:bg-violet-950 bg-purple-100 mask-fade py-[120px]">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-zinc-100 to-transparent dark:from-zinc-950 dark:to-transparent"></div>
        <CategorySlider categories={categories.slice(0, 16)}/>
        <h2 className=" my-12 max-sm:my-10 max-md:mx-16 max-sm:text-lg max-sm:mx-8 max-md:text-xl max-lg:mx-32 lg:mx-64 text-center text-3xl font-semibold font-montserrat dark:text-purple-200 text-purple-800">Explore a Wide Range of Categories</h2>
        {/* Change slice values  */}
        <CategorySlider categories={categories.slice(0, 16)}/> 
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-100 to-transparent dark:from-zinc-950 dark:to-transparent"></div> 
      </div>


      {/* Number Showcase Section  */}
      <div className="flex flex-col gap-16 dark:bg-zinc-950 bg-zinc-100 justify-center items-center py-[80px] px-32 max-sm:px-10 max-xl:px-12">
        <h3 className="text-3xl max-sm:text-2xl font-semibold font-montserrat dark:text-zinc-50 text-zinc-700 ">This is the Future of Blogging</h3>
        <div className="flex flex-row justify-center gap-16 max-sm:gap-8 flex-wrap w-full">

          <div className="font-montserrat w-[300px] max-md:w-[80%] max-sm:w-[100%] justify-center border border-1 dark:border-zinc-600 dark:bg-zinc-950 bg-zinc-100 border-zinc-400 dark:text-zinc-200 text-zinc-700 rounded-xl p-8 max-sm:px-6 flex flex-col gap-5 max-sm:gap-4">
            <h2 className="text-5xl max-xl:text-3xl">
              1000+
            </h2>
            <p className="text-sm dark:text-zinc-400">
              Knowledge Seakers join weekly - A Growing Community of Curious Minds
            </p>
            <Link href={"/sign-in"} className="dark:bg-purple-800 max-sm:dark:bg-violet-800 dark:hover:bg-purple-700 dark:text-zinc-50 bg-purple-300 hover:bg-blue-300 duration-300 text-zinc-800 max-sm:text-sm font-medium py-2 px-8 rounded-full w-fit">Sign Up</Link>
          </div>

          <div className="font-montserrat w-[300px] max-md:w-[80%] max-sm:w-[100%] justify-center border border-1 dark:border-zinc-600 dark:bg-zinc-950 bg-zinc-100 border-zinc-400 dark:text-zinc-200 text-zinc-700 rounded-xl p-8 max-sm:px-6 flex flex-col gap-5 max-sm:gap-4">
            <h2 className="text-5xl max-xl:text-3xl">
              75%
            </h2>
            <p className="text-sm dark:text-zinc-400">
              Faster Blog Creation - Publish your thoughts in minutes with World's Best Blog Generator Tool
            </p>
            <Link href={"#"} className="dark:bg-purple-800 max-sm:dark:bg-violet-800 dark:hover:bg-purple-700 dark:text-zinc-50 bg-purple-300 hover:bg-blue-300 duration-300 text-zinc-800 max-sm:text-sm font-medium py-2 px-8 rounded-full w-fit">See How</Link>
          </div>

          <div className="font-montserrat w-[300px] max-md:w-[80%] max-sm:w-[100%] justify-center border border-1 dark:border-zinc-600 dark:bg-zinc-950 bg-zinc-100 border-zinc-400 dark:text-zinc-200 text-zinc-700 rounded-xl p-8 max-sm:px-6 flex flex-col gap-5 max-sm:gap-4">
            <h2 className="text-5xl max-xl:text-3xl">
              100+
            </h2>
            <p className="text-sm dark:text-zinc-400">
              Categories Covered - From Education to Technology, Lifestyle and beyond.
            </p>
            <Link href={"/category"} className="dark:bg-purple-800 max-sm:dark:bg-violet-800 dark:hover:bg-purple-700 bg-purple-300 hover:bg-blue-300 duration-300 text-zinc-800 dark:text-zinc-50 max-sm:text-sm font-medium py-2 px-8 rounded-full w-fit whitespace-nowrap">Explore Categories</Link>
          </div>

        </div>
      </div>

      {/* Second Section  */}
      <div className="px-64 max-2xl:px-32 max-xl:px-64 max-lg:px-48 max-md:px-16 py-32 max-sm:py-16 max-sm:px-8 flex max-xl:flex-col max-lg:gap-16 gap-32 justify-center items-center bg-zinc-200 dark:bg-zinc-900">
        <div className="font-montserrat flex flex-col gap-2 max-sm:gap-4">
          <h1 className="flex gap-4 xl:whitespace-nowrap font-semibold text-lg text-purple-800 dark:text-purple-100">
            <PenLine className="w-6 h-6 my-auto"/>
            Effortless Blog Creation
          </h1>
          <p className="text-sm text-zinc-800 dark:text-zinc-300">Easily draft, edit, and publish your ideas with our seamless blog generator —no technical expertise needed!</p>
        </div>
        <div className="font-montserrat flex flex-col gap-2 max-sm:gap-4">
          <h1 className="flex gap-4 xl:whitespace-nowrap font-semibold text-lg text-purple-800 dark:text-purple-100">
            <BookOpen className="w-6 h-6 my-auto"/>
            Endless Learning Opportunities
          </h1>
          <p className="text-sm text-zinc-800 dark:text-zinc-300">Explore diverse topics across education, technology, personal growth, and more. Never stop expanding your knowledge and gaining fresh insights.</p>
        </div>
        <div className="font-montserrat flex flex-col gap-2 max-sm:gap-4">
          <h1 className="flex gap-4 xl:whitespace-nowrap font-semibold text-lg text-purple-800 dark:text-purple-100">
            <Wallet className="w-6 h-6 my-auto"/>
            Monetize Your Blogs
          </h1>
          <p className="text-sm text-zinc-800 dark:text-zinc-300">Share your knowledge and gain visibility while unlocking future opportunities to monetize your content.</p>
        </div>
      </div>

      {/* Trending Blogs Section */}
        <BlogSection />

      {/* Footer  */}

    </div>
  );
}
