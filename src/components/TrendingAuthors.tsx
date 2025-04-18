import { getTrendingAuthors } from '@/lib/trendingAuthors';
import { User2, VerifiedIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

async function TrendingAuthors() {
    const trendingAuthors:any[] = await getTrendingAuthors();
  return (
    <div>
        {/* Trending Authors  */}
        <div>
            {trendingAuthors && (
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl dark:text-purple-300 text-purple-700 font-bold">Trending Authors</h2>
                <div className="flex flex-col gap-4">
                  {trendingAuthors.slice(0, 5).map((author) => (
                    <Link href={`/user/${author.username}`} key={author._id}>
                      <div className="flex items-center gap-4 dark:bg-zinc-800 hover:bg-purple-100 duration-300 group w-full py-4 px-6 rounded-2xl">
                        {/* <img src={author.profilePicture} alt={author.fullname} className="w-12 h-12 rounded-full" /> */}
                        {author.profilePicture ? <img src={author.profilePicture} alt={author.fullname} className="min-w-10 h-10 rounded-full" /> :
                          <div className="w-10 h-10 rounded-full bg-gray-800 p-auto flex text-center items-center">
                            <User2 className="w-[70%] h-[70%] text-gray-300 my-auto m-auto" />
                          </div>
                        }
                        <div className="flex flex-col">
                          <p className="font-semibold dark:text-zinc-50 text-zinc-700 group-hover:dark:text-purple-300 group-hover:text-purple-700 duration-300 flex gap-2">
                            {author.fullname}
                            {author.role==="admin" ? 
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

                

                          <p className="text-sm dark:text-zinc-200 text-zinc-600 group-hover:dark:text-purple-300 group-hover:text-purple-700 duration-300">
                            {author.bio ? (author.bio.length > 60 ? author.bio.slice(0, 60) + "..." : author.bio) : ""}
                          </p>

                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
    </div>
  )
}

export default TrendingAuthors