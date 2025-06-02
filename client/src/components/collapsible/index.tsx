'use client'

import './Collapsible.css'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

/* ========================================================================

======================================================================== */
// Props: asChild, defaultOpen, open, onOpenChange, disabled

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot='collapsible' {...props} />
}

/* ========================================================================

======================================================================== */
// Props: asChild

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot='collapsible-trigger'
      {...props}
    />
  )
}

/* ========================================================================

======================================================================== */
// Props: asChild, forceMount

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot='collapsible-content'
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
