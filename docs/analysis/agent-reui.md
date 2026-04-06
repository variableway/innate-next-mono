# Agent: reui Frontend Design

## Overview
A design-forward shadcn kit offering 1000+ components across 68 categories. Reui extends the standard shadcn/ui library with 17 in-house primitive components not found in the default distribution, including advanced data display and interaction patterns like Data Grid, Kanban, Timeline, and Sortable. Supports dual library backends (Radix UI and Base UI) and is compatible with multiple shadcn style systems.

## Tech Stack
- Framework: Next.js, React 18+
- UI Library: @base-ui/react, Radix UI (dual support)
- Styling: Tailwind CSS v4
- Compatible Styles: Vega, Nova, Maia, Lyra, Mira

## Key Components

### Standard Components (980+)
Full coverage of standard shadcn/ui components across categories including forms, data display, navigation, overlays, and layout.

### Exclusive In-House Primitives (17)
- **Data Grid**: Advanced spreadsheet-like data table with inline editing, sorting, filtering, and column resizing
- **Kanban**: Drag-and-drop board with swim lanes, card management, and column customization
- **Filters**: Advanced filter builder with multiple condition types, operators, and nested logic
- **Sortable**: Drag-and-drop sortable list component with smooth animations and touch support
- **Timeline**: Vertical/horizontal timeline display with milestone markers and content sections
- **Stepper**: Multi-step process indicator with linear and non-linear navigation patterns
- **Tree**: Hierarchical tree view with expand/collapse, selection, and drag-and-drop reordering
- **Color Picker**: Full-featured color selection with gradient, hex input, and palette support
- **Rating**: Star-based rating component with half-star precision and interactive selection
- **Tags Input**: Tokenized input for adding and managing tag entries
- **Signature**: Canvas-based signature capture component
- **QR Code**: Dynamic QR code generation and display
- **Editor**: Rich text / WYSIWYG editor component
- **Spreadsheet**: Tabular data entry with formula support
- **Date Range Picker**: Extended date selection with range boundaries
- **Mention**: @-mention input with suggestion dropdown
- **Combobox Advanced**: Extended combobox with grouping, async search, and custom rendering

### Dual Library Support
- **Radix UI Backend**: Uses Radix UI primitives for accessible, battle-tested component behaviors
- **Base UI Backend**: Uses @base-ui/react for a lighter-weight alternative with MUI-influenced API patterns

## Design Patterns
- **Category Organization**: Components organized into 68 functional categories for discoverability
- **Style Compatibility**: Components render correctly across five shadcn style systems (Vega, Nova, Maia, Lyra, Mira)
- **Advanced Data Patterns**: Rich data interaction components (Data Grid, Kanban, Filters, Sortable) for complex application UIs
- **Dual Rendering**: Same component API surface backed by either Radix UI or Base UI primitives
- **Progressive Complexity**: Components offer simple defaults with opt-in complexity for advanced use cases

## Layout Templates
- **Dashboard Layouts**: Multiple dashboard templates with sidebar, header, and content area configurations
- **Data Management**: Table-heavy layouts with inline editing, bulk actions, and filter panels
- **Kanban Boards**: Project management style layouts with drag-and-drop columns
- **Form Wizards**: Multi-step form layouts using the Stepper component
- **Timeline Views**: Activity and history displays using the Timeline component
- **Tree Navigation**: File explorer and hierarchical navigation layouts

## Usage Guide
1. **Advanced Data UIs**: Use the Data Grid, Kanban, and Filters components when building admin panels, project management tools, or data-heavy applications that go beyond basic tables
2. **Style Selection**: Choose a compatible style (Vega, Nova, Maia, Lyra, Mira) that aligns with the project's visual identity
3. **Backend Choice**: Select Radix UI backend for maximum accessibility and ecosystem compatibility, or Base UI backend for lighter bundles and MUI-familiar APIs
4. **Drag-and-Drop**: Leverage the Sortable component for list reordering and the Kanban component for board-based workflows
5. **Rich Input Patterns**: Use Tags Input, Mention, and Combobox Advanced for sophisticated form interactions
6. **Process Flows**: Apply the Stepper component for multi-step wizards, onboarding flows, and checkout processes
7. **Visual Data**: Use the Timeline component for activity feeds, project histories, and chronological displays
