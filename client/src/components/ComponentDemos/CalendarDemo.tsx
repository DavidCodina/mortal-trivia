'use client'

import * as React from 'react'
import { Calendar } from '@/components/Calendar'

/* ========================================================================

======================================================================== */

export const CalendarDemo = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className='flex flex-wrap justify-center gap-12'>
      <Calendar
        className=''
        startMonth={new Date(2025, 0)}
        endMonth={new Date(2025, 11)}
        mode='single'
        onSelect={setDate}
        selected={date}
        showOutsideDays={false}
      />

      <Calendar
        className=''
        startMonth={new Date(2025, 0)}
        endMonth={new Date(2025, 11)}
        mode='single'
        onSelect={setDate}
        selected={date}
        showOutsideDays={false}
        variant='primary'
      />

      <Calendar
        // Gets merged with root className.
        // To avoid conflicts, use one or the other only.
        className=''
        // classNames={{
        //   caption_label: 'text-primary font-semibold text-sm leading-none',
        //   weekday: `
        //   flex justify-center items-center
        //   size-8 text-xs
        //   text-primary font-semibold
        //   `
        // }}
        // autoFocus={true}
        // disabled
        // disableNavigation
        // Constrain navigation to the current year.
        startMonth={new Date(2025, 0)}
        endMonth={new Date(2025, 11)}
        // Todo: Review other modes.
        mode='single'
        onSelect={setDate}
        selected={date}
        showOutsideDays={false}
        variant='secondary'
      />
    </div>
  )
}
