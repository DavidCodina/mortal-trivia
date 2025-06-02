'use client' // Error components must be Client components
import { PageError } from 'components'

interface IError {
  error: Error
  reset: () => void
}

/* ========================================================================
                                Error
======================================================================== */
// https://nextjs.org/docs/app/building-your-application/routing/error-handling

export default function Error(props: IError) {
  const { error, reset } = props

  /* ======================
          return 
  ====================== */

  return (
    <PageError
      error={error}
      reset={reset}
      message='An error occurred at the app level!'
    />
  )
}
