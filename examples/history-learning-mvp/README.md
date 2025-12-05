# History Learning MVP - Memory Graph Demo

A standalone MVP demonstrating how to use `@supermemory/memory-graph` to visualize browsing history as a knowledge graph with cross-referencing capabilities.

## What This MVP Does

This project simulates a history learning application that:

1. **Fetches & Filters History**: Loads mock browsing history data and filters out irrelevant entries (like social media, email, etc.), keeping only programming-related content.

2. **Cross-References Entries**: Analyzes filtered entries and creates parent "topic" nodes that group related items. For example:
   - `<div>`, `<span>`, `<table>` entries → grouped under HTML element categories
   - CSS flexbox, grid entries → grouped under "CSS Styling" parent
   - JavaScript function, async/await entries → grouped under "JavaScript" parent

3. **Visualizes as Knowledge Graph**: Uses `@supermemory/memory-graph` to display the data as an interactive graph where you can:
   - See document nodes and their memory connections
   - View parent-child relationships after cross-referencing
   - Pan, zoom, and interact with the graph

## Tech Stack

Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack):

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Drizzle** - TypeScript-first ORM
- **SQLite** - Database engine
- **Better-Auth** - Authentication
- **Turborepo** - Optimized monorepo build system
- **@supermemory/memory-graph** - Interactive graph visualization

## How to Use the Memory Graph Demo

1. Open the app and navigate to **"Memory Graph"** in the header
2. Click **"Start Demo"** or **"1. Fetch & Filter History"** to load and filter mock browsing history
3. Observe the filtered entries appear as unlinked nodes in the graph
4. Click **"2. Cross-Reference"** to analyze and create parent topic nodes
5. See how related entries are now linked to their parent topics

## Key Files

- `apps/web/src/lib/history/mock-data.ts` - Mock browsing history entries
- `apps/web/src/lib/history/processing.ts` - Processing rules and cross-referencing logic
- `apps/web/src/routes/graph.tsx` - Main Memory Graph page component

## Getting Started

First, install the dependencies:

```bash
npm install --legacy-peer-deps
```
## Database Setup

This project uses SQLite with Drizzle ORM.

1. Start the local SQLite database:
```bash
cd packages/db && npm run db:local
```


2. Update your `.env` file in the `apps/server` directory with the appropriate connection details if needed.

3. Apply the schema to your database:
```bash
npm run db:push
```


Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).







## Project Structure

```
history-learning-mvp/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Hono, TRPC)
├── packages/
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
- `npm run db:push`: Push schema changes to database
- `npm run db:studio`: Open database studio UI
- `cd packages/db && npm run db:local`: Start the local SQLite database
