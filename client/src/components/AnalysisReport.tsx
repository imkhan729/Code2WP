import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Code, 
  Image, 
  Navigation, 
  FormInput, 
  AlertTriangle,
  CheckCircle,
  Globe,
  Database
} from "lucide-react";

interface AnalysisData {
  pages: Array<{
    filename: string;
    title: string;
    isBlogLike: boolean;
  }>;
  blogPages: Array<any>;
  assets: {
    images: string[];
    fonts: string[];
    videos: string[];
    other: string[];
  };
  css: Array<any>;
  scripts: Array<any>;
  forms: Array<any>;
  navigation: any;
  hazards: string[];
}

interface AnalysisReportProps {
  analysis: AnalysisData;
}

export function AnalysisReport({ analysis }: AnalysisReportProps) {
  const totalAssets = Object.values(analysis.assets).flat().length;

  return (
    <div className="grid gap-4" data-testid="analysis-report">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Website Analysis Summary
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of your website structure and components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pages Analysis */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Pages Detected
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center" data-testid="pages-total">
                <div className="text-2xl font-bold text-blue-600">{analysis.pages.length}</div>
                <div className="text-xs text-muted-foreground">Total Pages</div>
              </div>
              <div className="text-center" data-testid="blog-pages">
                <div className="text-2xl font-bold text-purple-600">{analysis.blogPages.length}</div>
                <div className="text-xs text-muted-foreground">Blog Pages</div>
              </div>
              <div className="text-center" data-testid="static-pages">
                <div className="text-2xl font-bold text-green-600">
                  {analysis.pages.length - analysis.blogPages.length}
                </div>
                <div className="text-xs text-muted-foreground">Static Pages</div>
              </div>
              <div className="text-center" data-testid="homepage">
                <div className="text-lg font-medium text-gray-600">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                </div>
                <div className="text-xs text-muted-foreground">Homepage Found</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Assets Analysis */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Image className="w-4 h-4" />
              Assets Inventory
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center" data-testid="total-assets">
                <div className="text-2xl font-bold text-indigo-600">{totalAssets}</div>
                <div className="text-xs text-muted-foreground">Total Assets</div>
              </div>
              <div className="text-center" data-testid="images">
                <div className="text-xl font-bold text-pink-600">{analysis.assets.images.length}</div>
                <div className="text-xs text-muted-foreground">Images</div>
              </div>
              <div className="text-center" data-testid="fonts">
                <div className="text-xl font-bold text-orange-600">{analysis.assets.fonts.length}</div>
                <div className="text-xs text-muted-foreground">Fonts</div>
              </div>
              <div className="text-center" data-testid="videos">
                <div className="text-xl font-bold text-red-600">{analysis.assets.videos.length}</div>
                <div className="text-xs text-muted-foreground">Videos</div>
              </div>
              <div className="text-center" data-testid="other-assets">
                <div className="text-xl font-bold text-gray-600">{analysis.assets.other.length}</div>
                <div className="text-xs text-muted-foreground">Other</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Code Analysis */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code Structure
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center" data-testid="css-files">
                <div className="text-xl font-bold text-blue-600">{analysis.css.length}</div>
                <div className="text-xs text-muted-foreground">CSS Files</div>
              </div>
              <div className="text-center" data-testid="js-files">
                <div className="text-xl font-bold text-yellow-600">{analysis.scripts.length}</div>
                <div className="text-xs text-muted-foreground">JavaScript Files</div>
              </div>
              <div className="text-center" data-testid="forms">
                <div className="text-xl font-bold text-green-600">{analysis.forms.length}</div>
                <div className="text-xs text-muted-foreground">Forms</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Navigation and Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Features Detected</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.navigation && (
                <Badge variant="secondary" className="flex items-center gap-1" data-testid="nav-detected">
                  <Navigation className="w-3 h-3" />
                  Navigation Menu
                </Badge>
              )}
              {analysis.blogPages.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1" data-testid="blog-detected">
                  <FileText className="w-3 h-3" />
                  Blog System
                </Badge>
              )}
              {analysis.forms.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1" data-testid="forms-detected">
                  <FormInput className="w-3 h-3" />
                  Contact Forms
                </Badge>
              )}
              {analysis.assets.images.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1" data-testid="images-detected">
                  <Image className="w-3 h-3" />
                  Image Gallery
                </Badge>
              )}
            </div>
          </div>

          {/* Hazards and Warnings */}
          {analysis.hazards.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  Compatibility Notes
                </h4>
                <div className="space-y-2">
                  {analysis.hazards.map((hazard, index) => (
                    <div key={index} className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                      {hazard}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Page List */}
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Page Structure</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {analysis.pages.map((page, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{page.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">{page.filename}</span>
                    {page.isBlogLike && (
                      <Badge variant="outline" size="sm">Blog</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}