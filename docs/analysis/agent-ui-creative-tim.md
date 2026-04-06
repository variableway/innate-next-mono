# Agent: ui (Creative Tim) Frontend Design

## Overview
A premium component library built on shadcn/ui by Creative Tim, offering professionally designed UI blocks organized into five categories: Marketing blocks, Application UI, E-commerce, Web 3.0, and Dashboard layouts. Built with Next.js 13 and React 18, it provides a monorepo registry system with CLI integration for adding components. Targeted at developers who want polished, production-ready UI blocks with a premium design aesthetic.

## Tech Stack
- Framework: Next.js 13, React 18
- UI Library: shadcn/ui
- Styling: Tailwind CSS v3
- Distribution: Monorepo with registry system
- CLI: Custom CLI for component addition

## Key Components

### Marketing Blocks
- **Hero Sections**: Multiple hero variants with headlines, CTAs, images, and background treatments
- **Feature Sections**: Feature grids and lists with icons, descriptions, and illustrations
- **Pricing Tables**: Tiered pricing displays with feature comparison and selection
- **Testimonial Sections**: Customer testimonial carousels and grids
- **Footer Blocks**: Multi-column footer layouts with links, social icons, and newsletter signup
- **CTA Sections**: Call-to-action banners with varied layouts and emphasis levels

### Application UI Blocks
- **Navigation Bars**: Top navigation with dropdowns, search, and user menu
- **Sidebar Navigation**: Collapsible sidebar with nested menu items
- **Settings Panels**: User settings forms with tabs, toggles, and input groups
- **Profile Pages**: User profile displays with avatars, stats, and activity feeds
- **Notification Centers**: Dropdown and full-page notification displays

### E-commerce Components
- **Product Cards**: Product display cards with images, pricing, ratings, and add-to-cart
- **Product Grids**: Responsive product listing layouts with filters and sorting
- **Shopping Cart**: Cart sidebar or page with item management and checkout summary
- **Checkout Flow**: Multi-step checkout with address, payment, and confirmation forms
- **Order History**: Order listing and detail views

### Web 3.0 Components
- **Wallet Connect**: Blockchain wallet connection interface
- **Token Display**: Cryptocurrency token cards with balance and price information
- **NFT Cards**: NFT display cards with image, metadata, and marketplace actions
- **DAO Governance**: Proposal cards with voting interface and status indicators

### Dashboard Layouts
- **Analytics Dashboard**: Stats cards, charts, and data tables for analytics views
- **Admin Dashboard**: Full admin layout with sidebar, header, and content management
- **User Management**: User listing, detail, and role management interfaces
- **Content Dashboard**: Content listing with CRUD operations and media management

## Design Patterns
- **Category-Based Organization**: Components organized by use case (marketing, app UI, e-commerce, Web 3, dashboard) rather than by component type
- **Registry System**: Monorepo-based registry allows selective component installation via CLI
- **Block Composition**: Complex page sections assembled from smaller, reusable block components
- **Premium Aesthetic**: Consistently polished visual design with attention to spacing, typography, and color harmony
- **CLI Distribution**: Custom CLI tool mirrors the shadcn/ui add pattern for seamless component integration
- **Full-Page Templates**: Complete page templates provided in addition to individual components

## Layout Templates
- **Marketing Landing Page**: Full landing page with all marketing block sections composed together
- **SaaS Application**: Complete app layout with navigation, sidebar, and content areas
- **E-commerce Storefront**: Product browsing, detail, cart, and checkout pages
- **Web 3.0 Dashboard**: Blockchain-focused dashboard with wallet and token management
- **Admin Panel**: Dashboard with data tables, charts, forms, and user management

## Usage Guide
1. **Category Selection**: Browse by category (marketing, app, e-commerce, Web 3, dashboard) to find components matching the project type
2. **CLI Installation**: Use the CLI to add specific blocks or entire page templates to the project
3. **Block Composition**: Combine multiple blocks to assemble complete pages -- marketing blocks for landing pages, app UI blocks for application interfaces
4. **E-commerce Projects**: Leverage the full e-commerce component set for product browsing, cart, and checkout flows
5. **Dashboard Projects**: Use the dashboard layout templates as starting points, customizing data displays and navigation for specific needs
6. **Web 3.0 Projects**: Apply the wallet connect, token display, and NFT components for blockchain-related interfaces
7. **Registry Integration**: Extend the registry system with custom blocks specific to the project for consistent distribution
