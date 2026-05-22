import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { LogoContainer } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <LogoContainer size="md" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">GitHub AI Nav</h1>
              <p className="text-xs text-gray-500">Top AI Open Source Projects</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <a href="/#/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Home</a>
            <a href="/#/about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">About</a>
            <a href="/#/privacy" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Privacy</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">404</h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-500 max-w-md mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/#/">
          <Button size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <LogoContainer size="sm" />
              <div>
                <h2 className="text-base font-semibold text-gray-900">GitHub AI Nav</h2>
                <p className="text-xs text-gray-500">Top AI Open Source Projects</p>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="/#/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/#/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="/#/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="https://github.com/gueson/ai-github-nav" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} GitHub AI Navigator. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
