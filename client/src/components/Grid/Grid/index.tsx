import * as React from 'react'

export type GridProps = React.ComponentProps<'div'> & {
  /** Shorthand for row-gap and column-gap. Use a single value, or two values separated by a space (lattter must be a string) */
  gap?: number | string
  gridTemplateColumns?: string | number
  /** Alias for gridTemplateColumns */
  cols?: string | number
  gridTemplateRows?: string | number
  /** Alias for gridTemplateRows */
  rows?: string | number
  gridAutoFlow?: string
  /** Sets the height for each grid item (instead of setting the grid items themselves.) */
  gridAutoRows?: string
  gridAutoColumns?: string
}

/* ========================================================================
                                Grid
======================================================================== */
// The Grid / GridItem system covers most use cases.
// It does not make use of grid-area syntax as that is more of a special use case.
//
// This component is more of an experiment than something to be used in production.
// Ultimately, the Tailwind grid classes work great, and there shouldn't be a need
// to actually make a component for this.

export function Grid({
  children,
  className = '',
  cols,
  gap = 0,
  gridAutoColumns = 'auto',
  gridAutoFlow = 'row',
  gridAutoRows = 'auto',
  // Normally in CSS Grid it defaults to 'none'. MainStem defaulted to:
  // gridTemplateColumns = 12,
  gridTemplateColumns = 'none',
  gridTemplateRows = 'none',
  rows,
  style = {},
  ...otherProps
}: GridProps) {
  /* ======================
      Alias Conversions
  ====================== */
  // For simplified readability and usage a consumer
  // is allowed to use cols and rows instead of
  // gridTemplateColumns and gridTemplateRows. It's
  // semantically more intuitive (i.e., similar to reactstrap) to
  // simply pass a single number. Note that cols overwrites
  // gridTemplateColumns and rows overwrites gridTemplateRows.

  if (cols) {
    gridTemplateColumns = cols
  }

  if (rows) {
    gridTemplateRows = rows
  }

  /* ======================
  gridTemplateColumns value & gridTemplateRows value shorthand conversions.
  ====================== */

  if (typeof gridTemplateColumns === 'number') {
    gridTemplateColumns = `repeat(${gridTemplateColumns}, minmax(0, 1fr))`
  }

  if (typeof gridTemplateRows === 'number') {
    gridTemplateRows = `repeat(${gridTemplateRows}, minmax(0, 1fr))`
  }

  /* ======================
          Styles
  ====================== */

  const baseStyle = {
    display: 'grid',
    gap,
    gridAutoColumns,
    gridAutoFlow,
    gridAutoRows,
    gridTemplateColumns,
    gridTemplateRows
  }

  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      className={className}
      style={{
        ...baseStyle,
        ...style
      }}
    >
      {children}
    </div>
  )
}
