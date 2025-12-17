import { StepIndicator } from "../StepIndicator";

export default function StepIndicatorExample() {
  return (
    <StepIndicator 
      currentStep="colheita" 
      completedSteps={["insumo", "aplicacao"]} 
    />
  );
}
