'use client'

import * as React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from '@/utils'

type AlertModalHeaderProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  title?: React.ReactNode
  titleClassName?: string
  titleStyle?: React.CSSProperties
  description?: React.ReactNode
  descriptionClassName?: string
  descriptionStyle?: React.CSSProperties
}

// --modal-border-radius is set within the baseClasses
// of AlertModalDialog: [--modal-border-radius:var(--radius-lg)]
//^ Do we need shrink-0 here?
const baseClasses = `
flex shrink-0 flex-col gap-2 px-4 pt-4 pb-2 text-center sm:text-left
rounded-t-[calc(var(--modal-border-radius)_-_1px)]
`

/* ========================================================================

======================================================================== */

export const AlertModalHeader = ({
  className,
  style,
  title,
  titleClassName,
  titleStyle,
  description,
  descriptionClassName,
  descriptionStyle,
  ...otherProps
}: AlertModalHeaderProps) => {
  /* ======================
          return
  ====================== */

  if (!title && !description) {
    return null
  }

  return (
    <div
      className={cn(baseClasses, className)}
      data-slot='modal-header'
      style={style}
      {...otherProps}
    >
      {/* Title will be <h2> by default, so definitely set fontSize. Why use this?
        Because Radix will generate an aria-labelledby attribute on the top-level dialog.
        Similarly with the Description component, it will internally tell Radix to create
        an aria-describedby attribute ont the top-level dialog. This is all pointed out 
        in this Sam Selikoff tutorial at 10:00 : https://www.youtube.com/watch?v=KvZoBV_1yYE */}
      {title && (
        <AlertDialog.Title
          className={cn(
            'text-primary text-lg leading-none font-semibold',
            titleClassName
          )}
          data-slot='modal-title'
          style={titleStyle}
        >
          {title}
        </AlertDialog.Title>
      )}

      {description && (
        <AlertDialog.Description
          className={cn('text-muted-foreground text-sm', descriptionClassName)}
          data-slot='modal-description'
          style={descriptionStyle}
        >
          {description}
        </AlertDialog.Description>
      )}
    </div>
  )
}
