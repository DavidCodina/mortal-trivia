import { cva } from 'class-variance-authority'
import { FIELD_BOX_SHADOW_MIXIN } from '@/components/component-constants'

export const FIELD_FOCUS_MIXIN = `
group-focus-within:shadow-none
group-focus-within:border-primary
group-focus-within:ring-[3px]
group-focus-within:ring-primary/40
`

const baseClasses = `
flex justify-between bg-background-light
w-full min-w-0 text-left
px-[0.5em] py-[0.25em]
rounded-[0.375em] border outline-none
transition-[color,box-shadow]
cursor-pointer
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_MIXIN}
`

export const selectTriggerVariants = cva(baseClasses, {
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
