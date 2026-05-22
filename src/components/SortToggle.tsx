import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SortToggleProps {
  order: "desc" | "asc";
  onChange: (order: "desc" | "asc") => void;
}

export function SortToggle({ order, onChange }: SortToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Sort:</span>
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        <Button
          variant={order === "desc" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange("desc")}
          className={`rounded-none border-r border-gray-200 ${order === "desc" ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        >
          <ArrowUpDown className="w-3 h-3 mr-1" />
          Stars
        </Button>
        <Button
          variant={order === "asc" ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange("asc")}
          className={`rounded-none ${order === "asc" ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        >
          Fewest
        </Button>
      </div>
    </div>
  );
}
