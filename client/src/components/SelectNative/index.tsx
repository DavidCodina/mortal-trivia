'use client'

import * as React from 'react'
import { useId } from 'react'
import { SelectNativeBase } from './SelectNativeBase'
import { Label } from '@/components/label'
import { FormHelp } from '@/components/FormHelp'
import { FormError } from '@/components/FormError'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']
type FieldSize = React.ComponentProps<typeof SelectNativeBase>['fieldSize']

type SelectNativeProps = React.ComponentProps<typeof SelectNativeBase> & {
  errorClassName?: string
  errorStyle?: React.CSSProperties
  fieldSize?: FieldSize
  groupClassName?: string
  groupStyle?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderSelectBase?: (selectBase: React.JSX.Element) => React.JSX.Element
  renderSelectBaseOnly?: boolean
}

/* ========================================================================

======================================================================== */
// SelectNative was created as an alternative to the other Select component,
// which uses the Radix Primitive Select. While the Radix Select provides a nicer
// UI, the trade-off is that it's much more complex to set up and use. The Radix
// Select behavior is somewhat unintuitive. This version of Select might be preferable.

export const SelectNative = ({
  children,
  className = '',
  disabled = false,
  error = '',
  errorClassName,
  errorStyle = {},
  groupClassName = '',
  groupStyle = {},
  help = '',
  helpClassName = '',
  helpStyle = {},
  id,
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  multiple = false,
  renderSelectBase,
  renderSelectBaseOnly = false,
  style = {},
  touched = false,
  ...otherProps
}: SelectNativeProps) => {
  const uid = useId()
  id = id || uid

  /* ======================
    SelectBaseComponent
  ====================== */

  const SelectBaseComponent = (
    <SelectNativeBase
      className={cn('appearance-none', className)}
      disabled={disabled}
      error={error}
      id={id}
      multiple={multiple}
      style={style}
      touched={touched}
      {...otherProps}
    >
      {children}
    </SelectNativeBase>
  )

  /* ======================
        renderLabel() 
  ====================== */

  const renderLabel = () => {
    if (!label) {
      return null
    }

    return (
      <Label
        className={cn('mb-1', labelClassName)}
        disabled={disabled}
        error={error}
        htmlFor={id}
        labelRequired={labelRequired}
        style={labelStyle}
        touched={touched}
      >
        {label}
      </Label>
    )
  }

  /* ======================
          return
  ====================== */

  if (renderSelectBaseOnly) {
    return SelectBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {typeof renderSelectBase === 'function' ? (
        renderSelectBase(SelectBaseComponent)
      ) : !multiple ? (
        <div className='relative'>
          {SelectBaseComponent}
          <ChevronDownIcon
            className={cn(
              'text-border pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2',
              {
                'text-destructive': error && !disabled,
                'text-success': !error && !disabled && touched
              }
            )}
          />
        </div>
      ) : (
        SelectBaseComponent
      )}

      <FormHelp className={helpClassName} disabled={disabled} style={helpStyle}>
        {help}
      </FormHelp>

      <FormError
        className={errorClassName}
        disabled={disabled}
        style={errorStyle}
        touched={touched}
      >
        {error}
      </FormError>
    </div>
  )
}
