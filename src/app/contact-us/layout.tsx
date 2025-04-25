import GlobalLoader from '@/components/GlobalLoader'
import { Loader2Icon } from 'lucide-react'
import React, { Suspense } from 'react'

function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (

    <Suspense fallback={
      <GlobalLoader/>
    }>
    <div>
        {children}
    </div>
    </Suspense>
  )
}

export default layout