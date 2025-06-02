import { cva } from 'class-variance-authority'
import { FIELD_BOX_SHADOW_MIXIN } from '@/components/component-constants'

// This approximates the FIELD_FOCUS_MIXIN in comopenent-constants.tsx,
// but modified for the react-select implementation.
const FIELD_FOCUS_WITHIN_MIXIN = `
focus-within:shadow-none
focus-within:border-primary
focus-within:ring-[3px]
focus-within:ring-primary/40
`

const baseClasses = `
flex flex-wrap items-center justify-between
relative w-full min-w-0 bg-background-light
px-[0.5em] py-[0.25em]
rounded-[0.375em]
border outline-none
placeholder:text-muted-foreground
transition-[color,box-shadow]
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_WITHIN_MIXIN}
`

/* ======================
    reactSelectVariants
====================== */

export const reactSelectVariants = cva(baseClasses, {
  variants: {
    fieldSize: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    },
    defaultVariants: {
      fieldSize: 'md'
    }
  }
})
