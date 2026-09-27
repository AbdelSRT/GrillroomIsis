import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Trim whitespace, remove accidental surrounding quotes,
// strip trailing slashes AND any accidental /rest/v1 suffix.
// Correct value should be: https://xyz.supabase.co  (no trailing slash, no /rest/v1)
const cleanUrl = rawUrl
  .trim()
  .replace(/^["']|["']$/g, '')   // remove surrounding quotes
  .replace(/\/rest\/v1\/?$/, '') // strip /rest/v1 suffix if present
  .replace(/\/+$/, '');          // strip any trailing slashes

const cleanKey = rawKey.trim().replace(/^["']|["']$/g, '');

export const isSupabaseConfigured = () => {
  return Boolean(cleanUrl && cleanKey && cleanUrl.startsWith('http'));
};

export const supabase = isSupabaseConfigured()
  ? createClient(cleanUrl, cleanKey)
  : null;
