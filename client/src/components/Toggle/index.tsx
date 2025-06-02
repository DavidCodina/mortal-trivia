'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

///////////////////////////////////////////////////////////////////////////
//
// Like Button size variants and form control fieldSize variants,
// the size variant here has been modified to be intrinsically based on
// padding, which itself is derived from em units (i.e., the font size).
//
// The original ShadCN implementation did this:
//
//   [&_svg:not([class*='size-'])]:size-4
//
// This means, give the <svg> size-4 unless the <svg> has a className
// of 'size-*'. This does actually work, proving that Tailwind can handle
// that kind of arbitrary variant. However, it also means that using
// className='h-6 w-6' will NOT work. Thus, while it's better than nothing,
// you have to know to use `size-*` classes. Otherwise, you'll get blocked
// by specificity.
//
///////////////////////////////////////////////////////////////////////////

const svgMixin = `
[&_svg]:not([class*='size-'])]:pointer-events-none
[&_svg:not([class*='size-'])]:size-[1.25em]
[&_svg]:shrink-0
`
const disabledMixin = `disabled:pointer-events-none disabled:opacity-50`

const baseClasses = `
whitespace-nowrap
inline-flex items-center justify-center gap-[0.5em] shrink-0
px-[0.5em] py-[0.25em]
font-semibold whitespace-nowrap cursor-pointer
select-none rounded-[0.375em] outline-none
transition-[color,box-shadow]
focus-visible:ring-[3px]
${svgMixin}
${disabledMixin}
`

const toggleVariants = cva(baseClasses, {
  variants: {
    variant: {
      // Note: The default and outline variant won't look good when the
      // actual background container aslo background-light. For that reason,
      // accent and outline-accent were added.
      default: `
      bg-transparent text-muted-foreground
      hover:bg-background-light/65 hover:text-foreground
      data-[state=on]:bg-background-light
      data-[state=on]:text-foreground
      focus-visible:bg-background-light/65
      focus-visible:border-ring
      focus-visible:ring-ring/50
      focus-visible:text-foreground
      `,

      accent: `
      bg-transparent text-muted-foreground
      hover:bg-accent/65 hover:text-foreground
      data-[state=on]:bg-accent
      data-[state=on]:text-foreground
      focus-visible:bg-accent/65
      focus-visible:border-ring
      focus-visible:ring-ring/50
      focus-visible:text-foreground
      `,

      outline: `
        bg-transparent text-muted-foreground border shadow-xs
        hover:bg-background-light/65 hover:text-foreground
        data-[state=on]:bg-background-light
        data-[state=on]:text-foreground
        focus-visible:bg-background-light/65
        focus-visible:border-ring
        focus-visible:ring-ring/50
        focus-visible:text-foreground
        `,

      'outline-accent': `
        bg-transparent text-muted-foreground border shadow-xs
        hover:bg-accent/65 hover:text-foreground
        data-[state=on]:bg-accent
        data-[state=on]:text-foreground
        focus-visible:bg-accent/65
        focus-visible:border-ring
        focus-visible:ring-ring/50
        focus-visible:text-foreground
        `,

      primary: `
        bg-background-light text-primary border border-primary shadow-xs
        hover:bg-primary/65 hover:text-primary-foreground
        data-[state=on]:bg-primary
        data-[state=on]:text-primary-foreground
        focus-visible:bg-primary/65
        focus-visible:ring-primary/50
        focus-visible:text-primary-foreground
        `,

      secondary: `
        bg-background-light text-secondary border border-secondary shadow-xs
        hover:bg-secondary/65 hover:text-secondary-foreground
        data-[state=on]:bg-secondary
        data-[state=on]:text-secondary-foreground
        focus-visible:bg-secondary/65
        focus-visible:ring-secondary/50
        focus-visible:text-secondary-foreground
        `
    },

    size: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

/* ========================================================================

======================================================================== */

const Toggle = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) => {
  return (
    <TogglePrimitive.Root
      data-slot='toggle'
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
