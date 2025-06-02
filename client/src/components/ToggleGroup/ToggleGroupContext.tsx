'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { toggleVariants } from '@/components/Toggle'

/* ========================================================================

======================================================================== */

export const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'md',
  variant: 'default'
})
