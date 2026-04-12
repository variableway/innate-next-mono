# Layout Components UI for better task writing

## Task 1: Create layout components ui for task writing

- 常见一个展示所有ui中component，layout等等所有组件的网页，用户可以在网页中查看所有组件的代码，
- 然后选择需要的页面布局生成可以让AI Agent更好里面的task的描述，可以组合复制这些任务的描述
- 比如选择了一个layout组件，就可以生成类似于一个task描述，生成什么样的布局，block使用使用什么这样的东西

请分析这个网站的可行性，架构，难点，似乎是在shacdn-ui这个基础上实现，因为目前的网站只是展示，但是没有添加生成AI task生成的描述，但是请你可行性分析，架构，技术难度，计划和任务拆解。技术细节需要说明的比较清楚明了，让不是前端开发的专家也可以理解难点问题或者使用的技术。

## Task 2: 请实现这个网站的功能

请按照[layout-feature](../../docs/features/layout-components-ui.md)中的描述，实现这个网站的功能,在app/layout-composer目录下实现，如果这个目录没有请重新创建.

## Task 3: 迁移shadcn-ui 到当前应用

1. https://ui.shadcn.com/ is a website for displaying all the components in shadcn-ui
2. folder [shadcn-ui](../../frontend-tpl/shadcn-ui) is the source code of shadcn-ui
3. please review this project to understand, and generate an AGENTs.md file 
4. What I want to change to my current layout-composer application is that
    1. the shadcn-ui's block page is the home page of this application
    2. the sider bar of this applicaiton is the different of sections:
        1. blocks
        2. components
        3. charts
    3. once click these seciton, the main page is two columns layout:
       1. the left side is sidebar like display all the blocks/components 
       2. once click one block or componet, the right side is the detail page of that block or componet
       3. in the right side, there is a button to copy the code of that block or componet and a button to copy the AI task description of that block or componet
    4. copy all the code of that block or componet into current project ui package,it should be well-structured

## Task 4: Component/Block Migration

1. 确保[shadcn-ui](../../frontend-tpl/shadcn-ui) 中所有的components and blocks 都被迁移，目前我看是没有的
尤其是block，并且要把这些Block，UI component 迁移到 packages/ui 中去，layout composer的组件可以在layout composer 中编写
2. Sidebar的实现UI非常不好，希望直接可以用gshadcn-ui中自己的实现完成，UI的间隔非常不好
3. Siderbar选择比如说Block之后，右侧Content也是two column 设计，默认第一个Block选中，然后右边展示会Block的内容的
4. Home Page 可以沿用目前形势，但是需要有Sidebar，同时Sidebar是可以折叠的

## Task 5: Refine the Layout Website
I just remove the apps/layout-composer project, let create a totally new project,based on:
1. [hadcn-dashboard-landing-template](../../frontend-tpl/shadcn-dashboard-landing-template) 
2. [shadcn-ui](../../frontend-tpl/shadcn-ui) and [website](../../frontend-tpl/shadcn-ui/apps)

Here is the task:
1. please find: https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template/dashboard for referenece,learn it and read it.
2. The Source code is in[hadcn-dashboard-landing-template](../../frontend-tpl/shadcn-dashboard-landing-template) nextjs version
3. Please Read this page and this repo to change 
4. The Sidebar is same as the dashboard landing template,and all the component is same as this page
5. and put all the component in [text](../../packages/ui) package
6. and also include theme settings
7. The dashboard project with three categories:
    - Dashboard 
    - Apps
    - Pages
    I wan to add Component category in the sidebar
8. And in every Page, has a AI task description in Dashboard/Apps/Pages Category
9. in Component Category,every Component have a AI Task Description.

Let's first implement these, the main focus on this application is:
1. for user to easy to copy and generate UI code, use can see the layout, maybe application/dashboard/pages/Components, then copy the AI description to make it in AI Agent Chat
2. And also to collect UI blocks,components for further usage

## Task 5 Plan: Rebuild Layout Composer from Dashboard Template

> Detailed plan document: [docs/features/layout-composer-task5-plan.md](../../docs/features/layout-composer-task5-plan.md)

### Context

Rebuild `apps/layout-composer` based on `shadcn-dashboard-landing-template`. Users browse dashboard/app/page layouts and UI components, then copy AI task descriptions for their AI agent chats.

### UI Diagrams

#### Overall App Structure

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
│ │ DASHBOARDS│                                                             │ │
│ │  Dashboard│                                                             │ │
│ │  Dashboard│                                                             │ │
│ │          │                                                              │ │
│ │ APPS     │                                                              │ │
│ │  Mail    │                                                              │ │
│ │  Tasks   │                                                              │ │
│ │  Chat    │                                                              │ │
│ │  Calendar│                                                              │ │
│ │  Users   │                                                              │ │
│ │          │                                                              │ │
│ │ PAGES    │                                                              │ │
│ │  Auth    │                                                              │ │
│ │  Errors  │                                                              │ │
│ │  Settings│                                                              │ │
│ │  FAQs    │                                                              │ │
│ │  Pricing │                                                              │ │
│ │          │                                                              │ │
│ │ COMPONENTS│                                                             │ │
│ │  All Comp│                                                              │ │
│ │          │                                                              │ │
│ │──────────│                                                              │ │
│ │ [Theme]  │                                                              │ │
│ └──────────┴──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Sidebar Navigation

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

