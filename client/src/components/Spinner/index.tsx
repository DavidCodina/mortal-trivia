'use client'

import { CSSProperties } from 'react'
import { cn } from '@/utils'

type SpinneProps = {
  className?: string
  size?: string | number
  style?: CSSProperties
}

// The color of Spinner is relative to the current color.
// This is written into spinnerPlugin.ts. However, here
// we're defaulting to the primary color.
const baseClasses = `text-primary spinner-border`

/* ========================================================================
                                Spinner
======================================================================== */
// See spinnerPlugin.ts for styles.

export const Spinner = ({
  className = '',
  size = 50,
  style = {}
}: SpinneProps) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      className={cn(baseClasses, className)}
      role='status'
      style={{ width: size, height: size, ...style }}
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
