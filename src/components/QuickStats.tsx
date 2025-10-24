import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickStatProps {
  label: string;
  value: number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  colorClass?: string;
}

const QuickStatItem = ({ label, value, unit, trend, colorClass }: QuickStatProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-secondary" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">
          {value}
          {unit && <span className="text-sm ml-1 font-normal text-muted-foreground">{unit}</span>}
        </p>
      </div>
      {trend && (
        <TrendIcon className={`h-5 w-5 ${trendColor}`} />
      )}
    </div>
  );
};

interface QuickStatsProps {
  stats: QuickStatProps[];
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <Card className="animate-slide-up">
      <CardContent className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Resumo Rápido</h3>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <QuickStatItem key={index} {...stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
