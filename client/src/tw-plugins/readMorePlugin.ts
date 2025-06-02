import plugin from 'tailwindcss/plugin'

// To inspect the theme that the theme() function is using
// uncomment this and right-click to inspect.
// Or see the following URL
// https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/default-theme.ts
// import theme from 'tailwindcss/defaultTheme'

/* ========================================================================
                              readMorePlugin
======================================================================== */

export const readMorePlugin = plugin(function (pluginApi) {
  const { addComponents /*, theme */ } = pluginApi

  addComponents({
    '.read-more-container': {
      '--read-more-button-bg': 'var(--color-background-light)',
      '--read-more-button-color': 'var(--color-primary)',
      '--read-more-button-font-size': 'inherit',
      backgroundColor: 'var(--read-more-button-bg)',
      border: '1px solid var(--color-border)'
    },
    '.read-more-button': {
      // There is no default for --read-more-button-color, so it
      // will fallback to colors.blue.500, unless set by consumer.
      color: 'var(--read-more-button-color)',
      cursor: 'pointer',
      display: 'block',
      fontSize: 'var(--read-more-button-font-size)',
      fontWeight: 'bold',
      marginLeft: 'auto',
      marginRight: 'calc(var(--spacing)*4)',
      marginTop: 'calc(var(--spacing)*2)'
    },
    '.read-more-inline-button': {
      position: 'absolute',
      bottom: '0px',
      color: 'var(--read-more-button-color)',
      cursor: 'pointer',
      fontSize: 'var(--read-more-button-font-size)',

      ///////////////////////////////////////////////////////////////////////////
      //
      // Generally, the quasi-opacity gradient looks good, but
      // the effect can break in situations where the fontSize
      // of the children content differs from that of the button.
      //
      // If fontSize and lineHeight are set using the top-level style
      // or className props, then they should be inherited by the button.
      // However if those style are set within the content itself, the
      // inheritance does not occur.
      //
      // One way to manually set the fontSize in the consuming code
      // is through the use of --read-more-button-font-size variable.
      //
      ///////////////////////////////////////////////////////////////////////////

      background:
        'linear-gradient(to right, transparent 0%, var(--read-more-button-bg) 45%, var(--read-more-button-bg) 100%)',
      right: '0px',
      //^ Note: pl-24 is currently a hardcoded padding value,
      //^ but it probably makes more sense to use an em value so
      //^ it's always proportional to the size of the text.
      paddingLeft: 'calc(var(--spacing)*24)',
      paddingRight: 'calc(var(--spacing)*2)',
      fontWeight: 'bold'
    }
  })
})

export default readMorePlugin
