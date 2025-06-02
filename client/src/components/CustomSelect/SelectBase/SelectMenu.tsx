'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils'
import { SelectOption } from '../types'

type SelectMenuProps = Omit<React.ComponentProps<'div'>, 'onChange'> & {
  allowDeselect?: boolean
  /** Pasing 'left' | 'right' also servers as an opt-in for the check icon. */
  checkIconPosition?: 'left' | 'right'
  disabled?: boolean
  floatingStyles: React.CSSProperties
  isOpen: boolean
  onChange?: (value: SelectOption | null) => void
  options?: SelectOption[]
  selectedOption: SelectOption | null
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectOption | null>>
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const baseClasses = `
bg-background-light w-full max-h-screen
rounded border text-sm shadow-lg overflow-auto
`

/* ========================================================================

======================================================================== */

export const SelectMenu = ({
  allowDeselect = true,
  checkIconPosition,
  className = '',
  disabled = false,
  floatingStyles,
  isOpen,
  onChange,
  options = [],
  ref,
  selectedOption,
  setIsOpen,
  setSelectedOption,
  style = {},
  triggerRef,
  ...otherProps
}: SelectMenuProps) => {
  const internalRef = React.useRef<HTMLDivElement | null>(null)
  /* ======================
          return
  ====================== */

  if (!isOpen || disabled) {
    return null
  }

  return (
    <div
      aria-label='Select options'
      className={cn(baseClasses, className)}
      data-slot='select-menu'
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        internalRef.current = node
      }}
      role='listbox'
      style={{
        ...style,
        ...floatingStyles
      }}
      {...otherProps}
    >
      {options.map((option, index) => {
        const isActive = selectedOption === option
        return (
          <button
            aria-selected={isActive}
            key={index}
            className={cn(
              'flex w-full cursor-pointer gap-1 px-2 py-1 text-left outline-none',
              isActive && !checkIconPosition
                ? 'bg-accent'
                : `hover:bg-[oklch(from_var(--color-accent)_l_c_h_/_0.5)] focus:bg-[oklch(from_var(--color-accent)_l_c_h_/_0.5)]`
            )}
            data-slot='select-menu-item'
            onClick={() => {
              if (triggerRef.current) {
                triggerRef.current.focus()
              }

              if (allowDeselect && selectedOption === option) {
                setSelectedOption(null)
                onChange?.(null)
              } else {
                setSelectedOption(option)
                onChange?.(option)
              }

              setIsOpen(false)
            }}
            // Similar to the Radix Select behavior.
            onKeyDown={(e) => {
              /* ====== Escape ===== */

              if (e.key === 'Escape') {
                if (triggerRef.current) {
                  triggerRef.current.focus()
                  setIsOpen(false)
                  return
                }
              }

              /* ======= Tab ======= */

              if (e.key === 'Tab') {
                e.preventDefault()
                return
              }

              /* ====== Arrows ===== */

              if (
                (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                internalRef.current
              ) {
                e.preventDefault()

                const focusableItems = Array.from(
                  internalRef.current.querySelectorAll(
                    "[data-slot='select-menu-item']:not([disabled])"
                  )
                )
                const currentIndex = focusableItems.indexOf(
                  document.activeElement as HTMLElement
                )

                if (e.key === 'ArrowUp') {
                  const prevItem = focusableItems[currentIndex - 1]

                  if (prevItem && prevItem instanceof HTMLElement) {
                    prevItem?.focus()
                  }
                } else if (e.key === 'ArrowDown') {
                  const nextItem = focusableItems[currentIndex + 1]
                  if (nextItem && nextItem instanceof HTMLElement) {
                    nextItem?.focus()
                  }
                }
              }
            }}
            role='option'
          >
            {isActive && checkIconPosition === 'left' && (
              <Check className='text-success size-[1.25em] shrink-0' />
            )}
            {option.label}

            {isActive && checkIconPosition === 'right' && (
              <Check className='text-success ml-auto size-[1.25em] shrink-0' />
            )}
          </button>
        )
      })}
    </div>
  )
}
