// https://www.embla-carousel.com/api/methods/#typescript
// https://www.embla-carousel.com/api/options/#typescript
// https://www.embla-carousel.com/api/events/#typescript

import useEmblaCarousel, {
  type UseEmblaCarouselType
} from 'embla-carousel-react'

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

export type CarouselApi = UseEmblaCarouselType[1]

// https://www.embla-carousel.com/api/options/
export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]
