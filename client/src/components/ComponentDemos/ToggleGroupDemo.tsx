'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ToggleGroup'

import { Rocket, Omega, Zap } from 'lucide-react'
/* ========================================================================

======================================================================== */

export function ToggleGroupDemo() {
  return (
    <>
      <section className='my-6 mb-12 flex flex-col items-center gap-6'>
        <ToggleGroup
          // ⚠️ background color and border should go on the
          // ToggleGroupItem components - not the ToggleGroup
          // Note: The ToggleGroup container's border-radius is
          // calcualted dynamically based on the size prop.
          // className='shadow-[0px_3px_6px_rgba(0,0,0,0.15)]'
          type='multiple'
          size='md'
          variant='default'
        >
          <ToggleGroupItem value='item1'>
            <Rocket />
            Default 1
          </ToggleGroupItem>
          <ToggleGroupItem value='item2'>
            <Omega />
            Default 2
          </ToggleGroupItem>
          <ToggleGroupItem value='item3'>
            <Zap />
            Default 3
          </ToggleGroupItem>
        </ToggleGroup>

        <div className='bg-background-light rounded-lg border border-dashed p-4'>
          <ToggleGroup type='multiple' size='md' variant='accent'>
            <ToggleGroupItem value='item1'>
              <Rocket />
              Accent 1
            </ToggleGroupItem>
            <ToggleGroupItem value='item2'>
              <Omega />
              Accent 2
            </ToggleGroupItem>
            <ToggleGroupItem value='item3'>
              <Zap />
              Accent 3
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <ToggleGroup type='multiple' size='md' variant='outline'>
          <ToggleGroupItem value='item1'>
            <Rocket />
            Outline 1
          </ToggleGroupItem>
          <ToggleGroupItem value='item2'>
            <Omega />
            Outline 2
          </ToggleGroupItem>
          <ToggleGroupItem value='item3'>
            <Zap />
            Outline 3
          </ToggleGroupItem>
        </ToggleGroup>

        <div className='bg-background-light rounded-lg border border-dashed p-4'>
          <ToggleGroup type='multiple' size='md' variant='outline-accent'>
            <ToggleGroupItem value='item1'>
              <Rocket />
              Outline Accent 1
            </ToggleGroupItem>
            <ToggleGroupItem value='item2'>
              <Omega />
              Outline Accent 2
            </ToggleGroupItem>
            <ToggleGroupItem value='item3'>
              <Zap />
              Outline Accent 3
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <ToggleGroup type='multiple' size='md' variant='primary'>
          <ToggleGroupItem value='item1'>
            <Rocket />
            Primary 1
          </ToggleGroupItem>
          <ToggleGroupItem value='item2'>
            <Omega />
            Primary 2
          </ToggleGroupItem>
          <ToggleGroupItem value='item3'>
            <Zap />
            Primary 3
          </ToggleGroupItem>
        </ToggleGroup>
      </section>

      <section className='my-6'>
        <article className='mx-auto max-w-[800px]'>
          <p className='mb-6'>
            In many cases, you'll want a scroll container around a{' '}
            <code className='text-pink-500'>ToggleGroup</code>. This has{' '}
            <strong>
              <em>not</em>
            </strong>{' '}
            been baked into the component implementation, but is simple enough
            to achieve. Here the{' '}
            <code className='text-pink-500'>{`<div>`}</code> is given{' '}
            <code className='text-pink-500'>p-[3px]</code> to accommodate the{' '}
            <code className='text-pink-500'> focus-visible</code> ring.
          </p>

          <pre className='bg-background-light mb-6 rounded-xl border text-sm'>
            <code>{`
  <div className='mx-auto w-fit max-w-full overflow-x-auto p-[3px]'>
    ...
  </div>
          `}</code>
          </pre>
        </article>

        <div className='mx-auto w-fit max-w-full overflow-x-auto p-[3px]'>
          <ToggleGroup
            className='mx-auto'
            type='multiple'
            size='md'
            variant='secondary'
          >
            <ToggleGroupItem value='item1'>
              <Rocket />
              Secondary 1
            </ToggleGroupItem>
            <ToggleGroupItem value='item2'>
              <Omega />
              Secondary 2 (Longer Content To Test Responsiveness)
            </ToggleGroupItem>
            <ToggleGroupItem value='item3'>
              <Zap />
              Secondary 3
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>
    </>
  )
}
