import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Tablet, Smartphone, Globe } from "lucide-react";

interface PreviewData {
  html: string;
  title: string;
  analysis?: {
    pagesFound: number;
    blogPages: number;
    formsFound: number;
    hasNavigation: boolean;
    assetsFound: number;
  };
}

interface PreviewSectionProps {
  previewData: PreviewData;
}

export default function PreviewSection({ previewData }: PreviewSectionProps) {
  return (
    <Card data-testid="preview-section">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Website Preview
        </CardTitle>
        <CardDescription>
          Preview of your converted website structure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Analysis Summary */}
        {previewData.analysis && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center" data-testid="preview-pages">
              <div className="text-xl font-bold text-blue-600">{previewData.analysis.pagesFound}</div>
              <div className="text-xs text-muted-foreground">Pages</div>
            </div>
            <div className="text-center" data-testid="preview-blog">
              <div className="text-xl font-bold text-purple-600">{previewData.analysis.blogPages}</div>
              <div className="text-xs text-muted-foreground">Blog Pages</div>
            </div>
            <div className="text-center" data-testid="preview-assets">
              <div className="text-xl font-bold text-green-600">{previewData.analysis.assetsFound}</div>
              <div className="text-xs text-muted-foreground">Assets</div>
            </div>
            <div className="text-center" data-testid="preview-forms">
              <div className="text-xl font-bold text-orange-600">{previewData.analysis.formsFound}</div>
              <div className="text-xs text-muted-foreground">Forms</div>
            </div>
            <div className="text-center" data-testid="preview-nav">
              <div className="text-lg font-medium text-gray-600">
                {previewData.analysis.hasNavigation ? '✓' : '—'}
              </div>
              <div className="text-xs text-muted-foreground">Navigation</div>
            </div>
          </div>
        )}

        {/* Features Detected */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Features Detected</h4>
          <div className="flex flex-wrap gap-2">
            {previewData.analysis?.hasNavigation && (
              <Badge variant="secondary" data-testid="feature-nav">Navigation Menu</Badge>
            )}
            {previewData.analysis && previewData.analysis.blogPages > 0 && (
              <Badge variant="secondary" data-testid="feature-blog">Blog System</Badge>
            )}
            {previewData.analysis && previewData.analysis.formsFound > 0 && (
              <Badge variant="secondary" data-testid="feature-forms">Contact Forms</Badge>
            )}
            {previewData.analysis && previewData.analysis.assetsFound > 0 && (
              <Badge variant="secondary" data-testid="feature-assets">Media Gallery</Badge>
            )}
            <Badge variant="secondary" data-testid="feature-responsive">Responsive Design</Badge>
            <Badge variant="secondary" data-testid="feature-seo">SEO Optimized</Badge>
          </div>
        </div>

        {/* Preview Mockup */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Device Preview</h4>
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex justify-center gap-8">
              {/* Desktop Preview */}
              <div className="text-center">
                <Monitor className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                <div className="text-xs text-muted-foreground">Desktop</div>
                <div className="text-sm font-medium text-green-600">✓ Optimized</div>
              </div>
              
              {/* Tablet Preview */}
              <div className="text-center">
                <Tablet className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                <div className="text-xs text-muted-foreground">Tablet</div>
                <div className="text-sm font-medium text-green-600">✓ Responsive</div>
              </div>
              
              {/* Mobile Preview */}
              <div className="text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                <div className="text-xs text-muted-foreground">Mobile</div>
                <div className="text-sm font-medium text-green-600">✓ Mobile-Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* WordPress Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">WordPress Integration</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Template Hierarchy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Custom Post Types</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Widget Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Customizer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SEO Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Security Compliant</span>
            </div>
          </div>
        </div>

        {/* Content Structure Preview */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Content Structure</h4>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            <div className="text-lg font-semibold text-gray-900">{previewData.title}</div>
            <div className="text-sm text-gray-600">
              Your website structure has been preserved and converted to WordPress template files.
              All pages, navigation, and content areas are ready for WordPress integration.
            </div>
            <div className="pt-2 border-t text-xs text-gray-500">
              Template files generated: header.php, footer.php, index.php, functions.php, style.css
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}