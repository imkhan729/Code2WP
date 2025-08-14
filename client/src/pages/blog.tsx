import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Best Practices for HTML to WordPress Theme Conversion",
      excerpt: "Learn the essential techniques and strategies for converting your static HTML websites into professional WordPress themes that are both functional and maintainable.",
      date: "2025-08-14",
      readTime: "8 min read",
      category: "Tutorial",
      slug: "html-to-wordpress-best-practices"
    },
    {
      id: 2,
      title: "Understanding WordPress Theme Structure: A Complete Guide",
      excerpt: "Dive deep into WordPress theme architecture, file hierarchy, and template system to understand how your converted themes work under the hood.",
      date: "2025-08-10",
      readTime: "12 min read",
      category: "Guide",
      slug: "wordpress-theme-structure-guide"
    },
    {
      id: 3,
      title: "Optimizing Your Converted WordPress Theme for Performance",
      excerpt: "Discover performance optimization techniques specific to converted themes, including asset optimization, caching strategies, and code minification.",
      date: "2025-08-07",
      readTime: "6 min read",
      category: "Performance",
      slug: "optimize-converted-wordpress-theme"
    },
    {
      id: 4,
      title: "Common Issues When Converting Complex HTML Layouts",
      excerpt: "Troubleshoot and solve the most common problems that arise when converting complex HTML layouts with advanced CSS and JavaScript functionality.",
      date: "2025-08-03",
      readTime: "10 min read",
      category: "Troubleshooting",
      slug: "complex-html-conversion-issues"
    },
    {
      id: 5,
      title: "Making Your Converted Theme Responsive and Mobile-Friendly",
      excerpt: "Ensure your converted WordPress theme works perfectly across all devices with responsive design principles and mobile optimization techniques.",
      date: "2025-07-30",
      readTime: "7 min read",
      category: "Design",
      slug: "responsive-wordpress-theme-conversion"
    },
    {
      id: 6,
      title: "SEO Considerations for Converted WordPress Themes",
      excerpt: "Implement proper SEO strategies in your converted themes, including meta tags, structured data, and WordPress SEO plugin compatibility.",
      date: "2025-07-25",
      readTime: "9 min read",
      category: "SEO",
      slug: "seo-converted-wordpress-themes"
    }
  ];

  const categories = ["All", "Tutorial", "Guide", "Performance", "Troubleshooting", "Design", "SEO"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              WordPress Conversion Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, tutorials, and insights for converting HTML websites to WordPress themes. Stay updated with the latest best practices and techniques.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-primary text-white" : ""}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-8">
                  {/* Category Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                    {post.category}
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest tips and tutorials on HTML to WordPress conversion delivered directly to your inbox.
            </p>
            
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="px-6 py-3 bg-primary text-white hover:bg-primary/90"
                data-testid="newsletter-subscribe-button"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Convert Your Website?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Put your knowledge into practice and convert your HTML website to WordPress now
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