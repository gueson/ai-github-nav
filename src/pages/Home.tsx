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
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Use a ref to scroll to top on page change
  const topRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await searchAiRepositories(query, "stars", order, page);
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
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
                    仅展示前 1k条
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
                perPage={50}
                onPageChange={setPage}
                isLoading={loading}
              />
            )}
            
            {/* End of results message */}
            {data && page * 50 >= Math.min(data.total_count, 1000) && (
              <div className="text-center py-8 text-slate-400 text-sm">
                已加载全部高星 AI 仓库 (GitHub API 前1000 条结果)
              </div>
            )}
          </>
        )}
      </main>
      
      <Toaster />
    </div>
  );
}
