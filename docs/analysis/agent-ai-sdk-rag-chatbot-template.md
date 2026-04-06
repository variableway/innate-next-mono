# Agent: ai-sdk-rag-chatbot-template Frontend Design

## Overview
A RAG (Retrieval-Augmented Generation) starter kit providing a complete chatbot interface with semantic search capabilities. Built with Next.js 14 and the Vercel AI SDK, it uses PostgreSQL with pgvector for vector storage and Drizzle ORM for database operations. The UI is intentionally minimal, using a focused set of shadcn/ui components to create a clean chat interface backed by server-side AI processing.

## Tech Stack
- Framework: Next.js 14
- UI Library: shadcn/ui
- Styling: Tailwind CSS
- AI: Vercel AI SDK, OpenAI
- Database: PostgreSQL + pgvector
- ORM: Drizzle ORM
- Server Actions: Next.js server actions

## Key Components

### UI Components (Minimal Set)
- **Button**: Action buttons for send, clear, and navigation
- **Dialog**: Modal dialogs for settings, source viewing, and confirmations
- **DropdownMenu**: Context menus for message actions and options
- **Input**: Text input for chat message composition
- **Label**: Form labels for settings and configuration
- **Sheet**: Slide-out panel for source document preview and settings
- **Table**: Data display for search results and document listings
- **Textarea**: Multi-line text input for message composition

### Chat Interface Components
- **Message List**: Scrollable conversation thread with user and AI message bubbles
- **Message Input**: Chat input area with send button and attachment indicators
- **Source Citations**: Inline references to source documents used in AI responses
- **Loading States**: Streaming response indicators and typing animations

### Data Layer
- **Vector Search**: pgvector-powered semantic search over document embeddings
- **Document Management**: Upload, index, and manage source documents
- **Chat History**: Persisted conversation history with session management
- **Server Actions**: Database operations executed through Next.js server actions

## Design Patterns
- **Minimal UI**: Deliberately constrained component set keeps the interface focused on the core chat interaction
- **Server-Driven AI**: All AI processing happens server-side using Next.js server actions, keeping sensitive logic off the client
- **Streaming Responses**: Vercel AI SDK enables real-time streaming of AI responses for immediate user feedback
- **Source Transparency**: RAG responses include source citations so users can verify AI claims
- **Vector Search Pipeline**: Document ingestion -> embedding -> pgvector storage -> semantic retrieval -> context injection -> AI generation
- **Drizzle ORM**: Type-safe database queries with migration support for the vector store schema

## Layout Templates
- **Chat Interface**: Full-height conversation view with message list and input area
- **Document Manager**: Table-based document listing with upload and delete actions
- **Settings Panel**: Sheet-based configuration for AI parameters and preferences
- **Source Viewer**: Dialog or sheet for viewing referenced source documents

## Usage Guide
1. **Chatbot Interfaces**: Use this template as the foundation for any AI chatbot or assistant application, extending the minimal UI with domain-specific components
2. **RAG Implementation**: Follow the pgvector + Drizzle ORM pattern for adding semantic search to any application that needs document-based AI responses
3. **Server Actions Pattern**: Reference the server action pattern for implementing secure, server-side AI operations without exposing API keys to the client
4. **Streaming UI**: Adopt the Vercel AI SDK streaming pattern for responsive AI response rendering in any chat or generation interface
5. **Minimal Component Strategy**: Start with this minimal component set and add shadcn/ui components incrementally as the application grows beyond basic chat
6. **Vector Store Integration**: Use the Drizzle ORM + pgvector schema as a starting point for adding vector search to existing PostgreSQL databases
7. **Source Citation Pattern**: Implement the source citation pattern whenever AI responses need to be grounded in verifiable source material
