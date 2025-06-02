'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { getClassNames } from './getClassName'

// Added everything except p-3
const baseClasses = `
inline-block
bg-background-light border rounded-xl shadow
p-3
`

export const calendarVariants = cva(baseClasses, {
  variants: {
    variant: {
      primary: `
      [--calendar-theme-color:var(--color-primary)]
      [--calendar-theme-foreground-color:var(--color-primary-foreground)]

      border-primary
      `,
      secondary: `
      [--calendar-theme-color:var(--color-secondary)]
      [--calendar-theme-foreground-color:var(--color-secondary-foreground)]
      border-secondary
      `
    }
  }
  // default variant intentionally ommitted
})

type CalendarProps = React.ComponentProps<typeof DayPicker> &
  VariantProps<typeof calendarVariants>

/* ========================================================================
                                Calendar
======================================================================== */
// The Calendar component is built on top of React DayPicker.
// Gotcha: Currently ShadCN installs "react-day-picker": "^8.10.1", which
// is way outdated! The logic here is is based off of v9 syntax..

// Todo: Review full list of DayPickerProps: https://daypicker.dev/api/type-aliases/DayPickerProps

export const Calendar = ({
  id,
  className,
  classNames,
  showOutsideDays: externalShowOutsideDays = true,
  variant,
  ...props
}: CalendarProps) => {
  const uid = React.useId()
  id = id || uid

  /* ======================
        useEffect()
  ====================== */
  // When externalShowOutsideDays is false, getClassNames()
  // sets 'invisible pointer-events-none' on the `outside` property.
  // However, in order to hide the elements from screen readers,
  // we also need to set `aria-hidden="true"` on the <td> elements.
  // Obviously, interacting with the DOM isn't the most idiomatic
  // approach, but it still works.

  React.useEffect(() => {
    const dayPicker = document.getElementById(id)

    if (externalShowOutsideDays === false) {
      if (dayPicker) {
        const outsideDays = dayPicker.querySelectorAll('[data-outside="true"]')
        outsideDays.forEach((day) => {
          day.setAttribute('aria-hidden', 'true')
        })
      }
    }

    return () => {
      if (dayPicker) {
        const outsideDays = dayPicker.querySelectorAll('[data-outside="true"]')
        outsideDays.forEach((day) => {
          day.removeAttribute('aria-hidden')
        })
      }
    }
  }, [id, externalShowOutsideDays])

  /* ======================
          return
  ====================== */

  return (
    <DayPicker
      id={id}
      // Sadly, no refs allowed.
      // ❌ ref={calendarRef}

      ///////////////////////////////////////////////////////////////////////////
      //
      // ⚠️ When showOutsideDays is set to false, the
      // alignment breaks for at least the first row of days.
      // The recommended approach in v9 is to keep showOutsideDays={true}
      // and style the outside days to be less visible or
      // non-clickable. Thus, showOutsideDays={true} is hardcoded
      // to true on DayPicker, but externalSetShowOutsideDays is
      // passed into getClassNames to conditionally set styles.
      // Initially, I tried creating a custom DayButton component.
      // However, even after wrapping it on forwardRef to get
      // arrow keys to work, the click functionality still was
      // broken such that it always bounced back to the previously
      // selected day. The docs show an example where they build
      // an additional context layer around the DayPicker, but
      // it just seems like too much complexity:
      //
      //   https://daypicker.dev/guides/custom-components
      //
      // Conslusion: do not try to implement a custom
      // DayButton!
      //
      ///////////////////////////////////////////////////////////////////////////
      showOutsideDays={true}
      className={cn(calendarVariants({ variant }), className)}
      classNames={getClassNames({
        mode: props.mode,
        classNames,
        showOutsideDays: externalShowOutsideDays,
        variant: variant
      })}
      components={{
        // https://daypicker.dev/api/functions/Chevron
        Chevron: ({
          orientation,
          disabled: _disabled, // Filter out of props passed to Icon
          ...otherChevronProps // i.e., className, size
        }) => {
          // Inside classNames, there's `chevron`. That gets
          // passed  through here as the className.
          // Note: Spreading size on Icon is okay. Lucide icons have a size prop.
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className={cn('size-4')} {...otherChevronProps} />
        }
      }}
      {...props}
    />
  )
}
