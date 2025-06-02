'use client'

import { Spinner } from '@/components/Spinner'

/* ========================================================================
                                Spinner
======================================================================== */

export const SpinnerDemo = () => {
  return (
    <Spinner
      // className='border-[2px] text-blue-500'
      className='mx-auto block'
      size={50}
    />
  )
}
