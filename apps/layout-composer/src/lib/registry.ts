// src/lib/registry.ts

export interface ComponentMeta {
  name: string
  slug: string
  category: "ui" | "block"
  subcategory: string
  description: string
  importPath: string
  props?: string[] // key prop names
  taskDescription: string // AI task description template
}

export const componentRegistry: ComponentMeta[] = [
  // ===========================================================================
  // UI Components - Layout
  // ===========================================================================
  {
    name: "card",
    slug: "card",
    category: "ui",
    subcategory: "layout",
    description: "A container component for grouping related content with a border and padding.",
    importPath: "@innate/ui",
    props: ["className", "children"],
    taskDescription: "A card container with composable sub-components Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter. Use to group related content in a bordered rounded container with padding. Supports className for customization.",
  },
  {
    name: "separator",
    slug: "separator",
    category: "ui",
    subcategory: "layout",
    description: "A visual separator between sections of content, horizontal or vertical.",
    importPath: "@innate/ui",
    props: ["orientation", "decorative", "className"],
    taskDescription: "A separator line component that divides content sections. Supports horizontal (default) and vertical orientation via the orientation prop. Can be decorative or semantic via the decorative prop.",
  },
  {
    name: "resizable",
    slug: "resizable",
    category: "ui",
    subcategory: "layout",
    description: "A panel group with resizable panels separated by draggable handles.",
    importPath: "@innate/ui",
    props: ["direction", "defaultSize", "minSize", "maxSize", "collapsible"],
    taskDescription: "A resizable layout system with ResizablePanelGroup, ResizablePanel, and ResizableHandle. Supports horizontal and vertical directions. Panels can have default/min/max sizes and be collapsible. Handles can include a visual drag indicator with the withHandle prop.",
  },
  {
    name: "scroll-area",
    slug: "scroll-area",
    category: "ui",
    subcategory: "layout",
    description: "A custom scrollable container with styled scrollbar.",
    importPath: "@innate/ui",
    props: ["className", "children"],
    taskDescription: "A scrollable container with a custom-styled scrollbar. Wrap content in ScrollArea to replace native browser scrollbars with themed ones. Useful for sidebar navigation, lists, and any overflow content.",
  },
  {
    name: "aspect-ratio",
    slug: "aspect-ratio",
    category: "ui",
    subcategory: "layout",
    description: "A component that maintains a consistent aspect ratio for its content.",
    importPath: "@innate/ui",
    props: ["ratio", "className"],
    taskDescription: "A container that maintains a specified aspect ratio for its child content. Use the ratio prop (default 16/9) to control the proportions. Ideal for images, videos, and embedded content that need consistent proportions across screen sizes.",
  },
  {
    name: "sidebar",
    slug: "sidebar",
    category: "ui",
    subcategory: "layout",
    description: "A composable sidebar navigation component with collapsible support.",
    importPath: "@innate/ui",
    props: ["side", "variant", "collapsible", "collapsedSize"],
    taskDescription: "A full-featured sidebar navigation system with composable sub-components: SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarGroupAction, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarRail, SidebarTrigger, SidebarInset, and SidebarInput. Supports collapsible modes (offcanvas, icon, none), mobile responsive via Sheet, and cookie-persisted state.",
  },
  {
    name: "tabs",
    slug: "tabs",
    category: "ui",
    subcategory: "layout",
    description: "A set of layered sections of content, known as tab panels, displayed one at a time.",
    importPath: "@innate/ui",
    props: ["defaultValue", "value", "onValueChange"],
    taskDescription: "A tabbed interface with Tabs, TabsList, TabsTrigger, and TabsContent components. Tabs group content into selectable panels. Use defaultValue for uncontrolled or value/onValueChange for controlled state. TabsTrigger sits inside TabsList and activates the corresponding TabsContent by value.",
  },
  {
    name: "accordion",
    slug: "accordion",
    category: "ui",
    subcategory: "layout",
    description: "A vertically stacked set of expandable panels that reveal hidden content.",
    importPath: "@innate/ui",
    props: ["type", "collapsible", "defaultValue", "value"],
    taskDescription: "An accordion component with Accordion, AccordionItem, AccordionTrigger, and AccordionContent. Supports single (type='single') or multiple (type='multiple') expansion. The collapsible prop allows collapsing the open item in single mode. Items are identified by the value prop.",
  },
  {
    name: "collapsible",
    slug: "collapsible",
    category: "ui",
    subcategory: "layout",
    description: "An interactive component that expands or collapses content.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "defaultOpen"],
    taskDescription: "A collapsible container with Collapsible, CollapsibleTrigger, and CollapsibleContent. Use open/onOpenChange for controlled state or defaultOpen for uncontrolled. Content animates open and closed when the trigger is activated.",
  },
  {
    name: "carousel",
    slug: "carousel",
    category: "ui",
    subcategory: "layout",
    description: "A carousel for cycling through content with previous/next navigation.",
    importPath: "@innate/ui",
    props: ["opts", "orientation", "setApi"],
    taskDescription: "A carousel component with Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, and useCarousel hook. Built on embla-carousel-react. Supports horizontal and vertical orientations, auto-play via opts, and API access through setApi. Items are placed inside CarouselItem within CarouselContent.",
  },

  // ===========================================================================
  // UI Components - Navigation
  // ===========================================================================
  {
    name: "breadcrumb",
    slug: "breadcrumb",
    category: "ui",
    subcategory: "navigation",
    description: "A navigation aid showing the current page's location within a hierarchy.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "A breadcrumb navigation component with Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, and BreadcrumbEllipsis. Displays the user's location in the site hierarchy with links to ancestor pages. BreadcrumbPage marks the current page without a link.",
  },
  {
    name: "navigation-menu",
    slug: "navigation-menu",
    category: "ui",
    subcategory: "navigation",
    description: "A menu for navigating between pages, with support for nested submenus.",
    importPath: "@innate/ui",
    props: ["defaultValue", "value", "onValueChange", "orientation"],
    taskDescription: "A full-featured navigation menu with NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuViewport, NavigationMenuIndicator, and navigationMenuTriggerStyle. Supports dropdown content panels triggered on hover or click. Use for site-wide or section navigation with nested content.",
  },
  {
    name: "pagination",
    slug: "pagination",
    category: "ui",
    subcategory: "navigation",
    description: "A component for navigating through paged content.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "A pagination control with Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, and PaginationEllipsis. Build page navigation by composing these sub-components. PaginationLink accepts isActive to highlight the current page.",
  },
  {
    name: "menubar",
    slug: "menubar",
    category: "ui",
    subcategory: "navigation",
    description: "A visually persistent menu common in desktop applications, combining menu and trigger.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "A menu bar with Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent, and MenubarShortcut. Mimics a desktop application menu bar with keyboard navigation. Items support checkboxes, radio groups, and nested submenus.",
  },

  // ===========================================================================
  // UI Components - Form
  // ===========================================================================
  {
    name: "input",
    slug: "input",
    category: "ui",
    subcategory: "form",
    description: "A text input field for single-line user input.",
    importPath: "@innate/ui",
    props: ["type", "placeholder", "value", "onChange", "disabled", "className"],
    taskDescription: "A styled text input component supporting all native input types (text, email, password, number, etc.). Includes focus ring styles, placeholder styling, file input support, and disabled state. Wraps the native input element with consistent theming.",
  },
  {
    name: "textarea",
    slug: "textarea",
    category: "ui",
    subcategory: "form",
    description: "A multi-line text input for longer content.",
    importPath: "@innate/ui",
    props: ["placeholder", "value", "onChange", "rows", "disabled", "className"],
    taskDescription: "A multi-line text input component. Extends the native textarea with consistent styling, focus ring, placeholder, and disabled state. Use the rows prop to control the visible line count. Suitable for comments, descriptions, and other long-form text input.",
  },
  {
    name: "select",
    slug: "select",
    category: "ui",
    subcategory: "form",
    description: "A dropdown for choosing from a list of options.",
    importPath: "@innate/ui",
    props: ["value", "onValueChange", "defaultValue", "disabled"],
    taskDescription: "A select dropdown with Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem, and SelectSeparator. Supports controlled (value/onValueChange) and uncontrolled (defaultValue) modes. Items are identified by the value prop. SelectTrigger displays the selected value via SelectValue.",
  },
  {
    name: "checkbox",
    slug: "checkbox",
    category: "ui",
    subcategory: "form",
    description: "A control for binary selections with a check indicator.",
    importPath: "@innate/ui",
    props: ["checked", "onCheckedChange", "disabled", "id"],
    taskDescription: "A checkbox input with Checkbox component. Supports controlled (checked/onCheckedChange) and uncontrolled usage. The checked state can be true, false, or 'indeterminate' for partial selection in parent checkboxes. Combine with Label for accessible form fields.",
  },
  {
    name: "radio-group",
    slug: "radio-group",
    category: "ui",
    subcategory: "form",
    description: "A group of mutually exclusive radio buttons.",
    importPath: "@innate/ui",
    props: ["value", "onValueChange", "defaultValue", "disabled"],
    taskDescription: "A radio button group with RadioGroup and RadioGroupItem. Only one option can be selected at a time. Use value/onValueChange for controlled state. Each RadioGroupItem needs a value prop and an id. Combine with Label for accessible form fields.",
  },
  {
    name: "switch",
    slug: "switch",
    category: "ui",
    subcategory: "form",
    description: "A toggle control for binary on/off settings.",
    importPath: "@innate/ui",
    props: ["checked", "onCheckedChange", "disabled", "id"],
    taskDescription: "A toggle switch component for on/off settings. Supports controlled (checked/onCheckedChange) and uncontrolled usage. Renders as an accessible toggle button with a sliding thumb indicator. Combine with Label for form field pairing.",
  },
  {
    name: "slider",
    slug: "slider",
    category: "ui",
    subcategory: "form",
    description: "An input for selecting a value from a range via a draggable thumb.",
    importPath: "@innate/ui",
    props: ["value", "onValueChange", "min", "max", "step", "disabled"],
    taskDescription: "A range slider input with one or more draggable thumbs. Use value/onValueChange for controlled state. Supports min, max, and step props for range configuration. Multiple thumbs are supported by passing an array of values.",
  },
  {
    name: "calendar",
    slug: "calendar",
    category: "ui",
    subcategory: "form",
    description: "A date picker calendar component for selecting dates.",
    importPath: "@innate/ui",
    props: ["mode", "selected", "onSelect", "disabled", "fromDate", "toDate"],
    taskDescription: "A calendar component built on react-day-picker. Supports selection modes: single, multiple, and range via the mode prop. Use selected/onSelect for controlled state. Supports disabling specific dates, date ranges, and custom navigation. Props: mode, selected, onSelect, disabled, fromDate, toDate.",
  },
  {
    name: "input-otp",
    slug: "input-otp",
    category: "ui",
    subcategory: "form",
    description: "An input for entering one-time passwords, split into individual character slots.",
    importPath: "@innate/ui",
    props: ["value", "onChange", "maxLength", "pattern", "containerClassName"],
    taskDescription: "A one-time password input with InputOTP, InputOTPGroup, InputOTPSlot, and InputOTPSeparator. Splits the input into individual character slots for OTP/verification code entry. Use maxLength to control the number of slots. Slots are defined by InputOTPSlot with index prop. Groups and separators allow visual grouping (e.g., 3-3 for 6 digits).",
  },
  {
    name: "form",
    slug: "form",
    category: "ui",
    subcategory: "form",
    description: "A form management component built on react-hook-form with validation.",
    importPath: "@innate/ui",
    props: ["form", "onSubmit"],
    taskDescription: "A form system built on react-hook-form with Form, FormField, FormItem, FormLabel, FormControl, FormDescription, and FormMessage. Integrates with zod schema validation via zodResolver. Use useForm hook to create the form instance, then spread into Form component. FormField renders each field with render prop receiving field helpers.",
  },
  {
    name: "label",
    slug: "label",
    category: "ui",
    subcategory: "form",
    description: "An accessible label for form controls.",
    importPath: "@innate/ui",
    props: ["htmlFor", "className"],
    taskDescription: "An accessible label component for form controls. Use the htmlFor prop to associate with a form element's id. Renders as a styled label element with proper typography and spacing.",
  },
  {
    name: "field",
    slug: "field",
    category: "ui",
    subcategory: "form",
    description: "A lightweight field wrapper combining label, input, and description/error messages.",
    importPath: "@innate/ui",
    props: ["name", "label", "description", "error"],
    taskDescription: "A lightweight field wrapper that combines a label, input area, description, and error message in one component. Useful for quickly building form fields without the full react-hook-form integration. Provides consistent layout for label, description, and validation error display.",
  },
  {
    name: "input-group",
    slug: "input-group",
    category: "ui",
    subcategory: "form",
    description: "An input with integrated addons, prefixes, and suffixes.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "An input group with InputGroup, InputGroupText, and related sub-components. Allows adding prefix/suffix elements like icons, currency symbols, or action buttons directly attached to an Input. Useful for search bars with a button, URL inputs with a domain prefix, or password fields with a toggle.",
  },

  // ===========================================================================
  // UI Components - Feedback
  // ===========================================================================
  {
    name: "dialog",
    slug: "dialog",
    category: "ui",
    subcategory: "feedback",
    description: "A modal overlay that interrupts the user to require attention or interaction.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange"],
    taskDescription: "A modal dialog with Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, and DialogClose. The overlay prevents interaction with the rest of the page. Use open/onOpenChange for controlled state. DialogTrigger toggles visibility. DialogTitle and DialogDescription are required for accessibility.",
  },
  {
    name: "sheet",
    slug: "sheet",
    category: "ui",
    subcategory: "feedback",
    description: "A panel that slides in from the edge of the screen.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "side"],
    taskDescription: "A sliding panel with Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, and SheetClose. Slides in from top, bottom, left, or right (default right) via the side prop on SheetContent. Use for mobile navigation, forms, or detail panels. SheetTitle and SheetDescription are required for accessibility.",
  },
  {
    name: "drawer",
    slug: "drawer",
    category: "ui",
    subcategory: "feedback",
    description: "A panel that slides up from the bottom of the screen, based on vaul.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "direction", "shouldScaleBackground"],
    taskDescription: "A bottom drawer component based on vaul with Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, and DrawerClose. Supports drag-to-dismiss gesture and background scaling. Use for mobile-friendly bottom sheets, action sheets, and confirmations.",
  },
  {
    name: "alert-dialog",
    slug: "alert-dialog",
    category: "ui",
    subcategory: "feedback",
    description: "A modal dialog requiring explicit user confirmation before proceeding.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange"],
    taskDescription: "A confirmation dialog with AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, and AlertDialogCancel. Forces the user to explicitly confirm or cancel an action. AlertDialogAction confirms and closes; AlertDialogCancel dismisses. Use for destructive or irreversible actions.",
  },
  {
    name: "tooltip",
    slug: "tooltip",
    category: "ui",
    subcategory: "feedback",
    description: "A popup showing informational text when hovering over an element.",
    importPath: "@innate/ui",
    props: ["delayDuration", "side", "align"],
    taskDescription: "A tooltip with TooltipProvider, Tooltip, TooltipTrigger, and TooltipContent. Shows informational text on hover or focus. Wrap the application (or section) in TooltipProvider. Each tooltip needs a Tooltip, TooltipTrigger (wraps the target element), and TooltipContent (the popup). Supports side and align positioning props.",
  },
  {
    name: "hover-card",
    slug: "hover-card",
    category: "ui",
    subcategory: "feedback",
    description: "A card-like popup that appears when hovering over a trigger element.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "openDelay", "closeDelay"],
    taskDescription: "A hover card with HoverCard, HoverCardTrigger, and HoverCardContent. Shows rich content in a popup on hover, with a brief delay. Useful for user profile previews, link previews, or additional details. Supports open/close delay configuration.",
  },
  {
    name: "popover",
    slug: "popover",
    category: "ui",
    subcategory: "feedback",
    description: "A floating panel anchored to a trigger element, for rich content display.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "modal"],
    taskDescription: "A floating panel with Popover, PopoverTrigger, and PopoverContent. Anchors to the trigger element and supports rich content like forms, color pickers, or custom controls. Use open/onOpenChange for controlled state. The modal prop controls whether clicking outside closes the popover.",
  },
  {
    name: "sonner",
    slug: "sonner",
    category: "ui",
    subcategory: "feedback",
    description: "A toast notification system based on the sonner library.",
    importPath: "@innate/ui",
    props: ["position", "richColors", "expand", "theme"],
    taskDescription: "A toast notification system using the sonner library. Call the toast() function to show notifications with variants: default, success, error, warning, and info. Supports custom duration, description, action buttons, and promise-based toasts. Place the Toaster component in the root layout. Import toast and Toaster from @innate/ui.",
  },
  {
    name: "alert",
    slug: "alert",
    category: "ui",
    subcategory: "feedback",
    description: "A box for displaying important messages to the user.",
    importPath: "@innate/ui",
    props: ["variant", "className"],
    taskDescription: "An alert box with Alert, AlertTitle, and AlertDescription. Displays important inline messages with variants: default (neutral) and destructive (red). Include an icon via the icon prop for visual emphasis. Use for form validation messages, system notices, or contextual warnings.",
  },
  {
    name: "toast",
    slug: "toast",
    category: "ui",
    subcategory: "feedback",
    description: "A transient notification that appears temporarily to inform the user.",
    importPath: "@innate/ui",
    props: ["variant", "title", "description", "action"],
    taskDescription: "A toast notification with Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastAction, and ToastClose. Uses the useToast hook for imperative control via toast() function. Supports variants: default and destructive. Toasts auto-dismiss after a configurable duration. For most cases, prefer the sonner-based Toaster instead.",
  },
  {
    name: "toaster",
    slug: "toaster",
    category: "ui",
    subcategory: "feedback",
    description: "The container component that renders active toast notifications.",
    importPath: "@innate/ui",
    props: ["theme", "richColors"],
    taskDescription: "The toast container component. Place Toaster in the root layout to enable toast notifications. Works with the useToast hook. Can also refer to the sonner-based toast system. This is a required companion to the toast notification system.",
  },

  // ===========================================================================
  // UI Components - Data Display
  // ===========================================================================
  {
    name: "table",
    slug: "table",
    category: "ui",
    subcategory: "data-display",
    description: "A structured table for displaying rows and columns of data.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "A styled HTML table with Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, and TableCell. Provides consistent styling for data tables. Wrap in a div with overflow-auto for responsive scrolling. Compose headers, rows, and cells using the sub-components.",
  },
  {
    name: "badge",
    slug: "badge",
    category: "ui",
    subcategory: "data-display",
    description: "A small status indicator or label for categorizing items.",
    importPath: "@innate/ui",
    props: ["variant", "className"],
    taskDescription: "A badge/tag component with variants: default (solid primary), secondary, destructive, and outline. Use to display status, categories, counts, or labels. Supports the asChild prop for rendering as a link. Compact inline element with rounded styling.",
  },
  {
    name: "avatar",
    slug: "avatar",
    category: "ui",
    subcategory: "data-display",
    description: "A user profile image with fallback initials.",
    importPath: "@innate/ui",
    props: ["src", "alt", "fallback"],
    taskDescription: "An avatar with Avatar, AvatarImage, and AvatarFallback. Displays a user profile image with a fallback for when the image fails to load or is not provided. AvatarFallback typically shows initials. AvatarImage accepts src and alt. All three components compose together.",
  },
  {
    name: "progress",
    slug: "progress",
    category: "ui",
    subcategory: "data-display",
    description: "A horizontal progress bar indicating completion status.",
    importPath: "@innate/ui",
    props: ["value", "max", "className"],
    taskDescription: "A progress bar component. Use the value prop (0-100) to set the fill percentage. The max prop defaults to 100. Renders as an accessible progress indicator with a filled track. Use for upload progress, form completion, or task status.",
  },
  {
    name: "skeleton",
    slug: "skeleton",
    category: "ui",
    subcategory: "data-display",
    description: "A placeholder that mimics the shape of content while it loads.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "A skeleton loading placeholder with animated pulse effect. Shape is controlled via className (e.g., h-4 w-full for a line, h-12 w-12 rounded-full for an avatar). Use to indicate loading state by mimicking the layout of the content that will appear.",
  },
  {
    name: "chart",
    slug: "chart",
    category: "ui",
    subcategory: "data-display",
    description: "A charting component built on Recharts for data visualization.",
    importPath: "@innate/ui",
    props: ["config", "className"],
    taskDescription: "A charting system built on Recharts with ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, and ChartLegendContent. Define charts using a config object that maps data keys to labels and colors. Supports line, bar, area, pie, and other Recharts chart types. ChartContainer wraps the Recharts components and applies the theme.",
  },
  {
    name: "spinner",
    slug: "spinner",
    category: "ui",
    subcategory: "data-display",
    description: "A simple loading spinner indicator.",
    importPath: "@innate/ui",
    props: ["size", "className"],
    taskDescription: "A lightweight loading spinner with animated rotation. Use the size prop or className to control dimensions. Displays a circular loading indicator for inline or centered loading states. Lighter than full skeleton screens for brief operations.",
  },
  {
    name: "empty",
    slug: "empty",
    category: "ui",
    subcategory: "data-display",
    description: "A placeholder for empty states with icon, title, and description.",
    importPath: "@innate/ui",
    props: ["icon", "title", "description", "action"],
    taskDescription: "An empty state placeholder with Empty component. Displays an icon, title, description, and optional action when there is no content to show. Use for empty lists, no search results, or onboarding states. Props: icon, title, description, action (a ReactNode for a CTA button).",
  },
  {
    name: "item",
    slug: "item",
    category: "ui",
    subcategory: "data-display",
    description: "A generic list item with icon, title, and description.",
    importPath: "@innate/ui",
    props: ["icon", "title", "description", "className"],
    taskDescription: "A generic list item component with icon, title, and description slots. Use for settings lists, feature lists, or any structured list content. Provides consistent layout with icon alignment and text hierarchy.",
  },
  {
    name: "kbd",
    slug: "kbd",
    category: "ui",
    subcategory: "data-display",
    description: "A styled keyboard key indicator for displaying shortcuts.",
    importPath: "@innate/ui",
    props: ["className"],
    taskDescription: "A keyboard key display component. Renders text as a styled key cap, suitable for showing keyboard shortcuts and key combinations. Use inline to indicate keyboard input (e.g., Ctrl+C, Esc).",
  },

  // ===========================================================================
  // UI Components - Actions
  // ===========================================================================
  {
    name: "button",
    slug: "button",
    category: "ui",
    subcategory: "actions",
    description: "A versatile button component with multiple variants and sizes.",
    importPath: "@innate/ui",
    props: ["variant", "size", "asChild", "disabled", "className"],
    taskDescription: "A button component with multiple variants (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon, icon-sm, icon-lg). Supports icons and the asChild pattern via Radix Slot to render as any element. Use for all clickable actions in the UI.",
  },
  {
    name: "button-group",
    slug: "button-group",
    category: "ui",
    subcategory: "actions",
    description: "A group of buttons visually connected together.",
    importPath: "@innate/ui",
    props: ["variant", "size", "orientation", "className"],
    taskDescription: "A button group with ButtonGroup, ButtonGroupItem. Visually connects multiple buttons into a single bar with shared variant and size styling. Supports horizontal and vertical orientations. Use for toolbars, segmented controls, or grouped actions.",
  },
  {
    name: "toggle",
    slug: "toggle",
    category: "ui",
    subcategory: "actions",
    description: "A two-state button that can be pressed or unpressed.",
    importPath: "@innate/ui",
    props: ["pressed", "onPressedChange", "variant", "size", "disabled"],
    taskDescription: "A toggle button with pressed/unpressed state. Supports variants: default, outline, and sizes: default, sm, lg. Use for toolbar buttons like bold/italic, or any on/off control that doesn't need a switch's visual form.",
  },
  {
    name: "toggle-group",
    slug: "toggle-group",
    category: "ui",
    subcategory: "actions",
    description: "A set of two-state buttons that can be toggled, in single or multiple selection mode.",
    importPath: "@innate/ui",
    props: ["type", "value", "onValueChange", "variant", "size", "disabled"],
    taskDescription: "A group of toggle buttons with ToggleGroup and ToggleGroupItem. Supports type='single' for one selection at a time, or type='multiple' for multiple selections. Use value/onValueChange for controlled state. Shared variant (default, outline) and size across items. Use for toolbar controls, view switches, or billing period toggles.",
  },
  {
    name: "dropdown-menu",
    slug: "dropdown-menu",
    category: "ui",
    subcategory: "actions",
    description: "A menu of actions or options triggered by a button.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "modal"],
    taskDescription: "A dropdown menu with DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, and DropdownMenuPortal. Supports checkboxes, radio groups, labels, separators, keyboard shortcuts, and nested submenus.",
  },
  {
    name: "context-menu",
    slug: "context-menu",
    category: "ui",
    subcategory: "actions",
    description: "A menu triggered by right-clicking, showing contextual actions.",
    importPath: "@innate/ui",
    props: ["open", "onOpenChange", "modal"],
    taskDescription: "A context menu with ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuSub, ContextMenuSubTrigger, and ContextMenuSubContent. Activated on right-click instead of a button trigger. Same feature set as DropdownMenu.",
  },
  {
    name: "command",
    slug: "command",
    category: "ui",
    subcategory: "actions",
    description: "A command palette for quick actions and search, built on cmdk.",
    importPath: "@innate/ui",
    props: ["value", "onValueChange", "filter"],
    taskDescription: "A command palette with Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, and CommandSeparator. Built on cmdk for accessible keyboard navigation. Use CommandDialog for a modal overlay triggered by a keyboard shortcut. Items are filterable via the built-in search. Use for quick actions, search, and navigation.",
  },

  // ===========================================================================
  // Block Components - Landing
  // ===========================================================================
  {
    name: "HeroSection",
    slug: "hero-section",
    category: "block",
    subcategory: "landing",
    description: "A hero section block with centered layout, gradient text highlight, and CTA buttons.",
    importPath: "@innate/ui",
    props: ["badge", "title", "titleHighlight", "subtitle", "primaryCta", "secondaryCta", "className"],
    taskDescription: "A hero section block with centered layout, gradient text highlight, optional badge, subtitle, and primary/secondary CTA buttons. Props: badge (object with icon, text, href), title, titleHighlight (text rendered with gradient), subtitle, primaryCta (object with text and href), secondaryCta (object with text and href), className.",
  },
  {
    name: "FeaturesSection",
    slug: "features-section",
    category: "block",
    subcategory: "landing",
    description: "A features grid section with icons, titles, and descriptions.",
    importPath: "@innate/ui",
    props: ["badge", "title", "subtitle", "features", "className"],
    taskDescription: "A features section block with an optional badge, heading, subtitle, and a responsive grid of feature cards. Each feature is an object with icon (React component), title, and description. Displays in a 1/2/3 column responsive grid. Props: badge, title, subtitle, features (array of {icon, title, description}), className.",
  },
  {
    name: "PricingSection",
    slug: "pricing-section",
    category: "block",
    subcategory: "landing",
    description: "A pricing table with monthly/yearly toggle and plan comparison cards.",
    importPath: "@innate/ui",
    props: ["badge", "title", "subtitle", "plans", "className"],
    taskDescription: "A pricing section with monthly/yearly billing toggle, plan comparison cards in a 3-column grid. Each plan has name, description, price, yearlyPrice, features array, cta text, popular flag, and includesPrevious. The popular plan gets highlighted with a primary border and badge. Props: badge, title, subtitle, plans (array of PricingPlan objects), className.",
  },
  {
    name: "TestimonialsSection",
    slug: "testimonials-section",
    category: "block",
    subcategory: "landing",
    description: "A testimonials section with masonry-style card layout and user avatars.",
    importPath: "@innate/ui",
    props: ["badge", "title", "subtitle", "testimonials", "className"],
    taskDescription: "A testimonials section with masonry-style card layout. Each testimonial is an object with name, role, image (optional avatar URL), and quote. Displays in a responsive multi-column masonry grid using CSS columns. Props: badge, title, subtitle, testimonials (array of {name, role, image, quote}), className.",
  },
  {
    name: "FaqSection",
    slug: "faq-section",
    category: "block",
    subcategory: "landing",
    description: "A FAQ section with expandable accordion items and optional CTA.",
    importPath: "@innate/ui",
    props: ["badge", "title", "subtitle", "items", "ctaText", "ctaHref", "className"],
    taskDescription: "A FAQ section with accordion items. Each item has value (unique ID), question, and answer. Includes an optional CTA button at the bottom. Built on the Accordion component with single-item collapsible mode. Props: badge, title, subtitle, items (array of {value, question, answer}), ctaText, ctaHref, className.",
  },
  {
    name: "StatsSection",
    slug: "stats-section",
    category: "block",
    subcategory: "landing",
    description: "A stats section displaying key metrics in a card grid.",
    importPath: "@innate/ui",
    props: ["stats", "className"],
    taskDescription: "A stats section displaying key metrics in a responsive card grid (1/2/4 columns). Each stat is an object with icon (React component), value (displayed prominently), label, and description. Cards have rounded borders with icon highlight. Props: stats (array of {icon, value, label, description}), className.",
  },
  {
    name: "CTASection",
    slug: "ctasection",
    category: "block",
    subcategory: "landing",
    description: "A call-to-action section with gradient title and action buttons.",
    importPath: "@innate/ui",
    props: ["title", "titleHighlight", "subtitle", "primaryCta", "secondaryCta", "trustIndicators", "className"],
    taskDescription: "A call-to-action section block with centered layout inside a styled card container. Features gradient text highlight on title, primary and secondary CTA buttons, and optional trust indicators (colored dots with text). Props: title, titleHighlight, subtitle, primaryCta ({text, href, icon}), secondaryCta ({text, href, icon}), trustIndicators (array of {text, color}), className.",
  },

  // ===========================================================================
  // Block Components - Auth
  // ===========================================================================
  {
    name: "LoginForm",
    slug: "login-form",
    category: "block",
    subcategory: "auth",
    description: "A login form block with email/password fields, optional Google login, and validation.",
    importPath: "@innate/ui",
    props: ["onSubmit", "onGoogleLogin", "signupHref", "forgotPasswordHref", "className"],
    taskDescription: "A login form block with email and password fields, optional Google OAuth button, and zod validation (email format, 8-char minimum password). Renders in a Card with header. Includes a divider between Google and email login. Supports links for signup and forgot password. Props: onSubmit (receives {email, password}), onGoogleLogin, signupHref, forgotPasswordHref, className.",
  },

  // ===========================================================================
  // Block Components - Mail
  // ===========================================================================
  {
    name: "Inbox",
    slug: "inbox",
    category: "block",
    subcategory: "mail",
    description: "A full mail inbox interface with sidebar, mail list, and mail display panels.",
    importPath: "@innate/ui",
    props: ["mails", "folders", "defaultLayout", "defaultCollapsed", "navCollapsedSize", "className"],
    taskDescription: "A full mail inbox interface with three resizable panels: folder sidebar, mail list, and mail display. The sidebar is collapsible and shows folders with icons and labels. Built on ResizablePanelGroup. Props: mails (array of MailItem), folders (array of MailFolder with title, label, icon, variant), defaultLayout ([sidebar, list, display] size percentages), defaultCollapsed, navCollapsedSize, className.",
  },
  {
    name: "MailList",
    slug: "mail-list",
    category: "block",
    subcategory: "mail",
    description: "A scrollable mail list with selection, read/unread indicators, and labels.",
    importPath: "@innate/ui",
    props: ["items", "selected", "onSelect", "className"],
    taskDescription: "A scrollable mail list component. Each item shows sender name, unread indicator (blue dot), relative timestamp, subject, preview text (truncated), and label badges. Supports single selection with the selected prop and onSelect callback. Props: items (array of MailItem), selected (string ID), onSelect (callback with ID), className.",
  },
  {
    name: "MailDisplay",
    slug: "mail-display",
    category: "block",
    subcategory: "mail",
    description: "A mail detail view with toolbar, header, body, and reply composer.",
    importPath: "@innate/ui",
    props: ["mail", "onReply", "onArchive", "onDelete", "className"],
    taskDescription: "A mail detail display with action toolbar (archive, delete, reply, forward, more options), email header with avatar/sender/subject/date, body content, and a reply composer with textarea and send button. Shows empty state when no mail is selected. Props: mail (MailItem or null), onReply, onArchive, onDelete, className.",
  },

  // ===========================================================================
  // Block Components - Chat
  // ===========================================================================
  {
    name: "ChatInterface",
    slug: "chat-interface",
    category: "block",
    subcategory: "chat",
    description: "A full chat interface with conversation list, message area, and input composer.",
    importPath: "@innate/ui",
    props: ["conversations", "users", "messages", "currentUserId", "activeConversationId", "onSendMessage", "onSelectConversation", "className"],
    taskDescription: "A full chat interface with two resizable panels: conversation sidebar and chat area. The sidebar shows conversations with avatars, names, last message preview, timestamps, and unread counts. The chat area shows a header, messages via MessageList, and a text input with send button. Supports Enter to send. Props: conversations, users, messages, currentUserId, activeConversationId, onSendMessage, onSelectConversation, className.",
  },
  {
    name: "MessageList",
    slug: "message-list",
    category: "block",
    subcategory: "chat",
    description: "A scrollable message list with date grouping, avatars, reactions, and actions.",
    importPath: "@innate/ui",
    props: ["messages", "users", "currentUserId", "className"],
    taskDescription: "A message list with auto-scroll, day-based grouping with date separators, sender avatars and names, own/other message alignment (own messages right-aligned with primary background), reactions display, edited indicator, read receipts, and a context menu with reply/copy/delete actions. Props: messages (array of ChatMessage), users (array of ChatUser), currentUserId, className.",
  },
]

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/** Lookup by URL slug */
export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return componentRegistry.find((c) => c.slug === slug)
}

/** Lookup map from component name to its metadata */
export const componentByName: Record<string, ComponentMeta> = Object.fromEntries(
  componentRegistry.map((c) => [c.name, c])
)

/** Get all unique categories (ui, block) */
export function getCategories(): string[] {
  return [...new Set(componentRegistry.map((c) => c.category))]
}

/** Get all unique subcategories */
export function getSubcategories(): string[] {
  return [...new Set(componentRegistry.map((c) => c.subcategory))]
}

/** Get components filtered by category */
export function getComponentsByCategory(category: "ui" | "block"): ComponentMeta[] {
  return componentRegistry.filter((c) => c.category === category)
}

/** Get components filtered by subcategory */
export function getComponentsBySubcategory(subcategory: string): ComponentMeta[] {
  return componentRegistry.filter((c) => c.subcategory === subcategory)
}
