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
    
    // First pass: inventory all files
    const inventory = await this.inventoryZipFiles(zip);
    
    // Create comprehensive analysis
    const analysis = await this.analyzeWebsite(zip, inventory);
    
    // Find main HTML content (prefer index.html)
    const mainHtmlFile = this.findMainHtmlFile(inventory.pages);
    const htmlContent = await zip.files[mainHtmlFile].async('text');
    
    // Extract all CSS and JS content
    const cssFiles: string[] = [];
    const jsFiles: string[] = [];
    
    for (const cssFile of inventory.css) {
      const content = await zip.files[cssFile].async('text');
      cssFiles.push(content);
    }
    
    for (const jsFile of inventory.js) {
      const content = await zip.files[jsFile].async('text');
      jsFiles.push(content);
    }
    
    return {
      html: htmlContent,
      css: cssFiles,
      js: jsFiles,
      assets: inventory.assets,
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
    
    $('a[href]').each((_, link) => {
      const href = $(link).attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        links.push(href);
      }
    });

    return links;
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
      
      // Create a simplified analysis for URL-based parsing
      const $ = cheerio.load(htmlContent);
      const cssFiles: string[] = [];
      const jsFiles: string[] = [];
      const assets: string[] = [];

      // Get inline styles
      $('style').each((_, el) => {
        cssFiles.push($(el).html() || '');
      });
      
      // Get inline scripts
      $('script').each((_, el) => {
        const src = $(el).attr('src');
        if (!src && $(el).html()) {
          jsFiles.push($(el).html() || '');
        } else if (src) {
          try {
            const jsUrl = new URL(src, url).toString();
            assets.push(jsUrl);
          } catch (e) {
            // Invalid URL, skip
          }
        }
      });

      // Create simplified analysis for URL parsing
      const analysis: AnalysisReport = {
        pages: [{
          filename: 'index.html',
          title: $('title').text() || 'Home',
          path: '/',
          content: htmlContent,
          isBlogLike: this.detectBlogLike($),
          links: []
        }],
        homepage: 'index.html',
        blogPages: [],
        assets: { images: [], fonts: [], videos: [], other: assets },
        css: [],
        scripts: [],
        forms: [],
        navigation: null,
        hazards: [],
        sitemap: {}
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
}
