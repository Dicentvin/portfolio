# Chukwudi Vincent — Portfolio

React + Tailwind + **Supabase** portfolio with CMS admin panel.

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) → **New project**
2. Give it a name, set a strong database password, choose a region

### 3. Run the database migration

In your Supabase project:
**SQL Editor → New Query → paste contents of `supabase/migration.sql` → Run**

This creates the 4 tables: `blog_posts`, `projects`, `contact_messages`, `resume`

### 4. Seed sample data (optional but recommended)

**SQL Editor → New Query → paste contents of `supabase/seed.sql` → Run**

This inserts 3 blog posts, 6 projects, and your resume data.

### 5. Create your admin user

**Supabase Dashboard → Authentication → Users → Add user**

Enter your email and a strong password. This is what you log in with at `/admin`.

### 6. Get your API keys

**Supabase Dashboard → Project Settings → API**

Copy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 7. Add environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 8. Run the app

```bash
npm run dev
```

Open:
- **Portfolio** → `http://localhost:5173/`
- **Admin** → `http://localhost:5173/admin`

---

## Project Structure

```
src/
├── lib/
│   ├── supabase.ts        ← Supabase client
│   ├── db.ts              ← All database functions
│   └── AuthContext.tsx    ← Auth state (login/logout)
├── layout/
│   └── Layout.tsx         ← 3-column grid layout
├── compos/
│   ├── Sidebar.tsx        ← Icon nav + profile card (typewriter + image crossfade)
│   ├── MainContent.tsx    ← Home page
│   ├── skill.tsx          ← Skills page
│   ├── Data.tsx           ← General skills
│   ├── education.tsx      ← Work + education timeline
│   ├── Resume.tsx         ← Resume overview
│   ├── ResumeSingle.tsx   ← Full resume detail
│   ├── blogTech.tsx       ← Blog listing
│   ├── BlogSingle.tsx     ← Blog article
│   ├── Projects.tsx       ← Projects grid with filters
│   ├── ProjectSingle.tsx  ← Project detail
│   ├── testimonial.tsx    ← Client testimonials
│   ├── contact.tsx        ← Contact form
│   └── admin/
│       ├── AdminLogin.tsx      ← /admin login page
│       ├── AdminDashboard.tsx  ← /admin/dashboard CMS
│       └── ProtectedRoute.tsx  ← Auth guard
supabase/
├── migration.sql   ← Run first — creates all tables + RLS
└── seed.sql        ← Run second — inserts sample data
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home — typewriter animation + stats |
| `/skills` | Technologies with progress bars |
| `/works` | General skills, languages, practices |
| `/projects` | Filterable project grid (ALL / SQL / PYTHON / AZURE / AWS) |
| `/projects/:slug` | Project detail — challenge, solution, outcomes, tech stack |
| `/education` | Work experience + education timeline |
| `/resume` | Resume overview |
| `/resume/view` | Full resume — downloadable |
| `/blog` | Blog listing with category filters |
| `/blog/:slug` | Blog article with paragraph/heading/quote blocks |
| `/testimonials` | Client testimonials |
| `/contact` | Contact form — saves to Supabase |
| `/admin` | Admin login |
| `/admin/dashboard` | CMS — Blog, Projects, Messages (realtime), Resume |

---

## Adding Content via Supabase Studio

### Blog Post
Go to **Table Editor → blog_posts → Insert row**

| Column | Value |
|--------|-------|
| slug | `my-post-slug` |
| title | `Post Title` |
| date | `May 1, 2025` |
| read_time | `5 min read` |
| category | `Code` |
| image | `https://...` |
| excerpt | Short description |
| content | JSON array (see below) |
| tags | `{Tag1,Tag2}` |
| published | `true` |

Content JSON format:
```json
[
  { "type": "paragraph", "text": "Your text here." },
  { "type": "heading",   "text": "A Section Title" },
  { "type": "quote",     "text": "An inspiring quote." }
]
```

### Project
Go to **Table Editor → projects → Insert row**

Required fields: `slug`, `title`, `subtitle`, `category` (array), `image`, `year`, `duration`,
`role`, `client`, `tags` (array), `overview`, `challenge`, `solution`,
`outcomes` (array), `tech_stack` (JSON), `gallery` (array),
`live_url`, `github_url`, `published`, `order`

---

## Build for Production

```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```
Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel dashboard → Environment Variables.

---

## Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Supabase** — PostgreSQL database + Auth + Realtime
- **React Router v6**
- **Lucide React** icons
- **Vite** build tool
