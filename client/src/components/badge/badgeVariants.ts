import { cva } from 'class-variance-authority'

/* ======================
      badgeVariants
====================== */
///////////////////////////////////////////////////////////////////////////
//
// Gotcha: The default ShadCN base badge classes currently has a bug!
// They use `focus-visible:ring-ring/50` However, cva() is not cn().
// cva() will add ALL classes from the base AND the variant, without
// removing conflicting classes. In this case, focus-visible:ring-ring/50
// (A ShadCN custom color) comes later in the compiled CSS cascade.
// Ultimately, this means that a destructive variant class like
// the `focus-visible:ring-destructive/20` will never win because
// it's getting overwritten by the base.
//
// The major takeaway here is that one has to be very careful when writing
// base classes for cva() relative to the variants to ensure that a CSS
// conflict is not inadvertently created.
//
// However, there's another issue. Tailwind's ring classes can create the
// impression of a ring with a given offset using box-shadows. In order
// to achieve this effect, there's actually two layers of box-shadows.
// The offset layer is often used to blend with the background. This is
// problematic when the actual background is unknown.
//
// What is the point of using Tailwind's ring classes? In the past, the main reason
// people preferred box-shadow was because outline wouldn't honor an element's border
// radius, but now it does. Box shadows can offer more customization with regard to blur
// and the ability to layer multiple colors.
//
// That said, the way that default ShadCN badges use Tailwind's ring classes is pretty
// standard and would actually work better with a simple outline. This has the added
// benefit of integrating well with unknown background colors.
//
// Where Tailwind's ring classes actually shine is on a button's focus-visible box shadow.
//
// Finally, ShadCN docs show an example of using badgeVariants to style a <Link>.
// While, this is possible, it's kind of unconventional, and not something I would
// necessarily recommend.
//
///////////////////////////////////////////////////////////////////////////

const baseClasses = `
  inline-flex gap-1 items-center justify-center shrink-0 
  px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap rounded-full
  [&>svg]:size-[1.25em] [&>svg]:pointer-events-none
  select-none overflow-hidden outline-offset-2
  focus-visible:outline-2
  [a&]:hover:underline
  `

// While this works for now, we may want to add in specific dark: modifiers
// for each variant, to make the colors slightly darker in dark mode.
export const badgeVariants = cva(baseClasses, {
  variants: {
    /* ======================
         Custom Colors
    ====================== */

    variant: {
      primary: `
      bg-(--primary-soft) text-primary border border-primary
      focus-visible:outline-primary/50
      `,
      secondary: `
      bg-(--secondary-soft) text-secondary border border-secondary
      focus-visible:outline-secondary/50
      `,

      info: `
      bg-(--info-soft) text-info border border-info
      focus-visible:outline-info/50
      `,

      success: `
      bg-(--success-soft) text-success border border-success
      focus-visible:outline-success/50
      `,

      warning: `
      bg-(--warning-soft) text-warning border border-warning
      focus-visible:outline-warning/50
      `,

      destructive: `
      bg-(--destructive-soft) text-destructive border border-destructive
      focus-visible:outline-destructive/50
      `,

      /* ======================
          Tailwind Colors
      ====================== */

      red: `
      bg-red-50 text-red-500 border border-red-500
      focus-visible:outline-red-500/50
      `,
      orange: `
      bg-orange-50 text-orange-500 border border-orange-500
      focus-visible:outline-orange-500/50
      `,
      amber: `
      bg-amber-50 text-amber-500 border border-amber-500
      focus-visible:outline-amber-500/50
      `,
      yellow: `
      bg-yellow-50 text-yellow-500 border border-yellow-500
      focus-visible:outline-yellow-500/50
      `,
      lime: `
      bg-lime-50 text-lime-500 border border-lime-500
      focus-visible:outline-lime-500/50
      `,
      green: `
      bg-green-50 text-green-500 border border-green-500
      focus-visible:outline-green-500/50
      `,
      emerald: `
      bg-emerald-50 text-emerald-500 border border-emerald-500
      focus-visible:outline-emerald-500/50
      `,
      teal: `
      bg-teal-50 text-teal-500 border border-teal-500
      focus-visible:outline-teal-500/50
      `,
      cyan: `
      bg-cyan-50 text-cyan-500 border border-cyan-500
      focus-visible:outline-cyan-500/50
      `,
      sky: `
      bg-sky-50 text-sky-500 border border-sky-500
      focus-visible:outline-sky-500/50
      `,
      blue: `
      bg-blue-50 text-blue-500 border border-blue-500
      focus-visible:outline-blue-500/50
      `,
      indigo: `
      bg-indigo-50 text-indigo-500 border border-indigo-500
      focus-visible:outline-indigo-500/50
      `,
      violet: `
      bg-violet-50 text-violet-500 border border-violet-500
      focus-visible:outline-violet-500/50
      `,
      purple: `
      bg-purple-50 text-purple-500 border border-purple-500
      focus-visible:outline-purple-500/50
      `,
      fuchsia: `
      bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-500
      focus-visible:outline-fuchsia-500/50
      `,
      pink: `
      bg-pink-50 text-pink-500 border border-pink-500
      focus-visible:outline-pink-500/50
      `,
      rose: `
      bg-rose-50 text-rose-500 border border-rose-500
      focus-visible:outline-rose-500/50
      `,
      slate: `
      bg-slate-50 text-slate-500 border border-slate-500
      focus-visible:outline-slate-500/50
      `,
      gray: `
      bg-gray-50 text-gray-500 border border-gray-500
      focus-visible:outline-gray-500/50
      `,
      zinc: `
      bg-zinc-50 text-zinc-500 border border-zinc-500
      focus-visible:outline-zinc-500/50
      `,
      neutral: `
      bg-neutral-50 text-neutral-500 border border-neutral-500
      focus-visible:outline-neutral-500/50
      `,
      stone: `
      bg-stone-50 text-stone-500 border border-stone-500
      focus-visible:outline-stone-500/50
      `
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})
