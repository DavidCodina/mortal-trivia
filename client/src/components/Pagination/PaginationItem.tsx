'use client'

import { cn } from '@/utils'
import { PaginationButton, PaginationButtonProps } from './PaginationButton'

export type PaginationItemProps = PaginationButtonProps & {
  paginationButtonClassName?: string
  paginationButtonStyle?: React.CSSProperties
}

const baseClasses = `pagination-item`

/* ========================================================================
                              PaginationItem
======================================================================== */

export const PaginationItem = ({
  active = false,
  className = '',
  disabled = false,
  paginationButtonClassName = '',
  paginationButtonStyle = {},
  style = {},
  ...otherButtonProps
}: PaginationItemProps) => {
  /* ======================
          return
  ====================== */

  return (
    <li
      className={cn(baseClasses, className, disabled && 'cursor-not-allowed')}
      data-slot='pagination-item'
      style={style}
    >
      <PaginationButton
        // children, first, last, previous, next, onClick, onHoverButtonStyle, onFocusButtonStyle
        // onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ref, etc.
        {...otherButtonProps}
        active={active}
        disabled={disabled}
        className={paginationButtonClassName}
        style={paginationButtonStyle}
      />
    </li>
  )
}
