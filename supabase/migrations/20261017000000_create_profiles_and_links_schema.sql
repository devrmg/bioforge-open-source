-- ==============================================================================
-- BioForge — Future Database Schema (DEFERRED / INACTIVE FOR MVP)
-- DATABASE_MODE=local is default.
-- DO NOT APPLY OR EXECUTE THIS SCRIPT IN THE MVP ENVIRONMENT.
-- ==============================================================================

-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- references auth.users(id) in Supabase / external auth
    handle VARCHAR(40) NOT NULL UNIQUE,
    display_name VARCHAR(80) NOT NULL,
    profession_badge VARCHAR(60),
    bio VARCHAR(400),
    avatar_url TEXT,
    location VARCHAR(60),
    theme_id VARCHAR(40) NOT NULL DEFAULT 'obsidian-dark',
    seo_page_title VARCHAR(120),
    seo_meta_description VARCHAR(250),
    seo_canonical_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT handle_format_check CHECK (handle ~* '^[a-zA-Z0-9_@.-]+$'),
    CONSTRAINT display_name_not_empty CHECK (char_length(trim(display_name)) > 0)
);

-- Indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_handle ON public.profiles(handle);

-- 2. Profile Links Table
CREATE TABLE IF NOT EXISTS public.profile_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    platform VARCHAR(30) NOT NULL,
    title VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    subtitle VARCHAR(160),
    highlight BOOLEAN NOT NULL DEFAULT FALSE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT title_not_empty CHECK (char_length(trim(title)) > 0),
    CONSTRAINT safe_url_protocol CHECK (url ~* '^(https?://|mailto:)')
);

-- Indexes for links
CREATE INDEX IF NOT EXISTS idx_profile_links_profile_order ON public.profile_links(profile_id, order_index);
CREATE INDEX IF NOT EXISTS idx_profile_links_active ON public.profile_links(profile_id, active);

-- 3. Theme Presets Table (For customizable cloud themes in future releases)
CREATE TABLE IF NOT EXISTS public.theme_presets (
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    author_note VARCHAR(100),
    colors JSONB NOT NULL,
    font_family VARCHAR(20) NOT NULL DEFAULT 'sans',
    border_radius VARCHAR(20) NOT NULL DEFAULT 'md',
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Policies (Draft for Future Cloud Activation)
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theme_presets ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read, only owner can modify
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can create their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
    ON public.profiles FOR DELETE 
    USING (auth.uid() = user_id);

-- Profile Links: Public can read active links, owner has full CRUD
CREATE POLICY "Public can view active links" 
    ON public.profile_links FOR SELECT 
    USING (active = true);

CREATE POLICY "Owners can view all their links" 
    ON public.profile_links FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = profile_links.profile_id 
            AND profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Owners can manage their links" 
    ON public.profile_links FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = profile_links.profile_id 
            AND profiles.user_id = auth.uid()
        )
    );

-- Theme Presets: Read-only for all users
CREATE POLICY "Theme presets viewable by everyone" 
    ON public.theme_presets FOR SELECT 
    USING (is_public = true);
