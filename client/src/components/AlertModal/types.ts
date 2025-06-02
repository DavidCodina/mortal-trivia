import { ReactNode, CSSProperties, JSX } from 'react'

export type AlertModalProps = {
  /* ====== Root ======= */

  defaultOpen?: boolean
  open?: boolean
  onChange?: (open: boolean) => void

  /* =================== */

  // The button that will open the modal.
  // You almost always want to use the trigger prop over an external/programmatic trigger.
  // Why? Because the button is implemented with Radix's Trigger, then by default focus will go
  // back to the trigger element when the dialog/modal is closed. This is not true if one was
  // using some random programmatic button.
  trigger?: ReactNode

  /* =================== */

  disableAnimation?: boolean
  overlayClassName?: string
  overlayStyle?: CSSProperties

  /* ====== Dialog ===== */

  centered?: boolean
  scrollable?: boolean
  fullscreen?: boolean
  /** This is where you'd set width/maxWidth - NOT on contentClassName/contentStyle. */
  dialogClassName?: string
  /** This is where you'd set width/maxWidth - NOT on contentClassName/contentStyle. */
  dialogStyle?: CSSProperties

  /* === ModalContent == */

  contentClassName?: string
  contentStyle?: CSSProperties

  /* === ModalHeader === */

  headerClassName?: string
  headerStyle?: CSSProperties

  title?: ReactNode
  titleClassName?: string
  titleStyle?: CSSProperties

  description?: ReactNode
  descriptionClassName?: string
  descriptionStyle?: CSSProperties

  /* =================== */

  bodyClassName?: string
  bodyStyle?: CSSProperties
  // i.e., content - This is optional. Why?
  // In some cases we might want to extend IRadixModal and the children would
  // already be baked into that instance. In such cases we wouldn't want to
  // require that there be children, since it's already being handled internally.
  // interface ISpecificModal extends ComponentProps<typeof RadixModal> {}
  children?: ReactNode

  /* =================== */

  footer?: ReactNode
  footerClassName?: string
  footerStyle?: CSSProperties

  /* =================== */

  closeButton?: boolean | JSX.Element
}
