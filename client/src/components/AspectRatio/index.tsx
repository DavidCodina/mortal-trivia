import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// The Radix AspectRatio relies on the padding hack trick.

// Consequently, when you want to set the height based on the width, the width
// needs to be defined by the parent element.
//
//   <div className='mx-auto mb-6 max-w-[800px] rounded-xl border bg-white shadow'>
//     <AspectRatio className='' ratio={16 / 9}></AspectRatio>
//   </div>
//
// This kind of implementation is very clunky. Bootstrap actually has a more elegant approach.
//
//    <div className='ratio ratio-16x9'></div>
//
/////////////////////////
//
// The basic idea with the Radix AspectRatio is as follows:
// https://github.com/radix-ui/primitives/blob/main/packages/react/aspect-ratio/src/aspect-ratio.tsx
//
//
//   import * as React from 'react'
//   import { Primitive } from '@radix-ui/react-primitive'
//
//   type AspectRatioElement = React.ElementRef<typeof Primitive.div>
//   type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>
//
//   interface AspectRatioProps extends PrimitiveDivProps {
//     ratio?: number
//   }
//
//   const NAME = 'AspectRatio'
//
//   const AspectRatio = React.forwardRef<AspectRatioElement, AspectRatioProps>((props, forwardedRef) => {
//     const { ratio = 1 / 1, style, ...aspectRatioProps } = props
//     return (
//       <div
//         style={{ position: 'relative', width: '100%', paddingBottom: `${100 / ratio}%` }}
//         data-radix-aspect-ratio-wrapper=''
//       >
//         <Primitive.div
//           {...aspectRatioProps}
//           ref={forwardedRef}
//           style={{ ...style, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
//         />
//       </div>
//     )
//   })
//
//   AspectRatio.displayName = NAME
//   const Root = AspectRatio
//   export { AspectRatio, Root }
//   export type { AspectRatioProps }
//
// The `Primitive` component bakes in the Slot functionality.
// https://github.com/radix-ui/primitives/blob/main/packages/react/primitive/src/primitive.tsx
//
// Either the ShadCN/Radix or Bootstrap approaches work, but they're entirely unnecessary for
// modern browsers. This project implements Tailwind v4, which already assumes the user's
// browser can handle oklch() values. That being the case, it makes mores sense to simply use
// Tailwind's aspect-* classes, which leverage the CSS aspect-ratio property.
//
// Conclustion: This component has been added to the project for now, but ultimately...
// ⚠️ Don't use this component! Prefer Tailwind's aspect-* classes.
//
///////////////////////////////////////////////////////////////////////////

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot='aspect-ratio' {...props} />
}

export { AspectRatio }
