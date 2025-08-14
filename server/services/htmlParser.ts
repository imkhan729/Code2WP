import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import path from 'path';
import JSZip from 'jszip';

export interface ScriptInfo {
  content: string;
  src?: string;
  type?: string;
  defer?: boolean;
  async?: boolean;
  module?: boolean;
  order: number;
  location: 'head' | 'body' | 'footer';
}

export interface CSSInfo {
  content: string;
  href?: string;
  media?: string;
  order: number;
  inline: boolean;
}

export interface FormInfo {
  action: string;
  method: string;
  fields: Array<{
    name: string;
    type: string;
    required: boolean;
    placeholder?: string;
  }>;
  markup: string;
}

export interface PageInfo {
  filename: string;
  title: string;
  path: string;
  content: string;
  isBlogLike: boolean;
  links: string[];
}

export interface NavigationInfo {
  markup: string;
  structure: Array<{
    text: string;
    href: string;
    children?: Array<{ text: string; href: string; }>;
  }>;
}

export interface AnalysisReport {
  pages: PageInfo[];
  homepage: string;
  blogPages: PageInfo[];
  assets: {
    images: string[];
    fonts: string[];
    videos: string[];
    other: string[];
  };
  css: CSSInfo[];
  scripts: ScriptInfo[];
  forms: FormInfo[];
  navigation: NavigationInfo | null;
  hazards: string[];
  sitemap: Record<string, string[]>;
}

export interface ParsedWebsite {
  html: string;
  css: string[];
  js: string[];
  assets: string[];
  analysis: AnalysisReport;
  structure: {
    title: string;
    meta: Record<string, string>;
    links: string[];
    scripts: string[];
  };
}

export class HtmlParser {
  async parseFromZip(zipPath: string): Promise<ParsedWebsite> {
    const zipData = await fs.readFile(zipPath);
    const zip = await JSZip.loadAsync(zipData);
    
    // First pass: inventory all files with detailed structure
    const inventory = await this.inventoryZipFiles(zip);
    
    // Create comprehensive analysis with route mapping
    const analysis = await this.analyzeWebsite(zip, inventory);
    
    // Find main HTML content (prefer index.html)
    const mainHtmlFile = this.findMainHtmlFile(inventory.pages);
    const htmlContent = await zip.files[mainHtmlFile].async('text');
    
    // Extract and combine all CSS files with proper order
    const cssFiles: string[] = [];
    const cssOrder = this.determineCSSOrder(zip, inventory.css, analysis.pages);
    
    for (const cssFile of cssOrder) {
      try {
        const content = await zip.files[cssFile].async('text');
        // Process CSS to fix relative paths and imports
        const processedCSS = this.processCSSContent(content, cssFile, inventory);
        cssFiles.push(processedCSS);
      } catch (error) {
        console.warn(`Failed to process CSS file: ${cssFile}`);
      }
    }
    
    // Extract and combine all JS files with proper order and functionality preservation
    const jsFiles: string[] = [];
    const jsOrder = this.determineJSOrder(zip, inventory.js, analysis.scripts);
    
    for (const jsFile of jsOrder) {
      try {
        const content = await zip.files[jsFile].async('text');
        // Process JS to preserve functionality and fix paths
        const processedJS = this.processJSContent(content, jsFile, inventory);
        jsFiles.push(processedJS);
      } catch (error) {
        console.warn(`Failed to process JS file: ${jsFile}`);
      }
    }
    
    // Collect all assets with proper categorization
    const allAssets = [
      ...inventory.images,
      ...inventory.fonts, 
      ...inventory.videos,
      ...inventory.assets
    ];
    
    return {
      html: htmlContent,
      css: cssFiles,
      js: jsFiles,
      assets: allAssets,
      analysis,
      structure: this.parseBasicStructure(htmlContent)
    };
  }

