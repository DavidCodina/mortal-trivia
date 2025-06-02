'use client'

import { toast, ExternalToast /*, Action */ } from 'sonner'
import { Rocket, Sparkles } from 'lucide-react'
import { cn } from '@/utils'

type titleT = (() => React.ReactNode) | React.ReactNode

const generateUniqueId = () =>
  `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

// Typescript type guard helper.
// const isAction = (obj: any): obj is Action => {
//   return (
//     obj &&
//     obj !== null &&
//     typeof obj === 'object' &&
//     'label' in obj &&
//     typeof obj.label !== 'undefined' &&
//     'onClick' in obj &&
//     typeof obj.onClick === 'function'
//   )
// }

/* ========================================================================
                              primaryToast()
======================================================================== */
// These extensions to the `toast` export work in conjunction with the
// sonner-augmentation.d.ts file.

export const primaryToast = (message: titleT, options: ExternalToast = {}) => {
  const { className, id, ...otherOptions } = options
  const toastId = id || generateUniqueId()

  toast(message, {
    id: toastId,
    className: cn(
      `
      [&_[data-action=true]]:!text-white
      [&_[data-action=true]]:!cursor-pointer
      [&_[data-cancel=true]]:!bg-transparent
      [&_[data-cancel=true]]:!text-primary
      [&_[data-cancel=true]]:!border 
      [&_[data-cancel=true]]:!border-primary
      [&_[data-cancel=true]]:!cursor-pointer
      [&_[data-close-button=true]]:!border-primary
      [&_[data-close-button=true]_>_svg]:!text-primary
      `,
      className
    ),
    style: {
      '--normal-bg': 'var(--background-light)',
      '--normal-text': 'var(--color-primary)',
      '--normal-border': 'var(--color-primary)'
    } as React.CSSProperties,
    icon: <Sparkles />, // Todo: Change default icon as needed.
    ...otherOptions
  })

  // The create function found at the URL below manages adding toasts
  // and deduping them. Ultimately, it returns an id, so that's what
  // we're doing here as well.
  // https://github.com/emilkowalski/sonner/blob/main/src/state.ts
  return toastId
}

/* ========================================================================
                              secondaryToast()
======================================================================== */

export const secondaryToast = (
  message: titleT,
  options: ExternalToast = {}
) => {
  const { className, id, ...otherOptions } = options
  const toastId = id || generateUniqueId()

  toast(message, {
    id: toastId,
    className: cn(
      `
      [&_[data-action=true]]:!text-white
      [&_[data-action=true]]:!cursor-pointer
      [&_[data-cancel=true]]:!bg-transparent
      [&_[data-cancel=true]]:!text-secondary
      [&_[data-cancel=true]]:!border 
      [&_[data-cancel=true]]:!border-secondary
      [&_[data-cancel=true]]:!cursor-pointer
      [&_[data-close-button=true]]:!border-secondary
      [&_[data-close-button=true]_>_svg]:!text-secondary
      `,
      className
    ),
    style: {
      '--normal-bg': 'var(--background-light)',
      '--normal-text': 'var(--color-secondary)',
      '--normal-border': 'var(--color-secondary)'
    } as React.CSSProperties,
    icon: <Rocket />, // Todo: Change default icon as needed.
    ...otherOptions
  })

  return toastId
}
