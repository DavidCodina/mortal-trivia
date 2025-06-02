'use client'

import { useState } from 'react'
import { Button } from '@/components'
import { CounterModal } from './CounterModal'
import { Unmounter } from '../'

/* ========================================================================

======================================================================== */

export const UnmounterDemo = () => {
  const [open, setOpen] = useState(false)

  /* ======================
          return
  ====================== */

  return (
    <>
      {/* Normally, we'd pass Button into the Modal's trigger prop. That's always best
      because the Radix Modal gives focus back to the button when it closes. However, 
      in this case the trigger needs to be external to the Modal. */}
      <Button
        className='mx-auto mb-6 flex'
        onClick={() => {
          setOpen(true)
        }}
        style={{ minWidth: 150 }}
        size='sm'
      >
        Open Modal
      </Button>

      <Unmounter
        show={open}
        remountDelay={100}
        shouldRemount
        unmountDelay={300}
      >
        <CounterModal open={open} onChange={setOpen} />
      </Unmounter>
    </>
  )
}
