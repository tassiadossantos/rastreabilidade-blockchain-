import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { StepIndicator, type BatchStep } from "./StepIndicator";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const insumoSchema = z.object({
  insumoNome: z.string().min(2, "Nome do insumo é obrigatório"),
  insumoFabricante: z.string().min(2, "Fabricante é obrigatório"),
  insumoLote: z.string().min(1, "Número do lote é obrigatório"),
  insumoCertificacao: z.string().min(1, "Selecione uma certificação"),
  insumoQuantidade: z.string().min(1, "Quantidade é obrigatória"),
});

const aplicacaoSchema = z.object({
  aplicacaoData: z.string().min(1, "Data da aplicação é obrigatória"),
  aplicacaoArea: z.string().min(1, "Área é obrigatória"),
  aplicacaoCultura: z.string().min(1, "Cultura é obrigatória"),
  aplicacaoResponsavel: z.string().min(2, "Responsável é obrigatório"),
  aplicacaoObservacoes: z.string().optional(),
});

const colheitaSchema = z.object({
  colheitaData: z.string().min(1, "Data da colheita é obrigatória"),
  colheitaPeso: z.string().min(1, "Peso é obrigatório"),
  colheitaUmidade: z.string().min(1, "Umidade é obrigatória"),
  colheitaQualidade: z.string().min(1, "Selecione a qualidade"),
  colheitaArmazem: z.string().min(2, "Armazém é obrigatório"),
});

const transporteSchema = z.object({
  transporteData: z.string().min(1, "Data do transporte é obrigatória"),
  transportePlaca: z.string().min(7, "Placa do veículo é obrigatória"),
  transporteMotorista: z.string().min(2, "Motorista é obrigatório"),
  transporteDestino: z.string().min(2, "Destino é obrigatório"),
  transporteNotaFiscal: z.string().min(1, "Nota fiscal é obrigatória"),
});

const fullSchema = insumoSchema.merge(aplicacaoSchema).merge(colheitaSchema).merge(transporteSchema);

type FormData = z.infer<typeof fullSchema>;

interface BatchRegistrationFormProps {
  onSubmit?: (data: FormData) => void;
}

const steps: BatchStep[] = ["insumo", "aplicacao", "colheita", "transporte"];

export function BatchRegistrationForm({ onSubmit }: BatchRegistrationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const currentStep = steps[currentStepIndex];
  const completedSteps = steps.slice(0, currentStepIndex);

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      insumoNome: "",
      insumoFabricante: "",
      insumoLote: "",
      insumoCertificacao: "",
      insumoQuantidade: "",
      aplicacaoData: "",
      aplicacaoArea: "",
      aplicacaoCultura: "",
      aplicacaoResponsavel: "",
      aplicacaoObservacoes: "",
      colheitaData: "",
      colheitaPeso: "",
      colheitaUmidade: "",
      colheitaQualidade: "",
      colheitaArmazem: "",
      transporteData: "",
      transportePlaca: "",
      transporteMotorista: "",
      transporteDestino: "",
      transporteNotaFiscal: "",
    },
    mode: "onChange",
  });

  const validateCurrentStep = async () => {
    const stepSchemas: Record<BatchStep, z.ZodSchema> = {
      insumo: insumoSchema,
      aplicacao: aplicacaoSchema,
      colheita: colheitaSchema,
      transporte: transporteSchema,
    };
    
    const currentSchema = stepSchemas[currentStep];
    const values = form.getValues();
    const result = currentSchema.safeParse(values);
    
    if (!result.success) {
      result.error.errors.forEach((err) => {
        form.setError(err.path[0] as keyof FormData, { message: err.message });
      });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    toast({
      title: "Lote Registrado com Sucesso!",
      description: "O hash foi enviado para a blockchain Polygon Mumbai.",
    });
    
    onSubmit?.(data);
    console.log("Form submitted:", data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === "insumo" && "Registro de Insumo"}
                {currentStep === "aplicacao" && "Aplicação do Insumo"}
                {currentStep === "colheita" && "Dados da Colheita"}
                {currentStep === "transporte" && "Informações de Transporte"}
              </CardTitle>
              <CardDescription>
                {currentStep === "insumo" && "Informe os dados do insumo agrícola e sua certificação"}
                {currentStep === "aplicacao" && "Registre a aplicação do insumo na lavoura"}
                {currentStep === "colheita" && "Registre os dados da colheita e qualidade"}
                {currentStep === "transporte" && "Informe os dados do transporte até o destino"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === "insumo" && (
                <>
                  <FormField
                    control={form.control}
                    name="insumoNome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Insumo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Fertilizante NPK 10-10-10" {...field} data-testid="input-insumo-nome" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="insumoFabricante"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fabricante</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do fabricante" {...field} data-testid="input-insumo-fabricante" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="insumoLote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lote do Fabricante</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: LT2024-0123" {...field} data-testid="input-insumo-lote" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="insumoCertificacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificação</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-insumo-certificacao">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mapa">MAPA</SelectItem>
                              <SelectItem value="organico">Orgânico</SelectItem>
                              <SelectItem value="ibama">IBAMA</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="insumoQuantidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-insumo-quantidade" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {currentStep === "aplicacao" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="aplicacaoData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data da Aplicação</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-aplicacao-data" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aplicacaoArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área (hectares)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-aplicacao-area" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="aplicacaoCultura"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cultura</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Soja, Milho, Café" {...field} data-testid="input-aplicacao-cultura" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aplicacaoResponsavel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsável</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do responsável" {...field} data-testid="input-aplicacao-responsavel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="aplicacaoObservacoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações (opcional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Observações adicionais..." {...field} data-testid="input-aplicacao-observacoes" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === "colheita" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="colheitaData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data da Colheita</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-colheita-data" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="colheitaPeso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso Total (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} data-testid="input-colheita-peso" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="colheitaUmidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Umidade (%)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="0.0" {...field} data-testid="input-colheita-umidade" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="colheitaQualidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classificação de Qualidade</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-colheita-qualidade">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tipo1">Tipo 1 - Premium</SelectItem>
                              <SelectItem value="tipo2">Tipo 2 - Padrão</SelectItem>
                              <SelectItem value="tipo3">Tipo 3 - Econômico</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="colheitaArmazem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Armazém de Destino</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome ou código do armazém" {...field} data-testid="input-colheita-armazem" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === "transporte" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="transporteData"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data do Transporte</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-transporte-data" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transportePlaca"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Placa do Veículo</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC-1234" {...field} data-testid="input-transporte-placa" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="transporteMotorista"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motorista</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do motorista" {...field} data-testid="input-transporte-motorista" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transporteDestino"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destino Final</FormLabel>
                          <FormControl>
                            <Input placeholder="Cooperativa, Trader, etc." {...field} data-testid="input-transporte-destino" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="transporteNotaFiscal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da Nota Fiscal</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 000123456" {...field} data-testid="input-transporte-nota" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-4 mt-6 sticky bottom-0 bg-background py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            {currentStepIndex < steps.length - 1 ? (
              <Button type="button" onClick={handleNext} data-testid="button-next">
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} data-testid="button-submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registrando na Blockchain...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Registrar Lote
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
