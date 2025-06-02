'use client'

import * as React from 'react'
import { useCarousel } from './CarouselContext'
import { cn } from '@/utils'

type CarouselContentProps = React.ComponentProps<'div'> & {
  innerClassName?: string
  innerStyle?: React.CSSProperties
}

/* ========================================================================
                        
======================================================================== */
// The original ShadCDN version put className on the inner <div>.
// However, this made it difficult to apply a borderRadius correctly without
// edge bleed. This version puts className on the outer <div> and exposes
// an innerClassName and innerStyle.

export const CarouselContent = ({
  children,
  className = '',
  innerClassName = '',
  innerStyle = {},
  style = {},
  ...props
}: CarouselContentProps) => {
  const { carouselRef, orientation } = useCarousel()

  /* ======================
            return 
    ====================== */

  return (
    <div
      className={cn('overflow-hidden', className)}
      data-slot='carousel-content'
      ref={carouselRef}
      style={style}
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'h-full' : 'h-full flex-col',
          innerClassName
        )}
        style={innerStyle}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
