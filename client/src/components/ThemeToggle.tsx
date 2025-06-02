'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'
import { useTheme } from 'next-themes'
import {
  Sun,
  Moon
  // Eclipse,
  // Loader2
} from 'lucide-react'

type ThemeToggleProps = ComponentProps<'button'>

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// In most cases you want resolvedTheme. If no theme has been selected by
// the user, the theme value will be 'system'. However, with resolvedTheme,
// 'system' will resolve the the system preference a moment later such that
// resolvedTheme will be 'system' briefly, then 'light' or 'dark'.
//
// Note: this is a common challenge when working with next-themes when JSX styles
// or content depend on the resolved value - as the theme resolution takes
// a moment due to the client-side hydration process. Thus you might end up
// having to do something like this:
//
//   {
//       mounted && resolvedTheme === 'light' ? <Sun />
//     : mounted && resolvedTheme === 'dark' ? <Moon />
//     : <Loader2 className='animate-spin' />
//   }
//
// Moreover, you would need to use the `mounted` pattern to prevent a hydration mismatch.
// Fortunately, the actual system preference is know almost immediately when checked
// through Tailwind. This is because <html class="light|dark" style="color-scheme: light|dark">
// Will exist in the DOM before the client-side hydration process begins (?). Ultimately, this
// means that this kind of thing will work immediately:
//
//   <Sun className='dark:hidden' />
//   <Moon className='hidden dark:block' />
//
///////////////////////////////////////////////////////////////////////////

export const ThemeToggle = ({
  className,
  style,
  ...otherProps
}: ThemeToggleProps) => {
  const { /* resolvedTheme, */ setTheme } = useTheme()
  // mounted state + useEffect is to prevent hydration mismatches.
  // This will likely be a common pattern when implementing any UI
  // that depends on the theme state.
  // const [mounted, setMounted] = useState(false)
  // const currentTheme = mounted ? resolvedTheme : '???'

  /* ======================
          renderIcon()
  ====================== */

  const renderIcon = () => {
    // Note: in Taiwind v4 one can also use not-dark: modifier.
    return (
      <>
        <Sun className='dark:hidden' />
        <Moon className='hidden dark:block' />
      </>
    )
  }

  /* ======================
       useLayoutEffect()
  ====================== */

  // useLayoutEffect(() => { setMounted(true) }, [])

  /* ======================
          return
  ====================== */

  return (
    <>
      <button
        {...otherProps}
        className={cn(
          'text-primary hover:bg-primary/15 cursor-pointer rounded-full p-1',
          className
        )}
        onClick={() => {
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }}
        style={style}
        type='button'
      >
        {renderIcon()}
        <span className='sr-only'>Toggle Theme</span>
      </button>
      {/* <div className='text-foreground-color text-sm text-center mb-12'>{currentTheme}</div> */}
    </>
  )
}
