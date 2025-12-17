import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VerificationPanel } from "@/components/VerificationPanel";
import { BatchTimeline, type TimelineEvent } from "@/components/BatchTimeline";
import { Search, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality
const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    step: "insumo",
    title: "Registro de Insumo",
    description: "Fertilizante NPK 10-10-10 - Lote LT2024-0891",
    actor: "Fazenda Santa Clara",
    actorRole: "Produtor",
    timestamp: new Date("2024-03-15T08:30:00"),
    status: "verified",
    txHash: "0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    dataHash: "0xf8c2d4e6a8b0c2d4e6a8b0c2d4e6a8b0c2d4e6a8b0c2d4e6a8b0c2d4e6a8b0c2",
  },
  {
    id: "2",
    step: "aplicacao",
    title: "Aplicação na Lavoura",
    description: "Aplicação em 150 hectares de soja",
    actor: "João Silva",
    actorRole: "Agrônomo",
    timestamp: new Date("2024-03-18T14:15:00"),
    status: "verified",
    txHash: "0x9b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c",
    dataHash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
  },
  {
    id: "3",
    step: "colheita",
    title: "Colheita Registrada",
    description: "45.000 kg colhidos - Tipo 1 Premium",
    actor: "Cooperativa Central",
    actorRole: "Cooperativa",
    timestamp: new Date("2024-06-20T10:45:00"),
    status: "verified",
    txHash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    dataHash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
  },
  {
    id: "4",
    step: "transporte",
    title: "Transporte Iniciado",
    description: "Destino: Trader ABC - NF 000123456",
    actor: "Transportadora Veloz",
    actorRole: "Transportador",
    timestamp: new Date("2024-06-22T06:00:00"),
    status: "verified",
    txHash: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    dataHash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
  },
];

export default function VerifyBatch() {
  const [batchCode, setBatchCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    found: boolean;
    offChainHash: string;
    onChainHash: string;
    txHash: string;
    batchInfo: {
      code: string;
      product: string;
      producer: string;
    };
  } | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!batchCode.trim()) {
      toast({
        title: "Código obrigatório",
        description: "Informe o código do lote para verificar.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulating a found batch
    if (batchCode.toUpperCase().includes("LT") || batchCode.includes("0891")) {
      setVerificationResult({
        found: true,
        offChainHash: "0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b",
        onChainHash: "0x7a3e8c1d2f4b5a6e9c8d7f0e1a2b3c4d5e6f7a8b",
        txHash: "0x9b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c",
        batchInfo: {
          code: "LT-2024-0891",
          product: "Soja",
          producer: "Fazenda Santa Clara",
        },
      });
      toast({
        title: "Lote encontrado",
        description: "Verificação de integridade concluída.",
      });
    } else {
      setVerificationResult(null);
      toast({
        title: "Lote não encontrado",
        description: "Verifique o código e tente novamente.",
        variant: "destructive",
      });
    }
    
    setIsSearching(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Verificar Integridade</h1>
        <p className="text-muted-foreground mt-1">
          Valide que os dados off-chain correspondem ao hash registrado na blockchain
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Buscar Lote
          </CardTitle>
          <CardDescription>
            Informe o código do lote para verificar a integridade dos dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Ex: LT-2024-0891"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
                data-testid="input-batch-code"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              data-testid="button-verify"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Verificar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {verificationResult?.found && (
        <>
          <div className="p-4 bg-muted rounded-md">
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground">Código do Lote</p>
                <p className="font-mono font-semibold">{verificationResult.batchInfo.code}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-sm text-muted-foreground">Produto</p>
                <p className="font-semibold">{verificationResult.batchInfo.product}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-sm text-muted-foreground">Produtor</p>
                <p className="font-semibold">{verificationResult.batchInfo.producer}</p>
              </div>
            </div>
          </div>

          <VerificationPanel
            offChainHash={verificationResult.offChainHash}
            onChainHash={verificationResult.onChainHash}
            txHash={verificationResult.txHash}
            lastVerified={new Date()}
          />

          <Card>
            <CardHeader>
              <CardTitle>Histórico Completo</CardTitle>
              <CardDescription>
                Todas as etapas registradas para este lote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BatchTimeline events={mockTimelineEvents} />
            </CardContent>
          </Card>
        </>
      )}

      {verificationResult === null && batchCode && !isSearching && (
        <Card className="border-destructive/50">
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Lote Não Encontrado</h3>
            <p className="text-muted-foreground mt-2">
              O código informado não corresponde a nenhum lote registrado no sistema.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
