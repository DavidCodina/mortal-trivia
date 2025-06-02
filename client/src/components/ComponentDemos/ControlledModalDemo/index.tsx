'use client'

import { useState } from 'react'
import { Button } from '@/components'
import { UserModal } from './UserModal'

/* ========================================================================
                          ControlledModalDemo
======================================================================== */
// Conceptualize this component as if it were a Page component. Then we
// have a UserModal, which is a custom instance of RadixModal, which is
// itself a custom wrapper around Radix's Dialog.

export const ControlledModalDemo = () => {
  const [open, setOpen] = useState(false)

  /* ======================
          return
  ====================== */

  return (
    <UserModal
      open={open}
      onChange={setOpen}
      trigger={
        <Button
          className='mx-auto mb-6 flex'
          style={{ minWidth: 150 }}
          size='sm'
        >
          Open Modal
        </Button>
      }
    />
  )
}
