# Project Manager

## Live Demo 🔗

[View Live Application](https://project-task-manager-nine.vercel.app/)

A high-performance project management platform with 50ms route changes and zero-latency interactions. All operations feel instant through custom state management and optimistic UI updates.

## Key Technical Achievements

### Performance Engineering

- 50ms client-side route changes with zero loading states
- Instant CRUD operations through in-memory state management
- Zero-latency UI updates with optimistic rendering
- Strategic SSR/CSR hybrid for optimal initial load and interaction speed

### Custom State Management Architecture

- Model-based React Context providers with TypeScript integration
- SSR-to-client state bridge eliminating hydration mismatches
- Memory-based operations with background API synchronization
- Reactive state propagation across multiple views and components

### Advanced Full-Stack Integration

- End-to-end type safety with Prisma-generated TypeScript types
- Session-scoped data loading with automatic user isolation
- Real-time collaborative features with instant UI synchronization
- Production-ready authentication with Google OAuth

## Features

### Core Task Management

- **Dynamic Task Creation** - Create and modify tasks with real-time validation and instant updates
- **Project Organization** - Hierarchical project structure with task assignment capabilities
- **Due Date Management** - Set and track task deadlines with automated scheduling
- **Task Assignment** - Assign tasks to specific projects with relational data management

### Views & Navigation

- **Interactive Schedule View** - X/Y scrollable timeline automatically scoped to user's date range (current date to furthest due date)
- **Smart Inbox** - Centralized task management with multi-property sorting (createdAt, dueDate, priority)
- **Priority View** - Filtered dashboard displaying high-priority tasks
- **Inventory Overview** - Comprehensive listing of all user-created items across all views (tasks, projects, notes, etc.)

### Search & Filtering

- **Fuzzy Search** - Advanced search with typo tolerance across all task properties
- **Global Search Modal** - Dashboard-accessible search with instant results
- **Post-Search Sorting** - Apply sorting filters to search results
- **Multi-Property Filtering** - Filter by creation date, due date, priority, and custom properties

### Collaboration

- **Project Comments** - Threaded conversation system attached to individual projects
- **Real-Time Updates** - Instant synchronization across all connected clients
- **Activity Streams** - Chronological display of project conversations and updates

### Analytics & Tracking

- **Time Chart** - Visual analytics showing task distribution by days remaining until due date
- **Progress Tracking** - Monitor task completion rates and overdue items
- **Data Visualization** - Interactive charts and graphs for project insights

### Personal Productivity

- **Personal Notes** - Standalone note-taking system independent of task management
- **Cross-Feature Integration** - Notes system leverages existing comment infrastructure
- **Deadline Tracking** - Automated monitoring of approaching and overdue tasks
- **Workload Distribution** - Visual representation of task allocation over time

## Tech Stack

- **Frontend:** React, Next.js, TypeScript
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Auth.js with Google OAuth
- **Styling:** Tailwind CSS, Framer-motion
- **State Management:** React Context API
- **Search:** Fuse.js (fuzzy)
- **Charts:** Recharts

## API Endpoints

The application provides REST-like endpoints for:

- **Tasks:** Create, update, delete, assign, prioritize, and search
- **Projects:** Full CRUD operations with task assignment
- **Comments:** Project-based commenting system with batch operations
- **Authentication:** Google OAuth via NextAuth.js
- **Comments/Notes:** Project comments and personal notes (unified endpoint with projectId filtering)

## Technical Architecture

### Frontend

#### Hybrid Rendering Strategy

- **Server-Side Rendering (SSR)** - User/session-specific data preloaded on initial page load
- **Static Site Generation (SSG)** - Public pages and layouts pre-rendered at build time
- **Client-Side Hydration** - Seamless transition from server-rendered to interactive state

#### Advanced State Management

- **Model-Based Context Providers** - Separate React context providers for each data model (tasks, projects, comments)
- **SSR-to-Client State Bridge** - Server props initialize in-memory object arrays via React state hooks
- **Memory-Based Operations** - All filtering, sorting, and view transformations handled client-side for instant responsiveness
- **Derived View States** - Dynamic view generation from cached object arrays without additional API calls

#### Real-Time Updates

- **Optimistic UI Updates** - Instant visual feedback with background API synchronization
- **Reactive State Propagation** - Changes automatically cascade across all relevant views and components
- **Granular Re-rendering** - Context-aware updates prevent unnecessary component refreshes

### Backend

#### API Architecture

- **RESTful API Design** - Comprehensive endpoints for all CRUD operations across data models with Next.js App Router API routes
- **Session-Aware Data Loading** - User-specific data preloading for SSR initialization via dedicated query functions
- **Unified Endpoint Strategy** - Flexible APIs (e.g., comments endpoint serves both project comments and personal notes via filtering)
- **Type-Safe API Layer** - Prisma-generated types ensure end-to-end type safety from database to client

#### Database & ORM

- **Prisma ORM Integration** - Schema-first development with automatic type generation and query inference
- **Query Function Architecture** - Centralized data fetching logic in /lib/queries with exported TypeScript types
- **Relational Database Schema** - Normalized PostgreSQL structure for tasks, projects, comments, and user relationships
- **Connection Pooling** - Optimized database connections via Neon's pooled and direct connection options
- **Transaction Management** - Atomic operations for data consistency across related models

#### Authentication & Security

- **NextAuth.js Integration** - Google OAuth with session management and route protection
- **User-Scoped Data Access** - All queries automatically filtered by authenticated user context
- **Secure API Routes** - Session validation on all data endpoints

#### Performance & Optimization

- **Query Optimization** - Strategic use of Prisma's include and select for efficient data fetching
- **Type Inference Pattern** - Eliminates type drift by deriving TypeScript types directly from Prisma queries
- **Batch Operations** - Specialized endpoints for bulk actions (e.g., batch-delete-project-comments)
- **Minimal API Surface** - Reusable endpoints reduce code duplication and maintenance overhead

## Performance Optimizations

### Client-Side Performance

- **Zero-Latency Interactions** - In-memory state operations eliminate loading states for common actions
- **Efficient Data Transformation** - Client-side filtering and sorting of pre-loaded datasets
- **Minimal API Requests** - Views generated from cached data reduce server round-trips

### Rendering Performance

- **Strategic Hydration** - Server-rendered content with selective client-side enhancement
- **Component Optimization** - Minimal DOM manipulation through efficient React patterns
- **Memory Management** - Intelligent caching layer balances performance with memory usage

## Installation

```bash
git clone https://github.com/yourusername/project-manager.git

cd project-manager

npm install

cp .env.example .env.local

npm run dev
```

## Environment Variables

```bash
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

DATABASE_URL_UNPOOLED="postgresql://username:password@host/database?sslmode=require"

PGDATABASE="your_database_name"
PGHOST="your_host.neon.tech"
PGHOST_UNPOOLED="your_host.neon.tech"
PGPASSWORD="your_password"
PGUSER="your_username"

POSTGRES_DATABASE="your_database_name"
POSTGRES_HOST="your_host.neon.tech"
POSTGRES_PASSWORD="your_password"
POSTGRES_USER="your_username"

POSTGRES_PRISMA_URL="postgresql://username:password@host/database?connect_timeout=15&sslmode=require"

POSTGRES_URL="postgresql://username:password@host/database?sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://username:password@host/database?sslmode=require"
POSTGRES_URL_NO_SSL="postgresql://username:password@host/database"

AUTH_SECRET="your_auth_secret_key_here"
AUTH_GOOGLE_ID="your_google_client_id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your_google_client_secret"

VERCEL_OIDC_TOKEN="auto_generated_jwt_token"
```

## Setup Instructions

### Database Setup (Neon):

1. Create a new project at Neon Console
2. Copy the connection string and use it for DATABASE_URL
3. The pooled and non-pooled versions will have different host endpoints

### Google OAuth Setup:

1. Go to Google Cloud Console
2. Create a new OAuth 2.0 client ID
3. Add your domain to authorized origins
4. Copy the client ID and secret

### Auth Secret:

1. Generate a secure random string (32+ characters)
2. You can use: `openssl rand -base64 32`

### Environment Files:

1. Copy .env.example to .env.local
2. Fill in your actual values
3. Never commit .env.local to version control

## Required Variables

The following variables are required for the application to run:

- `DATABASE_URL` - Primary database connection
- `AUTH_SECRET` - Authentication secret key
- `AUTH_GOOGLE_ID` - Google OAuth client ID
- `AUTH_GOOGLE_SECRET` - Google OAuth client secret

## Optional Variables

- `DATABASE_URL_UNPOOLED` - For direct database connections
- `POSTGRES_*` - Alternative PostgreSQL connection variables
- `VERCEL_OIDC_TOKEN` - Auto-generated during Vercel deployment

## Usage

1. **Authentication** - Sign in with Google OAuth
2. **Create Projects** - Set up project containers for task organization
3. **Add Tasks** - Create tasks with due dates, priorities, and project assignments
4. **Collaborate** - Use project comments for team communication
5. **Track Progress** - Monitor deadlines and completion rates through analytics views

## Support

For support, email james.chris.day@gmail.com or open an issue on GitHub.
