import { Loader2Icon } from 'lucide-react'
import React from 'react'

function GlobalLoader() {
  return (
    <div className='fixed top-1/2 left-1/2'>
        <Loader2Icon className='animate-spin'/>
    </div>
  )
}

export default GlobalLoader