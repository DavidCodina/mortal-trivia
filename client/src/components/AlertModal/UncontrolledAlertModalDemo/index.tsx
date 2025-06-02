'use client'

import { Button } from '@/components'
import { UncontrolledAlertModal } from './UncontrolledAlertModal'

/* ========================================================================

======================================================================== */

export const UncontrolledAlertModalDemo = () => {
  return (
    <UncontrolledAlertModal
      trigger={
        <Button
          className='mx-auto mb-6 flex'
          style={{ minWidth: 150 }}
          size='sm'
        >
          Open Uncontrolled Alert Modal
        </Button>
      }
    />
  )
}
