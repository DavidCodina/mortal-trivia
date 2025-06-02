'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { alertVariants } from './alertVariants'

import { AlertTitle } from './AlertTitle'
import { AlertDescription } from './AlertDescription'

type AlertProps = React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants> & {
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
    title?: React.ReactNode
  }

/* ========================================================================

======================================================================== */

export const Alert = ({
  children,
  className = '',
  leftSection = null,
  rightSection = null,
  style = {},
  title = '',
  variant,
  ...otherProps
}: AlertProps) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      className={cn(alertVariants({ variant }), className)}
      data-slot='alert'
      role='alert'
      style={style}
    >
      {leftSection}
      <div className='flex-1'>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </div>

      {rightSection}
    </div>
  )
}
