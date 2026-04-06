# Agent: shadcn-ui Frontend Design

## Overview
The official shadcn/ui component library (v0.0.1) providing 57+ base UI components and 75+ block components. Built on Next.js 16 with React 19, it offers composable, accessible primitives with three style variants (New York, Nova, Radix). Components are copied into projects rather than installed as dependencies, giving full control over styling and behavior.

## Tech Stack
- Framework: Next.js 16, React 19
- UI Library: @base-ui/react, Radix UI
- Styling: Tailwind CSS v3/v4, CSS variables
- Icons: Lucide
- Configuration: style "new-york", baseColor "neutral", iconLibrary "lucide"

## Key Components

### Base Components (57+)
- **Layout**: Accordion, Card, Collapsible, Resizable, ScrollArea, Separator, Sidebar, Tabs
- **Forms**: Button, ButtonGroup, Checkbox, Combobox, Field, Input, InputGroup, InputOTP, NativeSelect, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup
- **Data Display**: Avatar, Badge, Breadcrumb, Calendar, Carousel, Chart, Empty, Item, Kbd, Label, Pagination, Progress, Skeleton, Spinner, Table
- **Overlays**: AlertDialog, Command, ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Menubar, NavigationMenu, Popover, Sheet, Sonner, Tooltip

### Block Components (75+)
Pre-assembled combinations of base components for common UI patterns such as authentication forms, dashboard cards, data tables, and marketing sections.

### Style Variants
- **New York**: Clean, professional aesthetic with subtle borders and neutral tones
- **Nova**: Modern, rounded design with softer visual treatment
- **Radix**: Minimalist approach closely following Radix UI defaults

## Design Patterns
- **Composable Architecture**: Components are primitives that compose together rather than monolithic widgets
- **Copy-Paste Model**: Code lives in the project, not in node_modules, enabling full customization
- **CSS Variable Theming**: All colors defined as CSS variables for easy theme switching
- **Radix Primitives**: Built on accessible, unstyled Radix UI primitives with Tailwind styling layered on top
- **Variant System**: Uses `class-variance-authority` (CVA) for managing component style variants
- **Compound Components**: Complex components use compound patterns (e.g., Card with CardHeader, CardContent, CardFooter)

## Layout Templates

### Dashboard Layouts (16+ sidebar variations)
- Collapsible sidebar with icon-only mode
- Fixed sidebar with navigation groups
- Sidebar with search and user menu
- Mixed sidebar/header navigation patterns

### Authentication Layouts (5+ login variations)
- Simple email/password login
- Social login with provider buttons
- Two-column layout with brand imagery
- Card-centered authentication forms

### Card-Based Layouts
- Stat cards with trend indicators
- Data tables with filters
- Content grids with pagination
- Settings panels with form sections

## Usage Guide
1. **Initialization**: Run `npx shadcn@latest init` to configure the project with preferred style, base color, and CSS variable strategy
2. **Adding Components**: Use `npx shadcn@latest add <component>` to copy individual components into the project
3. **Customization**: Modify component files directly in the project's `components/ui` directory -- they are fully owned project code
4. **Theming**: Override CSS variables in the global stylesheet to change the color palette across all components
5. **Style Selection**: Choose between New York, Nova, or Radix styles during init or in `components.json` to match the project's visual language
6. **Block Assembly**: Use block components as starting points for page sections, then customize to fit specific requirements
7. **Composition**: Build complex UIs by composing base components rather than creating custom widgets from scratch
8. **Migration Path**: Components can be incrementally adopted -- start with a few and expand as needed
