'use client' // Error components must be Client components

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Button,
  buttonVariants,
  Page,
  PageContainer,
  Title
} from '@/components'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

/* ========================================================================
                                Global Error
======================================================================== */
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-global-errors
// Uncommon: Handle uncaught errors in the root layout with global-error.js.

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error from global-error.tsx:', error)
  }, [error])

  /* ======================
          return 
  ====================== */

  return (
    // global-error must include html and body tags. Why? Because they sit above and
    // outside of the the root layout.
    // Gotcha: Initially, I tried using the PageError component as a child of <body>.
    // However, that component implements useRouter from next/navigation, which causes
    // another error: 'Uncaught Error: invariant expected app router to be mounted'
    // However, we can use <Link> instead.

    <html lang='en' className=''>
      <body
        className={`flex w-full flex-1 flex-col`}
        style={{
          minHeight: '100vh',
          width: '100%'
        }}
      >
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
              A Global Error Occurred!
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

              <Link
                className={buttonVariants({ variant: 'destructive' })}
                href='/'
                style={{ minWidth: 100 }}
              >
                Go Home
              </Link>
            </div>
          </PageContainer>
        </Page>
      </body>
    </html>
  )
}
