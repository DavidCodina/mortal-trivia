'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators
} from '../'

import { CustomIndicator } from './CustomIndicator'

const items = [
  { id: '1', bg: 'bg-red-500' },
  { id: '2', bg: 'bg-orange-500' },
  { id: '3', bg: 'bg-yellow-500' },
  { id: '4', bg: 'bg-green-500' },
  { id: '5', bg: 'bg-blue-500' },
  { id: '6', bg: 'bg-purple-500' }
]

/* ========================================================================
                        
======================================================================== */

export const CarouselVerticalDemo = () => {
  return (
    <Carousel
      // https://www.embla-carousel.com/api/options/#duration
      // Note: Duration is not in milliseconds because Embla uses an attraction physics simulation when
      // scrolling instead of easings. Only values between 20-60 are recommended.

      options={{
        // align: 'start' was inherited from the original ShadCDN implementation.
        // However, omitting it doesn't seem to have any noticeable effect.
        align: 'start',
        duration: 45,
        loop: true
        // startIndex: 0
      }}
      orientation='vertical'
      // If controllers and/or indicators are external to the Carousel then
      // we need to add enough vertical margins to account for them (e.g., my-16).
      className='mx-auto mb-8 w-full shadow-lg'
      style={{ maxWidth: 600 }}
    >
      <CarouselContent
        // Unlike in the horizontal version, we can't just set aspect-[2/1]
        // Instead, we seem to need to set a fixed height. That said, there
        // may be ways to get around this by using aspect ratios and flex containers (???).
        className='h-[300px]'
        style={{ border: '1px solid black', borderRadius: 25 }}
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
      <CarouselPrevious />
      <CarouselNext />

      <CarouselIndicators
        // customIndicator accepts a function that exposes key, isSelected, and onClick.
        // Those args can then be passed to CustomIndicator as follows:
        customIndicator={(key, isSelected, onClick) => {
          return (
            <CustomIndicator
              key={key}
              isSelected={isSelected}
              onClick={onClick}
            />
          )
        }}
        // Custom styles to align the CarouselIndicators container vertically to the left.
        className='h-full w-auto flex-col'
      />
    </Carousel>
  )
}
