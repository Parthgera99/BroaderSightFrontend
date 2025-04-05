import React from 'react'

function ListDisplay({ value }: { value: { items: string[] } }) {
  return (
    <ul className="list-disc pl-6 my-3">
      {value.items.length > 0 &&
        value.items.map((item, index) => (
            <li key={index} className='text-base my-2 font-montserrat dark:text-zinc-100 text-zinc-700' >{item}</li>
        ))
      }
  </ul>
  )
}

export default ListDisplay