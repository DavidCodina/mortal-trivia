'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'
import { TOOLTIP_ZINDEX_CLASS } from '../component-constants'

///////////////////////////////////////////////////////////////////////////
//
// Gotcha: The tailwindcss-animate `enter` animation inside animate-in
// sets transform: translate3d(0,0,0). Somehow, this in conjunction with
// border border-neutral-500 causes a misalignment in the positioning of the
// arrow, until the animation completes.
//
//   The translate3d(0,0,0) triggers a new stacking context and hardware acceleration,
//   which can cause the browser to defer or slightly defer precise layout calculations.
//   During the initial animation frames, the rendering engine might not immediately account
//   for all layout considerations like border widths, especially when combined with transforms.
//
// Initially, I tried finessing it with onOpenChange isOpen state, a useLayoutEffect, and a conditional
// application of { 'animate-in': isOpen } in the cn(). None of that worked. Another solution would entail
// creaing an inner div container for the border, border-radius and padding:
//
//   <div className='rounded-md border border-neutral-500 px-2 py-1'>{children}</div>
//   {arrow && ( ... )}
//
// This works great, except you've now split up the classes and introduced another layer of complexity.
//
// The solution that I prefer is to use a quasi-border:
//
//   shadow-[inset_0px_0px_0px_1px_var(--color-neutral-500)]
//
// Could also try using `transform-gpu` (???).
//
///////////////////////////////////////////////////////////////////////////

// Removed text-balance because it seemed to opinionated.
// However, when consuming the Tooltip, it's recommended to
// use a clamp and maybe text-balance and/or text-center:
//
//   contentClassName={`text-balance text-center max-w-[clamp(0px,600px,calc(100vw-48px))]`}

const animationMixin = `
animate-in fade-in-0 zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95
`

const baseClasses = `
[--radix-tooltip-bg-color:var(--color-background-light)]
shadow-[inset_0px_0px_0px_1px_var(--radix-tooltip-border-color),0_2px_4px_rgb(0,0,0,0.15)]
px-3 py-1.5 bg-(--radix-tooltip-bg-color) text-xs rounded-md
${animationMixin}
${TOOLTIP_ZINDEX_CLASS}
`

const arrowClasses = `
relative
fill-(--radix-tooltip-bg-color)
filter-[drop-shadow(0px_1.5px_0px_var(--radix-tooltip-border-color))_drop-shadow(0px_3px_3px_rgba(0,0,0,0.15))]
${TOOLTIP_ZINDEX_CLASS}
`

/* ======================
  tooltipContentVariants
====================== */

export const tooltipContentVariants = cva(baseClasses, {
  variants: {
    variant: {
      default: `
      [--radix-tooltip-border-color:var(--color-border)]
    `,

      /* ======================
            Custom Colors
      ====================== */

      primary: `
      [--radix-tooltip-border-color:var(--color-primary)]
      text-primary
      `,
      secondary: `
      [--radix-tooltip-border-color:var(--color-secondary)]
      text-secondary
      `,

      info: `
      [--radix-tooltip-border-color:var(--color-info)]
      text-info
      `,

      success: `
      [--radix-tooltip-border-color:var(--color-success)]
      text-success
      `,

      warning: `
      [--radix-tooltip-border-color:var(--color-warning)]
      text-warning
      `,

      destructive: `
      [--radix-tooltip-border-color:var(--color-destructive)]
      text-destructive
      `
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>

type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  arrow?: boolean
  arrowClassName?: string
  arrowStyle?: React.CSSProperties
} & TooltipContentVariants

/* ========================================================================

======================================================================== */

export const TooltipContent = ({
  arrow = true,
  arrowClassName = '',
  arrowStyle = {},
  className = '',
  style = {},
  forceMount,
  side = 'top',
  onPointerDownOutside,
  sideOffset = 0,
  children,
  variant,
  ...otherProps
}: TooltipContentProps) => {
  /* ======================
          return
  ====================== */

  return (
    <TooltipPrimitive.Portal forceMount={forceMount}>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        side={side}
        style={style}
        onPointerDownOutside={onPointerDownOutside}
        className={cn(tooltipContentVariants({ variant }), className)}
        {...otherProps}
      >
        {children}
        {arrow && (
          <TooltipPrimitive.Arrow
            className={cn(arrowClasses, arrowClassName)}
            data-slot='tooltip-arrow'
            style={{
              // By default, Arrow has width: 10px, height: 5px.
              // This changes here are generaly preferable, except
              // in cases where the tooltip is being rendered to the
              // left/right of the trigger, and is only a single line.
              // In that case, the arrow needs to be reset:
              // arrowStyle={{ width: 10, height: 6 }}
              //# Could put a ref on TooltipPrimitive.Content
              //# And handle it programmatically based on height and side.
              width: 20,
              height: 8,
              top: -2.5, // Doesn't need to be fixed for different sides. It just works!
              ...arrowStyle
            }}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
