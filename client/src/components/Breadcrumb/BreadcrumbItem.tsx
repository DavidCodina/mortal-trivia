'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { useBreadcrumbContext } from './BreadcrumbContext'
import { cn } from '@/utils/index'
import { BreadcrumbEllipsis } from './BreadcrumbEllipsis'

type BreadcrumbItemProps = React.ComponentProps<'a'> & {
  active?: boolean
  asChild?: boolean
  ellipsis?: boolean
  linkClassName?: string
  linkStyle?: React.CSSProperties
  underline?: 'none' | 'always' | 'hover'
}

/* ========================================================================
                                BreadcrumbItem
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// ⚠️ It's entirely the responsibility of the consumer to NOT pass
// in an href directly to the BreadcrumbItem. They will effectively
// be creating an <a href="..."> tag, that will ultimately result
// in a application refresh. Instead, they should almost always use
// the asChild prop to do something like this:
//
//   <Breadcrumb.Item asChild underline='hover'>
//     <Link href='/about'>About</Link>
//   </Breadcrumb.Item>
//
///////////////////////////////////////////////////////////////////////////

export const BreadcrumbItem = ({
  active = false,
  asChild = false,
  children,
  className = '',
  ellipsis = false,
  style = {},
  linkClassName = '',
  linkStyle = {},
  underline = 'hover',
  ...otherProps
}: BreadcrumbItemProps) => {
  const Comp = asChild ? Slot : 'a'
  const { separator } = useBreadcrumbContext()

  /* ======================
       state & refs
  ====================== */

  const listItemRef = React.useRef<HTMLLIElement | null>(null)
  const [isFirst, setIsFirst] = React.useState(false)
  // const [isLast, setIsLast] = useState(false)

  /* ======================
      useLayoutEffect()
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // Implement useLayoutEffect to run after render and before paint.
  // At the time immediately following the first render, all items
  // will have rendered and be known to the DOM. Consequently, we
  // can get the parent of BreadcrumbItem, then get the [data-slot="breadcrumb-item"]
  // children, then determine first and last items.
  //
  // Note: During development when you refresh the page, the first separator will blink out.
  // This does not happen in production. This is not related to React Strict Mode, but does
  // have to do with dev mode. In production things run quicker.
  //
  ///////////////////////////////////////////////////////////////////////////

  React.useLayoutEffect(() => {
    if (!listItemRef.current) {
      return
    }

    const parent = listItemRef.current.parentElement
    const items = parent!.querySelectorAll<HTMLElement>(
      '[data-slot="breadcrumb-item"]'
    )

    if (items.length > 0) {
      const isFirstItem = items[0] === listItemRef.current
      setIsFirst(isFirstItem)
      // const isLastItem = items[items.length - 1] === internalRef.current
      // setIsLast(isLastItem)
    }
  }, [])

  /* ======================
      renderItemChild()
  ====================== */
  // ShadCN uses BreadcrumbLink (<a>), BreadcrumbPage (<span>), or
  // BreadcrumbEllipsis (<span>) inside of each BreadcrumbItem (<li>).
  // This follows a similar approach.

  const renderItemChild = () => {
    if (ellipsis) {
      return <BreadcrumbEllipsis />
    }

    const linkClasses = cn(
      active && 'text-foreground',
      !active &&
        'text-(--breadcrumb-link-color) hover:text-(--breadcrumb-link-hover-color)',
      (active || underline === 'none') && 'no-underline',
      !active && underline === 'always' && 'underline',
      !active && underline === 'hover' && 'hover:underline',
      linkClassName
    )

    // When active, return what is essentially the BreadcrumbPage.
    if (active) {
      return (
        <span
          aria-current='page'
          aria-disabled='true'
          className={linkClasses}
          data-slot='breadcrumb-page'
          role='link'
          style={linkStyle}
          {...otherProps}
        >
          {children}
        </span>
      )
    }

    // When not !active and !ellipsis, return what is essentially the BreadcrumbLink.
    return (
      <Comp
        className={linkClasses}
        data-slot='breadcrumb-link'
        style={linkStyle}
        {...otherProps}
      >
        {children}
      </Comp>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      {!isFirst && (
        <li
          aria-hidden='true'
          className='flex items-center px-2 select-none'
          data-slot='breadcrumb-separator'
          role='presentation'
        >
          {separator}
        </li>
      )}

      <li
        className={className}
        data-slot='breadcrumb-item'
        ref={listItemRef}
        style={style}
      >
        {renderItemChild()}
      </li>
    </>
  )
}
