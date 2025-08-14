import { Button } from "@/components/ui/button";
import { Code, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/documentation", label: "Documentation" },
    { href: "/blog", label: "Blog" }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Code className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-gray-900">HTML to WordPress</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`font-medium transition-colors ${
                  location === item.href 
                    ? "text-primary" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="text-gray-600" /> : <Menu className="text-gray-600" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`font-medium transition-colors ${
                    location === item.href 
                      ? "text-primary" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
