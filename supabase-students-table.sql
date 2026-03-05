-- Run this in Supabase Dashboard → SQL Editor to create the students table.

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer not null check (age > 0 and age < 150),
  class_name text not null,
  created_at timestamptz default now()
);

-- Optional: enable RLS. For API route (service role) inserts, this is not required.
-- alter table public.students enable row level security;
