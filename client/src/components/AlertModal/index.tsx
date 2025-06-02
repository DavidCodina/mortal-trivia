'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { AlertModalOverlay } from './AlertModalOverlay'
///////////////////////////////////////////////////////////////////////////
//
// Dialog vs Modal:
//
// In Radix, the convention is to name the entire component 'Dialog'.
// Radix likely named it Dialog instead of Modal to emphasize its broader usability
// beyond traditional modal interactions. In UI/UX terminology:
//
//   - Modal typically refers to a UI element that temporarily interrupts user flow and
//     requires action before returning to the previous state.
//
//   - Dialog is a more general term that can encompass modal behavior but also includes
//     non-blocking interactions, such as floating dialogs or dismissible pop-ups.
//
// By using "Dialog," Radix signals that their primitive is versatile, allowing developers
// to define whether the component behaves modally or functions in a lighter, more interactive
// way. The name choice aligns with web standards, too—the HTML<dialog>element supports both
// modal and non-modal behaviors.
//
// With that said, this component is a Modal, and the use of the term 'Dialog' in the ModalDialog
// component is very specific. In Bootstrap, the 'dialog' (i.e., <div className='modal-dialog'>)
// refers to the part of the modal that contains/wraps the <div className='modal-content'>.
// This extra wrapper is useful for features responsiveness, centering and scrolling.
//
///////////////////////////////////////////////////////////////////////////

import { AlertModalDialog } from './AlertModalDialog'
import { AlertModalContent } from './AlertModalContent'
import { AlertModalHeader } from './AlertModalHeader'
import { AlertModalBody } from './AlertModalBody'
import { AlertModalFooter } from './AlertModalFooter'
import { AlertModalClose } from './AlertModalClose'
import { AlertModalProps } from './types'

