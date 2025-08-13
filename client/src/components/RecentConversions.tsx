import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileArchive, Link as LinkIcon, Download, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function RecentConversions() {
  const { data: conversions = [], isLoading } = useQuery({
    queryKey: ['/api/conversions'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const handleDownload = (conversionId: string) => {
    window.open(`/api/conversions/${conversionId}/download`, '_blank');
  };

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
          {conversions.map((conversion: any) => (
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
                  variant={
                    conversion.status === 'completed' ? 'default' :
                    conversion.status === 'failed' ? 'destructive' :
                    conversion.status === 'processing' ? 'secondary' :
                    'outline'
                  }
                  className={
                    conversion.status === 'completed' ? 'bg-green-100 text-green-800' :
                    conversion.status === 'failed' ? 'bg-red-100 text-red-800' :
                    conversion.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }
                >
                  {conversion.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {conversion.status === 'failed' && <XCircle className="w-3 h-3 mr-1" />}
                  {conversion.status === 'completed' ? 'Complete' :
                   conversion.status === 'failed' ? 'Failed' :
                   conversion.status === 'processing' ? 'Processing' :
                   'Pending'}
                </Badge>
                
                {conversion.status === 'completed' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDownload(conversion.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                )}
                
                {conversion.status === 'failed' && (
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="w-4 h-4" />
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
