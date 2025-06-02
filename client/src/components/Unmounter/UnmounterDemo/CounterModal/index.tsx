'use client'

import * as React from 'react'
import { Button, Modal } from '@/components'

type CounterModalProps = {
  open: boolean
  onChange: React.Dispatch<React.SetStateAction<boolean>>
  trigger?: React.JSX.Element
}

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Does Radix Dialog unmount its content?
//
// By default, Radix Dialog’s <Dialog.Content> is only rendered in the DOM when the dialog is open.
// When you close the dialog, Radix removes (unmounts) the content from the DOM.
//
// In general, any content that manages some state should be abstracted into its own component.
// That way when the Modal closes, the content's state will be reset when unmounted.
//
// Conversely, if you want the state to persist, then implement the state directly
// within this component.
//
// That said, if for some reason you STILL want component state within this component to
// be wiped when the Modal closes, then we can use the Unmounter component.
//
///////////////////////////////////////////////////////////////////////////

export const CounterModal = ({
  open,
  onChange,
  trigger
}: CounterModalProps) => {
  const [count, setCount] = React.useState(0)

  /* ======================
          return
  ====================== */

  return (
    <Modal
      open={open}
      onChange={onChange}
      centered
      scrollable
      trigger={trigger}
      dialogClassName='w-[400px]'
      title='Counter'
      description='A counter that would maintain count state if not for the Unmounter component.'
      descriptionClassName='text-sm'
    >
      <Button
        onClick={() => {
          setCount((v) => v + 1)
        }}
        className='mx-auto flex min-w-[100px]'
        size='sm'
        variant='secondary'
      >
        Count: {count}
      </Button>
    </Modal>
  )
}
