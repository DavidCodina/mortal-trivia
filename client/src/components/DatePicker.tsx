'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { cn } from '@/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Input } from '@/components'
import { Calendar } from '@/components/Calendar'
import { Popover } from '@/components'

type CalendarProps = Omit<
  React.ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect'
>

// onBlur, onChange, error and touched were omitted here, so
// that they can be redefined directly on DatePickerProps.
type InputProps = Omit<
  React.ComponentProps<typeof Input>,
  | 'onBlur'
  | 'onChange'
  | 'touched'
  | 'error'
  | 'readOnly'
  | 'type'
  | 'value'
  | 'defaultValue'
>
type PopoverProps = Omit<
  React.ComponentProps<typeof Popover>,
  'open' | 'onOpenChange' | 'trigger'
>

type DatePickerProps = {
  calendarProps?: CalendarProps
  error?: string
  inputProps?: InputProps
  onBlur?: (value: Date | undefined) => void
  onChange?: (value: Date | undefined) => void
  popoverProps?: PopoverProps
  touched?: boolean
  /** DatePicker is a controlled component. value is required - even if undefined. */
  value: Date | undefined
}

/* ========================================================================

======================================================================== */

export const DatePicker = ({
  calendarProps = {},
  error = '',
  inputProps = {},
  onBlur,
  onChange,
  popoverProps = {},
  touched = false,
  value
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const popoverContentRef = React.useRef<HTMLDivElement>(null)

  /* ======================
          return
  ====================== */

  return (
    <>
      <Popover
        {...popoverProps}
        className={cn(
          'w-auto border-none bg-transparent p-0 shadow-none',
          typeof popoverProps.className === 'string' && popoverProps.className
        )}
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
        }}
        popoverContentRef={popoverContentRef}
        trigger={
          <Input
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect='off'
            spellCheck={false}
            renderInputBase={(inputBase) => {
              return (
                <div className='relative'>
                  {inputBase}
                  <CalendarIcon className='pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-neutral-500' />
                </div>
              )
            }}
            // Intentionally placed AFTER renderInputBase and BEFORE onBlur, readOnly, touched and value.
            {...inputProps}
            onBlur={() => {
              // Create a new macrotask. This is crucial for running the logic last.
              // Otherwise, activeElement will likely point to <body> instead of
              // potentially pointing to a DOM node in the Calendar (i.e., Previous button).
              setTimeout(() => {
                const activeElement = document.activeElement

                // Return early if the new activeElement is actually part of
                // the popover menu (this includes the Calendar component).
                if (
                  popoverContentRef.current &&
                  popoverContentRef.current.contains(activeElement)
                ) {
                  return
                }

                onBlur?.(value)
              }, 0)
            }}
            readOnly
            error={error}
            touched={touched}
            value={
              value
                ? format(value, 'PPP')
                : typeof inputProps.placeholder === 'string'
                  ? inputProps.placeholder
                  : 'Pick A Date...'
            }
          />
        }
      >
        <Calendar
          {...calendarProps}
          mode='single'
          selected={value}
          onSelect={(value) => {
            setOpen(false)
            onChange?.(value)
          }}
        />
      </Popover>
    </>
  )
}
