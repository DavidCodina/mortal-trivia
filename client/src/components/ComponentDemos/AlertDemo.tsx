'use client'

import { ComponentProps } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert } from '@/components/alert'

type AlertVariant = ComponentProps<typeof Alert>['variant']

const customColors: AlertVariant[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'destructive'
]

const customOutlineColors: AlertVariant[] = [
  'primary-outline',
  'secondary-outline',
  'info-outline',
  'success-outline',
  'warning-outline',
  'destructive-outline'
]

const tailwindColors: AlertVariant[] = [
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

const tailwindOutlineColors: AlertVariant[] = [
  'red-outline',
  'orange-outline',
  'amber-outline',
  'yellow-outline',
  'lime-outline',
  'green-outline',
  'emerald-outline',
  'teal-outline',
  'cyan-outline',
  'sky-outline',
  'blue-outline',
  'indigo-outline',
  'violet-outline',
  'purple-outline',
  'fuchsia-outline',
  'pink-outline',
  'rose-outline',
  'slate-outline',
  'gray-outline',
  'zinc-outline',
  'neutral-outline',
  'stone-outline'
]

/* ========================================================================

======================================================================== */

export const AlertDemo = () => {
  const renderCustomColorAlerts = () => {
    return createAlerts(customColors)
  }

  const renderCustomOutlineAlerts = () => {
    return createAlerts(customOutlineColors)
  }

  const renderTailwindColorAlerts = () => {
    return createAlerts(tailwindColors)
  }

  const renderTailwindOutlineColorAlerts = () => {
    return createAlerts(tailwindOutlineColors)
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <section className='bg-background-light mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Custom Color Variants:</h2>
        {renderCustomColorAlerts()}
      </section>

      <section className='bg-background-light mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Custom Color Variants (Outline):
        </h2>
        {renderCustomOutlineAlerts()}
      </section>

      <section className='bg-background-light mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Tailwind Color Variants:
        </h2>
        {renderTailwindColorAlerts()}
      </section>

      <section className='bg-background-light mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Tailwind Color Variants (Outline):
        </h2>
        {renderTailwindOutlineColorAlerts()}
      </section>
    </>
  )
}

/* ======================
    createAlerts()
====================== */

const createAlerts = (variants: AlertVariant[]) => {
  return variants.map((variant, index) => {
    if (!variant) {
      return null
    }

    return (
      <Alert
        key={index}
        leftSection={<AlertCircle className='size-6' />}
        title={variant.toUpperCase()}
        variant={variant}
        className=''
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dolore
        possimus at culpa suscipit accusantium optio porro blanditiis nesciunt
        minus architecto, quis laboriosam?
      </Alert>
    )
  })
}
