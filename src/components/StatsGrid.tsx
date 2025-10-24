import { Droplets, Flame, Package } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

interface StatsGridProps {
  agua: {
    total: number;
    pendente: number;
    entregue: number;
  };
  gas: {
    total: number;
    pendente: number;
    entregue: number;
  };
  materiais: {
    total: number;
  };
}

export const StatsGrid = ({ agua, gas, materiais }: StatsGridProps) => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <DashboardCard
        title="Água - Total"
        value={agua.total}
        subtitle={`${agua.pendente} pendentes | ${agua.entregue} entregues`}
        icon={Droplets}
        colorClass="bg-semcas-blue"
      />
      <DashboardCard
        title="Gás - Total"
        value={gas.total}
        subtitle={`${gas.pendente} pendentes | ${gas.entregue} entregues`}
        icon={Flame}
        colorClass="bg-semcas-teal"
      />
      <DashboardCard
        title="Materiais"
        value={materiais.total}
        subtitle="Total de itens cadastrados"
        icon={Package}
        colorClass="bg-semcas-green"
      />
    </div>
  );
};
