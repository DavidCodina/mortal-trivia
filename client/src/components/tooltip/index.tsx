'use client'

import * as React from 'react'
import { Tooltip as RadixTooltip } from './Tooltip'
import { TooltipTrigger } from './TooltipTrigger'
import { TooltipContent, type TooltipContentVariants } from './TooltipContent'

type TooltipContentProps = React.ComponentProps<typeof TooltipContent>
type TooltipContentRef = TooltipContentProps['ref']

type OnPointerDownOutside = React.ComponentProps<
  typeof TooltipContent
>['onPointerDownOutside']

type TooltipProps = React.ComponentProps<typeof RadixTooltip> & {
  trigger: React.JSX.Element
  contentClassName?: string
  contentStyle?: React.CSSProperties
  arrow?: boolean
  arrowClassName?: string
  arrowStyle?: React.CSSProperties
  /** The preferred side the popup should render on (if possible). */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** The amount of offset beween popup and trigger element. */
  sideOffset?: number
  onPointerDownOutside?: OnPointerDownOutside
  forceMount?: boolean
  tooltipContentRef?: TooltipContentRef

  // Intentionally omitting align. It's too much complexity for the current use case.
  // If side is 'top' or 'bottom', then 'end' will push content to the left such
  // that the right edge of Content and Trigger are aligned. If side is 'left' or
  // 'right', then 'end' means the bottom of the Trigger. With the current arrow style
  // anything but 'center' would make the arrow look a little wonky.
  // align?: 'start' | 'center' | 'end'

  // Intentionally omitting alignOffset.
  // alignOffset allows for more fine-grained control of how the Content is alinged against Trigger
  // For example, with the current arrow styles we would need at least alignOffset={-1} if align
  // were 'start' or 'end'. But actually, a better solution is to use something like arrowPadding={12}
  // alignOffset?: number

  // Intentionally omitting arrowPadding.
} & TooltipContentVariants

/* ========================================================================
                                ToolTip
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// https://www.radix-ui.com/primitives/docs/components/tooltip
// A popup that displays information related to an element when
// the element receives keyboard focus or the mouse hovers over it.
//
//   Tab    : Opens/closes the tooltip without delay.
//   Space  : If open, closes the tooltip without delay.
//   Enter  : If open, closes the tooltip without delay.
//   Escape : If open, closes the tooltip without delay.
//
// The Tooltip can be kept open using toggleForceMount. Getting this to behave correctly
// was very tricky. It entails using e.preventDefault() onClick AND onMouseDown, e.preventDefault()
// within onPointerDownOutside() AND toggling forceMount from within the trigger click handler.
// The following are some articles on the topic, but neither of them actually came up with a
// satisfactory solution.
//
//   https://github.com/radix-ui/primitives/issues/2029
//   "Tooltips generally should close on activation (be it pointer or keyboard)
//   so we use onClick for that."
//
//   https://github.com/radix-ui/primitives/issues/1077
//
//
// See here for more info on Tooltips vs Popovers:
//
//   https://ux.stackexchange.com/questions/88844/when-should-i-use-a-popover-vs-a-tooltip
//
// I also learned a lot from the discussion of why the tooltip intentionally doesn't work
// on mobile/tablets:
//
//   https://github.com/radix-ui/primitives/issues/1573
//   https://github.com/radix-ui/primitives/issues/955#issuecomment-960610209
//
///////////////////////////////////////////////////////////////////////////

export const Tooltip = ({
  arrow = true,
  arrowClassName = '',
  arrowStyle = {},
  children,
  contentClassName = '',
  contentStyle = {},
  defaultOpen = false,
  delayDuration = 0, // 700 is the Radix default, but this is too long.
  open,
  onOpenChange,
  onPointerDownOutside,
  skipDelayDuration = 300,
  side = 'top',
  sideOffset = 10,
  forceMount,
  trigger,
  tooltipContentRef,
  variant,
  ...otherProps
}: TooltipProps) => {
  /* ======================
          return
  ====================== */

  return (
    <RadixTooltip
      // The duration from when the mouse enters a tooltip trigger until the tooltip opens.
      defaultOpen={defaultOpen}
      delayDuration={delayDuration}
      // How much time a user has to enter another trigger without incurring a delay again.
      skipDelayDuration={skipDelayDuration}
      open={open}
      onOpenChange={onOpenChange}
      {...otherProps}
    >
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>

      <TooltipContent
        arrow={arrow}
        arrowClassName={arrowClassName}
        arrowStyle={arrowStyle}
        className={contentClassName}
        forceMount={forceMount === true ? forceMount : undefined}
        onPointerDownOutside={(e) => {
          onPointerDownOutside?.(e)
        }}
        ref={tooltipContentRef}
        side={side}
        sideOffset={sideOffset}
        style={contentStyle}
        variant={variant}
      >
        {children}
      </TooltipContent>
    </RadixTooltip>
  )
}
