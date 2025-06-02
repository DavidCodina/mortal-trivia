'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'

type FontIconProps = ComponentProps<'span'> & {
  color?: string
  fill?: boolean
  opsz?: number
  size?: number | string
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}
/* ========================================================================
                                FontIcon        
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// For icons and their names go here:   https://fonts.google.com/icons
// For docs on the system go here:      https://developers.google.com/fonts/docs/material_symbols
// For info on font-variation-settings: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
// For info on ligatures:               https://fonts.google.com/knowledge/glossary/ligature
//
// The new Material Symbols use a typographic feature called ligatures,
// which allows rendering of an icon glyph simply by using its textual name.
//
/////////////////////////
//
// Next.js will complain if you use <link> to bring in Material Symbols:
//
//   <head>
//     <link // eslint-disable-line
//       href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
//       rel='stylesheet'
//     />
//   </head>
//
//    A font-display parameter is missing (adding `&display=optional` is recommended).
//    See: https://nextjs.org/docs/messages/google-font-displayeslint@next/next/google-font-display
//    Custom fonts not added in `pages/_document.js` will only load for a single page. This is discouraged.
//    See: https://nextjs.org/docs/messages/no-page-custom-fonteslint@next/next/no-page-custom-font
//
// Unfortunately, there is no MaterialSymbols export in 'next/font/google' :
// https://github.com/vercel/next.js/discussions/42881
//
// However, we can do this in globals.css :
//
//   @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
//
// Another potential option is to use:
//
//   https://github.com/google/material-design-icons --> https://github.com/marella/material-symbols/tree/main/material-symbols#readme
//
// This should be added to layout.tsx for Next.js projects.
//
//   import 'material-symbols'
//
// However, we could instead add it directly to this component instead.
//
/////////////////////////
//
// Usage:
//
//   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
//     est, amet architecto sunt enim alias quia aliquam consequuntur{' '}
//     <FontIcon weight={900} fill className='text-rose-500'>
//       star
//     </FontIcon>{' '}
//     repellat temporibus ipsa tenetur sint soluta deserunt cum temporevoluptatibus!
//   </p>
//
///////////////////////////////////////////////////////////////////////////

export const FontIcon = ({
  children,
  className = '',
  style = {},
  weight = 400,
  fill = false,
  size = '1em',
  opsz = 48,
  color
}: FontIconProps) => {
  const fontVariationSettings = `'FILL' ${
    fill ? 1 : 0
  }, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${opsz}`

  if (typeof size === 'number' || typeof size === 'string') {
    style.fontSize = size
  }

  if (typeof color === 'string') {
    style.color = color
  }

  /* ======================
          return
  ====================== */
  return (
    <span
      className={cn('material-symbols-outlined align-middle', className)}
      style={{
        ///////////////////////////////////////////////////////////////////////////
        //
        // By default .material-symbols-outlined sets:
        //
        //   font-size: 24px;
        //   line-height: 1;
        //
        ///////////////////////////////////////////////////////////////////////////

        lineHeight: 'inherit',
        ...style,
        fontVariationSettings: fontVariationSettings
      }}
    >
      {children}
    </span>
  )
}
