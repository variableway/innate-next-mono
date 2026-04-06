# Agent: shadcn-dashboard-landing-template Frontend Design

## Overview
A comprehensive template combining an admin dashboard with a marketing landing page, offering 30+ pages across dual framework support (Vite and Next.js 15). Built with React 19 and shadcn/ui v3, it provides a complete set of marketing page sections, dashboard layouts, and full application interfaces (Mail, Tasks, Chat, Calendar) with a built-in theme customizer powered by tweakcn integration.

## Tech Stack
- Framework: Next.js 15 + Vite (dual support)
- UI Library: shadcn/ui v3
- Styling: Tailwind CSS v4
- Forms: React Hook Form + Zod
- Data Tables: TanStack Table
- Charts: Recharts
- Theme: tweakcn integration

## Key Components

### Landing Page Sections
- **Hero**: Full-width hero with headline, subtext, CTA buttons, and background treatment
- **About**: Company or product description section with image and text layout
- **Features**: Feature grid with icons, titles, and descriptions
- **Stats**: Numerical statistics display with counters and labels
- **Logo Carousel**: Auto-scrolling logo showcase for social proof
- **Team**: Team member cards with photos, names, and roles
- **Testimonials**: Customer quote cards with attribution and ratings
- **Blog**: Blog post preview cards with image, title, excerpt, and date
- **Pricing**: Pricing table with tier comparison and feature lists
- **FAQ**: Expandable FAQ items using Accordion pattern
- **Contact**: Contact form with validation using React Hook Form + Zod
- **CTA**: Call-to-action banner with headline and action button

### Dashboard Components
- **Sidebar Navigation**: Collapsible sidebar with nested menu items, icons, and active state indicators
- **Data Tables**: Full-featured tables built on TanStack Table with sorting, filtering, pagination, and row selection
- **Charts**: Data visualization using Recharts (line, bar, area, pie charts)
- **Form Panels**: Validated form sections using React Hook Form with Zod schemas
- **Stats Cards**: Summary metric cards with trend indicators and sparklines
- **Breadcrumbs**: Navigation breadcrumbs with dynamic route segments

### Application Interfaces
- **Mail App**: Email client with folder sidebar, message list, and compose/view panes
- **Tasks App**: Task management with lists, cards, status tracking, and due dates
- **Chat App**: Real-time messaging interface with conversation list and message thread
- **Calendar App**: Monthly/weekly/daily calendar views with event management

### Theme System
- **Theme Customizer**: Integrated tweakcn-powered panel for live theme editing
- **Color Presets**: Pre-configured color palette options
- **Layout Options**: Configurable sidebar behavior, content width, and density settings

## Design Patterns
- **Dual Framework**: Same component codebase compiles for both Vite (SPA) and Next.js (SSR) deployments
- **Section-Based Landing**: Marketing pages assembled from composable section blocks that can be reordered and configured independently
- **Data-Driven Tables**: TanStack Table provides headless table logic with shadcn/ui styled rendering for consistent data display
- **Schema Validation**: Zod schemas define form structure and validation rules, shared between client and server
- **Chart Integration**: Recharts wrapped in shadcn/ui Card components for consistent chart presentation
- **App Shell Pattern**: Dashboard, mail, tasks, chat, and calendar apps share a common shell with sidebar navigation

## Layout Templates
- **Marketing Landing**: Scrollable single-page layout with section blocks
- **Dashboard**: Sidebar + header + content area with nested routing
- **Data Table Page**: Full-page table with toolbar, filters, and pagination
- **Form Page**: Centered or split-panel form with validation feedback
- **Mail Layout**: Three-column layout (folders, message list, message detail)
- **Tasks Layout**: Board view with columns or list view with filters
- **Chat Layout**: Sidebar conversations + main message thread
- **Calendar Layout**: Full calendar grid with sidebar event details

## Usage Guide
1. **Marketing Sites**: Start with the landing page template and select relevant sections (Hero, Features, Pricing, etc.) for the product being marketed
2. **Admin Dashboards**: Use the dashboard layout with sidebar navigation as the application shell, then add data tables and charts as needed
3. **Full Applications**: Reference the Mail, Tasks, Chat, and Calendar app patterns when building similar productivity applications
4. **Data Tables**: Implement TanStack Table with the provided wrapper components for consistent, feature-rich data display with sorting, filtering, and pagination
5. **Forms**: Use the React Hook Form + Zod pattern for all form implementations to get type-safe validation with consistent error handling
6. **Theme Customization**: Integrate the tweakcn-powered theme customizer to allow end users to personalize the application's visual appearance
7. **Framework Choice**: Deploy as Next.js for SSR/SSG benefits or as Vite SPA for simpler hosting requirements
