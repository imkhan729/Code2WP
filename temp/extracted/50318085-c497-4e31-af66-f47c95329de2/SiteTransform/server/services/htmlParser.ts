import * as cheerio from 'cheerio';
import { parse as parseCSS } from 'css-tree';
import fs from 'fs-extra';
import path from 'path';
import JSZip from 'jszip';

export interface ParsedWebsite {
  html: string;
  css: string[];
  js: string[];
  assets: string[];
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
    
    let htmlContent = '';
    const cssFiles: string[] = [];
    const jsFiles: string[] = [];
    const assets: string[] = [];
    
    // Find the main HTML file
    const htmlFiles = Object.keys(zip.files).filter(filename => 
      filename.endsWith('.html') && !filename.includes('/')
    );
    
    if (htmlFiles.length === 0) {
      // Look for HTML files in subdirectories
      const allHtmlFiles = Object.keys(zip.files).filter(filename => filename.endsWith('.html'));
      if (allHtmlFiles.length > 0) {
        htmlContent = await zip.files[allHtmlFiles[0]].async('text');
      } else {
        throw new Error('No HTML files found in ZIP');
      }
    } else {
      // Prefer index.html if it exists
      const indexFile = htmlFiles.find(f => f.toLowerCase().includes('index'));
      const mainFile = indexFile || htmlFiles[0];
      htmlContent = await zip.files[mainFile].async('text');
    }
    
    // Extract CSS files
    for (const filename of Object.keys(zip.files)) {
      if (filename.endsWith('.css')) {
        const content = await zip.files[filename].async('text');
        cssFiles.push(content);
      } else if (filename.endsWith('.js')) {
        const content = await zip.files[filename].async('text');
        jsFiles.push(content);
      } else if (this.isAssetFile(filename)) {
        assets.push(filename);
      }
    }
    
    return this.parseHtmlStructure(htmlContent, cssFiles, jsFiles, assets);
  }
  
  async parseFromUrl(url: string): Promise<ParsedWebsite> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      
      const htmlContent = await response.text();
      const $ = cheerio.load(htmlContent);
      
      // Extract external CSS
      const cssFiles: string[] = [];
      const jsFiles: string[] = [];
      const assets: string[] = [];
      
      // Get inline styles
      $('style').each((_, el) => {
        cssFiles.push($(el).html() || '');
      });
      
      // Get external CSS
      $('link[rel="stylesheet"]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
          try {
            const cssUrl = new URL(href, url).toString();
            // Note: In a real implementation, you'd fetch these external resources
            assets.push(cssUrl);
          } catch (e) {
            // Invalid URL, skip
          }
        }
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
      
      return this.parseHtmlStructure(htmlContent, cssFiles, jsFiles, assets);
    } catch (error) {
      throw new Error(`Failed to parse URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private parseHtmlStructure(htmlContent: string, cssFiles: string[], jsFiles: string[], assets: string[]): ParsedWebsite {
    const $ = cheerio.load(htmlContent);
    
    // Extract metadata
    const title = $('title').text() || 'Converted WordPress Theme';
    const meta: Record<string, string> = {};
    
    $('meta').each((_, el) => {
      const name = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (name && content) {
        meta[name] = content;
      }
    });
    
    // Extract links and scripts
    const links: string[] = [];
    const scripts: string[] = [];
    
    $('link').each((_, el) => {
      const href = $(el).attr('href');
      if (href) links.push(href);
    });
    
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src');
      if (src) scripts.push(src);
    });
    
    return {
      html: htmlContent,
      css: cssFiles,
      js: jsFiles,
      assets,
      structure: {
        title,
        meta,
        links,
        scripts
      }
    };
  }
  
  private isAssetFile(filename: string): boolean {
    const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', 
                           '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm'];
    return assetExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  }
}
