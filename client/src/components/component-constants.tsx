/* ========================================================================

======================================================================== */
// The default ShadCN implementations seem to favor `z-50` for many components
// that need a relatively high z-index. For example, DropdownMenuContent and
// DropdownMenuSubConten both use `z-50`. This number is arguably low when
// compared to other libraries. For example, Bootstrap's dropdown menu has
// a z-index of 1000.

// Used by AppSidebar's Sidebar component when consuming
// - not to the Sidebar itself. By default, ShadCN gives the third
// return of Sidebar a 'z-10' and SibebarRail 'z-20'.
export const SIDEBAR_ZINDEX_CLASS = 'z-50'

// ✅ SidebarTrigger sits below the AppSidebar.
// Used by the SidebarTrigger components consumed within
// SidebarFlipper. SidebarTrigger itself has no internal z-index.
export const SIDEBAR_TRIGGER_ZINDEX_CLASS = 'z-49'

// ✅ DropdownMenu sits on top of the AppSidebar.
// Used by DropdownMenuContent and DropdownMenuSubContent
export const DROPDOWN_MENU_ZINDEX_CLASS = 'z-50'

// ✅ Tooltips sit on top of the AppSidebar.
// Used by TooltipContent and TooltipPrimitive.Arrow
export const TOOLTIP_ZINDEX_CLASS = 'z-50'

// ✅ Popovers sit on top of the AppSidebar.
// Used by PopoverContent
export const POPOVER_ZINDEX_CLASS = 'z-50'

export const DIALOG_ZINDEX_CLASS = 'z-50'

// ✅ AlertDialogs sit on top of the AppSidebar.
// Used by AlertDialogContent and AlertDialogOverlay
export const ALERT_DIALOG_ZINDEX_CLASS = 'z-50'

// Used by SheetContent and SheetOverlay
export const SHEET_ZINDEX_CLASS = 'z-50'

// Used by SelectContent
export const SELECT_ZINDEX_CLASS = 'z-50'

//# Test permanently open popover against open mobile sidebar, open alert dialog, and open sheet.
//# Test permanently open dropdown menut against open mobile sidebar, open alert dialog, and open sheet.
//# Test permanantly open popover against open dropdown.

//# Sonner

/* ======================

====================== */

export const FIELD_BOX_SHADOW_MIXIN = `
shadow-xs
`

export const FIELD_FOCUS_VISIBLE_MIXIN = `
focus-visible:shadow-none
focus-visible:border-primary
focus-visible:ring-[3px]
focus-visible:ring-primary/40
`

export const FIELD_VALID_MIXIN = `
not-disabled:border-success
focus-visible:border-success
focus-visible:ring-success/40
`

// This assumes FIELD_FOCUS_VISIBLE_MIXIN is already
// being used, and so only modifies border and ring.
export const FIELD_INVALID_MIXIN = `
not-disabled:border-destructive
focus-visible:border-destructive
focus-visible:ring-destructive/40
`

// disabled:cursor-not-allowed works for now, but it could get you into trouble.
// It's more common (e.g., Bootstrap) to use pointer-events:none.
export const FIELD_DISABLED_MIXIN = `
disabled:cursor-not-allowed 
disabled:opacity-65
`
