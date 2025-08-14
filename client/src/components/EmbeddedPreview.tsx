import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Tablet, Smartphone, Maximize2, ExternalLink, RefreshCw } from "lucide-react";

interface EmbeddedPreviewProps {
  conversionId: string;
  title?: string;
  onClose?: () => void;
}

export default function EmbeddedPreview({ conversionId, title, onClose }: EmbeddedPreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const previewUrl = `/api/conversions/${conversionId}/preview`;

  const deviceStyles = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '600px', margin: '0 auto' },
    mobile: { width: '375px', height: '600px', margin: '0 auto' }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    const iframe = document.getElementById(`preview-${conversionId}`) as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const handleFullscreen = () => {
    window.open(previewUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
  };

  const handleNewWindow = () => {
    window.open(previewUrl, '_blank');
  };

  return (
    <Card className="w-full" data-testid="embedded-preview">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Live Preview {title && `- ${title}`}
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* Device Toggle */}
            <div className="flex border rounded-lg p-1 bg-gray-50">
              <Button
                variant={device === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevice('desktop')}
                className="h-8 px-3"
                data-testid="device-desktop"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={device === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevice('tablet')}
                className="h-8 px-3"
                data-testid="device-tablet"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={device === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevice('mobile')}
                className="h-8 px-3"
                data-testid="device-mobile"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              data-testid="refresh-preview"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleFullscreen}
              data-testid="fullscreen-preview"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewWindow}
              data-testid="new-window-preview"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>

            {onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                data-testid="close-preview"
              >
                ✕
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="border-t">
          <div 
            style={deviceStyles[device]}
            className="transition-all duration-300"
          >
            <iframe
              id={`preview-${conversionId}`}
              src={previewUrl}
              className="w-full h-full border-0 rounded-b-lg"
              title={`Preview of ${title || 'website'}`}
              sandbox="allow-scripts allow-same-origin allow-forms"
              data-testid="preview-iframe"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}