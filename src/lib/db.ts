import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  date: string;
  read_time: string;
  category: string;
  image: string;
  excerpt: string;
  content: { type: 'paragraph' | 'heading' | 'quote'; text: string }[];
  tags: string[];
  related?: string[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string[];
  image: string;
  year: string;
  duration: string;
  role: string;
  client: string;
  tags: string[];
  overview: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  tech_stack: Record<string, string[]>;
  gallery: string[];
  live_url: string;
  github_url: string;
  related?: string[];
  published: boolean;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at?: string;
}

export interface ResumeData {
  id?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: { role: string; company: string; period: string; location: string; bullets: string[] }[];
  education: { degree: string; school: string; period: string; note: string }[];
  skills: Record<string, string[]>;
  certifications: { name: string; issuer: string; year: string }[];
  updated_at?: string;
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (publishedOnly) query = query.eq('published', true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data as BlogPost;
}

export async function saveBlogPost(post: BlogPost): Promise<string> {
  const { id, ...rest } = post;
  const payload = { ...rest, updated_at: new Date().toISOString() };

  if (id) {
    const { error } = await supabase.from('blog_posts').update(payload).eq('id', id);
    if (error) throw error;
    return id;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({ ...payload, created_at: new Date().toISOString() })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(publishedOnly = true): Promise<Project[]> {
  let query = supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true });

  if (publishedOnly) query = query.eq('published', true);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data as Project;
}

export async function saveProject(project: Project): Promise<string> {
  const { id, ...rest } = project;
  const payload = { ...rest, updated_at: new Date().toISOString() };

  if (id) {
    const { error } = await supabase.from('projects').update(payload).eq('id', id);
    if (error) throw error;
    return id;
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({ ...payload, created_at: new Date().toISOString() })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function submitContactMessage(
  msg: Omit<ContactMessage, 'id' | 'read' | 'created_at'>
): Promise<string> {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({ ...msg, read: false, created_at: new Date().toISOString() })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function getMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as ContactMessage[];
}

export async function markMessageRead(id: string): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}

// ─── Resume ───────────────────────────────────────────────────────────────────

export async function getResume(): Promise<ResumeData | null> {
  const { data, error } = await supabase
    .from('resume')
    .select('*')
    .single();

  if (error) return null;
  return data as ResumeData;
}

export async function saveResume(resume: ResumeData): Promise<void> {
  const { id, ...rest } = resume;
  const payload = { ...rest, updated_at: new Date().toISOString() };

  if (id) {
    const { error } = await supabase.from('resume').update(payload).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('resume').insert(payload);
    if (error) throw error;
  }
}
