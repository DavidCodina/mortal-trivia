'use client'

import * as React from 'react'
import { Button } from '@/components'
import { Collapse } from './'

/* ========================================================================

======================================================================== */

export const CollapseDemo = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        className='mx-auto my-5 flex'
        onClick={() => {
          setOpen((v) => !v)
        }}
        size='sm'
        variant='success'
      >
        Toggle Collapse
      </Button>

      <Collapse isOpen={open} duration={300} className='mx-auto max-w-[800px]'>
        <div className='bg-background-light rounded-lg border p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </Collapse>
    </>
  )
}
