import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge, type VerificationStatus } from "./VerificationBadge";
import { Eye, CheckCircle, FileDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface BatchRow {
  id: string;
  batchCode: string;
  product: string;
  producer: string;
  currentStage: string;
  status: VerificationStatus;
  lastUpdate: Date;
  txCount: number;
}

interface BatchesTableProps {
  batches: BatchRow[];
  onViewDetails?: (batch: BatchRow) => void;
  onVerify?: (batch: BatchRow) => void;
}

export function BatchesTable({ batches, onViewDetails, onVerify }: BatchesTableProps) {
  return (
    <div className="rounded-md border" data-testid="batches-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Código</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Produtor</TableHead>
            <TableHead>Etapa Atual</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Última Atualização</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                Nenhum lote registrado ainda.
              </TableCell>
            </TableRow>
          ) : (
            batches.map((batch) => (
              <TableRow key={batch.id} data-testid={`row-batch-${batch.id}`}>
                <TableCell>
                  <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {batch.batchCode}
                  </code>
                </TableCell>
                <TableCell className="font-medium">{batch.product}</TableCell>
                <TableCell>{batch.producer}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{batch.currentStage}</Badge>
                </TableCell>
                <TableCell>
                  <VerificationBadge status={batch.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {batch.lastUpdate.toLocaleDateString('pt-BR')}
                  <span className="text-xs ml-2">
                    ({batch.txCount} tx)
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" data-testid={`button-actions-${batch.id}`}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => {
                          onViewDetails?.(batch);
                          console.log("View details:", batch.id);
                        }}
                        data-testid={`button-view-${batch.id}`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          onVerify?.(batch);
                          console.log("Verify:", batch.id);
                        }}
                        data-testid={`button-verify-${batch.id}`}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verificar Integridade
                      </DropdownMenuItem>
                      <DropdownMenuItem data-testid={`button-export-${batch.id}`}>
                        <FileDown className="h-4 w-4 mr-2" />
                        Exportar Relatório
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
