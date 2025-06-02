'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { ModalOverlay } from './ModalOverlay'
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
import { ModalDialog } from './ModalDialog'
import { ModalContent } from './ModalContent'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'
import { ModalClose as ModalCloseButton } from './ModalClose'
import { ModalProps } from './types'

/* ========================================================================
                                Modal
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Modal was last updated in May 2025. It considers the ShadCN Dialog component,
// and builds on top of it. Modal makes several improvements, including adding a ModalDialog
// wrapper around ModalContent to improve responsive behavior and abstracting away much
// of the composability. It also adds centered, scrollable, and fullscreen variants
// similar to Bootstrap.
//
// Docs:
//
//   https://www.radix-ui.com/primitives/docs/components/dialog
//
// Sam Selikoff tutorials:
//
//   https://www.youtube.com/watch?v=KvZoBV_1yYE
//   https://www.youtube.com/watch?v=3ijyZllWBwU
//   https://www.youtube.com/watch?v=VM6YRrUsnUY
//   https://github.com/samselikoff/2023-05-30-radix-dialog/tree/main/03-reusable-component/end/app
//   https://github.com/samselikoff/2023-05-30-radix-dialog/blob/main/03-reusable-component/end/app/spinner.tsx
//
// Keyboard Interactions:
//
//   Space       : Opens/closes the dialog.
//   Enter       : Opens/closes the dialog.
//   Tab         : Moves focus to the next focusable element.
//   Shift + Tab : Moves focus to the previous focusable element.
//   Esc         : Closes the dialog and moves focus to Dialog.Trigger.
//
///////////////////////////////////////////////////////////////////////////

//# Test nested modals

const Modal = ({
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
  closeOnOverlayClick = true,

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

  closeButton = true
}: ModalProps) => {
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
      <ModalContent
        className={contentClassName}
        onInteractOutside={(e) => {
          if (closeOnOverlayClick === false) {
            e.preventDefault()
          }
        }}
        // onPointerDownOutside={(e) => {}}
        style={{
          ...contentStyle,
          ...(disableAnimation ? { animationDuration: '0s' } : {})
        }}
      >
        <ModalHeader
          className={headerClassName}
          style={headerStyle}
          title={title}
          titleClassName={titleClassName}
          titleStyle={titleStyle}
          description={description}
          descriptionClassName={descriptionClassName}
          descriptionStyle={descriptionStyle}
        />

        {/* ⚠️ Does Radix Dialog unmount its content?

        By default, Radix Dialog’s <Dialog.Content> is only rendered in the DOM when the dialog is open. 
        When you close the dialog, Radix removes (unmounts) the content from the DOM.
      
        In general, any content that manages some state should be abstracted into its own component.
        That way when the Modal closes, the content's state will be reset when unmounted.
      
        Conversely, if you want the state to persist, then implement the state directly within 
        the body of the component that consumes the <Modal /> instance. 
        
          const MyModal = () => {
            const [count, setCount] = React.useState(0)
            return <Modal>...</Modal>
          }
        */}

        <ModalBody className={bodyClassName} style={bodyStyle}>
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter className={footerClassName} style={footerStyle}>
            {footer}
          </ModalFooter>
        )}

        {/* By placing this last it ensures that it will sit on top of the header. */}
        <ModalCloseButton closeButton={closeButton} />
      </ModalContent>
    )
  }

  /* ======================
          return
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // https://www.radix-ui.com/primitives/docs/components/dialog#anatomy
  // The basic anatomy of a composed Radix Dialog is:
  //
  //   <Dialog.Root>
  //     <Dialog.Trigger />
  //     <Dialog.Portal>
  //       <Dialog.Overlay />
  //       <Dialog.Content>
  //         <Dialog.Title />
  //         <Dialog.Description />
  //         <Dialog.Close />
  //        </Dialog.Content>
  //     </Dialog.Portal>
  //   </Dialog.Root>
  //
  ///////////////////////////////////////////////////////////////////////////

  return (
    <Dialog.Root
      data-slot='modal'
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={(newOpen) => {
        onChange?.(newOpen)
      }}
    >
      {trigger && (
        <Dialog.Trigger asChild data-slot='modal-trigger'>
          {trigger}
        </Dialog.Trigger>
      )}

      <Dialog.Portal data-slot='modal-portal'>
        <ModalOverlay
          className={overlayClassName}
          style={{
            ...overlayStyle,
            ...(disableAnimation ? { animationDuration: '0s' } : {})
          }}
        >
          <ModalDialog
            centered={centered}
            scrollable={scrollable}
            fullscreen={fullscreen}
            className={dialogClassName}
            style={dialogStyle}
          >
            {renderContent()}
          </ModalDialog>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const ModalClose = Dialog.Close

const CompoundComponent = Object.assign(Modal, {
  // This is exposed because it may be used from within the content
  // For example, see the <Form /> component in the demo example.
  Close: ModalClose
})

export { CompoundComponent as Modal, ModalClose, type ModalProps }
