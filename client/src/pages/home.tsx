import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import UrlInput from "@/components/UrlInput";
import ProcessingSteps from "@/components/ProcessingSteps";
import ProgressBar from "@/components/ProgressBar";

import RecentConversions from "@/components/RecentConversions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Link } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [currentConversion, setCurrentConversion] = useState<string | null>(null);

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

        {/* Conversion Workflow */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Step 1: Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
              <h3 className="text-lg font-semibold text-gray-900">Upload or Enter URL</h3>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <Button
                variant="ghost"
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-none ${
                  activeTab === "upload" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("upload")}
              >
                <Code className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
              <Button
                variant="ghost"
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-none ${
                  activeTab === "url" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("url")}
              >
                <Link className="w-4 h-4 mr-2" />
                Enter URL
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === "upload" ? (
              <FileUpload onConversionStart={setCurrentConversion} />
            ) : (
              <UrlInput onConversionStart={setCurrentConversion} />
            )}
          </div>

          {/* Step 2: Process */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
              <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
            </div>
            
            <ProcessingSteps conversionId={currentConversion} />
            <ProgressBar conversionId={currentConversion} />
          </div>

          {/* Step 3: Download */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
              <h3 className="text-lg font-semibold text-gray-900">Download Theme</h3>
            </div>
            
            <div className="text-center py-8">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Your WordPress theme will be ready for download once processing is complete.</p>
              <Button 
                disabled={!currentConversion} 
                variant={currentConversion ? "default" : "secondary"}
                className="w-full"
              >
                Download Theme
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Professional WordPress Conversion</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our advanced conversion engine analyzes your HTML, CSS, and JavaScript files to create 
            a fully functional WordPress theme that preserves your design and functionality.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Analysis</h4>
              <p className="text-sm text-gray-600">Detects pages, forms, navigation, and assets automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">WordPress Ready</h4>
              <p className="text-sm text-gray-600">Generates proper template hierarchy and functions.php</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Design Preserved</h4>
              <p className="text-sm text-gray-600">Maintains responsive design and interactive elements</p>
            </div>
          </div>
        </div>

        {/* Recent Conversions */}
        <RecentConversions />
      </main>

      <Footer />
    </div>
  );
}
