import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wallet, Globe, Bell, Shield, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoVerify, setAutoVerify] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // todo: remove mock functionality
  const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const handleConnectWallet = async () => {
    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    setWalletConnected(true);
    toast({
      title: "Carteira Conectada",
      description: "MetaMask conectada com sucesso à rede Polygon Mumbai.",
    });
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
    toast({
      title: "Carteira Desconectada",
      description: "Sua carteira foi desconectada.",
    });
  };

  const handleCopyContract = async () => {
    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie sua carteira e preferências do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Carteira Web3
          </CardTitle>
          <CardDescription>
            Conecte sua carteira MetaMask para assinar transações na blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {walletConnected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">MetaMask</p>
                    <code className="text-xs text-muted-foreground">
                      {mockWalletAddress.slice(0, 6)}...{mockWalletAddress.slice(-4)}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Conectada</Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDisconnectWallet}
                    data-testid="button-disconnect-wallet"
                  >
                    Desconectar
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rede</p>
                  <p className="text-sm text-muted-foreground">Polygon Mumbai Testnet</p>
                </div>
                <Badge variant="secondary">Chain ID: 80001</Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nenhuma carteira conectada</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conecte sua carteira MetaMask para registrar lotes na blockchain
              </p>
              <Button onClick={handleConnectWallet} data-testid="button-connect-wallet">
                <Wallet className="h-4 w-4 mr-2" />
                Conectar MetaMask
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Smart Contract
          </CardTitle>
          <CardDescription>
            Informações do contrato de rastreabilidade deployado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Endereço do Contrato</Label>
            <div className="flex items-center gap-2 mt-2">
              <code className="flex-1 text-sm bg-muted px-3 py-2 rounded font-mono">
                {contractAddress}
              </code>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleCopyContract}
                data-testid="button-copy-contract"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={`https://mumbai.polygonscan.com/address/${contractAddress}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="link-polygonscan"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Rede</Label>
              <p className="font-medium mt-1">Polygon Mumbai</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Versão</Label>
              <p className="font-medium mt-1">v1.0.0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Configure suas preferências de notificação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações de Transação</p>
              <p className="text-sm text-muted-foreground">
                Receba alertas quando transações forem confirmadas
              </p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
              data-testid="switch-notifications"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Verificação Automática</p>
              <p className="text-sm text-muted-foreground">
                Verificar integridade automaticamente após cada registro
              </p>
            </div>
            <Switch 
              checked={autoVerify} 
              onCheckedChange={setAutoVerify}
              data-testid="switch-auto-verify"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Segurança
          </CardTitle>
          <CardDescription>
            Configurações de segurança da conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="org-name">Nome da Organização</Label>
            <Input 
              id="org-name"
              placeholder="Ex: Fazenda Santa Clara"
              className="mt-2"
              data-testid="input-org-name"
            />
          </div>
          <div>
            <Label htmlFor="org-id">CNPJ</Label>
            <Input 
              id="org-id"
              placeholder="00.000.000/0001-00"
              className="mt-2"
              data-testid="input-org-id"
            />
          </div>
          <Button className="mt-4" data-testid="button-save-settings">
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
