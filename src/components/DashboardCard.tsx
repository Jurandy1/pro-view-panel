import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorClass: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass,
  trend,
}: DashboardCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className={cn("pb-3", colorClass)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-white/90">
            {title}
          </CardTitle>
          <Icon className="h-5 w-5 text-white/80" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                trend.isPositive ? "text-secondary" : "text-destructive"
              )}
            >
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
