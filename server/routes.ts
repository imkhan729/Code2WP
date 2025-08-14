import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload } from "./services/fileUpload";
import { HtmlParser } from "./services/htmlParser";
import { AdvancedWordPressGenerator } from "./services/advancedWordPressGenerator";
import { insertConversionSchema } from "@shared/schema";
import fs from "fs-extra";
import path from "path";
import JSZip from "jszip";

// Extend Express Request type to include multer file
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const htmlParser = new HtmlParser();
  const wpGenerator = new AdvancedWordPressGenerator();

  // Helper function to find all HTML pages in extracted directory
  async function findAllHtmlPages(extractPath: string): Promise<string[]> {
    const htmlPages: string[] = [];
    
    const findHtmlFiles = async (dir: string): Promise<void> => {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            await findHtmlFiles(fullPath);
          } else if (entry.name.toLowerCase().endsWith('.html')) {
            const relativePath = path.relative(extractPath, fullPath);
            const pageName = path.basename(entry.name, '.html');
            htmlPages.push(pageName);
          }
        }
      } catch (error) {
        // Directory doesn't exist or can't be read
      }
    };
    
    await findHtmlFiles(extractPath);
    return Array.from(new Set(htmlPages)); // Remove duplicates
  }

  // Helper function to extract ZIP files for preview system
  async function extractZipForPreview(conversionId: string, zipPath: string) {
    try {
      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversionId);
      await fs.ensureDir(extractPath);
      
      const zipData = await fs.readFile(zipPath);
      const zip = await JSZip.loadAsync(zipData);
      
      // Extract all files
      for (const [filePath, file] of Object.entries(zip.files)) {
        if (!file.dir) {
          const fullPath = path.join(extractPath, filePath);
          await fs.ensureDir(path.dirname(fullPath));
          
          if (filePath.match(/\.(html|css|js|txt|json|xml)$/i)) {
            // Text files
            const content = await file.async('text');
            await fs.writeFile(fullPath, content);
          } else {
            // Binary files (images, fonts, etc.)
            const content = await file.async('nodebuffer');
            await fs.writeFile(fullPath, content);
          }
        }
      }
      
      console.log(`Extracted ZIP to: ${extractPath}`);
    } catch (error) {
      console.error('Error extracting ZIP for preview:', error);
      throw error;
    }
  }

  // Get all conversions
  app.get("/api/conversions", async (req, res) => {
    try {
      const conversions = await storage.getAllConversions();
      res.json(conversions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversions" });
    }
  });

  // Get single conversion
  app.get("/api/conversions/:id", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }
      res.json(conversion);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversion" });
    }
  });

  // Get all available pages for a conversion
  app.get("/api/conversions/:id/pages", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      const allPages = await findAllHtmlPages(extractPath);
      
      res.json({ 
        pages: allPages.map(page => ({
          name: page,
          url: `/api/conversions/${conversion.id}/${page}.html`,
          title: page.charAt(0).toUpperCase() + page.slice(1).replace(/[-_]/g, ' ')
        }))
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  // Create conversion from file upload
  app.post("/api/conversions/upload", upload.single('file'), async (req: RequestWithFile, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const conversion = await storage.createConversion({
        name: req.file.originalname,
        type: "file",
        sourceUrl: null,
      });

      // Store file information
      await storage.createFile({
        conversionId: conversion.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      });

      // Start processing in background
      processConversion(conversion.id, req.file.path, 'file');

      res.json(conversion);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: "Failed to create conversion" });
    }
  });

  // Create conversion from URL
  app.post("/api/conversions/url", async (req, res) => {
    try {
      const { sourceUrl } = req.body;
      
      if (!sourceUrl) {
        return res.status(400).json({ message: "URL is required" });
      }

      // Basic URL validation
      try {
        new URL(sourceUrl);
      } catch {
        return res.status(400).json({ message: "Invalid URL format" });
      }

      const conversion = await storage.createConversion({
        name: new URL(sourceUrl).hostname,
        type: "url",
        sourceUrl,
      });

      // Start processing in background
      processConversion(conversion.id, sourceUrl, 'url');

      res.json(conversion);
    } catch (error) {
      res.status(500).json({ message: "Failed to create conversion" });
    }
  });

  // Download converted theme
  app.get("/api/conversions/:id/download", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      if (conversion.status !== "completed" || !conversion.downloadUrl) {
        return res.status(400).json({ message: "Conversion not ready for download" });
      }

      const filePath = conversion.downloadUrl;
      if (!await fs.pathExists(filePath)) {
        return res.status(404).json({ message: "File not found" });
      }

      const fileName = `${conversion.name.replace(/\.[^/.]+$/, "")}-wordpress-theme.zip`;
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/zip');
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json({ message: "Failed to download file" });
    }
  });

  // Live preview of converted website - serves directly from extracted files
  app.get("/api/conversions/:id/preview", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      // For URL conversions, we don't have uploaded files, only extracted content
      // For file conversions, we check for uploaded files
      if (conversion.type === 'file') {
        const files = await storage.getFilesByConversionId(conversion.id);
        const file = files[0];
        
        if (!file) {
          return res.status(404).json({ message: "Original files not found" });
        }
      }

      // Look for the main index.html file in the extracted directory
      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      
      // Find potential index files
      const findHtmlFiles = async (dir: string): Promise<string[]> => {
        const results: string[] = [];
        try {
          const entries = await fs.readdir(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              const subResults = await findHtmlFiles(fullPath);
              results.push(...subResults);
            } else if (entry.name.toLowerCase().endsWith('.html')) {
              results.push(fullPath);
            }
          }
        } catch (error) {
          // Directory might not exist
        }
        return results;
      };

      const htmlFiles = await findHtmlFiles(extractPath);
      
      // Prioritize index.html files
      let selectedFile = htmlFiles.find(f => path.basename(f).toLowerCase() === 'index.html');
      
      if (!selectedFile) {
        // Look for other main page candidates
        selectedFile = htmlFiles.find(f => {
          const basename = path.basename(f).toLowerCase();
          return basename.includes('index') || basename.includes('home') || basename.includes('main');
        });
      }
      
      if (!selectedFile && htmlFiles.length > 0) {
        // Find the largest HTML file as fallback
        let largest = htmlFiles[0];
        let largestSize = 0;
        
        for (const htmlFile of htmlFiles) {
          try {
            const stat = await fs.stat(htmlFile);
            if (stat.size > largestSize) {
              largest = htmlFile;
              largestSize = stat.size;
            }
          } catch (error) {
            // Skip files that can't be read
          }
        }
        selectedFile = largest;
      }

      if (!selectedFile || !await fs.pathExists(selectedFile)) {
        return res.status(404).send(`
          <html>
            <body>
              <h1>No Preview Available</h1>
              <p>No suitable HTML file found in the uploaded ZIP.</p>
              <p>Found files: ${htmlFiles.map(f => path.basename(f)).join(', ')}</p>
            </body>
          </html>
        `);
      }

      // Read and serve the HTML file
      let htmlContent = await fs.readFile(selectedFile, 'utf-8');
      
      // Check if it's a redirect page and try to find a better one
      if (htmlContent.includes('meta http-equiv="refresh"') || htmlContent.includes('window.location.href')) {
        const nonRedirectFiles = [];
        for (const htmlFile of htmlFiles) {
          try {
            const content = await fs.readFile(htmlFile, 'utf-8');
            if (!content.includes('meta http-equiv="refresh"') && !content.includes('window.location.href') && content.length > 1000) {
              nonRedirectFiles.push({ file: htmlFile, content, size: content.length });
            }
          } catch (error) {
            // Skip files that can't be read
          }
        }
        
        if (nonRedirectFiles.length > 0) {
          // Use the largest non-redirect file
          const bestFile = nonRedirectFiles.sort((a, b) => b.size - a.size)[0];
          selectedFile = bestFile.file;
          htmlContent = bestFile.content;
        }
      }

      // Get the relative path from extract directory to make asset URLs work
      const relativePath = path.relative(extractPath, selectedFile);
      const basePath = path.dirname(relativePath);
      
      // Inject asset proxy URLs to serve CSS, JS, and images from the original files
      htmlContent = htmlContent.replace(
        /(href|src)=["']([^"']*\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp))["']/gi,
        (match, attr, assetPath) => {
          // Handle relative paths
          let fullAssetPath = assetPath;
          if (!assetPath.startsWith('http') && !assetPath.startsWith('/')) {
            fullAssetPath = basePath ? `${basePath}/${assetPath}` : assetPath;
          }
          return `${attr}="/api/conversions/${conversion.id}/assets/${fullAssetPath}"`;
        }
      );

      // Enhanced rewriting for all types of internal links
      htmlContent = htmlContent.replace(
        /href=["']([^"']+)["']/gi,
        (match, linkPath) => {
          // Skip external links (http/https) and fragments (#)
          if (linkPath.startsWith('http') || linkPath.startsWith('mailto:') || linkPath.startsWith('tel:')) {
            return match;
          }
          
          // Handle fragment links (#about, #features, etc.) - keep them as is for same-page navigation
          if (linkPath.startsWith('#')) {
            return match;
          }
          
          // Handle .html files - convert to clean URLs
          if (linkPath.endsWith('.html')) {
            const pageName = path.basename(linkPath, '.html');
            return `href="/api/conversions/${conversion.id}/${pageName}"`;
          }
          
          // Handle common navigation paths like /, /blog, /about, etc.
          if (linkPath === '/' || linkPath === '/index' || linkPath === '/home') {
            return `href="/api/conversions/${conversion.id}/preview"`;
          }
          
          // Handle other absolute paths by trying to map them to clean URLs
          if (linkPath.startsWith('/')) {
            const cleanPath = linkPath.slice(1); // Remove leading slash
            if (cleanPath && !cleanPath.includes('.')) {
              return `href="/api/conversions/${conversion.id}/${cleanPath}"`;
            }
          }
          
          // Handle relative paths that might be pages
          if (!linkPath.includes('.') && !linkPath.includes('/') && linkPath.length > 0) {
            return `href="/api/conversions/${conversion.id}/${linkPath}"`;
          }
          
          return match;
        }
      );

      console.log(`Serving preview: ${path.basename(selectedFile)} (${htmlContent.length} chars)`);

      // Set appropriate headers
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.send(htmlContent);
    } catch (error) {
      console.error('Preview error:', error);
      res.status(500).send(`
        <html>
          <body>
            <h1>Preview Error</h1>
            <p>Failed to load preview: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </body>
        </html>
      `);
    }
  });

  // Enhanced route to handle clean URLs (without .html extension)
  app.get("/api/conversions/:id/:page", async (req, res) => {
    const pageName = req.params.page;
    
    // Skip if it's an asset request (has file extension) or special endpoints
    if (pageName.includes('.') || pageName === 'assets' || pageName === 'pages' || pageName === 'preview') {
      return res.status(404).send('Page not found');
    }
    
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      
      // Try to find the HTML file with this name
      const findHtmlFileByName = async (dir: string, targetName: string): Promise<string | null> => {
        try {
          const entries = await fs.readdir(dir, { withFileTypes: true });
          
          // First check for exact matches
          for (const entry of entries) {
            if (!entry.isDirectory()) {
              const nameWithoutExt = path.basename(entry.name, path.extname(entry.name));
              if (nameWithoutExt.toLowerCase() === targetName.toLowerCase() && entry.name.toLowerCase().endsWith('.html')) {
                return path.join(dir, entry.name);
              }
            }
          }
          
          // Then recursively search subdirectories
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const fullPath = path.join(dir, entry.name);
              const result = await findHtmlFileByName(fullPath, targetName);
              if (result) return result;
            }
          }
        } catch (error) {
          // Directory doesn't exist or can't be read
        }
        return null;
      };

      const htmlFilePath = await findHtmlFileByName(extractPath, pageName);
      
      if (!htmlFilePath || !await fs.pathExists(htmlFilePath)) {
        return res.status(404).send(`
          <html>
            <body>
              <h1>Page Not Found</h1>
              <p>The requested page "${pageName}" was not found in the converted website.</p>
              <p><a href="/api/conversions/${conversion.id}/preview">Return to home</a></p>
            </body>
          </html>
        `);
      }

      // Read and serve the HTML file
      let htmlContent = await fs.readFile(htmlFilePath, 'utf-8');
      
      // Get the relative path for asset URL rewriting
      const relativePath = path.relative(extractPath, htmlFilePath);
      const basePath = path.dirname(relativePath);
      
      // Rewrite asset URLs to use the conversion API
      htmlContent = htmlContent.replace(
        /(href|src)=["']([^"']*\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp))["']/gi,
        (match, attr, assetPath) => {
          let fullAssetPath = assetPath;
          if (!assetPath.startsWith('http') && !assetPath.startsWith('/')) {
            fullAssetPath = basePath ? `${basePath}/${assetPath}` : assetPath;
          }
          return `${attr}="/api/conversions/${conversion.id}/assets/${fullAssetPath}"`;
        }
      );

      // Enhanced rewriting for all types of internal links
      htmlContent = htmlContent.replace(
        /href=["']([^"']+)["']/gi,
        (match, linkPath) => {
          // Skip external links (http/https) and fragments (#)
          if (linkPath.startsWith('http') || linkPath.startsWith('mailto:') || linkPath.startsWith('tel:')) {
            return match;
          }
          
          // Handle fragment links (#about, #features, etc.) - keep them as is for same-page navigation
          if (linkPath.startsWith('#')) {
            return match;
          }
          
          // Handle .html files - convert to clean URLs
          if (linkPath.endsWith('.html')) {
            const pageName = path.basename(linkPath, '.html');
            return `href="/api/conversions/${conversion.id}/${pageName}"`;
          }
          
          // Handle common navigation paths like /, /blog, /about, etc.
          if (linkPath === '/' || linkPath === '/index' || linkPath === '/home') {
            return `href="/api/conversions/${conversion.id}/preview"`;
          }
          
          // Handle other absolute paths by trying to map them to clean URLs
          if (linkPath.startsWith('/')) {
            const cleanPath = linkPath.slice(1); // Remove leading slash
            if (cleanPath && !cleanPath.includes('.')) {
              return `href="/api/conversions/${conversion.id}/${cleanPath}"`;
            }
          }
          
          // Handle relative paths that might be pages
          if (!linkPath.includes('.') && !linkPath.includes('/') && linkPath.length > 0) {
            return `href="/api/conversions/${conversion.id}/${linkPath}"`;
          }
          
          return match;
        }
      );

      console.log(`Serving page: ${pageName} from ${path.basename(htmlFilePath)}`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.send(htmlContent);
    } catch (error) {
      console.error(`Error serving page ${pageName}:`, error);
      res.status(500).send(`
        <html>
          <body>
            <h1>Page Error</h1>
            <p>Failed to load the page: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </body>
        </html>
      `);
    }
  });

  // Enhanced route to handle nested paths (like /blog/post-name)
  app.get("/api/conversions/:id/*", async (req, res, next) => {
    const fullPath = (req.params as any)[0]; // Get the wildcard part
    
    // Skip if it's an asset request or special endpoints - let them pass to specific routes
    if (fullPath.includes('.') || fullPath.startsWith('assets/') || fullPath === 'pages' || fullPath === 'preview') {
      return next(); // Pass to next route instead of 404
    }
    
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      
      // Function to recursively find HTML files by path
      const findHtmlFileByPath = async (dir: string, targetPath: string): Promise<string | null> => {
        try {
          const entries = await fs.readdir(dir, { withFileTypes: true });
          
          // Try exact path match first (with .html extension)
          const exactFile = path.join(dir, targetPath + '.html');
          if (await fs.pathExists(exactFile)) {
            return exactFile;
          }
          
          // Try to find the file in subdirectories that match the path structure
          const pathParts = targetPath.split('/');
          let currentDir = dir;
          
          // Navigate through path parts
          for (let i = 0; i < pathParts.length - 1; i++) {
            const partDir = path.join(currentDir, pathParts[i]);
            if (await fs.pathExists(partDir)) {
              const stat = await fs.stat(partDir);
              if (stat.isDirectory()) {
                currentDir = partDir;
              } else {
                break;
              }
            } else {
              break;
            }
          }
          
          // Look for the final file
          const finalFileName = pathParts[pathParts.length - 1];
          const possibleFiles = [
            path.join(currentDir, finalFileName + '.html'),
            path.join(currentDir, finalFileName, 'index.html'),
            path.join(currentDir, 'index.html')
          ];
          
          for (const possibleFile of possibleFiles) {
            if (await fs.pathExists(possibleFile)) {
              return possibleFile;
            }
          }
          
          // Recursive search if direct path doesn't work
          const searchRecursively = async (searchDir: string): Promise<string | null> => {
            try {
              const entries = await fs.readdir(searchDir, { withFileTypes: true });
              
              // Check files in current directory
              for (const entry of entries) {
                if (!entry.isDirectory()) {
                  const nameWithoutExt = path.basename(entry.name, path.extname(entry.name));
                  if (nameWithoutExt.toLowerCase() === finalFileName.toLowerCase() && entry.name.toLowerCase().endsWith('.html')) {
                    return path.join(searchDir, entry.name);
                  }
                }
              }
              
              // Check subdirectories
              for (const entry of entries) {
                if (entry.isDirectory()) {
                  const fullPath = path.join(searchDir, entry.name);
                  const result = await searchRecursively(fullPath);
                  if (result) return result;
                }
              }
            } catch (error) {
              // Directory doesn't exist or can't be read
            }
            return null;
          };
          
          return await searchRecursively(dir);
        } catch (error) {
          // Directory doesn't exist or can't be read
        }
        return null;
      };

      const htmlFilePath = await findHtmlFileByPath(extractPath, fullPath);
      
      if (!htmlFilePath || !await fs.pathExists(htmlFilePath)) {
        return res.status(404).send(`
          <html>
            <body>
              <h1>Page Not Found</h1>
              <p>The requested page "${fullPath}" was not found in the converted website.</p>
              <p><a href="/api/conversions/${conversion.id}/preview">Return to home</a></p>
            </body>
          </html>
        `);
      }

      // Read and serve the HTML file
      let htmlContent = await fs.readFile(htmlFilePath, 'utf-8');
      
      // Enhanced asset URL rewriting for universal website support
      htmlContent = htmlContent.replace(
        /(href|src)=["']([^"']*\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp))["']/gi,
        (match, attr, assetPath) => {
          // Skip external URLs
          if (assetPath.startsWith('http') || assetPath.startsWith('//')) {
            return match;
          }
          
          // Skip already converted API paths to avoid double conversion
          if (assetPath.includes('/api/conversions/')) {
            return match;
          }
          
          let finalAssetPath = assetPath;
          
          // Universal asset path resolution for all website types
          if (assetPath.startsWith('/')) {
            // Absolute paths - remove leading slash for our API
            finalAssetPath = assetPath.substring(1);
          } else if (assetPath.startsWith('../')) {
            // Relative paths going up directories - resolve to root level
            let resolvedPath = assetPath;
            while (resolvedPath.startsWith('../')) {
              resolvedPath = resolvedPath.substring(3);
            }
            finalAssetPath = resolvedPath;
          } else {
            // Relative paths - for nested pages, assume assets are at root level
            // This handles the common case where CSS/JS is at the root but referenced from nested pages
            finalAssetPath = assetPath;
          }
          
          console.log(`Asset rewrite: ${assetPath} -> ${finalAssetPath} (from nested page: ${fullPath})`);
          return `${attr}="/api/conversions/${conversion.id}/assets/${finalAssetPath}"`;
        }
      );

      // Enhanced rewriting for all types of internal links (but skip assets which were already handled)
      htmlContent = htmlContent.replace(
        /href=["']([^"']+)["']/gi,
        (match, linkPath) => {
          // Skip external links (http/https) and fragments (#)
          if (linkPath.startsWith('http') || linkPath.startsWith('mailto:') || linkPath.startsWith('tel:')) {
            return match;
          }
          
          // Skip already converted API paths to avoid double conversion
          if (linkPath.includes('/api/conversions/')) {
            return match;
          }
          
          // Skip asset files (CSS, JS, images) as they were already processed above
          if (linkPath.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp)$/i)) {
            return match;
          }
          
          // Handle fragment links (#about, #features, etc.) - keep them as is for same-page navigation
          if (linkPath.startsWith('#')) {
            return match;
          }
          
          // Handle .html files - convert to clean URLs
          if (linkPath.endsWith('.html')) {
            const cleanPath = linkPath.slice(0, -5); // Remove .html
            return `href="/api/conversions/${conversion.id}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}"`;
          }
          
          // Handle common navigation paths like /, /blog, /about, etc.
          if (linkPath === '/' || linkPath === '/index' || linkPath === '/home') {
            return `href="/api/conversions/${conversion.id}/preview"`;
          }
          
          // Handle other absolute paths by trying to map them to clean URLs
          if (linkPath.startsWith('/')) {
            return `href="/api/conversions/${conversion.id}${linkPath}"`;
          }
          
          // Handle relative paths that might be pages
          if (!linkPath.includes('.') && linkPath.length > 0) {
            return `href="/api/conversions/${conversion.id}/${linkPath}"`;
          }
          
          return match;
        }
      );

      console.log(`Serving nested page: ${fullPath} from ${path.basename(htmlFilePath)}`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.send(htmlContent);
    } catch (error) {
      console.error(`Error serving nested page ${fullPath}:`, error);
      res.status(500).send(`
        <html>
          <body>
            <h1>Page Error</h1>
            <p>Failed to load the page: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </body>
        </html>
      `);
    }
  });

  // Get original files for preview (CSS, JS, images) - MUST come before wildcard HTML route
  app.get("/api/conversions/:id/assets/*", async (req, res) => {
    const assetPath = (req.params as any)[0]; // Get the wildcard part
    console.log(`=== ASSET REQUEST DEBUG ===`);
    console.log(`Conversion ID: ${req.params.id}`);
    console.log(`Asset Path: ${assetPath}`);
    
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        console.log(`Conversion not found for ID: ${req.params.id}`);
        return res.status(404).json({ message: "Conversion not found" });
      }
      console.log(`Conversion found: ${conversion.name}`);

      const files = await storage.getFilesByConversionId(conversion.id);
      console.log(`Files found: ${files.length}`);
      const file = files[0]; // Get the main uploaded file

      if (!file) {
        console.log(`No files found for conversion: ${conversion.id}`);
        return res.status(404).json({ message: "Original files not found" });
      }
      console.log(`Using file: ${file.filename}`);
      
      console.log(`Searching for asset at: ${assetPath}`);

      // Extract and serve assets from the original ZIP
      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      console.log(`Extract path: ${extractPath}`);
      let fullAssetPath = path.join(extractPath, assetPath);

      // Try different possible paths if the direct path doesn't exist
      if (!await fs.pathExists(fullAssetPath)) {
        console.log(`Asset not found at direct path: ${fullAssetPath}, searching recursively...`);
        
        // Recursively search for the asset in the entire extracted directory
        const findAssetRecursively = async (dir: string, targetFile: string): Promise<string | null> => {
          try {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            const targetFileName = path.basename(targetFile);
            
            // First, check if the file exists in the current directory (exact match)
            for (const entry of entries) {
              if (!entry.isDirectory() && entry.name === targetFileName) {
                console.log(`Found exact match: ${path.join(dir, entry.name)}`);
                return path.join(dir, entry.name);
              }
            }
            
            // Then check case-insensitive match
            for (const entry of entries) {
              if (!entry.isDirectory() && entry.name.toLowerCase() === targetFileName.toLowerCase()) {
                console.log(`Found case-insensitive match: ${path.join(dir, entry.name)}`);
                return path.join(dir, entry.name);
              }
            }
            
            // Then recursively search subdirectories
            for (const entry of entries) {
              if (entry.isDirectory()) {
                const fullPath = path.join(dir, entry.name);
                const result = await findAssetRecursively(fullPath, targetFile);
                if (result) return result;
              }
            }
          } catch (error) {
            console.log(`Error searching directory ${dir}:`, error);
          }
          return null;
        };

        console.log(`Searching for asset: ${assetPath} in ${extractPath}`);
        const foundAsset = await findAssetRecursively(extractPath, assetPath);
        if (foundAsset) {
          console.log(`Found asset via recursive search: ${foundAsset}`);
          fullAssetPath = foundAsset;
        } else {
          console.log(`Asset not found via recursive search, trying common paths...`);
          // Try looking in common subdirectories as fallback
          const possiblePaths = [
            path.join(extractPath, 'assets', assetPath),
            path.join(extractPath, 'css', assetPath),
            path.join(extractPath, 'js', assetPath),
            path.join(extractPath, 'images', assetPath),
            path.join(extractPath, 'img', assetPath),
            path.join(extractPath, 'fonts', assetPath),
            path.join(extractPath, 'static', assetPath),
            path.join(extractPath, 'media', assetPath),
            path.join(extractPath, 'resources', assetPath),
            // Add nested directory patterns for this specific case
            ...await (async () => {
              try {
                const subDirs = await fs.readdir(extractPath, { withFileTypes: true });
                const nestedPaths = [];
                for (const subDir of subDirs) {
                  if (subDir.isDirectory()) {
                    nestedPaths.push(path.join(extractPath, subDir.name, assetPath));
                    // Check for double-nested directories (like alight-motion-website/alight-motion-website)
                    const nestedSubDirPath = path.join(extractPath, subDir.name);
                    try {
                      const nestedSubDirs = await fs.readdir(nestedSubDirPath, { withFileTypes: true });
                      for (const nestedSubDir of nestedSubDirs) {
                        if (nestedSubDir.isDirectory()) {
                          nestedPaths.push(path.join(extractPath, subDir.name, nestedSubDir.name, assetPath));
                        }
                      }
                    } catch {}
                  }
                }
                return nestedPaths;
              } catch {
                return [];
              }
            })()
          ];

          for (const possiblePath of possiblePaths) {
            console.log(`Checking possible path: ${possiblePath}`);
            if (await fs.pathExists(possiblePath)) {
              console.log(`Found asset at: ${possiblePath}`);
              fullAssetPath = possiblePath;
              break;
            }
          }
        }
      }

      if (await fs.pathExists(fullAssetPath)) {
        const stat = await fs.stat(fullAssetPath);
        if (stat.isFile()) {
          // Set appropriate content type based on file extension
          const ext = path.extname(assetPath).toLowerCase();
          const contentTypes: { [key: string]: string } = {
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.webp': 'image/webp'
          };

          if (contentTypes[ext]) {
            res.setHeader('Content-Type', contentTypes[ext]);
          }

          // Set cache headers for assets
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.sendFile(fullAssetPath);
        } else {
          res.status(404).send('Asset is a directory, not a file');
        }
      } else {
        res.status(404).send(`Asset not found: ${assetPath}`);
      }
    } catch (error) {
      console.error('Asset serving error:', error);
      res.status(500).send(`Failed to serve asset: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Enhanced route for serving any HTML page with better pattern matching
  app.get("/api/conversions/:id/*.html", async (req, res) => {
    const wildcard = (req.params as any)[0]; // Get the wildcard part
    const filename = wildcard + '.html';
    
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      
      // Find the HTML file in the extracted directory
      const findHtmlFile = async (dir: string, targetFile: string): Promise<string | null> => {
        try {
          const entries = await fs.readdir(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              const result = await findHtmlFile(fullPath, targetFile);
              if (result) return result;
            } else if (entry.name.toLowerCase() === targetFile.toLowerCase()) {
              return fullPath;
            }
          }
        } catch (error) {
          // Directory doesn't exist or can't be read
        }
        return null;
      };

      const htmlFilePath = await findHtmlFile(extractPath, filename);
      
      if (!htmlFilePath || !await fs.pathExists(htmlFilePath)) {
        return res.status(404).send(`
          <html>
            <body>
              <h1>Page Not Found</h1>
              <p>The requested page "${filename}" was not found in the converted website.</p>
            </body>
          </html>
        `);
      }

      // Read and serve the HTML file
      let htmlContent = await fs.readFile(htmlFilePath, 'utf-8');
      
      // Get the relative path for asset URL rewriting
      const relativePath = path.relative(extractPath, htmlFilePath);
      const basePath = path.dirname(relativePath);
      
      // Rewrite asset URLs to use the conversion API
      htmlContent = htmlContent.replace(
        /(href|src)=["']([^"']*\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp))["']/gi,
        (match, attr, assetPath) => {
          let fullAssetPath = assetPath;
          if (!assetPath.startsWith('http') && !assetPath.startsWith('/')) {
            fullAssetPath = basePath ? `${basePath}/${assetPath}` : assetPath;
          }
          return `${attr}="/api/conversions/${conversion.id}/assets/${fullAssetPath}"`;
        }
      );

      // Enhanced rewriting for all types of internal links (same as preview route)
      htmlContent = htmlContent.replace(
        /href=["']([^"']+)["']/gi,
        (match, linkPath) => {
          // Skip external links (http/https) and fragments (#)
          if (linkPath.startsWith('http') || linkPath.startsWith('mailto:') || linkPath.startsWith('tel:')) {
            return match;
          }
          
          // Handle fragment links (#about, #features, etc.) - keep them as is for same-page navigation
          if (linkPath.startsWith('#')) {
            return match;
          }
          
          // Handle .html files - convert to clean URLs
          if (linkPath.endsWith('.html')) {
            const pageName = path.basename(linkPath, '.html');
            return `href="/api/conversions/${conversion.id}/${pageName}"`;
          }
          
          // Handle common navigation paths like /, /blog, /about, etc.
          if (linkPath === '/' || linkPath === '/index' || linkPath === '/home') {
            return `href="/api/conversions/${conversion.id}/preview"`;
          }
          
          // Handle other absolute paths by trying to map them to clean URLs
          if (linkPath.startsWith('/')) {
            const cleanPath = linkPath.slice(1); // Remove leading slash
            if (cleanPath && !cleanPath.includes('.')) {
              return `href="/api/conversions/${conversion.id}/${cleanPath}"`;
            }
          }
          
          // Handle relative paths that might be pages
          if (!linkPath.includes('.') && !linkPath.includes('/') && linkPath.length > 0) {
            return `href="/api/conversions/${conversion.id}/${linkPath}"`;
          }
          
          return match;
        }
      );

      console.log(`Serving HTML page: ${filename} (${htmlContent.length} chars)`);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.send(htmlContent);
      
    } catch (error) {
      console.error('HTML page error:', error);
      res.status(500).send(`
        <html>
          <body>
            <h1>Page Error</h1>
            <p>Failed to load page: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </body>
        </html>
      `);
    }
  });

  // Background processing function
  async function processConversion(conversionId: string, source: string, type: 'file' | 'url') {
    try {
      // Update status to processing
      await storage.updateConversion(conversionId, { 
        status: "processing", 
        progress: 10 
      });

      let parsedWebsite;
      
      if (type === 'file') {
        // Extract ZIP file for preview system
        await storage.updateConversion(conversionId, { progress: 20 });
        await extractZipForPreview(conversionId, source);
        
        // Parse ZIP file
        await storage.updateConversion(conversionId, { progress: 30 });
        parsedWebsite = await htmlParser.parseFromZip(source);
      } else {
        // Parse URL - create a simulated ZIP-like structure for consistency
        await storage.updateConversion(conversionId, { progress: 30 });
        parsedWebsite = await htmlParser.parseFromUrl(source);
        
        // Create a preview structure for URL-based conversions
        const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversionId);
        await fs.ensureDir(extractPath);
        
        // Save the main HTML content for preview
        await fs.writeFile(path.join(extractPath, 'index.html'), parsedWebsite.html);
        
        // Save additional pages if found
        if (parsedWebsite.analysis && parsedWebsite.analysis.pages) {
          for (const page of parsedWebsite.analysis.pages) {
            if (page.content && page.filename !== 'index.html') {
              await fs.writeFile(path.join(extractPath, page.filename), page.content);
            }
          }
        }
      }

      // Find all HTML pages for navigation
      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversionId);
      const allHtmlPages = await findAllHtmlPages(extractPath);

      // Update progress with analysis
      await storage.updateConversion(conversionId, { 
        progress: 60,
        analysisReport: parsedWebsite.analysis,
        previewData: {
          html: parsedWebsite.html, // Store full HTML content for preview
          title: parsedWebsite.structure.title,
          analysis: {
            pagesFound: parsedWebsite.analysis.pages.length,
            blogPages: parsedWebsite.analysis.blogPages.length,
            formsFound: parsedWebsite.analysis.forms.length,
            hasNavigation: parsedWebsite.analysis.navigation !== null,
            assetsFound: Object.values(parsedWebsite.analysis.assets).flat().length
          },
          allPages: allHtmlPages // Add list of all available pages
        }
      });

      // Generate WordPress theme
      const themeName = parsedWebsite.analysis.pages[0]?.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || `converted-theme-${conversionId}`;
      const themeResult = await wpGenerator.generateTheme(parsedWebsite, themeName);

      // Save generated theme
      const outputDir = path.join(process.cwd(), 'generated-themes');
      await fs.ensureDir(outputDir);
      const outputPath = path.join(outputDir, `${themeName}.zip`);
      await fs.writeFile(outputPath, themeResult.zip);

      // Update conversion with success and diagnostics
      await storage.updateConversion(conversionId, {
        status: "completed",
        progress: 100,
        downloadUrl: outputPath,
        diagnosticsReport: themeResult.diagnostics,
        completedAt: new Date(),
      });

    } catch (error) {
      console.error(`Conversion ${conversionId} failed:`, error);
      // Update conversion with error
      await storage.updateConversion(conversionId, {
        status: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}
