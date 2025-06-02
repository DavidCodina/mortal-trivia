'use client'

import * as React from 'react'
import { Label } from '@/components/label'
import { FormHelp } from '@/components/FormHelp'
import { FormError } from '@/components/FormError'
import { cn } from '@/utils'
import { SelectBase } from './SelectBase'
export { type SelectOption } from './types'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type SelectProps = React.ComponentProps<typeof SelectBase> & {
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
  renderSelectBase?: (selectBase: React.JSX.Element) => React.JSX.Element
}

/* ========================================================================

======================================================================== */

export const CustomSelect = ({
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
  renderSelectBaseOnly = false,
  renderSelectBase,
  touched = false,
  ...otherProps
}: SelectProps) => {
  const uid = React.useId()
  id = id || uid

  /* ======================
      SelectBaseComponent
  ====================== */

  const SelectBaseComponent = (
    <SelectBase
      disabled={disabled}
      error={error}
      id={id}
      touched={touched}
      // i.e.,
      // allowDeselect,
      // checkIconPosition,
      // className,
      // defaultValue,
      // fieldSize,
      // menuClassName.
      // menuStyle
      // onBlur,
      // onChange,
      // options,
      // placeholder,
      // ref,
      // style,
      // triggerClassName,
      // triggerStyle
      // value,
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
    <div className={groupClassName} style={groupStyle}>
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
