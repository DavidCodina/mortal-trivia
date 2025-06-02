'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/utils'
import { CarouselContext } from './CarouselContext'
import { CarouselApi, CarouselOptions, CarouselPlugin } from './types'
import { useAutoplay } from './useAutoplay'

export type CarouselProps = React.ComponentProps<'div'> & {
  options?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  /** Used to expose api to the consumer. */
  setApi?: (api: CarouselApi) => void
  playOnInit?: boolean
  autoplayDelay?: number
}

/* ========================================================================
                        
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// - It would be nice to have a customNext and customPrevious prop that for CarouselPrevious,
//   and CarouselNext, respectively. I've skipped that for now.
//
// - There's also a way to make Embla Carousel have a gallery.
//
///////////////////////////////////////////////////////////////////////////

export const Carousel = ({
  orientation = 'horizontal',
  options = {},
  setApi,
  plugins = [],
  style = {},
  className = '',
  children,
  playOnInit = false,
  autoplayDelay = 4000,
  ...props
}: CarouselProps) => {
  /* ======================
            state
  ====================== */

  if (!options.duration) {
    options.duration = 20
  }

  // https://www.embla-carousel.com/get-started/react/#accessing-the-carousel-api
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...options,
      axis: orientation === 'horizontal' ? 'x' : 'y'
    },
    [
      ...plugins,
      // https://www.embla-carousel.com/plugins/autoplay/
      // https://www.embla-carousel.com/get-started/react/#adding-plugins
      // https://www.embla-carousel.com/examples/predefined/#autoplay
      Autoplay({
        playOnInit: playOnInit,
        delay: autoplayDelay
      })
    ]
  )

  const { resetAutoplayOnClick } = useAutoplay(api)

  // Passed into CarouselContext.Provider then consumed by CarouselPrevious: disabled={!canScrollPrev}
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  // Passed into CarouselContext.Provider then consumed by CarouselNext: disabled={!canScrollNext}
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  // In the examples, I've seen thus far, api?.scrollSnapList() can be used to
  // deduce how many slides there are, which can then be used to map out the indicators.
  // scrollSnaps is passed into the CarouselContext.Provider then consumed by the
  // CarouselIndicators component.
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  // Set selectedIndex is initialized with an index of 0.
  // It is upadated programmatically within onSelect's
  // setSelectedIndex(api.selectedScrollSnap()).
  // selectedIndex state is passed into the CarouselContext.Provider
  // then consumed by the CarouselIndicators component.

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  /* ======================
        onSelect()
  ====================== */
  // Consumed in useEffect() below when api (i.e., useEmblaCarousel api) changes.
  // In particular, it sets canScrollPrev and canScrollNext state.

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    // Set selectedIndex to be consumed by Indicator component.
    // https://www.embla-carousel.com/api/methods/#selectedscrollsnap
    // Get the index of the selected snap point.
    setSelectedIndex(api.selectedScrollSnap())

    // https://www.embla-carousel.com/api/methods/#canscrollprev
    // Check the possiblity to scroll to a previous snap point.
    // If loop is enabled and the container holds any slides, this will always return true.
    setCanScrollPrev(api.canScrollPrev())

    // Check the possiblity to scroll to a next snap point. If loop is enabled and the
    // container holds any slides, this will always return true.
    setCanScrollNext(api.canScrollNext())
  }, [])

  /* ======================
          prev()
  ====================== */
  // Used in handleKeyDown()
  // Also passed into the CarouselContext.Provider then consumed by CarouselPrevious.

  const prev = React.useCallback(() => {
    // https://www.embla-carousel.com/api/methods/#scrollprev
    // Scroll to the previous snap point if possible. When loop is disabled and the carousel
    // has reached the first snap point, this method won't do anything. Set the jump
    // parameter to true when you want to go to the previous slide instantly.

    // Initially, did this: api?.scrollPrev(), but wrapping it in resetAutoplayOnClick()
    // now resets the autoPlay then fires api?.scrollPrev() as a callback.
    // ❌ api?.scrollPrev()
    resetAutoplayOnClick(api?.scrollPrev)
  }, [api, resetAutoplayOnClick])

  /* ======================
          next()
  ====================== */
  // Used in handleKeyDown()
  // Also passed into the CarouselContext.Provider  then consumed by CarouselNext.

  const next = React.useCallback(() => {
    // https://www.embla-carousel.com/api/methods/#scrollnext
    // Scroll to the next snap point if possible. When loop is disabled and the carousel
    // has reached the last snap point, this method won't do anything. Set the jump parameter
    // to true when you want to go to the next slide instantly.
    // ❌ api?.scrollNext()
    resetAutoplayOnClick(api?.scrollNext)
  }, [api, resetAutoplayOnClick])

  /* ======================
          scrollTo()
  ====================== */
  // scrollTo() is defined here, passed into CarouselContext.Provider then
  // consumed by the CarouselIndicators component.

  // https://codesandbox.io/p/sandbox/embla-carousel-arrows-dots-react-z5fbs?file=%2Fsrc%2Fjs%2FEmblaCarousel.js%3A16%2C3-18%2C6
  const scrollTo = React.useCallback(
    (index: number) => {
      // https://www.embla-carousel.com/api/methods/#scrollto
      // Scroll to a snap point by its unique index. If loop is enabled, Embla Carousel will
      // choose the closest way to the target snap point. Set the jump parameter to true when
      // you want to go to the desired slide instantly.
      // ❌ api?.scrollTo(index)

      resetAutoplayOnClick(() => api?.scrollTo(index))
    },
    [api, resetAutoplayOnClick]
  )

  /* ======================
        handleKeyDown()
  ====================== */

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      }
    },
    [next, prev]
  )

  /* ======================
        useEffect()
  ====================== */
  // The optional setApi() prop exposes the internal api to the consumer.
  // Then the consumer could programmatically control or access carousel state
  // from the outside.

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }
    setApi(api)
  }, [api, setApi])

  /* ======================
          useEffect()
  ====================== */

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    // Presumably api.on() automatically passes an instance of api as an arg (???).
    // https://www.embla-carousel.com/api/methods/#on
    // Subscribe to an Embla specific event with a callback. Added event listeners will
    // persist even if reInit is called, either until the carousel is destroyed or the
    // event is removed with the off method.
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      // https://www.embla-carousel.com/api/methods/#off
      // Unsubscribe from an Embla specific event. Make sure to pass the same callback
      // reference when the callback was added with the on method.
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  /* ======================
         useEffect() 
  ====================== */
  // This useEffect() sets the scrollSnaps state, which is used to
  // determine how many slides there are when mapping out the
  // associated indicator.

  React.useEffect(() => {
    if (!api) {
      return
    }

    // console.log('Setting scrollSnaps to:', api?.scrollSnapList())
    // https://www.embla-carousel.com/api/methods/#scrollsnaplist
    // Get an array containing all the snap point positions. Each position represents
    // how far the carousel needs to progress in order to reach this position.
    setScrollSnaps(api?.scrollSnapList())
  }, [setScrollSnaps, api])

  /* ======================
            return
  ====================== */

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        options,
        orientation:
          orientation || (options?.axis === 'y' ? 'vertical' : 'horizontal'),
        prev,
        next,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps
        // plugins: [] // Optional: https://www.embla-carousel.com/plugins/
        // setApi: (_api) => {} // optional
      }}
    >
      <div
        aria-roledescription='carousel'
        className={cn('relative', className)}
        data-slot='carousel'
        onKeyDownCapture={handleKeyDown}
        role='region'
        style={style}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}