  private async inventoryZipFiles(zip: JSZip): Promise<{
    pages: string[];
    css: string[];
    js: string[];
    assets: string[];
    fonts: string[];
    images: string[];
    videos: string[];
  }> {
    const inventory = {
      pages: [] as string[],
      css: [] as string[],
      js: [] as string[],
      assets: [] as string[],
      fonts: [] as string[],
      images: [] as string[],
      videos: [] as string[]
    };

    for (const filename of Object.keys(zip.files)) {
      if (zip.files[filename].dir) continue;

      const ext = path.extname(filename).toLowerCase();
      
      if (ext === '.html' || ext === '.htm') {
        inventory.pages.push(filename);
      } else if (ext === '.css') {
        inventory.css.push(filename);
      } else if (ext === '.js') {
        inventory.js.push(filename);
      } else if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) {
        inventory.fonts.push(filename);
      } else if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
        inventory.images.push(filename);
      } else if (['.mp4', '.webm', '.avi', '.mov'].includes(ext)) {
        inventory.videos.push(filename);
      } else if (['.ico', '.txt', '.json', '.xml', '.pdf'].includes(ext)) {
        inventory.assets.push(filename);
      }
    }

    return inventory;
  }

  private findMainHtmlFile(pages: string[]): string {
    // Prefer index.html in root
    const indexInRoot = pages.find(p => p.toLowerCase() === 'index.html');
    if (indexInRoot) return indexInRoot;

    // Prefer any index.html
    const anyIndex = pages.find(p => path.basename(p).toLowerCase().includes('index'));
    if (anyIndex) return anyIndex;

    // Prefer root-level HTML files
    const rootFiles = pages.filter(p => !p.includes('/'));
    if (rootFiles.length > 0) {
      // Prefer common homepage names
      const homepageNames = ['home.html', 'main.html', 'default.html'];
      for (const name of homepageNames) {
        const found = rootFiles.find(f => f.toLowerCase() === name);
        if (found) return found;
      }
      return rootFiles[0];
    }

    // Fallback to first HTML file
    return pages[0];
  }

  private async analyzeWebsite(zip: JSZip, inventory: any): Promise<AnalysisReport> {
    const pages: PageInfo[] = [];
    const blogPages: PageInfo[] = [];
    const forms: FormInfo[] = [];
    const scripts: ScriptInfo[] = [];
    const css: CSSInfo[] = [];
    const hazards: string[] = [];
    const sitemap: Record<string, string[]> = {};

    // Analyze each HTML page
    for (const pageFile of inventory.pages) {
      const content = await zip.files[pageFile].async('text');
      const $ = cheerio.load(content);
      
      const pageInfo: PageInfo = {
        filename: pageFile,
        title: $('title').text() || path.basename(pageFile, '.html'),
        path: pageFile,
        content,
        isBlogLike: this.detectBlogLike($),
        links: this.extractInternalLinks($, pageFile)
      };

      pages.push(pageInfo);
      
      if (pageInfo.isBlogLike) {
        blogPages.push(pageInfo);
      }

      // Extract forms from this page
      $('form').each((_, form) => {
        const formInfo = this.extractFormInfo($(form));
        if (formInfo) forms.push(formInfo);
      });

      // Extract scripts with order and attributes
      this.extractScripts($, scripts);

      // Extract CSS with order
      this.extractCSS($, css);

      // Detect hazards
      this.detectHazards($, hazards);

      // Build sitemap
      sitemap[pageFile] = pageInfo.links;
    }

    // Find navigation
    const navigation = await this.extractNavigation(zip, inventory.pages);

    return {
      pages,
      homepage: this.findMainHtmlFile(inventory.pages),
      blogPages,
      assets: {
        images: inventory.images,
        fonts: inventory.fonts,
        videos: inventory.videos,
        other: inventory.assets
      },
      css,
      scripts,
      forms,
      navigation,
      hazards,
      sitemap
    };
  }

  private detectBlogLike($: cheerio.CheerioAPI): boolean {
    // Look for blog indicators
    const blogIndicators = [
      '.post', '.article', '.blog-post',
      '[class*="post"]', '[class*="blog"]', '[class*="article"]',
      'time', '.date', '.published', '.meta'
    ];

    let blogScore = 0;
    for (const indicator of blogIndicators) {
      if ($(indicator).length > 0) blogScore++;
    }

    // Check for multiple article-like structures
    const articles = $('article').length;
    const headings = $('h1, h2, h3').length;
    
    return blogScore >= 2 || articles >= 2 || (headings >= 3 && blogScore >= 1);
  }

  private extractInternalLinks($: cheerio.CheerioAPI, currentFile: string): string[] {
    const links: string[] = [];
    const currentDir = path.dirname(currentFile);
    
    $('a[href]').each((_, link) => {
      const href = $(link).attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && 
          !href.startsWith('tel:') && !href.startsWith('#')) {
        
        // Normalize the link path relative to current directory
        let normalizedHref = href;
        
        // Handle relative paths
        if (href.startsWith('./')) {
          normalizedHref = href.substring(2);
        } else if (href.startsWith('../')) {
          // Resolve parent directory references
          const currentParts = currentDir.split('/').filter(p => p);
          let upLevels = 0;
          let tempHref = href;
          
          while (tempHref.startsWith('../')) {
            upLevels++;
            tempHref = tempHref.substring(3);
          }
          
          const targetParts = currentParts.slice(0, Math.max(0, currentParts.length - upLevels));
          normalizedHref = [...targetParts, tempHref].join('/');
        } else if (!href.startsWith('/')) {
          // Relative to current directory
          normalizedHref = currentDir ? `${currentDir}/${href}` : href;
        }
        
        // Clean up the path
        normalizedHref = normalizedHref.replace(/\/+/g, '/'); // Remove double slashes
        if (normalizedHref.startsWith('/')) {
          normalizedHref = normalizedHref.substring(1);
        }
        
        links.push(normalizedHref);
      }
    });

    return Array.from(new Set(links)); // Remove duplicates
  }

  private extractFormInfo($form: cheerio.Cheerio<any>): FormInfo | null {
    const action = $form.attr('action') || '';
    const method = $form.attr('method') || 'GET';
    const fields: FormInfo['fields'] = [];

    $form.find('input, textarea, select').each((_, field) => {
      const $field = cheerio.load(field)('*').first();
      const name = $field.attr('name');
      const type = $field.attr('type') || $field.prop('tagName')?.toLowerCase() || 'text';
      
      if (name) {
        fields.push({
          name,
          type,
          required: $field.attr('required') !== undefined,
          placeholder: $field.attr('placeholder')
        });
      }
    });

    if (fields.length === 0) return null;

    return {
      action,
      method: method.toUpperCase(),
      fields,
      markup: $form.prop('outerHTML') || ''
    };
  }

  private extractScripts($: cheerio.CheerioAPI, scripts: ScriptInfo[]): void {
    $('script').each((index, script) => {
      const $script = $(script);
      const src = $script.attr('src');
      const type = $script.attr('type');
      const content = $script.html() || '';
      
      if (src || content.trim()) {
        scripts.push({
          content,
          src,
          type,
          defer: $script.attr('defer') !== undefined,
          async: $script.attr('async') !== undefined,
          module: type === 'module',
          order: index,
          location: $script.closest('head').length > 0 ? 'head' : 'body'
        });
      }
    });
  }

  private extractCSS($: cheerio.CheerioAPI, css: CSSInfo[]): void {
    // External stylesheets
    $('link[rel="stylesheet"]').each((index, link) => {
      const $link = $(link);
      css.push({
        content: '',
        href: $link.attr('href'),
        media: $link.attr('media'),
        order: index,
        inline: false
      });
    });

    // Inline styles
    $('style').each((index, style) => {
      const content = $(style).html() || '';
      if (content.trim()) {
        css.push({
          content,
          order: css.length + index,
          inline: true
        });
      }
    });
  }

  private detectHazards($: cheerio.CheerioAPI, hazards: string[]): void {
    // Check for document.write
    $('script').each((_, script) => {
      const content = $(script).html() || '';
      if (content.includes('document.write')) {
        hazards.push('Uses document.write which may break in WordPress');
      }
    });

    // Check for base tag
    if ($('base').length > 0) {
      hazards.push('Uses <base> tag which may conflict with WordPress URLs');
    }

    // Check for absolute paths that might break
    $('img, link, script').each((_, el) => {
      const $el = $(el);
      const src = $el.attr('src') || $el.attr('href');
      if (src && src.startsWith('/') && !src.startsWith('//')) {
        hazards.push('Uses root-relative paths that may need adjustment');
      }
    });
  }

  private async extractNavigation(zip: JSZip, pages: string[]): Promise<NavigationInfo | null> {
    // Analyze the main page for navigation
    const mainPage = this.findMainHtmlFile(pages);
    const content = await zip.files[mainPage].async('text');
    const $ = cheerio.load(content);

    // Look for navigation elements
    const navSelectors = ['nav', '.nav', '.navbar', '.navigation', '.menu', '#nav', '#menu'];
    
    for (const selector of navSelectors) {
      const $nav = $(selector).first();
      if ($nav.length > 0) {
        const structure = this.parseNavStructure($nav);
        if (structure.length > 0) {
          return {
            markup: $nav.prop('outerHTML') || '',
            structure
          };
        }
      }
    }

    return null;
  }

  private parseNavStructure($nav: cheerio.Cheerio<any>): NavigationInfo['structure'] {
    const structure: NavigationInfo['structure'] = [];

    $nav.find('a').each((_, link) => {
      const $link = cheerio.load(link)('a');
      const text = $link.text().trim();
      const href = $link.attr('href') || '#';
      
      if (text) {
        structure.push({ text, href });
      }
    });

    return structure;
  }

  private parseBasicStructure(htmlContent: string) {
    const $ = cheerio.load(htmlContent);
    
    const meta: Record<string, string> = {};
    $('meta').each((_, el) => {
      const name = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (name && content) {
        meta[name] = content;
      }
    });

    const links: string[] = [];
    $('link').each((_, el) => {
      const href = $(el).attr('href');
      if (href) links.push(href);
    });

    const scripts: string[] = [];
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src');
      if (src) scripts.push(src);
    });

    return {
      title: $('title').text() || '',
      meta,
      links,
      scripts
    };
  }
  
  async parseFromUrl(url: string): Promise<ParsedWebsite> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      
      const htmlContent = await response.text();
      
      // Enhanced URL parsing for comprehensive website analysis
      const $ = cheerio.load(htmlContent);
      const cssFiles: string[] = [];
      const jsFiles: string[] = [];
      const assets: string[] = [];
      const externalAssets: string[] = [];

      // Process external CSS files
      $('link[rel="stylesheet"]').each((_, link) => {
        const href = $(link).attr('href');
        if (href) {
          try {
            const cssUrl = new URL(href, url).toString();
            externalAssets.push(cssUrl);
          } catch (e) {
            // Invalid URL, skip
          }
        }
      });

      // Get inline styles with order preservation
      $('style').each((index, el) => {
        const content = $(el).html() || '';
        if (content.trim()) {
          cssFiles.push(this.processCSSContent(content, 'inline-style', { css: [], js: [], assets: [] }));
        }
      });
      
      // Process external JavaScript files
      $('script[src]').each((_, script) => {
        const src = $(script).attr('src');
        if (src) {
          try {
            const jsUrl = new URL(src, url).toString();
            externalAssets.push(jsUrl);
          } catch (e) {
            // Invalid URL, skip
          }
        }
      });
      
      // Get inline scripts with order preservation
      $('script').each((index, el) => {
        const $script = $(el);
        const src = $script.attr('src');
        if (!src && $script.html()) {
          const content = $script.html() || '';
          if (content.trim()) {
            jsFiles.push(this.processJSContent(content, 'inline-script', { css: [], js: [], assets: [] }));
          }
        }
      });

      // Extract all asset references from the page
      const pageAssets = this.extractAssetReferences($, url);
      assets.push(...pageAssets, ...externalAssets);

      // Discover linked pages for multi-page websites
      const linkedPages = await this.discoverLinkedPages($, url);

      // Create comprehensive analysis for URL parsing
      const analysis: AnalysisReport = {
        pages: [{
          filename: 'index.html',
          title: $('title').text() || 'Home',
          path: '/',
          content: htmlContent,
          isBlogLike: this.detectBlogLike($),
          links: this.extractInternalLinks($, 'index.html')
        }, ...linkedPages],
        homepage: 'index.html',
        blogPages: linkedPages.filter(page => page.isBlogLike),
        assets: {
          images: pageAssets.filter(a => this.isImageAsset(a)),
          fonts: pageAssets.filter(a => this.isFontAsset(a)),
          videos: pageAssets.filter(a => this.isVideoAsset(a)),
          other: assets
        },
        css: this.extractCSSInfo($),
        scripts: this.extractScriptInfo($),
        forms: this.extractAllForms($),
        navigation: this.extractNavigationFromPage($),
        hazards: this.detectPageHazards($),
        sitemap: this.buildSitemapFromLinks($, linkedPages)
      };

      return {
        html: htmlContent,
        css: cssFiles,
        js: jsFiles,
        assets,
        analysis,
        structure: this.parseBasicStructure(htmlContent)
      };
    } catch (error) {
      throw new Error(`Failed to parse URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private isAssetFile(filename: string): boolean {
    const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', 
                           '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm'];
    return assetExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  }

  // Enhanced CSS processing methods
  private determineCSSOrder(zip: JSZip, cssFiles: string[], pages: any[]): string[] {
    // Determine CSS loading order based on:
    // 1. Framework CSS first (bootstrap, foundation, etc.)
    // 2. Base/reset CSS
    // 3. Component CSS
    // 4. Page-specific CSS
    // 5. Theme/custom CSS last
    
    const orderWeight = (filename: string): number => {
      const name = filename.toLowerCase();
      
      // Framework CSS - highest priority
      if (name.includes('bootstrap') || name.includes('foundation') || 
          name.includes('tailwind') || name.includes('bulma')) return 1;
      
      // Reset/normalize CSS
      if (name.includes('reset') || name.includes('normalize') || 
          name.includes('base')) return 2;
      
      // Vendor/library CSS
      if (name.includes('vendor') || name.includes('lib') || 
          name.includes('plugin')) return 3;
      
      // Main/style CSS
      if (name.includes('main') || name.includes('style') || 
          name.includes('app')) return 4;
      
      // Component CSS
      if (name.includes('component') || name.includes('module')) return 5;
      
      // Page-specific CSS
      if (name.includes('page') || name.includes('layout')) return 6;
      
      // Theme/custom CSS - lowest priority
      if (name.includes('theme') || name.includes('custom')) return 7;
      
      return 5; // Default
    };
    
    return cssFiles.sort((a, b) => orderWeight(a) - orderWeight(b));
  }

  private processCSSContent(content: string, filePath: string, inventory: any): string {
    // Fix relative paths in CSS
    let processedCSS = content;
    
    // Fix @import statements
    processedCSS = processedCSS.replace(
      /@import\s+(?:url\()?['"]?([^'"\)]+)['"]?\)?/g,
      (match, importPath) => {
        if (importPath.startsWith('http') || importPath.startsWith('//')) {
          return match; // Keep external imports
        }
        
        // Convert relative paths to WordPress theme paths
        const normalizedPath = this.normalizeAssetPath(importPath, filePath);
        return `@import url('${normalizedPath}')`;
      }
    );
    
    // Fix url() references for assets
    processedCSS = processedCSS.replace(
      /url\(['"]?([^'"\)]+)['"]?\)/g,
      (match, urlPath) => {
        if (urlPath.startsWith('http') || urlPath.startsWith('//') || 
            urlPath.startsWith('data:')) {
          return match; // Keep external and data URLs
        }
        
        // Convert relative paths to WordPress theme paths
        const normalizedPath = this.normalizeAssetPath(urlPath, filePath);
        return `url('${normalizedPath}')`;
      }
    );
    
    return processedCSS;
  }

  private determineJSOrder(zip: JSZip, jsFiles: string[], scripts: any[]): string[] {
    // Determine JS loading order based on:
    // 1. Framework JS first (jQuery, React, Vue, etc.)
    // 2. Library JS (plugins, utilities)
    // 3. Component JS
    // 4. Main application JS
    // 5. Page-specific JS last
    
    const orderWeight = (filename: string): number => {
      const name = filename.toLowerCase();
      
      // Framework JS - highest priority
      if (name.includes('jquery') || name.includes('react') || 
          name.includes('vue') || name.includes('angular')) return 1;
      
      // Vendor/library JS
      if (name.includes('vendor') || name.includes('lib') || 
          name.includes('plugin') || name.includes('min.js')) return 2;
      
      // Bootstrap and UI framework JS
      if (name.includes('bootstrap') || name.includes('foundation') || 
          name.includes('materialize')) return 3;
      
      // Main/app JS
      if (name.includes('main') || name.includes('app') || 
          name.includes('index')) return 4;
      
      // Component JS
      if (name.includes('component') || name.includes('module')) return 5;
      
      // Page-specific JS
      if (name.includes('page') || name.includes('script')) return 6;
      
      return 5; // Default
    };
    
    return jsFiles.sort((a, b) => orderWeight(a) - orderWeight(b));
  }

  private processJSContent(content: string, filePath: string, inventory: any): string {
    // Process JavaScript to preserve functionality and fix paths
    let processedJS = content;
    
    // Fix relative path references in JS
    processedJS = processedJS.replace(
      /['"]([^'"]+\.(css|js|json|html))['\"]/g,
      (match, resourcePath) => {
        if (resourcePath.startsWith('http') || resourcePath.startsWith('//')) {
          return match; // Keep external references
        }
        
        // Convert relative paths to WordPress theme paths
        const normalizedPath = this.normalizeAssetPath(resourcePath, filePath);
        return `'${normalizedPath}'`;
      }
    );
    
    // Add WordPress compatibility wrapper if needed
    if (this.needsWordPressWrapper(content)) {
      processedJS = this.wrapForWordPress(processedJS);
    }
    
    return processedJS;
  }

  private normalizeAssetPath(assetPath: string, contextFile: string): string {
    // Convert relative paths to WordPress theme-compatible paths
    const contextDir = path.dirname(contextFile);
    let normalizedPath = assetPath;
    
    // Remove leading './' if present
    normalizedPath = normalizedPath.replace(/^\.\//, '');
    
    // Handle '../' references
    let upLevels = 0;
    while (normalizedPath.startsWith('../')) {
      upLevels++;
      normalizedPath = normalizedPath.substring(3);
    }
    
    // Build the final path relative to theme root
    if (upLevels > 0) {
      const contextParts = contextDir.split('/').filter(p => p);
      const targetParts = contextParts.slice(0, Math.max(0, contextParts.length - upLevels));
      normalizedPath = [...targetParts, normalizedPath].join('/');
    } else if (contextDir && contextDir !== '.') {
      normalizedPath = `${contextDir}/${normalizedPath}`;
    }
    
    // Ensure WordPress compatibility
    return `<?php echo get_template_directory_uri(); ?>/${normalizedPath}`;
  }

  private needsWordPressWrapper(content: string): boolean {
    // Check if JS needs WordPress compatibility wrapper
    return content.includes('$(document).ready') || 
           content.includes('DOMContentLoaded') ||
           content.includes('window.onload');
  }

  private wrapForWordPress(content: string): string {
    // Wrap JS content for WordPress compatibility
    return `
(function($) {
  'use strict';
  
  // WordPress-compatible initialization
  $(document).ready(function() {
    ${content}
  });
  
})(jQuery);
`;
  }

  // Enhanced URL parsing helper methods
  private extractAssetReferences($: cheerio.CheerioAPI, baseUrl: string): string[] {
    const assets: string[] = [];
    
    // Extract image sources
    $('img[src]').each((_, img) => {
      const src = $(img).attr('src');
      if (src) {
        try {
          const imgUrl = new URL(src, baseUrl).toString();
          assets.push(imgUrl);
        } catch (e) {
          // Invalid URL, skip
        }
      }
    });
    
    // Extract background images from CSS
    $('[style*="background"]').each((_, el) => {
      const style = $(el).attr('style') || '';
      const urlMatches = style.match(/url\(['"]?([^'"\)]+)['"]?\)/g);
      if (urlMatches) {
        urlMatches.forEach(match => {
          const url = match.replace(/url\(['"]?([^'"\)]+)['"]?\)/, '$1');
          try {
            const fullUrl = new URL(url, baseUrl).toString();
            assets.push(fullUrl);
          } catch (e) {
            // Invalid URL, skip
          }
        });
      }
    });
    
    return assets;
  }

  private async discoverLinkedPages($: cheerio.CheerioAPI, baseUrl: string): Promise<any[]> {
    const linkedPages: any[] = [];
    const processedUrls = new Set<string>();
    const maxPages = 20; // Limit to prevent infinite crawling
    
    // Collect all potential page URLs first
    const pageUrls: Array<{url: string, title: string, pageName: string, path: string}> = [];
    const allLinks: string[] = [];
    const foldersToExplore = new Set<string>(); // Track folders that need exploration
    
    $('a[href]').each((_, link) => {
      const href = $(link).attr('href');
      if (href) {
        allLinks.push(href);
      }
      
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
        try {
          const linkUrl = new URL(href, baseUrl);
          
          // Only process pages from the same domain and likely HTML pages
          if (linkUrl.hostname === new URL(baseUrl).hostname && 
              !processedUrls.has(linkUrl.href) &&
              linkUrl.href !== baseUrl) { // Don't re-fetch the main page
            
            // Check if this is a folder path (ends with / or has no extension)
            const isFolder = linkUrl.pathname.endsWith('/') || 
              (!linkUrl.pathname.includes('.') && linkUrl.pathname !== '/');
            
            // Track folders for later exploration
            if (isFolder && (
              linkUrl.pathname.includes('blog') ||
              linkUrl.pathname.includes('post') ||
              linkUrl.pathname.includes('article') ||
              linkUrl.pathname.includes('news') ||
              linkUrl.pathname.includes('category')
            )) {
              console.log(`Adding folder for exploration: ${linkUrl.href}`);
              foldersToExplore.add(linkUrl.href);
            }
            
            // Add likely HTML pages or folders to be fetched
            if (linkUrl.pathname.endsWith('.html') || 
                linkUrl.pathname.endsWith('/') || 
                !linkUrl.pathname.includes('.') ||
                this.isLikelyContentPage(linkUrl.pathname)) {
              
              processedUrls.add(linkUrl.href);
              
              // Handle nested paths properly
              let pageName: string;
              let pathParts = linkUrl.pathname.split('/').filter(p => p);
              
              if (pathParts.length === 0) {
                pageName = 'page.html';
              } else if (pathParts.length === 1) {
                // Single level path like /blog or /about
                pageName = pathParts[0].endsWith('.html') ? pathParts[0] : `${pathParts[0]}.html`;
              } else {
                // Nested path like /blog/post-title or /blog/category/post
                // Create nested directory structure: blog/post-title.html
                const fileName = pathParts[pathParts.length - 1];
                const dirPath = pathParts.slice(0, -1).join('/');
                pageName = fileName.endsWith('.html') ? 
                  `${dirPath}/${fileName}` : 
                  `${dirPath}/${fileName}.html`;
              }
              
              const title = $(link).text().trim() || pageName.replace('.html', '');
              
              pageUrls.push({
                url: linkUrl.href,
                title: title,
                pageName: pageName,
                path: linkUrl.pathname
              });
            }
          }
        } catch (e) {
          // Invalid URL, skip
        }
      }
    });
    
    // Explore folders to find nested content
    for (const folderUrl of Array.from(foldersToExplore)) {
      if (pageUrls.length >= maxPages) break;
      await this.exploreFolderStructure(folderUrl, baseUrl, pageUrls, processedUrls, maxPages);
    }
    
    console.log(`Found ${allLinks.length} total links, ${pageUrls.length} potential pages to fetch`);
    console.log('All links found:', allLinks.slice(0, 10)); // Show first 10 links
    console.log('Pages to fetch:', pageUrls.map(p => p.url));
    
    // Now fetch the content for each page (limited to maxPages)
    for (const pageInfo of pageUrls.slice(0, maxPages)) {
      try {
        console.log(`Fetching linked page: ${pageInfo.url}`);
        const response = await fetch(pageInfo.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          const pageContent = await response.text();
          const page$ = cheerio.load(pageContent);
          
          linkedPages.push({
            filename: pageInfo.pageName,
            title: page$('title').text() || pageInfo.title,
            path: pageInfo.path,
            content: pageContent,
            isBlogLike: this.detectBlogLike(page$),
            links: this.extractInternalLinks(page$, pageInfo.pageName)
          });
          
          console.log(`Successfully fetched: ${pageInfo.pageName} (${pageContent.length} chars)`);
        } else {
          console.log(`Failed to fetch ${pageInfo.url}: ${response.status}`);
        }
      } catch (e) {
        console.log(`Error fetching ${pageInfo.url}:`, e instanceof Error ? e.message : 'Unknown error');
      }
    }
    
    console.log(`Discovered and fetched ${linkedPages.length} additional pages`);
    return linkedPages;
  }

  private isLinkBlogLike($link: cheerio.Cheerio<any>): boolean {
    const href = $link.attr('href') || '';
    const text = $link.text().toLowerCase();
    const classes = $link.attr('class') || '';
    
    return href.includes('/blog/') || 
           href.includes('/post/') || 
           href.includes('/article/') ||
           text.includes('blog') || 
           text.includes('post') ||
           classes.includes('blog') ||
           classes.includes('post');
  }

  private isImageAsset(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(url);
  }

  private isFontAsset(url: string): boolean {
    return /\.(woff|woff2|ttf|otf|eot)$/i.test(url);
  }

  private isVideoAsset(url: string): boolean {
    return /\.(mp4|webm|avi|mov|mkv)$/i.test(url);
  }

  private extractCSSInfo($: cheerio.CheerioAPI): CSSInfo[] {
    const cssInfo: CSSInfo[] = [];
    let order = 0;
    
    // External CSS files
    $('link[rel="stylesheet"]').each((_, link) => {
      const href = $(link).attr('href');
      const media = $(link).attr('media');
      if (href) {
        cssInfo.push({
          content: '',
          href,
          media,
          order: order++,
          inline: false
        });
      }
    });
    
    // Inline styles
    $('style').each((_, style) => {
      const content = $(style).html() || '';
      const media = $(style).attr('media');
      if (content.trim()) {
        cssInfo.push({
          content,
          media,
          order: order++,
          inline: true
        });
      }
    });
    
    return cssInfo;
  }

  private extractScriptInfo($: cheerio.CheerioAPI): ScriptInfo[] {
    const scripts: ScriptInfo[] = [];
    let order = 0;
    
    $('script').each((_, script) => {
      const $script = $(script);
      const src = $script.attr('src');
      const type = $script.attr('type');
      const defer = $script.attr('defer') !== undefined;
      const async = $script.attr('async') !== undefined;
      const content = $script.html() || '';
      
      // Determine location based on position in document
      const location = $script.closest('head').length > 0 ? 'head' : 
                      $script.closest('body').length > 0 ? 'body' : 'footer';
      
      scripts.push({
        content,
        src,
        type,
        defer,
        async,
        module: type === 'module',
        order: order++,
        location: location as 'head' | 'body' | 'footer'
      });
    });
    
    return scripts;
  }

  private extractAllForms($: cheerio.CheerioAPI): FormInfo[] {
    const forms: FormInfo[] = [];
    
    $('form').each((_, form) => {
      const formInfo = this.extractFormInfo($(form));
      if (formInfo) {
        forms.push(formInfo);
      }
    });
    
    return forms;
  }

  private extractNavigationFromPage($: cheerio.CheerioAPI): NavigationInfo | null {
    const navSelectors = ['nav', '.nav', '.navbar', '.navigation', '.menu', 'header nav'];
    
    for (const selector of navSelectors) {
      const $nav = $(selector).first();
      if ($nav.length > 0) {
        const markup = $nav.prop('outerHTML') || '';
        const structure = this.parseNavigationStructure($nav);
        
        return {
          markup,
          structure
        };
      }
    }
    
    return null;
  }

  private parseNavigationStructure($nav: cheerio.Cheerio<any>): NavigationInfo['structure'] {
    const structure: NavigationInfo['structure'] = [];
    
    $nav.find('a').each((_, link) => {
      const $link = cheerio.load(link)('a').first();
      const text = $link.text().trim();
      const href = $link.attr('href') || '';
      
      if (text && href) {
        structure.push({
          text,
          href,
          children: [] // Could be expanded to handle nested menus
        });
      }
    });
    
    return structure;
  }

  private detectPageHazards($: cheerio.CheerioAPI): string[] {
    const hazards: string[] = [];
    
    // Check for potentially problematic elements
    if ($('iframe').length > 0) {
      hazards.push('Embedded iframes detected - may need manual review');
    }
    
    if ($('object, embed').length > 0) {
      hazards.push('Flash/Object embeds detected - may not work in modern browsers');
    }
    
    if ($('[onclick], [onload], [onsubmit]').length > 0) {
      hazards.push('Inline event handlers detected - should be converted to modern JS');
    }
    
    if ($('script').filter((_, script) => {
      const content = cheerio.load(script)('script').html() || '';
      return content.includes('document.write');
    }).length > 0) {
      hazards.push('document.write() usage detected - may cause issues');
    }
    
    return hazards;
  }

  private buildSitemapFromLinks($: cheerio.CheerioAPI, linkedPages: any[]): Record<string, string[]> {
    const sitemap: Record<string, string[]> = {};
    
    // Build sitemap from current page links
    const currentPageLinks: string[] = [];
    $('a[href]').each((_, link) => {
      const href = $(link).attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && 
          !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        currentPageLinks.push(href);
      }
    });
    
    sitemap['index.html'] = currentPageLinks;
    
    // Add linked pages to sitemap
    linkedPages.forEach(page => {
      sitemap[page.filename] = page.links || [];
    });
    
    return sitemap;
  }

  private isLikelyContentPage(pathname: string): boolean {
    const contentIndicators = [
      'blog', 'post', 'article', 'about', 'contact', 'features', 
      'download', 'news', 'category', 'tag', 'archive', 'page'
    ];
    
    return contentIndicators.some(indicator => 
      pathname.toLowerCase().includes(indicator)
    );
  }

  private async exploreFolderStructure(
    folderUrl: string, 
    baseUrl: string, 
    pageUrls: Array<{url: string, title: string, pageName: string, path: string}>, 
    processedUrls: Set<string>,
    maxPages: number
  ): Promise<void> {
    try {
      console.log(`Exploring folder: ${folderUrl}`);
      
      // Fetch the folder page with redirect following
      const response = await fetch(folderUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!response.ok) {
        console.log(`Failed to explore folder ${folderUrl}: ${response.status}`);
        return;
      }
      
      const folderContent = await response.text();
      const folder$ = cheerio.load(folderContent);
      
      // Look for links to individual posts/articles within this folder
      const newLinks: Array<{url: string, title: string, pageName: string, path: string}> = [];
      
      folder$('a[href]').each((_, link) => {
        if (pageUrls.length >= maxPages) return;
        
        const href = folder$(link).attr('href');
        if (!href) return;
        
        try {
          const linkUrl = new URL(href, folderUrl);
          
          // Only process pages from same domain that we haven't seen
          if (linkUrl.hostname === new URL(baseUrl).hostname && 
              !processedUrls.has(linkUrl.href) &&
              linkUrl.href !== folderUrl &&
              linkUrl.href !== baseUrl) {
            
            // Check if this looks like a content page within the folder
            const isContentInFolder = linkUrl.pathname.startsWith(new URL(folderUrl).pathname) &&
              (linkUrl.pathname.endsWith('.html') || 
               !linkUrl.pathname.includes('.') ||
               this.isLikelyContentPage(linkUrl.pathname));
            
            if (isContentInFolder) {
              processedUrls.add(linkUrl.href);
              
              // Create proper nested path structure
              const pathParts = linkUrl.pathname.split('/').filter(p => p);
              let pageName: string;
              
              if (pathParts.length <= 1) {
                pageName = pathParts[0] ? `${pathParts[0]}.html` : 'page.html';
              } else {
                // Create nested structure like blog/post-title.html
                const fileName = pathParts[pathParts.length - 1];
                const dirPath = pathParts.slice(0, -1).join('/');
                pageName = fileName.endsWith('.html') ? 
                  `${dirPath}/${fileName}` : 
                  `${dirPath}/${fileName}.html`;
              }
              
              const title = folder$(link).text().trim() || 
                pathParts[pathParts.length - 1] || 'Untitled Page';
              
              newLinks.push({
                url: linkUrl.href,
                title: title,
                pageName: pageName,
                path: linkUrl.pathname
              });
            }
          }
        } catch (e) {
          // Invalid URL, skip
        }
      });
      
      console.log(`Found ${newLinks.length} additional pages in folder: ${folderUrl}`);
      pageUrls.push(...newLinks);
      
    } catch (error) {
      console.log(`Error exploring folder ${folderUrl}:`, error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
