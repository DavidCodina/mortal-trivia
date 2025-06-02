'use client'

import { CSSProperties, ReactNode } from 'react'
import { cn } from '@/utils/index'

type BreadcrumbProps = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

// Using CSS variables here allows us to set the colors globally for all child items.
const baseClasses = `
[--breadcrumb-link-color:var(--color-primary)]
[--breadcrumb-link-hover-color:oklch(from_var(--color-primary)_calc(l_-_0.15)_c_h)]
`

/* ========================================================================

======================================================================== */

export const Breadcrumb = ({
  children,
  className = '',
  style = {}
}: BreadcrumbProps) => {
  /* ======================
          return
  ====================== */

  return (
    <nav
      aria-label='breadcrumb'
      className={cn(baseClasses, className)}
      data-slot='breadcrumb'
      style={style}
    >
      <ol
        className={
          'text-muted-foreground m-0 flex flex-wrap items-center text-sm'
        }
      >
        {children}
      </ol>
    </nav>
  )
}
