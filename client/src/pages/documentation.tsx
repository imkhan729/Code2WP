import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo-head";
import { Upload, FileText, Download, Settings, Eye, CheckCircle, ArrowRight, Code, Globe, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Complete WordPress Conversion Documentation - Setup & Deployment Guide | Code2WP"
        description="Comprehensive documentation for converting HTML to WordPress themes and deploying them successfully. Includes setup guides, troubleshooting, and best practices."
        keywords="WordPress documentation, theme conversion guide, WordPress installation, theme deployment, conversion troubleshooting, WordPress setup"
        canonicalUrl="https://your-domain.com/documentation"
      />
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Complete Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about converting HTML websites to WordPress themes and deploying them successfully.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Getting Started</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#quick-start" className="hover:text-primary">Quick Start Guide</a></li>
                  <li><a href="#upload-methods" className="hover:text-primary">Upload Methods</a></li>
                  <li><a href="#supported-formats" className="hover:text-primary">Supported Formats</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">WordPress Deployment</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#wordpress-installation" className="hover:text-primary">WordPress Installation</a></li>
                  <li><a href="#theme-upload" className="hover:text-primary">Theme Upload Process</a></li>
                  <li><a href="#troubleshooting" className="hover:text-primary">Troubleshooting</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <section id="quick-start" className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Quick Start Guide</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Your HTML Files</h3>
                    <p className="text-gray-600 mb-3">Organize your static HTML website files including HTML, CSS, JavaScript, and images into a single folder.</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm text-gray-800">
                        my-website/<br/>
                        ├── index.html<br/>
                        ├── about.html<br/>
                        ├── css/style.css<br/>
                        ├── js/script.js<br/>
                        └── images/
                      </code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Website</h3>
                    <p className="text-gray-600 mb-3">Choose one of two methods:</p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li className="flex items-center">
                        <Upload className="w-4 h-4 mr-2 text-primary" />
                        <strong>ZIP Upload:</strong> Compress your folder and upload the ZIP file
                      </li>
                      <li className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-primary" />
                        <strong>URL Input:</strong> Enter your website URL for automatic analysis
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Conversion Process</h3>
                    <p className="text-gray-600">Our AI automatically converts your HTML to WordPress theme files including header.php, footer.php, index.php, style.css, and functions.php.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Download & Install</h3>
                    <p className="text-gray-600">Download your converted WordPress theme and install it on your WordPress website.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upload Methods */}
          <section id="upload-methods" className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Upload Methods</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Folder className="w-5 h-5 mr-2 text-primary" />
                    ZIP File Upload
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Maximum file size: 50MB</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Supports nested folder structures</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Automatic asset discovery</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Multi-page website support</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-primary" />
                    URL Analysis
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Live website crawling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Automatic page discovery</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Blog post extraction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Asset downloading and optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* WordPress Installation Guide */}
          <section id="wordpress-installation" className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-8">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">WordPress Theme Installation</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 1: Download Your Theme</h3>
                  <p className="text-gray-600 mb-4">After conversion is complete, download the WordPress theme ZIP file from our platform.</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800"><strong>Note:</strong> The downloaded file contains all WordPress theme files including PHP templates, CSS styles, and JavaScript functionality.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 2: Access WordPress Admin</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600">Log in to your WordPress admin dashboard:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm text-gray-800">https://yourwebsite.com/wp-admin</code>
                    </div>
                    <p className="text-gray-600">Enter your WordPress username and password to access the dashboard.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 3: Navigate to Themes</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600">In your WordPress dashboard:</p>
                    <ol className="space-y-2 text-gray-600 ml-4">
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                        Click on <strong>"Appearance"</strong> in the left sidebar
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                        Select <strong>"Themes"</strong> from the submenu
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                        Click the <strong>"Add New"</strong> button at the top
                      </li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 4: Upload Theme</h3>
                  <div className="space-y-4">
                    <ol className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                        Click <strong>"Upload Theme"</strong> at the top of the page
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                        Click <strong>"Choose File"</strong> and select your downloaded theme ZIP file
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                        Click <strong>"Install Now"</strong> to upload and install the theme
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                        Once installed, click <strong>"Activate"</strong> to make it your active theme
                      </li>
                    </ol>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                      <p className="text-green-800"><strong>Success!</strong> Your converted HTML website is now running as a WordPress theme.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 5: Customize (Optional)</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600">After activation, you can customize your theme:</p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Go to <strong>Appearance → Customize</strong> for live customization
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Use <strong>Appearance → Menus</strong> to create navigation menus
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Add widgets in <strong>Appearance → Widgets</strong>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        Create pages and posts in <strong>Pages</strong> and <strong>Posts</strong> sections
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Troubleshooting</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Issues</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Theme Upload Failed</h4>
                      <p className="text-yellow-700 mb-2">If your theme upload fails, try:</p>
                      <ul className="list-disc list-inside text-yellow-700 space-y-1">
                        <li>Check that your ZIP file is not corrupted</li>
                        <li>Ensure file size is under your hosting limit</li>
                        <li>Contact your hosting provider for PHP upload limits</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Styling Issues</h4>
                      <p className="text-blue-700 mb-2">If your theme doesn't look right:</p>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Clear your browser cache and WordPress cache</li>
                        <li>Check if there are CSS conflicts with plugins</li>
                        <li>Verify all images and assets are loading correctly</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-red-400 bg-red-50 p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Theme Not Activating</h4>
                      <p className="text-red-700 mb-2">If your theme won't activate:</p>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        <li>Check WordPress error logs for PHP errors</li>
                        <li>Ensure all required theme files are present</li>
                        <li>Try deactivating other plugins temporarily</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Need More Help?</h3>
                  <p className="text-gray-600 mb-4">If you're still experiencing issues, here are additional resources:</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">WordPress Documentation</h4>
                      <p className="text-gray-600 text-sm">Visit the official WordPress documentation for detailed guides on theme installation and customization.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Community Support</h4>
                      <p className="text-gray-600 text-sm">Join WordPress forums and communities for help from experienced users and developers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Convert Your Website?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Follow our step-by-step guide and have your WordPress theme ready in minutes
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