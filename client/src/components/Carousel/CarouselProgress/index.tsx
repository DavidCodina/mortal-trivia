'use client'

import './CarouselProgress.css'
import * as React from 'react'
import { cn } from '@/utils'
import { useCarousel } from '../CarouselContext'
import { useAutoplayProgress } from './useAutoplayProgress'

type CarouselProgressProps = React.ComponentProps<'div'> & {
  innerClassName?: string
  innerStyle?: React.CSSProperties
}

/* ========================================================================
                        
======================================================================== */

export const CarouselProgress = ({
  className = '',
  style = {},
  innerClassName = '',
  innerStyle = {},
  ...otherProps
}: CarouselProgressProps) => {
  const { api } = useCarousel()
  const progressNode = React.useRef<HTMLDivElement>(null)
  const { showAutoplayProgress } = useAutoplayProgress(api, progressNode)

  /* ======================
            return
  ====================== */

  return (
    <div
      className={cn(
        'absolute top-2 left-1/2 h-1 w-[150px] max-w-9/10 -translate-1/2 overflow-hidden rounded-full transition-opacity',
        !showAutoplayProgress && 'opacity-0',
        className
      )}
      data-slot='carousel-progress'
      style={style}
      {...otherProps}
    >
      <div
        className={cn(
          'embla-progress-bar absolute top-0 bottom-0 -left-full w-full bg-white',
          !showAutoplayProgress && '[animation-play-state:paused]',
          innerClassName
        )}
        ref={progressNode}
        style={innerStyle}
      />
    </div>
  )
}
