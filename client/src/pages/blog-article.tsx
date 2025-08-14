import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Calendar, User, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const articles = {
  "ultimate-guide-html-to-wordpress-2025": {
    title: "The Ultimate Guide to Converting HTML Websites to WordPress Themes in 2025",
    description: "Master the complete process of transforming your static HTML websites into dynamic, SEO-optimized WordPress themes with comprehensive techniques and best practices.",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "15 min read",
    category: "Complete Guide",
    tags: ["WordPress", "HTML", "Conversion", "Tutorial", "SEO"]
  },
  "wordpress-theme-development-trends-2025": {
    title: "WordPress Theme Development Trends and Best Practices for 2025",
    description: "Discover the latest trends in WordPress theme development, from AI-powered tools to modern design patterns that will dominate 2025.",
    author: "Marcus Rodriguez",
    date: "January 10, 2025",
    readTime: "8 min read",
    category: "Trends",
    tags: ["WordPress", "Trends", "Development", "Design", "2025"]
  },
  "ai-vs-manual-wordpress-conversion": {
    title: "AI vs Manual WordPress Conversion: Which Method is Right for Your Project?",
    description: "Compare AI-powered conversion tools with traditional manual methods to determine the best approach for your WordPress development project.",
    author: "Elena Kowalski",
    date: "January 8, 2025",
    readTime: "10 min read",
    category: "Comparison",
    tags: ["AI", "Manual", "Conversion", "Comparison", "WordPress"]
  }
};

