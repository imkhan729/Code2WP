import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Code, Download, Zap, Shield, Globe } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Smart HTML Parsing",
      description: "Automatically analyzes your HTML structure, CSS styles, and JavaScript functionality to create clean WordPress themes."
    },
    {
      icon: Zap,
      title: "Instant Conversion",
      description: "Convert your static websites to WordPress themes in minutes, not hours. Our AI-powered system handles the complex work."
    },
    {
      icon: Globe,
      title: "Multi-Page Support",
      description: "Supports complex websites with multiple pages, nested blog structures, and dynamic content discovery."
    },
    {
      icon: Download,
      title: "Ready-to-Use Themes",
      description: "Download fully functional WordPress themes with proper header.php, footer.php, index.php, and functions.php files."
    },
    {
      icon: Shield,
      title: "Asset Optimization",
      description: "Automatically optimizes images, CSS, and JavaScript files for WordPress compatibility and performance."
    },
    {
      icon: CheckCircle,
      title: "Live Preview",
      description: "Preview your converted theme before download with responsive design testing across devices."
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
              Powerful Features for Perfect Conversions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced conversion engine transforms any static HTML website into a fully functional WordPress theme with professional-grade features and optimization.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Features Section */}
          <div className="mt-20 bg-white rounded-2xl p-12 shadow-sm border border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our AI Converter?
              </h2>
              <p className="text-lg text-gray-600">
                Built with advanced technology to ensure perfect WordPress theme generation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Technology</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    AI-powered HTML structure analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Automatic CSS optimization and cleanup
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    JavaScript functionality preservation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Responsive design maintenance
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">WordPress Ready</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    PHP template file generation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    WordPress hooks and functions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Custom post type support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    SEO-friendly structure
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