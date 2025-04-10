import Footer from '@/components/Footer'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Broadersight Blogs',
  description: 'About our team - Created by Parth Gera',
}

function page() {
  return (
    <div className='bg-zinc-100 dark:bg-zinc-950'>
        <div className='py-48 text-center'>
          About Page
        </div>
        {/* Footer  */}
      <Footer/>
    </div>
  )
}

export default page