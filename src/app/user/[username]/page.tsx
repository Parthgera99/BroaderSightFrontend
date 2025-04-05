import BlogsList from '@/app/explore-blogs/blog-list';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import UserAdminControls from '@/components/UserAdminControls';
import { getUser, getUserProfile } from '@/lib/GetUserService';
import { VerifiedIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({ params }: { params: { username: string } }) {
    const { username } =  await params;
    const user = await getUserProfile(username)
    if(!user) return notFound();
    const currentUser = await getUser();
    // {console.log(user)}
  if(user.isBanned && currentUser?.role !== "admin") {
    return (
      <h1 className='text-4xl text-center font-bold text-purple-700 dark:text-purple-300 mt-32 mx-[400px] font-montserratAlt'>This User has been Banned due to policy violations</h1>
    )
  }

  return (

    <div className='relative flex flex-col gap-4 mx-[400px] max-2xl:mx-auto max-2xl:w-[90%] items-center'>
      <div className="flex justify-center mt-16 mb-4">
        {user.profilePicture &&
          <Image
          src={user.profilePicture }
          alt="Blog image"
          className="rounded-full max-h-[180px] max-sm:max-h-[120px]"
          width={800} 
          height={0} 
          style={{
            height: "auto",
            width: "auto",
          }}
          priority
          />
      }
      </div>
      <div className='flex justify-center mb-3 items-center'>
        <h1 className='text-4xl font-bold text-zinc-700 dark:text-zinc-50 font-montserratAlt'>
          {user.fullname}
        </h1>
        <div className='flex gap-2 ml-4 items-center'>
          {user.role==="admin" && 
          <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <VerifiedIcon className="text-purple-700 dark:text-purple-400 my-auto w-6 h-6"/> 
              </TooltipTrigger>
              <TooltipContent className="dark:bg-zinc-700 bg-zinc-300">
              <p className="dark:text-zinc-50 text-zinc-800 font-montserrat">Official Admin</p>
              </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          }
        </div>
      </div>
      <p className='text-center text-base text-zinc-600 font-medium dark:text-zinc-200 font-montserrat'>{user.bio}</p>

      <div className='flex flex-col w-full mt-3 gap-1'>
        <div className='flex justify-between w-full'>
          <p className='font-montserrat dark:text-purple-200 font-medium text-purple-700'>@{user.username}</p>
          <p className='font-montserrat text-sm'>Joined at {new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
          </p>
        </div>

        <div className="h-[1px] mb-12 w-full bg-zinc-200 dark:bg-zinc-800">
          {/* Divider  */}
        </div>

        <div className='max-w-[1000px] w-full mx-auto'>
          <BlogsList blogs={user?.blogs} />
        </div>
      </div>

      {
        currentUser?.role==="admin" && currentUser._id !== user._id &&
        <div className='absolute top-16 right-0'>
          <UserAdminControls user={user} currentUser={currentUser}/>
        </div>
      }
      

    </div>
  )
}

export default page