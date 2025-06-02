'use client'

import { useState } from 'react'
import { Button } from '@/components'
import { UserModal } from './UserModal'

/* ========================================================================
                          ControlledAlertModalDemo
======================================================================== */
// Conceptualize this component as if it were a Page component. Then we
// have a UserModal, which is a custom instance of RadixModal, which is
// itself a custom wrapper around Radix's Dialog.

export const ControlledAlertModalDemo = () => {
  const [open, setOpen] = useState(false)

  /* ======================
          return
  ====================== */

  return (
    <>
      <div className='text-primary fixed top-4 right-4 text-sm font-bold'>
        Alert Modal State: {open ? 'Open' : 'Closed'}
      </div>
      <UserModal
        open={open}
        onChange={setOpen}
        trigger={
          <Button
            className='mx-auto mb-6 flex'
            style={{ minWidth: 150 }}
            size='sm'
          >
            Open Alert Modal
          </Button>
        }
      />
    </>
  )
}
