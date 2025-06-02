// import 'sonner' // Seems not to be needed if using import 'sonner/dist/index.d.ts'
import 'sonner/dist/index.d.ts'

/* ========================================================================

======================================================================== */

///////////////////////////////////////////////////////////////////////////
//
// This file was added to support custom toast.primary() and
// toast.secondary() methods.
//
// Unfortunately, there is no actual type for the `toast` export.
// If you right-click on the `toast` export and look at the definition,
// it turns out to be a function with additional object properties:
//
//   declare const toast: ((message: titleT, data?: ExternalToast) => string | number) & { ... }
//
// This so-called type was never manually defined. Instead, it gets inferred from this:
//
//   https://github.com/emilkowalski/sonner/blob/main/src/state.ts
//   export const toast = Object.assign(
//     basicToast,
//     {
//       success: ToastState.success,
//       info: ToastState.info,
//       warning: ToastState.warning,
//       error: ToastState.error,
//       custom: ToastState.custom,
//       message: ToastState.message,
//       promise: ToastState.promise,
//       dismiss: ToastState.dismiss,
//       loading: ToastState.loading,
//     },
//     { getHistory, getToasts },
//   );
//
// Adding a new method like `primary` or `secondary` to the inferred type of `toast`
// can be a bit tricky, given that TypeScript infers types at compile time
// and modifying an inferred type dynamically isn't straightforward.
// I tried everything I could think of to infer the original `toast` type, but
// ultimately it leads to a cirucular reference issue.
//
// Solution: Manually reconstruct the type. Downside: this type must
// be kept in sync with any installed package updates (current: "sonner": "^2.0.1").
//
///////////////////////////////////////////////////////////////////////////

declare module 'sonner' {
  const toast: ((
    message: titleT | React.ReactNode,
    data?: ExternalToast
  ) => string | number) & {
    primary: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number

    secondary: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number

    success: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number
    info: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number
    warning: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number
    error: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number
    custom: (
      jsx: (id: number | string) => React.ReactElement,
      data?: ExternalToast
    ) => string | number
    message: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number
    promise: <ToastData>(
      promise: PromiseT<ToastData>,
      data?: PromiseData<ToastData>
    ) =>
      | (string & {
          unwrap: () => Promise<ToastData>
        })
      | (number & {
          unwrap: () => Promise<ToastData>
        })
      | {
          unwrap: () => Promise<ToastData>
        }
    dismiss: (id?: number | string) => string | number
    loading: (
      message: titleT | React.ReactNode,
      data?: ExternalToast
    ) => string | number
  } & {
    getHistory: () => (ToastT | ToastToDismiss)[]
    getToasts: () => (ToastT | ToastToDismiss)[]
  }
}
