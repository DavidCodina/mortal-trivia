'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'

type AnchorProps = ComponentProps<'a'> & {
  disabled?: boolean
  underline?: 'always' | 'hover' | 'never'
}

// Gotcha: It seems like outline still doesn't inherit border radius
// in Firefox, which is why it's still preferable to use ring.
const baseClasses = `
font-medium text-primary
cursor-pointer rounded outline-none
focus-visible:ring-[2px] focus-visible:ring-current/50
`

/* ========================================================================
                                Anchor
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Components like Anchor, Text, etc. border on being superfluous.
// However, they do offer a level of standardization and function as
// a single source of truth.
//
// What benefit does this component confer?
//
//   - It adds disabled prop/styles (e.g., 'pointer-events-none').
//
//   - It removes href and onClick when disabled is true.
//
//   - It removes href when onClick handler is passed.
//
//   - It bakes in default rel and target attributes.
//
//   - It adds an underline prop (inspired by Mantine Anchor).
//
//   - It adds back a tabIndex of 0 even when no href, making the
//     focus-visible:... style work even when the <a>
//     is being used strictly as a click handler, and only removes
//     the tabIndex if disabled.
//
//   - It dyanamically adds the correct role: role={onClick ? 'button' : 'link'}
//
//   - It adds onKeyDown to support pressing 'Enter' or ' ' to trigger the click handler.
//
///////////////////////////////////////////////////////////////////////////

export const Anchor = ({
  children,
  className = '',
  disabled,
  href,
  onClick,
  onKeyDown,
  underline,
  ...otherProps
}: AnchorProps) => {
  /* ======================
          return
  ====================== */

  return (
    <a
      {...(disabled || onClick ? {} : { href })}
      // When no href is present, the default browser behavior is to skip
      // it as focusable. However, we always want it to be focusable as long
      // as !disabled
      {...(disabled ? {} : { tabIndex: 0 })}
      className={cn(
        baseClasses,
        underline === 'always' && !disabled && 'underline',
        underline === 'hover' && 'hover:underline',
        underline === 'never' && '!no-underline',
        className,
        disabled &&
          'text-foreground pointer-events-none line-through opacity-[0.65]'
      )}
      rel='noopener noreferrer'
      target='_blank'
      // 'Enter' normally works on an <a>'s href. However, it won't automatically work
      // when using <a> strictly to handle a click event. For that reason, we need to
      // manually add the onKeyDown handler.
      onKeyDown={(e) => {
        onKeyDown?.(e)
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e as any)
        }
      }}
      role={onClick ? 'button' : 'link'}
      onClick={
        !onClick || disabled
          ? undefined
          : (e) => {
              e.preventDefault()
              e.stopPropagation()
              onClick(e)
            }
      }
      {...otherProps}
    >
      {children}
    </a>
  )
}
