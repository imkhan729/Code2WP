import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CloudUpload } from "lucide-react";

interface FileUploadProps {
  onConversionStart: (conversionId: string) => void;
}

export default function FileUpload({ onConversionStart }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiRequest('POST', '/api/conversions/upload', formData);
      return response.json();
    },
    onSuccess: (conversion) => {
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded and conversion has started.",
      });
      onConversionStart(conversion.id);
      setSelectedFile(null);
      queryClient.invalidateQueries({ queryKey: ['/api/conversions'] });
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a ZIP file containing your website files.",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 50MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
    },
    maxFiles: 1,
  });

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary bg-blue-50' 
            : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <CloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        
        {selectedFile ? (
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">Selected: {selectedFile.name}</p>
            <p className="text-sm text-gray-500 mb-4">
              Size: {Math.round(selectedFile.size / 1024)} KB
            </p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">Drop your ZIP file here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
          </div>
        )}
        
        <p className="text-xs text-gray-400">Supports ZIP files up to 50MB</p>
      </div>
      
      {selectedFile && (
        <Button 
          onClick={handleUpload} 
          disabled={uploadMutation.isPending}
          className="w-full"
        >
          {uploadMutation.isPending ? "Uploading..." : "Start Conversion"}
        </Button>
      )}
    </div>
  );
}
