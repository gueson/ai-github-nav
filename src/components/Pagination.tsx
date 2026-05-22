import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ page, totalItems, perPage, onPageChange, isLoading }: PaginationProps) {
  const totalPages = Math.min(Math.ceil(totalItems / perPage), 42);
  const maxVisible = 5;
  
  const getPages = () => {
    const pages: (number | 'dots')[] = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 'dots', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, 'dots', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'dots', page - 1, page, page + 1, 'dots', totalPages);
      }
    }
    
    return pages;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <span className="text-sm text-slate-500">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={page === 1 || isLoading}
          className="rounded-full w-8 h-8 p-0"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
          className="rounded-full w-8 h-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {getPages().map((p, i) => (
          p === 'dots' ? (
            <span key={i} className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
          ) : (
            <Button
              key={p}
              variant={p === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(p)}
              disabled={isLoading}
              className={`rounded-full w-8 h-8 p-0 ${p === page ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
            >
              {p}
            </Button>
          )
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isLoading}
          className="rounded-full w-8 h-8 p-0"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages || isLoading}
          className="rounded-full w-8 h-8 p-0"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
