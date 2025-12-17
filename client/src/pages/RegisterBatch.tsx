import { BatchRegistrationForm } from "@/components/BatchRegistrationForm";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function RegisterBatch() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleSubmit = (data: unknown) => {
    console.log("Batch submitted:", data);
    toast({
      title: "Lote registrado com sucesso!",
      description: "O hash foi enviado para a blockchain Polygon Mumbai.",
    });
    // todo: remove mock functionality - navigate after real submission
    setTimeout(() => navigate("/rastrear"), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Registrar Novo Lote</h1>
        <p className="text-muted-foreground mt-1">
          Preencha as informações de cada etapa da cadeia de valor
        </p>
      </div>

      <BatchRegistrationForm onSubmit={handleSubmit} />
    </div>
  );
}
