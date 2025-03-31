import { getTrendingAuthors } from '@/lib/trendingAuthors';
import { User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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
                          <p className="font-semibold dark:text-zinc-50 text-zinc-700 group-hover:dark:text-purple-300 group-hover:text-purple-700 duration-300">{author.fullname}</p>
                          <p className="text-sm dark:text-zinc-200 text-zinc-600 group-hover:dark:text-purple-300 group-hover:text-purple-700 duration-300">{author.bio.length>60 ? author.bio.slice(0, 60) + "..." : author.bio}</p>
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