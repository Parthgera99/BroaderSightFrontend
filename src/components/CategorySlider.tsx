"use client"
import React from 'react'

function CategorySlider() {
    const handleClick = (category : any) =>{
        console.log(category)
      }

  return (
    <>
    <div className="wrapper mb-8">
        <button onClick={()=>{handleClick("technology")}} className="item item1 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Education</button>
        <button onClick={()=>{handleClick("technology")}} className="item item2 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Business</button>
        <button onClick={()=>{handleClick("technology")}} className=" item item3 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Technology</button>
        <button onClick={()=>{handleClick("cars")}} className=" item item4 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Cars</button>
        <button onClick={()=>{handleClick("CryptoCurrency")}} className=" item item5 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">CryptoCurrency</button>
        <button onClick={()=>{handleClick("Health")}} className=" item item6 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Health</button>
        <button onClick={()=>{handleClick("Finance")}} className="item item7 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Finance</button>
        <button onClick={()=>{handleClick("Politics")}} className=" item item8 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Politics</button>
      </div>
    <div className="wrapper mb-32">
        <button onClick={()=>{handleClick("technology")}} className="rightItem item1 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Education</button>
        <button onClick={()=>{handleClick("technology")}} className="rightItem item2 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Business</button>
        <button onClick={()=>{handleClick("technology")}} className=" rightItem item3 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Technology</button>
        <button onClick={()=>{handleClick("cars")}} className=" rightItem item4 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Cars</button>
        <button onClick={()=>{handleClick("CryptoCurrency")}} className=" rightItem item5 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">CryptoCurrency</button>
        <button onClick={()=>{handleClick("Health")}} className=" rightItem item6 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Health</button>
        <button onClick={()=>{handleClick("Finance")}} className="rightItem item7 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Finance</button>
        <button onClick={()=>{handleClick("Politics")}} className=" rightItem item8 dark:bg-zinc-700 py-2 dark:text-zinc-50 text-center rounded-full">Politics</button>
      </div>
    </>
  )
}

export default CategorySlider