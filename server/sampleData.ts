import { storage } from "./storage";

export async function createSampleData() {
  try {
    // Check if sample data already exists
    const existingConversions = await storage.getAllConversions();
    if (existingConversions.length > 0) {
      console.log("Sample data already exists");
      // Ensure extracted files exist for the first conversion
      const firstConversion = existingConversions[0];
      const extractPath = `temp/extracted/${firstConversion.id}`;
      const { default: fs } = await import('fs-extra');
      
      if (!await fs.pathExists(extractPath)) {
        console.log(`Creating extracted files for ${firstConversion.id}`);
        await fs.ensureDir(extractPath);
        await fs.copy('temp/sample-site', extractPath);
      }
      return;
    }

    // Create a sample conversion
    const sampleConversion = await storage.createConversion({
      name: "sample-site.zip",
      type: "file",
      sourceUrl: null,
    });

    // Update the conversion with sample preview data
    await storage.updateConversion(sampleConversion.id, {
      status: "completed",
      progress: 100,
      previewData: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Website - HTML to WordPress Conversion</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand">
                <h1>Sample Website</h1>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="hero-content">
                <h2>Welcome to Our Sample Website</h2>
                <p>This is a demonstration site that will be converted to a WordPress theme.</p>
                <button class="cta-button">Learn More</button>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>We create amazing websites that work beautifully across all devices.</p>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Sample Website. All rights reserved.</p>
        </div>
    </footer>

    <script src="js/script.js"></script>
</body>
</html>`,
        title: "Sample Website",
        analysis: {
          pagesFound: 1,
          blogPages: 0,
          formsFound: 0,
          hasNavigation: true,
          assetsFound: 2
        }
      },
      analysisReport: {
        pages: [
          {
            title: "Sample Website",
            url: "index.html",
            content: "Home page with hero section, about section, and services"
          }
        ],
        forms: [],
        navigation: {
          type: "horizontal",
          items: ["Home", "About", "Services", "Contact"]
        },
        assets: {
          css: ["css/style.css"],
          js: ["js/script.js"],
          images: []
        },
        blogPages: []
      },
      completedAt: new Date(),
    });

    // Create a sample file entry
    await storage.createFile({
      conversionId: sampleConversion.id,
      filename: "sample-site.zip",
      originalName: "sample-site.zip",
      mimetype: "application/zip",
      size: 5000,
      path: "temp/sample-site.zip",
    });

    // Manually set the conversion ID to match our extracted files
    const fixedId = "sample-conversion-123";
    
    // Create another conversion with the fixed ID structure
    const fixedConversion = await storage.createConversion({
      name: "sample-website.zip",
      type: "file", 
      sourceUrl: null,
    });

    // Update with the fixed ID by replacing in storage
    const memStorage = storage as any;
    memStorage.conversions.delete(fixedConversion.id);
    const updatedConversion = {
      ...fixedConversion,
      id: fixedId,
      status: "completed",
      progress: 100,
      previewData: {
        title: "Sample Website",
        analysis: {
          pagesFound: 1,
          blogPages: 0,
          formsFound: 0,
          hasNavigation: true,
          assetsFound: 2
        }
      },
      completedAt: new Date(),
    };
    memStorage.conversions.set(fixedId, updatedConversion);

    // Create corresponding file
    await storage.createFile({
      conversionId: fixedId,
      filename: "sample-website.zip",
      originalName: "sample-website.zip", 
      mimetype: "application/zip",
      size: 5000,
      path: "temp/sample-site.zip",
    });

    // Create alight-motion website sample data
    const alightMotionId = "1d1a60ae-5361-4cb7-bdbd-7f8892028752";
    const alightMotionConversion = {
      name: "alight-motion-website-2.zip",
      type: "file" as const,
      sourceUrl: null,
      id: alightMotionId,
      status: "completed" as const,
      progress: 100,
      errorMessage: null,
      downloadUrl: null,
      originalFiles: null,
      previewData: {
        title: "AlightMotion Premium APK",
        analysis: {
          pagesFound: 5,
          blogPages: 10,
          formsFound: 0,
          hasNavigation: true,
          assetsFound: 25
        }
      },
      analysisReport: {
        pages: [
          { title: "AlightMotion Premium APK", url: "index.html", content: "Homepage with hero section and features" },
          { title: "Blog", url: "blog.html", content: "Blog listing page with multiple articles" },
          { title: "DMCA", url: "dmca.html", content: "DMCA policy page" },
          { title: "Privacy Policy", url: "privacy-policy.html", content: "Privacy policy page" },
          { title: "Terms of Service", url: "terms-of-service.html", content: "Terms of service page" }
        ],
        forms: [],
        navigation: {
          type: "horizontal",
          items: ["Home", "About", "Features", "Download", "Blog"]
        },
        assets: {
          css: ["styles.css"],
          js: ["script.js"],
          images: ["images/Logo.webp", "images/Alightmotion-Hero-image.webp"]
        },
        blogPages: []
      },
      diagnosticsReport: null,
      createdAt: new Date(),
      completedAt: new Date()
    };

    // Add to memory storage directly
    (storage as any).conversions.set(alightMotionId, alightMotionConversion);

    // Create corresponding file for alight-motion
    await storage.createFile({
      conversionId: alightMotionId,
      filename: "alight-motion-website-2.zip",
      originalName: "alight-motion-website-2.zip", 
      mimetype: "application/zip",
      size: 50000,
      path: "temp/alight-motion-website-2.zip",
    });

    console.log("Sample data created successfully!");
    console.log(`Sample conversion ID: ${fixedId}`);
    console.log(`Alight Motion conversion ID: ${alightMotionId}`);
    
    // Ensure extracted files exist for all conversions
    import('fs-extra').then(async (fs) => {
      const allConversions = await storage.getAllConversions();
      for (const conversion of allConversions) {
        const extractPath = `temp/extracted/${conversion.id}`;
        if (!await fs.pathExists(extractPath)) {
          console.log(`Creating extracted files for ${conversion.id}`);
          await fs.ensureDir(extractPath);
          if (conversion.id === alightMotionId) {
            // Check if alight-motion files exist and copy them
            const existingAlightPath = "temp/extracted/1d1a60ae-5361-4cb7-bdbd-7f8892028752";
            if (await fs.pathExists(existingAlightPath)) {
              await fs.copy(existingAlightPath, extractPath);
            }
          } else {
            await fs.copy('temp/sample-site', extractPath);
          }
        }
      }
    });
    
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
}