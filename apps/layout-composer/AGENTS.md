# Layout Composer - AI Agent Context

## Project Overview

Layout Composer is a Next.js application that showcases the @innate/ui component library with AI task description generation capabilities. The app is migrated from [shadcn/ui](https://ui.shadcn.com/) (source at `frontend-tpl/shadcn-ui`).

## shadcn-ui Migration Analysis

### Source: `frontend-tpl/shadcn-ui`
- **Stack**: Next.js 16 + React 19 + Tailwind CSS 4 + Radix UI
- **Structure**: Monorepo with `apps/v4/` (main app), `packages/shadcn/` (core package)
- **Registry**: Component registry at `registry/new-york-v4/` with `ui/`, `blocks/` directories
- **Content**: 55+ UI components, 30+ blocks (sidebar/login/signup/dashboard), 50+ charts
- **Key patterns**: Schema-based registry, iframe-based block previews, MDX docs

### Migration Decisions
- **Blocks as home page**: Home (`/`) redirects to `/blocks` per Task 3 spec
- **Sidebar navigation**: Three sections (Blocks, Components, Charts) from shadcn-ui pattern
- **Two-column layout**: Left sidebar lists items, right side shows detail
- **Copy features**: Copy code + Copy AI task description on every item
- **UI package**: All components use `@innate/ui` package (already implemented)

### What was migrated
- Component registry with 734 entries
- All UI component previews
- Block components (dashboard, sidebar, login, signup, landing, auth, mail, chat)
- Chart components (area, bar, line, pie, radar, radial, tooltip)
- Sidebar navigation pattern
- Copy code and AI task description functionality

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: @innate/ui package (57 components)
- **Icons**: Lucide React
- **State**: Zustand (AI drawer)
- **Charts**: Recharts (via @innate/ui)

### Route Structure

```
src/app/
├── page.tsx                    # Redirects to /blocks (home = blocks page)
├── layout.tsx                  # Root layout with fonts
├── globals.css                 # Global styles
├── (catalog)/                  # Catalog route group with sidebar
│   ├── layout.tsx             # Catalog layout with sidebar + item sidebar
│   ├── blocks/
│   │   ├── page.tsx           # Blocks listing with category tabs
│   │   └── [slug]/
│   │       └── page.tsx       # Block detail (preview/code/task tabs)
│   ├── components/
│   │   ├── page.tsx           # Components listing with subcategory tabs
│   │   └── [slug]/
│   │       └── page.tsx       # Component detail (preview/code/task tabs)
│   └── charts/
│       ├── page.tsx           # Charts listing with type tabs
│       └── [type]/
│           └── page.tsx       # Chart type listing (area/bar/line/pie/radar)
├── task-builder/              # AI task builder feature
└── ...
```

### Key Features

#### 1. Catalog Layout (`(catalog)/layout.tsx`)
- **Main Sidebar**: Three sections (Blocks, Components, Charts)
- **Item Sidebar**: Shows subcategories within current section
- **Responsive**: Collapses on mobile

#### 2. Blocks Showcase
- Category tabs (Dashboard, Sidebar, Login, Signup, Landing, Auth, Mail, Chat)
- Featured blocks grid on main page
- Block detail pages with:
  - Live preview via ComponentPreview
  - Code example (copyable)
  - AI task description (copyable)

#### 3. Components Showcase
- Subcategory tabs (Layout, Form, Feedback, Data Display, Actions, Navigation)
- Component cards with:
  - Mini preview via ComponentPreview
  - Props display
  - Copy code/task buttons
- Component detail with preview/code/task tabs

#### 4. Charts Showcase
- Chart type tabs (Area, Bar, Line, Pie, Radar)
- Chart cards with previews
- Chart type detail pages showing all charts of that type

### Component Registry

Located at `src/lib/registry.ts`:

```typescript
interface ComponentMeta {
  name: string           // Display name
  slug: string          // URL identifier
  category: "ui" | "block"
  subcategory: string   // For grouping
  description: string   // Short description
  importPath: string    // Package import path
  props?: string[]      // Available props
  taskDescription: string  // AI task description
}
```

### Component Preview System

Located at `src/lib/component-preview.tsx`:
- Maps slug to preview component via `previewMap`
- Each preview function renders a small example using @innate/ui
- Supports `compact` mode for card views

### Copy Features

All component/block cards include:
- **Copy Code**: Copies import + usage example
- **Copy Task**: Copies AI task description for LLMs

### Navigation Flow

1. User lands on `/` → redirects to `/blocks`
2. Main sidebar shows Blocks, Components, Charts sections
3. Item sidebar shows subcategories within section
4. Click item → right side shows detail with preview/code/task tabs
5. Can copy code or AI task description

## File Structure

```
src/
├── app/                     # Next.js app routes
├── components/              # Shared components
│   ├── site-header.tsx     # Site header (unused in new layout)
│   ├── block-toolbar.tsx   # Block preview toolbar
│   └── resizable-preview.tsx
├── lib/                     # Utilities
│   ├── registry.ts         # Component registry (734 entries)
│   ├── component-preview.tsx  # Preview components for each slug
│   ├── ai-drawer.tsx       # AI drawer (legacy)
│   └── ai-drawer-store.ts  # State management
└── ...
```

## Common Tasks

### Adding a New Block
1. Add entry to `componentRegistry` in `lib/registry.ts`
2. Set `category: "block"` and appropriate `subcategory`
3. Add `taskDescription` for AI
4. Add preview function in `lib/component-preview.tsx`
5. Add to `previewMap`

### Adding a New Component
1. Add entry to `componentRegistry` in `lib/registry.ts`
2. Set `category: "ui"` and appropriate `subcategory`
3. Add `taskDescription` for AI
4. Add preview function in `lib/component-preview.tsx`
5. Add to `previewMap`
6. Ensure component is exported from @innate/ui package

### Adding a New Chart
1. Add chart entry to registry (category: "block", subcategory: chart type)
2. Add preview component in `component-preview.tsx`
3. Chart appears in charts listing automatically

### Updating Navigation
Edit `src/app/(catalog)/layout.tsx`:
- Modify `sidebarSections` array
- Update items for each section

## Dependencies

- `@innate/ui` - Component library (57 UI components, blocks, charts)
- `lucide-react` - Icons
- `zustand` - State management (AI drawer)

## Build

```bash
npm run build
```

Builds to `.next/` with static pages for listings and dynamic pages for detail views.
