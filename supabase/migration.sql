-- ============================================================
-- Portfolio Database Migration
-- Run this in Supabase Studio → SQL Editor → New Query → Run
-- ============================================================

-- ─── Enable UUID extension ────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Blog Posts ───────────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  date        text not null,
  read_time   text not null,
  category    text not null,
  image       text not null,
  excerpt     text not null,
  content     jsonb not null default '[]',
  tags        text[] not null default '{}',
  related     text[] default '{}',
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx       on blog_posts (slug);
create index if not exists blog_posts_published_idx  on blog_posts (published);
create index if not exists blog_posts_created_idx    on blog_posts (created_at desc);

-- ─── Projects ─────────────────────────────────────────────────────────────────
create table if not exists projects (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  subtitle    text not null default '',
  category    text[] not null default '{}',
  image       text not null default '',
  year        text not null default '',
  duration    text not null default '',
  role        text not null default '',
  client      text not null default '',
  tags        text[] not null default '{}',
  overview    text not null default '',
  challenge   text not null default '',
  solution    text not null default '',
  outcomes    text[] not null default '{}',
  tech_stack  jsonb not null default '{}',
  gallery     text[] not null default '{}',
  live_url    text not null default '#',
  github_url  text not null default '#',
  related     text[] default '{}',
  published   boolean not null default false,
  "order"     integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_slug_idx       on projects (slug);
create index if not exists projects_published_idx  on projects (published);
create index if not exists projects_order_idx      on projects ("order" asc);

-- ─── Contact Messages ─────────────────────────────────────────────────────────
create table if not exists contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists messages_created_idx on contact_messages (created_at desc);
create index if not exists messages_read_idx    on contact_messages (read);

-- ─── Resume ───────────────────────────────────────────────────────────────────
create table if not exists resume (
  id               uuid primary key default uuid_generate_v4(),
  name             text not null default '',
  title            text not null default '',
  email            text not null default '',
  phone            text not null default '',
  location         text not null default '',
  summary          text not null default '',
  experience       jsonb not null default '[]',
  education        jsonb not null default '[]',
  skills           jsonb not null default '{}',
  certifications   jsonb not null default '[]',
  updated_at       timestamptz not null default now()
);

-- ─── Updated_at trigger ───────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_updated_at  on blog_posts;
drop trigger if exists projects_updated_at    on projects;
drop trigger if exists resume_updated_at      on resume;

create trigger blog_posts_updated_at  before update on blog_posts  for each row execute function update_updated_at();
create trigger projects_updated_at    before update on projects     for each row execute function update_updated_at();
create trigger resume_updated_at      before update on resume       for each row execute function update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table blog_posts       enable row level security;
alter table projects         enable row level security;
alter table contact_messages enable row level security;
alter table resume           enable row level security;

-- Blog Posts
drop policy if exists "Public read published blog posts" on blog_posts;
drop policy if exists "Authenticated full access blog posts" on blog_posts;

create policy "Public read published blog posts"
  on blog_posts for select
  using (published = true);

create policy "Authenticated full access blog posts"
  on blog_posts for all
  using (auth.role() = 'authenticated');

-- Projects
drop policy if exists "Public read published projects" on projects;
drop policy if exists "Authenticated full access projects" on projects;

create policy "Public read published projects"
  on projects for select
  using (published = true);

create policy "Authenticated full access projects"
  on projects for all
  using (auth.role() = 'authenticated');

-- Contact Messages
drop policy if exists "Anyone can insert contact messages" on contact_messages;
drop policy if exists "Authenticated read and manage messages" on contact_messages;

create policy "Anyone can insert contact messages"
  on contact_messages for insert
  with check (true);

create policy "Authenticated read and manage messages"
  on contact_messages for all
  using (auth.role() = 'authenticated');

-- Resume
drop policy if exists "Public read resume" on resume;
drop policy if exists "Authenticated manage resume" on resume;

create policy "Public read resume"
  on resume for select
  using (true);

create policy "Authenticated manage resume"
  on resume for all
  using (auth.role() = 'authenticated');
