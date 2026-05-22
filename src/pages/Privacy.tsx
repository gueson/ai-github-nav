import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, Eye, Database, FileCheck } from "lucide-react";
import { LogoContainer } from "@/components/Logo";

export default function Privacy() {
  const sections = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "No Data Collection",
      content: "GitHub AI Navigator does not collect any personal data from its users. We do not track your browsing activity, search history, or any other information that could identify you."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "No Analytics",
      content: "We do not use Google Analytics, Matomo, or any other analytics tools. Your visit to our site is completely anonymous and private."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "No Cookies",
      content: "We do not use cookies to track users or store personal information. Our site works perfectly without any cookies."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Open Source",
      content: "All of our code is open source and available on GitHub. You can verify for yourself that we're not collecting any data."
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
            <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">About</Link>
            <Link href="/privacy" className="text-blue-600 text-sm font-medium font-semibold">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">
            Your privacy is important to us. Here's how we protect it.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                GitHub AI Navigator is committed to protecting your privacy. We believe that 
                using software should not require sacrificing your personal data. That's why 
                we've designed this site with privacy as a core principle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 mb-4 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                While we don't collect any data, our site does link to external services:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-semibold">GitHub:</span>
                  <span>When you click on a project link, you'll be redirected to GitHub. 
                    Please review GitHub's privacy policy for information about their data practices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-semibold">Google Fonts:</span>
                  <span>We use Google Fonts for typography. Google may collect usage data 
                    as described in their privacy policy.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted 
                on this page. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this privacy policy, please open an issue 
                on our <a href="https://github.com/gueson/ai-github-nav" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub repository</a>.
              </p>
            </div>
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
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} GitHub AI Navigator. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
