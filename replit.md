# Overview

This is an HTML to WordPress theme converter application that allows users to upload ZIP files containing HTML websites or provide URLs to analyze existing websites. The system parses the HTML structure, extracts CSS and JavaScript assets, and automatically generates WordPress theme files. The application features a modern React frontend with real-time conversion progress tracking, embedded live preview capabilities, and a conversion history dashboard.

## Recent Changes (August 14, 2025)
- **Redesigned Homepage with Modern Gradient Design**: Transformed homepage to match Cursor AI editor styling with purple-to-orange gradient hero section and professional visual hierarchy
- **Enhanced Step-by-Step Conversion Interface**: Created 3-step conversion process as default landing page with improved visual indicators, larger cards, and gradient styling
- **Added Advanced Features Section**: Implemented comprehensive "Why Choose Our AI Converter?" section with feature highlights and professional typography
- **Improved User Experience Flow**: Added "Show Advanced View" toggle for power users to access live preview and conversion history while keeping main interface clean
- **Fixed Live Preview Issue**: Resolved "No Preview Available" error by implementing proper file extraction system and embedded preview functionality
- **Added Embedded Preview Component**: Created responsive preview with device testing (desktop/tablet/mobile), refresh, fullscreen, and new window options
- **Enhanced Asset Serving**: Implemented recursive asset discovery to fix missing images across all website types - searches entire extracted directory structure for assets
- **Improved Navigation System**: Added clean URL support (without .html extensions) and enhanced multi-page navigation for all website types including blogs
- **Universal Website Support**: Modified backend routes to work with any website structure, not just specific layouts, making it suitable for all types of HTML websites
- **Enhanced Asset Path Resolution**: Improved handling of relative paths (../styles.css) to prevent duplicate API path conversions and ensure proper styling across all page types
- **CRITICAL FIX: Filesystem Error (ENAMETOOLONG)**: Fixed major filesystem error where WordPress theme generation failed due to extremely long filenames generated from website titles. Limited theme names to 50 characters with unique ID suffixes for safe filesystem compatibility
- **MAJOR: Advanced Folder Structure Discovery**: Completely revolutionized URL analysis system to automatically discover and extract nested folder structures like `/blog/` directories containing multiple individual posts. System now identifies blog folders, follows redirects, crawls internal links, and creates proper nested directory structures (e.g., `blog/post-title.html`) with correct relative path handling
- **Enhanced Multi-Page Discovery**: Advanced page detection now finds and processes nested blog posts, category pages, and deep-linked content, creating proper file hierarchies and serving them with correct navigation
- **Nested Content Routing**: Implemented comprehensive nested page routing system that handles complex directory structures, rewrites asset paths for nested pages (../styles.css → styles.css), and maintains proper content hierarchy for WordPress conversion
- **Blog Post Analysis**: System now automatically detects blog-like folder structures, explores individual post URLs within folders, and extracts full content from each nested page while preserving original website structure and navigation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **File Processing**: Multer for file uploads, JSZip for ZIP file handling
- **HTML Parsing**: Cheerio for DOM manipulation and CSS-tree for CSS parsing
- **Storage**: In-memory storage implementation with interface for database abstraction
- **Development**: Vite middleware integration for hot module replacement

## Core Processing Pipeline
The conversion workflow follows these stages:
1. **File Upload/URL Input**: Accept ZIP files or website URLs through the frontend
2. **HTML Parsing**: Extract HTML structure, CSS files, JavaScript assets, and metadata
3. **WordPress Generation**: Transform parsed content into WordPress theme structure (header.php, footer.php, index.php, style.css, functions.php)
4. **Asset Processing**: Combine and optimize CSS/JS files for WordPress compatibility
5. **Preview Generation**: Create live preview of the converted theme
6. **Download Packaging**: Bundle the WordPress theme into a downloadable ZIP file

## Data Storage Design
- **Conversions Table**: Tracks conversion jobs with status, progress, and metadata
- **Uploaded Files Table**: Manages file uploads with references to conversion jobs
- **Schema**: Uses Drizzle ORM with PostgreSQL dialect and Zod validation
- **Current Implementation**: In-memory storage with interface for easy database migration

## File Upload System
- **Upload Directory**: Local file system with configurable upload paths
- **File Validation**: ZIP file type validation with size limits (50MB)
- **Processing**: Temporary file storage during conversion with cleanup

## Real-time Updates
- **Progress Tracking**: Polling-based progress updates every 2-5 seconds
- **Status Management**: Conversion states (pending, processing, completed, failed)
- **Error Handling**: Comprehensive error reporting with user-friendly messages

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for Neon cloud database
- **drizzle-orm**: Type-safe ORM with migration support
- **@tanstack/react-query**: Server state management and caching

## UI and Styling
- **@radix-ui/react-***: Comprehensive set of headless UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

## File Processing
- **multer**: Multipart/form-data handling for file uploads
- **jszip**: ZIP file creation and extraction
- **cheerio**: Server-side HTML parsing and manipulation
- **css-tree**: CSS parsing and AST manipulation

## Development Tools
- **vite**: Build tool and development server
- **@replit/vite-plugin-***: Replit-specific development plugins
- **typescript**: Type checking and compilation
- **wouter**: Lightweight routing library

## Validation and Forms
- **zod**: Schema validation library
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class construction
- **nanoid**: Unique ID generation