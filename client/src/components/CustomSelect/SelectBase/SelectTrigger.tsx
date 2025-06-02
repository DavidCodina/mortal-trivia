'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { ChevronDown, XIcon } from 'lucide-react'
import { cn } from '@/utils'

import { selectTriggerVariants } from './selectTriggerVariants'
import { SelectOption } from '../types'

// This could be useful in a more general sense.
// type TriggerRef = ((node: ReferenceType | null) => void) & ((node: ReferenceType | null) => void)
// import { ReferenceType } from '@floating-ui/react'

export type SelectTriggerProps = Omit<
  React.ComponentProps<'button'>,
  'onBlur' | 'onChange'
> & {
  componentRef: React.RefObject<HTMLDivElement | null>
  error?: string
  isOpen: boolean
  menuRef: React.RefObject<HTMLDivElement | null>
  onBlur?: (value: SelectOption | null) => void
  onChange?: (value: SelectOption | null) => void
  options: SelectOption[]
  placeholder: string
  selectedOption: SelectOption | null
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectOption | null>>
  touched?: boolean
} & VariantProps<typeof selectTriggerVariants>

///////////////////////////////////////////////////////////////////////////
//
// ⚠️ src/components/component-constants.tsx has its own similar mixins.
// 1. The problem with those is that they rely on focus-visible:
// That is arguably the correct modifier, but there's a quirk to it.
// For fields, we are relying on it to give focus even on direct clicks of
// form fields. However, that's not how it behaves for buttons. Consequently,
// if you want your button's focus behavior to mirror that of the form field,
// you actually need to use the focus: modifier.
//
// 2. Having said all of that, putting `group` on the top-level div of the
// CustomSelect, then using `group-focus-within` actually works best here.
// Essentially, it prevents the momentary loss of the focus ring around the
// trigger when the user click on a menu item, prior to focus being programmatically
// assigned back to the trigger button.
//
///////////////////////////////////////////////////////////////////////////

const FIELD_VALID_MIXIN = `
not-disabled:border-success
group-focus-within:border-success
group-focus-within:ring-success/40
`

const FIELD_INVALID_MIXIN = `
not-disabled:border-destructive
group-focus-within:border-destructive
group-focus-within:ring-destructive/40
`

const FIELD_DISABLED_MIXIN = `disabled:pointer-events-none disabled:opacity-65`

/* ========================================================================

======================================================================== */

export const SelectTrigger = ({
  className = '',
  componentRef, // i.e., the ref for the top-level CustomSelect
  disabled = false,
  error = '',
  fieldSize,
  isOpen,
  menuRef,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option',
  ref,
  selectedOption,
  setIsOpen,
  setSelectedOption,
  touched = false,
  ...otherProps
}: SelectTriggerProps) => {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? FIELD_DISABLED_MIXIN
    : error // i.e., !disabled && error
      ? FIELD_INVALID_MIXIN
      : touched // i.e., !disabled && !error && touched
        ? FIELD_VALID_MIXIN
        : ``

  /* ======================
      getSelectedLabel()
  ====================== */

  const getSelectedLabel = () => {
    const option = options.find((o) => o === selectedOption)
    return option ? option.label : placeholder
  }

  /* ======================
          return
  ====================== */

  return (
    <button
      className={cn(
        selectTriggerVariants({ fieldSize }),
        className,
        maybeValidationMixin
      )}
      data-slot='select-trigger'
      disabled={disabled}
      onBlur={() => {
        // Use setTimeout to create a new macrotask.
        setTimeout(() => {
          ///////////////////////////////////////////////////////////////////////////
          //
          // The onBlur should only run when the element that gets
          // focus is outside of the componentRef.current.
          // This creates the effect of a group blur.
          // This works in conjunction with the SelectMenu such that when a menu item
          // is selected, the focus is immediately transfered back to the trigger.
          //
          ///////////////////////////////////////////////////////////////////////////
          const selectComponent = componentRef.current
          const activeElement = document.activeElement

          if (selectComponent && selectComponent.contains(activeElement)) {
            // console.log('Element blurred, but was within overall component.')
            return
          }

          onBlur?.(selectedOption)
        }, 0)
      }}
      onClick={() => {
        setIsOpen((v) => !v)

        // The menu is initially null. Therefore, it makes sense to create a macrotask here
        // such that the programmatic assignment of focus is only done after everything else.
        // This helps ensure that the item is actually in the DOM.
        setTimeout(() => {
          if (!menuRef.current) {
            return
          }
          const firstMenuItem = menuRef.current.firstElementChild
          if (firstMenuItem && firstMenuItem instanceof HTMLElement) {
            firstMenuItem.focus()
          }
        }, 0)
      }}
      ref={ref}
      type='button'
      {...otherProps}
    >
      <span className={`${!selectedOption ? 'text-muted-foreground' : ''}`}>
        {getSelectedLabel()}
      </span>

      {selectedOption ? (
        <XIcon
          onClick={(e) => {
            e.stopPropagation()
            setSelectedOption(null)
            onChange?.(null)
          }}
          className={cn(
            'text-muted-foreground/50 size-[1.25em] shrink-0',
            !disabled && !error && !touched && 'hover:text-muted-foreground',
            !disabled && error && 'text-destructive',
            !disabled && !error && touched && 'text-success'
          )}
        />
      ) : (
        <ChevronDown
          className={cn(
            'text-muted-foreground/50 size-[1.5em] shrink-0 transition-transform duration-200',
            !disabled && !error && !touched && 'hover:text-muted-foreground',
            !disabled && error && 'text-destructive',
            !disabled && !error && touched && 'text-success',
            isOpen && 'rotate-180 transform'
          )}
        />
      )}
    </button>
  )
}
