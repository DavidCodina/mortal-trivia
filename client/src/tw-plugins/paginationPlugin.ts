import plugin from 'tailwindcss/plugin'

/* ========================================================================
                              paginationPlugin
======================================================================== */

export const paginationPlugin = plugin(function (pluginApi) {
  const { addComponents /* , theme */ } = pluginApi

  addComponents({
    '.pagination': {
      '--pagination-bg': 'var(--background-light)', // ✅
      '--pagination-border-color': 'var(--border)', // ✅
      '--pagination-color': 'var(--foreground)', // ✅
      '--pagination-hover-bg': 'var(--color-accent)', // ✅
      '--pagination-focus-box-shadow':
        '0 0 0 0.25rem oklch(from var(--color-primary) l c h / 0.4)', // ✅

      '--pagination-padding-x': '0.75rem',
      '--pagination-padding-y': '0.375rem',
      '--pagination-font-size': '1rem',

      '--pagination-border-radius': '0.375rem',

      '--pagination-disabled-color':
        'oklch(from var(--color-foreground) l c h / 0.4)', // ✅

      '--pagination-active-color': '#fff', // ✅
      '--pagination-active-bg': 'var(--primary)', // ✅
      '--pagination-active-border-color': 'var(--primary)', // ✅
      display: 'flex',
      listStyle: 'none'
    },

    '.pagination-button': {
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding: 'var(--pagination-padding-y) var(--pagination-padding-x)',
      fontSize: 'var(--pagination-font-size)',
      color: 'var(--pagination-color)',
      textDecoration: 'none',
      backgroundColor: 'var(--pagination-bg)',
      border: '1px solid var(--pagination-border-color)',
      height: '100%',
      transition:
        'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
    },

    // @media (prefers-reduced-motion: reduce) {
    //   .pagination-button {
    //     transition: none;
    //   }
    // }

    '.pagination-button:hover': {
      zIndex: '2',
      backgroundColor: 'var(--pagination-hover-bg)'
    },

    '.pagination-button:focus-visible': {
      zIndex: '3',
      outline: '0px',
      boxShadow: 'var(--pagination-focus-box-shadow)'
    },

    /* ======================
      .pagination-disabled     
    ====================== */

    '.pagination-button.pagination-active, .pagination-active > .pagination-button':
      {
        zIndex: '3',
        color: 'var(--pagination-active-color)',
        backgroundColor: 'var(--pagination-active-bg)',
        borderColor: 'var(--pagination-active-border-color)'
      },

    /* ======================
      .pagination-disabled     
    ====================== */

    '.pagination-button.pagination-disabled, .pagination-disabled > .pagination-button':
      {
        color: 'var(--pagination-disabled-color)',
        pointerEvents: 'none'
      },

    /* ======================
  
    ====================== */

    '.pagination-item:not(:first-child) .pagination-button': {
      marginLeft: '-1px'
    },

    '.pagination-item:first-child .pagination-button': {
      borderTopLeftRadius: 'var(--pagination-border-radius)',
      borderBottomLeftRadius: 'var(--pagination-border-radius)'
    },

    '.pagination-item:last-child .pagination-button': {
      borderTopRightRadius: 'var(--pagination-border-radius)',
      borderBottomRightRadius: 'var(--pagination-border-radius)'
    },

    /* ======================
 
    ====================== */

    '.pagination-lg': {
      '--pagination-padding-x': '1.5rem',
      '--pagination-padding-y': '0.75rem',
      '--pagination-font-size': '1.25rem',
      '--pagination-border-radius': '0.5rem'
    },
    '.pagination-sm': {
      '--pagination-padding-x': '0.5rem',
      '--pagination-padding-y': '0.25rem',
      '--pagination-font-size': '0.875rem',
      '--pagination-border-radius': '0.25rem'
    }
  })
})

export default paginationPlugin
