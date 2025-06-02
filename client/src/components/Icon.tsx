'use client'

import React from 'react'

interface IIcon {
  className?: string
  color?: string
  name?: string
  size?: number | string
  style?: React.CSSProperties
}

/* =============================================================================
                                  Icon
============================================================================= */
// This component works in conjunction with bootstrap-icons.css, and bootstrap-icons.woff2 / woff.
// However, I have made it so it's also compatible with FontAwesome v6. Generally, I'd opt
// for just using lucide-react, but in case you're going with Bootstrap or FontAwesome, then
// there's this...

const Icon = ({
  className = '',
  color = 'currentColor',
  name = 'question-circle',
  size = 'inherit',
  style = {}
}: IIcon) => {
  const classNameParts = className.split(' ')
  const isAFontAwesomeClass =
    classNameParts.indexOf('fas') !== -1 ||
    classNameParts.indexOf('far') !== -1 ||
    classNameParts.indexOf('fal') !== -1 ||
    classNameParts.indexOf('fad') !== -1 ||
    classNameParts.indexOf('fab') !== -1
      ? true
      : false

  if (isAFontAwesomeClass) {
    return (
      <i
        className={className}
        style={{ fontSize: size, color: color, ...style }}
      ></i>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <i
      className={className ? `bi bi-${name} ${className}` : `bi bi-${name}`}
      style={{ fontSize: size, color: color, ...style }}
    ></i>
  )
}

export { Icon }
