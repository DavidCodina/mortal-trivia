'use client'

import { ComponentProps } from 'react'
import { Button, Popover } from '@/components'

type PopoverVariant = ComponentProps<typeof Popover>['variant']

const customColors: PopoverVariant[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'destructive'
]

/* ========================================================================
                                PopoverDemo
======================================================================== */

export const PopoverDemo = () => {
  const renderCustomColorPopovers = () => {
    return createPopovers(customColors)
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <section className='bg-background-light mt-24 mb-6 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Custom Variant Examples:
        </h2>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Popover
            className='w-[300px]'
            style={{}}
            trigger={
              <Button className='min-w-[100px]' variant='neutral' size='sm'>
                Default
              </Button>
            }
          >
            <div className='grid gap-4'>
              <h4 className='leading-none font-bold'>Default Example</h4>

              <div className='text-sm'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Recusandae, perspiciatis fugiat voluptatem laborum dolor
                suscipit sunt quidem ex animi vel! Aliquam incidunt odit
                reiciendis odio illum consequatur eos eum autem voluptates,
                quibusdam laboriosam. Mollitia est quisquam minima alias, quia
                explicabo rerum beatae illo hic quasi cum ut deserunt,
                asperiores tempora.
              </div>
            </div>
          </Popover>

          {renderCustomColorPopovers()}
        </div>
      </section>
    </>
  )
}

/* ======================
  capitalizeFirstLetter()
====================== */

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/* ======================
      createPopovers
====================== */

const createPopovers = (variantArray: PopoverVariant[]) => {
  return variantArray.map((variant, index) => {
    if (!variant || typeof variant !== 'string') {
      return null
    }

    return (
      <Popover
        key={index}
        className='w-[300px]'
        style={{}}
        trigger={
          <Button className='min-w-[100px]' variant={variant} size='sm'>
            {capitalizeFirstLetter(variant)}
          </Button>
        }
        variant={variant}
      >
        <div className='grid gap-4'>
          <h4 className='leading-none font-bold'>{`${capitalizeFirstLetter(variant)} Example`}</h4>

          <div className='text-sm'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Recusandae, perspiciatis fugiat voluptatem laborum dolor suscipit
            sunt quidem ex animi vel! Aliquam incidunt odit reiciendis odio
            illum consequatur eos eum autem voluptates, quibusdam laboriosam.
            Mollitia est quisquam minima alias, quia explicabo rerum beatae illo
            hic quasi cum ut deserunt, asperiores tempora.
          </div>
        </div>
      </Popover>
    )
  })
}
