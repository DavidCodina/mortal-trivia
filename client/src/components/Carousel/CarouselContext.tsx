'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselApi, CarouselOptions, CarouselPlugin } from './types'

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  prev: () => void
  next: () => void
  scrollTo: (index: number) => void
  selectedIndex: number
  scrollSnaps: number[]
  canScrollPrev: boolean
  canScrollNext: boolean
  options?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

/* ========================================================================

======================================================================== */

export const CarouselContext = React.createContext<CarouselContextProps | null>(
  null
)

export const useCarousel = () => {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}