#### Dashboard Page

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
│  │ Olivia Martin │ Done    │ 2024-01-15 │ $1,999    │    │
│  │ Jackson Lee   │ Pending │ 2024-01-14 │ $39.00    │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

#### Components Catalog Page (NEW)

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
│  │ [Preview]  │ │ [Preview]  │ │ [Preview]  │           │
│  │ [Code] [AI]│ │ [Code] [AI]│ │ [Code] [AI]│           │
│  └────────────┘ └────────────┘ └────────────┘           │
│                                                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │  Input     │ │  Select    │ │  Table     │           │
│  │ [Preview]  │ │ [Preview]  │ │ [Preview]  │           │
│  │ [Code] [AI]│ │ [Code] [AI]│ │ [Code] [AI]│           │
│  └────────────┘ └────────────┘ └────────────┘           │
│                                                          │
│  ... (57 components total)                               │
└──────────────────────────────────────────────────────────┘
```

#### AI Task Description Dialog

```
┌──────────────────────────────────────────────┐
│  AI Task Description                    [✕]  │
├──────────────────────────────────────────────┤
│  Page: Dashboard Layout                     │
│  Category: Dashboard                        │
│  Tags: dashboard, charts, table, kpi        │
│                                              │
│  ┌──────────────────────────────────────────┐│
│  │ Create a dashboard page with the         ││
│  │ following layout:                        ││
│  │ - Top row: 4 stat cards showing key      ││
│  │   metrics (revenue, users, orders)       ││
│  │ - Middle: An interactive area chart      ││
│  │ - Bottom: A sortable data table          ││
│  │                                          ││
│  │ Use shadcn/ui: Card, Chart, DataTable.   ││
│  └──────────────────────────────────────────┘│
│                                              │
│  [Customize]          [Copy to Clipboard]    │
│                                              │
│  How to use:                                 │
│  1. Copy the AI description above            │
│  2. Paste into your AI agent chat            │
│  3. The AI generates the layout code         │
│  4. Refine as needed                         │
└──────────────────────────────────────────────┘
```

#### Theme Customizer Panel

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
│  Mode: [Light] [Dark] [System]               │
│                                              │
│  Sidebar Layout:                             │
│  Variant: [Default] [Floating] [Inset]       │
│  Collapsible: [Off Canvas] [Icon] [None]     │
│  Side: [Left] [Right]                        │
└──────────────────────────────────────────────┘
```

### Implementation Plan (5 Phases)

#### Phase 1: Project Shell (Core)
1. Delete current `apps/layout-composer` content
2. Create new project: `package.json`, `tsconfig.json`, `next.config.ts`
3. Copy theme system from template (theme-provider, use-theme-manager)
4. Create `app/layout.tsx` (root), `app/(dashboard)/layout.tsx` (sidebar shell)
5. Create `app-sidebar.tsx` (4 categories: Dashboards/Apps/Pages/Components)
6. Create `site-header.tsx`, `site-footer.tsx`
7. All UI imports from `@innate/ui`

#### Phase 2: Dashboard + Apps Pages
1. Port `/dashboard`, `/dashboard-2` (cards, charts, data tables)
2. Port `/apps/mail`, `/apps/chat`, `/apps/calendar`, `/apps/tasks`, `/apps/users`
3. Replace all `@/components/ui/*` → `@innate/ui`

#### Phase 3: Pages Category
1. Auth pages (9 variants: sign-in/up/forgot-password x 3)
2. Error pages (5 variants: 404/403/500/503/maintenance)
3. Settings pages (6 types: account/appearance/notifications/display/profile/security)
4. FAQs, Pricing, Landing pages

#### Phase 4: Components Category (NEW)
1. Component registry (`src/config/component-registry.ts`) with 57 components
2. `/components` catalog page (grid + filters + search)
3. `/components/[name]` detail page (preview + code + AI task)

#### Phase 5: AI Task Description Feature
1. `src/config/ai-descriptions.ts` (route → AI prompt mapping)
2. `AiTaskButton` component (floating, reads route, dialog with copy)
3. Auto-applied to all pages via dashboard layout

### Key Decisions
- **All UI from `@innate/ui`** — no local component duplicates
- **Template pages adapted** — replace all UI imports to shared package
- **Theme system from template** — dark/light + presets + sidebar config
- **AI task button is floating** — reads route, no per-page changes
- **Components catalog is new** — lists all 57 @innate/ui components

### Verification
1. `pnpm build` — compiles without errors
2. Sidebar navigation works for all 4 categories
3. Dashboard pages render cards, charts, tables
4. App pages (Mail/Chat/Calendar/Tasks/Users) render layouts
5. Auth pages display all 9 variants
6. Component catalog grid shows all 57 components with working filters
7. AI Task button dialog shows and copy works on every page
8. Theme toggle (dark/light) works; theme presets change colors
9. Sidebar collapses to icon mode correctly