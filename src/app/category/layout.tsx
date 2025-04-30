import GlobalLoader from '@/components/GlobalLoader'
import React, { Suspense } from 'react'

function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    
      <div>{children}</div>
  )
}

export default layout