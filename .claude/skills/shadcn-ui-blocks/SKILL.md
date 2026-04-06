---
name: shadcn-ui-blocks
description: Create and scaffold Next.js + shadcn/ui projects with production-ready landing pages, dashboards, and auth flows. Use this skill whenever the user wants to create a new Next.js project, build a landing page, create an admin dashboard, add authentication UI, or use shadcn/ui components and blocks. Also trigger when the user mentions "shadcn", "landing page", "dashboard", "admin panel", "signup form", "login page", or wants to build any modern React UI.
---

# shadcn/ui Blocks - Next.js Project Scaffold

Build production-ready Next.js applications with shadcn/ui components and pre-built blocks.

## When to Use This Skill

- Creating a new Next.js + shadcn/ui project
- Building landing pages (hero, features, pricing, testimonials, FAQ, CTA)
- Creating admin dashboards with sidebar navigation
- Adding authentication UI (login, signup forms)
- Working with the `@innate/ui` component library
- Extracting or composing UI blocks from template references

## Architecture Overview

This project uses a monorepo structure with shared UI packages:

```
innate-next-mono/
├── packages/
│   ├── ui/                    # Shared UI component library (@innate/ui)
│   │   ├── src/
│   │   │   ├── components/ui/ # Base shadcn/ui components (60+)
│   │   │   ├── block/         # Composed block components
│   │   │   │   ├── landing/   # Landing page sections
│   │   │   │   └── auth/      # Authentication forms
│   │   │   └── lib/utils.ts   # cn() utility
│   │   └── package.json
│   ├── tsconfig/              # Shared TypeScript configs
│   └── utils/                 # Shared utilities
├── frontend-tpl/              # Template reference projects (10 projects)
└── docs/analysis/             # Agent analysis files for each template
```

## Base Components Available

All base shadcn/ui components are in `@innate/ui` (packages/ui/src/components/ui/):

**Layout**: Card, Separator, Resizable, ScrollArea, AspectRatio, Sidebar
**Navigation**: Tabs, Breadcrumb, NavigationMenu, Pagination, Menubar, Sidebar
**Forms**: Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, Calendar, InputOTP, Form
**Feedback**: Dialog, Sheet, Drawer, AlertDialog, Tooltip, HoverCard, Popover, Sonner (toast)
**Data Display**: Table, Badge, Avatar, Progress, Skeleton, Chart, Accordion, Collapsible
**Actions**: Button, ButtonGroup, Toggle, ToggleGroup, DropdownMenu, ContextMenu, Command

## Block Components

### Landing Page Blocks (`@innate/ui/block/landing`)

Each landing page section accepts data via props for maximum reusability:

```tsx
import {
  HeroSection,
  FeaturesSection,
  PricingSection,
  TestimonialsSection,
  FaqSection,
  StatsSection,
  CTASection,
} from "@innate/ui"

// Hero - centered headline with gradient text and CTAs
<HeroSection
  badge={{ text: "New: Feature Released", icon: <Star /> }}
  title="Build Better Web Applications"
  titleHighlight="Web Applications"
  subtitle="Accelerate your development with our curated collection of blocks and templates."
  primaryCta={{ text: "Get Started", href: "/signup" }}
  secondaryCta={{ text: "Watch Demo", href: "#demo" }}
/>

// Features - responsive grid with icons
<FeaturesSection
  badge="Features"
  title="Everything you need"
  subtitle="Build professional applications faster."
  features={[
    { icon: ZapIcon, title: "Fast", description: "Lightning-fast performance" },
    { icon: ShieldIcon, title: "Secure", description: "Enterprise-grade security" },
  ]}
/>

// Pricing - monthly/yearly toggle with plan cards
<PricingSection
  badge="Pricing"
  title="Choose your plan"
  subtitle="Start free, upgrade when ready."
  plans={[
    { name: "Free", price: 0, features: [...], cta: "Get Started" },
    { name: "Pro", price: 19, yearlyPrice: 15, features: [...], cta: "Get Started", popular: true },
  ]}
/>

// Testimonials - masonry grid layout
<TestimonialsSection
  badge="Testimonials"
  title="Trusted by developers"
  testimonials={[
    { name: "Alex", role: "Engineer", quote: "Great product!" },
  ]}
/>

// FAQ - accordion-based Q&A
<FaqSection
  badge="FAQ"
  title="Common Questions"
  items={[
    { value: "1", question: "How?", answer: "Easy!" },
  ]}
/>

// Stats - grid of metric cards
<StatsSection
  stats={[
    { icon: UsersIcon, value: "10K+", label: "Users", description: "Active community" },
  ]}
/>

// CTA - call-to-action section
<CTASection
  title="Get started today"
  subtitle="Build faster with our components."
  primaryCta={{ text: "Sign Up", href: "/signup" }}
/>
```

### Auth Blocks (`@innate/ui/block/auth`)

```tsx
import { LoginForm } from "@innate/ui"

<LoginForm
  onSubmit={async (values) => { /* handle login */ }}
  onGoogleLogin={() => { /* OAuth flow */ }}
  signupHref="/signup"
  forgotPasswordHref="/forgot-password"
/>
```

### Mail Blocks (`@innate/ui/block/mail`)

3-panel resizable inbox layout with sidebar, mail list, and email detail view:

