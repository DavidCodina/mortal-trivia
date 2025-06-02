'use client'

import * as React from 'react'
import { /* ArrowLeft, */ ArrowLeftCircle } from 'lucide-react'
import { cn } from '@/utils'
import { useCarousel } from './CarouselContext'

type CarouselPreviousProps = React.ComponentProps<'button'> & {
  size?: number
}

const baseClasses = `
absolute items-center justify-center text-white rounded-full cursor-pointer
outline-none focus-visible:ring-2 focus-visible:ring-white/50 
`

/* ========================================================================
                        
======================================================================== */

export const CarouselPrevious = ({
  className = '',
  size = 24,
  style = {},
  ...props
}: CarouselPreviousProps) => {
  const { orientation, prev, canScrollPrev } = useCarousel()

  /* ======================
          return
  ====================== */

  return (
    <button
      className={cn(
        baseClasses,
        orientation === 'horizontal'
          ? 'top-1/2 left-2 -translate-y-1/2'
          : 'top-2 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      data-slot='carousel-previous'
      disabled={!canScrollPrev}
      onClick={prev}
      style={style}
      type='button'
      {...props}
    >
      <ArrowLeftCircle style={{ width: size, height: size }} />
      <span className='sr-only'>Previous slide</span>
    </button>
  )
}
