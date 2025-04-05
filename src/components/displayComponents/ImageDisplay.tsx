import Image from 'next/image'
import React from 'react'

function ImageDisplay({ value }: { value: string }) {
  return (
    <div className="flex justify-center my-8">
      {value!=="" &&
        <Image
            src={value}
            alt="Blog image"
            className="rounded-2xl"
            width={800} // or a reasonably large default width
            height={0} // let height auto-adjust based on width
            style={{
            height: "auto",
            maxHeight: "400px",
            width: "auto",
            }}
            priority
        />
      }
    </div>
  )
}

export default ImageDisplay