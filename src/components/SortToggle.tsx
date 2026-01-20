import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

interface SortToggleProps {
  order: "desc" | "asc";
  onChange: (order: "desc" | "asc") => void;
}

export function SortToggle({ order, onChange }: SortToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange("desc")}
        className={cn(
          "h-8 px-4 rounded-md text-sm font-medium transition-all",
          order === "desc" 
            ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" 
            : "text-slate-600 hover:bg-white hover:text-slate-900"
        )}
      >
        <ArrowDown className="w-3.5 h-3.5 mr-2" />
        {t('sort.desc')}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange("asc")}
        className={cn(
          "h-8 px-4 rounded-md text-sm font-medium transition-all",
          order === "asc" 
            ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" 
            : "text-slate-600 hover:bg-white hover:text-slate-900"
        )}
      >
        <ArrowUp className="w-3.5 h-3.5 mr-2" />
        {t('sort.asc')}
      </Button>
    </div>
  );
}
