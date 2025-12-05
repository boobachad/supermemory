# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a **Turbo monorepo** for the History Learning MVP - a demonstration of `@supermemory/memory-graph` for visualizing browsing history as a knowledge graph.

### Applications (`apps/`)
- **`web/`** - React frontend with TanStack Router (Vite)
- **`server/`** - Hono backend with tRPC APIs

### Packages (`packages/`)
- **`api/`** - Shared tRPC router definitions
- **`auth/`** - Better Auth configuration
- **`config/`** - Shared TypeScript configs
- **`db/`** - Drizzle ORM schema and SQLite database

## Development Commands

### Root Level (Monorepo)
- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications
- `npm run check-types` - Run TypeScript checks across all apps
- `npm run dev:web` - Start only the web application
- `npm run dev:server` - Start only the server

### Database Commands
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database UI)
- `npm run db:generate` - Generate migrations
- `npm run db:migrate` - Run migrations

## Architecture Overview

### Core Technology Stack
- **Runtime**: Node.js 18+
- **Frontend Framework**: React 19 with TanStack Router
- **Backend Framework**: Hono with tRPC
- **Language**: TypeScript throughout
- **Package Manager**: npm
- **Monorepo**: Turborepo
- **Authentication**: Better Auth
- **Database**: SQLite with Drizzle ORM
- **Graph Visualization**: @supermemory/memory-graph

### Key Features
The MVP demonstrates:
1. **History Filtering**: Filter browsing history to extract relevant programming content
2. **Cross-Referencing**: Create parent topic nodes that group related entries
3. **Graph Visualization**: Interactive knowledge graph using @supermemory/memory-graph

### Key Files
| File | Description |
|------|-------------|
| `apps/web/src/lib/history/mock-data.ts` | Mock browsing history entries |
| `apps/web/src/lib/history/processing.ts` | Filtering and cross-referencing logic |
| `apps/web/src/routes/graph.tsx` | Main Memory Graph page component |

## Key Libraries & Dependencies

### Shared Dependencies
- `better-auth` - Authentication system
- `drizzle-orm` - Database ORM
- `zod` - Schema validation
- `@trpc/server` & `@trpc/client` - Type-safe APIs
- `turbo` - Monorepo build system

### Web-Specific
- `react` & `react-dom` - UI framework
- `@tanstack/react-router` - File-based routing
- `@tanstack/react-query` - Data fetching
- `@supermemory/memory-graph` - Graph visualization
- `tailwindcss` - Styling

### Server-Specific
- `hono` - Web framework
- `@libsql/client` - SQLite client

## Environment Configuration

### Web App (`apps/web/.env`)
```env
VITE_SERVER_URL=http://localhost:3000
```

### Server (`apps/server/.env`)
```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
DATABASE_URL=file:./local.db
```

## Development Workflow

1. Install dependencies: `npm install --legacy-peer-deps`
2. Set up environment variables (copy .env.example files)
3. Push database schema: `npm run db:push`
4. Start development: `npm run dev`
5. Open http://localhost:3001 and navigate to Memory Graph

## Code Quality & Standards

### TypeScript
- Strict TypeScript configuration
- Type checking with `npm run check-types`
- Shared configs in `packages/config`

### Database Management
- Drizzle ORM with SQLite
- Schema in `packages/db/src/schema.ts`
- Migrations handled through Drizzle Kit
