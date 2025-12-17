import { BatchTimeline, type TimelineEvent } from "../BatchTimeline";

// todo: remove mock functionality
const mockEvents: TimelineEvent[] = [
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
    status: "pending",
  },
];

export default function BatchTimelineExample() {
  return <BatchTimeline events={mockEvents} />;
}
