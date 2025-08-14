import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight, User, Tag, TrendingUp, Star, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Blog() {
  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to Converting HTML Websites to WordPress Themes in 2025",
    excerpt: "Master the complete process of transforming your static HTML websites into dynamic, SEO-optimized WordPress themes with our comprehensive AI-powered conversion system. Learn advanced techniques, best practices, and troubleshooting methods used by professional developers.",
    content: `
      <h2>Why Convert HTML to WordPress?</h2>
      <p>Converting your static HTML website to WordPress offers numerous advantages that can transform your online presence. WordPress powers over 40% of all websites globally, making it the most popular content management system worldwide.</p>
      
      <h3>Key Benefits of WordPress Conversion:</h3>
      <ul>
        <li><strong>Dynamic Content Management:</strong> Update content easily without touching code</li>
        <li><strong>SEO Optimization:</strong> Built-in SEO features and plugin compatibility</li>
        <li><strong>Scalability:</strong> Add unlimited pages, posts, and functionality</li>
        <li><strong>User Management:</strong> Multiple user roles and permissions</li>
        <li><strong>Plugin Ecosystem:</strong> Access to 60,000+ plugins for extended functionality</li>
      </ul>

      <h2>Step-by-Step Conversion Process</h2>
      
      <h3>1. Analyze Your HTML Structure</h3>
      <p>Before conversion, examine your HTML files to understand the layout structure, identify reusable components, and plan the WordPress template hierarchy.</p>
      
      <h3>2. Prepare Your Files</h3>
      <p>Organize your HTML, CSS, JavaScript, and media files in a logical folder structure. Our AI converter automatically handles this organization, but understanding the structure helps ensure better results.</p>
      
      <h3>3. Upload and Convert</h3>
      <p>Using our advanced conversion system, upload your ZIP file or provide your website URL. Our AI analyzes the structure and generates proper WordPress theme files including:</p>
      <ul>
        <li>header.php - Contains the HTML head and opening body tag</li>
        <li>footer.php - Contains closing body and HTML tags</li>
        <li>index.php - Main template file</li>
        <li>style.css - Theme stylesheet with WordPress header</li>
        <li>functions.php - Theme functionality and WordPress hooks</li>
      </ul>

      <h2>Advanced Optimization Techniques</h2>
      
      <h3>Performance Optimization</h3>
      <p>Our conversion process automatically optimizes your theme for performance:</p>
      <ul>
        <li>CSS and JavaScript minification</li>
        <li>Image optimization and compression</li>
        <li>Database query optimization</li>
        <li>Caching compatibility</li>
      </ul>

      <h3>SEO Best Practices</h3>
      <p>Converted themes include built-in SEO optimization:</p>
      <ul>
        <li>Semantic HTML structure</li>
        <li>Meta tag implementation</li>
        <li>Schema markup integration</li>
        <li>Open Graph tags for social sharing</li>
        <li>XML sitemap compatibility</li>
      </ul>

      <h2>Common Challenges and Solutions</h2>
      
      <h3>Responsive Design Issues</h3>
      <p>Modern websites must work across all devices. Our conversion process ensures your theme maintains responsiveness by:</p>
      <ul>
        <li>Preserving existing media queries</li>
        <li>Testing across multiple screen sizes</li>
        <li>Implementing WordPress-specific responsive features</li>
      </ul>

      <h3>JavaScript Functionality</h3>
      <p>Interactive elements require special handling in WordPress. We ensure JavaScript compatibility through:</p>
      <ul>
        <li>Proper script enqueuing in functions.php</li>
        <li>jQuery compatibility checks</li>
        <li>WordPress AJAX integration</li>
      </ul>

      <h2>Installation and Deployment</h2>
      
      <p>Once your theme is converted, installation is straightforward:</p>
      <ol>
        <li>Download the generated WordPress theme ZIP file</li>
        <li>Access your WordPress admin dashboard</li>
        <li>Navigate to Appearance → Themes → Add New</li>
        <li>Upload and activate your new theme</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Converting HTML to WordPress doesn't have to be complicated. With our AI-powered conversion system, you can transform any static website into a dynamic WordPress theme in minutes. The automated process handles technical complexities while ensuring your converted theme follows WordPress best practices for performance, SEO, and maintainability.</p>
      
      <p>Ready to convert your website? Start your free conversion today and join thousands of developers who have successfully transformed their HTML websites into professional WordPress themes.</p>
    `,
    date: "2025-08-14",
    readTime: "15 min read",
    category: "Complete Guide",
    author: "WordPress Expert",
    tags: ["HTML", "WordPress", "Conversion", "SEO", "Performance"],
    slug: "ultimate-html-to-wordpress-conversion-guide-2025",
    featured: true,
    views: "12.5K",
    image: "/api/placeholder/800/400"
  };

  const blogPosts = [
    {
      id: 2,
      title: "Advanced WordPress Theme Customization After HTML Conversion",
      excerpt: "Take your converted WordPress theme to the next level with advanced customization techniques, custom post types, and dynamic functionality that goes beyond basic conversion.",
      date: "2025-08-10",
      readTime: "12 min read",
      category: "Advanced",
      author: "Theme Developer",
      tags: ["Customization", "Advanced", "WordPress"],
      slug: "advanced-wordpress-theme-customization",
      views: "8.2K"
    },
    {
      id: 3,
      title: "WordPress Theme Performance Optimization: From Good to Great",
      excerpt: "Discover professional techniques to optimize your converted WordPress theme for lightning-fast loading speeds, improved user experience, and better search engine rankings.",
      date: "2025-08-07",
      readTime: "10 min read",
      category: "Performance",
      author: "Performance Specialist",
      tags: ["Performance", "Speed", "Optimization"],
      slug: "wordpress-theme-performance-optimization",
      views: "6.8K"
    },
    {
      id: 4,
      title: "SEO Mastery for Converted WordPress Themes",
      excerpt: "Master search engine optimization for your converted themes with advanced SEO techniques, structured data implementation, and ranking strategies that actually work.",
      date: "2025-08-05",
      readTime: "14 min read",
      category: "SEO",
      author: "SEO Specialist",
      tags: ["SEO", "Search", "Rankings", "Traffic"],
      slug: "seo-mastery-converted-wordpress-themes",
      views: "9.1K"
    },
    {
      id: 5,
      title: "Troubleshooting Complex HTML to WordPress Conversions",
      excerpt: "Solve the most challenging conversion problems with expert troubleshooting techniques for complex layouts, JavaScript integrations, and advanced functionality preservation.",
      date: "2025-08-02",
      readTime: "11 min read",
      category: "Troubleshooting",
      author: "Technical Lead",
      tags: ["Troubleshooting", "Problems", "Solutions"],
      slug: "troubleshooting-complex-html-wordpress-conversions",
      views: "5.4K"
    },
    {
      id: 6,
      title: "Mobile-First WordPress Theme Design: Best Practices 2025",
      excerpt: "Create stunning mobile-first WordPress themes that provide exceptional user experience across all devices with modern design principles and responsive techniques.",
      date: "2025-07-30",
      readTime: "9 min read",
      category: "Design",
      author: "UI/UX Designer", 
      tags: ["Mobile", "Responsive", "Design", "UX"],
      slug: "mobile-first-wordpress-theme-design-2025",
      views: "7.3K"
    }
  ];

  const categories = ["All", "Complete Guide", "Advanced", "Performance", "SEO", "Design", "Troubleshooting"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with SEO optimization */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 text-primary font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert WordPress Conversion Insights
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              WordPress Conversion <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Mastery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover professional techniques, advanced strategies, and expert insights for converting HTML websites to WordPress themes. Join thousands of developers mastering the art of theme conversion.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Readers Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Featured Article */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
            </div>
            
            <article className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-r from-purple-600 to-orange-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium mb-4">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {featuredPost.category}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {featuredPost.views} views
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 transition-opacity" data-testid="read-featured-article">
                    Read Complete Guide
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </article>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white border-0" : "hover:bg-gray-50"}
                data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Latest Articles Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Latest Articles</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-orange-500/10 group-hover:from-purple-600/20 group-hover:to-orange-500/20 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 font-medium text-sm">
                        {post.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {post.views} views
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm group">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Expert Resources Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Expert Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Start Guide</h3>
                <p className="text-gray-600 mb-6">Get started with HTML to WordPress conversion in under 10 minutes with our step-by-step guide.</p>
                <Link href="/documentation">
                  <Button variant="outline" className="w-full">View Guide</Button>
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Video Tutorials</h3>
                <p className="text-gray-600 mb-6">Watch professional developers convert complex websites step-by-step in our video series.</p>
                <Button variant="outline" className="w-full">Watch Videos</Button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Success Stories</h3>
                <p className="text-gray-600 mb-6">Read how developers and agencies have transformed their workflow with our conversion system.</p>
                <Button variant="outline" className="w-full">Read Stories</Button>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-white text-center mb-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Join 50,000+ Developers
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get weekly insights, advanced tutorials, and exclusive tips for mastering WordPress theme conversion delivered to your inbox.
              </p>
              
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 border-0 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/20 text-gray-900"
                  data-testid="newsletter-email-input"
                />
                <Button 
                  size="lg"
                  className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-xl"
                  data-testid="newsletter-subscribe-button"
                >
                  Subscribe Free
                </Button>
              </div>
              
              <p className="text-sm opacity-75 mt-4">
                Join developers from Google, Facebook, Microsoft and more. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Convert Your Website?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform your HTML website into a professional WordPress theme with our AI-powered conversion system. Start your free conversion now.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 px-8 py-4 text-lg font-semibold"
                    data-testid="start-converting-button"
                  >
                    Start Converting Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <Link href="/documentation">
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="px-8 py-4 text-lg font-semibold"
                    data-testid="view-documentation-button"
                  >
                    View Documentation
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