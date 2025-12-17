import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, CircleOff } from "lucide-react";

export type VerificationStatus = "verified" | "pending" | "failed" | "not_synced";

interface VerificationBadgeProps {
  status: VerificationStatus;
  className?: string;
}

const statusConfig: Record<VerificationStatus, { label: string; icon: typeof CheckCircle; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  verified: {
    label: "Verificado",
    icon: CheckCircle,
    variant: "default",
  },
  pending: {
    label: "Pendente",
    icon: Clock,
    variant: "secondary",
  },
  failed: {
    label: "Falhou",
    icon: AlertCircle,
    variant: "destructive",
  },
  not_synced: {
    label: "Não Sincronizado",
    icon: CircleOff,
    variant: "outline",
  },
};

export function VerificationBadge({ status, className }: VerificationBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={className}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}
