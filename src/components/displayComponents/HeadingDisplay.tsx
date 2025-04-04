import React from 'react'

function HeadingDisplay({ value }: { value: string }) {
  return (
    <div className='text-2xl dark:text-purple-200 text-zinc-700 font-montserrat font-bold'>
        {value}
    </div>
  )
}

export default HeadingDisplay