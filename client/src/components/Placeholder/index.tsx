'use client'
import { ComponentProps } from 'react'

type PlaceholderProps = ComponentProps<'div'> & {
  animation?: 'glow' | 'shine' | 'white-wave' | 'wave'
  /** Like size, color is merely for convenience. color can otherwise
   * be set through style or className props.
   */
  color?: string
  /** Sets the associated CSS class for `placeholder-${size}`,
   * with min-height's of 5px, 10px, 20px and 25px respectively.
   * This is mostly just for convenience as one could also set minHeight through
   * the className or style prop. */
  size?: 'xs' | 'sm' | 'lg' | 'xl'
}

/* =============================================================================
                                  Placeholder
============================================================================= */
// This is a custom Skeleton/Placeholder. It's much better than the default
// ShadCN Skeleton component.

export const Placeholder = ({
  animation,
  className = '',
  color = '',
  size,
  style = {},
  ...otherProps
}: PlaceholderProps) => {
  /* ======================
        getClasses()
  ====================== */

  const getClasses = () => {
    let classes = 'placeholder'

    if (size === 'xs') {
      classes = `${classes} placeholder-xs`
    } else if (size === 'sm') {
      classes = `${classes} placeholder-sm`
    } else if (size === 'lg') {
      classes = `${classes} placeholder-lg`
    } else if (size === 'xl') {
      classes = `${classes} placeholder-xl`
    }

    if (animation === 'glow') {
      classes = `${classes} placeholder-glow`
    } else if (animation === 'wave') {
      classes = `${classes} placeholder-wave`
    } else if (animation === 'white-wave') {
      classes = `${classes} placeholder-white-wave`
    } else if (animation === 'shine') {
      classes = `${classes} placeholder-shine`
    }

    if (className) {
      classes = `${classes} ${className}`
    }

    return classes
  }

  /* ======================
          return
  ====================== */

  return (
    <div
      className={getClasses()}
      style={{
        ...style,
        ...(color ? { backgroundColor: color } : {})
      }}
      {...otherProps}
    />
  )
}
