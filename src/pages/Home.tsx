import { useState, useEffect, useRef } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SortToggle } from "@/components/SortToggle";
import { RepoCard, RepoSkeleton } from "@/components/RepoCard";
import { Pagination } from "@/components/Pagination";
import { searchAiRepositories } from "@/lib/github";
import type { SearchResult } from "@/lib/github";
import { AlertCircle, RefreshCcw, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { LogoContainer } from "@/components/Logo";

export default function Home() {
  // 从URL获取初始查询参数
  const getInitialQuery = () => {
    // 从 hash 部分获取参数
    const currentHash = window.location.hash || "#/";
    const hashPath = currentHash.startsWith("#") ? currentHash.substring(1) : currentHash;
    const hashParams = new URLSearchParams(hashPath.split("?")[1] || "");
    return hashParams.get("q") || "";
  };
  
  const [query, setQuery] = useState(getInitialQuery());
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Use a ref to scroll to top on page change
  const topRef = useRef<HTMLDivElement>(null);
  
  // 当查询参数变化时更新URL
  useEffect(() => {
    // 由于使用 hash-based routing，我们需要更新 hash 部分的参数
    const currentHash = window.location.hash || "#/";
    const hashPath = currentHash.startsWith("#") ? currentHash.substring(1) : currentHash;
    const hashParams = new URLSearchParams(hashPath.split("?")[1] || "");
    
    if (query) {
      hashParams.set("q", query);
    } else {
      hashParams.delete("q");
    }
    
    const newHashPath = hashPath.split("?")[0] || "/";
    const newHash = hashParams.toString() 
      ? `${newHashPath}?${hashParams.toString()}` 
      : newHashPath;
    
    window.history.replaceState(null, "", `#${newHash}`);
  }, [query]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await searchAiRepositories(query, "stars", order, page, 24);
      setData(result);
      // Scroll to top of list smoothly
      if (page > 1) {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err: any) {
      setError(err.message || "请求失败");
      toast.error(err.message || "获取数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, order, page]);

  // Reset page when query or order changes
  const handleSearch = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  const handleSortChange = (newOrder: "desc" | "asc") => {
    if (newOrder !== order) {
      setOrder(newOrder);
      setPage(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => { setQuery(""); setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <LogoContainer size="md" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">GitHub AI Nav</h1>
              <p className="text-xs text-gray-500">Top AI Open Source Projects</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>
          
          <nav className="flex items-center gap-4">
            <a href="/#/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Home</a>
            <a href="/#/about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">About</a>
            <a href="/#/privacy" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Privacy</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6" ref={topRef}>
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-sm text-gray-500 order-2 sm:order-1">
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : data ? (
              <span>
                Found {data.total_count.toLocaleString()} repositories
                {data.total_count > 1000 && (
                  <span className="ml-2 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    Limited to 1000
                  </span>
                )}
              </span>
            ) : (
              <span>Ready to search</span>
            )}
          </div>
          <div className="order-1 sm:order-2">
            <SortToggle order={order} onChange={handleSortChange} />
          </div>
        </div>
        
        {/* Popular Searches */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['ai', 'llm', 'machine-learning', 'deep-learning', 'chatgpt', 'stable-diffusion', 'agent', 'mcp', 'geo'].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className={query === term 
                  ? "px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  : "px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                }
              >
                {term.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 max-w-md mb-6">{error}</p>
            <Button onClick={fetchData} className="gap-2">
              <RefreshCcw className="w-4 h-4" /> Try again
            </Button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <RepoSkeleton key={i} />
            ))}
          </div>
        ) : data?.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 max-w-md mb-6">
              We couldn't find any repositories matching your search. Try different keywords.
            </p>
            <Button variant="outline" onClick={() => setQuery("")} className="mt-4">
              Clear search
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.items.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {data && (
              <Pagination
                page={page}
                totalItems={data.total_count}
                perPage={24}
                onPageChange={setPage}
                isLoading={loading}
              />
            )}
            
            {data && page * 24 >= Math.min(data.total_count, 1000) && (
              <div className="text-center py-6 text-gray-400 text-sm">
                You've reached the end of results
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-8">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <LogoContainer size="sm" />
              <div>
                <h2 className="text-base font-semibold text-gray-900">GitHub AI Nav</h2>
                <p className="text-xs text-gray-500">Top AI Open Source Projects</p>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="/#/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/#/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="/#/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="https://github.com/gueson/ai-github-nav" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} GitHub AI Navigator. MIT License.</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
