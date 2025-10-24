import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardView = "geral" | "agua" | "gas" | "materiais";

interface DashboardNavProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const DashboardNav = ({ activeView, onViewChange }: DashboardNavProps) => {
  const views = [
    { id: "geral" as DashboardView, label: "Visão Geral" },
    { id: "agua" as DashboardView, label: "💧 Água" },
    { id: "gas" as DashboardView, label: "🔥 Gás" },
    { id: "materiais" as DashboardView, label: "🚚 Materiais" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {views.map((view) => (
        <Button
          key={view.id}
          variant="outline"
          size="sm"
          onClick={() => onViewChange(view.id)}
          className={cn(
            "transition-all",
            activeView === view.id
              ? "bg-primary text-primary-foreground border-primary"
              : "hover:bg-muted"
          )}
        >
          {view.label}
        </Button>
      ))}
    </div>
  );
};
