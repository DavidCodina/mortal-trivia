'use client'

import * as React from 'react'
import { Modal } from '@/components'
// import { CustomCloseButton } from './CustomCloseButton'
import { Form } from './Form'

type UserModalProps = {
  // Optional in RadixModal, but required in the UserModal instance. // ???
  open: boolean
  // Optional in RadixModal, but required in the UserModal instance.
  onChange: React.Dispatch<React.SetStateAction<boolean>>
  // Optional in RadixModal, but required in the UserModal instance.
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
    <Modal
      open={open}
      onChange={onChange}
      // closeOnOverlayClick={false}
      // disableAnimation
      centered
      scrollable
      // fullscreen
      // You almost always want to use the trigger prop over an external/programmatic trigger.
      // Why? Because the button is implemented with Radix's Trigger, then by default focus will go
      // back to the trigger element when the dialog/modal is closed. This is not true if one was
      // using some random programmatic button.
      trigger={trigger}
      dialogClassName='w-[600px] [--modal-dialog-spacing:24px] [--modal-border-radius:12px]'
      // dialogStyle={{ outline: '2px dashed red' }}
      // headerClassName='border-2 border-red-500'
      // headerStyle={{ border: '2px solid red' }}
      title='Edit User Info'
      // titleClassName='text-blue-500'
      // titleStyle={{ color: 'red' }}
      description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, eligendi.'
      descriptionClassName='text-sm'
      // descriptionStyle={{ color: 'red' }}
      // closeButton={<CustomCloseButton />}

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
      {/* Does Radix Dialog unmount its content?

      By default, Radix Dialog’s <Dialog.Content> is only rendered in the DOM when the dialog is open. 
      When you close the dialog, Radix removes (unmounts) the content from the DOM.
      
      In general, any content that manages some state should be abstracted into its own component.
      That way when the Modal closes, the content's state will be reset when unmounted.
      
      Conversely, if you want the state to persist (e.g., a modal that shows API data that rarely changes).
      Then implement the state directly within this component. */}
      <Form
        onSubmitted={() => {
          onChange(false)
        }}
      />
      {/* <p className='mb-4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
        dolorem magnam ipsam numquam esse officiis eum cupiditate quas
        aspernatur est non qui iusto architecto voluptate expedita natus dicta
        distinctio fugit, deleniti veritatis dolor reprehenderit? Illo, dolores
        iusto voluptas voluptatum fugit ipsa suscipit repudiandae officiis
        voluptatem dolorum esse aspernatur id corporis, voluptate modi
        reprehenderit dolor alias saepe eaque iure asperiores dolore, error ut.
        Nisi exercitationem natus excepturi consequatur ex nam rerum aspernatur
        ipsum doloribus dicta ratione quisquam qui veritatis ad delectus porro
        tenetur sint quaerat blanditiis, veniam minus in aut? Esse ab quas,
        maiores eligendi pariatur iure facere odit et vel.
      </p>

      <p className='mb-4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
        dolorem magnam ipsam numquam esse officiis eum cupiditate quas
        aspernatur est non qui iusto architecto voluptate expedita natus dicta
        distinctio fugit, deleniti veritatis dolor reprehenderit? Illo, dolores
        iusto voluptas voluptatum fugit ipsa suscipit repudiandae officiis
        voluptatem dolorum esse aspernatur id corporis, voluptate modi
        reprehenderit dolor alias saepe eaque iure asperiores dolore, error ut.
        Nisi exercitationem natus excepturi consequatur ex nam rerum aspernatur
        ipsum doloribus dicta ratione quisquam qui veritatis ad delectus porro
        tenetur sint quaerat blanditiis, veniam minus in aut? Esse ab quas,
        maiores eligendi pariatur iure facere odit et vel.
      </p>

      <p className='mb-0'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
        dolorem magnam ipsam numquam esse officiis eum cupiditate quas
        aspernatur est non qui iusto architecto voluptate expedita natus dicta
        distinctio fugit, deleniti veritatis dolor reprehenderit? Illo, dolores
        iusto voluptas voluptatum fugit ipsa suscipit repudiandae officiis
        voluptatem dolorum esse aspernatur id corporis, voluptate modi
        reprehenderit dolor alias saepe eaque iure asperiores dolore, error ut.
        Nisi exercitationem natus excepturi consequatur ex nam rerum aspernatur
        ipsum doloribus dicta ratione quisquam qui veritatis ad delectus porro
        tenetur sint quaerat blanditiis, veniam minus in aut? Esse ab quas,
        maiores eligendi pariatur iure facere odit et vel.
      </p> */}
    </Modal>
  )
}
