'use client'

import { Page, Spinner } from '@/components'

/* ========================================================================
                            PageSpinner
======================================================================== */
// This component is intended to be used as the standard return for loading.tsx files.

export const PageSpinner = () => {
  return (
    <Page className='items-center justify-center'>
      <Spinner size='50px' style={{ borderWidth: 5 }} />
    </Page>
  )
}
