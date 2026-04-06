# Agent: tweakcn Frontend Design

## Overview
A visual theme editor for Tailwind CSS and shadcn/ui that enables real-time customization of design tokens. Built with Next.js 15 and React 19, it integrates AI-powered theme generation through Vercel AI SDK with Google Gemini and OpenAI. Features a comprehensive editor interface with color pickers, font selectors, shadow controls, and theme control panels, along with example application templates demonstrating themed UIs.

## Tech Stack
- Framework: Next.js 15, React 19
- UI Library: shadcn/ui (New York style)
- Styling: Tailwind CSS v4
- AI: Vercel AI SDK, Google Gemini, OpenAI
- State Management: Zustand, TanStack Query
- Auth: Better Auth
- Payments: Polar

## Key Components

### Editor Components
- **ColorPicker**: Visual color selection tool with hue/saturation/lightness controls and hex input
- **FontPicker**: Font family browser and selector with preview text rendering
- **ShadowControl**: Box shadow editor with offset, blur, spread, and color configuration
- **ThemeControlPanel**: Unified panel aggregating all theme customization controls with live preview
- **BorderRadius Control**: Global and component-level border radius adjustment
- **Spacing Scale**: Visual spacing scale editor for consistent layout density

### Example Application Components
- **Dashboard**: Full dashboard layout with stats, charts, and data tables used as a theme preview surface
- **Music Player**: Media player interface with album art, playback controls, and playlist
- **Mail Client**: Email interface with folder sidebar, message list, and reading pane
- **Task Management**: Todo/kanban style interface with task cards and status columns

### Infrastructure Components
- **Auth Components**: Better Auth integration for user sessions and gated features
- **Payment Components**: Polar integration for subscription and payment flows
- **AI Chat Interface**: Theme generation through conversational AI prompts

## Design Patterns
- **Live Preview Editing**: All theme changes rendered in real-time across multiple example applications
- **AI-Generated Themes**: Natural language prompts converted to complete theme configurations via LLM
- **Design Token System**: CSS variables mapped to a structured token system for systematic theming
- **Template-as-Preview**: Example applications serve dual purpose as both demos and theme preview surfaces
- **State-Driven Configuration**: Zustand manages editor state while TanStack Query handles async operations
- **Export and Share**: Theme configurations exportable as CSS variables or Tailwind config for direct project use

## Layout Templates
- **Editor Layout**: Split-panel interface with control sidebar and live preview area
- **Dashboard Preview**: Stats cards, charts, tables, and sidebar navigation
- **Music Player Preview**: Now-playing view with controls, queue, and browse sections
- **Mail Client Preview**: Three-column email layout with folder tree, list, and detail
- **Task Management Preview**: Board layout with columns, cards, and filters

## Usage Guide
1. **Theme Creation**: Use the visual editor to design custom themes by adjusting colors, fonts, shadows, and spacing -- then export as CSS variables or Tailwind config
2. **AI Theme Generation**: Describe desired themes in natural language to generate complete theme configurations using the integrated AI
3. **Preview Across Contexts**: Test themes across multiple application types (dashboard, mail, music, tasks) to ensure visual consistency
4. **Integration**: Export generated themes directly into shadcn/ui projects by replacing CSS variable definitions
5. **State Architecture**: Reference the Zustand + TanStack Query pattern for building complex editor interfaces with both local and remote state
6. **Auth and Payments**: Study the Better Auth and Polar integration patterns for adding user authentication and paid features to SaaS applications
7. **Color System**: Use the ColorPicker component pattern for building any interface that requires color selection and manipulation
