import { useQuery } from "@tanstack/react-query";

interface ProgressBarProps {
  conversionId: string | null;
}

export default function ProgressBar({ conversionId }: ProgressBarProps) {
  const { data: conversion } = useQuery({
    queryKey: ['/api/conversions', conversionId],
    enabled: !!conversionId,
    refetchInterval: conversionId ? 2000 : false,
  });

  const progress = conversion?.progress || 0;
  const status = conversion?.status || "pending";

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          {status === "completed" ? "Completed" :
           status === "failed" ? "Failed" :
           status === "processing" ? "Converting..." :
           "Waiting..."}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            status === "failed" ? "bg-red-500" :
            status === "completed" ? "bg-green-500" :
            "bg-primary"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {conversion?.errorMessage && (
        <p className="text-sm text-red-600 mt-2">{conversion.errorMessage}</p>
      )}
    </div>
  );
}
