# Agent: awesome-shadcn-ui Frontend Design

## Overview
A community resource directory and showcase for the shadcn/ui ecosystem. Built with Next.js 16 and React 19, it provides a curated collection of 60+ components combining standard shadcn/ui primitives with 20+ custom-built components designed for directory and catalog interfaces. Uses the "radix-lyra" style variant with OKLCH color space for modern, perceptually uniform colors.

## Tech Stack
- Framework: Next.js 16, React 19
- UI Library: shadcn/ui (radix-lyra style)
- Styling: Tailwind CSS v4, CSS variables, OKLCH color space
- Base Color: Zinc
- Configuration: style "radix-lyra", baseColor "zinc"

## Key Components

### Standard shadcn/ui Components (40+)
Core primitives from the shadcn/ui library including Button, Card, Dialog, DropdownMenu, Input, Select, Sheet, Table, Tabs, and others used throughout the directory interface.

### Custom Components (20+)
- **item-card**: Card variant optimized for displaying catalog items with metadata, tags, and action buttons
- **item-grid**: Responsive grid layout for displaying multiple item-cards with configurable columns
- **search-filter-controls**: Combined search input and filter dropdown system with active filter indicators
- **sort**: Sort control component supporting multiple sort criteria with direction toggling
- **pagination-controls**: Pagination component with page numbers, prev/next navigation, and page size selection
- **github-stars**: GitHub star count display widget with link integration
- **theme-toggle**: Light/dark/system theme switcher with smooth transition animation

## Design Patterns
- **Directory Pattern**: Card-based browsing with search, filter, sort, and pagination -- a reusable pattern for any catalog-style interface
- **OKLCH Color Space**: Uses perceptually uniform color representation for smoother gradients and more predictable color mixing
- **Radix-Lyra Style**: Extends the Lyra aesthetic with Radix UI primitives, offering a distinctive visual identity compared to default shadcn
- **Community Integration**: GitHub stars and repository metadata displayed inline with content cards
- **Responsive Grid**: Adaptive grid layouts that reflow based on viewport width
- **Filter State Management**: Search and filter controls maintain URL-synced state for shareable filtered views

## Layout Templates
- **Directory Landing**: Hero section with search bar, category filters, and featured items grid
- **Category Browse**: Filtered grid of items with sidebar filters and sort controls
- **Item Detail**: Full detail view with metadata, links, and related items
- **Search Results**: Filtered and sorted grid with active filter chips and result count

## Usage Guide
1. **Directory Interfaces**: Use the item-card and item-grid patterns when building any catalog, marketplace, or resource directory
2. **Search and Filter**: Adopt the search-filter-controls pattern for building browsable content collections with real-time filtering
3. **OKLCH Colors**: Leverage OKLCH color space for more perceptually uniform palettes, especially useful for accessible design with consistent lightness contrast
4. **Custom Components**: The 20 custom components can be extracted and adapted for projects that need similar directory or showcase functionality
5. **Theme System**: Use the theme-toggle component pattern for implementing light/dark mode with system preference detection
6. **Pagination Pattern**: Apply the pagination-controls component for any paginated data display, configured with appropriate page sizes
7. **Zinc Base Color**: The zinc base color provides a neutral, professional foundation that works well with colorful accent elements
