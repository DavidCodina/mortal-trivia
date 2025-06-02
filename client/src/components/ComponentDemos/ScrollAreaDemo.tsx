'use client'

import { ScrollArea } from '@/components/ScrollArea'

/* ========================================================================

======================================================================== */

export const ScrollAreaDemo = () => {
  // Adding p-4 on the ScrollArea itself pushes the Viewport in and creates a
  // disappearing effect around the perimeter. Generally, this seems to be
  // preferable to using padding on an inner child element.
  return (
    <ScrollArea
      className='bg-background-light mx-auto h-[200px] w-[350px] rounded-md border p-4 shadow'
      // We could add variants to the component definition, but exposing thumbProps and
      // scrollbarProps makes it easy enough to adjust the color and size of the scrollbar.
      thumbProps={{
        className: 'bg-primary'
      }}
      // scrollbarProps={{ className: 'w-1.5' }}
    >
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king's pillow, in his soup,
      even in the royal toilet. The king was furious, but he couldn't seem to
      stop Jokester. And then, one day, the people of the kingdom discovered
      that the jokes left by Jokester were so funny that they couldn't help but
      laugh. And once they started laughing, they couldn't stop.
    </ScrollArea>
  )
}
