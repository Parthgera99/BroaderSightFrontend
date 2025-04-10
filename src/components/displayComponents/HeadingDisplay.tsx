import React from 'react'

function HeadingDisplay({ value }: { value: string }) {
  return (
    <h3 className='text-2xl dark:text-purple-200 text-zinc-700 font-montserrat font-bold'>
        {value}
    </h3>
  )
}

export default HeadingDisplay