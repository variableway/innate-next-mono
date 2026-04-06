# Agent: velocify Frontend Design

## Overview
A full-stack AI SaaS starter template built with Next.js 16 and React 19, integrating Clerk Auth for authentication, Stripe for payments, Claude AI for intelligent features, and Neon Postgres for data storage. Features three distinct route groups for marketing, authentication, and dashboard interfaces. Includes email capabilities via Resend with React Email templates, making it a comprehensive starting point for AI-powered SaaS products.

## Tech Stack
- Framework: Next.js 16, React 19
- UI Library: shadcn/ui, Tailwind CSS v4
- Auth: Clerk Auth
- Payments: Stripe
- AI: Claude AI (Anthropic)
- Database: Neon Postgres
- Email: Resend + React Email
- Routing: Next.js route groups

## Key Components

### Marketing Route Group `(marketing)`
- **Hero Section**: Product headline, description, and primary CTA for the SaaS offering
- **Features Section**: Feature showcase with icons and descriptions highlighting AI capabilities
- **Pricing Section**: Stripe-integrated pricing table with plan comparison and checkout buttons
- **Testimonials**: Customer feedback display with quotes and attribution
- **Footer**: Links, social media, and company information

### Auth Route Group `(auth)`
- **Sign In**: Clerk Auth sign-in form with email/password and social provider options
- **Sign Up**: Registration form with email verification flow
- **Forgot Password**: Password reset request and confirmation
- **Account Settings**: User profile management and security settings

### Dashboard Route Group `(dashboard)`
- **Dashboard Home**: Overview stats, recent activity, and quick-action cards
- **AI Chat Interface**: Claude AI-powered conversational interface for chat interactions
- **Content Generator**: AI-driven content creation with prompt input and generated output display
- **Document Q&A**: Upload documents and ask questions with AI-powered answers grounded in document content
- **Usage Analytics**: Usage tracking displays showing AI consumption, billing, and quota information
- **Settings Panel**: Account settings, API key management, and integration configuration

### Shared Components
- **Navigation**: Responsive top navigation with auth state, user menu, and mobile hamburger
- **Sidebar**: Dashboard sidebar with navigation links, AI tool shortcuts, and user profile
- **Pricing Cards**: Interactive pricing display with plan features, selection, and Stripe checkout
- **Email Templates**: React Email templates for welcome, confirmation, notification, and receipt emails

## Design Patterns
- **Route Group Architecture**: Three distinct route groups `(marketing)`, `(auth)`, `(dashboard)` with separate layouts and shared components
- **Clerk Auth Integration**: Authentication state managed by Clerk with protected routes and user session available across all components
- **Stripe Payment Flow**: Products and prices defined in Stripe, checkout sessions created server-side, webhook handlers for payment confirmation
- **Claude AI Integration**: Server-side AI processing with streaming responses for chat and content generation features
- **Document Processing**: File upload -> text extraction -> AI analysis pipeline for document Q&A
- **React Email Templates**: Type-safe email templates rendered as React components, sent via Resend
- **Neon Postgres**: Serverless PostgreSQL with connection pooling for scalable data access

## Layout Templates
- **Marketing Landing**: Full-page scrollable layout with hero, features, pricing, and footer sections
- **Auth Pages**: Centered card layout for sign-in, sign-up, and password reset forms
- **Dashboard Layout**: Sidebar + header + content area with protected access
- **AI Chat Page**: Split or full-width chat interface with message thread and input area
- **Content Generator**: Prompt input panel + generated output display with copy and export actions
- **Document Q&A**: Document upload area + question input + answer display with source citations
- **Settings Page**: Tabbed settings layout with sections for profile, billing, API keys, and integrations

## Usage Guide
1. **SaaS Project Setup**: Use as the complete starting point for any AI-powered SaaS product, with auth, payments, and AI features pre-configured
2. **Route Groups**: Follow the `(marketing)`, `(auth)`, `(dashboard)` pattern to separate public, authentication, and protected application interfaces
3. **Authentication**: Clerk Auth provides sign-in, sign-up, session management, and user profile -- configure social providers and MFA as needed
4. **Payment Integration**: Define products and prices in Stripe, use the checkout flow for subscriptions, and handle webhooks for payment events
5. **AI Features**: Extend the Claude AI integration patterns for additional AI-powered features -- the chat and content generation interfaces serve as templates
6. **Email System**: Use React Email + Resend for transactional emails -- create new templates following the existing pattern for any notification or confirmation emails
7. **Database**: Use Neon Postgres with Drizzle ORM (or preferred ORM) for data models -- the serverless architecture scales with usage
8. **Dashboard Extensions**: Add new dashboard pages within the `(dashboard)` route group, following the existing sidebar navigation and layout patterns
