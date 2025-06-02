'use client'

import * as React from 'react'
import { cn } from '@/utils'

import { Label } from '@/components/label'
import { FormHelp } from '@/components/FormHelp'
import { FormError } from '@/components/FormError'
import { SelectBase } from './SelectBase'

type LabelChildren = React.ComponentProps<typeof Label>['children']

export type ReactCreatableSelectProps = React.ComponentProps<
  typeof SelectBase
> & {
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
  renderSelectBaseOnly?: boolean
  renderSelectBase?: (ReactSelectBase: React.JSX.Element) => React.JSX.Element
}

/* ========================================================================

======================================================================== */

export const ReactCreatableSelect = ({
  className = '',
  // react-select uses isDisabled instead of disabled.
  // Here, I'm allowing both for convenience but they get merged below.
  isDisabled = false,
  disabled = false,

  error = '',
  errorClassName = '',
  errorStyle = {},

  groupClassName = '',
  groupStyle = {},

  id = '',

  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},

  renderSelectBaseOnly = false,
  renderSelectBase,

  help = '',
  helpClassName = '',
  helpStyle = {},

  touched = false,

  inputId,
  instanceId,

  style = {},

  ...otherProps // value, defaultValue, etc.
}: ReactCreatableSelectProps) => {
  /* ======================
          constants
    ====================== */

  // Merge alias...
  disabled = disabled || isDisabled

  const uid = React.useId()

  //# Review inputId and instanceId logic...
  ///////////////////////////////////////////////////////////////////////////
  //
  // The id prop applied to the top-level container.
  // To add an id to the actual input, use the inputId prop.
  // In the case of react-select, this is also the value we
  // want to pass to the label's htmlFor prop.
  //
  ///////////////////////////////////////////////////////////////////////////
  inputId = inputId || uid

  ///////////////////////////////////////////////////////////////////////////
  //
  // If no instanceId is provided by the consumer, we can add one  in order to avoid the following error:
  // https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match
  // next-dev.js:20 Warning: Prop `id` did not match.
  // Server: "react-select-4-live-region" Client: "react-select-3-live-region"
  // By default, this will generate an id of react-select-xxx-input on the associated <input>.
  //
  ///////////////////////////////////////////////////////////////////////////
  instanceId = instanceId || inputId

  /* ======================
      SelectBaseComponent
  ====================== */

  const SelectBaseComponent = (
    <SelectBase
      className={className}
      error={error}
      id={id}
      isDisabled={disabled}
      instanceId={instanceId}
      inputId={inputId}
      style={style}
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

  if (renderSelectBaseOnly) {
    return SelectBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle} suppressHydrationWarning>
      {renderLabel()}

      {typeof renderSelectBase === 'function'
        ? renderSelectBase(SelectBaseComponent)
        : SelectBaseComponent}

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
