import axios from "axios";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number; // API returns watchers_count (same as stars usually, but subscribers_count is watchers in UI)
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  topics: string[];
  updated_at: string;
}

export interface SearchResult {
  total_count: number;
  items: Repository[];
  incomplete_results: boolean;
}

const GITHUB_API_BASE = "https://api.github.com/search/repositories";

export async function searchAiRepositories(
  keyword: string = "",
  sort: "stars" | "updated" = "stars",
  order: "desc" | "asc" = "desc",
  page: number = 1,
  per_page: number = 50
): Promise<SearchResult> {
  // Base query: AI related topics + stars >= 1000 + not archived + public
  // Note: "topic:ai" is a good start, but we might want broader coverage like "machine-learning" or just "ai" in text
  // Requirement says: "Star数量 >= 1000", "AI相关"
  
  let q = "stars:>=1000 fork:true is:public archived:false";
  
  // Add AI keyword constraint
  // We combine multiple topics or a general text search if keyword is empty
  if (!keyword) {
    q += " topic:ai"; 
  } else {
    // If keyword exists, we search in name, description, topics
    // API syntax: "keyword in:name,description,topics"
    q += ` ${keyword} in:name,description,topics`;
  }

  try {
    const response = await axios.get<SearchResult>(GITHUB_API_BASE, {
      params: {
        q,
        sort,
        order,
        page,
        per_page,
      },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403 || error.response?.status === 429) {
        throw new Error("GitHub API 限流，请稍后再试或使用代理。");
      }
    }
    throw new Error("获取数据失败，请检查网络。");
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}
