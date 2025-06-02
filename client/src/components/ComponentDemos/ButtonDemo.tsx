'use client'

import { ComponentProps } from 'react'
import { Button } from '@/components'
import { Loader2, Equal } from 'lucide-react'

import {
  Rocket,
  Omega,
  Zap,
  CircleUserRound,
  CircleCheck,
  Music4
} from 'lucide-react'

type ButtonVariant = ComponentProps<typeof Button>['variant']

const customColors: ButtonVariant[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'destructive'
]

const customLightColors: ButtonVariant[] = [
  'primary-light',
  'secondary-light',
  'info-light',
  'success-light',
  'warning-light',
  'destructive-light'
]

const tailwindColors: ButtonVariant[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone'
]

/* ========================================================================
                              ButtonDemo
======================================================================== */

export const ButtonDemo = () => {
  const renderCustomColorButtons = () => {
    return createButtons(customColors)
  }

  const renderCustomLightColorButtons = () => {
    return createButtons(customLightColors)
  }

  const renderTailwindColorButtons = () => {
    return createButtons(tailwindColors)
  }

  /* ======================

  ====================== */

  return (
    <>
      <section className='bg-background-light mx-auto mb-6 space-y-4 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Custom Color Variants:</h2>
        <p className='mb-4'>
          The initial ShadCN button implementation hardcoded various heights for{' '}
          <code className='text-pink-500'>Button</code> in its{' '}
          <code className='text-pink-500'>size</code> variant. However, this has
          been updated such that height is now determined intrinsically by{' '}
          <code className='text-pink-500'>font-size</code>,{' '}
          <code className='text-pink-500'>padding</code> and{' '}
          <code className='text-pink-500'>line-height</code>. This is a common
          practice (e.g., Bootstrap). Moreover,{' '}
          <code className='text-pink-500'>padding</code>,{' '}
          <code className='text-pink-500'>gap</code>, and{' '}
          <code className='text-pink-500'>border-radius</code> are all now based
          off of <code className='text-pink-500'>em</code> units. Similar
          changes have been made to form controls and{' '}
          <code className='text-pink-500'>Toggle</code> so that they all match
          each other at each size.
        </p>

        {renderCustomColorButtons()}
      </section>

      <section className='bg-background-light mx-auto mb-6 space-y-4 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Custom Color Variants (light):
        </h2>

        <p className='mb-6'>
          These are not actual additional custom colors. However, the variants
          represent the <em>forced</em> light versions of custom colors.
        </p>
        {renderCustomLightColorButtons()}
      </section>

      <section className='bg-background-light mx-auto mb-6 space-y-4 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Tailwind Color Variants:
        </h2>
        {renderTailwindColorButtons()}
      </section>

      <section className='bg-background-light mx-auto mb-6 space-y-4 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Buttons With SVGs:</h2>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Button
            className='size-12 animate-spin rounded-full p-2 [animation-duration:3.5s]'
            isIcon
            variant='lime'
          >
            <Rocket />
          </Button>

          <Button loading size='md' variant='red' leftSection={<Rocket />}>
            Click Me
          </Button>

          <Button
            size='md'
            variant='orange'
            leftSection={<Omega />}
            rightSection={<Omega />}
          >
            Click Me
          </Button>

          <Button
            loading
            loader={<Loader2 className='animate-spin' />}
            leftSection={<Zap />}
            size='md'
            variant='yellow'
          >
            Custom Loader
          </Button>

          <Button leftSection={<CircleCheck />} size='md' variant='green'>
            Click Me
          </Button>

          <Button leftSection={<CircleUserRound />} size='md' variant='blue'>
            Click Me
          </Button>

          <Button rightSection={<Music4 />} size='md' variant='purple'>
            Click Me
          </Button>
        </div>

        <p>
          When using the <code className='text-pink-500'>isIcon</code> prop, a{' '}
          <code className='text-pink-500'>Button</code> would{' '}
          <strong className='text-primary'>
            <em>lose height</em>
          </strong>{' '}
          due to CSS omitting the{' '}
          <code className='text-pink-500'>line-height</code> (i.e., no text, no{' '}
          <code className='text-pink-500'>line-height</code>). However, this
          issue is mitigated by adding the necessary padding.{' '}
          <code className='text-pink-500'>Button</code> components are given a{' '}
          <code className='text-pink-500'>line-height</code> of{' '}
          <code className='text-pink-500'>1.5</code>.{' '}
          <code className='text-pink-500'>{`<svg>`}</code> icons are given a
          size of <code className='text-pink-500'>1.25em</code>. To correct fo
          the loss of <code className='text-pink-500'>line-height</code>,{' '}
          <code className='text-pink-500'>isIcon</code> buttons are given an
          additional <code className='text-pink-500'>0.125em</code> (i.e.,{' '}
          <code className='text-pink-500'>0.375em</code> total) padding.
        </p>

        <div className='outline-border mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded outline-2 outline-dashed'>
          <Button variant='green' isIcon>
            <CircleCheck />
          </Button>

          <Equal className='size-4' />
          <Button variant='green'>Click Me</Button>
        </div>
      </section>

      <section className='bg-background-light mx-auto mb-6 space-y-4 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-2 font-bold'>Other Variants:</h2>

        <p className='mb-4'>
          I'm not a huge fan of these variants, but they're often used in
          default ShadCN implementations, so they've been kept for now.
        </p>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          {/* Outline: 
          The default shadcn outline button isn't really an outline button.
          It's just an off-white button with a light border.*/}

          <Button variant='outline'>Outline</Button>

          {/* Ghost: 
          The default shadcn ghost button is transparent, then has a solid off-white color when hovered. */}

          <Button variant='ghost'>Ghost</Button>

          {/* Link */}
          <Button variant='link'>Link</Button>
        </div>
      </section>
    </>
  )
}

/* ======================
    createButtons()
====================== */

const createButtons = (colorArray: ButtonVariant[]) => {
  return colorArray.map((color, index) => {
    if (!color) {
      return null
    }

    return (
      <div
        key={index}
        className='flex flex-wrap items-center justify-center gap-4'
      >
        <Button size='xs' variant={color}>
          {color.toUpperCase()} xs
        </Button>

        <Button size='sm' variant={color}>
          {color.toUpperCase()} sm
        </Button>

        <Button size='md' variant={color}>
          {color.toUpperCase()} md
        </Button>

        <Button size='lg' variant={color}>
          {color.toUpperCase()} lg
        </Button>

        <Button size='xl' variant={color}>
          {color.toUpperCase()} xl
        </Button>
      </div>
    )
  })
}
