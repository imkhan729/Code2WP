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

  // Live preview of converted website
  app.get("/api/conversions/:id/preview", async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      if (!conversion.previewData?.html) {
        return res.status(400).json({ message: "Preview not available yet" });
      }

      // Get the full HTML from analysis instead of truncated preview
      let fullHtml = conversion.previewData.html;
      
      // If we have analysis report, try to get the full HTML from the first page
      if (conversion.analysisReport?.pages?.length > 0) {
        const mainPage = conversion.analysisReport.pages.find((p: any) => 
          p.filename.includes('index') || p.filename.includes('home')
        ) || conversion.analysisReport.pages[0];
        
        if (mainPage?.content) {
          fullHtml = mainPage.content;
        }
      }

      // Inject asset proxy URLs to serve CSS, JS, and images from the original files
      fullHtml = fullHtml.replace(
        /(href|src)=["']([^"']*\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))["']/gi,
        `$1="/api/conversions/${conversion.id}/assets/$2"`
      );

      // Set appropriate headers
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.send(fullHtml);
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
          html: parsedWebsite.html.substring(0, 5000), // Store truncated HTML for preview
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
