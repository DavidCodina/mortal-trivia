'use client'

import { cva } from 'class-variance-authority'

const alertShadowMixin = `shadow-[0_1px_2px_rgb(0,0,0,0.35)]`

const verticalBarMixin = `
before:content-['']
before:h-full 
before:absolute
before:top-0
before:left-0
before:border-l-[5px]
before:border-current
before:rounded-l-[inherit]
before:rounded-l-[inherit]
`

///////////////////////////////////////////////////////////////////////////
//
// The original ShadCN implementation had classes like this:
//
//   grid grid-cols-[0_1fr] items-start
//   has-[>svg]:grid-cols-[calc(var(--spacing)*6)_1fr]
//   has-[>svg]:gap-x-3 gap-y-0.5
//   [&>svg]:size-6 [&>svg]:translate-y-0.5 [&>svg]:text-current
//
//
// The effect was such that it automatically created an initial column for the
// icon when it was detected. However, the overall implementation wasn't flexible
// enough to then also incorporate buttons as a third column.
//
///////////////////////////////////////////////////////////////////////////
const baseClasses = `
relative flex items-start gap-2 relative w-full rounded-lg border p-3 text-sm 
[&_svg:not([class*='size-'])]:size-6 [&>svg]:translate-y-0.5
${verticalBarMixin}
`

/* ======================
      alertVariants
====================== */

