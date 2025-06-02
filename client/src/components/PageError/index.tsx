'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button, Page, PageContainer, Title } from '@/components'

/* ========================================================================
                                PageError
======================================================================== */
// This component is intended to be used as the standard return for error.tsx files.

export const PageError = ({
  error,
  reset,
  message = 'Whoops! Something went wrong...'
}: {
  error: Error
  reset: () => void
  message?: string
}) => {
  const router = useRouter()
  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('\n\nWhoops!', error)
  }, [error])

  /* ======================
          return
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // notFound() may be executed in a server component.
  // However, it can potentially conflict with an error.tsx file.
  // This has to do with how the component hierarchy renders:
  // https://beta.nextjs.org/docs/routing/fundamentals#component-hierarchy
  //
  // The general solution for this is to only create a not-found.tsx
  // and error.tsx at the app-level. However, that's not always practical
  // if we want to have customized/nested error/not-found UI.
  // Thus, if 'NEXT_NOT_FOUND' runs into an error boundary before the
  // logic for rendering the associated not-found.tsx occurs, we can
  // do this:
  //
  ///////////////////////////////////////////////////////////////////////////

  if (error?.message === 'NEXT_NOT_FOUND') {
    notFound()
  }

  return (
    <Page>
      <PageContainer>
        <Title
          as='h2'
          className='text-5xl leading-[1.25] text-balance'
          style={{
            marginBottom: 50,
            textAlign: 'center'
          }}
          color='var(--color-destructive)'
        >
          {message}
        </Title>

        <div className='flex justify-center gap-2'>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            style={{ minWidth: 100 }}
            variant='destructive'
          >
            Go Back
          </Button>

          <Button
            onClick={() => {
              router.replace('/')
            }}
            style={{ minWidth: 100 }}
            variant='destructive'
          >
            Go Home
          </Button>
        </div>
      </PageContainer>
    </Page>
  )
}

/* ======================
    PageErrorTest
====================== */

export const PageErrorTest = () => {
  const [items, setItems] = useState<any>([])

  return (
    <>
      <Button
        onClick={() => {
          setItems(undefined)
        }}
        className='btn-red btn-sm mx-auto block'
        style={{ cursor: 'pointer', margin: '0 auto' }}
      >
        Break The Page!
      </Button>
      {items.map(() => null)}
    </>
  )
}
