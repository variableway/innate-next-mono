# Task 5: Rebuild Layout Composer from Dashboard Template

## Context

The current `apps/layout-composer` needs to be completely rebuilt based on the `shadcn-dashboard-landing-template`. The goal is a showcase app where users browse dashboard/app/page layouts and UI components, then copy AI task descriptions to use in their AI agent chats.

## UI Diagram

### Overall App Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Layout Composer App                                                        │
│ ┌──────────┬──────────────────────────────────────────────────────────────┐ │
│ │          │  [SiteHeader: Logo | Search | Theme Toggle | User Avatar]   │ │
│ │          ├──────────────────────────────────────────────────────────────┤ │
│ │          │                                                              │ │
│ │ Sidebar │  Main Content Area                                           │ │
│ │          │                                                              │ │
│ │ ┌──────┐ │  (Changes based on selected route)                          │ │
│ │ │Logo  │ │                                                              │ │
│ │ └──────┘ │                                                              │ │
│ │          │                                                              │ │
│ │ DASHBOARDS│  ┌─────────────────────────────────────────────────────┐   │ │
│ │  Dashboard│  │                                                     │   │ │
│ │  Dashboard│  │  [Page Content: Dashboard / Mail / Chat / etc.]     │   │ │
│ │          │  │                                                     │   │ │
│ │ APPS     │  │                                                     │   │ │
│ │  Mail    │  │                                                     │   │ │
│ │  Tasks   │  │                                                     │   │ │
│ │  Chat    │  │                                                     │   │ │
│ │  Calendar│  │                                                     │   │ │
│ │  Users   │  │                                                     │   │ │
│ │          │  │                                                     │   │ │
│ │ PAGES    │  │                                                     │   │ │
│ │  Auth    │  │                                                     │   │ │
│ │  Errors  │  └─────────────────────────────────────────────────────┘   │ │
│ │  Settings│                                                              │ │
│ │  FAQs    │  ┌──────────────────────────────────────────────────────┐   │ │
│ │  Pricing │  │ [AI Task Description] button (floating or inline)   │   │ │
│ │          │  │ Click → Dialog with AI prompt → Copy to clipboard   │   │ │
│ │ COMPONENTS│ └──────────────────────────────────────────────────────┘   │ │
│ │  All Comp│                                                              │ │
│ │          │  ┌──────────────────────────────────────────────────────┐   │ │
│ │──────────│  │ [SiteFooter: Innate branding]                       │   │ │
│ │ [Theme]  │  └──────────────────────────────────────────────────────┘   │ │
│ └──────────┴──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Sidebar Navigation Detail

```
┌──────────────────────┐
│  [Logo] Innate       │
│  Layout Composer     │
├──────────────────────┤
│                      │
│  DASHBOARDS          │
│   ▸ Dashboard 1      │
│   ▸ Dashboard 2      │
│                      │
│  APPS                │
│   ▸ Mail             │
│   ▸ Tasks            │
│   ▸ Chat             │
│   ▸ Calendar         │
│   ▸ Users            │
│                      │
│  PAGES               │
│   ▸ Landing Page     │
│   ▾ Auth Pages       │
│      Sign In 1/2/3   │
│      Sign Up 1/2/3   │
│      Forgot Pass 1/2 │
│   ▾ Errors           │
│      404/403/500     │
│   ▾ Settings         │
│      User/Account    │
│      Appearance      │
│      Notifications   │
│   ▸ FAQs             │
│   ▸ Pricing          │
│                      │
│  COMPONENTS  ← NEW   │
│   ▸ All Components   │
│   ▸ UI Primitives    │
│   ▸ Blocks           │
│   ▸ Charts           │
│                      │
├──────────────────────┤
│  [Theme Customizer]  │
│  [User Avatar]       │
└──────────────────────┘
```

### Dashboard Page (Example)

