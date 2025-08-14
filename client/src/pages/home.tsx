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

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Convert HTML to WordPress</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your static HTML, CSS, and JavaScript websites into fully functional WordPress themes. 
            Preserve design, responsiveness, and functionality.
          </p>
        </div>

        {/* Main Conversion Process - Default View */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Step 1: Upload or Enter URL */}
            <div className="bg-white rounded-lg shadow-md p-6 relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Upload or Enter URL</h3>
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
            <div className={`bg-white rounded-lg shadow-md p-6 relative transition-opacity ${!hasActiveConversion ? 'opacity-50' : ''}`}>
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3 ${
                  hasActiveConversion ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
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
            <div className={`bg-white rounded-lg shadow-md p-6 relative transition-opacity ${!recentCompleted ? 'opacity-50' : ''}`}>
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3 ${
                  recentCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Download Theme</h3>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-4">
                  ⬅️➡️
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your WordPress theme will be ready for download once processing is complete.
                </p>
                
                {recentCompleted ? (
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    data-testid="download-theme"
                  >
                    Download Theme
                  </Button>
                ) : (
                  <Button 
                    disabled 
                    className="w-full"
                    data-testid="download-theme-disabled"
                  >
                    Download Theme
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced View Toggle */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedView(!showAdvancedView)}
            className="flex items-center gap-2 mx-auto"
            data-testid="toggle-advanced-view"
          >
            {showAdvancedView ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAdvancedView ? 'Hide Advanced View' : 'Show Advanced View'}
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