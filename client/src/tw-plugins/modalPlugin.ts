import plugin from 'tailwindcss/plugin'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This plugin only handles the animations, fullscreen, centered and scrollable
// features. The rest of the sytling is applied locally by Tailwind classes.
//
// Note: To inspect the theme that the theme() function is using uncomment this
// and right-click to inspect, or see the following URL
//
//   https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/default-theme.ts
//
// import theme from 'tailwindcss/defaultTheme'
//
///////////////////////////////////////////////////////////////////////////

export const modalPlugin = plugin(function (pluginApi) {
  const { addComponents /*, theme */ } = pluginApi

  addComponents({
    // No need for Framer Motion, just add a couple of simple keyframes.
    '@keyframes modal-content-open': {
      from: {
        opacity: '0',
        transform: 'scale(0.9)'
      },
      to: {
        opacity: '1',
        transform: 'scale(1)'
      }
    },

    '@keyframes modal-content-closed': {
      from: {
        opacity: '1',
        transform: 'scale(1)'
      },
      to: {
        opacity: '0',
        transform: 'scale(0.9)'
      }
    },

    '@keyframes modal-overlay-open': {
      from: {
        opacity: '0'
      },
      to: {
        opacity: '1'
      }
    },
    '@keyframes modal-overlay-closed': {
      from: {
        opacity: '1'
      },
      to: {
        opacity: '0'
      }
    },

    /* ======================

    ====================== */

    // The scrollable styles change the implementation such that the
    // <Dialog.Content data-slot='modal-content'> container becomes
    // scrollable, rather than relying on the <div data-slot='modal-dialog'>
    '.radix-modal-dialog-scrollable': {
      height: 'calc(100% - var(--modal-dialog-spacing) * 2)'
    },
    // ⚠️ Gotcha: if using dropdowns, selects, etc, that jump out of the
    // modal, then you don't want to use this because they will be obscured.
    '.radix-modal-dialog-scrollable [data-slot="modal-content"]': {
      maxHeight: '100%',
      overflow: 'hidden'
    },

    '.radix-modal-dialog-scrollable [data-slot="modal-body"]': {
      overflowY: 'auto'
    },

    /* ======================

    ====================== */

    '.radix-modal-dialog-centered': {
      alignItems: 'center',
      display: 'flex',
      minHeight: 'calc(100% - var(--modal-dialog-spacing) * 2)'
    },

    '.radix-modal-dialog-centered [data-slot="modal-content"]': {
      '&[data-state=closed]': {
        animation: 'modal-content-closed 300ms both'
      },

      '&[data-state=open]': {
        animation: 'modal-content-open 300ms both'
      }
    },

    /* ======================

    ====================== */

    '.radix-modal-fullscreen': {
      width: '100vw',
      maxWidth: 'none',
      height: '100%',
      margin: '0'
    },

    '.radix-modal-fullscreen [data-slot="modal-content"]': {
      height: '100%',
      border: '0',
      borderRadius: '0'
    },

    '.radix-modal-fullscreen [data-slot="modal-header"], .radix-modal-fullscreen [data-slot="modal-footer"]':
      {
        borderRadius: '0'
      },

    '.radix-modal-fullscreen [data-slot="modal-body"]': {
      overflowY: 'auto',
      borderRadius: '0'
    }
  })
})

export default modalPlugin
