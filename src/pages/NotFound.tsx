import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Github } from "lucide-react";
import { t } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LogoContainer } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="container max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <LogoContainer size="md" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">{t('app.title')}</h1>
              <p className="text-xs text-slate-500 font-medium">{t('app.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto">
            {/* Search bar placeholder */}
            <div className="h-10 bg-white border border-slate-200 rounded-lg" />
          </div>

          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <h1 className="text-5xl font-bold text-primary">{t('notFound.title')}</h1>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('notFound.message')}</h2>
        <p className="text-slate-500 max-w-md mb-8">
          {t('notFound.description')}
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <Github className="w-5 h-5" />
            {t('notFound.backHome')}
          </Button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-auto">
        <div className="container max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <LogoContainer size="sm" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">{t('footer.title')}</h2>
                <p className="text-xs text-slate-500">{t('footer.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="https://github.com/gueson/ai-github-nav" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
                {t('footer.source')}
              </a>
              <a href="https://github.com/gueson/ai-github-nav/issues" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
                {t('footer.issues')}
              </a>
              <a href="https://github.com/gueson/ai-github-nav/pulls" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">
                {t('footer.pullRequests')}
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            <p className="mt-1">{t('footer.license')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

