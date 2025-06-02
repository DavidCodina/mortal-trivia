'use client'

import { useState } from 'react'
import { Toggle } from '@/components/Toggle'

import {
  Rocket,
  Omega,
  Zap,
  Biohazard,
  Radiation,
  TriangleAlert,
  Power,
  PowerOff
} from 'lucide-react'

/* ========================================================================

======================================================================== */

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false)

  return (
    <>
      <section className='my-12'>
        <p className='mb-6 text-center'>
          <code className='text-pink-500'>Toggle</code> with icons...
        </p>
        <div className='flex items-center justify-center gap-4'>
          {/* By default, Toggle has the same padding as Button: px-[0.5em] py-[0.25em].
        When using just icons, you'll want to manually add the padding so it's consistent. */}
          <Toggle className='p-2' title='Default Variant' variant='default'>
            {/* Nested <svg>s will not responde to 'h-* w-*'. You must use size-*. */}
            <Rocket className='size-6' />
          </Toggle>

          <Toggle className='p-2' title='Accent Variant' variant='accent'>
            <Omega className='size-6' />
          </Toggle>

          <Toggle className='p-2' title='Outline Variant' variant='outline'>
            <Zap className='size-6' />
          </Toggle>

          <Toggle
            className='p-2'
            title='Outline Accent Variant'
            variant='outline-accent'
          >
            <Biohazard className='size-6' />
          </Toggle>

          <Toggle className='p-2' title='Primary Variant' variant='primary'>
            <Radiation className='size-6' />
          </Toggle>

          <Toggle className='p-2' title='Secondary Variant' variant='secondary'>
            <TriangleAlert className='size-6' />
          </Toggle>
        </div>
      </section>

      <section className='my-12'>
        <p className='mb-6 text-center'>
          <code className='text-pink-500'>Toggle</code> with text...
        </p>
        <div className='flex items-center justify-center gap-4'>
          <Toggle title='Default Variant' variant='default'>
            Toggle Me
          </Toggle>

          <Toggle title='Accent Variant' variant='accent'>
            Toggle Me
          </Toggle>

          <Toggle title='Outline Variant' variant='outline'>
            Toggle Me
          </Toggle>

          <Toggle title='Outline Accent Variant' variant='outline-accent'>
            Toggle Me
          </Toggle>

          <Toggle title='Primary Variant' variant='primary'>
            Toggle Me
          </Toggle>

          <Toggle title='Secondary Variant' variant='secondary'>
            Toggle Me
          </Toggle>
        </div>
      </section>

      <section className='my-12'>
        <p className='mb-6 text-center'>
          <code className='text-pink-500'>Toggle</code> with different sizes...
        </p>
        <div className='flex items-center justify-center gap-4'>
          <Toggle size='xs' title='Primary Variant' variant='primary'>
            Toggle Me
          </Toggle>

          <Toggle size='sm' title='Primary Variant' variant='primary'>
            Toggle Me
          </Toggle>

          <Toggle size='md' title='Primary Variant' variant='primary'>
            Toggle Me
          </Toggle>

          <Toggle size='lg' title='Primary Variant' variant='primary'>
            Toggle Me
          </Toggle>

          <Toggle size='xl' title='Primary Variant' variant='primary'>
            Toggle Me
          </Toggle>
        </div>
      </section>

      <section className='my-12 text-center'>
        <p className='mb-4 text-center'>
          A controlled <code className='text-pink-500'>Toggle</code> example...
        </p>

        <Toggle
          className='mx-auto mb-1 p-2'
          onPressedChange={(isPressed) => {
            setPressed(isPressed)
          }}
          pressed={pressed}
          title='Controlled Toggle'
          variant='primary'
        >
          {pressed ? (
            <Power className='size-8' />
          ) : (
            <PowerOff className='size-8' />
          )}
        </Toggle>

        <div className='text-center text-sm'>
          {pressed ? (
            <span className='text-success font-bold uppercase'>On</span>
          ) : (
            <span className='text-destructive font-bold uppercase'>Off</span>
          )}
        </div>
      </section>
    </>
  )
}
