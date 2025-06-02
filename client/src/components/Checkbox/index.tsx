'use client'

import * as React from 'react'
import { CheckboxBase } from './CheckboxBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

export { type CheckedState } from '@radix-ui/react-checkbox'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type CheckboxProps = React.ComponentProps<typeof CheckboxBase> & {
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  /** Used internally by CheckboxGroup */
  _hideError?: boolean
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderCheckboxBaseOnly?: boolean
}

/* ========================================================================

======================================================================== */

export const Checkbox = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  groupClassName = '',
  groupStyle = {},
  _hideError = false,
  help = '',
  helpClassName = '',
  helpStyle = {},
  id = '',
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderCheckboxBaseOnly = false,
  touched = false,
  ...otherProps
}: CheckboxProps) => {
  const uid = React.useId()
  id = id || uid

  /* ======================
    CheckboxBaseComponent
  ====================== */

  const CheckboxBaseComponent = (
    <CheckboxBase
      className={className}
      disabled={disabled}
      error={error}
      id={id}
      touched={touched}
      {...otherProps}
    />
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
        className={cn('text-xs', labelClassName)}
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

  if (renderCheckboxBaseOnly) {
    return CheckboxBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      <div className='flex items-center gap-2'>
        {CheckboxBaseComponent}
        {renderLabel()}
      </div>

      <FormHelp className={helpClassName} disabled={disabled} style={helpStyle}>
        {help}
      </FormHelp>

      {!_hideError && (
        <FormError
          className={errorClassName}
          disabled={disabled}
          style={errorStyle}
          touched={touched}
        >
          {error}
        </FormError>
      )}
    </div>
  )
}
