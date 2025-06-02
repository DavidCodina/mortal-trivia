'use client'

import * as React from 'react'
import CreatableSelect from 'react-select/creatable'
import { type VariantProps } from 'class-variance-authority'

import { reactSelectVariants } from '../reactSelectVariants'
import { getStyles } from '../getStyles'
import { getClassNames } from '../getClassNames'

///////////////////////////////////////////////////////////////////////////
//
// The props for CreatableSelect includes all the props from the standard
// Select component as well as
//
//   allowCreateWhileLoading
//   createOptionPosition
//   formatCreateLabel
//   isValidNewOption
//   getNewOptionData
//   onCreateOption
//
///////////////////////////////////////////////////////////////////////////

type SelectBaseProps = Omit<
  React.ComponentProps<typeof CreatableSelect>,
  'classNames' | 'styles' | 'ref' | 'blurInputOnSelect'
> & {
  disabled?: boolean
  style?: React.CSSProperties
  error?: string
  touched?: boolean
  ref?: React.Ref<any> | undefined
} & VariantProps<typeof reactSelectVariants>

/* ========================================================================

======================================================================== */

export const SelectBase = ({
  className = '',
  disabled = false,
  isDisabled = false,
  error = '',
  fieldSize,
  touched = false,
  inputId,
  instanceId,
  style = {},
  ...otherProps
}: SelectBaseProps) => {
  isDisabled = disabled || isDisabled

  /* ======================
          return
  ====================== */

  return (
    <CreatableSelect
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          // Affects the option selected color.
          primary: 'var(--color-primary)',
          // Affects the option hover color.
          primary25: 'var(--color-accent)',
          // Affects the option active color.
          primary50: 'var(--color-accent)',
          // Affects the `x` on the multiValut tag.
          danger: 'var(--color-destructive)',
          // Affects the `x` background on the multiValut tag.
          dangerLight: 'var(--color-red-200)'
        }
      })}
      data-slot='react-select'
      isDisabled={isDisabled}
      instanceId={instanceId}
      inputId={inputId}
      classNames={getClassNames({
        className,
        disabled: isDisabled,
        error,
        fieldSize,
        touched
      })}
      styles={getStyles({
        disabled: isDisabled,
        error,
        style,
        touched
      })}
      {...otherProps}
    />
  )
}
