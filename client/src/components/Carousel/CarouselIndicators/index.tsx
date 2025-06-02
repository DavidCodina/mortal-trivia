'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useCarousel } from '../CarouselContext'
import { CarouselIndicator } from './CarouselIndicator'

type CarouselIndicatorsProps = React.ComponentProps<'div'> & {
  indicatorClassName?: string | ((isSelected: boolean) => string)
  indicatorStyle?:
    | React.CSSProperties
    | ((isSelected: boolean) => React.CSSProperties)
  customIndicator?: (
    key: number,
    isSelected: boolean,
    onClick: () => void
  ) => React.JSX.Element
}

const baseClasses = `
flex w-full flex-wrap items-center justify-center absolute bottom-0 left-0  gap-2 p-2
`

/* ========================================================================
                            CarouselIndicators               
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// ShadCDN does not implement optional indicators. This feature was added using a modified version of this example:
// https://codesandbox.io/p/sandbox/embla-carousel-arrows-dots-react-z5fbs?file=%2Fsrc%2Fjs%2FEmblaCarousel.js%3A11%2C3-11%2C57
//
// See also: https://www.embla-carousel.com/examples/predefined/
//
///////////////////////////////////////////////////////////////////////////

export const CarouselIndicators = ({
  className = '',
  customIndicator,
  indicatorClassName = '',
  indicatorStyle = {},
  style = {},
  ...props
}: CarouselIndicatorsProps) => {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()

  /* ======================
            return
  ====================== */

  return (
    <div
      className={cn(baseClasses, className)}
      data-slot='carousel-indicators'
      style={style}
      {...props}
    >
      {scrollSnaps.map((_, index) => {
        const key = index
        const isSelected = index === selectedIndex
        const onClick = () => scrollTo(index)

        if (typeof customIndicator === 'function') {
          return customIndicator(key, isSelected, onClick)
        }

        return (
          <CarouselIndicator
            key={key}
            className={indicatorClassName}
            isSelected={isSelected}
            onClick={onClick}
            style={indicatorStyle}
          />
        )
      })}
    </div>
  )
}
