import React from 'react'

function ParagraphDisplay({ value }: { value: string }) {
  return (
    <div
    className="text-[15px] prose dark:prose-invert para-html dark:text-zinc-100 text-zinc-700 font-normal font-montserrat leading-relaxed my-2 pr-4 max-lg:pr-0"
    dangerouslySetInnerHTML={{ __html: value }}
  />
  )
}

export default ParagraphDisplay