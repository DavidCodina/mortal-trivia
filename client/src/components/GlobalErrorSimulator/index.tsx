'use client'
import { useState } from 'react'
import { Button } from '@/components'

interface ErrorContainerProps {
  children: React.ReactNode
}

/* ========================================================================
      
======================================================================== */
// This component is used ONLY in development in order to test the global-error.tsx.
// Codevolution: https://www.youtube.com/watch?v=ywUDMEVR3Mg
// Usage in layout.tsx: <GlobalErrorSimulator>{children}</GlobalErrorSimulator>
// Note: The global-error.tsx will only work in production mode (npm run build + npm run start).

export const GlobalErrorSimulator = ({ children }: ErrorContainerProps) => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('ErrorButton threw an error!')
  }

  return (
    <>
      {children}

      <Button
        className='rounded-none border-x-0 border-b-0 font-bold active:scale-100'
        onClick={() => {
          setShouldThrow(true)
        }}
        size='xl'
        variant='destructive'
      >
        Throw GlobalError
      </Button>
    </>
  )
}
