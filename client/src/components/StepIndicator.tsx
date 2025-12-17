import { Check, Sprout, FlaskConical, Wheat, Truck } from "lucide-react";

export type BatchStep = "insumo" | "aplicacao" | "colheita" | "transporte";

interface StepIndicatorProps {
  currentStep: BatchStep;
  completedSteps: BatchStep[];
}

const steps: { id: BatchStep; label: string; icon: typeof Sprout }[] = [
  { id: "insumo", label: "Insumo", icon: FlaskConical },
  { id: "aplicacao", label: "Aplicação", icon: Sprout },
  { id: "colheita", label: "Colheita", icon: Wheat },
  { id: "transporte", label: "Transporte", icon: Truck },
];

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full" data-testid="step-indicator">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCurrent 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-muted-foreground/30 text-muted-foreground'
                    }
                  `}
                  data-testid={`step-icon-${step.id}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-xs font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
