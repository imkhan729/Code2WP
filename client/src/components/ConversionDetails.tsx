import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalysisReport } from "./AnalysisReport";
import PreviewSection from "./PreviewSection";
import { 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileCode,
  Zap,
  ExternalLink,
  Monitor
} from "lucide-react";

interface Conversion {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  errorMessage?: string;
  downloadUrl?: string;
  previewData?: {
    html: string;
    title: string;
    analysis?: {
      pagesFound: number;
      blogPages: number;
      formsFound: number;
      hasNavigation: boolean;
      assetsFound: number;
    };
  };
  analysisReport?: any;
  diagnosticsReport?: {
    missingFiles: string[];
    assetErrors: string[];
    scriptAdjustments: string[];
    hazards: string[];
  };
  createdAt: string;
  completedAt?: string;
}

interface ConversionDetailsProps {
  conversion: Conversion;
}

export function ConversionDetails({ conversion }: ConversionDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusIcon = () => {
    switch (conversion.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (conversion.status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const downloadTheme = async () => {
    if (!conversion.downloadUrl) return;
    
    try {
      const response = await fetch(`/api/conversions/${conversion.id}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${conversion.name}-wordpress-theme.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const openPreview = () => {
    const previewUrl = `/api/conversions/${conversion.id}/preview`;
    window.open(previewUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  };

  return (
    <Card className="w-full" data-testid="conversion-details">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon()}
              {conversion.name}
            </CardTitle>
            <CardDescription>
              {conversion.type === 'file' ? 'ZIP File Upload' : 'Website URL'} • 
              Created {new Date(conversion.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              className={`${getStatusColor()} font-medium`}
              data-testid="status-badge"
            >
              {conversion.status.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-2">
              {(conversion.status === "completed" || conversion.previewData) && (
                <Button 
                  variant="outline" 
                  onClick={openPreview} 
                  className="flex items-center gap-2" 
                  data-testid="preview-button"
                >
                  <Monitor className="w-4 h-4" />
                  Live Preview
                </Button>
              )}
              {conversion.status === "completed" && (
                <Button onClick={downloadTheme} className="flex items-center gap-2" data-testid="download-button">
                  <Download className="w-4 h-4" />
                  Download Theme
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {conversion.status === "processing" && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${conversion.progress}%` }}
              data-testid="progress-bar"
            />
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="w-full">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
              data-testid="tab-overview"
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'analysis' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('analysis')}
              disabled={!conversion.analysisReport}
              data-testid="tab-analysis"
            >
              Analysis
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'preview' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('preview')}
              disabled={!conversion.previewData}
              data-testid="tab-preview"
            >
              Preview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'diagnostics' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('diagnostics')}
              disabled={!conversion.diagnosticsReport}
              data-testid="tab-diagnostics"
            >
              Diagnostics
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {conversion.previewData?.analysis && (
                <>
                  <div className="text-center p-4 border rounded-lg" data-testid="overview-pages">
                    <div className="text-2xl font-bold text-blue-600">
                      {conversion.previewData.analysis.pagesFound}
                    </div>
                    <div className="text-sm text-muted-foreground">Pages Found</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg" data-testid="overview-blog">
                    <div className="text-2xl font-bold text-purple-600">
                      {conversion.previewData.analysis.blogPages}
                    </div>
                    <div className="text-sm text-muted-foreground">Blog Pages</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg" data-testid="overview-assets">
                    <div className="text-2xl font-bold text-green-600">
                      {conversion.previewData.analysis.assetsFound}
                    </div>
                    <div className="text-sm text-muted-foreground">Assets</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg" data-testid="overview-forms">
                    <div className="text-2xl font-bold text-orange-600">
                      {conversion.previewData.analysis.formsFound}
                    </div>
                    <div className="text-sm text-muted-foreground">Forms</div>
                  </div>
                </>
              )}
            </div>

            {conversion.errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700 font-medium">
                  <XCircle className="w-5 h-5" />
                  Conversion Failed
                </div>
                <p className="text-red-600 mt-2">{conversion.errorMessage}</p>
              </div>
            )}

            {conversion.status === "completed" && conversion.previewData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  WordPress Theme Generated Successfully
                </div>
                <p className="text-green-600 mt-2">
                  Your website has been converted to a WordPress theme with {conversion.previewData.analysis?.pagesFound || 0} pages
                  {conversion.previewData.analysis?.hasNavigation ? ' and navigation preserved' : ''}.
                </p>
              </div>
            )}
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="mt-6">
            {conversion.analysisReport ? (
              <AnalysisReport analysis={conversion.analysisReport} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Analysis data not available</p>
              </div>
            )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="mt-6">
              {conversion.previewData ? (
                <div className="space-y-4">
                  <PreviewSection previewData={conversion.previewData} />
                  
                  {/* Live Preview Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="w-5 h-5" />
                        Live Website Preview
                      </CardTitle>
                      <CardDescription>
                        View your converted website exactly as it will appear to visitors
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <Button 
                            onClick={openPreview} 
                            className="flex items-center gap-2"
                            data-testid="open-preview-new-tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open in New Tab
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
                              if (iframe) {
                                iframe.src = `/api/conversions/${conversion.id}/preview`;
                              }
                            }}
                            data-testid="refresh-preview"
                          >
                            <Monitor className="w-4 h-4 mr-2" />
                            Refresh Preview
                          </Button>
                        </div>
                        
                        {/* Embedded Preview */}
                        <div className="border rounded-lg overflow-hidden bg-gray-50">
                          <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex gap-1">
                              <div className="w-3 h-3 rounded-full bg-red-400"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="ml-2">Preview - {conversion.name}</span>
                          </div>
                          <iframe
                            id="preview-iframe"
                            src={`/api/conversions/${conversion.id}/preview`}
                            className="w-full h-96 border-0"
                            title="Website Preview"
                            data-testid="preview-iframe"
                            onError={() => {
                              console.error('Preview iframe failed to load');
                            }}
                          />
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          <p>• This preview shows your website with original styling and functionality</p>
                          <p>• JavaScript interactions and responsive design are preserved</p>
                          <p>• Use "Open in New Tab" for full-screen testing</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Preview not available</p>
                  <p className="text-sm mt-2">Website conversion is still in progress</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="mt-6">
            {conversion.diagnosticsReport ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Conversion Diagnostics
                  </CardTitle>
                  <CardDescription>
                    Technical details about the conversion process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {conversion.diagnosticsReport.hazards.length > 0 && (
                    <div>
                      <h4 className="font-medium text-yellow-700 mb-2">Compatibility Warnings</h4>
                      <div className="space-y-2">
                        {conversion.diagnosticsReport.hazards.map((hazard, index) => (
                          <div key={index} className="text-sm bg-yellow-50 border border-yellow-200 rounded p-3">
                            {hazard}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {conversion.diagnosticsReport.scriptAdjustments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Script Adjustments</h4>
                      <div className="space-y-2">
                        {conversion.diagnosticsReport.scriptAdjustments.map((adjustment, index) => (
                          <div key={index} className="text-sm bg-blue-50 border border-blue-200 rounded p-3">
                            {adjustment}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {conversion.diagnosticsReport.missingFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Missing Files</h4>
                      <div className="space-y-2">
                        {conversion.diagnosticsReport.missingFiles.map((file, index) => (
                          <div key={index} className="text-sm bg-red-50 border border-red-200 rounded p-3">
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {conversion.diagnosticsReport.hazards.length === 0 && 
                   conversion.diagnosticsReport.scriptAdjustments.length === 0 && 
                   conversion.diagnosticsReport.missingFiles.length === 0 && (
                    <div className="text-center py-8 text-green-600">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                      <p className="font-medium">No Issues Detected</p>
                      <p className="text-sm text-muted-foreground">
                        Your website was converted successfully without any compatibility issues.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Diagnostics not available</p>
              </div>
            )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}