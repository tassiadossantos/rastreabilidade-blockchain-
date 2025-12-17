import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HashDisplay } from "./HashDisplay";
import { VerificationBadge, type VerificationStatus } from "./VerificationBadge";
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VerificationPanelProps {
  offChainHash: string;
  onChainHash: string;
  txHash: string;
  lastVerified?: Date;
  onReVerify?: () => void;
}

export function VerificationPanel({ 
  offChainHash, 
  onChainHash, 
  txHash, 
  lastVerified,
  onReVerify 
}: VerificationPanelProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const hashesMatch = offChainHash === onChainHash;
  const status: VerificationStatus = hashesMatch ? "verified" : "failed";

  const handleReVerify = async () => {
    setIsVerifying(true);
    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsVerifying(false);
    onReVerify?.();
    console.log("Re-verified");
  };

  return (
    <Card data-testid="verification-panel">
      <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
        <CardTitle className="text-lg">Verificação de Integridade</CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <VerificationBadge status={status} />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReVerify}
            disabled={isVerifying}
            data-testid="button-reverify"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isVerifying ? 'animate-spin' : ''}`} />
            Re-verificar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-chart-3" />
              Dados Off-Chain (PostgreSQL)
            </div>
            <div className="p-4 bg-muted/50 rounded-md">
              <HashDisplay hash={offChainHash} label="Hash Calculado" truncate={false} />
              <p className="text-xs text-muted-foreground mt-2">
                SHA-256 dos dados armazenados no banco de dados
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-primary" />
              Dados On-Chain (Polygon Mumbai)
            </div>
            <div className="p-4 bg-muted/50 rounded-md">
              <HashDisplay hash={onChainHash} label="Hash Registrado" txHash={txHash} truncate={false} />
              <p className="text-xs text-muted-foreground mt-2">
                Hash imutável armazenado na blockchain
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-md flex items-center gap-3 ${
          hashesMatch 
            ? 'bg-primary/10 text-primary' 
            : 'bg-destructive/10 text-destructive'
        }`}>
          {hashesMatch ? (
            <>
              <CheckCircle className="h-6 w-6" />
              <div>
                <p className="font-medium">Integridade Verificada</p>
                <p className="text-sm opacity-80">
                  Os dados off-chain correspondem exatamente ao hash registrado na blockchain.
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6" />
              <div>
                <p className="font-medium">Falha na Verificação</p>
                <p className="text-sm opacity-80">
                  Os dados foram modificados após o registro na blockchain. Possível adulteração detectada.
                </p>
              </div>
            </>
          )}
        </div>

        {lastVerified && (
          <p className="text-xs text-muted-foreground mt-4">
            Última verificação: {lastVerified.toLocaleDateString('pt-BR')} às {lastVerified.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
