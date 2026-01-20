import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full max-w-xl mx-auto group transition-transform duration-300 ease-out focus-within:scale-[1.02]">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('search.placeholder')}
        className="pl-12 pr-12 h-12 rounded-full border-none bg-white shadow-sm border border-slate-200 
          focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-white 
          hover:ring-1 hover:ring-primary/10 transition-all text-base"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full"
          onClick={() => setValue("")}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
