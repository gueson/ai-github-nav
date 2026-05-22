import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Github, Star, Code, Users, Zap, Shield, Globe, Heart, Search as SearchIcon } from "lucide-react";
import { LogoContainer } from "@/components/Logo";

export default function About() {
  const features = [
    {
      icon: <Star className="w-6 h-6 text-amber-500" />,
      title: "Curated Selection",
      description: "Hand-picked AI projects with high-quality code and active development."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Real-time Updates",
      description: "Regularly updated with the latest trending AI repositories on GitHub."
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Community Driven",
      description: "Built for developers, by developers. Community contributions welcome."
    },
    {
      icon: <Code className="w-6 h-6 text-purple-500" />,
      title: "Open Source",
      description: "Free and open source. Fork it, contribute, or use it as you like."
    },
    {
      icon: <Globe className="w-6 h-6 text-orange-500" />,
      title: "Global Reach",
      description: "Available worldwide with support for multiple languages."
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Privacy First",
      description: "No tracking, no analytics, just pure open source goodness."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 cursor-pointer">
            <LogoContainer size="md" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">GitHub AI Nav</h1>
              <p className="text-xs text-gray-500">Top AI Open Source Projects</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Home</Link>
            <Link href="/about" className="text-blue-600 text-sm font-medium font-semibold">About</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <LogoContainer size="lg" className="mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About GitHub AI Navigator</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Your ultimate guide to discovering the best AI open source projects on GitHub. 
            We curate and organize the most popular and innovative AI repositories to help 
            developers build amazing things.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Why Choose GitHub AI Navigator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">1000+</div>
              <div className="text-gray-400 text-sm mt-1">AI Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">50M+</div>
              <div className="text-gray-400 text-sm mt-1">Total Stars</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">10K+</div>
              <div className="text-gray-400 text-sm mt-1">Contributors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400">50K+</div>
              <div className="text-gray-400 text-sm mt-1">Monthly Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Search</h3>
              <p className="text-gray-600 text-sm">Enter keywords to find AI projects that match your interests.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover</h3>
              <p className="text-gray-600 text-sm">Browse curated results with detailed information about each project.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contribute</h3>
              <p className="text-gray-600 text-sm">Click through to GitHub and start contributing to amazing projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="text-blue-100 mb-8">
            Join thousands of developers who use GitHub AI Navigator to discover amazing AI projects every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <SearchIcon className="w-5 h-5 mr-2" />
                Start Exploring
              </Button>
            </Link>
            <a 
              href="https://github.com/gueson/ai-github-nav" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <LogoContainer size="sm" />
              <div>
                <h2 className="text-base font-semibold text-gray-900">GitHub AI Nav</h2>
                <p className="text-xs text-gray-500">Top AI Open Source Projects</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
              <a href="https://github.com/gueson/ai-github-nav" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">GitHub</a>
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for the AI community
            </p>
            <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} GitHub AI Navigator. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
