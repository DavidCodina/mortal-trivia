'use client'

import './ButtonGroup.css'
import { cn } from '@/utils'

type ButtonGroupProps = React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/* ========================================================================
                                  ButtonGroup
======================================================================== */
// ButtonGroup.css could be converted to Tailwind.
// That said, they styles are intended to be be forced on the
// child buttons. For that reason, it actualy makes more sense
// to keep the .css file because the classes in it generally
// have a higher specificity than Tailwind utilities.
//
// ⚠️ Ultimately, you should not need this component. It was added prior
// to the introduction of ToggleGroup, which essentially is used for the same
// purpose.

export const ButtonGroup = ({
  children,
  className = '',
  orientation = 'horizontal',
  /** Used to set the border radius of the ButtonGroup and the size of child buttons. */
  size = 'md'
}: ButtonGroupProps) => {
  // Button pasdding and border radius is actually based off of em units.
  // This means that setting the size actually just entails setting the font size
  let textClass = 'text-base [&>button]:text-base'
  switch (size) {
    case 'xs':
      textClass = 'text-xs [&>button]:text-xs'
      break

    case 'sm':
      textClass = 'text-sm [&>button]:text-sm'
      break

    case 'md':
      textClass = 'text-base [&>button]:text-base'
      break

    case 'lg':
      textClass = 'text-lg [&>button]:text-lg'
      break

    case 'xl':
      textClass = 'text-xl [&>button]:text-xl'
      break

    default:
      textClass = '[&>button]:text-base'
  }

  const baseClasses = `
  ${textClass}
  rounded-[0.375em]
  shadow-[0_1px_2px_rgba(0,0,0,0.35)]
  [&>button]:leading-[1.5]
  [&>button]:active:scale-[1]
  `

  /* ======================
      
  ====================== */

  return (
    <div
      className={cn(
        baseClasses,
        {
          'btn-group': orientation === 'horizontal',
          'btn-group-vertical': orientation === 'vertical'
        },
        className
      )}
      role='group'
    >
      {children}
    </div>
  )
}
