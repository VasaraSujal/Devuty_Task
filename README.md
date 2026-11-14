# 🚀 Tactyqal Labs — Full Stack Transformation (Devuty Edition)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-lightgrey?style=for-the-badge&logo=express&logoColor=black)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.18-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)

> Production-grade full-stack transformation built for the **Tactyqal Labs Full Stack Developer Intern Hire-a-thon**.  
> Features a complete visual and architectural redesign: migrating from a fragmented WordPress/CodeIgniter stack to a unified, cybernetic **Devuty-themed Next.js 14 + Express + Prisma Monorepo**.

---

## 📌 Submission Deliverables & Links

| Requirement | Details & Links |
| :--- | :--- |
| **Requirement 1: Live Demo** | [https://devuty-task.vercel.app](https://devuty-task.vercel.app) *(Frontend on Vercel & Backend on Render)* |
| **Requirement 1: Video Walkthrough** | [Watch Video Walkthrough](#) *(Full feature walkthrough: UI, animations, blog, admin CMS)* |
| **Requirement 2: GitHub Repository** | [`https://github.com/VasaraSujal/Devuty_Task`](https://github.com/VasaraSujal/Devuty_Task) |
| **Backend API Service** | [https://devuty-task-backend.onrender.com](https://devuty-task-backend.onrender.com) |
| **Backend API Documentation** | [https://devuty-task-backend.onrender.com/api/v1/docs/](https://devuty-task-backend.onrender.com/api/v1/docs/) *(OpenAPI / Swagger UI)* |

---

## 🎯 Task Breakdown & Execution Summary

### Task 1 — Public Homepage Redesign
- **The Challenge:** The legacy Tactyqal Labs website had basic styling, inconsistent branding, and lacked engaging interactions.
- **The Solution:** Transformed the public homepage into a high-impact, editorial-grade tech platform adopting the signature **Devuty cybernetic dark design system**:
  - **Color Tokens:** Deep Pitch Black (`#070709`), Electric Orange (`#FF5E14`), and Technical Card Surfaces (`#111116`).
  - **Dynamic Background FX:** Global 3.5rem blueprint grid matrix, top ambient orange bloom gradients, and CSS selection accents.
  - **Interactive Hero Experience:** Dual-speed counter-rotating SVG telemetry rings (50s / 35s), 360° sweeping conic radar beam, orbiting satellite beacons, live HUD coordinate markers (`SYS_STATUS // ACTIVE`), and monospace badges `[ PROOF-OF-WORK MARKETPLACE // YOUTH ACCELERATOR ]`.
  - **Company Marquee:** Continuous CSS marquee showcasing hiring companies and partner institutions.
  - **Interactive Sections:** Problem & Opportunity breakdown, 8-Week Program Roadmap with interactive sprint phases, 1-on-1 Mentorship showcase, Alumni Case Studies, Transparent Pricing Tiers, and high-conversion terminal CTAs.
  - **100% Mobile & Desktop Responsive:** Collapsible mobile navigation drawer with fluid spring physics.

### Task 2 — Modern Blog Architecture & Admin CMS
- **The Challenge:** The existing blog ran on legacy WordPress in isolation from the main CodeIgniter platform, leading to sluggish performance, plugin vulnerabilities, and fragmented auth.
- **The Solution:** Engineered a custom, decoupled Node.js/Express REST backend backed by PostgreSQL (Supabase) via Prisma ORM, accompanied by a custom Next.js 14 Admin CMS:
  - **Full Blog CRUD API:** Create, Read, Update, Delete with published/draft status workflows.
  - **Taxonomy Engine:** Flexible Many-to-Many tagging and category associations.
  - **Enterprise Security:** JWT access + refresh token rotation in `HttpOnly`, `SameSite=Strict` cookies, double-submit CSRF cookie tokens, Helmet headers, Zod input validation, and rate-limiting.
  - **Standalone Admin Portal (`/admin`):** Isolated `/admin/login` view, post manager table with search/filters, rich composition editor, category/tag organizers, and live telemetry metric cards.
  - **Public Editorial Experience (`/blog`):** Reading progress indicators, active scroll Table of Contents (TOC), tag filtering, social sharing, and search.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Layer (Browser)"]
        UI["Public Experience\n(Next.js 14 App Router)"]
        CMS["Admin CMS Console\n(/admin & /admin/login)"]
        Reader["Blog Editorial View\n(/blog & /blog/:slug)"]
    end

    subgraph Edge ["Network & Reverse Proxy"]
        Vercel["Next.js Server / Vercel Edge\n(Port 3000)"]
        CORS["CORS & Cookie Synchronizer\n(Double-Submit CSRF)"]
    end

    subgraph Backend ["Backend API Service (Express.js)"]
        Router["Express Router (/api/v1)\n(Port 5000)"]
        Middlewares["Security Middlewares\n(Helmet, RateLimit, CSRF, JWT)"]
        Controllers["Controllers\n(Auth, Post, Category, Tag, Media)"]
        Services["Services Layer\n(Business Logic & Token Rotation)"]
    end

    subgraph Data ["Persistence & Cloud Storage"]
        Prisma["Prisma ORM Client\n(Connection Pooling)"]
        Postgres[("PostgreSQL Database\n(Supabase / Neon)")]
        Storage["Supabase Object Storage\n(Media & Images)"]
    end

    UI --> Vercel
    CMS --> Vercel
    Reader --> Vercel
    Vercel --> CORS
    CORS --> Router
    Router --> Middlewares
    Middlewares --> Controllers
    Controllers --> Services
    Services --> Prisma
    Services --> Storage
    Prisma --> Postgres
```

---

## 🔐 Authentication & CSRF Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant Frontend as Next.js 14 Frontend
    participant Backend as Express API
    participant DB as PostgreSQL (Prisma)

    Admin->>Frontend: Submit credentials on /admin/login
    Frontend->>Backend: POST /api/v1/auth/login
    Backend->>DB: Query user by email & verify bcrypt hash
    DB-->>Backend: User record verified (Role: ADMIN)
    Backend->>DB: Store hashed refresh session
    Backend-->>Frontend: 200 OK + Set-Cookie (accessToken, refreshToken) + Set XSRF-TOKEN
    Frontend->>Admin: Redirect to /admin dashboard
    
    Note over Frontend,Backend: Authenticated Request with CSRF Protection
    Admin->>Frontend: Create new article
    Frontend->>Backend: POST /api/v1/posts (Headers: X-CSRF-Token + Cookies)
    Backend->>Backend: Validate CSRF cookie against header
    Backend->>Backend: Verify JWT access token
    Backend->>DB: Insert Post + PostTag relationships
    DB-->>Backend: Created post object
    Backend-->>Frontend: 201 Created
```

---

## 🗄️ Database Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ POST : authors
    USER ||--o{ SESSION : establishes
    CATEGORY ||--o{ POST : categorizes
    POST ||--o{ POST_TAG : contains
    TAG ||--o{ POST_TAG : labels

    USER {
        string id PK
        string email UK
        string password
        string name
        string role
        datetime createdAt
        datetime updatedAt
    }

    POST {
        string id PK
        string title
        string slug UK
        string excerpt
        text content
        string coverImage
        enum status "DRAFT | PUBLISHED | ARCHIVED"
        string authorId FK
        string categoryId FK
        datetime publishedAt
        datetime createdAt
        datetime updatedAt
    }

    CATEGORY {
        string id PK
        string name UK
        string slug UK
        string description
        datetime createdAt
        datetime updatedAt
    }

    TAG {
        string id PK
        string name UK
        string slug UK
        datetime createdAt
        datetime updatedAt
    }

    POST_TAG {
        string postId PK, FK
        string tagId PK, FK
    }

    SESSION {
        string id PK
        string userId FK
        string refreshToken
        string userAgent
        string ipAddress
        datetime expiresAt
        datetime createdAt
    }
```

---

## 📂 Project Directory Structure

```text
Devuty_Task/
├── .gitignore                          # Root ignore rules (zero leaks guaranteed)
├── package.json                        # Root monorepo workspace configuration
├── package-lock.json                   # Deterministic lockfile for all workspaces
├── README.md                           # Documentation, diagrams & setup guide
│
├── apps/
│   ├── backend/                        # Express.js REST API
│   │   ├── .env.example                # Sanitized backend environment template
│   │   ├── .gitignore                  # Backend-specific ignore rules
│   │   ├── package.json                # Express & Prisma dependencies
│   │   ├── tsconfig.json               # Backend TypeScript configuration
│   │   ├── server.ts                   # HTTP listener entrypoint
│   │   ├── prisma/
│   │   │   ├── schema.prisma           # Prisma PostgreSQL data models
│   │   │   ├── seed.ts                 # Database seeder (admin & starter tags)
│   │   │   └── migrations/             # Timestamped SQL migration history
│   │   └── src/
│   │       ├── app.ts                  # Express setup, CORS, Helmet, RateLimiting
│   │       ├── config/                 # Env validation, DB client, Swagger setup
│   │       ├── controllers/            # HTTP controllers (Auth, Posts, Media)
│   │       ├── middlewares/            # Auth, CSRF, Zod validation, Error handlers
│   │       ├── routes/                 # Versioned route endpoints (/api/v1)
│   │       ├── services/               # Core business logic & storage adapters
│   │       ├── utils/                  # JWT signers & password hashers
│   │       └── validators/             # Zod input verification schemas
│   │
│   └── frontend/                       # Next.js 14 App Router Application
│       ├── .env.example                # Frontend environment template
│       ├── .env.local.example          # Detailed environment setup guide
│       ├── .eslintrc.json              # Linting rules
│       ├── .gitignore                  # Frontend ignore rules
│       ├── next.config.mjs             # Next.js optimization configuration
│       ├── tailwind.config.ts          # Devuty theme tokens & animations
│       ├── public/                     # Static media & vector assets
│       └── src/
│           ├── app/
│           │   ├── layout.tsx          # Root layout with Cyber Grid Matrix
│           │   ├── globals.css         # Global utilities & radar animations
│           │   ├── page.tsx            # Redesigned Tactyqal Labs homepage
│           │   ├── blog/               # Public blog directory & [slug] reader
│           │   └── admin/              # Standalone login, dashboard & post manager
│           ├── components/
│           │   ├── admin/              # Admin CMS Sidebar, Header, Protected wrapper
│           │   ├── blog/               # Article card, search, TOC, tags, pagination
│           │   ├── sections/           # 12+ Devuty cybernetic homepage sections
│           │   ├── shared/             # Sticky navigation, HUD header & footer
│           │   ├── ui/                 # Accessible primitives (Button, Card, Table)
│           │   └── upload/             # Client-side media upload with preview
│           └── lib/                    # API client, Auth Context, Type definitions
```

---

## 🎨 Devuty Design System Tokens

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| **Pitch Black (Base)** | `#070709` | Root site background, sidebar canvas |
| **Electric Orange (Primary)**| `#FF5E14` | High-impact CTAs, active states, radar sweeps |
| **Card Surface (Dark)** | `#111116` / `#16161D` | Elevated content surfaces & table containers |
| **Crisp Border** | `rgba(255, 255, 255, 0.08)` | 1px technical wireframe borders |
| **Muted Telemetry** | `#A1A1AA` | Body copy, monospace badges & subtitles |
| **Grid Matrix** | `3.5rem x 3.5rem` | Mathematical cyber blueprint background grid |

---

## 🔌 API Reference & Endpoints

Swagger / OpenAPI documentation is built-in and accessible at `http://localhost:5000/api-docs`.

### Authentication Endpoints
- `POST /api/v1/auth/login` — Authenticate admin, issue JWT & CSRF cookies
- `POST /api/v1/auth/logout` — Invalidate refresh token session and clear cookies
- `POST /api/v1/auth/refresh` — Rotate refresh token and issue new access token
- `GET  /api/v1/auth/me` — Retrieve active session profile

### Blog Content Endpoints
- `GET    /api/v1/posts` — Retrieve paginated public posts (supports `?page=`, `?category=`, `?tag=`, `?search=`)
- `GET    /api/v1/posts/:slug` — Retrieve single article by SEO slug
- `GET    /api/v1/admin/posts` — Retrieve all posts including drafts *(Admin only)*
- `POST   /api/v1/posts` — Create new blog article *(Admin only)*
- `PUT    /api/v1/posts/:id` — Update existing article *(Admin only)*
- `DELETE /api/v1/posts/:id` — Remove article *(Admin only)*
- `PATCH  /api/v1/posts/:id/status` — Quick-toggle status (`DRAFT` / `PUBLISHED`)

### Taxonomy & Media Endpoints
- `GET    /api/v1/categories` — List all categories with post counts
- `POST   /api/v1/categories` — Create category *(Admin only)*
- `GET    /api/v1/tags` — List all tags
- `POST   /api/v1/tags` — Create tag *(Admin only)*
- `POST   /api/v1/media/upload` — Upload cover or in-article image *(Validated MIME & Size)*

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or v20+
- **npm**: v9+ (Workspaces enabled)
- **PostgreSQL**: Local instance or free [Supabase](https://supabase.com) project

### 2. Clone & Install
```bash
git clone https://github.com/VasaraSujal/Devuty_Task.git
cd Devuty_Task

# Install all workspace dependencies at root
npm install
```

### 3. Environment Setup

#### Backend Configuration (`apps/backend/.env`)
```bash
cp apps/backend/.env.example apps/backend/.env
```
Fill in your database and security credentials:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
JWT_SECRET=super-secret-jwt-key-min-32-characters-long
JWT_REFRESH_SECRET=super-secret-refresh-jwt-key-min-32-characters-long
CORS_ORIGIN=http://localhost:3000
```

#### Frontend Configuration (`apps/frontend/.env.local`)
```bash
cp apps/frontend/.env.local.example apps/frontend/.env.local
```
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Database Migration & Seeding
```bash
# Push schema migrations to your PostgreSQL instance
npm run db:migrate

# Seed default administrator and categories
npm run db:seed
```

> **Default Admin Credentials (Seeded):**
> - **Email:** `admin@tactyqal.com`
> - **Password:** `admin123`

### 5. Run the Application
Open two separate terminal windows:

```bash
# Terminal 1: Run Express Backend (Port 5000)
npm run dev:backend

# Terminal 2: Run Next.js Frontend (Port 3000)
npm run dev:frontend
```

Now open:
- **Public Homepage:** [http://localhost:3000](http://localhost:3000)
- **Public Blog:** [http://localhost:3000/blog](http://localhost:3000/blog)
- **Admin CMS Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **API Swagger Docs:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel)
1. Import the repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `apps/frontend`.
3. Set **Framework Preset** to `Next.js`.
4. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://<your-backend-service>.onrender.com/api/v1`
   - `NEXT_PUBLIC_SITE_URL`: `https://<your-vercel-domain>.vercel.app`
5. Click **Deploy**.

### Backend Deployment (Render / Railway)
1. Create a **Web Service** on [Render](https://render.com).
2. Set **Root Directory** to `apps/backend`.
3. Set **Build Command**: `npm install && npm run db:generate && npm run db:deploy`
4. Set **Start Command**: `npm start`
5. Configure Environment Variables:
   - Add all values from `apps/backend/.env`.
   - Update `CORS_ORIGIN` to your Vercel frontend URL.
6. Click **Deploy**.

---

## 📜 Quality Assurance & Testing

- ✅ **TypeScript Compilation:** Strict type-safety across both frontend and backend (`0 errors`).
- ✅ **Production Next.js Build:** All 11 App Router routes statically pre-rendered / dynamically handled.
- ✅ **Clean Git History:** 69 granular, logical commits each containing 1 to 2 files.
- ✅ **Zero Secrets Leakage:** Protected `.env` and `.env.local` validated against `.gitignore`.

---

## 👨‍💻 Author

**Vasara Sujal**  
- **GitHub:** [@VasaraSujal](https://github.com/VasaraSujal)  
- **Repository:** [VasaraSujal/Devuty_Task](https://github.com/VasaraSujal/Devuty_Task)
