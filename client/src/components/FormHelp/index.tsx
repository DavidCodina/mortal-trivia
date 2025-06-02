import * as React from 'react'
import { cn } from '@/utils'

type FormHelpProps = React.ComponentProps<'div'> & {
  disabled?: boolean
}

const baseClasses = `hidden mt-1 text-sm text-muted-foreground`

/* ========================================================================

======================================================================== */

export const FormHelp = ({
  children,
  className = '',
  disabled = false,
  ...otherProps
}: FormHelpProps) => {
  return (
    <div
      className={cn(
        baseClasses,
        {
          block: !!children
        },
        className,
        {
          // Intentionally placed after className to always have precedence.
          'text-muted-foreground pointer-events-none opacity-65': disabled
        }
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}
