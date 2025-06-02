'use client'

import { ToasterProps, Toaster as Sonner, toast } from 'sonner'
import { useTheme } from 'next-themes'
import { primaryToast, secondaryToast } from './sonner-augmentation'
import { defaultToastOptions } from './defaultToastOptions'

/* ========================================================================

======================================================================== */
// See href for more info: https://sonner.emilkowal.ski/
// https://sonner.emilkowal.ski/toast
// https://github.com/emilkowalski/sonner/blob/main/src/types.ts
// https://github.com/emilkowalski/sonner/blob/main/src/styles.css
// https://emilkowal.ski/ui/building-a-toast-component
// https://www.codu.co/articles/how-to-implement-toast-notifications-in-react-with-sonner-85ko0vlz

const Toaster = ({
  toastOptions = defaultToastOptions,
  position = 'top-right',
  ...props
}: ToasterProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      // https://sonner.emilkowal.ski/toaster#api-reference
      theme={resolvedTheme as ToasterProps['theme']}
      richColors={true}
      expand={false}
      visibleToasts={3} // Default: 3
      position={position} // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
      closeButton={true}
      offset={24}
      mobileOffset={16}
      // The default swipeDirection is based on position
      // swipeDirections={['top', 'right', 'bottom', 'left']}
      dir='ltr'
      // By default, OPTION + T expands toasts and escape collapses them.
      // This is the syntax for the default value: ['altKey', 'KeyT']
      hotkey={['altKey', 'KeyT']}
      // A true value would generate dark toasts in light mode and vice versa.
      invert={false}
      toastOptions={toastOptions}
      // gap effects the vertical diff between collapsed
      // toasts, as well as between expanded toasts.
      gap={14}
      // Changes the default icons
      // icons={{
      //   success: (
      //     <svg
      //       xmlns='http://www.w3.org/2000/svg'
      //       width='24'
      //       height='24'
      //       fill='currentColor'
      //       viewBox='0 0 16 16'
      //     >
      //       <path d='M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z' />
      //     </svg>
      //   ),
      //   info: null,
      //   warning: null,
      //   error: null,
      //   loading: null,
      //   close: null
      // }}
      className=''
      style={
        {
          '--toast-button-margin-start': '0px',
          // '--toast-button-margin-end': '0px',
          // '--width': '356px',
          // '--border-radius': '8px',

          // CSS colorvariables work in conjunction with richColors={true}
          '--normal-bg': 'var(--background-light)',
          '--normal-text': 'var(--foreground)',
          '--normal-border': 'var(--border)',

          '--success-bg': 'var(--background-light)',
          '--success-border': '(var(--color-success)',
          '--success-text': 'var(--color-success)',

          '--error-bg': 'var(--background-light)',
          '--error-border': '(var(--color-destructive)',
          '--error-text': 'var(--color-destructive)',

          '--info-bg': 'var(--background-light)',
          '--info-border': 'var(--color-info)',
          '--info-text': 'var(--color-info)',

          '--warning-bg': 'var(--background-light)',
          '--warning-border': 'var(--color-warning)',
          '--warning-text': 'var(--color-warning)'
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

toast.primary = primaryToast
toast.secondary = secondaryToast
export { Toaster }
