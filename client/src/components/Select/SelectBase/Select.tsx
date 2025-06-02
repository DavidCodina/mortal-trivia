'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

export type SelectValueType = React.ComponentProps<
  typeof SelectPrimitive.Item
>['value']

type SelectProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  'onValueChange' | 'onChange'
> & {
  // onChange is the same type as onValueChange, but the
  // naming convention is more intuitive.
  onChange?: (value: SelectValueType) => void
}

/* ========================================================================

======================================================================== */
// https://www.radix-ui.com/primitives/docs/components/select
// The Radix UI Select component is not built on top of react-select.
// The Radix Primitive Select component does not currently support multiple selections.
//
// ⚠️ Internally, the Radix primitive Select does implement a <select>.
// This means that any attempt to integrate react-hook-form
// with this component or any component built on top of it will
// necessarily require an RHF Controller component.

function Select({ onChange, ...otherProps }: SelectProps) {
  return (
    <SelectPrimitive.Root
      {...otherProps}
      data-slot='select'
      onValueChange={(value) => {
        onChange?.(value)
      }}
    />
  )
}

export { Select }
