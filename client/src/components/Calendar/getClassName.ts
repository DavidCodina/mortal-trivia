import { DayPickerProps } from 'react-day-picker'
import { cn } from '@/utils'
import { buttonVariants } from '@/components'

// https://daypicker.dev/api/type-aliases/DayPickerProps
type Mode = DayPickerProps['mode']
type ClassNames = DayPickerProps['classNames']
type ShowOutsideDays = DayPickerProps['showOutsideDays']

/* ========================================================================
                              getClassNames()
======================================================================== */

export const getClassNames = ({
  mode,
  classNames, // https://daypicker.dev/api/interfaces/PropsBase#classnames
  showOutsideDays,
  variant
}: {
  classNames: ClassNames
  mode: Mode
  showOutsideDays: ShowOutsideDays
  variant: string | null | undefined
}): ClassNames => {
  const allClassNames: ClassNames = {
    /* ======================
        Enumeration: UI
    ====================== */
    // https://daypicker.dev/api/enumerations/UI

    // The root component displaying the months and the navigation bar.
    // This is the top-level container. Any styles applied using the
    // className prop are added to root. To avoid potential CSS conflicts,
    // only use the className prop.
    // ❌ root: '',

    // The container of the displayed months. This is container just inside of root.
    // It seems contains nav and month
    months: 'relative flex flex-col gap-2',

    // The navigation bar with the previous and next buttons.
    // z-1 is used so it sits on top of `month_caption` within the `months` container.
    nav: 'absolute top-0 left-0 w-full flex items-center justify-between flex-1 z-1',

    // Left arrow button only.
    button_previous: cn(
      buttonVariants({ variant: 'outline' }),
      `size-7 bg-transparent p-0`,
      // Fall back to buttonVariant style if no variant is explicitly set.
      variant
        ? `
        border-(--calendar-theme-color)
        focus-visible:ring-(--calendar-theme-color)/40
        hover:bg-(--calendar-theme-color)/10
        `
        : 'focus-visible:ring-ring/40'
    ),

    // Right arrow button only.
    button_next: cn(
      buttonVariants({ variant: 'outline' }),
      `size-7 bg-transparent p-0`,
      variant
        ? `
        border-(--calendar-theme-color)
        focus-visible:ring-(--calendar-theme-color)/40
        hover:bg-(--calendar-theme-color)/10
        `
        : 'focus-visible:ring-ring/40'
    ),

    // Exists within button_previous and button_next
    chevron: variant ? 'text-(--calendar-theme-color)' : '',

    month: 'flex flex-col gap-4',

    month_caption:
      // py-[6.5px] seems to perfectly cover the same height as nav,
      // creating the effect of a vertically centered `caption_label`.
      'flex justify-center py-[6.5px] relative items-center w-full',
    caption_label: cn(
      'text-sm font-medium leading-none',
      variant && 'text-(--calendar-theme-color)'
    ),
    // The table contains the weekdays and all day numbers.
    month_grid: 'w-full border-collapse space-x-1',

    // weekdays is inside of month_grid and is the horizontal row of weekdays.
    weekdays: 'flex',

    // weekday is the container for each weekday in weekdays.
    weekday: `
    flex justify-center items-center
    text-muted-foreground
    size-8 font-medium text-xs
    `,

    // week contains each row of day numbers
    week: 'flex w-full mt-2',

    // day is the outer container each day number in a row.
    day: cn(
      `relative p-0 text-center text-sm
      [&:has([aria-selected])]:bg-accent
      [&:has([aria-selected].day-range-end)]:rounded-r-md
      `,
      // ???
      mode === 'range'
        ? `
        [&:has(>.day-range-end)]:rounded-r-md
        [&:has(>.day-range-start)]:rounded-l-md
        first:[&:has([aria-selected])]:rounded-l-md
        last:[&:has([aria-selected])]:rounded-r-md
        `
        : '[&:has([aria-selected])]:rounded-md'
    ),

    // day_button is the inner container for the day number.
    // buttonVariants({ variant: 'ghost' }) gives it rounded corners and the hover style.
    // Note: The rdp-day-button class is used in `selected` to target the
    // child button from the day cell.
    day_button: cn(
      buttonVariants({ variant: 'ghost' }),
      `
      rdp-day-button size-8 p-0 font-normal
      focus-visible:ring-1
      aria-selected:opacity-100 outline-none
      `,
      variant &&
        `
      hover:bg-(--calendar-theme-color)/10
      dark:hover:bg-(--calendar-theme-color)/40
      focus-visible:ring-(--calendar-theme-color)
      focus-visible:text-(--calendar-theme-color)
      `
    ),

    /* ======================
      Enumeration: DayFlag
    ====================== */
    // https://daypicker.dev/api/enumerations/DayFlag

    disabled: 'text-muted-foreground opacity-50',

    focused: '',

    hidden: 'invisible',

    // outside corresponds to days outside of the current month.
    // Removed: aria-selected:text-muted-foreground
    // Styles applied to the <td data-outside="true"> element.
    outside: cn(
      'text-muted-foreground',
      !showOutsideDays && 'invisible pointer-events-none'
    ),

    today: cn(
      `
      [&_.rdp-day-button]:bg-accent
      [&_.rdp-day-button]:text-accent-foreground
      `,
      variant &&
        `
      [&_.rdp-day-button]:bg-(--calendar-theme-color)/10
      dark:[&_.rdp-day-button]:bg-(--calendar-theme-color)/40
      `
    ),

    /* ======================
    Enumeration: SelectionState
    ====================== */
    // https://daypicker.dev/api/enumerations/SelectionState

    //^ Not sure about using primary in range_end and range_start
    range_end: `
    day-range-end aria-selected:bg-primary
    aria-selected:text-primary-foreground
    `,

    range_middle:
      'aria-selected:bg-accent aria-selected:text-accent-foreground',

    range_start: `
    day-range-start
    aria-selected:bg-primary
    aria-selected:text-primary-foreground
    `,

    selected: cn(
      `
    [&_.rdp-day-button]:bg-neutral-900/15
    dark:[&_.rdp-day-button]:bg-neutral-100/25
   
    [&_.rdp-day-button]:text-foreground
    [&_.rdp-day-button]:hover:bg-neutral-200
    [&_.rdp-day-button]:hover:text-foreground
    [&_.rdp-day-button]:focus:bg-neutral-200
    [&_.rdp-day-button]:focus:text-foreground
  `,
      variant &&
        `
  [&_.rdp-day-button]:bg-(--calendar-theme-color)
  dark:[&_.rdp-day-button]:bg-(--calendar-theme-color)
  [&_.rdp-day-button]:text-(--calendar-theme-foreground-color)
  [&_.rdp-day-button]:hover:bg-(--calendar-theme-color)
  [&_.rdp-day-button]:hover:text-(--calendar-theme-foreground-color)
  [&_.rdp-day-button]:focus:bg-(--calendar-theme-color)
  [&_.rdp-day-button]:focus:text-(--calendar-theme-foreground-color)
  `
    ),

    ...classNames
  }

  return allClassNames
}
