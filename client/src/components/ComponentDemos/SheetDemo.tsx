'use client'

import * as React from 'react'
import { Button } from '@/components'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/sheet'

/* ========================================================================

======================================================================== */

export const SheetDemo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className='mx-auto flex min-w-[100px]'
          size='sm'
          variant='success'
        >
          Open Sheet
        </Button>
      </SheetTrigger>

      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            Sheet description. Bla, bla, bla...
          </SheetDescription>
        </SheetHeader>

        <article className='px-4 text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          maxime labore officia porro nesciunt voluptates at! Nisi, delectus,
          est facilis enim officia id sunt inventore a, beatae harum itaque!
          Optio natus totam dolores ex suscipit, tempore iusto itaque soluta
          recusandae fugiat libero ipsam laboriosam repellendus iste hic ratione
          cupiditate ipsum?
        </article>

        <SheetFooter>
          <SheetClose asChild>
            <Button size='sm'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
