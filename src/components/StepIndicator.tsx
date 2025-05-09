
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { id: number; title: string }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="flex-1 flex flex-col items-center"
          >
            <div className="flex items-center w-full">
              <div 
                className={cn(
                  "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-medium",
                  currentStep >= step.id 
                    ? "bg-gradient-studio text-white" 
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-1 flex-1 mx-2",
                    currentStep > step.id ? "bg-gradient-studio" : "bg-gray-200"
                  )}
                />
              )}
            </div>
            <span 
              className={cn(
                "mt-2 text-sm",
                currentStep >= step.id ? "text-gray-900 font-medium" : "text-gray-500"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
