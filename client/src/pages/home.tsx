import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import UrlInput from "@/components/UrlInput";
import EmbeddedPreview from "@/components/EmbeddedPreview";
import RecentConversions from "@/components/RecentConversions";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Upload, Globe, CheckCircle, Code, Download, Zap, Shield, Smartphone, Search, FileCode, Users, Palette, Settings } from "lucide-react";

interface Conversion {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  previewData?: any;
  createdAt: string;
  completedAt?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [currentConversion, setCurrentConversion] = useState<string | null>(null);
  const [showAdvancedView, setShowAdvancedView] = useState(false);
  
  const { data: conversions = [] } = useQuery<Conversion[]>({
    queryKey: ['/api/conversions'],
    refetchInterval: 5000,
  });

  // Find the most recent completed conversion for auto-preview
  const recentCompleted = conversions.find(c => c.status === 'completed' && c.previewData);
  const hasActiveConversion = conversions.some(c => c.status === 'processing');

  // Download theme function
  const downloadTheme = async (conversionId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/conversions/${conversionId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}-wordpress-theme.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Download failed:', response.statusText);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-orange-500">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            The AI HTML to WordPress Converter
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Built to make you extraordinarily productive. Our converter is the best way to transform HTML to WordPress themes with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-purple-100 hover:text-purple-700 active:bg-purple-200 active:text-purple-800 px-8 py-3 text-lg font-medium border-2 border-white shadow-lg transition-all duration-200"
              onClick={() => {
                setActiveTab("upload");
                document.getElementById('upload-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start' 
                });
              }}
              data-testid="get-started-button"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white border-2 text-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg font-medium transition-all duration-200 shadow-lg"
              onClick={() => {
                setShowAdvancedView(true);
                // Scroll to examples section if it exists
                setTimeout(() => {
                  document.getElementById('examples-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                  });
                }, 100);
              }}
              data-testid="view-examples-button"
            >
              View Examples
            </Button>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your static websites into dynamic WordPress themes in three simple steps
          </p>
        </div>

        {/* Main Conversion Process - Default View */}
        <div className="max-w-6xl mx-auto" id="upload-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Step 1: Upload or Enter URL */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 relative hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Upload or Enter URL</h3>
              </div>
              
              <div className="space-y-4">
                {/* Tab Selection */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === "upload"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    data-testid="tab-upload"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Files
                  </button>
                  <button
                    onClick={() => setActiveTab("url")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === "url"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    data-testid="tab-url"
                  >
                    <Globe className="w-4 h-4" />
                    Enter URL
                  </button>
                </div>

                {/* Content */}
                {activeTab === "upload" && (
                  <div className="mt-4">
                    <FileUpload onConversionStart={setCurrentConversion} />
                    <p className="text-sm text-gray-500 mt-2">
                      Supports ZIP files up to 50MB
                    </p>
                  </div>
                )}

                {activeTab === "url" && (
                  <div className="mt-4">
                    <UrlInput onConversionStart={setCurrentConversion} />
                    <p className="text-sm text-gray-500 mt-2">
                      Enter any website URL to analyze
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Processing */}
            <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 relative transition-all duration-300 hover:shadow-xl ${!hasActiveConversion ? 'opacity-60' : ''}`}>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                  hasActiveConversion ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Processing</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className={`w-4 h-4 rounded-full mr-3 ${hasActiveConversion ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Files extracted successfully
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className={`w-4 h-4 rounded-full mr-3 ${hasActiveConversion ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  Parsing HTML structure...
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 rounded-full mr-3 bg-gray-300"></div>
                  Converting to WordPress theme
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 rounded-full mr-3 bg-gray-300"></div>
                  Optimizing assets
                </div>
                
                {hasActiveConversion && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">Waiting...</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '45%'}}></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">0%</div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Download Theme */}
            <div className={`bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8 relative transition-all duration-300 hover:shadow-xl ${!recentCompleted ? 'opacity-60' : ''}`}>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                  recentCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Download Theme</h3>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <div className="text-3xl">📦</div>
                </div>
                <p className="text-gray-600 mb-6">
                  Your WordPress theme will be ready for download once processing is complete.
                </p>
                
                {recentCompleted ? (
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 text-lg font-medium"
                    onClick={() => downloadTheme(recentCompleted.id, recentCompleted.name)}
                    data-testid="download-theme"
                  >
                    Download Theme
                  </Button>
                ) : (
                  <Button 
                    disabled 
                    className="w-full py-3 text-lg font-medium"
                    data-testid="download-theme-disabled"
                  >
                    Download Theme
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our AI Converter?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge AI technology to deliver professional WordPress themes that maintain your original design
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Analysis</h4>
              <p className="text-gray-600">AI-powered detection of pages, forms, navigation, and assets with 99% accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">WordPress Ready</h4>
              <p className="text-gray-600">Generates proper template hierarchy, functions.php, and WordPress standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Design Preserved</h4>
              <p className="text-gray-600">Maintains responsive design, animations, and all interactive elements</p>
            </div>
          </div>
        </div>

        {/* Advanced View Toggle */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedView(!showAdvancedView)}
            className="flex items-center gap-2 mx-auto px-6 py-3 text-lg border-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
            data-testid="toggle-advanced-view"
          >
            {showAdvancedView ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showAdvancedView ? 'Hide Advanced View' : 'Show Advanced View & Live Preview'}
          </Button>
        </div>

        {/* Advanced View - Previous functionality */}
        {showAdvancedView && (
          <>
            {/* Examples Section */}
            <div className="mb-12" id="examples-section">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Conversion Examples</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <h4 className="text-lg font-bold mb-2">Business Website</h4>
                        <p className="text-sm opacity-90">Corporate landing page</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">Multi-page business site with contact forms and services</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">5 Pages</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Forms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <h4 className="text-lg font-bold mb-2">Blog Template</h4>
                        <p className="text-sm opacity-90">Content-rich design</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">Blog layout with sidebar, categories, and post navigation</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Blog</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Sidebar</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <h4 className="text-lg font-bold mb-2">E-commerce</h4>
                        <p className="text-sm opacity-90">Product showcase</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">Product catalog with shopping cart and checkout flow</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Shop</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Cart</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Section */}
            {recentCompleted && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">Live Preview</h3>
                </div>
                <EmbeddedPreview 
                  conversionId={recentCompleted.id}
                  title={recentCompleted.name}
                />
              </div>
            )}

            {/* Recent Conversions */}
            <RecentConversions />
          </>
        )}

        {/* Features Section */}
        <div className="py-16" id="features-section">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-primary font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered WordPress Conversion
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Features for <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Perfect Conversions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Transform any static HTML website into a professional WordPress theme with cutting-edge AI technology, advanced optimization, and enterprise-grade features that maintain your original design while adding powerful CMS capabilities.
            </p>
          </div>

          {/* Core Features Grid */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Smart HTML Parsing
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered analysis of HTML structure, CSS styles, and JavaScript functionality to create clean, maintainable WordPress themes with proper template hierarchy.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Lightning-Fast Conversion
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Convert complex websites to WordPress themes in under 5 minutes. Our advanced AI system processes thousands of lines of code instantly.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Multi-Page & Nested Support
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Handles complex websites with multiple pages, nested blog structures, dynamic content discovery, and automatic page relationship detection.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Download className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Production-Ready Themes
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Download complete WordPress themes with proper file structure, header.php, footer.php, index.php, functions.php, and WordPress coding standards.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Advanced Asset Optimization
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Intelligent optimization of images, CSS, and JavaScript files for WordPress compatibility, performance, and loading speed.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Responsive Design Preservation
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Maintains all responsive breakpoints, mobile optimizations, and device-specific styling from your original design.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  SEO-Optimized Output
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Generated themes include proper meta tags, semantic HTML structure, schema markup, and WordPress SEO plugin compatibility.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <FileCode className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Clean Code Generation
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Produces clean, commented PHP code following WordPress best practices with proper hooks, filters, and template functions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  Team Collaboration
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Share converted themes with your team, track conversion history, and manage multiple projects with workspace organization.
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Advanced Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-4 rounded-xl">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Custom Post Types
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Automatically generates custom post types and fields based on your content structure and design patterns.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-4 rounded-xl">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Plugin Integration
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Built-in compatibility with popular WordPress plugins like WooCommerce, Yoast SEO, and Contact Form 7.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-4 rounded-xl">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Multilingual Ready
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Generated themes are compatible with WPML, Polylang, and other translation plugins for global websites.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Technical Excellence
              </h3>
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
                <h4 className="text-2xl font-bold text-gray-900 mb-6">AI Technology Stack</h4>
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
                <h4 className="text-2xl font-bold text-gray-900 mb-6">WordPress Integration</h4>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}