import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Loader2, Circle } from "lucide-react";
import { Conversion } from "../../../shared/schema";

interface ProcessingStepsProps {
  conversionId: string | null;
}

export default function ProcessingSteps({ conversionId }: ProcessingStepsProps) {
  const { data: conversion } = useQuery<Conversion>({
    queryKey: ['/api/conversions', conversionId],
    enabled: !!conversionId,
    refetchInterval: conversionId ? 2000 : false, // Poll every 2 seconds
  });

  const getStepStatus = (stepThreshold: number) => {
    if (!conversion) return "pending";
    if (conversion.status === "failed") return "failed";
    const progress = conversion.progress ?? 0;
    if (progress >= stepThreshold) return "completed";
    if (progress > stepThreshold - 30) return "processing";
    return "pending";
  };

  const steps = [
    { 
      name: "Files extracted successfully", 
      threshold: 25,
      status: getStepStatus(25)
    },
    { 
      name: "Parsing HTML structure...", 
      threshold: 50,
      status: getStepStatus(50)
    },
    { 
      name: "Converting to WordPress theme", 
      threshold: 75,
      status: getStepStatus(75)
    },
    { 
      name: "Optimizing assets", 
      threshold: 100,
      status: getStepStatus(100)
    },
  ];

  const isCompleted = conversion?.status === "completed";
  const allStepsCompleted = steps.every(step => step.status === "completed");

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center text-sm" data-testid={`processing-step-${index}`}>
          {step.status === "completed" && (
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" data-testid={`step-completed-${index}`} />
          )}
          {step.status === "processing" && (
            <Loader2 className="w-5 h-5 text-yellow-500 mr-3 animate-spin" data-testid={`step-processing-${index}`} />
          )}
          {step.status === "pending" && (
            <Circle className="w-5 h-5 text-gray-300 mr-3" data-testid={`step-pending-${index}`} />
          )}
          {step.status === "failed" && (
            <Circle className="w-5 h-5 text-red-500 mr-3" data-testid={`step-failed-${index}`} />
          )}
          <span className={
            step.status === "completed" ? "text-green-600" :
            step.status === "processing" ? "text-yellow-600" :
            step.status === "failed" ? "text-red-600" :
            "text-gray-500"
          }>
            {step.name}
          </span>
        </div>
      ))}
      
      {/* Processing Complete Message */}
      {isCompleted && allStepsCompleted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg" data-testid="processing-complete">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">Processing Complete</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            Your WordPress theme is ready for download
          </p>
        </div>
      )}
      
      {/* Ready to Process State */}
      {!conversion && (
        <div className="mt-6 text-center">
          <div className="text-sm font-medium text-gray-700 mb-2">Ready to process</div>
          <div className="text-xs text-gray-500">Waiting for upload...</div>
        </div>
      )}
    </div>
  );
}
