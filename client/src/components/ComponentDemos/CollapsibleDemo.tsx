'use client'

import { Pointer } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/collapsible'

/* ========================================================================

======================================================================== */

export const CollapsibleDemo = () => {
  return (
    <Collapsible
      defaultOpen={false}
      // disabled
      className='transitiona-all bg-background-light mx-auto mb-6 max-w-[600px] overflow-hidden rounded-lg border text-sm shadow'
    >
      <CollapsibleTrigger className='group cursor-pointer p-2 font-medium'>
        <Pointer
          className='mr-1 inline-flex h-6 w-6 rounded-full border border-green-800 bg-green-500 p-1 text-white shadow-md transition-colors group-data-[state=open]:border-red-800 group-data-[state=open]:bg-red-500'
          size={'1em'}
          strokeWidth={1.5}
        />
        Should I also read the Radix documentation?
      </CollapsibleTrigger>
      <CollapsibleContent className='CollapsibleContent border-t'>
        {/* Here it's imporant to put padding on child, not directly on CollapsibleContent. */}
        <div className='transitiona-all dark:bg-background-light bg-neutral-50 p-2'>
          Yes. You'll find a lot of useful information and more specific details
          on the component's behavior from the{' '}
          <a
            className='dark:text-primary transitiona-all text-blue-500 underline'
            href='https://www.radix-ui.com/primitives/docs/components/collapsible'
            target='_blank'
            rel='noopener noreferrer'
          >
            Radix website
          </a>
          .
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
