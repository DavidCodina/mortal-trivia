'use client'

import { Button } from '@/components'
import { UncontrolledModal } from './UncontrolledModal'

/* ========================================================================
                          UncontrolledModalDemo
======================================================================== */

export const UncontrolledModalDemo = () => {
  /* ======================
          return
  ====================== */

  return (
    <UncontrolledModal
      trigger={
        <Button
          className='mx-auto mb-6 flex'
          style={{ minWidth: 150 }}
          size='sm'
        >
          Open Uncontrolled Modal
        </Button>
      }
    />
  )
}
