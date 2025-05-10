// User profile utility functions
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string | undefined;
  displayName: string;
  avatarUrl: string | null;
  provider: string;
  created_at: string | null;
}

/**
 * Extract user profile information from Supabase User object
 */
export function getUserProfile(user: User | null): UserProfile | null {
  if (!user) return null;
  
  const metadata = user.user_metadata || {};
  
  // Determine auth provider
  let provider = 'email';
  if (metadata.provider) {
    provider = metadata.provider;
  } else if (metadata.sub && metadata.sub.startsWith('google')) {
    provider = 'google';
  } else if (metadata.sub && metadata.sub.startsWith('github')) {
    provider = 'github';
  }
  
  // Get display name from various possible metadata fields
  const displayName = 
    metadata.full_name || 
    metadata.name || 
    metadata.preferred_username || 
    (user.email ? user.email.split('@')[0] : 'User');
  
  // Get avatar URL
  const avatarUrl = metadata.avatar_url || metadata.picture || null;
  
  return {
    id: user.id,
    email: user.email,
    displayName,
    avatarUrl,
    provider,
    created_at: user.created_at
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string | null, format: 'short' | 'long' = 'short'): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (format === 'short') {
    return date.toLocaleDateString();
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  }
}
