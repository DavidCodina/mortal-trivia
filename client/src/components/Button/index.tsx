'use client'

import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
//import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'
import { buttonVariants } from './buttonVariants'

///////////////////////////////////////////////////////////////////////////
//
// This component uses asChild for polymorphism. Here's a more traditional
// polymorphic implementation:
//
//   type ButtonOwnProps<T extends ElementType = ElementType> = { as?: T }
//
//   type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
//     Omit<ComponentProps<T>, keyof ButtonOwnProps<T>>
//
//   const defaultElement = 'button'
//
//   export const PolymorphicButton = < T extends ElementType = typeof defaultElement >({ as, children, ...otherProps}: ButtonProps<T>) => {
//     const Component = as || defaultElement
//     return <Component {...otherProps}>{children}</Component>
//   }
//
// See here for more info:
//
//   https://stevekinney.github.io/react-and-typescript/polymorphic-components
//   https://fem-react-typescript.vercel.app/Polymorphic%20components.md
//
///////////////////////////////////////////////////////////////////////////

type ButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  /** loading, loader, loadingClassName, loadingStyle are all only available when asChild is false. */
  loading?: boolean
  loadingStyle?: React.CSSProperties
  loadingClassName?: string
  loader?: React.ReactNode
  isIcon?: boolean
} & VariantProps<typeof buttonVariants>

/* ========================================================================
                                    Button
======================================================================== */

const Button = ({
  asChild = false,
  children,
  className = '',
  disabled = false,
  isIcon = false,
  loading = false, // Only available when asChild is false.
  loader = null, // Only available when asChild is false.
  loadingClassName = '', // Only available when asChild is false.
  loadingStyle = {}, // Only available when asChild is false.
  leftSection = null, // Only available when asChild is false.
  rightSection = null, // Only available when asChild is false.
  size,
  style = {},
  variant,
  ...otherProps
}: ButtonProps) => {
  // Radix Slot does not automatically strip invalid attributes - it passes
  // all props down to the child element. Generally, the browser will simply
  // ignore invalid attributes (e.g., <a disabled>).
  const Component = asChild ? Slot : 'button'

  /* ======================
      renderLoader()
  ====================== */

  const renderLoader = () => {
    if (!loading) {
      return null
    }

    if (loader) {
      return loader
    }

    // <Loader2 className='animate-spin' />
    return (
      <svg
        // Adjust color and size here as needed.
        className={`block animate-spin${
          loadingClassName ? ` ${loadingClassName}` : ''
        }`}
        fill='none'
        viewBox='0 0 24 24'
        style={loadingStyle}
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>

        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <Component
      // Mitigate inadvertently triggering form submissions, etc.
      {...(Component === 'button' ? { type: 'button' } : {})}
      {...otherProps}
      disabled={disabled || (!asChild && loading)}
      data-slot='button'
      className={cn(
        ///////////////////////////////////////////////////////////////////////////
        //
        // The issue with icon only implementations is that normally,
        // the button's line-height of 1.5 would intrinsically add to
        // the overall height of the button. However, when the button
        // is ONLY an icon, this doesn't happen. Assuming, the icon is
        // 1em in height and font-size is 16px, then the button would lose
        // 4px top and bottom height. However, the <svg> icon is actually
        // given 1.25em in height, which means it's losing only 2px top
        // and bottom height. The button's normal vertical padding is 0.25em.
        // To correct for the loss in line-height, we need to add 2px top and bottom
        // to the padding (i.e., 0.25em + 0.125em = 0.375em).
        //
        ///////////////////////////////////////////////////////////////////////////
        buttonVariants({ variant, size }),
        {
          'p-[0.375em]': isIcon
        },
        className
      )}
      style={{ ...style }}
    >
      {/* Gotcha: The original ShadCN version implemented Slot for the
      asChild feature. However, if the child content is more than just {children},
      then you'll get an error when using asChild. For example:
  
        ❌ Error: React.Children.only expected to receive a single React element child.
  
      Solution: Also use <Slottable>{children}</Slottable> 

      The primary difference between the asChild and non-asChild implementation
      is that all loading related features have been removed when asChild.
      Most likely, if one is using asChild, it's to switch to <a>. In that
      case, they wouldn't need loading. Morever, if asChild then we definitely
      do not want to do this: {loading && isIcon ? renderLoader() : children} */}

      {loading && !asChild && !isIcon ? renderLoader() : leftSection}

      {loading && !asChild && isIcon ? (
        renderLoader()
      ) : (
        <Slottable>{children}</Slottable>
      )}

      {rightSection}
    </Component>
  )
}

export { Button, buttonVariants }
