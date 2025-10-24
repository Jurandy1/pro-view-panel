import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "agua" | "gas" | "materiais" | "gestao" | "relatorio";

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "dashboard" as Tab, label: "📊 Dashboard" },
    { id: "agua" as Tab, label: "💧 Controle de Água" },
    { id: "gas" as Tab, label: "🔥 Controle de Gás" },
    { id: "materiais" as Tab, label: "🚚 Entrega de Materiais" },
    { id: "gestao" as Tab, label: "⚙️ Gestão de Unidades" },
    { id: "relatorio" as Tab, label: "📄 Gerar Relatório" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
