'use client'

import { ComponentProps, ReactNode } from 'react'
import { BreadcrumbProvider } from './BreadcrumbContext'
import { Breadcrumb } from './Breadcrumb'
import { BreadcrumbItem } from './BreadcrumbItem'

type BreadcrumbWithProviderProps = ComponentProps<typeof Breadcrumb> & {
  separator?: ReactNode
}

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This Breadcrumb considers the ShadCN implemenation, but builds on top of it.
//
//   1. It has a Context baked into it. This allows the consumer to pass in
//      a separator prop that can then be propagated to the individual BreadcrumbItems.
//
//   2. The ShadCN implementation relies on the consumer composing the Breadcrumb instance
//      from all of its parts. This inlcludes Breadcrumb, BreadcrumbList, BreadcrumbItem,
//      BreadcrumbLink, BreadcrumbSeparator, etc. Conversely, this implementation seeks to
//      abstract away most but not all of the composability.
//
//   3. Each BreadcrumbItem generates its own isFirst state on mount. This allows the
//      the separator to be omitted from the first BreadcrumbItem. In contrast, the
//      ShadCN implementation opts for a more static approach based entirely on the manual
//      composition of the Breadcrumb instance.
//
///////////////////////////////////////////////////////////////////////////

const BreadcrumbWithProvider = ({
  children,
  separator,
  ...otherProps
}: BreadcrumbWithProviderProps) => {
  return (
    <BreadcrumbProvider separator={separator}>
      <Breadcrumb {...otherProps}>{children}</Breadcrumb>
    </BreadcrumbProvider>
  )
}

const CompoundComponent = Object.assign(BreadcrumbWithProvider, {
  Item: BreadcrumbItem
})

export { CompoundComponent as Breadcrumb, BreadcrumbItem }
