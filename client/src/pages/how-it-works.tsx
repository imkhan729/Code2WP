import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Settings, Eye, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Website",
      description: "Upload a ZIP file containing your HTML, CSS, and JavaScript files, or provide a website URL for automatic analysis.",
      details: [
        "Support for ZIP files up to 50MB",
        "Automatic URL crawling and analysis", 
        "Multi-page website detection",
        "Asset discovery and extraction"
      ]
    },
    {
      icon: Settings,
      title: "AI-Powered Conversion",
      description: "Our advanced AI analyzes your website structure and automatically converts it into a professional WordPress theme.",
      details: [
        "Smart HTML structure parsing",
        "CSS optimization and cleanup",
        "JavaScript functionality preservation",
        "WordPress-specific code generation"
      ]
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "Preview your converted WordPress theme with responsive design testing across different devices and screen sizes.",
      details: [
        "Desktop, tablet, and mobile previews",
        "Real-time theme rendering",
        "Multi-page navigation testing",
        "Asset loading verification"
      ]
    },
    {
      icon: Download,
      title: "Download & Deploy",
      description: "Download your complete WordPress theme package and install it on any WordPress website in minutes.",
      details: [
        "Complete theme file structure",
        "Installation instructions included",
        "WordPress best practices followed",
        "SEO-optimized output"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convert your static HTML website to a WordPress theme in 4 simple steps. Our AI-powered system handles all the technical complexity for you.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-12">
                {/* Step Number and Icon */}
                <div className="flex-shrink-0 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-2xl mb-4">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Details List */}
                    <div className="grid md:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block flex-shrink-0">
                    <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Convert Your Website?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start converting your HTML website to WordPress theme in minutes
              </p>
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  data-testid="start-converting-button"
                >
                  Start Converting Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}