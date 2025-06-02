'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'

type CustomIndicatorProps = ComponentProps<'button'> & {
  isSelected: boolean
  key: number
}

const baseClasses = `
flex items-center justify-center h-4 w-4 cursor-pointer
rounded-full border-[0.5px] border-black bg-white shadow
`

/* ========================================================================
                        
======================================================================== */

export const CustomIndicator = ({
  className = '',
  isSelected,
  onClick,
  style = {},
  ...props
}: CustomIndicatorProps) => {
  return (
    <button
      className={cn(baseClasses, className)}
      onClick={onClick}
      style={style}
      type='button'
      {...props}
    >
      {isSelected && (
        <div className='h-2/3 w-2/3 rounded-full border-[0.5px] border-sky-900 bg-sky-500' />
      )}
    </button>
  )
}