export const alertVariants = cva(baseClasses, {
  variants: {
    variant: {
      /* ======================
            Custom Colors
      ====================== */

      primary: `
      bg-(--primary-soft) text-primary
      *:data-[slot=alert-description]:text-primary
      border-primary
      ${alertShadowMixin}
      `,

      secondary: `
      bg-(--secondary-soft) text-secondary
      *:data-[slot=alert-description]:text-secondary
      border-secondary
      ${alertShadowMixin}
      `,

      info: `
      bg-(--info-soft) text-info
      *:data-[slot=alert-description]:text-info
      border-info
      ${alertShadowMixin}
      `,

      success: `
      bg-(--success-soft) text-success
      *:data-[slot=alert-description]:text-success
      border-success
      ${alertShadowMixin}
      `,

      warning: `
      bg-(--warning-soft) text-warning
      *:data-[slot=alert-description]:text-warning
      border-warning
      ${alertShadowMixin}
      `,

      destructive: `
      bg-(--destructive-soft) text-destructive
      *:data-[slot=alert-description]:text-destructive
      border-destructive
      ${alertShadowMixin}
      `,

      /* ======================
       Custom Colours Outline
      ====================== */

      'primary-outline': `text-primary *:data-[slot=alert-description]:text-primary border-primary`,
      'secondary-outline': `text-secondary *:data-[slot=alert-description]:text-secondary border-secondary`,
      'info-outline': `text-info *:data-[slot=alert-description]:text-info border-info`,
      'success-outline': `text-success *:data-[slot=alert-description]:text-success border-success`,
      'warning-outline': `text-warning *:data-[slot=alert-description]:text-warning border-warning`,
      'destructive-outline': `text-destructive *:data-[slot=alert-description]:text-destructive border-destructive`,

      /* ======================
            Tailwind Colors
      ====================== */

      red: `
      bg-red-50 text-red-500
      *:data-[slot=alert-description]:text-red-500
      border-red-500
      ${alertShadowMixin}
      `,

      orange: `
      bg-orange-50 text-orange-500
      *:data-[slot=alert-description]:text-orange-500
      border-orange-500
      ${alertShadowMixin}
      `,
      amber: `
      bg-amber-50 text-amber-500
      *:data-[slot=alert-description]:text-amber-500
      border-amber-500
      ${alertShadowMixin}
      `,
      yellow: `
      bg-yellow-50 text-yellow-500
      *:data-[slot=alert-description]:text-yellow-500
      border-yellow-500
      ${alertShadowMixin}
      `,
      lime: `
      bg-lime-50 text-lime-500
      *:data-[slot=alert-description]:text-lime-500
      border-lime-500
      ${alertShadowMixin}
      `,
      green: `
      bg-green-50 text-green-500
      *:data-[slot=alert-description]:text-green-500
      border-green-500
      ${alertShadowMixin}
      `,
      emerald: `
      bg-emerald-50 text-emerald-500
      *:data-[slot=alert-description]:text-emerald-500
      border-emerald-500
      ${alertShadowMixin}
      `,
      teal: `
      bg-teal-50 text-teal-500
      *:data-[slot=alert-description]:text-teal-500
      border-teal-500
      ${alertShadowMixin}
      `,
      cyan: `
      bg-cyan-50 text-cyan-500
      *:data-[slot=alert-description]:text-cyan-500
      border-cyan-500
      ${alertShadowMixin}
      `,
      sky: `
      bg-sky-50 text-sky-500
      *:data-[slot=alert-description]:text-sky-500
      border-sky-500
      ${alertShadowMixin}
      `,
      blue: `
      bg-blue-50 text-blue-500
      *:data-[slot=alert-description]:text-blue-500
      border-blue-500
      ${alertShadowMixin}
      `,
      indigo: `
      bg-indigo-50 text-indigo-500
      *:data-[slot=alert-description]:text-indigo-500
      border-indigo-500
      ${alertShadowMixin}
      `,
      violet: `
      bg-violet-50 text-violet-500
      *:data-[slot=alert-description]:text-violet-500
      border-violet-500
      ${alertShadowMixin}
      `,
      purple: `
      bg-purple-50 text-purple-500
      *:data-[slot=alert-description]:text-purple-500
      border-purple-500
      ${alertShadowMixin}
      `,
      fuchsia: `
      bg-fuchsia-50 text-fuchsia-500
      *:data-[slot=alert-description]:text-fuchsia-500
      border-fuchsia-500
      ${alertShadowMixin}
      `,
      pink: `
      bg-pink-50 text-pink-500
      *:data-[slot=alert-description]:text-pink-500
      border-pink-500
      ${alertShadowMixin}
      `,
      rose: `
      bg-rose-50 text-rose-500
      *:data-[slot=alert-description]:text-rose-500
      border-rose-500
      ${alertShadowMixin}
      `,
      slate: `
      bg-slate-50 text-slate-500
      *:data-[slot=alert-description]:text-slate-500
      border-slate-500
      ${alertShadowMixin}
      `,
      gray: `
      bg-gray-50 text-gray-500
      *:data-[slot=alert-description]:text-gray-500
      border-gray-500
      ${alertShadowMixin}
      `,
      zinc: `
      bg-zinc-50 text-zinc-500
      *:data-[slot=alert-description]:text-zinc-500
      border-zinc-500
      ${alertShadowMixin}
      `,
      neutral: `
      bg-neutral-50 text-neutral-500
      *:data-[slot=alert-description]:text-neutral-500
      border-neutral-500
      ${alertShadowMixin}
      `,
      stone: `
      bg-stone-50 text-stone-500
      *:data-[slot=alert-description]:text-stone-500
      border-stone-500
      ${alertShadowMixin}
      `,

      /* ======================
       Custom Colours Outline
      ====================== */

      'red-outline': `text-red-500 *:data-[slot=alert-description]:text-red-500 border-red-500`,
      'orange-outline': `text-orange-500 *:data-[slot=alert-description]:text-orange-500 border-orange-500`,
      'amber-outline': `text-amber-500 *:data-[slot=alert-description]:text-amber-500 border-amber-500`,
      'yellow-outline': `text-yellow-500 *:data-[slot=alert-description]:text-yellow-500 border-yellow-500`,
      'lime-outline': `text-lime-500 *:data-[slot=alert-description]:text-lime-500 border-lime-500`,
      'green-outline': `text-green-500 *:data-[slot=alert-description]:text-green-500 border-green-500`,
      'emerald-outline': `text-emerald-500 *:data-[slot=alert-description]:text-emerald-500 border-emerald-500`,
      'teal-outline': `text-teal-500 *:data-[slot=alert-description]:text-teal-500 border-teal-500`,
      'cyan-outline': `text-cyan-500 *:data-[slot=alert-description]:text-cyan-500 border-cyan-500`,
      'sky-outline': `text-sky-500 *:data-[slot=alert-description]:text-sky-500 border-sky-500`,
      'blue-outline': `text-blue-500 *:data-[slot=alert-description]:text-blue-500 border-blue-500`,
      'indigo-outline': `text-indigo-500 *:data-[slot=alert-description]:text-indigo-500 border-indigo-500`,
      'violet-outline': `text-violet-500 *:data-[slot=alert-description]:text-violet-500 border-violet-500`,
      'purple-outline': `text-purple-500 *:data-[slot=alert-description]:text-purple-500 border-purple-500`,
      'fuchsia-outline': `text-fuchsia-500 *:data-[slot=alert-description]:text-fuchsia-500 border-fuchsia-500`,
      'pink-outline': `text-pink-500 *:data-[slot=alert-description]:text-pink-500 border-pink-500`,
      'rose-outline': `text-rose-500 *:data-[slot=alert-description]:text-rose-500 border-rose-500`,
      'slate-outline': `text-slate-500 *:data-[slot=alert-description]:text-slate-500 border-slate-500`,
      'gray-outline': `text-gray-500 *:data-[slot=alert-description]:text-gray-500 border-gray-500`,
      'zinc-outline': `text-zinc-500 *:data-[slot=alert-description]:text-zinc-500 border-zinc-500`,
      'neutral-outline': `text-neutral-500 *:data-[slot=alert-description]:text-neutral-500 border-neutral-500`,
      'stone-outline': `text-stone-500 *:data-[slot=alert-description]:text-stone-500 border-stone-500`
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})
