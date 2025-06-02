'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '@/utils'

// Currently, it's still okay to derive types direclty from LabelPrimitive.Root
// However, because we're using Slot, it's safer to not do that, just in case
// the LabelPrimitive.Root props change in the future and some of the props
// are not compatible with ordinary HTML attributes.
// ❌ type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & ...
type LabelProps = React.ComponentProps<'label'> & {
  asChild?: boolean
  disabled?: boolean
  error?: string
  labelRequired?: boolean
  // Omit touched to prevent success styles.
  touched?: boolean
}

const baseClasses = `
flex items-center text-sm leading-none 
font-medium select-none
`

/* ========================================================================

======================================================================== */

export const Label = ({
  asChild,
  className,
  children,
  disabled = false,
  error = '',
  labelRequired,
  ref,
  // It may seem more conventional to use something like `isValid`, but
  // the combination of `error` and `touched` allows for maximum flexibility.
  touched = false,
  ...otherProps
}: LabelProps) => {
  // In some cases, we may want use <Label>, but without it being a true
  // <label> internally. For example this happens in CheckboxGroup for the
  // top-level 'label'. In such cases, we can use asChild to convert it.
  // Note: Here, we are manually asChilding the component BEFORE it ever
  // gets to LabelPrimitive.Root (which has its own asChild). If we simply
  // passed asChild through, it wouldn't work because of the <sup>. Also,
  // it's important to recognize that we are entirely removing the Radix
  // LabelPrimitive.Root and any associated behavior. In other cases, this
  // could be problematic, but LabelPrimitive.Root is pretty basic, and
  // we're not really losing much:
  // https://github.com/radix-ui/primitives/blob/main/packages/react/label/src/label.tsx
  const Component = asChild ? Slot : LabelPrimitive.Root
  const labelRef = React.useRef<HTMLLabelElement | null>(null)

  /* ======================

  ====================== */
  // Previous solution to the <sup> problem:
  // This was before using Slot and Slottable here.

  // Why implement useEffect to render the <sup> element?
  // Why not add the conditional JSX right after { children } below?
  // In some cases, we may want to use <Label asChild><div>...</div></Label>
  // If you do this, an Error will be thrown because the asChild (i.e., Slot)
  // feature expects there to be only a single child
  //
  // React.useEffect(() => {
  //   const labelElement = labelRef.current
  //   const supClasses = cn('text-destructive relative -top-1 text-[1.25em]', {
  //     'text-success': !error && touched,
  //     'text-[inherit]': disabled
  //   })
  //
  //   const supElement = document.createElement('sup')
  //
  //   if (labelElement && labelRequired) {
  //     supElement.className = supClasses
  //     supElement.textContent = '*'
  //     labelElement.appendChild(supElement)
  //   }

  //   return () => {
  //     if (labelElement && supElement.parentNode === labelElement) {
  //       labelElement.removeChild(supElement)
  //     }
  //   }
  // }, [labelRequired, error, touched, disabled])

  /* ======================
            return
  ====================== */

  return (
    <Component
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        labelRef.current = node
      }}
      data-slot='label'
      className={cn(baseClasses, className, {
        // Intentionally placed after className to always have precedence.
        'text-destructive': !!error,
        'text-success': !error && touched,
        'text-muted-foreground pointer-events-none opacity-65': disabled
      })}
      {...otherProps}
    >
      <Slottable>{children}</Slottable>

      {labelRequired && (
        <sup
          className={cn('text-destructive relative -top-1 text-[1.25em]', {
            'text-success': !error && touched,
            'text-[inherit]': disabled
          })}
        >
          *
        </sup>
      )}
    </Component>
  )
}
