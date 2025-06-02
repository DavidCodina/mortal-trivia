'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { InputBase } from '@/components/Input/InputBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type InputPasswordProps = Omit<
  React.ComponentProps<typeof InputBase>,
  'type'
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
  renderInputBase?: (
    inputBase: React.JSX.Element,
    inputType: string
  ) => React.JSX.Element
}

/* ========================================================================

======================================================================== */

export const InputPassword = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  fieldSize,
  groupClassName = '',
  groupStyle = {},
  id = '',
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderInputBase,
  help = '',
  helpClassName = '',
  helpStyle = {},
  touched = false,
  ...otherProps
}: InputPasswordProps) => {
  const uid = React.useId()
  id = id || uid

  const [inputType, setInputType] = React.useState<'password' | 'text'>(
    'password'
  )

  /* ======================
      InputBaseComponent
  ====================== */

  const InputBaseComponent = (
    <InputBase
      className={className}
      disabled={disabled}
      error={error}
      fieldSize={fieldSize}
      id={id}
      touched={touched}
      type={inputType}
      {...otherProps}
    />
  )

  const withPasswordButton = (
    <div className='relative'>
      {InputBaseComponent}

      <button
        className={cn(
          'text-border absolute top-1/2 right-[1px] flex aspect-square h-[calc(100%_-_2px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-[0.375em] p-[0.25em]',
          {
            'text-destructive': error && !disabled,
            'text-success': !error && !disabled && touched
          }
        )}
        onClick={() => {
          setInputType((previousValue) => {
            if (previousValue === 'password') {
              return 'text'
            }
            return 'password'
          })
        }}
        title='Toggle Password'
        type='button'
      >
        {inputType === 'password' ? (
          <Eye />
        ) : (
          <EyeOff className='h-full w-full' />
        )}
        <span className='sr-only'>
          {inputType === 'password' ? 'Show' : 'Hide'}
        </span>
      </button>
    </div>
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

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {typeof renderInputBase === 'function'
        ? renderInputBase(InputBaseComponent, inputType)
        : withPasswordButton}

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
