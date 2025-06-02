'use client'

import * as React from 'react'
import { CirclePlay, CirclePause } from 'lucide-react'
import { cn } from '@/utils'
import { useCarousel } from './CarouselContext'
import { useAutoplay } from './useAutoplay'
type CarouselPlayPauseProps = React.ComponentProps<'button'>

const baseClasses = `
text-white absolute top-2 left-2 cursor-pointer rounded-full 
outline-none focus-visible:ring-2 focus-visible:ring-white/50 
`

/* ========================================================================
                        
======================================================================== */

export const CarouselPlayPause = ({
  className = '',
  style = {},
  ...otherProps
}: CarouselPlayPauseProps) => {
  const { api } = useCarousel()
  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(api)

  /* ======================
            return
  ====================== */

  return (
    <button
      className={cn(baseClasses, className)}
      data-slot='carousel-play-pause'
      onClick={toggleAutoplay}
      style={style}
      type='button'
      {...otherProps}
    >
      {autoplayIsPlaying ? (
        <>
          <CirclePause className='pointer-events-none' />
          <span className='sr-only'>Pause</span>
        </>
      ) : (
        <>
          <CirclePlay className='pointer-events-none' />
          <span className='sr-only'>Play</span>
        </>
      )}
    </button>
  )
}
