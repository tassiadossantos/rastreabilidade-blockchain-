import { useState } from "react";
import { BatchesTable, type BatchRow } from "@/components/BatchesTable";
import { BatchTimeline, type TimelineEvent } from "@/components/BatchTimeline";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default function TrackBatches() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBatch, setSelectedBatch] = useState<BatchRow | null>(null);

  const filteredBatches = mockBatches.filter((batch) => {
    const matchesSearch = 
      batch.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.producer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Rastrear Lotes</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe a jornada completa dos lotes na cadeia de valor
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Encontre lotes por código, produto ou produtor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por código, produto ou produtor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="verified">Verificados</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="failed">Falharam</SelectItem>
                <SelectItem value="not_synced">Não Sincronizados</SelectItem>
              </SelectContent>
            </Select>
            {(searchQuery || statusFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lotes ({filteredBatches.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <BatchesTable 
            batches={filteredBatches}
            onViewDetails={setSelectedBatch}
          />
        </CardContent>
      </Card>

      <Dialog open={!!selectedBatch} onOpenChange={() => setSelectedBatch(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Lote {selectedBatch?.batchCode}
            </DialogTitle>
            <DialogDescription>
              {selectedBatch?.product} - {selectedBatch?.producer}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold mb-4">Linha do Tempo</h3>
            <BatchTimeline events={mockTimelineEvents} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
