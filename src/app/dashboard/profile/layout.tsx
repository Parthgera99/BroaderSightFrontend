import GlobalLoader from '@/components/GlobalLoader';
import React, { Suspense } from 'react'

export const metadata = {
    title: 'My Profile | BroaderSight Blogs'
  }

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
  return (
      <Suspense fallback={
      <GlobalLoader/>
    }>
        {children}
    </Suspense>
  )
}

export default layout


