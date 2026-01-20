import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import type { Language } from "@/lib/i18n";
import { getCurrentLanguage, setCurrentLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface LanguageToggleProps {
  onLanguageChange?: () => void;
}

export function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const currentLang = getCurrentLanguage();

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange();
    }
    // 重新加载页面以应用新语言
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("zh")}
          className={`cursor-pointer ${currentLang === "zh" ? "bg-primary/10 text-primary" : ""}`}
        >
          {t('language.zh')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`cursor-pointer ${currentLang === "en" ? "bg-primary/10 text-primary" : ""}`}
        >
          {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
