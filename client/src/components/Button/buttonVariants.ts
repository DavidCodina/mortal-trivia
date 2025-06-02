'use client'

import { cva } from 'class-variance-authority'

///////////////////////////////////////////////////////////////////////////
//
// solidButtonBorderMixin is kind of hacky, but it's a quick and easy way
// to get a darker border in light mode and lighter border in dark mode.
// Note: The toggleVariants use a border that 'pops' a little more. For example,
// the primary variant does this:
//
//   border
//   border-[oklch(from_var(--color-primary)_calc(l_-_0.25)_c_h)]
//   dark:border-[oklch(from_var(--color-primary)_calc(l_+_0.25)_c_h)]
//
// Obviously, this takes a lot more work and generates a lot more CSS, but
// it's worth considering switching to this approach.
//
///////////////////////////////////////////////////////////////////////////
const solidButtonBorderMixin = `border border-[rgba(0,0,0,0.3)] dark:border-[rgba(255,255,255,0.35)]`

const buttonShadowMixin = `
shadow-[0_1px_2px_rgba(0,0,0,0.35)]
hover:shadow-none
active:shadow-[inset_0_0_2px_0px_rgba(0,0,0,0.35)]
dark:shadow-[0_1px_2px_rgba(0,0,0,0.85)]
dark:hover:shadow-none
dark:active:shadow-[inset_0_0_2px_0.5px_rgba(0,0,0,0.35)]
`

const activeScaleMixin = 'active:scale-[0.98]'

const svgMixin = `
[&_svg]:pointer-events-none
[&_svg]:shrink-0
[&_svg:not([class*='size-'])]:size-[1.25em]
`

/* ======================
      buttonVariants
====================== */
// Tentatively removed:
// aria-invalid:ring-destructive/20
// aria-invalid:border-destructive
// dark:aria-invalid:ring-destructive/40

const baseClasses = `
inline-flex items-center justify-center gap-[0.5em] shrink-0
whitespace-nowrap font-semibold
transition-[color,box-shadow]
rounded-[0.375em]
px-[0.5em] py-[0.25em]
cursor-pointer
select-none
focus-visible:ring-[3px] 
disabled:pointer-events-none disabled:opacity-50
outline-none 
${svgMixin}
`

///////////////////////////////////////////////////////////////////////////
//
// Note: ShadCN generally follows a pattern of doing cva(baseClasses, { ... }).
// Then when consuming the variants, it does:
//
//   className={cn(buttonVariants({ variant, size }), className )}
//
// However, if we're already using cn() it may actually make more sense to
// omit baseClasses from cva() and instead do:
//
//   className={cn(baseClasses, buttonVariants({ variant, size }), className)}
//
// The argument against this is the potential standalone usage of buttonVariants
// outside of Button.
//
// However, if you only ever intend for the styles to be used internally, then
// with the latter pattern, you're actually getting the benefits of tailwind merge,
// thereby ensuring that any variant Tailwind CSS classes have precedence. Remember,
// cva() itself  DOES NOT resolve cascade conflicts.
//
///////////////////////////////////////////////////////////////////////////

