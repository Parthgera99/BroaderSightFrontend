import { LockKeyholeIcon } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div className='flex gap-2 max-sm:flex-col justify-center items-center text-center max-sm:text-2xl text-3xl mt-48 max-sm:mt-24 font-montserrat font-bold'>
      This Page is Locked Currently.
      <LockKeyholeIcon className='inline-block ml-2 w-6 h-6'/>
    </div>
  )
}

export default page