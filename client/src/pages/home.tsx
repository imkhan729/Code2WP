import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import UrlInput from "@/components/UrlInput";
import EmbeddedPreview from "@/components/EmbeddedPreview";
import RecentConversions from "@/components/RecentConversions";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Upload, Globe } from "lucide-react";

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
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-medium border-2 border-white shadow-lg"
              onClick={() => setActiveTab("upload")}
              data-testid="get-started-button"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white border-2 text-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg font-medium transition-all duration-200 shadow-lg"
              onClick={() => setShowAdvancedView(true)}
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
        <div className="max-w-6xl mx-auto">
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
            className="flex items-center gap-2 mx-auto px-6 py-3 text-lg border-2 hover:bg-purple-50 hover:border-purple-300"
            data-testid="toggle-advanced-view"
          >
            {showAdvancedView ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showAdvancedView ? 'Hide Advanced View' : 'Show Advanced View & Live Preview'}
          </Button>
        </div>

        {/* Advanced View - Previous functionality */}
        {showAdvancedView && (
          <>
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
      </main>
      
      <Footer />
    </div>
  );
}