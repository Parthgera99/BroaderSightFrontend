import React from 'react'

async function page({ params }: { params: { username: string } }) {
    const { username } =  await params;
  return (

    <div>
        {username}
    </div>
  )
}

export default page