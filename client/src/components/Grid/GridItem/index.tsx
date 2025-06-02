import * as React from 'react'

// gridColumnStart and gridColumnEnd have been omitted in favor of the gridColumn shorthand.
// gridRowStart and gridRowEnd have been omitted in favor of the gridRow shorthand.
export type GridItemProps = React.ComponentProps<'div'> & {
  /** Set the column start & end positions. While column width can be controlled just from the grid container,
   * using gridColumn allows for more fine-grained control (kind of like align-items is to align-self in flexbox.)
   */
  gridColumn?: string | number
  /** Alias/shorthand for gridColumn - e.g., will convert 2 to 'span 2' */
  colSpan?: number
  /** Set the row start & end positions. Depends on gridAutoRows or gridTemplateRows
   * being set on the grid container.
   */
  gridRow?: string | number
  /** Alias/shorthand for gridRow - e.g., will convert 2 to 'span 2' */
  rowSpan?: number
}

/* ========================================================================
                                GridItem
======================================================================== */

export function GridItem({
  children,
  className = '',
  colSpan,
  // Normally in CSS Grid this defaults to 'auto / auto'
  // MainStem defaulted to:
  // gridColumn = 12,
  gridColumn = 'auto / auto',
  gridRow = 'auto / auto',
  rowSpan,
  style = {},
  ...otherProps
}: GridItemProps) {
  /* ======================
      Alias Conversions
  ====================== */
  // For simplified readability and usage a consumer
  // is allowed to use colSpan and rowSpan instead of
  // gridColumn and gridRow. It's semantically more
  // intuitive (i.e., similar to table attributes) to
  // simply pass a single number. Note that colSpan
  // overwrites gridColumn and rowSpan overwrites gridRow.

  if (colSpan) {
    gridColumn = colSpan
  }

  if (rowSpan) {
    gridRow = rowSpan
  }

  /* ======================
  gridColumn value & gridRow value shorthand conversions.
  ====================== */

  if (typeof gridColumn === 'number') {
    gridColumn = `span ${gridColumn}`
  }

  if (typeof gridRow === 'number') {
    gridRow = `span ${gridRow}`
  }

  /* ======================
          Styles
  ====================== */

  const baseStyle = {
    gridColumn,
    gridRow
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