```tsx
import { Inbox } from "@innate/ui"
import type { MailItem } from "@innate/ui"

const mails: MailItem[] = [
  {
    id: "1", name: "William Smith", email: "will@example.com",
    subject: "Meeting Tomorrow", text: "Hi, let's have a meeting...",
    date: "2024-01-15T09:00:00", read: true, labels: ["work", "important"],
  },
]

<Inbox mails={mails} />
```

Individual components also available:
- `MailList` - Scrollable email list with badges, read status, labels
- `MailDisplay` - Email detail with reply composer, archive/delete actions, snooze

### Chat Blocks (`@innate/ui/block/chat`)

Full chat interface with conversation sidebar, message list, and input:

```tsx
import { ChatInterface } from "@innate/ui"
import type { ChatConversation, ChatMessage, ChatUser } from "@innate/ui"

<ChatInterface
  conversations={conversations}
  users={users}
  messages={messages}
  currentUserId="user-1"
  activeConversationId="conv-1"
  onSendMessage={(content) => { /* send */ }}
  onSelectConversation={(id) => { /* switch */ }}
/>
```

Individual components:
- `MessageList` - Chat messages with reactions, date grouping, avatars, auto-scroll
- Chat types: `ChatUser`, `ChatMessage`, `ChatConversation`

## Creating a New Next.js + shadcn/ui Project

When the user asks to create a new project, follow these steps:

### Step 1: Project Setup

```bash
# Create Next.js app
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install @innate/ui dependency
cd my-app
pnpm add @innate/ui
```

### Step 2: Configure Path Aliases

In `tsconfig.json`, ensure aliases point to the UI package:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@innate/ui": ["../packages/ui/src/index.ts"],
      "@innate/ui/*": ["../packages/ui/src/*"]
    }
  }
}
```

### Step 3: Import Global Styles

In `src/app/globals.css`:

```css
@import "@innate/ui/globals.css";
```

Or copy the CSS variables from `packages/ui/src/globals.css`.

### Step 4: Add Theme Provider

```tsx
// src/providers/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// src/app/layout.tsx
import { ThemeProvider } from "@/providers/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 5: Build Landing Page

```tsx
// src/app/page.tsx
import {
  HeroSection,
  FeaturesSection,
  PricingSection,
  TestimonialsSection,
  FaqSection,
  CTASection,
} from "@innate/ui"

export default function LandingPage() {
  return (
    <main>
      <HeroSection {...heroProps} />
      <FeaturesSection {...featuresProps} />
      <PricingSection {...pricingProps} />
      <TestimonialsSection {...testimonialsProps} />
      <FaqSection {...faqProps} />
      <CTASection {...ctaProps} />
    </main>
  )
}
```

## Template References

For inspiration and advanced patterns, refer to the template analysis files in `docs/analysis/`:

| Template | Key Strength | Agent File |
|----------|-------------|------------|
| shadcn-ui | Official component library, 57+ components, 75+ blocks | `docs/analysis/agent-shadcn-ui.md` |
| awesome-shadcn-ui | Resource directory, radix-lyra style, 60+ components | `docs/analysis/agent-awesome-shadcn-ui.md` |
| reui | 1000+ components, 17 in-house primitives (Data Grid, Kanban, etc.) | `docs/analysis/agent-reui.md` |
| tweakcn | Theme editor, AI integration, live preview | `docs/analysis/agent-tweakcn.md` |
| shadcn-dashboard | 30+ pages, landing + dashboard, dual framework | `docs/analysis/agent-shadcn-dashboard-landing-template.md` |
| velocify | AI SaaS starter (Clerk + Stripe + Claude) | `docs/analysis/agent-velocify.md` |
| ai-sdk-rag | RAG chatbot starter with vector DB | `docs/analysis/agent-ai-sdk-rag-chatbot-template.md` |
| nextra-starter | Documentation site with i18n | `docs/analysis/agent-nextjs-nextra-starter.md` |
| shadcn-cheatsheet | Interactive component reference | `docs/analysis/agent-shadcn-cheatsheet.md` |
| ui-creative-tim | Premium blocks (Marketing, E-commerce, Web3) | `docs/analysis/agent-ui-creative-tim.md` |

## Design Patterns

### Landing Page Pattern
```
Navbar → Hero → Stats → Features → Testimonials → Pricing → FAQ → CTA → Footer
```

### Dashboard Pattern
```
Sidebar (collapsible) → Header (sticky) → Content (cards + tables + charts)
```

### Auth Pattern
```
Centered Card → Logo → Form (Zod validated) → Social OAuth → Links
```

### Mail/Inbox Pattern
```
Resizable 3-Panel: [Folders sidebar] | [Mail list + search] | [Email detail + reply composer]
```

### Chat Pattern
```
Resizable 2-Panel: [Conversation list] | [Message list + reactions + input]
```

## Key Dependencies

The `@innate/ui` package includes:
- **Radix UI** primitives for accessibility
- **Tailwind CSS** with CSS variables for theming
- **class-variance-authority** for component variants
- **Lucide React** for icons
- **React Hook Form + Zod** for form validation
- **next-themes** for dark/light mode
- **Recharts** for charts
- **Sonner** for toast notifications
- **cmdk** for command palette
- **vaul** for drawer

## Notes

- All components use "use client" directive where needed
- Components follow shadcn/ui conventions (cn() utility, variant system)
- Dark/light mode is built-in via CSS variables
- The block components are data-driven via props - content is never hardcoded
- For customization, copy a block into your project and modify it
