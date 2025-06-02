'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button, DatePicker } from '@/components'

/* ========================================================================

======================================================================== */
// Review Date Ranger Picker: https://ui.shadcn.com/docs/components/date-picker

export const DatePickerDemo = () => {
  const [date, setDate] = React.useState<Date | undefined>()
  const [dateError, setDateError] = React.useState('')
  const [dateTouched, setDateTouched] = React.useState(false)

  /* ======================
      validateDate()
  ====================== */

  const validateDate = (value?: Date | null) => {
    value = typeof value !== 'undefined' ? value : date
    let error = ''

    if (value === null) {
      error = 'Required'
      setDateError(error)
      return error
    }

    if (!(value instanceof Date)) {
      error = 'Invalid type'
      setDateError(error)
      return error
    }

    setDateError('')
    return ''
  }

  /* ======================
          return
  ====================== */

  return (
    <DatePicker
      calendarProps={{
        variant: 'primary'
      }}
      inputProps={{
        className: 'text-left',
        groupClassName: 'mx-auto max-w-[600px] mb-6',
        help: 'This is a read-only input',
        label: 'Choose Day',
        labelRequired: true,
        placeholder: 'Pick A Date...',
        // fieldSize: 'sm',
        renderInputBase: (inputBase) => {
          return (
            <div className='flex items-center gap-2'>
              <div className='relative flex-1'>
                {inputBase}
                <CalendarIcon className='pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-neutral-500' />
              </div>

              <Button
                className=''
                onClick={() => {
                  setDate(undefined)
                  setDateError('')
                  setDateTouched(false)
                }}
                // size='sm'
                variant='info'
              >
                Clear
              </Button>
            </div>
          )
        }
      }}
      popoverProps={{
        sideOffset: 24
      }}
      // ⚠️ onBlur, onChange, error, touched and value are all set
      // directly on DatePickerProps, NOT DatePickerProps.inputProps.
      onBlur={(value) => {
        if (!dateTouched) {
          setDateTouched(true)
        }

        // In this case, we want to pass null when undefined. This is
        // important for how the current validateDate() function works
        // - similar to validateFile() function elsewhere.
        validateDate(value || null)
      }}
      onChange={(value) => {
        setDate(value)

        if (dateTouched) {
          validateDate(value || null)
        }
      }}
      error={dateError}
      touched={dateTouched}
      value={date}
    />
  )
}
