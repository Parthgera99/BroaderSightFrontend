import Footer from '@/components/Footer'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Contact Us | Broadersight Blogs',
    description: 'About our team - Created by Parth Gera',
  }

function page() {
  return (
    <div className='bg-zinc-100 dark:bg-zinc-950'>
        <div className='py-48 text-center'>
          Contact Us Page
        </div>
        {/* Footer  */}
      <Footer/>
    </div>
  )
}

export default page