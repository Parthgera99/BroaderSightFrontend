import React from 'react'

export const metadata = {
    title: 'My Dashboard | BroaderSight Blogs'
  }

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
  return (
    <div>
        {children}
    </div>
  )
}

export default layout