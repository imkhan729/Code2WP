import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Loader2, Circle } from "lucide-react";

interface ProcessingStepsProps {
  conversionId: string | null;
}

export default function ProcessingSteps({ conversionId }: ProcessingStepsProps) {
  const { data: conversion } = useQuery({
    queryKey: ['/api/conversions', conversionId],
    enabled: !!conversionId,
    refetchInterval: conversionId ? 2000 : false, // Poll every 2 seconds
  });

  const getStepStatus = (stepThreshold: number) => {
    if (!conversion) return "pending";
    if (conversion.status === "failed") return "failed";
    if (conversion.progress >= stepThreshold) return "completed";
    if (conversion.progress > stepThreshold - 30) return "processing";
    return "pending";
  };

  const steps = [
    { 
      name: "Files extracted successfully", 
      threshold: 20,
      status: getStepStatus(20)
    },
    { 
      name: "Parsing HTML structure...", 
      threshold: 50,
      status: getStepStatus(50)
    },
    { 
      name: "Converting to WordPress theme", 
      threshold: 80,
      status: getStepStatus(80)
    },
    { 
      name: "Optimizing assets", 
      threshold: 100,
      status: getStepStatus(100)
    },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center text-sm">
          {step.status === "completed" && (
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
          )}
          {step.status === "processing" && (
            <Loader2 className="w-5 h-5 text-yellow-500 mr-3 animate-spin" />
          )}
          {step.status === "pending" && (
            <Circle className="w-5 h-5 text-gray-300 mr-3" />
          )}
          {step.status === "failed" && (
            <Circle className="w-5 h-5 text-red-500 mr-3" />
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
    </div>
  );
}
