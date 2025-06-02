'use client'

import * as React from 'react'
// import { CustomIndicator } from './CustomIndicator'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  CarouselPlayPause,
  CarouselProgress
} from '@/components/Carousel'

const items = [
  { id: '1', bg: 'bg-rose-500' },
  { id: '2', bg: 'bg-orange-500' },
  { id: '3', bg: 'bg-yellow-500' },
  { id: '4', bg: 'bg-lime-500' },
  { id: '5', bg: 'bg-sky-500' },
  { id: '6', bg: 'bg-purple-500' }
]

/* ========================================================================
                        
======================================================================== */

export function CarouselDemo() {
  const carouselRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (carouselRef.current) {
      console.log('carouselRef.current:', carouselRef.current)
    } else {
      console.log('carouselRef.current is null')
    }
  }, [])

  return (
    <Carousel
      // 'overflow-hidden isn't a good idea because it will prevent controls and/or indicators
      // from showing if they are outside of the container.
      className='mx-auto shadow-lg'
      // https://www.embla-carousel.com/api/options/#duration
      // Note: Duration is not in milliseconds because Embla uses an attraction physics simulation when
      // scrolling instead of easings. Only values between 20-60 are recommended.
      options={{
        // duration: 20,
        // https://www.embla-carousel.com/api/options/#loop
        loop: true,
        startIndex: 0
      }}
      playOnInit
      autoplayDelay={3000}
      ref={carouselRef}
      style={{ maxWidth: 600 }}
    >
      <CarouselContent
        style={{ border: '1px solid black', borderRadius: 25 }}
        className='aspect-[2/1]'
      >
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div
              className={`flex h-full items-center justify-center ${item.bg}`}
            >
              <span className='text-6xl font-black text-white'>{item.id}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPlayPause />

      <CarouselPrevious />

      <CarouselNext />

      <CarouselIndicators

      // customIndicator accepts a function that exposes key, isSelected, and onClick.
      // Those args can then be passed to CustomIndicator as follows:
      // customIndicator={(key, isSelected, onClick) => {
      //   return (
      //     <CustomIndicator
      //       key={key}
      //       isSelected={isSelected}
      //       onClick={onClick}
      //     />
      //   )
      // }}

      // className='translate-y-full'
      // ⚠️ The indicatorClassName also accepts a function the receives the isSelected arg.
      // indicatorClassName={(isSelected) => {
      //   return `
      // h-4 w-4 rounded-full border border-black opacity-100
      // ${isSelected ? 'bg-green-500' : 'bg-white '}
      // `
      // }}

      // Very similar to className/indicatorClassName, but using style/indicatorStyle props.
      // style={{ transform: 'translateY(100%)' }}
      // ⚠️ The indicatorStyle also accepts a function the receives the isSelected arg.
      // indicatorStyle={(isSelected) => {
      //   return {
      //     backgroundColor: isSelected ? '#50BFE6' : '#fff',
      //     border: '1px solid black',
      //     borderRadius: '50%',
      //     opacity: 1,
      //     height: '1rem',
      //     width: '1rem'
      //   }
      // }}
      />

      <CarouselProgress />
    </Carousel>
  )
}