export default function BlogArticle() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  
  if (!slug || !articles[slug as keyof typeof articles]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const article = articles[slug as keyof typeof articles];

  const getArticleContent = (slug: string) => {
    switch (slug) {
      case "ultimate-guide-html-to-wordpress-2025":
        return `
          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Convert HTML to WordPress?</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">WordPress powers over 40% of all websites on the internet, making it the most popular content management system worldwide. Converting your static HTML site to WordPress offers numerous compelling benefits that can transform your online presence.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Dynamic Content Management</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Easy content updates without coding knowledge</li>
            <li>User-friendly admin interface</li>
            <li>Multiple user roles and permissions</li>
            <li>Built-in SEO features and optimization tools</li>
          </ul>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Scalability and Flexibility</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Access to 60,000+ plugins for extended functionality</li>
            <li>Responsive design capabilities</li>
            <li>E-commerce integration with WooCommerce</li>
            <li>Multi-language support</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">AI-Powered vs Manual Conversion</h2>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Traditional Manual Conversion</h3>
          <p class="text-gray-700 mb-4 leading-relaxed">The traditional approach involves manually breaking down HTML files and converting them to PHP templates. This process typically requires:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Time Investment:</strong> 8-20 hours for a simple site</li>
            <li><strong>Skill Level:</strong> Advanced PHP and WordPress knowledge</li>
            <li><strong>Process:</strong> Manual template creation, function integration, and debugging</li>
          </ul>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">AI-Powered Conversion with Code2WP</h3>
          <p class="text-gray-700 mb-4 leading-relaxed">Modern AI-powered tools have revolutionized this process, offering:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Time Investment:</strong> 5-15 minutes total</li>
            <li><strong>Skill Level:</strong> Beginner to intermediate</li>
            <li><strong>Process:</strong> Automated analysis, generation, and optimization</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Step-by-Step Conversion Process</h2>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Method 1: Using Code2WP (Recommended)</h3>
          
          <h4 class="text-lg font-semibold text-gray-900 mt-6 mb-2">Step 1: Prepare Your HTML Website</h4>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Organize files in a clear folder structure</li>
            <li>Validate HTML and CSS for compatibility</li>
            <li>Ensure all resources are properly referenced</li>
            <li>Create a ZIP file of your complete website</li>
          </ul>

          <h4 class="text-lg font-semibold text-gray-900 mt-6 mb-2">Step 2: Upload to Code2WP</h4>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Visit the Code2WP converter</li>
            <li>Choose the "Upload Files" tab</li>
            <li>Drag and drop your ZIP file</li>
            <li>Click "Start Conversion"</li>
          </ul>

          <h4 class="text-lg font-semibold text-gray-900 mt-6 mb-2">Step 3: AI Processing</h4>
          <p class="text-gray-700 mb-4 leading-relaxed">The AI engine automatically:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Parses your HTML structure and identifies components</li>
            <li>Extracts CSS styling and JavaScript functionality</li>
            <li>Generates WordPress-compatible PHP templates</li>
            <li>Optimizes for mobile responsiveness and performance</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">SEO Optimization During Conversion</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">Modern conversion tools automatically implement SEO best practices:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Semantic HTML structure for better search engine understanding</li>
            <li>Meta tag implementation for social sharing</li>
            <li>Schema markup integration</li>
            <li>Performance optimization for faster loading times</li>
            <li>Mobile-first responsive design</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Best Practices for 2025</h2>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Modern Development Standards</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Use semantic HTML5 elements for better accessibility</li>
            <li>Implement CSS Grid and Flexbox for modern layouts</li>
            <li>Follow WordPress coding standards</li>
            <li>Prioritize performance and user experience</li>
          </ul>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Security and Accessibility</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Implement proper input sanitization</li>
            <li>Follow WCAG accessibility guidelines</li>
            <li>Ensure keyboard navigation support</li>
            <li>Regular security updates and maintenance</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">Converting HTML websites to WordPress themes in 2025 offers multiple approaches, from traditional manual conversion to modern AI-powered solutions. While manual conversion provides complete control, AI-powered tools like Code2WP offer unmatched speed and efficiency for most projects.</p>
          
          <p class="text-gray-700 mb-8 leading-relaxed">The future of web development lies in leveraging both traditional skills and modern AI tools to create exceptional WordPress websites that serve users effectively and efficiently. Choose the method that best fits your timeline, skill level, and project requirements.</p>
        `;
      
      case "wordpress-theme-development-trends-2025":
        return `
          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">AI-Powered Development Revolution</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">The WordPress ecosystem is experiencing a transformation driven by artificial intelligence. AI-powered development tools are changing how we approach theme creation, offering unprecedented speed and consistency.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Key AI Innovations</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Automated code generation from design files</li>
            <li>Smart asset optimization and compression</li>
            <li>Intelligent layout detection and conversion</li>
            <li>Built-in SEO optimization and schema markup</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Full Site Editing Maturity</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">WordPress's Full Site Editing (FSE) has reached maturity, making block-based themes the new standard for modern WordPress development.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">FSE Features</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Template parts for reusable components</li>
            <li>Global styles for consistent design</li>
            <li>Pattern libraries for common layouts</li>
            <li>Visual editing without code knowledge</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Performance-First Development</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">Google's Core Web Vitals have become crucial ranking factors, making performance optimization a priority in theme development.</p>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Optimization Techniques</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Critical CSS inlining for faster loading</li>
            <li>Progressive image loading with WebP/AVIF formats</li>
            <li>Code splitting for JavaScript optimization</li>
            <li>Service workers for intelligent caching</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Accessibility-First Design</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">Accessibility is no longer optional but a legal and ethical requirement. Modern themes must comply with WCAG 2.2 standards from the ground up.</p>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Mobile-First and PWA Features</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">With mobile traffic exceeding desktop, themes must prioritize mobile experience and incorporate Progressive Web App features for app-like functionality.</p>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>
          <p class="text-gray-700 mb-8 leading-relaxed">The WordPress theme development landscape in 2025 is characterized by AI integration, performance optimization, and accessibility focus. Developers who embrace these trends while maintaining code quality will create themes that meet both current standards and future needs.</p>
        `;

      case "ai-vs-manual-wordpress-conversion":
        return `
          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Understanding Both Approaches</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">The landscape of WordPress theme development has been transformed by AI-powered conversion tools, but traditional manual methods still have their place. Understanding when to use each approach is crucial for project success.</p>
          
          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Detailed Comparison</h2>
          
          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Time Investment</h3>
          <p class="font-bold text-gray-900 mt-6 mb-3">Manual Conversion:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Simple site: 15-25 hours</li>
            <li>Medium complexity: 30-50 hours</li>
            <li>Complex site: 60+ hours</li>
            <li>Additional testing and debugging time</li>
          </ul>

          <p class="font-bold text-gray-900 mt-6 mb-3">AI Conversion:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Any complexity: 5-15 minutes</li>
            <li>Immediate preview available</li>
            <li>Ready for installation instantly</li>
            <li>Minimal setup time required</li>
          </ul>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">Cost Analysis</h3>
          <p class="font-bold text-gray-900 mt-6 mb-3">Manual Conversion Costs:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Developer time: $50-150/hour</li>
            <li>Development tools and software</li>
            <li>Testing environment setup</li>
            <li>Total: $750-7,500+ per project</li>
          </ul>

          <p class="font-bold text-gray-900 mt-6 mb-3">AI Conversion Costs:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Conversion tool subscription</li>
            <li>Minimal customization time</li>
            <li>Reduced testing requirements</li>
            <li>Total: $20-200 per project</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">When to Choose Manual Conversion</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Complex custom functionality requirements</li>
            <li>Unique design implementations</li>
            <li>Advanced WordPress features integration</li>
            <li>Custom API integrations</li>
            <li>E-commerce customizations</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">When to Choose AI Conversion</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Standard business websites</li>
            <li>Tight deadlines and quick turnaround</li>
            <li>Budget constraints</li>
            <li>Consistency requirements</li>
            <li>Rapid prototyping needs</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Hybrid Approach: Best of Both Worlds</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">Many successful projects use a hybrid approach: start with AI conversion for the foundation, then add manual customizations as needed. This provides speed and efficiency while maintaining flexibility for custom requirements.</p>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Decision Framework</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">Consider these factors when choosing your approach:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Timeline: Days vs weeks vs months</li>
            <li>Budget: Hundreds vs thousands of dollars</li>
            <li>Functionality: Standard vs custom requirements</li>
            <li>Maintenance: Self-managed vs developer-maintained</li>
            <li>Scalability: One-time vs ongoing development</li>
          </ul>

          <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>
          <p class="text-gray-700 mb-8 leading-relaxed">The choice between AI and manual WordPress conversion depends on your specific project requirements, constraints, and goals. For maximum efficiency, consider starting with AI conversion and adding manual customizations as needed. The future of WordPress development lies in understanding when and how to leverage both approaches effectively.</p>
        `;

      default:
        return "<p>Content not available.</p>";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" size="sm" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article */}
          <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Featured Image */}
            <div className="w-full h-64 bg-gradient-to-r from-purple-500 to-orange-500 flex items-center justify-center">
              <div className="text-white text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium opacity-90">Featured Article</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
                <span className="bg-gradient-to-r from-purple-100 to-orange-100 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
              </div>

              {/* Title and Description */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {article.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Button */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.description,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Article URL copied to clipboard!');
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
                <div className="text-sm text-gray-500">
                  {article.readTime}
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: getArticleContent(slug) }} 
              />

              {/* Call to Action */}
              <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Convert Your Website?</h3>
                <p className="text-lg opacity-90 mb-6">
                  Try Code2WP's AI-powered conversion tool and transform your HTML website into a WordPress theme in minutes.
                </p>
                <Link href="/">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                  >
                    Start Converting Now
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(articles)
                .filter(([key]) => key !== slug)
                .slice(0, 2)
                .map(([key, relatedArticle]) => (
                <Link key={key} href={`/blog/${key}`}>
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {relatedArticle.date}
                      <span className="bg-gradient-to-r from-purple-100 to-orange-100 text-primary px-2 py-1 rounded-full text-xs font-medium ml-2">
                        {relatedArticle.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-primary font-medium text-sm">Read More →</span>
                      <span className="text-gray-500 text-xs">{relatedArticle.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}