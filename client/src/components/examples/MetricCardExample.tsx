import { MetricCard } from "../MetricCard";
import { Package, CheckCircle, Truck, TrendingUp } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4">
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
      />
    </div>
  );
}