export const buttonVariants = cva(baseClasses, {
  variants: {
    variant: {
      /* ======================
            Custom Colors
      ====================== */

      primary: `
      bg-primary text-primary-foreground
      hover:bg-[oklch(from_var(--color-primary)_calc(l_+_(1_-_l)_*_0.1)_c_h)] 
      focus-visible:ring-primary/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      secondary: `
      bg-secondary text-secondary-foreground
      hover:bg-[oklch(from_var(--color-secondary)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-secondary/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      success: `
      bg-success text-success-foreground
      hover:bg-[oklch(from_var(--color-success)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-success/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      info: `
      bg-info text-info-foreground
      hover:bg-[oklch(from_var(--color-info)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-info/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      warning: `
      bg-warning text-warning-foreground
      hover:bg-[oklch(from_var(--color-warning)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-warning/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      destructive: `
      bg-destructive text-destructive-foreground
      hover:bg-[oklch(from_var(--color-destructive)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-destructive/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      /* ======================
        Custom Colors (light)
      ====================== */
      ///////////////////////////////////////////////////////////////////////////
      //
      // ShadCN uses a system where the primary and secondary colors change between light and dark mode.
      // While that makes sense in many cases, we may want to create a primary button that remains the same
      // between light/dark mode. Consequently, I added --primary-light, --secondary-light
      // and --destructive-light CSS variables to globals.css. This same issue will likely arise with alerts, badges, etc.
      //
      ///////////////////////////////////////////////////////////////////////////

      'primary-light': `
      bg-(--primary-light) text-white
      hover:bg-[oklch(from_var(--primary-light)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-(--primary-light)/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      'secondary-light': `
      bg-(--secondary-light) text-white
      hover:bg-[oklch(from_var(--secondary-light)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-(--secondary-light)/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      'success-light': `
      bg-(--success-light) text-success-foreground
      hover:bg-[oklch(from_var(--success-light)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-(--success-light)/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      'info-light': `
      bg-(--info-light) text-info-foreground
      hover:bg-[oklch(from_var(--info-light)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-(--info-light)/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      'warning-light': `
      bg-(--warning-light) text-warning-foreground
      hover:bg-[oklch(from_var(--warning-light)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-(--warning-light)/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      'destructive-light': `
      bg-(--destructive-light) text-white
      hover:bg-[oklch(from_var(--destructive-light)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-(--destructive-light)/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      /* ======================
          Tailwind Colors
      ====================== */

      red: `
      bg-red-500 text-white
      hover:bg-[oklch(from_var(--color-red-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-red-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      orange: `
      bg-orange-500 text-white
      hover:bg-[oklch(from_var(--color-orange-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-orange-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      amber: `
      bg-amber-500 text-white
      hover:bg-[oklch(from_var(--color-amber-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-amber-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      yellow: `
      bg-yellow-500 text-white
      hover:bg-[oklch(from_var(--color-yellow-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-yellow-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      lime: `
      bg-lime-500 text-white
      hover:bg-[oklch(from_var(--color-lime-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-lime-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      green: `
      bg-green-500 text-white
      hover:bg-[oklch(from_var(--color-green-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-green-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      emerald: `
      bg-emerald-500 text-white
      hover:bg-[oklch(from_var(--color-emerald-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-emerald-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      teal: `
      bg-teal-500 text-white
      hover:bg-[oklch(from_var(--color-teal-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-teal-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      cyan: `
      bg-cyan-500 text-white
      hover:bg-[oklch(from_var(--color-cyan-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-cyan-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      sky: `
      bg-sky-500 text-white
      hover:bg-[oklch(from_var(--color-sky-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-sky-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      blue: `
      bg-blue-500 text-white
      hover:bg-[oklch(from_var(--color-blue-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-blue-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      indigo: `
      bg-indigo-500 text-white
      hover:bg-[oklch(from_var(--color-indigo-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-indigo-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      violet: `
      bg-violet-500 text-white
      hover:bg-[oklch(from_var(--color-violet-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-violet-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      purple: `
      bg-purple-500 text-white
      hover:bg-[oklch(from_var(--color-purple-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-purple-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      fuchsia: `
      bg-fuchsia-500 text-white
      hover:bg-[oklch(from_var(--color-fuchsia-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-fuchsia-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      pink: `
      bg-pink-500 text-white
      hover:bg-[oklch(from_var(--color-pink-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-pink-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      rose: `
      bg-rose-500 text-white
      hover:bg-[oklch(from_var(--color-rose-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-rose-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      slate: `
      bg-slate-500 text-white
      hover:bg-[oklch(from_var(--color-slate-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-slate-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      gray: `
      bg-gray-500 text-white
      hover:bg-[oklch(from_var(--color-gray-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-gray-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      zinc: `
      bg-zinc-500 text-white
      hover:bg-[oklch(from_var(--color-zinc-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-zinc-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      neutral: `
      bg-neutral-500 text-white
      hover:bg-[oklch(from_var(--color-neutral-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-neutral-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      stone: `
      bg-stone-500 text-white
      hover:bg-[oklch(from_var(--color-stone-500)_calc(l_+_(1_-_l)_*_0.1)_c_h)]
      focus-visible:ring-stone-500/50
      ${solidButtonBorderMixin}
      ${buttonShadowMixin}
      ${activeScaleMixin}
      `,

      /* ======================
          ShadCN Defaults
      ====================== */
      // I left these in because the default implementation of other ShadCN components
      // sometimes use them. However, they're essentially junk
      // focus-visible:ring/50
      outline: `
        border shadow-xs
        hover:bg-accent
        hover:text-accent-foreground
        focus-visible:ring-ring/20
        dark:focus-visible:ring-ring/40
        `,

      // The ghost variant is used by the SidebarTrigger component.
      // This indicates that if you remove certain variants, it can
      // break the implementation of other ShadCN components.
      ghost: `
      hover:bg-accent hover:text-accent-foreground
      focus-visible:ring-ring/20
      dark:focus-visible:ring-ring/40
      `,
      link: `
      text-primary underline-offset-4 hover:underline
      focus-visible:ring-primary/20
      dark:focus-visible:ring-primary/40
      `
    },

    // The default shadcn implementation hardcodes the height of the buttons.
    // Generally, this seems like a bad idea, it's better to let font size,
    // line-height and padding determin the size of the button.

    size: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})
