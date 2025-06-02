'use client'

import { CSSProperties, ComponentProps, ElementType } from 'react'
// import { useTheme } from 'next-themes'
import { cn } from '@/utils/index'

type TitleOwnProps<T extends ElementType = ElementType> = {
  as?: T
  color?: string
}

type TitleProps<U extends ElementType> = TitleOwnProps<U> &
  Omit<ComponentProps<U>, keyof TitleOwnProps>

const defaultElement = 'h1'

/* ========================================================================
                                  Title
======================================================================== */

export const Title = <T extends React.ElementType = typeof defaultElement>({
  as,
  children,
  color: _color = '',
  className = '',
  style = {},
  ref,
  ...otherProps
}: TitleProps<T>) => {
  const Component = as || defaultElement

  ///////////////////////////////////////////////////////////////////////////
  //
  // This pattern works, but it's not ideal because you have to wait for hydration
  // to complete AND you have to use `mounted` to avoid hydration mismatches.
  //
  //   const { resolvedTheme } = useTheme()
  //   mounted state + useEffect is to prevent hydration mismatches.
  //   const [mounted, setMounted] = useState(false)
  //   useEffect(() => { setMounted(true)  }, [])
  //
  ///////////////////////////////////////////////////////////////////////////asasa

  const color = _color ? _color : 'var(--color-primary)'
  const outlineMixin = Array(30).fill(`${color} 0px 0px 1px`).join(',')

  /* ======================
      renderLightVersion()
    ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // It may seem strange to have two distinct versions of the same component.
  // However, it allows us to use block dark:hidden or hidden dark:block, respectively.
  // As noted in the ThemeSwtich component, <html class="light|dark" style="color-scheme: light|dark">
  // will exist in the DOM before the client-side hydration process begins (?). Ultimately, this
  // means that styleing through the Tailwind dark: modifier will work immediately. Converely,
  // if you try to use the resolvedTheme, it may take a moment to resolve from 'system' to 'light' or 'dark',
  // and that's very bad when it comes to UX.
  //
  ///////////////////////////////////////////////////////////////////////////

  const renderLightVersion = () => {
    return (
      <Component
        className={cn(
          `text-background-light m-0 block font-['Poppins'] text-6xl leading-none font-black tracking-[1px] uppercase transition-[background-color,color,text-shadow] duration-300 ease-linear dark:hidden`,
          className
        )}
        ref={(node) => {
          if (ref && 'current' in ref) {
            ref.current = node
          } else if (typeof ref === 'function') {
            ref?.(node)
          }
        }}
        style={
          {
            textShadow: `
           ${outlineMixin},
          0 1px 0 hsl(174, 5%, 86%),
          0 2px 0 hsl(174, 5%, 84%),
          0 3px 0 hsl(174, 5%, 82%),
          0 4px 0 hsl(174, 5%, 80%),
          0 5px 0 hsl(174, 5%, 78%),
          0 6px 0 hsl(174, 5%, 76%),
          0 7px 0 hsl(174, 5%, 74%),
          0 8px 0 hsl(174, 5%, 72%),
          0 9px 0 ${color},
          0px 10px 2px rgba(16, 16, 16, 0.2),
          0px 12px 4px rgba(16, 16, 16, 0.2)
          `,
            ...style
          } as CSSProperties
        }
        {...otherProps}
      >
        {children}
      </Component>
    )
  }

  /* ======================
        renderDarkVersion()
    ====================== */

  const renderDarkVersion = () => {
    return (
      <Component
        className={cn(
          `text-background-light m-0 hidden font-['Poppins'] text-6xl leading-none font-black tracking-[1px] uppercase transition-[background-color,color,text-shadow] duration-300 ease-linear dark:block`,
          className
        )}
        ref={(node) => {
          if (ref && 'current' in ref) {
            ref.current = node
          } else if (typeof ref === 'function') {
            ref?.(node)
          }
        }}
        style={
          {
            textShadow: `
          ${outlineMixin},
          0 1px 0 hsl(217, 0%, 20%), 
          0 2px 0 hsl(217, 0%, 19%),
          0 3px 0 hsl(217, 0%, 18%), 
          0 4px 0 hsl(217, 0%, 17%),
          0 5px 0 hsl(217, 0%, 16%), 
          0 6px 0 hsl(217, 0%, 15%),
          0 7px 0 hsl(3217, 0%, 14%), 
          0 8px 0 hsl(217, 0%, 14%),
          0px 10px 2px rgba(16, 16, 16, 0.2),
          0px 12px 4px rgba(16, 16, 16, 0.2)
          `,
            ...style
          } as CSSProperties
        }
        {...otherProps}
      >
        {children}
      </Component>
    )
  }

  /* ======================
             return
    ====================== */

  return (
    <>
      {renderLightVersion()}
      {renderDarkVersion()}
    </>
  )
}

Title.displayName = 'Title'
