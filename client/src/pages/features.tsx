import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Code, Download, Zap, Shield, Globe, Smartphone, Search, FileCode, Users, Palette, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Smart HTML Parsing",
      description: "AI-powered analysis of HTML structure, CSS styles, and JavaScript functionality to create clean, maintainable WordPress themes with proper template hierarchy."
    },
    {
      icon: Zap,
      title: "Lightning-Fast Conversion",
      description: "Convert complex websites to WordPress themes in under 5 minutes. Our advanced AI system processes thousands of lines of code instantly."
    },
    {
      icon: Globe,
      title: "Multi-Page & Nested Support",
      description: "Handles complex websites with multiple pages, nested blog structures, dynamic content discovery, and automatic page relationship detection."
    },
    {
      icon: Download,
      title: "Production-Ready Themes",
      description: "Download complete WordPress themes with proper file structure, header.php, footer.php, index.php, functions.php, and WordPress coding standards."
    },
    {
      icon: Shield,
      title: "Advanced Asset Optimization",
      description: "Intelligent optimization of images, CSS, and JavaScript files for WordPress compatibility, performance, and loading speed."
    },
    {
      icon: Smartphone,
      title: "Responsive Design Preservation",
      description: "Maintains all responsive breakpoints, mobile optimizations, and device-specific styling from your original design."
    },
    {
      icon: Search,
      title: "SEO-Optimized Output",
      description: "Generated themes include proper meta tags, semantic HTML structure, schema markup, and WordPress SEO plugin compatibility."
    },
    {
      icon: FileCode,
      title: "Clean Code Generation",
      description: "Produces clean, commented PHP code following WordPress best practices with proper hooks, filters, and template functions."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share converted themes with your team, track conversion history, and manage multiple projects with workspace organization."
    }
  ];

  const advancedFeatures = [
    {
      icon: Palette,
      title: "Custom Post Types",
      description: "Automatically generates custom post types and fields based on your content structure and design patterns."
    },
    {
      icon: Settings,
      title: "Plugin Integration",
      description: "Built-in compatibility with popular WordPress plugins like WooCommerce, Yoast SEO, and Contact Form 7."
    },
    {
      icon: Globe,
      title: "Multilingual Ready",
      description: "Generated themes are compatible with WPML, Polylang, and other translation plugins for global websites."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-primary font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered WordPress Conversion
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Features for <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Perfect Conversions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Transform any static HTML website into a professional WordPress theme with cutting-edge AI technology, advanced optimization, and enterprise-grade features that maintain your original design while adding powerful CMS capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 px-8 py-4 text-lg font-semibold"
                >
                  Try Free Conversion
                </Button>
              </Link>
              <Link href="/documentation">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold hover:bg-white"
                >
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>

          {/* Core Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Advanced Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-4 rounded-xl">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Technical Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with enterprise-grade technology and industry best practices for professional WordPress theme development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Conversion Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt; 5min</div>
                <div className="text-gray-600 font-medium">Average Processing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600 font-medium">Layout Types Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50MB</div>
                <div className="text-gray-600 font-medium">Maximum File Size</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Technology Stack</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Neural HTML Parser:</strong> Advanced machine learning model trained on 100,000+ websites</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>CSS Analysis Engine:</strong> Intelligent style extraction and optimization algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>JavaScript Preservation:</strong> Function mapping and WordPress integration system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Asset Intelligence:</strong> Smart image optimization and resource management</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">WordPress Integration</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Template Hierarchy:</strong> Proper WordPress file structure and naming conventions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Hook System:</strong> WordPress actions, filters, and proper enqueuing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Security Standards:</strong> Sanitization, validation, and WordPress security practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Performance Optimization:</strong> Minification, caching, and database efficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of developers and agencies who trust our AI-powered conversion system for their WordPress projects
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    Start Free Conversion
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}