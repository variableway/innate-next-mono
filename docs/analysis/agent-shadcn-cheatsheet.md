# Agent: shadcn-cheatsheet Frontend Design

## Overview
An interactive component reference guide for shadcn/ui, providing 45+ components with live previews and copy-paste code snippets. Built with Next.js 15.5, React 19, and Framer Motion, it features smart search, a theme customizer, and responsive design. Serves as both a learning resource and a quick-reference tool for developers working with shadcn/ui components.

## Tech Stack
- Framework: Next.js 15.5, React 19
- UI Library: shadcn/ui
- Styling: Tailwind CSS v4
- Animation: Framer Motion
- Search: Client-side smart search
- Theming: Built-in theme customizer

## Key Components

### Reference Display Components
- **Component Card**: Individual component showcase card with title, description, and live preview
- **Live Preview**: Interactive, rendered component instances that users can interact with directly in the reference
- **Code Block**: Syntax-highlighted code display with one-click copy functionality for each component example
- **Variant Switcher**: Toggle between component variants (e.g., default, destructive, outline for Button) within the preview
- **Prop Table**: Tabular display of component props with type information, defaults, and descriptions

### Navigation and Search
- **Smart Search**: Fuzzy search across component names, descriptions, and categories with instant results
- **Category Sidebar**: Categorized navigation for browsing components by type (forms, data display, overlays, etc.)
- **Breadcrumb Navigation**: Hierarchical navigation showing current component location within categories
- **Quick Jump**: Keyboard-navigable component list for power users

### Theme System
- **Theme Customizer**: Real-time theme adjustment panel that applies changes across all component previews simultaneously
- **Color Palette Editor**: Visual color selection for theme tokens
- **Dark Mode Toggle**: Light/dark mode switcher applied to all previews
- **Preset Themes**: Pre-configured theme options for quick style changes

### Animation Components (Framer Motion)
- **Transition Effects**: Smooth page and component transitions using Framer Motion animations
- **Hover Animations**: Interactive hover effects on component cards and navigation items
- **Reveal Animations**: Scroll-triggered reveal animations for content sections
- **Micro-interactions**: Subtle motion feedback on user interactions (copy confirmation, filter changes)

## Design Patterns
- **Interactive Reference**: Components are displayed with live, interactive previews rather than static screenshots
- **Copy-Paste Workflow**: One-click code copying optimized for the shadcn "copy into your project" philosophy
- **Fuzzy Search**: Client-side search tolerates typos and partial matches for quick component discovery
- **Progressive Disclosure**: Component previews show the most common usage first, with variant and prop details available on expansion
- **Theme Propagation**: Theme customizer changes apply universally across all previews for consistent evaluation
- **Responsive Reference**: Layout adapts from sidebar + content on desktop to stacked navigation on mobile

## Layout Templates
- **Component Index**: Grid or list of all components with search and filter controls
- **Component Detail**: Full-page view with live preview, code snippets, variant showcase, and prop documentation
- **Category Page**: Filtered view showing components within a specific category
- **Theme Editor Panel**: Slide-out or sidebar panel for theme customization

## Usage Guide
1. **Component Discovery**: Use the smart search to quickly find components by name, category, or description
2. **Live Testing**: Interact with component previews to understand behavior before adding to a project
3. **Code Extraction**: Click to copy component code directly from the reference into project files
4. **Theme Evaluation**: Use the theme customizer to preview how components look with different color schemes and styles
5. **Variant Exploration**: Toggle between component variants within the preview to select the appropriate style for each use case
6. **Framer Motion Patterns**: Reference the animation implementations for adding similar motion effects to shadcn/ui components in other projects
7. **Responsive Testing**: View the reference at different viewport sizes to verify component responsive behavior
