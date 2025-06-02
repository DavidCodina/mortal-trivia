'use client'

import { ThemeProvider } from 'next-themes'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Prevent dark mode FOUC with next-themes:
// https://www.youtube.com/watch?v=7zqI4qMDdg8
// Even docs suggest using suppressHydrationWarning:
// https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
// https://tailwindcss.com/docs/dark-mode
//
// Note: You MIGHT still see a FOUC in dev mode. See docs:
// Why is my page still flashing? In Next.js dev mode, the page may still flash.
// When you build your app in production mode, there will be no flashing.
//
///////////////////////////////////////////////////////////////////////////

export const NextThemeProvider = ({ children }: any) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={true}>
      {children}
    </ThemeProvider>
  )
}
