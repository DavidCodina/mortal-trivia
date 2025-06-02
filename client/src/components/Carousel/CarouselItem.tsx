'use client'

import * as React from 'react'
import { cn } from '@/utils'
// import { useCarousel } from './CarouselContext'

type CarouselItemProps = React.ComponentProps<'div'>
/* ========================================================================
                        
======================================================================== */

export const CarouselItem = ({ className, ...props }: CarouselItemProps) => {
  // const { orientation } = useCarousel()

  return (
    <div
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        // https://www.embla-carousel.com/guides/slide-gaps/
        // ShadCDN adds this slide gap. I am very much against it.
        // If we really want a slide gap, when can add it back in from the consuming code.
        // orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      data-slot='carousel-item'
      role='group'
      {...props}
    />
  )
}
