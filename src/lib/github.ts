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
  cached?: boolean;
}

const GITHUB_API_BASE = "https://api.github.com/search/repositories";
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 生成缓存键
function generateCacheKey(keyword: string, sort: string, order: string, page: number, per_page: number): string {
  return `github_${keyword}_${sort}_${order}_${page}_${per_page}`;
}

// 从缓存获取数据
function getFromCache(key: string): SearchResult | null {
  try {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;
    
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    
    return { ...data, cached: true };
  } catch (error) {
    return null;
  }
}

// 写入缓存
function writeToCache(key: string, data: SearchResult): void {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    // 缓存失败时静默处理
  }
}

export async function searchAiRepositories(
  keyword: string = "",
  sort: "stars" | "updated" = "stars",
  order: "desc" | "asc" = "desc",
  page: number = 1,
  per_page: number = 24
): Promise<SearchResult> {
  // 生成缓存键
  const cacheKey = generateCacheKey(keyword, sort, order, page, per_page);
  
  // 尝试从缓存获取数据
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Base query: AI related topics + stars >= 1000 + not archived + public
  let q = "";
  
  // Add AI keyword constraint
  if (!keyword) {
    q = "ai OR agent OR mcp OR llm OR machine-learning stars:>=1000 fork:true is:public archived:false"; 
  } else {
    // 处理搜索词，确保正确处理带空格的词
    const searchTerm = keyword.trim();
    q = `${searchTerm} in:name,description,topics stars:>=1000 fork:true is:public archived:false`;
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
      timeout: 10000, // 10秒超时
    });
    
    // 写入缓存
    writeToCache(cacheKey, response.data);
    
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

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
