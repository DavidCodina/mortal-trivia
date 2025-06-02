'use client'

import { Suspense } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { AlertCircle } from 'lucide-react'
import { Alert, Button } from '@/components'
import { DataContainerProps } from './types'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This component is intended to to wrap a child component that is passed
// a promise and implements use() internally. This component is client-side
// only because react-error-boundary is client-side only package. For
// server-side components that await data, handle the error internally by
// catching it in the component, or better yet in the data fetching function or action.
// And just like is done here, wrap that component in Suspense to stream it in.
//
// Admittedly, this is a very niche component, and I'm personally not a fan of relying
// on an ErrorBoundary to handle errors, but it's still a useful component to have.
//
///////////////////////////////////////////////////////////////////////////

export const DataContainer = ({
  children,
  errorMessage = 'Request Failed.',
  fallback,
  fallbackRender,
  FallbackComponent,
  onError,
  onReset,
  showOriginalError = false,
  suspenseFallback
}: DataContainerProps) => {
  /* ======================
         fallbackProp
  ====================== */
  // A single prop is created for the particular fallback
  // type that satisfies the discriminated union. When
  // no fallback type is specified, the default fallbackRender
  // is used.

  const fallbackProp = fallback
    ? { fallback }
    : fallbackRender
      ? { fallbackRender }
      : FallbackComponent
        ? { FallbackComponent }
        : {
            fallbackRender: (fallbackProps: FallbackProps) => {
              const { error, resetErrorBoundary } = fallbackProps
              const originalError = error instanceof Error ? error.message : ''
              const message =
                showOriginalError && originalError
                  ? originalError
                  : errorMessage
              return (
                <Alert
                  className='mx-auto mb-6 max-w-[600px]'
                  leftSection={<AlertCircle className='size-6' />}
                  rightSection={
                    <Button
                      className='min-w-[100px] self-center'
                      onClick={resetErrorBoundary}
                      size='sm'
                      variant='destructive'
                    >
                      Reset
                    </Button>
                  }
                  title='Error'
                  variant='destructive'
                >
                  {message}
                </Alert>
              )
            }
          }

  /* ======================
          return
  ====================== */

  return (
    <ErrorBoundary onError={onError} onReset={onReset} {...fallbackProp}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
