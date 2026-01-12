import { Star, GitFork } from "lucide-react";
import { formatNumber } from "@/lib/github";
import type { Repository } from "@/lib/github";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group h-full cursor-pointer"
    >
      <Card className="h-full bg-white border-transparent shadow-sm transition-all duration-300 ease-out 
        hover:bg-slate-50/80 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1
        rounded-lg overflow-hidden flex flex-col"
      >
        <div className="p-5 px-6 flex-grow flex flex-col">
          {/* Header: Logo & Title */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12 rounded-lg border border-slate-100 shrink-0">
              <AvatarImage src={repo.owner.avatar_url} alt={repo.owner.login} />
              <AvatarFallback className="rounded-lg">{repo.owner.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-slate-900 text-lg leading-tight truncate group-hover:text-primary transition-colors">
                {repo.full_name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Updated {new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 mb-6 line-clamp-1 md:line-clamp-2 leading-relaxed group-hover:text-slate-700 transition-colors">
            {repo.description || "No description provided."}
          </p>

          {/* Stats - Pushed to bottom */}
          <div className="mt-auto grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
            <div className="flex items-center justify-center gap-1.5 text-slate-600 group-hover:text-amber-600 transition-colors">
              <Star className="w-4 h-4 text-amber-500 fill-amber-100" />
              <span className="font-bold text-sm text-slate-700 group-hover:text-slate-900">{formatNumber(repo.stargazers_count)}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-slate-500 group-hover:text-slate-700 transition-colors">
              <GitFork className="w-4 h-4" />
              <span className="font-bold text-sm">{formatNumber(repo.forks_count)}</span>
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}

export function RepoSkeleton() {
  return (
    <Card className="h-full bg-white border-transparent shadow-sm rounded-lg p-5 px-6 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-slate-100 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-5 bg-slate-100 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-slate-50 rounded w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-slate-50 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-50 rounded w-2/3 animate-pulse" />
      </div>
      <div className="mt-auto pt-4 border-t border-slate-50 grid grid-cols-2 gap-4">
        <div className="h-4 bg-slate-100 rounded animate-pulse" />
        <div className="h-4 bg-slate-100 rounded animate-pulse" />
      </div>
    </Card>
  );
}
