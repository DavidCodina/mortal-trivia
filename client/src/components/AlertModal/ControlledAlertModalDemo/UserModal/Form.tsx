'use client'
import { useState, useEffect } from 'react'
import {
  // AlertModal,
  AlertModalCancel
  // AlertModalAction
} from '../../.'
import { Button, Input } from '@/components'
import { sleep } from 'utils'

type FormProps = {
  onSubmitted: VoidFunction
}

/* ========================================================================
                                    Form
======================================================================== */

export const Form = ({ onSubmitted }: FormProps) => {
  const [pending, setPending] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    console.log('Form mounted.')
    return () => {
      console.log('Form unmounted.')
    }
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <form onSubmit={(e) => e.preventDefault()} className='-mt-2 space-y-4'>
      <Input
        label='First Name'
        labelClassName='text-primary font-bold text-sm'
        autoComplete='off'
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value)
        }}
      />

      <Input
        label='Last Name'
        labelClassName='text-primary font-bold text-sm'
        autoComplete='off'
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value)
        }}
      />

      <div className='flex justify-end gap-2'>
        {/* Use Modal.Cancel for the synchronous closing. */}
        <AlertModalCancel asChild>
          <Button
            className='min-w-[100px]'
            size='sm'
            type='button'
            variant='destructive'
          >
            Cancel
          </Button>
        </AlertModalCancel>

        {/* 
          ⚠️ The Radix AlertDialog exposes AlertDialog.Action and AlertDialog.Cancel.
          Both components are used to close the AlertDialog, similar to Dialog's Alert.Close.
          However, the naming convention is intended to emphasize the fact that AlertDialog 
          is designed for critical interactions.

          The problem with AlertDialog.Action is that there's no way to
          make it wait for async logic to complete:

            <AlertModalAction asChild>
              <Button
                className='min-w-[100px]'
                onClick={async (e) => {
                  setPending(true)
                  await sleep(3000) // ⚠️ AlertDialog will already have closed.
                  setPending(false)
                }}
                loading={pending}
                loadingClassName='mr-1'
                size='sm'
                type='button'
                variant='success'
              >
                {pending ? 'Saving...' : 'Save'}
              </Button>
            </AlertModalAction>

          Consequently, in practice it's often better to not use AlertModalAction at all.
          In cases where you need to await asynchronous logic prior to closing, don't use
          AlertModalAction. Instead, to await async logic, use a controlled implementation that 
          leverages the top-level onChange prop. For example, here onSubmitted is actually 
          programmatically closing the Modal: onSubmitted={() => { onChange(false) }}
          
          To be fair, this isn't really a shortcoming of AlertDialog.Action. The same criticism can be
          made against the Radix Dialog.Close. It's more an issue of choosing the right tool for the job.
        */}

        <Button
          className='min-w-[100px]'
          onClick={async () => {
            setPending(true)
            await sleep(3000)
            setPending(false)
            onSubmitted?.()
          }}
          loading={pending}
          loadingClassName='mr-1'
          size='sm'
          type='button'
          variant='success'
        >
          {pending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
