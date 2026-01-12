import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalItems: number; // API caps at 1000 usually for search
  perPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ page, totalItems, perPage, onPageChange, isLoading }: PaginationProps) {
  // GitHub Search API limits results to first 1000 items
  const MAX_RESULTS = 1000;
  const effectiveTotal = Math.min(totalItems, MAX_RESULTS);
  const totalPages = Math.ceil(effectiveTotal / perPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={page === 1 || isLoading}
        className="hidden sm:flex"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1 || isLoading}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-1 mx-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Simple sliding window logic could be added here, 
          // for now let's show a simplified range around current page
          let p = page;
          if (page < 3) p = i + 1;
          else if (page > totalPages - 2) p = totalPages - 4 + i;
          else p = page - 2 + i;
          
          if (p < 1 || p > totalPages) return null;

          return (
            <Button
              key={p}
              variant={p === page ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange(p)}
              disabled={isLoading}
              className={cn(
                "w-9 h-9 rounded-md font-medium transition-all",
                p === page ? "bg-primary text-primary-foreground shadow" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {p}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages || isLoading}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages || isLoading}
        className="hidden sm:flex"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
