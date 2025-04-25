import GlobalLoader from '@/components/GlobalLoader'
import React, { Suspense } from 'react'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <Suspense fallback={
      <GlobalLoader/>
    }>

      <div>{children}</div>
    </Suspense>
  )
}

export default layout