import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Settings, Eye, Download, ArrowRight, Clock, CheckCircle, Zap, Code, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Website",
      description: "Start by uploading your static HTML website files or providing a live website URL. Our system supports complex multi-page websites, nested folder structures, and automatic content discovery.",
      details: [
        "ZIP files up to 50MB supported",
        "Live URL analysis with deep crawling", 
        "Multi-page website auto-detection",
        "Nested blog post extraction",
        "Asset discovery across all directories",
        "Form and interactive element mapping"
      ],
      time: "< 30 seconds",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Settings,
      title: "AI-Powered Processing",
      description: "Our advanced neural network analyzes your website structure, extracts design patterns, and intelligently converts everything into WordPress-compatible code with proper template hierarchy.",
      details: [
        "Neural HTML structure analysis",
        "CSS optimization and WordPress integration",
        "JavaScript function preservation",
        "WordPress theme file generation",
        "Asset optimization and compression",
        "SEO metadata extraction and enhancement"
      ],
      time: "2-5 minutes",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Eye,
      title: "Live Preview & Testing",
      description: "Preview your converted WordPress theme with real-time rendering across multiple devices. Test navigation, forms, and interactive elements before deployment.",
      details: [
        "Responsive design testing (desktop, tablet, mobile)",
        "Real-time theme preview with WordPress styling",
        "Multi-page navigation verification",
        "Form functionality testing",
        "Asset loading and performance analysis",
        "Cross-browser compatibility checks"
      ],
      time: "Instant",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Download,
      title: "Download & Deploy",
      description: "Download your production-ready WordPress theme with complete installation guide. Deploy to any WordPress site with one-click installation and automatic setup.",
      details: [
        "Complete WordPress theme package",
        "Professional file structure and naming",
        "Detailed installation documentation",
        "WordPress best practices implementation",
        "SEO-optimized code output",
        "Plugin compatibility assurance"
      ],
      time: "Ready instantly",
      color: "from-orange-500 to-red-600"
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Smart Code Analysis",
      description: "AI analyzes 10,000+ code patterns per second to ensure perfect WordPress compatibility."
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works with any HTML website - from simple landing pages to complex multi-page applications."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Approach",
      description: "Preserves responsive design and mobile optimizations from your original website."
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
              Simple 4-Step Process
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How Our AI Converts <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">HTML to WordPress</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Transform any static HTML website into a professional WordPress theme in minutes. Our advanced AI system handles all technical complexities while preserving your original design and functionality.
            </p>
            
            {/* Process Overview Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt; 5min</div>
                <div className="text-sm text-gray-600 font-medium">Total Process Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-gray-600 font-medium">Design Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-gray-600 font-medium">Technical Knowledge Required</div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-20 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-full w-px h-20 bg-gradient-to-b from-gray-300 to-transparent transform -translate-x-0.5 z-0"></div>
                )}
                
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0 text-center relative z-10">
                    <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${step.color} text-white rounded-3xl mb-4 shadow-xl`}>
                      <step.icon className="w-10 h-10" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.time}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
                      <h3 className="text-3xl font-bold text-gray-900 mb-6">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details Grid */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start text-gray-600 group">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:text-green-600 transition-colors" />
                            <span className="group-hover:text-gray-700 transition-colors">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Our AI Conversion Works So Well</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Trusted by Professionals Worldwide</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-gray-600 font-medium mb-4">Websites Converted</div>
                <p className="text-sm text-gray-500">From simple landing pages to complex business websites</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-gray-600 font-medium mb-4">Happy Developers</div>
                <p className="text-sm text-gray-500">Agencies, freelancers, and businesses worldwide</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600 font-medium mb-4">Success Rate</div>
                <p className="text-sm text-gray-500">First-time conversions that work perfectly</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Convert Your Website?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of developers who've successfully transformed their HTML websites into professional WordPress themes
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                
                <Link href="/features">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-[#8378ff]"
                  >
                    Explore Features
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