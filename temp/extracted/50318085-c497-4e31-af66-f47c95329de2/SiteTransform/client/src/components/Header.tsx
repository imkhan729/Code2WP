import { Button } from "@/components/ui/button";
import { Code, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-gray-900">HTML to WordPress</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Documentation</a>
            <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign In
            </Button>
          </nav>
          <Button variant="ghost" className="md:hidden">
            <Menu className="text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}
