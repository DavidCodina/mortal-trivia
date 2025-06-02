'use client'

import * as React from 'react'
// import { Button } from '@/components'
import { AlertModal } from '../../'
// import { CustomCloseButton } from './CustomCloseButton'
import { Form } from './Form'

type UserModalProps = {
  open: boolean
  onChange: React.Dispatch<React.SetStateAction<boolean>>
  trigger: React.JSX.Element
}

/* ========================================================================
                                UserModal
======================================================================== */

export const UserModal = ({ open, onChange, trigger }: UserModalProps) => {
  // const [count, setCount] = React.useState(0)

  /* ======================
          return
  ====================== */

  return (
    <AlertModal
      open={open}
      onChange={onChange}
      // disableAnimation
      centered
      scrollable
      // fullscreen
      // You almost always want to use the trigger prop over an external/programmatic trigger.
      // Why? Because the button is implemented with Radix's Trigger, then by default focus will go
      // back to the trigger element when the dialog/modal is closed. This is not true if one was
      // using some random programmatic button.
      trigger={trigger}
      // dialogClassName='w-[800px] [--modal-dialog-spacing:50px] [--modal-border-radius:24px]'
      // dialogStyle={{ outline: '2px dashed red' }}
      // headerClassName='border-2 border-red-500'
      // headerStyle={{ border: '2px solid red' }}
      title='Edit User Info'
      // titleClassName='text-blue-500'
      // titleStyle={{ color: 'red' }}
      description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, eligendi.'
      descriptionClassName='text-sm'
      //  descriptionStyle={{ color: 'red' }}
      // closeButton={<CustomCloseButton />}
      // closeButton={true}

      // footerClassName=''
      // footer={
      //   <>
      //     <Button
      //       onClick={() => {
      //         setCount((v) => v + 1)
      //       }}
      //       className='min-w-[100px]'
      //       size='sm'
      //       variant='secondary'
      //     >
      //       Count: {count}
      //     </Button>
      //   </>
      // }
    >
      <Form
        onSubmitted={() => {
          onChange(false)
        }}
      />
    </AlertModal>
  )
}
