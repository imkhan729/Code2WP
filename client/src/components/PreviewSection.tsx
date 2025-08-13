import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone, Expand, Eye } from "lucide-react";
import { useState } from "react";

interface PreviewSectionProps {
  conversionId: string | null;
}

export default function PreviewSection({ conversionId }: PreviewSectionProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const { data: conversion } = useQuery({
    queryKey: ['/api/conversions', conversionId],
    enabled: !!conversionId,
    refetchInterval: conversionId ? 5000 : false,
  });

  const hasPreview = conversion?.previewData?.html;

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "tablet": return "768px";
      case "mobile": return "375px";
      default: return "100%";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Live Preview</h3>
        <div className="flex items-center space-x-4">
          <div className="flex border border-gray-300 rounded-lg">
            <Button
              variant={viewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "ghost"}
              size="sm"
              className="rounded-none border-x-0"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Expand className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg bg-gray-100 p-4 min-h-96">
        {hasPreview ? (
          <div className="mx-auto transition-all duration-300" style={{ width: getPreviewWidth() }}>
            <div 
              className="bg-white rounded border shadow-sm overflow-hidden"
              dangerouslySetInnerHTML={{ 
                __html: conversion.previewData.html 
              }}
            />
          </div>
        ) : (
          <div className="text-center py-16">
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {conversionId 
                ? "Preview will appear here once your files are processed"
                : "Start a conversion to see the preview"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
