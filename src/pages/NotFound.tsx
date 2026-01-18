import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Github } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="container max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Github className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">GitHub AI 导航</h1>
              <p className="text-xs text-slate-500 font-medium">精选高 Star 开源项目</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto">
            {/* Search bar placeholder */}
            <div className="h-10 bg-white border border-slate-200 rounded-lg" />
          </div>

          <div className="shrink-0 w-10 sm:w-auto" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <h1 className="text-5xl font-bold text-primary">404</h1>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">页面不存在</h2>
        <p className="text-slate-500 max-w-md mb-8">
          很抱歉，您访问的页面不存在或已被移动。
          请返回主页继续浏览优质的 AI 开源项目。
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Github className="w-5 h-5" />
            返回主页
          </Button>
        </Link>
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
    </div>
  );
}

