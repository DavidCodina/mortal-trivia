'use client'

import * as React from 'react'
import { SwitchBase } from './SwitchBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type SwitchProps = React.ComponentProps<typeof SwitchBase> & {
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  label?: LabelChildren
  labelOn?: LabelChildren
  labelOff?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderSwitchBaseOnly?: boolean
}

/* ===================================d=====================================

======================================================================== */

export const Switch = ({
  checked: controlledChecked,
  className = '',
  defaultChecked,
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
  labelOn = '',
  labelOff = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  onChange,
  renderSwitchBaseOnly = false,
  touched = false,
  ...otherProps
}: SwitchProps) => {
  // If id is not set, then fallback to using React's useId() hook.
  const uuid = React.useId()
  id = id || uuid

  /* ======================
        state & refs
  ====================== */

  // The checked state is used internally to manage the display onText/offText.
  // checked state must be updated when onCheckedChange() is called and when
  // controlledChecked changes.
  const [checked, setChecked] = React.useState(() => {
    if (typeof controlledChecked === 'boolean') {
      return controlledChecked
    }
    if (typeof defaultChecked === 'boolean') {
      return defaultChecked
    }
    return false
  })

  const firstRenderRef = React.useRef(true)

  /* ======================
    SwitchBaseComponent
  ====================== */

  const SwitchBaseComponent = (
    <SwitchBase
      checked={controlledChecked}
      className={className}
      defaultChecked={defaultChecked}
      disabled={disabled}
      error={error}
      id={id}
      onChange={(checked) => {
        setChecked(checked)
        onChange?.(checked)
      }}
      touched={touched}
      {...otherProps}
    />
  )

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }

    if (
      typeof controlledChecked === 'boolean' &&
      controlledChecked !== checked
    ) {
      setChecked(controlledChecked)
    }

    // Omit checked from the dependency array.
  }, [controlledChecked]) // eslint-disable-line

  /* ======================
        renderLabel()
  ====================== */

  const renderLabel = () => {
    const onNode = labelOn || label
    const offNode = labelOff || label

    if (!onNode || !offNode) {
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
        {checked ? onNode : offNode}
      </Label>
    )
  }

  /* ======================
          return
  ====================== */

  if (renderSwitchBaseOnly) {
    return SwitchBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      <div className='flex items-center gap-2'>
        {SwitchBaseComponent}
        {renderLabel()}
      </div>

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
