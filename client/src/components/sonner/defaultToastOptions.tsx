'use client'

/* ========================================================================

======================================================================== */

export const defaultToastOptions = {
  // There is a <div data-content> that contains the title and description.
  // By default, the cancelButton and actionButton use --toast-button-margin-start
  // to push off their left sides. However, the left-margin this creates is too much.
  // A better solution is to leverage the fact that the toast is already a flex container,
  // and instead make <div data-content> push both buttons to the right.
  className: `[&_[data-content]]:mr-auto`,
  ///////////////////////////////////////////////////////////////////////////
  //
  // <Sonner /> has a closeButton prop on it.
  // This version option has precedence over the one on <Sonner />.
  // It seems redundant here, but makes more sense if you consider
  // that many toastOptions can also be passed through the consumed instance.
  // Ultimately, the closeButton prop set in the consuming instance has
  // the highest precedence.
  //
  ///////////////////////////////////////////////////////////////////////////
  // closeButton: true,
  descriptionClassName: '',
  style: {},
  cancelButtonStyle: {},
  actionButtonStyle: {},
  duration: 4000,
  unstyled: false,

  ///////////////////////////////////////////////////////////////////////////
  //
  // https://sonner.emilkowal.ski/styling#styling-specific-elements
  // The preferred way to style the toasts with classes is through the headless approach.
  // However, if you only need to change a few things you can apply a class to each element
  // within the toast. ⚠️ You will need to use !important in order to override the default styles.
  //
  // You can also use the unstyled prop to remove all styles and apply your own without !important.
  // But at this point using headless will provide more control and a nicer developer experience.
  // See here: https://sonner.emilkowal.ski/styling#headless-/-tailwind-css
  //
  ///////////////////////////////////////////////////////////////////////////

  classNames: {
    ///////////////////////////////////////////////////////////////////////////
    //
    // Internally, both `className` and `toast` get passed into cn().
    // It looks like `toast` should win out over `className`, but practically
    // that doesn't seem to necessarily happen. I would recommend only using
    // one or the other.
    //
    //   className={cn(
    //     className,
    //     toastClassname,
    //     classNames?.toast,
    //     toast?.classNames?.toast,
    //     classNames?.default,
    //     classNames?.[toastType],
    //     toast?.classNames?.[toastType],
    //   )}
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    toast: '',
    title: '!font-semibold',
    description: '',
    loader: '',
    closeButton: '',
    cancelButton: '',
    actionButton: '!text-white',

    success: `
    [&_[data-action=true]]:!bg-success
    [&_[data-action=true]]:!cursor-pointer
    [&_[data-cancel=true]]:!bg-transparent
    [&_[data-cancel=true]]:!text-success
    [&_[data-cancel=true]]:!border 
    [&_[data-cancel=true]]:!border-success
    [&_[data-cancel=true]]:!cursor-pointer
    [&_[data-close-button=true]]:!border-success
    `,

    error: `
    [&_[data-action=true]]:!bg-destructive
    [&_[data-action=true]]:!cursor-pointer
    [&_[data-cancel=true]]:!bg-transparent
    [&_[data-cancel=true]]:!text-destructive
    [&_[data-cancel=true]]:!border 
    [&_[data-cancel=true]]:!border-destructive
    [&_[data-cancel=true]]:!cursor-pointer
    [&_[data-close-button=true]]:!border-destructive
    `,

    info: `
    [&_[data-action=true]]:!bg-info
    [&_[data-action=true]]:!cursor-pointer
    [&_[data-cancel=true]]:!bg-transparent
    [&_[data-cancel=true]]:!text-info
    [&_[data-cancel=true]]:!border 
    [&_[data-cancel=true]]:!border-info
    [&_[data-cancel=true]]:!cursor-pointer
    [&_[data-close-button=true]]:!border-info
    `,

    warning: `
    [&_[data-action=true]]:!bg-warning
    [&_[data-action=true]]:!cursor-pointer
    [&_[data-cancel=true]]:!bg-transparent
    [&_[data-cancel=true]]:!text-warning
    [&_[data-cancel=true]]:!border 
    [&_[data-cancel=true]]:!border-warning
    [&_[data-cancel=true]]:!cursor-pointer
    [&_[data-close-button=true]]:!border-warning
    `,

    loading: '',
    default: '',
    content: '',
    icon: ''
  },

  closeButtonAriaLabel: 'Close toast'
}
