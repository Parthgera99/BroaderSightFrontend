// "use client"
import React from 'react'
import Link from 'next/link';


async function CategorySlider({ categories }: { categories: any[] }) {
    // const handleClick = (category : any) =>{
    //     console.log(category)
    //   }


  return (
    <>
    <div className="wrapper mb-4">
      {categories.length > 0 ? (
          categories.slice(0, 8).map((category, index) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.slug}
              className={`item item${index} dark:bg-purple-700 max-sm:dark:bg-violet-700 bg-purple-300 hover:bg-purple-400 dark:hover:bg-purple-600 py-2 dark:text-zinc-50 text-center rounded-full`}
              // onClick={() => console.log(category.name)}
            >
              {category.name}
            </Link>
          ))
        ) : (
          <p className="text-red-500">No categories found</p>
        )}
        {/* <button className="item item1 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Education</button>
        <button className="item item2 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Business</button>
        <button className=" item item3 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Technology</button>
        <button className=" item item4 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Cars</button>
        <button className=" item item5 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">CryptoCurrency</button>
        <button className=" item item6 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Health</button>
        <button className="item item7 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Finance</button>
        <button className=" item item8 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Politics</button> */}
      </div>
    <div className="wrapper2">
      {categories.length > 0 ? (
            categories.slice(8,16).map((category, index) => ( //Add Slice for next 8
              <Link
                href={`/category/${category.slug}`}
                key={category.slug}
                className={`rightItem item${index} dark:bg-purple-700 max-sm:dark:bg-violet-700 bg-purple-300 hover:bg-purple-400 dark:hover:bg-purple-600 py-2 dark:text-zinc-50 text-center rounded-full`}
                // onClick={() => console.log(category.name)}
              >
                {category.name}
              </Link>
            ))
          ) : (
            <p className="text-red-500">No categories found</p>
          )}
        {/* <button className="rightItem item1 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Education</button>
        <button className="rightItem item2 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Business</button>
        <button className=" rightItem item3 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Technology</button>
        <button className=" rightItem item4 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Cars</button>
        <button className=" rightItem item5 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">CryptoCurrency</button>
        <button className=" rightItem item6 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Health</button>
        <button className="rightItem item7 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Finance</button>
        <button className=" rightItem item8 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Politics</button> */}
      </div>
    </>
  )
}

export default CategorySlider