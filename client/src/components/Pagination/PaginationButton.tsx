'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { cn } from '@/utils'

export type PaginationButtonProps = React.ComponentProps<'button'> & {
  active?: boolean
  first?: boolean
  last?: boolean
  next?: boolean
  previous?: boolean
}

const baseClasses = `pagination-button`

/* ========================================================================
                              PaginationButton
======================================================================== */
// first, previous, next and last props should also set the aria labeling.
// See how reactstrap does it...

export const PaginationButton = ({
  active = false,
  children,
  disabled = false,
  first = false,
  last = false,
  next = false,
  previous = false,
  className = '',
  style = {},
  ref,
  ...otherProps
}: PaginationButtonProps) => {
  /* ======================
      renderContent()
  ====================== */

  // const renderContent = () => {
  //   let content = children
  //   if (first) {
  //     content = children ? `« ${children}` : '«'
  //   } else if (last) {
  //     content = children ? `${children} »` : '»'
  //   } else if (previous) {
  //     content = children ? `‹ ${children}` : '‹'
  //   } else if (next) {
  //     content = children ? `${children} ›` : '›'
  //   }
  //   return content
  // }

  const renderContent = () => {
    let content = children
    if (first) {
      content = children ? (
        <>
          <ChevronsLeft className='size-[1em]' />
          {children}
        </>
      ) : (
        <ChevronsLeft className='size-[1em]' />
      )
    } else if (last) {
      content = children ? (
        <>
          {children}
          <ChevronsRight className='size-[1em]' />
        </>
      ) : (
        <ChevronsRight className='size-[1em]' />
      )
    } else if (previous) {
      content = children ? (
        <>
          <ChevronLeft className='size-[1em]' />
          {children}
        </>
      ) : (
        <ChevronLeft className='size-[1em]' />
      )
    } else if (next) {
      content = children ? (
        <>
          {children}
          <ChevronRight className='size-[1em]' />
        </>
      ) : (
        <ChevronRight className='size-[1em]' />
      )
    }
    return content
  }

  /* ======================
          return
  ====================== */

  return (
    <button
      {...otherProps}
      className={cn(
        baseClasses,
        className,
        !disabled && active && 'pagination-active',
        disabled && 'pagination-disabled'
      )}
      data-slot='pagination-button'
      disabled={disabled}
      ref={ref}
      style={style}
      type='button'
    >
      {renderContent()}
    </button>
  )
}
