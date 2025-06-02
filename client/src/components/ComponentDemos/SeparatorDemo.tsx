'use client'

import { Separator } from '@/components/separator'

/* ========================================================================

======================================================================== */

export const SeparatorDemo = () => {
  return (
    <section className='bg-background-light mx-auto max-w-md rounded-lg border p-4 text-sm shadow'>
      <h4 className='text-sm font-medium'>Separator Demo</h4>
      <p className='text-muted-foreground mb-0'>
        An abstraction on top of{' '}
        <code className='text-pink-500'>@radix-ui/react-separator</code>.
      </p>

      <Separator className='my-4' />

      <p className='mb-4'>
        Use <code className='text-pink-500'>orientation='vertical'</code> to
        create vertical separators. Here it seems important to place an explicit
        height on the parent element.
      </p>

      <div className='mb-4 flex h-5 items-center justify-center gap-4'>
        <div>Blog</div>
        <Separator orientation='vertical' />
        <div>Docs</div>
        <Separator orientation='vertical' />
        <div>Source</div>
      </div>

      <p className='mb-4'>Let's get a little more creative...</p>

      <div className='flex items-center gap-2'>
        <Separator className='flex-1' />
        <span className='text-muted-foreground text-sm'>Section</span>
        <Separator className='flex-1' />
      </div>
    </section>
  )
}
