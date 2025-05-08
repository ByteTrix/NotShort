-- Create public schema tables for the NotShort URL service

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create links table to store URL mappings
CREATE TABLE IF NOT EXISTS public.links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  original TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  clicks INTEGER DEFAULT 0,
  title TEXT,
  is_public BOOLEAN DEFAULT TRUE
);

-- Create click_events table to track URL visits
CREATE TABLE IF NOT EXISTS public.click_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_id UUID REFERENCES public.links(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT
);

-- Create Row Level Security (RLS) policies
-- Enable RLS on the links table
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Public links can be accessed by anyone
CREATE POLICY "Public links are viewable by everyone" 
  ON public.links
  FOR SELECT
  USING (is_public = TRUE);

-- Users can view their own links (public or private)
CREATE POLICY "Users can view their own links" 
  ON public.links
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own links
CREATE POLICY "Users can create their own links" 
  ON public.links
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own links
CREATE POLICY "Users can update their own links" 
  ON public.links
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own links
CREATE POLICY "Users can delete their own links" 
  ON public.links
  FOR DELETE
  USING (auth.uid() = user_id);

-- Allow anonymous users to create public links
CREATE POLICY "Anonymous users can create public links" 
  ON public.links
  FOR INSERT
  WITH CHECK (user_id IS NULL AND is_public = TRUE);

-- RLS for click_events table
ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;

-- Users can view click events for their own links
CREATE POLICY "Users can view click events for their links" 
  ON public.click_events
  FOR SELECT
  USING (auth.uid() = (SELECT user_id FROM public.links WHERE id = link_id));

-- STORAGE SETUP - For future use (profiles, screenshots, etc.)
-- Create buckets and policies as needed

-- Create functions to update click counts
CREATE OR REPLACE FUNCTION public.increment_link_click()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.links
  SET clicks = clicks + 1
  WHERE id = NEW.link_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to increment click count
CREATE TRIGGER increment_click_count
  AFTER INSERT ON public.click_events
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_link_click();

-- Create function to get user's links
CREATE OR REPLACE FUNCTION public.get_user_links(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  original TEXT,
  created_at TIMESTAMPTZ,
  clicks INTEGER,
  title TEXT,
  is_public BOOLEAN
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT l.id, l.slug, l.original, l.created_at, l.clicks, l.title, l.is_public
  FROM public.links l
  WHERE l.user_id = user_uuid
  ORDER BY l.created_at DESC;
END;
$$;