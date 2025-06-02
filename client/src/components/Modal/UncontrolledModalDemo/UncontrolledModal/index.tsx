'use client'

import { Modal, ModalProps } from '../../'
import { Button } from '@/components'

/* ========================================================================
                              UncontrolledModal
======================================================================== */

export const UncontrolledModal = ({ trigger, ...otherProps }: ModalProps) => {
  /* ======================
          return
  ====================== */

  return (
    <Modal
      centered
      scrollable
      // defaultOpen
      // disableAnimation
      // fullscreen
      trigger={trigger}
      // headerClassName=''
      title='Uncontrolled Modal'
      // titleClassName=''
      description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, eligendi.'
      // descriptionClassName=''
      // bodyClassName=''
      // bodyStyle={{ }}
      closeButton={false}
      contentClassName=''
      footer={
        <Modal.Close asChild>
          <Button
            className='min-w-[100px]'
            type='button'
            size='sm'
            style={{}}
            variant='success'
          >
            Accept
          </Button>
        </Modal.Close>
      }
      footerClassName='justify-end'
      {...otherProps}
    >
      <p className='mb-4 text-sm'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        eaque numquam culpa, quisquam commodi explicabo dignissimos deleniti
        obcaecati accusantium necessitatibus id provident pariatur eum officiis
        sunt distinctio itaque libero. Qui excepturi provident odit quos eaque
        quasi vitae, dolore quo dolores maxime mollitia dolorum recusandae,
        labore aperiam ratione facilis delectus dolorem!
      </p>

      <p className='mb-4 text-sm'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        eaque numquam culpa, quisquam commodi explicabo dignissimos deleniti
        obcaecati accusantium necessitatibus id provident pariatur eum officiis
        sunt distinctio itaque libero. Qui excepturi provident odit quos eaque
        quasi vitae, dolore quo dolores maxime mollitia dolorum recusandae,
        labore aperiam ratione facilis delectus dolorem!
      </p>

      <p className='text-sm'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        eaque numquam culpa, quisquam commodi explicabo dignissimos deleniti
        obcaecati accusantium necessitatibus id provident pariatur eum officiis
        sunt distinctio itaque libero. Qui excepturi provident odit quos eaque
        quasi vitae, dolore quo dolores maxime mollitia dolorum recusandae,
        labore aperiam ratione facilis delectus dolorem!
      </p>
    </Modal>
  )
}