/* ========================================================================
                                AlertModal
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This AlertModal was originally based off of the ShadCN AlertDialog.
// However, this version abstracts away the composability and adds an internal
// AlertModalDialog component that helps with responsiveness, centering, etc.
//
// Essentially, this AlertModal is very similar to the normal Modal (i.e. normal Radix Dialog).
// That said, in Radix the Dialog component allows users to close the dialog when clicking
// on the Dialog.Overlay, whereas the AlertDialog does not close by default when
// clicking outside the content area. This distinction exists because the Radix
// AlertDialog is designed for critical interactions that typically require explicit
// user confirmation. Since closing it inadvertently by clicking outside could lead
// to unintended consequences, Radix makes it require explicit dismissal via the
// AlertDialog.Action or AlertDialog.Cancel buttons.
//
// Again, this AlertModal (and the underlying Radix AlertDialog) is intended to be used
// for critical interactions. However, with the exception of the backdrop, most of the
// behavior is essentially the same as the regular Radix Dialog. Consequently, I don't
// think there's a convincing reason to use the AlertModal in most cases. Radix already
// exposes an `onInteractOutside` prop on Dialog.Content. If you need to disable the
// "close on overlay click" behavior for the regular Radix Dialog, simply set e.preventDefault()
// inside that handler.
//
// In any case, because AlertDialog is distinct in Radix and in ShadCN's abstraction of it,
// I've included it here as well.
//
// ⚠️ Note: Associated data-slot attributes use data-slot="modal-*" rather than
// data-slot="alert-modal-*". This is necessary because the components depend on
// the compound class selectors defined within modalPlugin.ts.
//
///////////////////////////////////////////////////////////////////////////

const AlertModal = ({
  /* ====== Root ======= */

  defaultOpen,
  open = undefined,
  onChange = undefined,

  /* =================== */

  // One almost always wants to use the trigger prop over an external/programmatic trigger.
  // Why? Because when the button is implemented with Radix's Dialog.Trigger, then by default focus will
  // go back to the trigger element when the dialog is closed. This is not true if one was using some
  // random programmatic button.
  trigger = null,

  /* =================== */

  disableAnimation: shouldDisableAnimation = false,
  overlayClassName = '',
  overlayStyle = {},

  /* ====== Dialog ===== */

  centered = false,
  // ⚠️ By default, this should be false so that <select>s will be able to overflow.
  scrollable = false,
  fullscreen = false,
  dialogClassName = '',
  dialogStyle = {},

  /* === ModalContent == */

  contentClassName = '',
  contentStyle = {},
  children,

  /* === ModalHeader === */

  headerClassName = '',
  headerStyle = {},
  title = '',
  titleClassName = '',
  titleStyle = {},
  description = '',
  descriptionClassName = '',
  descriptionStyle = {},

  /* =================== */

  bodyClassName = '',
  bodyStyle = {},

  /* =================== */

  footer = null,
  footerClassName = '',
  footerStyle = {},

  /* =================== */

  // Conceptually, closeButton = false makes more sense for an AlertModal.
  closeButton = false
}: AlertModalProps) => {
  const firstRenderRef = useRef(true)
  const [disableAnimation, setDisableAnimation] = useState(
    shouldDisableAnimation
  )

  /* ======================
      useLayoutEffect()
  ====================== */
  // If either open || defaultOpen is true on first render, then
  // temporarily disable the animation, so that it doesn't run
  // the first time. useLayoutEffect implemented because we want
  // this to take effect after render, but before paint.

  useLayoutEffect(() => {
    if (firstRenderRef.current === false || shouldDisableAnimation) {
      return
    }
    firstRenderRef.current = false

    if (open === true || defaultOpen === true) {
      setDisableAnimation(true)
      setTimeout(() => {
        setDisableAnimation(false)
      }, 300) // Milliseconds should match CSS animation-duration value.
    }
  }, [defaultOpen, open, shouldDisableAnimation])

  /* ======================
      renderContent()
  ====================== */

  const renderContent = () => {
    return (
      <AlertModalContent
        className={contentClassName}
        style={{
          ...contentStyle,
          ...(disableAnimation ? { animationDuration: '0s' } : {})
        }}
      >
        <AlertModalHeader
          className={headerClassName}
          style={headerStyle}
          title={title}
          titleClassName={titleClassName}
          titleStyle={titleStyle}
          description={description}
          descriptionClassName={descriptionClassName}
          descriptionStyle={descriptionStyle}
        />

        <AlertModalBody className={bodyClassName} style={bodyStyle}>
          {children}
        </AlertModalBody>

        {footer && (
          <AlertModalFooter className={footerClassName} style={footerStyle}>
            {footer}
          </AlertModalFooter>
        )}

        <AlertModalClose closeButton={closeButton} />
      </AlertModalContent>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <AlertDialog.Root
      data-slot='modal'
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={(newOpen) => {
        onChange?.(newOpen)
      }}
    >
      {trigger && (
        <AlertDialog.Trigger asChild data-slot='modal-trigger'>
          {trigger}
        </AlertDialog.Trigger>
      )}

      <AlertDialog.Portal data-slot='modal-portal'>
        <AlertModalOverlay
          className={overlayClassName}
          style={{
            ...overlayStyle,
            ...(disableAnimation ? { animationDuration: '0s' } : {})
          }}
        >
          <AlertModalDialog
            centered={centered}
            scrollable={scrollable}
            fullscreen={fullscreen}
            className={dialogClassName}
            style={dialogStyle}
          >
            {renderContent()}
          </AlertModalDialog>
        </AlertModalOverlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

const AlertModalCancel = AlertDialog.Cancel

///////////////////////////////////////////////////////////////////////////
//
// ⚠️ The Radix AlertDialog exposes AlertDialog.Action and AlertDialog.Cancel.
// Both components are used to close the AlertDialog, similar to Dialog's Alert.Close.
// However, the naming convention is intended to emphasize the fact that  AlertDialog
// is designed for critical interactions.
//
// The problem with AlertDialog.Action is that there's no way to
// make it wait for async logic to complete:
//
//   <AlertModalAction asChild>
//     <Button
//       className='min-w-[100px]'
//       onClick={async (e) => {
//         setPending(true)
//         await sleep(3000) // ⚠️ AlertDialog will already have closed.
//         setPending(false)
//       }}
//       loading={pending}
//       loadingClassName='mr-1'
//       size='sm'
//       type='button'
//       variant='success'
//     >
//       {pending ? 'Saving...' : 'Save'}
//     </Button>
//   </AlertModalAction>
//
// Consequently, in practice it's often better to not use AlertModalAction at all.
// In cases where you need to await asynchronous logic prior to closing, don't use
// AlertModalAction. Instead, to await async logic, use a controlled implementation that
// leverages the top-level onChange prop.
//
// To be fair, this isn't really a shortcoming of AlertDialog.Action. The same criticism can be
// made against the Radix Dialog.Close. It's more an issue of choosing the right tool for the job.
//
///////////////////////////////////////////////////////////////////////////

const AlertModalAction = AlertDialog.Action

const CompoundComponent = Object.assign(AlertModal, {
  Action: AlertModalAction,
  Cancel: AlertModalCancel
})

export {
  CompoundComponent as AlertModal,
  AlertModalAction,
  AlertModalCancel,
  type AlertModalProps
}
