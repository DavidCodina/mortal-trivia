import * as React from 'react'
import { cn } from '@/utils'

type FormErrorProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children?: string
  disabled?: boolean
  error?: string
  touched?: boolean
}

const baseClasses = `hidden mt-1 text-sm text-destructive`

/* ========================================================================

======================================================================== */

export const FormError = ({
  children,
  className = '',
  disabled = false,
  touched,
  ...otherProps
}: FormErrorProps) => {
  // Technically, FormError is a FormFeedback component.
  // Thus, if we wanted we could use touched to show a success message
  // when !error && touched. However, that feature has been omitted for now.
  void touched

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
          hidden: disabled
        }
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}
