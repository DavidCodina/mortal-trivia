'use client'

import * as React from 'react'
import { /* ArrowRight, */ ArrowRightCircle } from 'lucide-react'
import { cn } from '@/utils'
import { useCarousel } from './CarouselContext'

type CarouselNextProps = React.ComponentProps<'button'> & {
  size?: number
}

const baseClasses = `
absolute items-center justify-center text-white rounded-full cursor-pointer
outline-none focus-visible:ring-2 focus-visible:ring-white/50 
`

/* ========================================================================
                        
======================================================================== */

export const CarouselNext = ({
  className = '',
  size = 24,
  style = {},
  ...props
}: CarouselNextProps) => {
  const { orientation, next, canScrollNext } = useCarousel()

  /* ======================
            return
    ====================== */

  return (
    <button
      className={cn(
        baseClasses,
        orientation === 'horizontal'
          ? 'top-1/2 right-2 -translate-y-1/2'
          : 'bottom-2 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      data-slot='carousel-next'
      disabled={!canScrollNext}
      onClick={next}
      style={style}
      type='button'
      {...props}
    >
      <ArrowRightCircle style={{ width: size, height: size }} />
      <span className='sr-only'>Next slide</span>
    </button>
  )
}
