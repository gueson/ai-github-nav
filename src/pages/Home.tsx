import { useState, useEffect, useRef } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SortToggle } from "@/components/SortToggle";
import { RepoCard, RepoSkeleton } from "@/components/RepoCard";
import { Pagination } from "@/components/Pagination";
import { searchAiRepositories } from "@/lib/github";
import type { SearchResult } from "@/lib/github";
import { AlertCircle, RefreshCcw, Github, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function Home() {
  // 从URL获取初始查询参数
  const getInitialQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
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
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState(null, "", newUrl);
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="container max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => { setQuery(""); setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Github className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">GitHub AI 导航</h1>
              <p className="text-xs text-slate-500 font-medium">精选高 Star 开源项目</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          <div className="shrink-0 w-10 sm:w-auto" /> {/* Spacer or Auth placeholder */}
        </div>
      </header>

      <main className="container max-w-[1400px] mx-auto px-4 py-8" ref={topRef}>
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-sm text-slate-500 font-medium order-2 sm:order-1">
            {loading ? (
              <span className="animate-pulse">正在搜索优质 AI 项目...</span>
            ) : data ? (
              <span>
                找到 <span className="font-bold text-slate-900">{data.total_count.toLocaleString()}</span> 个相关仓库
                {data.total_count > 1000 && (
                  <span className="ml-2 inline-flex items-center text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    仅展示前 1k
                  </span>
                )}
              </span>
            ) : (
              <span>准备就绪</span>
            )}
          </div>
          <div className="order-1 sm:order-2 self-end sm:self-auto">
            <SortToggle order={order} onChange={handleSortChange} />
          </div>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">数据获取异常</h3>
            <p className="text-slate-500 max-w-md mb-6">{error}</p>
            <Button onClick={fetchData} className="gap-2">
              <RefreshCcw className="w-4 h-4" /> 重试
            </Button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-[280px]">
                <RepoSkeleton />
              </div>
            ))}
          </div>
        ) : data?.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">未找到相关项目</h3>
            <p className="text-slate-500 max-w-md">
              尝试更换关键词，或者减少筛选条件。我们目前仅展示 Star 数大于 1000 的 AI 仓库。
            </p>
            <Button variant="outline" onClick={() => setQuery("")} className="mt-6">
              清除搜索条件
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
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
            
            {/* End of results message */}
            {data && page * 24 >= Math.min(data.total_count, 1000) && (
              <div className="text-center py-8 text-slate-400 text-sm">
                已加载全部高星 AI 仓库 (GitHub API 限制前 1000 条结果)
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-auto">
        <div className="container max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">GitHub AI 导航</h2>
                <p className="text-xs text-slate-500">精选全球最佳 AI 开源项目</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="https://github.com/gueson/ai-github-nav" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
                项目源码
              </a>
              <a href="https://github.com/gueson/ai-github-nav/issues" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
                反馈问题
              </a>
              <a href="https://github.com/gueson/ai-github-nav/pulls" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
                贡献代码
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} GitHub AI 导航. 数据来源于 GitHub API.</p>
            <p className="mt-1">仅用于学习和研究目的，所有内容的版权归原作者所有。</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
