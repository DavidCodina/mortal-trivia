'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utils'

type SliderBaseProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  'onValueCommit' | 'onBlur' | 'onChange' | 'onValueChange'
> & {
  error?: string
  labelAlwaysOn?: boolean // Like Mantine
  onChange?: ((value: number[]) => void) | undefined
  onCommit?: ((value: number[]) => void) | undefined
  onBlur?: ((value: number[]) => void) | undefined
  showLabelOnHover?: boolean // Like Mantine
  touched?: boolean
}

const rootBaseClasses = `
relative flex w-full items-center
touch-none select-none
data-[orientation=vertical]:h-full
data-[orientation=vertical]:min-h-44
data-[orientation=vertical]:w-auto
data-[orientation=vertical]:flex-col
data-[disabled]:opacity-65
`

const trackBaseClasses = `
bg-accent relative grow overflow-hidden rounded-full
data-[orientation=horizontal]:h-1.5
data-[orientation=horizontal]:w-full
data-[orientation=vertical]:h-full
data-[orientation=vertical]:w-1.5
`

const rangeBaseClasses = `
bg-primary absolute
data-[orientation=horizontal]:h-full
data-[orientation=vertical]:w-full
`

// Gotcha: ShadCN originally used the `disabled:` variant.
// However, the SliderPrimitive.Root doesn't actually get the
// disabled attribute. Instead it gets `data-disabled`. The
// management of disabled styles has been moved into the
// maybeValidationMixin in the Slider component.
const thumbBaseClasses = `
block size-4 shrink-0
border-primary bg-background-light
rounded-full border shadow
transition-[color,box-shadow]
ring-primary/40
hover:ring-[3px] focus-visible:ring-[3px]
focus-visible:outline-hidden
`

/* ========================================================================

======================================================================== */

export const SliderBase = ({
  className,
  defaultValue,
  disabled = false,
  error = '',
  labelAlwaysOn = false,
  onBlur,
  onChange,
  onCommit,
  ref,
  value: controlledValue,
  min = 0,
  max = 100,
  showLabelOnHover = true,
  onMouseEnter,
  onMouseLeave,
  touched = false,
  ...otherProps
}: SliderBaseProps) => {
  /* ======================
      state & refs
  ====================== */

  const firstRenderRef = React.useRef(true)
  const sliderRef = React.useRef<HTMLSpanElement>(null)

  const [value, setValue] = React.useState(() => {
    if (Array.isArray(controlledValue) && controlledValue.length > 1) {
      return controlledValue
    }

    if (Array.isArray(defaultValue) && defaultValue.length > 1) {
      return defaultValue
    }
    return [min, max]
  })

  const [isHovered, setIsHovered] = React.useState(false)

  // const value = React.useMemo(
  //   () =>
  //     Array.isArray(controlledValue)
  //       ? controlledValue
  //       : Array.isArray(defaultValue)
  //         ? defaultValue
  //         : [min, max],
  //   [controlledValue, defaultValue, min, max]
  // )

  /* ======================
    maybeValidationMixin
  ====================== */
  // In this case, FIELD_INVALID_MIXIN & FIELD_VALID_MIXIN make no difference here.

  const maybeValidationMixin = disabled
    ? `
    pointer-events-none opacity-65
    [&_[data-slot=slider-range]]:bg-neutral-400
    [&_[data-slot=slider-thumb]]:border-neutral-400
    `
    : error // i.e., !disabled && error
      ? `
      [&_[data-slot=slider-range]]:bg-destructive
      [&_[data-slot=slider-thumb]]:ring-destructive/40
      [&_[data-slot=slider-thumb]]:border-destructive
      `
      : touched // i.e., !disabled && !error && touched
        ? `
         [&_[data-slot=slider-range]]:bg-success
         [&_[data-slot=slider-thumb]]:ring-success/40
         [&_[data-slot=slider-thumb]]:border-success
        `
        : ``

  /* ======================
        useEffect()
  ====================== */
  // Every time controlledValue changes, conditionally call
  // setValue(controlledValue)

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }
    if (
      typeof controlledValue !== 'undefined' &&
      Array.isArray(controlledValue) &&
      JSON.stringify(controlledValue) !== JSON.stringify(value)
    ) {
      setValue(controlledValue)
    }
  }, [controlledValue]) // eslint-disable-line

  /* ======================
        renderThumbLabel()
    ====================== */

  const renderThumbLabel = (val: number) => {
    return (
      <div
        className={cn(
          'bg-background-light text-foreground absolute -top-1/4 left-1/2 justify-center rounded border text-xs',
          labelAlwaysOn || (showLabelOnHover && isHovered) ? 'flex' : 'hidden'
        )}
        style={{
          transform: 'translate(-50%, -100%)',
          lineHeight: 1,
          padding: 2,
          boxShadow: '0px 0.5px 0.5px rgba(0,0,0,0.5)',
          minWidth: 20
        }}
      >
        {val}
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <SliderPrimitive.Root
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(rootBaseClasses, className, maybeValidationMixin)}
      data-slot='slider'
      defaultValue={defaultValue}
      disabled={disabled}
      min={min}
      max={max}
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        sliderRef.current = node
      }}
      onBlur={() => {
        // Use setTimeout to create a new macrotask.
        setTimeout(() => {
          // The onBlur should only run when the element that gets
          // focus is outside of the slider container.
          // This creates the effect of a group blur.
          // By default, the slider would blur on each thumb.
          const slider = sliderRef.current
          const activeElement = document.activeElement
          if (slider && slider.contains(activeElement)) {
            return
          }
          onBlur?.(value)
        }, 0)
      }}
      onValueCommit={(value) => {
        // Initially, setting the internal value only on commit was the most
        // optimized solution. However, with the introduction of the thumb
        // label feature it became necessary to update value onValueChange instead.
        // ❌ setValue(value)
        onCommit?.(value)
      }}
      onValueChange={(value) => {
        setValue(value)
        onChange?.(value)
      }}
      value={controlledValue}
      {...otherProps}
      onMouseEnter={(e) => {
        setIsHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        onMouseLeave?.(e)
      }}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(trackBaseClasses)}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn(rangeBaseClasses)}
        />
      </SliderPrimitive.Track>

      {value.map((val, index) => {
        return (
          <SliderPrimitive.Thumb
            data-slot='slider-thumb'
            key={index}
            className={thumbBaseClasses}
          >
            {renderThumbLabel(val)}
          </SliderPrimitive.Thumb>
        )
      })}
    </SliderPrimitive.Root>
  )
}
