import { ComponentProps, ErrorInfo, PropsWithChildren, Suspense } from 'react'

import {
  ErrorBoundaryPropsWithComponent,
  ErrorBoundaryPropsWithRender,
  ErrorBoundaryPropsWithFallback
  // FallbackProps,
  // ErrorBoundaryProps
} from 'react-error-boundary'

/* ========================================================================

======================================================================== */

type ErrorBoundarySharedProps = PropsWithChildren<{
  onError?: (error: Error, info: ErrorInfo) => void
  onReset?: (
    details:
      | {
          reason: 'imperative-api'
          args: any[]
        }
      | {
          reason: 'keys'
          prev: any[] | undefined
          next: any[] | undefined
        }
  ) => void
  resetKeys?: any[]
}>

// ⚠️ ReactErrorBoundary doesn't expose ErrorBoundarySharedProps.
// In order to get the DataContainer to use the discriminated union from ErrorBoundary,
// but ALSO allow for the internal default fallbackRender (i.e., no choice as an option),
// we need to recreate ErrorBoundaryProps here (based off "react-error-boundary": "^5.0.0"),
// but with ErrorBoundaryPropsWithDefaultRender as a fourth option in the discriminated union.
export type ErrorBoundaryPropsWithDefaultRender = ErrorBoundarySharedProps & {
  fallback?: never
  FallbackComponent?: never
  fallbackRender?: never
}

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender
  | ErrorBoundaryPropsWithDefaultRender

/* ========================================================================

======================================================================== */

export type DataContainerProps = ErrorBoundaryProps & {
  errorMessage?: string
  showOriginalError?: boolean
  // Previously, this was optional and there was a default suspenseFallback
  // baked into the DataContainer. However, The UI (i.e., skeleton/placeholder)
  // for the suspenseFallback should always be custom to prevent cumulative layout shift.
  suspenseFallback: ComponentProps<typeof Suspense>['fallback']
}
