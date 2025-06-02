'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// https://www.radix-ui.com/primitives/docs/components/select#value
// The part that reflects the selected value. By default the selected item's text
// will be rendered. if you require more control, you can instead control the
// select and pass your own children. It should not be styled to ensure correct
// positioning. An optional placeholder prop is also available for when the select
// has no value.
//
// This component corresponde to the HTML of:
//
//   <span data-slot="select-value" style="pointer-events: none;">...</span>
//
// Despite Typescript allowing `style` and `className` props on the consumed instance,
// they won't get applied. This component is purely for rendering the placeholder
// text and then the selected value
//
///////////////////////////////////////////////////////////////////////////

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

export { SelectValue }
