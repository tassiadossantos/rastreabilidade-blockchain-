import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, Calendar, TrendingUp, Package, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality
const mockMonthlyData = [
  { month: "Jan", registered: 18, verified: 16 },
  { month: "Fev", registered: 24, verified: 22 },
  { month: "Mar", registered: 32, verified: 30 },
  { month: "Abr", registered: 28, verified: 27 },
  { month: "Mai", registered: 45, verified: 42 },
  { month: "Jun", registered: 52, verified: 48 },
];

export default function Reports() {
  const [period, setPeriod] = useState("6months");
  const { toast } = useToast();

  const totalRegistered = mockMonthlyData.reduce((acc, curr) => acc + curr.registered, 0);
  const totalVerified = mockMonthlyData.reduce((acc, curr) => acc + curr.verified, 0);
  const verificationRate = ((totalVerified / totalRegistered) * 100).toFixed(1);

  const handleExport = (format: string) => {
    toast({
      title: "Relatório Exportado",
      description: `O relatório foi exportado em formato ${format.toUpperCase()}.`,
    });
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Relatórios</h1>
          <p className="text-muted-foreground mt-1">
            Análise e métricas de rastreabilidade
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]" data-testid="select-period">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport("pdf")} data-testid="button-export-pdf">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("csv")} data-testid="button-export-csv">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrado</p>
                <p className="text-3xl font-bold">{totalRegistered}</p>
                <p className="text-sm text-primary mt-1">+23% vs. período anterior</p>
              </div>
              <div className="p-3 rounded-md bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Verificado</p>
                <p className="text-3xl font-bold">{totalVerified}</p>
                <p className="text-sm text-primary mt-1">+18% vs. período anterior</p>
              </div>
              <div className="p-3 rounded-md bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Verificação</p>
                <p className="text-3xl font-bold">{verificationRate}%</p>
                <p className="text-sm text-muted-foreground mt-1">Meta: 95%</p>
              </div>
              <div className="p-3 rounded-md bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Lotes por Mês
          </CardTitle>
          <CardDescription>
            Comparativo de lotes registrados vs. verificados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {mockMonthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 justify-center items-end h-48">
                  <div 
                    className="w-5 bg-primary/30 rounded-t"
                    style={{ height: `${(data.registered / 60) * 100}%` }}
                    title={`Registrados: ${data.registered}`}
                  />
                  <div 
                    className="w-5 bg-primary rounded-t"
                    style={{ height: `${(data.verified / 60) * 100}%` }}
                    title={`Verificados: ${data.verified}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary/30" />
              <span className="text-sm text-muted-foreground">Registrados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-sm text-muted-foreground">Verificados</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Produtores</CardTitle>
            <CardDescription>Por número de lotes registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* todo: remove mock functionality */}
              {[
                { name: "Fazenda Santa Clara", count: 45 },
                { name: "Fazenda Boa Vista", count: 38 },
                { name: "Sítio Alto da Serra", count: 32 },
                { name: "Fazenda Esperança", count: 28 },
                { name: "Fazenda Nova Terra", count: 24 },
              ].map((producer, index) => (
                <div key={producer.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <span className="font-medium">{producer.name}</span>
                  </div>
                  <span className="font-mono text-sm">{producer.count} lotes</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Rastreados</CardTitle>
            <CardDescription>Distribuição por tipo de produto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* todo: remove mock functionality */}
              {[
                { name: "Soja", count: 89, percentage: 42 },
                { name: "Milho", count: 52, percentage: 25 },
                { name: "Café", count: 38, percentage: 18 },
                { name: "Algodão", count: 21, percentage: 10 },
                { name: "Outros", count: 11, percentage: 5 },
              ].map((product) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground">{product.count} ({product.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
