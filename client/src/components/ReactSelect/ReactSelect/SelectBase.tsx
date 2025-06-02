'use client'

import * as React from 'react'
// {
//   StylesConfig,
//   CSSObjectWithLabel,
//   SelectInstance,
//   ActionMeta,
//   SingleValue, // Example: const v: SingleValue<{ value: string; label: string }> = {}
//   MultiValue,
//   OptionsOrGroups,
//   Options,
//   PropsValue,
//   OnChangeValue
// }
import Select from 'react-select'
import { type VariantProps } from 'class-variance-authority'

import { reactSelectVariants } from '../reactSelectVariants'
import { getStyles } from '../getStyles'
import { getClassNames } from '../getClassNames'

// Important: Unlike in a normal react-select, className
// & style will be applied to the control. Moreover,
// the classNames & styles props have been omitted.
type SelectBaseProps = Omit<
  React.ComponentProps<typeof Select>,
  | 'classNames'
  | 'styles'
  ///////////////////////////////////////////////////////////////////////////
  //
  // ⚠️ The actual Ref used by react-select is typed as:
  //
  //   React.Ref<Select<unknown, boolean, GroupBase<unknown>>> | undefined
  //
  // We can derive that by doing this:
  //
  //   type SelectRef = React.ComponentProps<typeof Select>['ref']
  //
  // However, if we actually allow that type to be inferred on the consuming side,
  // then it makes passing a ref too strict.Instead just do this:
  //
  //   ref: React.Ref<any> | undefined
  //
  // Then if you want to inform Typescript of the actual type, you can do this:
  //
  //   const selectRef = useRef<SelectInstance>(undefined)
  //
  ///////////////////////////////////////////////////////////////////////////
  | 'ref'
  // This is omitted because the blur can happen before the controlled state value is updated.
  // This would then lead to a false negative validation error.
  | 'blurInputOnSelect'
> & {
  disabled?: boolean
  style?: React.CSSProperties
  error?: string
  touched?: boolean
  ref?: React.Ref<any> | undefined
} & VariantProps<typeof reactSelectVariants>

/* ========================================================================
                               ReactSelectBase
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// ⚠️ Gotcha: react-select renders differently on the server than on the client.
//
//   https://github.com/JedWatson/react-select/pull/5972
//   https://github.com/JedWatson/react-select/issues/5859
//
// This inevitably leads to a hydration mismatch where the offending line is:
//
//   aria-activedescendant=""
//
// Solution 1: load react-select only on the client side using Next.js's dynamic().
//
//   const Select = dynamic(() => import('react-select'), { ssr: false })
//
// The problem with this approach is that the Select will now take a second to
// load in on the client, and then cause cumulative layout shift.
//
// Solution 2: Use isMounted state to conditionally render the Select only on the client.
// This also causes the <Select /> to blink in with cumulative layout shift.
//
// Solution 3: Use suppressHydrationWarning on a parent element of the Select.
// Unfortunately, this approach doesn't prevent the error.
// For now, I'm not going to do anything. It may get fixed in the future.
//
///////////////////////////////////////////////////////////////////////////

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
  ...otherProps // value, defaultValue, etc.
}: SelectBaseProps) => {
  isDisabled = disabled || isDisabled

  /* ======================
          return
  ====================== */

  return (
    <Select
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
      // unstyled // ⚠️ This is too aggressive
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
