import { ClassNamesConfig } from 'react-select'
import { type VariantProps } from 'class-variance-authority'

import { reactSelectVariants } from './reactSelectVariants'
import { cn } from '@/utils'

type GetClassNamesOptions = {
  className: string
  disabled: boolean
  error: string
  touched: boolean
} & VariantProps<typeof reactSelectVariants>

type GetClassNames = (options: GetClassNamesOptions) => ClassNamesConfig

// The control component is not the top-level container, nor is it the input.
// When react-select is disabled, the control is merely <div aria-disabled="true">.
// Moreover, pointer-events:none is added to the top-level container, the control,
// and the indicators container by react-select.
const FIELD_DISABLED_MIXIN = `
pointer-events-none
opacity-65
`

// This approximates the FIELD_VALID_MIXIN in comopenent-constants.tsx,
// but modified for the react-select implementation.
const FIELD_INVALID_MIXIN = `
border-destructive
focus-within:border-destructive
focus-within:ring-destructive/40
`

// This approximates the FIELD_VALID_MIXIN in comopenent-constants.tsx,
// but modified for the react-select implementation.
const FIELD_VALID_MIXIN = `
border-success
focus-within:border-success
focus-within:ring-success/40
`

/* ======================
      getClassNames()
====================== */

export const getClassNames: GetClassNames = ({
  className,
  disabled,
  error,
  fieldSize,
  touched
}) => {
  const maybeValidationMixin = disabled
    ? FIELD_DISABLED_MIXIN
    : error // i.e., !disabled && error
      ? FIELD_INVALID_MIXIN
      : touched // i.e., !disabled && !error && touched
        ? FIELD_VALID_MIXIN
        : ``

  const classNamesConfig: ClassNamesConfig = {
    control: (_state) => {
      return cn(
        reactSelectVariants({ fieldSize }),
        className,
        maybeValidationMixin
      )
    }
  }

  return classNamesConfig
}
