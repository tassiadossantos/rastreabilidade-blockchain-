import { BatchesTable, type BatchRow } from "../BatchesTable";

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
];

export default function BatchesTableExample() {
  return (
    <BatchesTable 
      batches={mockBatches}
      onViewDetails={(batch) => console.log("View:", batch)}
      onVerify={(batch) => console.log("Verify:", batch)}
    />
  );
}
