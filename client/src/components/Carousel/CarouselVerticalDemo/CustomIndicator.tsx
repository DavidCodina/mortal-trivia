'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'

type CustomIndicatorProps = Omit<ComponentProps<'button'>, 'onClick'> & {
  isSelected: boolean
  key: number
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

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
      className={cn(
        `flex h-4 w-4 items-center justify-center rounded-full border-[0.5px] border-black bg-white shadow`,
        className
      )}
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
