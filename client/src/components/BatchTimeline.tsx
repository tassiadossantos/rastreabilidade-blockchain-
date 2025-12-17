import { FlaskConical, Sprout, Wheat, Truck, CheckCircle, Clock, User } from "lucide-react";
import { VerificationBadge, type VerificationStatus } from "./VerificationBadge";
import { HashDisplay } from "./HashDisplay";

export interface TimelineEvent {
  id: string;
  step: "insumo" | "aplicacao" | "colheita" | "transporte";
  title: string;
  description: string;
  actor: string;
  actorRole: string;
  timestamp: Date;
  status: VerificationStatus;
  txHash?: string;
  dataHash?: string;
}

interface BatchTimelineProps {
  events: TimelineEvent[];
}

const stepIcons = {
  insumo: FlaskConical,
  aplicacao: Sprout,
  colheita: Wheat,
  transporte: Truck,
};

const stepColors = {
  insumo: "bg-chart-3",
  aplicacao: "bg-primary",
  colheita: "bg-chart-2",
  transporte: "bg-chart-4",
};

export function BatchTimeline({ events }: BatchTimelineProps) {
  return (
    <div className="space-y-8" data-testid="batch-timeline">
      {events.map((event, index) => {
        const Icon = stepIcons[event.step];
        const bgColor = stepColors[event.step];

        return (
          <div key={event.id} className="relative flex gap-4">
            {index < events.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            )}
            <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
                <VerificationBadge status={event.status} />
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{event.actor}</span>
                  <span className="text-xs">({event.actorRole})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{event.timestamp.toLocaleDateString('pt-BR')} {event.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              {event.txHash && (
                <div className="mt-4 p-4 bg-muted/50 rounded-md space-y-3">
                  {event.dataHash && (
                    <HashDisplay hash={event.dataHash} label="Hash dos Dados" />
                  )}
                  <HashDisplay hash={event.txHash} label="Transação Blockchain" txHash={event.txHash} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
