import * as React from 'react'
import { TextareaBase } from './TextareaBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type TextareaProps = React.ComponentProps<typeof TextareaBase> & {
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderTextareaBaseOnly?: boolean
}

/* ========================================================================

======================================================================== */

export const Textarea = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  groupClassName = '',
  groupStyle = {},
  help = '',
  helpClassName = '',
  helpStyle = {},
  id = '',
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderTextareaBaseOnly = false,
  touched = false,
  ...otherProps
}: TextareaProps) => {
  const uid = React.useId()
  id = id || uid

  const TextareaBaseComponent = (
    <TextareaBase
      id={id}
      className={className}
      disabled={disabled}
      error={error}
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

  if (renderTextareaBaseOnly) {
    return TextareaBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {TextareaBaseComponent}

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
