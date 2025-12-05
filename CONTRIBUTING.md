# Contributing to History Learning MVP

Thank you for your interest in contributing to the History Learning MVP! This project demonstrates using `@supermemory/memory-graph` for visualizing browsing history as a knowledge graph.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (>= 18)
- **npm** for package management
- **Git** for version control

### Setting Up the Development Environment

1. **Clone the Repository**

   ```bash
   git clone https://github.com/supermemoryai/supermemory.git
   cd supermemory
   ```

2. **Install Dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set Up Environment Variables**

   ```bash
   # Copy the example environment files
   cp apps/web/.env.example apps/web/.env
   cp apps/server/.env.example apps/server/.env
   ```

   Update the server environment with your values:
   ```env
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   CORS_ORIGIN=http://localhost:3001
   DATABASE_URL=file:./local.db
   ```

4. **Set Up the Database**

   ```bash
   npm run db:push
   ```

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

   - Web app: http://localhost:3001
   - API server: http://localhost:3000

## 📁 Project Structure

```
history-learning-mvp/
├── apps/
│   ├── web/         # Frontend (React + TanStack Router + Vite)
│   └── server/      # Backend (Hono + tRPC)
├── packages/
│   ├── api/         # Shared tRPC routers
│   ├── auth/        # Better Auth configuration
│   ├── config/      # Shared TypeScript configs
│   └── db/          # Drizzle ORM schema
├── turbo.json       # Turbo configuration
└── package.json     # Root package configuration
```

## 🛠️ Development Workflow

### Available Scripts

- `npm run dev` - Start development servers for all apps
- `npm run build` - Build all applications
- `npm run check-types` - Type check all packages
- `npm run dev:web` - Start only the web application
- `npm run dev:server` - Start only the server
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database UI)

### Code Quality

Before submitting a PR:

```bash
npm run check-types
npm run build
```

### Tech Stack

- **Frontend**: React 19, TanStack Router, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query
- **Backend**: Hono, tRPC
- **Database**: SQLite with Drizzle ORM
- **Build Tool**: Turborepo
- **Graph Visualization**: @supermemory/memory-graph

## 🎯 How to Contribute

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 🎨 **UI/UX enhancements**
- ⚡ **Performance optimizations**
- 📝 **Documentation improvements**

### Making Changes

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Your Changes**
   - Follow existing code style and patterns
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run dev          # Test locally
   npm run build        # Ensure it builds
   npm run check-types  # Check types
   ```

## 📝 Coding Standards

### General Guidelines

- Use **TypeScript** for all new code
- Follow the existing code style and patterns
- Write self-documenting code with clear variable names
- Keep functions small and focused

### Component Guidelines

- Use functional components with hooks
- Use proper TypeScript types for props
- Extract reusable logic into custom hooks

## 🔄 Pull Request Process

### Before Submitting

1. Ensure your branch is up to date with `main`
2. Run all quality checks
3. Test your changes thoroughly

### PR Guidelines

1. **Title**: Use a clear, descriptive title
   - ✅ `feat: add new processing rule for Python`
   - ✅ `fix: resolve graph rendering issue`
   - ❌ `update stuff`

2. **Description**: Include what changes you made and why

### Review Process

1. All PRs require at least one review
2. Address feedback promptly
3. Be open to suggestions

## 🐛 Reporting Issues

### Bug Reports

Please include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Error messages** or console logs

### Feature Requests

Please provide:

- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should it work?

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the History Learning MVP! 🚀
