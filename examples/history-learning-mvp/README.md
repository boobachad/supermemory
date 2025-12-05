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

---

## 🚀 Quick Start (Step-by-Step)

### Prerequisites

- Node.js 18+ 
- npm or bun

### Step 1: Navigate to the project

```bash
cd examples/history-learning-mvp
```

### Step 2: Install dependencies

```bash
npm install --legacy-peer-deps
```

### Step 3: Set up environment variables

**For the web app (`apps/web/.env`):**
```bash
cp apps/web/.env.example apps/web/.env
```

The default values should work:
```env
VITE_SERVER_URL=http://localhost:3000
```

**For the server (`apps/server/.env`):**
```bash
cp apps/server/.env.example apps/server/.env
```

Update with your values:
```env
# Generate a secret: openssl rand -base64 32
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
DATABASE_URL=file:./local.db
```

### Step 4: Set up the database

```bash
# Generate and push the database schema
npm run db:push
```

### Step 5: Start the development server

```bash
npm run dev
```

This starts both:
- **Web app**: http://localhost:3001
- **API server**: http://localhost:3000

### Step 6: Open the Memory Graph Demo

1. Open http://localhost:3001 in your browser
2. Click **"Memory Graph"** in the navigation header
3. Follow the on-screen instructions to run the demo

---

## 📖 How to Use the Memory Graph Demo

1. Open the app and navigate to **"Memory Graph"** in the header
2. Click **"Start Demo"** or **"1. Fetch & Filter History"** to load and filter mock browsing history
3. Observe the filtered entries appear as unlinked nodes in the graph
4. Click **"2. Cross-Reference"** to analyze and create parent topic nodes
5. See how related entries are now linked to their parent topics

---

## 🗂️ Key Files

| File | Description |
|------|-------------|
| `apps/web/src/lib/history/mock-data.ts` | Mock browsing history entries |
| `apps/web/src/lib/history/processing.ts` | Filtering and cross-referencing logic |
| `apps/web/src/routes/graph.tsx` | Main Memory Graph page component |

---

## 🏗️ Project Structure

```
history-learning-mvp/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   │   ├── src/
│   │   │   ├── components/    # UI components
│   │   │   ├── lib/
│   │   │   │   └── history/   # History processing library
│   │   │   └── routes/        # Page routes
│   │   └── .env.example       # Web environment template
│   └── server/      # Backend API (Hono + tRPC)
│       └── .env.example       # Server environment template
├── packages/
│   ├── api/         # Shared API types and routers
│   ├── auth/        # Authentication configuration
│   └── db/          # Database schema (Drizzle)
└── README.md
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all applications |
| `npm run dev:web` | Start only the web application |
| `npm run dev:server` | Start only the server |
| `npm run check-types` | Check TypeScript types across all apps |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio (database UI) |

---

## 🚢 Deployment

### Option 1: Deploy Web App to Vercel/Netlify

1. Build the web app:
   ```bash
   cd apps/web
   npm run build
   ```

2. Deploy the `dist` folder to your preferred static hosting

### Option 2: Deploy Server to Railway/Render

1. Set the environment variables in your hosting platform
2. Deploy the `apps/server` directory
3. Update `VITE_SERVER_URL` in the web app to point to your deployed server

### Option 3: Docker (Full Stack)

Create a `Dockerfile` in the root:
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000 3001
CMD ["npm", "run", "dev"]
```

---

## 🔧 Customization

### Adding New Processing Rules

Edit `apps/web/src/lib/history/processing.ts`:

```typescript
export const processingRules: ProcessingRule[] = [
  {
    keywords: ["your", "keywords", "here"],
    category: "your-category-id",
    parentLabel: "Your Category Label",
  },
  // Add more rules...
]
```

### Adding Real Browser History

Replace `mockHistoryData` in `mock-data.ts` with real data from:
- Chrome History API
- Firefox History API
- A browser extension

---

## 📄 License

MIT
