import { Star, GitFork } from "lucide-react";
import { formatNumber } from "@/lib/github";
import type { Repository } from "@/lib/github";

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="group h-full">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        aria-label={`View ${repo.full_name} on GitHub`}
      >
        <div className="h-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200">
          <div className="flex items-start gap-3 mb-3">
            <img 
              src={repo.owner.avatar_url} 
              alt={`${repo.owner.login} avatar`}
              loading="lazy"
              width={40}
              height={40}
              className="w-10 h-10 rounded-md object-cover bg-gray-100"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                {repo.full_name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Updated {new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed" role="note">
            {repo.description || "No description"}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1" role="status">
              <Star className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{formatNumber(repo.stargazers_count)} stars</span>
            </div>
            <div className="flex items-center gap-1" role="status">
              <GitFork className="w-4 h-4 text-gray-400" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-600">{formatNumber(repo.forks_count)} forks</span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

export function RepoSkeleton() {
  return (
    <div className="h-full bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-md bg-gray-100 animate-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-50 rounded w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-50 rounded w-full animate-pulse" />
        <div className="h-3 bg-gray-50 rounded w-2/3 animate-pulse" />
      </div>
      <div className="pt-3 border-t border-gray-100 flex gap-4">
        <div className="h-4 bg-gray-100 rounded flex-1 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded flex-1 animate-pulse" />
      </div>
    </div>
  );
}
