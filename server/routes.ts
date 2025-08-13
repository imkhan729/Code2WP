import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload } from "./services/fileUpload";
import { HtmlParser } from "./services/htmlParser";
import { AdvancedWordPressGenerator } from "./services/advancedWordPressGenerator";
import { insertConversionSchema } from "@shared/schema";
import fs from "fs-extra";
import path from "path";

// Extend Express Request type to include multer file
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const htmlParser = new HtmlParser();
  const wpGenerator = new AdvancedWordPressGenerator();

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

      const files = await storage.getFilesByConversionId(conversion.id);
      const file = files[0];
      
      if (!file) {
        return res.status(404).json({ message: "Original files not found" });
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
        /(href|src)=["']([^"']*\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))["']/gi,
        (match, attr, assetPath) => {
          // Handle relative paths
          let fullAssetPath = assetPath;
          if (!assetPath.startsWith('http') && !assetPath.startsWith('/')) {
            fullAssetPath = basePath ? `${basePath}/${assetPath}` : assetPath;
          }
          return `${attr}="/api/conversions/${conversion.id}/assets/${fullAssetPath}"`;
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

  // Get original files for preview (CSS, JS, images)
  app.get("/api/conversions/:id/assets/*", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      const assetPath = req.params[0]; // Get the wildcard part
      const files = await storage.getFilesByConversionId(conversion.id);
      const file = files[0]; // Get the main uploaded file

      if (!file) {
        return res.status(404).json({ message: "Original files not found" });
      }

      // Extract and serve assets from the original ZIP
      const extractPath = path.join(process.cwd(), 'temp', 'extracted', conversion.id);
      let fullAssetPath = path.join(extractPath, assetPath);

      // Try different possible paths if the direct path doesn't exist
      if (!await fs.pathExists(fullAssetPath)) {
        // Try looking in common subdirectories
        const possiblePaths = [
          path.join(extractPath, 'assets', assetPath),
          path.join(extractPath, 'css', assetPath),
          path.join(extractPath, 'js', assetPath),
          path.join(extractPath, 'images', assetPath),
          path.join(extractPath, 'img', assetPath),
          path.join(extractPath, 'fonts', assetPath)
        ];

        for (const possiblePath of possiblePaths) {
          if (await fs.pathExists(possiblePath)) {
            fullAssetPath = possiblePath;
            break;
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
            '.eot': 'application/vnd.ms-fontobject'
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
        // Parse ZIP file
        await storage.updateConversion(conversionId, { progress: 30 });
        parsedWebsite = await htmlParser.parseFromZip(source);
      } else {
        // Parse URL
        await storage.updateConversion(conversionId, { progress: 30 });
        parsedWebsite = await htmlParser.parseFromUrl(source);
      }

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
          }
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
