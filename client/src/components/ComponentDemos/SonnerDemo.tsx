'use client'

import { toast /* useSonner */ } from 'sonner'
import { Button } from '@/components'
// import { Trophy } from 'lucide-react'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
//   type ExternalToast = Omit<ToastT, 'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'> & {
//     id?: number | string;
//   };
//
//   So...
//
//   id?: number | string;
//   icon?: React.ReactNode;
//   richColors?: boolean;
//   invert?: boolean;
//   closeButton?: boolean;
//   dismissible?: boolean;
//   description?: (() => React.ReactNode) | React.ReactNode;
//   duration?: number;
//   action?: Action | React.ReactNode;
//   cancel?: Action | React.ReactNode;
//   onDismiss?: (toast: ToastT) => void;
//   onAutoClose?: (toast: ToastT) => void;
//   cancelButtonStyle?: React.CSSProperties;
//   actionButtonStyle?: React.CSSProperties;
//   style?: React.CSSProperties;
//   unstyled?: boolean;
//   className?: string;
//   classNames?: ToastClassnames;
//   descriptionClassName?: string;
//   position?: Position;
//
///////////////////////////////////////////////////////////////////////////

export const SonnerDemo = () => {
  /* ======================
      renderPrimaryToast()
  ====================== */

  const renderPrimaryToast = () => {
    return (
      <Button
        className='min-w-[150px]'
        variant='primary'
        size='sm'
        onClick={() => {
          toast.primary(
            'Primary Toast Created!',

            {
              // Use id to prevents duplication..
              // id: 'primary-toast',
              // icon: <Trophy />,

              description: 'Yay! You did it!',

              actionButtonStyle: {},

              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirm')
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!')
              }
            }
          )
        }}
      >
        Primary Toast
      </Button>
    )
  }

  /* ======================

  ====================== */

  const renderSecondaryToast = () => {
    return (
      <Button
        className='min-w-[150px]'
        variant='secondary'
        size='sm'
        onClick={() => {
          toast.secondary(
            'Secondary Toast Created!',

            {
              // icon: <Trophy />,
              description: 'Yay! You did it!',
              actionButtonStyle: {},
              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirm')
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!')
              }
            }
          )
        }}
      >
        Secondary Toast
      </Button>
    )
  }

  /* ======================

  ====================== */

  const renderInfoToast = () => {
    return (
      <Button
        className='min-w-[150px]'
        variant='blue'
        size='sm'
        onClick={() => {
          toast.info(
            'Info Toast Created!',

            {
              description: 'Yay! You did it! You are a b c de fg hi.',
              actionButtonStyle: {},
              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirm')
              },

              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!')
              }
            }
          )
        }}
      >
        Info Toast
      </Button>
    )
  }

  /* ======================

  ====================== */

  const renderSuccessToast = () => {
    return (
      <Button
        className='min-w-[150px]'
        variant='success'
        size='sm'
        onClick={() => {
          toast.success(
            'Success Toast Created!',

            {
              // closeButton: true,
              description: 'Yay! You did it!',
              actionButtonStyle: {},
              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirm')
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!')
              }

              // Using the JSX approach is way better and easier to style
              // action: (
              //   <Button
              //     className='ml-auto'
              //     variant='success'
              //     size='xs'
              //     onClick={() => {
              //       console.log('Action!')
              //       // You can use toast.dismiss() without an ID! This is a simpler
              //       // approach if you don't need to target a specific toast.
              //       toast.dismiss('my-toast')
              //     }}
              //   >
              //     Got It!
              //   </Button>
              // )

              // cancel: (
              //   <Button variant='destructive' size='sm'>
              //     Close Me
              //   </Button>
              // )

              // The automatic close behavior only works you do this:

              // cancelButtonStyle: {},
              // cancel: {
              //   label: 'Undo',
              //   onClick: () => console.log('Undo')
              // }

              // Not called when cancel button is clicked.
              // onDismiss: (toast) => {
              //   console.log('Dismissed', toast)
              // }

              // onAutoClose: (toast) => {
              //   console.log('Auto Closed', toast)
              // },

              // duration: 5000,
              // icon: <MyIcon />
              // style: {},
              // className: ''
            }
          )
        }}
      >
        Success Toast
      </Button>
    )
  }

  /* ======================

  ====================== */

  const renderErrorToast = () => {
    return (
      <Button
        className='min-w-[150px]'
        variant='destructive'
        size='sm'
        onClick={() => {
          toast.error(
            'Error Toast Created!',

            {
              // closeButton: true,
              description: 'Yay! You did it!',
              actionButtonStyle: {},
              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirm')
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!')
              }
            }
          )
        }}
      >
        Error Toast
      </Button>
    )
  }

  /* ======================

  ====================== */

  const renderWarningToast = () => {
    return (
      <Button
        className='min-w-[150px]'
        variant='yellow'
        size='sm'
        onClick={() => {
          toast.warning(
            'Warning Toast Created!',

            {
              description: 'Yay! You did it!',
              actionButtonStyle: {},
              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirm')
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!')
              }
            }
          )
        }}
      >
        Warning Toast
      </Button>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <section className='flex flex-wrap justify-center gap-4'>
      {renderPrimaryToast()}

      {renderSecondaryToast()}

      {renderInfoToast()}

      {renderSuccessToast()}

      {renderErrorToast()}

      {renderWarningToast()}
    </section>
  )
}
