# Tactyqal Labs Monorepo

Full Stack application built for the Tactyqal Labs Full Stack Developer Intern Hire-a-thon.

## Project Structure

- `apps/frontend`: Next.js 14 App Router application (Blog UI, Admin CMS)
- `apps/backend`: Express.js + TypeScript REST API backend (Blog CMS & Prisma ORM)
- `node_modules/`: Shared dependencies at root (workspaces)

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Authentication**: JWT via HTTP-only cookies
- **CSRF**: Double-submit cookie pattern

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma with PostgreSQL/Supabase
- **Authentication**: JWT access/refresh tokens
- **Security**: Helmet, Rate Limiting, CSRF, CORS

### Database
- **Provider**: PostgreSQL (Supabase)
- **Migrations**: Prisma Migrate
- **Seeds**: Admin user + categories

## Getting Started

### Prerequisites
- Node.js 18+ (tested with Node 20)
- PostgreSQL/Supabase database
- Supabase account (for storage)

### Installation
```bash
# Install dependencies from root
npm install

# Or from frontend/backend directly
cd apps/frontend && npm install
cd ../backend && npm install
```

### Environment Setup

#### Frontend (`apps/frontend/.env.local`)
```bash
# Copy example and configure
cp apps/frontend/.env.local.example apps/frontend/.env.local

# Required values:
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (`apps/backend/.env`)
```bash
# Copy example and configure
cp apps/backend/.env.example apps/backend/.env

# Required values:
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@host:5432/db"
DIRECT_URL="postgresql://user:password@host:5432/db"
JWT_SECRET=<32+ character secret>
JWT_REFRESH_SECRET=<32+ character secret>
CORS_ORIGIN=http://localhost:3000
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
SUPABASE_STORAGE_BUCKET=blog-media
```

## Development

### Start Services
```bash
# Terminal 1: Backend
npm run dev:backend
# Runs on http://localhost:5000

# Terminal 2: Frontend
npm run dev:frontend
# Runs on http://localhost:3000
```

### Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run migrations (create database first)
npm run db:migrate

# Seed initial data (admin user + categories)
npm run db:seed
```

### Default Admin Credentials
- Email: `admin@tactyqal.com`
- Password: `admin123`

⚠️ **CHANGE THE DEFAULT PASSWORD IMMEDIATELY AFTER DEPLOYMENT**

## Production Commands

### Frontend
```bash
npm run build:frontend  # Build for production
npm start               # Start production server
```

### Backend
```bash
npm run build:backend   # TypeScript compile to dist/
npm start               # Start Express server
```

### Database (Production)
```bash
# Deploy migrations to production database
npm run db:deploy
```

## API Documentation

The backend includes Swagger documentation available at:
- **Development**: http://localhost:5000/api-docs
- **Production**: https://your-backend-domain.com/api-docs

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                Client Browser (Next.js)              │
│  http://localhost:3000                              │
└─────────────────────┬───────────────────────────────┘
                      │ (HTTP requests with cookies)
                      ▼
┌─────────────────────────────────────────────────────┐
│           Frontend (Next.js 14)                    │
│  - App Router pages                                │
│  - Auth Context (React Context API)               │
│  - API Client (CSRF-aware)                          │
│  - TailwindCSS UI Components                       │
└──────────┬─────────────────────────────────────────┘
           │
           │ http://localhost:5000/api/v1
           ▼
┌─────────────────────────────────────────────────────┐
│           Backend (Express.js)                     │
│  - JWT auth (access + refresh tokens)              │
│  - CSRF protection (double-submit cookies)          │
│  - Role-based authorization                          │
│  - Zod validation middleware                       │
│  - Helmet for security headers                     │
│  - Rate limiting (100 req / 15 min)                │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│          Database (PostgreSQL/Supabase)            │
│  - Prisma ORM                                       │
│  - Tables: User, Post, Category, Tag, PostTag       │
│  - Sessions table for refresh token management      │
└─────────────────────────────────────────────────────┘
```

## Environment Variables Reference

### Frontend (`.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:5000/api/v1 |
| `NEXT_PUBLIC_SITE_URL` | Frontend site URL | http://localhost:3000 |

### Backend (`.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes (default: 5000) |
| `NODE_ENV` | Environment | Yes |
| `DATABASE_URL` | Pooled DB connection | Yes |
| `DIRECT_URL` | Direct DB connection | Yes (migrations) |
| `JWT_SECRET` | Access token secret (32+ chars) | Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes |
| `CORS_ORIGIN` | Allowed frontend origin | Yes |
| `SUPABASE_URL` | Supabase project URL | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | No |
| `SUPABASE_STORAGE_BUCKET` | Storage bucket name | No |

## Manual Deployment Checklist

### 1. Database Setup
- [ ] Create/confirm Supabase project
- [ ] Update `DATABASE_URL` and `DIRECT_URL` in `.env`
- [ ] Run `npm run db:deploy`
- [ ] Run `npm run db:seed`
- [ ] Change default admin password

### 2. Backend (Render)
- [ ] Create new Render Web Service
- [ ] Set root directory: `apps/backend`
- [ ] Build command: `npm install && npm run db:generate && npm run db:deploy`
- [ ] Start command: `npm start`
- [ ] Set environment variables
- [ ] Configure health check path: `/api/v1/health`
- [ ] Enable CORS for your frontend domain

### 3. Frontend (Vercel)
- [ ] Create new Vercel project
- [ ] Import with `apps/frontend` as root
- [ ] Set NEXT_PUBLIC_API_URL to your backend URL
- [ ] Configure rewrites for `/api/v1/*` → backend domain
- [ ] Set NODE_ENV=production

### 4. Environment Synchronization
- [ ] Verify CORS_ORIGIN matches Vercel deployed URL
- [ ] Update JWT secrets to production values
- [ ] Configure Supabase Storage bucket permissions
- [ ] Test authentication between services

### 5. Go Live
- [ ] Update DNS records
- [ ] Run smoke tests
- [ ] Monitor logs for errors
- [ ] Verify SSL certificates

## Testing Commands

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build verification
npm run build:frontend
npm run build:backend
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/me` - Get current user

### Posts
- `GET /api/v1/posts` - List public posts (paginated)
- `GET /api/v1/posts/:slug` - Get by slug
- `GET /api/v1/admin/posts` - List admin posts
- `POST /api/v1/posts` - Create post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post
- `PATCH /api/v1/posts/:id/status` - Update status

### Categories
- `GET /api/v1/categories` - List all
- `POST /api/v1/categories` - Create (ADMIN)
- `PUT /api/v1/categories/:id` - Update (ADMIN)
- `DELETE /api/v1/categories/:id` - Delete (ADMIN)

### Tags
- `GET /api/v1/tags` - List all
- `POST /api/v1/tags` - Create (ADMIN)
- `PUT /api/v1/tags/:id` - Update (ADMIN)
- `DELETE /api/v1/tags/:id` - Delete (ADMIN)

### Media
- `POST /api/v1/media/upload` - Upload (AUTH)
- `DELETE /api/v1/media/:path` - Delete (ADMIN)

## License

Internal project for Tactyqal Labs hire-a-thon assessment.