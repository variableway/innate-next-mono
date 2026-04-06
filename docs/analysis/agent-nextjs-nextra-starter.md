# Agent: nextjs-nextra-starter Frontend Design

## Overview
A documentation site starter built on Nextra v4 with Next.js 16, providing multilingual support through dynamic `[lang]` routing. Combines the content-authoring strengths of Nextra (MDX-based pages, full-text search via Pagefind, automatic sidebar generation) with shadcn/ui components for interactive elements. Includes custom widget components for visual enhancement and uses turbopack for fast development builds.

## Tech Stack
- Framework: Next.js 16, React 19
- Docs Engine: Nextra v4
- UI Library: shadcn/ui
- Styling: Tailwind CSS v4
- Search: Pagefind
- i18n: Dynamic [lang] routing
- Build: turbopack

## Key Components

### Documentation Components (Nextra Built-in)
- **Page Layout**: Auto-generated sidebar navigation, table of contents, and breadcrumb from MDX file structure
- **Search**: Pagefind-powered full-text search with instant results
- **Code Blocks**: Syntax-highlighted code blocks with copy button, line highlighting, and filename display
- **Callouts**: Note, warning, tip, and info callout blocks
- **Tabs**: Content tabs for switching between code examples, languages, or frameworks
- **Cards**: Clickable card components for linking to related documentation pages

### Custom Widget Components
- **card-hover-effect**: Interactive card component with hover animations for visual engagement and click feedback
- **flip-words**: Animated text component that cycles through a list of words with a flip transition effect, useful for hero sections and feature highlights
- **loader**: Loading indicator component with configurable animation styles for async content states
- **particles**: Background particle animation widget for adding visual depth and movement to hero or landing sections

### i18n Components
- **Language Switcher**: Dropdown or toggle for switching between available languages
- **Localized Navigation**: Sidebar and navigation items rendered in the active locale
- **Translation Provider**: Context provider managing the current language and translation lookups

## Design Patterns
- **File-Based Routing**: Documentation structure derived directly from the MDX file hierarchy -- no manual route configuration needed
- **Dynamic Locale Routing**: `[lang]` segment in routes enables clean URL patterns like `/en/docs/getting-started` and `/zh/docs/getting-started`
- **MDX Authoring**: Content written in MDX combines Markdown simplicity with React component interactivity
- **Static Search**: Pagefind builds a static search index at build time for fast, client-side search without a backend
- **Turbopack Development**: Uses turbopack for significantly faster HMR during content authoring
- **Component Widgets**: Interactive widgets enhance static documentation with dynamic visual elements

## Layout Templates
- **Documentation Page**: Sidebar + content area + table of contents with responsive mobile drawer
- **Landing/Home Page**: Hero section with custom widgets (particles, flip-words) and feature cards
- **API Reference**: Structured endpoint documentation with request/response examples
- **Blog/Changelog**: Chronological content listing with date and category metadata

## Usage Guide
1. **Documentation Sites**: Use as the starting point for any project documentation, API reference, or knowledge base site
2. **Multilingual Content**: Follow the `[lang]` routing pattern to support multiple languages with shared layout and navigation
3. **MDX Authoring**: Write documentation pages in MDX format, embedding both standard Markdown and custom React components
4. **Search Integration**: Pagefind provides zero-config full-text search -- content is indexed automatically at build time
5. **Custom Widgets**: Use the card-hover-effect, flip-words, and particles widgets to add visual polish to landing pages and key documentation sections
6. **Nextra Configuration**: Customize the Nextra theme configuration for branding, navigation links, footer content, and table of contents behavior
7. **Performance**: Leverage turbopack during development for fast feedback; production builds use standard Next.js optimization
8. **Component Mixing**: Combine Nextra's built-in documentation components with shadcn/ui components for interactive elements like forms, dialogs, and data display within documentation pages
