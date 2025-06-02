'use client'

import { ComponentProps } from 'react'

import { cn } from '@/utils'

type ContainerProps = ComponentProps<'div'>

/* ========================================================================
                              PageContainer
======================================================================== */

export const PageContainer = ({
  children,
  className,
  style,
  ...otherProps
}: ContainerProps) => {
  return (
    <div
      // Pass `overflow-hidden` when consuming to prevent oveflow scroll.
      className={cn(
        `relative mx-auto w-full flex-1 overflow-x-auto p-6 2xl:container`,
        className
      )}
      data-slot='page-container'
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  )
}
