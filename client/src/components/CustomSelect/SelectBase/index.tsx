'use client'

import * as React from 'react'
import {
  useFloating,
  flip,
  offset,
  shift,
  autoUpdate
} from '@floating-ui/react'
import { type VariantProps } from 'class-variance-authority'
import { selectTriggerVariants } from './selectTriggerVariants'

import { cn } from '@/utils'
import { SelectTrigger } from './SelectTrigger'
import { SelectMenu } from './SelectMenu'
import { SelectOption } from '../types'

export { type SelectOption }

type SelectBaseSharedProps = Omit<
  React.ComponentProps<'div'>,
  'defaultValue' | 'onBlur' | 'onChange'
> & {
  allowDeselect?: boolean
  /** Passing 'left' | 'right' also serves as an opt-in for the check icon. */
  checkIconPosition?: 'left' | 'right'
  disabled?: boolean
  error?: string
  menuClassName?: string
  menuStyle?: React.CSSProperties
  onBlur?: (value: SelectOption | null) => void
  onChange?: (value: SelectOption | null) => void
  options?: SelectOption[]
  placeholder?: string
  touched?: boolean
  triggerClassName?: string
  triggerStyle?: React.CSSProperties
} & VariantProps<typeof selectTriggerVariants>

type SelectBaseWithValue = SelectBaseSharedProps & {
  defaultValue?: never
  value: SelectOption | null
}

type SelectBaseWithDefaultValue = SelectBaseSharedProps & {
  defaultValue: SelectOption | null
  value?: never
}

type SelectBaseWithSharedPropsOnly = SelectBaseSharedProps & {
  defaultValue?: never
  value?: never
}

type SelectBaseProps =
  | SelectBaseWithValue
  | SelectBaseWithDefaultValue
  | SelectBaseWithSharedPropsOnly

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This is a custom select that has an improved menu, allows for option.value to
// be anything, and has a few other enhancements.
//
// The downside of this kind of implementation is that it necessarily has internal
// state to track the selectedOption. This means that the internal state can only be
// cleared through a controlled implementation, or through unmounting/remounting the
// component (e.g., updating the key prop). Even if we had an actual <select> as part
// of the internal implementation, programmatically clearing the value would not cause
// it's onChange() to fire, and there would still be a need for internal state.
//
// Consequently, this component is best used in a controlled manner.
//
// This component is essentially the beginnings of react-select.
// The upside is that we don't have to fight with all of the internal styling
// that react-select comes with. The downside is that it doesn't currently have
// all of the extra features like multi-select.
//
/////////////////////////
//
// See also (Canary Chrome only)
//
// Una Kravets: https://codepen.io/una
// WDS: https://www.youtube.com/watch?v=tNBufpGQihY
//
// Inspiration:
//
//   https://mantine.dev/core/select/
//   https://github.com/mantinedev/mantine/blob/master/packages/@mantine/core/src/components/Select/Select.tsx
//   https://www.heroui.com/docs/components/select
//
///////////////////////////////////////////////////////////////////////////

export const SelectBase = ({
  allowDeselect = true,
  checkIconPosition,
  className = '',
  defaultValue = null,
  disabled = false,
  error = '',
  fieldSize,
  menuClassName = '',
  menuStyle = {},
  options = [],
  onBlur,
  onChange,
  placeholder = 'Select an option',
  ref,
  touched = false,
  triggerClassName = '',
  triggerStyle = {},
  value = null,
  ...otherProps
}: SelectBaseProps) => {
  // Resolve value and defaultValue so undefined is never used internally.
  defaultValue = typeof defaultValue === 'undefined' ? null : defaultValue
  value = typeof value === 'undefined' ? null : value

  const componentRef = React.useRef<HTMLDivElement | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const menuRef = React.useRef<HTMLDivElement | null>(null)
  const firstRenderRef = React.useRef(true)

  // Why is selectedOption a { value: any, label: string } type?
  // While it makes consuming the component less intuitive, it actually
  // improves the internal logic by allowing us to use reference types.
  // Ultimately, this means we'll be able to compare reference types against
  // reference types rather than primitives against primitives.
  // This allows for different objects to have similar values!
  const [selectedOption, setSelectedOption] =
    React.useState<SelectOption | null>(value || defaultValue || null)
  const [isOpen, setIsOpen] = React.useState(false)

  /* ======================
        useFloating()
  ====================== */
  // https://floating-ui.com/docs/usefloating

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10), // space between trigger and menu
      flip(), // flips to top if not enough space below
      shift() // shifts to stay within viewport
    ],
    whileElementsMounted: autoUpdate // keeps position updated
  })

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /* ======================
        useEffect()
  ====================== */
  // When value changes, update selectedOption.
  // ⚠️ Gotcha: If the user implements defaultValue for an uncontrolled
  // implmentation, the defaultValue will be initialized in state, but
  // then this will override it with null.
  // Use firstRenderRef to opt out on mount.

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }
    setSelectedOption(value)
  }, [value])

  /* ======================
          return
  ====================== */

  return (
    <div
      className={cn('group relative shrink-0', className)}
      data-slot='select'
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        componentRef.current = node
      }}
      {...otherProps}
    >
      <SelectTrigger
        className={triggerClassName}
        componentRef={componentRef}
        disabled={disabled}
        error={error}
        fieldSize={fieldSize}
        isOpen={isOpen}
        menuRef={menuRef}
        onBlur={onBlur}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        ref={(node) => {
          refs.setReference(node)
          triggerRef.current = node
        }}
        selectedOption={selectedOption}
        setIsOpen={setIsOpen}
        setSelectedOption={setSelectedOption}
        style={triggerStyle}
        touched={touched}
      />

      <SelectMenu
        allowDeselect={allowDeselect}
        checkIconPosition={checkIconPosition}
        className={menuClassName}
        disabled={disabled}
        floatingStyles={floatingStyles}
        isOpen={isOpen}
        onChange={onChange}
        options={options}
        ref={(node) => {
          refs.setFloating(node)
          menuRef.current = node
        }}
        selectedOption={selectedOption}
        setIsOpen={setIsOpen}
        setSelectedOption={setSelectedOption}
        style={menuStyle}
        triggerRef={triggerRef}
      />
    </div>
  )
}
