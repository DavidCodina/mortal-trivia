'use client'

import * as React from 'react'
import { cn } from '@/utils'

type TableVariant = 'primary' | 'secondary'

type TableProps = React.ComponentProps<'table'> & {
  bordered?: boolean
  borderless?: boolean
  captionTop?: boolean
  /** Removes outer border from the actuatable.
   * Can be used in conjunction with bordered/borderless.
   */
  flush?: boolean
  hover?: boolean
  /** Renders the table without the container. */
  renderTableOnly?: boolean
  size?: 'xs' | 'sm'
  striped?: boolean
  stripedColumns?: boolean
  tableContainerClassName?: string
  tableContainerStyle?: React.CSSProperties
  variant?: TableVariant
}

const tableContainerBaseClasses = `shadcn-table-container`
const tableBaseClasses = `shadcn-table`

/* ========================================================================

======================================================================== */

export const Table = ({
  bordered = false,
  borderless = false,
  captionTop = false,
  className = '',
  flush = true,
  hover = false,
  renderTableOnly = false,
  size,
  striped = false,
  stripedColumns = false,
  tableContainerClassName = '',
  tableContainerStyle = {},
  variant,
  ...otherProps
}: TableProps) => {
  /* ======================
          table 
  ====================== */

  const table = (
    <table
      data-slot='table'
      className={cn(
        tableBaseClasses,
        captionTop && 'caption-top',
        bordered && 'table-bordered',
        borderless && !bordered && 'table-borderless',
        flush && 'table-flush',
        hover && 'table-hover',
        striped && 'table-striped',
        stripedColumns && 'table-striped-columns',
        { 'table-xs': size === 'xs', 'table-sm': size === 'sm' },
        {
          'shadcn-table-primary': variant === 'primary',
          'shadcn-table-secondary': variant === 'secondary'
        },
        className
      )}
      {...otherProps}
    />
  )

  /* ======================
          return
  ====================== */

  if (renderTableOnly) {
    return table
  }

  return (
    <div
      className={cn(
        tableContainerBaseClasses,
        {
          'shadcn-table-primary': variant === 'primary',
          'shadcn-table-secondary': variant === 'secondary'
        },
        tableContainerClassName
      )}
      data-slot='table-container'
      style={tableContainerStyle}
    >
      {table}
    </div>
  )
}
