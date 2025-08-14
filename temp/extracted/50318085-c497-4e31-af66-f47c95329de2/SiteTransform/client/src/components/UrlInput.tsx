import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface UrlInputProps {
  onConversionStart: (conversionId: string) => void;
}

export default function UrlInput({ onConversionStart }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const urlMutation = useMutation({
    mutationFn: async (sourceUrl: string) => {
      const response = await apiRequest('POST', '/api/conversions/url', { sourceUrl });
      return response.json();
    },
    onSuccess: (conversion) => {
      toast({
        title: "URL analysis started",
        description: "Your website is being analyzed and converted.",
      });
      onConversionStart(conversion.id);
      setUrl("");
      queryClient.invalidateQueries({ queryKey: ['/api/conversions'] });
    },
    onError: (error) => {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze website",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a valid website URL.",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    urlMutation.mutate(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </Label>
        <Input
          id="website-url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
        />
      </div>
      <Button 
        type="submit" 
        disabled={urlMutation.isPending}
        className="w-full"
      >
        {urlMutation.isPending ? "Analyzing..." : "Analyze Website"}
      </Button>
    </form>
  );
}
