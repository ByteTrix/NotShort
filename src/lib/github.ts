/**
 * GitHub API client for fetching repository statistics
 */

// GitHub API URLs
const REPO_OWNER = 'kavinthangavel';
const REPO_NAME = 'naid';
const REPO_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

// Cache for GitHub stats to avoid excessive API calls
let statsCache: RepoStats | null = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

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

// Fetch repo statistics
export async function getRepoStats(): Promise<RepoStats> {
  // Return cached data if available and recent
  if (statsCache && Date.now() - lastFetch < CACHE_DURATION) {
    return statsCache;
  }

  try {
    // Fetch basic repo information
    const repoResponse = await fetch(REPO_API_URL);
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }
    const repoData = await repoResponse.json();
    
    // Fetch contributors
    const contributorsResponse = await fetch(`${REPO_API_URL}/contributors?per_page=5`);
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
    statsCache = stats;
    lastFetch = Date.now();

    return stats;
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    
    // Return fallback data
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