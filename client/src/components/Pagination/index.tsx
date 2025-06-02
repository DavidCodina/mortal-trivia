'use client'

import { cn } from '@/utils'
import { PaginationItem } from './PaginationItem'
import { IPagination } from './types'

/* ========================================================================
                                Pagination
======================================================================== */

const Pagination = ({
  children,
  className = '',
  paginationSize,
  style = {},
  ...otherProps
}: IPagination) => {
  /* ======================
          return
  ====================== */

  return (
    <ul
      className={cn(
        'pagination select-none',
        paginationSize === 'small' && 'pagination-sm',
        paginationSize === 'large' && 'pagination-lg',
        className
      )}
      data-slot='pagination'
      style={style}
      {...otherProps}
    >
      {children}
    </ul>
  )
}

const CompoundComponent = Object.assign(Pagination, {
  Item: PaginationItem
})

export { CompoundComponent as Pagination, PaginationItem }