```
┌──────────────────────────────────────────────────────────┐
│  Dashboard                          [AI Task] [Theme]    │
│  Welcome to your admin dashboard                         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Revenue  │ │Customers │ │ Accounts │ │ Growth   │  │
│  │ $45,231  │ │ +2,350   │ │ +12,234  │ │ +4.5%    │  │
│  │ +20.1%   │ │ +180.1%  │ │ +19%     │ │ +10%     │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Interactive Area Chart                           │    │
│  │  📈  [Last 3 months | Last 6 months | All time] │    │
│  │                                                  │    │
│  │   ╱╲    ╱╲╱╲                                    │    │
│  │  ╱  ╲  ╱    ╲                                   │    │
│  │ ╱    ╲╱      ╲╱╲                                │    │
│  │______________________________________________    │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Data Table                        [Filter] [Sort]│    │
│  │ Name          │ Status  │ Date       │ Amount    │    │
│  │ ──────────────│─────────│────────────│────────── │    │
│  │ Olivia Martin │ Done    │ 2024-01-15 │ $1,999    │    │
│  │ Jackson Lee   │ Pending │ 2024-01-14 │ $39.00    │    │
│  │ ...           │ ...     │ ...        │ ...       │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Components Catalog Page (NEW)

```
┌──────────────────────────────────────────────────────────┐
│  UI Components                        [AI Task] [Theme]  │
│  Browse all available @innate/ui components              │
│                                                          │
│  [Filter: All | Layout | Form | Feedback | Data | ...]   │
│  [Search...                               ]              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │  Button    │ │  Card      │ │  Dialog    │           │
│  │            │ │            │ │            │           │
│  │ [Preview]  │ │ [Preview]  │ │ [Preview]  │           │
│  │            │ │            │ │            │           │
│  │ [Code] [AI]│ │ [Code] [AI]│ │ [Code] [AI]│           │
│  └────────────┘ └────────────┘ └────────────┘           │
│                                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │  Input     │ │  Select    │ │  Table     │           │
│  │            │ │            │ │            │           │
│  │ [Preview]  │ │ [Preview]  │ │ [Preview]  │           │
│  │            │ │            │ │            │           │
│  │ [Code] [AI]│ │ [Code] [AI]│ │ [Code] [AI]│           │
│  └────────────┘ └────────────┘ └────────────┘           │
│                                                          │
│  ... (57 components total, paginated)                    │
└──────────────────────────────────────────────────────────┘
```

### AI Task Description Dialog

```
┌──────────────────────────────────────────────┐
│  AI Task Description                    [✕]  │
├──────────────────────────────────────────────┤
│                                              │
│  Page: Dashboard Layout                     │
│  Category: Dashboard                        │
│  Tags: dashboard, charts, table, kpi, admin │
│                                              │
│  ┌──────────────────────────────────────────┐│
│  │ Create a dashboard page with the         ││
│  │ following layout:                        ││
│  │                                          ││
│  │ - Top row: 4 stat cards showing key      ││
│  │   metrics (revenue, users, orders, etc.) ││
│  │ - Middle: An interactive area chart      ││
│  │   showing trend data over time           ││
│  │ - Bottom: A sortable data table with     ││
│  │   pagination                             ││
│  │                                          ││
│  │ Use shadcn/ui components: Card, Chart,   ││
│  │ DataTable with @tanstack/react-table.    ││
│  │ Sidebar uses SidebarProvider pattern.    ││
│  └──────────────────────────────────────────┘│
│                                              │
│  [Customize]               [Copy to Clipboard]    │
│                                              │
│  ─────────────────────────────────────────── │
│  How to use:                                 │
│  1. Copy the AI description above            │
│  2. Paste into your AI agent chat            │
│  3. The AI generates the layout code         │
│  4. Refine as needed                         │
└──────────────────────────────────────────────┘
```

### Theme Customizer Panel

```
┌──────────────────────────────────────────────┐
│  Theme Customizer                       [✕]  │
├──────────────────────────────────────────────┤
│  [Color Theme] [Layout] [Import]             │
│                                              │
│  Color Theme:                                │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│  │Def │ │Red │ │Blue│ │Grn │ │Org │  ...    │
│  └────┘ └────┘ └────┘ └────┘ └────┘        │
│                                              │
│  Radius: [0] [0.3] [0.5] [0.75] [1.0]      │
│                                              │
│  Mode: [Light] [Dark] [System]               │
│                                              │
│  ─────────────────────────────────────────── │
│  Sidebar Layout:                             │
│  Variant: [Default] [Floating] [Inset]       │
│  Collapsible: [Off Canvas] [Icon] [None]     │
│  Side: [Left] [Right]                        │
└──────────────────────────────────────────────┘
```

## Implementation Plan (5 Phases)

### Phase 1: Project Shell (Core)

**Goal**: Set up the project skeleton with sidebar, header, footer, and theme system.

**Steps**:
1. Delete current `apps/layout-composer` content (keep directory)
2. Create new project files: `package.json`, `tsconfig.json`, `next.config.ts`
3. Copy infrastructure from template:
   - Theme system: `theme-provider.tsx`, `use-theme-manager.ts`
   - Contexts and hooks for theme management
   - Type definitions for sidebar configuration
4. Create `app/layout.tsx` (root layout with fonts, metadata, ThemeProvider)
5. Create `app/(dashboard)/layout.tsx` (SidebarProvider + SidebarInset shell)
6. Create `app-sidebar.tsx` with 4 categories: Dashboards / Apps / Pages / Components
7. Create `site-header.tsx` (breadcrumb nav, theme toggle, search)
8. Create `site-footer.tsx` (Innate branding)
9. All imports from `@innate/ui` -- no local `components/ui/` directory

**Key files from template**:
- `frontend-tpl/shadcn-dashboard-landing-template/nextjs-version/src/components/app-sidebar.tsx`
- `frontend-tpl/shadcn-dashboard-landing-template/nextjs-version/src/app/(dashboard)/layout.tsx`
- `frontend-tpl/shadcn-dashboard-landing-template/nextjs-version/src/components/theme-provider.tsx`
- `frontend-tpl/shadcn-dashboard-landing-template/nextjs-version/src/hooks/use-theme-manager.ts`

### Phase 2: Dashboard + Apps Pages

**Goal**: Port all dashboard and app pages from the template.

**Steps**:
1. Port `/dashboard` (stat cards, area chart, data table with sample data)
2. Port `/dashboard-2` (alternative dashboard layout)
3. Port `/apps/mail` (mail client layout)
4. Port `/apps/chat` (chat interface)
5. Port `/apps/calendar` (calendar view)
6. Port `/apps/tasks` (task management)
7. Port `/apps/users` (user list/table)
8. Replace all `@/components/ui/*` imports with `@innate/ui`

**Import replacement pattern**:
- `@/components/ui/button` → `@innate/ui` (single import)
- `@/components/sidebar` → `@innate/ui` (Sidebar components)
- Local component files → keep only page-specific logic

### Phase 3: Pages Category

**Goal**: Port all static/utility pages.

**Steps**:
1. Auth pages (9 variants):
   - Sign In pages (3 variants)
   - Sign Up pages (3 variants)
   - Forgot Password pages (2 variants)
   - 2FA page
2. Error pages (5 variants):
   - 404, 403, 500, 503, maintenance
3. Settings pages (6 types):
   - Account, Appearance, Notifications, Display, Profile, Security
4. Content pages:
   - FAQs (accordion-based)
   - Pricing (comparison table)
   - Landing page

### Phase 4: Components Category (NEW)

**Goal**: Create a new component catalog section not in the original template.

**Steps**:
1. Create component registry (`src/config/component-registry.ts`) listing all 57 `@innate/ui` components with:
   - Name, slug, category (layout/form/feedback/data-display/actions/navigation)
   - Description, import path, props list
   - AI task description
2. Create `/components` catalog page:
   - Grid layout with filter tabs (All / Layout / Form / etc.)
   - Search input
   - Each card shows: name, mini preview, Copy Code + Copy AI Task buttons
3. Create `/components/[name]` detail page:
   - Full preview with scale controls
   - Code tab (usage example)
   - AI Task tab (prompt for AI agent)
   - Related components links

### Phase 5: AI Task Description Feature

**Goal**: Add AI task descriptions to every page in the app.

**Steps**:
1. Create `src/config/ai-descriptions.ts`:
   - Centralized registry mapping route → AI task description
   - Covers all dashboards, apps, pages, and components
2. Create `AiTaskButton` component:
   - Floating button in the page header
   - Opens a dialog showing the AI task description
   - One-click copy to clipboard
   - Shows page name, category, tags
3. Integrate into dashboard layout:
   - Button reads current route via `usePathname()`
   - Looks up the matching AI description
   - No per-page changes needed
4. Each description follows a template:
   - Layout description (what the page looks like)
   - Component list (which shadcn/ui components to use)
   - Data requirements (what sample data structure)
   - Interaction notes (buttons, forms, etc.)

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| All UI from `@innate/ui` | No local component duplicates; single source of truth |
| Template pages adapted, not copied | Replace all UI imports to use the shared package |
| Theme system from template | Full dark/light + theme presets + sidebar customization |
| AI task button is floating | One component reads route, no per-page changes needed |
| Components catalog is new | Doesn't exist in template; lists all @innate/ui components |
| Custom theme provider (not next-themes) | Template uses its own system with OKLCH + CSS variables |

## Technical Architecture

```
apps/layout-composer/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root: fonts, ThemeProvider
│   │   ├── globals.css             # OKLCH colors, Tailwind theme
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx          # SidebarProvider shell
│   │   │   ├── page.tsx            # Redirect to /dashboard
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx        # Dashboard 1
│   │   │   │   └── dashboard-2/
│   │   │   │       └── page.tsx    # Dashboard 2
│   │   │   ├── apps/
│   │   │   │   ├── mail/page.tsx
│   │   │   │   ├── chat/page.tsx
│   │   │   │   ├── calendar/page.tsx
│   │   │   │   ├── tasks/page.tsx
│   │   │   │   └── users/page.tsx
│   │   │   ├── pages/
│   │   │   │   ├── auth/           # 9 auth page variants
│   │   │   │   ├── errors/         # 5 error page variants
│   │   │   │   ├── settings/       # 6 settings page variants
│   │   │   │   ├── faqs/page.tsx
│   │   │   │   ├── pricing/page.tsx
│   │   │   │   └── landing/page.tsx
│   │   │   └── components/
│   │   │       ├── page.tsx        # Component catalog grid
│   │   │       └── [name]/
│   │   │           └── page.tsx    # Component detail
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── app-sidebar.tsx         # Sidebar with 4 categories
│   │   ├── site-header.tsx         # Header with breadcrumb + theme toggle
│   │   ├── site-footer.tsx         # Footer branding
│   │   ├── ai-task-button.tsx      # Floating AI task dialog
│   │   └── theme-customizer.tsx    # Theme settings panel
│   ├── hooks/
│   │   └── use-theme-manager.ts    # Theme management
│   ├── config/
│   │   ├── component-registry.ts   # 57 components metadata
│   │   └── ai-descriptions.ts      # Route → AI prompt mapping
│   └── lib/
│       └── utils.ts                # cn() utility
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Verification

After implementation, verify by:

1. **Build**: `cd apps/layout-composer && pnpm build` -- must compile without errors
2. **Dev server**: `pnpm dev` -- app loads at localhost:3000
3. **Sidebar**: Click each category (Dashboards/Apps/Pages/Components) -- navigation works
4. **Dashboard pages**: View both dashboards -- cards, charts, tables render
5. **App pages**: Check Mail, Chat, Calendar, Tasks, Users -- layouts render
6. **Auth pages**: Verify all 9 variants display correctly
7. **Components catalog**: Grid shows 57 components, filter tabs work
8. **AI Task button**: Click on any page -- dialog shows, copy works
9. **Theme**: Toggle dark/light -- all pages respond; change theme preset -- colors update
10. **Sidebar collapse**: Toggle sidebar -- collapses to icon mode, pages reflow
