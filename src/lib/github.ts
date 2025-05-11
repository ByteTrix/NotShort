/**
 * GitHub API client for fetching repository statistics
 */

// GitHub API URLs
const REPO_OWNER = 'kavinthangavel';
const REPO_NAME = 'NotShort';
const REPO_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

// Improved cache for GitHub stats to ensure it works on server
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Create a more persistent cache object that works with server-side rendering
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Use global cache if available (for Node.js environments) to persist across module reloads
// This helps with server-side rendering where modules might be re-imported
declare global {
  var githubApiCache: Record<string, CacheItem<any>> | undefined;
}

// Initialize or use existing global cache
if (typeof global !== 'undefined') {
  global.githubApiCache = global.githubApiCache || {};
}

// Use global cache if available, otherwise create local cache
const cache: Record<string, CacheItem<any>> = 
  (typeof global !== 'undefined' && global.githubApiCache) || {};

export interface RepoStats {
  stars: number;
  forks: number;
  contributors: {
    name: string;
    avatar: string;
    url: string;
  }[];
  lastUpdate: string;
}

export interface ContributorData {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// Helper to get authentication headers for GitHub API
function getGithubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json'
  };
  
  // Add authorization if token is available
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export async function getGithubUser(username: string): Promise<GitHubUser | null> {
  if (!username) {
    console.error('GitHub username is required.');
    return null;
  }

  const CACHE_KEY = `github_user_${username}`;

  // Return cached data if available and recent
  const cachedUser = cache[CACHE_KEY];
  if (cachedUser && (Date.now() - cachedUser.timestamp) < CACHE_DURATION) {
    console.log(`Using cached GitHub user data for ${username}`);
    return cachedUser.data;
  }

  const USER_API_URL = `https://api.github.com/users/${username}`;
  try {
    console.log(`Fetching fresh GitHub user data for ${username}...`);
    const response = await fetch(USER_API_URL, {
      headers: getGithubHeaders()
    });
    if (!response.ok) {
      console.error(`GitHub API error for user ${username}: ${response.status} ${response.statusText}`);
      
      // Check if we have stale cache to use as fallback
      if (cachedUser) {
        console.log(`Using stale cached user data for ${username} as fallback`);
        return cachedUser.data;
      }
      
      return null;
    }
    const userData: GitHubUser = await response.json();
    
    // Cache the result
    cache[CACHE_KEY] = {
      data: userData,
      timestamp: Date.now()
    };
    console.log(`GitHub user data for ${username} cached successfully`);
    
    return userData;
  } catch (error) {
    console.error(`Failed to fetch GitHub user ${username}:`, error);
    
    // Check if we have stale cache to use as fallback
    if (cachedUser) {
      console.log(`Using stale cached user data for ${username} as fallback due to error`);
      return cachedUser.data;
    }
    
    return null;
  }
}

export async function getRepoContributors(owner: string = REPO_OWNER, repo: string = REPO_NAME): Promise<ContributorData[]> {
  const CACHE_KEY = `contributors_${owner}_${repo}`;
  
  // Return cached data if available and recent
  const cachedContributors = cache[CACHE_KEY];
  if (cachedContributors && (Date.now() - cachedContributors.timestamp) < CACHE_DURATION) {
    console.log(`Using cached GitHub contributors for ${owner}/${repo}`);
    return cachedContributors.data;
  }
  
  const CONTRIBUTORS_API_URL = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  try {
    console.log(`Fetching fresh GitHub contributors for ${owner}/${repo}...`);
    const response = await fetch(CONTRIBUTORS_API_URL, {
      headers: getGithubHeaders()
    });
    if (!response.ok) {
      console.error(`GitHub API error for contributors of ${owner}/${repo}: ${response.status} ${response.statusText}`);
      
      // Check if we have stale cache to use as fallback
      if (cachedContributors) {
        console.log(`Using stale cached contributors for ${owner}/${repo} as fallback`);
        return cachedContributors.data;
      }
      
      return []; // Return empty array if no cache is available
    }
    const contributorsData: ContributorData[] = await response.json();
    
    // Cache the result
    cache[CACHE_KEY] = {
      data: contributorsData,
      timestamp: Date.now()
    };
    console.log(`GitHub contributors for ${owner}/${repo} cached successfully`);
    
    return contributorsData;
  } catch (error) {
    console.error(`Failed to fetch contributors for ${owner}/${repo}:`, error);
    
    // Check if we have stale cache to use as fallback
    if (cachedContributors) {
      console.log(`Using stale cached contributors for ${owner}/${repo} as fallback due to error`);
      return cachedContributors.data;
    }
    
    return []; // Return empty array if no cache is available
  }
}
// Fetch repo statistics
export async function getRepoStats(): Promise<RepoStats> {
  const CACHE_KEY = 'repo_stats';
  
  // Return cached data if available and recent
  const cachedStats = cache[CACHE_KEY];
  if (cachedStats && (Date.now() - cachedStats.timestamp) < CACHE_DURATION) {
    console.log('Using cached GitHub repo stats');
    return cachedStats.data;
  }

  try {
    console.log('Fetching fresh GitHub repo stats...');
    // Fetch basic repo information
    const repoResponse = await fetch(REPO_API_URL, {
      headers: getGithubHeaders()
    });
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }
    const repoData = await repoResponse.json();
    
    // Fetch contributors
    const contributorsResponse = await fetch(`${REPO_API_URL}/contributors?per_page=5`, {
      headers: getGithubHeaders()
    });
    if (!contributorsResponse.ok) {
      throw new Error(`GitHub API error: ${contributorsResponse.status}`);
    }
    const contributorsData: ContributorData[] = await contributorsResponse.json();

    // Format data
    const stats: RepoStats = {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      contributors: contributorsData.map(c => ({
        name: c.login,
        avatar: c.avatar_url,
        url: c.html_url
      })),
      lastUpdate: repoData.updated_at
    };

    // Cache the result
    cache[CACHE_KEY] = {
      data: stats,
      timestamp: Date.now()
    };
    console.log('GitHub repo stats cached successfully');

    return stats;
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    
    // Check if we have stale cache to use as fallback
    if (cachedStats) {
      console.log('Using stale cached GitHub data as fallback');
      return cachedStats.data;
    }
    
    // Return fallback data if no cache is available
    return {
      stars: 12,
      forks: 3,
      contributors: [
        {
          name: 'contributor1',
          avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
          url: 'https://github.com/contributor1'
        },
        {
          name: 'contributor2',
          avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
          url: 'https://github.com/contributor2'
        }
      ],
      lastUpdate: new Date().toISOString()
    };
  }
}

// Get repository URL
export function getRepoUrl(): string {
  return `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
}