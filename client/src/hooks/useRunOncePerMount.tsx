// Third-party imports
import { useRef } from 'react'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Usage:
//
// 'use client'
//
//   import { Button } from '@/components'
//   import { useRunOncePerMount } from 'hooks'
//
//   export const Test = () => {
//     const runOncePerMount = useRunOncePerMount<string[], string>((value) => {
//       return value
//     })
//
//     return (
//       <Button
//         onClick={() => {
//           const value = runOncePerMount('The function ran!')
//           console.log('Return value:', value)
//         }}
//       >Click Me</Button>
//     )
//   }
//
// This hook is more of an experiment than something I'd likely us in production.
// This could also be called useFootGun() because it still allows the consumer
// to run the function multiple times, but after the first time it will return undefined.
//
///////////////////////////////////////////////////////////////////////////

export const useRunOncePerMount = <T extends unknown[], Return>(
  func: (...args: T) => Return
) => {
  const hasRunOnceRef = useRef(false)

  return (...args: T): Return | undefined => {
    if (hasRunOnceRef.current === true) {
      return
    }
    const value = func(...args)
    hasRunOnceRef.current = true
    return value
  }
}
