import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversionDetails } from "./ConversionDetails";
import { FileArchive, Link as LinkIcon, Download, RotateCcw, CheckCircle, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";

interface Conversion {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  errorMessage?: string;
  downloadUrl?: string;
  previewData?: any;
  analysisReport?: any;
  diagnosticsReport?: any;
  createdAt: string;
  completedAt?: string;
}

export default function RecentConversions() {
  const [selectedConversion, setSelectedConversion] = useState<string | null>(null);
  const { data: conversions = [], isLoading } = useQuery<Conversion[]>({
    queryKey: ['/api/conversions'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const handleDownload = (conversionId: string) => {
    window.open(`/api/conversions/${conversionId}/download`, '_blank');
  };

  const handleViewDetails = (conversionId: string) => {
    setSelectedConversion(conversionId);
  };

  const selectedConversionData = conversions.find((c: Conversion) => c.id === selectedConversion);

  if (selectedConversionData) {
    return (
      <div className="space-y-4" data-testid="conversion-details-view">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedConversion(null)}
            data-testid="back-to-list"
          >
            ← Back to List
          </Button>
        </div>
        <ConversionDetails conversion={selectedConversionData} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Conversions</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-300 rounded"></div>
                    <div className="w-24 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Conversions</h3>
      
      {conversions.length === 0 ? (
        <div className="text-center py-8">
          <FileArchive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No conversions yet. Upload a file or enter a URL to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversions.map((conversion: Conversion) => (
            <div 
              key={conversion.id} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {conversion.type === 'file' ? (
                  <FileArchive className="text-primary text-xl" />
                ) : (
                  <LinkIcon className="text-primary text-xl" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{conversion.name}</h4>
                  <p className="text-sm text-gray-500">
                    {conversion.completedAt 
                      ? `Completed ${format(new Date(conversion.completedAt), 'MMM d, h:mm a')}`
                      : conversion.status === 'failed'
                      ? `Failed ${format(new Date(conversion.createdAt), 'MMM d, h:mm a')}`
                      : `Started ${format(new Date(conversion.createdAt), 'MMM d, h:mm a')}`
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={
                    conversion.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                    conversion.status === 'failed' ? 'bg-red-100 text-red-800 border-red-200' :
                    'bg-blue-100 text-blue-800 border-blue-200'
                  }
                  data-testid={`status-${conversion.status}`}
                >
                  {conversion.status === 'completed' && <CheckCircle className="w-4 h-4 mr-1" />}
                  {conversion.status === 'failed' && <XCircle className="w-4 h-4 mr-1" />}
                  {conversion.status === 'processing' && <RotateCcw className="w-4 h-4 mr-1 animate-spin" />}
                  {conversion.status}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewDetails(conversion.id)}
                  className="flex items-center"
                  data-testid={`view-details-${conversion.id}`}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                {conversion.status === 'completed' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleDownload(conversion.id)}
                    className="flex items-center"
                    data-testid={`download-${conversion.id}`}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
