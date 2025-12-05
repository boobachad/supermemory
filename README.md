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

---

## Local Setup Instructions

### Prerequisites

You must have the following installed:

- **Node.js** version 18 or higher. Check with: `node --version`
- **npm** version 10 or higher. Check with: `npm --version`

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/supermemoryai/supermemory.git
```

Then navigate into the project:

```bash
cd supermemory
```

### Step 2: Install Dependencies

Run this exact command:

```bash
npm install --legacy-peer-deps
```

Wait for it to complete. You should see output ending with something like "added XXX packages".

### Step 3: Create Environment Files

**Create the web app environment file:**

```bash
cp apps/web/.env.example apps/web/.env
```

**Create the server environment file:**

```bash
cp apps/server/.env.example apps/server/.env
```

**Edit the server environment file** to add a secret key. Open `apps/server/.env` in a text editor and change the first line:

Before:
```
BETTER_AUTH_SECRET=your-secret-key-here
```

After (use any random string at least 32 characters):
```
BETTER_AUTH_SECRET=my-super-secret-key-that-is-at-least-32-chars
```

Or generate a random secret with this command and paste the output:
```bash
openssl rand -base64 32
```

The final `apps/server/.env` file should look like this:
```
BETTER_AUTH_SECRET=my-super-secret-key-that-is-at-least-32-chars
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
DATABASE_URL=file:./local.db
```

### Step 4: Set Up the Database

Run this exact command from the root of the project:

```bash
npm run db:push
```

You should see output including "Changes applied" at the end.

### Step 5: Start the Development Servers

Run this command from the root of the project:

```bash
npm run dev
```

Wait about 10 seconds. You should see output from both the server and web app.

**If the above command does not work**, start the servers separately:

Open **Terminal 1** and run:
```bash
cd apps/server
npm run dev
```
You should see: `Server is running on port 3000`

Open **Terminal 2** and run:
```bash
cd apps/web
npm run dev
```
You should see: `VITE ready` and `Local: http://localhost:3001/`

### Step 6: Open the Application

Open your web browser (Chrome, Firefox, Edge, Safari) and go to this URL:

```
http://localhost:3001
```

You should see a page with "BETTER T STACK" ASCII art and "API Status: Connected" (green dot).

If you see "API Status: Checking..." that stays forever, the server is not running. Go back to Step 5.

### Step 7: Use the Memory Graph Demo

1. Click **"Memory Graph"** in the top navigation bar
2. Click the **"Start Demo"** button in the center of the page
3. The graph will load and show filtered history entries (19 documents from 22 total)
4. Click **"2. Cross-Reference"** button at the top
5. The graph now shows 26 documents with 45 connections organized into 7 topic categories

---

## Troubleshooting

### Problem: "npm install" fails

**Solution:**
1. Make sure you're using Node.js 18 or higher: `node --version`
2. Delete the node_modules folder: `rm -rf node_modules`
3. Delete package-lock.json: `rm package-lock.json`
4. Run install again: `npm install --legacy-peer-deps`

### Problem: "npm run db:push" fails

**Solution:**
1. Make sure the file `apps/server/.env` exists
2. Make sure it contains the line: `DATABASE_URL=file:./local.db`
3. Make sure you are running the command from the root folder (not from apps/server)

### Problem: Server won't start / "BETTER_AUTH_SECRET" error

**Solution:**
1. Open `apps/server/.env` in a text editor
2. Make sure `BETTER_AUTH_SECRET` is set to a string at least 32 characters long
3. Example: `BETTER_AUTH_SECRET=this-is-my-secret-key-for-testing-1234567890`

### Problem: Web app shows "API Status: Checking..." forever

**Solution:**
1. Make sure the server is running (you should see "Server is running on port 3000" in terminal)
2. Open `apps/web/.env` and make sure it contains: `VITE_SERVER_URL=http://localhost:3000`
3. Restart both the server and web app

### Problem: "Port 3000 already in use" or "Port 3001 already in use"

**Solution:** Find and stop the process using that port.

On Mac/Linux:
```bash
# Find process on port 3000
lsof -i :3000
# Note the PID number, then kill it
kill -9 <PID>
```

On Windows:
```bash
# Find process on port 3000
netstat -ano | findstr :3000
# Note the PID number, then kill it
taskkill /PID <PID> /F
```

---

## Available Commands

Run these commands from the root folder of the project.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts both web app (port 3001) and server (port 3000) |
| `npm run build` | Builds both web app and server for production |
| `npm run dev:web` | Starts only the web app on port 3001 |
| `npm run dev:server` | Starts only the server on port 3000 |
| `npm run db:push` | Creates/updates database tables from schema |
| `npm run db:studio` | Opens database viewer in your browser |
| `npm run check-types` | Checks TypeScript types for errors |

---

## Project Structure

```
supermemory/
├── apps/
│   ├── web/                    # Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── routes/         # Pages
│   │   │   │   └── graph.tsx   # Memory Graph page (main demo)
│   │   │   └── lib/
│   │   │       └── history/    # History processing logic
│   │   ├── .env.example        # Template for web config
│   │   └── .env                # Your web config (create this)
│   └── server/                 # Backend (Hono + tRPC)
│       ├── src/
│       │   └── index.ts        # Server entry point
│       ├── .env.example        # Template for server config
│       └── .env                # Your server config (create this)
├── packages/
│   ├── api/                    # Shared API definitions
│   ├── auth/                   # Authentication config
│   ├── config/                 # TypeScript configs
│   └── db/                     # Database schema
├── package.json                # Root dependencies and scripts
├── turbo.json                  # Build configuration
└── README.md                   # This file
```

---

## Key Files for the Demo

| File | What it contains |
|------|------------------|
| `apps/web/src/lib/history/mock-data.ts` | The fake browsing history data (22 entries) |
| `apps/web/src/lib/history/processing.ts` | Logic to filter entries and create topic categories |
| `apps/web/src/routes/graph.tsx` | The Memory Graph page with all the UI and demo logic |

---

## License

MIT
