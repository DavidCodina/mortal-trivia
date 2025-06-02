'use client'

export const SIDEBAR_WIDTH: string = '300px'
export const SIDEBAR_WIDTH_MOBILE: string = '300px'

// This controls the width of the collapsed sidebar when collapsible='icon'.
// Using a number kind of seems like it works, but it breaks the position of
// the SidbarTrigger. Use a string value.
export const SIDEBAR_WIDTH_ICON: string = '48px'

// The SIDEBAR_KEYBOARD_SHORTCUT variable is used to set the keyboard
// shortcut used to open and close the sidebar. To trigger the sidebar,
// you use the cmd+b keyboard shortcut on Mac and ctrl+b on Windows.
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

// The SIDEBAR_COOKIE_NAME and SIDEBAR_COOKIE_MAX_AGE constants work
// in conjunction with the 'persisted state' feature implemented in
// layout.tsx.
export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
