'use client'

import { ComponentProps, forwardRef } from 'react'
import { XIcon } from 'lucide-react'
import { cn } from '@/utils'

type CustomCloseButtonRef = HTMLButtonElement
type CustomCloseButtonProps = ComponentProps<'button'>

const focusMixin = `
focus:ring-[2px] focus:ring-primary/50 focus:outline-none
`

const baseClasses = `
appearance-none
inline-flex items-center justify-center absolute top-3 right-3 rounded-full cursor-pointer
text-primary
opacity-80 transition-opacity
hover:opacity-100
disabled:pointer-events-none
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6
${focusMixin}
`

/* ========================================================================
                                UserModal
======================================================================== */

export const CustomCloseButton = forwardRef<
  CustomCloseButtonRef,
  CustomCloseButtonProps
>(({ className, ...otherProps }, ref) => {
  return (
    <button
      aria-label='Close'
      ref={ref}
      className={cn(baseClasses, className)}
      {...otherProps}
    >
      <span className='sr-only'>Close</span>
      <XIcon />
    </button>
  )
})

CustomCloseButton.displayName = 'CustomCloseButton'
