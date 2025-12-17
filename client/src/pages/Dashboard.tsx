import { Package, CheckCircle, Clock, TrendingUp, Truck } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { BatchesTable, type BatchRow } from "@/components/BatchesTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality
const mockBatches: BatchRow[] = [
  {
    id: "1",
    batchCode: "LT-2024-0891",
    product: "Soja",
    producer: "Fazenda Santa Clara",
    currentStage: "Transporte",
    status: "verified",
    lastUpdate: new Date("2024-06-22"),
    txCount: 4,
  },
  {
    id: "2",
    batchCode: "LT-2024-0892",
    product: "Milho",
    producer: "Fazenda Boa Vista",
    currentStage: "Colheita",
    status: "pending",
    lastUpdate: new Date("2024-06-21"),
    txCount: 3,
  },
  {
    id: "3",
    batchCode: "LT-2024-0893",
    product: "Café",
    producer: "Sítio Alto da Serra",
    currentStage: "Aplicação",
    status: "verified",
    lastUpdate: new Date("2024-06-20"),
    txCount: 2,
  },
  {
    id: "4",
    batchCode: "LT-2024-0894",
    product: "Algodão",
    producer: "Fazenda Esperança",
    currentStage: "Insumo",
    status: "not_synced",
    lastUpdate: new Date("2024-06-19"),
    txCount: 1,
  },
  {
    id: "5",
    batchCode: "LT-2024-0895",
    product: "Soja",
    producer: "Fazenda Nova Terra",
    currentStage: "Transporte",
    status: "failed",
    lastUpdate: new Date("2024-06-18"),
    txCount: 4,
  },
];

export default function Dashboard() {
  const { toast } = useToast();

  const handleViewDetails = (batch: BatchRow) => {
    toast({
      title: `Lote ${batch.batchCode}`,
      description: `Visualizando detalhes do lote de ${batch.product}`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral da rastreabilidade blockchain
          </p>
        </div>
        <Link href="/registrar">
          <Button data-testid="button-new-batch">
            <Package className="h-4 w-4 mr-2" />
            Novo Lote
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Lotes Registrados"
          value={247}
          subtitle="Total acumulado"
          icon={Package}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Verificados"
          value={231}
          subtitle="93.5% do total"
          icon={CheckCircle}
          trend={{ value: 2.1, isPositive: true }}
        />
        <MetricCard
          title="Pendentes"
          value={12}
          subtitle="Aguardando sync"
          icon={Clock}
        />
        <MetricCard
          title="Em Transporte"
          value={34}
          subtitle="Lotes ativos"
          icon={Truck}
          trend={{ value: 8.3, isPositive: true }}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle>Lotes Recentes</CardTitle>
            <CardDescription>
              Últimos lotes registrados no sistema
            </CardDescription>
          </div>
          <Link href="/rastrear">
            <Button variant="outline" size="sm" data-testid="button-view-all">
              Ver Todos
              <TrendingUp className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <BatchesTable 
            batches={mockBatches}
            onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>
    </div>
  );
}
